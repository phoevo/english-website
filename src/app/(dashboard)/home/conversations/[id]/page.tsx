"use client"; // Needed for useParams()
import { useParams } from "next/navigation";
import ContentDisplay from "../ContentDisplay";
import { conversations } from "@/data/conversation";


export default function ConversationPage() {
  const params = useParams();
  const conversationId = params.id ? (Array.isArray(params.id) ? params.id[0] : params.id) : "";
  const conversation = conversations[conversationId];

  // Handle case where conversation doesn't exist
  if (!conversation) {
    return <div className="text-center p-10 text-red-500">Conversation not found.</div>;
  }

  return (
    <div className="flex flex-col w-full h-full">


      {/* ContentDisplay can still be used for pagination or other shared content */}
      <ContentDisplay conversation={conversation}/>
    </div>
  );
}
