import { Button } from "@/components/ui/button";
import { Check, Lightbulb } from "lucide-react";
import Link from "next/link";

/* eslint react/no-unescaped-entities: 0 */
export const metadata = {
  title: "What to Do When Your ESL Lesson Finishes Early | Synomilo",
  description:
    "Discover simple ESL time filler activities that keep students engaged and practicing English when your lesson ends earlier than expected.",
};

export default function PostPage() {
  return (
    <div className="w-full lg:p-10 space-y-6">
      <header className="mb-10 space-y-4">
        <h1 className="text-4xl border-b pb-2">
          What to Do When Your ESL Lesson Finishes Early
        </h1>
        <p>
          Every ESL teacher has experienced it. You've planned a full lesson,
          but your students finish the activities ten minutes earlier than
          expected. Rather than ending class early or improvising on the spot,
          keep a few simple speaking activities ready. These ideas require
          little preparation and keep students using English until the very end
          of the lesson.
        </p>
      </header>

      {/* 1 */}
      <section className="space-y-3">
        <h2 className="text-2xl border-b pb-1">
          1. Ask Open-Ended Conversation Questions
        </h2>

        <p>
          Avoid questions that can be answered with "yes" or "no". Instead,
          encourage students to explain their opinions, tell stories, and ask
          follow-up questions.
        </p>

        <div className="flex flex-col border bg-card rounded-md mt-5 p-3">
          <strong>Example</strong>

          <p>"What's your favourite food?"</p>

          <p className="mt-2 text-muted-foreground">
            becomes...
          </p>

          <p className="flex flex-row items-center gap-2 mt-2">
            <Check className="text-green-500" />
            "If you could only eat one meal for the rest of your life, what
            would it be and why?"
          </p>
        </div>

        <p>
          Better questions naturally create longer conversations and encourage
          students to react to one another.
        </p>
      </section>

      {/* 2 */}
      <section className="space-y-3 mt-20">
        <h2 className="text-2xl border-b pb-1">
          2. Review Vocabulary with Quick Games
        </h2>

        <p>
          Vocabulary games are perfect when you have five or ten minutes left.
          Students stay engaged while reviewing words they've already learned.
        </p>

        <ul className="list-disc pl-6 space-y-2">
          <li>Categories ("Name five animals...")</li>
          <li>Word Association</li>
          <li>20 Questions</li>
          <li>Describe the Word</li>
        </ul>

        <p>
          These activities require almost no preparation and work with nearly
          every level.
        </p>
      </section>

      {/* 3 */}
      <section className="space-y-3 mt-20">
        <h2 className="text-2xl border-b pb-1">
          3. Practice a Real-Life Conversation
        </h2>

        <p>
          One of the best ways to use unexpected free time is to practice a real
          conversation. Give students a situation and let them role-play with a
          partner.
        </p>

        <div className="flex flex-col border bg-card rounded-md mt-5 p-3">
          <strong>Conversation Ideas</strong>

          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Ordering coffee</li>
            <li>Checking into a hotel</li>
            <li>Meeting someone for the first time</li>
            <li>Asking for directions</li>
          </ul>
        </div>

        <p>
          Real-world situations help students build confidence and prepare them
          for conversations they'll actually have outside the classroom.
        </p>
      </section>

      {/* 4 */}
      <section className="space-y-3 mt-20">
        <h2 className="text-2xl border-b pb-1">
          4. Finish with a Reflection
        </h2>

        <div className="flex flex-row items-center gap-2 text-base">
          <Lightbulb className="text-yellow-500 flex-shrink-0" size={20} />
          <i className="text-muted-foreground">
            Reflection helps students remember what they learned and gives you
            valuable feedback.
          </i>
        </div>

        <p className="mt-4">
          Before students leave, ask a few simple questions:
        </p>

        <ul className="list-disc pl-6 space-y-2">
          <li>What's one new word you learned today?</li>
          <li>What was the easiest activity?</li>
          <li>What do you still find difficult?</li>
          <li>What would you like to practice next lesson?</li>
        </ul>

        <p>
          Spending just a few minutes reflecting reinforces learning and helps
          you plan future lessons more effectively.
        </p>
      </section>

      {/* CTA */}
      <section className="space-y-3 mt-20">
        <div className="flex flex-col items-center text-center bg-accent p-8 rounded-md">
          <h3 className="text-xl font-semibold mb-3">
            Need a ready-made speaking activity?
          </h3>

          <p className="mb-5">
            Synomilo includes real English conversation scenarios
            that are perfect when you have a few extra minutes at the end of
            class.
          </p>

          <Link href="/">
            <Button
              size="sm"
              variant="default"
              className="cursor-pointer text-background bg-pink-500 hover:bg-pink-500/85"
            >
              Try Synomilo for free
            </Button>
          </Link>
        </div>
      </section>

      {/* Conclusion */}
      <section className="space-y-3 mt-20">
        <h2 className="text-2xl border-b pb-1">Conclusion</h2>

        <p>
          An early finish doesn't have to mean wasted class time. A few simple
          conversation prompts, vocabulary games, or role-play activities can
          keep students engaged while giving them valuable speaking practice.
          Keeping a handful of these activities ready means you'll never have to
          scramble for ideas again.
        </p>

        <p>
          Also read:{" "}
          <a
            href="/blog/lesson-planning-for-esl-teachers"
            className="text-pink-500 hover:underline"
          >
            Lesson Planning Tips Every ESL Teacher Should Know
          </a>
        </p>
      </section>
    </div>
  );
}