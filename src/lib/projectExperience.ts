import type { Project } from "@/types/project";

export function getProjectPublicHref(project: Project) {
  return project.links.playStore ?? project.links.live ?? project.uiPath;
}

export function getProjectPublicLabel(project: Project) {
  if (project.links.playStore) {
    return "Play Store";
  }

  if (project.links.live) {
    return "Live Project";
  }

  return "Project";
}

export function getProjectExperienceHref(project: Project) {
  return getProjectPublicHref(project);
}

export function getProjectExperienceLabel(project: Project) {
  if (project.links.playStore) {
    return "Open App";
  }

  if (project.links.live) {
    return "Open Website";
  }

  return "Open App View";
}

export function getProjectBackendHref(project: Project) {
  return project.links.backend ?? getProjectPublicHref(project);
}

export function getProjectBackendLabel(project: Project) {
  return project.links.backend ? "Backend API" : "Open App View";
}

export function getProjectDetailLabel(project: Project) {
  return project.category === "professional" ? "Project Story" : "Portfolio Detail";
}
