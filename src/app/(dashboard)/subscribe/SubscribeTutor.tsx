import { Button } from '@/components/ui/button'
import { CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import React from 'react'
import { useUserStore } from '@/data/useUserStore'
import { DM_Sans, Geist } from 'next/font/google'
import { subscribeUser2 } from '@/data/getData'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation';

const dmSans = DM_Sans({ subsets: ['latin'] });

const paidOption = {
    title: "Tutor Pro",
    planName: "Tutor Monthly",
    price: "9.99",
    desc: [
      "Upgrade your Student's learning experience",
    ],
  }


function SubscribeTutor() {

  const {user, isSubscribed} = useUserStore();
  const router = useRouter();

  const handleTutorSubscribe = async (plan: string) => {
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




  return (
    <div>
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
          <div className="flex flex-col rounded-lg space-y-5 w-full lg:w-2/3 xl:w-1/2 h-auto">
            <CardHeader />
            <CardContent>
              <div className='flex flex-col gap-5 w-full'>
                <div className='flex flex-col md:flex-col lg:flex-row gap-5'>
                  <div className='flex flex-col justify-between p-2 bg-muted rounded-xl h-100 w-full text-muted-foreground shadow-md'>
                    <div className='flex flex-col items-center flex-grow'>
                  <Badge className='mb-10'>Free</Badge>
                  <div className='flex justify-center'>
                  <ul className='text-base list-disc marker:text-popover-foreground space-y-1 justify-start'>
                    <li>All Conversations, but in read-only</li>
                    <li>Assignments page</li>
                    <li>Manage up to 2 active Students</li>
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

                  <div className='flex flex-col justify-between p-2 bg-background border rounded-xl h-100 w-full shadow-sm'>
                    <div className='flex flex-col items-center flex-grow'>
                      <Badge className='mb-10 bg-pink-500 text-white'>Pro</Badge>
                      <div className='flex justify-center items-center'>
                        <ul className='text-base text-muted-foreground  list-disc marker:text-pink-500 space-y-1 w-full'>
                            <li>Everything in Free</li>
                            <li>Manage unlimited active Students</li>
                        </ul>
                      </div>

                    </div>

                    <Button variant="outline" className="w-full cursor-pointer" onClick={() => handleTutorSubscribe(paidOption.planName)}>
                      Get {paidOption.title}
                    </Button>

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

export default SubscribeTutor
