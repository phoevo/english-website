import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/home/",
        "/profile/",
        "/onboarding/",
        "/oauth-callback/",
        "/forgot-password/",
        "/reset-password/",
        "/api/",
      ],
    },
    sitemap: "https://synomilo.com/sitemap.xml",
  };
}