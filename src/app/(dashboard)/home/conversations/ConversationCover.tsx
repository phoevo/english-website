"use client";
import React from "react";
import { motion } from "motion/react";
import Link from "next/link";

interface ConversationCoverProps {
  conversationTitle: string;
  conversationPrice: number;
  conversationId: string;
}


function ConversationCover({conversationTitle, conversationPrice, conversationId }: ConversationCoverProps) {
  return (
    <Link href={`conversations/${conversationId}`}>

      <motion.div
        className="bg-muted flex flex-col h-80 w-80 rounded-lg cursor-pointer overflow-hidden"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.1 }}
      >
        <div className="flex justify-center items-center bg-blue-900 border-1 border-foreground rounded-lg m-5 h-50">
          Sample Image
        </div>
        <div className="flex flex-col justify-center items-center ">
          <div className="font-semibold">{conversationTitle}</div>
          <div className="italic text-zinc-500">${conversationPrice}</div>
        </div>
      </motion.div>

    </Link>
  );
}

export default ConversationCover;
