import { vocabA1 } from "./vocab-a1";
import { vocabB1 } from "./vocab-b1";
import { vocabA1toB2 } from "./vocab-a1-a2";
import { vocabB1toB2 } from "./vocab-b1-b2";

export const vocabIndex: Record<string, Record<string, { type: string; definition: string; context: string;}>> = {
  "A1": vocabA1toB2,
  "A2": vocabA1toB2,
  "B1": vocabB1toB2,
  "B2": vocabB1toB2,
};
