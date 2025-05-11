import { create } from "zustand";
import { account } from "@/data/appwrite";

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
      set({ user: res });
    } catch {
      set({ user: null });
    } finally {
      set({ loading: false });
    }
  },

  setSubscribed: (val: boolean) => set({ isSubscribed: val }),
}));
