import React from 'react'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"


interface ConversationProps {
  conversation: {
    title: string;
    content: string;
  };
}

export default function ContentDisplay({conversation}: ConversationProps) {


  return (
    <div className="bg-background flex flex-col justify-center items-center
    text-foreground h-full flex-1 rounded-lg">

      <div className='flex text-2xl justify-start pl-10 items-center border-b w-full h-15'>
      {conversation.title}
      </div>

      <div className='w-full flex-1 border-b m-1 p-10'>
        {conversation.content}
      </div>

      <div className='flex items-center w-full h-15'>
      <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" isActive >1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">
            2
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">3</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" />
        </PaginationItem>
      </PaginationContent>
        </Pagination>

      </div>


    </div>
  )
}
