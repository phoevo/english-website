"use client"; // Needed for useParams()
import { useParams } from "next/navigation";
import ContentDisplay from "../ContentDisplay";


export default function ConversationPage() {
  const params = useParams();
  const conversationId = params.id ? (Array.isArray(params.id) ? params.id[0] : params.id) : "";

  // Simulated conversation data (Replace with API call if needed)
  const conversations: Record<string, { title: string; content: string }> = {
    "1": { title: "Introductions", content: "This is the first conversation." },
    "2": { title: "Conversation 2", content: "This is the second conversation." },
    "3": { title: "Conversation 3", content: "This is the third conversation." },
  };

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
