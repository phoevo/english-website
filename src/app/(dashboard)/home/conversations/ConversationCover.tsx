"use client";
import React from 'react';
import { motion } from 'motion/react';

interface ConversationCoverProps {
  conversationTitle: string;
  conversationPrice: number;
}
console.log("Motion import:", motion);

function ConversationCover({ conversationTitle, conversationPrice }: ConversationCoverProps) {
  return (
    <motion.div
      className='bg-secondary border-2 h-80 w-80 rounded-lg cursor-pointer'
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.1 }}>

      <div className='flex justify-center items-center bg-background border-1 rounded-lg m-5 h-50'>Sample Image</div>
      <div className='flex flex-col justify-center items-center'>
        <div className='font-semibold'>{conversationTitle}</div>
        <div className='italic text-zinc-500'>{conversationPrice}</div>
      </div>

    </motion.div>
  );
}

export default ConversationCover;
