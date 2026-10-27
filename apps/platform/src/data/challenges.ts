import { useUserStore } from "@/data/useUserStore";

export interface Challenge {
  id: string;
  description: string;
  condition: () => boolean;
  progress?: () => { current: number; goal: number };
}


export const allChallenges: Challenge[] = [
  {
    id: "finish-5-conversations",
    description: "Finish 5 conversations",
    condition: () => useUserStore.getState().completeConversations.length >= 5,
    progress: () => {
      const current = useUserStore.getState().completeConversations.length;
      return { current, goal: 5 };
    }
  },
  {
    id: "save-50-dictionary-words",
    description: "Save 50 dictionary words",
    condition: () => useUserStore.getState().dictionaryWords.length >= 50,
    progress: () => {
      const current = useUserStore.getState().dictionaryWords.length;
      return { current, goal: 50 };
    }
  },
  {
    id: "streak-30",
    description: "Maintain your daily streak until day 30.",
    condition: () => useUserStore.getState().streak >= 30,
    progress: () => {
      const current = useUserStore.getState().streak;
      return { current, goal: 30 };
    }
  }
];
