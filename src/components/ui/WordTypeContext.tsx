"use client"

import React, { createContext, useContext, useState } from 'react';

export type WordTypeKey =
  | "noun"
  | "verb"
  | "adjective"
  | "pronoun"
  | "adverb"
  | "idiom"
  | "preposition"
  | "article"
  | "conjunction"
  | "interjection"
  | "determiner"
  | "contraction";

export type WordTypeData = {
  color: string;
  enabled: boolean;
};

const defaultWordTypes: Record<WordTypeKey, WordTypeData> = {
  noun: { color: "pink-500", enabled: false },
  verb: { color: "red-500", enabled: false },
  adjective: { color: "green-500", enabled: false },
  pronoun: { color: "blue-500", enabled: false },
  adverb: { color: "yellow-500", enabled: false },
  idiom: { color: "purple-500", enabled: false },
  preposition: { color: "orange-500", enabled: false },
  article: { color: "gray-500", enabled: false },
  conjunction: { color: "yellow-500", enabled: false },
  interjection: { color: "lime-500", enabled: false },
  determiner: { color: "violet-500", enabled: false },
  contraction: { color: "purple-500", enabled: false },
};

type WordTypeContextType = {
  wordTypes: Record<WordTypeKey, WordTypeData>;
  setWordTypes: React.Dispatch<React.SetStateAction<Record<WordTypeKey, WordTypeData>>>;
};

const WordTypeContext = createContext<WordTypeContextType | undefined>(undefined);

export const WordTypeProvider = ({ children }: { children: React.ReactNode }) => {
  const [wordTypes, setWordTypes] = useState(defaultWordTypes);

  return (
    <WordTypeContext.Provider value={{ wordTypes, setWordTypes }}>
      {children}
    </WordTypeContext.Provider>
  );
};

export const useWordTypes = () => {
  const context = useContext(WordTypeContext);
  if (!context) {
    throw new Error('useWordTypes must be used within a WordTypeProvider');
  }
  return context;
};
