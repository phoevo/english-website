"use client";
import React, { useState } from "react";
import { useConversations } from "@/hooks/useConversations";
import { Label } from "@/components/ui/label";
import ConversationCover from "./ConversationCover";
import { Geist, DM_Sans } from "next/font/google";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useUserStore } from "@/data/useUserStore";
import UserGuidePopover from "../../userGuide";
import { CardContent } from "@/components/ui/card";
import PlacementTest from "../placementTest";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogTrigger,
  AlertDialogCancel,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";


const geist = Geist({ subsets: ["latin"], variable: "--font-geist", display: "swap" });
const dmSans = DM_Sans({ subsets: ['latin'] });


function ConversationsPage() {
  const { conversations, loading: conversationsLoading, error } = useConversations();
  const [selectedLevel, setSelectedLevel] = useState<string | undefined>();
  const [test, setTest] = useState(false);

  const {
    loading: userLoading, user, isTeacher
  } = useUserStore();


  if (conversationsLoading || userLoading) {
    return <div className="p-10 text-center">Loading conversations...</div>;
  }

  if (error) {
    return <div className="p-10 text-center text-red-500">{error}</div>;
  }

  const filtered = conversations.filter(conv => {
  // Filter by level as before
  const levelMatches = !selectedLevel || selectedLevel === "All" || conv.level === selectedLevel;

  // Check if conversation is premium
  const isProConversation = conv.isPro;

  // Teachers have access to all conversations, students need subscription for pro content
  const userCanAccess = isTeacher || !isProConversation || user?.isSubscribed;

  return levelMatches && userCanAccess;
});



  function showTest(){
    setTest(prevValue =>(!prevValue));
  }

  return (
    <div className="m-10 space-y-4">
      <div>

        <UserGuidePopover
        id="conversation-page"
        title="The Conversations Page"
        description="Here you'll find a library of carefully crafted dialogues to help you with your reading
        comprehension, vocabulary, real-life communication and listening skills."
        side="top"
        align="start"
        >
          <h1 className={`text-3xl font-normal ${dmSans.className}`}>Conversations</h1>
        </UserGuidePopover>
        </div>



      <p className="text-muted-foreground">Conversation material from all levels</p>
      <div className="flex flex-row">

        <div className="flex flex-col space-y-1 mt-5">
            <Label htmlFor="Select" className="text-base font-semibold">Level</Label>

        <div className="flex flex-row items-center gap-1">
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

        <AlertDialog open={test} onOpenChange={setTest}>
              <AlertDialogTrigger asChild>
                <div onClick={showTest} className="text-sm font-medium underline cursor-pointer ml-1">Not sure?</div>
              </AlertDialogTrigger>
              <AlertDialogContent className={`max-w-xl bg-background ${geist.className}`}>
                <AlertDialogHeader>
                  <AlertDialogTitle className="text-2xl">Quick Placement Test</AlertDialogTitle>
                  <AlertDialogDescription>
                Not sure where to begin? Take this quick test to get a better idea of which conversations match your current level.
              </AlertDialogDescription>
              <div className="text-red-500 mt-2 text-sm">
                <p>This is not an official exam and is intended only as a general guide.</p>
                <p>Your score will not be stored.</p>
              </div>
                </AlertDialogHeader>
                <CardContent>
                  <PlacementTest />
                </CardContent>
                <AlertDialogFooter>
              <AlertDialogCancel className="cursor-pointer">Back</AlertDialogCancel>
              </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
        </div>

        </div>
      </div>

      <div className="grid mt-10 grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
        {filtered.map(conv => (
          <ConversationCover
            key={conv.$id}
            conversationTitle={conv.title}
            conversationDescription={conv.description}
            level={conv.level}
            conversationId={conv.$id}
            audioFileId={conv.audioFileId}
          />
        ))}
      </div>
    </div>
  );
}

export default ConversationsPage;
