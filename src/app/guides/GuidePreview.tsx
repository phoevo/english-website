"use client";

import { useState } from "react";
import {
  BookOpen,
  ChevronDown,
  Lightbulb,
  MessageCircle,
  Mic,
  PenLine,
  BookMarked,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const guideSections = [
  {
    title: "Lesson focus",
    icon: BookOpen,
    preview: [
      "Answering common English job interview questions",
      "Describing professional experience and responsibilities",
      "Discussing strengths and weaknesses professionally",
      "Using workplace idioms and natural business expressions",
    ],
  },
  {
    title: "Vocabulary & expressions",
    icon: BookMarked,
    preview: [
      "candidate",
      "leadership",
      "adaptability",
      "dependable",
      "prioritize",
      "deadline",
    ],
  },
  {
    title: "Warm-up activity",
    icon: Lightbulb,
    preview: [
      "Which part of a job interview would make you feel most nervous?",
      "How do you normally prepare for an interview?",
    ],
  },
  {
    title: "Discussion prompts",
    icon: MessageCircle,
    preview: [
      "Have you ever attended a job interview in English?",
      "What is the most difficult interview question to answer?",
      "Which personal qualities make someone a strong candidate?",
    ],
  },
  {
    title: "Speaking activity",
    icon: Mic,
    preview: [
      "Conduct a mock interview",
      "Switch roles and repeat with a different position",
    ],
  },
  {
    title: "Homework",
    icon: PenLine,
    preview: [
      "Choose a real job advertisement written in English",
      "Prepare answers to common interview questions",
      "Record a two-minute introduction",
    ],
  },
];

export function GuidePreview() {
  const [openSection, setOpenSection] = useState("");

  return (
    <Card className="w-full overflow-hidden shadow-sm">
      <CardContent className="p-0">
        {/* Header */}
        <div className="border-b p-3">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="secondary">B2</Badge>
            <Badge variant="secondary">Business English</Badge>
          </div>

          <h3 className="mt-4 text-2xl font-semibold">
            Job Interview English
          </h3>

          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            An optional teaching guide with activities and ideas to build
            around the conversation.
          </p>
        </div>

        {/* Guide sections */}
        <div className="divide-y">
          {guideSections.map((section) => {
            const Icon = section.icon;
            const isOpen = openSection === section.title;

            return (
              <div key={section.title}>
                <button
                  type="button"
                  onClick={() =>
                    setOpenSection(isOpen ? "" : section.title)
                  }
                  className="group flex w-full cursor-pointer items-center gap-4 px-6 py-5 text-left transition hover:bg-muted/30"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border bg-background">
                    <Icon size={17} />
                  </div>

                  <span className="flex-1 font-medium">
                    {section.title}
                  </span>

                  <ChevronDown
                    size={18}
                    className={`text-muted-foreground transition-transform ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pl-[4.75rem]">
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      {section.preview.map((item) => (
                        <li key={item} className="flex gap-2">
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-foreground/40" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}