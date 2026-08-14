import { placeholderLinks } from "@/lib/projectLinks";
import type { Project } from "@/types/project";

export const projects: Project[] = [
  {
    id: "raise",
    name: "RAISE",
    category: "professional",
    uiPath: "/projects/raise",
    tagline: "Rice AI Stress Evaluator",
    description:
      "A production AI platform for diagnosing biotic and abiotic rice crop stress from field images. It combines mobile inference, scientist and admin workflows, expert validation, prediction history, multilingual UI, and offline-first support.",
    problem:
      "Agricultural teams needed a practical way to diagnose rice crop stress from field images and support expert review workflows.",
    solution:
      "A production system combining Flutter, TensorFlow, Spring Boot, and PostgreSQL to support both offline mobile inference and server-side workflows, with the real app available on Google Play.",
    technologies: ["Flutter", "TensorFlow", "Spring Boot", "Python", "PostgreSQL", "TFLite", "ONNX Runtime"],
    features: [
      "Rice crop stress diagnosis",
      "Offline mobile inference",
      "Online backend inference",
      "Scientist/admin workflows",
      "Prediction history",
      "Multilingual UI"
    ],
    highlights: ["Google Play: RAISE IIRR"],
    screenshots: ["Field Diagnosis", "Stress Summary", "History View"],
    links: {
      ...placeholderLinks,
      playStore: "https://play.google.com/store/apps/details?id=com.iirr.smart_paddy",
      caseStudy: null
    }
  },
  {
    id: "ricegpt",
    name: "RiceGPT AI",
    category: "personal",
    uiPath: "/projects/ricegpt",
    tagline: "Agricultural AI assistant",
    description:
      "A focused rice-agriculture assistant concept designed to answer domain questions with structured guidance, context-aware responses, and a clean app-style experience inside the portfolio.",
    problem: "Agricultural support knowledge is often scattered across many documents and workflows.",
    solution: "A focused assistant experience centered on rice-related advice, guidance, and reference answers presented as the original app view inside the portfolio.",
    technologies: ["Next.js", "TypeScript", "React", "OpenAI-ready architecture"],
    features: ["Conversational assistance", "Domain knowledge base", "Guided answer flow"],
    screenshots: ["Chat Home", "Prompt Flow", "Knowledge Base"],
    links: {
      ...placeholderLinks,
      live: "https://quiet-sun-da4e.gsampathchary454.workers.dev/",
      backend: "https://ricegpt-ai-copilot.onrender.com"
    }
  },
  {
    id: "resumeai",
    name: "ResumeAI Pro",
    category: "personal",
    uiPath: "/projects/resumeai",
    tagline: "AI resume optimization concept",
    description:
      "A resume analysis and refinement web app concept that helps candidates improve structure, clarity, role alignment, and recruiter readiness.",
    problem: "Many resumes need clear, role-specific tuning before sharing with recruiters.",
    solution: "A workflow for analyzing text and suggesting improvements in a recruiter-friendly format, with screenshots preserved for the full experience.",
    technologies: ["Next.js", "TypeScript", "React", "AI workflow design"],
    features: ["Resume analysis", "Section recommendations", "Recruiter-ready output"],
    screenshots: ["Upload", "Score Report", "Rewrite Tips"],
    links: {
      ...placeholderLinks,
      live: "https://resume-ai-pro-beryl.vercel.app/",
      backend: "https://resumeai-pro-5yon.onrender.com"
    }
  },
  {
    id: "interview-copilot",
    name: "Interview Copilot AI",
    category: "personal",
    uiPath: "/projects/interview-copilot",
    tagline: "Interview preparation companion",
    description:
      "An interview preparation web app concept that supports technical question practice, answer structuring, and confidence building for engineering interviews.",
    problem: "Candidates need structured practice for common and role-specific interview patterns.",
    solution: "An assistant that organizes question sets, answer templates, revision workflows, and the original experience shown on the portfolio site.",
    technologies: ["React", "TypeScript", "AI prompting", "Knowledge base"],
    features: ["Question practice", "Answer guidance", "Revision workflow"],
    screenshots: ["Practice Mode", "Answer Review", "Feedback Panel"],
    links: {
      ...placeholderLinks,
      live: "https://interview-copilot-ai-ten.vercel.app/",
      backend: "https://interview-copilot-ai-mjgj.onrender.com"
    }
  },
  {
    id: "datainsight",
    name: "DataInsight AI",
    category: "personal",
    uiPath: "/projects/datainsight",
    tagline: "AI data analysis concept",
    description:
      "A data-analysis web app concept for exploratory analysis, pattern detection, and concise report generation from uploaded datasets.",
    problem: "Non-technical users and fast-moving teams need quick insight generation from raw data.",
    solution: "A guided insight flow that surfaces patterns, dashboard summaries, and report exports while keeping the original app experience visible.",
    technologies: ["Python", "Next.js", "TypeScript", "Data visualization"],
    features: ["Dataset summaries", "Pattern discovery", "Insight exports"],
    screenshots: ["Dataset Upload", "EDA Summary", "Report Export"],
    links: {
      ...placeholderLinks,
      live: "https://data-insight-ai-dywd.vercel.app/",
      backend: "https://datainsight-ai-18xr.onrender.com"
    }
  },
  {
    id: "automl-studio",
    name: "AutoML Studio",
    category: "personal",
    uiPath: "/projects/automl-studio",
    tagline: "Automated ML workflow concept",
    description:
      "An end-to-end automated machine learning web app concept for dataset upload, preprocessing, training, model comparison, and evaluation.",
    problem: "Training and comparing models manually takes time and makes experimentation harder to scale.",
    solution: "A structured workflow for automating preprocessing, model training, comparison, evaluation, and the original app experience on the portfolio.",
    technologies: ["Python", "FastAPI", "Scikit-learn", "Next.js", "Gemini-ready design"],
    features: ["Dataset upload", "Preprocessing", "Model training", "Model comparison", "Model evaluation"],
    screenshots: ["Train Flow", "Model Compare", "Evaluation"],
    links: {
      ...placeholderLinks,
      live: "https://auto-ml-studio-lilac.vercel.app/",
      backend: "https://automl-studio-1lw6.onrender.com"
    }
  }
];
