"use client";

import Link from "next/link";
import ModeToggle from "./ModeToggle";
import { Button } from "./button";
import { Badge } from "./badge";
import { useRouter } from "next/navigation";
import { account } from "@/data/appwrite";
import { Skeleton } from "./skeleton";
import { useUserStore } from "@/data/useUserStore";
import { Geist, DM_Sans } from "next/font/google";
import DailyTasks from "@/app/(dashboard)/home/dailyTasks";
import Challenges from "@/app/(dashboard)/home/Challenges";
import { LogOut, Sword, Swords } from "lucide-react";
import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from "@/components/ui/hover-card";
import { Flame } from "lucide-react";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist", display: "swap" });
const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-geist", display: "swap" });

function getStreakColor(streak: number) {
  if (streak < 1 && streak <= 2) return "bg-foreground text-background";
  if (streak >= 3 && streak <= 9) return "bg-green-500 text-white";
  if (streak >= 10 && streak <= 29) return "bg-gradient-to-r from-emerald-400 to-blue-600 bg-clip-padding text-white ";
  if (streak >= 30 && streak <= 49)
    return "bg-gradient-to-r from-blue-600 via-pink-600 to-purple-600 text-white bg-clip-padding animate-gradient border-none ring-none";
  if (streak >= 50 && streak <= 99)
    return "bg-gradient-to-r from-red-500 via-purple-500 to-cyan-300 text-white bg-clip-padding rounded-full animate-gradient ring-1 ring-foreground";
  if (streak >= 100 && streak <= 1000)
    return "bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 text-black bg-clip-padding rounded-full animate-gradient-fire uneven-glow border-none";
  return "";
}




const Navbar = () => {
  const { user, loading, isSubscribed, challengeCount, taskCount, streak, setStreak, friendsList } = useUserStore();
  const router = useRouter();


   const badgeColor = getStreakColor(streak);

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
            <Link href={"/"} className={`text-3xl font-normal absolute left-10 ${dmSans.className}`}>Synomilo</Link>
            <Link href="/home" className="text-xl font-semibold text-primary font-mono  hover:underline underline-offset-10 decoration-zinc-600">
              Home
            </Link>
            <Link href="/profile" className="text-xl font-semibold text-primary font-mono hover:underline underline-offset-10 decoration-zinc-600 transition-all duration-300">
              Profile
            </Link>



            <div className="flex items-center gap-5 absolute right-10">
              <div className="flex flex-row items-center gap-2 pr-0">

                {loading ? (
                <Skeleton className="w-[56px] h-[36px]"/>
              ): (
              <DailyTasks>
                <Button variant="secondary" className="items-center shadow-sm cursor-pointer">
                  <Sword className="rotate-45" /> {taskCount}
                </Button>
              </DailyTasks>)}

              {loading ? (
                <Skeleton className="w-[56px] h-[36px]"/>
              ): (
              isSubscribed &&
              <Challenges>
                <Button
                className="flex items-center cursor-pointer">
                  <Swords/> {challengeCount.length}
                </Button>
              </Challenges>)}

              </div>


             {loading ? (
              <Skeleton className="w-[180px] h-[36px] rounded-full" />
            ) : (
              <div className={`flex flex-row items-center justify-start border-1 rounded-full shadow-xs`}>
                <Link href="/subscribe" className="cursor-pointer">
                  <Badge className={`m-1 ${isSubscribed ? "bg-pink-500 text-foreground" : ""}`}>
                    {isSubscribed ? "Pro" : "Free"}
                  </Badge>
                </Link>
                {user ? (<p className="mx-2">{user.name}</p>) : (<p className="mx-2">Guest</p>) }

                {user && <HoverCard>
            <HoverCardTrigger asChild>
              <Badge
                className={`m-1 cursor-pointer ${badgeColor}`}
                aria-label={`Current streak: ${streak}`}
              >
                {streak}
              </Badge>
            </HoverCardTrigger>
            <HoverCardContent side="top" align="center" className={`${dmSans.className} w-auto text-xs`}>
              Your current daily streak
            </HoverCardContent>
          </HoverCard>}


              </div>
            )}


              {loading ? (
                <Skeleton className="w-20 h-10 rounded-md" />
              ) : user ? (
                <Button onClick={handleLogout} variant="outline" className="cursor-pointer"><LogOut/>Logout</Button>
              ) : (
                <Link href={"/login"}>
                  <Button variant="outline" className="cursor-pointer">Log in</Button>
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
