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
import GuideTour, { type GuideStep } from "../../GuideTour";
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
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sparkle } from "lucide-react";


const geist = Geist({ subsets: ["latin"], variable: "--font-geist", display: "swap" });
const dmSans = DM_Sans({ subsets: ['latin'] });

const convoGuideSteps: GuideStep[] = [
  { target: "convo-title", title: "Conversations", description: "Browse all available conversations organized by level and category." },
  { target: "convo-filters", title: "Filters", description: "Use these filters to narrow conversations by difficulty level and topic." },
  { target: "convo-grid", title: "Conversation Cards", description: "Click a conversation to start reading. The pink sparkle indicates Plus content, the green check indicates completion. Every word is interactive, so you can hover for definitions and save them to your dictionary."}
];


function ConversationsPage() {
  const { conversations, loading: conversationsLoading, error } = useConversations();
  const [selectedLevel, setSelectedLevel] = useState<string | undefined>();
  const [category, setCategory] = useState<string | undefined>();
  const [test, setTest] = useState(false);

  const {loading: userLoading, user, isTeacher} = useUserStore();


  if (conversationsLoading || userLoading) {
    return <div className="p-10 text-center">Loading conversations...</div>;
  }

  if (error) {
    return <div className="p-10 text-center text-red-500">{error}</div>;
  }

  type CoverConvo = { $id: string; title: string; description?: string; level: string; audioFileId: string; isPro: boolean; category: string; };
  const list = Array.isArray(conversations) ? (conversations as unknown as CoverConvo[]) : [];
  const filtered = list.filter((conv) => {
    const levelMatches = !selectedLevel || selectedLevel === "All" || conv.level === selectedLevel;
    const categoryMatches = !category || category === "All" || conv.category === category;
    const isProConversation = !!conv.isPro;
    const userCanAccess = isTeacher || !isProConversation || !!user?.isSubscribed;
    return levelMatches && categoryMatches && userCanAccess;
  });



  function showTest(){
    setTest(prevValue =>(!prevValue));
  }

  return (
    <div className="flex flex-col m-5 lg:m-10 h-svh space-y-3 lg:space-y-5">

      <GuideTour id="conversations-page" steps={convoGuideSteps} />
      <div data-guide="convo-title">
        <h1 className={`text-2xl lg:text-3xl font-normal ${geist.className}`}>Conversations</h1>
      </div>



      <p className="text-sm lg:text-base text-muted-foreground">Conversation material from all levels</p>
      <div data-guide="convo-filters" className="mt-2 flex flex-row items-center justify-between lg:justify-start gap-5 lg:gap-20">

        <div className="flex flex-col gap-1">

          <Label htmlFor="Select" className="text-sm lg:text-base font-semibold">Level</Label>

        <div className="flex w-full flex-row items-start lg:items-center gap-1">
        <Select value={selectedLevel} onValueChange={setSelectedLevel}>
            <SelectTrigger className=" w-[110px] lg:w-[165px]">
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

      {!isTeacher && <AlertDialog open={test} onOpenChange={setTest}>
              <AlertDialogTrigger asChild>
                <div onClick={showTest} className="text-xs md:text-sm font-light md:font-medium underline cursor-pointer ml-1">Not sure?</div>
              </AlertDialogTrigger>
              <AlertDialogContent className={`lg:max-w-xl bg-background ${geist.className}`}>
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
            </AlertDialog>}
        </div>

        </div>

          <div className="flex flex-col gap-1">

           <Label htmlFor="Select" className="text-sm lg:text-base font-semibold">Categories</Label>

        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="w-[110px] lg:w-[180px]">
            <SelectValue placeholder="All" />
          </SelectTrigger>
          <SelectContent className={geist.className}>
            <SelectItem value="All">All</SelectItem>
            <SelectItem value="Everyday">Everyday/Casual</SelectItem>
            <SelectItem value="Directions">Directions/Travel</SelectItem>
            <SelectItem value="Business">Business/Work</SelectItem>
            <SelectItem value="School">School/Study</SelectItem>
            <SelectItem value="Shopping">Shopping/Services</SelectItem>
            <SelectItem value="Health">Health/Emergencies</SelectItem>
            <SelectItem value="Lifestyle">Lifestyle/Daily Life</SelectItem>
            <SelectItem value="Society">Society/Culture</SelectItem>
            <SelectItem value="Emotional">Emotional/Personal Topics</SelectItem>
            <SelectItem value="Advanced">Advanced/Abstract Topics</SelectItem>

          </SelectContent>
        </Select>

        </div>


      </div>

    <ScrollArea className="h-2/3">
      <div data-guide="convo-grid" className="grid p-1 grid-cols-1 gap-4 m-0 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filtered.map(conv => (
          <ConversationCover
            key={conv.$id}
            conversationTitle={conv.title}
            conversationDescription={conv.description || ""}
            level={conv.level}
            conversationId={conv.$id}
            audioFileId={conv.audioFileId}
            category={conv.category}
            isPro={conv.isPro}
          />
        ))}
      </div>
    </ScrollArea>
    </div>
  );
}

export default ConversationsPage;
