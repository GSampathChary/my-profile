import type { EducationEntry, ExperienceEntry } from "./experience";
import type { Project } from "./project";

export interface Profile {
  name: string;
  headline: string;
  introduction: string;
  location: string;
  email: string;
  linkedIn: string;
  github: string;
}

export interface PortfolioData {
  profile: Profile;
  experience: ExperienceEntry;
  education: EducationEntry;
  projects: Project[];
  skills: Record<string, string[]>;
}
