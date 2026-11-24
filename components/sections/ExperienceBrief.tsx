"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Calendar, MapPin, Award, CheckCircle2, ShieldCheck } from "lucide-react";
import { experiences } from "@/content/experience";
import { GlassCard } from "@/components/ui/GlassCard";
import { CardReveal, CardTitleReveal, CardItemReveal } from "@/components/motion/CardReveal";

export function ExperienceBrief() {
  const primaryExperiences = experiences.slice(0, 2);

  return (
    <section id="experience" className="relative w-full py-12 md:py-16 px-4 sm:px-8 lg:px-12 scroll-mt-20">
      <div className="mx-auto max-w-[1240px]">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div className="max-w-[760px]">
            <p className="eyebrow mb-2">CAREER &amp; CLIENT DELIVERY LOG</p>
            <h2 className="text-3xl font-bold tracking-[-0.035em] sm:text-5xl md:text-6xl text-[var(--text-primary)]">
              Experience.
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
              Enterprise infrastructure engineering and client systems delivery at ITCG Solutions, with rapid internal promotion driven by emergency incident triage and zero-data-loss execution.
            </p>
          </div>

          <Link
            href="/experience"
            className="inline-flex items-center gap-1.5 font-mono text-xs text-[var(--accent)] hover:underline shrink-0 group"
          >
            <span>View full career &amp; incident notes</span>
            <ArrowRight className="h-3.5 w-3.5 transform transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Featured Experience Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {primaryExperiences.map((exp, idx) => {
            const isCurrent = exp.current;

            return (
              <CardReveal key={exp.id} index={idx} className="h-full">
                <GlassCard className="h-full p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:border-[var(--border-strong)] bg-white/[0.02]">
                  <div>
                    {/* Header: Role & Status Badge */}
                    <div className="flex items-start justify-between gap-3 mb-4">
                      <CardTitleReveal>
                        <h3 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)]">
                          {exp.role}
                        </h3>
                        <p className="text-sm font-semibold text-[var(--accent)] mt-0.5">
                          {exp.company}
                        </p>
                      </CardTitleReveal>

                      <CardItemReveal>
                        {isCurrent ? (
                          <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--success-led)]/40 bg-[var(--success-led)]/10 px-2.5 py-0.5 font-mono text-[10px] font-semibold text-[var(--success-led)] shrink-0">
                            <span className="h-1.5 w-1.5 rounded-full bg-[var(--success-led)] animate-pulse" />
                            ACTIVE
                          </span>
                        ) : exp.promotedBadge ? (
                          <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--accent)]/40 bg-[var(--accent)]/10 px-2.5 py-0.5 font-mono text-[10px] font-semibold text-[var(--accent)] shrink-0">
                            <Award className="h-3 w-3" />
                            PROMOTED IN 2 MO
                          </span>
                        ) : null}
                      </CardItemReveal>
                    </div>

                    {/* Metadata: Period & Location */}
                    <CardItemReveal className="flex flex-wrap items-center gap-y-1 gap-x-4 font-mono text-xs text-[var(--text-muted)] pb-4 mb-4 border-b border-[var(--border)]">
                      <span className="inline-flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5 text-[var(--glacier)]" />
                        {exp.period}
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <MapPin className="h-3.5 w-3.5 text-[var(--text-muted)]" />
                        {exp.location}
                      </span>
                    </CardItemReveal>

                    {/* Key Selected Highlights */}
                    <ul className="space-y-2.5 text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                      {exp.highlights.slice(0, 3).map((hl, hIdx) => (
                        <CardItemReveal key={hIdx}>
                          <li className="flex items-start gap-2.5">
                            <CheckCircle2 className="h-4 w-4 text-[var(--accent)] shrink-0 mt-0.5" />
                            <span>{hl}</span>
                          </li>
                        </CardItemReveal>
                      ))}
                    </ul>
                  </div>

                  {/* Card Bottom CTA */}
                  <CardItemReveal className="mt-6 pt-4 border-t border-[var(--border)] flex items-center justify-between font-mono text-xs text-[var(--text-muted)]">
                    <span>
                      {exp.highlights.length > 3 ? `+${exp.highlights.length - 3} more technical achievements` : "Production Certified"}
                    </span>
                    <Link
                      href="/experience"
                      className="inline-flex items-center gap-1 text-[var(--accent)] hover:underline font-semibold"
                    >
                      <span>Read notes</span>
                      <ArrowRight className="h-3 w-3" />
                    </Link>
                  </CardItemReveal>
                </GlassCard>
              </CardReveal>
            );
          })}
        </div>

        {/* Foundations & Fast-track Bar */}
        <CardReveal index={2} enableHighlight={false} className="mt-6">
          <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-elevated)] p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 font-mono text-xs text-[var(--text-muted)]">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-[var(--glacier)] shrink-0" />
              <span>
                Prior Software Foundations: Frontend &amp; Web Development Internships at Nupur Software &amp; URO Web-soft Solutions (ASP.NET, AngularJS, SQL).
              </span>
            </div>

            <Link
              href="/experience"
              className="text-[var(--glacier)] hover:underline whitespace-nowrap font-semibold flex items-center gap-1"
            >
              <span>Explore complete field record</span>
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </CardReveal>
      </div>
    </section>
  );
}
