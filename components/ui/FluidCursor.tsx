"use client";

import React, { useEffect, useRef } from "react";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { siteConfig } from "@/content/site";

interface FBO {
  texture: WebGLTexture;
  fbo: WebGLFramebuffer;
  width: number;
  height: number;
  attach: (id: number) => number;
}

interface DoubleFBO {
  width: number;
  height: number;
  read: FBO;
  write: FBO;
  swap: () => void;
}

export function FluidCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (prefersReduced || !siteConfig.flags.enableFluidCursor) return;
    if (typeof window === "undefined") return;

    // Do not run on touch-only mobile devices to preserve battery and performance
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    // Simulation resolutions (optimized for 60fps)
    const SIM_RES = 128;
    const DYE_RES = 512;
    const ITERATIONS = 14;
    const DENSITY_DISSIPATION = 0.965; // Soft dissipation
    const VELOCITY_DISSIPATION = 0.98;
    const CURL = 32.0; // Swirling vortices matching fluid reference
    const SPLAT_RADIUS = 0.0006;

    const params = {
      alpha: true,
      depth: false,
      stencil: false,
      antialias: false,
      preserveDrawingBuffer: false,
    };

    let gl = canvas.getContext("webgl2", params) as WebGLRenderingContext | WebGL2RenderingContext | null;
    const isWebGL2 = !!gl;
    if (!gl) {
      gl = (canvas.getContext("webgl", params) ||
        canvas.getContext("experimental-webgl", params)) as WebGLRenderingContext | null;
    }
    if (!gl) return;

    // Texture floating point formats
    let halfFloatTexType: number = gl.UNSIGNED_BYTE;
    let formatRGBA: number = gl.RGBA;
    let internalFormatRGBA: number = gl.RGBA;

    if (isWebGL2) {
      const gl2 = gl as WebGL2RenderingContext;
      gl2.getExtension("EXT_color_buffer_float");
      halfFloatTexType = gl2.HALF_FLOAT;
      internalFormatRGBA = gl2.RGBA16F;
      formatRGBA = gl2.RGBA;
    } else {
      const halfFloatExt = gl.getExtension("OES_texture_half_float");
      gl.getExtension("OES_texture_half_float_linear");
      if (halfFloatExt) {
        halfFloatTexType = halfFloatExt.HALF_FLOAT_OES;
      }
    }

    // Shader sources
    const baseVertexShader = `
      precision highp float;
      attribute vec2 aPosition;
      varying vec2 vUv;
      varying vec2 vL;
      varying vec2 vR;
      varying vec2 vT;
      varying vec2 vB;
      uniform vec2 texelSize;
      void main () {
        vUv = aPosition * 0.5 + 0.5;
        vL = vUv - vec2(texelSize.x, 0.0);
        vR = vUv + vec2(texelSize.x, 0.0);
        vT = vUv + vec2(0.0, texelSize.y);
        vB = vUv - vec2(0.0, texelSize.y);
        gl_Position = vec4(aPosition, 0.0, 1.0);
      }
    `;

    const splatShader = `
      precision highp float;
      precision highp sampler2D;
      varying vec2 vUv;
      uniform sampler2D uTarget;
      uniform float aspectRatio;
      uniform vec3 color;
      uniform vec2 point;
      uniform float radius;
      void main () {
        vec2 p = vUv - point.xy;
        p.x *= aspectRatio;
        vec3 splat = exp(-dot(p, p) / radius) * color;
        vec3 base = texture2D(uTarget, vUv).xyz;
        gl_FragColor = vec4(base + splat, 1.0);
      }
    `;

    const advectionShader = `
      precision highp float;
      precision highp sampler2D;
      varying vec2 vUv;
      uniform sampler2D uVelocity;
      uniform sampler2D uSource;
      uniform vec2 texelSize;
      uniform float dt;
      uniform float dissipation;
      void main () {
        vec2 coord = vUv - dt * texture2D(uVelocity, vUv).xy * texelSize;
        gl_FragColor = dissipation * texture2D(uSource, coord);
      }
    `;

    const divergenceShader = `
      precision highp float;
      precision highp sampler2D;
      varying vec2 vL;
      varying vec2 vR;
      varying vec2 vT;
      varying vec2 vB;
      uniform sampler2D uVelocity;
      void main () {
        float L = texture2D(uVelocity, vL).x;
        float R = texture2D(uVelocity, vR).x;
        float T = texture2D(uVelocity, vT).y;
        float B = texture2D(uVelocity, vB).y;
        float div = 0.5 * (R - L + T - B);
        gl_FragColor = vec4(div, 0.0, 0.0, 1.0);
      }
    `;

    const curlShader = `
      precision highp float;
      precision highp sampler2D;
      varying vec2 vL;
      varying vec2 vR;
      varying vec2 vT;
      varying vec2 vB;
      uniform sampler2D uVelocity;
      void main () {
        float L = texture2D(uVelocity, vL).y;
        float R = texture2D(uVelocity, vR).y;
        float T = texture2D(uVelocity, vT).x;
        float B = texture2D(uVelocity, vB).x;
        float vorticity = R - L - T + B;
        gl_FragColor = vec4(0.5 * vorticity, 0.0, 0.0, 1.0);
      }
    `;

    const vorticityShader = `
      precision highp float;
      precision highp sampler2D;
      varying vec2 vUv;
      varying vec2 vL;
      varying vec2 vR;
      varying vec2 vT;
      varying vec2 vB;
      uniform sampler2D uVelocity;
      uniform sampler2D uCurl;
      uniform float curl;
      uniform float dt;
      void main () {
        float L = texture2D(uCurl, vL).x;
        float R = texture2D(uCurl, vR).x;
        float T = texture2D(uCurl, vT).x;
        float B = texture2D(uCurl, vB).x;
        float C = texture2D(uCurl, vUv).x;
        vec2 force = 0.5 * vec2(abs(T) - abs(B), abs(R) - abs(L));
        force /= length(force) + 0.0001;
        force *= curl * C;
        force.y *= -1.0;
        vec2 vel = texture2D(uVelocity, vUv).xy;
        gl_FragColor = vec4(vel + force * dt, 0.0, 1.0);
      }
    `;

    const pressureShader = `
      precision highp float;
      precision highp sampler2D;
      varying vec2 vL;
      varying vec2 vR;
      varying vec2 vT;
      varying vec2 vB;
      uniform sampler2D uPressure;
      uniform sampler2D uDivergence;
      void main () {
        float L = texture2D(uPressure, vL).x;
        float R = texture2D(uPressure, vR).x;
        float T = texture2D(uPressure, vT).x;
        float B = texture2D(uPressure, vB).x;
        float C = texture2D(uDivergence, vL).x;
        float pressure = (L + R + B + T - C) * 0.25;
        gl_FragColor = vec4(pressure, 0.0, 0.0, 1.0);
      }
    `;

    const gradientSubtractShader = `
      precision highp float;
      precision highp sampler2D;
      varying vec2 vUv;
      varying vec2 vL;
      varying vec2 vR;
      varying vec2 vT;
      varying vec2 vB;
      uniform sampler2D uPressure;
      uniform sampler2D uVelocity;
      void main () {
        float L = texture2D(uPressure, vL).x;
        float R = texture2D(uPressure, vR).x;
        float T = texture2D(uPressure, vT).x;
        float B = texture2D(uPressure, vB).x;
        vec2 velocity = texture2D(uVelocity, vUv).xy;
        velocity.xy -= vec2(R - L, T - B) * 0.5;
        gl_FragColor = vec4(velocity, 0.0, 1.0);
      }
    `;

    const displayShader = `
      precision highp float;
      precision highp sampler2D;
      varying vec2 vUv;
      uniform sampler2D uTexture;
      void main () {
        vec3 c = texture2D(uTexture, vUv).rgb;
        // Soft airy tone-mapping: light, delicate luminescence
        float alpha = max(c.r, max(c.g, c.b));
        gl_FragColor = vec4(c, alpha * 0.72);
      }
    `;

    // Compile helper
    function createProgram(vertexSource: string, fragmentSource: string): WebGLProgram {
      if (!gl) throw new Error("No WebGL context");
      const vs = gl.createShader(gl.VERTEX_SHADER)!;
      gl.shaderSource(vs, vertexSource);
      gl.compileShader(vs);

      const fs = gl.createShader(gl.FRAGMENT_SHADER)!;
      gl.shaderSource(fs, fragmentSource);
      gl.compileShader(fs);

      const program = gl.createProgram()!;
      gl.attachShader(program, vs);
      gl.attachShader(program, fs);
      gl.linkProgram(program);
      return program;
    }

    const prgSplat = createProgram(baseVertexShader, splatShader);
    const prgAdvection = createProgram(baseVertexShader, advectionShader);
    const prgDivergence = createProgram(baseVertexShader, divergenceShader);
    const prgCurl = createProgram(baseVertexShader, curlShader);
    const prgVorticity = createProgram(baseVertexShader, vorticityShader);
    const prgPressure = createProgram(baseVertexShader, pressureShader);
    const prgGradSubtract = createProgram(baseVertexShader, gradientSubtractShader);
    const prgDisplay = createProgram(baseVertexShader, displayShader);

    // Quad geometry
    const quadBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, quadBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, -1, 1, 1, 1, 1, -1]),
      gl.STATIC_DRAW
    );

    function createFBO(w: number, h: number): FBO {
      if (!gl) throw new Error("No gl");
      gl.activeTexture(gl.TEXTURE0);
      const texture = gl.createTexture()!;
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texImage2D(
        gl.TEXTURE_2D,
        0,
        internalFormatRGBA,
        w,
        h,
        0,
        formatRGBA,
        halfFloatTexType,
        null
      );

      const fbo = gl.createFramebuffer()!;
      gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
      gl.framebufferTexture2D(
        gl.FRAMEBUFFER,
        gl.COLOR_ATTACHMENT0,
        gl.TEXTURE_2D,
        texture,
        0
      );
      gl.viewport(0, 0, w, h);
      gl.clear(gl.COLOR_BUFFER_BIT);

      return {
        texture,
        fbo,
        width: w,
        height: h,
        attach(id: number) {
          gl!.activeTexture(gl!.TEXTURE0 + id);
          gl!.bindTexture(gl!.TEXTURE_2D, texture);
          return id;
        },
      };
    }

    function createDoubleFBO(w: number, h: number): DoubleFBO {
      let fbo1 = createFBO(w, h);
      let fbo2 = createFBO(w, h);
      return {
        width: w,
        height: h,
        get read() {
          return fbo1;
        },
        get write() {
          return fbo2;
        },
        swap() {
          const temp = fbo1;
          fbo1 = fbo2;
          fbo2 = temp;
        },
      };
    }

    const density = createDoubleFBO(DYE_RES, DYE_RES);
    const velocity = createDoubleFBO(SIM_RES, SIM_RES);
    const divergence = createFBO(SIM_RES, SIM_RES);
    const curl = createFBO(SIM_RES, SIM_RES);
    const pressure = createDoubleFBO(SIM_RES, SIM_RES);

    function blit(destFbo: WebGLFramebuffer | null, w: number, h: number) {
      if (!gl) return;
      gl.bindFramebuffer(gl.FRAMEBUFFER, destFbo);
      gl.viewport(0, 0, w, h);
      gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);
    }

    // Bind full screen quad attribute
    function bindQuad(prog: WebGLProgram) {
      if (!gl) return;
      gl.useProgram(prog);
      const posLoc = gl.getAttribLocation(prog, "aPosition");
      if (posLoc >= 0) {
        gl.enableVertexAttribArray(posLoc);
        gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);
      }
    }

    // Mouse movement state
    const pointer = {
      x: 0,
      y: 0,
      dx: 0,
      dy: 0,
      moved: false,
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = 1.0 - (e.clientY - rect.top) / rect.height;

      pointer.dx = (x - pointer.x) * 10.0;
      pointer.dy = (y - pointer.y) * 10.0;
      pointer.x = x;
      pointer.y = y;
      pointer.moved = true;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // Handle canvas sizing
    const resize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }
    };

    resize();
    window.addEventListener("resize", resize);

    // Color cycle: Light cool cyan & electric blue matching reference
    let colorStep = 0;

    let animId: number;
    let lastTime = performance.now();

    const render = () => {
      animId = requestAnimationFrame(render);

      const now = performance.now();
      const dt = Math.min((now - lastTime) / 1000, 0.024);
      lastTime = now;

      if (!gl) return;

      // Inject splat if pointer moved
      if (pointer.moved && Math.hypot(pointer.dx, pointer.dy) > 0.001) {
        pointer.moved = false;
        colorStep += 0.02;

        // Soft, airy cyan/blue palette matching the reference image:
        // Main: Cool electric blue [0.16, 0.52, 0.98] to aqua-cyan [0.12, 0.78, 0.88]
        const r = 0.12 + Math.sin(colorStep) * 0.04;
        const g = 0.50 + Math.sin(colorStep + 1.2) * 0.18;
        const b = 0.92 + Math.cos(colorStep) * 0.06;

        // 1. Splat velocity
        bindQuad(prgSplat);
        gl.uniform1i(gl.getUniformLocation(prgSplat, "uTarget"), velocity.read.attach(0));
        gl.uniform1f(gl.getUniformLocation(prgSplat, "aspectRatio"), canvas.width / canvas.height);
        gl.uniform2f(gl.getUniformLocation(prgSplat, "point"), pointer.x, pointer.y);
        gl.uniform3f(
          gl.getUniformLocation(prgSplat, "color"),
          pointer.dx * 16.0,
          pointer.dy * 16.0,
          0.0
        );
        gl.uniform1f(gl.getUniformLocation(prgSplat, "radius"), SPLAT_RADIUS * 1.5);
        blit(velocity.write.fbo, velocity.width, velocity.height);
        velocity.swap();

        // 2. Splat dye density (delicate, light intensity)
        gl.uniform1i(gl.getUniformLocation(prgSplat, "uTarget"), density.read.attach(0));
        gl.uniform3f(gl.getUniformLocation(prgSplat, "color"), r * 0.42, g * 0.42, b * 0.42);
        gl.uniform1f(gl.getUniformLocation(prgSplat, "radius"), SPLAT_RADIUS * 1.2);
        blit(density.write.fbo, density.width, density.height);
        density.swap();
      }

      const simTexel = [1.0 / SIM_RES, 1.0 / SIM_RES];
      const dyeTexel = [1.0 / DYE_RES, 1.0 / DYE_RES];

      // Step 1: Curl
      bindQuad(prgCurl);
      gl.uniform2f(gl.getUniformLocation(prgCurl, "texelSize"), simTexel[0], simTexel[1]);
      gl.uniform1i(gl.getUniformLocation(prgCurl, "uVelocity"), velocity.read.attach(0));
      blit(curl.fbo, SIM_RES, SIM_RES);

      // Step 2: Vorticity Confinement (creates the signature swirling curling smoke)
      bindQuad(prgVorticity);
      gl.uniform2f(gl.getUniformLocation(prgVorticity, "texelSize"), simTexel[0], simTexel[1]);
      gl.uniform1i(gl.getUniformLocation(prgVorticity, "uVelocity"), velocity.read.attach(0));
      gl.uniform1i(gl.getUniformLocation(prgVorticity, "uCurl"), curl.attach(1));
      gl.uniform1f(gl.getUniformLocation(prgVorticity, "curl"), CURL);
      gl.uniform1f(gl.getUniformLocation(prgVorticity, "dt"), dt);
      blit(velocity.write.fbo, SIM_RES, SIM_RES);
      velocity.swap();

      // Step 3: Divergence
      bindQuad(prgDivergence);
      gl.uniform2f(gl.getUniformLocation(prgDivergence, "texelSize"), simTexel[0], simTexel[1]);
      gl.uniform1i(gl.getUniformLocation(prgDivergence, "uVelocity"), velocity.read.attach(0));
      blit(divergence.fbo, SIM_RES, SIM_RES);

      // Step 4: Pressure solve (Jacobi iterations)
      bindQuad(prgPressure);
      gl.uniform1i(gl.getUniformLocation(prgPressure, "uDivergence"), divergence.attach(1));
      for (let i = 0; i < ITERATIONS; i++) {
        gl.uniform1i(gl.getUniformLocation(prgPressure, "uPressure"), pressure.read.attach(0));
        blit(pressure.write.fbo, SIM_RES, SIM_RES);
        pressure.swap();
      }

      // Step 5: Gradient Subtract
      bindQuad(prgGradSubtract);
      gl.uniform2f(gl.getUniformLocation(prgGradSubtract, "texelSize"), simTexel[0], simTexel[1]);
      gl.uniform1i(gl.getUniformLocation(prgGradSubtract, "uPressure"), pressure.read.attach(0));
      gl.uniform1i(gl.getUniformLocation(prgGradSubtract, "uVelocity"), velocity.read.attach(1));
      blit(velocity.write.fbo, SIM_RES, SIM_RES);
      velocity.swap();

      // Step 6: Advect Velocity
      bindQuad(prgAdvection);
      gl.uniform2f(gl.getUniformLocation(prgAdvection, "texelSize"), simTexel[0], simTexel[1]);
      gl.uniform1i(gl.getUniformLocation(prgAdvection, "uVelocity"), velocity.read.attach(0));
      gl.uniform1i(gl.getUniformLocation(prgAdvection, "uSource"), velocity.read.attach(0));
      gl.uniform1f(gl.getUniformLocation(prgAdvection, "dt"), dt);
      gl.uniform1f(gl.getUniformLocation(prgAdvection, "dissipation"), VELOCITY_DISSIPATION);
      blit(velocity.write.fbo, SIM_RES, SIM_RES);
      velocity.swap();

      // Step 7: Advect Dye (Density)
      bindQuad(prgAdvection);
      gl.uniform2f(gl.getUniformLocation(prgAdvection, "texelSize"), dyeTexel[0], dyeTexel[1]);
      gl.uniform1i(gl.getUniformLocation(prgAdvection, "uVelocity"), velocity.read.attach(0));
      gl.uniform1i(gl.getUniformLocation(prgAdvection, "uSource"), density.read.attach(1));
      gl.uniform1f(gl.getUniformLocation(prgAdvection, "dt"), dt);
      gl.uniform1f(gl.getUniformLocation(prgAdvection, "dissipation"), DENSITY_DISSIPATION);
      blit(density.write.fbo, DYE_RES, DYE_RES);
      density.swap();

      // Step 8: Render to screen
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.clearColor(0.0, 0.0, 0.0, 0.0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.enable(gl.BLEND);
      gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

      bindQuad(prgDisplay);
      gl.uniform1i(gl.getUniformLocation(prgDisplay, "uTexture"), density.read.attach(0));
      blit(null, canvas.width, canvas.height);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", resize);
    };
  }, [prefersReduced]);

  if (prefersReduced || !siteConfig.flags.enableFluidCursor) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-20 h-full w-full opacity-70 mix-blend-screen"
    />
  );
}
