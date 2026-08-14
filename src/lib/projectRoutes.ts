import { projects } from "@/data/projects";
import type { Project } from "@/types/project";

export function getProjectById(projectId: string): Project | null {
  return projects.find((project) => project.id === projectId) ?? null;
}

export function getProjectByUiPath(uiPath: string): Project | null {
  return projects.find((project) => project.uiPath === uiPath) ?? null;
}

export function getProjectUiPaths() {
  return projects.map((project) => project.uiPath);
}
