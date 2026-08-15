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
      <div className="mb-6 overflow-hidden rounded-[28px] border border-white/10 bg-white/5 p-5 shadow-glow backdrop-blur-xl">
        <div className="flex flex-col gap-4 md:flex-row md:items-center">
          <div className="relative h-28 w-28 overflow-hidden rounded-[28px] border border-white/10 bg-slate-900 shadow-2xl shadow-black/30">
            <img src="/images/sampath.png" alt="Gannoju Sampath Chary" className="h-full w-full object-cover object-center" />
          </div>
          <div>
            <div className="text-xs uppercase tracking-[0.4em] text-cyan-200/60">Resume Portrait</div>
            <h1 className="mt-2 text-3xl font-semibold text-white">Gannoju Sampath Chary</h1>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-300">
              AI Engineer with experience in Python, Flutter, React.js, Spring Boot, FastAPI, TensorFlow, and production deployment.
            </p>
          </div>
        </div>
      </div>
      <ResumeRoom resumeAvailable />
    </main>
  );
}
