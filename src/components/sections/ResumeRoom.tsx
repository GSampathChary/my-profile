import Link from "next/link";
import type { ReactNode } from "react";
import { portfolio } from "@/data/portfolio";
import { socialLinks } from "@/lib/projectLinks";
import { getProjectPublicHref, getProjectPublicLabel } from "@/lib/projectExperience";

type ResumeRoomProps = {
  resumeAvailable?: boolean;
};

export function ResumeRoom({ resumeAvailable = false }: ResumeRoomProps) {
  return (
    <section className="space-y-6">
      <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-glow backdrop-blur-xl">
        <div className="text-xs uppercase tracking-[0.4em] text-cyan-200/60">Resume Room</div>
        <div className="mt-4 flex flex-col gap-4 md:flex-row md:items-center">
          <div className="relative h-28 w-28 overflow-hidden rounded-[28px] border border-white/10 bg-slate-900 shadow-2xl shadow-black/30">
            <img src="/images/sampath.png" alt={portfolio.profile.name} className="h-full w-full object-cover object-center" />
          </div>
          <div>
            <h1 className="text-3xl font-semibold text-white">Professional Summary</h1>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-300">{portfolio.profile.introduction}</p>
          </div>
        </div>
        <div className="mt-4 flex flex-wrap gap-3">
          <a href="/" className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-100">
            Portfolio
          </a>
          <Link href="/projects" className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-100">
            Projects
          </Link>
          <Link href="/experience" className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-100">
            Experience
          </Link>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card title="Skills">
          {Object.entries(portfolio.skills).map(([label, items]) => (
            <div key={label} className="mb-4">
              <div className="text-xs uppercase tracking-[0.3em] text-cyan-200/60">{label}</div>
              <div className="mt-2 flex flex-wrap gap-2">
                {items.map((item) => (
                  <span key={item} className="rounded-full bg-white/5 px-3 py-1 text-xs text-slate-200">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </Card>

        <Card title="Education">
          <div className="text-white">{portfolio.education.degree}</div>
          <div className="mt-2 text-slate-300">{portfolio.education.college}</div>
          <div className="mt-2 text-slate-400">{portfolio.education.year}</div>
          <div className="mt-4 text-sm text-slate-400">{portfolio.education.university}</div>
        </Card>

        <Card title="Projects">
          <ul className="space-y-3 text-sm text-slate-300">
            {portfolio.projects.map((project) => (
              <li key={project.id}>
                <div className="flex items-start justify-between gap-3">
                  <a
                    href={getProjectPublicHref(project)}
                    target={getProjectPublicHref(project).startsWith("http") ? "_blank" : undefined}
                    rel={getProjectPublicHref(project).startsWith("http") ? "noreferrer" : undefined}
                    className="font-medium text-white transition hover:text-cyan-200"
                  >
                    {project.name}
                  </a>
                  <a
                    href={getProjectPublicHref(project)}
                    target={getProjectPublicHref(project).startsWith("http") ? "_blank" : undefined}
                    rel={getProjectPublicHref(project).startsWith("http") ? "noreferrer" : undefined}
                    className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-[11px] uppercase tracking-[0.25em] text-cyan-50 transition hover:bg-cyan-300/20"
                  >
                    {getProjectPublicLabel(project)}
                  </a>
                </div>
                <div className="text-slate-400">{project.tagline}</div>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <div className="flex flex-wrap gap-3">
        {resumeAvailable ? (
          <a href="/resume/resume.pdf" download className="rounded-full bg-cyan-300 px-4 py-2 text-sm font-medium text-slate-950">
            View Resume
          </a>
        ) : (
          <span className="rounded-full bg-cyan-300/20 px-4 py-2 text-sm text-cyan-50">
            View Resume - PDF placeholder not added yet
          </span>
        )}
        <a
          href="/resume/resume.pdf"
          download
          className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-100"
        >
          Download PDF
        </a>
        <a href={socialLinks.email} className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-100">
          Contact
        </a>
        <Link href="/projects" className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-100">
          Project UIs
        </Link>
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
