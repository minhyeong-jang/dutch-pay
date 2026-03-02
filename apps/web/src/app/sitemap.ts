import type { MetadataRoute } from "next";

import { BRAND } from "~/lib/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: BRAND.url,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
