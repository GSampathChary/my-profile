import type { ProjectScreenshot } from "@/types/project";

export type NormalizedScreenshot = {
  src: string;
  label: string;
  alt: string;
};

export function normalizeScreenshot(screenshot: string | ProjectScreenshot, fallbackLabel: string): NormalizedScreenshot {
  if (typeof screenshot === "string") {
    return {
      src: screenshot,
      label: fallbackLabel,
      alt: fallbackLabel
    };
  }

  return {
    src: screenshot.src,
    label: screenshot.label ?? fallbackLabel,
    alt: screenshot.alt ?? screenshot.label ?? fallbackLabel
  };
}
