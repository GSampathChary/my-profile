"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { appRoutes } from "@/lib/constants";
import { cn } from "@/lib/utils";

type NavigationProps = {
  mode: "explore" | "recruiter";
  onModeChange: (mode: "explore" | "recruiter") => void;
};

export function Navigation({ mode, onModeChange }: NavigationProps) {
  const pathname = usePathname();

  return (
    <header className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-slate-950/75 p-4 shadow-glow backdrop-blur-xl lg:flex-row lg:items-center lg:justify-between">
      <div>
        <div className="text-xs uppercase tracking-[0.45em] text-cyan-200/60">AI Engineer Lab</div>
        <h2 className="mt-2 text-xl font-semibold text-white">Gannoju Sampath Chary</h2>
      </div>
      <nav className="flex flex-wrap gap-2">
        {appRoutes.map((route) => {
          const active = pathname === route.href;
          return (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "rounded-full border px-4 py-2 text-sm transition",
                active
                  ? "border-cyan-300/30 bg-cyan-300/15 text-cyan-50"
                  : "border-white/10 bg-white/5 text-slate-200 hover:bg-white/10"
              )}
            >
              {route.label}
            </Link>
          );
        })}
      </nav>
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => onModeChange("explore")}
          className={cn(
            "rounded-full px-4 py-2 text-sm transition",
            mode === "explore"
              ? "bg-white text-slate-950"
              : "border border-white/10 bg-white/5 text-slate-200 hover:bg-white/10"
          )}
        >
          Explore Mode
        </button>
        <button
          type="button"
          onClick={() => onModeChange("recruiter")}
          className={cn(
            "rounded-full px-4 py-2 text-sm transition",
            mode === "recruiter"
              ? "bg-cyan-300 text-slate-950"
              : "border border-cyan-300/20 bg-cyan-300/10 text-cyan-50 hover:bg-cyan-300/15"
          )}
        >
          Recruiter Mode
        </button>
      </div>
    </header>
  );
}
