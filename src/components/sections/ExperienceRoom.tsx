import { portfolio } from "@/data/portfolio";
import { TechnologyBadge } from "@/components/ui/TechnologyBadge";

export function ExperienceRoom() {
  const { experience } = portfolio;

  return (
    <section className="space-y-6">
      <div className="rounded-[22px] border border-white/10 bg-white/5 p-4 shadow-glow backdrop-blur-xl sm:rounded-3xl sm:p-6">
        <div className="text-xs uppercase tracking-[0.4em] text-cyan-200/60">Experience Room</div>
        <h1 className="mt-3 text-2xl font-semibold text-white sm:text-3xl">Professional Experience</h1>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300 sm:text-base">{experience.summary}</p>
      </div>
      <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="rounded-[22px] border border-white/10 bg-slate-950/70 p-4 sm:rounded-3xl sm:p-6">
          <div className="text-lg font-semibold text-white">{experience.company}</div>
          <div className="mt-2 text-cyan-100/80">{experience.role}</div>
          <div className="mt-2 text-sm text-slate-400">{experience.duration} · {experience.location}</div>
          <div className="mt-6 text-sm font-medium uppercase tracking-[0.3em] text-cyan-200/60">Technologies</div>
          <div className="mt-3 flex flex-wrap gap-2">
            {experience.technologies.map((item) => (
              <TechnologyBadge key={item} technology={item} size="sm" className="border-white/10 bg-white/5 text-slate-200" />
            ))}
          </div>
        </div>
        <div className="grid gap-6">
          <div className="rounded-[22px] border border-white/10 bg-slate-950/70 p-4 sm:rounded-3xl sm:p-6">
            <div className="text-sm font-medium uppercase tracking-[0.3em] text-cyan-200/60">Responsibilities</div>
            <ul className="mt-4 space-y-2 text-sm leading-6 text-slate-300">
              {experience.responsibilities.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-[22px] border border-white/10 bg-slate-950/70 p-4 sm:rounded-3xl sm:p-6">
            <div className="text-sm font-medium uppercase tracking-[0.3em] text-cyan-200/60">Achievements</div>
            <ul className="mt-4 space-y-2 text-sm leading-6 text-slate-300">
              {experience.achievements.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
