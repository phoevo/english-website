import { create } from "zustand";
import { account, databases, getConversationFromDB, usersCollectionId, databaseId } from "@/data/appwrite";

interface User {
  $id: string;
  name: string;
  email: string;
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
  fetchUser: () => Promise<void>;
  setConversationComplete: (id: string) => Promise<void>;
  setSubscribed: (val: boolean) => void;
  setRecentConversations: (conversations: Conversation[]) => void;
  setDictionaryWords: (words: string[]) => void;
  setCustomColors: (colors: string[]) => void;

}

export const useUserStore = create<UserState>((set, get) => ({
  user: null,
  isSubscribed: false,
  loading: true,
  recentConversations: [],
  completeConversations: [],
  dictionaryWords: [],
  customColors: [],

  fetchUser: async () => {
    set({ loading: true });

    try {
      const res = await account.get();
      const userDoc = await databases.getDocument(databaseId, usersCollectionId, res.$id);

      const isSubscribed = userDoc?.isSubscribed ?? false;
      const conversationIds: string[] = userDoc?.recentConversations || [];
      const dictionaryWords = userDoc?.dictionaryWords || [];
      const completeConversations: string[] = userDoc?.completeConversations || [];

      const conversations: Conversation[] = [];
      const validConversationIds: string[] = [];
      const customColors = userDoc?.customColors || [];

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
        } catch (err) {
          console.warn(`Skipping deleted conversation ID: ${id}`);
        }
      }

      if (validConversationIds.length !== conversationIds.length) {
        await databases.updateDocument(databaseId, usersCollectionId, res.$id, {
          recentConversations: validConversationIds,
        });
      }

      set({
        user: res,
        isSubscribed,
        recentConversations: conversations,
        completeConversations,
        dictionaryWords,
        customColors,
      });
    } catch (error) {
      console.error("Failed to fetch user or conversations:", error);
      set({
        user: null,
        isSubscribed: false,
        recentConversations: [],
        completeConversations: [],
        dictionaryWords: [],
      });
    } finally {
      set({ loading: false });
    }
  },

  setConversationComplete: async (conversationId: string) => {
    if (!conversationId) {
      console.warn("Invalid conversationId passed:", conversationId);
      return;
    }

    const user = get().user;
    if (!user) {
      console.error("No user logged in");
      return;
    }

    try {
      const userDoc = await databases.getDocument(databaseId, usersCollectionId, user.$id);

      const currentCompleted: string[] = Array.isArray(userDoc.completeConversations)
        ? userDoc.completeConversations
        : [];

      if (currentCompleted.includes(conversationId)) {
        console.log("Already completed:", conversationId);
        return;
      }

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
  setCustomColors: (colors: string[]) => set({ customColors: colors }),

}));
