import { getConversationFromDB } from "./appwrite";
import { vocabIndex } from "./vocab/vocabIndex";

export interface Word {
  text: string;
  type: string;
  definition?: string;
  context?: string;
}

export interface DialogueLine {
  speaker: string;
  words: Word[];
}

// Shape used by components
export interface Conversation {
  $id: string;
  title: string;
  description?: string;
  level: string;
  audioFileId: string;
  content: string | DialogueLine[];
  isPro: boolean;
  category: string;
}

export const parseDialogue = (
  rawDialogue: string,
  vocab: Record<string, { type: string; definition: string; context: string }>
): DialogueLine[] => {
  const parsedDialogue = rawDialogue
    .trim()
    .split("\n")
    .map((line) => {
      const [speaker, ...rest] = line.split(":");
      const text = rest.join(":").trim();

      const words = text
        .replace(/\s+/g, " ")
        .split(" ")
        .map((rawWord) => {
          const cleaned = rawWord
            .toLowerCase()
            .replace(/[’]/g, "'")
            .replace(/[.,!?—;:()\"]/g, "");

          const vocabEntry = vocab[cleaned];

          return {
            text: rawWord.replace(/_/g, " "),
            type: vocabEntry?.type ?? "unknown",
            definition: vocabEntry?.definition,
            context: vocabEntry?.context,
          } as Word;
        });

      return {
        speaker: speaker.trim(),
        words,
      } as DialogueLine;
    });

  return parsedDialogue;
};

export const loadConversation = async (documentId: string): Promise<Conversation> => {
  const doc = await getConversationFromDB(documentId);
  if (!doc) {
    throw new Error("Conversation not found");
  }

  const vocab = vocabIndex[doc.level] ?? {};
  if (!vocab){
    throw new Error("Level not found");
  }

  let parsedContent: string | DialogueLine[];

  try {
    // Attempt to parse as pre-parsed dialogue structure
    const parsed = JSON.parse(doc.content);
    parsedContent = Array.isArray(parsed) ? (parsed as DialogueLine[]) : doc.content;
  } catch {
    // Fallback to parsing our custom dialogue format
    parsedContent = parseDialogue(doc.content, vocab);
  }

  return {
    $id: doc.$id,
    title: doc.title,
    description: doc.description,
    content: parsedContent,
    level: doc.level,
    audioFileId: doc.audioFileId,
    isPro: doc.isPro,
    category: doc.category,
  };
};
