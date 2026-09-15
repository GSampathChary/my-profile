import { placeholderLinks } from "@/lib/projectLinks";
import type { Project } from "@/types/project";

export const projects: Project[] = [
  {
    id: "insightbi-ai",
    name: "InsightBI AI",
    category: "personal",
    uiPath: "/projects/insightbi-ai",
    tagline: "India-focused Power BI and AI analytics platform",
    description:
      "An end-to-end business intelligence platform that turns sales data into Power BI-ready analytics, executive dashboards, customer insights, forecasting, anomaly detection, and AI-assisted business analysis.",
    problem:
      "Business teams need reliable, localized reporting and actionable insights, but raw sales data is often not structured for analysis or decision-making.",
    solution:
      "A full-stack analytics platform with a Kimball-style PostgreSQL model, ETL validation, FastAPI reporting APIs, interactive Next.js dashboards, Power BI documentation, and machine-learning insight workflows.",
    technologies: ["Power BI", "DAX", "Power Query", "PostgreSQL", "Python", "FastAPI", "Pandas", "Scikit-learn", "Next.js", "React", "TypeScript", "Tailwind CSS", "Recharts", "Docker"],
    features: [
      "Kimball-style sales star schema",
      "Validated ETL pipelines",
      "Executive KPI dashboards",
      "Customer RFM segmentation",
      "Revenue forecasting and anomaly detection",
      "India-ready INR and regional data support"
    ],
    screenshots: [
      {
        src: "/project-screenshots/insightbi-ai/dashboard.png",
        label: "Executive dashboard",
        alt: "InsightBI AI executive dashboard showing revenue, profit, order, customer, and trend analytics"
      }
    ],
    highlights: ["Power BI-ready semantic model", "Live deployment on Vercel"],
    links: {
      ...placeholderLinks,
      live: "https://insight-bi-ai-beta.vercel.app/"
    }
  },
  {
    id: "vistara-ai",
    name: "VistaraAI",
    category: "personal",
    uiPath: "/projects/vistara-ai",
    tagline: "AI-powered PVC interior design assistant",
    description:
      "A production-ready full-stack AI platform for PVC kitchen cupboards, wardrobes, TV units, and custom interiors, combining conversational guidance, knowledge retrieval, room analysis, and lead capture workflows.",
    problem:
      "PVC interior customers need guided recommendations, transparent pricing support, and a reliable assistant that can handle product questions and qualification workflows.",
    solution:
      "A Next.js and FastAPI application that blends a grounded knowledge base, AI assistant flows, computer vision insights, geo-targeted SEO, and deployment-ready infrastructure for sales and support teams.",
    technologies: ["Next.js", "TypeScript", "React", "FastAPI", "Python", "LangChain", "LangGraph", "OpenAI", "Gemini", "PostgreSQL", "Docker"],
    features: ["PVC product guidance", "RAG knowledge base", "Lead capture workflows", "Computer vision room analysis", "Geo-targeted SEO", "Dockerized deployment"],
    screenshots: [
      {
        src: "/project-screenshots/vistara-ai/bedroom-1.jfif",
        label: "Bedroom design"
      },
      {
        src: "/project-screenshots/vistara-ai/kitchen-1.jfif",
        label: "Kitchen design"
      },
      {
        src: "/project-screenshots/vistara-ai/tv-1.jfif",
        label: "TV unit design"
      }
    ],
    links: {
      ...placeholderLinks,
      live: "https://vistara-ai-pvc-interior-studio-xi.vercel.app/",
      backend: "https://vistaraai-pvc-interior-studio.onrender.com",
      architecture: null,
      caseStudy: null
    }
  },
  {
    id: "bharateye",
    name: "BharatEye",
    category: "personal",
    uiPath: "/projects/bharateye",
    tagline: "India-focused GeoAI and Earth Observation platform",
    description:
      "An India-focused GeoAI and Earth Observation platform built with React, Vite, FastAPI, Deck.gl, Mapbox GL JS, Zustand, and ECharts. It visualizes simulated satellite intelligence, disaster monitoring, AOI analysis, maritime surveillance, crop stress, and infrastructure risk through interactive geospatial dashboards, live event feeds, and WebSocket-powered updates.",
    problem:
      "Decision-makers need a clear, real-time geospatial view of environmental and infrastructure risk, but raw satellite and event data is difficult to interpret quickly.",
    solution:
      "A full-stack GeoAI dashboard that combines interactive maps, analytical charts, live feed updates, and deployment-ready frontend and backend services for exploration and monitoring.",
    technologies: ["React", "Vite", "FastAPI", "Deck.gl", "Mapbox GL JS", "Zustand", "ECharts", "WebSocket", "Render", "Vercel"],
    features: [
      "Interactive geospatial dashboards",
      "Simulated satellite intelligence",
      "Disaster and AOI analysis",
      "Maritime surveillance views",
      "Crop stress monitoring",
      "Infrastructure risk tracking"
    ],
    links: {
      ...placeholderLinks,
      live: "https://bharat-eye.vercel.app/",
      backend: "https://bharateye.onrender.com"
    }
  },
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
    screenshots: [
      {
        src: "/project-screenshots/raise/WhatsApp-Image-2026-08-14-at-8-49-14-PM.jpeg",
        label: "Field diagnosis"
      },
      {
        src: "/project-screenshots/raise/WhatsApp-Image-2026-08-14-at-8-49-14-PM-1.jpeg",
        label: "Stress summary"
      },
      {
        src: "/project-screenshots/raise/WhatsApp-Image-2026-08-14-at-8-49-15-PM.jpeg",
        label: "History view"
      },
      {
        src: "/project-screenshots/raise/WhatsApp-Image-2026-08-14-at-8-49-15-PM-1.jpeg",
        label: "Scientist review"
      },
      {
        src: "/project-screenshots/raise/WhatsApp-Image-2026-08-14-at-8-49-15-PM-2.jpeg",
        label: "Admin workflow"
      },
      {
        src: "/project-screenshots/raise/WhatsApp-Image-2026-08-14-at-8-49-28-PM.jpeg",
        label: "Play Store listing"
      }
    ],
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
    technologies: ["Next.js", "TypeScript", "React", "OpenAI", "Knowledge Base"],
    features: ["Conversational assistance", "Domain knowledge base", "Guided answer flow"],
    screenshots: [
      {
        src: "/project-screenshots/ricegpt/Screenshot-20260814-093947.png",
        label: "Chat home"
      },
      {
        src: "/project-screenshots/ricegpt/Screenshot-20260814-094031.png",
        label: "Prompt flow"
      },
      {
        src: "/project-screenshots/ricegpt/Screenshot-20260814-094149.png",
        label: "Knowledge base"
      },
      {
        src: "/project-screenshots/ricegpt/Screenshot-20260814-094233.png",
        label: "Result view"
      },
      {
        src: "/project-screenshots/ricegpt/Screenshot-20260814-094243.png",
        label: "Mobile layout"
      }
    ],
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
    technologies: ["Next.js", "TypeScript", "React", "Tailwind CSS", "FastAPI"],
    features: ["Resume analysis", "Section recommendations", "Recruiter-ready output"],
    screenshots: [
      {
        src: "/project-screenshots/resumeai/Screenshot-2026-08-14-204028.png",
        label: "Upload"
      },
      {
        src: "/project-screenshots/resumeai/Screenshot-2026-08-14-204103.png",
        label: "Score report"
      },
      {
        src: "/project-screenshots/resumeai/Screenshot-2026-08-14-204159.png",
        label: "Rewrite tips"
      }
    ],
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
    technologies: ["React", "TypeScript", "Prompt Engineering", "Knowledge Base"],
    features: ["Question practice", "Answer guidance", "Revision workflow"],
    screenshots: [
      {
        src: "/project-screenshots/interview-copilot/Screenshot-2026-08-14-203856.png",
        label: "Practice mode"
      },
      {
        src: "/project-screenshots/interview-copilot/Screenshot-2026-08-14-203932.png",
        label: "Answer review"
      },
      {
        src: "/project-screenshots/interview-copilot/Screenshot-2026-08-14-204002.png",
        label: "Feedback panel"
      }
    ],
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
    technologies: ["Python", "Next.js", "TypeScript", "Data Visualization"],
    features: ["Dataset summaries", "Pattern discovery", "Insight exports"],
    screenshots: [
      {
        src: "/project-screenshots/datainsight/Screenshot-2026-08-14-203612.png",
        label: "Dataset upload"
      },
      {
        src: "/project-screenshots/datainsight/Screenshot-2026-08-14-203727.png",
        label: "EDA summary"
      },
      {
        src: "/project-screenshots/datainsight/Screenshot-2026-08-14-203822.png",
        label: "Report export"
      }
    ],
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
    technologies: ["Python", "FastAPI", "Scikit-learn", "Next.js", "Gemini"],
    features: ["Dataset upload", "Preprocessing", "Model training", "Model comparison", "Model evaluation"],
    screenshots: [
      {
        src: "/project-screenshots/automl-studio/Screenshot-2026-08-14-204226.png",
        label: "Train flow"
      },
      {
        src: "/project-screenshots/automl-studio/Screenshot-2026-08-14-204301.png",
        label: "Model compare"
      },
      {
        src: "/project-screenshots/automl-studio/Screenshot-2026-08-14-204339.png",
        label: "Evaluation"
      }
    ],
    links: {
      ...placeholderLinks,
      live: "https://auto-ml-studio-lilac.vercel.app/",
      backend: "https://automl-studio-1lw6.onrender.com"
    }
  }
];
