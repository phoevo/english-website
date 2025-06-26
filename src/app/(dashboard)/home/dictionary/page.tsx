"use client";

import React, { useState } from "react";
import { databases} from "@/data/appwrite";
import { vocabIndex } from "@/data/vocab/vocabIndex";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useUserStore } from "@/data/useUserStore";
import { ScrollArea } from "@/components/ui/scroll-area"
import UserGuidePopover from "../../userGuide";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import WordBoard from "./wordBoard";



function getWordDetails(wordText: string) {
  const lowerCaseWord = wordText.toLowerCase();

  for (const sectionKey in vocabIndex) {
    const section = vocabIndex[sectionKey];
    if (section[lowerCaseWord]) {
      return section[lowerCaseWord];
    }
  }

  return null;
}



function DictionaryPage() {

  const [, setDeletingWord] = useState<string | null>(null);
  const { user, loading, dictionaryWords, setDictionaryWords } = useUserStore();


  const handleDelete = async (wordToDelete: string) => {
    if (!user?.$id) return;
    setDeletingWord(wordToDelete);

    // Find the full entry (e.g., "apple::a fruit")
    const fullEntry = dictionaryWords.find((entry) => entry.startsWith(wordToDelete + "::")) || wordToDelete;

    const updatedWords = dictionaryWords.filter((word) => word !== fullEntry);
    setDictionaryWords(updatedWords);
    setDeletingWord(null);

    try {
      await databases.updateDocument(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
        process.env.NEXT_PUBLIC_APPWRITE_USERS_COLLECTION_ID!,
        user.$id,
        { dictionaryWords: updatedWords }
      );
    } catch (error) {
      console.error("Failed to delete word:", error);
    }
  };



  if (loading) {
    return (
      <div className="m-10 h-192 space-y-6">
      <Skeleton className="w-[150px] h-[32px]" />
      <Skeleton className="w-[570px] h-[14px]" />
      <div className="border-t-1 border-x-1 flex flex-col justify-center rounded-md gap-4 p-3">
        <Skeleton className="w-[536px] h-[49px]" />
      <Skeleton className="w-[536px] h-[49px] opacity-25" />
      <Skeleton className="w-[536px] h-[49px] opacity-15" />
      <div className="w-[537px] h-107 opacity-0" />
    </div>
    </div>
    );
  }

  if (!user) {
    return (
      <div className="m-10">
        <p>
          Please <Link href="/login" className="underline">log in</Link> or{' '}
          <Link href="/register" className="underline">create an account</Link> to view your dictionary.
        </p>
      </div>
    )
  }

  return (
  <div className="w-full h-auto m-10">

    <div className="flex flex-col h-1/6">
      <div className="flex flex-col w-2/3 space-y-5 h-full">
        <UserGuidePopover
          id="dictionary-page"
          title="The Dictionary Page"
          description="Your personal dictionary. Save words you're unfamiliar with or want to revise.
          Pick and choose to create flashcards with existing words."
          side="top"
          align="start"
        >
          <h1 className="text-3xl font-light">Dictionary</h1>
        </UserGuidePopover>

        <p className="text-zinc-500">
          Words you&apos;ve saved will appear here, along with word classes and definitions.
        </p>
      </div>
    </div>


    <div className="flex flex-row gap-4 h-5/6">
      {/* Dictionary Word List */}
      <div className="flex flex-col w-1/2 h-full space-y-5 border-1 rounded-2xl shadow-sm">
        {dictionaryWords.length > 0 ? (
          <ScrollArea className="h-full">
            <div className="grid gap-4 p-3 pb-4 m-1 rounded-md">

              <AnimatePresence>
                {[...dictionaryWords].reverse().map((wordEntry, index) => {
                  const [wordText] = wordEntry.split("::");
                  const details = getWordDetails(wordText.trim().toLowerCase());
                  const displayText = wordText
                    .replace(/\/.*?\//g, "")
                    .replace(/^\w/, (c) => c.toUpperCase());

                  return (
                    <motion.div
                      key={wordText}
                      layout
                      initial={{ opacity: 0, y: 30, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.2, delay: index * 0.03, ease: "easeOut" }}
                    >
                      <div className="border-b h-min-15 rounded flex flex-row justify-between items-center text-md px-5">
                        <div className="flex flex-row flex-1 items-center gap-5">
                          <Accordion type="single" collapsible>
                            <AccordionItem value={`item-${index}`}>
                              <AccordionTrigger className="justify-between w-full cursor-pointer">
                                <div className="flex flex-col">
                                  <div className="flex flex-row items-center gap-2">
                                    <div className="font-bold text-base">{displayText}</div>
                                    <div className="italic text-zinc-500">{details?.type}</div>
                                  </div>
                                  <div className="text-zinc-500">{details?.definition}</div>
                                </div>
                              </AccordionTrigger>

                              {details?.context && (
                                <AccordionContent>
                                  <div className="py-2 text-base">{details.context}</div>
                                </AccordionContent>
                              )}
                              {!details && (
                                <div className="italic text-sm">No additional info found.</div>
                              )}
                            </AccordionItem>
                          </Accordion>
                        </div>

                        <Button
                          variant="destructive"
                          size="icon"
                          onClick={() => handleDelete(wordText)}
                          className="ml-4 cursor-pointer h-5 w-5 self-center"
                        >
                          <motion.div whileHover={{ rotate: 90 }} transition={{ duration: 0.1 }}>
                            <X className="h-4 w-4" />
                          </motion.div>
                        </Button>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
              <div className="flex justify-center text-zinc-500">end</div>
            </div>
          </ScrollArea>
        ) : (
          <p className="m-5">No saved words yet</p>
        )}
      </div>

      {/* Word Pad / Flashcard Area */}
      <div className="w-2/3 h-full">
        <WordBoard />
      </div>
    </div>
  </div>
);

}

export default DictionaryPage