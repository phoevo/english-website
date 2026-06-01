"use client";

import React, { useState } from "react";
import { databases} from "@/data/appwrite";
import { vocabIndex } from "@/data/vocab/vocabIndex";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { BookMarked, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useUserStore } from "@/data/useUserStore";
import { ScrollArea } from "@/components/ui/scroll-area"
import GuideTour, { type GuideStep } from "../../GuideTour";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import WordBoard from "./wordBoard";
import { DM_Sans, Geist } from "next/font/google";

const geist = Geist({ subsets: ['latin'] });

const dictGuideSteps: GuideStep[] = [
  { target: "dict-title", title: "Your Dictionary", description: "Save unfamiliar words from conversations to review later." },
  { target: "dict-words", title: "Saved Words", description: "All your saved words appear here. Expand for details or remove with the red delete button." },
  { target: "dict-flashcards", title: "Flashcard Builder", description: "Build custom flashcard decks from your saved words for focused practice." },
];




function getWordDetails(wordText: string) {
  const key = wordText.toLowerCase().replace(/\s+/g, "_");

  for (const sectionKey in vocabIndex) {
    const section = vocabIndex[sectionKey];
    if (section[key]) {
      return section[key];
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
  <div className="w-full h-auto m-5 lg:m-10">

    <div className="flex flex-col h-1/6">
      <div className="flex flex-col lg:w-2/3 space-y-3 lg:space-y-6 h-full">
        <GuideTour id="dictionary-page" steps={dictGuideSteps} />
        <h1 data-guide="dict-title" className={`text-2xl lg:text-3xl font-normal ${geist.className}`}>Dictionary</h1>

        <div className="text-sm lg:text-base text-muted-foreground">
          Words you&apos;ve saved will appear here, along with word classes and definitions.
        </div>
      </div>
    </div>


    <div className="flex flex-col lg:flex-row gap-4 h-full lg:h-5/6">
      {/* Dictionary Word List */}
      <div data-guide="dict-words" className="flex flex-col lg:w-1/2 h-full space-y-5 border-1 rounded-2xl shadow-sm">
        {dictionaryWords.length > 0 ? (
          <ScrollArea className="h-full mx-1">
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
                      <div className="border-b h-min-15 rounded flex flex-row justify-between items-center text-md lg:px-5">
                        <div className="flex flex-row flex-1 items-center">
                          <Accordion type="single" collapsible>
                            <AccordionItem value={`item-${index}`}>
                              <AccordionTrigger className="justify-between w-full cursor-pointer">
                                <div className="flex flex-col text-xs lg:text-sm">
                                  <div className="flex flex-row items-center gap-2">
                                    <div className="font-semibold text-base">{displayText}</div>
                                    <div className="italic text-muted-foreground">{details?.type}</div>
                                  </div>
                                  <div className="text-muted-foreground">{details?.definition}</div>
                                </div>
                              </AccordionTrigger>

                              {details?.context && (
                                <AccordionContent>
                                  <div className="text-xs lg:text-sm">{details.context}</div>
                                </AccordionContent>
                              )}
                              {!details && (
                                <div className="italic text-sm text-muted-foreground">No additional info found.</div>
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
              <div className="flex justify-center text-muted-foreground">end</div>
            </div>
          </ScrollArea>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center">
              <BookMarked
                className="text-muted-foreground mb-3"
                size={32}
              />

              <p className="font-medium">
                No words saved yet
              </p>

              <p className="text-sm text-muted-foreground">
                Hover over words in a conversation and click the add button to save them in your dictionary.
              </p>
            </div>
        )}
      </div>

      <div data-guide="dict-flashcards" className="lg:w-2/3 lg:h-full">
        <WordBoard />
      </div>
    </div>
  </div>
);

}

export default DictionaryPage