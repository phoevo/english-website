import { Databases, Account, Client, Models } from "node-appwrite";
import Stripe from "stripe";
import { Query } from "node-appwrite";

interface Request {
  method: string;
  bodyJson: {
    plan?: string;
  };
}

interface Response {
  json: (body: object, status?: number) => void;
}

interface HandlePaymentsParams {
  req: Request;
  res: Response;
  client: Client;
  adminClient: Client;
}

const serverPlans = ["Student Monthly", "Student Yearly"] as const;

type Plan = (typeof serverPlans)[number];

const priceMap: Record<Plan, string> = {
  "Student Monthly": "price_1RjNY6PoApFikZNYFIHlqq3t",
  "Student Yearly": "price_1RmIPcPoApFikZNYDnmuR2hA",
};

export default async function handlePayments({
  req,
  res,
  client,
  adminClient,
}: HandlePaymentsParams): Promise<void> {
  console.log("Payment handler started, method:", req.method);
  console.log("Request body:", req.bodyJson);
  
  if (req.method !== "POST") {
    return res.json({ error: "Method not allowed" }, 405);
  }

  const databases = new Databases(adminClient);
  const account = new Account(client);

  try {
    console.log("Getting user account...");
    const user: Models.User<Models.Preferences> = await account.get();
    console.log("User retrieved:", user.$id);

    if (!user) {
      return res.json(
        {
          error: "Access denied, requires authentication",
        },
        401
      );
    }

    const plan = req.bodyJson.plan as Plan;
    console.log("Plan received:", plan);
    console.log("Valid plans:", serverPlans);

    if (!plan || !serverPlans.includes(plan)) {
      console.error("Invalid plan provided:", plan);
      return res.json({ error: "Invalid plan", received: plan, valid: serverPlans }, 400);
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
      apiVersion: "2022-11-15",
    });

    const stripeCustomerDoc = await databases.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
      process.env.NEXT_PUBLIC_APPWRITE_STRIPE_CUSTOMERS_ID!,
      [Query.equal("user_id", user.$id)]
    );

    let stripeCustomerId: string;

    if (stripeCustomerDoc.documents.length === 0) {
      const customer = await stripe.customers.create({
        email: user.email,
        name: user.name,
      });

      await databases.createDocument(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
        process.env.NEXT_PUBLIC_APPWRITE_STRIPE_CUSTOMERS_ID!,
        user.$id,
        {
          user_id: user.$id,
          stripe_customer_id: customer.id,
        }
      );
      stripeCustomerId = customer.id;
    } else {
      // Use first customer match (you may want stricter checks)
      stripeCustomerId = stripeCustomerDoc.documents[0].stripe_customer_id;
    }

    console.log("Creating Stripe checkout session for customer:", stripeCustomerId);
    console.log("Price ID for plan:", priceMap[plan]);
    
    const checkoutSession = await stripe.checkout.sessions.create({
      customer: stripeCustomerId,
      mode: "subscription",
      success_url: "http://687bd989002c9e597b76.fra.appwrite.run/check?checkout_id={CHECKOUT_SESSION_ID}",
      cancel_url: "https://localhost:3000",
      line_items: [
        {
          price: priceMap[plan],
          quantity: 1,
        },
      ],
      // Explicitly enable receipt emails
      invoice_creation: {
        enabled: true,
        invoice_data: {
          description: `${plan} subscription`,
          metadata: {
            user_id: user.$id,
          },
        },
      },
    });

    console.log("Checkout session created successfully:", checkoutSession.id);
    console.log("Checkout URL:", checkoutSession.url);
    
    return res.json({
      checkout_url: checkoutSession.url,
    });
  } catch (error) {
    console.error("Stripe Error:", error);
    return res.json({ error: "Unexpected error", details: (error as Error).message }, 500);
  }
}
