export type TechnologyMeta = {
  label: string;
  href?: string | null;
  logo?: string | null;
  initials: string;
  accent: {
    bg: string;
    fg: string;
    border: string;
  };
};

const simpleIcon = (slug: string) => `https://cdn.simpleicons.org/${slug}`;

const catalog: Record<string, TechnologyMeta> = {
  "next.js": {
    label: "Next.js",
    href: "https://nextjs.org/",
    logo: simpleIcon("nextdotjs"),
    initials: "Nx",
    accent: { bg: "#111827", fg: "#f9fafb", border: "#374151" }
  },
  react: {
    label: "React",
    href: "https://react.dev/",
    logo: simpleIcon("react"),
    initials: "Rx",
    accent: { bg: "#0f172a", fg: "#67e8f9", border: "#155e75" }
  },
  typescript: {
    label: "TypeScript",
    href: "https://www.typescriptlang.org/",
    logo: simpleIcon("typescript"),
    initials: "TS",
    accent: { bg: "#1e3a8a", fg: "#dbeafe", border: "#1d4ed8" }
  },
  javascript: {
    label: "JavaScript",
    href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
    logo: simpleIcon("javascript"),
    initials: "JS",
    accent: { bg: "#713f12", fg: "#fef3c7", border: "#b45309" }
  },
  python: {
    label: "Python",
    href: "https://www.python.org/",
    logo: simpleIcon("python"),
    initials: "Py",
    accent: { bg: "#172554", fg: "#dbeafe", border: "#2563eb" }
  },
  dart: {
    label: "Dart",
    href: "https://dart.dev/",
    logo: simpleIcon("dart"),
    initials: "Dt",
    accent: { bg: "#0f766e", fg: "#ccfbf1", border: "#14b8a6" }
  },
  java: {
    label: "Java",
    href: "https://www.java.com/",
    logo: simpleIcon("openjdk"),
    initials: "Ja",
    accent: { bg: "#7c2d12", fg: "#ffedd5", border: "#ea580c" }
  },
  sql: {
    label: "SQL",
    href: "https://www.iso.org/standard/63555.html",
    initials: "SQ",
    accent: { bg: "#312e81", fg: "#e0e7ff", border: "#6366f1" }
  },
  flutter: {
    label: "Flutter",
    href: "https://flutter.dev/",
    logo: simpleIcon("flutter"),
    initials: "Fl",
    accent: { bg: "#1e3a8a", fg: "#dbeafe", border: "#60a5fa" }
  },
  tensorflow: {
    label: "TensorFlow",
    href: "https://www.tensorflow.org/",
    logo: simpleIcon("tensorflow"),
    initials: "TF",
    accent: { bg: "#7f1d1d", fg: "#fee2e2", border: "#ef4444" }
  },
  "tensorflow lite": {
    label: "TensorFlow Lite",
    href: "https://www.tensorflow.org/lite",
    logo: simpleIcon("tensorflow"),
    initials: "TL",
    accent: { bg: "#7f1d1d", fg: "#fee2e2", border: "#f97316" }
  },
  "tflite": {
    label: "TensorFlow Lite",
    href: "https://www.tensorflow.org/lite",
    logo: simpleIcon("tensorflow"),
    initials: "TL",
    accent: { bg: "#7f1d1d", fg: "#fee2e2", border: "#f97316" }
  },
  "onnx runtime": {
    label: "ONNX Runtime",
    href: "https://onnxruntime.ai/",
    initials: "OR",
    accent: { bg: "#0f172a", fg: "#bfdbfe", border: "#38bdf8" }
  },
  "scikit-learn": {
    label: "Scikit-learn",
    href: "https://scikit-learn.org/",
    logo: simpleIcon("scikitlearn"),
    initials: "Sk",
    accent: { bg: "#111827", fg: "#fca5a5", border: "#f59e0b" }
  },
  pytorch: {
    label: "PyTorch",
    href: "https://pytorch.org/",
    logo: simpleIcon("pytorch"),
    initials: "PT",
    accent: { bg: "#7c2d12", fg: "#fed7aa", border: "#fb923c" }
  },
  fastapi: {
    label: "FastAPI",
    href: "https://fastapi.tiangolo.com/",
    logo: simpleIcon("fastapi"),
    initials: "FA",
    accent: { bg: "#064e3b", fg: "#d1fae5", border: "#10b981" }
  },
  "spring boot": {
    label: "Spring Boot",
    href: "https://spring.io/projects/spring-boot",
    logo: simpleIcon("spring"),
    initials: "SB",
    accent: { bg: "#14532d", fg: "#dcfce7", border: "#22c55e" }
  },
  "postgresql": {
    label: "PostgreSQL",
    href: "https://www.postgresql.org/",
    logo: simpleIcon("postgresql"),
    initials: "PG",
    accent: { bg: "#172554", fg: "#dbeafe", border: "#60a5fa" }
  },
  sqlite: {
    label: "SQLite",
    href: "https://www.sqlite.org/",
    logo: simpleIcon("sqlite"),
    initials: "SQ",
    accent: { bg: "#334155", fg: "#e2e8f0", border: "#94a3b8" }
  },
  mysql: {
    label: "MySQL",
    href: "https://www.mysql.com/",
    logo: simpleIcon("mysql"),
    initials: "MY",
    accent: { bg: "#78350f", fg: "#fef3c7", border: "#f59e0b" }
  },
  firebase: {
    label: "Firebase",
    href: "https://firebase.google.com/",
    logo: simpleIcon("firebase"),
    initials: "FB",
    accent: { bg: "#7c2d12", fg: "#ffedd5", border: "#f97316" }
  },
  docker: {
    label: "Docker",
    href: "https://www.docker.com/",
    logo: simpleIcon("docker"),
    initials: "DK",
    accent: { bg: "#0f172a", fg: "#bae6fd", border: "#38bdf8" }
  },
  git: {
    label: "Git",
    href: "https://git-scm.com/",
    logo: simpleIcon("git"),
    initials: "GT",
    accent: { bg: "#7f1d1d", fg: "#fecaca", border: "#ef4444" }
  },
  github: {
    label: "GitHub",
    href: "https://github.com/",
    logo: simpleIcon("github"),
    initials: "GH",
    accent: { bg: "#111827", fg: "#f8fafc", border: "#475569" }
  },
  postman: {
    label: "Postman",
    href: "https://www.postman.com/",
    logo: simpleIcon("postman"),
    initials: "PM",
    accent: { bg: "#7c2d12", fg: "#ffedd5", border: "#fb923c" }
  },
  "google colab": {
    label: "Google Colab",
    href: "https://colab.research.google.com/",
    logo: simpleIcon("googlecolab"),
    initials: "GC",
    accent: { bg: "#1e3a8a", fg: "#dbeafe", border: "#60a5fa" }
  },
  "google play console": {
    label: "Google Play Console",
    href: "https://support.google.com/googleplay/android-developer/",
    logo: simpleIcon("googleplay"),
    initials: "GP",
    accent: { bg: "#14532d", fg: "#dcfce7", border: "#22c55e" }
  },
  opencv: {
    label: "OpenCV",
    href: "https://opencv.org/",
    logo: simpleIcon("opencv"),
    initials: "CV",
    accent: { bg: "#14532d", fg: "#dcfce7", border: "#22c55e" }
  },
  "openai": {
    label: "OpenAI",
    href: "https://openai.com/",
    logo: simpleIcon("openai"),
    initials: "OA",
    accent: { bg: "#111827", fg: "#ecfeff", border: "#22d3ee" }
  },
  "gemini": {
    label: "Gemini",
    href: "https://deepmind.google/technologies/gemini/",
    initials: "GM",
    accent: { bg: "#312e81", fg: "#e0e7ff", border: "#a78bfa" }
  },
  "langchain": {
    label: "LangChain",
    href: "https://www.langchain.com/",
    initials: "LC",
    accent: { bg: "#1f2937", fg: "#f3f4f6", border: "#6b7280" }
  },
  "langgraph": {
    label: "LangGraph",
    href: "https://langchain-ai.github.io/langgraph/",
    initials: "LG",
    accent: { bg: "#1f2937", fg: "#f3f4f6", border: "#38bdf8" }
  },
  "rest apis": {
    label: "REST APIs",
    initials: "API",
    accent: { bg: "#334155", fg: "#e2e8f0", border: "#64748b" }
  },
  "microservices": {
    label: "Microservices",
    initials: "MS",
    accent: { bg: "#334155", fg: "#e2e8f0", border: "#64748b" }
  },
  "html5": {
    label: "HTML5",
    href: "https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5",
    logo: simpleIcon("html5"),
    initials: "H5",
    accent: { bg: "#7c2d12", fg: "#ffedd5", border: "#ea580c" }
  },
  "css3": {
    label: "CSS3",
    href: "https://developer.mozilla.org/en-US/docs/Web/CSS",
    logo: simpleIcon("css"),
    initials: "C3",
    accent: { bg: "#1d4ed8", fg: "#dbeafe", border: "#60a5fa" }
  },
  "tailwind css": {
    label: "Tailwind CSS",
    href: "https://tailwindcss.com/",
    logo: simpleIcon("tailwindcss"),
    initials: "TW",
    accent: { bg: "#155e75", fg: "#cffafe", border: "#06b6d4" }
  }
};

function normalizeTechnologyName(technology: string) {
  return technology
    .trim()
    .toLowerCase()
    .replace(/\s*\([^)]*\)/g, "")
    .replace(/\.js$/i, "")
    .replace(/\s+/g, " ")
    .replace(/\./g, "");
}

export function getTechnologyMeta(technology: string): TechnologyMeta {
  const normalized = normalizeTechnologyName(technology);
  return (
    catalog[normalized] ?? {
      label: technology,
      initials: technology
        .split(/\s+/)
        .map((part) => part[0])
        .join("")
        .slice(0, 3)
        .toUpperCase(),
      accent: { bg: "#0f172a", fg: "#e2e8f0", border: "#475569" }
    }
  );
}
