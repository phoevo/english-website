import { create } from "zustand";
import { account, databases, getConversationFromDB } from "@/data/appwrite";

const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!;
const USERS_COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_USERS_COLLECTION_ID!;

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
  fetchUser: () => Promise<void>;
  setSubscribed: (val: boolean) => void;
  setRecentConversations: (conversations: Conversation[]) => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  isSubscribed: false,
  loading: true,
  recentConversations: [],

  fetchUser: async () => {
    set({ loading: true });
    try {
      const res = await account.get();
      const userDoc = await databases.getDocument(DATABASE_ID, USERS_COLLECTION_ID, res.$id);
      const isSubscribed = userDoc?.isSubscribed ?? false;
      const conversationIds: string[] = userDoc?.recentConversations || [];

      // Fetch recent conversations
      const conversations = await Promise.all(
        conversationIds.map((id: string) => getConversationFromDB(id))
      );

      set({
        user: res,
        isSubscribed,
        recentConversations: conversations,
      });
    } catch (error) {
      console.error("Failed to fetch user or conversations:", error);
      set({ user: null, isSubscribed: false, recentConversations: [] });
    } finally {
      set({ loading: false });
    }
  },

  setSubscribed: (val: boolean) => set({ isSubscribed: val }),
  setRecentConversations: (conversations) => set({ recentConversations: conversations }),
}));
