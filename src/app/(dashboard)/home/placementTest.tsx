"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

type Question = {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
  level: "A1" | "A2" | "B1" | "B2" | "C1" | "C2";
};

const questions: Question[] = [
  // A1
  {
    id: 1,
    level: "A1",
    question: "I ____  a student.",
    options: ["am", "is", "are", "be"],
    correctAnswer: "am",
  },
  {
    id: 2,
    level: "A1",
    question: "She ____ to the store every day.",
    options: ["go", "goes", "going", "gone"],
    correctAnswer: "goes",
  },
  {
    id: 3,
    level: "A1",
    question: "What time ____ you wake up?",
    options: ["does", "do", "are", "is"],
    correctAnswer: "do",
  },
  {
    id: 4,
    level: "A1",
    question: "I have two ____.",
    options: ["childs", "children", "childes", "child"],
    correctAnswer: "children",
  },
  {
    id: 5,
    level: "A1",
    question: "Where ____ they from?",
    options: ["do", "are", "is", "be"],
    correctAnswer: "are",
  },

  // A2
  {
    id: 6,
    level: "A2",
    question: "I have lived in Paris ____ five years.",
    options: ["since", "for", "during", "at"],
    correctAnswer: "for",
  },
  {
    id: 7,
    level: "A2",
    question: "I can’t come now because I ____ dinner.",
    options: ["cook", "am cooking", "cooked", "have cooked"],
    correctAnswer: "am cooking",
  },
  {
    id: 8,
    level: "A2",
    question: "We’ve been friends ____ childhood.",
    options: ["since", "for", "by", "during"],
    correctAnswer: "since",
  },
  {
    id: 9,
    level: "A2",
    question: "They ____ in London before moving to New York.",
    options: ["lived", "live", "living", "have lived"],
    correctAnswer: "lived",
  },
  {
    id: 10,
    level: "A2",
    question: "Can you tell me ____ the nearest bank is?",
    options: ["what", "how", "where", "why"],
    correctAnswer: "where",
  },

  // B1
  {
    id: 11,
    level: "B1",
    question: "He was tired, ____ he kept working.",
    options: ["but", "so", "because", "although"],
    correctAnswer: "but",
  },
  {
    id: 12,
    level: "B1",
    question: "If I ____ earlier, I wouldn’t have missed the bus.",
    options: ["wake", "woke", "had woken", "was waking"],
    correctAnswer: "had woken",
  },
  {
    id: 13,
    level: "B1",
    question: "I’ve never been to Japan, ____ I’d love to go.",
    options: ["and", "but", "so", "because"],
    correctAnswer: "but",
  },
  {
    id: 14,
    level: "B1",
    question: "She asked me if I ____ help her.",
    options: ["will", "would", "can", "should"],
    correctAnswer: "would",
  },
  {
    id: 15,
    level: "B1",
    question: "He’s used to ____ early every day.",
    options: ["wake", "waking", "woke", "woken"],
    correctAnswer: "waking",
  },

  // B2+
  {
    id: 16,
    level: "B2",
    question: "Despite ____ late, he managed to catch the train.",
    options: ["arriving", "to arrive", "arrive", "arrived"],
    correctAnswer: "arriving",
  },
  {
    id: 17,
    level: "B2",
    question: "The book, ____ was written in the 19th century, is still relevant today.",
    options: ["which", "that", "who", "where"],
    correctAnswer: "which",
  },
  {
    id: 18,
    level: "B2",
    question: "She was so tired that she could ____ keep her eyes open.",
    options: ["hardly", "nearly", "barely", "almost"],
    correctAnswer: "barely",
  },

  // C1–C2
  {
    id: 19,
    level: "C1",
    question: "Had I known about the traffic, I ____ a different route.",
    options: ["will take", "would have taken", "took", "take"],
    correctAnswer: "would have taken",
  },
  {
    id: 20,
    level: "C2",
    question: "Not until the speech ____ that the audience clapped.",
    options: ["ended", "had ended", "was ending", "has ended"],
    correctAnswer: "had ended",
  },
];


export default function PlacementTest() {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [answers, setAnswers] = useState<string[]>([]);

  const handleAnswer = (answer: string) => {
    const isCorrect = answer === questions[current].correctAnswer;
    if (isCorrect) setScore(score + 1);
    setAnswers([...answers, answer]);

    if (current + 1 < questions.length) {
      setCurrent(current + 1);
    } else {
      setCompleted(true);
    }
  };

  const getLevel = () => {
    if (score >= 17) return "C2";
    if (score >= 14) return "C1";
    if (score >= 11) return "B2";
    if (score >= 8) return "B1";
    if (score >= 5) return "A2";
    return "A1";
  };

  if (completed) {
    return (
      <div className="space-y-4 p-6 border rounded-md">
        <p className="text-lg">You scored {score} out of {questions.length}</p>
        <p className="text-xl font-bold">Suggested Level: {getLevel()}</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 p-6 border rounded-md">
      <h2 className="text-xl font-semibold">Question {current + 1} of {questions.length}</h2>
      <p className="min-h-[80px] max-h-[120px] overflow-y-auto text-lg">{questions[current].question}</p>
      <div className="space-y-2">
        {questions[current].options.map((opt) => (
          <Button
            key={opt}
            onClick={() => handleAnswer(opt)}
            variant="outline"
            className="w-full text-left cursor-pointer"
          >
            {opt}
          </Button>
        ))}
      </div>
    </div>
  );
}
