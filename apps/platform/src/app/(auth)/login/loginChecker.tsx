'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { account } from '@/data/appwrite'

export default function LoginChecker() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await account.get()
        setIsLoggedIn(true)
      } catch {
        setIsLoggedIn(false)
      }
    }

    checkAuth()
  }, [])

  if (isLoggedIn === null) {
    return (
      <Button
        className=" md:border-none md:flex lg:flex cursor-default bg-none"
        variant="ghost"
        size="sm"
        disabled
      >
        <Loader2 className="h-4 w-4 animate-spin p-[22px]" />
      </Button>
    )
  }

  return (
    <Link href={isLoggedIn ? '/home' : '/login'}>
      <Button
        className="border border-foreground md:border-none md:block lg:block cursor-pointer hover:bg-gradient"
        variant="ghost"
        size="sm"
      >
        {isLoggedIn ? 'Home' : 'Log in'}
      </Button>
    </Link>
  )
}