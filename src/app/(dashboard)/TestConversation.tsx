import React from "react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Geist } from "next/font/google";
import { Switch } from "@/components/ui/switch";
import { WordTypeSettings } from "@/components/ui/WordTypeSettings";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@radix-ui/react-accordion";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist" });

type WordTypeKey =
  | "noun"
  | "verb"
  | "adjective"
  | "pronoun"
  | "adverb"
  | "idiom"
  | "conjunction"
  | "interjection"
  | "preposition"
  | "article"
  | "determiner"
  | "contraction";

interface Word {
  text: string;
  type: WordTypeKey;
  definition?: string;
}

interface WordTypeData {
  color: string;
  enabled: boolean;
}

const sampleConversation = [
  {
    speaker: "User",
    words: [
      { text: "Hey,", type: "interjection", definition: "A greeting or call for attention" },
      { text: "I", type: "pronoun", definition: "Refers to the speaker" },
      { text: "started", type: "verb", definition: "Began something" },
      { text: "learning", type: "verb", definition: "Acquiring knowledge" },
      { text: "English", type: "noun", definition: "The English language" },
      { text: "on", type: "preposition", definition: "Used to indicate a platform" },
      { text: "this", type: "determiner", definition: "Referring to something nearby" },
      { text: "website", type: "noun", definition: "A collection of web pages" },
      { text: "that", type: "conjunction", definition: "Introduces a clause" },
      { text: "allows", type: "verb", definition: "Gives permission" },
      { text: "you", type: "pronoun", definition: "Refers to the reader" },
      { text: "to", type: "preposition", definition: "Indicates purpose" },
      { text: "hover", type: "verb", definition: "Move cursor over something" },
      { text: "over", type: "preposition", definition: "On top of" },
      { text: "words", type: "noun", definition: "Units of language" },
      { text: "for", type: "preposition", definition: "Indicates purpose" },
      { text: "more", type: "adjective", definition: "Additional" },
      { text: "info.", type: "noun", definition: "Information" },
    ],
  },
  {
    speaker: "You",
    words: [
      { text: "Cool,", type: "interjection", definition: "Expression of approval" },
      { text: "it", type: "pronoun", definition: "Refers to the website" },
      { text: "color-codes", type: "verb", definition: "Marks using colors" },
      { text: "the", type: "article", definition: "Used before a noun" },
      { text: "word", type: "noun", definition: "A single unit of language" },
      { text: "type", type: "noun", definition: "Category or classification" },
      { text: "and", type: "conjunction", definition: "Connects words" },
      { text: "shows", type: "verb", definition: "Displays" },
      { text: "you", type: "pronoun", definition: "Refers to reader" },
      { text: "the", type: "article", definition: "Used before a noun" },
      { text: "definition", type: "noun", definition: "Meaning of a word" },
      { text: "too.", type: "adverb", definition: "In addition" },
    ],
  },
  {
    speaker: "User",
    words: [
      { text: "That's", type: "contraction", definition: "That is" },
      { text: "right,", type: "adjective", definition: "Correct" },
      { text: "there's", type: "contraction", definition: "There is" },
      { text: "even", type: "adverb", definition: "Emphasizing surprise" },
      { text: "a", type: "article", definition: "Used before nouns" },
      { text: "small", type: "adjective", definition: "Little in size" },
      { text: "button", type: "noun", definition: "Clickable UI element" },
      { text: "that", type: "conjunction", definition: "Introduces a clause" },
      { text: "adds", type: "verb", definition: "Includes something extra" },
      { text: "new", type: "adjective", definition: "Recently made" },
      { text: "words", type: "noun", definition: "Units of language" },
      { text: "to", type: "preposition", definition: "Indicating direction" },
      { text: "your", type: "pronoun", definition: "Belonging to you" },
      { text: "personal", type: "adjective", definition: "Private" },
      { text: "dictionary.", type: "noun", definition: "Word repository" },
    ],
  },
];


export function TestConversation() {
  const [hoverEnabled, setHoverEnabled] = React.useState(true);
  const [wordTypes, setWordTypes] = React.useState<Record<WordTypeKey, WordTypeData>>({
    noun: { color: "pink-500", enabled: false },
    verb: { color: "red-500", enabled: false },
    adjective: { color: "green-500", enabled: false },
    pronoun: { color: "blue-500", enabled: false },
    adverb: { color: "yellow-500", enabled: false },
    idiom: { color: "purple-500", enabled: false },
    preposition: { color: "orange-500", enabled: false },
    article: { color: "gray-500", enabled: false },
    conjunction: { color: "yellow-500", enabled: false },
    interjection: { color: "lime-500", enabled: false },
    determiner: { color: "violet-500", enabled: false },
    contraction: { color: "purple-500", enabled: false },
  });

  const toggleWordType = (key: WordTypeKey) => {
    setWordTypes((prev) => ({
      ...prev,
      [key]: {
        ...prev[key],
        enabled: !prev[key].enabled,
      },
    }));
  };

  const renderWord = (word: Word, index: number) => {
    const wordType = wordTypes[word.type];
     const baseColor = wordType.color;
    const isEnabled = wordType.enabled;
    const hoverColor = hoverEnabled ? `hover:bg-${baseColor}` : "";
    const appliedColor = isEnabled ? `bg-${baseColor}` : "";



    return (
      <HoverCard key={index} openDelay={50} closeDelay={50}>
        <HoverCardTrigger asChild>
          <span
             className={`text-base rounded transition-colors px-0.5 ${
                hoverEnabled ? "cursor-pointer" : ""
              } ${hoverColor} ${appliedColor}`}
            >
            {word.text}
            {!/[.,!?)]$/.test(word.text) && " "}
          </span>
        </HoverCardTrigger>
        {hoverEnabled && word.definition && (
          <HoverCardContent className={`text-sm text-left ${geist.className}`}>
            <div className="flex flex-col items-center">
              <span className="font-bold capitalize">{word.type}</span>
              <span>{word.definition}</span>
              <Link href="/register">
              <Button className="w-4 h-4 rounded-sm cursor-pointer" variant="outline">
                <Plus/>
              </Button>
              </Link>
            </div>
          </HoverCardContent>
        )}
      </HoverCard>
    );
  };

  return (
    <div className="flex flex-col bg-muted shadow-lg border-1 rounded-lg">
      <div className="flex flex-row">
      <div className="m-10 p-6 mt-10 border rounded-xl bg-background shadow-sm">
         <h2 className="text-xl font-semibold mb-20">Conversation Title</h2>
        {sampleConversation.map((line, i) => (
          <div key={i} className="flex mb-6">
            <div className="font-semibold pr-6 mr-6 border-r border-gray-300 min-w-[100px] text-right">
              {line.speaker}
            </div>
            <div className="flex flex-wrap">
              {line.words.map((word, j) => renderWord(word, j))}
            </div>
          </div>
        ))}
      </div>
      <div className="p-5 h-full border-l">
        <div className="flex flex-col items-center gap-4 bg-background p-4 rounded-lg">
          <span className="flex gap-2 items-center">
            <div className="rounded px-2 font-semibold ">Hover</div>
            <Switch checked={hoverEnabled} onCheckedChange={setHoverEnabled} />
          </span>

          <Accordion type="single" collapsible defaultValue="item-1" className="w-full bg-background">
            <AccordionItem value="item-1">
              <AccordionTrigger >Word Classes</AccordionTrigger>
              <AccordionContent>
                <div className="rounded-md text-sm p-2 flex flex-col gap-2">
                  <WordTypeSettings
                    wordTypes={wordTypes}
                    toggleWordType={toggleWordType}
                  />
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
      </div>
    </div>
   );
}
