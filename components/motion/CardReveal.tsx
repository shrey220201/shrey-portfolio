"use client";

import React, { useRef } from "react";
import { motion, useInView, Variants } from "framer-motion";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { useIntro } from "@/lib/intro";

interface CardRevealProps {
  children: React.ReactNode;
  index?: number;
  staggerOffset?: number;
  className?: string;
  enableHighlight?: boolean;
}

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 32,
    scale: 0.97,
  },
  visible: (customIdx: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.7,
      delay: customIdx * 0.14,
      ease: [0.16, 1, 0.3, 1],
      staggerChildren: 0.07,
      delayChildren: customIdx * 0.14 + 0.1,
    },
  }),
};

export function CardReveal({
  children,
  index = 0,
  staggerOffset = 0.14,
  className = "",
  enableHighlight = true,
}: CardRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const prefersReduced = useReducedMotion();
  const { introComplete } = useIntro();

  if (prefersReduced) {
    return <div className={className}>{children}</div>;
  }

  const shouldAnimate = isInView && introComplete;

  return (
    <div ref={ref} className={className}>
      <motion.div
        custom={index}
        variants={cardVariants}
        initial="hidden"
        animate={shouldAnimate ? "visible" : "hidden"}
        className="relative h-full w-full will-change-transform"
      >
        {enableHighlight && (
          <motion.div
            variants={{
              hidden: { scaleX: 0, opacity: 0 },
              visible: {
                scaleX: 1,
                opacity: 1,
                transition: {
                  duration: 0.8,
                  delay: index * staggerOffset + 0.08,
                  ease: [0.16, 1, 0.3, 1],
                },
              },
            }}
            className="pointer-events-none absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-[var(--accent)]/50 to-transparent origin-left z-20"
            aria-hidden="true"
          />
        )}
        {children}
      </motion.div>
    </div>
  );
}

const titleVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 14,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export function CardTitleReveal({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div variants={titleVariants} className={className}>
      {children}
    </motion.div>
  );
}

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 8,
    scale: 0.94,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.45,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export function CardItemReveal({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div variants={itemVariants} className={className}>
      {children}
    </motion.div>
  );
}
