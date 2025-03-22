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

export default function ContentDisplay() {
  return (
    <div className="bg-background flex flex-col justify-center items-center
    text-foreground h-full flex-1 rounded-lg">

      <div className='flex justify-start pl-10 items-center border-1 w-full h-15 border-1 rounded-lg'>
        Title of conversation
      </div>

      <div className='border-1 w-full flex-1 border-1 m-1 rounded-lg'>
        conversation
      </div>

      <div className='flex items-center border-1 w-full h-15 rounded-lg'>
      <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" isActive >1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" isActive>
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
