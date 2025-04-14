'use client'

import React, { useEffect, useState } from 'react'
import { account } from '@/data/appwrite' // Adjust path based on where your Appwrite client is

function RecentsPage() {
  const [userName, setUserName] = useState<string | null>(null)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await account.get()
        setUserName(user.name) // or user.email if you prefer that
      } catch (error) {
        console.error('Failed to fetch user:', error)
      }
    }

    fetchUser()
  }, [])

  return (
    <div className='m-10 space-y-4'>
      {userName && <h1 className="text-2xl">Hello {userName}, this is where you left off...</h1>}
      <p>Conversations you've interacted with will appear here.</p>
    </div>
  )
}

export default RecentsPage
