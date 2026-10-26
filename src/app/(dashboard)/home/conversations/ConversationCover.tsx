"use client";
import React, { useState } from "react";
import { motion } from "motion/react";
import { updateRecentConversations } from "@/data/updateRecentConversations";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useUserStore } from "@/data/useUserStore";
import { Badge } from "@/components/ui/badge";
import { Send, LoaderCircle, Check, Sparkles } from "lucide-react";
import Assign from "./Assign";
import { legacyWorkflowsEnabled } from "@/lib/product";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { getConversationFromDB, isConversationAssignedToStudent } from "@/data/appwrite";



interface ConversationCoverProps {
  conversationTitle: string;
  conversationDescription: string;
  conversationId: string;
  level: string;
  audioFileId: string;
  category: string;
  isPro: boolean;
}

function ConversationCover({ conversationTitle, conversationDescription, conversationId, level, category, isPro}: ConversationCoverProps) {

  const completeConversations = useUserStore((state) => state.completeConversations);
  const isComplete = completeConversations.includes(conversationId);
  const user = useUserStore(state => state.user);
  const {isTeacher} = useUserStore();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

   const handleClick = async () => {
  if (!user) {
    toast.error("No user detected. Please sign in to view this conversation.");
    return;
  }

  setIsLoading(true);
  try {
    // 1. Fetch the conversation details
    const conversation = await getConversationFromDB(conversationId);

    if (!conversation) {
      toast.error("Conversation not found.");
      return;
    }

    const isPro = conversation.isPro;
    const isSubscribed = user.isSubscribed;

    // Teachers have access to all conversations.
    // Students need subscription for pro content unless it was assigned to them by a subscribed tutor.
    if (isPro && !isSubscribed && !isTeacher) {
      const assigned = await isConversationAssignedToStudent(user.$id, conversationId);
      if (!assigned) {
        toast("This conversation requires a Plus subscription.");
        return;
      }
    }

    // 3. Allow access
    await updateRecentConversations({
      userId: user.$id,
      conversationId,
    });

    router.push(`/home/conversations/${conversationId}`);

  } catch (err) {
    console.error("Error fetching or updating conversation:", err);
  } finally {
    setIsLoading(false);
  }
};

  return (


    <motion.div
      role="button"
      tabIndex={isLoading ? -1 : 0}
      aria-label={`Open ${conversationTitle}`}
      aria-busy={isLoading}
      onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); if (!isLoading) void handleClick(); } }}
      className="h-full rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.1 }}
       onClick={() => { if (!isLoading) void handleClick(); }}
    >
    <Card className="w-full h-full min-h-52 bg-background cursor-pointer shadow-none rounded-xl hover:border-foreground/30 transition-colors">
      <CardHeader>
        <CardTitle className="flex flex-row justify-between items-center border-b py-1">
          <div className="flex flex-row items-center gap-1">
            {conversationTitle}
          </div>

        <div className="flex flex-col gap-1">
          {legacyWorkflowsEnabled && isTeacher && <Assign
                conversationId={conversationId}
                trigger={
                  <Badge variant="outline"
                  className="cursor-pointer hover:border-foreground"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                    <Send/>Assign
                  </Badge>
                }
              />}


        </div>
        </CardTitle>
        <div className="flex flex-row items-center justify-start gap-2 ">
          <p className="text-sm">{level}</p>
          <p className="text-sm text-muted-foreground">{category}</p>
          {isComplete &&
          <Check size={18} strokeWidth="3px" className="text-green-500"/>}
          {isPro? (<Sparkles size={15} className="text-pink-500"/>) : ""}
          {isLoading && <LoaderCircle className="animate-spin" size={15}/>}
        </div>


    </CardHeader>
    <CardContent className="">
      <p className="text-sm rounded-lg">{conversationDescription}</p>
    </CardContent>
  </Card>
    </motion.div>


  );
}

export default ConversationCover;
