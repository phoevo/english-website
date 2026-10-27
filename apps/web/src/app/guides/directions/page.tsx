import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Check,
  Lightbulb,
} from "lucide-react";
import Link from "next/link";
import { Geist } from "next/font/google";

const geist = Geist({ subsets: ["latin"] });

/* eslint react/no-unescaped-entities: 0 */

export const metadata = {
  title:
    "Asking for Directions in English: A2 Conversation Guide | Synomilo",
  description:
    "Practise asking for and giving directions in English with this A2 conversation guide. Learn useful vocabulary, phrases, comprehension questions, and speaking activities.",
  alternates: {
    canonical: "/guides/asking-for-directions",
  },
  openGraph: {
    title: "Asking for Directions in English: A2 Conversation Guide",
    description:
      "Learn how to ask for directions, understand simple instructions, and give directions in English with this A2 conversation guide.",
    url: "/guides/asking-for-directions",
    type: "article",
  },
};

const keyVocabulary = [
  {
    term: "lost",
    meaning: "Unable to find your way or unsure where you are.",
  },
  {
    term: "around the corner",
    meaning: "Very close, usually just beyond the corner of a street.",
  },
  {
    term: "traffic lights",
    meaning:
      "Lights that control traffic at a road intersection.",
  },
  {
    term: "straight ahead",
    meaning: "Moving directly forward without turning.",
  },
  {
    term: "turn right",
    meaning: "Change direction towards the right.",
  },
  {
    term: "bridge",
    meaning:
      "A structure that allows people or vehicles to cross over a river, road, or other obstacle.",
  },
  {
    term: "block",
    meaning:
      "The distance between two streets in a town or city.",
  },
  {
    term: "clock tower",
    meaning:
      "A tall structure with a large clock that can be used as a landmark.",
  },
];

const usefulExpressions = [
  {
    expression: "I've lost my way",
    meaning:
      "A natural way to say that you don't know where you are or how to get somewhere.",
  },
  {
    expression: "Just around the corner",
    meaning:
      "Very close and not far away.",
  },
  {
    expression: "Walking forever",
    meaning:
      "An informal expression used to exaggerate how long a journey feels.",
  },
  {
    expression: "Point me in the right direction",
    meaning:
      "To give someone information about which way they should go.",
  },
  {
    expression: "Keep an eye out for",
    meaning:
      "To watch carefully for something that you expect to see.",
  },
  {
    expression: "No worries",
    meaning:
      "A friendly way of saying that something is not a problem.",
  },
];

const comprehensionQuestions = [
  "What is Emma trying to find?",
  "Who does Emma ask for help?",
  "Where does the shop clerk say the train station is?",
  "What should Emma do when she reaches the traffic lights?",
  "What will Emma see on her left?",
  "What does Emma need to cross?",
  "What landmark is next to the train station?",
  "What coffee shop should Emma look out for?",
];

const discussionQuestions = [
  "Do you usually use a map when you travel?",
  "What do you do when you get lost?",
  "Is it easy for you to ask strangers for help?",
  "Would you rather use Google Maps or ask someone for directions?",
  "Have you ever been completely lost in a new city?",
  "What landmarks are useful for giving directions in your town?",
  "How would you explain the way to your home to a visitor?",
  "What is the most useful phrase for asking for directions?",
];

const directionPrompts = [
  "Ask someone where a train station is.",
  "Explain that you are lost.",
  "Give directions using 'go straight ahead'.",
  "Tell someone when to turn left or right.",
  "Use a landmark to help someone find their destination.",
  "Check that the other person understands your directions.",
];

type RelatedGuide = {
  title: string;
  href: string;
};

const relatedGuides: RelatedGuide[] = [
  {
    title: "Networking Event: B1 English Conversation Guide",
    href: "/guides/networking-event",
  },
  {
    title: "Job Interview English: B2 Conversation Guide",
    href: "/guides/job-interview",
  },
];

export default function PostPage() {
  return (
    <div className={`flex flex-col lg:flex-row ${geist.className}`}>
      <aside className="self-start p-5 pt-10 lg:sticky lg:top-8 lg:w-80">
        <Link
          href="/guides"
          className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition hover:text-foreground"
        >
          <ArrowLeft size={16} />
          Back to all guides
        </Link>

        <section className="space-y-4">
          <h2 className="border-b pb-2 text-2xl">
            Related Conversation Guides
          </h2>

          <div className="flex flex-col gap-3">
            {relatedGuides.map((guide) => (
              <Link
                key={guide.href}
                href={guide.href}
                className="group rounded-md border bg-card p-4 transition hover:shadow-sm"
              >
                <strong className="font-semibold group-hover:underline">
                  {guide.title}
                </strong>

                <span className="mt-3 flex items-center gap-1 text-sm text-muted-foreground">
                  Read guide
                  <ArrowRight size={14} />
                </span>
              </Link>
            ))}
          </div>
        </section>
      </aside>

      <article
        className={`m-2 h-screen space-y-16 overflow-y-auto rounded-lg bg-background p-5 lg:w-2/3 ${geist.className}`}
      >
        {/* Header */}
        <header className="space-y-5">
          <nav
            aria-label="Breadcrumb"
            className="text-sm text-muted-foreground"
          >
            <Link
              href="/guides"
              className="hover:text-foreground hover:underline"
            >
              Guides
            </Link>

            <span className="px-2">/</span>

            <span>Asking for Directions</span>
          </nav>

          <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
            <span className="rounded-full border bg-card px-3 py-1">
              A2
            </span>

            <span className="rounded-full border bg-card px-3 py-1">
              Everyday English
            </span>

            <span className="rounded-full border bg-card px-3 py-1">
              Travel English
            </span>

            <span className="rounded-full border bg-card px-3 py-1">
              Speaking Guide
            </span>
          </div>

          <h1 className="border-b pb-3 text-4xl leading-tight">
            Asking for Directions in English: A2 Conversation Guide
          </h1>

          <p className="max-w-3xl text-lg text-muted-foreground">
            Learn how to ask for and give directions in English with this A2
            conversation guide. Practise useful phrases for getting around a
            town or city, understanding directions, and asking for help when
            you're lost.
          </p>
        </header>

        {/* Introduction */}
        <section className="space-y-4">
          <h2 className="border-b pb-2 text-2xl">
            About This Directions Guide
          </h2>

          <p>
            Asking for directions is one of the most useful English skills for
            travelling. Whether you're looking for a train station, hotel,
            restaurant, or another landmark, knowing how to ask for help can
            make travelling much easier.
          </p>

          <p>
            The full Synomilo conversation follows Emma as she asks a shop
            clerk for directions to the train station. The conversation
            introduces simple phrases for explaining where you are, describing
            turns, and identifying landmarks.
          </p>

          <p>
            The language is designed for A2 learners, with practical
            expressions that can be used in real situations.
          </p>

          <div className="rounded-md border bg-card p-5">
            <strong className="block text-lg">Guide focus</strong>

            <ul className="mt-3 space-y-2">
              <li className="flex items-start gap-2">
                <Check
                  className="mt-0.5 text-green-500"
                  size={18}
                />
                Asking someone for directions politely
              </li>

              <li className="flex items-start gap-2">
                <Check
                  className="mt-0.5 text-green-500"
                  size={18}
                />
                Understanding basic directions
              </li>

              <li className="flex items-start gap-2">
                <Check
                  className="mt-0.5 text-green-500"
                  size={18}
                />
                Using landmarks to describe locations
              </li>

              <li className="flex items-start gap-2">
                <Check
                  className="mt-0.5 text-green-500"
                  size={18}
                />
                Using common travel and location vocabulary
              </li>
            </ul>
          </div>
        </section>

        {/* Before conversation */}
        <section className="space-y-4">
          <h2 className="border-b pb-2 text-2xl">
            Before the Conversation
          </h2>

          <p>
            Begin by asking learners how they usually find their way around an
            unfamiliar city.
          </p>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-md border bg-card p-4">
              <strong className="border-b border-pink-500">
                Option A
              </strong>

              <p className="mt-2 text-sm text-muted-foreground">
                Use Google Maps or another navigation app
              </p>
            </div>

            <div className="rounded-md border bg-card p-4">
              <strong className="border-b border-blue-500">
                Option B
              </strong>

              <p className="mt-2 text-sm text-muted-foreground">
                Ask someone nearby for help
              </p>
            </div>

            <div className="rounded-md border bg-card p-4">
              <strong className="border-b border-yellow-500">
                Option C
              </strong>

              <p className="mt-2 text-sm text-muted-foreground">
                Try to work it out yourself
              </p>
            </div>
          </div>

          <p>Useful warm-up questions include:</p>

          <ul className="list-disc space-y-2 pl-6">
            <li>Have you ever been lost in another city?</li>
            <li>Is it easy for you to ask strangers for help?</li>
            <li>Do you usually use a map when travelling?</li>
            <li>What landmarks do you know near your home?</li>
          </ul>

          <div className="flex items-start gap-3 rounded-md border bg-card p-4">
            <Lightbulb
              className="mt-0.5 flex-shrink-0 text-yellow-500"
              size={20}
            />

            <div>
              <strong>Warm-up challenge</strong>

              <p className="mt-2 text-muted-foreground">
                Ask learners to explain how to get from their home to a nearby
                shop, school, station, or other familiar place.
              </p>
            </div>
          </div>
        </section>

        {/* Vocabulary */}
        <section className="space-y-5">
          <h2 className="border-b pb-2 text-2xl">
            Key Directions Vocabulary
          </h2>

          <div className="overflow-hidden rounded-md border">
            <div className="grid grid-cols-[minmax(120px,0.8fr)_2fr] bg-muted px-4 py-3 font-semibold">
              <span>Word or phrase</span>
              <span>Meaning</span>
            </div>

            {keyVocabulary.map((item) => (
              <div
                key={item.term}
                className="grid grid-cols-[minmax(120px,0.8fr)_2fr] gap-4 border-t px-4 py-3"
              >
                <strong>{item.term}</strong>

                <span className="text-muted-foreground">
                  {item.meaning}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Expressions */}
        <section className="space-y-5">
          <h2 className="border-b pb-2 text-2xl">
            Useful Expressions From the Conversation
          </h2>

          <p>
            These expressions are useful when asking for help, describing your
            location, or following directions.
          </p>

          <div className="grid gap-4 md:grid-cols-2">
            {usefulExpressions.map((item) => (
              <div
                key={item.expression}
                className="rounded-md border bg-card p-4"
              >
                <strong>{item.expression}</strong>

                <p className="mt-2 text-sm text-muted-foreground">
                  {item.meaning}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Conversation Preview */}
        <section className="space-y-4">
          <h2 className="border-b pb-2 text-2xl">
            Asking for Directions Conversation Preview
          </h2>

          <p>
            Emma is trying to find the train station when she asks a shop clerk
            for help.
          </p>

          <div className="space-y-4 rounded-md border bg-card p-5">
            <div>
              <strong>Emma:</strong>

              <p className="mt-1 text-muted-foreground">
                Excuse me, could you help me, please?
              </p>
            </div>

            <div>
              <strong>Shop Clerk:</strong>

              <p className="mt-1 text-muted-foreground">
                Hello, yes of course! What do you need?
              </p>
            </div>

            <div>
              <strong>Emma:</strong>

              <p className="mt-1 text-muted-foreground">
                I'm trying to find the train station, but I think I've lost my
                way.
              </p>
            </div>

            <div>
              <strong>Shop Clerk:</strong>

              <p className="mt-1 text-muted-foreground">
                No worries. You're actually just around the corner. It's across
                the bridge, not far from here.
              </p>
            </div>
          </div>

          <p className="text-sm text-muted-foreground">
            The full conversation continues with the shop clerk explaining the
            route using traffic lights, a park, a bridge, and a clock tower as
            landmarks.
          </p>
        </section>

        {/* Comprehension */}
        <section className="space-y-4">
          <h2 className="border-b pb-2 text-2xl">
            Directions Conversation Comprehension Questions
          </h2>

          <p>
            Ask learners to answer these questions after reading or listening
            to the complete conversation.
          </p>

          <ol className="list-decimal space-y-3 pl-6">
            {comprehensionQuestions.map((question) => (
              <li key={question}>{question}</li>
            ))}
          </ol>
        </section>

        {/* Discussion */}
        <section className="space-y-4">
          <h2 className="border-b pb-2 text-2xl">
            Directions Discussion Questions
          </h2>

          <p>
            Use these questions to move beyond the conversation and get
            learners talking about travel and navigation.
          </p>

          <ol className="list-decimal space-y-3 pl-6">
            {discussionQuestions.map((question) => (
              <li key={question}>{question}</li>
            ))}
          </ol>
        </section>

        {/* CTA */}
        <section className="rounded-md bg-accent p-8 text-center">
          <BookOpen className="mx-auto mb-4" size={30} />

          <h2 className="text-2xl font-semibold">
            Practise the Full Directions Conversation
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
            Open the full conversation in Synomilo to practise asking for and
            giving directions in context, explore useful vocabulary, and build
            confidence with everyday English.
          </p>

          <Link href="/home/conversations/68f1112fe34924c519ad">
            <Button
              className="mt-6 cursor-pointer bg-pink-500 text-background hover:bg-pink-500/85"
            >
              Open the conversation
              <ArrowRight className="ml-2" size={17} />
            </Button>
          </Link>
        </section>

        {/* Language Focus */}
        <section className="space-y-4">
          <h2 className="border-b pb-2 text-2xl">
            Language Focus: Asking for Directions
          </h2>

          <p>
            There are several simple ways to ask someone for directions.
            Encourage learners to use polite phrases when speaking to someone
            they don't know.
          </p>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-md border bg-card p-5">
              <strong>Could you help me?</strong>

              <p className="mt-3 text-sm text-muted-foreground">
                A polite way to get someone's attention before asking for
                information.
              </p>
            </div>

            <div className="rounded-md border bg-card p-5">
              <strong>Which way should I go?</strong>

              <p className="mt-3 text-sm text-muted-foreground">
                A natural question when you want someone to explain which
                direction to take.
              </p>
            </div>

            <div className="rounded-md border bg-card p-5">
              <strong>How do I get to...?</strong>

              <p className="mt-3 text-sm text-muted-foreground">
                One of the most common ways to ask how to reach a place.
              </p>
            </div>

            <div className="rounded-md border bg-card p-5">
              <strong>Is it far from here?</strong>

              <p className="mt-3 text-sm text-muted-foreground">
                A useful follow-up question when you want to know how long the
                journey will take.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 rounded-md border bg-card p-4">
            <Lightbulb
              className="mt-0.5 flex-shrink-0 text-yellow-500"
              size={20}
            />

            <div>
              <strong>Useful direction words</strong>

              <p className="mt-2 text-muted-foreground">
                Go straight · turn left · turn right · cross the bridge · on
                your left · on your right · next to · across from · around the
                corner
              </p>
            </div>
          </div>
        </section>

        {/* Speaking Activity */}
        <section className="space-y-4">
          <h2 className="border-b pb-2 text-2xl">
            Speaking Activity: Give Me Directions
          </h2>

          <p>
            Put learners into pairs. One learner needs to find a location and
            the other learner must give directions.
          </p>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-md border bg-card p-5">
              <strong className="text-lg">Person A</strong>

              <ul className="mt-3 list-disc space-y-2 pl-5 text-muted-foreground">
                <li>You are visiting a new city.</li>
                <li>You are looking for the train station.</li>
                <li>You don't know the area.</li>
                <li>Ask at least three questions.</li>
              </ul>
            </div>

            <div className="rounded-md border bg-card p-5">
              <strong className="text-lg">Person B</strong>

              <ul className="mt-3 list-disc space-y-2 pl-5 text-muted-foreground">
                <li>You know the area well.</li>
                <li>Give clear directions.</li>
                <li>Use at least two landmarks.</li>
                <li>Check that the other person understands.</li>
              </ul>
            </div>
          </div>

          <p>
            Learners should include each of the following in their
            conversation:
          </p>

          <ol className="list-decimal space-y-3 pl-6">
            {directionPrompts.map((prompt) => (
              <li key={prompt}>{prompt}</li>
            ))}
          </ol>
        </section>

        {/* Common mistakes */}
        <section className="space-y-4">
          <h2 className="border-b pb-2 text-2xl">
            Common Mistakes When Giving Directions
          </h2>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-md border bg-card p-4">
              <strong>Giving too many instructions at once</strong>

              <p className="mt-2 text-sm text-muted-foreground">
                Give one or two directions at a time so the listener can follow
                the route.
              </p>
            </div>

            <div className="rounded-md border bg-card p-4">
              <strong>Forgetting landmarks</strong>

              <p className="mt-2 text-sm text-muted-foreground">
                Places such as shops, parks, bridges, and traffic lights can
                make directions much easier to understand.
              </p>
            </div>

            <div className="rounded-md border bg-card p-4">
              <strong>Using unclear language</strong>

              <p className="mt-2 text-sm text-muted-foreground">
                Words such as "there" or "that way" can be confusing. Try to
                give a clear direction instead.
              </p>
            </div>

            <div className="rounded-md border bg-card p-4">
              <strong>Not checking understanding</strong>

              <p className="mt-2 text-sm text-muted-foreground">
                Ask if the other person understands or let them repeat the
                instructions back to you.
              </p>
            </div>
          </div>
        </section>

        {/* Homework */}
        <section className="space-y-4">
          <h2 className="border-b pb-2 text-2xl">
            Independent Practice
          </h2>

          <p>
            Ask learners to choose a familiar place near their home and write
            simple directions from their home to that location.
          </p>

          <p>They should include:</p>

          <ul className="list-disc space-y-2 pl-6">
            <li>At least two turns</li>
            <li>One landmark</li>
            <li>One phrase using "next to" or "across from"</li>
            <li>One distance expression</li>
            <li>A polite opening question</li>
          </ul>

          <p>
            Once finished, they should try to give the directions without
            looking at their notes.
          </p>
        </section>

        {/* Teaching tip */}
        <section className="space-y-4">
          <h2 className="border-b pb-2 text-2xl">
            Teaching Tip
          </h2>

          <div className="flex items-start gap-3 rounded-md bg-muted p-5">
            <Lightbulb
              className="mt-0.5 flex-shrink-0 text-yellow-500"
              size={22}
            />

            <p>
              Directions become much easier to practise when learners have a
              visual map. Draw a simple street with a few shops, a park, a
              bridge, and traffic lights. Give each learner a different
              destination and have them ask each other for directions.
            </p>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t pt-8">
          <Link
            href="/guides"
            className="inline-flex items-center gap-2 font-medium text-pink-500 hover:underline"
          >
            <ArrowLeft size={16} />
            Back to all Synomilo guides
          </Link>
        </footer>
      </article>
    </div>
  );
}