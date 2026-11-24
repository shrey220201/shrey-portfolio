"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Layers, Terminal, Cpu } from "lucide-react";
import { Hero } from "@/components/sections/Hero";
import { Stats } from "@/components/sections/Stats";
import { Intersection } from "@/components/sections/Intersection";
import { RunbookCopilot } from "@/components/sections/RunbookCopilot";
import { ExperienceBrief } from "@/components/sections/ExperienceBrief";
import { SkillsBrief } from "@/components/sections/SkillsBrief";
import { Contact } from "@/components/sections/Contact";
import { GlassCard } from "@/components/ui/GlassCard";
import { CardReveal, CardTitleReveal, CardItemReveal } from "@/components/motion/CardReveal";

export default function HomePage() {
  const exploreCards = [
    {
      title: "Projects & Architectures",
      tagline: "Case Studies",
      description:
        "Multi-bay QNAP SAN/NAS arrays, dual-region enterprise capstone, hybrid RAG pipelines, and QLoRA fine-tuning.",
      href: "/projects",
      icon: Layers,
      accent: "var(--accent)",
      cta: "Explore All Projects",
    },
    {
      title: "Experience & Incident Triage",
      tagline: "Track Record & Field Notes",
      description:
        "Rapid promotion at ITCG Solutions, real incident triage under live pressure, and formal credentials from Conestoga & NAKIVO.",
      href: "/experience",
      icon: Terminal,
      accent: "var(--success-led)",
      cta: "View Career History",
    },
    {
      title: "Technical Skills Matrix",
      tagline: "10-Category Verified Stack",
      description:
        "The balance of bare-metal enterprise storage, multi-hypervisor virtualization, and modern applied LLM / agent engineering.",
      href: "/skills",
      icon: Cpu,
      accent: "var(--accent)",
      cta: "Inspect Skills Matrix",
    },
  ];

  return (
    <div className="relative flex flex-col w-full overflow-hidden">
      {/* 1. Hero: Dominant Typography, Holographic 3D Interactive Cyber Core */}
      <Hero />

      {/* Smooth Slate Section Divider */}
      <div className="relative w-full h-[1px] bg-gradient-to-r from-transparent via-[#F15419]/30 to-transparent my-2" />

      {/* 2. Impact Stats: Compact Key Metrics Strip */}
      <Stats />

      {/* Smooth Slate Section Divider */}
      <div className="relative w-full h-[1px] bg-gradient-to-r from-transparent via-[#77E7FE]/20 to-transparent my-4" />

      {/* 3. The Intersection: Infrastructure ⇄ Applied AI */}
      <Intersection />

      {/* Smooth Slate Section Divider */}
      <div className="relative w-full h-[1px] bg-gradient-to-r from-transparent via-[#F15419]/25 to-transparent my-6" />

      {/* 4. Flagship Project: Runbook Copilot */}
      <RunbookCopilot />

      {/* Smooth Slate Section Divider */}
      <div className="relative w-full h-[1px] bg-gradient-to-r from-transparent via-[#77E7FE]/20 to-transparent my-6" />

      {/* 5. Career & Experience Brief */}
      <ExperienceBrief />

      {/* Smooth Slate Section Divider */}
      <div className="relative w-full h-[1px] bg-gradient-to-r from-transparent via-[#F15419]/25 to-transparent my-6" />

      {/* 6. Technical Skills Domains */}
      <SkillsBrief />

      {/* Smooth Slate Section Divider */}
      <div className="relative w-full h-[1px] bg-gradient-to-r from-transparent via-[#F15419]/25 to-transparent my-6" />

      {/* 6. Deep-Dive Portal Bento Grid */}
      <section className="relative w-full py-12 md:py-16 px-4 sm:px-6 lg:px-12">
        <div className="mx-auto max-w-[1240px]">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <p className="eyebrow mb-2">PORTFOLIO EXPLORATION</p>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl text-[var(--text-primary)]">
                Dive Deeper.
              </h2>
              <p className="mt-2 text-sm sm:text-base text-[var(--text-secondary)]">
                Explore dedicated production case studies, incident field notes, and complete career history.
              </p>
            </div>

            <Link
              href="/projects"
              className="inline-flex items-center gap-1.5 font-mono text-xs text-[var(--accent)] hover:underline"
            >
              <span>View full catalog</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {exploreCards.map((card, idx) => {
              const Icon = card.icon;
              return (
                <CardReveal key={idx} index={idx} className="h-full">
                  <Link href={card.href} className="group block h-full">
                    <GlassCard className="h-full p-6 flex flex-col justify-between transition-all duration-300 group-hover:border-[var(--border-focus)] group-hover:-translate-y-1 bg-white/[0.02] backdrop-blur-xl">
                      <div>
                        <CardItemReveal className="flex items-center justify-between mb-4">
                          <div
                            className="flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--border)] bg-black/40"
                            style={{ color: card.accent }}
                          >
                            <Icon className="h-5 w-5" />
                          </div>
                          <span className="font-mono text-[11px] text-[var(--text-secondary)]">
                            {card.tagline}
                          </span>
                        </CardItemReveal>

                        <CardTitleReveal>
                          <h3 className="text-xl font-bold text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors mb-2">
                            {card.title}
                          </h3>
                        </CardTitleReveal>

                        <CardItemReveal>
                          <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                            {card.description}
                          </p>
                        </CardItemReveal>
                      </div>

                      <CardItemReveal className="mt-6 pt-4 border-t border-[var(--border)] flex items-center justify-between font-mono text-xs text-[var(--text-primary)]">
                        <span>{card.cta}</span>
                        <ArrowRight className="h-3.5 w-3.5 transform transition-transform group-hover:translate-x-1 text-[var(--accent)]" />
                      </CardItemReveal>
                    </GlassCard>
                  </Link>
                </CardReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Smooth Slate Section Divider */}
      <div className="relative w-full h-[1px] bg-gradient-to-r from-transparent via-[#F15419]/30 to-transparent my-6" />

      {/* 7. Contact Section */}
      <Contact />
    </div>
  );
}
