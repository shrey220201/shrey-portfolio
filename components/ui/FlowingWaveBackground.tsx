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
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = window.innerWidth;
    let height = window.innerHeight;

    // High-DPI / Retina buffer scaling for Safari (WebKit) and Firefox
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.scale(dpr, dpr);

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
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
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
      const count = Math.min(Math.floor((width * height) / 13000), 110);
      for (let i = 0; i < count; i++) {
        // Balanced mix of glacier blue & blaze orange embers
        const isGlacier = Math.random() < 0.42;
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
    const cols = 56;
    const rows = 36;
    let time = 0;

    const render = () => {
      time += 0.012;
      const isDark = themeRef.current !== "light";

      // Smooth mouse displacement
      mouse.x += (mouse.targetX - mouse.x) * 0.04;
      mouse.y += (mouse.targetY - mouse.y) * 0.04;

      ctx.clearRect(0, 0, width, height);

      // 1. Draw Rising Embers (Dual Blaze Orange & Glacier Blue)
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
            ? `rgba(119, 231, 254, ${alphaVal * 0.9})`
            : `rgba(241, 84, 25, ${alphaVal})`;
        } else {
          ctx.fillStyle = emb.isGlacier
            ? `rgba(0, 153, 191, ${alphaVal * 0.85})`
            : `rgba(225, 75, 20, ${alphaVal * 0.85})`;
        }

        ctx.beginPath();
        ctx.arc(emb.x, emb.y, emb.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      // 2. 3D Perspective Undulating Particle Wave Surface with Smooth Orange <-> Glacier Blue Blend
      const fov = 420;
      const waveCenterY = height * 0.68;
      const mouseOffsetFactor = (mouse.x / width - 0.5) * 120;

      // Master continuous linear gradient across the wave horizon
      // Oscillating color stop phase for an organic liquid light flow
      const phase = Math.sin(time * 0.5) * 0.08;
      const waveGradient = ctx.createLinearGradient(0, 0, width, 0);

      if (isDark) {
        // Blaze Orange -> Vibrant Glacier Blue -> Deep Glacier -> Blaze Orange
        waveGradient.addColorStop(0.0, "rgba(241, 84, 25, 0.9)");
        waveGradient.addColorStop(Math.max(0.05, 0.26 - phase), "rgba(245, 115, 45, 0.95)");
        waveGradient.addColorStop(Math.min(0.95, 0.52 + phase), "rgba(119, 231, 254, 1.0)");
        waveGradient.addColorStop(Math.min(0.98, 0.76 + phase), "rgba(90, 215, 250, 0.95)");
        waveGradient.addColorStop(1.0, "rgba(241, 84, 25, 0.85)");
      } else {
        waveGradient.addColorStop(0.0, "rgba(225, 75, 20, 0.9)");
        waveGradient.addColorStop(Math.max(0.05, 0.26 - phase), "rgba(235, 100, 35, 0.95)");
        waveGradient.addColorStop(Math.min(0.95, 0.52 + phase), "rgba(0, 153, 191, 1.0)");
        waveGradient.addColorStop(Math.min(0.98, 0.76 + phase), "rgba(0, 175, 220, 0.95)");
        waveGradient.addColorStop(1.0, "rgba(225, 75, 20, 0.85)");
      }

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

          // Luminous node points along wave filaments with smooth dynamic color blend
          if (c % 2 === 0 && r % 2 === 0) {
            const isRidge = yElevation > 14;
            const ptAlpha = Math.max(0.12, zFactor * (isRidge ? 0.85 : 0.42));
            const ptRadius = Math.max(0.65, scale * (isRidge ? 2.5 : 1.35));

            // Smooth color interpolation between Blaze Orange and Glacier Blue based on position & ridge height
            // Center-right crests and elevated peaks shine in Glacier Blue
            const waveBlend = Math.sin(u * Math.PI + Math.cos(r * 0.18 + time * 0.6) * 0.6);
            const glacierWeight = Math.max(0, Math.min(1, waveBlend * 0.82 + (isRidge ? 0.35 : 0)));

            if (isDark) {
              const red = Math.round(241 * (1 - glacierWeight) + 119 * glacierWeight);
              const green = Math.round(84 * (1 - glacierWeight) + 231 * glacierWeight);
              const blue = Math.round(25 * (1 - glacierWeight) + 254 * glacierWeight);
              ctx.fillStyle = `rgba(${red}, ${green}, ${blue}, ${ptAlpha})`;
            } else {
              const red = Math.round(225 * (1 - glacierWeight) + 0 * glacierWeight);
              const green = Math.round(75 * (1 - glacierWeight) + 153 * glacierWeight);
              const blue = Math.round(20 * (1 - glacierWeight) + 191 * glacierWeight);
              ctx.fillStyle = `rgba(${red}, ${green}, ${blue}, ${ptAlpha * 0.95})`;
            }

            ctx.fillRect(screenX - ptRadius / 2, screenY - ptRadius / 2, ptRadius, ptRadius);
          }
        }

        // Filament line stroke with smooth alpha and master wave gradient
        ctx.save();
        ctx.globalAlpha = zFactor * (isDark ? 0.32 : 0.4);
        ctx.strokeStyle = waveGradient;
        ctx.lineWidth = Math.max(0.65, scale * 1.55);
        ctx.stroke();
        ctx.restore();
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
      {/* 1. Ambient Volumetric Glow Behind the Wave (Blaze Orange Horizon) */}
      <div
        className="absolute bottom-[4%] left-1/3 -translate-x-1/2 w-[85vw] h-[45vh] max-w-[1100px] rounded-full opacity-20 dark:opacity-25 blur-[170px] pointer-events-none transition-opacity duration-500"
        style={{
          background: "radial-gradient(ellipse at center, rgba(241, 84, 25, 0.45) 0%, rgba(241, 84, 25, 0.1) 50%, transparent 80%)",
        }}
      />

      {/* 2. Central Sweeping Glacier Blue Volumetric Mist */}
      <div
        className="absolute bottom-[14%] right-1/4 translate-x-1/4 w-[75vw] h-[40vh] max-w-[1000px] rounded-full opacity-18 dark:opacity-22 blur-[170px] pointer-events-none transition-opacity duration-500"
        style={{
          background: "radial-gradient(ellipse at center, rgba(119, 231, 254, 0.42) 0%, rgba(119, 231, 254, 0.08) 55%, transparent 80%)",
        }}
      />

      {/* 3. Top-Right Atmospheric Glacier Blue Glow */}
      <div
        className="absolute top-[8%] right-[5%] w-[45vw] h-[45vw] max-w-[600px] max-h-[600px] rounded-full opacity-10 dark:opacity-15 blur-[170px] pointer-events-none transition-opacity duration-500"
        style={{
          background: "radial-gradient(circle, rgba(119, 231, 254, 0.35) 0%, transparent 70%)",
        }}
      />

      {/* 4. The Interactive Flowing Wave & Embers Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

      {/* 5. Smooth Bottom Horizon Gradient Blend into current theme's var(--bg) */}
      <div
        className="absolute inset-x-0 bottom-0 h-32 pointer-events-none transition-all duration-500"
        style={{
          background: "linear-gradient(to top, var(--bg) 25%, transparent 100%)",
        }}
      />

      {/* 6. Smooth Top Gradient for Ultra-Clean Navbar Integration */}
      <div
        className="absolute inset-x-0 top-0 h-28 pointer-events-none transition-all duration-500"
        style={{
          background: "linear-gradient(to bottom, var(--bg) 35%, transparent 100%)",
        }}
      />
    </div>
  );
}
