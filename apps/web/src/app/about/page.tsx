import React from "react";
import type { Metadata } from "next";
import { DM_Sans, Geist } from "next/font/google";
import { ScrollArea } from "@/components/ui/scroll-area";

const geist = Geist({ subsets: ["latin"] });
const dmSans = DM_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "About",
  description:
    "Synomilo helps English tutors create practical, conversation-focused lessons built around real-world situations.",
};

export default function AboutPage() {
  return (
    <main
      className={`pt-10 max-w-4xl mx-auto prose prose-neutral ${geist.className} text-foreground`}
    >
      <ScrollArea className="h-screen overflow-y-auto px-2">
        <h1
          className={`text-4xl sm:text-5xl md:text-6xl font-normal mb-3 text-foreground ${dmSans.className}`}
        >
          About
        </h1>

        <h2 className="text-2xl font-semibold mb-2 text-foreground">
          The Goal
        </h2>
        <p className="mb-4 text-muted-foreground">
          Synomilo is built to help English tutors spend less time preparing
          materials and more time teaching. It provides practical,
          conversation-focused material built around situations learners are
          likely to encounter outside the classroom.
        </p>

        <h2 className="text-2xl font-semibold mb-2 text-foreground">
          The Problem
        </h2>
        <p className="mb-4 text-muted-foreground">
          Creating a good speaking lesson takes more than finding a topic and
          writing a few questions. Tutors often have to search for suitable
          material, write realistic dialogues, adapt activities to different
          levels, and figure out how to turn everything into something they
          can actually use in a lesson. That preparation adds up, especially
          when the goal is to give students meaningful practice rather than
          another worksheet.
        </p>

        <h2 className="text-2xl font-semibold mb-2 text-foreground">
          The Approach
        </h2>
        <p className="mb-4 text-muted-foreground">
          Synomilo focuses on the situations behind the language. Instead of
          starting with isolated grammar points or vocabulary lists, tutors
          can start with a realistic scenario and build practice around the
          conversation that could happen there. The material is designed to
          give students something concrete to rehearse, adapt, and respond to,
          while giving tutors a practical framework to teach from.
        </p>

        <h2 className="text-2xl font-semibold mb-2 text-foreground">
          Built for Tutors
        </h2>
        <p className="mb-4 text-muted-foreground">
          Synomilo is designed to fit into the way tutors already teach.
          Scenarios can be used as the foundation for a full lesson, as focused
          speaking practice, or as a starting point for discussion and
          follow-up activities. Tutors can adapt the material to their
          students instead of spending their preparation time creating
          everything from scratch.
        </p>

        <h2 className="text-2xl font-semibold mb-2 text-foreground">
          The Outcome
        </h2>
        <p className="mb-15 text-muted-foreground">
          Tutors get practical material they can use without hours of
          preparation. Students get more opportunities to practice the kind of
          English they actually need to use: responding naturally, handling
          unexpected turns, and keeping a conversation going. The aim is
          simple — make speaking practice easier to prepare and more useful to
          teach.
        </p>
      </ScrollArea>
    </main>
  );
}
