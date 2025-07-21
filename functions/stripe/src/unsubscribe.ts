import { VercelRequest, VercelResponse } from '@vercel/node'; // or your platform's request/response types
import { Databases, Query, Models, Client } from 'node-appwrite';
import Stripe from 'stripe';

interface UnsubscribeBody {
  user_id?: string;
}

interface HandlerParams {
  req: VercelRequest & { bodyRaw?: string };
  res: VercelResponse;
  adminClient: Client;
}

async function handleUnsubscribe({ req, res, adminClient }: HandlerParams) {
  console.log('Raw request body:', req.bodyRaw);

  try {
    // Parse body safely for JSON or URL-encoded form data
    let body: UnsubscribeBody;
    try {
      body = JSON.parse(req.bodyRaw || '{}');
    } catch {
      const params = new URLSearchParams(req.bodyRaw || '');
      body = Object.fromEntries(params.entries()) as UnsubscribeBody;
    }

    const { user_id } = body;

    if (!user_id) {
      res.status(400).json({ error: 'Missing user_id' });
      return;
    }

    // Use the same key pattern as other working functions
    const stripeKey = process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY || process.env.STRIPE_SECRET_KEY;
    
    if (!stripeKey) {
      console.error("No Stripe secret key found in environment variables");
      res.status(500).json({ error: "Missing Stripe API key" });
      return;
    }
    
    const stripe = new Stripe(stripeKey, {
      apiVersion: '2023-08-16',
    });
    const databases = new Databases(adminClient);

    const dbId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;
    const stripeCustomersCollectionId = '687a74fb003d6808b5fd';
    const usersCollectionId = process.env.NEXT_PUBLIC_APPWRITE_USERS_COLLECTION_ID;

    if (!dbId || !usersCollectionId) {
      throw new Error('Missing required environment variables');
    }

    // Step 1: Get Stripe customer ID from stripe_customers collection
    const customerDocs = await databases.listDocuments(dbId, stripeCustomersCollectionId, [
      Query.equal('user_id', user_id),
    ]);

    if (customerDocs.total === 0) {
      res.status(404).json({ error: 'No Stripe customer found for this user.' });
      return;
    }

    const customer = customerDocs.documents[0] as { stripe_customer_id?: string };
    const stripe_customer_id = customer.stripe_customer_id;

    if (!stripe_customer_id) {
      res.status(400).json({ error: 'No stripe_customer_id found for user.' });
      return;
    }

    // Step 2: Get active subscriptions from Stripe and cancel them
    const subscriptions = await stripe.subscriptions.list({
      customer: stripe_customer_id,
      status: 'active'
    });

    if (subscriptions.data.length === 0) {
      console.log('No active subscriptions found for customer');
      // Still continue to update user profile
    } else {
      // Cancel all active subscriptions
      await Promise.all(
        subscriptions.data.map(async (subscription) => {
          console.log(`Canceling subscription: ${subscription.id}`);
          return await stripe.subscriptions.cancel(subscription.id);
        })
      );
      console.log('All active subscriptions canceled');
    }

    // Step 3: Update user's profile to set isSubscribed to false
    try {
      await databases.updateDocument(
        dbId,
        usersCollectionId!,
        user_id,
        { 
          isSubscribed: false
        }
      );
      console.log('User profile updated: isSubscribed=false');
    } catch (error) {
      console.error('Error updating user profile:', error);
      // Still return success since Stripe subscriptions were handled
    }

    res.status(200).json({ success: true });
  } catch (err: any) {
    console.error('Unsubscribe error:', err);
    res.status(500).json({ error: 'Unsubscribe failed', details: err.message });
  }
}

export default handleUnsubscribe;
