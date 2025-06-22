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

          return (
            <div key={challenge.id} className="flex items-center justify-center border-1 h-10 rounded-md gap-2">
              {isDone && <Check size={20} className="text-green-500"/>}
              <span className={isDone ? "text-muted-foreground" : ""}>
                {challenge.description}
              </span>
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
