'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'

import { databases, databaseId, usersCollectionId, account } from '@/data/appwrite'
import { useUserStore } from '@/data/useUserStore'
import { Notebook } from 'lucide-react'

export default function Onboarding() {
  const [role, setRole] = useState<'student' | 'tutor' | null>(null)
  const router = useRouter()
  const { user, setIsTeacher } = useUserStore()

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
          <p>During the beta, you will be able to freely switch between the free and pro tiers in the navigation menu.</p>
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
            <Label className="text-md" htmlFor="student">Student </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem disabled value="tutor" id="tutor" className='cursor-pointer' />
            <Label className="text-md text-muted-foreground" htmlFor="tutor">Tutor (coming soon)</Label>
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
