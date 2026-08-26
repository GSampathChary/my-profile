"use client";

import type { ReactNode } from "react";
import type { Project } from "@/types/project";
import { cn } from "@/lib/utils";
import { normalizeScreenshot } from "@/lib/projectScreenshots";
import {
  getProjectBackendHref,
  getProjectBackendLabel,
  getProjectExperienceHref,
  getProjectExperienceLabel,
  getProjectPublicHref,
  getProjectPublicLabel
} from "@/lib/projectExperience";
import { TechnologyBadge } from "@/components/ui/TechnologyBadge";

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
    return <span className={cn("inline-flex w-full justify-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-400 sm:w-auto", className)}>TODO</span>;
  }

  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noreferrer" : undefined}
      className={cn("inline-flex w-full justify-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-100 transition hover:bg-white/10 sm:w-auto", className)}
    >
      {children}
    </a>
  );
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-start justify-center bg-black/85 px-2 py-2 sm:items-center sm:px-4 sm:py-10">
      <div className="max-h-[calc(100vh-1rem)] w-full max-w-3xl overflow-y-auto rounded-[22px] border border-white/10 bg-slate-950/95 p-4 text-slate-100 shadow-2xl shadow-black/60 sm:max-h-[88vh] sm:rounded-3xl sm:p-6">
        <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:gap-4">
          <div>
            <div className="text-[10px] uppercase tracking-[0.35em] text-cyan-200/60 sm:text-xs">{project.category}</div>
            <a
              href={getProjectPublicHref(project)}
              target={getProjectPublicHref(project).startsWith("http") ? "_blank" : undefined}
              rel={getProjectPublicHref(project).startsWith("http") ? "noreferrer" : undefined}
              className="mt-1.5 inline-block text-xl font-semibold transition hover:text-cyan-200 sm:mt-2 sm:text-2xl"
            >
              {project.name}
            </a>
            <div className="mt-2">
              <a
                href={getProjectPublicHref(project)}
                target={getProjectPublicHref(project).startsWith("http") ? "_blank" : undefined}
                rel={getProjectPublicHref(project).startsWith("http") ? "noreferrer" : undefined}
                className="inline-block rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-cyan-50 transition hover:bg-cyan-300/20 sm:text-[11px] sm:tracking-[0.25em]"
              >
                {getProjectPublicLabel(project)}
              </a>
            </div>
            <p className="mt-1 text-xs text-cyan-100/80 sm:text-sm">{project.tagline}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-full shrink-0 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-slate-200 transition hover:bg-white/10 sm:w-auto sm:px-4 sm:py-2 sm:text-sm"
          >
            Close ✕
          </button>
        </div>

        <div className="mt-5 grid gap-4 md:grid-cols-[1.25fr_0.75fr] sm:mt-6 sm:gap-5">
          <div className="space-y-4 sm:space-y-5">
            <section className="rounded-2xl border border-white/10 bg-white/5 p-3.5 sm:p-4">
              <h4 className="text-xs font-medium uppercase tracking-[0.3em] text-cyan-200/70 sm:text-sm">Description</h4>
              <p className="mt-2 text-xs leading-5 text-slate-300 sm:mt-3 sm:text-sm sm:leading-6">{project.description}</p>
            </section>
            <section className="rounded-2xl border border-white/10 bg-white/5 p-3.5 sm:p-4">
              <h4 className="text-xs font-medium uppercase tracking-[0.3em] text-cyan-200/70 sm:text-sm">Problem</h4>
              <p className="mt-2 text-xs leading-5 text-slate-300 sm:mt-3 sm:text-sm sm:leading-6">{project.problem}</p>
            </section>
            <section className="rounded-2xl border border-white/10 bg-white/5 p-3.5 sm:p-4">
              <h4 className="text-xs font-medium uppercase tracking-[0.3em] text-cyan-200/70 sm:text-sm">Solution</h4>
              <p className="mt-2 text-xs leading-5 text-slate-300 sm:mt-3 sm:text-sm sm:leading-6">{project.solution}</p>
            </section>
          </div>

          <div className="space-y-4 sm:space-y-5">
            <section className="rounded-2xl border border-white/10 bg-white/5 p-3.5 sm:p-4">
              <h4 className="text-xs font-medium uppercase tracking-[0.3em] text-cyan-200/70 sm:text-sm">Technologies</h4>
              <div className="mt-3 flex flex-wrap gap-2 sm:gap-2.5">
                {project.technologies.map((technology) => (
                  <TechnologyBadge key={technology} technology={technology} size="sm" className="border-white/10 bg-white/[0.04] text-slate-100" />
                ))}
              </div>
            </section>
            <section className="rounded-2xl border border-white/10 bg-white/5 p-3.5 sm:p-4">
              <h4 className="text-xs font-medium uppercase tracking-[0.3em] text-cyan-200/70 sm:text-sm">Features</h4>
              <ul className="mt-3 space-y-1.5 text-xs text-slate-300 sm:space-y-2 sm:text-sm">
                {project.features.map((feature) => (
                  <li key={feature}>- {feature}</li>
                ))}
              </ul>
            </section>
            {project.highlights?.length ? (
              <section className="rounded-2xl border border-white/10 bg-white/5 p-3.5 sm:p-4">
                <h4 className="text-xs font-medium uppercase tracking-[0.3em] text-cyan-200/70 sm:text-sm">Highlights</h4>
                <ul className="mt-3 space-y-1.5 text-xs text-slate-300 sm:space-y-2 sm:text-sm">
                  {project.highlights.map((highlight) => (
                    <li key={highlight}>- {highlight}</li>
                  ))}
                </ul>
              </section>
            ) : null}
            {project.screenshots?.length ? (
              <section className="rounded-2xl border border-white/10 bg-white/5 p-3.5 sm:p-4">
                <h4 className="text-xs font-medium uppercase tracking-[0.3em] text-cyan-200/70 sm:text-sm">Screenshots</h4>
                <div className="mt-3 grid grid-cols-1 gap-2.5 sm:grid-cols-2 sm:gap-3 lg:grid-cols-3">
                  {project.screenshots.map((shot, index) => {
                    const screenshot = normalizeScreenshot(shot, `Screenshot ${index + 1}`);
                    return (
                      <figure key={screenshot.src} className="overflow-hidden rounded-2xl border border-white/10 bg-slate-900/70">
                        <img src={screenshot.src} alt={screenshot.alt} className="h-28 w-full object-cover sm:h-32" loading="lazy" />
                        <figcaption className="px-2.5 py-1.5 text-[10px] uppercase tracking-[0.2em] text-slate-300 sm:px-3 sm:py-2 sm:text-[11px] sm:tracking-[0.24em]">
                          {screenshot.label}
                        </figcaption>
                      </figure>
                    );
                  })}
                </div>
              </section>
            ) : null}
          </div>
        </div>

        <div className="mt-5 flex flex-col gap-2 sm:mt-6 sm:flex-row sm:flex-wrap sm:gap-3">
          <ActionLink href={project.uiPath}>Project Story</ActionLink>
          <ActionLink href={getProjectExperienceHref(project)}>{getProjectExperienceLabel(project)}</ActionLink>
          <ActionLink href={getProjectBackendHref(project)}>{getProjectBackendLabel(project)}</ActionLink>
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
