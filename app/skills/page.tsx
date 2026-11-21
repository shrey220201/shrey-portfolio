import React from "react";
import type { Metadata } from "next";
import { Skills } from "@/components/sections/Skills";
import { Reveal } from "@/components/motion/Reveal";
import { Server, Cpu, Network, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Technical Skills & Architecture — Shrey Shah",
  description:
    "Comprehensive skills matrix covering Enterprise Storage (QNAP, RAID, NAKIVO), Virtualization (VMware, Proxmox), Networking, and Applied AI (LangGraph, QLoRA, RAG).",
};

export default function SkillsPage() {
  const architectures = [
    {
      title: "Storage & High Availability",
      icon: Server,
      points: [
        "Multi-bay QNAP NAS/SAN arrays with tiered SSD read/write acceleration caches",
        "RAID topologies (RAID 0, 1, 5, 6, 10, 50, 60) configured for optimal IOPS vs resilience",
        "Disaster Recovery & offsite replication with NAKIVO Backup & Replication and Veeam",
      ],
    },
    {
      title: "Hypervisors & Systems",
      icon: Cpu,
      points: [
        "VMware ESXi & vSphere cluster management, live vMotion, and DRS tuning",
        "Proxmox VE enterprise virtualization with LXC container clustering and ZFS pools",
        "Active Directory DS, Group Policy Objects (GPO), DNS/DHCP, and NComputing thin clients",
      ],
    },
    {
      title: "Applied AI & Agent Safety",
      icon: ShieldCheck,
      points: [
        "LangGraph cyclic state machines with confidence gating and human-in-the-loop triggers",
        "QLoRA 4-bit NF4 fine-tuning on Modal cloud GPUs (Llama 3.2 1B incident classification)",
        "Grounded Hybrid RAG over Qdrant with continuous RAGAS faithfulness validation",
      ],
    },
    {
      title: "Networking & Automation",
      icon: Network,
      points: [
        "VLAN segmentation, 802.1Q trunking, inter-VLAN routing, and ACL traffic filters",
        "Low-code & deterministic automation with n8n, Microsoft Power Automate, and Python",
        "Infrastructure telemetry, syslog consolidation, and Zabbix automated host discovery",
      ],
    },
  ];

  return (
    <div className="flex flex-col w-full pt-16 md:pt-20">
      {/* Page Header */}
      <div className="w-full px-6 pt-8 pb-4">
        <div className="mx-auto max-w-[1240px]">
          <Reveal duration={0.7}>
            <p className="eyebrow mb-2">TECHNICAL MATRIX &amp; ARCHITECTURE</p>
            <h1 className="text-3xl font-bold tracking-[-0.035em] sm:text-5xl md:text-6xl text-[var(--text-primary)]">
              Skills &amp; Competencies.
            </h1>
            <p className="mt-3 text-sm sm:text-base text-[var(--text-secondary)] max-w-[720px] leading-relaxed">
              Dual-discipline technical foundation: bare-metal server infrastructure, storage fabrics, and hypervisors paired with guarded LLM engineering.
            </p>
          </Reveal>
        </div>
      </div>

      {/* Interactive Matrix */}
      <Skills />

      {/* Systems Architecture Highlights */}
      <div className="w-full px-6 py-16 border-t border-[var(--border)] bg-[var(--bg-elevated)]">
        <div className="mx-auto max-w-[1240px]">
          <div className="mb-10 max-w-[720px]">
            <p className="eyebrow mb-2">ENGINEERING PRINCIPLES</p>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-[-0.03em] text-[var(--text-primary)]">
              Architectural Domains
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-[var(--text-secondary)]">
              How technical skills map into production engineering outcomes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {architectures.map((arch, idx) => {
              const Icon = arch.icon;
              return (
                <Reveal key={idx} delay={idx * 0.08} duration={0.7}>
                  <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-6 sm:p-8 h-full flex flex-col justify-between transition-all hover:border-[var(--border-strong)]">
                    <div>
                      <div className="flex items-center gap-3 mb-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--border-strong)] bg-[var(--bg-elevated)] text-[var(--accent)]">
                          <Icon className="h-5 w-5" />
                        </div>
                        <h3 className="text-lg font-bold text-[var(--text-primary)]">
                          {arch.title}
                        </h3>
                      </div>
                      <ul className="space-y-2.5">
                        {arch.points.map((pt, pIdx) => (
                          <li
                            key={pIdx}
                            className="flex items-start gap-2 text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed"
                          >
                            <span className="mt-1.5 h-1.5 w-1.5 rounded-full shrink-0 bg-[var(--accent)]" />
                            <span>{pt}</span>
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
      </div>
    </div>
  );
}
