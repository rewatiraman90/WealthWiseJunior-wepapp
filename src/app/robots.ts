import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/parent", "/contact", "/terms", "/privacy", "/refund"],
        disallow: ["/campus", "/classes", "/ai-teacher", "/lab", "/gps", "/profile", "/admin", "/api/"],
      },
    ],
    sitemap: "https://wealthwisejunior.in.net/sitemap.xml",
  };
}
