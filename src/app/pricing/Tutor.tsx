import React from 'react'
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useUserStore } from '@/data/useUserStore'
import { motion } from 'motion/react';
import { DM_Sans, Geist } from 'next/font/google';
import Link from 'next/link';


const geist = Geist({ subsets: ['latin'] })
const dmSans = DM_Sans({ subsets: ['latin'] });

function Tutor() {
  const {user, isSubscribed, isTeacher} = useUserStore();

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
    <div>

      <Card className='border-none bg-background shadow-none'>
            <CardHeader>
              <CardTitle className='flex justify-center text-2xl'>Billed monthly or yearly</CardTitle>
            </CardHeader>
            <CardContent className="w-full">

            <motion.div className="flex flex-col rounded-lg w-full h-auto">


    <CardContent>

     <div className='flex flex-col md:flex-col gap-5 w-auto'>

    <div className='flex flex-col lg:flex-row gap-5'>
  <div className='flex flex-col justify-between p-2 bg-muted rounded-xl shadow-md h-100 w-xs md:w-md text-muted-foreground'>
    <div className='flex flex-col items-center flex-grow'>
      <Badge className='mb-10'>Free</Badge>
      <motion.div className='flex justify-center'
      initial={{ opacity: 0, y: 0 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0 }}>
      <ul className='text-base list-disc marker:text-popover-foreground space-y-1 justify-start'>
        <li>All conversations A1-C2 in read-only</li>

      </ul>
      </motion.div>

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
    <Button variant="default" className="w-full cursor-pointer">
      Get Started
    </Button>
    </Link>

)}


  </div>


<div className='flex flex-col justify-between bg-background p-2 rounded-xl shadow-xs h-100 w-xs md:w-md border-1'>
    <div className='flex flex-col items-center flex-grow'>
      <Badge className='mb-10 bg-pink-500 text-white'>Pro</Badge>
      <div className='flex justify-center items-center'>
      <ul className='text-base text-muted-foreground  list-disc marker:text-pink-500 space-y-1 w-full'>
        <li>All conversations A1-C2 in read-only</li>
        <li>Assignments page</li>
        <li>Assign, Track and Manage Students</li>
      </ul>
      </div>

    </div>

    <Dialog>
  <DialogTrigger asChild>
    <Button variant="outline" className="cursor-pointer" disabled >
      {isTeacher && isSubscribed ? "Subscribed" : "See Tutor Plans"}
    </Button>
  </DialogTrigger>

  <DialogContent className={`w-full max-w-4xl h-auto p-4 md:p-10 ml-2 ${geist.className}`}>
    <DialogHeader>
      <DialogHeader>
  <DialogTitle className='text-2xl'>See Monthly Tutor Plans</DialogTitle>
  <DialogDescription>
  These plans are part of the early access period and will increase as I continue building and improving Synomilo. Your rate is locked in and won’t change, even after future pricing updates.
</DialogDescription>
<DialogDescription>
  Thank you for supporting our work and being part of the early supporters.
</DialogDescription>



  <div className="flex flex-col md:flex-row justify-center items-center gap-4 mt-4">
    {tutorPlans.map((plan, index) => (
  <div
    key={index}
    className="flex flex-col p-4 border-1 rounded-xl w-xl md:w-1/3 h-65 shadow-md"

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

    {!user ? (
    <Button
      variant="default"
      className="cursor-pointer w-full mt-auto"

    >
      Get started
    </Button>) :
    (<Button
      variant="outline"
      className="cursor-pointer w-full mt-auto"

    >
      Get {plan.title}
    </Button>)
    }

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



            </CardContent>

          </Card>

    </div>
  )
}

export default Tutor
