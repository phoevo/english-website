import type { MetadataRoute } from "next";
import posts from "./guides/posts";
import { fetchPublishedGuides } from "@/lib/guides";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://synomilo.com";

  // Public pages with SEO-appropriate relative priorities.
  // lastModified is intentionally omitted because these pages should not
  // appear updated every time a new guide is published.
  const publicPages = [
    {
      path: "/",
      changeFrequency: "weekly" as const,
      priority: 1.0,
    },
    {
      path: "/guides",
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      path: "/pricing",
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      path: "/about",
      changeFrequency: "monthly" as const,
      priority: 0.5,
    },
    {
      path: "/privacy",
      changeFrequency: "yearly" as const,
      priority: 0.2,
    },
    {
      path: "/refund",
      changeFrequency: "yearly" as const,
      priority: 0.2,
    },
    {
      path: "/ToS",
      changeFrequency: "yearly" as const,
      priority: 0.2,
    },
  ];

  // Fetch dynamically published guides.
  // If Appwrite is unavailable, the sitemap still works with static guides.
  const appwriteGuides = await fetchPublishedGuides().catch(() => []);

  const staticGuideEntries = posts.map((post) => ({
    slug: post.slug,
    date: post.date,
  }));

  const appwriteGuideEntries = appwriteGuides.map((guide) => ({
    slug: guide.slug,
    date:
      guide.published ||
      guide.updated ||
      guide.$createdAt ||
      new Date().toISOString(),
  }));

  // Deduplicate guides by slug.
  // Appwrite entries override static entries when the same slug exists.
  const guidesBySlug = new Map<
    string,
    {
      slug: string;
      date: string;
    }
  >();

  for (const guide of staticGuideEntries) {
    guidesBySlug.set(guide.slug, guide);
  }

  for (const guide of appwriteGuideEntries) {
    guidesBySlug.set(guide.slug, guide);
  }

  const sitemapGuides = Array.from(guidesBySlug.values());

  return [
    // Main/public pages
    ...publicPages.map(({ path, changeFrequency, priority }) => ({
      url: `${baseUrl}${path === "/" ? "" : path}`,
      changeFrequency,
      priority,
    })),

    // Published guide pages
    ...sitemapGuides.map((post) => ({
      url: `${baseUrl}/guides/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}