import { portfolio } from "@/data/portfolio";
import { stripProtocol } from "@/lib/utils";

type AssistantResponse = {
  answer: string;
  links?: Array<{ label: string; href: string }>;
};

function listProjectNames() {
  return portfolio.projects.map((project) => project.name).join(", ");
}

export function askPortfolioAssistant(query: string): AssistantResponse {
  const normalized = query.toLowerCase();

  if (normalized.includes("contact")) {
    return {
      answer: `You can reach ${portfolio.profile.name} at ${portfolio.profile.email}.`,
      links: [
        { label: "Email", href: `mailto:${portfolio.profile.email}` },
        { label: "LinkedIn", href: portfolio.profile.linkedIn },
        { label: "GitHub", href: portfolio.profile.github }
      ]
    };
  }

  if (normalized.includes("resume")) {
    return {
      answer: "The resume is available from the Resume section and can be downloaded when the PDF is added.",
      links: [{ label: "Resume", href: "/resume" }]
    };
  }

  if (normalized.includes("project")) {
    return {
      answer: `Available projects include ${listProjectNames()}.`,
      links: [{ label: "Projects", href: "/projects" }]
    };
  }

  if (normalized.includes("technology") || normalized.includes("stack") || normalized.includes("skills")) {
    const categories = Object.entries(portfolio.skills)
      .map(([label, values]) => `${label}: ${values.slice(0, 4).join(", ")}`)
      .join(" | ");
    return {
      answer: `Core technologies are organized by category. ${categories}.`,
      links: [{ label: "Professional", href: "/professional" }]
    };
  }

  if (normalized.includes("raise")) {
    return {
      answer:
        "RAISE is the professional Rice AI Stress Evaluator project built for rice crop stress diagnosis and expert review workflows.",
      links: [{ label: "Experience", href: "/experience" }]
    };
  }

  return {
    answer:
      "I can help with projects, technologies, RAISE, resume access, experience, and contact details. Ask me a focused question and I’ll point you to the right section.",
    links: [{ label: "Explore Lab", href: "/" }]
  };
}

export function getPortfolioSummary() {
  return {
    name: portfolio.profile.name,
    headline: portfolio.profile.headline,
    location: portfolio.profile.location,
    summary: portfolio.profile.introduction,
    social: {
      linkedIn: stripProtocol(portfolio.profile.linkedIn),
      github: stripProtocol(portfolio.profile.github)
    }
  };
}
