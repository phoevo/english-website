"use client";

import { useRef, useState } from "react";
import { LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { updateRecentConversations } from "@/data/updateRecentConversations";
import { useUserStore } from "@/data/useUserStore";
import { dashboardStyles } from "@/components/dashboard/styles";
import { cn } from "@/lib/utils";
import ConversationRow from "./ConversationRow";

interface ConversationCoverProps {
  conversationTitle: string;
  conversationDescription: string;
  conversationId: string;
  level: string;
  category: string;
  isPro: boolean;
}

export default function ConversationCover({ conversationTitle, conversationDescription, conversationId, level, category, isPro }: ConversationCoverProps) {
  const completeConversations = useUserStore(state => state.completeConversations);
  const user = useUserStore(state => state.user);
  const isSubscribed = useUserStore(state => state.isSubscribed);
  const isComplete = completeConversations.includes(conversationId);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const opening = useRef(false);

  async function handleClick() {
    if (opening.current) return;
    if (isPro && !isSubscribed) {
      router.push("/pricing");
      return;
    }
    opening.current = true;
    setIsLoading(true);
    let navigating = false;
    try {
      if (user) await updateRecentConversations({ userId: user.$id, conversationId });
      router.push(`/home/conversations/${conversationId}`);
      navigating = true;
    } catch (error) {
      console.error("Error opening conversation:", error);
      toast.error("Couldn’t open this conversation. Please try again.");
    } finally {
      if (!navigating) { opening.current = false; setIsLoading(false); }
    }
  }

  return <article data-dashboard-entry className={cn(dashboardStyles.card, "group relative min-w-0 overflow-hidden transition-colors hover:border-foreground/35 motion-reduce:transition-none")}>
    <button type="button" onClick={handleClick} disabled={isLoading} aria-busy={isLoading} aria-label={isLoading ? `Opening ${conversationTitle}` : `Open ${conversationTitle}`}
      className="flex w-full cursor-pointer items-center gap-4 px-4 py-3.5 text-left focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-foreground disabled:cursor-default sm:px-5">
      <ConversationRow title={conversationTitle} level={level} category={category} description={conversationDescription} isPro={isPro} isComplete={isComplete} />
      {isLoading && <span role="status" className="shrink-0 text-muted-foreground"><LoaderCircle size={18} className="animate-spin motion-reduce:animate-none" aria-hidden="true" /></span>}
    </button>
  </article>;
}
