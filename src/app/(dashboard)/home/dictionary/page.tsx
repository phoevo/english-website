"use client";

import React, { useEffect, useState } from "react";
import { databases } from "@/data/appwrite";
import { vocab } from "@/data/vocab";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useUserStore } from "@/data/useUserStore";
import { ScrollArea } from "@/components/ui/scroll-area"
import UserGuidePopover from "../../userGuide";

// Get the word details from vocab
function getWordDetails(wordText: string) {
  return vocab[wordText.toLowerCase()] ?? null;
}

function DictionaryPage() {
  const [savedWords, setSavedWords] = useState<string[]>([]);
  const [, setDeletingWord] = useState<string | null>(null);
  const { user, loading } = useUserStore();

  useEffect(() => {

    const fetchSavedWords = async () => {
      if (!user) return;

      try {
        const userDoc = await databases.getDocument(
          process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
          process.env.NEXT_PUBLIC_APPWRITE_USERS_COLLECTION_ID!,
          user.$id
        );
        const userSavedWords = userDoc?.dictionaryWords || [];
        setSavedWords(userSavedWords.reverse());
      } catch (error) {
        console.error("Error fetching saved words:", error);
      }
    };

    fetchSavedWords();
  }, [user]);

  const handleDelete = async (wordToDelete: string) => {
    if (!user?.$id) return;

    setDeletingWord(wordToDelete);

    setTimeout(async () => {
      const updatedWords = savedWords.filter((word) => word !== wordToDelete);
      setSavedWords(updatedWords);
      setDeletingWord(null);

      try {
        // Update user document with new saved words list
        await databases.updateDocument(
          process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
          process.env.NEXT_PUBLIC_APPWRITE_USERS_COLLECTION_ID!,
          user.$id,
          { dictionaryWords: updatedWords }
        );
      } catch (error) {
        console.error("Failed to delete word:", error);
      }
    }, 0);
  };

  if (loading) {
    return (
      <div className="m-10 h-192 space-y-5">
      <Skeleton className="w-[450px] h-[32px]" />
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

  return ( //dictionary
    <div className="flex flex-col h-auto">
      <div className="m-10 flex flex-col space-y-5">
       <UserGuidePopover
          id="dictionary-page"
          title="The Dictionary Page"
          description="Your personal dictionary. Save words you're unfamiliar with or want to revise.
          Pick and choose to create flashcards with."
          side="top"
          align="start"
          >
            <h1 className="text-3xl font-light">Dictionary</h1>
          </UserGuidePopover>

      <p className="text-zinc-500">Words you&apos;ve saved will appear here, along with word classes and definitions.</p>




      {savedWords.length > 0 ? (
        <ScrollArea className="h-155">
        <div className="grid gap-4 p-3 pb-4 border-1 rounded-md">
          <AnimatePresence>
            {savedWords.map((wordText, index) => {
              const details = getWordDetails(wordText);

              return (
                <motion.div
                  key={wordText}
                  layout
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2, delay: index * 0.03, ease: 'easeOut' }}
                >
                  <div className="border-b rounded flex flex-row justify-between items-center text-md pr-5 ">
                    <div className="flex flex-col">
                      <div className="flex flex-row gap-2">
                        <div className="font-bold">{wordText}</div>
                        <span className="italic text-zinc-500">{details && details.type}</span>
                      </div>
                      <span className="text-zinc-500">{details && details.definition}</span>
                      {!details && <p className="italic text-sm">No additional info found.</p>}
                    </div>
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => handleDelete(wordText)}
                      className="h-5 w-5 cursor-pointer"
                    >
                      <X />
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
        <p>No saved words yet</p>
      )}
      </div>
    </div>
  );
}

export default DictionaryPage;