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
    <div className="flex flex-col w-1/2 gap-10">
      <CardHeader>
        <CardTitle className="text-2xl">I'm signing up as a...</CardTitle>
        <CardDescription>Your role can be changed later</CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        <RadioGroup
          value={role || ''}
          onValueChange={(val) => setRole(val as 'student' | 'tutor')}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="student" id="student" className='cursor-pointer' />
            <Label className="text-md" htmlFor="student">Student</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="tutor" id="tutor" className='cursor-pointer' />
            <Label className="text-md" htmlFor="tutor">Tutor</Label>
          </div>
        </RadioGroup>

        <Button
          disabled={!role}
          onClick={handleFinish}
          className="w-1/3 cursor-pointer"
        >
          Continue
        </Button>
      </CardContent>
    </div>
  )
}
