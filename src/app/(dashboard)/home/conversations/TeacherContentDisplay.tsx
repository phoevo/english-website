import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";
import { useUserStore } from "@/data/useUserStore";
import {
  databases,
  databaseId,
  usersCollectionId,
} from "@/data/appwrite";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Button } from "@/components/ui/button";
import { Check, Plus } from "lucide-react";
import { Geist } from "next/font/google";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist", display: "swap" });


interface Word {
  text: string;
  type: string;
  definition?: string;
  context?: string;
}

interface ConversationProps {
  conversation: {
    $id: string;
    title: string;
    level: string;
    content:
      | string
      | {
          speaker: string;
          words: Word[];
        }[];
  };
}

export default function TeacherContentDisplay({
  conversation,
}: ConversationProps) {
  const {
    user,
    dictionaryWords,
    setDictionaryWords,
  } = useUserStore();
  const [fontSize] = React.useState(16);

  const rawDialogue = conversation.content;

  function cleanWord(rawWord: string) {
    return rawWord
      .toLowerCase()
      .replace(/[’]/g, "'")
      .replace(/[.,!?—;:()"]/g, "")
      .trim();
  }

  const tickIcon = <Check size={17} />;
    const addIcon = <Plus/>

  function RenderWord({ word }: { word: Word }) {
  const [isOpen, setIsOpen] = React.useState(false);

  const isMobile =
    typeof window !== "undefined" &&
    window.matchMedia("(hover: none)").matches;

  if (!word.text) return null;

  const cleanedText = cleanWord(word.text);
  const displayText = word.text.replace(/\/.*?\//g, "");
  const definition = word.definition?.trim() ?? "";

  const wordString = `${cleanedText}::${definition}`;
  const alreadySaved = dictionaryWords.includes(wordString);

  if (!user) {
    return (
      <span style={{ fontSize }}>
        {displayText}
      </span>
    );
  }

  async function addDictionary() {
    if (!user) {
      toast.error("No user detected", {
        description: "Please log in to save words to your dictionary.",
      });
      return;
    }

    if (!definition) {
      toast.error("No definition available for this word.");
      return;
    }

    if (alreadySaved) {
      return;
    }

    const updatedWords = [...dictionaryWords, wordString];

    try {
      await databases.updateDocument(
        databaseId,
        usersCollectionId,
        user.$id,
        {
          dictionaryWords: updatedWords,
        }
      );

      setDictionaryWords(updatedWords);

      toast.success(`Added "${cleanedText}" to your dictionary`);
    } catch (error) {
      console.error("Error saving word:", error);
      toast.error("The word could not be saved.");
    }
  }

  return (
    <HoverCard
      open={isMobile ? isOpen : undefined}
      onOpenChange={isMobile ? setIsOpen : undefined}
      openDelay={100}
      closeDelay={10}
    >
      <HoverCardTrigger asChild>
        <span
          onClick={() => {
            if (isMobile) {
              setIsOpen((current) => !current);
            }
          }}
          className="cursor-pointer rounded transition-colors hover:bg-zinc-300 dark:hover:bg-zinc-500"
          style={{ fontSize }}
        >
          {displayText}
        </span>
      </HoverCardTrigger>

      {definition && (
        <HoverCardContent className={`flex flex-col text-sm ${geist.className}`}>
                      <div className="flex flex-col items-center justify-center gap-1">
                        <span className="font-bold">{word.type}</span>
                        <span>{word.definition}</span>
                        <Button
                          variant="outline"
                          onClick={addDictionary}
                          disabled={alreadySaved}
                          className="w-4 h-5 rounded-sm cursor-pointer"
                          title={alreadySaved ? "Already saved" : "Add"}
                        >
                          {alreadySaved ? tickIcon : addIcon}
                        </Button>
                      </div>
                    </HoverCardContent>
      )}
    </HoverCard>
  );
}
  return (
    <div className="grid h-full w-full grid-rows-[auto_1fr] rounded-lg bg-background text-foreground">
      <div className="flex items-center gap-2 border-b px-10 py-4 text-2xl font-light">
        <span>{conversation.title}</span>
      </div>

      <ScrollArea className="h-full w-full overflow-y-auto">
        <div className="p-5 text-lg">
          {Array.isArray(rawDialogue) &&
          rawDialogue.length > 0 ? (
            rawDialogue.map((line, lineIndex) => (
              <div
                key={`${line.speaker}-${lineIndex}`}
                className="mb-8 flex flex-row"
              >
                <div className="min-w-[100px] border-r border-zinc-500 pr-6 text-right text-base font-semibold">
                  {line.speaker}
                </div>

                <div className="ml-6 flex flex-wrap gap-1">
                 {line.words.map((word, index) => (
                <RenderWord
                  key={`${line.speaker}-${index}-${word.text}`}
                  word={word}
                />
              ))}
                </div>
              </div>
            ))
          ) : (
            <div>
              No conversation data available.
            </div>
          )}

          <div className="flex flex-col p-5">
            <div className="text-base italic text-zinc-500">
              End of {conversation.title} — Level:{" "}
              {conversation.level}
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};