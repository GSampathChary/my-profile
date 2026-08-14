"use client";

import { motion } from "framer-motion";
import { Sparkles, Rocket } from "lucide-react";
import { labIntro } from "@/lib/constants";

type LoadingScreenProps = {
  onEnter: () => void;
};

export function LoadingScreen({ onEnter }: LoadingScreenProps) {
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center overflow-hidden bg-[#020617] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.18),transparent_35%),radial-gradient(circle_at_80%_20%,rgba(168,85,247,0.12),transparent_30%),linear-gradient(180deg,rgba(2,6,23,0.96),rgba(3,7,18,0.99))]" />
      <div className="absolute left-[-8%] top-20 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl" />
      <div className="absolute right-[-5%] top-36 h-80 w-80 rounded-full bg-violet-400/10 blur-3xl" />
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55 }}
        className="relative z-10 mx-4 max-w-2xl rounded-[2rem] border border-white/10 bg-slate-950/70 p-8 text-center shadow-2xl shadow-black/50 backdrop-blur-xl"
      >
        <div className="mx-auto mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-xs uppercase tracking-[0.45em] text-cyan-100/80">
          <Sparkles className="h-4 w-4" />
          Launch sequence
        </div>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">{labIntro}</h1>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-slate-300">
          A cinematic portfolio experience inspired by the space-themed 3D reference, tuned to showcase your work with clarity and polish.
        </p>
        <button
          type="button"
          onClick={onEnter}
          className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-cyan-300 px-6 py-3 text-sm font-medium text-slate-950 transition hover:bg-cyan-200 focus:outline-none focus:ring-2 focus:ring-cyan-200"
        >
          <Rocket className="h-4 w-4" />
          Enter Portfolio
        </button>
      </motion.div>
    </div>
  );
}
