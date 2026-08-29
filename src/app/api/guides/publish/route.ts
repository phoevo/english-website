import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { Client, Databases, ID, Query } from "node-appwrite";

const getEnv = (key: string, fallbackKey?: string) =>
  process.env[key] ?? (fallbackKey ? process.env[fallbackKey] : undefined);

export async function POST(request: Request) {
  try {
    const endpoint = getEnv("APPWRITE_ENDPOINT", "NEXT_PUBLIC_APPWRITE_ENDPOINT");
    const projectId = getEnv("APPWRITE_PROJECT_ID", "NEXT_PUBLIC_APPWRITE_PROJECT_ID");
    const databaseId = getEnv("APPWRITE_DATABASE_ID", "NEXT_PUBLIC_APPWRITE_DATABASE_ID");
    const guidesCollectionId = getEnv(
      "APPWRITE_GUIDES_COLLECTION_ID",
      "NEXT_PUBLIC_APPWRITE_GUIDES_COLLECTION_ID"
    );
    const apiKey = process.env.APPWRITE_API_KEY;
    const averiWebhookSecret = process.env.AVERI_WEBHOOK_SECRET;

    if (
      !endpoint ||
      !projectId ||
      !databaseId ||
      !guidesCollectionId ||
      !apiKey ||
      !averiWebhookSecret
    ) {
      return NextResponse.json(
        { error: "Missing required webhook configuration." },
        { status: 500 }
      );
    }

    const authorization = request.headers.get("authorization");
    if (authorization !== `Bearer ${averiWebhookSecret}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { title, content, updated, published, featuredImage, slug, meta_description, read_time } =
      body;

    if (!title || !content) {
      return NextResponse.json(
        { error: "Title and content are required" },
        { status: 400 }
      );
    }

    const finalSlug =
      slug ||
      title
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");
    const normalizedReadTime =
      typeof read_time === "number"
        ? Math.trunc(read_time)
        : typeof read_time === "string"
          ? Number.parseInt(read_time, 10)
          : null;
    const nowIso = new Date().toISOString();
    const resolvedUpdated = updated || nowIso;
    const resolvedPublished = published || resolvedUpdated;

    const client = new Client()
      .setEndpoint(endpoint.replace(/\/$/, ""))
      .setProject(projectId)
      .setKey(apiKey);
    const databases = new Databases(client);

    const existing = await databases.listDocuments(databaseId, guidesCollectionId, [
      Query.equal("slug", finalSlug),
      Query.limit(1),
    ]);

    const guideData = {
      title,
      slug: finalSlug,
      content,
      meta_description: meta_description || "",
      featuredImage: featuredImage || "",
      read_time: Number.isFinite(normalizedReadTime) ? normalizedReadTime : null,
      published: resolvedPublished,
      updated: resolvedUpdated,
      status: "published",
    };

    if (existing.documents.length > 0) {
      const guide = await databases.updateDocument(
        databaseId,
        guidesCollectionId,
        existing.documents[0].$id,
        guideData
      );

      revalidatePath("/guides");
      revalidatePath(`/guides/${finalSlug}`);

      return NextResponse.json({
        success: true,
        action: "updated",
        guideId: guide.$id,
        slug: finalSlug,
      });
    }

    const guide = await databases.createDocument(
      databaseId,
      guidesCollectionId,
      ID.unique(),
      guideData
    );

    revalidatePath("/guides");
    revalidatePath(`/guides/${finalSlug}`);

    return NextResponse.json({
      success: true,
      action: "created",
      guideId: guide.$id,
      slug: finalSlug,
    });
  } catch (error) {
    console.error("Guide publish error:", error);
    return NextResponse.json(
      {
        error: "Failed to publish guide",
      },
      { status: 500 }
    );
  }
}
