import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Switch, } from "@/components/ui/switch";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { ScrollArea } from "@/components/ui/scroll-area"
import { Raleway, Geist } from 'next/font/google'


const raleway = Raleway({
  subsets: ['latin'],
  variable: '--font-raleway',
  display: 'swap',
})
const geist = Geist({
  subsets: ['latin'],
  variable: '--font-geist',
  display: 'swap',
})

// Type for individual word objects
interface Word {
  text: string;
  type: string;
  definition?: string;
}

interface ConversationProps {
  conversation: {
    title: string;
    content:
      | string
      | {
          speaker: string;
          words: Word[];
        }[];
  };
}

export default function ContentDisplay({ conversation }: ConversationProps) {
  const [currentPage, setCurrentPage] = React.useState(0);
  const pageSize = 4;  // Number of speaker lines per page

  // Paginate by speaker lines
  const pages = [];

  const rawDialogue = conversation.content;

  // Split the dialogue into lines and paginate
  if (Array.isArray(rawDialogue)) {
    for (let i = 0; i < rawDialogue.length; i += pageSize) {
      pages.push(rawDialogue.slice(i, i + pageSize));
    }
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const [hoverEnabled, setHoverEnabled] = React.useState(true);
  const [nounEnabled, setNounEnabled] = React.useState(false);
  const [verbEnabled, setVerbEnabled] = React.useState(false);
  const [adjectiveEnabled, setAdjectiveEnabled] = React.useState(false);
  const [pronounEnabled, setPronounEnabled] = React.useState(false);
  const [adverbEnabled, setAdverbEnabled] = React.useState(false);
  const [idiomEnabled, setIdiomEnabled] = React.useState(false);
  const [prepositionEnabled, setPrepositionEnabled] = React.useState(false);
  const [articleEnabled, setArticleEnabled] = React.useState(false);
  const [conjunctionEnabled, setConjunctionEnabled] = React.useState(false);
  const [interjectionEnabled, setInterjectionEnabled] = React.useState(false);
  const [determinerEnabled, setDeterminerEnabled] = React.useState(false);
  const [contractionEnabled, setContractionEnabled] = React.useState(false);




  const colorMap: Record<string, string> = {
    noun: "bg-pink-900",
    verb: "bg-red-500",
    pronoun: "bg-blue-500",
    adjective: "bg-green-500",
    adverb: "bg-teal-500",
    idiom: "bg-indigo-400",
    preposition: "bg-orange-500",
    article: "bg-gray-500",
    conjunction: "bg-yellow-500",
    punctuation: "bg-gray-700",
    interjection: "bg-lime-500",
    determiner: "bg-violet-300",
    contraction: "bg-purple-500",
  };

  const renderWord = (word: Word, index: number) => {
    if (!word?.text) return null;

    // Dynamically set color based on word type
    const baseColor = colorMap[word.type] || "";

    // Add hover class if hover is enabled
    const hoverColor = hoverEnabled ? `hover:${baseColor}` : "";

    // Apply color based on nounEnabled, pronounEnabled, and adjectiveEnabled state
    const nounColor = nounEnabled && word.type === "noun" ? baseColor : "";
    const verbColor = verbEnabled && word.type === "verb" ? baseColor : "";
    const pronounColor = pronounEnabled && word.type === "pronoun" ? baseColor : "";
    const adjectiveColor = adjectiveEnabled && word.type === "adjective" ? baseColor : "";
    const adverbColor = adverbEnabled && word.type === "adverb" ? baseColor : "";
    const idiomColor = idiomEnabled && word.type === "idiom" ? baseColor : "";
    const prepositionColor = prepositionEnabled && word.type === "preposition" ? baseColor : "";
    const articleColor = articleEnabled && word.type === "article" ? baseColor : "";
    const conjunctionColor = conjunctionEnabled && word.type === "conjunction" ? baseColor : "";
    const interjectionColor = interjectionEnabled && word.type === "interjection" ? baseColor : "";
    const determinerColor = determinerEnabled && word.type === "determiner" ? baseColor : "";
    const contractionColor = contractionEnabled && word.type === "contraction" ? baseColor : "";




    return (
      <React.Fragment key={index}>
  <HoverCard openDelay={50} closeDelay={50}>
    <HoverCardTrigger asChild>
      <span
        className={`text-base rounded transition-colors ${raleway.variable}
        ${hoverColor ? "cursor-pointer" : ""}
        ${hoverColor} ${nounColor} ${verbColor} ${adjectiveColor}
        ${pronounColor} ${adverbColor} ${idiomColor} ${prepositionColor}
        ${articleColor} ${conjunctionColor} ${interjectionColor}
        ${determinerColor} ${contractionColor}`}
      >
        {word.text}
      </span>
    </HoverCardTrigger>
    {hoverEnabled && word.definition && (
      <HoverCardContent className={`flex flex-col text-sm ${geist.className}`}>
        <div className="flex flex-col items-center justify-center">
          <span className="font-bold">{word.type}</span>
          <span>{word.definition}</span>

        </div>
      </HoverCardContent>
    )}
  </HoverCard>
</React.Fragment>

    );
  };



  return (
    <div className="bg-background flex flex-col justify-center items-center text-foreground h-full flex-1 rounded-lg">
      <div className="flex text-2xl justify-start pl-10 items-center border-b w-full h-15">
        {conversation.title}
      </div>



      <div className="flex flex-row flex-1 w-full">
        <ScrollArea className="w-3/4 flex-1 border-b">
        <div className= "h-160 flex-1 p-5 text-lg">
          {Array.isArray(rawDialogue) && pages.length > 0 ? (
            pages[currentPage].map((line, i) => (
              <div key={i} className="flex flex-row mb-10">

                <div className="font-semibold pr-6 border-r border-gray-400 min-w-[100px] text-right">
                  {line.speaker}
                </div>


                <div className="ml-6 flex flex-wrap gap-1">
                  {line.words.map((word, j) => renderWord(word, j))}
                </div>
              </div>
            ))
          ) : (
            <div>No conversation data available.</div>
          )}
        </div>
      </ScrollArea>

        <div className="w-1/8 border-l pt-10">
          <div className="flex justify-center items-center">
            <div className="flex justify-center items-center gap-3 flex-col">
            <span>
                Hover <Switch checked={hoverEnabled} onCheckedChange={setHoverEnabled} />
              </span>
              <span>
                Nouns <Switch checked={nounEnabled} onCheckedChange={setNounEnabled} />
              </span>
              <span>
                Verbs <Switch checked={verbEnabled} onCheckedChange={setVerbEnabled} />
              </span>
              <span>
                Pronouns <Switch checked={pronounEnabled} onCheckedChange={setPronounEnabled} />
              </span>
              <span>
                Adjectives <Switch checked={adjectiveEnabled} onCheckedChange={setAdjectiveEnabled} />
              </span>
              <span>
                Adverbs <Switch checked={adverbEnabled} onCheckedChange={setAdverbEnabled} />
              </span>
              <span>
                Idioms <Switch checked={idiomEnabled} onCheckedChange={setIdiomEnabled} />
              </span>
              <span>
                Prepositions <Switch checked={prepositionEnabled} onCheckedChange={setPrepositionEnabled} />
              </span>
              <span>
                Articles <Switch checked={articleEnabled} onCheckedChange={setArticleEnabled} />
              </span>
              <span>
                Conjunctions <Switch checked={conjunctionEnabled} onCheckedChange={setConjunctionEnabled} />
              </span>
              <span>
                Interjections <Switch checked={interjectionEnabled} onCheckedChange={setInterjectionEnabled} />
              </span>
              <span>
                Determiners <Switch checked={determinerEnabled} onCheckedChange={setDeterminerEnabled} />
              </span>
              <span>
                Contractions <Switch checked={contractionEnabled} onCheckedChange={setContractionEnabled} />
              </span>
            </div>
          </div>
        </div>
      </div>

      {pages.length > 1 && (
        <div className="flex justify-center items-center w-full h-15">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (currentPage > 0) setCurrentPage(currentPage - 1);
                  }}
                />
              </PaginationItem>

              {pages.map((_, i) => (
                <PaginationItem key={i}>
                  <PaginationLink
                    href="#"
                    isActive={currentPage === i}
                    onClick={(e) => {
                      e.preventDefault();
                      handlePageChange(i);
                    }}
                  >
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}

              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (currentPage < pages.length - 1) setCurrentPage(currentPage + 1);
                  }}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
}