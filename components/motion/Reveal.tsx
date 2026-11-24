"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { useIntro } from "@/lib/intro";

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  yOffset?: number;
  className?: string;
  width?: "fit-content" | "100%";
}

export function Reveal({
  children,
  delay = 0,
  duration = 0.8,
  yOffset = 24,
  className = "",
  width = "100%",
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "0px" });
  const prefersReduced = useReducedMotion();
  const { introComplete } = useIntro();

  if (prefersReduced) {
    return <div className={className}>{children}</div>;
  }

  const shouldAnimate = isInView && introComplete;

  return (
    <div ref={ref} style={{ width }} className={className}>
      <motion.div
        variants={{
          hidden: { opacity: 0, y: yOffset },
          visible: { opacity: 1, y: 0 },
        }}
        initial="hidden"
        animate={shouldAnimate ? "visible" : "hidden"}
        transition={{
          duration,
          delay,
          ease: [0.16, 1, 0.3, 1] as const, // ease-out-expo
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
