import { storage } from '@/data/appwrite';

interface WordDefinition {
  word: string;
  type: string;
  definition: string;
  level?: string;
  examples?: string[];
}

interface DictionaryData {
  [word: string]: {
    type: string;
    definition: string;
    level?: string;
    examples?: string[];
  };
}

class DictionaryService {
  private dictionary: DictionaryData | null = null;
  private loading = false;
  private loadPromise: Promise<void> | null = null;

  // Replace with your actual bucket ID and file ID
  private readonly DICTIONARY_BUCKET_ID = process.env.NEXT_PUBLIC_DICTIONARY_BUCKET_ID || 'your-bucket-id';
  private readonly DICTIONARY_FILE_ID = process.env.NEXT_PUBLIC_DICTIONARY_FILE_ID || 'your-file-id';

  async loadDictionary(): Promise<void> {
    // If already loaded, return immediately
    if (this.dictionary) return;

    // If currently loading, wait for the existing load to complete
    if (this.loading && this.loadPromise) {
      return this.loadPromise;
    }

    this.loading = true;
    this.loadPromise = this.performLoad();
    
    try {
      await this.loadPromise;
    } finally {
      this.loading = false;
    }
  }

  private async performLoad(): Promise<void> {
    try {
      console.log('Loading dictionary from Appwrite Storage...');
      
      // Download the dictionary file
      const fileUrl = storage.getFileDownload(this.DICTIONARY_BUCKET_ID, this.DICTIONARY_FILE_ID);
      const response = await fetch(fileUrl);
      
      if (!response.ok) {
        throw new Error(`Failed to load dictionary: ${response.statusText}`);
      }

      const dictionaryText = await response.text();
      
      // Parse the dictionary (assuming it's JSON format)
      // Adjust this based on your file format
      this.dictionary = JSON.parse(dictionaryText);
      
      console.log(`Dictionary loaded successfully with ${Object.keys(this.dictionary).length} words`);
    } catch (error) {
      console.error('Failed to load dictionary:', error);
      // Fallback to empty dictionary to prevent crashes
      this.dictionary = {};
    }
  }

  async lookupWord(word: string): Promise<WordDefinition | null> {
    // Ensure dictionary is loaded
    await this.loadDictionary();

    if (!this.dictionary) {
      return null;
    }

    const cleanedWord = this.cleanWord(word);
    const wordData = this.dictionary[cleanedWord];

    if (!wordData) {
      return null;
    }

    return {
      word: cleanedWord,
      type: wordData.type,
      definition: wordData.definition,
      level: wordData.level,
      examples: wordData.examples || []
    };
  }

  async lookupMultipleWords(words: string[]): Promise<Record<string, WordDefinition | null>> {
    // Ensure dictionary is loaded
    await this.loadDictionary();

    const results: Record<string, WordDefinition | null> = {};

    words.forEach(word => {
      const cleanedWord = this.cleanWord(word);
      const wordData = this.dictionary?.[cleanedWord];

      if (wordData) {
        results[word] = {
          word: cleanedWord,
          type: wordData.type,
          definition: wordData.definition,
          level: wordData.level,
          examples: wordData.examples || []
        };
      } else {
        results[word] = null;
      }
    });

    return results;
  }

  private cleanWord(word: string): string {
    return word
      .toLowerCase()
      .replace(/[']/g, "'")
      .replace(/[.,!?—;:()\"]/g, "")
      .trim();
  }

  // Preload dictionary (call this when app starts)
  async preload(): Promise<void> {
    return this.loadDictionary();
  }

  // Check if dictionary is loaded
  isLoaded(): boolean {
    return this.dictionary !== null;
  }

  // Get dictionary stats
  getStats(): { totalWords: number; isLoaded: boolean } {
    return {
      totalWords: this.dictionary ? Object.keys(this.dictionary).length : 0,
      isLoaded: this.isLoaded()
    };
  }

  // Force reload dictionary (useful for updates)
  async reload(): Promise<void> {
    this.dictionary = null;
    this.loading = false;
    this.loadPromise = null;
    return this.loadDictionary();
  }
}

// Export singleton instance
export const dictionaryService = new DictionaryService();
export type { WordDefinition };
