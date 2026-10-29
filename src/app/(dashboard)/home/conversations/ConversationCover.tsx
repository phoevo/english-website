"use client";

import { useRef, useState } from "react";
import { ArrowUpRight, Check, LoaderCircle, Send, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { updateRecentConversations } from "@/data/updateRecentConversations";
import { useUserStore } from "@/data/useUserStore";
import { getConversationFromDB, isConversationAssignedToStudent } from "@/data/appwrite";
import { dashboardStyles } from "@/components/dashboard/styles";
import { cn } from "@/lib/utils";
import Assign from "./Assign";

interface ConversationCoverProps {
  conversationTitle: string;
  conversationDescription: string;
  conversationId: string;
  level: string;
  audioFileId: string;
  category: string;
  isPro: boolean;
}

export default function ConversationCover({ conversationTitle, conversationDescription, conversationId, level, category, isPro }: ConversationCoverProps) {
  const completeConversations = useUserStore(state => state.completeConversations);
  const user = useUserStore(state => state.user);
  const isTeacher = useUserStore(state => state.isTeacher);
  const isComplete = completeConversations.includes(conversationId);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const opening = useRef(false);

  async function handleClick() {
    if (opening.current) return;
    if (!user) {
      toast.error("No user detected. Please sign in to view this conversation.");
      return;
    }
    opening.current = true;
    setIsLoading(true);
    let navigating = false;
    try {
      const conversation = await getConversationFromDB(conversationId);
      if (!conversation) { toast.error("Conversation not found."); return; }
      // Preserve the existing subscription and assignment access checks.
      if (conversation.isPro && !user.isSubscribed && !isTeacher) {
        const assigned = await isConversationAssignedToStudent(user.$id, conversationId);
        if (!assigned) {
          toast("This is a Pro conversation. It must be assigned by your tutor or you need a subscription.");
          return;
        }
      }
      await updateRecentConversations({ userId: user.$id, conversationId });
      router.push(`/home/conversations/${conversationId}`);
      navigating = true;
    } catch (error) {
      console.error("Error opening conversation:", error);
      toast.error("Couldn’t open this conversation. Please try again.");
    } finally {
      if (!navigating) { opening.current = false; setIsLoading(false); }
    }
  }

  return <article data-dashboard-entry className={cn(dashboardStyles.card, "group relative h-full min-w-0 overflow-hidden transition-colors hover:border-foreground/35 motion-reduce:transition-none")}>
    <button type="button" onClick={handleClick} disabled={isLoading} aria-busy={isLoading} aria-label={isLoading ? `Opening ${conversationTitle}` : `Open ${conversationTitle}`}
      className="flex h-full min-h-[220px] w-full cursor-pointer flex-col p-5 text-left focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-foreground disabled:cursor-default sm:min-h-[240px] xl:p-6">
      <h2 className={cn("w-full border-b border-border pb-3 text-base font-medium leading-snug tracking-[-.02em]", isTeacher && "pr-20")}>{conversationTitle}</h2>
      <div className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1.5 text-xs">
        <span>{level}</span><span className="text-muted-foreground">{category}</span>
        {isComplete && <span className="inline-flex text-green-500" title="Completed"><Check size={15} strokeWidth={2.5} aria-hidden="true" /><span className="sr-only">Completed</span></span>}
        {isPro && <span className="inline-flex text-pink-500" title="Plus conversation"><Sparkles size={14} aria-hidden="true" /><span className="sr-only">Plus conversation</span></span>}
      </div>
      <p className="mt-5 line-clamp-3 text-sm leading-7 text-muted-foreground">{conversationDescription}</p>
      <span className="mt-auto flex w-full items-end justify-between gap-3 pt-6 text-xs text-muted-foreground">
        {isLoading && <span role="status"><LoaderCircle size={18} className="animate-spin motion-reduce:animate-none" aria-hidden="true" />
        </span>}
      </span>
    </button>
    {isTeacher && <div className="absolute top-5 right-5 xl:top-6 xl:right-6">
      <Assign conversationId={conversationId} trigger={<button type="button" disabled={isLoading} aria-label={`Assign ${conversationTitle}`} className="inline-flex cursor-pointer items-center gap-1.5 rounded-md border border-border bg-background px-2 py-1 text-[10px] text-muted-foreground hover:border-foreground/40 hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"><Send size={12} aria-hidden="true" />Assign</button>} />
    </div>}
  </article>;
}
