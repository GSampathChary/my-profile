"use client";

import { cn } from "@/lib/utils";
import { getTechnologyMeta } from "@/lib/technologyCatalog";

type TechnologyBadgeProps = {
  technology: string;
  className?: string;
  size?: "sm" | "md";
  iconOnly?: boolean;
  onClick?: () => void;
};

export function TechnologyBadge({ technology, className, size = "md", iconOnly = false, onClick }: TechnologyBadgeProps) {
  const meta = getTechnologyMeta(technology);
  const content = (
    <>
      <span
        className={cn(
          "inline-flex items-center justify-center rounded-full border font-mono font-bold uppercase tracking-[0.16em]",
          size === "sm" ? "h-6 w-6 text-[9px]" : "h-7 w-7 text-[10px]"
        )}
        style={{ backgroundColor: meta.accent.bg, color: meta.accent.fg, borderColor: meta.accent.border }}
      >
        {meta.initials}
      </span>
      {!iconOnly ? <span className={cn(size === "sm" ? "text-[11px]" : "text-xs", "font-medium")}>{meta.label}</span> : null}
    </>
  );

  const sharedClassName = cn(
    "inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-slate-100 transition hover:-translate-y-0.5 hover:bg-white/10 hover:shadow-lg",
    size === "sm" ? "px-2.5 py-1 text-[11px]" : "px-3 py-1.5 text-xs",
    className
  );

  if (!meta.href) {
    return (
      <span className={sharedClassName} title={meta.label}>
        {content}
      </span>
    );
  }

  return (
    <button
      type="button"
      onClick={() => {
        onClick?.();
        window.open(meta.href as string, "_blank", "noreferrer");
      }}
      className={sharedClassName}
      title={`${meta.label} official site`}
      aria-label={`${meta.label} official site`}
    >
      {content}
    </button>
  );
}
