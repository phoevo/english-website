"use client";

import { useUserStore } from "@/data/useUserStore";
import Link from "next/link";
import DailyChallenges from "./dailyChallenges";
import UserGuidePopover from "../userGuide";
import { Skeleton } from "@/components/ui/skeleton";


function Page() {
  const { user, recentConversations, loading } = useUserStore();

  const conversation = recentConversations[0]; // get the first one

  if (loading) {
    return (
      <div className="m-10 space-y-6">
        <Skeleton className="w-[300px] h-[32px]" />
        <Skeleton className="w-[400px] h-[15px]" />
        <Skeleton className="w-[392px] h-[82px] opacity-50 mt-5" />
        <Skeleton className="w-[392px] h-[82px] opacity-25" />
        <Skeleton className="w-[392px] h-[82px] opacity-15" />
      </div>
    );
  }

  return (
    <div className="w-full m-10 space-y-4">
      <div className="flex flex-row gap-3">

        <div className="flex flex-col w-2/3 space-y-4 h-full">
            <UserGuidePopover
             id="home-page-main"
             title="The Home Page"
             description="This is the main page where you can find recaps of your previous lessons, vocabulary as well as daily challenges.  "
             side="top"
             align="start"
            >
              <h1 className="text-3xl font-light">Welcome back, {user?.name || "Guest"}</h1>
            </UserGuidePopover>

            {!user ? (
              <p>
                Please <Link href="/login" className="underline">log in</Link> or{' '}
                <Link href="/register" className="underline">create an account</Link> for full Home page experience.
              </p>
            ) : (
              <p>Here&apos;s where you left off</p>
            )}


          <div className="flex flex-col">
          {user && (
            <div className="flex flex-col">
              {conversation ? (
                <Link
                  href={`home/conversations/${conversation.$id}`}
                  className="block border p-4 rounded-lg hover:bg-primary-foreground transition"
                >
                  <h2 className="text-lg font-light">{conversation.title}</h2>
                  {conversation.level && (
                    <p className="text-sm text-gray-500">Level: {conversation.level}</p>
                  )}
                </Link>
              ) : (
                <p className="text-zinc-400">No recent conversations to continue.</p>
              )}
            </div>
          )}
          </div>
        </div>


        <div className="w-1/3">
          <DailyChallenges />

        </div>

      </div>


    </div>
  );
}

export default Page;
