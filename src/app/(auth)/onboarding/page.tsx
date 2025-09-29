'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'

import { databases, databaseId, usersCollectionId } from '@/data/appwrite'
import { useUserStore } from '@/data/useUserStore'
import { Badge } from '@/components/ui/badge'

export default function Onboarding() {
  const [role, setRole] = useState<'student' | 'tutor' | null>(null)
  const router = useRouter()
  const { user, setIsTeacher } = useUserStore()
  const [isPro, setIsPro] = useState(false)

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
          disabled={!role}
          onClick={handleFinish}
          className="w-auto cursor-pointer"
        >
          Continue
        </Button>
      </CardContent>
    </div>
  )
}
