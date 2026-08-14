import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Gannoju Sampath Chary | AI & Full Stack Developer",
    template: "%s | Gannoju Sampath Chary"
  },
  description:
    "Space-themed portfolio for Gannoju Sampath Chary, featuring AI, mobile, and backend projects with a polished recruiter-friendly presentation.",
  metadataBase: new URL("https://example.com"),
  openGraph: {
    title: "Gannoju Sampath Chary | AI & Full Stack Developer",
    description:
      "Space-themed portfolio with featured projects, skills, achievements, and contact details.",
    type: "website"
  },
  robots: {
    index: true,
    follow: true
  },
  icons: {
    icon: "/favicon.svg"
  }
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
