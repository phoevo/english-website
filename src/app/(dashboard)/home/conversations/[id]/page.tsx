"use client"; // Needed for useParams()
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import ContentDisplay from "../ContentDisplay";
import TeacherContentDisplay from "../TeacherContentDisplay";
import { loadConversation } from "@/data/conversation";
import { Skeleton } from "@/components/ui/skeleton";
import { Conversation } from "@/data/conversation";
import { useUserStore } from "@/data/useUserStore";

export default function ConversationPage() {
  const params = useParams();
  const { isTeacher, user, loading: userLoading } = useUserStore();

  const conversationId = params.id ? (Array.isArray(params.id) ? params.id[0] : params.id) : "";

  const [conversation, setConversation] = useState<Conversation | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchConversation = async () => {
      if (conversationId) {
        try {
          setLoading(true);
          const fetchedConversation = await loadConversation(conversationId);

          if (fetchedConversation) {
            setConversation(fetchedConversation);
          } else {
            setError("Conversation not found.");
          }
        } catch (err) {
          console.error("Error loading conversation:", err);
          setError("Failed to load conversation.");
        } finally {
          setLoading(false);
        }
      } else {
        setError("Invalid conversation ID.");
        setLoading(false);
      }
    };

    fetchConversation();
  }, [conversationId]);

  if (loading || userLoading) {
    return(
      <div className="grid grid-rows-[auto_1fr] h-full w-full bg-background text-foreground rounded-lg">

      <div className="border-b px-10 py-4 text-2xl">
        <Skeleton className="w-50 h-8"/>
      </div>


      <div className="grid grid-cols-[6fr_1fr] overflow-hidden h-full">
        <div className="h-full w-full overflow-y-auto p-6 flex flex-col gap-10">

        <div className="flex flex-row">
        <Skeleton className="w-20 h-6"/>

        <div className="flex flex-col gap-1 ml-10">
          <Skeleton className="w-150 h-4"/>
          <Skeleton className="w-50 h-4"/>
        </div>

        </div>

        <div className="flex flex-row opacity-25">
        <Skeleton className="w-20 h-6"/>

        <div className="flex flex-col gap-1 ml-10">
          <Skeleton className="w-200 h-4"/>
          <Skeleton className="w-100 h-4"/>
        </div>

        </div>

        <div className="flex flex-row opacity-10">
        <Skeleton className="w-20 h-6"/>

        <div className="flex flex-col gap-1 ml-10">
          <Skeleton className="w-150 h-4"/>
          <Skeleton className="w-50 h-4"/>
        </div>

        </div>



        </div>






        <div className="p-5 h-full border-l-1">
          <div className="flex flex-col items-center gap-4">
            <span className="flex gap-1 items-center">
              <Skeleton className="w-20 h-5"/>
            </span>

          </div>
        </div>
      </div>
      </div>
    )}



  if (error) {
    return <div className="text-center p-10 text-red-500">{error}</div>;
  }

  return (
    <div className="flex flex-col w-full h-full">
      {user?.isTeacher ? (
        <TeacherContentDisplay conversation={conversation} />
      ) : (
        <ContentDisplay conversation={conversation} />
      )}
    </div>
  );
}
