import { vocabA1 } from "./vocab-a1";
import { vocabB1 } from "./vocab-b1";
import { vocabA1toB2 } from "./vocab-a1-b2";

export const vocabIndex: Record<string, Record<string, { type: string; definition: string; context: string;}>> = {
  //A1
  "A1": vocabA1toB2,
  "A2": vocabA1toB2,
  "B1": vocabA1toB2,
  "B2": vocabA1toB2,
};
