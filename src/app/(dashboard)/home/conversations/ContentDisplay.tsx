import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Switch } from "@/components/ui/switch";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { ScrollArea } from "@/components/ui/scroll-area"

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

  const colorMap: Record<string, string> = {
    noun: "hover:bg-pink-500",
    verb: "hover:bg-red-500",
    adverb: "hover:bg-teal-500",
    adjective: "hover:bg-yellow-500",
    idiom: "hover:bg-purple-500",
    pronoun: "hover:bg-blue-500",
    preposition: "hover:bg-orange-500",
    article: "hover:bg-gray-500",
    conjunction: "hover:bg-green-500",
    punctuation: "hover:bg-gray-700",
    interjection: "hover:bg-lime-500",
  };

  const renderWord = (word: Word, index: number) => {
    if (!word?.text) return null;

    const baseColor = colorMap[word.type]?.replace("hover:", "") || "";
    const hoverColor = hoverEnabled ? colorMap[word.type] || "" : "";
    const nounColor = nounEnabled && word.type === "noun" ? baseColor : "";

    return (
      <React.Fragment key={index}>
        <HoverCard openDelay={100} closeDelay={0}>
          <HoverCardTrigger asChild>
            <span
              className={`text-base rounded transition-colors ${
                hoverColor ? "cursor-pointer" : ""
              } ${hoverColor} ${nounColor}`}
            >
              {word.text}
            </span>
          </HoverCardTrigger>
          {hoverEnabled && word.definition && (
            <HoverCardContent className="text-sm">{word.definition}</HoverCardContent>
          )}
        </HoverCard>
        {" "}
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
                {/* Speaker section with right border */}
                <div className="font-semibold pr-6 border-r border-gray-400 min-w-[100px] text-right">
                  {line.speaker}
                </div>

                {/* Words section */}
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
