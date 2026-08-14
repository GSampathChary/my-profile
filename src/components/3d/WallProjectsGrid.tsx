"use client";

import { Html } from "@react-three/drei";
import Link from "next/link";
import type { Project } from "@/types/project";
import { getProjectPublicHref, getProjectPublicLabel } from "@/lib/projectExperience";

type WallProjectsGridProps = {
  projects: Project[];
  selectedProjectId: string | null;
  active?: boolean;
  visible?: boolean;
  onClose: () => void;
  onSelectProject: (projectId: string) => void;
  mobile?: boolean;
};

export function WallProjectsGrid({
  projects,
  selectedProjectId,
  active = false,
  visible = false,
  onClose,
  onSelectProject,
  mobile = false
}: WallProjectsGridProps) {
  if (!visible) {
    return null;
  }

  const selectedProject = projects.find((project) => project.id === selectedProjectId) ?? projects[0];
  const liveHref = selectedProject.links.live ?? selectedProject.links.playStore ?? selectedProject.uiPath;
  const publicHref = getProjectPublicHref(selectedProject);
  const isWebPreview = Boolean(selectedProject.links.live);
  const browserTitle = selectedProject.links.playStore ? "Play Store" : selectedProject.links.live ? "Live Project" : "Project Story";

  return (
    <group position={[4.42, 2.28, -0.4]} rotation={[0, -Math.PI / 2, 0]}>
      <Html
        center
        transform
        distanceFactor={1.12}
        position={[0, 0, 0]}
        occlude={false}
        style={{
          width: mobile ? "min(94vw, 980px)" : "min(1160px, 92vw)",
          maxWidth: mobile ? "94vw" : "92vw",
          pointerEvents: "auto",
          transformOrigin: "center center"
        }}
      >
        <div className="overflow-hidden rounded-[20px] border border-slate-200 bg-[#f8f7f3] shadow-[0_28px_90px_rgba(15,23,42,0.18)] sm:rounded-[24px]">
          {/* Browser chrome */}
          <div className="border-b border-slate-200 bg-white px-3 py-3 sm:px-4">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
              <div className="flex items-center gap-1.5">
                <span className="h-3 w-3 rounded-full bg-red-400" />
                <span className="h-3 w-3 rounded-full bg-amber-400" />
                <span className="h-3 w-3 rounded-full bg-emerald-400" />
              </div>
              <div className="min-w-0 flex-1 rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-[11px] text-slate-600 sm:ml-2 sm:px-4 sm:text-xs">
                <span className="font-semibold text-slate-900">{selectedProject.name}</span>
                <span className="mx-2 text-slate-400">•</span>
                <span className="truncate">{publicHref}</span>
              </div>
              <a
                href={liveHref}
                target={liveHref.startsWith("http") ? "_blank" : undefined}
                rel={liveHref.startsWith("http") ? "noreferrer" : undefined}
                className="w-full rounded-full bg-slate-900 px-4 py-2 text-center text-xs font-semibold text-white transition hover:bg-cyan-600 sm:w-auto"
              >
                Open Live
              </a>
            </div>
          </div>

          {/* Main browser body */}
          <div className="grid min-h-[430px] grid-cols-1 lg:grid-cols-[260px_1fr]">
            {/* Project switcher */}
            <div className="max-h-[40vh] overflow-y-auto border-b border-slate-200 bg-slate-50 p-3 lg:max-h-none lg:border-b-0 lg:border-r lg:p-4">
              <div className="text-[10px] font-semibold uppercase tracking-[0.4em] text-slate-500">Projects</div>
              <div className="mt-3 space-y-3 sm:mt-4">
                {projects.slice(0, 6).map((project) => {
                  const activeProject = project.id === selectedProject.id;
                  const projectHref = getProjectPublicHref(project);
                  return (
                    <button
                      key={project.id}
                      type="button"
                      onClick={() => onSelectProject(project.id)}
                      className={[
                        "w-full rounded-2xl border px-3 py-2.5 text-left transition",
                        activeProject
                          ? "border-cyan-400 bg-cyan-500/10 shadow-sm"
                          : "border-slate-200 bg-white hover:border-cyan-200 hover:bg-cyan-50"
                      ].join(" ")}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="text-[13px] font-semibold text-slate-900 sm:text-sm">{project.name}</div>
                          <div className="mt-1 text-[11px] text-slate-500 sm:text-xs">{project.tagline}</div>
                        </div>
                        <div className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.2em] text-slate-500 sm:text-[10px] sm:tracking-[0.25em]">
                          {getProjectPublicLabel(project)}
                        </div>
                      </div>
                      <div className="mt-3 flex items-center justify-between gap-2">
                        <div className="flex flex-wrap gap-1">
                          {project.technologies.slice(0, 3).map((tech) => (
                            <span key={tech} className="rounded-full bg-slate-100 px-2 py-1 text-[9px] text-slate-600 sm:text-[10px]">
                              {tech}
                            </span>
                          ))}
                        </div>
                        <a
                          href={projectHref}
                          target={projectHref.startsWith("http") ? "_blank" : undefined}
                          rel={projectHref.startsWith("http") ? "noreferrer" : undefined}
                          onClick={(event) => event.stopPropagation()}
                          className="text-[9px] font-semibold uppercase tracking-[0.2em] text-cyan-600 transition hover:text-cyan-700 sm:text-[10px] sm:tracking-[0.25em]"
                        >
                          Open
                        </a>
                      </div>
                    </button>
                  );
                })}
              </div>

              {active ? (
                <button
                  type="button"
                  onClick={onClose}
                  className="mt-5 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 shadow-sm transition hover:bg-slate-100"
                >
                  Close browser
                </button>
              ) : null}
            </div>

            {/* Live preview */}
            <div className="flex min-h-[360px] flex-col bg-[#fbfaf7] sm:min-h-[620px]">
              <div className="border-b border-slate-200 bg-white px-4 py-4 sm:px-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <div className="text-[10px] font-semibold uppercase tracking-[0.4em] text-slate-500">{browserTitle}</div>
                    <h3 className="mt-1 text-xl font-semibold text-slate-900 sm:text-2xl">{selectedProject.name}</h3>
                    <p className="mt-1 max-w-2xl text-[13px] text-slate-600 sm:text-sm">{selectedProject.description}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Link
                      href={selectedProject.uiPath as any}
                      className="rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-100"
                    >
                      Project Story
                    </Link>
                    <a
                      href={liveHref}
                      target={liveHref.startsWith("http") ? "_blank" : undefined}
                      rel={liveHref.startsWith("http") ? "noreferrer" : undefined}
                      className="rounded-full bg-cyan-500 px-4 py-2 text-xs font-semibold text-white transition hover:bg-cyan-400"
                    >
                      Open in Browser
                    </a>
                  </div>
                </div>
              </div>

              <div className="relative flex-1 overflow-hidden bg-[#f4f5f7] p-3 sm:p-4">
                {isWebPreview ? (
                  <div className="grid h-full gap-3 xl:grid-cols-[1.25fr_0.75fr]">
                    <div className="overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-[0_18px_60px_rgba(15,23,42,0.12)]">
                      <div className="flex items-center gap-2 border-b border-slate-200 bg-slate-50 px-4 py-2 text-[10px] text-slate-500">
                        <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
                        <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                        <span className="ml-2 truncate">{liveHref}</span>
                      </div>
                      <iframe
                        src={liveHref}
                        title={`${selectedProject.name} live preview`}
                        className="h-[240px] w-full bg-white sm:h-[340px]"
                      />
                    </div>

                    <div className="space-y-4 overflow-y-auto rounded-[22px] border border-slate-200 bg-white p-4 shadow-[0_18px_60px_rgba(15,23,42,0.08)]">
                      <div className="text-[10px] font-semibold uppercase tracking-[0.4em] text-slate-500">Quick Switch</div>
                      <div className="grid gap-3">
                        {projects.slice(0, 6).map((project) => {
                          const selected = project.id === selectedProject.id;
                          return (
                            <button
                              key={`quick-${project.id}`}
                              type="button"
                              onClick={() => onSelectProject(project.id)}
                              className={[
                                "rounded-2xl border px-3 py-3 text-left transition",
                                selected
                                  ? "border-cyan-400 bg-cyan-500/10"
                                  : "border-slate-200 bg-slate-50 hover:border-cyan-200 hover:bg-cyan-50"
                              ].join(" ")}
                            >
                              <div className="text-[13px] font-semibold text-slate-900 sm:text-sm">{project.name}</div>
                              <div className="mt-1 text-[11px] text-slate-500 sm:text-xs">{project.tagline}</div>
                            </button>
                          );
                        })}
                      </div>
                      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
                        If the live site blocks iframe embedding, use <span className="font-semibold text-slate-900">Open in Browser</span> to launch it directly.
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <div className="max-w-xl rounded-[28px] border border-slate-200 bg-white p-5 text-center shadow-[0_18px_60px_rgba(15,23,42,0.12)] sm:p-7">
                      <div className="text-[10px] font-semibold uppercase tracking-[0.4em] text-slate-500">{browserTitle}</div>
                      <h4 className="mt-3 text-xl font-semibold text-slate-900 sm:text-2xl">{selectedProject.name}</h4>
                      <p className="mt-3 text-[13px] leading-6 text-slate-600 sm:text-sm sm:leading-7">
                        This project is opened through its live destination, but the preview shell stays consistent so you can switch projects from the same browser window.
                      </p>
                      <div className="mt-5 flex flex-wrap justify-center gap-2">
                        {selectedProject.technologies.slice(0, 6).map((technology) => (
                          <span key={technology} className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600">
                            {technology}
                          </span>
                        ))}
                      </div>
                      <div className="mt-6 flex flex-wrap justify-center gap-2">
                        <a
                          href={liveHref}
                          target={liveHref.startsWith("http") ? "_blank" : undefined}
                          rel={liveHref.startsWith("http") ? "noreferrer" : undefined}
                          className="rounded-full bg-cyan-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-cyan-400"
                        >
                          Open Live Project
                        </a>
                        <button
                          type="button"
                          onClick={() => onSelectProject(projects[0]?.id ?? selectedProject.id)}
                          className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
                        >
                          Switch Project
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </Html>
    </group>
  );
}
