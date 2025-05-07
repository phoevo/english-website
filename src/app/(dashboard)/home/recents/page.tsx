'use client'

import React, { useEffect, useState } from 'react'
import { account, databaseId, databases, usersCollectionId } from '@/data/appwrite'
import { getConversationFromDB } from '@/data/appwrite'
import Link from 'next/link'
import { Skeleton } from '@/components/ui/skeleton'

function RecentsPage() {
  const [userName, setUserName] = useState<string | null>(null)
  const [recentConversations, setRecentConversations] = useState<any[]>([])
  const [isCheckingUser, setIsCheckingUser] = useState(true)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await account.get()
        setUserName(user.name)

        const userDoc = await databases.getDocument(databaseId, usersCollectionId, user.$id)
        const conversationIds = userDoc.recentConversations || []

        const conversations = await Promise.all(
          conversationIds.map(async (conversationId: string) =>
            getConversationFromDB(conversationId)
          )
        )

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
          <Skeleton className="w-[530px] h-[32px]" />
          <Skeleton className="w-[430px] h-[15px]" />
        </div>
      ) : userName ? (
        <>
          <h1 className="text-2xl">Hello {userName}, here are your recent conversations...</h1>
          <p>Conversations you&apos;ve interacted with will appear here.</p>
          {recentConversations.length > 0 ? (
            <div className="space-y-3">
              {recentConversations.map((conversation) => (
                <Link
                  key={conversation.$id}
                  href={`conversations/${conversation.$id}`}
                  className="block p-4 border rounded-lg "
                >
                  <h2 className="text-lg font-semibold">{conversation.title}</h2>
                  <p className="text-sm text-gray-500">{conversation.level}</p>
                </Link>
              ))}
            </div>
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
