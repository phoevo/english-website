import { Databases, Client, Query } from "node-appwrite";

interface Request {
  method: string;
  bodyJson: {
    word?: string;
    words?: string[];
  };
}

interface Response {
  json: (body: object, status?: number) => void;
}

interface DictionaryParams {
  req: Request;
  res: Response;
  adminClient: Client;
}

interface WordDefinition {
  word: string;
  type: string;
  definition: string;
  level?: string;
  examples?: string[];
}

export default async function handleDictionary({
  req,
  res,
  adminClient,
}: DictionaryParams): Promise<void> {
  console.log("Dictionary lookup started, method:", req.method);
  
  if (req.method !== "POST") {
    return res.json({ error: "Method not allowed" }, 405);
  }

  const databases = new Databases(adminClient);

  try {
    const { word, words } = req.bodyJson;

    // Handle single word lookup
    if (word) {
      const result = await lookupSingleWord(databases, word);
      return res.json(result);
    }

    // Handle batch word lookup
    if (words && Array.isArray(words)) {
      const results = await lookupMultipleWords(databases, words);
      return res.json({ words: results });
    }

    return res.json({ error: "No word or words provided" }, 400);

  } catch (error) {
    console.error("Dictionary Error:", error);
    return res.json({ 
      error: "Dictionary lookup failed", 
      details: (error as Error).message 
    }, 500);
  }
}

async function lookupSingleWord(
  databases: Databases, 
  word: string
): Promise<WordDefinition | { error: string }> {
  const cleanedWord = word.toLowerCase().replace(/[.,!?—;:()\"]/g, "").trim();
  
  try {
    const result = await databases.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
      process.env.DICTIONARY_COLLECTION_ID!,
      [Query.equal("word", cleanedWord)]
    );

    if (result.documents.length > 0) {
      const doc = result.documents[0];
      return {
        word: doc.word,
        type: doc.type,
        definition: doc.definition,
        level: doc.level,
        examples: doc.examples || []
      };
    }

    return { error: "Word not found" };
  } catch (error) {
    console.error("Error looking up word:", cleanedWord, error);
    return { error: "Lookup failed" };
  }
}

async function lookupMultipleWords(
  databases: Databases, 
  words: string[]
): Promise<Record<string, WordDefinition | { error: string }>> {
  const results: Record<string, WordDefinition | { error: string }> = {};
  
  // Process in batches to avoid overwhelming the database
  const batchSize = 10;
  for (let i = 0; i < words.length; i += batchSize) {
    const batch = words.slice(i, i + batchSize);
    const batchPromises = batch.map(word => 
      lookupSingleWord(databases, word).then(result => ({ word, result }))
    );
    
    const batchResults = await Promise.all(batchPromises);
    batchResults.forEach(({ word, result }) => {
      results[word] = result;
    });
  }
  
  return results;
}
