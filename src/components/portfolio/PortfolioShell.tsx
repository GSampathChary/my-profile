"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import type { ReactNode } from "react";
import {
  ArrowRight,
  BookOpen,
  ChevronRight,
  ExternalLink,
  GitFork,
  Link2,
  Mail,
  MapPin,
  Monitor,
  Phone,
  Sparkles,
  SquareTerminal,
  UserRound,
  X
} from "lucide-react";
import { Room } from "@/components/3d/Room";
import { portfolio } from "@/data/portfolio";
import {
  getProjectBackendHref,
  getProjectBackendLabel,
  getProjectExperienceHref,
  getProjectExperienceLabel,
  getProjectPublicHref,
  getProjectPublicLabel
} from "@/lib/projectExperience";
import { normalizeScreenshot } from "@/lib/projectScreenshots";
import { socialLinks } from "@/lib/projectLinks";
import { TechnologyBadge } from "@/components/ui/TechnologyBadge";
import { ResumeRoom } from "@/components/sections/ResumeRoom";
import { useIsMobile } from "@/hooks/useIsMobile";
import type { SceneFocus } from "@/components/3d/Camera";
import type { Project } from "@/types/project";

type BookId = "python" | "fastapi" | "tensorflow" | "flutter" | "springboot" | "postgres";

const bookInfo: Record<BookId, { title: string; points: string[]; projects: string[] }> = {
  python: {
    title: "Python",
    points: ["AI workflows", "automation", "data prep", "backend glue"],
    projects: ["RAISE", "DataInsight AI", "AutoML Studio"]
  },
  fastapi: {
    title: "FastAPI",
    points: ["REST APIs", "async endpoints", "inference services", "clean contracts"],
    projects: ["RAISE", "AutoML Studio"]
  },
  tensorflow: {
    title: "TensorFlow",
    points: ["image classification", "mobile inference", "deployment", "validation"],
    projects: ["RAISE"]
  },
  flutter: {
    title: "Flutter",
    points: ["mobile UI", "offline workflows", "touch-friendly flows", "app delivery"],
    projects: ["RAISE"]
  },
  springboot: {
    title: "Spring Boot",
    points: ["role-based backends", "production APIs", "service orchestration", "deployment support"],
    projects: ["RAISE"]
  },
  postgres: {
    title: "PostgreSQL",
    points: ["structured storage", "workflow state", "history tracking", "reliable data layer"],
    projects: ["RAISE", "ResumeAI Pro", "Interview Copilot AI"]
  }
};

function ProjectScreens({ project }: { project: Project }) {
  const shots = project.screenshots?.length ? project.screenshots.slice(0, 3) : null;
  return (
    <div className="grid gap-2">
      <div className="text-[10px] uppercase tracking-[0.45em] text-slate-400">Screens</div>
      {shots ? (
        <div className="grid grid-cols-3 gap-2">
          {shots.map((shot, index) => {
            const screenshot = normalizeScreenshot(shot, `Preview ${index + 1}`);
            return (
              <figure
                key={screenshot.src}
                className="overflow-hidden rounded-2xl border border-white/10 bg-[linear-gradient(135deg,rgba(34,211,238,0.22),rgba(168,85,247,0.15))] p-1"
              >
                <img src={screenshot.src} alt={screenshot.alt} className="h-full w-full rounded-xl object-cover" loading="lazy" />
                <figcaption className="px-2 py-1 text-[10px] text-slate-100">{screenshot.label}</figcaption>
              </figure>
            );
          })}
        </div>
      ) : (
        <div className="rounded-2xl border border-white/10 bg-white/5 px-3 py-4 text-xs text-slate-300">Screenshots will appear here.</div>
      )}
    </div>
  );
}

function BottomClose({ onClose }: { onClose: () => void }) {
  return (
    <button
      type="button"
      onClick={onClose}
      className="mx-auto mt-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-slate-950/90 px-5 py-3 text-sm text-slate-100 shadow-2xl shadow-black/50 backdrop-blur-xl transition hover:bg-white/10"
    >
      <span className="flex h-7 w-7 items-center justify-center rounded-full border border-white/15 bg-white/5">
        <X className="h-4 w-4" />
      </span>
      Close
    </button>
  );
}

function FullscreenFrame({
  title,
  eyebrow,
  children,
  onClose,
  glass = true,
  fullScreenMobile = false,
  browserChrome = false,
  motionDuration = 0.75,
  motionScale = 0.985,
  motionYOffset = 12
}: {
  title: string;
  eyebrow: string;
  children: ReactNode;
  onClose: () => void;
  glass?: boolean;
  fullScreenMobile?: boolean;
  browserChrome?: boolean;
  motionDuration?: number;
  motionScale?: number;
  motionYOffset?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: motionScale, y: motionYOffset }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: motionScale, y: motionYOffset }}
      transition={{ duration: motionDuration, ease: "easeOut" }}
      className={`relative mx-auto flex min-h-0 flex-col border shadow-[0_30px_120px_rgba(0,0,0,0.5)] ${browserChrome ? "border-slate-200 bg-white text-slate-900" : "border-white/10 bg-slate-950/95"} ${glass ? "backdrop-blur-xl" : "backdrop-blur-none"} ${fullScreenMobile ? "h-[100dvh] w-full rounded-none p-3" : "h-[calc(100vh-0.75rem)] w-[calc(100vw-0.75rem)] rounded-[20px] p-3"} sm:h-[88vh] sm:w-full sm:rounded-[26px] sm:p-4 lg:h-[86vh] lg:rounded-[30px] lg:p-5`}
    >
      <div className="flex items-start justify-between gap-3 sm:gap-4">
        <div className="flex min-w-0 items-start gap-3">
          {browserChrome ? (
            <div className="flex items-center gap-1.5 pt-1.5" aria-hidden="true">
              <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
            </div>
          ) : null}
          <div className="min-w-0">
            <div className={`text-[10px] uppercase tracking-[0.45em] ${browserChrome ? "text-slate-500" : "text-cyan-100/60"}`}>{eyebrow}</div>
            <h2 className={`mt-2 text-xl font-semibold sm:text-2xl ${browserChrome ? "text-slate-900" : "text-white"}`}>{title}</h2>
          </div>
        </div>
      </div>
      <div className="mt-4 min-h-0 flex-1 overflow-y-auto pr-1 sm:mt-5 sm:overflow-hidden sm:pr-0">{children}</div>
      <BottomClose onClose={onClose} />
    </motion.div>
  );
}

function ResumeOverlay({ onClose }: { onClose: () => void }) {
  return (
    <FullscreenFrame title="About Me - Resume Book" eyebrow="Physical Book Spread" onClose={onClose}>
      <div className="relative mx-auto flex h-full max-w-5xl overflow-hidden rounded-[18px] border-4 border-[#78350f] bg-[#451a03] p-2.5 shadow-2xl sm:rounded-[20px] sm:p-3">
        {/* Book Spine Center Crease Line */}
        <div className="pointer-events-none absolute inset-y-0 left-1/2 z-20 w-8 -translate-x-1/2 bg-gradient-to-r from-black/30 via-black/50 to-black/30" />
        {/* Gold Ribbon Page Bookmark */}
        <div className="pointer-events-none absolute top-0 left-1/2 z-30 h-40 w-4 -translate-x-1/2 bg-amber-500 shadow-md" />

        <div className="grid h-full w-full grid-cols-1 overflow-y-auto rounded-[14px] bg-[#fef3c7] md:grid-cols-2">
          {/* Left Page */}
          <div className="border-r border-amber-900/10 p-4 text-slate-900 sm:p-6 md:p-8">
            <div className="text-[10px] uppercase tracking-[0.4em] font-bold text-amber-800">Page 1 • Biography</div>
            <div className="mt-4 flex items-start gap-4">
              <div className="relative h-20 w-16 overflow-hidden rounded-2xl border-4 border-amber-900/20 bg-slate-100 shadow-lg sm:h-24 sm:w-20">
                <img src="/images/sampath.png" alt={portfolio.profile.name} className="h-full w-full object-cover object-center" />
              </div>
              <div className="min-w-0">
                <h3 className="text-2xl font-serif font-bold text-slate-900 sm:text-3xl">{portfolio.profile.name}</h3>
                <p className="mt-2 text-[10px] font-medium uppercase tracking-wider text-amber-800 sm:text-xs">{portfolio.profile.headline}</p>
              </div>
            </div>
            <hr className="my-4 border-amber-900/20" />
            <div className="space-y-3">
              <h4 className="text-sm font-serif font-bold uppercase tracking-wider text-slate-800">About Me</h4>
              <p className="text-sm font-serif leading-7 text-slate-700">{portfolio.profile.introduction}</p>
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              <a href="/resume/resume.pdf" download className="rounded-full bg-amber-900 px-4 py-2 text-xs font-semibold text-amber-100 transition hover:bg-amber-800">
                Download PDF Resume 📥
              </a>
              <Link href="/resume" className="rounded-full border border-amber-900/30 bg-amber-500/10 px-4 py-2 text-xs font-semibold text-amber-950 hover:bg-amber-500/20">
                Full Resume Page
              </Link>
            </div>
          </div>

          {/* Right Page */}
          <div className="p-4 text-slate-900 sm:p-6 md:p-8">
            <div className="text-[10px] uppercase tracking-[0.4em] font-bold text-amber-800">Page 2 • Technical Experience</div>
            <div className="mt-3 space-y-4">
              <h4 className="text-sm font-serif font-bold uppercase tracking-wider text-slate-800">Key Expertise</h4>
              <p className="text-sm font-serif leading-7 text-slate-700">{portfolio.experience.summary}</p>
              <div className="mt-4">
                <h5 className="text-xs font-serif font-bold uppercase tracking-wider text-amber-900">Core Technologies</h5>
                <div className="mt-2 flex flex-wrap gap-2">
                  {["AI Engineering", "Python", "Flutter", "Spring Boot", "FastAPI", "TensorFlow", "PostgreSQL"].map((skill) => (
                    <span key={skill} className="rounded-md border border-amber-900/20 bg-amber-200/50 px-2.5 py-1 text-xs font-serif font-medium text-amber-950">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </FullscreenFrame>
  );
}

function ResumeOverlayFull({ onClose, lightsOn = false }: { onClose: () => void; lightsOn?: boolean }) {
  const mobile = useIsMobile();
  const shellBorder = "border-slate-200";
  const shellBg = "bg-white";
  const headerBg = "bg-white";
  const frameBg = "bg-slate-50";
  const pdfBorder = "border-slate-200";
  const accentText = "text-slate-500";
  const buttonBase = "bg-slate-100 hover:bg-slate-200 text-slate-700";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.985 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.985 }}
      transition={{ duration: 1.0, ease: "easeOut" }}
      className="fixed inset-0 z-[80] bg-white px-2 py-2 sm:px-3 sm:py-3"
    >
      <div className={`flex h-full w-full flex-col overflow-hidden rounded-[20px] border shadow-[0_30px_120px_rgba(0,0,0,0.35)] sm:rounded-[28px] ${shellBorder} ${shellBg}`}>
        <div className={`flex flex-col items-start justify-between gap-3 border-b px-4 py-4 sm:flex-row sm:items-center sm:px-5 ${headerBg} ${shellBorder}`}>
          <div className="flex items-start gap-3">
            <div className="flex items-center gap-1.5 pt-1.5" aria-hidden="true">
              <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
            </div>
            <div>
            <div className={`text-[10px] uppercase tracking-[0.45em] ${accentText}`}>About Me</div>
            <h2 className="mt-1 text-xl font-semibold text-slate-900 sm:text-2xl">Resume Viewer</h2>
            </div>
          </div>
          <div className="flex w-full flex-wrap items-center gap-2 sm:w-auto">
            <a
              href="/resume/resume.pdf"
              download
              className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-100"
            >
              Download PDF
            </a>
            <Link
              href="/resume"
              className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-100"
            >
              Open Resume Page
            </Link>
            <button
              type="button"
              onClick={onClose}
              className={`rounded-full px-4 py-2 text-xs font-semibold transition ${buttonBase}`}
            >
              Close
            </button>
          </div>
        </div>
        <div className={`min-h-0 flex-1 p-3 ${frameBg}`}>
          {mobile ? (
            <div className="h-full overflow-y-auto rounded-[18px] border border-slate-200 bg-white p-3 sm:rounded-[22px] sm:p-4">
              <ResumeRoom resumeAvailable />
            </div>
          ) : (
            <div className={`h-full overflow-hidden rounded-[18px] border bg-white shadow-2xl sm:rounded-[22px] ${pdfBorder}`}>
              <iframe
                src="/resume/resume.pdf#view=FitH"
                title="Gannoju Sampath Chary resume"
                className="h-full w-full border-0"
              />
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function ProjectsOverlay({
  project,
  onClose,
  onSelectProject,
  projects,
  mobile
}: {
  project: Project;
  onClose: () => void;
  onSelectProject: (projectId: string) => void;
  projects: Project[];
  mobile: boolean;
}) {
  const launchHref = getProjectExperienceHref(project);
  const launchLabel = getProjectExperienceLabel(project);

  return (
    <FullscreenFrame title="Projects Workspace" eyebrow="Browser Projection" onClose={onClose} glass={false} fullScreenMobile={mobile} browserChrome>
      <div className={`grid h-full min-h-0 gap-3 pb-1 lg:grid-cols-[0.85fr_1.15fr] ${mobile ? "grid-rows-[minmax(10rem,0.8fr)_minmax(0,1.2fr)] overflow-hidden" : "max-h-[78vh] overflow-hidden"}`}>
        <div className="flex min-h-0 flex-col gap-3 overflow-y-auto rounded-[24px] border border-slate-200 bg-slate-50 p-3 shadow-lg shadow-slate-200/70 scrollbar-thin scrollbar-thumb-cyan-500/30 sm:p-4">
          <div className="text-[10px] font-bold uppercase tracking-[0.45em] text-cyan-700">All Projects</div>
          {projects.map((item) => {
            const active = item.id === project.id;
            const publicHref = getProjectPublicHref(item);
            return (
              <div
                key={item.id}
                role="button"
                tabIndex={0}
                onClick={() => onSelectProject(item.id)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    onSelectProject(item.id);
                  }
                }}
                className={[
                  "w-full rounded-2xl border px-3 py-2.5 text-left transition sm:px-3.5 sm:py-3",
                  active ? "border-cyan-500 bg-cyan-50 shadow-md shadow-cyan-500/10" : "border-slate-200 bg-white hover:border-cyan-300 hover:bg-cyan-50/60"
                ].join(" ")}
              >
                <div className="flex items-center justify-between gap-2">
                  <a
                    href={publicHref}
                    target={publicHref.startsWith("http") ? "_blank" : undefined}
                    rel={publicHref.startsWith("http") ? "noreferrer" : undefined}
                    onClick={(event) => event.stopPropagation()}
                    className="text-[13px] font-semibold text-slate-900 transition hover:text-cyan-700 sm:text-sm"
                  >
                    {item.name}
                  </a>
                  <div className="text-[9px] font-bold uppercase tracking-[0.22em] text-cyan-700 sm:text-[10px] sm:tracking-[0.3em]">{item.category}</div>
                </div>
                <div className="mt-1 text-[11px] leading-5 text-slate-600 sm:text-xs">{item.tagline}</div>
                <div className="mt-3 inline-flex rounded-full border border-cyan-200 bg-cyan-50 px-2.5 py-1 text-[9px] uppercase tracking-[0.18em] text-cyan-800 sm:text-[10px] sm:tracking-[0.25em]">
                  {getProjectPublicLabel(item)}
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex min-h-0 flex-col gap-3 overflow-y-auto rounded-[24px] border border-slate-200 bg-white p-4 shadow-lg shadow-slate-200/70 scrollbar-thin scrollbar-thumb-cyan-500/30 sm:gap-4 sm:p-6">
          <div className="text-[10px] font-bold uppercase tracking-[0.45em] text-cyan-700">Selected Project Overview</div>
          <a
            href={getProjectPublicHref(project)}
            target={getProjectPublicHref(project).startsWith("http") ? "_blank" : undefined}
            rel={getProjectPublicHref(project).startsWith("http") ? "noreferrer" : undefined}
            className="inline-block text-2xl font-bold text-slate-900 transition hover:text-cyan-700 sm:text-3xl"
          >
            {project.name}
          </a>
          <p className="text-[13px] leading-6 text-slate-600 sm:text-sm sm:leading-7">{project.description}</p>
          <div className="rounded-2xl border border-cyan-200 bg-cyan-50 p-3 sm:p-4">
            <div className="text-xs uppercase tracking-[0.35em] font-bold text-cyan-800">Problem & Solution</div>
            <p className="mt-2 text-[13px] leading-6 text-slate-600 sm:text-sm sm:leading-7">{project.problem}</p>
            <p className="mt-3 text-[13px] leading-6 text-slate-600 sm:text-sm sm:leading-7">{project.solution}</p>
          </div>
          <ProjectScreens project={project} />
          <div className="flex flex-col gap-2 pt-2 sm:flex-row sm:flex-wrap">
            <Link href={launchHref as any} className="inline-flex items-center justify-center gap-2 rounded-full bg-cyan-400 px-4 py-2.5 text-sm font-bold text-slate-950 transition hover:bg-cyan-300 shadow-lg shadow-cyan-500/25 sm:px-5">
              <Monitor className="h-4 w-4" />
              {launchLabel}
            </Link>
            <Link href={getProjectBackendHref(project) as any} className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 sm:px-5">
              <ExternalLink className="h-4 w-4" />
              {getProjectBackendLabel(project)}
            </Link>
            <Link href={project.uiPath as any} className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 sm:px-5">
              Project Story
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="flex flex-wrap gap-2 pt-1">
            {project.technologies.slice(0, 8).map((technology) => (
              <TechnologyBadge key={technology} technology={technology} size="sm" className="border-cyan-200 bg-cyan-50 text-cyan-800" />
            ))}
          </div>
        </div>
      </div>
    </FullscreenFrame>
  );
}

function TechnologiesOverlay({
  onClose,
  onBookSelect,
  selectedBook,
  totalTech,
  mobile
}: {
  onClose: () => void;
  onBookSelect: (book: BookId) => void;
  selectedBook: { title: string; points: string[]; projects: string[] } | null;
  totalTech: number;
  mobile: boolean;
}) {
  const books: BookId[] = ["python", "fastapi", "tensorflow", "flutter", "springboot", "postgres"];
  const sections = [
    { key: "languages", title: "Languages", description: "Core programming and query languages." },
    { key: "aiMl", title: "AI / ML", description: "Modeling, inference, and agent tooling." },
    { key: "backend", title: "Backend", description: "API services and production deployment." },
    { key: "frontend", title: "Frontend", description: "Client-side web and UI technologies." },
    { key: "database", title: "Databases", description: "Storage engines and persistence layers." },
    { key: "tools", title: "Tools", description: "Developer workflows and shipping tools." }
  ] as const;

  return (
    <FullscreenFrame title="Known Technologies" eyebrow="Official stack browser" onClose={onClose} browserChrome fullScreenMobile={mobile} motionDuration={0.95} motionScale={0.975} motionYOffset={18}>
      <div className={`grid h-full min-h-0 gap-4 pb-1 lg:grid-cols-[0.85fr_1.15fr] ${mobile ? "grid-rows-[minmax(15rem,0.9fr)_minmax(0,1.1fr)] overflow-hidden" : "max-h-[78vh] overflow-hidden"}`}>
        <div className="min-h-0 space-y-4 overflow-y-auto rounded-[28px] border border-slate-200 bg-slate-50 p-4 shadow-lg shadow-slate-200/70 sm:p-5">
          <div>
            <div className="text-[10px] uppercase tracking-[0.45em] text-cyan-700">Focus tracks</div>
            <p className="mt-2 text-[13px] leading-6 text-slate-600 sm:text-sm sm:leading-7">
              These study tracks mirror the bookshelf in the room and spotlight the stack behind your featured projects.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {books.map((book) => (
              <button
                key={book}
                type="button"
                onClick={() => onBookSelect(book)}
                className="rounded-2xl border border-slate-200 bg-white px-4 py-4 text-left text-sm text-slate-800 transition hover:border-cyan-300 hover:bg-cyan-50"
              >
                <div className="text-base font-semibold">{bookInfo[book].title}</div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {bookInfo[book].points.slice(0, 3).map((point) => (
                    <span key={point} className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[11px] text-slate-600">
                      {point}
                    </span>
                  ))}
                </div>
              </button>
            ))}
          </div>

          {selectedBook ? (
            <div className="rounded-[24px] border border-cyan-200 bg-cyan-50 p-4">
              <div className="text-[10px] uppercase tracking-[0.45em] text-cyan-700">Selected track</div>
              <div className="mt-2 text-lg font-semibold text-slate-900">{selectedBook.title}</div>
              <div className="mt-3 flex flex-wrap gap-2">
                {selectedBook.points.map((point) => (
                  <span key={point} className="rounded-full border border-cyan-200 bg-white px-3 py-1 text-[11px] text-cyan-800">
                    {point}
                  </span>
                ))}
              </div>
              <div className="mt-4 text-xs uppercase tracking-[0.32em] text-cyan-700">Projects</div>
              <div className="mt-2 flex flex-wrap gap-2">
                {selectedBook.projects.map((project) => (
                  <span key={project} className="rounded-full border border-slate-200 bg-white px-3 py-1 text-[11px] text-black">
                    {project}
                  </span>
                ))}
              </div>
            </div>
          ) : null}
        </div>

        <div className="min-h-0 space-y-4 overflow-y-auto rounded-[28px] border border-slate-200 bg-white p-4 shadow-lg shadow-slate-200/70 sm:p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="text-[10px] uppercase tracking-[0.45em] text-slate-500">Official links</div>
              <p className="mt-2 text-[13px] leading-6 text-slate-600 sm:text-sm sm:leading-7">
                Every named technology opens its official home page and uses a branded logo where one is available.
              </p>
            </div>
            <div className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-xs text-slate-600">
              {totalTech} technologies
            </div>
          </div>

          <div className="space-y-4">
            {sections.map((section) => {
              const values = portfolio.skills[section.key as keyof typeof portfolio.skills] as string[];
              return (
                <section key={section.key} className="rounded-[24px] border border-slate-200 bg-slate-50 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-sm font-semibold text-slate-900">{section.title}</h3>
                      <p className="mt-1 text-xs leading-5 text-slate-500">{section.description}</p>
                    </div>
                    <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-[11px] text-slate-600">
                      {values.length}
                    </span>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {values.map((technology) => (
                      <TechnologyBadge
                        key={technology}
                        technology={technology}
                        size="sm"
                        className="border-slate-200 bg-white text-slate-700 hover:border-cyan-300 hover:bg-cyan-50"
                      />
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        </div>
      </div>
    </FullscreenFrame>
  );
}

function ContactOverlay({ onClose }: { onClose: () => void }) {
  const mobile = useIsMobile();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const mailtoHref = useMemo(() => {
    const subject = encodeURIComponent(`Portfolio inquiry from ${name || "a visitor"}`);
    const body = encodeURIComponent(
      [
        `Name: ${name || "Not provided"}`,
        `Email: ${email || "Not provided"}`,
        "",
        message || "No message provided."
      ].join("\n")
    );
    return `mailto:${portfolio.profile.email}?subject=${subject}&body=${body}`;
  }, [email, message, name]);

  return (
    <FullscreenFrame title="Get In Touch" eyebrow="Visiting card" onClose={onClose} browserChrome fullScreenMobile={mobile} motionDuration={0.9} motionScale={0.975} motionYOffset={18}>
      <div className={`grid h-full min-h-0 gap-4 overflow-y-auto lg:grid-cols-[0.95fr_1.05fr] ${mobile ? "grid-rows-[auto_auto]" : ""}`}>
        <form
          className="space-y-3 rounded-[28px] border border-slate-200 bg-slate-50 p-4 shadow-lg shadow-slate-200/70 sm:p-5"
          onSubmit={(event) => {
            event.preventDefault();
            window.location.href = mailtoHref;
          }}
        >
          <div className="text-[10px] uppercase tracking-[0.45em] text-cyan-700">Contact card</div>
          <input value={name} onChange={(event) => setName(event.target.value)} placeholder="Your name" className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-cyan-400" />
          <input value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Your email" className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-cyan-400" />
          <textarea value={message} onChange={(event) => setMessage(event.target.value)} placeholder="How can we work together?" rows={6} className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-cyan-400" />
          <div className="flex flex-wrap gap-2">
            <button type="submit" className="rounded-full bg-cyan-300 px-4 py-2 text-sm font-medium text-slate-950 transition hover:bg-cyan-200">
              Send
            </button>
            <a href={socialLinks.email} className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 transition hover:bg-slate-100">
              Mail directly
            </a>
          </div>
        </form>
        <div className="space-y-3 rounded-[28px] border border-slate-200 bg-white p-4 shadow-lg shadow-slate-200/70 sm:p-5">
          <div className="text-[10px] uppercase tracking-[0.45em] text-cyan-700">Options</div>
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
            <div className="font-semibold text-slate-900">Email</div>
            <a href={socialLinks.email} className="mt-1 block text-cyan-700">{portfolio.profile.email}</a>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
            <div className="font-semibold text-slate-900">Location</div>
            <div className="mt-1 flex items-center gap-2">
              <MapPin className="h-4 w-4 text-cyan-600" />
              {portfolio.profile.location}
            </div>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
            <div className="font-semibold text-slate-900">Profiles</div>
            <div className="mt-3 flex flex-wrap gap-2">
              <a href={socialLinks.linkedIn} target="_blank" rel="noreferrer" className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs text-slate-700">
                <Link2 className="mr-1 inline h-3 w-3" />
                LinkedIn
              </a>
              <a href={socialLinks.github} target="_blank" rel="noreferrer" className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs text-slate-700">
                <GitFork className="mr-1 inline h-3 w-3" />
                GitHub
              </a>
            </div>
          </div>
        </div>
      </div>
    </FullscreenFrame>
  );
}

function PhoneOverlay({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 18, scale: 0.95 }}
      transition={{ duration: 0.9, ease: "easeOut" }}
      className="relative flex items-center justify-center p-2 sm:p-4"
    >
      {/* Realistic Android Smartphone Body */}
      <div className="relative h-[560px] w-[min(280px,88vw)] scale-[0.78] overflow-hidden rounded-[42px] border-[8px] border-slate-800 bg-slate-950 shadow-2xl shadow-cyan-500/20 ring-1 ring-white/20 sm:w-[280px] sm:scale-100">
        {/* Top Punch-Hole Front Camera */}
        <div className="absolute top-3 left-1/2 z-30 h-3.5 w-3.5 -translate-x-1/2 rounded-full border border-slate-700 bg-black shadow-inner" />

        {/* Android Status Bar */}
        <div className="relative z-20 flex items-center justify-between px-6 pt-3 text-[10px] font-semibold text-slate-300">
          <span>10:00</span>
          <div className="flex items-center gap-1.5">
            <span className="text-[9px]">5G</span>
            <div className="h-2 w-3 rounded-sm border border-slate-300 bg-emerald-400" />
          </div>
        </div>

        {/* Android OS Display Wallpaper & Screen Content */}
        <div className="flex h-full flex-col justify-between bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-950 px-5 pt-8 pb-6">
          <div>
            <div className="mt-4 text-center">
              <div className="inline-block rounded-full bg-cyan-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-cyan-300 border border-cyan-500/20">
                Android 15 OS
              </div>
              <h3 className="mt-2 text-base font-bold text-white">{portfolio.profile.name}</h3>
              <p className="text-[11px] text-slate-400">{portfolio.profile.headline}</p>
            </div>

            {/* Android Quick Link Apps Grid */}
            <div className="mt-6 grid gap-2.5">
              <a
                href={socialLinks.linkedIn}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/10 p-3 text-xs font-semibold text-white backdrop-blur-md transition hover:bg-cyan-600/30"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-600 text-white shadow-md">
                  <Link2 className="h-4 w-4" />
                </div>
                <div>
                  <div>LinkedIn App</div>
                  <div className="text-[9px] text-slate-400">Professional Profile</div>
                </div>
              </a>

              <a
                href={socialLinks.github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/10 p-3 text-xs font-semibold text-white backdrop-blur-md transition hover:bg-cyan-600/30"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-slate-800 text-white shadow-md">
                  <GitFork className="h-4 w-4" />
                </div>
                <div>
                  <div>GitHub App</div>
                  <div className="text-[9px] text-slate-400">Repositories & Code</div>
                </div>
              </a>

              <a
                href={socialLinks.email}
                className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/10 p-3 text-xs font-semibold text-white backdrop-blur-md transition hover:bg-cyan-600/30"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-rose-600 text-white shadow-md">
                  <Mail className="h-4 w-4" />
                </div>
                <div>
                  <div>Gmail App</div>
                  <div className="text-[9px] text-slate-400">Send Direct Mail</div>
                </div>
              </a>
            </div>
          </div>

          {/* Android Bottom Gesture Bar & Close Button */}
          <div className="flex flex-col items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold text-white backdrop-blur-md hover:bg-white/20 transition"
            >
              Close Phone ✕
            </button>
            <div className="h-1 w-28 rounded-full bg-slate-400/60" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function HUDButton({
  label,
  icon: Icon,
  active,
  onClick,
  lightsOn = true
}: {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  active?: boolean;
  onClick: () => void;
  lightsOn?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "group flex items-center gap-3 rounded-2xl border px-4 py-3 text-sm shadow-2xl backdrop-blur-xl transition",
        active
          ? lightsOn ? "border-amber-700/40 bg-amber-900/40 text-amber-100 font-bold" : "border-cyan-300/30 bg-cyan-300/12 text-white font-bold"
          : lightsOn ? "border-amber-900/20 bg-amber-950/60 text-amber-100 hover:bg-amber-900/80" : "border-white/10 bg-slate-950/70 text-slate-100 hover:bg-white/10"
      ].join(" ")}
    >
      <Icon className={`h-4 w-4 ${lightsOn ? "text-amber-200" : "text-cyan-100"}`} />
      <span className="whitespace-nowrap">{label}</span>
    </button>
  );
}

function StatusChip({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 backdrop-blur-xl">
      <div className="text-[10px] uppercase tracking-[0.35em] text-slate-400">{label}</div>
      <div className="mt-1 text-sm font-medium text-white">{value}</div>
    </div>
  );
}

export function PortfolioShell() {
  const [mounted, setMounted] = useState(false);
  const [lightsOn, setLightsOn] = useState(true);
  const [cameraFocus, setCameraFocus] = useState<SceneFocus>("overview");
  const [overlayFocus, setOverlayFocus] = useState<SceneFocus | null>(null);
  const [projectsVisible, setProjectsVisible] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState(portfolio.projects[0]?.id ?? null);
  const [selectedBookId, setSelectedBookId] = useState<BookId | null>(null);
  const transitionTimerRef = useRef<number | null>(null);
  const projectsTimerRef = useRef<number | null>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    return () => {
      if (transitionTimerRef.current !== null) {
        window.clearTimeout(transitionTimerRef.current);
      }
      if (projectsTimerRef.current !== null) {
        window.clearTimeout(projectsTimerRef.current);
      }
    };
  }, []);

  const clearTransitionTimer = () => {
    if (transitionTimerRef.current !== null) {
      window.clearTimeout(transitionTimerRef.current);
      transitionTimerRef.current = null;
    }
  };

  const clearProjectsTimer = () => {
    if (projectsTimerRef.current !== null) {
      window.clearTimeout(projectsTimerRef.current);
      projectsTimerRef.current = null;
    }
  };

  const openView = (nextFocus: SceneFocus) => {
    clearTransitionTimer();
    clearProjectsTimer();
    setOverlayFocus(null);

    if (nextFocus === "projects") {
      setProjectsVisible(false);
      setCameraFocus("projects");
      transitionTimerRef.current = window.setTimeout(() => {
        setOverlayFocus("projects");
        transitionTimerRef.current = null;
      }, 700);
      return;
    }

    setProjectsVisible(false);
    setCameraFocus(nextFocus);
    const overlayDelay = nextFocus === "resume" ? 1900 : nextFocus === "technologies" ? 1600 : nextFocus === "phone" || nextFocus === "contact" ? 1400 : 620;
    transitionTimerRef.current = window.setTimeout(() => {
      setOverlayFocus(nextFocus);
      transitionTimerRef.current = null;
    }, overlayDelay);
  };

  const closeView = () => {
    const currentFocus = cameraFocus;
    clearTransitionTimer();
    clearProjectsTimer();
    setOverlayFocus(null);
    setProjectsVisible(false);
    const returnDelay = currentFocus === "resume" || currentFocus === "technologies" || currentFocus === "phone" || currentFocus === "contact" ? 1300 : 620;
    transitionTimerRef.current = window.setTimeout(() => {
      setCameraFocus("overview");
      transitionTimerRef.current = null;
    }, returnDelay);
  };

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeView();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const selectedProject = useMemo(
    () => portfolio.projects.find((project) => project.id === selectedProjectId) ?? portfolio.projects[0],
    [selectedProjectId]
  );
  const selectedBook = selectedBookId ? bookInfo[selectedBookId] : null;
  const totalTech = useMemo(() => new Set(Object.values(portfolio.skills).flat()).size, []);

  if (!mounted) return null;

  return (
    <main className="fixed inset-0 h-screen w-screen overflow-hidden bg-slate-950 text-white">
      {/* Full Window 3D Room Canvas */}
      <div className="absolute inset-0 h-full w-full">
        <Room
          lightsOn={lightsOn}
          mobile={isMobile}
          focus={cameraFocus}
          projectsVisible={projectsVisible}
          resumeVisible={overlayFocus !== "resume"}
          projects={portfolio.projects}
          selectedProjectId={selectedProject.id}
          onToggleLight={() => setLightsOn((value) => !value)}
          onOpenComputer={() => openView("projects")}
          onOpenResume={() => openView("resume")}
          onOpenPhone={() => openView("phone")}
          onOpenContact={() => openView("contact")}
          onCloseProjects={closeView}
          onSelectProject={(projectId) => {
            setSelectedProjectId(projectId);
            openView("projects");
          }}
          onBookSelect={(book) => setSelectedBookId(book as BookId)}
        />
      </div>

      {/* Floating Header */}
      <div className="pointer-events-none fixed top-3 left-3 z-40 flex items-center gap-3 sm:top-4 sm:left-4">
        <div className="pointer-events-auto inline-flex items-center gap-3 rounded-full border border-white/10 bg-slate-950/80 px-4 py-2.5 backdrop-blur-xl shadow-lg">
          <div className="rounded-full border border-cyan-300/20 bg-cyan-300/10 p-1.5 text-cyan-100">
            <Sparkles className="h-4 w-4" />
          </div>
          <div>
            <div className="text-[8px] uppercase tracking-[0.32em] text-cyan-200/60 sm:text-[9px] sm:tracking-[0.4em]">3D Interactive Room</div>
            <div className="text-[11px] font-semibold sm:text-xs">{portfolio.profile.name}</div>
          </div>
        </div>
      </div>

      {/* Minimal Right Sidebar Navigation HUD matching reference video */}
      <div className={isMobile ? "fixed left-2 right-2 bottom-2 z-40 grid grid-cols-2 gap-2 sm:left-3 sm:right-3 sm:bottom-3" : "fixed bottom-6 right-4 z-40 flex flex-col gap-2"}>
        <HUDButton label="About Me" icon={UserRound} active={cameraFocus === "resume"} onClick={() => openView("resume")} lightsOn={lightsOn} />
        <HUDButton label="Projects" icon={Monitor} active={cameraFocus === "projects"} onClick={() => openView("projects")} lightsOn={lightsOn} />
        <HUDButton label="Get In Touch" icon={Mail} active={cameraFocus === "contact"} onClick={() => openView("contact")} lightsOn={lightsOn} />
        <HUDButton label="Technologies" icon={SquareTerminal} active={cameraFocus === "technologies"} onClick={() => openView("technologies")} lightsOn={lightsOn} />
        <div className={isMobile ? "col-span-2" : ""}>
          <HUDButton label="Mobile" icon={Phone} active={cameraFocus === "phone"} onClick={() => openView("phone")} lightsOn={lightsOn} />
        </div>
      </div>

      {/* Floating Bottom Close View / Back to Room Button */}
      {cameraFocus !== "overview" ? (
        <div className="fixed bottom-2 left-1/2 z-50 -translate-x-1/2 sm:bottom-6">
          <button
            type="button"
            onClick={closeView}
            className={`flex items-center gap-2 rounded-full border px-4 py-2 text-[11px] font-bold shadow-2xl backdrop-blur-xl transition transform hover:scale-105 sm:px-6 sm:py-2.5 sm:text-xs ${
              lightsOn
                ? "border-amber-800/40 bg-amber-950/80 text-amber-100 hover:bg-amber-900"
                : "border-cyan-500/40 bg-slate-900/90 text-cyan-300 hover:bg-slate-800"
            }`}
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>Close View / Back to Room ✕</span>
          </button>
        </div>
      ) : null}

      <AnimatePresence mode="wait">
        {overlayFocus === "projects" ? (
          <div key="projects" className="fixed inset-0 z-[70] flex items-center justify-center bg-black/70 px-0 py-0 sm:px-3 sm:py-4">
            <ProjectsOverlay
              project={selectedProject}
              projects={portfolio.projects}
              mobile={isMobile}
              onClose={closeView}
              onSelectProject={setSelectedProjectId}
            />
          </div>
        ) : null}

        {overlayFocus === "technologies" ? (
          <div key="technologies" className="fixed inset-0 z-[70] flex items-center justify-center bg-white px-0 py-0 sm:px-3 sm:py-4">
            <TechnologiesOverlay
              onClose={closeView}
              onBookSelect={(book) => setSelectedBookId(book)}
              selectedBook={selectedBook}
              totalTech={totalTech}
              mobile={isMobile}
            />
          </div>
        ) : null}

        {overlayFocus === "resume" ? (
          <ResumeOverlayFull key="resume" onClose={closeView} lightsOn={lightsOn} />
        ) : null}

        {overlayFocus === "contact" ? (
          <div key="contact" className="fixed inset-0 z-[70] flex items-center justify-center bg-white px-0 py-0 sm:px-3 sm:py-4">
            <ContactOverlay onClose={closeView} />
          </div>
        ) : null}

        {overlayFocus === "phone" ? (
          <div key="phone" className="fixed inset-0 z-[70] flex items-center justify-center bg-black/30 px-3 py-4 backdrop-blur-sm">
            <PhoneOverlay onClose={closeView} />
          </div>
        ) : null}
      </AnimatePresence>
    </main>
  );
}
