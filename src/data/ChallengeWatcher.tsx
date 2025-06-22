"use client";

import { useEffect } from "react";
import { allChallenges } from "@/data/challenges";
import { useUserStore } from "@/data/useUserStore";
import { toast } from "sonner";

const ChallengeWatcher = () => {
  const {
    challengeCount,
    incrementChallengeCount,
    completeConversations,
    dictionaryWords,
  } = useUserStore();

  useEffect(() => {
    allChallenges.forEach((challenge) => {
      if (
        challenge.condition() &&
        !challengeCount.includes(challenge.id)
      ) {
        incrementChallengeCount(challenge.id);
        toast.success("Challenge Complete", {
          description: `${challenge.description}`,

        });
      }
    });
  }, [completeConversations, dictionaryWords, challengeCount]);

  return null;
};

export default ChallengeWatcher;
