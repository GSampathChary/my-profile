"use client";

import { cn } from "@/lib/utils";

type InteractionPromptProps = {
  title: string;
  subtitle?: string;
  className?: string;
};

export function InteractionPrompt({ title, subtitle, className }: InteractionPromptProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-cyan-300/20 bg-cyan-300/10 px-4 py-3 text-sm text-cyan-50 shadow-glow backdrop-blur-md",
        className
      )}
    >
      <div className="font-medium">{title}</div>
      {subtitle ? <div className="mt-1 text-xs text-cyan-100/75">{subtitle}</div> : null}
    </div>
  );
}
