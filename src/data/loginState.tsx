// /data/loginState.tsx
"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { account } from "@/data/appwrite";

interface User {
  $id: string;
  name: string;
  email: string;
}

interface UserContextType {
  user: User | null;
  loading: boolean;
}

const UserContext = createContext<UserContextType>({
  user: null,
  loading: true,
});

let fetchCount = 0;

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [fetchedOnce, setFetchedOnce] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      fetchCount += 1;
      console.log(`[UserProvider] Fetching user... count = ${fetchCount}`);

      try {
        const res = await account.get();
        setUser(res);
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
        setFetchedOnce(true);
      }
    };

    if (!fetchedOnce) {
      fetchUser();
    } else {
      setLoading(false);
    }
  }, [fetchedOnce]);

  return (
    <UserContext.Provider value={{ user, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
