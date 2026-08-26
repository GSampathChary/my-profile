import Link from "next/link";
import { ResumeRoom } from "@/components/sections/ResumeRoom";

export default function ResumePage() {
  return (
    <main className="mx-auto min-h-screen max-w-7xl px-4 py-4 sm:py-6 lg:px-6">
      <div className="mb-4 flex flex-col gap-3 sm:mb-6 sm:flex-row sm:items-center sm:justify-between">
        <Link href="/" className="w-full rounded-full border border-white/10 bg-white/5 px-4 py-2 text-center text-sm text-slate-100 sm:w-auto">
          Back to Lab
        </Link>
        <Link href="/professional" className="w-full rounded-full border border-white/10 bg-white/5 px-4 py-2 text-center text-sm text-slate-100 sm:w-auto">
          Professional
        </Link>
      </div>
      <div className="mb-6 overflow-hidden rounded-[22px] border border-white/10 bg-white/5 p-4 shadow-glow backdrop-blur-xl sm:rounded-[28px] sm:p-5">
        <div className="flex flex-col gap-4 md:flex-row md:items-center">
          <div className="relative h-24 w-24 overflow-hidden rounded-[24px] border border-white/10 bg-slate-900 shadow-2xl shadow-black/30 sm:h-28 sm:w-28 sm:rounded-[28px]">
            <img src="/images/sampath.png" alt="Gannoju Sampath Chary" className="h-full w-full object-cover object-center" />
          </div>
          <div>
            <div className="text-xs uppercase tracking-[0.4em] text-cyan-200/60">Resume Portrait</div>
            <h1 className="mt-2 text-2xl font-semibold text-white sm:text-3xl">Gannoju Sampath Chary</h1>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-300 sm:text-base">
              AI Engineer with 1.10+ years of experience in Python, TypeScript, Flutter, React.js, Spring Boot, FastAPI, TensorFlow, and production deployment.
            </p>
          </div>
        </div>
      </div>
      <ResumeRoom resumeAvailable />
    </main>
  );
}
