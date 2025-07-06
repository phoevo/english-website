import { create } from "zustand";
import {
  account,
  databases,
  getConversationFromDB,
  usersCollectionId,
  databaseId,
  getUserById,
} from "@/data/appwrite";

interface User {
  streak: undefined;
  isSubscribed: any;
  $id: string;
  name: string;
  email: string;
  isTeacher: boolean;
  friendsList?: string[];
}

interface Conversation {
  $id: string;
  title: string;
  level?: string;
}

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

  fetchFriends: async () => {
  const { user } = get();
  if (!user || !user.friendsList || user.friendsList.length === 0) return;

  const fetchedFriends = await Promise.all(
    user.friendsList.map(async (id) => {
      try {
        const userDoc = await getUserById(id);
        return userDoc;
      } catch (err) {
        console.error("Error fetching friend:", id, err);
        return null;
      }
    })
  );

  set({ friends: fetchedFriends.filter((f): f is User => Boolean(f)) });
},

  fetchUser: async () => {
    set({ loading: true });

    try {
      const res = await account.get();
      const userDoc = await databases.getDocument(
        databaseId,
        usersCollectionId,
        res.$id
      );

      const isSubscribed = userDoc?.isSubscribed ?? false;
      const conversationIds: string[] = userDoc?.recentConversations || [];
      const dictionaryWords = userDoc?.dictionaryWords || [];
      const completeConversations: string[] = userDoc?.completeConversations || [];
      const customColors = userDoc?.customColors || [];
      const challengeCount: string[] = userDoc?.challengeCount || [];
      const taskCount: number = typeof userDoc?.taskCount === "number" ? userDoc.taskCount : 0;
      const lastActive = userDoc?.lastActive ?? null;
      const streak = typeof userDoc?.streak === "number" ? userDoc.streak : 0;
      const isTeacher = !!userDoc?.isTeacher;
      const friendsList: string[] = userDoc?.friendsList || [];

      const conversations: Conversation[] = [];
      const validConversationIds: string[] = [];

      for (const id of conversationIds) {
        try {
          const convo = await getConversationFromDB(id);
          if (convo) {
            conversations.push({
              $id: convo.$id,
              title: convo.title,
              level: convo.level,
            });
            validConversationIds.push(convo.$id);
          }
        } catch {
          console.warn(`Skipping deleted conversation ID: ${id}`);
        }
      }

      if (validConversationIds.length !== conversationIds.length) {
        await databases.updateDocument(databaseId, usersCollectionId, res.$id, {
          recentConversations: validConversationIds,
        });
      }

      set({
        user: {
          $id: res.$id,
          name: res.name,
          email: res.email,
          isTeacher,
          friendsList,
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
      });

      // ✅ Load full friend objects into the store
      await get().fetchFriends();

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
      });
    } finally {
      set({ loading: false });
    }
  },

  setConversationComplete: async (conversationId: string) => {
    const user = get().user;
    if (!user) return;

    try {
      const userDoc = await databases.getDocument(
        databaseId,
        usersCollectionId,
        user.$id
      );

      const currentCompleted: string[] = Array.isArray(userDoc.completeConversations)
        ? userDoc.completeConversations
        : [];

      if (currentCompleted.includes(conversationId)) return;

      const updated = [...currentCompleted, conversationId];

      await databases.updateDocument(databaseId, usersCollectionId, user.$id, {
        completeConversations: updated,
      });

      set((state) => ({
        completeConversations: [...state.completeConversations, conversationId],
      }));
    } catch (err) {
      console.error("Failed to mark conversation as complete:", err);
    }
  },

  setSubscribed: (val: boolean) => set({ isSubscribed: val }),
  setRecentConversations: (conversations) => set({ recentConversations: conversations }),
  setDictionaryWords: (words) => set({ dictionaryWords: words }),
  setCustomColors: (colors) => set({ customColors: colors }),
  setChallengeCount: (count) => set({ challengeCount: count }),
  setLastActive: (iso: string) => set({ lastActive: iso }),
  setStreak: (val: number) => set({ streak: val }),

  incrementChallengeCount: async (challenge: string) => {
    const { user, challengeCount } = get();
    if (!user || challengeCount.includes(challenge)) return;

    const updatedCount = [...challengeCount, challenge];

    try {
      await databases.updateDocument(databaseId, usersCollectionId, user.$id, {
        challengeCount: updatedCount,
      });

      set({ challengeCount: updatedCount });
    } catch (err) {
      console.error("Failed to update challenge count:", err);
    }
  },

  setTaskCount: (count: number) => set({ taskCount: count }),

  incrementTaskCount: async () => {
    const { user, taskCount } = get();
    if (!user) return;

    const newCount = taskCount + 1;

    try {
      await databases.updateDocument(databaseId, usersCollectionId, user.$id, {
        taskCount: newCount,
      });

      set({ taskCount: newCount });
    } catch (err) {
      console.error("Failed to increment task count:", err);
    }
  },

  setUser: (user) => set({
    user,
    isTeacher: user.isTeacher,
  }),

  setIsTeacher: (val) => set((state) => ({
    isTeacher: val,
    user: state.user ? { ...state.user, isTeacher: val } : null,
  })),

  getIsTeacher: () => get().isTeacher,
}));
