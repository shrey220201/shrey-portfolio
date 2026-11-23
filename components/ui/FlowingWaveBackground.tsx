"use client";

import React, { useEffect, useRef } from "react";
import { useTheme } from "@/lib/theme";

export function FlowingWaveBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { theme } = useTheme();
  const themeRef = useRef(theme);

  useEffect(() => {
    themeRef.current = theme;
  }, [theme]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Mouse coordinates for dynamic wave displacement
    const mouse = {
      x: width / 2,
      y: height / 2,
      targetX: width / 2,
      targetY: height / 2,
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initEmbers();
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });

    // Floating Embers rising gently into the atmosphere
    interface Ember {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      alpha: number;
      baseAlpha: number;
      isGlacier: boolean;
      flickerSpeed: number;
    }

    let embers: Ember[] = [];

    const initEmbers = () => {
      embers = [];
      const count = Math.min(Math.floor((width * height) / 14000), 105);
      for (let i = 0; i < count; i++) {
        const isGlacier = Math.random() < 0.22;
        const baseAlpha = 0.25 + Math.random() * 0.55;
        embers.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.3,
          vy: -(Math.random() * 0.45 + 0.15),
          radius: Math.random() * 1.5 + 0.8,
          alpha: baseAlpha,
          baseAlpha,
          isGlacier,
          flickerSpeed: Math.random() * 0.03 + 0.01,
        });
      }
    };

    initEmbers();

    // Wave Mesh Configuration
    const cols = 55;
    const rows = 36;
    let time = 0;

    const render = () => {
      time += 0.012;
      const isDark = themeRef.current !== "light";

      // Smooth mouse displacement
      mouse.x += (mouse.targetX - mouse.x) * 0.04;
      mouse.y += (mouse.targetY - mouse.y) * 0.04;

      ctx.clearRect(0, 0, width, height);

      // 1. Draw Rising Embers
      for (let i = 0; i < embers.length; i++) {
        const emb = embers[i];
        emb.x += emb.vx;
        emb.y += emb.vy;

        // Flicker effect
        emb.alpha = emb.baseAlpha + Math.sin(time * 50 * emb.flickerSpeed) * 0.2;

        if (emb.y < -10) {
          emb.y = height + 10;
          emb.x = Math.random() * width;
        }
        if (emb.x < 0) emb.x = width;
        if (emb.x > width) emb.x = 0;

        const alphaVal = Math.max(0, Math.min(1, emb.alpha));
        if (isDark) {
          ctx.fillStyle = emb.isGlacier
            ? `rgba(119, 231, 254, ${alphaVal})`
            : `rgba(241, 84, 25, ${alphaVal})`;
        } else {
          // Deeper contrast for light background
          ctx.fillStyle = emb.isGlacier
            ? `rgba(0, 153, 191, ${alphaVal * 0.85})`
            : `rgba(225, 75, 20, ${alphaVal * 0.85})`;
        }

        ctx.beginPath();
        ctx.arc(emb.x, emb.y, emb.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      // 2. 3D Perspective Undulating Particle Wave Surface
      const fov = 420;
      const waveCenterY = height * 0.68;
      const mouseOffsetFactor = (mouse.x / width - 0.5) * 120;

      for (let r = rows - 1; r >= 0; r--) {
        const depth = 280 + r * 22;
        const scale = fov / (fov + depth);
        const zFactor = 1 - r / rows;

        ctx.beginPath();
        let firstPoint = true;

        for (let c = 0; c < cols; c++) {
          const u = c / (cols - 1);
          const xWorld = (u - 0.5) * (width * 1.8) + mouseOffsetFactor * (1 - zFactor);

          const freq1 = u * 4.5 + time * 1.2;
          const freq2 = (r * 0.22) + time * 0.8;
          const freq3 = (u * 2.5 + r * 0.15) - time * 0.6;

          const yElevation =
            Math.sin(freq1) * 45 * (0.8 + zFactor * 0.5) +
            Math.cos(freq2) * 35 +
            Math.sin(freq3) * 25;

          const screenX = width / 2 + xWorld * scale;
          const screenY = waveCenterY + (yElevation + (r - rows / 2) * 16) * scale;

          if (firstPoint) {
            ctx.moveTo(screenX, screenY);
            firstPoint = false;
          } else {
            ctx.lineTo(screenX, screenY);
          }

          // Luminous node points along wave filaments
          if (c % 2 === 0 && r % 2 === 0) {
            const isRidge = yElevation > 15;
            const ptAlpha = Math.max(0.08, zFactor * (isRidge ? 0.75 : 0.35));
            const ptRadius = Math.max(0.6, scale * (isRidge ? 2.4 : 1.3));

            const isGlacierPoint = (c * 7 + r * 13) % 17 === 0;

            if (isDark) {
              ctx.fillStyle = isGlacierPoint
                ? `rgba(119, 231, 254, ${ptAlpha * 1.2})`
                : `rgba(241, 84, 25, ${ptAlpha})`;
            } else {
              ctx.fillStyle = isGlacierPoint
                ? `rgba(0, 153, 191, ${ptAlpha * 1.1})`
                : `rgba(225, 75, 20, ${ptAlpha * 1.1})`;
            }

            ctx.fillRect(screenX - ptRadius / 2, screenY - ptRadius / 2, ptRadius, ptRadius);
          }
        }

        // Filament line styling
        const lineAlpha = zFactor * (isDark ? 0.18 : 0.25);
        ctx.strokeStyle = isDark
          ? `rgba(241, 84, 25, ${lineAlpha})`
          : `rgba(225, 75, 20, ${lineAlpha})`;
        ctx.lineWidth = Math.max(0.6, scale * 1.5);
        ctx.stroke();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none bg-[var(--bg)] transition-colors duration-500">
      {/* 1. Ambient Volumetric Glow Behind the Wave (Blaze Orange) */}
      <div
        className="absolute bottom-[5%] left-1/2 -translate-x-1/2 w-[90vw] h-[45vh] max-w-[1200px] rounded-full opacity-20 dark:opacity-25 blur-[170px] pointer-events-none transition-opacity duration-500"
        style={{
          background: "radial-gradient(ellipse at center, rgba(241, 84, 25, 0.5) 0%, rgba(241, 84, 25, 0.12) 50%, transparent 80%)",
        }}
      />

      {/* 2. Top-Right Atmospheric Glacier Blue Glow */}
      <div
        className="absolute top-[8%] right-[5%] w-[45vw] h-[45vw] max-w-[600px] max-h-[600px] rounded-full opacity-10 dark:opacity-15 blur-[170px] pointer-events-none transition-opacity duration-500"
        style={{
          background: "radial-gradient(circle, rgba(119, 231, 254, 0.35) 0%, transparent 70%)",
        }}
      />

      {/* 3. The Interactive Flowing Wave & Embers Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

      {/* 4. Smooth Bottom Horizon Gradient Blend into current theme's var(--bg) */}
      <div
        className="absolute inset-x-0 bottom-0 h-32 pointer-events-none transition-all duration-500"
        style={{
          background: "linear-gradient(to top, var(--bg) 25%, transparent 100%)",
        }}
      />

      {/* 5. Smooth Top Gradient for Ultra-Clean Navbar Integration */}
      <div
        className="absolute inset-x-0 top-0 h-28 pointer-events-none transition-all duration-500"
        style={{
          background: "linear-gradient(to bottom, var(--bg) 35%, transparent 100%)",
        }}
      />
    </div>
  );
}
