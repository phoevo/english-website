"use client";

import { useUserStore } from "@/data/useUserStore";
import Link from "next/link";
import DailyChallenges from "./dailyChallenges";

function Page() {
  const { user, recentConversations } = useUserStore();

  const conversation = recentConversations[0]; // get the first one

  return (
    <div className="w-full m-10 space-y-4">
      <div className="flex flex-row gap-9">
        <div className="flex flex-grow flex-col w-1/3 space-y-4 h-full border-r-1">

            <h1 className="text-3xl font-light">Welcome back, {user?.name || "Guest"}</h1>
            <p className="text-zinc-500">Here&apos;s where you left off</p>


          <div className="flex flex-col w-98">
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
              <DailyChallenges/>
        </div>

      </div>








    </div>
  );
}

export default Page;
