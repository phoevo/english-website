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
    "B2 Remote Work ESL Lesson: Vocabulary and Discussion Questions | Synomilo",
  description:
    "A ready-to-use B2 remote work ESL lesson with vocabulary, comprehension questions, discussion prompts, speaking practice, and homework.",
  alternates: { canonical: "/guides/working-from-home-vs-the-office" },
  openGraph: {
    title: "B2 Remote Work ESL Lesson | Synomilo",
    description:
      "Teach remote work and office English with vocabulary, discussion questions, speaking practice, and homework for B2 learners.",
    url: "/guides/working-from-home-vs-the-office",
    type: "article",
  },
};

const keyVocabulary = [
  {
    term: "commute",
    meaning: "The regular journey between your home and workplace.",
  },
  {
    term: "productive",
    meaning: "Able to complete work efficiently and achieve good results.",
  },
  {
    term: "flexibility",
    meaning: "The ability to change where, when, or how you work.",
  },
  {
    term: "work-life balance",
    meaning: "A healthy balance between work and personal life.",
  },
  {
    term: "hybrid work",
    meaning:
      "A working arrangement that combines remote work and office work.",
  },
  {
    term: "office culture",
    meaning:
      "The shared habits, values, and social environment of a workplace.",
  },
];

const usefulExpressions = [
  {
    expression: "Fair point",
    meaning: "Used to acknowledge that someone has made a reasonable argument.",
  },
  {
    expression: "Out of the loop",
    meaning: "Not informed about what is happening.",
  },
  {
    expression: "On the same page",
    meaning: "Sharing the same understanding or opinion.",
  },
  {
    expression: "Bounce ideas off each other",
    meaning: "Discuss ideas together to develop or improve them.",
  },
  {
    expression: "I get where you're coming from",
    meaning: "Used to show that you understand another person's viewpoint.",
  },
  {
    expression: "The best of both worlds",
    meaning: "A situation that combines the advantages of two different options.",
  },
  {
    expression: "Find common ground",
    meaning: "Discover an opinion or position that both sides agree on.",
  },
];

const comprehensionQuestions = [
  "Why does Mark prefer working from home?",
  "Why does Sophie believe office work can be more productive?",
  "What problem does Sophie identify with remote communication?",
  "What distractions does Mark experience in the office?",
  "How has working from home improved Mark's work-life balance?",
  "What working arrangement do Sophie and Mark eventually agree on?",
];

const discussionQuestions = [
  "Would you rather work from home, in an office, or use a hybrid schedule? Why?",
  "Do you think people are more productive at home or in the office?",
  "What are the biggest advantages of avoiding a daily commute?",
  "Can remote workers become disconnected from their colleagues?",
  "How important is office culture to a successful company?",
  "Should employees be allowed to choose where they work?",
  "Which jobs are suitable for remote work, and which are not?",
  "Would you accept a lower salary in exchange for fully remote work?",
  "How can companies improve communication between remote employees?",
  "What would your ideal working week look like?",
];

type RelatedLesson = {
  title: string;
  href: string;
};

const relatedGuides: RelatedLesson[] = [
  {
    title: "Job Interview English: B2 ESL Lesson",
    href: "/guides/job-interview",
  },
  {
    title: "English Networking Event: B1 ESL Guide",
    href: "/guides/networking-event",
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

    <article className={`m-2 space-y-16 rounded-lg bg-background p-5 lg:w-2/3 h-screen overflow-y-auto ${geist.className}`}>
      <header className="space-y-5">
        <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
          <Link href="/guides" className="hover:text-foreground hover:underline">Guides</Link>
          <span className="px-2">/</span>
          <span>Remote Work ESL Lesson</span>
        </nav>

        <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
          <span className="rounded-full border bg-card px-3 py-1">B2</span>
          <span className="rounded-full border bg-card px-3 py-1">
            Business English
          </span>
          <span className="rounded-full border bg-card px-3 py-1">
            Speaking Lesson
          </span>
        </div>

        <h1 className="border-b pb-3 text-4xl leading-tight">
          Remote Work vs Office Work: B2 ESL Lesson
        </h1>

        <p className="max-w-3xl text-lg text-muted-foreground">
          A ready-to-use B2 Business English lesson about remote and office
          work, including vocabulary, comprehension questions, discussion
          prompts, polite disagreement practice, and homework.
        </p>
      </header>

      {/* Lesson introduction */}
      <section className="space-y-4">
        <h2 className="border-b pb-2 text-2xl">
          About This Remote Work Lesson
        </h2>

        <p>
          Remote and hybrid work are useful topics for adult ESL learners
          because they combine practical workplace vocabulary with opinion-based
          discussion. Students can draw on their own experience while practising
          how to agree, disagree, qualify an opinion, and respond politely.
        </p>

        <p>
          The full Synomilo conversation follows two colleagues with opposing
          views. One prefers the flexibility of working from home, while the
          other values collaboration and office culture. Their discussion
          gradually moves towards a compromise.
        </p>

        <div className="rounded-md border bg-card p-5">
          <strong className="block text-lg">Lesson focus</strong>

          <ul className="mt-3 space-y-2">
            <li className="flex items-start gap-2">
              <Check className="mt-0.5 text-green-500" size={18} />
              Discussing the advantages and disadvantages of remote work
            </li>
            <li className="flex items-start gap-2">
              <Check className="mt-0.5 text-green-500" size={18} />
              Expressing agreement and disagreement politely
            </li>
            <li className="flex items-start gap-2">
              <Check className="mt-0.5 text-green-500" size={18} />
              Using workplace idioms and conversational expressions
            </li>
            <li className="flex items-start gap-2">
              <Check className="mt-0.5 text-green-500" size={18} />
              Supporting opinions with reasons and examples
            </li>
          </ul>
        </div>
      </section>

      {/* Before reading */}
      <section className="space-y-4">
        <h2 className="border-b pb-2 text-2xl">
          Before the Conversation
        </h2>

        <p>
          Begin with a short warm-up. Ask students to choose one of the options
          below and explain their answer.
        </p>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-md border bg-card p-4">
            <strong className="border-b border-pink-500">Option A</strong>
            <p className="mt-2 text-sm text-muted-foreground">
              Work from home full-time
            </p>
          </div>

          <div className="rounded-md border bg-card p-4">
            <strong className="border-b border-blue-500">Option B</strong>
            <p className="mt-2 text-sm text-muted-foreground">
              Work in the office full-time
            </p>
          </div>

          <div className="rounded-md border bg-card p-4">
            <strong className="border-b border-yellow-500">Option C</strong>
            <p className="mt-2 text-sm text-muted-foreground">
              Follow a hybrid schedule
            </p>
          </div>
        </div>

        <p>
          Encourage students to give at least two reasons for their choice.
          Useful follow-up prompts include:
        </p>

        <ul className="list-disc space-y-2 pl-6">
          <li>How long is your ideal commute?</li>
          <li>Do you find it easy to concentrate at home?</li>
          <li>How important is face-to-face communication?</li>
        </ul>
      </section>

      {/* Vocabulary */}
      <section className="space-y-5">
        <h2 className="border-b pb-2 text-2xl">
          Key Remote Work Vocabulary
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
              <span className="text-muted-foreground">{item.meaning}</span>
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
          These expressions help students respond naturally during a
          disagreement without sounding too direct.
        </p>

        <div className="grid gap-4 md:grid-cols-2">
          {usefulExpressions.map((item) => (
            <div key={item.expression} className="rounded-md border bg-card p-4">
              <strong>{item.expression}</strong>
              <p className="mt-2 text-sm text-muted-foreground">
                {item.meaning}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Conversation preview */}
      <section className="space-y-4">
        <h2 className="border-b pb-2 text-2xl">Remote Work Conversation Preview</h2>
        <p>
          The full conversation follows two colleagues with different views on
          remote work. One values flexibility and avoiding the commute, while
          the other prefers face-to-face collaboration and office culture.
        </p>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-md border bg-card p-5">
            <strong>Working from home</strong>
            <p className="mt-2 text-sm text-muted-foreground">Flexibility, fewer interruptions, no commute, and improved work-life balance.</p>
          </div>
          <div className="rounded-md border bg-card p-5">
            <strong>Working in the office</strong>
            <p className="mt-2 text-sm text-muted-foreground">Faster communication, easier collaboration, stronger team relationships, and a clearer work routine.</p>
          </div>
        </div>
      </section>

      {/* Comprehension */}
      <section className="space-y-4">
        <h2 className="border-b pb-2 text-2xl">
          Comprehension Questions
        </h2>

        <p>
          Ask students to answer these questions after reading or listening to
          the conversation.
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
          Remote Work Discussion Questions
        </h2>

        <p>
          Use these questions to move from comprehension into a longer
          opinion-based discussion.
        </p>

        <ol className="list-decimal space-y-3 pl-6">
          {discussionQuestions.map((question) => (
            <li key={question}>{question}</li>
          ))}
        </ol>
      </section>


      {/* CTA to app */}
      <section className="rounded-md bg-accent p-8 text-center">
        <BookOpen className="mx-auto mb-4" size={30} />

        <h2 className="text-2xl font-semibold">
          Open in Synomilo
        </h2>

        <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
          Read the full dialogue, highlight useful vocabulary, and save
          expressions to a personal dictionary. Reading tools are free;
          student audio requires a Plus account.
        </p>

        <Link href="/home/conversations/6a1c68581f9bbab1c1d9"
          target="blank">
          <Button
            className="mt-6 cursor-pointer bg-pink-500 text-background hover:bg-pink-500/85"
          >
            Open the conversation
            <ArrowRight className="ml-2" size={17} />
          </Button>
        </Link>
      </section>


      {/* Language task */}
      <section className="space-y-4">
        <h2 className="border-b pb-2 text-2xl">
          Language Focus: Polite Disagreement
        </h2>

        <p>
          Ask students to respond to each statement without using the word
          "no."
        </p>

        <ul className="list-disc space-y-3 pl-6">
          <li>Everyone is more productive in the office.</li>
          <li>Remote workers do less work.</li>
          <li>Video calls are as effective as face-to-face meetings.</li>
          <li>Companies should completely remove their offices.</li>
        </ul>

        <div className="flex items-start gap-3 rounded-md border bg-card p-4">
          <Lightbulb
            className="mt-0.5 flex-shrink-0 text-yellow-500"
            size={20}
          />

          <div>
            <strong>Useful sentence starters</strong>
            <p className="mt-2 text-muted-foreground">
              "I see your point, but..." · "That may be true in some cases,
              however..." · "I get where you're coming from, although..."
            </p>
          </div>
        </div>
      </section>

      {/* Homework */}
      <section className="space-y-4">
        <h2 className="border-b pb-2 text-2xl">Homework Idea</h2>

        <p>
          Ask the student to interview someone who has experience with remote or
          hybrid work. They should ask:
        </p>

        <ul className="list-disc space-y-2 pl-6">
          <li>What do you like most about your working arrangement?</li>
          <li>What is the biggest disadvantage?</li>
          <li>How does it affect your productivity?</li>
          <li>Would you change your current schedule?</li>
        </ul>

        <p>
          In the next lesson, the student can summarise the interview and
          compare the interviewee's opinion with their own.
        </p>
      </section>

      {/* Teaching tip */}
      <section className="space-y-4">
        <h2 className="border-b pb-2 text-2xl">Teaching Tip</h2>

        <div className="flex items-start gap-3 rounded-md bg-muted p-5">
          <Lightbulb
            className="mt-0.5 flex-shrink-0 text-yellow-500"
            size={22}
          />

          <p>
            Do not let students stop after stating an opinion. Ask them to give
            a reason, an example, and a possible counterargument. This turns
            short answers into more natural B2-level discussion.
          </p>
        </div>
      </section>


      <footer className="border-t pt-8">
        <Link href="/guides" className="inline-flex items-center gap-2 font-medium text-pink-500 hover:underline">
          <ArrowLeft size={16} />
          Back to all Synomilo articles
        </Link>
      </footer>
    </article>
    </div>
  );

}
