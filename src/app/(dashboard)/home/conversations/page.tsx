"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useConversations } from "@/hooks/useConversations";
import { Label } from "@/components/ui/label";
import ConversationCover from "./ConversationCover";
import { Geist } from "next/font/google";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useUserStore } from "@/data/useUserStore";
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


const geist = Geist({ subsets: ["latin"], variable: "--font-geist", display: "swap" });

function ConversationsPage() {
  const { conversations, loading: conversationsLoading, error } = useConversations();
  const [selectedLevel, setSelectedLevel] = useState<string | undefined>();
  const [category, setCategory] = useState<string | undefined>();
  const [search, setSearch] = useState("");
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
    const searchMatches = `${conv.title} ${conv.description || ""}`.toLowerCase().includes(search.toLowerCase().trim());
    return levelMatches && categoryMatches && userCanAccess && searchMatches;
  });



  function showTest(){
    setTest(prevValue =>(!prevValue));
  }

  return (
    <div className="flex flex-col w-full min-h-0 p-5 lg:p-10 gap-5">

      <div data-guide="convo-title">
        <h1 className={`text-2xl lg:text-3xl font-normal ${geist.className}`}>Conversations</h1>
      </div>



      <p className="text-sm lg:text-base text-muted-foreground">Find ready-to-teach conversations by CEFR level and topic.</p>
      <div className="max-w-xl"><Label htmlFor="conversation-search" className="sr-only">Search conversations</Label><Input id="conversation-search" value={search} onChange={event => setSearch(event.target.value)} placeholder="Search titles and topics…" /></div>
      <div data-guide="convo-filters" className="flex flex-wrap items-start gap-5">

        <div className="flex flex-col gap-1">

          <Label htmlFor="conversation-level" className="text-sm lg:text-base font-semibold">Level</Label>

        <div className="flex w-full flex-row items-start lg:items-center gap-1">
        <Select value={selectedLevel} onValueChange={setSelectedLevel}>
            <SelectTrigger id="conversation-level" className="w-[165px]">
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

           <Label htmlFor="conversation-category" className="text-sm lg:text-base font-semibold">Categories</Label>

        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger id="conversation-category" className="w-[180px]">
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

    <p role="status" className="text-sm text-muted-foreground">{filtered.length} conversation{filtered.length === 1 ? "" : "s"}</p>
    <ScrollArea className="flex-1 min-h-0">
      {!filtered.length && <div className="py-12 text-center"><p className="mb-4 text-muted-foreground">No conversations match these filters.</p><Button variant="outline" onClick={() => { setSearch(""); setCategory("All"); setSelectedLevel("All"); }}>Clear filters</Button></div>}
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
