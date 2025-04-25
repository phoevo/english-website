"use client";
import React, { useEffect, useState } from "react";
import { account, databases } from "@/data/appwrite";
import { subscribeUser } from "@/data/syncUser";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import ConversationCover from "./ConversationCover";

const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!;
const USERS_COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_USERS_COLLECTION_ID!;

function ConversationsPage() {
  const [userId, setUserId] = useState<string | null>(null);
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await account.get();
        setUserId(user.$id);

        const doc = await databases.getDocument(
          DATABASE_ID, // DB ID
          USERS_COLLECTION_ID, // Collection ID
          user.$id               // User doc ID
        );

        setIsSubscribed(doc?.isSubscribed ?? false);
      } catch (error) {
        console.error("Failed to fetch subscription status:", error);
      }
    };

    fetchUser();
  }, []);

  const handleSubscribe = async () => {
    if (!userId) return;

    try {
      await subscribeUser(userId);
      setIsSubscribed(true);
      toast.success("You are now subscribed!");
    } catch (err) {
      console.error("Subscription failed", err);
      toast.error("Failed to subscribe. Try again later.");
    }
  };

  return (
    <div className="flex flex-col">
      <div className="m-10">
        <Button onClick={handleSubscribe} disabled={isSubscribed}>
          {isSubscribed ? "Subscribed" : "Subscribe"}
        </Button>
      </div>

      <div className="grid grid-cols-2 p-7 gap-5 max-h-80 md:grid-cols-3 lg:grid-cols-4">
        <ConversationCover conversationTitle="Conversation 1" conversationId="67f9251e002631f20f08" />
        <ConversationCover conversationTitle="Conversation 2" conversationId="67f94611001db351fdc0" />
        <ConversationCover conversationTitle="Conversation 3" conversationId="67f9244b00193b15fd06" />
        <ConversationCover conversationTitle="Conversation 4" conversationId="67f9244b00193b15fd07" />
      </div>
    </div>
  );
}

export default ConversationsPage;
