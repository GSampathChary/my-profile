"use client";

import type { ReactNode } from "react";
import type { Project } from "@/types/project";
import { cn } from "@/lib/utils";
import { getProjectExperienceHref, getProjectExperienceLabel, getProjectPublicHref, getProjectPublicLabel } from "@/lib/projectExperience";

type ProjectModalProps = {
  project: Project | null;
  onClose: () => void;
};

function ActionLink({
  href,
  children,
  className
}: {
  href?: string | null;
  children: ReactNode;
  className?: string;
}) {
  if (!href) {
    return <span className={cn("rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-400", className)}>TODO</span>;
  }

  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noreferrer" : undefined}
      className={cn("rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-100 transition hover:bg-white/10", className)}
    >
      {children}
    </a>
  );
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/70 px-4 py-10 backdrop-blur-sm">
      <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl border border-white/10 bg-slate-950 p-6 text-slate-100 shadow-2xl shadow-black/60">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-xs uppercase tracking-[0.35em] text-cyan-200/60">{project.category}</div>
            <a
              href={getProjectPublicHref(project)}
              target={getProjectPublicHref(project).startsWith("http") ? "_blank" : undefined}
              rel={getProjectPublicHref(project).startsWith("http") ? "noreferrer" : undefined}
              className="mt-2 inline-block text-2xl font-semibold transition hover:text-cyan-200"
            >
              {project.name}
            </a>
            <div className="mt-2">
              <a
                href={getProjectPublicHref(project)}
                target={getProjectPublicHref(project).startsWith("http") ? "_blank" : undefined}
                rel={getProjectPublicHref(project).startsWith("http") ? "noreferrer" : undefined}
                className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-[11px] uppercase tracking-[0.25em] text-cyan-50 transition hover:bg-cyan-300/20"
              >
                {getProjectPublicLabel(project)}
              </a>
            </div>
            <p className="mt-1 text-sm text-cyan-100/80">{project.tagline}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-200"
          >
            Close
          </button>
        </div>

        <div className="mt-6 grid gap-5 md:grid-cols-[1.25fr_0.75fr]">
          <div className="space-y-5">
            <section className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <h4 className="text-sm font-medium uppercase tracking-[0.3em] text-cyan-200/70">Description</h4>
              <p className="mt-3 text-sm leading-6 text-slate-300">{project.description}</p>
            </section>
            <section className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <h4 className="text-sm font-medium uppercase tracking-[0.3em] text-cyan-200/70">Problem</h4>
              <p className="mt-3 text-sm leading-6 text-slate-300">{project.problem}</p>
            </section>
            <section className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <h4 className="text-sm font-medium uppercase tracking-[0.3em] text-cyan-200/70">Solution</h4>
              <p className="mt-3 text-sm leading-6 text-slate-300">{project.solution}</p>
            </section>
          </div>

          <div className="space-y-5">
            <section className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <h4 className="text-sm font-medium uppercase tracking-[0.3em] text-cyan-200/70">Technologies</h4>
              <div className="mt-3 flex flex-wrap gap-2">
                {project.technologies.map((technology) => (
                  <span key={technology} className="rounded-full bg-white/8 px-3 py-1 text-xs text-slate-200">
                    {technology}
                  </span>
                ))}
              </div>
            </section>
            <section className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <h4 className="text-sm font-medium uppercase tracking-[0.3em] text-cyan-200/70">Features</h4>
              <ul className="mt-3 space-y-2 text-sm text-slate-300">
                {project.features.map((feature) => (
                  <li key={feature}>- {feature}</li>
                ))}
              </ul>
            </section>
            {project.highlights?.length ? (
              <section className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <h4 className="text-sm font-medium uppercase tracking-[0.3em] text-cyan-200/70">Highlights</h4>
                <ul className="mt-3 space-y-2 text-sm text-slate-300">
                  {project.highlights.map((highlight) => (
                    <li key={highlight}>- {highlight}</li>
                  ))}
                </ul>
              </section>
            ) : null}
            {project.screenshots?.length ? (
              <section className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <h4 className="text-sm font-medium uppercase tracking-[0.3em] text-cyan-200/70">Screenshots</h4>
                <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-3">
                  {project.screenshots.slice(0, 3).map((shot) => (
                    <div key={shot} className="rounded-2xl border border-white/10 bg-slate-900/70 p-3 text-xs text-slate-200">
                      {shot}
                    </div>
                  ))}
                </div>
              </section>
            ) : null}
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <ActionLink href={project.uiPath}>Project Story</ActionLink>
          <ActionLink href={getProjectExperienceHref(project)}>{getProjectExperienceLabel(project)}</ActionLink>
          <ActionLink href={project.links.live}>Live Demo</ActionLink>
          <ActionLink href={project.links.github}>GitHub</ActionLink>
          <ActionLink href={project.links.architecture}>Architecture</ActionLink>
          <ActionLink href={project.links.playStore}>Play Store</ActionLink>
          <ActionLink href={project.links.caseStudy}>Case Study</ActionLink>
        </div>
      </div>
    </div>
  );
}
