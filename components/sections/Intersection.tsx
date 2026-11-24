"use client";

import React from "react";
import Link from "next/link";
import { Server, Cpu, ShieldCheck, ArrowRight, CheckCircle2 } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { CardReveal, CardTitleReveal, CardItemReveal } from "@/components/motion/CardReveal";

export function Intersection() {
  const steps = [
    {
      id: "infra",
      number: "01",
      title: "Enterprise Infrastructure",
      subtitle: "The Physical & Systems Foundation",
      icon: Server,
      badge: "Production Hardened",
      description:
        "QNAP NAS/SAN, RAID (0/1/5/6/10/50/60), NAKIVO, Veeam, VMware vSphere, Hyper-V, Proxmox, Active Directory, and CCNA-level networking.",
      details: [
        "Racking multi-bay storage arrays & tuning SSD cache policies",
        "Managing multi-server backup jobs with strict RTO/RPO SLAs",
        "Diagnosing live hypervisor and Linux storage bottlenecks via SSH",
      ],
      specs: "ZFS · RAID 60 · iSCSI · 10GbE SFP+ · VMware ESXi 8.0",
    },
    {
      id: "ai",
      number: "02",
      title: "Applied AI & Automation",
      subtitle: "Modern Agentic & LLM Engineering",
      icon: Cpu,
      badge: "Autonomous Systems",
      description:
        "RAG pipelines, LangGraph cyclic agents, QLoRA fine-tuning, RAGAS evaluation, n8n, and Microsoft Power Automate.",
      details: [
        "Fine-tuning open weights (Llama 3.2 1B) with 4-bit NF4 quantization on Modal",
        "Designing confidence-gated agentic state machines with human-in-the-loop triggers",
        "Building quantitative evaluation harnesses for faithfulness and retrieval precision",
      ],
      specs: "LangGraph · Modal GPUs · 4-bit NF4 · RAGAS · ChromaDB",
    },
    {
      id: "intersection",
      number: "03",
      title: "Infrastructure-Aware AI",
      subtitle: "The Fusion of Both Disciplines",
      icon: ShieldCheck,
      badge: "The Competitive Advantage",
      description:
        "AI systems grounded in real enterprise runbooks, gated by confidence, and escalated to a human engineer before anything destructive executes.",
      details: [
        "AI agents that understand hypervisor constraints, RAID risks, and network topologies",
        "Deterministic guardrails preventing unvetted CLI execution on production servers",
        "Grounded SOP playbooks preventing unverified execution on storage and backup targets",
      ],
      specs: "Confidence-Gated LangGraph · Deterministic CLI Sandbox",
    },
  ];

  return (
    <section id="intersection" className="relative w-full py-10 md:py-14 px-4 sm:px-8 lg:px-12 scroll-mt-20">
      <div className="mx-auto max-w-[1240px]">
        {/* Section Header */}
        <div className="mb-10 max-w-[760px]">
          <p className="eyebrow mb-2">CORE ARCHITECTURAL PHILOSOPHY</p>
          <h2 className="text-3xl font-bold tracking-[-0.035em] sm:text-4xl md:text-5xl text-[var(--text-primary)]">
            The Intersection.
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
            Most AI engineers have never racked a server or recovered a degraded RAID-60 volume. Most infrastructure engineers have never built a cyclic LangGraph state machine. <strong className="text-[var(--text-primary)] font-semibold">I bridge both domains.</strong>
          </p>
        </div>

        {/* 3-Pillar Clean Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isHighlighted = index === 2;

            return (
              <CardReveal key={step.id} index={index} className="h-full">
                <GlassCard
                  glow={isHighlighted ? "accent" : "none"}
                  className={`h-full flex flex-col justify-between backdrop-blur-xl ${
                    isHighlighted
                      ? "border-[#77E7FE]/50 bg-white/[0.03] shadow-lg shadow-[#77E7FE]/10"
                      : "border-white/10 bg-white/[0.015]"
                  }`}
                >
                  <div>
                    <CardItemReveal className="flex items-center justify-between mb-5">
                      <span className="font-mono text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                        DISCIPLINE {step.number}
                      </span>
                      <span
                        className={`inline-flex items-center rounded-md px-2 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider ${
                          isHighlighted
                            ? "bg-[#77E7FE]/15 text-[#77E7FE] border border-[#77E7FE]/40 shadow-[0_0_10px_rgba(119,231,254,0.2)]"
                            : "bg-white/[0.04] text-[#9E9E9C] border border-white/10"
                        }`}
                      >
                        {step.badge}
                      </span>
                    </CardItemReveal>

                    <div className="flex items-center gap-3 mb-4">
                      <CardItemReveal className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-[#141412] text-[#F15419]">
                        <Icon className="h-5 w-5" />
                      </CardItemReveal>
                      <CardTitleReveal>
                        <h3 className="text-lg font-bold text-[var(--text-primary)]">
                          {step.title}
                        </h3>
                        <p className="text-[11px] text-[var(--text-muted)] font-mono">
                          {step.subtitle}
                        </p>
                      </CardTitleReveal>
                    </div>

                    <CardItemReveal>
                      <p className="mt-3 text-xs sm:text-sm leading-relaxed text-[var(--text-secondary)]">
                        {step.description}
                      </p>
                    </CardItemReveal>

                    <ul className="mt-5 space-y-2 border-t border-[var(--border)] pt-5">
                      {step.details.map((detail, dIdx) => (
                        <CardItemReveal key={dIdx}>
                          <li className="flex items-start gap-2 text-xs text-[var(--text-secondary)]">
                            <CheckCircle2 className="h-3.5 w-3.5 shrink-0 mt-0.5 text-[var(--accent)]" />
                            <span>{detail}</span>
                          </li>
                        </CardItemReveal>
                      ))}
                    </ul>
                  </div>

                  <CardItemReveal className="mt-6 pt-4 border-t border-[var(--border)]">
                    <div className="font-mono text-[10px] text-[var(--text-muted)] uppercase tracking-wider mb-1">
                      TECHNOLOGY STACK
                    </div>
                    <div className="font-mono text-[11px] text-[var(--text-secondary)] font-medium">
                      {step.specs}
                    </div>
                  </CardItemReveal>
                </GlassCard>
              </CardReveal>
            );
          })}
        </div>

        {/* Synthesis Banner */}
        <div className="mt-8 rounded-xl border border-[var(--border-strong)] bg-[var(--bg-elevated)] p-5 flex flex-col md:flex-row items-center justify-between gap-5">
          <div className="flex items-center gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[var(--accent-muted)] text-[var(--accent)] border border-[var(--accent)]/20">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-[var(--text-primary)]">
                The Practical Outcome: Grounded Runbooks &amp; Guarded Execution
              </h4>
              <p className="text-xs text-[var(--text-secondary)] mt-0.5">
                Every AI agent pipeline is bounded by confidence gates (CONFIDENCE_THRESHOLD = 0.50), deterministic sandboxes, and human-in-the-loop escalation.
              </p>
            </div>
          </div>
          <Link
            href="/projects/runbook-copilot"
            className="inline-flex shrink-0 items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--bg-card)] px-4 py-2 font-mono text-xs font-semibold text-[var(--text-primary)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all cursor-pointer group shadow-sm active:scale-95"
          >
            <span>Inspect Runbook Copilot</span>
            <ArrowRight className="h-3.5 w-3.5 text-[var(--accent)] transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
