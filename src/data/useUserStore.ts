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
  dictionaryWords: string[];
  fetchUser: () => Promise<void>;
  setSubscribed: (val: boolean) => void;
  setRecentConversations: (conversations: Conversation[]) => void;
  setDictionaryWords: (words: string[]) => void;
}


export const useUserStore = create<UserState>((set) => ({
  user: null,
  isSubscribed: false,
  loading: true,
  recentConversations: [],
  dictionaryWords: [],

  fetchUser: async () => {
    set({ loading: true });

    try {
      const res = await account.get();
      const userDoc = await databases.getDocument(databaseId, usersCollectionId, res.$id);

      const isSubscribed = userDoc?.isSubscribed ?? false;
      const conversationIds: string[] = userDoc?.recentConversations || [];
      const dictionaryWords = userDoc?.dictionaryWords || [];

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
        dictionaryWords,
      });
    } catch (error) {
      console.error("Failed to fetch user or conversations:", error);
      set({
        user: null,
        isSubscribed: false,
        recentConversations: [],
        dictionaryWords: [],
      });
    } finally {
      set({ loading: false });
    }
  },



  setSubscribed: (val: boolean) => set({ isSubscribed: val }),
  setRecentConversations: (conversations) => set({ recentConversations: conversations }),
  setDictionaryWords: (words) => set({ dictionaryWords: words }),
}));
