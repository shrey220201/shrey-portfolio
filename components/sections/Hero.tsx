"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Download, Mail, HardDrive, Cpu, ShieldCheck } from "lucide-react";
import { siteConfig } from "@/content/site";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Footer";
import { Reveal } from "@/components/motion/Reveal";
import { Magnetic } from "@/components/motion/Magnetic";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";

const DynamicIntersectionScene = dynamic(
  () => import("@/components/three/IntersectionScene").then((m) => m.IntersectionScene),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full w-full flex-col items-center justify-center p-6 text-center">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-[var(--border)] border-t-[var(--accent)]" />
        <span className="mt-3 font-mono text-[11px] text-[var(--text-muted)] tracking-wider">
          INITIALIZING CHASSIS 3D...
        </span>
      </div>
    ),
  }
);

export function Hero() {
  return (
    <section
      id="overview"
      className="relative flex min-h-[82vh] w-full flex-col justify-center px-6 lg:px-12 pt-24 pb-12 overflow-hidden tech-grid-bg"
    >
      <div className="mx-auto w-full max-w-[1240px]">
        {/* Main 2-Column Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-10 xl:gap-14 items-center">
          
          {/* Left: Dominant, Bold Typography & Technical Grounding (7 cols) */}
          <div className="flex flex-col items-start text-left lg:col-span-7 xl:col-span-7 w-full">
            
            {/* Minimal Industrial Status Pill */}
            <Reveal delay={0.05} duration={0.6}>
              <div className="mb-5 inline-flex items-center gap-2.5 rounded-full border border-[var(--border-strong)] bg-[var(--bg-elevated)] px-3.5 py-1.5 backdrop-blur-xl shadow-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--success-led)] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--success-led)]" />
                </span>
                <span className="font-mono text-[11px] tracking-wider text-[var(--text-secondary)] font-medium uppercase">
                  STATUS: OPERATIONAL · IT INFRASTRUCTURE &amp; APPLIED AI
                </span>
              </div>
            </Reveal>

            {/* Grand Hero Name & Strict Headline */}
            <Reveal delay={0.12} duration={0.8} yOffset={16}>
              <h1 className="mb-5 tracking-[-0.035em] text-[var(--text-primary)]">
                <span className="block text-5xl sm:text-7xl md:text-8xl lg:text-7xl xl:text-8xl font-bold tracking-tight mb-2 text-[var(--text-primary)]">
                  Shrey Shah
                </span>
                <span className="block text-2xl sm:text-3xl md:text-4xl lg:text-3xl xl:text-4xl font-semibold leading-[1.15] text-[var(--text-secondary)]">
                  I manage enterprise storage and hypervisors, and engineer the{" "}
                  <span className="text-[var(--text-primary)] underline decoration-[var(--accent)] decoration-2 underline-offset-4">
                    autonomous AI
                  </span>{" "}
                  that debugs them.
                </span>
              </h1>
            </Reveal>

            {/* Grounded Narrative Copy (Zero Slop) */}
            <Reveal delay={0.2} duration={0.8}>
              <p className="mb-6 text-sm sm:text-base leading-relaxed text-[var(--text-secondary)] max-w-[620px]">
                IT Infrastructure Engineer at ITCG Solutions. Managing multi-bay enterprise storage arrays, NAKIVO/Veeam backup pipelines, and VMware/Proxmox clusters by day; designing confidence-gated LangGraph agents and fine-tuning open-weights models on Modal by night.
              </p>
            </Reveal>

            {/* Hardware Telemetry Spec HUD */}
            <Reveal delay={0.26} duration={0.8}>
              <div className="mb-8 grid grid-cols-1 sm:grid-cols-3 gap-2.5 w-full max-w-[620px]">
                <div className="flex items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--bg-elevated)] px-3 py-2">
                  <HardDrive className="h-4 w-4 text-[var(--accent)] shrink-0" />
                  <div className="font-mono text-[11px] leading-tight">
                    <span className="block font-semibold text-[var(--text-primary)]">200TB+ ZFS/RAID</span>
                    <span className="text-[var(--text-muted)] text-[10px]">Storage Array Fleet</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--bg-elevated)] px-3 py-2">
                  <Cpu className="h-4 w-4 text-[var(--accent)] shrink-0" />
                  <div className="font-mono text-[11px] leading-tight">
                    <span className="block font-semibold text-[var(--text-primary)]">ESXi &amp; Proxmox</span>
                    <span className="text-[var(--text-muted)] text-[10px]">HA Virtualization</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--bg-elevated)] px-3 py-2">
                  <ShieldCheck className="h-4 w-4 text-[var(--accent)] shrink-0" />
                  <div className="font-mono text-[11px] leading-tight">
                    <span className="block font-semibold text-[var(--text-primary)]">Modal QLoRA</span>
                    <span className="text-[var(--text-muted)] text-[10px]">95.5% Eval Accuracy</span>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Clean Tactile CTAs */}
            <Reveal delay={0.32} duration={0.8}>
              <div className="flex flex-wrap items-center gap-3.5">
                <Magnetic strength={0.2}>
                  <Link
                    href="/projects"
                    className="inline-flex h-11 items-center gap-2 rounded-full bg-[var(--accent)] px-6 text-xs sm:text-sm font-semibold text-white shadow-lg shadow-[var(--glow-accent)] transition-all duration-200 hover:opacity-95 active:scale-95"
                  >
                    <span>View Projects</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </Magnetic>

                <Magnetic strength={0.15}>
                  <a
                    href={siteConfig.resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-11 items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--bg-elevated)] px-5 text-xs sm:text-sm font-medium text-[var(--text-primary)] transition-all duration-200 hover:border-[var(--border-strong)] hover:bg-[var(--surface-hover)] active:scale-95"
                  >
                    <Download className="h-3.5 w-3.5 text-[var(--text-secondary)]" />
                    <span>Download Resume</span>
                  </a>
                </Magnetic>

                {/* Social Icon Pills */}
                <div className="flex items-center gap-2 sm:ml-2">
                  <Magnetic strength={0.2}>
                    <a
                      href={siteConfig.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="GitHub Profile"
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--bg-elevated)] text-[var(--text-secondary)] transition-colors hover:border-[var(--border-strong)] hover:text-[var(--text-primary)]"
                    >
                      <GithubIcon className="h-4 w-4" />
                    </a>
                  </Magnetic>
                  <Magnetic strength={0.2}>
                    <a
                      href={siteConfig.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="LinkedIn Profile"
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--bg-elevated)] text-[var(--text-secondary)] transition-colors hover:border-[var(--border-strong)] hover:text-[var(--text-primary)]"
                    >
                      <LinkedinIcon className="h-4 w-4" />
                    </a>
                  </Magnetic>
                  <Magnetic strength={0.2}>
                    <a
                      href={`mailto:${siteConfig.email}`}
                      aria-label="Email Shrey"
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--bg-elevated)] text-[var(--text-secondary)] transition-colors hover:border-[var(--border-strong)] hover:text-[var(--text-primary)]"
                    >
                      <Mail className="h-4 w-4" />
                    </a>
                  </Magnetic>
                </div>
              </div>
            </Reveal>

          </div>

          {/* Right: The 3D Datacenter Rack in Precision Chassis Frame (5 cols) */}
          <div className="lg:col-span-5 xl:col-span-5 flex justify-center w-full">
            <Reveal delay={0.2} duration={1} yOffset={20}>
              <motion.div
                whileHover={{ scale: 1.01 }}
                transition={{ type: "spring", damping: 25, stiffness: 120 }}
                className="relative flex w-full max-w-[420px] sm:max-w-[460px] lg:max-w-[460px] xl:max-w-[480px] aspect-square flex-col items-center justify-center rounded-2xl border border-[var(--border-strong)] bg-[var(--bg-elevated)] p-4 backdrop-blur-2xl shadow-2xl overflow-hidden"
              >
                {/* Precision Chassis Corner Crosshairs */}
                <span className="absolute top-2 left-2 font-mono text-[9px] text-[var(--text-muted)] select-none">+ 01_RACK</span>
                <span className="absolute top-2 right-2 font-mono text-[9px] text-[var(--text-muted)] select-none">10GbE_SFP+ +</span>
                <span className="absolute bottom-2 left-2 font-mono text-[9px] text-[var(--text-muted)] select-none">+ 42U_BAY</span>
                <span className="absolute bottom-2 right-2 font-mono text-[9px] text-[var(--text-muted)] select-none">ZFS_ON +</span>

                {/* Bezel Status Bar */}
                <div className="absolute top-4 inset-x-8 flex items-center justify-between border-b border-[var(--border)] pb-1.5 z-20">
                  <div className="flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-[var(--success-led)] animate-pulse" />
                    <span className="font-mono text-[10px] uppercase text-[var(--text-secondary)]">TELEMETRY LIVE</span>
                  </div>
                  <span className="font-mono text-[10px] text-[var(--text-muted)]">INTERACTION: ROTATE 360°</span>
                </div>

                {/* 3D Model Stage */}
                <div
                  id="hero-3d-stage"
                  className="relative z-10 flex h-full w-full min-h-[300px] sm:min-h-[340px] flex-col items-center justify-center pt-5"
                >
                  <DynamicIntersectionScene className="h-full w-full" />
                </div>
              </motion.div>
            </Reveal>
          </div>

        </div>
      </div>
    </section>
  );
}
