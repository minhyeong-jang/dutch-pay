import type { MetadataRoute } from "next";

import { BRAND } from "~/lib/constants";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/dashboard", "/template/", "/share/", "/settings"],
      },
      {
        userAgent: ["GPTBot", "Claude-Web", "Applebot-Extended"],
        allow: "/",
      },
    ],
    sitemap: `${BRAND.url}/sitemap.xml`,
  };
}
