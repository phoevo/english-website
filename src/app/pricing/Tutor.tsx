import React from 'react'
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useUserStore } from '@/data/useUserStore'
import { motion } from 'motion/react';
import { DM_Sans, Geist } from 'next/font/google';
import Link from 'next/link';
import router from 'next/router';
import { toast } from 'sonner';
import { subscribeUser2 } from '@/data/getData';


const geist = Geist({ subsets: ['latin'] })
const dmSans = DM_Sans({ subsets: ['latin'] });

function Tutor() {
  const {user, isSubscribed, isTeacher} = useUserStore();

   const handleTutorSubscribe = async (plan: string) => {
    if (!user?.$id && isTeacher) {
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

  const tutorPlans = [
  {
    title: "Tutor Monthly",
    info: "",
    planName:"Tutor Monthly",
    desc: [
      "Ideal for Tutors starting out",
      "No long term commitment",
      "Get a feel of what Plus offers"
    ],
    price: "9.99",
    priceId: "price_tutor5_monthly"
  },
  {
    title: "Tutor Yearly",
    info: "Over 20% cheaper than Monthly, about €7.50/month",
    planName: "Tutor Yearly",
    desc: [
      "Best for active Tutors",
      "Lots of Students, little time to prepare",
      "Pay once, full year of access with future updates."
    ],
    price: "89.99",
    priceId: "price_tutor15_monthly"
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
    variant="default"
    className="w-full cursor-not-allowed"
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
      <Badge className='mb-10 bg-pink-500 text-white'>Plus</Badge>
      <div className='flex justify-center items-center'>
      <ul className='text-base text-muted-foreground list-disc marker:text-pink-500 px-10 space-y-1 w-full'>
        <li>All conversations A1-C2 in read-only</li>
        <li>Assignments page: Track and manage your students</li>
        <li>Assign feature: Assign conversations to your students. Students view assigned conversations with Plus features, even they have a free accounts</li>
      </ul>


      </div>


    </div>

    <Dialog>
  <DialogTrigger asChild>
    <Button variant="outline" className="cursor-pointer" >
      {isTeacher && isSubscribed ? "Subscribed" : "See Tutor Plans"}
    </Button>
  </DialogTrigger>

  <DialogContent className={`lg:min-w-4xl h-auto p-10 ml-2  ${geist.className}`}>
    <DialogHeader>
      <DialogHeader>
  <DialogTitle className='text-2xl'>Tutor Plans</DialogTitle>
  <DialogDescription>
  These plans are part of the early access period and will increase as I continue building and improving Synomilo.
  <span className='text-green-500'> Your rate is locked in and won’t change, even after future pricing updates.</span>
</DialogDescription>
<DialogDescription>
  I&apos;m grateful for your contribution and for being one of the platform&apos;s first supporters.
</DialogDescription>



  <div className="flex flex-col lg:flex-row justify-center items-center gap-4 mt-4">
    {tutorPlans.map((plan, index) => (
  <div
    key={index}
    className="flex flex-col justify-between p-4 border-1 rounded-xl w-full lg:w-sm h-60 lg:h-90 shadow-md"

  >
    <div className="flex flex-col items-start">
              <div className='flex flex-row gap-2 items-center my-2'>
                <h1 className='lg:text-xl font-semibold'>{plan.title}</h1>
                <Badge className="bg-pink-500 text-white ">€{plan.price}</Badge>
              </div>
              <div className='mb-4 text-sm text-muted-foreground'>{plan.info}</div>
              <ul className="list-disc text-xs text-left lg:items-center lg:text-sm marker:text-pink-500 space-y-1 px-4 text-muted-foreground mb-2">
              {plan.desc.map((item, i) => (
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
    <Button
      variant="outline"
      className="w-full cursor-pointer"
      onClick={() => handleTutorSubscribe(plan.planName)}
    >
      Get {plan.planName}
    </Button>
) : !isTeacher ? (
  <Button
    variant="outline"
    className="w-full cursor-not-allowed"
    disabled
  >
    Requires Tutor account
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
      </div>






    </CardContent>
  </motion.div>



            </CardContent>

          </Card>

    </div>
  )
}

export default Tutor
