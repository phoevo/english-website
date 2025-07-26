  "use client"
  import { useState, useEffect } from 'react'
  import { CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
  import React from 'react'
  import { useSearchParams } from 'next/navigation'
  import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogTitle } from '@/components/ui/alert-dialog'
  import { CheckCircle, XCircle } from 'lucide-react'
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
  import { subscribeUser, getSubscription, subscribeUser2 } from '@/data/getData'
  import { toast } from 'sonner'
  import {
    Card,
    CardFooter,

  } from "@/components/ui/card"
  import { useRouter } from 'next/navigation';
  import { ScrollArea } from '@/components/ui/scroll-area'
  import { ArrowDown, Book, Briefcase, CircleArrowDown, CircleArrowUp, GraduationCap, Notebook, User } from 'lucide-react'


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
      <CardContent key={idx} className='flex flex-row items-center justify-center'>

        <div className='w-auto flex flex-col items-center'>
          <div className='flex items-center justify-center relative p-5'>
            <User strokeWidth={1} size={90} />
            <Notebook className="absolute bottom-5 ml-10 bg-card z-10" size={30} />
          </div>
          <Badge className={studentIsPro ? "bg-pink-500" : ""}>{tier.studentBadge}</Badge>
        </div>

        <div className='w-auto flex flex-col items-center'>
          <div className='flex items-center justify-center relative p-5'>
            <User strokeWidth={1} size={90} />
            <Briefcase className="absolute bottom-2 ml-10 bg-card z-10" size={40} />
          </div>
          <Badge className={tutorIsPro ? "bg-pink-500" : ""}>{tier.tutorBadge}</Badge>
        </div>


        <div className='flex items-center justify-start relative w-2/3'>
          <ul className='text-sm space-y-2'>
            {tier.features.map((f, i) => (
              <li key={i} className='flex flex-row gap-1 items-center'>
                {f.icon}
                {f.text}
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
    const searchParams = useSearchParams();
    const [showCancelMessage, setShowCancelMessage] = useState(false);

    const router = useRouter();

    useEffect(() => {
      const canceled = searchParams.get('canceled');

      if (canceled === 'true') {
        setShowCancelMessage(true);
        // Hide the message after 8 seconds
        const timer = setTimeout(() => setShowCancelMessage(false), 8000);
        return () => clearTimeout(timer);
      }
    }, [searchParams]);

    function handleOptions(){
      setIsVisible(!isVisible);
    }

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

      // Show loading toast while redirecting to Stripe
      toast.loading("Redirecting to payment...", { id: 'subscription-loading' });
      
      await subscribeUser2(user.$id, plan);
      
      // Note: Don't set subscription or show success here!
      // The success will be handled after successful payment redirect back from Stripe
      // The actual subscription status will be updated via webhook
      
    } catch (err) {
      console.error("Subscription failed", err);
      toast.dismiss('subscription-loading');
      toast.error("Failed to subscribe. Make sure you're logged in or try again later.");
    }
  };

  const handleTutorSubscribe = async () => {
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
        planName: "Student Monthly",
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

      <ScrollArea className='w-full h-screen overflow-y-auto'>
<div className='flex flex-col justify-center items-center'>


         <AlertDialog open={showCancelMessage}>
  <AlertDialogContent className={`bg-background border-red-400 ${dmSans.className}`}>
    <div className="flex flex-col items-center text-center gap-2">
      <CheckCircle className="h-6 w-6 text-red-500" />
      <AlertDialogTitle className="text-red-500 text-2xl">Payment Canceled</AlertDialogTitle>
      <AlertDialogDescription className="text-red-500 text-md mt-2">
        You didn’t finish checking out. That’s okay, come back anytime when you’re ready!
      </AlertDialogDescription>
       <AlertDialogFooter>
          <Button variant="default" className="cursor-pointer" onClick={() => setShowCancelMessage(false)}>
            Close
          </Button>
        </AlertDialogFooter>
    </div>
  </AlertDialogContent>
</AlertDialog>




 <div className="flex flex-col rounded-lg w-1/2 space-y-5 mt-5 h-auto ">


        <CardHeader>
        <CardTitle className={`text-3xl font-normal ${dmSans.className}`}>Subscribe</CardTitle>
        <CardDescription className='text-md'>
          Subscribe to get access to the most Synomilo has to offer.
        </CardDescription>
      </CardHeader>
  </div>


  {/* <div className='flex flex-col w-1/2 mt-5 gap-15'> */}
    <div className='flex flex-row justify-center w-full mt-5 gap-15'>

      <div className="flex flex-col border-2 p-10 rounded-lg space-y-5 w-1/2 h-auto">
        <CardHeader>
        {/* <CardTitle className="text-lg font-semibold">For Students</CardTitle> */}
      </CardHeader>
      <CardContent>

      <div className='flex flex-col gap-5 w-full'>

      {/* <div className='flex flex-col gap-5'> */}
        <div className='flex flex-row gap-5'>
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
    <Link href="/home" className="w-full">
      <Button variant="secondary" className="w-full cursor-pointer">
        Remain on Free
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

    <DialogContent className={`min-w-2/3 h-auto p-10 ml-2 ${geist.className}`}>
      <DialogHeader>
        <DialogHeader>
    <DialogTitle className='text-2xl'>See Student Plans</DialogTitle>
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
            className={`mt-4 ${!isTeacher ? 'cursor-pointer' : 'cursor-not-allowed opacity-60'}`}
            onClick={() => !isTeacher ? handleStudentSubscribe(option.planName) : null}
            disabled={isTeacher}>
            {!isTeacher ? `Get ${option.title}` : 'Requires Student Account'}
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
    </div>


    {/* <div className="flex flex-col p-2 bg-muted shadow-md rounded-lg space-y-5 w-1/2 h-auto">
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
    <Link href="/home" className="w-full">
      <Button variant="secondary" className="w-full cursor-pointer">
        Remain on Free
      </Button>
    </Link>
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
      <Button variant="outline" className="cursor-pointer" >
        {isSubscribed ? "Already subscribed. Change plan?" : "See Tutor Plans"}
      </Button>
    </DialogTrigger>

    <DialogContent className={`min-w-2/3 h-auto p-10 ml-2 ${geist.className}`}>
      <DialogHeader>
        <DialogHeader>
    <DialogTitle className='text-2xl'>See Monthly Tutor Plans</DialogTitle>
    <DialogDescription>
    These plans are part of our early access period and will increase as we continue building and improving Synomilo. Your rate is locked in and won’t change, even after future pricing updates.
  </DialogDescription>
  <DialogDescription>
    Thank you for supporting our work and being part of the early supporters.
  </DialogDescription>



    <div className="flex flex-row justify-center items-center gap-4 mt-4">
      {tutorPlans.map((plan, index) => (
    <div
      key={index}
      className="flex flex-col p-4 border-1 rounded-xl w-1/3 h-65 shadow-md"

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
        className={`w-full mt-auto ${isTeacher ? 'cursor-pointer' : 'cursor-not-allowed opacity-60'}`}
        onClick={isTeacher ? handleTutorSubscribe : undefined}
        disabled={!isTeacher}
      >
        {isTeacher ? `Get ${plan.title}` : 'Requires Tutor Account'}
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
    </div>
  </div>

  <div>
    <ArrowDown size={30}/>
  </div>

  <Card className='h-auto w-auto bg-card mb-22 shadow-none border-1'>
    <CardHeader>
      <CardTitle className='text-2xl'>More about Pricing and Subscriptions</CardTitle>
      <CardDescription>How Tutors and Students interact depends on who owns a subscription</CardDescription>
    </CardHeader>

    {tiers.map(renderTier)}
  </Card> */}

  {/* <Card className='h-auto w-2/3 bg-card m-22'>
    <CardHeader>
      <CardTitle className='text-2xl'>More about Pricing and Subscriptions</CardTitle>
      <CardDescription>How Tutors and Students interact depends on who owns a subscription</CardDescription>

    </CardHeader>

    <CardContent className='flex flex-row'>

      <div className='w-1/4 flex flex-col items-center'>
      <div className='flex items-center justify-center relative p-5'>
        <User strokeWidth={1} size={90} className='asbolute'/>
        <Notebook size={30} className="absolute bottom-5 ml-10 bg-card z-10"/>
      </div>
        <Badge>Free</Badge>
      </div>

      <div className='flex items-center justify-center relative w-2/3'>
        <ul className='text-md space-y-1'>
          <li className='flex flex-row gap-1 items-center'> <CircleArrowDown className="text-red-500" size={18}/>Tutor can assign a total of 12 Conversations to Student</li>
          <li className='flex flex-row gap-1 items-center'> <CircleArrowDown className="text-red-500" size={18}/>Student can not review and practice any Conversation in their own time</li>
          <li className='flex flex-row gap-1 items-center'> <CircleArrowDown className="text-red-500" size={18}/>Tutor only has 2 active Student slots</li>
        </ul>
      </div>

      <div className='w-1/4 flex flex-col items-center'>
      <div className='flex items-center justify-center relative p-5'>
        <User strokeWidth={1} size={90} className='asbolute'/>
        <Briefcase size={40} className="absolute bottom-2 ml-10 bg-card z-10"/>
      </div>
        <Badge>Free</Badge>
      </div>


    </CardContent>

    <CardContent className='flex flex-row'>

      <div className='w-1/4 flex flex-col items-center'>
      <div className='flex items-center justify-center relative p-5'>
        <User strokeWidth={1} size={90} className='asbolute'/>
        <Notebook size={30} className="absolute bottom-5 ml-10 bg-card z-10"/>
      </div>
        <Badge className='bg-pink-500'>Pro</Badge>
      </div>

      <div className='flex items-center justify-center relative w-2/3'>
        <ul className='text-md space-y-1'>
          <li className='flex flex-row gap-1 items-center'> <CircleArrowUp className="text-green-500" size={18}/>Tutor can assign any Conversation to student</li>
          <li className='flex flex-row gap-1 items-center'> <CircleArrowUp className="text-green-500" size={18}/>Student can review and practice any Conversation in their own time</li>
          <li className='flex flex-row gap-1 items-center'> <CircleArrowDown className="text-red-500" size={18}/>Tutor only has 2 active Student slots</li>
        </ul>
      </div>

      <div className='w-1/4 flex flex-col items-center'>
      <div className='flex items-center justify-center relative p-5'>
        <User strokeWidth={1} size={90} className='asbolute'/>
        <Briefcase size={40} className="absolute bottom-2 ml-10 bg-card z-10"/>
      </div>
        <Badge>Free</Badge>
      </div>


    </CardContent>

    <CardContent className='flex flex-row items-center'>
      <div className='w-1/4 flex flex-col items-center'>
      <div className='flex items-center justify-center relative p-5'>
        <User strokeWidth={1} size={90} className='asbolute'/>
        <Notebook size={30} className="absolute bottom-5 ml-10 bg-card z-10"/>
      </div>
        <Badge>Free</Badge>
      </div>

      <div className='flex items-center justify-center relative w-2/3'>
        <ul className='text-md space-y-1'>
          <li className='flex flex-row gap-1 items-center'> <CircleArrowUp className="text-green-500" size={18}/>Tutor can assign any Conversation to student</li>
          <li className='flex flex-row gap-1 items-center'> <CircleArrowDown className="text-red-500" size={18}/>Student can not review and practice any Conversation in their own time</li>
          <li className='flex flex-row gap-1 items-center'> <CircleArrowUp className="text-green-500" size={18}/>Tutor has 5/15/30 active Student slots</li>
        </ul>
      </div>

      <div className='w-1/4 flex flex-col items-center'>
      <div className='flex items-center justify-center relative p-5'>
        <User strokeWidth={1} size={90} className='asbolute'/>
        <Briefcase size={40} className="absolute bottom-2 ml-10 bg-card z-10"/>
      </div>
        <Badge className='bg-pink-500'>Pro</Badge>
      </div>
    </CardContent>

    <CardContent className='flex flex-row items-center'>
      <div className='w-1/4 flex flex-col items-center'>
      <div className='flex items-center justify-center relative p-5'>
        <User strokeWidth={1} size={90} className='asbolute'/>
        <Notebook size={30} className="absolute bottom-5 ml-10 bg-card z-10"/>
      </div>
        <Badge className='bg-pink-500'>Pro</Badge>
      </div>

      <div className='flex items-center justify-center relative w-2/3'>
        <ul className='text-md space-y-1'>
          <li className='flex flex-row gap-1 items-center'> <CircleArrowUp className="text-green-500" size={18}/>Tutor can assign any Conversation to student</li>
          <li className='flex flex-row gap-1 items-center'> <CircleArrowUp className="text-green-500" size={18}/>Student can review and practice any Conversation in their own time</li>
          <li className='flex flex-row gap-1 items-center'> <CircleArrowUp className="text-green-500" size={18}/>Tutor has 5/15/30 active Student slots</li>
        </ul>
      </div>

      <div className='w-1/4 flex flex-col items-center'>
      <div className='flex items-center justify-center relative p-5'>
        <User strokeWidth={1} size={90} className='asbolute'/>
        <Briefcase size={40} className="absolute bottom-2 ml-10 bg-card z-10"/>
      </div>
        <Badge className='bg-pink-500'>Pro</Badge>
      </div>
    </CardContent>

  </Card> */}

  </div>
  </div>

  </ScrollArea>


    )
  }

  export default SubscribePage