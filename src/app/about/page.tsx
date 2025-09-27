import React from "react";
import type { Metadata } from "next";
import { DM_Sans, Geist } from "next/font/google";
import { ScrollArea } from "@/components/ui/scroll-area";

const geist = Geist({ subsets: ["latin"] });
const dmSans = DM_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "About",
  description:
    "About us and what we do",
};

export default function AboutPage(): JSX.Element {


  return (
   <main className={`pt-10 max-w-4xl mx-auto prose prose-neutral ${geist.className}`}>
  <ScrollArea className="h-screen overflow-y-auto px-2">
    <h1 className={`text-4xl sm:text-5xl md:text-6xl font-normal mb-3 ${dmSans.className}`}>
      About
    </h1>

    <h2 className="text-2xl font-semibold mb-2">The Goal</h2>
    <p className="mb-4">
      Synomilo is built to prepare students for real conversations. The goal is
      to give learners practical experience before they face the same
      situations in the real world.
    </p>

    <h2 className="text-2xl font-semibold mb-2">The Problem</h2>
    <p className="mb-4">
      Traditional language learning relies heavily on grammar drills, sentence
      structure exercises, and worksheets. Matching words to definitions or
      circling correct answers does little to prepare students for real communication. Many learners know the rules but
      still freeze when the times comes to respond, and theres no notes infront of them for help.
    </p>

    <h2 className="text-2xl font-semibold mb-2">The Approach</h2>
    <p className="mb-4">
      Synomilo removes the busywork and focuses on practice. Instead of
      worksheets, we provide realistic, meaningful conversations that simulate
      real-world scenarios. This is preparation, training, simulation - not repetition of
      what you already know.
    </p>

    <h2 className="text-2xl font-semibold mb-2">For Students and Tutors</h2>
    <p className="mb-4">
      Synomilo can be used independently or together with a tutor. Students can
      practice scenarios on their own with the available tools, or work through them
      in a live lesson for immediate feedback. Tutors can run conversation-based
      classes without spending time writing dialogues or searching online for
      specific situations. Synomilo provides ready-to-use material so both sides
      can focus on what matters: the conversation itself.
    </p>

    <h2 className="text-2xl font-semibold mb-2">The Outcome</h2>
    <p className="mb-4">
      Students get to practice responding naturally, adapting in the moment, and building their confidence.
      And for tutors, it saves time and gives them a solid framework to lean on, whether it’s for the whole
       lesson or just part of it.
    </p>
  </ScrollArea>
</main>

  );
}
