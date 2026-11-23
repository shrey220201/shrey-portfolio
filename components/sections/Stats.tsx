"use client";

import React from "react";
import { impactStats } from "@/content/stats";
import { Counter } from "@/components/motion/Counter";
import { Reveal } from "@/components/motion/Reveal";

export function Stats() {
  return (
    <div className="w-full py-4 sm:py-6 px-4 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-[1240px]">
        {/* Verified Telemetry Bar */}
        <div className="mb-3 flex items-center justify-between border-b border-[var(--border)] pb-2 font-mono text-[10px] uppercase tracking-wider text-[var(--text-muted)]">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
            <span className="text-[var(--text-secondary)]">VERIFIED PRODUCTION TELEMETRY</span>
          </div>
          <span className="hidden sm:inline">SOURCE: ITCG SOLUTIONS INFRASTRUCTURE &amp; EVAL BENCHMARKS</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 divide-y md:divide-y-0 md:divide-x divide-[var(--border)] text-left">
          {impactStats.map((stat, idx) => (
            <Reveal
              key={idx}
              delay={idx * 0.05}
              duration={0.6}
              yOffset={10}
              className={idx === 4 ? "col-span-2 sm:col-span-1" : ""}
            >
              <div className="p-3 sm:px-4 sm:py-2 flex flex-col justify-between h-full">
                <div className="font-mono text-2xl sm:text-3xl font-bold tracking-tight text-[var(--text-primary)]">
                  <Counter
                    value={stat.value}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                    decimalPlaces={stat.decimalPlaces || 0}
                    duration={1.2 + idx * 0.1}
                  />
                </div>
                <div className="mt-1 font-mono text-[11px] font-semibold uppercase tracking-wider text-[var(--text-secondary)]">
                  {stat.label}
                </div>
                <div className="mt-0.5 text-[11px] text-[var(--text-muted)] leading-tight">
                  {idx === 0 && "Across QNAP & ZFS enterprise pools"}
                  {idx === 1 && "High-availability virtualization cluster"}
                  {idx === 2 && "QLoRA Llama 3.2 1B NF4 on Modal"}
                  {idx === 3 && "Recovery Time Objective (RTO) SLA"}
                  {idx === 4 && "Critical SSH bare-metal root causes"}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}
