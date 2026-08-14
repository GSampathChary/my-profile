"use client";

import { cn } from "@/lib/utils";

type InstructionsProps = {
  className?: string;
};

const items = [
  ["W A S D", "Move"],
  ["Mouse", "Look"],
  ["Click", "Interact"],
  ["Esc", "Menu"]
];

export function Instructions({ className }: InstructionsProps) {
  return (
    <aside
      className={cn(
        "rounded-2xl border border-white/10 bg-slate-950/65 p-4 text-xs text-slate-200 shadow-glow backdrop-blur-xl",
        className
      )}
    >
      <div className="mb-3 text-[11px] uppercase tracking-[0.35em] text-cyan-200/70">
        Controls
      </div>
      <div className="space-y-2">
        {items.map(([key, label]) => (
          <div key={key} className="flex items-center justify-between gap-4">
            <span className="rounded-lg border border-white/10 bg-white/5 px-2 py-1 font-mono text-[11px] text-cyan-100">
              {key}
            </span>
            <span className="text-slate-300">{label}</span>
          </div>
        ))}
      </div>
      <p className="mt-3 text-[11px] leading-5 text-slate-400">
        Mobile users can tap hotspots or switch to recruiter mode immediately.
      </p>
    </aside>
  );
}
