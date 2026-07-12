"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import ContentDisplay from "../ContentDisplay";
import TeacherContentDisplay from "../TeacherContentDisplay";

import {
  Conversation,
  loadConversation,
} from "@/data/conversation";
import { useUserStore } from "@/data/useUserStore";
import { isConversationAssignedToStudent } from "@/data/appwrite";

import { Skeleton } from "@/components/ui/skeleton";

export default function ConversationPage() {
  const params = useParams();

  const {
    isTeacher,
    user,
    loading: userLoading,
  } = useUserStore();

  const conversationId = Array.isArray(params.id)
    ? params.id[0]
    : params.id ?? "";

  const [conversation, setConversation] =
    useState<Conversation | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
        setConversation(null);

        const fetchedConversation =
          await loadConversation(conversationId);

        if (cancelled) {
          return;
        }

        if (!fetchedConversation) {
          setError("Conversation not found.");
          return;
        }

        /*
         * Anonymous users can view the limited version.
         *
         * Authorization checks below only apply to
         * authenticated users.
         */
        if (user) {
          const requiresProAccess =
            fetchedConversation.isPro &&
            !user.isSubscribed &&
            !isTeacher;

          if (requiresProAccess) {
            const assigned =
              await isConversationAssignedToStudent(
                user.$id,
                conversationId
              );

            if (cancelled) {
              return;
            }

            if (!assigned) {
              setError(
                "This is a Pro conversation. It must be assigned by your tutor or you need a subscription to access."
              );
              return;
            }
          }
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

        setError("Failed to load conversation.");
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
    isTeacher,
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
      <div className="border-b border-red-500 bg-red-300 dark:border-red-100 dark:bg-red-400 px-4 py-2 text-sm text-foreground">
        No user is logged in. Displaying limited features.
      </div>
    )}

    <div className="min-h-0 flex-1">
      {!user || isTeacher ? (
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