"use client"

import React, { useEffect } from 'react'
import { useUserStore } from '@/data/useUserStore'
import { Skeleton } from '@/components/ui/skeleton'
import { ScrollArea } from '@/components/ui/scroll-area'
import UserGuidePopover from '../../userGuide'



function LearnPage() {
  const {loading, fetchUser } = useUserStore()

  useEffect(() => {
    fetchUser()
  }, [fetchUser])

  type WordTypeKey =
  | "noun"
  | "verb"
  | "adjective"
  | "pronoun"
  | "adverb"
  | "idiom"
  | "preposition"
  | "article"
  | "conjunction"
  | "interjection"
  | "determiner"
  | "contraction";

type WordTypeInfo = {
  name: string;
  definition: string;
  examples: string[];
  color: string;
};

const wordTypes: Record<WordTypeKey, WordTypeInfo> = {
  noun: {
    name: "Noun",
    definition: "A person, place, thing, or idea.",
    examples: [
      "The cat slept on the couch.",
      "Paris is a beautiful city.",
      "Happiness is important to everyone."
    ],
    color: "pink-500"
  },
  verb: {
    name: "Verb",
    definition: "An action or state of being.",
    examples: [
      "She runs every morning.",
      "They were excited for the trip.",
      "I write code every day."
    ],
    color: "red-500"
  },
  adjective: {
    name: "Adjective",
    definition: "A word that describes a noun.",
    examples: [
      "The red apple is sweet.",
      "He wore a fancy suit.",
      "It was a difficult decision."
    ],
    color: "green-500"
  },
  pronoun: {
    name: "Pronoun",
    definition: "A word that replaces a noun.",
    examples: [
      "She loves ice cream.",
      "They are going to the beach.",
      "It is raining outside."
    ],
    color: "blue-500"
  },
  adverb: {
    name: "Adverb",
    definition: "A word that describes a verb, adjective, or other adverb.",
    examples: [
      "He ran quickly.",
      "She almost finished the race.",
      "They sang very loudly."
    ],
    color: "yellow-500"
  },
  idiom: {
    name: "Idiom",
    definition: "A phrase with a figurative meaning different from its literal one.",
    examples: [
      "It's raining cats and dogs.",
      "Break a leg before your performance!",
      "He spilled the beans about the surprise."
    ],
    color: "purple-500"
  },
  preposition: {
    name: "Preposition",
    definition: "A word that shows the relationship between things.",
    examples: [
      "The book is on the table.",
      "She walked through the door.",
      "He sat beside me."
    ],
    color: "orange-500"
  },
  article: {
    name: "Article",
    definition: "A word that defines a noun as specific or unspecific (a, an, the).",
    examples: [
      "She adopted a dog.",
      "I saw an elephant at the zoo.",
      "The car is red."
    ],
    color: "gray-500"
  },
  conjunction: {
    name: "Conjunction",
    definition: "A word that connects words or groups of words.",
    examples: [
      "I like tea and coffee.",
      "He is smart but lazy.",
      "You can come if you want."
    ],
    color: "yellow-500"
  },
  interjection: {
    name: "Interjection",
    definition: "A word or phrase that expresses emotion.",
    examples: [
      "Wow! That was amazing.",
      "Ouch! That hurt.",
      "Yay! We won the game."
    ],
    color: "lime-500"
  },
  determiner: {
    name: "Determiner",
    definition: "A word that introduces a noun (e.g., this, some, many).",
    examples: [
      "This apple is fresh.",
      "Many people attended the event.",
      "Some students forgot their homework."
    ],
    color: "violet-500"
  },
  contraction: {
    name: "Contraction",
    definition: "A shortened form of one or more words.",
    examples: [
      "I can't go out tonight.",
      "She's my best friend.",
      "They've already eaten."
    ],
    color: "purple-500"
  }
};


   if (loading) {
      return (
        <div className="m-10 space-y-5">
          <Skeleton className="w-[450px] h-[32px]" />
          <Skeleton className="w-[514px] h-[14px]" />
        </div>
      );
    }

  return (

    <div className='m-10 flex flex-col'>
      <div className='space-y-5'>
       <UserGuidePopover
      id="learn-page"
      title="The Learn Page"
       description="Discover key word types in English, complete with definitions
      and real-life examples to enhance your language skills."
         side="top"
        align="start"
        >
      <h1 className='text-3xl font-light'>Learn</h1>
        </UserGuidePopover>

      <p className="text-zinc-500">Everything you need to know about word types can be found here.</p>
      <ScrollArea className='h-160'>
    <div className='flex flex-col'>
      {Object.entries(wordTypes).map(([key, { name, definition, examples, color }]) => (

      <div key={key} className="flex flex-col mb-10 border-b ">

        <h2 className={`text-lg rounded-sm px-1 bg-${color}`}>{name}</h2>

        <p className="italic mb-2">{definition}</p>

        <ul className="list-disc list-inside space-y-1 mb-3">
          {examples.map((example, index) => (
            <li key={index} className="">{example}</li>
          ))}
        </ul>
      </div>
))}
          </div>
        </ScrollArea>

      </div>
    </div>

  )

}

export default LearnPage