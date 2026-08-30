import type { MetadataRoute } from "next";
import posts from "./guides/posts";
import { fetchPublishedGuides } from "@/lib/guides";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
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
  const appwriteGuides = await fetchPublishedGuides().catch(() => []);
  const staticGuideEntries = posts.map((post) => ({
    slug: post.slug,
    date: post.date,
  }));
  const appwriteGuideEntries = appwriteGuides.map((guide) => ({
    slug: guide.slug,
    date: guide.published || guide.updated || guide.$createdAt || new Date().toISOString(),
  }));
  const guidesBySlug = new Map<string, { slug: string; date: string }>();
  for (const guide of staticGuideEntries) {
    guidesBySlug.set(guide.slug, guide);
  }
  for (const guide of appwriteGuideEntries) {
    guidesBySlug.set(guide.slug, guide);
  }
  const sitemapGuides = Array.from(guidesBySlug.values());
  const latestPostDate = sitemapGuides.reduce<Date>(
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

    ...sitemapGuides.map((post) => ({
      url: `${baseUrl}/guides/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}