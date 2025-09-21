import { vocabA1 } from "./vocab-a1";
import { vocabB1 } from "./vocab-b1";

export const vocabIndex: Record<string, Record<string, { type: string; definition: string; context: string; }>> = {
  //A1
  "A1": vocabA1,
  "B1": vocabB1
};
