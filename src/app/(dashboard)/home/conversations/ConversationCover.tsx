"use client";
import React from "react";
import { motion } from "motion/react";
import { account } from "@/data/appwrite";
import { updateRecentConversations } from "@/data/updateRecentConversations";
import Link from "next/link";

interface ConversationCoverProps {
  conversationTitle: string;
  conversationId: string;
  level: string;
}

function ConversationCover({ conversationTitle, conversationId, level}: ConversationCoverProps) {

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
      className="bg-muted flex flex-col h-70 w-70 p-2 rounded-lg cursor-pointer overflow-hidden"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.1 }}
      onClick={handleClick}
    >
      <div className="flex justify-center items-center bg-blue-900 border-1 border-foreground rounded-lg m-3 h-50">
        Sample Image
      </div>
      <div className="flex flex-col justify-center items-center ">
        <div className="font-semibold">{conversationTitle}</div>
        <div className="color-zinc-500">{level}</div>
      </div>
    </motion.div>

  </Link>
  );
}

export default ConversationCover;
