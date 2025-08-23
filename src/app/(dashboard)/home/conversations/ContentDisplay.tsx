import React from "react";
import { Switch } from "@/components/ui/switch";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Geist } from "next/font/google";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Check, Plus } from "lucide-react";
import { WordTypeSettings } from "@/components/ui/WordTypeSettings";
import { Button } from "@/components/ui/button";
import { databases, storage } from "@/data/appwrite";
import { useUserStore } from "@/data/useUserStore";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { audioBucketId } from "@/data/appwrite";
import { AudioPlayer } from "./AudioPlayer";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { backgroundColors, hoverBackgroundColors } from "@/data/color";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"



const geist = Geist({ subsets: ["latin"], variable: "--font-geist", display: "swap" });

const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!;
const USERS_COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_USERS_COLLECTION_ID!;

interface Word {
  text: string;
  type: WordTypeKey;
  definition?: string;
  context?: string,
}

interface ConversationProps {
  conversation: {
    $id: string;
    title: string;
    level: string;
    audioFileId: string;
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

  type BackgroundColorKey = keyof typeof backgroundColors;


type WordTypeData = {
  colorKey: BackgroundColorKey;
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



  const {
    user,
    dictionaryWords,
    setDictionaryWords,
    completeConversations,
    setConversationComplete,
    customColors,
    isSubscribed,
  } = useUserStore();

  const savedWords = dictionaryWords;
  const userId = user?.$id ?? null;
  const isComplete = completeConversations.includes(conversation.$id);
  const [audioUrl, setAudioUrl] = React.useState<string | null>(null);
  const [audioLoading, setAudioLoading] = React.useState(true);

    React.useEffect(() => {
  const fetchAudioUrl = async () => {
    if (!conversation || !conversation.audioFileId) {
      setAudioLoading(false);
      return;
    }

    try {
      const result = await storage.getFileView(audioBucketId, conversation.audioFileId);
      console.log("Audio preview URL:", result);
      setAudioUrl(result);
    } catch (err) {
      console.error("Error fetching audio preview:", err);
      setAudioUrl(null);
    } finally {
      setAudioLoading(false);
    }
  };

  fetchAudioUrl();
}, [conversation]);


console.log(customColors)

const [wordTypes, setWordTypes] = React.useState<Record<WordTypeKey, WordTypeData>>({
  noun: { colorKey: "pink500", enabled: false },
  verb: { colorKey: "red500", enabled: false },
  adjective: { colorKey: "green500", enabled: false },
  pronoun: { colorKey: "blue500", enabled: false },
  adverb: { colorKey: "yellow500", enabled: false },
  idiom: { colorKey: "purple500", enabled: false },
  preposition: { colorKey: "orange500", enabled: false },
  article: { colorKey: "cyan700", enabled: false },
  conjunction: { colorKey: "yellow500", enabled: false },
  interjection: { colorKey: "lime500", enabled: false },
  determiner: { colorKey: "violet500", enabled: false },
  contraction: { colorKey: "purple500", enabled: false },
});



React.useEffect(() => {
  if (!customColors?.length) return;

  const keys: WordTypeKey[] = [
    "noun", "verb", "adjective", "pronoun", "adverb",
    "idiom", "preposition", "article", "conjunction",
    "interjection", "determiner", "contraction"
  ];

  setWordTypes(prev => {
    const updated = { ...prev };
    keys.forEach((key, index) => {
      if (customColors[index]) {
        updated[key].colorKey = customColors[index];
      }
    });
    return updated;
  });
}, [customColors]);

  function cleanWord(rawWord: string) {
    return rawWord
      .toLowerCase()
      .replace(/[’]/g, "'")
      .replace(/[.,!?—;:()"]/g, "")
      .trim();
  }

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

  const displayText = word.text.replace(/\/.*?\//g, "");
  const colorKey = wordType.colorKey;
  const baseClass = backgroundColors[colorKey];
  const hoverClass = hoverBackgroundColors[colorKey];
  const isEnabled = wordType.enabled;
  const appliedColor = isEnabled ? baseClass : "";
  const appliedHover = hoverEnabled ? hoverClass : "";
  const wordString = `${cleanWord(word.text)}::${word.definition}`;
  const alreadySaved = savedWords.includes(wordString);



    async function addDictionary(wordString: string) {
      if (!userId) {
        toast("Account required", {
          description: "You need to log in or create an account to save words.",
        });
        return;
      }

      if (savedWords.includes(wordString)) return;

      const updatedWords = [...savedWords, wordString];
      setDictionaryWords(updatedWords);
      toast.success(`Added "${wordString.split("::")[0]}" to your dictionary`);

      try {
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
            className={`text-base rounded transition-colors ${
              hoverEnabled ? "cursor-pointer" : ""
            } ${appliedHover} ${appliedColor}`}
          >
            {displayText}
          </span>

          </HoverCardTrigger>
          {hoverEnabled && word.definition && (
            <HoverCardContent className={`flex flex-col text-sm ${geist.className}`}>
              <div className="flex flex-col items-center justify-center gap-1">
                <span className="font-bold">{word.type}</span>
                <span>{word.definition}</span>

                <Button
                  variant="outline"
                  onClick={() => !alreadySaved && addDictionary(`${cleanWord(word.text)}::${word.definition}`)}
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


  // Mobile Settings Drawer Component
  const MobileSettingsDrawer = () => (
    <div className="lg:hidden">
      <Drawer>
        <DrawerTrigger className="text-sm shadow-sm bg-background border-1 rounded-md p-1">Word Classes</DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Word Class Settings</DrawerTitle>
            <DrawerDescription>Select word classes to highlight</DrawerDescription>
          </DrawerHeader>
          <div className="px-4 pb-4">

            <div className="bg-background rounded-md p-2 flex flex-col gap-2">
              <WordTypeSettings wordTypes={wordTypes} toggleWordType={toggleWordType} />
            </div>
          </div>
          <DrawerFooter>
            <DrawerClose className="cursor-pointer underline">
              Close
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );

  return (

    <div className="grid grid-rows-[auto_1fr] h-full w-full bg-background text-foreground rounded-lg">

  <div className="border-b px-10 py-4 font-light text-2xl">
    {conversation.title}
  </div>


  <div className="grid grid-cols-1 lg:grid-cols-[6fr_1fr] overflow-hidden h-full">
    <ScrollArea className="h-full w-full overflow-y-auto">
      <div className="p-5 text-lg">
        {Array.isArray(rawDialogue) && rawDialogue.length > 0 ? (
          rawDialogue.map((line, i) => (
            <div key={i} className="flex flex-col md:flex-col lg:flex-row mb-10">
              <div className="font-semibold lg:pr-6 lg:border-r-1 border-zinc-500 min-w-[100px] ">
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
        <div className="p-5 flex flex-col ">
          <div className="text-base italic text-zinc-500">You have reached the end of {conversation.title}</div>
          {!user && (
            <Link href={"/login"}>
            <Badge>
              Login to track completion
            </Badge>
            </Link>

          )}

          {!isComplete && user && (
            <Badge
              className="cursor-pointer mt-3"
              onClick={() => setConversationComplete(conversation.$id)}
            >
              Mark as Complete
            </Badge>
          )}
          {isComplete && (
            <Badge className="bg-green-500 mt-3">Complete</Badge>
          )}
        </div>

      </div>
    </ScrollArea>


    <div className="p-5 h-full border-l-1 hidden lg:block">
      <div className="flex flex-col items-center gap-4">

        <span className="flex gap-1 items-center">
          <div className="bg-pink-500 rounded px-1">Hover</div>
          <Switch checked={hoverEnabled} onCheckedChange={setHoverEnabled} />
        </span>

        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>Word Classes</AccordionTrigger>
            <AccordionContent>
              <div className="bg-background rounded-md p-2 flex flex-col gap-2">
                <WordTypeSettings wordTypes={wordTypes} toggleWordType={toggleWordType} />
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>

      </div>
    <div className="flex flex-col p-2 items-center justify-center h-full w-full bg-background border-t-1 rounded-bl-md">
      <MobileSettingsDrawer/>
  {audioLoading ? (
    <Skeleton className="" />
  ) : audioUrl ? (
    isSubscribed ? (
        <AudioPlayer src={audioUrl} />
    ) : (
        <span className="text-zinc-500">Subscription required</span>
    )
  ) : (
      <span className="text-zinc-500">No audio found</span>

  )}
</div>




  </div>
  );
}











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