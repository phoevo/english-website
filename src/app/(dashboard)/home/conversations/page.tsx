"use client";
import React from 'react'
import ConversationCover from './ConversationCover'




function page() {
  return (
    <div className='flex w-full m-10 gap-10'>
      <ConversationCover conversationTitle='Conversation 1' conversationPrice={10} />
      <ConversationCover conversationTitle='Conversation 2' conversationPrice={10} />

    </div>
  )
}

export default page
