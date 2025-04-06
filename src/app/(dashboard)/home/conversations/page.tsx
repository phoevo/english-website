"use client";
import React from "react";
import ConversationCover from "./ConversationCover";

function ConversationsPage() {
  return (
    <div className="grid grid-cols-2 p-7 gap-5 max-h-80 md:grid-cols-3 lg:grid-cols-4">
      <ConversationCover conversationTitle="Conversation 1" conversationPrice={10} conversationId="1" />
      <ConversationCover conversationTitle="Conversation 2" conversationPrice={20} conversationId="2" />
      <ConversationCover conversationTitle="Conversation 3" conversationPrice={30} conversationId="3" />
      <ConversationCover conversationTitle="Conversation 4" conversationPrice={30} conversationId="4" />




    </div>
  );
}

export default ConversationsPage;
