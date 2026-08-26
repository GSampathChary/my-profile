import type { ReactNode } from "react";
import { socialLinks } from "@/lib/projectLinks";
import { normalizeScreenshot } from "@/lib/projectScreenshots";
import type { Project } from "@/types/project";
import {
  getProjectBackendHref,
  getProjectBackendLabel,
  getProjectExperienceHref,
  getProjectExperienceLabel,
  getProjectPublicHref,
  getProjectPublicLabel
} from "@/lib/projectExperience";
import { TechnologyBadge } from "@/components/ui/TechnologyBadge";

type ProjectDetailProps = {
  project: Project;
};

export function ProjectDetail({ project }: ProjectDetailProps) {
  return (
    <section className="space-y-6">
      <div className="rounded-[22px] border border-white/10 bg-white/5 p-4 shadow-glow backdrop-blur-xl sm:rounded-3xl sm:p-6">
        <div className="text-xs uppercase tracking-[0.4em] text-cyan-200/60">{project.category} project</div>
        <a
          href={getProjectPublicHref(project)}
          target={getProjectPublicHref(project).startsWith("http") ? "_blank" : undefined}
          rel={getProjectPublicHref(project).startsWith("http") ? "noreferrer" : undefined}
          className="mt-3 inline-block text-2xl font-semibold text-white transition hover:text-cyan-200 sm:text-3xl"
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
        <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300 sm:text-base">{project.tagline}</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-6">
          <Panel title="Overview">
            <p>{project.description}</p>
          </Panel>
          <Panel title="Problem">
            <p>{project.problem}</p>
          </Panel>
          <Panel title="Solution">
            <p>{project.solution}</p>
          </Panel>
        </div>
        <div className="space-y-6">
        <Panel title="Technologies">
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((technology) => (
              <TechnologyBadge key={technology} technology={technology} size="sm" className="border-white/10 bg-white/5 text-slate-200" />
            ))}
          </div>
        </Panel>
          <Panel title="Features">
            <ul className="space-y-2">
              {project.features.map((feature) => (
                <li key={feature}>- {feature}</li>
              ))}
            </ul>
          </Panel>
          {project.screenshots?.length ? (
            <Panel title="Screenshots">
              <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                {project.screenshots.map((shot, index) => {
                  const screenshot = normalizeScreenshot(shot, `Screenshot ${index + 1}`);
                  return (
                    <figure key={screenshot.src} className="overflow-hidden rounded-2xl border border-white/10 bg-slate-950/70">
                      <img src={screenshot.src} alt={screenshot.alt} className="h-32 w-full object-cover sm:h-40" loading="lazy" />
                      <figcaption className="px-3 py-2 text-[11px] uppercase tracking-[0.24em] text-slate-400">{screenshot.label}</figcaption>
                    </figure>
                  );
                })}
              </div>
            </Panel>
          ) : null}
          {project.highlights?.length ? (
            <Panel title="Highlights">
              <ul className="space-y-2">
                {project.highlights.map((highlight) => (
                  <li key={highlight}>- {highlight}</li>
                ))}
              </ul>
            </Panel>
          ) : null}
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <Action href={project.uiPath} primary>
          Project Story
        </Action>
        <Action href={getProjectExperienceHref(project)}>{getProjectExperienceLabel(project)}</Action>
        <Action href={getProjectBackendHref(project)}>{getProjectBackendLabel(project)}</Action>
        <Action href={project.links.live}>Live Demo</Action>
        <Action href={project.links.github}>GitHub</Action>
        <Action href={project.links.architecture}>Architecture</Action>
        <Action href={project.links.playStore}>Play Store</Action>
        <Action href={project.links.caseStudy}>Case Study</Action>
        <Action href={socialLinks.github}>Developer GitHub</Action>
      </div>
    </section>
  );
}

function Panel({ title, children }: { title: string; children: ReactNode }) {
  return (
    <article className="rounded-[22px] border border-white/10 bg-slate-950/70 p-4 sm:rounded-3xl sm:p-5">
      <h2 className="text-sm font-medium uppercase tracking-[0.3em] text-cyan-200/70">{title}</h2>
      <div className="mt-4 text-sm leading-6 text-slate-300 sm:text-sm">{children}</div>
    </article>
  );
}

function Action({ href, children, primary = false }: { href?: string | null; children: ReactNode; primary?: boolean }) {
  if (!href) {
    return <span className="inline-flex w-full justify-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-400 sm:w-auto">TODO</span>;
  }

  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noreferrer" : undefined}
      className={
        primary
        ? "inline-flex w-full justify-center rounded-full bg-cyan-300 px-4 py-2 text-sm font-medium text-slate-950 transition hover:bg-cyan-200 sm:w-auto"
          : "inline-flex w-full justify-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-100 transition hover:bg-white/10 sm:w-auto"
      }
    >
      {children}
    </a>
  );
}
