'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
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

  if (isLoggedIn === null) return null

  return (
    <Link href={isLoggedIn ? '/home' : '/login'}>
      <Button
        className="hidden md:block lg:block cursor-pointer hover:bg-gradient"
        variant="ghost"
      >
        {isLoggedIn ? "Home" : "Log in"}
      </Button>
    </Link>
  )
}