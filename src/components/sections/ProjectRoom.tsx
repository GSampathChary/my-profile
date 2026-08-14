"use client";

import { portfolio } from "@/data/portfolio";
import { socialLinks } from "@/lib/projectLinks";
import { normalizeScreenshot } from "@/lib/projectScreenshots";
import { getProjectExperienceHref, getProjectExperienceLabel, getProjectPublicHref, getProjectPublicLabel } from "@/lib/projectExperience";

export function ProjectRoom() {
  return (
    <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
      <div className="space-y-4">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-glow backdrop-blur-xl">
          <div className="text-xs uppercase tracking-[0.4em] text-cyan-200/60">Project Lab</div>
          <h1 className="mt-3 text-3xl font-semibold text-white">Personal AI Projects</h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300">
            These concepts show the product-thinking side of the portfolio. Each one is structured with the same
            discipline used in production work.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {portfolio.projects
            .filter((project) => project.category === "personal")
            .map((project) => (
              <a
                key={project.id}
                href={getProjectPublicHref(project)}
                target={getProjectPublicHref(project).startsWith("http") ? "_blank" : undefined}
                rel={getProjectPublicHref(project).startsWith("http") ? "noreferrer" : undefined}
                className="rounded-3xl border border-white/10 bg-slate-950/70 p-5 text-left transition hover:bg-slate-900/80"
              >
                {project.screenshots?.length ? (
                  <figure className="mb-4 overflow-hidden rounded-2xl border border-white/10 bg-slate-900/80">
                    <img
                      src={normalizeScreenshot(project.screenshots[0], `${project.name} preview`).src}
                      alt={normalizeScreenshot(project.screenshots[0], `${project.name} preview`).alt}
                      className="h-36 w-full object-cover"
                      loading="lazy"
                    />
                  </figure>
                ) : null}
                <div className="text-lg font-semibold text-white">{project.name}</div>
                <p className="mt-2 text-sm text-cyan-100/70">{project.tagline}</p>
                <p className="mt-4 text-sm leading-6 text-slate-300">{project.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.technologies.slice(0, 4).map((technology) => (
                    <span key={technology} className="rounded-full bg-white/5 px-3 py-1 text-xs text-slate-200">
                      {technology}
                    </span>
                  ))}
                </div>
                <div className="mt-5 flex flex-wrap gap-2">
                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs text-slate-200">
                    {getProjectPublicLabel(project)}
                  </span>
                  <span className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-2 text-xs text-cyan-50">
                    {getProjectExperienceLabel(project)}
                  </span>
                </div>
              </a>
            ))}
        </div>
      </div>

      <aside className="space-y-4">
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
                className="inline-flex items-center gap-2 rounded-full bg-cyan-300 px-4 py-2 text-sm font-medium text-slate-950 transition hover:bg-cyan-200"
              >
                Open RAISE App
              </a>
            </div>
          </div>
          <div className="mt-4 flex flex-wrap gap-3 text-sm">
            <a
              href={socialLinks.linkedIn}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-slate-100"
            >
              LinkedIn
            </a>
            <a
              href={socialLinks.github}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-slate-100"
            >
              GitHub
            </a>
          </div>
        </div>
      </aside>
    </section>
  );
}
