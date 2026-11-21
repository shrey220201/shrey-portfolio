"use client";

import React, { useRef } from "react";
import { Calendar, MapPin, Award, CheckCircle2 } from "lucide-react";
import { experiences } from "@/content/experience";
import { GlassCard } from "@/components/ui/GlassCard";
import { Reveal } from "@/components/motion/Reveal";
import { motion, useScroll, useSpring } from "framer-motion";
import { useReducedMotion } from "@/lib/useReducedMotion";

export function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 70%", "end 60%"],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <section
      ref={containerRef}
      id="experience"
      className="relative w-full py-12 md:py-16 px-6 bg-[var(--bg-elevated)]/30 border-t border-[var(--border)]"
    >
      <div className="mx-auto max-w-[1200px]">
        {/* Section Header */}
        <Reveal duration={0.8}>
          <div className="mb-10 max-w-[720px]">
            <p className="eyebrow mb-3">WORK HISTORY</p>
            <h2 className="text-3xl font-semibold tracking-[-0.03em] sm:text-5xl md:text-6xl text-[var(--text-primary)]">
              Professional Experience.
            </h2>
            <p className="mt-4 text-base text-[var(--text-secondary)] leading-relaxed">
              Enterprise infrastructure engineering and client delivery, with rapid internal promotion based on technical troubleshooting and client impact.
            </p>
          </div>
        </Reveal>

        {/* Vertical Timeline with Scroll Draw */}
        <div className="relative pl-6 sm:pl-10 space-y-8 ml-3 sm:ml-6">
          {/* Background rail */}
          <div
            className="absolute left-0 top-3 bottom-3 w-[2px] bg-[var(--border)]"
            aria-hidden="true"
          />

          {/* Animated drawing line */}
          {!prefersReduced && (
            <motion.div
              style={{ scaleY, originY: 0 }}
              className="absolute left-0 top-3 bottom-3 w-[2px] bg-gradient-to-b from-[var(--accent)] via-[var(--accent-2)] to-[var(--accent)] will-change-transform"
              aria-hidden="true"
            />
          )}

          {experiences.map((exp, index) => {
            const isLatest = index === 0;

            return (
              <Reveal key={exp.id} delay={index * 0.1} duration={0.8} yOffset={24}>
                <div className="relative group">
                  {/* Timeline node */}
                  <span
                    className={`absolute -left-[31px] sm:-left-[47px] top-1.5 flex h-4 w-4 items-center justify-center rounded-full border-2 transition-transform duration-300 group-hover:scale-125 ${
                      isLatest
                        ? "border-[var(--accent)] bg-[var(--bg)] shadow-[0_0_10px_var(--accent)]"
                        : "border-[var(--text-secondary)] bg-[var(--bg)]"
                    }`}
                  >
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${
                        isLatest ? "bg-[var(--accent)]" : "bg-[var(--text-secondary)]"
                      }`}
                    />
                  </span>

                  {/* Experience Card */}
                  <GlassCard className="p-6 sm:p-8">
                    {/* Top Metadata */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-[var(--text-primary)]">
                          {exp.role}
                        </h3>
                        <p className="font-mono text-sm text-[var(--accent)] font-medium">
                          {exp.company}
                        </p>
                      </div>

                      <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-[var(--text-secondary)]">
                        <span className="flex items-center gap-1.5">
                          <Calendar className="h-3.5 w-3.5" />
                          {exp.period}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <MapPin className="h-3.5 w-3.5" />
                          {exp.location}
                        </span>
                      </div>
                    </div>

                    {/* Promoted Badge */}
                    {exp.promotedBadge && (
                      <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--success-led)]/40 bg-[var(--success-led)]/10 px-3 py-1 font-mono text-xs font-semibold text-[var(--success-led)]">
                        <Award className="h-3.5 w-3.5" />
                        <span>{exp.promotedBadge}</span>
                      </div>
                    )}

                    {/* Highlights List */}
                    <ul className="space-y-3">
                      {exp.highlights.map((item, hIdx) => (
                        <li
                          key={hIdx}
                          className="flex items-start gap-3 text-sm text-[var(--text-secondary)] leading-relaxed"
                        >
                          <CheckCircle2 className="h-4 w-4 shrink-0 text-[var(--accent)] mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </GlassCard>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
