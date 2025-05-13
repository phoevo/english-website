import React, {useEffect, useState} from "react";
// import {
//   Pagination,
//   PaginationContent,
//   PaginationItem,
//   PaginationLink,
//   PaginationNext,
//   PaginationPrevious,
// } from "@/components/ui/pagination";
import { Switch } from "@/components/ui/switch";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Raleway, Geist } from "next/font/google";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Check, Plus } from "lucide-react";
import { WordTypeSettings } from "@/components/ui/WordTypeSettings";
import { Button } from "@/components/ui/button";
import { account, databases } from "@/data/appwrite";
import { toast } from "sonner";

const raleway = Raleway({ subsets: ["latin"], variable: "--font-raleway", display: "swap" });
const geist = Geist({ subsets: ["latin"], variable: "--font-geist", display: "swap" });

const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!;
const USERS_COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_USERS_COLLECTION_ID!;




interface Word {
  text: string;
  type: WordTypeKey;
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

type WordTypeData = {
  color: string;
  enabled: boolean;
};

export default function ContentDisplay({ conversation }: ConversationProps) {
  // const [currentPage, setCurrentPage] = React.useState(0);
  // const pageSize = 5;
  const rawDialogue = conversation.content;
  // const pages = Array.isArray(rawDialogue)
  //   ? Array.from({ length: Math.ceil(rawDialogue.length / pageSize) }, (_, i) =>
  //       rawDialogue.slice(i * pageSize, i * pageSize + pageSize)
  //     )
  //   : []; --------------UNCOMMENT FOR PAGINATION------------------

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

  const [savedWords, setSavedWords] = useState<string[]>([]);
  const [userId, setUserId] = useState<string | null>(null);

function cleanWord(rawWord: string) {
  return rawWord
    .toLowerCase()
    .replace(/[’]/g, "'")   // normalize apostrophes
    .replace(/[.,!?—;:()"]/g, "")  // remove punctuation
    .trim();
}



  useEffect(() => {
    async function fetchUserWords() {
      try {
        const user = await account.get();
        const userDoc = await databases.getDocument(DATABASE_ID, USERS_COLLECTION_ID, user.$id);

        setUserId(user.$id);
        setSavedWords(userDoc.dictionaryWords || []);
      } catch (err) {
        console.error("User not logged in or fetch failed", err);
        setUserId(null);
        setSavedWords([]);
      }
    }

    fetchUserWords();
  }, []);


  const toggleWordType = (key: WordTypeKey) => {
    setWordTypes(prev => ({
      ...prev,
      [key]: {
        ...prev[key],
        enabled: !prev[key].enabled,
      },
    }));
  };

  const tickIcon = <Check size={17} />;
  const addIcon = <Plus/>

  const renderWord = (word: Word, index: number) => {
    const wordType = wordTypes[word.type];
    if (!word?.text || !wordType) return null;

    const baseColor = wordType.color;
    const isEnabled = wordType.enabled;
    const hoverColor = hoverEnabled ? `hover:bg-${baseColor}` : "";
    const appliedColor = isEnabled ? `bg-${baseColor}` : "";

    // CLEAN the word before checking if it's already saved
    const cleanedWordText = cleanWord(word.text);
    const alreadySaved = savedWords.includes(cleanedWordText);

    async function addDictionary(rawWordText: string) {
      if (!userId) {
        toast("Account required", {
          description: "You need to log in or create an account to save words.",
        });
        return;
      }

      const wordText = cleanWord(rawWordText);

      setSavedWords(prev => [...prev, wordText]);
      toast.success(`Added "${wordText}" to your dictionary`);

      try {
        const userDoc = await databases.getDocument(DATABASE_ID, USERS_COLLECTION_ID, userId);
        const currentWords: string[] = Array.isArray(userDoc.dictionaryWords)
          ? userDoc.dictionaryWords
          : [];

        if (currentWords.includes(wordText)) {
          return; // Word already exists
        }

        const updatedWords = [...currentWords, wordText];
        await databases.updateDocument(DATABASE_ID, USERS_COLLECTION_ID, userId, {
          dictionaryWords: updatedWords,
        });
      } catch (err) {
        console.error("Error saving word:", err);
        toast.error("Something went wrong. Word might not be saved.");
      }
    }

    return (
      <React.Fragment key={index}>
        <HoverCard openDelay={50} closeDelay={50}>
          <HoverCardTrigger asChild>
            <span
              className={`text-base rounded transition-colors ${raleway.variable} ${
                hoverEnabled ? "cursor-pointer" : ""
              } ${hoverColor} ${appliedColor}`}
            >
              {word.text}
            </span>
          </HoverCardTrigger>
          {hoverEnabled && word.definition && (
            <HoverCardContent className={`flex flex-col text-sm ${geist.className}`}>
              <div className="flex flex-col items-center justify-center gap-1">
                <span className="font-bold">{word.type}</span>
                <span>{word.definition}</span>

                <Button
                  variant="outline"
                  onClick={() => !alreadySaved && addDictionary(word.text)}
                  className="w-4 h-5 rounded-sm cursor-pointer"
                  disabled={alreadySaved}
                  title={alreadySaved ? "Already saved" : "Add"}
                >
                  {alreadySaved ? tickIcon : addIcon}
                </Button>
              </div>
            </HoverCardContent>
          )}
        </HoverCard>
      </React.Fragment>
    );
  };


  return (

    <div className="bg-background flex flex-col justify-center items-center text-foreground flex-1 rounded-lg">
      <div className="flex text-2xl justify-start pl-10 items-center border-b w-full h-15">
        {conversation.title}
      </div>

      <div className="flex flex-row w-full">
        <ScrollArea className="w-3/4 flex-1 h-170 border-b">
          <div className="h-full flex-1 p-5 text-lg">
            {/* {pages.length > 0 ? (
              pages[currentPage].map((line, i) => ( ---  PAGINATION LOGIC----*/}
              {Array.isArray(rawDialogue) && rawDialogue.length > 0 ? (
                rawDialogue.map((line, i) => (

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

          <div className="p-10 italic text-zinc-500">You have reached the end of {conversation.title}</div>

        </ScrollArea>

        <div className="w-1/8 border-l pt-10">
          <div className="flex justify-center items-center">
            <div className="flex justify-center items-center gap-3 flex-col">
              <span className="flex gap-1 items-center">
                <div className="bg-pink-500 rounded px-1">Hover</div> <Switch checked={hoverEnabled} onCheckedChange={setHoverEnabled} />
              </span>

              <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                  <AccordionTrigger className="w-31">Word Classes</AccordionTrigger>
                  <AccordionContent>
                  <div className="bg-background rounded-md p-2 w-full gap-2 flex flex-col">
                    <WordTypeSettings wordTypes={wordTypes} toggleWordType={toggleWordType} />
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </div>
      </div>


      {/*-----------------------PAGINATED CONVERSATION TEXT---------------*/}
      {/* {pages.length > 1 && (
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
                      setCurrentPage(i);
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
        </div> */}

    </div>
  );
}
