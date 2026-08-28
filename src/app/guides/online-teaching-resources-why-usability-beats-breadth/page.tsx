import { ArrowLeft, ArrowRight, BookOpen } from "lucide-react";
import Link from "next/link";
import { Geist } from "next/font/google";

const geist = Geist({ subsets: ["latin"] });

/* eslint react/no-unescaped-entities: 0 */

export const metadata = {
  title:
    "Online Teaching Resources: Why Usability Beats Breadth | Synomilo",
  description:
    "Learn why independent online tutors waste time on sprawling resource libraries and what makes a digital lesson genuinely ready to use.",
  alternates: {
    canonical: "/blog/online-teaching-resources-usability",
  },
  openGraph: {
    title: "Online Teaching Resources: Why Usability Beats Breadth",
    description:
      "Learn why independent online tutors waste time on sprawling resource libraries and what makes a digital lesson genuinely ready to use.",
    url: "/blog/online-teaching-resources-usability",
    type: "article",
  },
};

const guideSections = [
  {
    title: "The Lesson That Ran Itself",
    href: "#the-lesson-that-ran-itself",
  },
  {
    title: 'Why "Comprehensive" Became the Gold Standard',
    href: "#why-comprehensive-became-the-gold-standard",
  },
  {
    title: "The Five-Minute Test Most Resources Fail",
    href: "#the-five-minute-test-most-resources-fail",
  },
  {
    title: 'What "Ready to Use" Actually Looks Like',
    href: "#what-ready-to-use-actually-looks-like",
  },
  {
    title: "If Usability Is the Real Metric",
    href: "#if-usability-is-the-real-metric",
  },
  {
    title: 'Rethinking What "Quality" Means',
    href: "#rethinking-what-quality-means",
  },
  {
    title: "The Lesson That Doesn't Need You to Carry It",
    href: "#the-lesson-that-doesnt-need-you-to-carry-it",
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
    title: "Studies on classroom time loss",
    href: "https://www.effectiveteaching.com/userfiles/kcfinder/files/37_First_Five.pdf",
  },
  {
    title: "Research on student handouts",
    href: "https://pmc.ncbi.nlm.nih.gov/articles/PMC3349410/",
  },
  {
    title: "Synomilo",
    href: "https://www.synomilo.com/",
  },
  {
    title: "Research on short-format learning",
    href: "https://www.linkedin.com/pulse/statistics-five-minutes-murtaza-haider",
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
                href="/guides/networking-event"
                className="group rounded-md border bg-card p-3 transition hover:shadow-sm"
              >
                <strong className="font-semibold group-hover:underline">
                  Networking Event
                </strong>

                <span className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
                  Open guide
                  <ArrowRight size={14} />
                </span>
              </Link>

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
              href="/blog"
              className="hover:text-foreground hover:underline"
            >
              Blog
            </Link>

            <span className="px-2">/</span>

            <span>Online Teaching Resources</span>
          </nav>

          <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
            <span className="rounded-full border bg-card px-3 py-1">
              Online Teaching
            </span>

            <span className="rounded-full border bg-card px-3 py-1">
              ESL Resources
            </span>

            <span className="rounded-full border bg-card px-3 py-1">
              Lesson Planning
            </span>
          </div>

          <h1 className="border-b pb-3 text-5xl leading-tight">
            Online Teaching Resources: Why Usability Beats Breadth
          </h1>

          <p className="max-w-3xl text-lg text-muted-foreground">
            The best digital lesson material isn't the most comprehensive—it's
            the one ready to use in five minutes
          </p>

          <p className="max-w-3xl text-muted-foreground">
            Learn why independent online tutors waste time on sprawling
            resource libraries and what makes a digital lesson genuinely ready
            to use. This piece reframes resource quality around immediate
            classroom usability, not content volume.
          </p>
        </header>

        {/* TL;DR */}
        <section className="space-y-5">
          <h2 className="border-b pb-2 text-2xl">
            TL;DR
          </h2>

          <ul className="list-disc space-y-3 pl-6">
            <li>
              <strong>The five-minute test</strong> - The best online teaching
              resources aren't the most comprehensive; they're the ones your
              student can pick up and start using within the first five minutes
              of a session.
            </li>

            <li>
              <strong>Scenario beats topic</strong> - Materials built around
              real-life situations (ordering food, networking) drive more
              confident speaking than generic vocabulary or grammar-based
              lessons, especially for beginner-to-intermediate adults.
            </li>

            <li>
              <strong>Format is function</strong> - Student handouts that need
              verbal explanation to make sense aren't ready-to-use. Design for
              the student's eyes, not just the teacher's notes.
            </li>

            <li>
              <strong>Quality means what it eliminates</strong> - Judge a
              resource not by how much it contains, but by how much setup,
              adaptation, and explanation it removes from your session.
            </li>
          </ul>
        </section>

        {/* The Lesson That Ran Itself */}
        <section
          id="the-lesson-that-ran-itself"
          className="scroll-mt-24 space-y-4"
        >
          <h2 className="border-b pb-2 text-2xl">
            The Lesson That Ran Itself
          </h2>

          <p>
            Every tutor knows the feeling. You've spent forty minutes hunting
            for online teaching resources, opening tabs, skimming PDFs,
            tweaking a worksheet to fit your student's level. Then the session
            starts, and that carefully curated material lasts about twelve
            minutes before the conversation stalls. The prep-to-payoff ratio is
            broken, and it has been for a while.
          </p>

          <p>
            The problem isn't that good materials don't exist. It's that most
            of them aren't actually ready to use when you need them.
          </p>
        </section>

        {/* Why Comprehensive */}
        <section
          id="why-comprehensive-became-the-gold-standard"
          className="scroll-mt-24 space-y-4"
        >
          <h2 className="border-b pb-2 text-2xl">
            Why "Comprehensive" Became the Gold Standard
          </h2>

          <p>
            Somewhere along the way, the ESL world decided that the best online
            teaching resources were the biggest ones. Massive activity banks.
            Sprawling lesson plan libraries. PDFs with six pages of teacher
            notes before you even reach the student-facing material.
          </p>

          <p>
            It made sense for a time. Tutors working in academies had planning
            periods. Classroom teachers could spend Sunday afternoon building a
            week's lessons. The assumption was: more options equals more
            flexibility. And flexibility was supposed to mean quality.
          </p>

          <p>
            But independent online tutors don't work that way. You're teaching
            back-to-back sessions across time zones, often with students at
            different levels. You don't need a buffet. You need something that
            works the moment you open it.
          </p>
        </section>

        {/* Five Minute Test */}
        <section
          id="the-five-minute-test-most-resources-fail"
          className="scroll-mt-24 space-y-4"
        >
          <h2 className="border-b pb-2 text-2xl">
            The Five-Minute Test Most Resources Fail
          </h2>

          <p>
            Here's what we actually believe: the best teaching resource isn't
            the most comprehensive one. It's the one your student can pick up
            and start using in the first five minutes.
          </p>

          <p>
            That's the bar. Not "how many activities does it include" or "how
            many levels does it cover." Can a tutor open this material, share it
            with a student, and have a real conversation happening within five
            minutes? If the answer is no, the resource is creating work, not
            saving it.
          </p>
        </section>

        {/* Ready to Use */}
        <section
          id="what-ready-to-use-actually-looks-like"
          className="scroll-mt-24 space-y-5"
        >
          <h2 className="border-b pb-2 text-2xl">
            What "Ready to Use" Actually Looks Like in a Live Session
          </h2>

          <p>
            Research on classroom time loss tells a clear story.{" "}
            <a
              href="https://www.effectiveteaching.com/userfiles/kcfinder/files/37_First_Five.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink-500 hover:underline"
            >
              Studies have found
            </a>{" "}
            that three to seventeen minutes can be wasted at the beginning of
            each class period, amounting to up to 32% of total class time. For a
            45-minute tutoring session, that's potentially fifteen minutes gone
            before any real speaking practice begins.
          </p>

          <p>
            The culprit isn't lazy teaching. It's friction. The tutor needs to
            explain the activity. The student needs to read the instructions.
            The warm-up discussion prompts don't quite match the student's
            life. The controlled practice exercises assume vocabulary the
            student hasn't encountered yet. So the tutor adapts on the fly, and
            suddenly they're doing the prep they were supposed to avoid.
          </p>

          <h3 className="text-xl font-semibold">
            The e-lesson format problem nobody talks about
          </h3>

          <p>
            Format matters more than most resource creators admit.{" "}
            <a
              href="https://pmc.ncbi.nlm.nih.gov/articles/PMC3349410/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink-500 hover:underline"
            >
              Research on student handouts
            </a>{" "}
            found that while over 90% of students considered handouts useful,
            68% were dissatisfied with how they were presented. Nearly half
            said the text was too sparse to be helpful on its own. The materials
            were technically "good" but practically frustrating.
          </p>

          <p>
            This maps directly to what tutors experience with digital lesson
            materials. A beautiful PDF that requires five minutes of verbal
            setup isn't a ready-to-use resource. It's a half-finished one.
          </p>

          <p>
            What actually works in a live one-to-one session is something
            narrower and more specific: a concrete scenario the student
            recognizes from their own life (networking at a conference, making
            small talk with a colleague, ordering at a restaurant), paired
            with language they can immediately try using. Not a topic. A
            situation.
          </p>

          <h3 className="text-xl font-semibold">
            Why scenario-based beats topic-based
          </h3>

          <p>
            There's a meaningful difference between a lesson about "food
            vocabulary" and a lesson where your student practices ordering
            lunch at a café. The first is a category. The second is a moment
            your student will actually face.
          </p>

          <p>
            Beginner-to-intermediate adult learners don't lack vocabulary
            lists. They lack confidence in specific real-life speaking
            situations. The gap isn't knowledge. It's rehearsal. And rehearsal
            requires materials built around authentic speech patterns, not
            textbook dialogues that no one actually says out loud.
          </p>

          <p>
            This is where platforms like{" "}
            <a
              href="https://www.synomilo.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink-500 hover:underline"
            >
              Synomilo
            </a>{" "}
            have carved out a useful niche. Their conversation materials are
            built around real-world scenarios with native-written dialogues,
            which means a tutor can pull up a networking scenario or a social
            interaction and have the student speaking within minutes, not after
            a lengthy setup phase.
          </p>

          <p>
            The principle applies beyond any single platform, though. When
            evaluating any resource, the question isn't "is this thorough?" It's
            "can my student do something with this immediately?"
          </p>
        </section>

        {/* Usability */}
        <section
          id="if-usability-is-the-real-metric"
          className="scroll-mt-24 space-y-4"
        >
          <h2 className="border-b pb-2 text-2xl">
            If Usability Is the Real Metric, Everything Changes
          </h2>

          <p>
            If we're right that immediate usability matters more than
            comprehensiveness, a few things follow.
          </p>

          <p>
            First, the e-lesson format needs to be designed for the student's
            eyes, not just the teacher's. Student handouts that require verbal
            explanation to make sense aren't handouts. They're teacher notes
            with a different label.
          </p>

          <p>
            Second, tutors should stop feeling guilty about short prep times. A
            five-minute prep that leads to forty minutes of genuine conversation
            is better teaching than a forty-minute prep that leads to a stiff,
            over-structured session.{" "}
            <a
              href="https://www.linkedin.com/pulse/statistics-five-minutes-murtaza-haider"
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink-500 hover:underline"
            >
              Research on short-format learning
            </a>{" "}
            consistently shows that small, immediately usable doses lower the
            barrier to entry for both teachers and learners.
          </p>

          <p>
            Third, the real cost of bad resources isn't wasted money. It's
            wasted energy. Every minute a tutor spends adapting a "ready-made"
            lesson is a minute they could have spent listening to their student,
            asking better follow-up questions, or simply being present in the
            conversation.
          </p>
        </section>

        {/* Quality */}
        <section
          id="rethinking-what-quality-means"
          className="scroll-mt-24 space-y-4"
        >
          <h2 className="border-b pb-2 text-2xl">
            Rethinking What "Quality" Means for Online Teaching Resources
          </h2>

          <p>
            We'd suggest a simple reframe. Stop evaluating resources by what
            they contain. Start evaluating them by what they eliminate.
          </p>

          <p>
            A great resource eliminates the need to explain the activity. It
            eliminates the awkward silence while the student reads dense
            instructions. It eliminates the tutor's mental overhead of adapting
            generic content to a specific person. It eliminates the gap between
            opening the material and having a real conversation.
          </p>

          <p>
            Quality isn't depth. Quality is the speed at which a resource
            disappears into the background and the conversation takes over.
          </p>
        </section>

        {/* Lesson Doesn't Need You */}
        <section
          id="the-lesson-that-doesnt-need-you-to-carry-it"
          className="scroll-mt-24 space-y-4"
        >
          <h2 className="border-b pb-2 text-2xl">
            The Lesson That Doesn't Need You to Carry It
          </h2>

          <p>
            The sessions tutors remember fondly are never the ones where the
            material was impressively thorough. They're the ones where the
            student talked more than expected, asked a question that wasn't on
            the page, or laughed at something real. Those moments don't come
            from comprehensive resources. They come from materials simple enough
            to get out of the way.
          </p>

          <p>
            Build your teaching around that, and prep stops being a chore. It
            becomes a five-minute decision, not a forty-minute project.
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
                What makes an ESL conversation lesson blueprint different from
                a regular lesson plan?
              </h3>

              <p className="mt-2 text-muted-foreground">
                A conversation blueprint is built around a specific real-world
                scenario (like networking or ordering food) rather than a
                grammar point or vocabulary list. It's designed so the student
                can start speaking almost immediately, with minimal teacher
                setup.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold">
                How can I adapt online teaching resources for one-to-one
                lessons without extra prep?
              </h3>

              <p className="mt-2 text-muted-foreground">
                Look for resources that are scenario-based and written at an
                appropriate level for your student. If a resource requires more
                than five minutes of adaptation before it fits your session,
                it's not truly ready-to-use for your context.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold">
                When should I use warm-up activities in ESL speaking lessons?
              </h3>

              <p className="mt-2 text-muted-foreground">
                Warm-ups work best when they're embedded in the lesson material
                itself, not bolted on separately. A good opening question tied
                to the lesson's scenario doubles as both warm-up and
                context-setting, saving time and keeping momentum.
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
            Give your students real-world speaking practice without spending
            hours preparing your next lesson.
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