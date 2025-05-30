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


const geist = Geist({ subsets: ['latin'] })

function SubscribePage() {
  const [isVisible, setIsVisible] = useState(false);
  const {isSubscribed, setSubscribed, user} = useUserStore();

  function handleOptions(){
    setIsVisible(!isVisible);
  }

  const handleSubscribe = async () => {
    if (!user?.$id) return;

    try {
      await subscribeUser(user.$id);
      if (isSubscribed) {
        toast.error("You're already subscribed");
        return;
      }
      setSubscribed(true);
      toast.success("You are now subscribed!");
    } catch (err) {
      console.error("Subscription failed", err);
      toast.error("Failed to subscribe. Try again later.");
    }
  };

  const paidOptions = [
    {
      title: "Monthly",
      price: "6.99",
      info: "Standard Pricing",
      desc: [
        "Ideal for trying out Synomilo.",
        "Pro access, billed monthly.",
        "Flexible; cancel anytime.",
      ],

    },
    {
      title: "Yearly",
      price:"67.99",
      info: "20% cheaper than monthly",
      desc: [
        "Ideal for those who want to commit to a long-term journey.",
        "Pro access, billed yearly.",
        "Access to all existing and new content within the year of purchase.",
      ]
    },
    {
      title: "Lifetime",
      price: "167.99",
      info: "Break even after 2 years",
      desc: [
        "For those who see language as a life-long journey.",
        "Pay once — it’s yours forever. Come back anytime, even years later.",
        "Lifetime access to Synomilo, including all future updates.",
       ]
      }
    ]



  return (
    <div className='w-screen h-full flex justify-center items-center mt-10'>

    <div className="flex flex-col border-1 rounded-lg w-1/2 space-y-10 m-10 p-10 h-auto shadow-md">

      <CardHeader className=''>
      <CardTitle className="text-2xl">Subscribe</CardTitle>
      <CardDescription>
        Subscribe to get access to the most Synomilo has to offer.
      </CardDescription>
    </CardHeader>
    <CardContent className=''>
     <div className='flex flex-row gap-5 w-full'>


  <div className='flex flex-col justify-between p-2 border-1 rounded-lg h-60 w-1/2 text-zinc-500'>
    <div className='flex flex-col items-center flex-grow'>
      <Badge className='mb-4'>Free</Badge>
      <div className='flex justify-center'>
      <ul className='text-sm list-disc marker:text-popover-foreground space-y-1 justify-start'>
        <li>Learn page</li>
        <li>Access to 10 Conversations</li>
        <li>Hover feature</li>
        <li>Dictionary</li>
      </ul>
      </div>

    </div>

    {isSubscribed ? (
    <Button
    variant="secondary"
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


  <div className='flex flex-col justify-between p-2 border-1 rounded-lg h-60 w-1/2 text-zinc-500 shadow-[0_0_10px_1px_rgba] shadow-pink-500'>
    <div className='flex flex-col items-center flex-grow'>
      <Badge className='mb-4 bg-pink-500 text-white'>Pro</Badge>
      <div className='flex justify-center items-center'>
      <ul className='text-sm list-disc marker:text-pink-500 space-y-1 w-full'>
        <li>Everything in Free</li>
        <li>All Conversations</li>
        <li>Audio for conversations</li>
        <li>Color customization</li>
        <li>Monthly, yearly or lifetime access</li>
      </ul>
      </div>

    </div>

    <Dialog>
  <DialogTrigger asChild>
    <Button className="cursor-pointer" onClick={handleOptions}>
      {isSubscribed ? "Already subscribed. Change plan?" : "Explore Pro Options"}
    </Button>
  </DialogTrigger>

  <DialogContent className={`min-w-1/2 h-auto p-10 ml-2 ${geist.className}`}>
    <DialogHeader>
      <DialogHeader>
  <DialogTitle className='text-2xl'>Explore Pro Options</DialogTitle>
  <DialogDescription>
    Choose the plan that works for you.
  </DialogDescription>

  <div className="flex flex-row justify-center items-center gap-2 mt-4">
    {paidOptions.map((option, index) => (
      <div
        key={index}
        className="flex flex-col justify-between items-center p-2 border-2 rounded-md w-1/3 h-80"
      >
        <div className="flex flex-col items-center flex-grow">
          <Badge className="mb-2 bg-pink-500 text-white">{option.title} - ${option.price}</Badge>
          <div className='mb-5'>{option.info}</div>
          <ul className="text-sm list-disc marker:text-pink-500 space-y-1 text-left px-4 text-zinc-500 mb-2">
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