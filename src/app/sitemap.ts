import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://happynest-blancbelle.com",
      lastModified: new Date("2026-04-20"),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
