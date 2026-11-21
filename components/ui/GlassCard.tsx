import React from "react";
import { cn } from "@/lib/utils";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  glow?: "accent" | "none";
  hoverEffect?: boolean;
}

export function GlassCard({
  children,
  className,
  glow = "none",
  hoverEffect = true,
  ...props
}: GlassCardProps) {
  return (
    <div
      className={cn(
        "glass-panel relative overflow-hidden rounded-[20px] md:rounded-[24px] p-6 md:p-8 transition-all duration-300",
        hoverEffect &&
          "hover:border-[var(--border-strong)] hover:shadow-xl hover:shadow-black/30 hover:-translate-y-0.5",
        glow === "accent" && "shadow-[0_0_24px_var(--glow-accent)] border-[var(--border-focus)]",
        className
      )}
      {...props}
    >
      {/* Precision hairline optical highlight on top edge */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/15 to-transparent"
        aria-hidden="true"
      />
      {children}
    </div>
  );
}
