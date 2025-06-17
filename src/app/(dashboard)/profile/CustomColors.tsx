"use client"

import React, { useEffect, useState } from "react"
import { databases } from "@/data/appwrite"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!
const USERS_COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_USERS_COLLECTION_ID!

type WordTypeKey =
  | "noun" | "verb" | "adjective" | "pronoun" | "adverb"
  | "idiom" | "preposition" | "article" | "conjunction"
  | "interjection" | "determiner"

const wordTypeKeys: WordTypeKey[] = [
  "noun", "verb", "adjective", "pronoun", "adverb",
  "idiom", "preposition", "article", "conjunction",
  "interjection", "determiner"
]

const defaultColors = [
  "#ec4899", "#ef4444", "#22c55e", "#3b82f6", "#eab308",
  "#a855f7", "#f97316", "#6b7280", "#eab308", "#84cc16", "#8b5cf6"
]

export default function CustomColors({ userId, existingColors }: {
  userId: string,
  existingColors?: string[]
}) {
  const [customColors, setCustomColors] = useState<string[]>(defaultColors)

  useEffect(() => {
    if (existingColors && existingColors.length === wordTypeKeys.length) {
      setCustomColors(existingColors)
    }
  }, [existingColors])

  const handleColorChange = (index: number, newColor: string) => {
    const updatedColors = [...customColors]
    updatedColors[index] = newColor
    setCustomColors(updatedColors)
  }

  const resetColors = () => {
    setCustomColors(defaultColors)
  }

  const savePreferences = async () => {
    try {
      await databases.updateDocument(DATABASE_ID, USERS_COLLECTION_ID, userId, {
        customColors: customColors
      })
      toast.success("Preferences saved!")
    } catch (err) {
      console.error("Error saving preferences:", err)
      toast.error("Failed to save preferences")
    }
  }

  return (
    <div className="space-y-6">

      <div className="flex flex-col gap-3">
  {wordTypeKeys.map((type, idx) => (
    <div
      key={type}
      className="flex flex-row justify-between items-center w-full max-w-md px-10"
    >

      <div
        className="px-1 rounded"
        style={{ backgroundColor: customColors[idx] }}
      >
        {type.charAt(0).toUpperCase() + type.slice(1)}
      </div>

      <label className="relative">
  <input
    type="color"
    value={customColors[idx]}
    onChange={(e) => handleColorChange(idx, e.target.value)}
    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
  />
  <div
    className="w-5 h-5 rounded-full border border-gray-300 shadow-sm"
    style={{ backgroundColor: customColors[idx] }}
  />
</label>

    </div>
  ))}
</div>


      <div className="flex gap-4 mt-4">
        <Button onClick={savePreferences}>Save Preferences</Button>
        <Button variant="outline" onClick={resetColors}>Reset to Default</Button>
      </div>
    </div>
  )
}
