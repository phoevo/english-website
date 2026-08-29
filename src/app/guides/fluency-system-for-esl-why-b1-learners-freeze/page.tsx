import { ArrowLeft, ArrowRight, BookOpen } from "lucide-react";
import Link from "next/link";
import { Geist } from "next/font/google";

const geist = Geist({ subsets: ["latin"] });

/* eslint react/no-unescaped-entities: 0 */

export const metadata = {
  title:
    "Fluency System for ESL: Why B1 Learners Freeze | Synomilo",
  description:
    "Discover why B1 ESL students freeze mid-conversation despite strong comprehension skills, and how scenario-based speaking practice can close the gap.",
  alternates: {
    canonical: "/guides/fluency-system-esl",
  },
  openGraph: {
    title: "Fluency System for ESL: Why B1 Learners Freeze",
    description:
      "Discover why B1 ESL students freeze mid-conversation despite strong comprehension skills, and how scenario-based speaking practice can close the gap.",
    url: "/guides/fluency-system-esl",
    type: "article",
  },
};

const guideSections = [
  {
    title: "You Already Know Enough English",
    href: "#you-already-know-enough-english",
  },
  {
    title: "The Myth That More Study Fixes the Freeze",
    href: "#the-myth-that-more-study-fixes-the-freeze",
  },
  {
    title: "The Real Problem Is a Missing Fluency System",
    href: "#the-real-problem-is-a-missing-fluency-system",
  },
  {
    title: "Where Freezing Actually Lives",
    href: "#where-freezing-actually-lives",
  },
  {
    title: "What Changes If We Take This Seriously",
    href: "#what-changes-if-we-take-this-seriously",
  },
  {
    title: "Stop Thinking 'Fluency.' Start Thinking 'Readiness.'",
    href: "#stop-thinking-fluency-start-thinking-readiness",
  },
  {
    title: "The Words Are Already There",
    href: "#the-words-are-already-there",
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
    title: "EF English Proficiency Index",
    href: "https://www.ef.edu/about-us/press/articles/2024/worldwide-english-proficiency-index-reports-persistent-global-decline/",
  },
  {
    title: "WIDA research on English learner proficiency growth",
    href: "https://wida.wisc.edu/sites/default/files/resource/Research-Report-Examining-English-Learner-Testing-Proficiency-Growth-2024.pdf",
  },
  {
    title: "Synomilo",
    href: "https://www.synomilo.com/",
  },
  {
    title: "Synomilo Job Interview guide",
    href: "https://synomilo.com/guides/job-interview",
  },
  {
    title: "Synomilo CEFR discussion prompts",
    href: "https://synomilo.com/guides/cefr-discussion-prompts",
  },
  {
    title: "Eurostat foreign-language proficiency data",
    href: "https://ec.europa.eu/eurostat/statistics-explained/SEPDF/cache/44913.pdf",
  },
];

export default function PostPage() {
  return (
    <div className={`flex flex-col lg:flex-row ${geist.className}`}>
      {/* Sidebar */}
      <aside
        className={`p-5 pt-20 hidden lg:block lg:sticky lg:top-20 lg:w-xs bg-muted ${geist.className}`}
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
                href="/guides/job-interview"
                className="group rounded-md border bg-card p-3 transition hover:shadow-sm"
              >
                <strong className="font-semibold group-hover:underline">
                  Job Interview
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
        <div className="space-y-16">
          {/* Article Header */}
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

              <span>Fluency System for ESL</span>
            </nav>

            <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
              <span className="rounded-full border bg-card px-3 py-1">
                ESL Learning
              </span>

              <span className="rounded-full border bg-card px-3 py-1">
                B1 English
              </span>

              <span className="rounded-full border bg-card px-3 py-1">
                Speaking Fluency
              </span>
            </div>

            <div className="space-y-5">
              <h1 className="border-b pb-3 text-5xl leading-tight">
                Fluency System for ESL: Why B1 Learners Freeze
              </h1>

              <p className="max-w-3xl text-lg text-muted-foreground">
                The gap between understanding English and speaking it is not a
                knowledge problem — it's a practice system that's missing
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 border-b pb-6 text-sm text-muted-foreground">
              <span>B1 English</span>
              <span>·</span>
              <span>Speaking practice</span>
              <span>·</span>
              <span>Real-life conversation</span>
            </div>

            <p className="max-w-3xl text-muted-foreground">
              Discover why B1 ESL students freeze mid-conversation despite
              strong comprehension skills. Learn how real-life speaking
              activities, structured as a repeatable system, close the gap that
              more grammar and vocabulary study never will.
            </p>
          </header>

          {/* TL;DR */}
          <section className="space-y-5">
              <h2 className="border-b pb-2 text-2xl">
                TL;DR
              </h2>

              <ul className="list-disc space-y-3 pl-6">
                <li>
                  <strong>The freeze isn't a knowledge gap</strong> - B1
                  learners already know enough English; they lack structured
                  practice in the specific situations where they freeze up.
                </li>

                <li>
                  <strong>More study won't fix it</strong> - Vocabulary and
                  grammar drills build comprehension, not real-time speaking
                  ability. Global proficiency is declining despite unprecedented
                  access to English content.
                </li>

                <li>
                  <strong>Scenario-based rehearsal is the missing layer</strong>{" "}
                  - Practicing real-life speaking activities (job interviews,
                  small talk, customer service) builds the recall speed and
                  confidence that generic study can't.
                </li>

                <li>
                  <strong>Think "readiness," not "fluency"</strong> - Fluency
                  isn't a destination. It's a collection of situations you've
                  rehearsed enough to stop fearing.
                </li>
              </ul>
          </section>

          {/* You Already Know Enough English */}
          <section
            id="you-already-know-enough-english"
            className="scroll-mt-24 space-y-6"
          >
            <h2 className="border-b pb-2 text-2xl">
              You Already Know Enough English. So Why Can't You Say It?
            </h2>
            <div className="space-y-5">
              <p>
                There's a particular kind of frustration that B1 ESL students
                know well. You watch a show in English and follow the plot. You
                read an email and understand every word. Then someone at work
                turns to you and asks a simple question, and your mind goes
                blank. The words are in there. You know they are. But the path
                from knowing to speaking feels blocked by something you can't
                name.
              </p>

              <p>
                This isn't a rare experience. It might be the most common one in
                language learning. And yet, the reason it persists has almost
                nothing to do with how much English you've studied.
              </p>
            </div>
          </section>

          {/* Myth */}
          <section
            id="the-myth-that-more-study-fixes-the-freeze"
            className="scroll-mt-24 space-y-6"
          >
            <h2 className="border-b pb-2 text-2xl">
              The Myth That More Study Fixes the Freeze
            </h2>
            <div className="space-y-5">
              <p>
                The standard advice for learners stuck at this stage is
                predictable: learn more vocabulary, review your grammar, do
                more exercises. The assumption is that the gap between
                understanding and speaking is a knowledge gap. Fill in what's
                missing, and fluency follows.
              </p>

              <p>
                This belief took hold because it's partially true. At the very
                beginning, more knowledge does unlock more ability. But by the
                time you reach B1, something shifts. You already have a working
                vocabulary. You grasp tenses, conditionals, common idioms. The
                bottleneck is no longer what you know.
              </p>

              <p>
                And yet, most courses, apps, and study plans keep feeding you
                more input as if comprehension were the finish line.{" "}
                <a
                  href="https://www.ef.edu/about-us/press/articles/2024/worldwide-english-proficiency-index-reports-persistent-global-decline/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-pink-500 hover:underline"
                >
                  Global English proficiency has declined for four consecutive
                  years
                </a>
                , even as access to English content has never been greater. More
                exposure alone clearly isn't solving the problem.
              </p>
            </div>
          </section>

          {/* Real Problem */}
          <section
            id="the-real-problem-is-a-missing-fluency-system"
            className="scroll-mt-24 space-y-6"
          >
            <h2 className="border-b pb-2 text-2xl">
              The Real Problem Is a Missing Fluency System for ESL Learners
            </h2>

            <blockquote className="border-l-2 pl-6 text-2xl font-medium leading-relaxed tracking-tight">
              The reason B1 learners freeze mid-conversation isn't a fluency
              problem. It's an infrastructure problem.
            </blockquote>

            <div className="space-y-5">
              <p>
                Here's what we actually believe: no one has given these learners
                a system for practicing the exact situations where freezing
                happens.
              </p>
            </div>
          </section>

          {/* Where Freezing Lives */}
          <section
            id="where-freezing-actually-lives"
            className="scroll-mt-24 space-y-7"
          >
            <h2 className="border-b pb-2 text-2xl">
              Where Freezing Actually Lives
            </h2>
            <div className="space-y-5">
              <p>
                Think about when the freeze hits. It's not during a grammar
                quiz. It's not when you're reading a menu. It almost always
                happens in a specific, real-world moment: explaining a problem
                to your landlord, making small talk at a conference, pushing
                back politely on a colleague's idea, or navigating an unexpected
                question at a doctor's appointment.
              </p>

              <p>
                These moments share a pattern. They're socially loaded, slightly
                unpredictable, and they demand that you produce language in real
                time without a script. And here's the critical part: almost no
                traditional study method prepares you for them.
              </p>

              <p>
                Vocabulary lists don't simulate the pressure of a real exchange.
                Grammar drills don't teach you how to recover when you lose your
                train of thought mid-sentence. Beyond that, even "free
                conversation" practice with a tutor often drifts into
                comfortable, familiar territory rather than targeting the
                specific scenarios that cause anxiety.
              </p>

              <p>
                The data supports this pattern, too.{" "}
                <a
                  href="https://wida.wisc.edu/sites/default/files/resource/Research-Report-Examining-English-Learner-Testing-Proficiency-Growth-2024.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-pink-500 hover:underline"
                >
                  Research from WIDA shows that average speaking scores for
                  English learners remain below pre-pandemic levels
                </a>{" "}
                and actually fell further recently, even as other skills
                stabilized. Speaking suffers the most when structured,
                situational practice is missing.
              </p>

              <p>
                So what works instead is something closer to rehearsal. Not
                memorizing scripts, but running through the kinds of
                conversations that trip you up, with enough structure to build
                confidence and enough flexibility to mirror real life. Real-life
                speaking activities designed around specific scenarios (ordering
                at a restaurant, negotiating a deadline, asking for directions)
                create neural pathways that generic study simply doesn't.
              </p>

              <p>
                Even Cambridge English's own B1 resources hint at this when they
                emphasize recording yourself speaking and listening back. The
                underlying principle is clear: fluency gains depend on
                situation-specific rehearsal and self-monitoring, not just
                accumulating more knowledge.
              </p>

              <p>
                This is the approach platforms like{" "}
                <a
                  href="https://www.synomilo.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-pink-500 hover:underline"
                >
                  Synomilo
                </a>{" "}
                take: native-written dialogues grounded in practical scenarios,
                so learners can rehearse the exact moments where confidence
                breaks down. It's not about replacing grammar study. It's about
                building the missing layer on top of it.
              </p>

              <p>
                Consider the difference. A learner who has studied conditionals
                can, in theory, say "If the delivery is late, I'd like a
                refund." But a learner who has <em>practiced</em> a customer
                service scenario three times can actually say it when the moment
                arrives, with the right tone, at a natural pace, without the
                five-second freeze that makes them switch to their native
                language or just say "okay, fine."
              </p>

              <p>
                That gap between theory and performance is where fluency lives.
                And only practice that mirrors the performance conditions can
                close it.
              </p>
            </div>
          </section>

          {/* What Changes */}
          <section
            id="what-changes-if-we-take-this-seriously"
            className="scroll-mt-24 space-y-6"
          >
            <h2 className="border-b pb-2 text-2xl">
              What Changes If We Take This Seriously
            </h2>
            <div className="space-y-5">
              <p>
                If the freeze is a practice-design problem rather than a
                knowledge problem, the implications are significant. It means
                learners spending hours on vocabulary apps may be investing in
                the wrong layer of the stack. It means tutors who rely on free
                conversation without scenario structure may be leaving their
                students' biggest pain points unaddressed.
              </p>

              <p>
                Beyond that, it means adult learners need a framework for
                independent practice that goes beyond "find a conversation
                partner." They need to be able to self-select scenarios that
                match their actual lives (a{" "}
                <a
                  href="https://synomilo.com/guides/job-interview"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-pink-500 hover:underline"
                >
                  job interview
                </a>
                , a parent-teacher meeting, a networking event) and work through
                them at their own pace. The absence of this kind of{" "}
                <a
                  href="https://synomilo.com/guides/cefr-discussion-prompts"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-pink-500 hover:underline"
                >
                  level-appropriate, scenario-grounded practice
                </a>{" "}
                is arguably the biggest gap in how adults learn English today.
              </p>

              <p>
                And for the{" "}
                <a
                  href="https://ec.europa.eu/eurostat/statistics-explained/SEPDF/cache/44913.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-pink-500 hover:underline"
                >
                  72% of multilingual European adults
                </a>{" "}
                who don't consider themselves proficient in their best-known
                foreign language, the cost is real: missed promotions, awkward
                silences, opportunities that slip away not because of what they
                don't know, but because of what they haven't rehearsed.
              </p>
            </div>
          </section>

          {/* Readiness */}
          <section
            id="stop-thinking-fluency-start-thinking-readiness"
            className="scroll-mt-24 space-y-6"
          >
            <h2 className="border-b pb-2 text-2xl">
              Stop Thinking "Fluency." Start Thinking "Readiness."
            </h2>
            <div className="space-y-5">
              <p>
                The word "fluency" is part of the problem. It sounds like a
                destination, a permanent state you arrive at after enough study.
                That framing makes every stumble feel like proof you're not there
                yet.
              </p>

              <p>
                A better mental model is readiness. You don't need to be fluent
                in English. You need to be ready for the specific conversations
                your life demands. Ready for the Tuesday morning standup. Ready
                for the airport check-in. Ready for the moment someone says "so,
                tell me about yourself."
              </p>

              <p>
                Readiness is buildable, scenario by scenario. It's concrete,
                measurable, and it doesn't require you to become a different
                person. It just requires practicing the right things in the right
                order.
              </p>
            </div>

            <blockquote className="border-l-2 pl-6 my-10 text-2xl font-medium leading-relaxed tracking-tight">
              Fluency isn't a knowledge threshold you cross. It's a collection
              of situations you've rehearsed enough to stop fearing.
            </blockquote>
          </section>

          {/* Words */}
          <section
            id="the-words-are-already-there"
            className="scroll-mt-24 space-y-6"
          >
            <h2 className="border-b pb-2 text-2xl">
              The Words Are Already There
            </h2>
            <div className="space-y-5">
              <p>
                You don't need more English. You need more reps in the moments
                that matter. The freeze isn't evidence that you're not ready.
                It's evidence that you've been preparing for the wrong test.
              </p>

              <p>
                The next time your mind goes blank, remember: the problem was
                never your English. It's that nobody gave you a stage to
                practice on.
              </p>
            </div>
          </section>

          {/* FAQ */}
          <section
            id="frequently-asked-questions"
            className="scroll-mt-24 space-y-7"
          >
            <h2 className="border-b pb-2 text-2xl">
              Frequently Asked Questions
            </h2>

            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-semibold tracking-tight">
                  Why are real-life conversation scenarios effective for ESL
                  learners?
                </h3>

                <p className="mt-2 text-muted-foreground">
                  They replicate the social pressure and unpredictability of
                  actual conversations, which generic exercises can't simulate.
                  As a result, practicing within a realistic context builds the
                  recall speed and confidence that B1 ESL students need to stop
                  freezing in the moment.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold tracking-tight">
                  Which types of conversation scenarios are best for B1 ESL
                  students?
                </h3>

                <p className="mt-2 text-[17px] leading-8 text-muted-foreground">
                  Scenarios tied to the learner's actual daily needs work best:
                  workplace check-ins, making appointments, social small talk,
                  and handling unexpected questions. The key is matching the
                  scenario to situations where the learner personally experiences
                  the most anxiety or hesitation.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold tracking-tight">
                  How can I practice speaking English on my own outside of class?
                </h3>

                <p className="mt-2 text-[17px] leading-8 text-muted-foreground">
                  Choose a specific scenario you'll face soon, rehearse both
                  sides of the conversation out loud, and record yourself to
                  listen back. Structured conversation activities built around
                  real-world situations work far better than unguided free
                  practice.
                </p>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="rounded-md bg-accent p-8 text-center">
            <BookOpen className="mx-auto mb-4" size={30} />

            <h2 className="text-2xl font-semibold">
              Practice the conversations that matter
            </h2>

            <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
              Give yourself or your students realistic speaking practice built
              around the situations where English needs to work in real life.
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
            className="scroll-mt-24 space-y-5"
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

          {/* Footer */}
          <footer className="border-t pt-8">
            <Link
              href="/guides"
              className="inline-flex items-center gap-2 font-medium text-pink-500 hover:underline"
            >
              <ArrowLeft size={16} />
              Back to all Synomilo articles
            </Link>
          </footer>
        </div>
      </article>
    </div>
  );
}