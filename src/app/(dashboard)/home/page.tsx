"use client";

import { useUserStore } from "@/data/useUserStore";
import Link from "next/link";
import DailyTasks from "./dailyTasks";
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


function Page() {
  const { user, recentConversations, loading, dictionaryWords } = useUserStore();

  const conversation = recentConversations[0]; // get the first one
  const firstFiveWords = [...dictionaryWords].reverse().slice(0, 5);


  if (loading) {
    return (
      <div className="m-10 space-y-6 w-full">
        <Skeleton className="w-[300px] h-[32px]" />
        <Skeleton className="w-[400px] h-[15px]" />
        <Skeleton className="w-2/3 h-1/3 opacity-50 mt-5" />
        <Skeleton className="w-2/3 h-1/3 opacity-25" />
        <Skeleton className="w-[392px] h-[82px] opacity-15" />
      </div>
    );
  }

  return (
    <div className="w-full m-10">
      <div className="flex flex-col gap-3">
        <div className="flex flex-col w-2/3 space-y-4 h-full">
            <UserGuidePopover
             id="home-page-main"
             title="The Home Page"
             description="This is the main page where you can find a recap of your previous conversation and
             vocabulary as well as daily challenges."
             side="top"
             align="start"
            >
              {user ? (
                 <h1 className="text-3xl font-normal">Welcome back, {user.name}</h1>
              ): <h1 className="text-3xl font-normal">Welcome, New User</h1>}

            </UserGuidePopover>

            {!user ? (
              <p>
                Please <Link href="/login" className="underline">log in</Link> or{' '}
                <Link href="/register" className="underline">create an account</Link> for full Home page experience.
              </p>
            ) : (
              <p className="text-zinc-500">Here&apos;s where you left off</p>
            )}
            </div>

          <div className="flex flex-row gap-4">
          <div className="flex flex-col w-2/3">
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
                <p className="text-zinc-400">No recent conversations to continue.</p>
              )}
              </CardContent>
              <CardFooter>
                <Link href={"/home/recents"}>
                 <Button variant="outline" className="cursor-pointer">View more</Button>
                </Link>

              </CardFooter>
            </Card>


            <Card className="bg-background">
              <CardHeader>
                <CardTitle>Recently saved words</CardTitle>
                <CardDescription>Just to jog your memory</CardDescription>
              </CardHeader>
              <CardContent>
                {firstFiveWords.length === 0 ? (
                  <p className="text-zinc-500">No words added yet.</p>
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
          </div>
        )}
      </div>

      <div className="w-1/3">
          <News />
      </div>
  </div>
      </div>
    </div>
  );
}

export default Page;
