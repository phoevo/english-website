"use client"

import React, { useEffect, useState } from 'react'
import { account, databaseId, databases, usersCollectionId } from '@/data/appwrite'
import { vocab } from '@/data/vocab'
import Link from 'next/link'
import { Skeleton } from '@/components/ui/skeleton'

function getWordDetails(wordText: string) {
  return vocab[wordText.toLowerCase()] ?? null;
}


function DictionaryPage() {
  const [userName, setUserName] = useState<string | null>(null)
  const [savedWords, setSavedWords] = useState<string[]>([])
  const [isCheckingUser, setIsCheckingUser] = useState(true)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await account.get()
        setUserName(user.name)

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

  return (
    <div className="m-10 space-y-4">
      {isCheckingUser ? (
        <div className="space-y-5">
          <Skeleton className='w-[530px] h-[32px]'/>
          <Skeleton className='w-[430px] h-[15px]'/>
        </div>
      ) : userName ? (
        <>
          <h1 className="text-2xl">Hello {userName}, here are your saved words...</h1>
          <p>Words you&apos;ve saved will appear here, along with definitions if available.</p>
          {savedWords.length > 0 ? (
            <div className="grid gap-4">
              {savedWords.map((wordText, index) => {
                const details = getWordDetails(wordText);

                return (
                  <div key={index} className="border-b rounded flex flex-row items-center text-md mt-3">
                    <div className="font-bold mr-3">{wordText}</div>
                    {details ? (
                      <div className="flex flex row">
                        <span className="border-x-2 px-3 italic">{details.type}</span>
                        <span className="pl-3">{details.definition}</span>
                      </div>
                    ) : (
                      <p className="italic text-sm">No additional info found.</p>
                    )}
                  </div>
                );
              })}
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
