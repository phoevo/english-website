"use client"

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
import { subscribeUser2 } from '@/data/getData'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation';
import { ScrollArea } from '@/components/ui/scroll-area'

const geist = Geist({ subsets: ['latin'] })
const dmSans = DM_Sans({ subsets: ['latin'] });

export function SubscribeClient() {
  const {isSubscribed, user} = useUserStore();
  const router = useRouter();

  const handleStudentSubscribe = async (plan: string) => {
    if (!user?.$id) {
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
      title: "Monthly",
      planName: "Student Monthly",
      price: "4.99",
      info: "Standard Pricing",
      desc: [
        "Ideal for trying out Synomilo, or commiting to a short language learning journey.",
        "Pro access, billed monthly.",
        "Flexible; cancel anytime.",
      ],
    },
    {
      title: "Yearly",
      planName: "Student Yearly",
      price:"49.99",
      info: "Over 15% cheaper than Monthly",
      desc: [
        "Ideal for those who want to commit to a long-term journey.",
        "Pro access, billed yearly.",
        "Access to all existing and new content within the year of purchase.",
      ]
    }
  ]

  return (
    <ScrollArea className='w-full h-screen overflow-y-auto'>
      <div className='flex flex-col justify-center items-center'>
        <div className="flex flex-col rounded-lg w-full lg:w-1/2 space-y-5 mt-5 h-auto ">
          <CardHeader>
            <CardTitle className={`text-3xl font-normal ${dmSans.className}`}>Subscribe</CardTitle>
            <CardDescription className='text-md'>
              Subscribe to get access to the most Synomilo has to offer.
            </CardDescription>
          </CardHeader>
        </div>

        <div className='flex flex-row justify-center w-full mt-5 gap-15'>
          <div className="flex flex-col border-2 p-0 lg:p-10 rounded-lg space-y-5 w-full lg:w-1/2 h-auto">
            <CardHeader />
            <CardContent>
              <div className='flex flex-col gap-5 w-full'>
                <div className='flex flex-col md:flex-col lg:flex-row gap-5'>
                  <div className='flex flex-col justify-between p-2 border-2 rounded-lg h-60 lg:h-80 w-full text-muted-foreground'>
                    <div className='flex flex-col items-center flex-grow'>
                      <Badge className='mb-4'>Free</Badge>
                      <div className='flex justify-center'>
                        <ul className='text-sm list-disc marker:text-popover-foreground space-y-1 justify-start'>
                          <li>8 conversations, 2 per level, A1–B2</li>
                          <li>Hover</li>
                          <li>Dictionary and Word Board</li>
                          <li>Streaks</li>
                          <li>Daily Tasks</li>
                          <li>Assignments Page</li>
                        </ul>
                      </div>
                    </div>
                    {isSubscribed ? (
                      <Button variant="outline" className="w-full cursor-not-allowed opacity-50" disabled>
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

                  <div className='flex flex-col justify-center p-0 lg:p-2 border-1 rounded-lg h-60 lg:h-80 w-full shadow-[0_0_1px_1px] shadow-pink-500'>
                    <div className='flex flex-col items-center flex-grow'>
                      <Badge className='mb-4 bg-pink-500 text-white'>Pro</Badge>
                      <div className='flex justify-center items-center'>
                        <ul className='text-sm text-muted-foreground list-disc marker:text-pink-500 space-y-1 w-full'>
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
                      <DialogContent className={`w-full lg:min-w-1/2 h-auto p-10 ml-2 ${geist.className}`}>
                        <DialogHeader>
                          <DialogHeader>
                            <DialogTitle className='text-2xl'>See Student Plans</DialogTitle>
                            <DialogDescription>
                              These plans are part of our early access period and will increase as we continue building and improving Synomilo. Your rate is locked in and won’t change, even after future pricing updates.
                            </DialogDescription>
                            <DialogDescription>
                              Thank you for supporting our work and being part of the early supporters.
                            </DialogDescription>
                          </DialogHeader>
                        </DialogHeader>
                        <div className='flex flex-col lg:flex-row h-auto lg:w-auto gap-5'>
                          {paidOptions.map((p) => (
                            <div key={p.planName} className='flex flex-col justify-between p-2 border-2 rounded-lg h-auto lg:h-80 lg:w-1/2'>
                              <div className='flex flex-col items-center flex-grow'>
                                <Badge className='mb-4 bg-pink-500'>{p.title} - ${p.price}</Badge>
                                <div className='text-sm m-0 lg:mb-3 text-foreground'>{p.info}</div>
                                <ul className='text-sm text-muted-foreground list-disc marker:text-pink-500 space-y-1 mt-3 px-10'>
                                  {p.desc.map((d, i) => (<li key={i}>{d}</li>))}
                                </ul>
                              </div>
                              <Button disabled variant={'outline'} className='w-full cursor-pointer mt-3' onClick={() => handleStudentSubscribe(p.planName)}>
                                Disabled during beta
                              </Button>
                            </div>
                          ))}
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </div>
            </CardContent>
          </div>
        </div>
      </div>
    </ScrollArea>
  )
}
