"use client";

import React, { useRef, useState } from "react";
import { motion, useSpring } from "framer-motion";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { siteConfig } from "@/content/site";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
  onClick?: () => void;
}

export function TiltCard({
  children,
  className = "",
  maxTilt = 6, // max 6 degrees as per brief
  onClick,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  // Smooth springs for rotation
  const rotateX = useSpring(0, { damping: 25, stiffness: 200 });
  const rotateY = useSpring(0, { damping: 25, stiffness: 200 });

  if (prefersReduced) {
    return (
      <div onClick={onClick} className={className}>
        {children}
      </div>
    );
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();

    // Normalized coordinates (-1 to 1)
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    // Invert Y for natural tilt
    rotateX.set(-y * maxTilt);
    rotateY.set(x * maxTilt);

    // Track local coordinates for spotlight effect
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className={`relative perspective-1000 ${className}`}
    >
      {/* Optional Spotlight glow inside card border */}
      {siteConfig.flags.enableSpotlight && isHovered && (
        <div
          className="pointer-events-none absolute -inset-px rounded-[inherit] opacity-60 transition-opacity duration-300"
          style={{
            background: `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(41, 151, 255, 0.12), transparent 80%)`,
          }}
          aria-hidden="true"
        />
      )}
      {children}
    </motion.div>
  );
}
