import { ArrowLeft, ArrowRight, BookOpen } from "lucide-react";
import Link from "next/link";
import { Geist } from "next/font/google";

const geist = Geist({ subsets: ["latin"] });

/* eslint react/no-unescaped-entities: 0 */

export const metadata = {
  title:
    "Self-Correction: The Tutor Skill Nobody Teaches | Synomilo",
  description:
    "Discover why prompting learners to notice and fix their own errors can outperform traditional corrective feedback in one-to-one ESL conversation lessons.",
  alternates: {
    canonical: "/guides/self-correction",
  },
  openGraph: {
    title: "Self-Correction: The Tutor Skill Nobody Teaches",
    description:
      "Discover why prompting learners to notice and fix their own errors can outperform traditional corrective feedback in one-to-one ESL conversation lessons.",
    url: "/guides/self-correction",
    type: "article",
  },
};

const guideSections = [
  {
    title: "The Correction That Never Leaves Your Mouth",
    href: "#the-correction-that-never-leaves-your-mouth",
  },
  {
    title: "The Feedback Obsession (And Why It's Incomplete)",
    href: "#the-feedback-obsession-and-why-its-incomplete",
  },
  {
    title: "Self-Correction Is the Underused Lever in One-to-One Lessons",
    href: "#self-correction-is-the-underused-lever-in-one-to-one-lessons",
  },
  {
    title: "Why Self-Correction Changes the Game",
    href: "#why-self-correction-changes-the-game",
  },
  {
    title: "What Changes If We Take Self-Correction Seriously",
    href: "#what-changes-if-we-take-self-correction-seriously",
  },
  {
    title: "A New Way to Think About Feedback",
    href: "#a-new-way-to-think-about-feedback",
  },
  {
    title: "The Habit That Outlasts the Lesson",
    href: "#the-habit-that-outlasts-the-lesson",
  },
  {
    title: "Frequently Asked Questions",
    href: "#frequently-asked-questions",
  },
  {
    title: "Sources",
    href: "#sources",
  },
];

const sourceLinks = [
  {
    title: "2024 ESL study on self-correction",
    href: "https://ijsra.net/sites/default/files/fulltext_pdf/IJSRA-2024-2140.pdf",
  },
  {
    title: "2024 conference study on foreign-language learners",
    href: "https://www.shs-conferences.org/articles/shsconf/pdf/2024/26/shsconf_erpa2024_01001.pdf",
  },
  {
    title: "Synomilo Directions guide",
    href: "https://synomilo.com/guides/directions",
  },
  {
    title: "Synomilo",
    href: "https://www.synomilo.com/",
  },
  {
    title: "Synomilo CEFR discussion prompts",
    href: "https://synomilo.com/guides/cefr-discussion-prompts",
  },
];

export default function PostPage() {
  return (
    <div className={`flex flex-col lg:flex-row ${geist.className}`}>
      {/* Sidebar */}
      <aside
        className={`p-5 pt-20 hidden lg:block lg:sticky lg:top-20 lg:w-xs ${geist.className}`}
      >
        <section className="space-y-6">
          <Link
            href="/guides"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition hover:text-foreground"
          >
            <ArrowLeft size={16} />
            Back to all articles
          </Link>

          <div>
            <h2 className="border-b pb-2 text-2xl">
              On this guide
            </h2>

            <nav className="mt-4 flex flex-col gap-2">
              {guideSections.map((section) => (
                <a
                  key={section.href}
                  href={section.href}
                  className="text-sm text-muted-foreground transition hover:text-foreground hover:underline"
                >
                  {section.title}
                </a>
              ))}
            </nav>
          </div>

          <div>
            <h2 className="border-b pb-2 text-2xl">
              Related ESL Guides
            </h2>

            <div className="mt-4 flex flex-col gap-2">
              <Link
                href="/guides/directions"
                className="group rounded-md border bg-card p-3 transition hover:shadow-sm"
              >
                <strong className="font-semibold group-hover:underline">
                  Directions
                </strong>

                <span className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
                  Open guide
                  <ArrowRight size={14} />
                </span>
              </Link>

              <Link
                href="/guides/cefr-discussion-prompts"
                className="group rounded-md border bg-card p-3 transition hover:shadow-sm"
              >
                <strong className="font-semibold group-hover:underline">
                  CEFR Discussion Prompts
                </strong>

                <span className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
                  Open guide
                  <ArrowRight size={14} />
                </span>
              </Link>
            </div>
          </div>
        </section>
      </aside>

      {/* Article */}
      <article
        className={`m-2 space-y-16 h-screen overflow-y-auto rounded-lg bg-background p-5 lg:w-2/3 ${geist.className}`}
      >
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

            <span>Self-Correction</span>
          </nav>

          <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
            <span className="rounded-full border bg-card px-3 py-1">
              ESL Teaching
            </span>

            <span className="rounded-full border bg-card px-3 py-1">
              Corrective Feedback
            </span>

            <span className="rounded-full border bg-card px-3 py-1">
              Conversation Lessons
            </span>
          </div>

          <h1 className="border-b pb-3 text-5xl leading-tight">
            Self-Correction: The Tutor Skill Nobody Teaches
          </h1>

          <p className="max-w-3xl text-lg text-muted-foreground">
            Why the most powerful correction in a conversation lesson is the
            one you never actually say out loud
          </p>

          <p className="max-w-3xl text-muted-foreground">
            Discover why prompting learners to notice and fix their own errors
            outperforms traditional corrective feedback in one-to-one lessons.
            This piece reframes self-correction as a core tutoring skill rather
            than a happy accident.
          </p>
        </header>

        {/* TL;DR */}
        <section className="space-y-5">
          <h2 className="border-b pb-2 text-2xl">
            TL;DR
          </h2>

          <ul className="list-disc space-y-3 pl-6">
            <li>
              <strong>Self-correction outperforms tutor correction</strong> -
              Learners who practice self-correction reduced errors by ~30% in
              one study, and most learners can find their own errors when given
              the chance.
            </li>

            <li>
              <strong>Beginners and intermediates need different prompting</strong>{" "}
              - Build awareness for beginners through gentle echoes and pauses;
              activate existing knowledge for intermediates with prompts such as
              "Are you sure about that tense?"
            </li>

            <li>
              <strong>One-to-one lessons are the ideal environment</strong> -
              Private conversation lessons give tutors the space to pause,
              prompt, and let the learner reach for their own correction.
            </li>

            <li>
              <strong>Correction is not something you give</strong> - It's
              something you help learners find. The tutor's primary skill is
              knowing when to withhold correction, not just how to deliver it.
            </li>
          </ul>
        </section>

        {/* The Correction That Never Leaves Your Mouth */}
        <section
          id="the-correction-that-never-leaves-your-mouth"
          className="scroll-mt-24 space-y-4"
        >
          <h2 className="border-b pb-2 text-2xl">
            The Correction That Never Leaves Your Mouth
          </h2>

          <p>
            There's a moment every tutor knows. Your learner says something
            wrong, and you can feel the correction forming on your tongue. But
            then something unexpected happens: they pause, frown slightly, and
            fix it themselves. That tiny, unremarkable moment? It's doing more
            for <strong>language acquisition</strong> than almost anything you
            could have said instead.
          </p>

          <p>
            Most feedback advice for ESL tutors focuses on what <em>you</em>{" "}
            should say, when you should say it, and how to say it gently. Almost
            none of it talks about the correction that matters most: the one
            the learner gives themselves.
          </p>
        </section>

        {/* Feedback Obsession */}
        <section
          id="the-feedback-obsession-and-why-its-incomplete"
          className="scroll-mt-24 space-y-4"
        >
          <h2 className="border-b pb-2 text-2xl">
            The Feedback Obsession (And Why It's Incomplete)
          </h2>

          <p>
            The dominant conversation around corrective feedback in ESL is
            tutor-centric. Should you recast? Use metalinguistic feedback?
            Correct immediately or wait until the end? The literature is
            stacked with taxonomies, from Corder's classic mistakes-versus-
            errors distinction to detailed comparisons of explicit correction
            versus implicit recasts.
          </p>

          <p>
            And to be fair, this work matters. Understanding when to intervene
            and how to do it without crushing a learner's confidence is a real
            skill. But here's the gap: nearly all of this advice was designed
            for classrooms, not one-to-one conversation lessons. It assumes a
            teacher addressing a group, managing airtime, and making split-
            second decisions about which errors to flag publicly.
          </p>

          <p>
            For independent tutors running dialogue-based sessions with adults,
            the calculus is different. You have something classrooms rarely
            offer: the space and intimacy to build a habit, not just deliver a
            correction.
          </p>
        </section>

        {/* Self-Correction Lever */}
        <section
          id="self-correction-is-the-underused-lever-in-one-to-one-lessons"
          className="scroll-mt-24 space-y-4"
        >
          <h2 className="border-b pb-2 text-2xl">
            Self-Correction Is the Underused Lever in One-to-One Lessons
          </h2>

          <p>
            Here's what we actually believe:{" "}
            <strong>
              the most useful correction in a conversation lesson is often the
              one the learner gives themselves, and tutors who build that habit
              are doing something most feedback advice never mentions.
            </strong>
          </p>

          <p>
            Self-correction isn't a classroom technique to be scaled. It's a
            conversational instinct to be cultivated, and one-to-one lessons
            are the ideal environment to do it.
          </p>
        </section>

        {/* Why Self-Correction */}
        <section
          id="why-self-correction-changes-the-game"
          className="scroll-mt-24 space-y-5"
        >
          <h2 className="border-b pb-2 text-2xl">
            Why Self-Correction Changes the Game for Language Learning
            Strategies
          </h2>

          <h3 className="text-xl font-semibold">
            The evidence is stronger than you'd expect
          </h3>

          <p>
            In{" "}
            <a
              href="https://ijsra.net/sites/default/files/fulltext_pdf/IJSRA-2024-2140.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink-500 hover:underline"
            >
              a 2024 ESL study
            </a>
            , learners who regularly practiced self-correction reduced
            grammatical errors by approximately 30% over a semester. That's
            not a marginal improvement. That's a structural shift in how those
            learners processed their own output.
          </p>

          <p>
            And it's not that learners can't do it. A{" "}
            <a
              href="https://www.shs-conferences.org/articles/shsconf/pdf/2024/26/shsconf_erpa2024_01001.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink-500 hover:underline"
            >
              2024 conference study on foreign-language learners
            </a>{" "}
            found that only 12% failed to find all errors by themselves when
            given the chance. The vast majority could identify and correct
            their own mistakes. They just needed the space to try.
          </p>

          <h3 className="text-xl font-semibold">
            What applied linguistics tells us about noticing
          </h3>

          <p>
            John Hellermann, an applied linguist who studied adult English
            learners over 18 months, argues that self-initiated self-repair
            reveals how language learning is actually emerging in real
            interaction. When a learner catches and reformulates their own
            error, they're showing you what they can already notice. That's
            diagnostic gold.
          </p>

          <p>
            Think about what that means in practice. When your beginner learner
            says "I go yesterday" and then pauses and says "I... went
            yesterday," they haven't just corrected a verb tense. They've
            demonstrated that the past simple is moving from passive knowledge
            into active production. You didn't need to say a word.
          </p>

          <h3 className="text-xl font-semibold">
            But beginners and intermediates need different prompts
          </h3>

          <p>
            This is where choosing what to correct gets interesting, and where
            most advice falls short.
          </p>

          <p>
            With beginners, the window for self-correction is narrow. They often
            don't have enough internal grammar to notice what's wrong. So the
            tutor's role isn't to demand self-correction. It's to create the
            conditions for noticing. A raised eyebrow. A gentle echo of the
            incorrect phrase with a questioning tone. A pause that says, "Take
            another look at that."
          </p>

          <p>
            With intermediates, the game shifts. They usually <em>know</em> the
            rule. They just aren't monitoring for it in the flow of conversation.
            Here, the tutor's job is to slow the moment down. Not to correct,
            but to signal: "You have the tools. Use them." A simple "Are you
            sure about that tense?" can be more powerful than any recast.
          </p>

          <p>
            The key insight: for beginners, you're building awareness. For
            intermediates, you're building the <em>habit</em> of deploying
            awareness in real time. Both require you to hold back your
            correction long enough for the learner to reach for their own.
          </p>

          <h3 className="text-xl font-semibold">
            How this fits into dialogue-based practice
          </h3>

          <p>
            Self-correction works best when it happens inside a real
            conversational flow, not during a grammar drill. When a learner is
            practicing a scenario (ordering food, navigating a networking
            event,{" "}
            <a
              href="https://synomilo.com/guides/directions"
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink-500 hover:underline"
            >
              asking for directions
            </a>
            ), they're cognitively engaged in meaning-making. Errors that
            surface here are the ones worth noticing, because they're the errors
            that will show up in real life.
          </p>

          <p>
            This is one reason platforms like{" "}
            <a
              href="https://www.synomilo.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink-500 hover:underline"
            >
              Synomilo
            </a>{" "}
            focus on native-written dialogues built around real-world scenarios.
            When tutors use conversation material grounded in authentic speech
            patterns, learners get practice that mirrors actual communication,
            which makes self-correction more transferable. The repair a learner
            makes during a simulated job interview sticks differently than one
            made during a fill-in-the-blank exercise.
          </p>

          <p>
            When you're designing{" "}
            <a
              href="https://synomilo.com/guides/cefr-discussion-prompts"
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink-500 hover:underline"
            >
              discussion prompts calibrated to CEFR levels
            </a>
            , you can deliberately choose scenarios that push learners into
            their error zones. An A2 learner describing their daily routine
            will naturally produce present simple errors. A B1 learner
            recounting a past experience will stumble on irregular past tenses.
            The scenario itself becomes the correction prompt.
          </p>
        </section>

        {/* What Changes */}
        <section
          id="what-changes-if-we-take-self-correction-seriously"
          className="scroll-mt-24 space-y-4"
        >
          <h2 className="border-b pb-2 text-2xl">
            What Changes If We Take Self-Correction Seriously
          </h2>

          <p>
            If this thesis is right, then the tutor's primary skill isn't
            delivering corrections well. It's knowing when to withhold them.
            That's a fundamentally different orientation.
          </p>

          <p>
            It means your lesson planning shifts. Instead of preparing a list
            of errors to watch for, you're preparing moments of productive
            friction: conversation tasks calibrated just above the learner's
            comfort zone, where mistakes are likely and self-repair is possible.
          </p>

          <p>
            It also means your feedback timing changes. Immediate correction
            makes sense for errors a beginner can't possibly self-diagnose
            (pronunciation patterns they've never heard modeled, vocabulary
            they simply don't have). But for grammar the learner has studied?
            Delayed feedback, or better yet, a prompt to self-correct, respects
            their capacity and builds autonomy.
          </p>

          <p>
            The cost of ignoring this is subtle but real. Tutors who correct
            everything become a crutch. The learner performs well in lessons but
            freezes in real conversations, because they've never practiced
            catching their own mistakes without someone there to catch them
            first.
          </p>
        </section>

        {/* New Way */}
        <section
          id="a-new-way-to-think-about-feedback"
          className="scroll-mt-24 space-y-4"
        >
          <h2 className="border-b pb-2 text-2xl">
            A New Way to Think About Feedback
          </h2>

          <p>
            Here's a reframe worth sitting with:{" "}
            <strong>
              correction is not something you give a learner. It's something
              you help them find in themselves.
            </strong>
          </p>

          <p>
            Think of it less like quality control and more like coaching a
            reflex. A tennis coach doesn't hit the ball for you. They set up
            drills that force you to notice your own footwork. The best ESL
            tutors do the same thing with language: they design moments where
            the learner's own internal monitor kicks in.
          </p>

          <p>
            This doesn't mean you never correct. It means you treat your
            correction as the backup system, not the primary one. The primary
            system is the learner's growing ability to hear their own output,
            compare it to the target, and adjust. Every time you jump in too
            fast, you short-circuit that process.
          </p>
        </section>

        {/* Habit */}
        <section
          id="the-habit-that-outlasts-the-lesson"
          className="scroll-mt-24 space-y-4"
        >
          <h2 className="border-b pb-2 text-2xl">
            The Habit That Outlasts the Lesson
          </h2>

          <p>
            We don't think self-correction is a technique. We think it's the
            most important language learning strategy a tutor can cultivate,
            and one-to-one conversation lessons are the best place on earth to
            do it.
          </p>

          <p>
            The learner who leaves your session having corrected themselves
            three times will carry that instinct into every conversation they
            have this week. The learner who leaves having been corrected three
            times will carry... the memory that they got things wrong.
          </p>

          <p>
            Which habit do you want to build?
          </p>
        </section>

        {/* FAQ */}
        <section
          id="frequently-asked-questions"
          className="scroll-mt-24 space-y-5"
        >
          <h2 className="border-b pb-2 text-2xl">
            Frequently Asked Questions
          </h2>

          <div className="space-y-5">
            <div>
              <h3 className="text-lg font-semibold">
                Why is self-correction preferred over teacher correction in
                ESL?
              </h3>

              <p className="mt-2 text-muted-foreground">
                Self-correction builds a learner's internal monitoring system,
                which they carry into real conversations outside the lesson.
                Teacher correction fixes the immediate error but doesn't train
                the learner to notice and repair on their own.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold">
                How can tutors balance fluency and accuracy during ESL
                conversations?
              </h3>

              <p className="mt-2 text-muted-foreground">
                Focus on fluency during the conversation flow and address
                accuracy through self-correction prompts at natural pause
                points. For errors the learner can plausibly catch themselves, a
                brief signal (a pause, an echo, a question) is more effective
                than an interruption.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold">
                Which error correction methods are best for beginners in ESL?
              </h3>

              <p className="mt-2 text-muted-foreground">
                Beginners benefit from gentle noticing prompts (echoing,
                questioning tone) for grammar they've been exposed to, and
                explicit correction for vocabulary or pronunciation patterns
                they haven't encountered yet. The goal is to build awareness
                gradually, not demand self-repair before they have the knowledge
                to attempt it.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="rounded-md bg-accent p-8 text-center">
          <BookOpen className="mx-auto mb-4" size={30} />

          <h2 className="text-2xl font-semibold">
            Ready-to-use English conversation practice
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
            Give your students real-world speaking practice that creates space
            for meaningful self-correction.
          </p>

          <Link href="/">
            <button className="mt-6 inline-flex cursor-pointer items-center rounded-md bg-pink-500 px-4 py-2 font-medium text-background transition hover:bg-pink-500/85">
              Try Synomilo for free
              <ArrowRight className="ml-2" size={17} />
            </button>
          </Link>
        </section>

        {/* Sources */}
        <section
          id="sources"
          className="scroll-mt-24 space-y-4"
        >
          <h2 className="border-b pb-2 text-2xl">
            Sources
          </h2>

          <ol className="list-decimal space-y-3 pl-6">
            {sourceLinks.map((source) => (
              <li key={source.href}>
                <a
                  href={source.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-pink-500 hover:underline"
                >
                  {source.title}
                </a>
              </li>
            ))}
          </ol>
        </section>

        <footer className="border-t pt-8">
          <Link
            href="/guides"
            className="inline-flex items-center gap-2 font-medium text-pink-500 hover:underline"
          >
            <ArrowLeft size={16} />
            Back to all Synomilo articles
          </Link>
        </footer>
      </article>
    </div>
  );
}