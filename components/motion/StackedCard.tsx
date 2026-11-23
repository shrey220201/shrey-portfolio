"use client";

import React from "react";
import { motion } from "framer-motion";

interface StackedCardProps {
  id: string;
  index: number;
  total?: number;
  label: string;
  category: string;
  children: React.ReactNode;
  className?: string;
  topOffset?: string;
}

export function StackedCard({
  id,
  index,
  total = 6,
  label,
  category,
  children,
  className = "",
  topOffset,
}: StackedCardProps) {
  const padIndex = String(index).padStart(2, "0");
  const padTotal = String(total).padStart(2, "0");

  // Calculate dynamic sticky top offset so cards have a clean stacked margin
  const calculatedTop = topOffset || `calc(4.5rem + ${index * 12}px)`;

  return (
    <section
      id={id}
      className={`sticky w-full transition-all duration-300 ${className}`}
      style={{
        top: calculatedTop,
        zIndex: 10 + index,
      }}
    >
      <div className="mx-auto w-full max-w-[1300px] px-3 sm:px-6 mb-16 sm:mb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full rounded-2xl sm:rounded-3xl border border-[var(--border-strong)] bg-[var(--bg-elevated)]/95 p-5 sm:p-8 md:p-10 backdrop-blur-2xl shadow-[0_-15px_40px_-10px_rgba(0,0,0,0.6)] transition-all duration-300 hover:border-[var(--border-focus)] overflow-hidden"
        >
          {/* Top Card Ambient Gradient Highlight */}
          <div
            className="absolute -top-24 left-1/2 -translate-x-1/2 h-40 w-3/4 max-w-[800px] rounded-full opacity-15 pointer-events-none blur-3xl"
            style={{
              background:
                index % 2 === 0
                  ? "radial-gradient(circle, rgba(41, 151, 255, 0.5) 0%, transparent 70%)"
                  : "radial-gradient(circle, rgba(48, 209, 88, 0.4) 0%, transparent 70%)",
            }}
          />

          {/* Card Top Deck Index Bar */}
          <div className="relative z-10 mb-6 flex items-center justify-between border-b border-[var(--border)] pb-3 font-mono text-[11px]">
            <div className="flex items-center gap-2">
              <span className="flex h-1.5 w-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
              <span className="font-bold text-[var(--accent)] tracking-wider">
                {`[${padIndex} / ${padTotal}]`}
              </span>
              <span className="text-[var(--text-muted)]">·</span>
              <span className="font-semibold uppercase text-[var(--text-primary)]">
                {label}
              </span>
            </div>

            <div className="flex items-center gap-3 text-[10px] text-[var(--text-muted)]">
              <span className="hidden sm:inline-block tracking-wider uppercase">
                {category}
              </span>
              <span className="rounded border border-[var(--border)] bg-black/30 px-2 py-0.5 text-[9px] text-[var(--text-secondary)]">
                TIER_{padIndex}
              </span>
            </div>
          </div>

          {/* Card Content */}
          <div className="relative z-10 w-full">{children}</div>
        </motion.div>
      </div>
    </section>
  );
}
