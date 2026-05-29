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
import { Send, LoaderCircle, Dot } from "lucide-react";
import Assign from "./Assign";
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
    console.warn("User not loaded yet");
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
        toast("This is a Pro conversation. It must be assigned by your tutor or you need a subscription.");
        return;
      }
    }

    // 3. Allow access
    await updateRecentConversations({
      userId: user.$id,
      conversationId,
    });

    router.push(`conversations/${conversationId}`);

  } catch (err) {
    console.error("Error fetching or updating conversation:", err);
  } finally {
    setIsLoading(false);
  }
};

  return (


    <motion.div
      className=""
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.1 }}
       onClick={() => {handleClick();}}
    >
    <Card className="w-full lg:w-full lg:h-60 bg-background cursor-pointer">
      <CardHeader>
        <CardTitle className="flex flex-row justify-between items-center border-b">
          <div className="flex flex-row items-center">
            {conversationTitle}
            {isPro? (<Dot className="text-pink-500"/>) : (<Dot className="text-foreground"/>)}
          </div>

        <div className="flex flex-col gap-1">
          {isTeacher && <Assign
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

        {isComplete && <Badge variant="default" className="bg-green-500 max-h-6">Complete</Badge>}
        </div>
        </CardTitle>
        <div className="flex flex-row items-center justify-start gap-2 ">
          <p className="text-sm">{level}</p>
          <p className="text-sm text-muted-foreground">{category}</p>
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
