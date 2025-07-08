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
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import Assign from "./Assign";
import { useRouter } from "next/navigation";


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
  const {isTeacher} = useUserStore();

  const router = useRouter();

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


    <motion.div
      className=""
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.1 }}
       onClick={() => {
    handleClick();
    router.push(`conversations/${conversationId}`);
  }}
    >
        <Card className="w-80 h-70 bg-background cursor-pointer">
    <CardHeader>
      <CardTitle className="flex justify-between items-center">
        {conversationTitle}
        <div className="flex flex-col gap-1">

          {isTeacher && <Assign
                conversationId={conversationId}
                trigger={
                  <Badge variant="outline"
                  className="cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                    <Send/>Assign
                  </Badge>
                }
              />}

        {isComplete && <Badge variant="outline" className="bg-green-500 max-h-6">Complete</Badge>}
        </div>
        </CardTitle>
      <CardDescription className="border-b">{level}</CardDescription>
    </CardHeader>
    <CardContent>
      <p className="text-sm">{conversationDescription}</p>
    </CardContent>
  </Card>
    </motion.div>


  );
}

export default ConversationCover;
