"use client";

import React from "react";
import { Server, Cpu, ShieldCheck, ArrowRight, CheckCircle2 } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";

export function Intersection() {
  const steps = [
    {
      id: "infra",
      number: "01",
      title: "Enterprise Infrastructure",
      subtitle: "The Physical & Systems Foundation",
      icon: Server,
      accentColor: "var(--accent)",
      badge: "Production Hardened",
      description:
        "QNAP NAS/SAN, RAID (0/1/5/6/10/50/60), NAKIVO, Veeam, VMware vSphere, Hyper-V, Proxmox, Active Directory, and CCNA-level networking.",
      details: [
        "Racking multi-bay storage arrays & tuning SSD cache policies",
        "Managing multi-server backup jobs with strict RTO/RPO SLAs",
        "Diagnosing live hypervisor and Linux storage bottlenecks via SSH",
      ],
    },
    {
      id: "ai",
      number: "02",
      title: "Applied AI & Automation",
      subtitle: "Modern Agentic & LLM Engineering",
      icon: Cpu,
      accentColor: "var(--accent-2)",
      badge: "Autonomous Systems",
      description:
        "RAG pipelines, LangGraph cyclic agents, QLoRA fine-tuning, RAGAS evaluation, n8n, and Microsoft Power Automate.",
      details: [
        "Fine-tuning open weights (Llama 3.2 1B) with 4-bit NF4 quantization on Modal",
        "Designing confidence-gated agentic state machines with human-in-the-loop triggers",
        "Building quantitative evaluation harnesses for faithfulness and retrieval precision",
      ],
    },
    {
      id: "intersection",
      number: "03",
      title: "Infrastructure-Aware AI",
      subtitle: "The Fusion of Both Disciplines",
      icon: ShieldCheck,
      accentColor: "var(--accent-2)",
      badge: "The Competitive Advantage",
      description:
        "AI systems grounded in real enterprise runbooks, gated by confidence, and escalated to a human before anything destructive runs.",
      details: [
        "AI agents that understand hypervisor constraints, RAID risks, and network topologies",
        "Deterministic guardrails preventing unvetted CLI execution on production servers",
        "Closing adversarial prompt injection vectors before agents touch critical systems",
      ],
    },
  ];

  return (
    <section
      id="intersection"
      className="relative w-full py-12 md:py-16 px-6 border-t border-[var(--border)]/60"
    >
      <div className="mx-auto max-w-[1200px]">
        {/* Section Header */}
        <div className="mb-8 max-w-[760px]">
          <p className="eyebrow mb-3">CORE PHILOSOPHY</p>
          <h2 className="text-3xl font-semibold tracking-[-0.03em] sm:text-4xl md:text-5xl text-[var(--text-primary)]">
            The Intersection.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed">
            Most AI engineers have never racked a server or debugged a RAID volume. Most infrastructure engineers have never built a guarded LangGraph agent. <strong className="text-[var(--text-primary)] font-medium">Shrey bridges both.</strong>
          </p>
        </div>

        {/* 3-Pillar Clean Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isHighlighted = index === 2;

            return (
              <GlassCard
                key={step.id}
                className={`flex flex-col justify-between transition-all duration-300 hover:scale-[1.01] hover:border-[var(--accent)] hover:shadow-xl ${
                  isHighlighted
                    ? "border-[var(--accent-2)]/40 bg-gradient-to-b from-[var(--surface-glass)] to-[var(--accent-2)]/5 ring-1 ring-[var(--accent-2)]/20"
                    : "border-[var(--border)]"
                }`}
                glow={isHighlighted ? "ai" : "none"}
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-mono text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">
                      STEP {step.number}
                    </span>
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 font-mono text-[11px] font-medium ${
                        isHighlighted
                          ? "bg-[var(--accent-2)]/10 text-[var(--accent-2)] border border-[var(--accent-2)]/30"
                          : "bg-[var(--surface-glass)] text-[var(--text-secondary)] border border-[var(--border)]"
                      }`}
                    >
                      {step.badge}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[var(--border)] bg-[var(--bg-elevated)]"
                      style={{ color: step.accentColor }}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-[var(--text-primary)]">
                        {step.title}
                      </h3>
                      <p className="text-xs text-[var(--text-secondary)] font-mono">
                        {step.subtitle}
                      </p>
                    </div>
                  </div>

                  <p className="mt-4 text-sm leading-relaxed text-[var(--text-secondary)]">
                    {step.description}
                  </p>

                  <ul className="mt-6 space-y-2.5 border-t border-[var(--border)] pt-6">
                    {step.details.map((detail, dIdx) => (
                      <li key={dIdx} className="flex items-start gap-2 text-xs text-[var(--text-secondary)]">
                        <CheckCircle2
                          className="h-3.5 w-3.5 shrink-0 mt-0.5"
                          style={{ color: step.accentColor }}
                        />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 pt-4 flex items-center justify-between border-t border-[var(--border)] font-mono text-xs text-[var(--text-secondary)]">
                  <span>{step.id === "intersection" ? "Unified Synthesis" : "Core Pillar"}</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </div>
              </GlassCard>
            );
          })}
        </div>

        {/* Synthesis Banner */}
        <div className="mt-10 rounded-2xl border border-[var(--border)] bg-[var(--surface-glass)] p-6 backdrop-blur-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--accent-2)]/10 text-[var(--accent-2)]">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-[var(--text-primary)]">
                The Outcome: AI that respects production reality
              </h4>
              <p className="text-xs text-[var(--text-secondary)] mt-0.5">
                Every AI pipeline built with infrastructure-level safeguards, strict evaluation benchmarks, and zero unverified execution.
              </p>
            </div>
          </div>
          <a
            href="#runbook-copilot"
            className="inline-flex shrink-0 items-center gap-2 rounded-full border border-[var(--border)] px-4 py-2 font-mono text-xs text-[var(--text-primary)] hover:border-[var(--text-secondary)] hover:bg-[var(--surface-hover)] transition-colors"
          >
            <span>See Flagship Project</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
