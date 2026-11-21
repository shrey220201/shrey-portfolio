"use client";

import React from "react";
import { impactStats } from "@/content/stats";
import { Counter } from "@/components/motion/Counter";
import { Reveal } from "@/components/motion/Reveal";

export function Stats() {
  return (
    <section className="w-full border-y border-[var(--border)] bg-[var(--surface-glass)] py-4 sm:py-5 px-4 sm:px-6 backdrop-blur-md">
      <div className="mx-auto max-w-[1200px]">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 sm:gap-6 text-center items-center">
          {impactStats.map((stat, idx) => (
            <Reveal
              key={idx}
              delay={idx * 0.05}
              duration={0.6}
              yOffset={10}
              className={idx === 4 ? "col-span-2 sm:col-span-1" : ""}
            >
              <div className="flex flex-col items-center justify-center py-1">
                <div className="font-mono text-xl sm:text-2xl lg:text-[1.65rem] font-bold tracking-tight text-[var(--text-primary)]">
                  <Counter
                    value={stat.value}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                    decimalPlaces={stat.decimalPlaces || 0}
                    duration={1.4 + idx * 0.1}
                  />
                </div>
                <div className="mt-0.5 font-mono text-[10px] sm:text-[11px] uppercase tracking-wider text-[var(--text-secondary)]">
                  {stat.label}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
