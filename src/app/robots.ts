import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/onboarding", "/apply", "/contact", "/terms", "/privacy", "/refund"],
        disallow: ["/campus", "/classes", "/ai-teacher", "/lab", "/gps", "/profile", "/admin", "/api/"],
      },
    ],
    sitemap: "https://www.wwjcampus.in.net/sitemap.xml",
  };
}
