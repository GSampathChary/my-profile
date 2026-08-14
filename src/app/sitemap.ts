import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://example.com";

  return ["/", "/projects", "/experience", "/resume", "/professional"].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date()
  }));
}
