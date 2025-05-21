"use client";

import React, { useEffect, useState } from "react";
import {
  Card, CardContent, CardDescription, CardHeader, CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader,
  AlertDialogTitle, AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import { Geist } from "next/font/google";

const geist = Geist({ subsets: ['latin'] });

// Full challenge pool
const allChallenges = [
  "Save 3 new words to your dictionary",
  "Review 5 words from your saved dictionary",
  "Use 3 saved words in a sentence",
  "Guess the meaning of a random word",
  "Classify 5 words by their part of speech",
  "Complete a new conversation scenario",
  "Re-listen to an old conversation and answer a quiz",
  "Hover over 5 phrases to reveal translations",
  "Record yourself mimicking a line",
  "Identify 3 idiomatic phrases",
  "Complete a learning module or lesson",
  "Take a short quiz on today's topic",
  "Score 80% or higher on a vocabulary test",
  "Revisit a past mistake and correct it",
  "Track your streak (3 days in a row)",
  "Customize your profile",
  "Use the hover feature on 10 words",
  "Search and view a word's full etymology",
  "Suggest a new feature or word to add",
  "Create your own conversation using 10+ words",
  "Learn 5 new words from today's vocabulary list",
  "Review 10 words from your saved dictionary",
  "Listen to one conversation with audio enabled",
  "Practice pronunciation for 3 difficult words",
  "Hover over 10 new words in a conversation",
  "Complete one 'Learn' session or tutorial",
  "Translate 3 sentences from a conversation into your native language",
  "Read a conversation without using hover help",
  "Visit the dictionary and review definitions of 5 words",
  "Revisit a past conversation and summarize it in your own words",
  "Try typing out a full conversation in your target language",
  "Compare similar words (e.g., synonyms) in your dictionary",
  "Watch for word usage patterns in two conversations",
  "Use 'Recents' to review your last 3 activities and reflect",
  "Challenge yourself: no English allowed during your session"
];

// Generate 5 random unique daily challenges
const getDailyChallenges = () => {
  const shuffled = [...allChallenges].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 5);
};

const DailyChallenges = () => {
  const [challenges, setChallenges] = useState<string[]>([]);
  const [completed, setCompleted] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    const stored = localStorage.getItem("daily-challenges");
    const storedCompleted = localStorage.getItem("completed-challenges");

    if (stored) {
      setChallenges(JSON.parse(stored));
    } else {
      const newChallenges = getDailyChallenges();
      setChallenges(newChallenges);
      localStorage.setItem("daily-challenges", JSON.stringify(newChallenges));
    }

    if (storedCompleted) {
      setCompleted(JSON.parse(storedCompleted));
    }
  }, []);

  const toggleChallenge = (challenge: string) => {
    const updated = {
      ...completed,
      [challenge]: true,
    };
    setCompleted(updated);
    localStorage.setItem("completed-challenges", JSON.stringify(updated));
  };

  const resetChallenges = () => {
    const newChallenges = getDailyChallenges();
    setChallenges(newChallenges);
    setCompleted({});
    localStorage.setItem("daily-challenges", JSON.stringify(newChallenges));
    localStorage.removeItem("completed-challenges");
  };

  return (
    <Card className={`w-full bg-background space-y-4 border-1 ${geist}`}>
      <CardHeader>
        <CardTitle className="text-2xl">Daily Challenges</CardTitle>
        <CardDescription>
          Challenges that can help guide you towards your language goals.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {challenges.map((challenge, index) => {
          const isDone = completed[challenge];

          return (
            <div key={index} className="flex items-center gap-2">
              {!isDone ? (
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Checkbox
                      checked={false}
                      onCheckedChange={() => {}}
                      className="cursor-pointer"
                    />
                  </AlertDialogTrigger>
                  <AlertDialogContent className={geist.className}>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Mark challenge as complete?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you&apos;ve completed this challenge? There&apos;s nothing checking your progress
                        automatically, so it’s up to you to be honest and track it accurately. Only mark it complete if
                        you’ve truly done it.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel >Not yet</AlertDialogCancel>
                      <AlertDialogAction onClick={() => toggleChallenge(challenge)}>
                        Yes, I have
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              ) : (
                <Checkbox checked disabled />
              )}

              <span className={isDone ? "line-through text-muted-foreground" : ""}>
                {challenge}
              </span>
            </div>
          );
        })}

        <Button variant="outline" className="mt-4 w-auto" onClick={resetChallenges}>
          Refresh Challenges
        </Button>
      </CardContent>
    </Card>
  );
};

export default DailyChallenges;
