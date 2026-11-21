"use client";

import React, { useEffect, useRef, useState } from "react";
import { Terminal as TerminalIcon, X, CornerDownLeft, Maximize2, Minimize2 } from "lucide-react";
import { siteConfig } from "@/content/site";
import { projects } from "@/content/projects";
import { experiences } from "@/content/experience";
import { useTheme } from "@/lib/theme";

interface HistoryEntry {
  command: string;
  output: React.ReactNode;
}

const AVAILABLE_COMMANDS = [
  "help",
  "whoami",
  "skills",
  "projects",
  "cat runbook-copilot.md",
  "experience",
  "resume",
  "contact",
  "theme dark",
  "theme light",
  "clear",
  "sudo hire shrey",
];

export function Terminal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [inputVal, setInputVal] = useState("");
  const [history, setHistory] = useState<HistoryEntry[]>([
    {
      command: "welcome",
      output: (
        <div className="space-y-1 text-xs font-mono">
          <p className="text-[var(--accent-2)]">
            Shrey Shah Terminal OS [Version 2.4.0-infra-ai]
          </p>
          <p className="text-[var(--text-secondary)]">
            Type <span className="text-[var(--accent)] font-semibold">&apos;help&apos;</span> to view available system commands or press <span className="text-[var(--text-primary)]">Tab</span> for auto-completion.
          </p>
        </div>
      ),
    },
  ]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [pastCommands, setPastCommands] = useState<string[]>([]);

  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { setTheme } = useTheme();

  // Keyboard shortcut: Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      } else if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 80);
    }
  }, [isOpen]);

  // Auto-scroll to bottom of terminal output
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history, isOpen]);

  const handleCommand = (rawInput: string) => {
    const cmd = rawInput.trim();
    const lowerCmd = cmd.toLowerCase();

    if (!cmd) return;

    // Track command history
    setPastCommands((prev) => [...prev, cmd]);
    setHistoryIndex(-1);

    let output: React.ReactNode = null;

    if (lowerCmd === "clear") {
      setHistory([]);
      setInputVal("");
      return;
    }

    if (lowerCmd === "help") {
      output = (
        <div className="space-y-1.5 font-mono text-xs">
          <p className="text-[var(--accent)] font-semibold">Available Commands:</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-[var(--text-secondary)]">
            <div><span className="text-[var(--text-primary)] font-bold">whoami</span> - Identity & core philosophy</div>
            <div><span className="text-[var(--text-primary)] font-bold">skills</span> - Infrastructure & AI matrix</div>
            <div><span className="text-[var(--text-primary)] font-bold">projects</span> - Deployed production projects</div>
            <div><span className="text-[var(--text-primary)] font-bold">cat runbook-copilot.md</span> - Runbook Copilot specs</div>
            <div><span className="text-[var(--text-primary)] font-bold">experience</span> - Career history & promotion</div>
            <div><span className="text-[var(--text-primary)] font-bold">resume</span> - Download official resume PDF</div>
            <div><span className="text-[var(--text-primary)] font-bold">contact</span> - Reach out via email/LinkedIn</div>
            <div><span className="text-[var(--text-primary)] font-bold">theme &lt;dark|light&gt;</span> - Toggle system theme</div>
            <div><span className="text-[var(--text-primary)] font-bold">clear</span> - Clear terminal buffer</div>
            <div><span className="text-[var(--success-led)] font-bold">sudo hire shrey</span> - Executive action sequence</div>
          </div>
        </div>
      );
    } else if (lowerCmd === "whoami") {
      output = (
        <div className="space-y-1 font-mono text-xs text-[var(--text-secondary)]">
          <p><strong className="text-[var(--text-primary)]">{siteConfig.name}</strong> — {siteConfig.role}</p>
          <p>Location: {siteConfig.location}</p>
          <p className="text-[var(--accent-2)]">&ldquo;{siteConfig.subline}&rdquo;</p>
          <p className="mt-1 text-[11px]">Core Philosophy: Most AI engineers have never run production infrastructure, and most infrastructure engineers have never built a guarded LLM agent. Shrey does both.</p>
        </div>
      );
    } else if (lowerCmd === "skills") {
      output = (
        <div className="space-y-2 font-mono text-xs">
          <p className="text-[var(--accent)] font-semibold">Verified Technical Stack:</p>
          <p className="text-[var(--text-secondary)]">
            <strong className="text-[var(--text-primary)]">Infra & Storage:</strong> QNAP NAS/SAN (2–16 bay), RAID 0/1/5/6/10/50/60, NAKIVO, Veeam, VMware, Hyper-V, Proxmox, Active Directory.
          </p>
          <p className="text-[var(--text-secondary)]">
            <strong className="text-[var(--accent-2)]">Applied AI & LLM:</strong> RAG Pipelines, LangGraph Agents, QLoRA Fine-Tuning (95.5%), RAGAS Evaluation, Ollama, Modal GPUs.
          </p>
          <p className="text-[var(--text-secondary)]">
            <strong className="text-[var(--text-primary)]">Automation & DevOps:</strong> n8n, Power Automate, Docker, Zabbix, BookStack, osTicket, PowerShell, Python.
          </p>
        </div>
      );
    } else if (lowerCmd === "projects") {
      output = (
        <div className="space-y-2 font-mono text-xs">
          <p className="text-[var(--accent)] font-semibold">Key Projects:</p>
          {projects.map((p) => (
            <div key={p.slug} className="text-[var(--text-secondary)]">
              <span className="text-[var(--text-primary)] font-bold">{p.title}</span> — {p.tagline}
            </div>
          ))}
        </div>
      );
    } else if (lowerCmd === "cat runbook-copilot.md") {
      output = (
        <div className="space-y-1.5 font-mono text-xs rounded border border-[var(--border)] bg-[var(--surface-glass)] p-3">
          <p className="text-[var(--accent-2)] font-bold"># Runbook Copilot: Incident Triage System</p>
          <p className="text-[var(--text-secondary)]">Stack: Python, Ollama, Qdrant, LangGraph, HuggingFace, Modal, FastAPI, RAGAS</p>
          <p className="text-[var(--text-primary)]">Key Achievements:</p>
          <p className="text-[var(--text-secondary)]">• Fine-tuned Llama 3.2 1B with QLoRA (4-bit NF4) on Modal GPUs from 86.6% to 95.5% held-out accuracy.</p>
          <p className="text-[var(--text-secondary)]">• Grounded retrieval over real Windows Server, Active Directory, Hyper-V, and Proxmox documentation.</p>
          <p className="text-[var(--text-secondary)]">• Confidence-gated agent architecture; closed 7 of 12 adversarial bypasses (prompt injections).</p>
          <p className="text-[var(--text-secondary)]">• Automatic escalation on destructive commands before anything dangerous executes.</p>
        </div>
      );
    } else if (lowerCmd === "experience") {
      output = (
        <div className="space-y-2 font-mono text-xs">
          <p className="text-[var(--accent)] font-semibold">Professional Journey:</p>
          {experiences.map((exp) => (
            <div key={exp.id} className="text-[var(--text-secondary)]">
              <span className="text-[var(--text-primary)] font-bold">{exp.role}</span> @ {exp.company} ({exp.period})
              {exp.promotedBadge && <span className="text-[var(--success-led)] ml-2 font-semibold">[{exp.promotedBadge}]</span>}
            </div>
          ))}
        </div>
      );
    } else if (lowerCmd === "resume") {
      output = (
        <div className="font-mono text-xs text-[var(--accent-2)]">
          Dispatching resume download... Opening {siteConfig.resumeUrl}
        </div>
      );
      if (typeof window !== "undefined") {
        window.open(siteConfig.resumeUrl, "_blank");
      }
    } else if (lowerCmd === "contact") {
      output = (
        <div className="space-y-1 font-mono text-xs text-[var(--text-secondary)]">
          <p>Email: <a href={`mailto:${siteConfig.email}`} className="text-[var(--accent)] underline">{siteConfig.email}</a></p>
          <p>LinkedIn: <a href={siteConfig.linkedin} target="_blank" rel="noopener noreferrer" className="text-[var(--accent)] underline">{siteConfig.linkedin}</a></p>
          <p>GitHub: <a href={siteConfig.github} target="_blank" rel="noopener noreferrer" className="text-[var(--accent)] underline">{siteConfig.github}</a></p>
          <p>Location: {siteConfig.location}</p>
        </div>
      );
    } else if (lowerCmd === "theme dark") {
      setTheme("dark");
      output = <span className="font-mono text-xs text-[var(--accent)]">Theme switched to Dark mode.</span>;
    } else if (lowerCmd === "theme light") {
      setTheme("light");
      output = <span className="font-mono text-xs text-[var(--accent)]">Theme switched to Light mode.</span>;
    } else if (lowerCmd === "sudo hire shrey") {
      output = (
        <div className="space-y-1 font-mono text-xs text-[var(--success-led)]">
          <p className="font-bold">[ACCESS GRANTED: ROOT LEVEL]</p>
          <p>✔ Candidate credentials verified: Enterprise Storage + Applied AI.</p>
          <p>✔ Culture alignment: High ownership, zero downtime ethos.</p>
          <p className="text-[var(--accent-2)]">Initiating contact dispatch sequence... Routing directly to contact channel.</p>
        </div>
      );
      setTimeout(() => {
        setIsOpen(false);
        const contactSection = document.getElementById("contact");
        contactSection?.scrollIntoView({ behavior: "smooth" });
      }, 900);
    } else {
      output = (
        <span className="font-mono text-xs text-red-400">
          Command not found: &apos;{cmd}&apos;. Type &apos;help&apos; for available commands.
        </span>
      );
    }

    setHistory((prev) => [...prev, { command: cmd, output }]);
    setInputVal("");
  };

  const handleKeyDownInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleCommand(inputVal);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (pastCommands.length === 0) return;
      const nextIdx = historyIndex + 1;
      if (nextIdx < pastCommands.length) {
        setHistoryIndex(nextIdx);
        setInputVal(pastCommands[pastCommands.length - 1 - nextIdx]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex > 0) {
        const nextIdx = historyIndex - 1;
        setHistoryIndex(nextIdx);
        setInputVal(pastCommands[pastCommands.length - 1 - nextIdx]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInputVal("");
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      const current = inputVal.toLowerCase();
      if (!current) return;
      const match = AVAILABLE_COMMANDS.find((c) => c.startsWith(current));
      if (match) {
        setInputVal(match);
      }
    }
  };

  return (
    <>
      {/* Floating CLI Toggle Button (Bottom-Right) */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        aria-label="Open Interactive Terminal (Cmd+K)"
        className="fixed bottom-6 right-6 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--bg-elevated)]/90 text-[var(--accent-2)] backdrop-blur-xl shadow-xl transition-all duration-300 hover:border-[var(--accent-2)] hover:scale-110 active:scale-95 group"
      >
        <TerminalIcon className="h-4 w-4 transition-transform group-hover:rotate-6" />
        <span className="sr-only">Open Terminal</span>
      </button>

      {/* Glass Terminal Modal */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsOpen(false);
          }}
        >
          <div
            className={`relative flex flex-col overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--bg-elevated)]/95 shadow-2xl backdrop-blur-2xl transition-all duration-300 ${isExpanded
              ? "h-[92vh] w-full max-w-[1000px]"
              : "h-[82vh] sm:h-[540px] max-h-[640px] w-full max-w-[700px]"
              }`}
          >
            {/* Terminal Window Title Bar */}
            <div className="flex items-center justify-between border-b border-[var(--border)] bg-[var(--surface-glass)] px-4 py-3 select-none">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-red-500/80 cursor-pointer" onClick={() => setIsOpen(false)} />
                <span className="h-3 w-3 rounded-full bg-amber-500/80 cursor-pointer" onClick={() => setHistory([])} />
                <span className="h-3 w-3 rounded-full bg-green-500/80 cursor-pointer" onClick={() => setIsExpanded(!isExpanded)} />
                <span className="ml-2 font-mono text-xs text-[var(--text-secondary)]">
                  shrey@infra-ai:~ (zsh)
                </span>
              </div>

              <div className="flex items-center gap-2 text-[var(--text-secondary)]">
                <span className="hidden sm:inline font-mono text-[10px] bg-[var(--surface-glass)] border border-[var(--border)] rounded px-1.5 py-0.5">
                  esc to close
                </span>
                <button
                  type="button"
                  onClick={() => setIsExpanded(!isExpanded)}
                  aria-label="Toggle Fullscreen"
                  className="hover:text-[var(--text-primary)] transition-colors p-1"
                >
                  {isExpanded ? <Minimize2 className="h-3.5 w-3.5" /> : <Maximize2 className="h-3.5 w-3.5" />}
                </button>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  aria-label="Close Terminal"
                  className="hover:text-[var(--text-primary)] transition-colors p-1"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Terminal Body Scroll Area */}
            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 font-mono text-xs"
            >
              {history.map((item, idx) => (
                <div key={idx} className="space-y-1">
                  {item.command !== "welcome" && (
                    <div className="flex items-center gap-2 text-[var(--accent)] font-semibold">
                      <span className="text-[var(--text-secondary)]">shrey@infra-ai:~$</span>
                      <span>{item.command}</span>
                    </div>
                  )}
                  <div className="pt-0.5">{item.output}</div>
                </div>
              ))}
            </div>

            {/* Input Line */}
            <div className="border-t border-[var(--border)] bg-[var(--surface-glass)] p-3 px-4 flex items-center gap-2">
              <span className="font-mono text-xs text-[var(--accent-2)] font-bold">
                shrey@infra-ai:~$
              </span>
              <input
                ref={inputRef}
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                onKeyDown={handleKeyDownInput}
                placeholder="type 'help', 'skills', 'sudo hire shrey'..."
                className="flex-1 bg-transparent font-mono text-xs text-[var(--text-primary)] placeholder-[var(--text-secondary)]/50 focus:outline-none"
              />
              <CornerDownLeft className="h-3 w-3 text-[var(--text-secondary)] opacity-50" />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
