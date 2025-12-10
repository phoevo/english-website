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
import { useRouter } from 'next/navigation';
import SubscribeStudent from './SubscribeStudent'
import SubscribeTutor from './SubscribeTutor'
import { Skeleton } from '@/components/ui/skeleton'

const geist = Geist({ subsets: ['latin'] })
const dmSans = DM_Sans({ subsets: ['latin'] });

export function SubscribeClient() {
  const { isSubscribed, user, isTeacher, loading } = useUserStore();
  const router = useRouter();

  return (
    <div className='w-full mt-5 h-screen overflow-y-auto'>
      {loading ? (
        <div className='w-full h-screen overflow-y-auto'>
          <div className='flex flex-col justify-center items-center'>
            <div className="flex flex-col rounded-lg w-full lg:w-1/2 space-y-5 mt-5 h-auto">
              <CardHeader>
                          <CardTitle className={`text-3xl font-normal ${dmSans.className}`}>Subscribe</CardTitle>
                          <CardDescription className='text-md'>
                            Subscribe to get access to the most Synomilo has to offer.
                          </CardDescription>
                        </CardHeader>
            </div>

            {/* Plans container: mirrors layout and widths */}
            <div className='flex flex-row justify-center w-full mt-6 gap-15'>
              <div className="flex flex-col rounded-lg space-y-5 w-full lg:w-2/3 xl:w-1/2 h-auto">
                <div className="px-6" />
                <div className="px-6">
                  <div className='flex flex-col md:flex-col lg:flex-row gap-5'>
                    <div className='flex flex-col justify-between p-2 bg-muted/50 rounded-xl h-100 w-full text-muted-foreground shadow-md'>
                      <div className='flex flex-col items-center flex-grow p-4 w-full'>
                        <Skeleton className='h-5 w-16 mb-6' />
                        <div className='w-full'>
                          <div className='flex flex-col gap-2'>
                            <Skeleton className='h-4 w-3/4' />
                            <Skeleton className='h-4 w-2/3' />
                            <Skeleton className='h-4 w-1/2' />
                            <Skeleton className='h-4 w-5/6' />
                          </div>
                        </div>
                      </div>
                      <div className='p-2'>
                        <Skeleton className='h-9 w-full' />
                      </div>
                    </div>

                    <div className='flex flex-col justify-between p-2 bg-background border rounded-xl h-100 w-full shadow-sm'>
                      <div className='flex flex-col items-center flex-grow p-4 w-full'>
                        <Skeleton className='h-5 w-16 mb-6' />
                        <div className='w-full'>
                          <div className='flex flex-col gap-2'>
                            <Skeleton className='h-4 w-3/4' />
                            <Skeleton className='h-4 w-2/3' />
                            <Skeleton className='h-4 w-1/2' />
                            <Skeleton className='h-4 w-5/6' />
                          </div>
                        </div>
                      </div>
                      <div className='p-2'>
                        <Skeleton className='h-9 w-full' />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : isTeacher === true ? (
        <SubscribeTutor />
      ) : (
        <SubscribeStudent />
      )}
    </div>

  )
}
