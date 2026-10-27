import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Button } from "@/components/ui/button";
import { Ellipsis, Plus } from "lucide-react";
import { toast } from "sonner";
import { Geist } from "next/font/google";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist", display: "swap" });

interface Word {
  text: string;
  definition?: string;
  type?: string;
}

interface ConversationProps {
  conversation: {
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

export default function DemoTutorContentDisplay({
  conversation,
}: ConversationProps) {
  const rawDialogue = conversation.content;
  const [fontSize] = React.useState(16);

  function RenderWord({ word }: { word: Word }) {
    const [isOpen, setIsOpen] = React.useState(false);

    const isMobile =
      typeof window !== "undefined" &&
      window.matchMedia("(hover: none)").matches;

    if (!word.text) return null;

    const displayText = word.text.replace(/\/.*?\//g, "");
    const definition = word.definition?.trim() ?? "";
    const toastWord = displayText.replace(/[.,!?]$/, "");

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
              <span>{definition}</span>
              <Button
                variant="outline"
                className="w-6 h-6 rounded-sm cursor-pointer"
                onClick={() => toast.success(`Added "${toastWord}" to your dictionary! (This is a demo)`)}
              >
                <Plus size={14} />
              </Button>
            </div>
          </HoverCardContent>
        )}
      </HoverCard>
    );
  }

  return (
    <div className="grid h-full w-full grid-rows-[auto_1fr] rounded-lg bg-background text-foreground border dark:border-2 shadow-lg">
      <div className="flex items-center justify-between gap-2 border-b px-6 py-4 text-xl font-light">
        <span>{conversation.title}</span>
        <span className="text-sm text-muted-foreground">
          Tutor view · Level {conversation.level}
        </span>
      </div>

      <ScrollArea className="h-full w-full overflow-y-auto">
        <div className={`p-5 text-lg ${geist.className}`}>
          {Array.isArray(rawDialogue) && rawDialogue.length > 0 ? (
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
            <div>No conversation data available.</div>
          )}
          <div className="flex justify-center"><Ellipsis/></div>

          <div className="flex flex-col p-5">
            <div className="text-base italic text-zinc-500">
              End of {conversation.title}
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
