"use client";

import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  Download,
  Mail,
  HardDrive,
  Cpu,
  ShieldCheck,
  Server,
} from "lucide-react";
import { siteConfig } from "@/content/site";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Footer";
import { Reveal } from "@/components/motion/Reveal";
import { Magnetic } from "@/components/motion/Magnetic";

export function Hero() {
  const sections = [
    { num: "00", label: "Overview", href: "#overview" },
    { num: "01", label: "Impact Stats", href: "#stats" },
    { num: "02", label: "The Intersection", href: "#intersection" },
    { num: "03", label: "Runbook Copilot", href: "#runbook-copilot" },
    { num: "04", label: "Skills Matrix", href: "#skills" },
    { num: "05", label: "Contact Channel", href: "#contact" },
  ];

  return (
    <section
      id="overview"
      className="relative flex min-h-[calc(100vh-5.5rem)] min-h-[calc(100dvh-5.5rem)] w-full flex-col justify-between px-4 sm:px-8 lg:px-14 pt-8 pb-12 overflow-hidden"
    >
      {/* Top Identity & Location Beacon Bar */}
      <div className="mx-auto w-full max-w-[1300px] flex items-center justify-between font-mono text-[11px] text-[var(--text-secondary)] pb-4">
        <Reveal delay={0.05} duration={0.6}>
          <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--bg-elevated)]/75 px-3.5 py-1 backdrop-blur-md shadow-sm">
            <span className="font-semibold text-[var(--text-primary)] tracking-wider uppercase">
              ENTERPRISE INFRASTRUCTURE &amp; AGENTIC AI
            </span>
            <span className="text-[var(--text-muted)]">|</span>
            <span className="text-[var(--glacier)] font-medium">VADODARA, INDIA</span>
          </div>
        </Reveal>
      </div>

      {/* Main Hero Showcase: Cinematic Typography on Left + Atmospheric Depth */}
      <div className="mx-auto w-full max-w-[1300px] my-auto py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end">
          
          {/* Left Column: Dominant Hero Statement */}
          <div className="lg:col-span-8 flex flex-col items-start text-left z-10">
            <Reveal delay={0.12} duration={0.8} yOffset={16}>
              <h1 className="text-5xl sm:text-7xl lg:text-8xl font-extrabold tracking-tight text-[var(--text-primary)] leading-[1.04] mb-5">
                Shrey Shah
              </h1>
            </Reveal>

            <Reveal delay={0.18} duration={0.8} yOffset={16}>
              <p className="text-xl sm:text-2xl lg:text-3xl font-semibold text-[var(--text-secondary)] leading-snug max-w-[720px] mb-6">
                Infrastructure that holds.{" "}
                <span className="text-[var(--text-primary)] underline decoration-[var(--accent)] decoration-2 underline-offset-6">
                  Autonomous AI
                </span>{" "}
                that helps fix it.
              </p>
            </Reveal>

            {/* Proof Metric Chips with Glacier Blue & Blaze Orange Accents */}
            <Reveal delay={0.24} duration={0.8} yOffset={16}>
              <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 mb-8">
                <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--bg-elevated)]/85 px-3.5 py-1.5 font-mono text-xs backdrop-blur-md shadow-sm">
                  <HardDrive className="h-3.5 w-3.5 text-[var(--accent)]" />
                  <span className="font-bold text-[var(--text-primary)]">10+</span>
                  <span className="text-[var(--text-secondary)]">QNAP sites</span>
                </div>

                <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--bg-elevated)]/85 px-3.5 py-1.5 font-mono text-xs backdrop-blur-md shadow-sm">
                  <Server className="h-3.5 w-3.5 text-[var(--glacier)]" />
                  <span className="font-bold text-[var(--text-primary)]">Hyper-V → Proxmox migrations</span>
                </div>

                <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--bg-elevated)]/85 px-3.5 py-1.5 font-mono text-xs backdrop-blur-md shadow-sm">
                  <Cpu className="h-3.5 w-3.5 text-[var(--accent)]" />
                  <span className="font-bold text-[var(--text-primary)]">95.5%</span>
                  <span className="text-[var(--text-secondary)]">QLoRA eval</span>
                </div>
              </div>
            </Reveal>

            {/* Clean Tactile CTAs */}
            <Reveal delay={0.3} duration={0.8}>
              <div className="flex flex-wrap items-center gap-3.5">
                <Magnetic strength={0.2}>
                  <Link
                    href="/projects"
                    className="inline-flex h-11 items-center gap-2 rounded-full bg-[var(--accent)] px-6 text-xs sm:text-sm font-semibold text-white shadow-lg shadow-[var(--glow-accent)] transition-all duration-200 hover:opacity-95 hover:shadow-xl active:scale-95"
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
                    className="inline-flex h-11 items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--bg-elevated)]/85 px-5 text-xs sm:text-sm font-medium text-[var(--text-primary)] transition-all duration-200 hover:border-[var(--glacier)] hover:text-[var(--glacier)] hover:bg-[var(--surface-hover)] active:scale-95 shadow-sm"
                  >
                    <Download className="h-3.5 w-3.5 text-[var(--glacier)]" />
                    <span>Download Resume</span>
                  </a>
                </Magnetic>

                {/* Social Icon Pills */}
                <div className="flex items-center gap-2">
                  <Magnetic strength={0.2}>
                    <a
                      href={siteConfig.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="GitHub Profile"
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--bg-elevated)]/85 text-[var(--text-secondary)] transition-colors hover:border-[var(--glacier)] hover:text-[var(--glacier)] shadow-sm"
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
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--bg-elevated)]/85 text-[var(--text-secondary)] transition-colors hover:border-[var(--glacier)] hover:text-[var(--glacier)] shadow-sm"
                    >
                      <LinkedinIcon className="h-4 w-4" />
                    </a>
                  </Magnetic>
                  <Magnetic strength={0.2}>
                    <a
                      href={`mailto:${siteConfig.email}`}
                      aria-label="Email Shrey"
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--bg-elevated)]/85 text-[var(--text-secondary)] transition-colors hover:border-[var(--glacier)] hover:text-[var(--glacier)] shadow-sm"
                    >
                      <Mail className="h-4 w-4" />
                    </a>
                  </Magnetic>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right Column: Saffron / motionsites.ai Style Vertical Section Tracker & Narrative */}
          <div className="lg:col-span-4 flex flex-col justify-between items-start lg:items-end text-left lg:text-right space-y-8 z-10">
            {/* Minimalist Vertical Section Tracker */}
            <Reveal delay={0.2} duration={0.8}>
              <div className="hidden lg:flex flex-col items-end space-y-2 font-mono text-xs">
                {sections.map((sec, idx) => (
                  <a
                    key={sec.num}
                    href={sec.href}
                    onClick={(e) => {
                      if (sec.href.startsWith("#")) {
                        const el = document.getElementById(sec.href.slice(1));
                        if (el) {
                          e.preventDefault();
                          el.scrollIntoView({ behavior: "smooth" });
                          window.history.pushState(null, "", sec.href);
                        }
                      }
                    }}
                    className={`group flex items-center gap-2.5 transition-colors cursor-pointer ${
                      idx === 0
                        ? "text-[var(--accent)] font-bold"
                        : "text-[var(--text-muted)] hover:text-[var(--glacier)]"
                    }`}
                  >
                    <span className="text-[11px] uppercase tracking-wider hidden group-hover:inline-block">
                      {sec.label}
                    </span>
                    <span className="text-xs">
                      {idx === 0 ? `FIELD ${sec.num}` : sec.num}
                    </span>
                    <span
                      className={`h-1.5 w-1.5 rounded-full transition-transform ${
                        idx === 0
                          ? "bg-[var(--accent)] scale-125 shadow-[0_0_8px_var(--accent)]"
                          : "bg-[var(--border-strong)] group-hover:bg-[var(--glacier)] group-hover:scale-110"
                      }`}
                    />
                  </a>
                ))}
              </div>
            </Reveal>

            {/* Narrative Micro-Story */}
            <Reveal delay={0.26} duration={0.8}>
              <div className="max-w-[340px] text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                <p>
                  IT Infrastructure Engineer at ITCG Solutions in Vadodara. Bare-metal storage
                  arrays, NAKIVO/Veeam recovery SLAs, and Linux clusters by day;
                  cyclic LangGraph agents and fine-tuned open weights by night.
                </p>
                <div className="mt-3 font-mono text-[11px] text-[var(--glacier)] flex items-center lg:justify-end gap-1.5 font-medium">
                  <ShieldCheck className="h-3.5 w-3.5 text-[var(--glacier)]" />
                  <span>Guarded AI · Physical Foundations</span>
                </div>
              </div>
            </Reveal>
          </div>

        </div>
      </div>

      {/* Bottom Bar: Ambient Indicators */}
      <div className="mx-auto w-full max-w-[1300px] flex items-center justify-between border-t border-[var(--border)] pt-4 font-mono text-[10px] text-[var(--text-muted)]">
        <div className="flex items-center gap-3">
          <span className="text-[var(--text-secondary)]">10+ QNAP SITES</span>
          <span>·</span>
          <span className="text-[var(--text-secondary)]">HYPER-V → PROXMOX</span>
          <span>·</span>
          <span className="text-[var(--glacier)]">LANGGRAPH p ≥ 0.85</span>
        </div>

        <div className="hidden sm:flex items-center gap-2">
          <span>PORTFOLIO v2.4</span>
          <span>·</span>
          <span className="text-[var(--accent)] font-semibold">SHREY SHAH</span>
        </div>
      </div>
    </section>
  );
}
