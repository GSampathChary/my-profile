"use client";

import Link from "next/link";
import { socialLinks } from "@/lib/projectLinks";

type ContactModalProps = {
  onClose: () => void;
};

export function ContactModal({ onClose }: ContactModalProps) {
  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/70 px-4 py-10 backdrop-blur-sm">
      <div className="w-full max-w-xl rounded-3xl border border-white/10 bg-slate-950 p-6 text-slate-100 shadow-2xl shadow-black/60">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-xs uppercase tracking-[0.35em] text-cyan-200/60">Contact</div>
            <h3 className="mt-2 text-2xl font-semibold">Let&apos;s build something useful</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-200"
          >
            Close
          </button>
        </div>
        <div className="mt-6 grid gap-3">
          <a className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm" href={socialLinks.email}>
            gsampathchary454@gmail.com
          </a>
          <a className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm" href={socialLinks.linkedIn} target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          <a className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm" href={socialLinks.github} target="_blank" rel="noreferrer">
            GitHub
          </a>
        </div>
      </div>
    </div>
  );
}
