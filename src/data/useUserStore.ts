import { create } from "zustand";
import { getMyConversationSummaries, updateMyProfile } from "@/data/accountActions";
import { ensureUserDocument } from "@/data/getData";
import { legacyAccountFeaturesEnabled } from "@/lib/accountFeatures";
import {
  account,
  databases,
  usersCollectionId,
  databaseId,
  getUserById,
} from "@/data/appwrite";


interface User {
  isSubscribed: boolean;
  $id: string;
  name: string;
  email: string;
  isTeacher: boolean;
  friendsList?: string[];
  streak?: number;
  challengeCount?: string[];
  taskCount?: number;
  activeStudents?: string[];
}

interface Conversation {
  $id: string;
  title: string;
  description: string;
  level?: string;
  category: string;
  isPro?: boolean;
}

type UserDoc = {
  isSubscribed?: boolean;
  recentConversations?: string[];
  dictionaryWords?: string[];
  completeConversations?: string[];
  customColors?: string[];
  challengeCount?: string[];
  taskCount?: number;
  lastActive?: string | null;
  streak?: number;
  isTeacher?: boolean;
  friendsList?: string[];
  activeStudents?: string[];
  name?: string;
};

interface UserState {
  user: User | null;
  isSubscribed: boolean;
  loading: boolean;
  recentConversations: Conversation[];
  completeConversations: string[];
  dictionaryWords: string[];
  customColors: string[];
  challengeCount: string[];
  taskCount: number;
  lastActive: string | null;
  streak: number;
  isTeacher: boolean;
  friendsList: string[];
  friends: User[];
  activeStudents: string[];

  fetchUser: () => Promise<void>;
  fetchFriends: () => Promise<void>;
  setConversationComplete: (id: string) => Promise<void>;
  setSubscribed: (val: boolean) => void;
  setRecentConversations: (conversations: Conversation[]) => void;
  setDictionaryWords: (words: string[]) => void;
  setCustomColors: (colors: string[]) => void;
  setChallengeCount: (count: string[]) => void;
  incrementChallengeCount: (challenge: string) => Promise<void>;
  setTaskCount: (count: number) => void;
  incrementTaskCount: () => Promise<void>;
  setLastActive: (iso: string) => void;
  setStreak: (val: number) => void;
  getIsTeacher: () => boolean;
  setUser: (user: User) => void;
  setIsTeacher: (val: boolean) => void;
  setActiveStudents: () => Promise<void>
}

export const useUserStore = create<UserState>((set, get) => ({
  user: null,
  isSubscribed: false,
  loading: true,
  recentConversations: [],
  completeConversations: [],
  dictionaryWords: [],
  customColors: [],
  challengeCount: [],
  taskCount: 0,
  lastActive: null,
  streak: 0,
  isTeacher: false,
  friendsList: [],
  friends: [],
  activeStudents: [],

  fetchFriends: async () => {
  const { user } = get();
  if (!user || !user.friendsList || user.friendsList.length === 0) return;

  const fetchedFriends = await Promise.all(
    user.friendsList.map(async (id) => {
      try {
        const userDoc = await getUserById(id);
        return userDoc;
      } catch {
        return null;
      }
    })
  );

  set({ friends: (fetchedFriends.filter(Boolean) as unknown) as User[] });
},



fetchUser: async () => {
  set({ loading: true });

  try {
    const res = await account.get();

    // Repair a missing profile through the same bootstrap used by email and OAuth signup.
    const { document } = await ensureUserDocument(res);
    const userDoc = document as UserDoc;

    // ---- Safe defaults ----
    const isSubscribed = !!userDoc?.isSubscribed;
    const conversationIds = userDoc?.recentConversations ?? [];
    const dictionaryWords = userDoc?.dictionaryWords ?? [];
    const completeConversations = userDoc?.completeConversations ?? [];
    const customColors = userDoc?.customColors ?? [];
    const challengeCount = userDoc?.challengeCount ?? [];
    const taskCount = userDoc?.taskCount ?? 0;
    const lastActive = userDoc?.lastActive ?? null;
    const streak = userDoc?.streak ?? 0;
    // Existing persisted roles are retained. The active app exposes one account,
    // using the tutor-compatible flag expected by the unchanged billing flow.
    const isTeacher = legacyAccountFeaturesEnabled ? !!userDoc?.isTeacher : true;
    const friendsList = userDoc?.friendsList ?? [];
    const activeStudents = userDoc?.activeStudents ?? [];

    // ---- Fetch conversations in parallel ----
    const conversations: Conversation[] = [];

    if (conversationIds.length > 0) {
      const fetched = await getMyConversationSummaries(conversationIds).catch(() => []);
      conversations.push(...fetched);
    }

    // ---- Set state ----
    set({
      user: {
        $id: res.$id,
        name:
          userDoc?.name?.trim()?.length
            ? userDoc.name
            : res.name,
        email: res.email,
        isTeacher,
        friendsList,
        isSubscribed,
        streak,
        challengeCount,
        taskCount,
        activeStudents,
      },
      isTeacher,
      isSubscribed,
      friendsList,
      recentConversations: conversations,
      completeConversations,
      dictionaryWords,
      customColors,
      challengeCount,
      taskCount,
      lastActive,
      streak,
      activeStudents,
    });

    // Connections and assignments remain available only in the legacy implementation.
    if (legacyAccountFeaturesEnabled) {
      get()
        .fetchFriends()
        .catch((err) => console.warn("Background friends fetch failed:", err));
    }
  } catch (error) {
    console.error("Failed to fetch user or conversations:", error);

    set({
      user: null,
      isTeacher: false,
      isSubscribed: false,
      friendsList: [],
      friends: [],
      recentConversations: [],
      completeConversations: [],
      dictionaryWords: [],
      customColors: [],
      challengeCount: [],
      taskCount: 0,
      lastActive: null,
      streak: 0,
      activeStudents: [],
    });
  } finally {
    set({ loading: false });
  }
},


  setConversationComplete: async (conversationId: string) => {
    const user = get().user;
    if (!user) return;

    try {
      const profile = await updateMyProfile({ kind: "conversation.complete", conversationId });
      set({ completeConversations: profile.completeConversations });
    } catch (err) {
      console.error("Failed to mark conversation as complete:", err);
    }
  },

  // Local state only: isSubscribed is written server-side by the Stripe
  // function, and users cannot update their own document.
  setSubscribed: (val: boolean) => {
    set((state) => ({
      isSubscribed: val,
      user: state.user ? { ...state.user, isSubscribed: val } : state.user,
    }));
  },
  setRecentConversations: (conversations) => set({ recentConversations: conversations }),
  setDictionaryWords: (words) => set({ dictionaryWords: words }),
  setCustomColors: (colors) => set({ customColors: colors }),
  setChallengeCount: (count) => set({ challengeCount: count }),
  setLastActive: (iso: string) => set({ lastActive: iso }),
  setStreak: (val: number) => set({ streak: val }),

  incrementChallengeCount: async (challenge: string) => {
    const { user, challengeCount } = get();
    if (!user || challengeCount.includes(challenge)) return;

    try {
      const profile = await updateMyProfile({ kind: "challenge.complete", challengeId: challenge });
      set({ challengeCount: profile.challengeCount });
    } catch (err) {
      console.error("Failed to update challenge count:", err);
    }
  },

  setTaskCount: (count: number) => set({ taskCount: count }),

  incrementTaskCount: async () => {
    const { user } = get();
    if (!user) return;
    try {
      const profile = await updateMyProfile({ kind: "task.complete" });
      set({ taskCount: profile.taskCount });
    } catch (err) {
      console.error("Failed to increment task count:", err);
    }
  },

  setUser: (user) => set({
    isTeacher: legacyAccountFeaturesEnabled ? user.isTeacher : true,
    user: { ...user, isTeacher: legacyAccountFeaturesEnabled ? user.isTeacher : true },
  }),

  setIsTeacher: (val) => set((state) => ({
    isTeacher: legacyAccountFeaturesEnabled ? val : Boolean(state.user),
    user: state.user ? { ...state.user, isTeacher: legacyAccountFeaturesEnabled ? val : true } : null,
  })),

  setActiveStudents: async () => {
  const { user } = get();
  if (!user) return;

  try {
    const userDoc = await databases.getDocument(
      databaseId,
      usersCollectionId,
      user.$id
    );

    const activeStudents = userDoc?.activeStudents || [];

    set({
      activeStudents,
      user: { ...user, activeStudents }
    });
  } catch (err) {
    console.error("Failed to fetch active students:", err);
  }
},


  getIsTeacher: () => get().isTeacher,
}));
