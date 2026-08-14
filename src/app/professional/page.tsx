import Link from "next/link";
import { ProfessionalRoom } from "@/components/sections/ProfessionalRoom";

export default function ProfessionalPage() {
  return (
    <main className="mx-auto min-h-screen max-w-7xl px-4 py-6 lg:px-6">
      <div className="mb-6 flex items-center justify-between">
        <Link href="/" className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-100">
          Back to Lab
        </Link>
        <Link href="/projects" className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-100">
          Projects
        </Link>
      </div>
      <ProfessionalRoom />
    </main>
  );
}
