import Link from "next/link";
import type { ReactNode } from "react";
import { portfolio } from "@/data/portfolio";
import { socialLinks } from "@/lib/projectLinks";
import { TechnologyBadge } from "@/components/ui/TechnologyBadge";

export function ProfessionalRoom() {
  return (
    <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
      <div className="space-y-6">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-glow backdrop-blur-xl">
          <div className="text-xs uppercase tracking-[0.4em] text-cyan-200/60">Professional Mode</div>
          <h1 className="mt-3 text-3xl font-semibold text-white">{portfolio.profile.name}</h1>
          <p className="mt-3 text-sm leading-6 text-slate-300">{portfolio.profile.headline}</p>
          <p className="mt-4 text-sm leading-6 text-slate-400">{portfolio.profile.introduction}</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <Card title="Experience">
            <div className="text-white">{portfolio.experience.company}</div>
            <div className="mt-1 text-slate-400">{portfolio.experience.role}</div>
          </Card>
          <Card title="Contact">
            <div className="space-y-2 text-sm text-slate-300">
              <div>{portfolio.profile.location}</div>
              <div>{portfolio.profile.email}</div>
            </div>
          </Card>
        </div>
      </div>

      <div className="space-y-6">
        <Card title="Tech Stack">
          <div className="flex flex-wrap gap-2">
            {Object.entries(portfolio.skills)
              .flatMap(([, values]) => values)
              .slice(0, 18)
              .map((item) => (
                <TechnologyBadge key={item} technology={item} size="sm" className="border-white/10 bg-white/5 text-slate-200" />
              ))}
          </div>
        </Card>
        <Card title="Direct Links">
          <div className="flex flex-wrap gap-3">
            <a href={socialLinks.github} target="_blank" rel="noreferrer" className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-100">
              GitHub
            </a>
            <a href={socialLinks.linkedIn} target="_blank" rel="noreferrer" className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-100">
              LinkedIn
            </a>
            <a href={socialLinks.email} className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-100">
              Email
            </a>
            <Link href="/resume" className="rounded-full bg-cyan-300 px-4 py-2 text-sm font-medium text-slate-950">
              Resume
            </Link>
          </div>
        </Card>
      </div>
    </section>
  );
}

function Card({ title, children }: { title: string; children: ReactNode }) {
  return (
    <article className="rounded-3xl border border-white/10 bg-slate-950/70 p-6">
      <h2 className="text-lg font-semibold text-white">{title}</h2>
      <div className="mt-4">{children}</div>
    </article>
  );
}
