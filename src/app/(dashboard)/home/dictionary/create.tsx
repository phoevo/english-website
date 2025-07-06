"use client"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useUserStore } from "@/data/useUserStore"
import { Geist } from "next/font/google"
import { ReactNode, useState } from "react"
import { createDeck } from "./decks"
import { toast } from "sonner"


const geist = Geist({ subsets: ['latin'] })

export function Create({ children }: { children: ReactNode }) {
  const {user, dictionaryWords } = useUserStore()

  const wordList = [...dictionaryWords]
  .reverse()
  .map(entry => entry.trim())
  .map(entry => entry.charAt(0).toUpperCase() + entry.slice(1).toLowerCase());


  const [selectedWords, setSelectedWords] = useState<string[]>([])
  const [deckName, setDeckName] = useState("")
  const [deckType, setDeckType] = useState<string>("")
  const [isCreating, setIsCreating] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const allSelected = selectedWords.length === wordList.length && wordList.length > 0

  const toggleSelectAll = () => {
    setSelectedWords(allSelected ? [] : wordList)
  }

  const toggleWord = (word: string) => {
    setSelectedWords(prev =>
      prev.includes(word)
        ? prev.filter(w => w !== word)
        : [...prev, word]
    )
  }

  const handleCreate = async () => {
  setIsCreating(true)

  try {
    await createDeck({
      name: deckName,
      type: deckType,
      words: selectedWords,
    });

    setDeckName("");
    setDeckType("");
    setSelectedWords([]);
    setIsOpen(false);

    toast.success("Deck created.");

  } catch (error) {
    console.error("Error creating deck:", error);

  }finally{
    setIsCreating(false)
  }
};

if (!user) return null;

    const newDeck = {
      title: deckName.trim(),
      type: deckType,
      words: selectedWords,
      userID: user.$id,
    }


  return (
    <div className={geist.className}>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger>{children}</PopoverTrigger>
        <PopoverContent
          side="right"
          align="start"
          className={`z-50 rounded-3xl bg-background shadow-lg p-4 w-80 mb-2 ${geist.className}`}
        >
          <div>
            <CardHeader className="p-0 mb-4">
              <CardTitle className="text-base">Create</CardTitle>
              <CardDescription className="text-sm">
                Create your own custom flashcard deck
              </CardDescription>
            </CardHeader>

            <div className="flex flex-row gap-1">
            <Input
              placeholder="Deck name"
              value={deckName}
              onChange={(e) => setDeckName(e.target.value)}
              className="w-2/3"
            />


            <Select onValueChange={(val) => setDeckType(val)}>
            <SelectTrigger className="w-1/3">
              <SelectValue placeholder="Select a mode" />
            </SelectTrigger>
            <SelectContent
              onCloseAutoFocus={(e) => e.preventDefault()}

            >
              <SelectGroup className={geist.className}>
                <SelectLabel>Type</SelectLabel>
                <SelectItem value="flashcards">Flashcards</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

            </div>
          </div>

          <CardContent className="mt-4 space-y-3">

            <div className="flex items-start space-x-2">
              <Checkbox
                id="select-all"
                checked={allSelected}
                onCheckedChange={toggleSelectAll}
              />
              <label
                htmlFor="select-all"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Select All
              </label>
            </div>

              <ScrollArea className="h-80 border-1 rounded-md bg-background">
                <ul className="space-y-1 text-sm">
                  {wordList.map((entry, idx) => {
                    const wordOnly = entry.split("::")[0].trim(); // This is what we show
                    return (
                      <li key={idx} className="flex items-center space-x-2 px-2 py-1 rounded">
                        <Checkbox
                          id={`word-${idx}`}
                          checked={selectedWords.includes(entry)} // Store full "word::definition"
                          onCheckedChange={() => toggleWord(entry)} // Toggle full entry
                        />
                        <label
                          htmlFor={`word-${idx}`}
                          className="text-sm"
                        >
                          {wordOnly}
                        </label>
                      </li>
                    );
                  })}
                </ul>
              </ScrollArea>



            <Button
              className="w-full h-8"
              onClick={handleCreate}
              disabled={isCreating || !deckName.trim() || !deckType || selectedWords.length === 0}
            >
              {isCreating ? "Creating Deck" : "Create Deck"}
            </Button>
          </CardContent>
        </PopoverContent>
      </Popover>
    </div>
  )
}
