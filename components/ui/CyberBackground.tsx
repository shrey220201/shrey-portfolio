"use client";

import React, { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseAlpha: number;
  alpha: number;
  color: string;
}

export function CyberBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Mouse coordinates for gentle interactive repulsion
    const mouse = {
      x: -1000,
      y: -1000,
      radius: 160,
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initParticles();
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseleave", handleMouseLeave, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });

    // Palette: Blaze Orange (#F15419), Glacier Blue (#77E7FE), and Warm White
    const colors = [
      "rgba(241, 84, 25, ",   // Blaze Orange
      "rgba(119, 231, 254, ", // Glacier Blue
      "rgba(255, 120, 60, ",  // Warm Orange Glow
      "rgba(255, 255, 255, ", // Subtle Star White
    ];

    let particles: Particle[] = [];

    const initParticles = () => {
      particles = [];
      const count = Math.min(Math.floor((width * height) / 18000), 75);

      for (let i = 0; i < count; i++) {
        const color = colors[Math.floor(Math.random() * colors.length)];
        const baseAlpha = 0.2 + Math.random() * 0.4;
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.35,
          vy: (Math.random() - 0.5) * 0.35,
          radius: Math.random() * 1.6 + 0.8,
          baseAlpha,
          alpha: baseAlpha,
          color,
        });
      }
    };

    initParticles();

    // Smooth Render Loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const maxDist = 135;
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];

        // Draw connecting neural lines
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDist) {
            const lineAlpha = (1 - dist / maxDist) * 0.12;
            // Line color alternates between Blaze Orange and Glacier Blue
            ctx.strokeStyle = i % 2 === 0
              ? `rgba(241, 84, 25, ${lineAlpha})`
              : `rgba(119, 231, 254, ${lineAlpha * 1.2})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }

        // Mouse proximity pulse (Glacier Blue)
        const mdx = p1.x - mouse.x;
        const mdy = p1.y - mouse.y;
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mdist < mouse.radius) {
          const mouseAlpha = (1 - mdist / mouse.radius) * 0.35;
          ctx.strokeStyle = `rgba(119, 231, 254, ${mouseAlpha})`;
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();

          const angle = Math.atan2(mdy, mdx);
          const force = (mouse.radius - mdist) * 0.0006;
          p1.vx += Math.cos(angle) * force;
          p1.vy += Math.sin(angle) * force;
        }

        // Particle kinematics
        p1.x += p1.vx;
        p1.y += p1.vy;
        p1.vx *= 0.99;
        p1.vy *= 0.99;

        if (p1.x < 0) {
          p1.x = 0;
          p1.vx *= -1;
        } else if (p1.x > width) {
          p1.x = width;
          p1.vx *= -1;
        }
        if (p1.y < 0) {
          p1.y = 0;
          p1.vy *= -1;
        } else if (p1.y > height) {
          p1.y = height;
          p1.vy *= -1;
        }

        // Draw particle dot
        ctx.fillStyle = `${p1.color}${p1.alpha})`;
        ctx.beginPath();
        ctx.arc(p1.x, p1.y, p1.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none bg-[#0C0C0A]">
      {/* 1. Blaze Orange Ambient Volumetric Glow (Silky Smooth, No Grid) */}
      <div
        className="absolute -top-[12%] -left-[5%] w-[55vw] h-[55vw] max-w-[700px] max-h-[700px] rounded-full opacity-20 blur-[160px] animate-pulse"
        style={{
          background: "radial-gradient(circle, rgba(241, 84, 25, 0.45) 0%, rgba(241, 84, 25, 0.1) 50%, transparent 70%)",
          animationDuration: "9s",
        }}
      />

      {/* 2. Glacier Blue Ambient Volumetric Glow (Subtle & Atmospheric) */}
      <div
        className="absolute top-[35%] -right-[10%] w-[50vw] h-[50vw] max-w-[650px] max-h-[650px] rounded-full opacity-18 blur-[160px] animate-pulse"
        style={{
          background: "radial-gradient(circle, rgba(119, 231, 254, 0.35) 0%, rgba(119, 231, 254, 0.08) 50%, transparent 70%)",
          animationDuration: "12s",
          animationDelay: "3s",
        }}
      />

      {/* 3. Bottom Blaze Orange Horizon Glow */}
      <div
        className="absolute -bottom-[15%] left-[25%] w-[50vw] h-[50vw] max-w-[650px] max-h-[650px] rounded-full opacity-15 blur-[160px] animate-pulse"
        style={{
          background: "radial-gradient(circle, rgba(241, 84, 25, 0.3) 0%, transparent 65%)",
          animationDuration: "11s",
          animationDelay: "5s",
        }}
      />

      {/* Smooth Particle Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full opacity-75" />

      {/* Smooth Slate Vignette Mask (Blends Everything Seamlessly into Obsidian Black) */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, transparent 35%, #0C0C0A 92%)",
        }}
      />
    </div>
  );
}
