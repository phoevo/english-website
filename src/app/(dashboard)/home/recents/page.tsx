"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useUserStore } from "@/data/useUserStore";
import { databaseId, databases, usersCollectionId } from "@/data/appwrite";
import UserGuidePopover from "../../userGuide";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardDescription,
  CardTitle,
} from "@/components/ui/card"

function RecentsPage() {
  const { user, loading, recentConversations, setRecentConversations, completeConversations } = useUserStore();
  const [, setDeletingId] = useState<string | null>(null);


  const handleDelete = async (conversationId: string) => {
    if (!user?.$id) return;

    setDeletingId(conversationId);

    const updatedList = recentConversations.filter((c) => c.$id !== conversationId);
    setRecentConversations(updatedList);
    setDeletingId(null);

    try {
      await databases.updateDocument(
        databaseId,
        usersCollectionId,
        user.$id,
        {
          recentConversations: updatedList.map((c) => c.$id),
        }
      );
    } catch (error) {
      console.error("Failed to update recent conversations:", error);
    }
  };

  if (loading) {
    return (
      <div className="m-10 space-y-6">
        <Skeleton className="w-[300px] h-[32px]" />
        <Skeleton className="w-[400px] h-[15px]" />
        <Skeleton className="w-[392px] h-[82px] opacity-50 mt-5" />
        <Skeleton className="w-[392px] h-[82px] opacity-25" />
        <Skeleton className="w-[392px] h-[82px] opacity-15" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="m-10">
        <p>
          Please <Link href="/login" className="underline">log in</Link> or{" "}
          <Link href="/register" className="underline">create an account</Link> to view your recent conversations.
        </p>
      </div>
    );
  }

  return (
    <div className="m-10 space-y-5">
      <div>
        <UserGuidePopover
          id="recents-page"
          title="The Recents Page"
          description="Conversations you interact with will be placed here for ease of access later."
          side="top"
          align="start"
          >
          <h1 className="text-3xl font-light">Recent Conversations</h1>
          </UserGuidePopover>
        </div>

      <p className="text-zinc-500">Conversations you&apos;ve interacted with will appear here.</p>

      {recentConversations.length > 0 ? (
        <div className="space-y-3">
          <AnimatePresence>
            {recentConversations.map((conversation) => (
              <motion.div
              key={conversation.$id}
              layout
              whileHover={{ scale: 1.01 }}
              exit={{ opacity: 0, scale: 1.0 }}
              transition={{ duration: 0.1, ease: "easeOut" }}
            >
              <Card className="bg-background flex flex-row justify-between items-center px-4">
                <Link
                  href={`conversations/${conversation.$id}`}
                  className="flex flex-col flex-1 border-r"
                >
                  <div className="flex flex-row items-center mb-2">
                    <CardTitle>{conversation.title}</CardTitle>
                    {completeConversations.includes(conversation.$id) && (
                      <div className="ml-4">
                        <Badge variant="secondary" className="bg-green-500">Complete</Badge>
                      </div>
                    )}
                  </div>
                  <CardDescription>{conversation.level}</CardDescription>
                </Link>


                <Button
                  variant="destructive"
                  size="icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    handleDelete(conversation.$id);
                  }}
                  className="cursor-pointer h-5 w-5 self-center"
                >
                  <motion.div whileHover={{ rotate: 90 }} transition={{ duration: 0.1 }}>
                    <X className="h-4 w-4" />
                  </motion.div>
                </Button>
              </Card>
            </motion.div>

            ))}
          </AnimatePresence>
        </div>
      ) : (
        <p>No recent conversations found.</p>
      )}

    </div>

  );
}

export default RecentsPage;
