"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

import ContentDisplay from "../ContentDisplay";
import TeacherContentDisplay from "../TeacherContentDisplay";

import { Conversation, loadConversation, loadPublicConversationPreview } from "@/data/conversation";
import { useUserStore } from "@/data/useUserStore";

import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";


export default function ConversationPage() {
  const params = useParams();

  const { user, loading: userLoading } = useUserStore();

  const conversationId = Array.isArray(params.id)
    ? params.id[0]
    : params.id ?? "";

  const [conversation, setConversation] =
    useState<Conversation | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [requiresPlus, setRequiresPlus] = useState(false);

  useEffect(() => {
    // Wait until authentication has finished loading.
    if (userLoading) {
      return;
    }

    let cancelled = false;

    const fetchConversation = async () => {
      if (!conversationId) {
        setError("Invalid conversation ID.");
        setConversation(null);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        setRequiresPlus(false);
        setConversation(null);

        const fetchedConversation = user
          ? await loadConversation(conversationId)
          : await loadPublicConversationPreview(conversationId);

        if (cancelled) {
          return;
        }

        if (!fetchedConversation) {
          setError("Conversation not found.");
          return;
        }

        setConversation(fetchedConversation);
      } catch (err) {
        if (cancelled) {
          return;
        }

        console.error(
          "Error loading conversation:",
          err
        );

        if ((err as { status?: number })?.status === 403) setRequiresPlus(true);
        else setError(err instanceof Error ? err.message : "Failed to load conversation.");
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchConversation();

    return () => {
      cancelled = true;
    };
  }, [
    conversationId,
    user,
    userLoading,
  ]);

  if (loading || userLoading) {
    return <ConversationLoadingSkeleton />;
  }

  if (error) {
    return (
      <div className="p-10 text-center text-red-500">
        {error}
      </div>
    );
  }

  if (requiresPlus) {
    return <main className="flex h-full w-full items-center justify-center px-6 text-foreground">
      <div className="max-w-md text-center ">
        <h1 className="text-2xl font-medium tracking-tight">This conversation is part of Plus.</h1>
        <p className="mt-3 text-sm leading-7 text-muted-foreground">Subscribe to unlock this conversation and the rest of the paid library.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link href="/pricing" className="inline-flex min-h-11 items-center rounded-md bg-foreground px-5 text-sm text-background">View plans</Link>
          <Link href="/home/conversations" className="inline-flex min-h-11 items-center rounded-md border border-border px-5 text-sm">Back to conversations</Link>
        </div>
      </div>
    </main>;
  }

  if (!conversation) {
    return (
      <div className="p-10 text-center text-muted-foreground">
        Conversation unavailable.
      </div>
    );
  }

  return (
  <div className="flex h-full w-full flex-col">
    {!user && (
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border bg-muted/50 px-4 py-3 text-sm">
        <p className="text-muted-foreground text-xs md:text-sm">{conversation.previewOnly
          ? `Previewing ${conversation.previewLineCount ?? 0} of ${conversation.totalLineCount ?? 0} lines. Create an account to continue.`
          : "Read this conversation for free. Create an account to save words, use word type highlighting and save progress."}</p>
        <Link href="/register">
        <Button className="" size={"sm"}>Sign up</Button>
        </Link>
      </div>
    )}

    <div className="min-h-0 flex-1">
      {!user ? (
        <TeacherContentDisplay conversation={conversation} />
      ) : (
        <ContentDisplay conversation={conversation} />
      )}
    </div>
  </div>
);

function ConversationLoadingSkeleton() {
  return (
    <div className="grid h-full w-full grid-rows-[auto_1fr] rounded-lg bg-background text-foreground">
      <div className="border-b px-10 py-4 text-2xl">
        <Skeleton className="h-8 w-50" />
      </div>

      <div className="grid h-full grid-cols-[6fr_1fr] overflow-hidden">
        <div className="flex h-full w-full flex-col gap-10 overflow-y-auto p-6">
          <SkeletonRow
            firstWidth="w-150"
            secondWidth="w-50"
          />

          <SkeletonRow
            firstWidth="w-200"
            secondWidth="w-100"
            className="opacity-25"
          />

          <SkeletonRow
            firstWidth="w-150"
            secondWidth="w-50"
            className="opacity-10"
          />
        </div>

        <div className="h-full border-l p-5">
          <div className="flex flex-col items-center gap-4">
            <Skeleton className="h-5 w-20" />
          </div>
        </div>
      </div>
    </div>
  );
}

type SkeletonRowProps = {
  firstWidth: string;
  secondWidth: string;
  className?: string;
};

function SkeletonRow({
  firstWidth,
  secondWidth,
  className = "",
}: SkeletonRowProps) {
  return (
    <div className={`flex flex-row ${className}`}>
      <Skeleton className="h-6 w-20" />

      <div className="ml-10 flex flex-col gap-1">
        <Skeleton
          className={`h-4 ${firstWidth}`}
        />
        <Skeleton
          className={`h-4 ${secondWidth}`}
        />
      </div>
    </div>
  );
}
};
