'use client'

import React, { useEffect, useState } from 'react'
import { databaseId, databases, usersCollectionId, getConversationFromDB } from '@/data/appwrite'
import Link from 'next/link'
import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { useUserStore } from '@/data/useUserStore'

type Conversation = {
  $id: string
  title: string
  level?: string
}

function RecentsPage() {
  const [recentConversations, setRecentConversations] = useState<Conversation[]>([])
  const [isLoadingConversations, setIsLoadingConversations] = useState(true)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const { user, loading } = useUserStore()

  useEffect(() => {
    const fetchConversations = async () => {
      if (!user) return

      try {
        const userDoc = await databases.getDocument(databaseId, usersCollectionId, user.$id)
        const conversationIds: string[] = userDoc.recentConversations || []

        const conversations = await Promise.all(
          conversationIds.map((id: string) => getConversationFromDB(id))
        )

        setRecentConversations(conversations)
      } catch (error) {
        console.error('Error fetching conversations:', error)
      } finally {
        setIsLoadingConversations(false)
      }
    }

    fetchConversations()
  }, [user])

  const handleDelete = async (conversationId: string) => {
    if (!user?.$id) return

    setDeletingId(conversationId)

    setTimeout(async () => {
      const updatedList = recentConversations.filter(c => c.$id !== conversationId)
      setRecentConversations(updatedList)
      setDeletingId(null)

      try {
        await databases.updateDocument(
          databaseId,
          usersCollectionId,
          user.$id,
          {
            recentConversations: updatedList.map(c => c.$id)
          }
        )
      } catch (error) {
        console.error('Failed to update recent conversations:', error)
      }
    }, 0)
  }

  if (loading || isLoadingConversations) {
    return (
      <div className="m-10 space-y-5">
        <Skeleton className="w-[530px] h-[32px]" />
        <Skeleton className="w-[430px] h-[15px]" />
      </div>
    )
  }

  if (!user) {
    return (
      <div className="m-10">
        <p>
          Please <Link href="/login" className="underline">log in</Link> or{' '}
          <Link href="/register" className="underline">create an account</Link> to view your recent conversations.
        </p>
      </div>
    )
  }

  return (
    <div className="m-10 space-y-4">
      <h1 className="text-2xl">Hello {user.name}, here are your recent conversations...</h1>
      <p>Conversations you&apos;ve interacted with will appear here.</p>

      {recentConversations.length > 0 ? (
        <div className="space-y-3">
          <AnimatePresence>
            {recentConversations.map((conversation, index) => (
              <motion.div
                key={conversation.$id}
                layout
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: index * 0.05, ease: 'easeOut' }}
              >
                <div className="flex justify-between items-center border rounded-lg p-4 hover:bg-muted transition">
                  <Link href={`conversations/${conversation.$id}`} className="flex-1">
                    <h2 className="text-lg font-semibold">{conversation.title}</h2>
                    <p className="text-sm text-gray-500">{conversation.level}</p>
                  </Link>
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => handleDelete(conversation.$id)}
                    className="ml-4 cursor-pointer h-5 w-5"
                  >
                    <X />
                  </Button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      ) : (
        <p>No recent conversations found.</p>
      )}
    </div>
  )
}

export default RecentsPage
