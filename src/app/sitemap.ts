import type { MetadataRoute } from "next";
import posts from "./guides/posts";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://synomilo.com";
  const publicPages = [
    "/",
    "/about",
    "/guides",
    "/pricing",
    "/privacy",
    "/refund",
    "/ToS",
  ];
  const latestPostDate = posts.reduce<Date>(
    (latest, post) => {
      const postDate = new Date(post.date);
      return postDate > latest ? postDate : latest;
    },
    new Date("2025-01-01")
  );

  return [
    ...publicPages.map((path) => ({
      url: `${baseUrl}${path === "/" ? "" : path}`,
      lastModified: latestPostDate,
      changeFrequency: path === "/" ? ("weekly" as const) : ("monthly" as const),
      priority: path === "/" ? 1 : path === "/guides" ? 0.9 : 0.7,
    })),

    ...posts.map((post) => ({
      url: `${baseUrl}/guides/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}