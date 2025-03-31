"use client";
import React from "react";
import ConversationCover from "./ConversationCover";

function ConversationsPage() {
  return (
    <div className="flex w-full m-10 gap-10">
      <ConversationCover conversationTitle="Conversation 1" conversationPrice={10} conversationId="1" />
      <ConversationCover conversationTitle="Conversation 2" conversationPrice={20} conversationId="2" />
      <ConversationCover conversationTitle="Conversation 3" conversationPrice={30} conversationId="3" />
    </div>
  );
}

export default ConversationsPage;
