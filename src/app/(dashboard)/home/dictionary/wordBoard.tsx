"use client"

import React, { useState } from 'react'
import { useUserStore } from '@/data/useUserStore'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, ArrowRight, Plus } from "lucide-react"
import { Create } from './create'
import { MyDecks } from './decks'







function WordBoard() {
  const { dictionaryWords } = useUserStore();

  // Existing states
  const [isGameActive, setIsGameActive] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  // New state for toggling decks visibility
  const [showMyDecks, setShowMyDecks] = useState(false);
  const [selectedDeck, setSelectedDeck] = useState<Deck | null>(null);


  const rawWords = selectedDeck ? selectedDeck.words : dictionaryWords;

const flashcards = [...rawWords].map((entry) => {

    const [rawWord, rawDefinition] = entry.split("::");
    const baseWord = rawWord.split("/")[0].trim();
    const displayWord = baseWord.charAt(0).toUpperCase() + baseWord.slice(1).toLowerCase();
    const definition = rawDefinition?.trim() || "No definition available";

    return {
      word: displayWord,
      definition: definition,
    };
  });

  // Game functions
  const startGame = () => {
    if (flashcards.length > 0) {
      setCurrentIndex(0);
      setFlipped(false);
      setIsGameActive(true);
      setShowMyDecks(false);  // hide decks if game starts
    }
  };

  const nextCard = () => {
    if (currentIndex + 1 < flashcards.length) {
      setCurrentIndex(currentIndex + 1);
      setFlipped(false);
    } else {
      setIsGameActive(false);
    }
  };

  const previousCard = () => {
    if (currentIndex - 1 >= 0) {  // fixed condition here
      setCurrentIndex(currentIndex - 1);
      setFlipped(false);
    }
  };

  const endGame = () => {
    setIsGameActive(false);
  }

  // Toggle decks visibility
  const toggleMyDecks = () => {
    setShowMyDecks(prev => !prev);
    setIsGameActive(false); // optionally stop game when decks open
  }

  return (
    <div className='h-155'>
      <Card className='w-full h-full bg-background border-1 flex flex-col'>
        <CardHeader className='flex flex-col'>

          <CardTitle className='text-2xl'>Word Board</CardTitle>
          <CardDescription>A more in-depth look at your Dictionary</CardDescription>

          <div className='flex flex-row gap-2 bg-background'>
            <Create>
              <Badge className="flex items-center gap-1 cursor-pointer">
                <Plus />Create
              </Badge>
            </Create>

            <Badge
              variant="outline"
              className='flex items-center gap-1 cursor-pointer'
              onClick={startGame}
            >
              Quick Start
            </Badge>

            <Badge
              variant="outline"
              className='flex items-center gap-1 cursor-pointer'
              onClick={toggleMyDecks}
            >
              My Decks
            </Badge>
          </div>
        </CardHeader>

        {/* Conditionally show MyDecks component */}
        {showMyDecks ? (
          <CardContent className="flex-grow">
            <MyDecks onSelectDeck={(deck) => {
              setSelectedDeck(deck);
              setShowMyDecks(false);
              setIsGameActive(true);
              setCurrentIndex(0);
              setFlipped(false);
            }} />

          </CardContent>
        ) : (
          <CardContent className="flex-grow">
            <div className='w-full h-full border-1 rounded-md shadow-xs p-5 flex items-center justify-center'>
              {!isGameActive ? (
                <p className="text-zinc-500 text-center">Choose one of your saved decks or Quick Start for all your words.</p>
              ) : (
                <div
                  className="w-full h-full flex flex-col justify-center items-center space-y-4"
                >
                  <div
                    className="flex flex-col justify-center items-center border rounded-lg p-8 cursor-pointer w-full max-w-md h-2/3 shadow-md hover:bg-muted transition"
                    onClick={() => setFlipped(!flipped)}
                  >
                    <p className="text-lg">
                      {flipped
                        ? flashcards[currentIndex].definition
                        : flashcards[currentIndex].word}
                    </p>
                    <p className="text-sm text-muted-foreground mt-2">{flipped ? "Click to see word" : "Click to see definition"}</p>
                  </div>

                  <div className='flex flex-row gap-2'>

                    <Button
                      className='h-7 cursor-pointer'
                      variant="secondary"
                      onClick={previousCard}>
                      <ArrowLeft/>
                    </Button>

                    <Button
                      className='h-7 cursor-pointer'
                      variant="secondary"
                      onClick={nextCard}>
                      {currentIndex + 1 < flashcards.length ? <ArrowRight/> : "Finish"}
                    </Button>
                  </div>

                  <Button
                    className='h-7 cursor-pointer'
                    variant="default"
                    onClick={endGame}>
                    Stop
                  </Button>

                </div>
              )}
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  )
}

export default WordBoard
