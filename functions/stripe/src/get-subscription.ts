import { Account, Client, Databases, Models, Query } from "node-appwrite";

interface Request {
  method: string;
}

interface Response {
  json: (body: object, status?: number) => void;
}

interface HandleGetSubscriptionParams {
  req: Request;
  res: Response;
  client: Client;
  adminClient: Client;
}

export default async function handleGetSubscription({
  req,
  res,
  client,
  adminClient,
}: HandleGetSubscriptionParams): Promise<void> {
  const databases = new Databases(adminClient);
  const account = new Account(client);

  try {
    const user: Models.User<Models.Preferences> = await account.get();

    if (!user) {
      return res.json(
        {
          error: "Access Denied. This action requires an account. Please sign in to continue.",
        },
        401
      );
    }

    if (req.method !== "GET") {
      return res.json({ error: "Method not allowed" }, 405);
    }

    const subscription = await databases.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
      process.env.NEXT_PUBLIC_APPWRITE_SUBSCRIPTIONS_ID!,
      [Query.equal("user_id", user.$id)]
    );

    console.log("Fetched subscriptions:", JSON.stringify(subscription.documents, null, 2));


    if (subscription.documents.length === 0) {
      return res.json({ plan: "free" });
    }

    return res.json({
      plan: subscription.documents[0].plan,

    });
  } catch (err) {
    console.error("Subscription check failed:", err);
    return res.json(
      { error: "Unexpected error", details: (err as Error).message },
      500
    );
  }
}
