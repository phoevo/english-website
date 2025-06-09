import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ScrollArea } from '@radix-ui/react-scroll-area';
import { AnimatePresence, motion } from 'motion/react';
import React from 'react';


const dictionaryWords = [
  "your::Belonging to you.",
  "saved::Kept for later.",
  "words::Things you say or write.",
  "will::Shows what is going to happen.",
  "appear::To show up.",
  "in::Inside something.",
  "this::The thing close to us.",
  "format::The way something is arranged."
];


function getWordDetails(word: string) {
  const entry = dictionaryWords.find((w) => w.startsWith(`${word}::`));
  if (!entry) return null;
  const [, definition] = entry.split("::");
  return {
    type: "noun",
    definition,
  };
}

export function TestDictionary() {
  return (
    <div className="flex flex-col bg-card p-10 border-1 rounded-lg w-150">
      <h2 className="text-4xl font-semibold bg-card">Dictionary</h2>
      <div className="flex flex-row">
      <div className="m-10 p-10 w-full border rounded-xl bg-background shadow-md">
      {dictionaryWords.length > 0 ? (
        <ScrollArea className="h-150 overflow-y-scroll">
          <div className="grid gap-3">
            <AnimatePresence>
              {[...dictionaryWords].map((entry, index) => {
                const [word] = entry.split("::");
                const details = getWordDetails(word);
                const displayWord = word.charAt(0).toUpperCase() + word.slice(1);

                return (
                  <motion.div
                    key={word}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2, delay: index * 0.02 }}
                  >
                    <div className="border-b pb-2 px-10 w-auto">
                      <Accordion type="single" collapsible>
                        <AccordionItem value={`item-${index}`}>
                          <AccordionTrigger className="text-left w-full font-semibold text-base sm:text-lg cursor-pointer">
                            {displayWord}
                          </AccordionTrigger>
                          <AccordionContent className="text-sm text-zinc-700 mt-1">
                            <div className="italic text-zinc-500">{details?.type}</div>
                            <div className="mt-1">{details?.definition}</div>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
            <div className="text-center text-sm text-zinc-400 pt-4">End of list</div>
          </div>
        </ScrollArea>
      ) : (
        <p className="text-center text-zinc-500">No saved words yet</p>
      )}
      </div>

      </div>
    </div>
  );
}

export default TestDictionary;
