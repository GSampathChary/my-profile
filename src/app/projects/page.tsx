import Link from "next/link";
import { ProjectRoom } from "@/components/sections/ProjectRoom";

export default function ProjectsPage() {
  return (
    <main className="mx-auto min-h-screen max-w-7xl px-4 py-6 lg:px-6">
      <div className="mb-6 flex items-center justify-between">
        <Link href="/" className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-100">
          Back to Lab
        </Link>
        <Link href="/resume" className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-100">
          Resume
        </Link>
      </div>
      <ProjectRoom />
    </main>
  );
}
