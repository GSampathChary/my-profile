export interface ProjectLinks {
  github?: string | null;
  live?: string | null;
  backend?: string | null;
  architecture?: string | null;
  caseStudy?: string | null;
  playStore?: string | null;
}

export interface Project {
  id: string;
  name: string;
  category: "personal" | "professional";
  uiPath: string;
  tagline: string;
  description: string;
  problem: string;
  solution: string;
  technologies: string[];
  features: string[];
  highlights?: string[];
  links: ProjectLinks;
  screenshots?: string[];
  callout?: string;
}
