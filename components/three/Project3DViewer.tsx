"use client";

import React from "react";
import dynamic from "next/dynamic";

const DynamicDualRegionGlobe = dynamic(
  () => import("./DualRegionGlobe").then((m) => m.DualRegionGlobe),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-[360px] w-full flex-col items-center justify-center p-6 text-center">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-[var(--border)] border-t-[var(--accent)]" />
        <span className="mt-3 font-mono text-xs text-[var(--text-secondary)]">
          Mounting Dual-Region Globe 3D...
        </span>
      </div>
    ),
  }
);

const DynamicNasExploded = dynamic(
  () => import("./NasExploded").then((m) => m.NasExploded),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-[380px] w-full flex-col items-center justify-center p-6 text-center">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-[var(--border)] border-t-[var(--accent)]" />
        <span className="mt-3 font-mono text-xs text-[var(--text-secondary)]">
          Mounting Exploded NAS Model 3D...
        </span>
      </div>
    ),
  }
);

const DynamicAgentGraph = dynamic(
  () => import("./AgentGraph").then((m) => m.AgentGraph),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-[360px] w-full flex-col items-center justify-center p-6 text-center">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-[var(--border)] border-t-[var(--accent-2)]" />
        <span className="mt-3 font-mono text-xs text-[var(--text-secondary)]">
          Mounting Agent Graph 3D...
        </span>
      </div>
    ),
  }
);

export function Project3DViewer({
  modelType,
}: {
  modelType: "dualGlobe" | "nasExploded" | "agentGraph";
}) {
  if (modelType === "dualGlobe") return <DynamicDualRegionGlobe />;
  if (modelType === "nasExploded") return <DynamicNasExploded />;
  if (modelType === "agentGraph") return <DynamicAgentGraph />;
  return null;
}
