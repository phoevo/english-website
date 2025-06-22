// data/challenges.ts
import { useUserStore } from "@/data/useUserStore";

export interface Challenge {
  id: string;
  description: string;
  condition: () => boolean;
}

export const allChallenges: Challenge[] = [
  {
    id: "finish-3-conversations",
    description: "Finish 5 conversations",
    condition: () => {
      const { completeConversations } = useUserStore.getState();
      return completeConversations.length >= 5;
    },
  },
  {
    id: "save-5-dictionary-words",
    description: "Save 50 dictionary words",
    condition: () => {
      const { dictionaryWords } = useUserStore.getState();
      return dictionaryWords.length >= 50;
    },
  },

];
