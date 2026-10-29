'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { account } from '@/data/appwrite'
import { ensureUserDocument } from '@/data/getData'
import AuthLoading from '@/components/auth/AuthLoading'
import { sendWelcomeEmail } from '@/services/emailService'

export default function OAuthCallback() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const started = useRef(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (started.current) return
    started.current = true

    const handleOAuthCallback = async () => {
      const userId = searchParams.get('userId')
      const secret = searchParams.get('secret')
      const requestedRedirect = searchParams.get('redirect') || '/home'
      const redirect = requestedRedirect.startsWith('/') &&
        !requestedRedirect.startsWith('//') &&
        !requestedRedirect.includes('\\') &&
        requestedRedirect.split(/[?#]/)[0] !== '/onboarding'
        ? requestedRedirect
        : '/home'

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

        const { created } = await ensureUserDocument()

        if (created) {
          const user = await account.get()

          try {
            await sendWelcomeEmail({
              userEmail: user.email,
              userName: user.name || user.email,
            })
          } catch (err) {
            console.warn('Welcome email failed:', err)
          }
        }

        router.replace(redirect)
      } catch (err) {
        console.error('OAuth sign-in or account setup failed:', err)
        setError('Failed to complete sign-in. Please try logging in again.')
      }
    }

    void handleOAuthCallback()
  }, [router, searchParams])

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center gap-4">
        <p role="alert" className="text-red-500">{error}</p>
        <a href="/login" className="underline">Back to login</a>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <AuthLoading />
    </div>
  )
}
