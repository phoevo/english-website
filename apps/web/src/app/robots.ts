import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: process.env.SITE_INDEXABLE === "true" ? "/" : undefined,
      disallow: process.env.SITE_INDEXABLE === "true" ? [
        "/home/",
        "/profile/",
        "/onboarding/",
        "/oauth-callback/",
        "/forgot-password/",
        "/reset-password/",
        "/api/",
      ] : ["/"],
    },
    sitemap: "https://synomilo.com/sitemap.xml",
  };
}