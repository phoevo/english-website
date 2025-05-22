"use client";

import { useUserStore } from "@/data/useUserStore";
import Link from "next/link";
import DailyChallenges from "./dailyChallenges";
import UserGuidePopover from "../userGuide";


function Page() {
  const { user, recentConversations } = useUserStore();

  const conversation = recentConversations[0]; // get the first one

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

            <p className="text-zinc-500">Here&apos;s where you left off</p>


          <div className="flex flex-col">
          {conversation ? (
            <Link
              href={`home/conversations/${conversation.$id}`}
              className="block border p-4 rounded-lg hover:bg-primary-foreground transition"
            >
              <h2 className="text-lg font-light">{conversation.title}</h2>
              {conversation.level && <p className="text-sm text-gray-500">Level: {conversation.level}</p>}
            </Link>
          ) : (
            <p className="text-zinc-400">No recent conversations to continue.</p>
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
