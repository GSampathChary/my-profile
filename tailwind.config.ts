import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#050816",
          900: "#0a1020",
          800: "#111936",
          700: "#1a2447"
        },
        lab: {
          blue: "#7dd3fc",
          violet: "#a78bfa",
          amber: "#f5c26b"
        }
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(125, 211, 252, 0.15), 0 20px 60px rgba(7, 12, 25, 0.45)"
      },
      backgroundImage: {
        "lab-grid":
          "radial-gradient(circle at 1px 1px, rgba(148,163,184,0.12) 1px, transparent 0), linear-gradient(180deg, rgba(5,8,22,0.98), rgba(10,16,32,0.98))"
      },
      fontFamily: {
        sans: ["Inter", "Segoe UI", "system-ui", "sans-serif"]
      }
    }
  },
  plugins: []
};

export default config;
