import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useUserStore } from '@/data/useUserStore'
import { motion } from 'motion/react';
import { DM_Sans, Geist } from 'next/font/google';
import Link from 'next/link';
import React from 'react'

const geist = Geist({ subsets: ['latin'] })
const dmSans = DM_Sans({ subsets: ['latin'] });



function Student() {
  const {user, isSubscribed, isTeacher} = useUserStore();

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
    ]

  return (
    <div>

      <Card className='border-none bg-background shadow-none'>
            <CardHeader>
              <CardTitle className='flex justify-center text-2xl'>Billed monthly or yearly</CardTitle>
            </CardHeader>
            <CardContent className="w-full">

      <div className="flex flex-col rounded-lg w-full h-auto">
      <CardContent>
      <div className='flex flex-col md:flex-col gap-5 w-full'>

     <div className='flex flex-col md:flex-row gap-5'>
  <div className='flex flex-col justify-between p-2 bg-muted rounded-xl h-100 shadow-md w-full text-muted-foreground'>
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



<div className='flex flex-col justify-between p-2 border-1 rounded-xl shadow-xs h-100 w-full'>
    <div className='flex flex-col items-center flex-grow'>
      <Badge className='mb-10 bg-pink-500 text-white'>Pro</Badge>
      <div className='flex justify-center items-center'>
      <ul className='text-base text-muted-foreground  list-disc marker:text-pink-500 space-y-1 w-full'>
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
      {!isTeacher && isSubscribed ? "Already subscribed. Change plan?" : "See Plans"}
    </Button>
  </DialogTrigger>

  <DialogContent className={`min-w-2/3 h-auto p-10 ml-2 ${geist.className}`}>
    <DialogHeader>
      <DialogHeader>
  <DialogTitle className='lg:text-2xl'>Student Plans</DialogTitle>
  <DialogDescription className='lg:text-md'>
  These plans are part of the early access period and will increase as I continue building and improving Synomilo. Your rate is locked in and won&apos;t change, even after future pricing updates.
</DialogDescription>
<DialogDescription>
  I&apos;m grateful for your contribution and for being one of the platform&apos;s first supporters.
</DialogDescription>



  <div className="flex flex-col md:flex-col lg:flex-row justify-center items-center gap-4 mt-4">
    {paidOptions.map((option, index) => (
      <div
        key={index}
        className="flex flex-col justify-between p-4 border-1 rounded-xl w-full md:w-full lg:w-1/3 h-60 lg:h-90 shadow-md"
      >
         <div className="flex flex-col items-start">
          <div className='flex flex-row gap-2 items-center my-2'>
            <h1 className='lg:text-xl font-semibold'>{option.title}</h1>
            <Badge className="bg-pink-500 text-white">${option.price}</Badge>
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
) : !isSubscribed ? (
  <Link href="/subscribe" className="w-full">
    <Button variant="outline" className="w-full cursor-pointer">
      Get Started
    </Button>
  </Link>
) : isTeacher ? (
  <Button
    variant="outline"
    className="w-full cursor-not-allowed opacity-50"
    disabled
  >
    Requires Student account
  </Button>
) : (
  <Button
    variant="outline"
    className="w-full cursor-not-allowed opacity-50"
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
      </div>

    </CardContent>
  </div>

            </CardContent>
          </Card>

    </div>
  )
}

export default Student
