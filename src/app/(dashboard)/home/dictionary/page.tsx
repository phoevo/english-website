"use client"

import React, { useEffect, useState } from 'react'
import { account, databaseId, databases, usersCollectionId } from '@/data/appwrite'
import { vocab } from '@/data/vocab'
import Link from 'next/link'
import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'

function getWordDetails(wordText: string) {
  return vocab[wordText.toLowerCase()] ?? null
}

function DictionaryPage() {
  const [userName, setUserName] = useState<string | null>(null)
  const [userId, setUserId] = useState<string | null>(null)
  const [savedWords, setSavedWords] = useState<string[]>([])
  const [isCheckingUser, setIsCheckingUser] = useState(true)
  const [deletingWord, setDeletingWord] = useState<string | null>(null)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await account.get()
        setUserName(user.name)
        setUserId(user.$id)

        const userDoc = await databases.getDocument(databaseId, usersCollectionId, user.$id)
        const userSavedWords = userDoc.dictionaryWords || []
        setSavedWords(userSavedWords)

      } catch (error) {
        console.error("Error fetching user or words:", error)
      } finally {
        setIsCheckingUser(false)
      }
    }

    fetchUser()
  }, [])

  const handleDelete = async (wordToDelete: string) => {
    if (!userId) return

    setDeletingWord(wordToDelete) // Trigger animation

    // Wait for the animation to finish
    setTimeout(async () => {
      const updatedWords = savedWords.filter(word => word !== wordToDelete)
      setSavedWords(updatedWords)
      setDeletingWord(null)

      try {
        await databases.updateDocument(databaseId, usersCollectionId, userId, {
          dictionaryWords: updatedWords,
        })
      } catch (error) {
        console.error("Failed to delete word:", error)
      }
    }, 300) // Match this with the animation duration
  }

  return (
    <div className="m-10 space-y-4">
      {isCheckingUser ? (
        <div className="space-y-5">
          <Skeleton className='w-[530px] h-[32px]' />
          <Skeleton className='w-[430px] h-[15px]' />
        </div>
      ) : userName ? (
        <>
          <h1 className="text-2xl">Hello {userName}, here are your saved words...</h1>
          <p>Words you&apos;ve saved will appear here, along with definitions if available.</p>
          {savedWords.length > 0 ? (
            <div className="grid gap-4">
              <AnimatePresence>
                {savedWords.map((wordText) => {
                  const details = getWordDetails(wordText)

                  return (
                    <motion.div
                      key={wordText}
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.2, ease: "easeInOut" }}
                    >
                      <div className="border-b rounded flex flex-row justify-between items-center text-md ">
                        <div className='flex flex-col'>
                          <div className='flex flex-row gap-2'>
                            <div className="font-bold">{wordText}</div>
                            <span className="italic text-zinc-500">{details && details.type}</span>
                          </div>
                          <span className='text-zinc-500'>{details && details.definition}</span>
                          {!details && <p className="italic text-sm">No additional info found.</p>}
                        </div>
                        <Button
                          variant="destructive"
                          onClick={() => handleDelete(wordText)}
                          className="h-5 w-5 cursor-pointer"
                        >
                          <X />
                        </Button>
                      </div>
                    </motion.div>
                  )
                })}
              </AnimatePresence>
            </div>
          ) : (
            <p>No saved words yet</p>
          )}
        </>
      ) : (
        <p>
          Please <Link href="/login" className="underline">log in</Link> or{' '}
          <Link href="/register" className="underline">create an account</Link> to view your saved words.
        </p>
      )}
    </div>
  )
}

export default DictionaryPage
