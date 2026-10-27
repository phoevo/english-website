import "server-only";
import { Client, Databases, Query } from "node-appwrite";

export type Guide = {
  $id: string;
  $createdAt?: string;
  slug: string;
  title: string;
  content: string;
  meta_description?: string;
  featuredImage?: string;
  read_time?: number | string | null;
  published?: string | null;
  updated?: string | null;
  status?: string;
  topic?: string;
  level?: string;
  description?: string;
};

const getEnv = (key: string, fallbackKey?: string) =>
  process.env[key] ?? (fallbackKey ? process.env[fallbackKey] : undefined);

const getGuidesConfig = () => {
  const endpoint = getEnv("APPWRITE_ENDPOINT", "NEXT_PUBLIC_APPWRITE_ENDPOINT");
  const projectId = getEnv("APPWRITE_PROJECT_ID", "NEXT_PUBLIC_APPWRITE_PROJECT_ID");
  const databaseId = getEnv("APPWRITE_DATABASE_ID", "NEXT_PUBLIC_APPWRITE_DATABASE_ID");
  const guidesCollectionId = getEnv(
    "APPWRITE_GUIDES_COLLECTION_ID",
    "NEXT_PUBLIC_APPWRITE_GUIDES_COLLECTION_ID"
  );
  const apiKey = process.env.APPWRITE_API_KEY;

  if (!endpoint || !projectId || !databaseId || !guidesCollectionId || !apiKey) {
    return null;
  }

  return {
    endpoint: endpoint.replace(/\/$/, ""),
    projectId,
    databaseId,
    guidesCollectionId,
    apiKey,
  };
};


export async function fetchPublishedGuides(): Promise<Guide[]> {
  const config = getGuidesConfig();
  if (!config) return [];
  const client = new Client()
    .setEndpoint(config.endpoint)
    .setProject(config.projectId)
    .setKey(config.apiKey);
  const databases = new Databases(client);

  const response = await databases.listDocuments(
    config.databaseId,
    config.guidesCollectionId,
    [Query.equal("status", "published"), Query.orderDesc("published"), Query.limit(100)]
  );

  return response.documents as unknown as Guide[];
}

export async function fetchGuideBySlug(slug: string): Promise<Guide | null> {
  const config = getGuidesConfig();
  if (!config) return null;
  const client = new Client()
    .setEndpoint(config.endpoint)
    .setProject(config.projectId)
    .setKey(config.apiKey);
  const databases = new Databases(client);

  const response = await databases.listDocuments(
    config.databaseId,
    config.guidesCollectionId,
    [Query.equal("slug", slug), Query.equal("status", "published"), Query.limit(1)]
  );

  return ((response.documents as unknown as Guide[])?.[0] ?? null);
}
