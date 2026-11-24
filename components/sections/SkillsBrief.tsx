"use client";

import React from "react";
import Link from "next/link";
import { Cpu, Server, Layers, Network, ArrowRight } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { CardReveal, CardTitleReveal, CardItemReveal } from "@/components/motion/CardReveal";

export function SkillsBrief() {
  const skillDomains = [
    {
      id: "applied-ai",
      title: "Applied AI & Agentic Systems",
      categoryParam: "Applied AI",
      icon: Cpu,
      accent: "var(--glacier)",
      count: "6 Production Technologies",
      description:
        "Cyclic state graphs, confidence gating, 4-bit NF4 parameter-efficient fine-tuning on Modal GPUs, and grounded hybrid runbook retrieval.",
      skills: ["LangGraph", "QLoRA (4-bit NF4)", "Hybrid RAG & Qdrant", "RAGAS Eval", "Ollama", "FastAPI"],
    },
    {
      id: "storage-backup",
      title: "Enterprise Storage & Disaster Recovery",
      categoryParam: "Storage & Backup",
      icon: Server,
      accent: "var(--accent)",
      count: "4 Core Solutions",
      description:
        "Bare-metal multi-bay QNAP SAN/NAS arrays, fault-tolerant RAID rebuilds with SSD tiering, and automated multi-server recovery point SLAs.",
      skills: ["QNAP Enterprise NAS", "RAID 0/1/5/6/10", "NAKIVO Backup", "Veeam DR", "iSCSI SAN", "ZFS"],
    },
    {
      id: "virtualisation-systems",
      title: "Virtualisation & Systems Administration",
      categoryParam: "Virtualisation & Systems",
      icon: Layers,
      accent: "var(--glacier)",
      count: "5 Enterprise Platforms",
      description:
        "VMware vSphere/ESXi hypervisors, Proxmox VE KVM clusters, Windows Server domain controllers, Active Directory GPO, and production Linux.",
      skills: ["VMware vSphere & ESXi", "Proxmox VE & KVM", "Windows Server (2016–22)", "Active Directory & GPO", "Linux (Debian/RHEL)"],
    },
    {
      id: "networking-automation",
      title: "Networking & Deterministic Automation",
      categoryParam: "Networking & Automation",
      icon: Network,
      accent: "var(--accent)",
      count: "6 Automation Tools",
      description:
        "CCNA-level packet routing, inter-VLAN trunking, Wireshark troubleshooting, and automated workflow orchestrations via n8n, Power Automate, and Python.",
      skills: ["CCNA Routing & Switching", "Wireshark Packet Analysis", "Python Automation", "PowerShell", "n8n", "Docker"],
    },
  ];

  return (
    <section id="skills" className="relative w-full py-12 md:py-16 px-4 sm:px-8 lg:px-12 scroll-mt-20">
      <div className="mx-auto max-w-[1240px]">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div className="max-w-[760px]">
            <p className="eyebrow mb-2">TECHNICAL COMPETENCIES &amp; RUNTIME MATRIX</p>
            <h2 className="text-3xl font-bold tracking-[-0.035em] sm:text-5xl md:text-6xl text-[var(--text-primary)]">
              Skills Matrix.
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
              Structured into 4 core architectural disciplines across enterprise infrastructure and applied AI engineering. Select any domain below to inspect the full interactive technology matrix.
            </p>
          </div>

          <Link
            href="/skills"
            className="inline-flex items-center gap-1.5 font-mono text-xs text-[var(--accent)] hover:underline shrink-0 group"
          >
            <span>Open complete skills catalog</span>
            <ArrowRight className="h-3.5 w-3.5 transform transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* 4 Skill Set Domain Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skillDomains.map((domain, idx) => {
            const Icon = domain.icon;
            const targetUrl = `/skills?category=${encodeURIComponent(domain.categoryParam)}`;

            return (
              <CardReveal key={domain.id} index={idx} className="h-full">
                <Link href={targetUrl} className="group block h-full">
                  <GlassCard className="h-full p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 group-hover:border-[var(--border-strong)] group-hover:-translate-y-1 bg-white/[0.02]">
                    <div>
                      {/* Top Header: Icon & Technology Count */}
                      <CardItemReveal className="flex items-center justify-between mb-4">
                        <div
                          className="flex h-11 w-11 items-center justify-center rounded-xl border border-[var(--border)] bg-black/40"
                          style={{ color: domain.accent }}
                        >
                          <Icon className="h-5 w-5" />
                        </div>

                        <span className="font-mono text-[11px] text-[var(--text-muted)] bg-white/[0.04] border border-[var(--border)] px-2.5 py-1 rounded-full">
                          {domain.count}
                        </span>
                      </CardItemReveal>

                      {/* Domain Title */}
                      <CardTitleReveal>
                        <h3 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors mb-2.5">
                          {domain.title}
                        </h3>
                      </CardTitleReveal>

                      {/* Domain Description */}
                      <CardItemReveal>
                        <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed mb-5">
                          {domain.description}
                        </p>
                      </CardItemReveal>

                      {/* Preview Skill Tags */}
                      <div className="flex flex-wrap gap-1.5 pt-2">
                        {domain.skills.map((skillName) => (
                          <CardItemReveal key={skillName}>
                            <span className="inline-block rounded-md border border-[var(--border)] bg-[var(--bg-elevated)] px-2 py-0.5 font-mono text-[11px] text-[var(--text-secondary)] group-hover:border-[var(--border-strong)] transition-colors">
                              {skillName}
                            </span>
                          </CardItemReveal>
                        ))}
                      </div>
                    </div>

                    {/* Footer Action */}
                    <CardItemReveal className="mt-6 pt-4 border-t border-[var(--border)] flex items-center justify-between font-mono text-xs text-[var(--text-primary)]">
                      <span className="text-[var(--text-muted)] group-hover:text-[var(--text-primary)] transition-colors">
                        Inspect {domain.categoryParam} Stack
                      </span>
                      <ArrowRight className="h-3.5 w-3.5 transform transition-transform group-hover:translate-x-1.5 text-[var(--accent)]" />
                    </CardItemReveal>
                  </GlassCard>
                </Link>
              </CardReveal>
            );
          })}
        </div>

        {/* Bottom Telemetry Strip */}
        <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between border-t border-[var(--border)] pt-5 font-mono text-xs text-[var(--text-muted)] gap-2">
          <span>4 CORE DOMAINS · 30+ TESTED TECHNOLOGIES · LIVE CLIENT ENVIRONMENT EXPERIENCE</span>
          <Link
            href="/skills"
            className="text-[var(--glacier)] hover:underline font-semibold flex items-center gap-1"
          >
            <span>View all 30+ skills with architecture specs</span>
            <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
      </div>
    </section>
  );
}
