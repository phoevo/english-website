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
import { sendWelcomeEmail } from '@/services/emailService'
import { CircleAlert } from 'lucide-react'

export default function Onboarding() {
  const [role, setRole] = useState<'student' | 'tutor' | null>(null)
  const router = useRouter()
  const { user, setIsTeacher, fetchUser } = useUserStore()
  const [isBootstrapping, setIsBootstrapping] = useState(true)

  useEffect(() => {
  console.log("ONBOARDING MOUNTED")
}, [])


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
      onboardingComplete: true,
    })

    setIsTeacher(role === 'tutor')
    toast.success('Account created. Welcome!')
    router.push('/home')
  } catch (error) {
    console.error("Failed to update user role:", error)
    toast.error('Something went wrong. Please try again.')
  }
}



  return (
    <div className="flex flex-col w-full gap-10">
      <CardHeader>
        <CardTitle className="text-xl">Welcome to Synomilo early access</CardTitle>
        <CardDescription>Any feedback is highly appreciated</CardDescription>
      </CardHeader>

        <CardContent className='space-y-5'>

           <div className="p-3 rounded-xl bg-muted text-sm border border-red-500 flex flex-row items-center gap-2">
            <CircleAlert size={50} className='text-red-500'/>
            <p>
              Synomilo is designed to be used during online lessons. For the best experience, it&apos;s recommended to use a laptop or desktop rather than a mobile device.
            </p>
        </div>

        </CardContent>



      <CardContent className="space-y-6">

      <p>I&apos;m signing up as a...</p>

        <RadioGroup
          value={role || ''}
          onValueChange={(val) => setRole(val as 'student' | 'tutor')}
          className='flex flex-col lg:flex-col justify-start'
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="student" id="student" className='cursor-pointer' />
            <Label className="text-md cursor-pointer" htmlFor="student">Student </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="tutor" id="tutor" className='cursor-pointer' />
            <Label className="text-md" htmlFor="tutor">Tutor</Label>
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
