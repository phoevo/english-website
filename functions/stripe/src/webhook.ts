import { Databases, Client, Query } from "node-appwrite";
import Stripe from "stripe";
import provision from "./utils/provision";

interface Request {
  headers: Record<string, string>;
  bodyText: string;
}

interface Response {
  json: (body: object, status?: number) => void;
}

interface HandleWebhookParams {
  req: Request;
  res: Response;
  client: Client;
  adminClient: Client;
}

export default async function handleWebhook({
  req,
  res,
  adminClient,
}: HandleWebhookParams): Promise<void> {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY! as string, {
   // apiVersion: "2022-11-15",
  });

  const signature = req.headers["stripe-signature"];

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      req.bodyText,
      signature as string,
      process.env.STRIPE_WEBHOOK_SECRET! as string
    );
  } catch (err) {
    console.error("Invalid webhook signature:", err);
    return res.json({ error: "Invalid signature" }, 400);
  }

  const allowedEvents: string[] = [
    "checkout.session.completed",
    "customer.subscription.created",
    "customer.subscription.updated",
    "customer.subscription.deleted",
    "customer.subscription.paused",
    "customer.subscription.resumed",
    "customer.subscription.pending_update_applied",
    "customer.subscription.pending_update_expired",
    "customer.subscription.trial_will_end",
    "invoice.paid",
    "invoice.payment_failed",
    "invoice.payment_action_required",
    "invoice.upcoming",
    "invoice.marked_uncollectible",
    "invoice.payment_succeeded",
    "payment_intent.succeeded",
    "payment_intent.payment_failed",
    "payment_intent.canceled",
  ];

  if (!allowedEvents.includes(event.type)) {
    return res.json({ message: "ok" });
  }

  const customerId = (event.data.object as any).customer as string;

  const databases = new Databases(adminClient);

  const subscriptionDoc = await databases.listDocuments(
    process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
    process.env.NEXT_PUBLIC_APPWRITE_STRIPE_CUSTOMERS_ID!,
    [Query.equal("stripe_customer_id", customerId)]
  );

  if (subscriptionDoc.documents.length === 0) {
    return res.json({ error: "No matching subscription document found" }, 404);
  }

  const subscriptions = await stripe.subscriptions.list({
    customer: customerId,
    limit: 1,
    status: "active",
  });

  let plan: string = "free";

  if (subscriptions.data.length === 0) {
    await provision({
      plan,
      userId: subscriptionDoc.documents[0].user_id,
      adminClient,
    });
    return res.json({ message: "ok" });
  }

  const priceId = subscriptions.data[0].items.data[0].price.id;

  switch (priceId) {
    case "price_1RjNY6PoApFikZNYFIHlqq3t":
      plan = "Student Monthly";
      break;
    case "price_1RmIPcPoApFikZNYDnmuR2hA":
      plan = "Student Yearly";
      break;
    default:
      plan = "free";
  }

  await provision({
    plan,
    userId: subscriptionDoc.documents[0].user_id,
    adminClient,
  });

  return res.json({ message: "ok" });
}
