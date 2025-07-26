import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

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

export default function TeacherContentDisplay({ conversation }: ConversationProps) {
  const rawDialogue = conversation.content;

  const renderWord = (word: Word, index: number) => {
    const displayText = word.text.replace(/\/.*?\//g, "");
    return (
      <span key={index} className="text-base">
        {displayText}
      </span>
    );
  };

  return (
    <div className="grid grid-rows-[auto_1fr] h-full w-full bg-background text-foreground rounded-lg">
      <div className="border-b px-10 py-4 font-light text-2xl flex items-center gap-2">
        <span>{conversation.title}</span>
        <Badge variant="secondary" className="bg-blue-100 text-blue-800">
          Teacher View
        </Badge>
      </div>

      <ScrollArea className="h-full w-full overflow-y-auto">
        <div className="p-5 text-lg">
          {Array.isArray(rawDialogue) && rawDialogue.length > 0 ? (
            rawDialogue.map((line, i) => (
              <div key={i} className="flex flex-row mb-8">
                <div className="font-semibold text-md pr-6 border-r-1 border-zinc-500 min-w-[100px] text-right">
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

          <div className="p-5 flex flex-col">
            <div className="text-base italic text-zinc-500">
              End of {conversation.title} - Level: {conversation.level}
            </div>
            <div className="mt-2 text-sm text-zinc-400">
              Teacher view: Clean text display for teaching purposes
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
