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
      { text: "Hey,", type: "interjection", definition: "a greeting or call for attention" },
      { text: "I", type: "pronoun", definition: "refers to the speaker" },
      { text: "started", type: "verb", definition: "began something" },
      { text: "learning", type: "verb", definition: "acquiring knowledge" },
      { text: "English", type: "noun", definition: "the English language" },
      { text: "on", type: "preposition", definition: "used to indicate a platform" },
      { text: "this", type: "determiner", definition: "referring to something nearby" },
      { text: "website", type: "noun", definition: "a collection of web pages" },
      { text: "that", type: "conjunction", definition: "introduces a clause" },
      { text: "allows", type: "verb", definition: "gives permission" },
      { text: "you", type: "pronoun", definition: "refers to the reader" },
      { text: "to", type: "preposition", definition: "indicates purpose" },
      { text: "hover", type: "verb", definition: "move cursor over something" },
      { text: "over", type: "preposition", definition: "on top of" },
      { text: "words", type: "noun", definition: "units of language" },
      { text: "for", type: "preposition", definition: "indicates purpose" },
      { text: "more", type: "adjective", definition: "additional" },
      { text: "info.", type: "noun", definition: "information" },
    ],
  },
  {
    speaker: "You",
    words: [
      { text: "Cool,", type: "interjection", definition: "expression of approval" },
      { text: "it", type: "pronoun", definition: "refers to the website" },
      { text: "color-codes", type: "verb", definition: "marks using colors" },
      { text: "the", type: "article", definition: "used before a noun" },
      { text: "word", type: "noun", definition: "a single unit of language" },
      { text: "type", type: "noun", definition: "category or classification" },
      { text: "and", type: "conjunction", definition: "connects words" },
      { text: "shows", type: "verb", definition: "displays" },
      { text: "you", type: "pronoun", definition: "refers to reader" },
      { text: "the", type: "article", definition: "used before a noun" },
      { text: "definition", type: "noun", definition: "meaning of a word" },
      { text: "too.", type: "adverb", definition: "in addition" },
    ],
  },
  {
    speaker: "User",
    words: [
      { text: "That's", type: "contraction", definition: "that is" },
      { text: "right,", type: "adjective", definition: "correct" },
      { text: "there's", type: "contraction", definition: "there is" },
      { text: "even", type: "adverb", definition: "emphasizing surprise" },
      { text: "a", type: "article", definition: "used before nouns" },
      { text: "small", type: "adjective", definition: "little in size" },
      { text: "button", type: "noun", definition: "clickable UI element" },
      { text: "that", type: "conjunction", definition: "introduces a clause" },
      { text: "adds", type: "verb", definition: "includes something extra" },
      { text: "new", type: "adjective", definition: "recently made" },
      { text: "words", type: "noun", definition: "units of language" },
      { text: "to", type: "preposition", definition: "indicating direction" },
      { text: "your", type: "pronoun", definition: "belonging to you" },
      { text: "personal", type: "adjective", definition: "private" },
      { text: "dictionary.", type: "noun", definition: "word repository" },
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

  // Disable hover by default on mobile (less than 768px)
  React.useEffect(() => {
    const handleResize = () => {
      setHoverEnabled(window.innerWidth >= 768);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
            <div className="flex flex-col space-y-1 items-center">
              <span className="font-bold">{word.type}</span>
              <span>{word.definition}</span>
                <Button className="w-8 h-8 rounded-sm cursor-pointer" variant="outline">
                  <Plus />
                </Button>
            </div>
          </HoverCardContent>
        )}
      </HoverCard>
    );
  };

  return (
    <div className="flex p-1 flex-col lg:flex-row bg-muted shadow-lg border rounded-lg">
      {/* Conversation section */}
      <div className="m-5 p-4 mt-5 border rounded-xl bg-background shadow-sm flex-1">
        <h2 className="text-lg sm:text-xl font-semibold mb-8 sm:mb-20">Conversation Title</h2>
        {sampleConversation.map((line, i) => (
          <div key={i} className="flex mb-6 flex-wrap lg:flex-nowrap">
            <div className="font-semibold pr-10 lg:pr-4 mr-4 lg:border-r border-gray-300 min-w-[100px] text-right">
              {line.speaker}
            </div>
            <div className="flex flex-wrap">{line.words.map((word, j) => renderWord(word, j))}</div>
          </div>
        ))}
      </div>

      {/* Sidebar controls */}
      <div className="p-5 border-t lg:border-t-0 lg:border-l w-full lg:w-60">
        <div className="flex flex-col items-center gap-4 bg-background p-4 rounded-lg shadow-md">
          <span className="flex gap-2 items-center">
            <div className="rounded px-2 font-semibold ">Hover</div>
            <Switch checked={hoverEnabled} onCheckedChange={setHoverEnabled} />
          </span>

          <Accordion
            type="single"
            collapsible
            defaultValue="item-1"
            className="w-full bg-background"
          >
            <AccordionItem value="item-1">
              <AccordionTrigger>Word Classes</AccordionTrigger>
              <AccordionContent>
                <div className="rounded-md text-sm p-2 flex flex-col gap-2">
                  <WordTypeSettings wordTypes={wordTypes} toggleWordType={toggleWordType} />
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  );
}
