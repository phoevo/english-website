"use client"
// import { useState } from 'react'
import { CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import React, { useEffect } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Geist, DM_Sans } from 'next/font/google'
import Link from 'next/link'
import { useUserStore } from '@/data/useUserStore'
import { account } from '@/data/appwrite'
import {
  Card,
} from "@/components/ui/card"

import { ScrollArea } from '@/components/ui/scroll-area'
import { Briefcase, CircleArrowDown, CircleArrowUp, Notebook, User } from 'lucide-react'
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
import ModeToggle from '@/components/ui/ModeToggle'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import LoginChecker from '../(auth)/login/loginChecker'


const dmSans = DM_Sans({ subsets: ['latin'] });
const geist = Geist({ subsets: ['latin'] });

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
      { icon: <CircleArrowDown size={18} className="text-red-500" />, text: "Tutors can screenshare conversations only." },
      { icon: <CircleArrowDown size={18} className="text-red-500" />, text: "Students have limited features (Limited conversations, no audio and others.)." },
      { icon: <CircleArrowDown size={18} className="text-red-500" />, text: "Tutors: No assignments or progress tracking." },
    ],
  },
  {
    tutorBadge: "Free",
    studentBadge: "Plus",
    features: [
      { icon: <CircleArrowDown size={18} className="text-red-500" />, text: "Tutors can screenshare conversations." },
      { icon: <CircleArrowUp size={18} className="text-green-500 shrink-0" />, text: "Students have full Plus access independently (all conversations, audio and other Plus features)." },
      { icon: <CircleArrowDown size={18} className="text-red-500" />, text: "Tutors: No assignments or progress tracking." },
    ],
  },
  {
    tutorBadge: "Plus",
    studentBadge: "Free",
    features: [
      { icon: <CircleArrowUp size={18} className="text-green-500" />, text: "Tutors can assign Plus conversations to students." },
      { icon: <CircleArrowDown size={18} className="text-red-500 shrink-0" />, text: "Students unlock Plus features within assigned conversations only." },
      { icon: <CircleArrowUp size={18} className="text-green-500" />, text: "Tutors can track assignment completion and student activity." },
    ],
  },
  {
    tutorBadge: "Plus",
    studentBadge: "Plus",
    features: [
      { icon: <CircleArrowUp size={18} className="text-green-500" />, text: "Tutors can assign Plus conversations to students." },
      { icon: <CircleArrowUp size={18} className="text-green-500 shrink-0" />, text: "Students have full Plus access independently (all conversations, audio and other Plus features)." },
      { icon: <CircleArrowUp size={18} className="text-green-500" />, text: "Tutors can track assignment completion and student activity." },
    ],
  },
];

type FAQItem = {
  question: string;
  answer: React.ReactNode;
};

const faqs: FAQItem[] = [
  {
    question: "Why shouldn't a Tutor just screenshare if they have access to all the conversations anyway?",
    answer: (
      <>
      They absolutely can, many Tutors may prefer that setup.

      <br /><br />

      Assigning is a structured way for Tutors to share conversations with Students. Assigned conversations unlock all premium features <i>without requiring the Student to have a subscription</i>, allowing them to complete activities at their own pace while Tutors track progress and completion in one place.    </>
    ),
  },
  {
    question: "So if a subscribed Tutor has 30 Free Students, all 30 get assigned Plus conversations?",
    answer: (
      <p>Yup.</p>
    ),
  },
  {
    question: "What is the difference between Free and Plus?",
    answer: (
      <>
        Plus unlocks the full experience.
        <br /><br />
        <strong>Students</strong> get full access to all conversations (A1–B2), conversation audio, color customization and challenges.
        <br />
        <strong>Tutors</strong> can assign conversations that include all Plus features, even to Free Students. They also get to track assigned conversations for each student to check on progress.
      </>
    ),
  },
  {
    question: "What does Student Free include?",
    answer: (
      <>
        Student Free includes limited conversations and no audio.
        <br /><br />
        If your tutor has Tutor Plus, you can access Plus features inside conversations they assign to you.
      </>
    ),
  },
  {
    question: "What does Tutor Free include?",
    answer: (
      <>
        Tutor Free has all conversations unlocked, but with limited features. You are limited to screensharing during lessons.
        <br /><br />
        You cannot assign conversations or track student progress.
      </>
    ),
  },

  {
    question: "What happens if both Tutor and Student are Free?",
    answer: (
      <>
        Tutors can only screenshare.
        <br />
        Students have limited access.
        <br />
        No assignments or tracking.
      </>
    ),
  },
  {
    question: "What's the difference between Monthly and Yearly?",
    answer: (
      <>
        Both offer the exact same features.
        <br /><br />
        The only difference is billing. Yearly is discounted for long-term commitment
      </>
    ),
  },
  {
    question: "How do I unsubscribe?",
    answer: (
      <>
       Esnure you&apos;re signed in and head to the Billing Payments tab on the
       <Link href={"/profile"} className='underline px-1'>Profile page</Link>

      </>
    ),
  },
];



function renderTier(tier: Tier, idx: number) {
  const studentIsPlus = tier.studentBadge === "Plus";
  const tutorIsPlus = tier.tutorBadge === "Plus";

  return (
    <CardContent key={idx} className='flex flex-col md:flex-row items-center justify-center gap-4 p-4'>

    <div className='flex flex-row'>

      <div className='w-auto flex flex-col items-center'>

        <div className='flex items-center justify-center relative p-3 md:p-5'>
          <User strokeWidth={1} size={60} className="md:w-[90px] md:h-[90px]" />
          <Notebook className="absolute bottom-3 md:bottom-5 ml-6 md:ml-10 bg-background z-10" size={20} />
        </div>
        <Badge className={studentIsPlus ? "bg-pink-500 text-white" : ""}>{tier.studentBadge}</Badge>

      </div>

      <div className='w-auto flex flex-col items-center'>
        <div className='flex items-center justify-center relative p-3 md:p-5'>
          <User strokeWidth={1} size={60} className="md:w-[90px] md:h-[90px]" />
          <Briefcase className="absolute bottom-1 md:bottom-4 ml-6 md:ml-10 bg-background z-10" size={25} />
        </div>
        <Badge className={tutorIsPlus ? "bg-pink-500 text-white" : ""}>{tier.tutorBadge}</Badge>
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
  const { user, fetchUser } = useUserStore();

  useEffect(() => {
    if (user) return;

    let cancelled = false;
    const init = async () => {
      try {
        await account.get();
      } catch {
        return;
      }

      if (!cancelled) {
        await fetchUser();
      }
    };

    init();

    return () => {
      cancelled = true;
    };
  }, [fetchUser, user]);

  return (
    <ScrollArea className={`w-full h-screen overflow-y-auto bg-gradient ${dmSans.className}`}>
      <nav className="sticky top-0 w-full z-30">
        {/*shadow-[0_1px_5px_var(--color-ring)] dark:shadow-[0_0.5px_5px_var(--color-ring)] */}
        <div className="flex items-center h-12 lg:h-18">
            <h1 className="hidden lg:block text-3xl lg:text-3xl font-normal absolute left-5 lg:left-10">Synomilo</h1>

            <div className={`flex absolute right-5 md:right-5 lg:right-10 md:gap-0 lg:gap-1 ${geist.className}`}>
              <Link href={"/register"}> <Button className="hidden md:block lg:block cursor-pointer hover:bg-gradient" variant={"ghost"}>Sign up</Button> </Link>
              <LoginChecker/>
              <Link href="/pricing"> <Button variant="ghost" className="hidden md:block lg:block shadow-[0_0_5px_1px_rgba] cursor-pointer hover:bg-gradient">Pricing</Button></Link>
              <ModeToggle />
            </div>
        </div>
    </nav>

    <div className='flex flex-col justify-center items-center gap-2 lg:mb-0 p-4 md:p-0'>

    <div className="flex flex-col md:flex-col gap-2 items-center justify-center rounded-lg w-full h-auto ">
      <h1 className='text-3xl md:text-6xl font-medium text-center'>Plans for Tutors & Students</h1>
      <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0, delay: 0 }}
      className='text-sm md:text-lg text-muted-foreground p-2 text-center mx-4'>During early access, rates will be lower while the platform is being polished</motion.div>
    </div>


 <div className='flex justify-center items-center flex-col lg:flex-row w-full md:w-full lg:w-full mt-10 gap-5 md:gap-10'>

  <div className="flex items-center w-full flex-col gap-6">
      <Tabs className="" defaultValue="Students">

        <TabsList className='self-center'>
          <TabsTrigger value="Students">Students</TabsTrigger>
          <TabsTrigger value="Tutors">Tutors</TabsTrigger>
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


<Card className='h-auto w-full lg:w-2/3 mb-5 bg-background/50 shadow-md'>
  <CardHeader>
    <CardTitle className='text-lg md:text-2xl'>More about Pricing and Subscriptions</CardTitle>
    <CardDescription className='text-sm md:text-base'>How Students and Tutors interact depends on who owns a subscription</CardDescription>
  </CardHeader>

  {tiers.map(renderTier)}
</Card>


</div>

<div className='flex justify-center items-center flex-col lg:flex-row w-full md:w-full lg:w-full mt-10 gap-5 md:gap-10 p-4'>
  <Card className='h-auto w-full lg:w-2/3 mb-5 bg-background/50 shadow-md'>
  <CardHeader>
    <CardTitle className='text-xl md:text-2xl'>FAQ</CardTitle>
    <CardDescription className='text-sm md:text-base'>Potential questions concerning how Student and Tutor plans work together</CardDescription>
  </CardHeader>

   <Accordion type="single" collapsible className="self-center w-full md:w-2/3 p-2">
  {faqs.map((faq, index) => (
    <AccordionItem key={index} value={`item-${index}`}>
      <AccordionTrigger className='text-lg'>{faq.question}</AccordionTrigger>
      <AccordionContent className='text-base mb-5'>{faq.answer}</AccordionContent>
    </AccordionItem>
  ))}
</Accordion>

</Card>
</div>


</ScrollArea>


  )
}

export default SubscribePage