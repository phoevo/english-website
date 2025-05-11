"use client";

import Link from "next/link";
import ModeToggle from "./ModeToggle";
import { Button } from "./button";
import { Badge } from "./badge";
import { useRouter } from "next/navigation";
import { account } from "@/data/appwrite";
import { Skeleton } from "./skeleton";
import { useUserStore } from "@/data/useUserStore";

const Navbar = () => {
  const { user, loading, isSubscribed } = useUserStore();
  const router = useRouter();

  const handleLogout = async (): Promise<void> => {
    try {
      await account.deleteSession("current");
      router.push("/login");
    } catch (err) {
      console.error("Error logging out:", err);
    }
  };

  return (
    <nav className="sticky top-0 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-center h-18">
          <div className="flex items-center gap-20">
            <Link href={"/"} className="text-3xl font-light absolute left-10">Synomilo</Link>
            <Link href="/home" className="text-xl font-bold text-primary font-mono tracking-wider hover:underline underline-offset-10 decoration-zinc-600">
              home
            </Link>
            <Link href="/profile" className="text-xl font-bold text-primary font-mono tracking-wider hover:underline underline-offset-10 decoration-zinc-600">
              profile
            </Link>

            <div className="flex items-center gap-5 absolute right-10">
              {user && <div>Hello, {user.name}</div>}

              {loading ? (
                <Skeleton className="w-10 h-6 rounded-lg" />
              ) : isSubscribed ? (
                <Badge className="bg-pink-500 text-foreground">Pro</Badge>
              ) : (
                <Badge variant="default">Free</Badge>
              )}

              {loading ? (
                <Skeleton className="w-20 h-10 rounded-md" />
              ) : user ? (
                <Button onClick={handleLogout} variant="outline">Logout</Button>
              ) : (
                <Link href={"/login"}>
                  <Button variant="outline">Log in</Button>
                </Link>
              )}

              <ModeToggle />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
