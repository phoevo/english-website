'use client'

import React, { useEffect, useState } from 'react'
import { account, databaseId, databases, usersCollectionId } from '@/data/appwrite'  // Import appwrite functions
import { getConversationFromDB } from '@/data/appwrite'  // Import the utility function
import Link from 'next/link'
import { Skeleton } from '@/components/ui/skeleton'

function RecentsPage() {
  const [userName, setUserName] = useState<string | null>(null)
  const [recentConversations, setRecentConversations] = useState<any[]>([])  // To hold all recent conversations
  const [isCheckingUser, setIsCheckingUser] = useState(true)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await account.get()
        setUserName(user.name)


        // Fetch the user document to get recentConversations array
        const userDoc = await databases.getDocument(databaseId, usersCollectionId, user.$id)

        // Assuming the user document has a field 'recentConversations' which is an array of IDs
        const conversationIds = userDoc.recentConversations || []

        // Now fetch all conversations using the IDs
        const conversations = []
        for (const conversationId of conversationIds) {
          const conversation = await getConversationFromDB(conversationId)
          conversations.push(conversation)
        }

        // Set all fetched conversations to the state
        setRecentConversations(conversations)

      } catch (error) {
        console.error("Error fetching user or conversations:", error)
      } finally {
        setIsCheckingUser(false)
      }
    }

    fetchUser()
  }, [])

  return (
    <div className="m-10 space-y-4">
      {isCheckingUser ? (
        <div className="space-y-5">
          <Skeleton className='w-[530px] h-[32px]'/>
          <Skeleton className='w-[430px] h-[15px]'/>
        </div>
      ) : userName ? (
        <>
          <h1 className="text-2xl">Hello {userName}, here are your recent conversations...</h1>
          <p>Conversations you&apos;ve interacted with will appear here.</p>
          {recentConversations.length > 0 ? (
            recentConversations.map((conversation) => (
              <div key={conversation.$id} className="p-4 border-b">
                <h2>{conversation.title}</h2>
                <p>{conversation.lastMessage}</p>
              </div>
            ))
          ) : (
            <p>No recent conversations found.</p>
          )}
        </>
      ) : (
        <p>
          Please <Link href="/login" className="underline">log in</Link> or{' '}
          <Link href="/register" className="underline">create an account</Link> to view your recent conversations.
        </p>
      )}
    </div>
  )


}

export default RecentsPage
