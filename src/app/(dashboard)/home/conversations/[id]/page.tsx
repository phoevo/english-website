"use client"; // Needed for useParams()
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import ContentDisplay from "../ContentDisplay";
import { loadConversation } from "@/data/conversation";
import { Skeleton } from "@/components/ui/skeleton";

export default function ConversationPage() {
  const params = useParams();

  // Assuming params.id will give you the conversation ID
  const conversationId = params.id ? (Array.isArray(params.id) ? params.id[0] : params.id) : "";

  const [conversation, setConversation] = useState<Conversation | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchConversation = async () => {
      if (conversationId) {
        try {
          setLoading(true);
          // Pass the conversationId (which is now just the number or string) to loadConversation
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

  if (loading) {
    return(
        <div className="bg-background flex flex-col justify-center items-center text-foreground h-full flex-1 rounded-lg">
      <div className="flex text-2xl justify-start pl-10 items-center border-b w-full h-15">
      <Skeleton className="h-6 w-[180px] border-b" />
      </div>

      <div className="flex flex-row flex-1 w-full">
        <div className="w-3/4 flex-1 border-b">
      <div className="mt-7 flex flex-row">
      <Skeleton className="ml-10 h-4 w-20"/>
      <span>
        <Skeleton className="ml-12 h-3 w-[800px]"/>
        <Skeleton className="ml-12 mt-3 h-3 w-[400px]"/>
      </span>
    </div>
    <div className="mt-13 flex flex-row">
      <Skeleton className="ml-10 h-4 w-20"/>
      <span>
        <Skeleton className="ml-12 h-3 w-[800px]"/>
        <Skeleton className="ml-12 mt-3 h-3 w-[400px]"/>
      </span>
    </div>
    </div>

        <div className="w-1/8 border-l pt-10">
          <div className="flex justify-center items-center">
            <div className="flex justify-center items-center gap-8 flex-col">
              <span className="flex gap-1 items-center justify-center">
               <Skeleton className="h-6 w-23"/>
              </span>

             <Skeleton className="h-4 w-30"/>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center w-full h-15">
          <Skeleton className="h-5 w-60"/>
        </div>
      </div>
    )}



  if (error) {
    return <div className="text-center p-10 text-red-500">{error}</div>;
  }

  return (
    <div className="flex flex-col w-full h-full">
       <ContentDisplay conversation={conversation} />
    </div>
  );
}
