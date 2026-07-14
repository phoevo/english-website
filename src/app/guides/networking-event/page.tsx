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
    "B1 Networking Event English Guide | Business English Conversation Practice | Synomilo",
  description:
    "Practise English for networking events with this B1 conversation guide. Includes vocabulary, business expressions, comprehension questions, role-play activities, and an interactive conversation.",
  alternates: {
    canonical: "/guides/networking-event",
  },
  openGraph: {
    title:
      "B1 Networking Event English Guide | Business English Conversation Practice",
    description:
      "Learn how to introduce yourself, discuss your career, make small talk, and end professional conversations politely.",
    url: "/guides/networking-event",
    type: "article",
  },
};

const keyVocabulary = [
  {
    term: "networking",
    meaning:
      "The activity of meeting people and building professional relationships.",
  },
  {
    term: "IT support",
    meaning:
      "Technical help provided to people who are having problems with computers or software.",
  },
  {
    term: "project management",
    meaning:
      "The process of planning, organizing, and completing a project.",
  },
  {
    term: "startup",
    meaning:
      "A new company that is usually trying to grow quickly.",
  },
  {
    term: "promotion",
    meaning:
      "A move to a more senior position with greater responsibility.",
  },
  {
    term: "workload",
    meaning:
      "The amount of work that a person is responsible for completing.",
  },
  {
    term: "career goals",
    meaning:
      "The professional achievements or positions someone hopes to reach.",
  },
  {
    term: "creativity",
    meaning:
      "The ability to produce original ideas or find new ways of doing things.",
  },
];

const usefulExpressions = [
  {
    expression: "Do you mind if I join you?",
    meaning:
      "A polite way to ask whether you can sit or spend time with someone.",
  },
  {
    expression: "What brings you here?",
    meaning:
      "A natural way to ask why someone is attending an event or visiting a place.",
  },
  {
    expression: "Fingers crossed",
    meaning:
      "Used to say that you hope something will happen successfully.",
  },
  {
    expression: "It's not what you know, it's who you know",
    meaning:
      "An expression suggesting that personal connections can be important for success.",
  },
  {
    expression: "Give it your all",
    meaning:
      "To make your strongest possible effort.",
  },
  {
    expression: "Stretch your legs",
    meaning:
      "Literally, to move after sitting; figuratively, to have more freedom or opportunity.",
  },
  {
    expression: "Full to the brim",
    meaning:
      "Completely full of something, such as ideas, energy, or emotion.",
  },
  {
    expression: "Burn the candle at both ends",
    meaning:
      "To work very hard for long periods without getting enough rest.",
  },
  {
    expression: "On the flip side",
    meaning:
      "Used to introduce the opposite or contrasting side of a situation.",
  },
  {
    expression: "No hard feelings",
    meaning:
      "Used to say that you are not angry or upset about something.",
  },
];

const comprehensionQuestions = [
  "Why does Anna decide to speak to David?",
  "Why had David not approached anyone before Anna arrived?",
  "What does David currently do for work?",
  "Which career would David like to move into?",
  "Why is David attending the networking event?",
  "What does Anna do at her current company?",
  "Why is Anna interested in finding a new position?",
  "What does Anna enjoy about working at a startup?",
  "What difficulties does Anna experience at work?",
  "Why does Anna leave the conversation?",
];

const discussionQuestions = [
  "Have you ever attended a professional networking event?",
  "Do you find it easy or difficult to start conversations with strangers?",
  "What makes someone approachable at a networking event?",
  "Is networking more effective online or face-to-face?",
  "How important are professional connections when looking for work?",
  "Would you rather work for a startup or a large company?",
  "What questions are appropriate when meeting someone professionally?",
  "How can someone make a good first impression?",
  "What should you avoid talking about when meeting a new professional contact?",
  "How can you leave a conversation politely without sounding rude?",
];

const networkingPrompts = [
  "Introduce yourself and explain what you do.",
  "Ask the other person what brought them to the event.",
  "Describe one career goal.",
  "Ask a follow-up question about their work.",
  "Mention one thing you like or dislike about your current role.",
  "End the conversation politely.",
];

type RelatedGuide = {
  title: string;
  href: string;
};

const relatedGuides: RelatedGuide[] = [
  {
    title: "Job Interview English: B2 Conversation Guide",
    href: "/guides/job-interview",
  },
  {
    title: "Remote Work vs Office Work: B2 Conversation Guide",
    href: "/guides/working-from-home-vs-the-office",
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

      <article className="m-2 space-y-16 rounded-lg bg-background p-5 lg:w-2/3 h-screen overflow-y-auto">
        <header className="space-y-5">
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-sm text-muted-foreground"
          >
            <Link href="/guides" className="hover:text-foreground hover:underline">
              Guides
            </Link>

            <span>/</span>

            <span>Networking Event</span>
          </nav>

          <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
            <span className="rounded-full border bg-card px-3 py-1">B1</span>

            <span className="rounded-full border bg-card px-3 py-1">
              Business English
            </span>

            <span className="rounded-full border bg-card px-3 py-1">
              Conversation Guide
            </span>

            <span className="rounded-full border bg-card px-3 py-1">
              Networking
            </span>
          </div>

          <h1 className="border-b pb-3 text-4xl leading-tight">
            Networking Event: B1 English Conversation Guide
          </h1>

          <p className="max-w-3xl text-lg text-muted-foreground">
            A practical B1 English guide for starting conversations at
            networking events. Learn how to introduce yourself, discuss your
            career, ask natural follow-up questions, and leave a professional
            conversation politely.
          </p>
        </header>

        {/* Guide introduction */}
        <section className="space-y-4">
          <h2 className="border-b pb-2 text-2xl">
            About This Networking Guide
          </h2>

          <p>
            Networking can feel uncomfortable, even for confident speakers.
            Starting a conversation with a stranger requires more than knowing
            the correct vocabulary. You also need to show interest, ask useful
            questions, and keep the conversation moving naturally.
          </p>

          <p>
            The full Synomilo conversation follows Anna and David as they meet
            for the first time at a professional networking event. They discuss
            their current jobs, future career plans, startup culture, and the
            reasons they are hoping to make new professional connections.
          </p>

          <p>
            Their exchange demonstrates how a short professional introduction
            can develop into a relaxed and meaningful conversation.
          </p>

          <div className="rounded-md border bg-card p-5">
            <strong className="block text-lg">What you'll practise</strong>

            <ul className="mt-3 space-y-2">
              <li className="flex items-start gap-2">
                <Check
                  className="mt-0.5 flex-shrink-0 text-green-500"
                  size={18}
                />
                Introducing yourself naturally at a professional event
              </li>

              <li className="flex items-start gap-2">
                <Check
                  className="mt-0.5 flex-shrink-0 text-green-500"
                  size={18}
                />
                Asking someone about their job and career plans
              </li>

              <li className="flex items-start gap-2">
                <Check
                  className="mt-0.5 flex-shrink-0 text-green-500"
                  size={18}
                />
                Keeping a conversation going with follow-up questions
              </li>

              <li className="flex items-start gap-2">
                <Check
                  className="mt-0.5 flex-shrink-0 text-green-500"
                  size={18}
                />
                Using natural workplace expressions and idioms
              </li>

              <li className="flex items-start gap-2">
                <Check
                  className="mt-0.5 flex-shrink-0 text-green-500"
                  size={18}
                />
                Ending a conversation politely
              </li>
            </ul>
          </div>
        </section>

        {/* Before starting */}
        <section className="space-y-4">
          <h2 className="border-b pb-2 text-2xl">Before You Start</h2>

          <p>
            Ask learners to imagine that they have just arrived at a networking
            event where they do not know anyone. Which approach would they feel
            most comfortable using?
          </p>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-md border bg-card p-4">
              <strong className="border-b border-pink-500">Option A</strong>

              <p className="mt-2 text-sm text-muted-foreground">
                Walk up to someone and introduce yourself directly
              </p>
            </div>

            <div className="rounded-md border bg-card p-4">
              <strong className="border-b border-blue-500">Option B</strong>

              <p className="mt-2 text-sm text-muted-foreground">
                Wait for someone else to begin the conversation
              </p>
            </div>

            <div className="rounded-md border bg-card p-4">
              <strong className="border-b border-yellow-500">Option C</strong>

              <p className="mt-2 text-sm text-muted-foreground">
                Join a group that is already talking
              </p>
            </div>
          </div>

          <p>Use these warm-up questions:</p>

          <ul className="list-disc space-y-2 pl-6">
            <li>Have you ever attended a networking event?</li>
            <li>Do you enjoy talking to strangers?</li>
            <li>What makes a good professional introduction?</li>
            <li>What would you want someone to remember about you?</li>
          </ul>

          <div className="flex items-start gap-3 rounded-md border bg-card p-4">
            <Lightbulb
              className="mt-0.5 flex-shrink-0 text-yellow-500"
              size={20}
            />

            <div>
              <strong>Warm-up challenge</strong>

              <p className="mt-2 text-muted-foreground">
                Ask learners to introduce themselves and explain what they do
                in no more than 30 seconds.
              </p>
            </div>
          </div>
        </section>

        {/* Vocabulary */}
        <section className="space-y-5">
          <h2 className="border-b pb-2 text-2xl">
            Key Networking Vocabulary
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
            These expressions help learners start professional conversations,
            discuss career goals, and respond naturally to another person's
            experiences.
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

        {/* Conversation preview */}
        <section className="space-y-5">
          <h2 className="border-b pb-2 text-2xl">
            Networking Conversation Preview
          </h2>

          <p>
            Anna decides to approach David after noticing that he is also
            standing alone at the event.
          </p>

          <div className="space-y-4 rounded-md border bg-card p-5">
            <div>
              <strong>Anna:</strong>
              <p className="mt-1 text-muted-foreground">
                Excuse me, hello.
              </p>
            </div>

            <div>
              <strong>David:</strong>
              <p className="mt-1 text-muted-foreground">Oh, hey.</p>
            </div>

            <div>
              <strong>Anna:</strong>
              <p className="mt-1 text-muted-foreground">
                Hi, my name is Anna. I promised myself I would talk to people
                here. Do you mind if I join you for a moment?
              </p>
            </div>

            <div>
              <strong>David:</strong>
              <p className="mt-1 text-muted-foreground">
                No, not at all. Please, have a seat. I promised myself the same
                thing. I just couldn't find it within me to actually do it.
              </p>
            </div>

            <div>
              <strong>Anna:</strong>
              <p className="mt-1 text-muted-foreground">
                Nice to meet you. So, what brings you to the event? What do you
                do?
              </p>
            </div>
          </div>

          <p className="text-sm text-muted-foreground">
            The full conversation continues with Anna and David discussing
            their current jobs, career goals, and experiences working for
            different types of companies.
          </p>
        </section>

        {/* Comprehension */}
        <section className="space-y-4">
          <h2 className="border-b pb-2 text-2xl">
            Networking Conversation Comprehension Questions
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
            Networking Discussion Questions
          </h2>

          <p>
            Use these questions to extend the topic into a longer conversation
            about professional relationships and career development.
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
            Open in Synomilo
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
            Open the complete conversation in Synomilo to read the full
            dialogue, explore highlighted expressions, save useful vocabulary,
            and practise professional English in context. Student audio
            requires a Plus account.
          </p>

          <Link href="/home/conversations/68ce638012a4e95d0cfe"
          target="blank">
            <Button className="mt-6 cursor-pointer bg-pink-500 text-background hover:bg-pink-500/85">
              Open the conversation
              <ArrowRight className="ml-2" size={17} />
            </Button>
          </Link>
        </section>

        {/* Language focus */}
        <section className="space-y-4">
          <h2 className="border-b pb-2 text-2xl">
            Language Focus: Starting a Networking Conversation
          </h2>

          <p>
            A successful networking conversation usually begins with a polite
            introduction followed by an open question.
          </p>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-md border bg-card p-5">
              <strong className="block">Less effective</strong>

              <p className="mt-3 text-muted-foreground">
                "Hi. What do you do?"
              </p>
            </div>

            <div className="rounded-md border bg-card p-5">
              <strong className="block">More natural</strong>

              <p className="mt-3 text-muted-foreground">
                "Hi, I'm Anna. Do you mind if I join you? What brings you to
                the event?"
              </p>
            </div>
          </div>

          <p>
            The second version sounds friendlier because it introduces the
            speaker, asks permission, and uses an open question that encourages
            a longer answer.
          </p>

          <div className="flex items-start gap-3 rounded-md border bg-card p-4">
            <Lightbulb
              className="mt-0.5 flex-shrink-0 text-yellow-500"
              size={20}
            />

            <div>
              <strong>Useful conversation structure</strong>

              <p className="mt-2 text-muted-foreground">
                Introduction · Open question · Follow-up question · Shared
                experience · Polite ending
              </p>
            </div>
          </div>
        </section>

        {/* Speaking activity */}
        <section className="space-y-4">
          <h2 className="border-b pb-2 text-2xl">
            Speaking Activity: Networking Role-Play
          </h2>

          <p>
            Put learners into pairs and ask them to imagine that they have met
            at a professional event. Each learner should create a simple
            professional identity.
          </p>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-md border bg-card p-5">
              <strong className="text-lg">Person A</strong>

              <ul className="mt-3 list-disc space-y-2 pl-5 text-muted-foreground">
                <li>You work in marketing.</li>
                <li>You want a more creative position.</li>
                <li>You currently work for a small company.</li>
                <li>You are hoping to meet potential employers.</li>
              </ul>
            </div>

            <div className="rounded-md border bg-card p-5">
              <strong className="text-lg">Person B</strong>

              <ul className="mt-3 list-disc space-y-2 pl-5 text-muted-foreground">
                <li>You work in IT support.</li>
                <li>You want to move into project management.</li>
                <li>You have worked at your company for three years.</li>
                <li>You want advice about changing careers.</li>
              </ul>
            </div>
          </div>

          <p>
            Learners should include each of the following tasks in their
            conversation:
          </p>

          <ol className="list-decimal space-y-3 pl-6">
            {networkingPrompts.map((prompt) => (
              <li key={prompt}>{prompt}</li>
            ))}
          </ol>

          <p>
            After the first role-play, learners should change partners and
            create a new identity.
          </p>
        </section>

        {/* Common mistakes */}
        <section className="space-y-4">
          <h2 className="border-b pb-2 text-2xl">
            Common Networking Mistakes
          </h2>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-md border bg-card p-4">
              <strong>Talking only about yourself</strong>

              <p className="mt-2 text-sm text-muted-foreground">
                Ask follow-up questions and show genuine interest in the other
                person's experience.
              </p>
            </div>

            <div className="rounded-md border bg-card p-4">
              <strong>Giving one-word answers</strong>

              <p className="mt-2 text-sm text-muted-foreground">
                Add a reason, example, or detail that gives the other person
                something to respond to.
              </p>
            </div>

            <div className="rounded-md border bg-card p-4">
              <strong>Making the conversation too formal</strong>

              <p className="mt-2 text-sm text-muted-foreground">
                Professional conversations can still be relaxed, warm, and
                conversational.
              </p>
            </div>

            <div className="rounded-md border bg-card p-4">
              <strong>Leaving abruptly</strong>

              <p className="mt-2 text-sm text-muted-foreground">
                Give a brief reason for leaving and end with a friendly phrase
                such as "It was great meeting you."
              </p>
            </div>
          </div>
        </section>

        {/* Homework */}
        <section className="space-y-4">
          <h2 className="border-b pb-2 text-2xl">Independent Practice</h2>

          <p>
            Ask learners to prepare a short professional introduction that
            could be used at a real networking event.
          </p>

          <ul className="list-disc space-y-2 pl-6">
            <li>Your name and current role</li>
            <li>What your company or industry does</li>
            <li>One thing you enjoy about your work</li>
            <li>One professional goal</li>
            <li>Three questions you could ask a new contact</li>
          </ul>

          <p>
            Learners can record their introduction and listen for pauses,
            unclear sentences, or sections that sound memorized. They should
            then record it again using only brief notes.
          </p>
        </section>

        {/* Tutor tip */}
        <section className="space-y-4">
          <h2 className="border-b pb-2 text-2xl">Tutor Tip</h2>

          <div className="flex items-start gap-3 rounded-md bg-muted p-5">
            <Lightbulb
              className="mt-0.5 flex-shrink-0 text-yellow-500"
              size={22}
            />

            <p>
              Some learners believe networking means trying to impress or sell
              themselves. Encourage them to focus on curiosity instead. Asking
              thoughtful questions, listening carefully, and finding shared
              interests usually creates a better professional connection than
              delivering a perfect sales pitch.
            </p>
          </div>
        </section>

        <footer className="border-t pt-8">
          <Link
            href="/guides"
            className="inline-flex items-center gap-2 text-muted-foreground transition hover:text-foreground"
          >
            <ArrowLeft size={16} />
            Back to all conversation guides
          </Link>
        </footer>
      </article>
    </div>
  );
}