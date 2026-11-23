"use client";

import React, { useEffect, useState, useRef } from "react";
import dynamic from "next/dynamic";
import { Box, Layers, RefreshCw, Smartphone } from "lucide-react";

interface AgentGraphViewerProps {
  className?: string;
  selectedId: string;
  onNodeChange: (id: string) => void;
}

// SVG Node Layout
interface SvgNode {
  id: string;
  label: string;
  sublabel: string;
  x: number;
  y: number;
  color: string;
  accent: string;
}

const SVG_NODES: SvgNode[] = [
  {
    id: "ticket",
    label: "Incident Ingest",
    sublabel: "Event Bus",
    x: 80,
    y: 170,
    color: "#77E7FE",
    accent: "#F15419",
  },
  {
    id: "llm",
    label: "QLoRA Classifier",
    sublabel: "Llama 3.2 1B (95.5%)",
    x: 230,
    y: 90,
    color: "#F15419",
    accent: "#77E7FE",
  },
  {
    id: "rag",
    label: "Hybrid Vector RAG",
    sublabel: "Qdrant Store",
    x: 230,
    y: 250,
    color: "#77E7FE",
    accent: "#F15419",
  },
  {
    id: "gate",
    label: "Confidence Gate",
    sublabel: "p ≥ 0.85 Boundary",
    x: 400,
    y: 170,
    color: "#F15419",
    accent: "#77E7FE",
  },
  {
    id: "runbook",
    label: "Runbook Guidance",
    sublabel: "Verified Answer",
    x: 580,
    y: 80,
    color: "#22C55E",
    accent: "#77E7FE",
  },
  {
    id: "telemetry",
    label: "Live Health Probe",
    sublabel: "Read-Only Check",
    x: 600,
    y: 170,
    color: "#77E7FE",
    accent: "#F15419",
  },
  {
    id: "human",
    label: "Human Escalation",
    sublabel: "Deterministic Halt",
    x: 580,
    y: 260,
    color: "#EF4444",
    accent: "#F15419",
  },
];

const DynamicAgentGraph = dynamic(
  () => import("@/components/three/AgentGraph").then((m) => m.AgentGraph),
  { ssr: false }
);

function isWebGLAvailable(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const canvas = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
    );
  } catch {
    return false;
  }
}

function isMobileDevice(): boolean {
  if (typeof window === "undefined") return false;
  return (
    window.innerWidth < 768 ||
    window.matchMedia("(pointer: coarse)").matches ||
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
  );
}

export function AgentGraphViewer({
  className = "h-full w-full",
  selectedId,
  onNodeChange,
}: AgentGraphViewerProps) {
  const [viewMode, setViewMode] = useState<"3d" | "svg" | "loading">("loading");
  const [fallbackReason, setFallbackReason] = useState<string>("");
  const [canUse3D, setCanUse3D] = useState<boolean>(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // 1. Mobile check
    if (isMobileDevice()) {
      setViewMode("svg");
      setFallbackReason("mobile");
      return;
    }

    // 2. WebGL check
    if (!isWebGLAvailable()) {
      setViewMode("svg");
      setFallbackReason("no-webgl");
      return;
    }

    setCanUse3D(true);

    // 3. 4-second timeout safeguard: if 3D does not render within 4 seconds, show SVG fallback
    timeoutRef.current = setTimeout(() => {
      setViewMode((prev) => {
        if (prev === "loading") {
          setFallbackReason("timeout");
          return "svg";
        }
        return prev;
      });
    }, 4000);

    // Pre-mount test: switch to 3D once mounted
    const mountTimer = setTimeout(() => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      setViewMode("3d");
    }, 400);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      clearTimeout(mountTimer);
    };
  }, []);

  return (
    <div className={`relative flex flex-col items-center justify-center overflow-hidden bg-[#0C0C0A] ${className}`}>
      {/* Top Header Mode Toggle & Badging */}
      <div className="absolute top-2.5 right-3 z-20 flex items-center gap-2">
        {viewMode === "svg" && (
          <span className="inline-flex items-center gap-1 font-mono text-[10px] text-[#77E7FE] bg-[#77E7FE]/10 border border-[#77E7FE]/30 px-2 py-0.5 rounded">
            {fallbackReason === "mobile" && <Smartphone className="h-3 w-3" />}
            {fallbackReason === "timeout" && <RefreshCw className="h-3 w-3" />}
            <span>SCHEMATIC (SVG)</span>
          </span>
        )}

        {canUse3D && viewMode === "svg" && (
          <button
            type="button"
            onClick={() => setViewMode("3d")}
            className="inline-flex items-center gap-1 font-mono text-[10px] text-[var(--accent)] bg-black/60 border border-[var(--border)] px-2 py-0.5 rounded hover:border-[var(--accent)] transition-colors"
          >
            <Box className="h-3 w-3" />
            <span>Launch 3D</span>
          </button>
        )}

        {viewMode === "3d" && (
          <button
            type="button"
            onClick={() => setViewMode("svg")}
            className="inline-flex items-center gap-1 font-mono text-[10px] text-[var(--text-muted)] bg-black/60 border border-[var(--border)] px-2 py-0.5 rounded hover:text-white transition-colors"
          >
            <Layers className="h-3 w-3" />
            <span>2D Schematic</span>
          </button>
        )}
      </div>

      {/* Viewport Render: 3D, Loading, or SVG */}
      {viewMode === "3d" ? (
        <DynamicAgentGraph
          className="h-full w-full"
          selectedId={selectedId}
          onNodeChange={onNodeChange}
        />
      ) : viewMode === "loading" ? (
        <div className="flex h-full w-full flex-col items-center justify-center p-6 text-center">
          <div className="h-7 w-7 animate-spin rounded-full border-2 border-white/10 border-t-[#F15419]" />
          <span className="mt-3 font-mono text-xs text-[var(--text-secondary)]">
            INITIALIZING AGENT STATE GRAPH...
          </span>
          <span className="mt-1 font-mono text-[10px] text-[var(--text-muted)]">
            (Switching to SVG schematic if taking &gt; 4s)
          </span>
        </div>
      ) : (
        /* Static SVG Architecture Schematic Fallback */
        <div className="relative h-full w-full flex items-center justify-center p-2 select-none">
          <svg
            viewBox="0 0 680 340"
            className="w-full h-full max-h-[340px]"
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              <linearGradient id="edgeOrangeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#F15419" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#77E7FE" stopOpacity="0.5" />
              </linearGradient>
              <linearGradient id="edgeGlacierGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#77E7FE" stopOpacity="0.7" />
                <stop offset="100%" stopColor="#F15419" stopOpacity="0.6" />
              </linearGradient>
              <marker
                id="arrowCyan"
                viewBox="0 0 10 10"
                refX="6"
                refY="5"
                markerWidth="6"
                markerHeight="6"
                orient="auto-start-reverse"
              >
                <path d="M 0 1 L 8 5 L 0 9 z" fill="#77E7FE" />
              </marker>
              <marker
                id="arrowOrange"
                viewBox="0 0 10 10"
                refX="6"
                refY="5"
                markerWidth="6"
                markerHeight="6"
                orient="auto-start-reverse"
              >
                <path d="M 0 1 L 8 5 L 0 9 z" fill="#F15419" />
              </marker>
            </defs>

            {/* Subtle Circuit Grid */}
            <g stroke="rgba(255,255,255,0.04)" strokeWidth="1">
              <line x1="80" y1="0" x2="80" y2="340" />
              <line x1="230" y1="0" x2="230" y2="340" />
              <line x1="400" y1="0" x2="400" y2="340" />
              <line x1="580" y1="0" x2="580" y2="340" />
              <line x1="0" y1="170" x2="680" y2="170" strokeDasharray="3 3" />
            </g>

            {/* Directed Edge Splines */}
            <g strokeWidth="1.75" fill="none">
              {/* Ingest -> Classifier */}
              <path
                d="M 120 160 C 160 140, 180 105, 195 95"
                stroke="url(#edgeOrangeGrad)"
                markerEnd="url(#arrowOrange)"
              />
              {/* Classifier -> Hybrid RAG */}
              <path
                d="M 230 115 L 230 220"
                stroke="url(#edgeGlacierGrad)"
                strokeDasharray="4 3"
                markerEnd="url(#arrowCyan)"
              />
              {/* Classifier -> Confidence Gate */}
              <path
                d="M 265 95 C 320 110, 345 145, 365 160"
                stroke="url(#edgeOrangeGrad)"
                markerEnd="url(#arrowOrange)"
              />
              {/* Hybrid RAG -> Confidence Gate */}
              <path
                d="M 265 245 C 320 230, 345 195, 365 180"
                stroke="url(#edgeGlacierGrad)"
                markerEnd="url(#arrowCyan)"
              />
              {/* Gate -> Runbook Guidance */}
              <path
                d="M 435 155 C 480 130, 510 95, 545 85"
                stroke="#22C55E"
                strokeOpacity="0.75"
                markerEnd="url(#arrowCyan)"
              />
              {/* Gate -> Live Health Probe */}
              <path
                d="M 440 170 L 560 170"
                stroke="#77E7FE"
                strokeOpacity="0.85"
                strokeDasharray="4 3"
                markerEnd="url(#arrowCyan)"
              />
              {/* Gate -> Human Escalation */}
              <path
                d="M 435 185 C 480 210, 510 245, 545 255"
                stroke="#EF4444"
                strokeOpacity="0.8"
                markerEnd="url(#arrowOrange)"
              />
            </g>

            {/* Interactive Nodes */}
            {SVG_NODES.map((node) => {
              const isSelected = selectedId === node.id;
              const isGate = node.id === "gate";

              return (
                <g
                  key={node.id}
                  transform={`translate(${node.x}, ${node.y})`}
                  className="cursor-pointer group"
                  onClick={() => onNodeChange(node.id)}
                >
                  {/* Outer Pulsing Halo when Selected */}
                  {isSelected && (
                    <circle
                      r={isGate ? 32 : 26}
                      fill="none"
                      stroke={node.accent}
                      strokeWidth="1.5"
                      strokeDasharray="4 2"
                      className="animate-spin"
                      style={{ transformOrigin: "0 0" }}
                    />
                  )}

                  {/* Secondary Radar Ring for Gate */}
                  {isGate && (
                    <circle
                      r="24"
                      fill="none"
                      stroke="#77E7FE"
                      strokeWidth="1"
                      strokeOpacity="0.4"
                    />
                  )}

                  {/* Core Node Circle */}
                  <circle
                    r={isGate ? 18 : 14}
                    fill="#141412"
                    stroke={isSelected ? node.accent : node.color}
                    strokeWidth={isSelected ? 2.5 : 1.5}
                    filter={isSelected ? "drop-shadow(0 0 8px rgba(241,84,25,0.6))" : undefined}
                  />

                  {/* Inner LED core */}
                  <circle
                    r={isGate ? 6 : 4.5}
                    fill={node.color}
                  />

                  {/* Node Title Text */}
                  <text
                    y={node.y > 200 ? 30 : -22}
                    textAnchor="middle"
                    fill={isSelected ? "#FFFFFF" : "#E5E5E5"}
                    fontSize="11"
                    fontFamily="monospace"
                    fontWeight={isSelected ? "bold" : "600"}
                  >
                    {node.label}
                  </text>

                  {/* Sublabel Text */}
                  <text
                    y={node.y > 200 ? 42 : -10}
                    textAnchor="middle"
                    fill={node.color}
                    fontSize="9"
                    fontFamily="monospace"
                    fillOpacity="0.85"
                  >
                    {node.sublabel}
                  </text>
                </g>
              );
            })}
          </svg>

          {/* Bottom Floating Instruction */}
          <div className="pointer-events-none absolute bottom-2 left-3 z-10 flex items-center gap-2 font-mono text-[10px] text-[var(--text-muted)] bg-[var(--bg)]/85 px-2.5 py-0.5 rounded-full border border-[var(--border)]">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)] animate-ping" />
            <span>CLICK NODE TO INSPECT DETAILS</span>
          </div>
        </div>
      )}
    </div>
  );
}
