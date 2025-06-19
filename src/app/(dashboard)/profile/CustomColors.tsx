"use client"

import React, { useState } from "react"
import { databases } from "@/data/appwrite"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Geist } from "next/font/google"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useUserStore } from "@/data/useUserStore"
import { backgroundColors } from "@/data/color"

const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!
const USERS_COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_USERS_COLLECTION_ID!

const geist = Geist({ subsets: ["latin"], variable: "--font-geist", display: "swap" })

type WordTypeKey =
  | "noun" | "verb" | "adjective" | "pronoun" | "adverb"
  | "idiom" | "preposition" | "article" | "conjunction"
  | "interjection" | "determiner"|"contraction"

const wordTypeKeys: WordTypeKey[] = [
  "noun", "verb", "adjective", "pronoun", "adverb",
  "idiom", "preposition", "article", "conjunction",
  "interjection", "determiner","contraction"
]

const baseColors = [
  "red", "orange", "amber", "yellow", "lime", "green", "emerald",
  "teal", "cyan", "sky", "blue", "indigo", "violet", "purple",
  "fuchsia", "pink", "rose"
]

const shades = ["100", "200", "300", "400", "500", "600", "700", "800", "900"]

const defaultColorKeys = [
  "pink500", "red500", "green500", "blue500", "yellow400",
  "purple500", "orange500", "cyan700", "yellow400", "lime500", "teal500", "purple600"
]

export default function CustomColors({ userId }: { userId: string }) {
  const { customColors, setCustomColors } = useUserStore()
  const [openPickerIndex, setOpenPickerIndex] = useState<number | null>(null)

  const displayColors =
    customColors?.length === wordTypeKeys.length
      ? customColors.map(key => backgroundColors[key] || "bg-gray-500")
      : defaultColorKeys.map(key => backgroundColors[key])

  const handleColorChange = (index: number, newColorClass: string) => {
    const match = newColorClass.match(/^bg-([a-z]+)-(\d{3})$/)
    if (!match) return
    const [, base, shade] = match
    const key = `${base}${shade}`

    const updated = [...customColors]
    updated[index] = key
    setCustomColors(updated)
    setOpenPickerIndex(null)
  }

  const resetColors = () => {
    setCustomColors(defaultColorKeys)
  }

  const savePreferences = async () => {
    try {
      await databases.updateDocument(DATABASE_ID, USERS_COLLECTION_ID, userId, {
        customColors,
      })

      toast.success("Preferences saved!")
    } catch (err) {
      console.error("Error saving preferences:", err)
      toast.error("Failed to save preferences")
    }
  }

  return (
    <div className="space-y-6">
      <div className="grid grid">
        {wordTypeKeys.map((type, idx) => (
          <div key={type} className="flex justify-between items-center p-1">
            <button
              onClick={() => setOpenPickerIndex(idx)}
              className={`rounded px-1 cursor-pointer transition-colors duration-300 ${displayColors[idx]}`}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          </div>
        ))}
      </div>

      {openPickerIndex !== null && (
        <AlertDialog open={true} onOpenChange={(open) => !open && setOpenPickerIndex(null)}>
          <AlertDialogContent className={geist.className} id={`color-picker-dialog-${openPickerIndex}`}>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Select Color for {wordTypeKeys[openPickerIndex].charAt(0).toUpperCase() + wordTypeKeys[openPickerIndex].slice(1)}
              </AlertDialogTitle>
              <AlertDialogDescription>
                Choose a shade and color below. Container is scrollable.
              </AlertDialogDescription>
            </AlertDialogHeader>

            <ScrollArea className="max-h-128 overflow-auto bg-background">
              <div className="grid grid-cols-9 gap-2 mx-2 border-1 bg-muted rounded-md p-2">
                {baseColors.flatMap(color =>
                  shades.map(shade => {
                    const colorClass = `bg-${color}-${shade}`
                    const isSelected = displayColors[openPickerIndex] === colorClass
                    return (
                      <button
                        key={colorClass}
                        type="button"
                        aria-pressed={isSelected}
                        onClick={() => handleColorChange(openPickerIndex, colorClass)}
                        className={`w-10 h-10 rounded-full shadow-md border-2 transition cursor-pointer ${isSelected ? "border-foreground" : "border-transparent"} ${colorClass}`}
                        title={`${color} ${shade}`}
                      />

                    )
                  })
                )}
              </div>
            </ScrollArea>

            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setOpenPickerIndex(null)} className="cursor-pointer">
                Cancel
              </AlertDialogCancel>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}

      <div className="flex gap-4 mt-4 justify-center">
        <Button className="cursor-pointer" onClick={savePreferences}>Save Preferences</Button>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="secondary" className="cursor-pointer">Reset Defaults</Button>
          </AlertDialogTrigger>

          <AlertDialogContent className={geist.className}>
            <AlertDialogHeader>
              <AlertDialogTitle>Reset?</AlertDialogTitle>
              <AlertDialogDescription>
                Any color changes you have made will be reset to default.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="cursor-pointer">Go back</AlertDialogCancel>
              <AlertDialogAction className="cursor-pointer" onClick={resetColors}>
                Reset
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  )
}
