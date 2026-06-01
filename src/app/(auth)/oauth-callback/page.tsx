'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { account } from '@/data/appwrite'
import { ensureUserDocument } from '@/data/getData'
import { LoaderCircle } from 'lucide-react'

export default function OAuthCallback() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const handleOAuthCallback = async () => {
      const userId = searchParams.get('userId')
      const secret = searchParams.get('secret')
      const redirect = searchParams.get('redirect') || '/home'

      if (!userId || !secret) {
        setError('Missing OAuth credentials. Please try signing in again.')
        return
      }

      try {
        await account.createSession(userId, secret)

        try {
          const jwt = await account.createJWT()
          localStorage.setItem('jwt', jwt.jwt)
        } catch {}

        try {
          await ensureUserDocument()
        } catch {}

        router.replace(redirect)
      } catch (err) {
        console.error('OAuth session creation failed:', err)
        setError('Failed to complete sign-in. Please try again.')
      }
    }

    handleOAuthCallback()
  }, [router, searchParams])

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center gap-4">
        <p className="text-red-500">{error}</p>
        <a href="/login" className="underline">Back to login</a>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <p>Completing sign-in...</p>
      <LoaderCircle className="animate-spin" size={25}/>

    </div>
  )
}
