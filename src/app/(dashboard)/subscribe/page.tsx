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
import { Geist } from 'next/font/google'
import Link from 'next/link'
import { useUserStore } from '@/data/useUserStore'
import { subscribeUser } from '@/data/getData'
import { toast } from 'sonner'
import {
  Card,
  CardFooter,

} from "@/components/ui/card"
import { useRouter } from 'next/navigation';


const geist = Geist({ subsets: ['latin'] })



function SubscribePage() {
  const [isVisible, setIsVisible] = useState(false);
  const {isSubscribed, setSubscribed, user} = useUserStore();

  const router = useRouter();

  function handleOptions(){
    setIsVisible(!isVisible);
  }

  const handleSubscribe = async () => {
  if (!user?.$id) {
    router.push('/register');
    return;
  }

  try {
    if (isSubscribed) {
      toast.error("You're already subscribed");
      return;
    }

    await subscribeUser(user.$id);
    setSubscribed(true);
    toast.success("You are now subscribed!");
  } catch (err) {
    console.error("Subscription failed", err);
    toast.error("Failed to subscribe. Make sure you're logged in or try again later.");
  }
};



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



  return (
    <div className='w-screen h-full flex justify-center items-center mt-10'>

    <div className="flex flex-col border-1 rounded-lg w-1/2 space-y-10 m-10 p-10 h-auto shadow-md">

      <CardHeader>
      <CardTitle className="text-2xl">Subscribe</CardTitle>
      <CardDescription>
        Subscribe to get access to the most Synomilo has to offer.
      </CardDescription>
    </CardHeader>
    <CardContent className=''>
     <div className='flex flex-row gap-5 w-full'>


  <div className='flex flex-col justify-between p-2 border-1 rounded-lg h-65 w-1/2 text-muted-foreground'>
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
  <Link href="/home" className="w-full">
    <Button variant="secondary" className="w-full cursor-pointer">
      Remain on Free
    </Button>
  </Link>
)}


  </div>


<div className='flex flex-col justify-between p-2 border-1 rounded-lg h-65 w-1/2 shadow-[0_0_3px_1px] shadow-pink-500'>
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
      {isSubscribed ? "Already subscribed. Change plan?" : "See Plans"}
    </Button>
  </DialogTrigger>

  <DialogContent className={`min-w-2/3 h-auto p-10 ml-2 ${geist.className}`}>
    <DialogHeader>
      <DialogHeader>
  <DialogTitle className='text-2xl'>See Plans</DialogTitle>
  <DialogDescription>
  These plans are part of our early access period and will increase as we continue building and improving Synomilo. Your rate is locked in and won’t change, even after future pricing updates.
</DialogDescription>
<DialogDescription>
  Thank you for supporting our work and being part of the early supporters.
</DialogDescription>



  <div className="flex flex-row justify-center items-center gap-4 mt-4">
    {paidOptions.map((option, index) => (
      <div
        key={index}
        className="flex flex-col justify-between p-4 border-1 rounded-xl w-1/3 h-80 shadow-md"
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
          className="mt-4 cursor-pointer"
          onClick={handleSubscribe}>
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

    </CardContent>
  </div>





</div>

  )
}

export default SubscribePage