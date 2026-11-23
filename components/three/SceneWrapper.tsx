"use client";

import React, { Suspense, useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { useReducedMotion } from "@/lib/useReducedMotion";

interface SceneWrapperProps {
  children: React.ReactNode;
  cameraPosition?: [number, number, number];
  fov?: number;
  className?: string;
  fallbackText?: string;
}

export function SceneWrapper({
  children,
  cameraPosition = [0, 0, 5],
  fov = 45,
  className = "h-full w-full",
  fallbackText = "Loading 3D interactive...",
}: SceneWrapperProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);
  const prefersReduced = useReducedMotion();

  // Pause rendering when off-screen via IntersectionObserver
  useEffect(() => {
    if (typeof window === "undefined" || !containerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
      {isVisible ? (
        <Suspense
          fallback={
            <div className="flex h-full w-full flex-col items-center justify-center p-6 text-center">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-[var(--border)] border-t-[var(--accent)]" />
              <span className="mt-3 font-mono text-xs text-[var(--text-secondary)]">
                {fallbackText}
              </span>
            </div>
          }
        >
          <Canvas
            dpr={[1, 1.5]} // Capped at 1.5 as required by guidelines
            frameloop={prefersReduced ? "demand" : "always"}
            camera={{ position: cameraPosition, fov }}
            gl={{
              antialias: true,
              alpha: true,
              powerPreference: "high-performance",
              failIfMajorPerformanceCaveat: false,
            }}
            style={{ touchAction: "none" }}
          >
            {children}
          </Canvas>
        </Suspense>
      ) : (
        <div className="h-full w-full bg-[var(--surface-glass)] opacity-50" />
      )}
    </div>
  );
}
