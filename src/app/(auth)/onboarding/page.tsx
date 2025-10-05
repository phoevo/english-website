'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'

import { account, databases, databaseId, usersCollectionId } from '@/data/appwrite'
import { ensureUserDocument } from '@/data/getData'
import { useUserStore } from '@/data/useUserStore'
import { Badge } from '@/components/ui/badge'
import { sendWelcomeEmail } from '@/services/emailService'

export default function Onboarding() {
  const [role, setRole] = useState<'student' | 'tutor' | null>(null)
  const router = useRouter()
  const { user, setIsTeacher, fetchUser } = useUserStore()
  const [isPro, setIsPro] = useState(false)
  const [isBootstrapping, setIsBootstrapping] = useState(true)


  useEffect(() => {
    (async () => {
      try {

        try {
          const jwt = await account.createJWT();
          localStorage.setItem('jwt', jwt.jwt);
        } catch (e) {
          console.warn('Failed to create JWT (non-blocking):', e);
        }

        try {
          const authUser = await account.get();
          const currentName = (authUser?.name || '').trim();

          try {
            const session = await account.getSession('current');
            const provider = (session as unknown as { provider?: string })?.provider;
            if (provider === 'google') {
              const fullName = currentName;
              const firstName = (fullName || '').split(/\s+/)[0] || '';
              if (firstName && firstName !== fullName && firstName.length >= 2) {
                try {
                  await account.updateName(firstName);
                } catch (e) {
                  console.warn('Failed to set first-name username after Google OAuth:', e);
                }
              }
            }
          } catch (e) {
            console.warn('Failed to inspect current session provider (non-blocking):', e);
          }

          if (!currentName) {
            const email = authUser?.email || '';
            const localPart = email.split('@')[0] || 'user';
            const sanitized = localPart.replace(/[^a-zA-Z0-9_]/g, '_').slice(0, 24);
            const fallbackName = sanitized.length >= 2 ? sanitized : 'user';
            try {
              await account.updateName(fallbackName);
            } catch (e) {
              console.warn('Failed to set fallback username:', e);
            }
          }
        } catch (e) {
          console.warn('Failed to inspect/update auth user name (non-blocking):', e);
        }

        try {
          const { created } = await ensureUserDocument();

          // Send welcome email exactly once on first user creation (covers Google signups)
          if (created) {
            try {
              const u = await account.get();
              await sendWelcomeEmail({ userEmail: u.email, userName: (u.name || '').trim() });
            } catch (e) {
              console.warn('Welcome email failed (non-blocking):', e);
            }
          }
        } catch {}

        try {
          await fetchUser();
        } catch (e) {
          console.warn('fetchUser failed (non-blocking):', e);
        }
      } catch (e) {
        console.error('Post-OAuth onboarding setup failed:', e);
      } finally {
        setIsBootstrapping(false);
      }
    })();
  }, [fetchUser]);

  const handleFinish = async () => {
  if (!role) {
    toast.error("Please select a role.")
    return
  }

  if (!user) {
    toast.error("User not loaded yet.")
    return
  }

  try {
    await databases.updateDocument(databaseId, usersCollectionId, user.$id, {
      isTeacher: role === 'tutor',
    })

    setIsTeacher(role === 'tutor')
    toast.success('Onboarding complete! Welcome')
    router.push('/home')
  } catch (error) {
    console.error("Failed to update user role:", error)
    toast.error('Something went wrong. Please try again.')
  }
}



  return (
    <div className="flex flex-col w-full gap-10">
      <CardHeader>
        <CardTitle className="text-xl">Thanking you for signing up to the Synomilo beta</CardTitle>
        <CardDescription>Any feedback is highly appreciated</CardDescription>
      </CardHeader>

        <CardContent className='space-y-5'>

           <div className="p-3 rounded-xl bg-muted text-sm text-muted-foreground flex items-start gap-2">
            <p>
              Synomilo is designed for online lessons. For the best experience, we recommend using a laptop or desktop screen rather than a mobile device.
            </p>
        </div>
          <p>During the beta, you will be able to freely switch between the free and pro tiers in the navigation menu.</p>
          <div className='flex flex-row gap-2 items-center'>
          <p>As so</p>
          <div className="flex flex-row w-20 rounded-full border-1 m-1 shadow-md">
                  <Badge
                    onClick={() => setIsPro(false)}
                    className={`flex-1 text-center rounded-full cursor-pointer transition ${
                      !isPro
                      ? "bg-foreground text-background"
                      : "bg-background text-muted-foreground"
                    }`}
                  >
                    Free
                  </Badge>

                  <Badge
                  onClick={() => setIsPro(true)}
                    className={`flex-1 text-center rounded-full cursor-pointer transition ${
                      isPro
                      ? "bg-pink-500 text-foreground"
                      : "bg-background text-gray-500"
                    }`}
                  >
                    Pro
                  </Badge>
                </div>

                </div>
          <p>For now, continue with a student account.</p>
        </CardContent>



      <CardContent className="space-y-6">
        <RadioGroup
          value={role || ''}
          onValueChange={(val) => setRole(val as 'student' | 'tutor')}
          className='flex flex-col lg:flex-row justify-evenly'
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="student" id="student" className='cursor-pointer' />
            <Label className="text-md cursor-pointer" htmlFor="student">Student </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem disabled value="tutor" id="tutor" className='cursor-pointer' />
            <Label className="text-md text-muted-foreground cursor-not-allowed" htmlFor="tutor">Tutor (coming soon)</Label>
          </div>
        </RadioGroup>

        <Button
          disabled={!role || isBootstrapping || !user}
          onClick={handleFinish}
          className="w-auto cursor-pointer"
        >
          {isBootstrapping || !user ? 'Loading…' : 'Continue'}
        </Button>
      </CardContent>
    </div>
  )
}
