"use client";

import React, { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { useReducedMotion } from "@/lib/useReducedMotion";

interface CounterProps {
  value: number;
  suffix?: string;
  prefix?: string;
  decimalPlaces?: number;
  duration?: number;
  className?: string;
}

export function Counter({
  value,
  suffix = "",
  prefix = "",
  decimalPlaces = 0,
  duration = 1.6,
  className = "",
}: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const prefersReduced = useReducedMotion();

  const finalFormatted = value.toFixed(decimalPlaces);
  // SSR initial state renders the final number so no-JS users and search engines see the true value
  const [displayValue, setDisplayValue] = useState<string>(finalFormatted);
  const hasMounted = useRef(false);

  useEffect(() => {
    // On client mount, if not already in view and animations enabled, set to 0 to prepare for in-view animation
    if (!hasMounted.current) {
      hasMounted.current = true;
      if (!isInView && !prefersReduced) {
        setDisplayValue((0).toFixed(decimalPlaces));
      }
    }
  }, [isInView, prefersReduced, decimalPlaces]);

  useEffect(() => {
    if (!isInView || prefersReduced) {
      if (prefersReduced) setDisplayValue(finalFormatted);
      return;
    }

    let startTime: number | null = null;
    let animationFrameId: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);

      // Easing: ease-out-expo
      const easedProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const current = easedProgress * value;

      setDisplayValue(current.toFixed(decimalPlaces));

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        setDisplayValue(finalFormatted);
      }
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isInView, value, decimalPlaces, duration, prefersReduced, finalFormatted]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {displayValue}
      {suffix}
    </span>
  );
}
