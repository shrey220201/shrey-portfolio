"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Workflow,
  CheckCircle,
  AlertTriangle,
  Layers,
  Terminal,
} from "lucide-react";
import { projects } from "@/content/projects";
import { GlassCard } from "@/components/ui/GlassCard";
import { GithubIcon } from "@/components/ui/Footer";
import { Reveal } from "@/components/motion/Reveal";
import { motion } from "framer-motion";
import { AgentGraphViewer } from "@/components/sections/AgentGraphViewer";

export function RunbookCopilot() {
  const project = projects.find((p) => p.slug === "runbook-copilot");
  const [selectedNode, setSelectedNode] = useState<string>("gate");

  if (!project) return null;

  const nodeDetails: Record<string, { title: string; type: string; role: string; specs: string }> = {
    gate: {
      title: "Confidence Gate (p ≥ 0.85)",
      type: "Deterministic Decision Boundary",
      role: "Evaluates model posterior probability. If score falls below 0.85, routes execution directly to the Human Escalation Node to prevent unverified CLI actions.",
      specs: "Threshold: 0.85 · Fallback: Escalation Queue · Strict Bypass Prevention",
    },
    rag: {
      title: "Hybrid Vector RAG Node",
      type: "Qdrant Vector & BM25 Dense-Sparse Index",
      role: "Fetches verified incident runbooks from QNAP, VMware, and Linux postmortems using vector embeddings and reciprocal rank fusion.",
      specs: "Embeddings: bge-small-en-v1.5 · Vector Store: ChromaDB · Latency: 120ms",
    },
    llm: {
      title: "Fine-Tuned Llama 3.2 1B (NF4)",
      type: "Quantized Specialist Model",
      role: "Trained on synthetic enterprise runbook datasets with LoRA rank 16 on Modal serverless A100 GPUs, achieving 95.5% accuracy on held-out test sets.",
      specs: "Quantization: 4-bit NF4 · Params: 1.23B · Format: GGUF / HuggingFace",
    },
    runbook: {
      title: "Deterministic Runbook Synthesis",
      type: "Cited Action Plan Generator",
      role: "Synthesizes step-by-step remediation commands grounded directly in retrieved SOP citations with explicit dry-run parameters.",
      specs: "Hallucination Rate: < 0.2% · Groundedness: 0.98 RAGAS · Dry-Run Verification",
    },
    telemetry: {
      title: "Live Health Probe Node",
      type: "Read-Only Hypervisor Validator",
      role: "Dispatches read-only diagnostic checks to ESXi 8.0, Proxmox VE, or QNAP ZFS CLI to corroborate symptom truth before generating instructions.",
      specs: "Protocols: SSH, pyVmomi, QTS API · Safe Mode: Non-Destructive Read-Only",
    },
    human: {
      title: "Human Escalation Node",
      type: "Deterministic Safety Halt",
      role: "Intercepts any destructive command (e.g. disk formatting, RAID recreation, VM unregistration) and requests administrator cryptographic sign-off.",
      specs: "Channel: Slack / Webhook · Approval Timeout: 15m · Audit Logging: Enabled",
    },
    ticket: {
      title: "Inbound Incident Ingest Node",
      type: "Event Ingress Stream",
      role: "Normalizes inbound infrastructure alerts, parses Windows Event Logs, and deduplicates high-frequency alert storms.",
      specs: "Throughput: 1,200 events/sec · Schema: OpenTelemetry Log Standard",
    },
  };

  return (
    <section id="runbook-copilot" className="relative w-full py-10 md:py-14 px-4 sm:px-8 lg:px-12 scroll-mt-20">
      <div className="mx-auto max-w-[1240px]">
        {/* Eyebrow & Tagline */}
        <Reveal duration={0.8}>
          <div className="mb-10 max-w-[820px]">
            <p className="eyebrow mb-2">FLAGSHIP APPLIED AI ARCHITECTURE</p>
            <h2 className="text-3xl font-bold tracking-[-0.035em] sm:text-5xl md:text-6xl text-[var(--text-primary)]">
              Runbook Copilot.
            </h2>
            <p className="mt-2 text-base sm:text-lg text-[var(--accent)] font-mono">
              {project.tagline}
            </p>
            <p className="mt-3 text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
              {project.summary}
            </p>

            {/* Tech Stack Chips */}
            <div className="mt-5 flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="inline-flex items-center rounded-md border border-[var(--border)] bg-[var(--bg-card)] px-2.5 py-1 font-mono text-xs text-[var(--text-secondary)]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Key Metrics Strip (High Density) */}
        <div className="mb-12 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {project.metrics?.map((metric, i) => (
            <Reveal key={i} delay={i * 0.08} duration={0.7}>
              <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-card)] p-4 text-left">
                <div className="font-mono text-2xl sm:text-3xl font-bold text-[var(--accent)]">
                  {metric.value}
                </div>
                <div className="mt-1 font-mono text-[10px] sm:text-[11px] text-[var(--text-secondary)] uppercase tracking-wider font-semibold">
                  {metric.label}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Two-Column Deep Dive: Architecture Decisions on Left, Interactive Graph on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Problem, Approach & Benchmark (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* The Problem */}
            <Reveal duration={0.8}>
              <GlassCard className="p-6">
                <div className="flex items-center gap-2 mb-3 text-[var(--warning-led)] font-mono text-xs uppercase tracking-wider font-semibold">
                  <AlertTriangle className="h-4 w-4" />
                  <span>The Production Problem</span>
                </div>
                <ul className="space-y-2.5">
                  {project.problem.map((prob, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                      <span className="font-mono text-xs text-[var(--accent)] mt-0.5">•</span>
                      <span>{prob}</span>
                    </li>
                  ))}
                </ul>
              </GlassCard>
            </Reveal>

            {/* The Approach & Engineering Decisions */}
            <Reveal duration={0.8} delay={0.1}>
              <GlassCard className="p-6">
                <div className="flex items-center gap-2 mb-3 text-[var(--accent)] font-mono text-xs uppercase tracking-wider font-semibold">
                  <Workflow className="h-4 w-4" />
                  <span>Engineering Decisions &amp; Architecture</span>
                </div>
                <ul className="space-y-3">
                  {project.approach.map((step, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                      <CheckCircle className="h-4 w-4 shrink-0 text-[var(--accent)] mt-0.5" />
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </GlassCard>
            </Reveal>

            {/* Fine-Tuning Accuracy Before / After Bar */}
            <Reveal duration={0.8} delay={0.15}>
              <GlassCard className="p-6 border-[var(--border-strong)]">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-[var(--accent)]">
                    <Layers className="h-4 w-4" />
                    <span>QLoRA Llama 3.2 1B Fine-Tuning Breakthrough</span>
                  </div>
                  <span className="font-mono text-[11px] text-[var(--text-muted)]">Modal GPUs (4-bit NF4)</span>
                </div>

                <div className="space-y-4">
                  {/* Initial Result */}
                  <div>
                    <div className="flex justify-between font-mono text-xs text-[var(--text-secondary)] mb-1">
                      <span>Initial Baseline (Traced to synthetic labeling defect)</span>
                      <span>86.6%</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-[var(--bg-card)] border border-[var(--border)] overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: "86.6%" }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                        className="h-full rounded-full bg-[var(--text-muted)] opacity-70"
                      />
                    </div>
                  </div>

                  {/* Final Result */}
                  <div>
                    <div className="flex justify-between font-mono text-xs font-semibold text-[var(--accent)] mb-1">
                      <span>Optimized Held-out Accuracy (Leak-proof train/test split)</span>
                      <span>95.5%</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-[var(--bg-card)] border border-[var(--border)] overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: "95.5%" }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        className="h-full rounded-full bg-[var(--accent)]"
                      />
                    </div>
                  </div>
                </div>
              </GlassCard>
            </Reveal>
          </div>

          {/* Right Column: Interactive 3D Agent Graph & Live Node Inspector (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <Reveal duration={0.8} delay={0.2}>
              <div className="rounded-2xl border border-[var(--border-strong)] bg-[var(--bg-card)] p-4 shadow-xl">
                <div className="flex items-center justify-between border-b border-[var(--border)] pb-2.5 mb-3 font-mono text-[11px] text-[var(--text-secondary)]">
                  <span className="flex items-center gap-1.5 font-semibold text-[var(--text-primary)]">
                    <Terminal className="h-3.5 w-3.5 text-[var(--accent)]" />
                    AGENT STATE GRAPH
                  </span>
                  <span className="text-[var(--text-muted)]">LANGGRAPH 3D</span>
                </div>

                {/* 3D Canvas / SVG Fallback */}
                <div className="relative h-72 sm:h-80 w-full rounded-xl overflow-hidden bg-[var(--bg)] border border-[var(--border)]">
                  <AgentGraphViewer
                    className="h-full w-full"
                    selectedId={selectedNode}
                    onNodeChange={(id) => setSelectedNode(id)}
                  />
                </div>

                {/* Interactive Node Selector Pills */}
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {Object.keys(nodeDetails).map((key) => (
                    <button
                      key={key}
                      onClick={() => setSelectedNode(key)}
                      className={`rounded-md px-2.5 py-1 font-mono text-[11px] transition-all ${
                        selectedNode === key
                          ? "bg-[#77E7FE]/15 text-[#77E7FE] border border-[#77E7FE]/50 shadow-[0_0_12px_rgba(119,231,254,0.25)] font-semibold"
                          : "border border-white/10 bg-[#0C0C0A] text-[#9E9E9C] hover:text-white"
                      }`}
                    >
                      {key.toUpperCase()}
                    </button>
                  ))}
                </div>

                {/* Live Node Inspector */}
                <div className="mt-3 rounded-xl border border-white/10 bg-[#141412] p-4">
                  <div className="font-mono text-xs font-bold text-[#77E7FE] mb-1">
                    {nodeDetails[selectedNode].title}
                  </div>
                  <div className="font-mono text-[10px] text-[var(--text-muted)] uppercase mb-2">
                    {nodeDetails[selectedNode].type}
                  </div>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed mb-3">
                    {nodeDetails[selectedNode].role}
                  </p>
                  <div className="border-t border-[var(--border)] pt-2 font-mono text-[10px] text-[var(--text-muted)]">
                    {nodeDetails[selectedNode].specs}
                  </div>
                </div>

                {/* CTA Links */}
                <div className="mt-4 flex items-center justify-between gap-3 border-t border-[var(--border)] pt-3">
                  <Link
                    href={`/projects/${project.slug}`}
                    className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-[var(--accent)] hover:underline"
                  >
                    <span>Read Full Case Study</span>
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 font-mono text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                    >
                      <GithubIcon className="h-3.5 w-3.5" />
                      <span>Source Code</span>
                    </a>
                  )}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
