export const appRoutes = [
  { href: "/", label: "Lab" },
  { href: "/projects", label: "Projects" },
  { href: "/experience", label: "Experience" },
  { href: "/resume", label: "Resume" },
  { href: "/professional", label: "Professional" }
] as const;

export const roomLabels = {
  projects: "PROJECTS",
  experience: "EXPERIENCE",
  resume: "RESUME",
  raise: "RAISE"
} as const;

export const labIntro = "Welcome to my AI Engineer Lab";
