  import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
  import { Button } from '@/components/ui/button';
  import { ScrollArea } from '@radix-ui/react-scroll-area';
  import { X } from 'lucide-react';
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
      <div className="flex flex-col bg-muted p-4 border-1 shadow-lg rounded-lg w-150">

        <div className="flex flex-row p-3">
        <div className="p-2 w-full border rounded-xl bg-background shadow-md">
          <h2 className="text-xl font-semibold mb-4 p-3">Saved Words</h2>
        {dictionaryWords.length > 0 ? (
          <ScrollArea className="h-100 overflow-y-scroll">
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
                      <div className="border-b flex flex-row flex-grow pb-2 w-full px-5">
                        <Accordion type="single" collapsible className='flex-1'>
                          <AccordionItem value={`item-${index}`}>
                            <AccordionTrigger className="text-left w-full font-semibold text-base sm:text-lg cursor-pointer">
                              {displayWord}
                            </AccordionTrigger>
                            <AccordionContent className="text-sm text-zinc-500 mt-1">
                              <div className="italic text-zinc-500">{details?.type}</div>
                              <div className="mt-1">{details?.definition}</div>
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>

                      <Button
                            variant="destructive"
                            size="icon"
                            className="ml-4 cursor-pointer h-5 w-5 self-center"
                          >
                            <motion.div whileHover={{ rotate: 90 }} transition={{ duration: 0.1 }}>
                              <X className="h-4 w-4" />
                            </motion.div>
                          </Button>
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
