import { create } from "zustand";
import { account, databases } from "@/data/appwrite";

const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!;
const USERS_COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_USERS_COLLECTION_ID!;

interface User {
  $id: string;
  name: string;
  email: string;
}

interface UserState {
  user: User | null;
  isSubscribed: boolean;
  loading: boolean;
  fetchUser: () => Promise<void>;
  setSubscribed: (val: boolean) => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  isSubscribed: false,
  loading: true,

  fetchUser: async () => {
    set({ loading: true });
    try {
      const res = await account.get();

      // Fetch user document for extra fields
      const userDoc = await databases.getDocument(DATABASE_ID, USERS_COLLECTION_ID, res.$id);
      const isSubscribed = userDoc?.isSubscribed ?? false;

      set({ user: res, isSubscribed });
    } catch {
      set({ user: null, isSubscribed: false });
    } finally {
      set({ loading: false });
    }
  },

  setSubscribed: (val: boolean) => set({ isSubscribed: val }),
}));
