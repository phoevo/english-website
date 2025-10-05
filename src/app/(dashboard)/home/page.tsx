"use client";

import { useUserStore } from "@/data/useUserStore";
import Link from "next/link";
// import DailyTasks from "./dailyTasks";
import UserGuidePopover from "../userGuide";
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
import { DM_Sans } from "next/font/google";
import { ArrowLeft, Calendar, Sword, Swords } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const dmSans = DM_Sans({ subsets: ['latin'] });

function getLastActive(value: unknown): string | null {
  if (value && typeof value === 'object' && 'lastActive' in value) {
    const v = (value as { lastActive?: unknown }).lastActive;
    return typeof v === 'string' ? v : null;
  }
  return null;
}

function Page() {
  const { user, recentConversations, loading, dictionaryWords, friends, isTeacher } = useUserStore();

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
    )
    .slice(0, 5);

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
    <div className="w-full mx-auto px-4 sm:px-6 lg:px-10 mt-6">
      <div className="flex flex-col gap-3">
        <div className="flex flex-col w-full lg:w-2/3 space-y-4 h-full">
            <UserGuidePopover
             id="home-page-main"
             title="The Home Page"
             content=
             {<div className="space-y-4">
                <p>This is the main page where you can find your most recent conversation and
             vocabulary, as well as News and Updates.</p>

                <div className="space-y-2">
                  <p>On the top right or in the sidebar if you&apos;re on mobile, you can see your tasks and challenges, click on each one for more info.</p>
                <div className="flex flex-row gap-2">
                  <Button variant="secondary" className="items-center lg:w-auto shadow-sm cursor-pointer">
                    <Sword className="rotate-45" />8
                  </Button>
                  <Button className="flex items-center lg:w-auto cursor-pointer">
                  <Swords/>3
                </Button>
                </div>
                </div>

                <div>
                  <p>During the beta, you will be able to switch from Free to Pro for testing purposes.</p>
                  <div className="flex flex-row rounded-full border-1 m-1 w-20">
                  <Badge className="flex-1 text-center rounded-full cursor-pointer transition bg-background text-muted-foreground">
                    Free
                  </Badge>

                  <Badge className="flex-1 text-center rounded-full cursor-pointer transition bg-pink-500 text-foreground">
                    Pro
                  </Badge>
                </div>
                </div>
                  <p>Use the sidebar on the left side of the screen to explore the content.</p>
                  <ArrowLeft className="text-foreground"/>
             </div>

             }
             side="top"
             align="start"
            >
              {user ? (
                 <h1 className={`text-2xl sm:text-3xl ${dmSans.className}`}>Welcome back, {user.name}</h1>
              ): <h1 className={`text-2xl sm:text-3xl ${dmSans.className}`}>Welcome, New User</h1>}

            </UserGuidePopover>

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
              <Card className="bg-background">
              <CardHeader>
                <CardTitle>Most recent conversation</CardTitle>
              </CardHeader>
              <CardContent>
                 {conversation ? (
                <Link
                  href={`home/conversations/${conversation.$id}`}
                  className="block border p-4 rounded-lg shadow-sm hover:bg-primary-foreground transition"
                >
                  <h2 className="text-lg font-light">Resume: {conversation.title}</h2>
                  {conversation.level && (
                    <p className="text-sm text-gray-500">Level: {conversation.level}</p>
                  )}
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
                  <CardDescription>Students who have been active recently</CardDescription>
                </CardHeader>
                <CardContent>
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
                          <li key={index} className="flex justify-between items-center p-3 rounded-lg border hover:bg-muted/50 transition-colors">
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
                                    <Badge className="text-foreground bg-pink-500 border-none">Pro</Badge>
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

      <div className="w-full lg:w-1/3 mt-6 lg:mt-0">
          <News />
      </div>
  </div>
      </div>
    </div>
  );
}

export default Page;
