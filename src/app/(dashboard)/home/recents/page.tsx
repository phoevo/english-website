"use client";

import { useState } from "react";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { IterationCcw, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useUserStore } from "@/data/useUserStore";
import { updateMyProfile } from "@/data/accountActions";
import GuideTour, { type GuideStep } from "../../GuideTour";
import ConversationRow from "../conversations/ConversationRow";
import DashboardPage from "@/components/dashboard/DashboardPage";
import { dashboardStyles } from "@/components/dashboard/styles";

const recentsGuideSteps: GuideStep[] = [
  { target: "recents-title", title: "Recent Conversations", description: "Conversations you interact with are saved here for quick access." },
  { target: "recents-list", title: "Your recents", description: "Open a conversation to continue reading, or remove it from your list." },
];



function RecentsPage() {
  const { user, loading, recentConversations, setRecentConversations, completeConversations } = useUserStore();
  const [, setDeletingId] = useState<string | null>(null);


  const handleDelete = async (conversationId: string) => {
    if (!user?.$id) return;

    setDeletingId(conversationId);

    try {
      const profile = await updateMyProfile({ kind: "conversation.remove", conversationId });
      setRecentConversations(recentConversations.filter(item => profile.recentConversations.includes(item.$id)));
    } catch (error) {
      console.error("Failed to update recent conversations:", error);
    } finally { setDeletingId(null); }
  };

  if (loading) {
    return <DashboardPage ready={false}><div role="status" aria-busy="true" aria-label="Loading recent conversations" className="space-y-5">
      <span className="sr-only">Loading...</span>
      <div aria-hidden="true" className="space-y-3">
        <Skeleton className="h-9 w-64 max-w-full" />
        <Skeleton className="h-4 w-80 max-w-full" />
      </div>
      <div aria-hidden="true" className="mt-9 space-y-3">
        {["", "opacity-70", "opacity-40", "opacity-20", "opacity-10"].map((fade, index) => <div key={index} className={`flex min-h-[82px] items-center justify-between rounded-xl border border-border bg-background px-4 py-4 ${fade}`}>
          <div className="flex-1 space-y-3 border-r border-border pr-4"><Skeleton className="h-5 w-2/3" /><Skeleton className="h-4 w-16" /></div>
          <Skeleton className="ml-4 size-6 shrink-0 rounded-md" />
        </div>)}
      </div>
    </div></DashboardPage>;
  }

  if (!user) {
    return <DashboardPage><header data-dashboard-intro><h1 className={dashboardStyles.heading}>Recent conversations</h1><p className={dashboardStyles.description}>Conversations you have opened recently.</p></header><p data-dashboard-entry className="mt-8 text-sm leading-7 text-muted-foreground">Please <Link href="/login" className="text-foreground underline underline-offset-4">log in</Link> or <Link href="/register" className="text-foreground underline underline-offset-4">create an account</Link> to view your recent conversations.</p></DashboardPage>;
  }

  return (
    <DashboardPage ready={!loading}>
      <GuideTour id="recents-page" steps={recentsGuideSteps} />
      <header data-guide="recents-title" data-dashboard-intro className="shrink-0">
        <h1 className={dashboardStyles.heading}>Recent conversations</h1>
        <p className={dashboardStyles.description}>Conversations you have opened recently.</p>
      </header>

    <div data-guide="recents-list" className="mt-6 min-h-0 flex-1 overflow-y-auto pr-1">
      {recentConversations.length > 0 ? (
        <div className="max-w-4xl space-y-2">
          <AnimatePresence>
            {recentConversations.map((conversation) => (
              <motion.div
              key={conversation.$id}
              data-dashboard-entry
              layout
              whileHover={{ scale: 1.005 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.16, ease: "easeOut" }}
            >
              <div className={dashboardStyles.card + " flex items-center justify-between gap-4 px-4 py-3.5 sm:px-5"}>
                <Link
                  href={`conversations/${conversation.$id}`}
                  className="flex min-w-0 flex-1 border-r border-border pr-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground"
                >
                  <ConversationRow title={conversation.title} level={conversation.level} category={conversation.category} isComplete={completeConversations.includes(conversation.$id)} />
                </Link>


                <Button
                  variant="destructive"
                  size="icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    handleDelete(conversation.$id);
                  }}
                  aria-label={`Remove ${conversation.title} from recent conversations`}
                  className="h-5 w-5 shrink-0 self-center cursor-pointer"
                >
                  <motion.div whileHover={{ rotate: 90 }} transition={{ duration: 0.1 }}>
                    <X className="size-4" />
                  </motion.div>
                </Button>
              </div>
              </motion.div>

            ))}
          </AnimatePresence>
        </div>
      ) : (
          <div data-dashboard-entry className={dashboardStyles.card + " flex min-h-64 flex-col items-center justify-center p-8 text-center"}>
              <IterationCcw
                className="text-muted-foreground mb-3"
                size={32}
              />

              <p className="font-medium tracking-[-.02em]">
                No recent conversations yet.
              </p>

              <p className="mt-2 max-w-sm text-sm leading-7 text-muted-foreground">
                Open a conversation from the library and it will appear here for quick access.
              </p>
              <Link href="/home/conversations" className={dashboardStyles.textLink + " mt-4"}>Browse conversations</Link>
            </div>
      )}

    </div>
    </DashboardPage>

  );
}

export default RecentsPage;
