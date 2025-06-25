"use client";

import React, { ReactNode, useState } from "react";
import {
  Card, CardContent, CardDescription, CardHeader, CardTitle,
} from "@/components/ui/card";

import { Geist, DM_Sans } from "next/font/google";
import { Popover, PopoverContent } from "@/components/ui/popover";
import { PopoverTrigger } from "@radix-ui/react-popover";
import { useUserStore } from "@/data/useUserStore";
import { allChallenges } from "@/data/challenges";
import { Check } from "lucide-react";
import { Progress } from "@/components/ui/progress"


const geist = Geist({ subsets: ['latin'] });
const dmSans = DM_Sans({ subsets: ['latin'] });




const Challenges = ({ children }: { children: ReactNode }) => {

  const [isOpen, setIsOpen] = useState(false);
  const {challengeCount} = useUserStore();



  return (
    <div className={dmSans.className}>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>{children}</PopoverTrigger>
        <PopoverContent
          side="bottom"
          align="center"
          className={`bg-background w-100 ${dmSans.className}`}
        >


    <div className={`space-y-4 ${geist.className}`}>
      <CardHeader>
          <CardTitle className="text-xl">Challenges</CardTitle>

        <CardDescription>
          Challenges are harder than tasks. They should take you longer and are tracked automatically.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
  {allChallenges.map((challenge) => {
    const isDone = challengeCount.includes(challenge.id);
    const progressData = challenge.progress?.();

    return (
      <div key={challenge.id} className="space-y-0">
        <div className="flex items-center border rounded-t-md px-3 py-2 gap-2 bg-muted">
          {isDone && <Check size={15} className="text-green-500" />}
          <span className={isDone ? "text-muted-foreground text-xs line-through" : ""}>
            {challenge.description}
          </span>

        </div>

        {progressData && (
          <div className="">
            <Progress
              value={(progressData.current / progressData.goal) * 100}
              className="h-1"
            />
          </div>
        )}
      </div>
    );
  })}
</CardContent>



    </div>
      </PopoverContent>
      </Popover>
    </div>
  );
};

export default Challenges;
