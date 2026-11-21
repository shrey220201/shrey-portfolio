"use client";

import React, { useRef } from "react";
import { Calendar, MapPin, Award, CheckCircle2 } from "lucide-react";
import { experiences } from "@/content/experience";
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
      className="relative w-full py-16 px-6 bg-[var(--bg-elevated)] border-t border-[var(--border)]"
    >
      <div className="mx-auto max-w-[1240px]">
        {/* Section Header */}
        <Reveal duration={0.8}>
          <div className="mb-12 max-w-[760px]">
            <p className="eyebrow mb-2">CAREER &amp; CLIENT DELIVERY LOG</p>
            <h2 className="text-3xl font-bold tracking-[-0.035em] sm:text-5xl md:text-6xl text-[var(--text-primary)]">
              Work History.
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
              Enterprise infrastructure engineering and client systems delivery at ITCG Solutions, with internal promotion driven by emergency live troubleshooting and zero-data-loss execution.
            </p>
          </div>
        </Reveal>

        {/* Vertical Timeline with Industrial Rail */}
        <div className="relative pl-6 sm:pl-10 space-y-10 ml-2 sm:ml-4">
          {/* Background rail */}
          <div
            className="absolute left-0 top-3 bottom-3 w-[2px] bg-[var(--border)]"
            aria-hidden="true"
          />

          {/* Animated drawing line */}
          {!prefersReduced && (
            <motion.div
              style={{ scaleY, originY: 0 }}
              className="absolute left-0 top-3 bottom-3 w-[2px] bg-[var(--accent)] will-change-transform"
              aria-hidden="true"
            />
          )}

          {experiences.map((exp, index) => {
            const isLatest = index === 0;

            return (
              <Reveal key={exp.id} delay={index * 0.1} duration={0.8} yOffset={20}>
                <div className="relative group">
                  {/* Timeline node */}
                  <span
                    className={`absolute -left-[31px] sm:-left-[47px] top-2 flex h-4 w-4 items-center justify-center rounded-full border-2 transition-transform duration-300 ${
                      isLatest
                        ? "border-[var(--accent)] bg-[var(--bg)] shadow-[0_0_8px_var(--accent)]"
                        : "border-[var(--border-strong)] bg-[var(--bg)]"
                    }`}
                  >
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${
                        isLatest ? "bg-[var(--accent)]" : "bg-[var(--text-muted)]"
                      }`}
                    />
                  </span>

                  {/* Experience Card */}
                  <div
                    className={`rounded-2xl border bg-[var(--bg-card)] p-6 sm:p-8 transition-all duration-300 hover:border-[var(--border-strong)] ${
                      isLatest ? "border-[var(--border-strong)]" : "border-[var(--border)]"
                    }`}
                  >
                    {/* Role Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-[var(--border)] pb-4 mb-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--text-primary)]">
                            {exp.role}
                          </h3>
                          {exp.current && (
                            <span className="rounded border border-[var(--accent)]/30 bg-[var(--accent-muted)] px-2 py-0.5 font-mono text-[10px] text-[var(--accent)] font-semibold">
                              ACTIVE ROLE
                            </span>
                          )}
                        </div>
                        <div className="mt-1 font-mono text-xs text-[var(--accent)] font-semibold">
                          {exp.company}
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-[var(--text-muted)]">
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

                    {/* Promotion highlight callout */}
                    {exp.promotedBadge && (
                      <div className="mb-4 inline-flex items-center gap-2 rounded-lg border border-[var(--accent)]/30 bg-[var(--accent-muted)] px-3 py-1.5 font-mono text-xs text-[var(--accent)] font-semibold">
                        <Award className="h-4 w-4 shrink-0" />
                        <span>{exp.promotedBadge}</span>
                      </div>
                    )}

                    {/* Highlights List */}
                    <ul className="space-y-2.5 pt-2">
                      {exp.highlights.map((item, aIdx) => (
                        <li key={aIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                          <CheckCircle2 className="h-4 w-4 shrink-0 text-[var(--accent)] mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
