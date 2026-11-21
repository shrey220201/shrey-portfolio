import React from "react";
import Link from "next/link";
import { ArrowRight, Layers, Terminal, Cpu } from "lucide-react";
import { Hero } from "@/components/sections/Hero";
import { Stats } from "@/components/sections/Stats";
import { Intersection } from "@/components/sections/Intersection";
import { RunbookCopilot } from "@/components/sections/RunbookCopilot";
import { Skills } from "@/components/sections/Skills";
import { Contact } from "@/components/sections/Contact";
import { GlassCard } from "@/components/ui/GlassCard";
import { Reveal } from "@/components/motion/Reveal";

export default function HomePage() {
  const exploreCards = [
    {
      title: "Projects & Architectures",
      tagline: "7 Production Case Studies",
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
      accent: "var(--accent-2)",
      cta: "Inspect Skills Matrix",
    },
  ];

  return (
    <div className="flex flex-col w-full">
      {/* 1. Hero: Dominant Typography, Apple-Inspired Aesthetic & 3D Interactive Rack */}
      <Hero />

      {/* 2. Impact Stats: Compact Key Metrics Strip */}
      <Stats />

      {/* 3. The Intersection: Infrastructure ⇄ Applied AI */}
      <Intersection />

      {/* 4. Flagship Project: Runbook Copilot */}
      <RunbookCopilot />

      {/* 5. Technical Skills Matrix */}
      <Skills />

      {/* 6. Deep-Dive Portal Bento Grid */}
      <section className="relative w-full py-12 md:py-16 px-6 border-t border-[var(--border)] bg-[var(--surface-glass)]">
        <div className="mx-auto max-w-[1200px]">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <p className="eyebrow mb-2">PORTFOLIO EXPLORATION</p>
              <h2 className="text-3xl font-semibold tracking-[-0.03em] sm:text-4xl md:text-5xl text-[var(--text-primary)]">
                Dive Deeper.
              </h2>
              <p className="mt-2 text-sm sm:text-base text-[var(--text-secondary)]">
                Explore dedicated sections categorized by discipline and outcomes.
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
                <Reveal key={idx} delay={idx * 0.08} duration={0.7}>
                  <Link href={card.href} className="group block h-full">
                    <GlassCard className="h-full p-6 flex flex-col justify-between transition-all duration-300 group-hover:border-[var(--border-strong)] group-hover:-translate-y-1">
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <div
                            className="flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--bg-elevated)]"
                            style={{ color: card.accent }}
                          >
                            <Icon className="h-5 w-5" />
                          </div>
                          <span className="font-mono text-[11px] text-[var(--text-secondary)]">
                            {card.tagline}
                          </span>
                        </div>

                        <h3 className="text-xl font-bold text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors mb-2">
                          {card.title}
                        </h3>

                        <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                          {card.description}
                        </p>
                      </div>

                      <div className="mt-6 pt-4 border-t border-[var(--border)] flex items-center justify-between font-mono text-xs text-[var(--text-primary)]">
                        <span>{card.cta}</span>
                        <ArrowRight className="h-3.5 w-3.5 transform transition-transform group-hover:translate-x-1 text-[var(--accent)]" />
                      </div>
                    </GlassCard>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. Contact Section */}
      <Contact />
    </div>
  );
}
