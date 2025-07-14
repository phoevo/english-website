"use client"
import { useState } from 'react'
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
import { subscribeUser } from '@/data/getData'
import { toast } from 'sonner'
import {
  Card,
  CardFooter,

} from "@/components/ui/card"
import { useRouter } from 'next/navigation';
import { ScrollArea } from '@/components/ui/scroll-area'
import { ArrowDown, Book, Briefcase, CircleArrowDown, CircleArrowUp, GraduationCap, Notebook, User } from 'lucide-react'
import { motion, AnimatePresence } from "motion/react";


const geist = Geist({ subsets: ['latin'] })
const dmSans = DM_Sans({ subsets: ['latin'] });

const tiers = [
  {
    tutorBadge: "Free",
    studentBadge: "Free",
    features: [
      { icon: <CircleArrowDown size={18} className="text-red-500" />, text: "Tutor can assign a total of 12 Conversations to Student" },
      { icon: <CircleArrowDown size={18} className="text-red-500" />, text: "Student cannot review and practice any Conversation in their own time" },
      { icon: <CircleArrowDown size={18} className="text-red-500" />, text: "Tutor only has 2 active Student slots" },
    ],
  },
  {
    tutorBadge: "Free",
    studentBadge: "Pro",
    features: [
      { icon: <CircleArrowUp size={18} className="text-green-500" />, text: "Tutor can assign any Conversation to Student" },
      { icon: <CircleArrowUp size={18} className="text-green-500" />, text: "Student can review and practice any Conversation in their own time" },
      { icon: <CircleArrowDown size={18} className="text-red-500" />, text: "Tutor only has 2 active Student slots" },
    ],
  },
  {
    tutorBadge: "Pro",
    studentBadge: "Free",
    features: [
      { icon: <CircleArrowUp size={18} className="text-green-500" />, text: "Tutor can assign any Conversation to Student" },
      { icon: <CircleArrowDown size={18} className="text-red-500" />, text: "Student cannot review and practice any Conversation in their own time" },
      { icon: <CircleArrowUp size={18} className="text-green-500" />, text: "Tutor has 5/15/30 active Student slots" },
    ],
  },
  {
    tutorBadge: "Pro",
    studentBadge: "Pro",
    features: [
      { icon: <CircleArrowUp size={18} className="text-green-500" />, text: "Tutor can assign any Conversation to Student" },
      { icon: <CircleArrowUp size={18} className="text-green-500" />, text: "Student can review and practice any Conversation in their own time" },
      { icon: <CircleArrowUp size={18} className="text-green-500" />, text: "Tutor has 5/15/30 active Student slots" },
    ],
  },
];

function renderTier(tier, idx) {
  const studentIsPro = tier.studentBadge === "Pro";
  const tutorIsPro = tier.tutorBadge === "Pro";

  return (
    <CardContent key={idx} className='flex flex-col md:flex-row items-center justify-center gap-4 p-4'>

      <div className='w-auto flex flex-col items-center'>
        <div className='flex items-center justify-center relative p-3 md:p-5'>
          <User strokeWidth={1} size={60} className="md:w-[90px] md:h-[90px]" />
          <Notebook className="absolute bottom-3 md:bottom-5 ml-6 md:ml-10 bg-card z-10" size={20} />
        </div>
        <Badge className={studentIsPro ? "bg-pink-500" : ""}>{tier.studentBadge}</Badge>
      </div>

      <div className='w-auto flex flex-col items-center'>
        <div className='flex items-center justify-center relative p-3 md:p-5'>
          <User strokeWidth={1} size={60} className="md:w-[90px] md:h-[90px]" />
          <Briefcase className="absolute bottom-1 md:bottom-2 ml-6 md:ml-10 bg-card z-10" size={25} />
        </div>
        <Badge className={tutorIsPro ? "bg-pink-500" : ""}>{tier.tutorBadge}</Badge>
      </div>


      <div className='flex items-center justify-start relative w-full md:w-2/3'>
        <ul className='text-xs md:text-sm space-y-2'>
          {tier.features.map((f, i) => (
            <li key={i} className='flex flex-row gap-1 items-center'>
              {f.icon}
              <span className="text-center md:text-left">{f.text}</span>
            </li>
          ))}
        </ul>
      </div>

    </CardContent>
  );
}






function SubscribePage() {
  const [isVisible, setIsVisible] = useState(false);
  const {isSubscribed, setSubscribed, user, isTeacher} = useUserStore();

  const router = useRouter();

  function handleOptions(){
    setIsVisible(!isVisible);
  }




  const paidOptions = [
    {
      title: "Monthly",
      price: "4.99",
      info: "Standard Pricing",
      desc: [
        "Ideal for trying out Synomilo.",
        "Pro access, billed monthly.",
        "Flexible; cancel anytime.",
      ],

    },
    {
      title: "Yearly",
      price:"49.99",
      info: "Over 15% cheaper than Monthly",
      desc: [
        "Ideal for those who want to commit to a long-term journey.",
        "Pro access, billed yearly.",
        "Access to all existing and new content within the year of purchase.",
      ]
    },
    {
      title: "Lifetime",
      price: "119.99",
      info: "Break even after 2 years",
      desc: [
        "For those who see language as a life-long journey.",
        "Pay once — it's yours forever. Come back anytime, even years later.",
        "Lifetime access to Synomilo, including all future updates.",
       ]
      }
    ]

  const earlyPaidOptions = [
  {
    title: "Supporter Monthly",
    price: "3.99",
    stripePriceId: "price_early_monthly_399",
    info: "Lower pricing during rollout",
    desc: [
      "Locked-in rate as long as you're subscribed.",
      "Full access to all Pro features.",
      "Thank you for being part of the early community.",
    ],
  },
  {
    title: "Supporter Lifetime",
    price: "79.99",
    stripePriceId: "price_early_lifetime_7999",
    info: "One payment, lifetime access",
    desc: [
      "Locked-in rate as long as you're subscribed.",
      "Full access to all Pro features. Forever.",
      "No subscriptions, no renewals.",
      "Supports continued development.",
    ],
  },
];

  const tutorPlans = [
  {
    title: "Tutor 5",
    info: "For up to 5 students",
    desc: [
      "Ideal for Tutors starting out",
      "$2 per Student"
    ],
    price: "9.99",
    priceId: "price_tutor5_monthly"
  },
  {
    title: "Tutor 15",
    info: "For up to 15 students",
    desc: [
      "Best for active Tutors",
      "$1.3 per Student"
    ],
    price: "19.99",
    priceId: "price_tutor15_monthly"
  },

  {
    title: "Tutor 30",
    info: "For up to 30 students",
    desc: [
      "Designed for full-time Tutors",
      "$1 per Student"
    ],
    price: "29.99",
    priceId: "price_tutor30_monthly"
  },
];




  return (

    <ScrollArea className={`w-full h-screen overflow-y-auto ${dmSans.className}`}>
    <div className='flex flex-col justify-center items-center p-4 md:p-10'>


    <div className="flex flex-col gap-2 items-center justify-center mt-10 rounded-lg w-full h-auto ">
      <h1 className='text-3xl md:text-6xl font-normal text-center'>Choose the plan that best suits your needs</h1>
      <p className='text-lg md:text-2xl text-muted-foreground text-center'>Early access pricing — lower rates while we grow.</p>
      <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, delay: 0.5 }}
      className='text-sm md:text-xl bg-muted rounded-full p-2 text-center mx-4'>Start now and your price stays the same, even after release.</motion.div>
    </div>


 <div className='flex flex-col md:flex-row w-full md:w-full mt-10 gap-5 md:gap-15'>


    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="flex flex-col border-2 p-2 rounded-lg space-y-5 w-full md:w-full h-auto">

      <CardHeader>
      <CardTitle className="text-lg font-semibold">For Students</CardTitle>
    </CardHeader>
    <CardContent>

     <div className='flex flex-col gap-5 w-full'>

     <div className='flex flex-col gap-5'>
  <div className='flex flex-col justify-between p-2 border-2 rounded-lg h-65 w-full text-muted-foreground'>
    <div className='flex flex-col items-center flex-grow'>
      <Badge className='mb-4'>Free</Badge>
      <div className='flex justify-center'>
      <ul className='text-sm list-disc marker:text-popover-foreground space-y-1 justify-start'>
        <li>Access to 12 Conversations</li>
        <li>Hover</li>
        <li>Dictionary and Word Board</li>
        <li>Streaks</li>
        <li>Daily Tasks</li>
        <li>Assignments Page</li>
      </ul>
      </div>

    </div>

    {isSubscribed ? (
    <Button
    variant="outline"
    className="w-full cursor-not-allowed opacity-50"
    disabled
  >
    Subscribed
  </Button>
) : (
  <Link href="/register" className="w-full">
    <Button variant="secondary" className="w-full cursor-pointer">
      Get started
    </Button>
  </Link>
)}


  </div>



<div className='flex flex-col justify-between p-2 border-1 rounded-lg h-65 w-full shadow-[0_0_1px_1px] shadow-pink-500'>
    <div className='flex flex-col items-center flex-grow'>
      <Badge className='mb-4 bg-pink-500 text-white'>Pro</Badge>
      <div className='flex justify-center items-center'>
      <ul className='text-sm text-muted-foreground  list-disc marker:text-pink-500 space-y-1 w-full'>
        <li>Everything in Free</li>
        <li>All Conversations</li>
        <li>Audio for conversations</li>
        <li>Color customization</li>
        <li>Challenges</li>
      </ul>
      </div>

    </div>

    <Dialog>
  <DialogTrigger asChild>
    <Button variant="outline" className="cursor-pointer" >
      {isSubscribed ? "Already subscribed. Change plan?" : "See Student Plans"}
    </Button>
  </DialogTrigger>

  <DialogContent className={`w-full max-w-4xl h-auto p-4 md:p-10 ml-2 ${geist.className}`}>
    <DialogHeader>
      <DialogHeader>
  <DialogTitle className='text-2xl'>See Student Plans</DialogTitle>
  <DialogDescription>
  These plans are part of our early access period and will increase as we continue building and improving Synomilo. Your rate is locked in and won’t change, even after future pricing updates.
</DialogDescription>
<DialogDescription>
  Thank you for supporting our work and being part of the early supporters.
</DialogDescription>



  <div className="flex flex-col md:flex-row justify-center items-center gap-4 mt-4">
    {paidOptions.map((option, index) => (
      <div
        key={index}
        className="flex flex-col justify-between p-4 border-1 rounded-xl w-full md:w-1/3 h-80 shadow-md"
      >
         <div className="flex flex-col items-start">
          <div className='flex flex-row gap-2 items-center my-2'>
            <h1 className='text-xl font-semibold'>{option.title}</h1>
            <Badge className="bg-pink-500 text-white">${option.price}</Badge>
          </div>
          <div className='mb-5 text-sm text-muted-foreground'>{option.info}</div>
          <ul className="list-disc text-sm marker:text-pink-500 space-y-1 px-4 text-muted-foreground mb-2">
          {option.desc.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
          </ul>
        </div>

          <Button
          variant="outline"
          className="mt-4 cursor-pointer">
          Get {option.title}</Button>


      </div>
    ))}
  </div>
</DialogHeader>
    </DialogHeader>
  </DialogContent>
</Dialog>

  </div>


      </div>
      </div>






    </CardContent>
  </motion.div>


     <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
   className="flex flex-col p-2 bg-muted shadow-md rounded-lg space-y-5 w-full md:w-1/2 h-auto">

      <CardHeader>
      <CardTitle className="text-lg font-semibold">For Tutors</CardTitle>

    </CardHeader>
    <CardContent className=''>

     <div className='flex flex-col gap-5 w-full'>

    <div className='flex flex-col gap-5'>
  <div className='flex flex-col justify-between bg-background p-2 border-1 rounded-lg h-65 w-full text-muted-foreground'>
    <div className='flex flex-col items-center flex-grow'>
      <Badge className='mb-4'>Free</Badge>
      <div className='flex justify-center'>
      <ul className='text-sm list-disc marker:text-popover-foreground space-y-1 justify-start'>
        <li>All Conversations, but in read-only</li>
        <li>Features are limited</li>
        <li>Manage up to 2 active Students</li>

      </ul>
      </div>

    </div>

    {isSubscribed ? (
    <Button
    variant="outline"
    className="w-full cursor-not-allowed opacity-50"
    disabled
  >
    Subscribed
  </Button>
) : (

    <Button variant="secondary" className="w-full cursor-pointer" disabled>
      Coming Soon
    </Button>

)}


  </div>


<div className='flex flex-col justify-between bg-background p-2 rounded-lg h-65 w-full shadow-[0_0_1px_1px] shadow-pink-500'>
    <div className='flex flex-col items-center flex-grow'>
      <Badge className='mb-4 bg-pink-500 text-white'>Pro</Badge>
      <div className='flex justify-center items-center'>
      <ul className='text-sm text-muted-foreground  list-disc marker:text-pink-500 space-y-1 w-full'>
        <li>Everything Student Pro has</li>
        <li>Manage up to 5, 15 and 30 Students</li>

      </ul>
      </div>

    </div>

    <Dialog>
  <DialogTrigger asChild>
    <Button variant="outline" className="cursor-pointer" disabled >
      Coming Soon
      {/* {isSubscribed ? "Already subscribed. Change plan?" : "See Tutor Plans"} */}
    </Button>
  </DialogTrigger>

  <DialogContent className={`w-full max-w-4xl h-auto p-4 md:p-10 ml-2 ${geist.className}`}>
    <DialogHeader>
      <DialogHeader>
  <DialogTitle className='text-2xl'>See Monthly Tutor Plans</DialogTitle>
  <DialogDescription>
  These plans are part of our early access period and will increase as we continue building and improving Synomilo. Your rate is locked in and won’t change, even after future pricing updates.
</DialogDescription>
<DialogDescription>
  Thank you for supporting our work and being part of the early supporters.
</DialogDescription>



  <div className="flex flex-col md:flex-row justify-center items-center gap-4 mt-4">
    {tutorPlans.map((plan, index) => (
  <div
    key={index}
    className="flex flex-col p-4 border-1 rounded-xl w-full md:w-1/3 h-65 shadow-md"

  >
    <div className="flex flex-col flex-grow items-start">
      <div className="flex flex-row gap-2 items-center my-2">
        <h1 className="text-xl font-semibold">{plan.title}</h1>
        <Badge className="bg-pink-500 text-white px-1">${plan.price}</Badge>
      </div>
      <div className="mb-5 text-sm text-muted-foreground">{plan.info}</div>
      <ul className="list-disc text-sm marker:text-pink-500 space-y-1 px-4 text-muted-foreground mb-2">
        {plan.desc.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </div>
    <Button
      variant="outline"
      className="cursor-pointer w-full mt-auto"

    >
      Get {plan.title}
    </Button>
  </div>
))}


  </div>
</DialogHeader>
    </DialogHeader>
  </DialogContent>
</Dialog>

  </div>


      </div>
      </div>






    </CardContent>
  </motion.div>


</div>

<motion.div
  initial={{ opacity: 0, y: -210 }}
  animate={{ opacity: 1, y: -100 }}
  transition={{ duration: 0.3, delay: 1 }}
>
  <ArrowDown size={30}/>
</motion.div>

<Card className='h-auto w-full mb-5 bg-background shadow-md'>
  <CardHeader>
    <CardTitle className='text-lg md:text-2xl'>More about Pricing and Subscriptions</CardTitle>
    <CardDescription className='text-sm md:text-base'>How Tutors and Students interact depends on who owns a subscription</CardDescription>
  </CardHeader>

  {tiers.map(renderTier)}
</Card>


</div>


</ScrollArea>


  )
}

export default SubscribePage