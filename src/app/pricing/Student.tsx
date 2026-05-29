'use client'

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useUserStore } from '@/data/useUserStore'
import { motion } from 'motion/react';
import { DM_Sans, Geist } from 'next/font/google';
import Link from 'next/link';
import React from 'react'
import { subscribeUser2 } from '@/data/getData'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

const geist = Geist({ subsets: ['latin'] })
const dmSans = DM_Sans({ subsets: ['latin'] });



function Student() {
  const {user, isSubscribed, isTeacher} = useUserStore();
  const router = useRouter();

  const handleStudentSubscribe = async (plan: string) => {
    if (!user?.$id && !isTeacher) {
      router.push('/register');
      return;
    }
    try {
      if (isSubscribed) {
        toast.error("You're already subscribed");
        return;
      }
      toast.loading("Redirecting to payment...", { id: 'subscription-loading' });
      await subscribeUser2(user.$id, plan);
    } catch (err) {
      console.error("Subscription failed", err);
      toast.dismiss('subscription-loading');
      toast.error("Failed to subscribe. Make sure you're logged in or try again later.");
    }
  };

  const paidOptions = [
    {
      title: "Student Monthly",
      planName: "Student Monthly",
      time: "month",
      price: "4.99",
      info: "Standard Pricing",
      desc: [
        "Ideal for trying out Synomilo Plus.",
        "Plus access, billed monthly.",
        "Flexible; cancel anytime.",
      ],

    },
    {
      title: "Student Yearly",
      planName: "Student Yearly",
      time: "year",
      price:"49.99",
      info: "Over 15% cheaper than Monthly",
      desc: [
        "Ideal for those who want to commit to a long-term journey.",
        "Plus access, billed yearly.",
        "Access to all existing and new content within the year of purchase.",
      ]
    },
  ]

  return (
    <div>

      <Card className='border-none bg-background shadow-none'>
            <CardHeader>
              <CardTitle className='flex justify-center text-2xl'>Billed monthly or yearly</CardTitle>
            </CardHeader>
            <CardContent className="w-full">

     <motion.div className="flex flex-col rounded-lg w-full h-auto">

<div className='flex flex-col lg:flex-row gap-5'>

  <div className='flex flex-col items-center justify-between p-2 bg-muted rounded-xl h-100 shadow-md w-xs md:w-md text-muted-foreground'>
    <div className='flex flex-col items-center flex-grow'>
      <Badge className='mb-10'>Free</Badge>
      <motion.div className='flex justify-center'
      initial={{ opacity: 0, y: 0 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0 }}>
      <ul className='text-base list-disc marker:text-popover-foreground space-y-1 px-2 justify-start'>
        <li>8 conversations, 2 per level, A1-B2</li>
        <li>Hover</li>
        <li>Dictionary and Word Board</li>
        <li>Streaks</li>
        <li>Daily Tasks</li>
        <li>Assignments Page</li>
      </ul>
      </motion.div>

    </div>

    {!isTeacher && isSubscribed ? (
    <Button
    variant="outline"
    className="w-full cursor-not-allowed opacity-50"
    disabled
  >
    Subscribed
  </Button>
) : (
  <Link href="/register" className="w-full">
    <Button variant="default" className="w-full cursor-pointer">
      Get Started
    </Button>
  </Link>
)}


  </div>



<div className='flex flex-col justify-between p-2 border-1 border-pink-500 rounded-xl shadow-xs h-100 w-xs md:w-md'>
    <div className='flex flex-col items-center flex-grow'>
      <Badge className='mb-10 bg-pink-500 text-white'>Plus</Badge>
      <motion.div className='flex justify-center items-center'
      initial={{ opacity: 0, y: 0 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0 }}>
      <ul className='text-base text-muted-foreground  list-disc marker:text-pink-500 space-y-1 w-full'>
        <li>Everything in Free</li>
        <li>All Conversations</li>
        <li>Audio for conversations</li>
        <li>Color customization</li>
        <li>Challenges</li>
      </ul>
      </motion.div>

    </div>

    <Dialog>
  <DialogTrigger asChild>
    <Button variant="outline" className="cursor-pointer" >
      {!isTeacher && isSubscribed ? "Already Subscribed. View Plans?" : "See Student Plans"}
    </Button>
  </DialogTrigger>

  <DialogContent className={`lg:min-w-4xl h-auto p-10 ml-2 ${geist.className}`}>
    <DialogHeader>
      <DialogHeader>
  <DialogTitle className='lg:text-2xl'>Student Plans</DialogTitle>
  <DialogDescription className='lg:text-md'>
  These plans are part of the early access period and will increase as I continue building and improving Synomilo.
  <span className='text-green-500'> Your rate is locked in and won’t change, even after future pricing updates.</span>
</DialogDescription>
<DialogDescription>
  I&apos;m grateful for your contribution and for being one of the platform&apos;s first supporters.
</DialogDescription>



  <div className="flex flex-col md:flex-col lg:flex-row justify-center items-center gap-4 mt-4">
    {paidOptions.map((option, index) => (
      <div
  key={index}
className="relative flex flex-col justify-between p-4 border rounded-xl w-full lg:w-sm h-60 lg:h-90 shadow-md transition-all hover:shadow-lg hover:-translate-y-1">

        {option.time === "year" && (
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <Badge className="bg-green-500 text-white shadow-md">
                Best value
              </Badge>
            </div>
          )}

         <div className="flex flex-col items-start">
          <div className='flex flex-col space-y-2 items-start my-2'>
            <h1 className="text-xl font-semibold border-l-1 border-pink-500 pl-2">{option.title}</h1>
              <p className='text-2xl font-semibold tracking-tight'>€{option.price}/{option.time}
              <span className='text-muted-foreground font-normal text-sm'> + applicable taxes</span>
           </p>
          </div>
          <div className='mb-4 text-sm text-muted-foreground'>{option.info}</div>
          <ul className="list-disc text-xs text-left lg:items-center lg:text-sm marker:text-pink-500 space-y-1 px-4 text-muted-foreground mb-2">
          {option.desc.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
          </ul>
        </div>

     {!user ? (
    <Link href="/register" className="w-full">
      <Button variant="outline" className="w-full cursor-pointer">
        Get Started
      </Button>
    </Link>
) : !isSubscribed && !isTeacher ? (
    <Button
      variant="outline"
      className="w-full cursor-pointer"
      onClick={() => handleStudentSubscribe(option.planName)}
    >
      Get {option.planName}
    </Button>
) : isTeacher ? (
  <Button
    variant="outline"
    className="w-full cursor-not-allowed"
    disabled
  >
    Requires Student account
  </Button>
) : (
  <Button
    variant="outline"
    className="w-full cursor-not-allowed"
    disabled
  >
    Subscribed
  </Button>
)}

</div>

))}
  </div>
</DialogHeader>
    </DialogHeader>
  </DialogContent>
</Dialog>

  </div>


          </div>

    </motion.div>
    </CardContent>


          </Card>

  </div>
  )
}

export default Student
