import { getConversationFromDB } from "./appwrite"; // Import the function from appwrite.ts
import { vocabIndex } from "./vocab/vocabIndex";

export interface Word {
  text: string;
  type: string;
  definition?: string;
  context?: string,
}

interface DialogueLine {
  speaker: string;
  words: Word[];
}

export interface Conversation {
  title: string;
  content: string | DialogueLine[];
}

// Function to parse dialogue from raw text
export const parseDialogue = (rawDialogue: string, vocab: Record<string, { type: string; definition: string; context: string; }>) => {
  const parsedDialogue = rawDialogue
    .trim()
    .split("\n")
    .map(line => {
      const [speaker, ...rest] = line.split(":");
      const text = rest.join(":").trim();

      const words = text
        .replace(/\s+/g, " ")
        .split(" ")
        .map(rawWord => {
          const cleaned = rawWord
            .toLowerCase()
            .replace(/[’]/g, "'")
            .replace(/[.,!?—;:()"]/g, "");

          const vocabEntry = vocab[cleaned];

          return {
            text: rawWord,
            type: vocabEntry?.type ?? "unknown",
            definition: vocabEntry?.definition,
            context: vocabEntry?.context,
          };
        });

      return {
        speaker: speaker.trim(),
        words,
      };
    });

  return parsedDialogue;
};





export const loadConversation = async (documentId: string) => {
  const doc = await getConversationFromDB(documentId);
  console.log(documentId)

  const vocab = vocabIndex[doc.level] ?? {};

  let parsedContent: unknown = doc.content;

  try {
    parsedContent = JSON.parse(doc.content);
  } catch {
    parsedContent = parseDialogue(doc.content, vocab); // pass vocab
  }

  return {
    $id: doc.$id,
    title: doc.title,
    description: doc.description,
    content: parsedContent,
    level: doc.level,
    audioFileId: doc.audioFileId,

  };

};
