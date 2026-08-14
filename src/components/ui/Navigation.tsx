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
    <header className="flex flex-col gap-3 rounded-3xl border border-white/10 bg-slate-950/75 p-3 shadow-glow backdrop-blur-xl sm:gap-4 sm:p-4 lg:flex-row lg:items-center lg:justify-between">
      <div>
        <div className="text-[10px] uppercase tracking-[0.3em] text-cyan-200/60 sm:text-xs sm:tracking-[0.45em]">AI Engineer Lab</div>
        <h2 className="mt-1 text-lg font-semibold text-white sm:mt-2 sm:text-xl">Gannoju Sampath Chary</h2>
      </div>
      <nav className="flex flex-wrap gap-2">
        {appRoutes.map((route) => {
          const active = pathname === route.href;
          return (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "rounded-full border px-3 py-2 text-xs transition sm:px-4 sm:text-sm",
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
            "rounded-full px-3 py-2 text-xs transition sm:px-4 sm:text-sm",
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
            "rounded-full px-3 py-2 text-xs transition sm:px-4 sm:text-sm",
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
