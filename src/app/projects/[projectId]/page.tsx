import Link from "next/link";
import { notFound } from "next/navigation";
import { ProjectDetail } from "@/components/sections/ProjectDetail";
import { getProjectById } from "@/lib/projectRoutes";

type ProjectPageProps = {
  params: Promise<{ projectId: string }>;
};

export function generateStaticParams() {
  return [
    { projectId: "insightbi-ai" },
    { projectId: "vistara-ai" },
    { projectId: "bharateye" },
    { projectId: "raise" },
    { projectId: "ricegpt" },
    { projectId: "resumeai" },
    { projectId: "interview-copilot" },
    { projectId: "datainsight" },
    { projectId: "automl-studio" }
  ];
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { projectId } = await params;
  const project = getProjectById(projectId);

  if (!project) {
    notFound();
  }

  return (
    <main className="mx-auto min-h-[100dvh] w-full max-w-7xl px-3 py-3 sm:px-4 sm:py-6 lg:px-6">
      <div className="mb-4 flex flex-col gap-3 sm:mb-6 sm:flex-row sm:items-center sm:justify-between">
        <Link href="/projects" className="w-full rounded-full border border-white/10 bg-white/5 px-4 py-2 text-center text-sm text-slate-100 sm:w-auto">
          Back to Projects
        </Link>
        <Link href="/" className="w-full rounded-full border border-white/10 bg-white/5 px-4 py-2 text-center text-sm text-slate-100 sm:w-auto">
          Back to Lab
        </Link>
      </div>
      <ProjectDetail project={project} />
    </main>
  );
}
