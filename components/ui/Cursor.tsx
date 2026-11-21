"use client";

import React, { useEffect, useState } from "react";
import { siteConfig } from "@/content/site";
import { useReducedMotion } from "@/lib/useReducedMotion";

export function CustomCursor() {
  const prefersReduced = useReducedMotion();
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(true);

  useEffect(() => {
    if (!siteConfig.flags.enableCustomCursor || prefersReduced) return;

    // Detect if primary pointer is touch
    const hasTouch = window.matchMedia("(pointer: coarse)").matches;
    setIsTouchDevice(hasTouch);

    if (hasTouch) return;

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const isInteractive = target.closest(
        'a, button, [role="button"], input, textarea, select, .interactive-hover'
      );
      setIsHovered(!!isInteractive);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("mouseover", handleMouseOver, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [isVisible, prefersReduced]);

  if (!siteConfig.flags.enableCustomCursor || isTouchDevice || prefersReduced || !isVisible) {
    return null;
  }

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-50 transition-transform duration-100 ease-out will-change-transform"
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
      }}
    >
      <div
        className={`-translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-200 ease-out ${
          isHovered
            ? "h-8 w-8 bg-[var(--accent)]/20 border border-[var(--accent)] backdrop-blur-[2px]"
            : "h-2.5 w-2.5 bg-[var(--accent)] shadow-[0_0_8px_var(--accent)]"
        }`}
      />
    </div>
  );
}
