"use client";

import { portfolio } from "@/data/portfolio";
import { socialLinks } from "@/lib/projectLinks";
import { normalizeScreenshot } from "@/lib/projectScreenshots";
import {
  getProjectBackendHref,
  getProjectBackendLabel,
  getProjectExperienceHref,
  getProjectExperienceLabel,
  getProjectPublicHref,
  getProjectPublicLabel
} from "@/lib/projectExperience";

export function ProjectRoom() {
  const personalProjects = portfolio.projects.filter((project) => project.category === "personal");

  return (
    <section className="grid min-w-0 gap-6 lg:grid-cols-[1.2fr_0.8fr]">
      <div className="min-w-0 space-y-4">
        <div className="rounded-[22px] border border-white/10 bg-white/5 p-4 shadow-glow backdrop-blur-xl sm:rounded-3xl sm:p-6">
          <div className="text-xs uppercase tracking-[0.4em] text-cyan-200/60">Project Lab</div>
          <h1 className="mt-3 text-2xl font-semibold text-white sm:text-3xl">Personal AI Projects</h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300 sm:text-base">
            Explore {personalProjects.length} deployed AI and data products, including end-to-end analytics, computer vision,
            machine learning, and full-stack applications.
          </p>
        </div>
        <div className="grid min-w-0 grid-cols-1 gap-3 sm:gap-4 md:grid-cols-2">
          {personalProjects.map((project) => {
            const publicHref = getProjectPublicHref(project);
            const experienceHref = getProjectExperienceHref(project);
            const backendHref = getProjectBackendHref(project);

            return (
              <article
                key={project.id}
                className="flex min-w-0 flex-col rounded-[22px] border border-white/10 bg-slate-950/70 p-4 text-left transition hover:border-cyan-300/30 hover:bg-slate-900/80 sm:rounded-3xl sm:p-5"
              >
                {project.screenshots?.length ? (
                  <figure className="mb-4 overflow-hidden rounded-2xl border border-white/10 bg-slate-900/80">
                    <img
                      src={normalizeScreenshot(project.screenshots[0], `${project.name} preview`).src}
                      alt={normalizeScreenshot(project.screenshots[0], `${project.name} preview`).alt}
                      className="h-32 w-full object-cover sm:h-36"
                      loading="lazy"
                    />
                  </figure>
                ) : null}
                <div className="text-base font-semibold text-white sm:text-lg">{project.name}</div>
                <p className="mt-2 text-sm text-cyan-100/70">{project.tagline}</p>
                <p className="mt-4 text-sm leading-6 text-slate-300 sm:line-clamp-4">{project.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.technologies.slice(0, 4).map((technology) => (
                    <span key={technology} className="rounded-full bg-white/5 px-3 py-1 text-xs text-slate-200">
                      {technology}
                    </span>
                  ))}
                </div>
                <div className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-2">
                  <a
                    href={publicHref}
                    target={publicHref.startsWith("http") ? "_blank" : undefined}
                    rel={publicHref.startsWith("http") ? "noreferrer" : undefined}
                    className="inline-flex min-h-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-center text-xs text-slate-200 transition hover:bg-white/10"
                  >
                    {getProjectPublicLabel(project)}
                  </a>
                  <a
                    href={experienceHref}
                    target={experienceHref.startsWith("http") ? "_blank" : undefined}
                    rel={experienceHref.startsWith("http") ? "noreferrer" : undefined}
                    className="inline-flex min-h-10 items-center justify-center rounded-xl border border-cyan-300/20 bg-cyan-300/10 px-3 py-2 text-center text-xs text-cyan-50 transition hover:bg-cyan-300/20"
                  >
                    {getProjectExperienceLabel(project)}
                  </a>
                  <a
                    href={backendHref}
                    target={backendHref.startsWith("http") ? "_blank" : undefined}
                    rel={backendHref.startsWith("http") ? "noreferrer" : undefined}
                    className="inline-flex min-h-10 items-center justify-center rounded-xl border border-emerald-300/20 bg-emerald-300/10 px-3 py-2 text-center text-xs text-emerald-50 transition hover:bg-emerald-300/20 sm:col-span-2"
                  >
                    {getProjectBackendLabel(project)}
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      <aside className="min-w-0 space-y-4">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
          <h2 className="text-lg font-semibold text-white">Professional Project</h2>
          <div className="mt-4 rounded-2xl border border-cyan-300/20 bg-cyan-300/10 p-4 text-sm text-slate-100">
            <div className="font-medium">RAISE</div>
            <div className="mt-1 text-cyan-100/80">Rice AI Stress Evaluator</div>
            <div className="mt-3 text-slate-200">
              Flutter, TensorFlow, Spring Boot, Python, PostgreSQL, TFLite, ONNX Runtime
            </div>
            <div className="mt-4">
              <a
                href={getProjectExperienceHref(portfolio.projects.find((project) => project.id === "raise") ?? portfolio.projects[0])}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-cyan-300 px-4 py-2 text-sm font-medium text-slate-950 transition hover:bg-cyan-200 sm:w-auto"
              >
                Open RAISE App
              </a>
            </div>
          </div>
          <div className="mt-4 flex flex-col gap-3 text-sm sm:flex-row sm:flex-wrap">
            <a
              href={socialLinks.linkedIn}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-center text-slate-100"
            >
              LinkedIn
            </a>
            <a
              href={socialLinks.github}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-center text-slate-100"
            >
              GitHub
            </a>
          </div>
        </div>
      </aside>
    </section>
  );
}
