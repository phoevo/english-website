"use client";

import React, { useState } from "react";
import { updateMyProfile } from "@/data/accountActions";
import { vocabIndex } from "@/data/vocab/vocabIndex";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { BookMarked, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useUserStore } from "@/data/useUserStore";
import GuideTour, { type GuideStep } from "../../GuideTour";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import WordBoard from "./wordBoard";
import DashboardPage from "@/components/dashboard/DashboardPage";
import { dashboardStyles } from "@/components/dashboard/styles";

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

    try {
      const profile = await updateMyProfile({ kind: "dictionary.remove", entry: fullEntry });
      setDictionaryWords(profile.dictionaryWords);
    } catch (error) {
      console.error("Failed to delete word:", error);
    } finally { setDeletingWord(null); }
  };



  if (loading) {
    return <DashboardPage ready={false}><div role="status" aria-busy="true" aria-label="Loading dictionary" className="space-y-6">
      <span className="sr-only">Loading...</span>
      <div aria-hidden="true" className="space-y-3"><Skeleton className="h-8 w-56 max-w-full" /><Skeleton className="h-4 w-2/3 max-w-xl" /></div>
      <div aria-hidden="true" className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <section className="min-h-72 space-y-4 rounded-2xl border border-border p-4 opacity-100">
          {[0, 1, 2, 3, 4].map(index => <div key={index} className={`flex items-center justify-between gap-4 border-b border-border py-4 ${index > 2 ? "opacity-50" : ""}`}><div className="flex-1 space-y-2"><Skeleton className="h-4 w-1/3" /><Skeleton className="h-3 w-3/4" /></div><Skeleton className="size-6 shrink-0 rounded-md" /></div>)}
        </section>
        <section className="min-h-72 rounded-xl border border-border p-5 opacity-70">
          <Skeleton className="h-6 w-40" /><Skeleton className="mt-2 h-4 w-56 max-w-full" />
          <div className="mt-4 flex gap-2"><Skeleton className="h-6 w-16 rounded-full" /><Skeleton className="h-6 w-24 rounded-full" /><Skeleton className="h-6 w-20 rounded-full" /></div>
          <div className="mt-6 flex min-h-48 flex-col items-center justify-center gap-3 rounded-lg border border-border p-6 opacity-60"><Skeleton className="h-6 w-1/3" /><Skeleton className="h-4 w-2/3" /></div>
        </section>
      </div>
    </div></DashboardPage>;
  }

  if (!user) {
    return <DashboardPage><header data-dashboard-intro><h1 className={dashboardStyles.heading}>Dictionary</h1><p className={dashboardStyles.description}>Words you have saved from conversations.</p></header><p data-dashboard-entry className="mt-8 text-sm leading-7 text-muted-foreground">Please <Link href="/login" className="text-foreground underline underline-offset-4">log in</Link> or <Link href="/register" className="text-foreground underline underline-offset-4">create an account</Link> to view your dictionary.</p></DashboardPage>;
  }

  return (
  <DashboardPage>
    <GuideTour id="dictionary-page" steps={dictGuideSteps} />
    <header data-guide="dict-title" data-dashboard-intro className="shrink-0">
      <h1 className={dashboardStyles.heading}>Dictionary</h1>
      <p className={dashboardStyles.description}>Words you have saved from conversations, with their word types and definitions.</p>
    </header>

    <div className="mt-6 flex min-h-0 flex-1 flex-col gap-4 lg:flex-row">
      {/* Dictionary Word List */}
      <div data-guide="dict-words" data-dashboard-entry className={dashboardStyles.card + " flex min-h-64 min-w-0 flex-col overflow-hidden lg:h-full lg:w-1/2"}>
        {dictionaryWords.length > 0 ? (
          <div role="region" aria-label="Saved words" tabIndex={0} className="h-full mx-1 overflow-y-auto overscroll-contain [scrollbar-gutter:stable] [scrollbar-width:thin] [scrollbar-color:var(--border)_transparent] focus-visible:rounded-md focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-foreground">
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
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                    >
                      <div className="flex min-h-16 flex-row items-center justify-between rounded border-b border-border px-2 text-sm sm:px-4 lg:px-5">
                        <div className="flex flex-row flex-1 items-center">
                          <Accordion type="single" collapsible>
                            <AccordionItem value={`item-${index}`}>
                              <AccordionTrigger className="justify-between w-full cursor-pointer">
                                <div className="flex min-w-0 flex-col text-sm">
                                  <div className="flex flex-row flex-wrap items-center gap-x-2 gap-y-1">
                                    <span className="font-medium tracking-[-.02em]">{displayText}</span>
                                    <span className="text-xs text-muted-foreground">{details?.type}</span>
                                  </div>
                                  <span className="mt-1 text-xs leading-5 text-muted-foreground">{details?.definition}</span>
                                </div>
                              </AccordionTrigger>

                              {details?.context && (
                                <AccordionContent>
                                  <div className="text-sm leading-6 text-muted-foreground">{details.context}</div>
                                </AccordionContent>
                              )}
                              {!details && (
                                <div className="text-sm italic text-muted-foreground">No additional information found.</div>
                              )}
                            </AccordionItem>
                          </Accordion>
                        </div>

                       <Button
                  variant="destructive"
                  size="icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    handleDelete(wordText);
                  }}
                  className="h-5 w-5 shrink-0 self-center cursor-pointer"
                >
                  <motion.div whileHover={{ rotate: 90 }} transition={{ duration: 0.1 }}>
                    <X className="size-4" />
                  </motion.div>
                </Button>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>
        ) : (
          <div className="flex flex-1 flex-col items-center justify-center p-8 text-center">
              <BookMarked
                className="text-muted-foreground mb-3"
                size={32}
              />

              <p className="font-medium">
                No saved words yet.
              </p>

              <p className="mt-2 max-w-sm text-sm leading-7 text-muted-foreground">
                Hover over a word in a conversation and select the plus icon to save it here.
              </p>
            </div>
        )}
      </div>

      <div data-guide="dict-flashcards" data-dashboard-entry className="min-h-0 min-w-0 lg:h-full lg:w-2/3">
        <WordBoard />
      </div>
    </div>
  </DashboardPage>
);

}

export default DictionaryPage
