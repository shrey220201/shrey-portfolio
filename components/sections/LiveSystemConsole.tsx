"use client";

import React, { useState, useEffect } from "react";
import {
  Server,
  Cpu,
  ShieldCheck,
  Activity,
  Terminal as TerminalIcon,
  HardDrive,
  RefreshCw,
  Play,
  CheckCircle2,
  AlertTriangle,
  Zap,
} from "lucide-react";

type ConsoleTab = "telemetry" | "pipeline" | "simulator";

export function LiveSystemConsole() {
  const [activeTab, setActiveTab] = useState<ConsoleTab>("telemetry");
  const [currentTime, setCurrentTime] = useState<string>("00:00:00 UTC");
  const [simState, setSimState] = useState<"idle" | "running" | "resolved">("idle");
  const [simStep, setSimStep] = useState<number>(0);

  // Live Clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toISOString().slice(11, 19) + " UTC");
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Simulator step timer
  const runSimulation = () => {
    setSimState("running");
    setSimStep(1);

    setTimeout(() => setSimStep(2), 1200);
    setTimeout(() => setSimStep(3), 2600);
    setTimeout(() => setSimStep(4), 4000);
    setTimeout(() => {
      setSimStep(5);
      setSimState("resolved");
    }, 5400);
  };

  const resetSimulation = () => {
    setSimState("idle");
    setSimStep(0);
  };

  return (
    <div className="relative flex w-full max-w-[480px] lg:max-w-[490px] xl:max-w-[520px] flex-col rounded-2xl border border-[var(--border-strong)] bg-[var(--bg-elevated)] backdrop-blur-2xl shadow-2xl overflow-hidden transition-all duration-300 hover:border-[var(--border-focus)]">
      {/* Precision Chassis Top Header */}
      <div className="flex items-center justify-between border-b border-[var(--border)] bg-black/40 px-4 py-2.5">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-[var(--success-led)] animate-pulse" />
            <span className="font-mono text-[10px] font-semibold tracking-wider text-[var(--text-primary)]">
              SHREY_NODE_01
            </span>
          </div>
          <span className="font-mono text-[10px] text-[var(--text-muted)]">|</span>
          <span className="font-mono text-[10px] text-[var(--accent)]">ONLINE</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="font-mono text-[10px] text-[var(--text-muted)]">{currentTime}</span>
          <span className="rounded bg-[var(--accent-muted)] px-1.5 py-0.5 font-mono text-[9px] text-[var(--accent)] font-medium">
            10GbE SFP+
          </span>
        </div>
      </div>

      {/* Interactive Mode Navigation Tabs */}
      <div className="flex border-b border-[var(--border)] bg-black/20 p-1">
        <button
          type="button"
          onClick={() => setActiveTab("telemetry")}
          className={`flex flex-1 items-center justify-center gap-1.5 rounded-lg py-1.5 font-mono text-[11px] transition-all ${
            activeTab === "telemetry"
              ? "bg-[var(--bg-card)] text-[var(--text-primary)] shadow-sm border border-[var(--border)]"
              : "text-[var(--text-muted)] hover:text-[var(--text-secondary)]"
          }`}
        >
          <Activity className="h-3 w-3 text-[var(--accent)]" />
          <span>Telemetry</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("pipeline")}
          className={`flex flex-1 items-center justify-center gap-1.5 rounded-lg py-1.5 font-mono text-[11px] transition-all ${
            activeTab === "pipeline"
              ? "bg-[var(--bg-card)] text-[var(--text-primary)] shadow-sm border border-[var(--border)]"
              : "text-[var(--text-muted)] hover:text-[var(--text-secondary)]"
          }`}
        >
          <TerminalIcon className="h-3 w-3 text-[var(--success-led)]" />
          <span>Agent Trace</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("simulator")}
          className={`flex flex-1 items-center justify-center gap-1.5 rounded-lg py-1.5 font-mono text-[11px] transition-all ${
            activeTab === "simulator"
              ? "bg-[var(--bg-card)] text-[var(--text-primary)] shadow-sm border border-[var(--border)]"
              : "text-[var(--text-muted)] hover:text-[var(--text-secondary)]"
          }`}
        >
          <Zap className="h-3 w-3 text-[var(--warning-led)]" />
          <span>Triage Sim</span>
        </button>
      </div>

      {/* Console Display Screen */}
      <div className="p-4 min-h-[310px] flex flex-col justify-between font-mono">
        {/* TAB 1: Live Hardware & AI Telemetry */}
        {activeTab === "telemetry" && (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-[11px] text-[var(--text-muted)] pb-1 border-b border-[var(--border)]">
              <span>SYSTEM SUBSYSTEM</span>
              <span>METRIC / HEALTH</span>
            </div>

            {/* Metric Row 1: Enterprise Storage */}
            <div className="flex items-center justify-between rounded-lg border border-[var(--border)] bg-black/30 p-2.5">
              <div className="flex items-center gap-2.5">
                <div className="flex h-7 w-7 items-center justify-center rounded-md bg-[var(--accent-muted)] text-[var(--accent)]">
                  <HardDrive className="h-3.5 w-3.5" />
                </div>
                <div>
                  <div className="text-[11px] font-semibold text-[var(--text-primary)]">
                    QNAP ZFS Storage Pool
                  </div>
                  <div className="text-[9px] text-[var(--text-muted)]">
                    16-Bay RAID 60 · SSD Tiering Active
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-[11px] font-bold text-[var(--success-led)]">HEALTHY</div>
                <div className="text-[9px] text-[var(--text-muted)]">42,500 IOPS · 0.8ms</div>
              </div>
            </div>

            {/* Metric Row 2: Hypervisor & Virtualization */}
            <div className="flex items-center justify-between rounded-lg border border-[var(--border)] bg-black/30 p-2.5">
              <div className="flex items-center gap-2.5">
                <div className="flex h-7 w-7 items-center justify-center rounded-md bg-emerald-500/10 text-[var(--success-led)]">
                  <Server className="h-3.5 w-3.5" />
                </div>
                <div>
                  <div className="text-[11px] font-semibold text-[var(--text-primary)]">
                    VMware ESXi &amp; Hyper-V
                  </div>
                  <div className="text-[9px] text-[var(--text-muted)]">
                    NAKIVO Backup SLAs: RPO &lt; 15m
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-[11px] font-bold text-[var(--text-primary)]">99.98% UPTIME</div>
                <div className="text-[9px] text-[var(--text-muted)]">AD Replication OK</div>
              </div>
            </div>

            {/* Metric Row 3: Applied AI & LangGraph Agent */}
            <div className="flex items-center justify-between rounded-lg border border-[var(--border)] bg-black/30 p-2.5">
              <div className="flex items-center gap-2.5">
                <div className="flex h-7 w-7 items-center justify-center rounded-md bg-purple-500/10 text-purple-400">
                  <Cpu className="h-3.5 w-3.5" />
                </div>
                <div>
                  <div className="text-[11px] font-semibold text-[var(--text-primary)]">
                    LangGraph Guarded Agent
                  </div>
                  <div className="text-[9px] text-[var(--text-muted)]">
                    Llama 3.2 1B (4-bit NF4) · Modal GPU
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-[11px] font-bold text-[var(--accent)]">p &gt;= 0.85 GATE</div>
                <div className="text-[9px] text-[var(--text-muted)]">95.5% Eval Precision</div>
              </div>
            </div>

            {/* Live Throughput Bar */}
            <div className="pt-1">
              <div className="flex justify-between text-[10px] text-[var(--text-muted)] mb-1">
                <span>Network Ingress / Egress</span>
                <span className="text-[var(--text-primary)]">9.42 Gbps / 10 Gbps</span>
              </div>
              <div className="h-1.5 w-full rounded-full bg-[var(--border)] overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[var(--accent)] via-emerald-400 to-[var(--accent)] animate-pulse"
                  style={{ width: "94%" }}
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: Live Agent Trace Terminal */}
        {activeTab === "pipeline" && (
          <div className="flex flex-col justify-between h-full space-y-2">
            <div className="rounded-lg border border-[var(--border)] bg-black/60 p-3 space-y-2 text-[10px] leading-relaxed overflow-y-auto max-h-[220px]">
              <div className="flex items-center gap-2 text-[var(--text-muted)]">
                <span className="text-[var(--success-led)]">●</span>
                <span>[00:00:01] LangGraph Runtime Initialized on Event Stream</span>
              </div>
              <div className="text-[var(--text-secondary)] pl-3 border-l border-[var(--border)]">
                &gt; Listening on Syslog UDP/514 &amp; SNMP Traps (OID: .1.3.6.1.4.1.24681)
              </div>
              <div className="text-[var(--warning-led)] pl-3 border-l border-[var(--warning-led)]">
                &gt; EVENT: Host &apos;esxi-node-04&apos; iSCSI Target Latency Spike &gt; 32ms
              </div>
              <div className="text-[var(--accent)] pl-3 border-l border-[var(--accent)]">
                &gt; RETRIEVER: BM25 + bge-small-en rank fusion retrieved 3 runbooks
              </div>
              <div className="text-[var(--success-led)] pl-3 border-l border-[var(--success-led)]">
                &gt; CONFIDENCE EVAL: score = 0.942 (&gt;= 0.85 gate approved)
              </div>
              <div className="text-[var(--text-primary)] pl-3 border-l border-[var(--text-primary)]">
                &gt; ACTION: Re-balanced multipath IO across SFP+ Link B. Latency normalized to 1.1ms.
              </div>
            </div>

            <div className="flex items-center justify-between text-[9px] text-[var(--text-muted)] pt-1">
              <span>Deterministic Guardrail: Active</span>
              <span className="text-[var(--success-led)]">Zero Unvetted CLI Execution</span>
            </div>
          </div>
        )}

        {/* TAB 3: Interactive Triage Simulator */}
        {activeTab === "simulator" && (
          <div className="flex flex-col justify-between h-full space-y-3">
            <div className="rounded-lg border border-[var(--border)] bg-black/50 p-3 min-h-[160px] text-[10px] flex flex-col justify-center">
              {simState === "idle" && (
                <div className="text-center py-4">
                  <AlertTriangle className="h-6 w-6 text-[var(--warning-led)] mx-auto mb-2 animate-bounce" />
                  <div className="font-semibold text-[var(--text-primary)] text-xs mb-1">
                    Ready to Simulate Production Incident
                  </div>
                  <p className="text-[var(--text-muted)] max-w-[320px] mx-auto text-[10px]">
                    Click &apos;Simulate RAID Degraded Event&apos; to watch the Infrastructure-Aware AI triage agent detect, isolate, and safely recover in real time.
                  </p>
                </div>
              )}

              {simState === "running" && (
                <div className="space-y-1.5 py-1">
                  {simStep >= 1 && (
                    <div className="text-[var(--danger-led)] animate-fade-in">
                      [ALERT] QNAP Bay 07: S.M.A.R.T. raw read error rate exceeded limit.
                    </div>
                  )}
                  {simStep >= 2 && (
                    <div className="text-[var(--warning-led)] animate-fade-in">
                      [CLASSIFY] LangGraph Severity: Tier 2 (RAID 60 Single Fault Tolerance).
                    </div>
                  )}
                  {simStep >= 3 && (
                    <div className="text-[var(--accent)] animate-fade-in">
                      [RAG] Runbook retrieved: &apos;qnap_hot_spare_failover_v3.md&apos;
                    </div>
                  )}
                  {simStep >= 4 && (
                    <div className="text-purple-400 animate-fade-in">
                      [GATE] Posterior confidence = 0.96 &gt;= 0.85 threshold. Gate passed.
                    </div>
                  )}
                  {simStep >= 5 && (
                    <div className="text-[var(--success-led)] animate-fade-in font-bold">
                      [RECOVERED] Hot spare Bay 16 promoted. Array re-sync active. Zero downtime.
                    </div>
                  )}
                </div>
              )}

              {simState === "resolved" && (
                <div className="text-center py-2">
                  <CheckCircle2 className="h-6 w-6 text-[var(--success-led)] mx-auto mb-1" />
                  <div className="font-bold text-[var(--success-led)] text-xs">
                    Incident Triaged &amp; Safely Mitigated
                  </div>
                  <div className="text-[var(--text-muted)] text-[9px] mt-0.5">
                    Total Time: 5.4s · Human Escalation: Logged · Zero Data Loss
                  </div>
                </div>
              )}
            </div>

            {/* Simulation Trigger Buttons */}
            <div className="flex gap-2">
              {simState === "idle" ? (
                <button
                  type="button"
                  onClick={runSimulation}
                  className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-[var(--accent)] py-2 text-[11px] font-bold text-white transition-transform active:scale-95 shadow-md shadow-[var(--glow-accent)]"
                >
                  <Play className="h-3 w-3 fill-white" />
                  <span>Simulate RAID Fault</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={resetSimulation}
                  className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-[var(--border)] bg-[var(--bg-card)] py-2 text-[11px] text-[var(--text-primary)] transition-colors hover:bg-[var(--surface-hover)]"
                >
                  <RefreshCw className="h-3 w-3 text-[var(--text-secondary)]" />
                  <span>Reset Simulator</span>
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Chassis Footer Ribbon */}
      <div className="flex items-center justify-between border-t border-[var(--border)] bg-black/40 px-4 py-2 text-[9px] font-mono text-[var(--text-muted)]">
        <span className="flex items-center gap-1.5">
          <ShieldCheck className="h-3 w-3 text-[var(--accent)]" />
          <span>ZERO UNVERIFIED CLI EXECUTION</span>
        </span>
        <span className="text-[var(--text-secondary)]">LATENCY: 0.8ms</span>
      </div>
    </div>
  );
}
