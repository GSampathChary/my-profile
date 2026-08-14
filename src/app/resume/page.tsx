import Link from "next/link";
import { ResumeRoom } from "@/components/sections/ResumeRoom";

export default function ResumePage() {
  return (
    <main className="mx-auto min-h-screen max-w-7xl px-4 py-6 lg:px-6">
      <div className="mb-6 flex items-center justify-between">
        <Link href="/" className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-100">
          Back to Lab
        </Link>
        <Link href="/professional" className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-100">
          Professional
        </Link>
      </div>
      <ResumeRoom resumeAvailable />
    </main>
  );
}
