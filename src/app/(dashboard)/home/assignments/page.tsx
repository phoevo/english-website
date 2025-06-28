"use client"
import React from 'react'
import UserGuidePopover from '../../userGuide'
import { ArrowRight } from 'lucide-react'

function AssignmentsPage() {
  return (
     <div className='m-10 flex flex-col'>
      <div className='space-y-5'>
       <UserGuidePopover
      id="assignments-page"
      title='The Assignments Page'
     description={
          <>
            The Assignments page is a shared workspace for both students and teachers,
            where teachers assign work and students can track and complete their work.
            Set your role in Settings <ArrowRight className="inline w-4 h-4" /> Account.
          </>
        }
         side="top"
          align="start"
        >
      <h1 className='text-3xl font-light'>Assignments</h1>
        </UserGuidePopover>

      <p className="text-zinc-500">A shared workspace for Students and Teachers.</p>


      </div>
    </div>
  )
}

export default AssignmentsPage
