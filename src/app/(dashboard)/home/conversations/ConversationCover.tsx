"use client";
import React from "react";
import { motion } from "motion/react";
import { account } from "@/data/appwrite";
import { updateRecentConversations } from "@/data/updateRecentConversations";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useUserStore } from "@/data/useUserStore";
import { Badge } from "@/components/ui/badge";


interface ConversationCoverProps {
  conversationTitle: string;
  conversationDescription: string;
  conversationId: string;
  level: string;
}

function ConversationCover({ conversationTitle, conversationDescription, conversationId, level}: ConversationCoverProps) {

  const completeConversations = useUserStore((state) => state.completeConversations);
  const isComplete = completeConversations.includes(conversationId);

  const handleClick = async () => {
    try {
      const user = await account.get();
      const userId = user.$id;

      await updateRecentConversations({
        userId,
        conversationId,
      });


    } catch (err) {
      console.error("Error updating recents:", err);
    }
  };

  return (
    <Link href={`conversations/${conversationId}`}>

    <motion.div
      className=""
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.1 }}
      onClick={handleClick}
    >
        <Card className="w-70 h-70 bg-background">
    <CardHeader>
      <CardTitle className="flex justify-between">
        {conversationTitle}
        {isComplete && <Badge variant="secondary" className="bg-green-500 max-h-6">Complete</Badge>}
        </CardTitle>
      <CardDescription>{level}</CardDescription>
    </CardHeader>
    <CardContent>
      <p className="text-sm">{conversationDescription}</p>
    </CardContent>
  </Card>
    </motion.div>

  </Link>
  );
}

export default ConversationCover;
