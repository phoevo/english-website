"use client";

import { useEffect } from "react";
import { toast } from "sonner";
import { useUserStore } from "@/data/useUserStore";
import { checkSubscriptionStatus } from "@/data/getData";
import Link from "next/link";
// import DailyTasks from "./dailyTasks";
import GuideTour, { type GuideStep } from "../GuideTour";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button";
import News from "./News";
import { Geist } from "next/font/google";
import { Calendar, Sword, Swords } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

const geist = Geist({ subsets: ['latin'] });


const homeGuideSteps: GuideStep[] = [
  { target: "home-welcome", title: "Welcome", description: "This is your home page. Here you'll find your most recent conversation, saved vocabulary, and news." },
  { target: "home-recent", title: "Most Recent Conversation", description: "Your most recently viewed conversation appears here for quick access." },
  { target: "home-news", title: "News & Updates", description: "Stay up to date with the latest news and updates from Synomilo." },
];

function getLastActive(value: unknown): string | null {
  if (value && typeof value === 'object' && 'lastActive' in value) {
    const v = (value as { lastActive?: unknown }).lastActive;
    return typeof v === 'string' ? v : null;
  }
  return null;
}

function Page() {
  const { user, recentConversations, loading, dictionaryWords, friends, isTeacher } = useUserStore();

  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    if (params.get("success") !== "true") return;

    toast.success("Thanks for subscribing! Your Pro access is being activated.");
    // Remove the query param so the toast doesn't fire again on refresh.
    window.history.replaceState({}, "", "/home");

    // Stripe provisions via the webhook asynchronously, so poll the user doc
    // briefly and flip the local subscribed state once it lands (avoids a full reload).
    let cancelled = false;
    (async () => {
      for (let attempt = 0; attempt < 8 && !cancelled; attempt++) {
        const uid = useUserStore.getState().user?.$id;
        if (uid && (await checkSubscriptionStatus(uid))) {
          useUserStore.getState().setSubscribed(true);
          break;
        }
        await new Promise((resolve) => setTimeout(resolve, 2000));
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const conversation = recentConversations[0]; // get the first one
  const firstFiveWords = [...dictionaryWords].reverse().slice(0, 5);

  // Teacher-specific data: recently active students
const studentFriends = friends?.filter(f => !f.isTeacher) || [];
  const recentStudents = studentFriends
    .filter((student) => Boolean(getLastActive(student)))
    .sort(
      (a, b) =>
        new Date(getLastActive(b) || 0).getTime() -
        new Date(getLastActive(a) || 0).getTime()
    );

  function getStreakBadgeClass(streak: number): string {
    if (streak >= 100) {
      return "bg-gradient-to-r from-red-500 via-orange-500 to-yellow-300 text-black rounded-full animate-gradient uneven-glow bg-clip-padding";
    } else if (streak >= 50) {
      return "bg-gradient-to-r from-red-500 via-purple-500 to-cyan-300 text-white rounded-full animate-gradient ring-1 ring-foreground bg-clip-padding";
    } else if (streak >= 30) {
      return "bg-gradient-to-r from-blue-600 via-pink-600 to-purple-600 text-white rounded-full animate-gradient bg-clip-padding";
    } else if (streak >= 10) {
      return "bg-gradient-to-r from-emerald-400 to-blue-600 text-white bg-clip-padding";
    } else if (streak >= 3) {
      return "bg-green-500 text-white";
    } else {
      return "bg-foreground text-background";
    }
  }

  if (loading) {
    return (
      <div className="mt-6 lg:px-10 space-y-6 w-full">
  <Skeleton className="w-[300px] h-[32px]" />
  <Skeleton className="w-[200px] h-[15px]" />

  <div className="flex flex-row w-full items-stretch space-x-6 min-h-[200px]">
    <div className="flex flex-col w-2/3 space-y-6">
      <Skeleton className="w-full h-[200px] opacity-50" />
      <Skeleton className="w-full h-[250px] opacity-50" />
    </div>

    <div className="w-1/3 flex">
      <Skeleton className="w-full h-auto min-h-[300px] opacity-50" />
    </div>
  </div>
</div>

    );
  }

  return (
    <div className="w-full px-4 sm:px-6 lg:px-10">
      <div className="flex flex-col gap-3 mt-10">
        <GuideTour id="home-page" steps={homeGuideSteps} />
        <div data-guide="home-welcome" className="flex flex-col w-full md:w-full space-y-6 h-full">
              {user ? (
                 <h1 className={`text-2xl sm:text-3xl ${geist.className}`}>Welcome back, {user.name}</h1>
              ): <h1 className={`text-2xl sm:text-3xl ${geist.className}`}>Welcome, New User</h1>}

            {!user ? (
              <p>
                Please <Link href="/login" className="underline">log in</Link> or{' '}
                <Link href="/register" className="underline">create an account</Link> for full Home page experience.
              </p>
            ) : (
              <p className="text-muted-foreground">Here&apos;s where you left off</p>
            )}
            </div>

          <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex flex-col w-full lg:w-2/3">
          {user && (
            <div className="flex flex-col space-y-4">
              <Card data-guide="home-recent" className="bg-background">
              <CardHeader>
                <CardTitle>Most recent conversation</CardTitle>
              </CardHeader>
              <CardContent>
                 {conversation ? (
                <Link
                  href={`home/conversations/${conversation.$id}`}
                  className="block border p-4 rounded-lg shadow-sm hover:bg-primary-foreground transition"
                >
                  <div className="flex gap-3 flex-1">

                      <div className="flex flex-col flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold text-base">
                            {conversation.title}
                          </h4>
                        </div>

                        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                          {conversation.description}
                        </p>

                        <div className="flex flex-wrap gap-2 mt-3">
                          <Badge variant="secondary">
                            {conversation.level}
                          </Badge>

                          <Badge variant="outline">
                            {conversation.category}
                          </Badge>
                        </div>
                      </div>
                    </div>
                </Link>
              ) : (
                <p className="text-muted-foreground">No recent conversations to continue.</p>
              )}
              </CardContent>
              <CardFooter>
                <Link href={"/home/recents"}>
                 <Button variant="outline" className="cursor-pointer">View more</Button>
                </Link>

              </CardFooter>
            </Card>


            {/* Conditional content based on user role */}
            {isTeacher ? (
              <Card className="bg-background">
                <CardHeader>
                  <CardTitle>Recently active students</CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-50">
                  {recentStudents.length === 0 ? (
                    <p className="text-muted-foreground">No recent student activity.</p>
                  ) : (
                    <ul className="space-y-3">
                      {recentStudents.map((student, index) => {
                        const lastActiveRaw = getLastActive(student);
                        const lastActiveDate = lastActiveRaw ? new Date(lastActiveRaw) : null;
                        const timeAgo = lastActiveDate ?
                          Math.floor((Date.now() - lastActiveDate.getTime()) / (1000 * 60 * 60 * 24)) : null;

                        return (
                          <li key={index} className="flex justify-between items-center p-2 rounded-lg border hover:bg-muted/50 transition-colors">
                            <div className="flex flex-col gap-1">
                              <div>
                                <Badge variant={student.isTeacher ? "default" : "secondary"}>
                                  {student.isTeacher ? "Teacher" : "Student"}
                                </Badge>
                                <span className="text-sm text-muted-foreground px-2">{student.email}</span>
                              </div>
                              <div className="flex gap-2 items-center mt-2">
                                <div className="flex flex-row border-1 rounded-full p-1 h-8 shadow-xs">
                                  {student.isSubscribed ? (
                                    <Badge className="text-white bg-pink-500 border-none">Plus</Badge>
                                  ) : (
                                    <Badge className="text-background bg-foreground border-none">Free</Badge>
                                  )}
                                  <span className="font-normal px-2">{student.name || "Unknown"}</span>
                                  {student.streak !== undefined && (
                                    <div className="flex justify-center">
                                      <Badge className={getStreakBadgeClass(student.streak ?? 0)}>
                                        {student.streak ?? 0}
                                      </Badge>
                                    </div>
                                  )}
                                </div>
                                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                  <Calendar className="w-3 h-3" />
                                  {timeAgo !== null ?
                                    `${timeAgo === 0 ? 'today' : `${timeAgo} days ago`}` :
                                    'unknown'
                                  }
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge className="p-2" variant="secondary">
                                <Sword className="rotate-45 w-3 h-3 mr-1" />
                                {student.taskCount || 0}
                              </Badge>
                              <Badge className="p-2">
                                <Swords className="w-3 h-3 mr-1" />
                                {student.challengeCount?.length || 0}
                              </Badge>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                  </ScrollArea>
                </CardContent>
                <CardFooter>
                  <Link href={"/home/assignments"}>
                    <Button variant="outline" className="cursor-pointer">View assignments</Button>
                  </Link>
                </CardFooter>
              </Card>
            ) : (
              <Card className="bg-background">
                <CardHeader>
                  <CardTitle>Recently saved words</CardTitle>
                  <CardDescription>Just to jog your memory</CardDescription>
                </CardHeader>
                <CardContent>
                  {firstFiveWords.length === 0 ? (
                    <p className="text-muted-foreground">No words added yet.</p>
                  ) : (
                    <ul className="list-disc list-inside space-y-1">
                      {firstFiveWords.map((wordEntry, index) => {
                        const [wordText] = wordEntry.split("::");
                        const displayText = wordText
                          .replace(/\/.*?\//g, "")
                          .replace(/^\w/, (c) => c.toUpperCase());

                        return (
                          <li key={index} className="text-md">{displayText}</li>
                        );
                      })}
                    </ul>
                  )}
                </CardContent>
                <CardFooter>
                  <Link href={"/home/dictionary"}>
                    <Button variant="outline" className="cursor-pointer">View more</Button>
                  </Link>
                </CardFooter>
              </Card>
            )}
          </div>
        )}
      </div>

      <div data-guide="home-news" className="w-full lg:w-1/3 mt-6 lg:mt-0">
          <News />
      </div>
  </div>
      </div>
    </div>
  );
}

export default Page;
