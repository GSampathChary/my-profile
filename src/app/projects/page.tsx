import Link from "next/link";
import { ProjectRoom } from "@/components/sections/ProjectRoom";

export default function ProjectsPage() {
  return (
    <main className="mx-auto min-h-screen max-w-7xl px-4 py-4 sm:py-6 lg:px-6">
      <div className="mb-4 flex flex-col gap-3 sm:mb-6 sm:flex-row sm:items-center sm:justify-between">
        <Link href="/" className="w-full rounded-full border border-white/10 bg-white/5 px-4 py-2 text-center text-sm text-slate-100 sm:w-auto">
          Back to Lab
        </Link>
        <Link href="/resume" className="w-full rounded-full border border-white/10 bg-white/5 px-4 py-2 text-center text-sm text-slate-100 sm:w-auto">
          Resume
        </Link>
      </div>
      <ProjectRoom />
    </main>
  );
}
