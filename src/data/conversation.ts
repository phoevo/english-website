import { getConversationFromDB } from "./appwrite"; // Import the function from appwrite.ts
import { vocab } from "./vocab";

export interface Word {
  text: string;
  type: string;
  definition?: string;
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
export const parseDialogue = (rawDialogue: string) => {
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
            .replace(/[’]/g, "'") // normalize fancy apostrophes
            .replace(/[.,!?—;:()"]/g, ""); // remove all other punctuation

          // Lookup cleaned word in vocab
          const vocabEntry = vocab[cleaned];

          return {
            text: rawWord, // Keep the original word with punctuation for display
            type: vocabEntry?.type ?? "unknown", // Use type from vocab or "unknown"
            definition: vocabEntry?.definition, // Include the definition from vocab
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

  let parsedContent: any = doc.content;

  try {
    // If content is a valid JSON array (already parsed), this works
    parsedContent = JSON.parse(doc.content);
  } catch (e) {
    // If it's not JSON, assume it's raw dialogue text and parse it
    parsedContent = parseDialogue(doc.content);
  }

  return {
    title: doc.title,
    content: parsedContent,
  };
};
