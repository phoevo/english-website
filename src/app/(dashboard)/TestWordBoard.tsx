"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"

import { Badge } from '@/components/ui/badge'
import { motion } from 'motion/react'
import { Plus } from "lucide-react"
import { useState } from "react"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Geist } from "next/font/google"
import { Button } from "@/components/ui/button"

const geist = Geist({ subsets: ['latin'] });

function FakeCreate({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen(prev => !prev);

  return (
    <div className="relative h-auto">
      <div onClick={toggleOpen} className="cursor-pointer">
        {children}
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-80 p-5 rounded-3xl shadow-lg border bg-background z-50">
          <h3 className="text-base font-semibold mb-1">Create</h3>
          <p className="text-sm text-muted-foreground mb-3">
            Create your own custom flashcard deck
          </p>
          <div className="flex flex-row gap-2 mb-2">
            <Input
              type="text"
              placeholder="Deck name"
              className="w-2/3 px-2 py-1 border text-sm"
            />
             <Select>
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
          <div className="text-sm text-muted-foreground mb-2">
            <ul>
              <li>List</li>
              <li>of</li>
              <li>Dicionanary</li>
              <li>Words</li>

            </ul>
          </div>
          <Button className="w-full bg-primary cursor-pointer">
            Create Deck
          </Button>
        </div>
      )}
    </div>
  );
}
function TestWordBoard() {
  return (
    <div className='h-auto bg-muted p-6 rounded-md '>
      <Card className='w-full h-full bg-card border border-muted rounded-md flex flex-col'>
        <CardHeader className='flex flex-col'>
          <CardTitle className='text-2xl'>Word Board</CardTitle>
          <CardDescription>A more in-depth look at your Dictionary</CardDescription>
          <div className='flex flex-row gap-2 items-start mt-2'>
            <FakeCreate>
              <Badge className="flex items-center gap-1 cursor-pointer">
                <Plus size={14} />
                Create
              </Badge>
            </FakeCreate>

            <Badge variant="outline" className='flex  items-center gap-1 cursor-pointer'>
              Quick Start
            </Badge>
            <Badge variant="outline" className='flex items-center gap-1 cursor-pointer'>
              My Decks
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="flex-1 flex items-center justify-center">
          <motion.div
            layout
            className="w-full h-full border border-dashed rounded-md p-5"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <p className="text-center text-muted-foreground">
              Select an option to get started.
            </p>
          </motion.div>
        </CardContent>
      </Card>
    </div>
  )
}

export default TestWordBoard;
