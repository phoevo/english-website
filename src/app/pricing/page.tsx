"use client"
// import { useState } from 'react'
import { CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Geist, DM_Sans } from 'next/font/google'
import Link from 'next/link'
import { useUserStore } from '@/data/useUserStore'
// import { subscribeUser } from '@/data/getData'
// import { toast } from 'sonner'
import {
  Card,
  CardFooter,
} from "@/components/ui/card"

// import { useRouter } from 'next/navigation';
import { ScrollArea } from '@/components/ui/scroll-area'
import { ArrowDown, Briefcase, CircleArrowDown, CircleArrowUp, Notebook, User } from 'lucide-react'
import { motion } from "motion/react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import Student from './Student'
import Tutor from './Tutor'
import Enterprise from './Enterprise'


const dmSans = DM_Sans({ subsets: ['latin'] });

type Tier = {
  tutorBadge: string;
  studentBadge: string;
  features: { icon: React.ReactNode; text: string }[];
};

const tiers: Tier[] = [
  {
    tutorBadge: "Tutor Free",
    studentBadge: "Student Free",
    features: [
      { icon: <CircleArrowUp size={18} className="text-green-500" />, text: "Tutors can assign any conversation." },
      { icon: <CircleArrowDown size={18} className="flex text-red-500 shrink-0" />, text: "Students can view pro conversations, but only when assigned by a tutor. Limited features (no audio)" },
      { icon: <CircleArrowDown size={18} className="text-red-500" />, text: "Tutors limited to 2 active student slots." },
    ],
  },
  {
    tutorBadge: "Free",
    studentBadge: "Pro",
    features: [
      { icon: <CircleArrowUp size={18} className="text-green-500" />, text: "Tutors can assign any conversation." },
      { icon: <CircleArrowUp size={18} className="text-green-500" />, text: "Students can view every conversation with pro features." },
      { icon: <CircleArrowDown size={18} className="text-red-500" />, text: "Tutors still limited to 2 active student slots." },
    ],
  },
  {
    tutorBadge: "Pro",
    studentBadge: "Free",
    features: [
      { icon: <CircleArrowUp size={18} className="text-green-500" />, text: "Tutors can assign any conversation." },
      { icon: <CircleArrowDown size={18} className="text-red-500 shrink-0" />, text: "Students can view pro conversations, but only when assigned by a tutor. Limited features (no audio)" },
      { icon: <CircleArrowUp size={18} className="text-green-500" />, text: "Tutors can manage unlimited active students." },
    ],
  },
  {
    tutorBadge: "Pro",
    studentBadge: "Pro",
    features: [
      { icon: <CircleArrowUp size={18} className="text-green-500" />, text: "Tutors can assign any conversation." },
      { icon: <CircleArrowUp size={18} className="text-green-500" />, text: "Students can view every conversation with pro features." },
      { icon: <CircleArrowUp size={18} className="text-green-500" />, text: "Tutors can manage unlimited active students." },
    ],
  },
];


function renderTier(tier: Tier, idx: number) {
  const studentIsPro = tier.studentBadge === "Pro";
  const tutorIsPro = tier.tutorBadge === "Pro";

  return (
    <CardContent key={idx} className='flex flex-col md:flex-row items-center justify-center gap-4 p-4'>

    <div className='flex flex-row'>

      <div className='w-auto flex flex-col items-center'>
        <div className='flex items-center justify-center relative p-3 md:p-5'>
          <User strokeWidth={1} size={60} className="md:w-[90px] md:h-[90px]" />
          <Notebook className="absolute bottom-3 md:bottom-5 ml-6 md:ml-10 bg-background z-10" size={20} />
        </div>
        <Badge className={studentIsPro ? "bg-pink-500" : ""}>{tier.studentBadge}</Badge>
      </div>

      <div className='w-auto flex flex-col items-center'>
        <div className='flex items-center justify-center relative p-3 md:p-5'>
          <User strokeWidth={1} size={60} className="md:w-[90px] md:h-[90px]" />
          <Briefcase className="absolute bottom-1 md:bottom-4 ml-6 md:ml-10 bg-background z-10" size={25} />
        </div>
        <Badge className={tutorIsPro ? "bg-pink-500" : ""}>{tier.tutorBadge}</Badge>
      </div>

    </div>



      <div className='flex items-center justify-start relative w-full md:w-2/3'>
        <ul className='text-xs md:text-sm space-y-2'>
{tier.features.map((f, i: number) => (
            <li key={i} className='flex flex-row gap-1 items-center'>
              {f.icon}
              <span className="text-left">{f.text}</span>
            </li>
          ))}
        </ul>
      </div>

    </CardContent>
  );
}






function SubscribePage() {
  const {isSubscribed, user} = useUserStore();



// earlyPaidOptions removed (unused)






  return (

    <ScrollArea className={`w-full h-screen overflow-y-auto ${dmSans.className}`}>
    <div className='flex flex-col justify-center items-center gap-2 mb-15 lg:mb-0 p-4 md:p-10'>


    <div className="flex flex-col md:flex-col gap-2 items-center justify-center rounded-lg w-full h-auto ">
      <h1 className='text-3xl md:text-6xl font-normal text-center'>Choose your plan, first <span className='text-pink-500'>5</span> days are free</h1>
      <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0, delay: 0 }}
      className='text-sm md:text-lg text-muted-foreground p-2 text-center mx-4'>During early access, rates will be lower while the platform is being polished</motion.div>
    </div>


 <div className='flex justify-center flex-col lg:flex-row w-full md:w-full lg:w-full mt-10 gap-5 md:gap-10'>

  <div className="flex xl:w-1/2 lg:w-full flex-col gap-6">
      <Tabs className="" defaultValue="Students">
        <TabsList className='self-center'>
          <TabsTrigger value="Students">Students</TabsTrigger>
          <TabsTrigger value="Tutors">Tutors</TabsTrigger>
          <TabsTrigger value="Enterprise">Enterprise</TabsTrigger>

        </TabsList>
        <TabsContent value="Students">

          <Student/>

        </TabsContent>
        <TabsContent value="Tutors">

          <Tutor/>

        </TabsContent >

        <TabsContent value='Enterprise'>
          <Enterprise />


        </TabsContent>
      </Tabs>
    </div>








</div>


<Card className='h-auto w-full lg:w-2/3 mb-5 bg-background shadow-md'>
  <CardHeader>
    <CardTitle className='text-lg md:text-2xl'>More about Pricing and Subscriptions</CardTitle>
    <CardDescription className='text-sm md:text-base'>How Students and Tutors interact depends on who owns a subscription</CardDescription>
  </CardHeader>

  {tiers.map(renderTier)}
</Card>


</div>


</ScrollArea>


  )
}

export default SubscribePage