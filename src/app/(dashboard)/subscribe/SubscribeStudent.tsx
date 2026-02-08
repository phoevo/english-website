import { Button } from '@/components/ui/button'
import { CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { DialogHeader, Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import React from 'react'
import { useUserStore } from '@/data/useUserStore'
import { DM_Sans, Geist } from 'next/font/google'
import { subscribeUser2 } from '@/data/getData'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation';

const dmSans = DM_Sans({ subsets: ['latin'] });
const geist = Geist({ subsets: ['latin'] });


function SubscribeStudent() {


  const {user, isSubscribed} = useUserStore();
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
    <div className=''>
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
          <div className="flex flex-col rounded-lg space-y-5 h-auto">
            <CardHeader />
            <CardContent>
              <div className='flex flex-col gap-5 w-full'>
                <div className='flex flex-col md:flex-col lg:flex-row gap-5'>
                  <div className='flex flex-col justify-between p-2 bg-muted rounded-xl h-100 w-xs md:w-md text-muted-foreground shadow-md'>
                    <div className='flex flex-col items-center flex-grow'>
                  <Badge className='mb-10'>Free</Badge>
                  <div className='flex justify-center'>
                  <ul className='text-base list-disc marker:text-popover-foreground space-y-1 justify-start'>
                    <li>8 conversations, 2 per level, A1-B2</li>
                    <li>Hover</li>
                    <li>Dictionary and Word Board</li>
                    <li>Streaks</li>
                    <li>Daily Tasks</li>
                    <li>Assignments Page</li>
                  </ul>
                  </div>

                </div>
                    {isSubscribed ? (
                      <Button variant="default" className="w-full cursor-not-allowed opacity-50" disabled>
                        Subscribed
                      </Button>
                    ) : (
                      <Link href="/home" className="w-full">
                        <Button variant="default" className="w-full cursor-pointer">
                          Remain on Free
                        </Button>
                      </Link>
                    )}
                  </div>

                  <div className='flex flex-col justify-between p-2 bg-background border rounded-xl h-100 w-xs md:w-md shadow-sm'>
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
                {isSubscribed ? "Already subscribed. Change plan?" : "See Plans"}
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
          <ul className="list-disc text-sm text-left lg:items-center lg:text-base marker:text-pink-500 space-y-1 px-4 text-muted-foreground mb-2">
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
  <Button
  variant="outline"
  className="w-full"
  onClick={() => handleStudentSubscribe(option.planName)}
>
  Get {option.planName}
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
        </div>
      </div>

    </div>
  )
}

export default SubscribeStudent
