import type { Metadata } from "next";
import type { Viewport } from "next";
import type { ReactNode } from "react";
import { VisitorTracker } from "@/components/analytics/VisitorTracker";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Gannoju Sampath Chary | AI Engineer",
    template: "%s | Gannoju Sampath Chary"
  },
  description:
    "Interactive AI engineer portfolio for Gannoju Sampath Chary, showcasing applied machine learning, computer vision, Python backend work, Flutter apps, and flagship projects.",
  metadataBase: new URL("https://example.com"),
  openGraph: {
    title: "Gannoju Sampath Chary | AI Engineer",
    description: "Portfolio with featured projects, skills, achievements, and contact details.",
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

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#020617"
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <VisitorTracker />
        {children}
      </body>
    </html>
  );
}
