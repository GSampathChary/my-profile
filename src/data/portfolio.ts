import { education } from "./education";
import { experience } from "./experience";
import { profile } from "./professional";
import { projects } from "./projects";
import { skills } from "./skills";
import type { PortfolioData } from "@/types/portfolio";

export const portfolio: PortfolioData = {
  profile,
  experience,
  education,
  projects,
  skills
};
