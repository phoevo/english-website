"use client";
import React, { useEffect, useState } from "react";
import { account, databases } from "@/data/appwrite";
import { subscribeUser } from "@/data/getData";
import { useConversations } from "@/hooks/useConversations";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import ConversationCover from "./ConversationCover";
import { Geist } from "next/font/google";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist", display: "swap" });

const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!;
const USERS_COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_USERS_COLLECTION_ID!;

function ConversationsPage() {
  const [userId, setUserId] = useState<string | null>(null);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState<string | undefined>();

  const { conversations, loading, error } = useConversations();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await account.get();
        setUserId(user.$id);

        const doc = await databases.getDocument(DATABASE_ID, USERS_COLLECTION_ID, user.$id);
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

  if (loading) {
    return <div className="p-10 text-center">Loading conversations...</div>;
  }

  if (error) {
    return <div className="p-10 text-center text-red-500">{error}</div>;
  }

  const filtered = conversations.filter(conv =>
    !selectedLevel || selectedLevel === "All" || conv.level === selectedLevel
  );

  return (
    <div className="flex flex-col overflow-auto">
      <div className="m-10 flex flex-row gap-10">
        <Button onClick={handleSubscribe} disabled={isSubscribed}>
          {isSubscribed ? "Subscribed" : "Subscribe"}
        </Button>

        <Select value={selectedLevel} onValueChange={setSelectedLevel}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="All" />
          </SelectTrigger>
          <SelectContent className={geist.className}>
            <SelectItem value="All">All</SelectItem>
            <SelectItem value="A1">A1 - Beginner</SelectItem>
            <SelectItem value="A2">A2 - Basic</SelectItem>
            <SelectItem value="B1">B1 - Intermediate</SelectItem>
            <SelectItem value="B2">B2 - Independent</SelectItem>
            <SelectItem value="C1">C1 - Advanced</SelectItem>
            <SelectItem value="C2">C2 - Mastery</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-2 p-7 gap-5 md:grid-cols-3 lg:grid-cols-4">
        {filtered.map(conv => (
          <ConversationCover
            key={conv.$id}
            conversationTitle={conv.title}
            level={conv.level}
            conversationId={conv.$id}
          />
        ))}
      </div>
    </div>
  );
}

export default ConversationsPage;
