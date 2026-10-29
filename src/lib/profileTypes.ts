export type UserProfile = {
  $id: string;
  name: string;
  email: string;
  isTeacher: boolean;
  isSubscribed: boolean;
  recentConversations: string[];
  dictionaryWords: string[];
  completeConversations: string[];
  customColors: string[];
  guideTour: string[];
  challengeCount: string[];
  friendsList: string[];
  activeStudents: string[];
  taskCount: number;
  streak: number;
  lastActive: string | null;
};

export type ProfileOperation =
  | { kind: "dictionary.add" | "dictionary.remove"; entry: string }
  | { kind: "colors.save"; colors: string[] }
  | { kind: "conversation.open" | "conversation.remove" | "conversation.complete"; conversationId: string }
  | { kind: "guide.complete"; guideId: string }
  | { kind: "profile.syncName" }
  | { kind: "streak.touch"; timeZone: string }
  | { kind: "challenge.complete"; challengeId: string }
  | { kind: "task.complete" };

export type ActionResult<T> = { ok: true; data: T } | { ok: false; error: string; status: number };
export type PersonalDeck = { $id: string; title: string; type: string; words: string[]; userID: string };
