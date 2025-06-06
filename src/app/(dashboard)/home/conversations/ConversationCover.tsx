"use client";
import React from "react";
import { motion } from "motion/react";
import { updateRecentConversations } from "@/data/updateRecentConversations";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
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
  audioFileId: string;
}

function ConversationCover({ conversationTitle, conversationDescription, conversationId, level}: ConversationCoverProps) {

  const completeConversations = useUserStore((state) => state.completeConversations);
  const isComplete = completeConversations.includes(conversationId);
  const user = useUserStore(state => state.user);

    const handleClick = async () => {
      if (!user) {
        console.warn("User not loaded yet");
        return;
      }

      try {
        await updateRecentConversations({
          userId: user.$id,
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
      <CardTitle className="flex justify-between items-center">
        {conversationTitle}
        {isComplete && <Badge variant="outline" className="bg-green-500 max-h-6">Complete</Badge>}
        </CardTitle>
      <CardDescription className="border-b">{level}</CardDescription>
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
