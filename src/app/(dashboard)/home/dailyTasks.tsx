"use client";

import React, { ReactNode, useEffect, useState } from "react";
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
import { Geist, DM_Sans } from "next/font/google";
import { Switch } from "@/components/ui/switch";
import { Popover, PopoverContent } from "@/components/ui/popover";
import { PopoverTrigger } from "@radix-ui/react-popover";
import { useUserStore } from "@/data/useUserStore";

const geist = Geist({ subsets: ['latin'] });
const dmSans = DM_Sans({ subsets: ['latin'] });

const allTasks = [
  "Complete 1 conversation from start to finish",
  "Resume your most recent conversation and finish it",
  "Save 3 new words to your dictionary",
  "Review 10 words from your saved dictionary",
  "Read one conversation without using hover help",
  "Hover over 15 new words in a conversation to reveal translations",
  "Listen to one conversation with audio enabled",
  "Revisit a past conversation and re-read it fully",
  "Use 3 saved words in your own example sentences",
  "Compare meanings of 3 similar saved words (e.g., synonyms)",
  "Practice pronouncing 5 difficult saved words out loud",
  "Mark one conversation as complete",
  "Maintain your streak today by completing any one of these tasks",
  "Review the 5 most recently saved words on the Home page",
  "Open a conversation from a different level and skim it"
];

const getDailyChallenges = () => {
  const shuffled = [...allTasks].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 4);
};

const DailyTasks = ({ children }: { children: ReactNode }) => {
  const [challenges, setChallenges] = useState<string[]>([]);
  const [completed, setCompleted] = useState<{ [key: string]: boolean }>({});
  const [showWarnings, setShowWarnings] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const {taskCount,incrementTaskCount,setTaskCount} = useUserStore();

  useEffect(() => {
    const stored = localStorage.getItem("daily-challenges");
    const storedCompleted = localStorage.getItem("completed-challenges");
    const storedWarnings = localStorage.getItem("show-challenge-warnings");

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

    if (storedWarnings !== null) {
      setShowWarnings(storedWarnings === "true");
    }
  }, []);

  const toggleChallenge = (challenge: string) => {
    const updated = {
      ...completed,
      [challenge]: true,
    };
    setCompleted(updated);
    localStorage.setItem("completed-challenges", JSON.stringify(updated));
    incrementTaskCount();
  };

  const resetChallenges = () => {
    const newChallenges = getDailyChallenges();
    setChallenges(newChallenges);
    setCompleted({});
    localStorage.setItem("daily-challenges", JSON.stringify(newChallenges));
    localStorage.removeItem("completed-challenges");
  };

  const toggleWarningPref = () => {
    const nextValue = !showWarnings;
    setShowWarnings(nextValue);
    localStorage.setItem("show-challenge-warnings", String(nextValue));
  };

  return (
    <div className={dmSans.className}>
      <Popover modal open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>{children}</PopoverTrigger>
        <PopoverContent
          side="bottom"
          align="center"
          className={`bg-background w-screen lg:m-0 lg:w-full ${dmSans.className}`}

          onOpenAutoFocus={(e) => e.preventDefault()}
          onCloseAutoFocus={(e) => e.preventDefault()}
        >


    <div className={`space-y-4 ${geist.className}`}>
      <CardHeader>
        <div className="flex flex-row items-center justify-between">
          <CardTitle className="text-xl">Daily Tasks</CardTitle>
          <div className="flex flex-row items-center gap-1">
            <span className="text-sm text-muted-foreground">Warning</span>
            <Switch checked={showWarnings} onCheckedChange={toggleWarningPref} className="cursor-pointer" />
          </div>

        </div>

        <CardDescription>
          Tasks that can help guide you towards your language goals.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">

        {challenges.map((challenge, index) => {
          const isDone = completed[challenge];

          return (
            <div key={index} className="flex items-center gap-2">
              {!isDone ? (
                showWarnings ? (
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
                        <AlertDialogTitle>Mark task as complete?</AlertDialogTitle>
                        <AlertDialogDescription>
                        Are you sure you&apos;ve completed this task? There&apos;s nothing checking your progress
                        automatically, so it’s up to you to be honest and track it accurately. Only mark it complete if
                        you’ve truly done it. <i className="text-red-500 not-italic">The counter can't be re-adjusted incase of error. </i>
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel className="cursor-pointer">Not yet</AlertDialogCancel>
                        <AlertDialogAction className="cursor-pointer" onClick={() => toggleChallenge(challenge)}>Yes, I have</AlertDialogAction>
                        <AlertDialogAction
                          className="cursor-pointer"
                          variant="destructive"
                          onClick={() => {
                            toggleChallenge(challenge);
                            setShowWarnings(false);
                            localStorage.setItem("show-challenge-warnings", "false");
                          }}
                        >
                          Yes, I have, and don&apos;t remind me again
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                ) : (
                  <Checkbox
                    checked={false}
                    onCheckedChange={() => toggleChallenge(challenge)}
                    className="lg:cursor-pointer"
                  />
                )
              ) : (
                <Checkbox checked disabled />
              )}
              <span className={isDone ? "line-through text-muted-foreground text-sm lg:text-md" : "text-sm lg:text-md"}>
                {challenge}
              </span>
            </div>
          );
        })}

          <Button
          variant="outline"
          className="mt-4 w-auto cursor-pointer"
          onClick={resetChallenges}>
          Refresh Tasks
        </Button>

      </CardContent>
    </div>
      </PopoverContent>
      </Popover>
    </div>
  );
};

export default DailyTasks;
