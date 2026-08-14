import { portfolio } from "@/data/portfolio";

export function ExperienceRoom() {
  const { experience } = portfolio;

  return (
    <section className="space-y-6">
      <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-glow backdrop-blur-xl">
        <div className="text-xs uppercase tracking-[0.4em] text-cyan-200/60">Experience Room</div>
        <h1 className="mt-3 text-3xl font-semibold text-white">Professional Experience</h1>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300">{experience.summary}</p>
      </div>
      <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="rounded-3xl border border-white/10 bg-slate-950/70 p-6">
          <div className="text-lg font-semibold text-white">{experience.company}</div>
          <div className="mt-2 text-cyan-100/80">{experience.role}</div>
          <div className="mt-2 text-sm text-slate-400">{experience.duration} · {experience.location}</div>
          <div className="mt-6 text-sm font-medium uppercase tracking-[0.3em] text-cyan-200/60">Technologies</div>
          <div className="mt-3 flex flex-wrap gap-2">
            {experience.technologies.map((item) => (
              <span key={item} className="rounded-full bg-white/5 px-3 py-1 text-xs text-slate-200">
                {item}
              </span>
            ))}
          </div>
        </div>
        <div className="grid gap-6">
          <div className="rounded-3xl border border-white/10 bg-slate-950/70 p-6">
            <div className="text-sm font-medium uppercase tracking-[0.3em] text-cyan-200/60">Responsibilities</div>
            <ul className="mt-4 space-y-2 text-sm leading-6 text-slate-300">
              {experience.responsibilities.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl border border-white/10 bg-slate-950/70 p-6">
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
