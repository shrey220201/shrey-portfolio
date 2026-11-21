"use client";

import React from "react";
import { GraduationCap, Award, Check } from "lucide-react";
import { educationList, certifications } from "@/content/credentials";
import { GlassCard } from "@/components/ui/GlassCard";
import { Reveal } from "@/components/motion/Reveal";
import { TiltCard } from "@/components/motion/TiltCard";

export function Credentials() {
  return (
    <section id="credentials" className="relative w-full py-12 md:py-16 px-6">
      <div className="mx-auto max-w-[1200px]">
        {/* Section Header */}
        <div className="mb-10 max-w-[720px]">
          <p className="eyebrow mb-3">FOUNDATION & CREDENTIALS</p>
          <h2 className="text-3xl font-semibold tracking-[-0.03em] sm:text-5xl md:text-6xl text-[var(--text-primary)]">
            Education & Certifications.
          </h2>
          <p className="mt-4 text-base text-[var(--text-secondary)] leading-relaxed">
            Formal academic background in network &amp; systems engineering and industry credentials across enterprise storage, infrastructure, and applied AI.
          </p>
        </div>

        {/* Two Columns: Education & Certifications */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Education Column (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-[var(--accent)] mb-2">
              <GraduationCap className="h-4 w-4" />
              <span>Academic Education</span>
            </div>

            {educationList.map((edu, idx) => (
              <Reveal key={idx} delay={idx * 0.1} duration={0.8}>
                <GlassCard className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-xs text-[var(--accent)] font-semibold">
                      {edu.date}
                    </span>
                    {edu.gpa && (
                      <span className="rounded-full border border-[var(--border)] bg-[var(--surface-glass)] px-2.5 py-0.5 font-mono text-[11px] text-[var(--text-primary)]">
                        GPA: {edu.gpa}
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg font-bold text-[var(--text-primary)]">
                    {edu.degree}
                  </h3>
                  <p className="font-mono text-xs text-[var(--text-secondary)] mt-1">
                    {edu.institution} · {edu.location}
                  </p>

                  {edu.focus && (
                    <p className="mt-4 text-xs text-[var(--text-secondary)] leading-relaxed border-t border-[var(--border)] pt-3">
                      {edu.focus}
                    </p>
                  )}
                </GlassCard>
              </Reveal>
            ))}
          </div>

          {/* Certifications Badge Wall (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-[var(--accent-2)] mb-2">
              <Award className="h-4 w-4" />
              <span>Certifications & Specialized Tracks</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {certifications.map((cert, idx) => {
                const isAI = cert.name.includes("AI Engineer");

                return (
                  <Reveal
                    key={idx}
                    delay={idx * 0.08}
                    duration={0.8}
                    className={isAI ? "sm:col-span-2" : ""}
                  >
                    <TiltCard maxTilt={4} className="h-full">
                      <GlassCard
                        className={`h-full p-5 flex flex-col justify-between ${
                          isAI
                            ? "border-[var(--accent-2)]/30 bg-gradient-to-r from-[var(--surface-glass)] to-[var(--accent-2)]/5"
                            : ""
                        }`}
                      >
                        <div>
                          {/* Monogram / Category Indicator */}
                          <div className="flex items-center justify-between mb-3">
                            <span className="flex h-7 w-7 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--bg-elevated)] font-mono text-xs font-bold text-[var(--text-primary)]">
                              {cert.name.charAt(0)}
                            </span>
                            <span className="font-mono text-[10px] text-[var(--text-secondary)]">
                              {cert.date}
                            </span>
                          </div>

                          <h4 className="text-sm font-semibold text-[var(--text-primary)] leading-snug">
                            {cert.name}
                          </h4>
                          <p className="font-mono text-[11px] text-[var(--accent)] mt-0.5">
                            {cert.issuer}
                            {cert.hours ? ` · ${cert.hours}` : ""}
                          </p>

                          {/* Skills Gained Tags */}
                          <div className="mt-4 space-y-1.5 border-t border-[var(--border)] pt-3">
                            {cert.skillsGained.map((skill, sIdx) => (
                              <div
                                key={sIdx}
                                className="flex items-center gap-1.5 text-[11px] text-[var(--text-secondary)]"
                              >
                                <Check className="h-3 w-3 text-[var(--accent-2)] shrink-0" />
                                <span>{skill}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </GlassCard>
                    </TiltCard>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
