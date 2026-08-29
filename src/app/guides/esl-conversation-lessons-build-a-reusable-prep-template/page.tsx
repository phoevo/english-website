import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CircleAlert,
  Lightbulb,
} from "lucide-react";
import { Geist } from "next/font/google";
import Link from "next/link";

const geist = Geist({ subsets: ["latin"] });


/* eslint react/no-unescaped-entities: 0 */

export const metadata = {
  title: "How to Build a Reusable ESL Conversation Lesson Template | Synomilo",
  description:
    "Build a reusable ESL conversation lesson template and fill every stage with ready-made material in under 15 minutes. Follow this step-by-step prep tutorial.",
  alternates: {
    canonical: "/guides/esl-conversation-lesson-template",
  },
};

const vocabulary = [
  {
    title: "Warm-Up",
    description:
      "Open-ended questions that get your student talking about the topic before introducing new language.",
  },
  {
    title: "Present / Set Context",
    description:
      "A dialogue, video, or reading that introduces useful language in a realistic situation.",
  },
  {
    title: "Controlled Practice",
    description:
      "A structured activity such as a gap-fill, substitution drill, matching exercise, or guided role-play.",
  },
  {
    title: "Free Practice",
    description:
      "A less structured activity where the student uses the language more independently.",
  },
  {
    title: "Wrap-Up / Check",
    description:
      "A short feedback, recap, and bridge to the next lesson.",
  },
];

const warmUpQuestions = [
  "Have you ever...?",
  "What do you usually...?",
  "What's the hardest part about...?",
];

const controlledActivities = [
  {
    title: "Gap-fill",
    description:
      "Remove key phrases from the dialogue and have the student complete them from memory or a word bank.",
  },
  {
    title: "Substitution drill",
    description:
      "Take a sentence frame from the dialogue and give the student several items to swap into it.",
  },
  {
    title: "Matching",
    description:
      "Match questions to responses, or phrases to situations.",
  },
  {
    title: "Guided role-play",
    description:
      "Give the student a role card with specific information while you play the other role.",
  },
];

const freePracticeActivities = [
  {
    title: "Open role-play",
    description:
      "Use the same scenario without a script or role card. The student navigates the conversation using whatever language they have.",
  },
  {
    title: "Personalized discussion",
    description:
      "Ask the student to relate the scenario to their own experiences.",
  },
  {
    title: "Information gap",
    description:
      "You and the student each have different details and must exchange information to complete a task.",
  },
  {
    title: "Problem-solving",
    description:
      "Introduce a problem related to the scenario and let the student work through it.",
  },
];

const commonErrors = [
  {
    title: "My student barely spoke during the warm-up.",
    cause:
      "Questions were too abstract or assumed knowledge the student doesn't have.",
    fix: 'Replace open questions with choice questions for beginners, such as "Do you prefer eating at home or at a restaurant?"',
  },
  {
    title: "The dialogue was too hard.",
    cause:
      "The material was above the student's level and too much time was spent explaining vocabulary.",
    fix:
      "Pre-screen dialogues and simplify the material or pre-teach a small number of key words.",
  },
  {
    title: "Controlled practice felt boring.",
    cause: "You relied only on gap-fills.",
    fix:
      "Swap in a guided role-play or matching activity to add variety without adding much preparation.",
  },
  {
    title: "Free practice turned into silence.",
    cause:
      "The prompt was too open for the student's level, or they lacked confidence with the target language.",
    fix:
      "Offer a starter sentence and keep the scenario close to the one already practised.",
  },
  {
    title: "I still spent 30 minutes preparing.",
    cause:
      "You were searching for perfect material instead of good-enough material.",
    fix:
      "Set a timer for each sourcing step. The first dialogue that fits roughly 80% of your criteria is good enough.",
  },
];

const faqs = [
  {
    question: "What are ESL conversation lesson blueprints?",
    answer:
      'A lesson blueprint is a reusable template that outlines the stages of a conversation lesson: warm-up, presentation, controlled practice, free practice, and wrap-up. You fill in the material for each stage based on your student\'s needs and level. Think of it as a skeleton you dress differently each time.',
  },
  {
    question: "Why are speaking lesson plans important for ESL learners?",
    answer:
      "A structured plan helps your student move from supported practice to independent use of new language within a single session. Without that progression, lessons can become aimless chat or grammar drills. The plan creates a path between the two.",
  },
  {
    question: "How can I adapt ESL conversation lessons for online teaching?",
    answer:
      "The five-stage template works the same way online. Use screen sharing to display dialogues or exercises, collaborative documents for written practice, and your video call's chat box to type corrections during free practice without interrupting the student's flow.",
  },
  {
    question: "When should I use warm-up activities in ESL speaking lessons?",
    answer:
      "Use them at the start, before introducing new material. The warm-up activates existing knowledge, lowers pressure, and gives you a quick diagnostic of what language the student already has.",
  },
  {
    question: "How do I create a communicative goal for ESL conversation activities?",
    answer:
      'Frame the goal as a real-life task rather than a grammar point. Instead of "Students will practise the past tense," write "Students will describe a memorable travel experience to a new friend."',
  },
  {
    question: "Which types of activities work best in one-to-one ESL lessons?",
    answer:
      "Role-plays, information gaps, and personalized discussion prompts tend to work well because they require genuine interaction between teacher and student. Guided role-plays are especially useful because you can adjust difficulty in real time.",
  },
];

export default function PostPage() {
  return (
    <div className={`flex flex-col lg:flex-row ${geist.className}`}>
      {/* Sidebar */}
      <aside className="self-start p-5 pt-10 lg:sticky lg:top-8 lg:w-80 bg-muted">
        <Link
          href="/guides"
          className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft size={16} />
          Back to all guides
        </Link>

        <div className="space-y-6">
          <div>
            <h2 className="border-b pb-2 text-xl font-semibold">
              On this guide
            </h2>

            <nav className="mt-4 flex flex-col gap-3 text-sm">
              <a href="#template" className="hover:underline">
                The five-stage template
              </a>

              <a href="#topic" className="hover:underline">
                Defining the lesson topic
              </a>

              <a href="#warm-up" className="hover:underline">
                Warm-up discussions
              </a>

              <a href="#dialogue" className="hover:underline">
                Finding a dialogue
              </a>

              <a href="#controlled" className="hover:underline">
                Controlled practice
              </a>

              <a href="#free-practice" className="hover:underline">
                Free practice
              </a>

              <a href="#wrap-up" className="hover:underline">
                Wrap-up routine
              </a>

              <a href="#workflow" className="hover:underline">
                The 15-minute workflow
              </a>

              <a href="#faq" className="hover:underline">
                FAQ
              </a>
            </nav>
          </div>
        </div>
      </aside>

      {/* Main article */}
      <article className="m-2 h-screen space-y-16 overflow-y-auto rounded-lg bg-background p-5 lg:w-2/3">
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

            <span>ESL Conversation Lesson Template</span>
          </nav>

          <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
            <span className="rounded-full border bg-card px-3 py-1">
              Teacher Guide
            </span>

            <span className="rounded-full border bg-card px-3 py-1">
              ESL Teaching
            </span>

            <span className="rounded-full border bg-card px-3 py-1">
              Conversation
            </span>
          </div>

          <h1 className="border-b pb-3 text-4xl leading-tight">
            How to Build a Reusable ESL Conversation Lesson Template
          </h1>

          <p className="max-w-3xl text-lg text-muted-foreground">
            Learn how to create a reusable lesson template for ESL conversation
            classes and fill it with sourced material in minutes. This
            step-by-step guide covers everything from warm-up discussions
            through free practice, helping you dramatically reduce lesson
            preparation time.
          </p>

          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <span>Teacher Guide</span>
            <span>·</span>
            <span>10 min read</span>
          </div>
        </header>

        {/* TL;DR */}
        <section className="space-y-4">
          <h2 className="border-b pb-2 text-2xl">TL;DR</h2>

          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <Check
                size={19}
                className="mt-0.5 flex-shrink-0 text-green-500"
              />
              <span>
                <strong>Build a five-stage template once.</strong> Use
                Warm-Up, Present, Controlled Practice, Free Practice, and
                Wrap-Up.
              </span>
            </li>

            <li className="flex items-start gap-3">
              <Check
                size={19}
                className="mt-0.5 flex-shrink-0 text-green-500"
              />
              <span>
                <strong>Define each lesson with one scenario sentence.</strong>{" "}
                Focus on a specific real-life situation rather than a grammar
                point.
              </span>
            </li>

            <li className="flex items-start gap-3">
              <Check
                size={19}
                className="mt-0.5 flex-shrink-0 text-green-500"
              />
              <span>
                <strong>Source material instead of creating everything.</strong>{" "}
                Use dialogues, discussion questions, worksheets, and
                conversation platforms.
              </span>
            </li>

            <li className="flex items-start gap-3">
              <Check
                size={19}
                className="mt-0.5 flex-shrink-0 text-green-500"
              />
              <span>
                <strong>Don't skip controlled practice.</strong> It bridges the
                gap between understanding new language and using it freely.
              </span>
            </li>

            <li className="flex items-start gap-3">
              <Check
                size={19}
                className="mt-0.5 flex-shrink-0 text-green-500"
              />
              <span>
                <strong>Protect free practice from over-correction.</strong>{" "}
                Note errors and address them during the wrap-up instead of
                constantly interrupting.
              </span>
            </li>
          </ul>
        </section>

        {/* What you'll achieve */}
        <section className="space-y-4">
          <h2 className="border-b pb-2 text-2xl">
            What You'll Achieve: A Reusable Lesson Arc That Fills Itself
          </h2>

          <p>
            By the end of this guide, you'll have a reliable lesson structure
            for <strong>ESL conversation</strong> classes that you can populate
            with ready-made material in under 15 minutes.
          </p>

          <p>
            Instead of staring at a blank document before each session, you'll
            slot sourced dialogues, <strong>warm-up discussions</strong>,{" "}
            <strong>controlled practice exercises</strong>, and free-talk
            prompts into a template you've already built.
          </p>

          <p>
            The goal is simple: open your template, fill every stage with
            appropriate material, and walk into a one-to-one or small-group
            lesson feeling prepared.
          </p>

          <div className="rounded-md border bg-card p-5">
            <strong>Success criteria</strong>

            <ul className="mt-3 list-disc space-y-2 pl-5 text-muted-foreground">
              <li>You can fill every stage of your template.</li>
              <li>Your materials match the student's level.</li>
              <li>You can prepare the lesson in around 15 minutes.</li>
              <li>You aren't relying on the same worksheet every week.</li>
            </ul>
          </div>
        </section>

        {/* Prerequisites */}
        <section className="space-y-4">
          <h2 className="border-b pb-2 text-2xl">
            Prerequisites and Setup
          </h2>

          <p>Before you start, have the following ready:</p>

          <ul className="list-disc space-y-3 pl-6">
            <li>
              <strong>A document tool</strong> you're comfortable with, such as
              Google Docs, Notion, or Word.
            </li>

            <li>
              <strong>Access to 2-3 material sources</strong> you already trust,
              such as worksheet sites, coursebooks, YouTube channels, or
              conversation platforms.
            </li>

            <li>
              <strong>A rough idea of your students' levels.</strong>
            </li>

            <li>
              <strong>About 45 minutes</strong> to complete the tutorial the
              first time.
            </li>
          </ul>

          <div className="flex items-start gap-3 rounded-md border bg-card p-4">
            <CircleAlert
              size={20}
              className="mt-0.5 flex-shrink-0 text-yellow-500"
            />

            <p className="text-muted-foreground">
              If you currently plan lessons entirely from memory with no
              written outline, Step 1 may feel unfamiliar. Stick with it. The
              template should pay for itself after two or three uses.
            </p>
          </div>
        </section>

        {/* Why reusable structure */}
        <section className="space-y-4">
          <h2 className="border-b pb-2 text-2xl">
            Why a Reusable Structure (Not a New Methodology)
          </h2>

          <p>
            This guide doesn't ask you to adopt a new teaching philosophy. You
            already know how to teach. The problem is that building every
            lesson from scratch eats time you could spend on feedback, student
            relationships, or simply not working.
          </p>

          <p>
            Research has supported a{" "}
            <a
              href="https://www.diva-portal.org/smash/get/diva2:1453750/FULLTEXT02"
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink-500 hover:underline"
            >
              presentation → controlled practice → freer production flow
            </a>{" "}
            for conversation lessons.
          </p>

          <p>
            Whether you call it PPP, ESA, or simply "the way I've always done
            it," the stages are broadly similar. This guide treats that
            sequence as your skeleton and focuses on the practical work of
            filling it with material quickly.
          </p>

          <p>
            The approach here is <strong>sourcing and slotting</strong>, not
            designing every activity from zero.
          </p>
        </section>

        {/* Step 1 */}
        <section id="template" className="space-y-5">
          <h2 className="border-b pb-2 text-2xl">
            Step 1: Build Your Five-Stage Template
          </h2>

          <p>
            Open your document tool and create a file called{" "}
            <strong>"Conversation Lesson Template."</strong>
          </p>

          <div className="overflow-hidden rounded-md border">
            <div className="grid grid-cols-[1fr_1fr] bg-muted px-4 py-3 font-semibold">
              <span>Stage</span>
              <span>Suggested time</span>
            </div>

            {vocabulary.map((item, index) => {
              const times = ["8-10 min", "10 min", "15 min", "20 min", "5 min"];

              return (
                <div
                  key={item.title}
                  className="grid grid-cols-[1fr_1fr] border-t px-4 py-3"
                >
                  <strong>{item.title}</strong>
                  <span className="text-muted-foreground">
                    {times[index]}
                  </span>
                </div>
              );
            })}
          </div>

          <p>
            Under each heading, add two placeholder lines:{" "}
            <em>Material:</em> and <em>Teacher notes:</em>. That's it.
          </p>

          <div className="flex items-start gap-3 rounded-md border bg-card p-4">
            <Lightbulb
              size={20}
              className="mt-0.5 flex-shrink-0 text-yellow-500"
            />

            <div>
              <strong>Checkpoint</strong>

              <p className="mt-2 text-muted-foreground">
                Your template should fit on one screen. If it's much longer,
                you've probably over-engineered it.
              </p>
            </div>
          </div>

          <div className="rounded-md border bg-card p-5">
            <strong>Common failure</strong>

            <p className="mt-2 text-muted-foreground">
              Adding too many sub-sections such as pronunciation drills,
              grammar notes, and homework creates more blanks you'll feel
              obligated to fill. Keep the structure simple.
            </p>
          </div>
        </section>

        {/* Step 2 */}
        <section id="topic" className="space-y-5">
          <h2 className="border-b pb-2 text-2xl">
            Step 2: Define the Lesson Topic in One Sentence
          </h2>

          <p>
            Before sourcing anything, write a single sentence at the top of a
            fresh copy of your template. It should answer:
          </p>

          <div className="rounded-md border bg-card p-5 text-center text-lg font-medium">
            "What real-life situation will my student practise today?"
          </div>

          <p>Good examples include:</p>

          <ul className="list-disc space-y-2 pl-6">
            <li>
              Ordering food at a restaurant and asking about ingredients.
            </li>

            <li>
              <a
                href="/guides/networking-event"
                className="text-pink-500 hover:underline"
              >
                Making small talk with a new colleague on your first day.
              </a>
            </li>

            <li>Checking into a hotel and asking about amenities.</li>
          </ul>

          <p>
            These are scenario-based topics rather than grammar points.
          </p>

          <div className="flex items-start gap-3 rounded-md border bg-card p-4">
            <CircleAlert
              size={20}
              className="mt-0.5 flex-shrink-0 text-yellow-500"
            />

            <p className="text-muted-foreground">
              If your topic sentence includes a grammar term, rewrite it as a
              situation. Grammar can appear naturally during controlled
              practice, but the topic should remain anchored to something the
              adult learner actually needs to do in English.
            </p>
          </div>

          <p>
            Avoid topics that are too broad. "Travel" is difficult to build a
            focused lesson around. "Asking for directions at an airport" tells
            you exactly what material to look for.
          </p>
        </section>

        {/* Step 3 */}
        <section id="warm-up" className="space-y-5">
          <h2 className="border-b pb-2 text-2xl">
            Step 3: Source Your Warm-Up Discussions in Two Minutes
          </h2>

          <p>
            The warm-up has one job: get your student talking about the topic
            before any new language appears.
          </p>

          <p>Here are three quick ways to find questions:</p>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-md border bg-card p-5">
              <strong>Option A</strong>

              <p className="mt-2 text-sm text-muted-foreground">
                Search for your topic plus "discussion questions ESL" and take
                3-5 questions from a credible source.
              </p>
            </div>

            <div className="rounded-md border bg-card p-5">
              <strong>Option B</strong>

              <p className="mt-2 text-sm text-muted-foreground">
                Write your own using simple formulas such as:
              </p>

              <ul className="mt-2 list-disc pl-5 text-sm text-muted-foreground">
                {warmUpQuestions.map((question) => (
                  <li key={question}>{question}</li>
                ))}
              </ul>
            </div>

            <div className="rounded-md border bg-card p-5">
              <strong>Option C</strong>

              <p className="mt-2 text-sm text-muted-foreground">
                Use an AI chatbot to generate five questions for your exact
                scenario and level.
              </p>
            </div>
          </div>

          <p>
            Paste your chosen questions under the Warm-Up section of your
            template.
          </p>

          <p>
            As{" "}
            <a
              href="https://www.myenglishpages.com/esl-lesson-planning-frameworks/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink-500 hover:underline"
            >
              ESA frameworks describe
            </a>
            , the Engage phase is not filler. It activates what the student
            already knows and creates a reason to care about the material coming
            next.
          </p>

          <div className="flex items-start gap-3 rounded-md border bg-card p-4">
            <Lightbulb
              size={20}
              className="mt-0.5 flex-shrink-0 text-yellow-500"
            />

            <div>
              <strong>Checkpoint</strong>

              <p className="mt-2 text-muted-foreground">
                Read your questions aloud. If a beginner couldn't attempt at
                least a short answer to each one, simplify the wording.
              </p>
            </div>
          </div>
        </section>

        {/* Step 4 */}
        <section id="dialogue" className="space-y-5">
          <h2 className="border-b pb-2 text-2xl">
            Step 4: Find a Dialogue or Scenario for the Present Stage
          </h2>

          <p>
            This is the stage where your student encounters target language in
            context. You need a short dialogue, video clip, or reading snippet
            that models the real-life scenario from Step 2.
          </p>

          <h3 className="text-xl font-semibold">Where to look</h3>

          <ul className="space-y-4">
            <li className="rounded-md border bg-card p-4">
              <strong>Coursebook dialogues</strong>

              <p className="mt-2 text-muted-foreground">
                Use relevant units from coursebooks you already own and
                reference the dialogue in your template.
              </p>
            </li>

            <li className="rounded-md border bg-card p-4">
              <strong>YouTube or podcast clips</strong>

              <p className="mt-2 text-muted-foreground">
                Search for your scenario plus "English conversation." Preview
                clips to make sure they match the student's level.
              </p>
            </li>

            <li className="rounded-md border bg-card p-4">
              <strong>Conversation platforms</strong>

              <p className="mt-2 text-muted-foreground">
                Platforms such as{" "}
                <a
                  href="https://synomilo.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-pink-500 hover:underline"
                >
                  Synomilo
                </a>{" "}
                provide native-written dialogues around real-world situations.
              </p>
            </li>
          </ul>

          <p>
            Paste the link, page reference, or transcript excerpt under the
            Present stage. In your teacher notes, identify 2-3 vocabulary items
            or phrases to highlight.
          </p>

          <div className="flex items-start gap-3 rounded-md border bg-card p-4">
            <Lightbulb
              size={20}
              className="mt-0.5 flex-shrink-0 text-yellow-500"
            />

            <div>
              <strong>Checkpoint</strong>

              <p className="mt-2 text-muted-foreground">
                The dialogue should be short enough to read or listen to twice
                within 10 minutes, with enough time left to clarify meaning.
              </p>
            </div>
          </div>

          <div className="rounded-md border bg-card p-5">
            <strong>Common failure</strong>

            <p className="mt-2 text-muted-foreground">
              Choosing material that's too advanced because it sounds natural.
              Your student should understand roughly 80% on first exposure. If
              they can't, the controlled practice stage will become much harder.
            </p>
          </div>
        </section>

        {/* Step 5 */}
        <section id="controlled" className="space-y-5">
          <h2 className="border-b pb-2 text-2xl">
            Step 5: Slot in Controlled Practice Exercises
          </h2>

          <p>
            Controlled practice is where your student uses target language with
            guardrails. You're limiting the variables so they can focus on
            accuracy before fluency.
          </p>

          <p>
            Research on{" "}
            <a
              href="https://nsuworks.nova.edu/cgi/viewcontent.cgi?article=1731&context=fse_etd"
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink-500 hover:underline"
            >
              ESL lesson stages
            </a>{" "}
            supports the role of this stage in helping students understand and
            apply language before taking greater ownership of it.
          </p>

          <p>Pick one or two of these activity types:</p>

          <div className="grid gap-4 md:grid-cols-2">
            {controlledActivities.map((activity) => (
              <div
                key={activity.title}
                className="rounded-md border bg-card p-5"
              >
                <strong>{activity.title}</strong>

                <p className="mt-2 text-sm text-muted-foreground">
                  {activity.description}
                </p>
              </div>
            ))}
          </div>

          <p>
            You don't need to create these from scratch. Many worksheet sites
            and coursebooks include controlled exercises paired with dialogues.
          </p>

          <div className="flex items-start gap-3 rounded-md border bg-card p-4">
            <Lightbulb
              size={20}
              className="mt-0.5 flex-shrink-0 text-yellow-500"
            />

            <div>
              <strong>Checkpoint</strong>

              <p className="mt-2 text-muted-foreground">
                During the exercise, the student should produce short, accurate
                utterances. If they're struggling to say anything, the exercise
                may be too difficult or the present stage didn't land.
              </p>
            </div>
          </div>
        </section>

        {/* Step 6 */}
        <section id="free-practice" className="space-y-5">
          <h2 className="border-b pb-2 text-2xl">
            Step 6: Prepare Free Practice Activities That Actually Feel Free
          </h2>

          <p>
            Free practice is where the student uses the language from the
            lesson in a less structured and more personal way.
          </p>

          <p>
            This should take up the largest part of the lesson. Around{" "}
            <a
              href="https://www.slideshare.net/slideshow/lesson-steps/34290429?nway-content_model=A"
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink-500 hover:underline"
            >
              25-35% of total class time
            </a>{" "}
            is a common recommendation.
          </p>

          <div className="grid gap-4 md:grid-cols-2">
            {freePracticeActivities.map((activity) => (
              <div
                key={activity.title}
                className="rounded-md border bg-card p-5"
              >
                <strong>{activity.title}</strong>

                <p className="mt-2 text-sm text-muted-foreground">
                  {activity.description}
                </p>
              </div>
            ))}
          </div>

          <p>
            Your teacher notes should be minimal here. Your job is to listen,
            note errors for later feedback, and only intervene if communication
            breaks down completely.
          </p>

          <div className="rounded-md border bg-card p-5">
            <strong>Common failure: over-correction</strong>

            <p className="mt-2 text-muted-foreground">
              Constant correction turns free practice back into controlled
              practice and can damage the student's confidence. Save your notes
              for the wrap-up.
            </p>
          </div>
        </section>

        {/* Step 7 */}
        <section id="wrap-up" className="space-y-5">
          <h2 className="border-b pb-2 text-2xl">
            Step 7: Write Your Wrap-Up Routine Once, Then Reuse It
          </h2>

          <p>
            The wrap-up is the one stage you can standardize across every
            lesson. Write it once in your master template and reuse it.
          </p>

          <div className="space-y-4">
            <div className="rounded-md border bg-card p-5">
              <strong>1. Feedback — 2 min</strong>

              <p className="mt-2 text-muted-foreground">
                Share 1-2 things the student did well and 1-2 errors you noted.
                Correct the errors together.
              </p>
            </div>

            <div className="rounded-md border bg-card p-5">
              <strong>2. Recap — 2 min</strong>

              <p className="mt-2 text-muted-foreground">
                Ask: "What's one new phrase you'll remember from today?" Let
                the student answer before prompting them if necessary.
              </p>
            </div>

            <div className="rounded-md border bg-card p-5">
              <strong>3. Bridge — 1 min</strong>

              <p className="mt-2 text-muted-foreground">
                Briefly preview the next lesson's topic. This creates
                continuity and gives the student something to think about
                between sessions.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 rounded-md border bg-card p-4">
            <CircleAlert
              size={20}
              className="mt-0.5 flex-shrink-0 text-yellow-500"
            />

            <p className="text-muted-foreground">
              Keep the wrap-up to around five minutes. If it runs much longer,
              you're probably trying to re-teach instead of wrapping up.
            </p>
          </div>
        </section>

        {/* Step 8 */}
        <section id="workflow" className="space-y-5">
          <h2 className="border-b pb-2 text-2xl">
            Step 8: Save, Duplicate, and Populate Your Next Lesson
          </h2>

          <p>
            Save your completed template as a master copy. Before each new
            lesson, duplicate it and fill in only the variable parts.
          </p>

          <div className="rounded-md border bg-card p-5">
            <h3 className="text-lg font-semibold">
              Your 15-minute preparation workflow
            </h3>

            <ol className="mt-4 space-y-3">
              <li>
                <strong>Minute 0-2:</strong> Duplicate the template and write
                the topic sentence.
              </li>

              <li>
                <strong>Minute 2-5:</strong> Source or write warm-up questions.
              </li>

              <li>
                <strong>Minute 5-10:</strong> Find the dialogue or scenario.
              </li>

              <li>
                <strong>Minute 10-13:</strong> Identify or create a controlled
                practice exercise.
              </li>

              <li>
                <strong>Minute 13-15:</strong> Write the free practice activity
                prompt.
              </li>
            </ol>
          </div>

          <p>
            The wrap-up is already written. You're done.
          </p>

          <div className="rounded-md border bg-card p-5">
            <strong>Common failure</strong>

            <p className="mt-2 text-muted-foreground">
              Don't edit your master copy. Always duplicate it first. Protecting
              the blank structure means you'll always have a clean template to
              return to.
            </p>
          </div>
        </section>

        {/* Configuration */}
        <section className="space-y-5">
          <h2 className="border-b pb-2 text-2xl">
            Configuration and Customization
          </h2>

          <h3 className="text-xl font-semibold">
            Adjusting Time Allocations
          </h3>

          <p>
            The 60-minute split of 10/10/15/20/5 is a useful default.
          </p>

          <ul className="list-disc space-y-2 pl-6">
            <li>
              <strong>45-minute lessons:</strong> 5/8/12/15/5
            </li>

            <li>
              <strong>60-minute lessons:</strong> 10/10/15/20/5
            </li>

            <li>
              <strong>90-minute lessons:</strong> expand controlled and free
              practice rather than adding entirely new stages.
            </li>
          </ul>

          <h3 className="text-xl font-semibold">Adapting for Levels</h3>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-md border bg-card p-5">
              <strong>Beginners</strong>

              <p className="mt-2 text-sm text-muted-foreground">
                Keep dialogues to around 6-8 lines, use more controlled practice
                and shorten free practice.
              </p>
            </div>

            <div className="rounded-md border bg-card p-5">
              <strong>Intermediate students</strong>

              <p className="mt-2 text-sm text-muted-foreground">
                You can sometimes skip the gap-fill and move into guided
                role-play, leaving more time for open discussion.
              </p>
            </div>
          </div>

          <h3 className="text-xl font-semibold">
            Settings You Should Change Every Time
          </h3>

          <p>
            The topic sentence and material links should change for every
            lesson. The wrap-up routine and time allocations can remain the
            same until you have a reason to adjust them.
          </p>
        </section>

        {/* Verification */}
        <section className="space-y-5">
          <h2 className="border-b pb-2 text-2xl">
            Verification and Testing
          </h2>

          <p>
            Run your first templated lesson and check these three things
            afterward:
          </p>

          <div className="space-y-4">
            <div className="rounded-md border bg-card p-5">
              <strong>
                Did the warm-up produce at least 3-4 student utterances?
              </strong>

              <p className="mt-2 text-sm text-muted-foreground">
                If not, your questions were probably too closed or difficult.
              </p>
            </div>

            <div className="rounded-md border bg-card p-5">
              <strong>
                Did the student use target language during free practice?
              </strong>

              <p className="mt-2 text-sm text-muted-foreground">
                If not, the controlled practice may not have bridged the gap.
              </p>
            </div>

            <div className="rounded-md border bg-card p-5">
              <strong>
                Did you finish within your time allocation?
              </strong>

              <p className="mt-2 text-sm text-muted-foreground">
                Give or take five minutes is fine. If you ran significantly
                over, trim the material rather than changing the structure.
              </p>
            </div>
          </div>

          <p>
            After three lessons using the template, you should be able to
            prepare in 15 minutes or less without feeling rushed or
            underprepared.
          </p>
        </section>

        {/* Common errors */}
        <section className="space-y-5">
          <h2 className="border-b pb-2 text-2xl">
            Common Errors and Fixes
          </h2>

          <div className="space-y-4">
            {commonErrors.map((error) => (
              <div
                key={error.title}
                className="rounded-md border bg-card p-5"
              >
                <h3 className="text-lg font-semibold">{error.title}</h3>

                <p className="mt-3">
                  <strong>Cause:</strong>{" "}
                  <span className="text-muted-foreground">
                    {error.cause}
                  </span>
                </p>

                <p className="mt-2">
                  <strong>Fix:</strong>{" "}
                  <span className="text-muted-foreground">{error.fix}</span>
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Extensions */}
        <section className="space-y-5">
          <h2 className="border-b pb-2 text-2xl">
            Next Steps and Extensions
          </h2>

          <p>
            Once your template is working, you can extend the system without
            making the core structure more complicated.
          </p>

          <ul className="space-y-4">
            <li className="rounded-md border bg-card p-5">
              <strong>Build a topic bank</strong>

              <p className="mt-2 text-muted-foreground">
                Create 20-30 scenario topics organized by work, travel, social,
                and daily life.
              </p>
            </li>

            <li className="rounded-md border bg-card p-5">
              <strong>Create level variants</strong>

              <p className="mt-2 text-muted-foreground">
                Duplicate your master template into beginner and intermediate
                versions with adjusted timings and activity defaults.
              </p>
            </li>

            <li className="rounded-md border bg-card p-5">
              <strong>Share with fellow tutors</strong>

              <p className="mt-2 text-muted-foreground">
                A shared template and topic bank can help standardize lesson
                quality without restricting individual teaching styles.
              </p>
            </li>
          </ul>

          <p>
            The goal isn't to eliminate creativity from teaching. It's to stop
            spending creative energy on structure so you can spend it where it
            matters: responding to your student in the moment.
          </p>
        </section>

        {/* CTA */}
        <section className="rounded-md bg-accent p-8 text-center">
          <h2 className="text-2xl font-semibold">
            Spend Less Time Preparing, More Time Teaching
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
            Synomilo gives tutors access to native-written English
            conversations built around real-world situations, making it easier
            to find useful conversation material for your next lesson.
          </p>

          <Link href="/">
            <Button className="mt-6 cursor-pointer bg-pink-500 text-background hover:bg-pink-500/85">
              Try Synomilo
              <ArrowRight className="ml-2" size={17} />
            </Button>
          </Link>
        </section>

        {/* FAQ */}
        <section id="faq" className="space-y-5">
          <h2 className="border-b pb-2 text-2xl">
            Frequently Asked Questions
          </h2>

          <div className="space-y-6">
            {faqs.map((faq) => (
              <div key={faq.question} className="space-y-2">
                <h3 className="text-lg font-semibold">{faq.question}</h3>

                <p className="text-muted-foreground">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Sources */}
        <section className="space-y-4">
          <h2 className="border-b pb-2 text-2xl">Sources</h2>

          <ol className="list-decimal space-y-2 pl-6 text-sm text-muted-foreground">
            <li>
              <a
                href="https://www.diva-portal.org/smash/get/diva2:1453750/FULLTEXT02"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground hover:underline"
              >
                Presentation, controlled practice and freer production
              </a>
            </li>

            <li>
              <a
                href="https://synomilo.com/guides/networking-event"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground hover:underline"
              >
                Synomilo Networking Event Guide
              </a>
            </li>

            <li>
              <a
                href="https://www.myenglishpages.com/esl-lesson-planning-frameworks/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground hover:underline"
              >
                ESL lesson planning frameworks
              </a>
            </li>

            <li>
              <a
                href="https://www.synomilo.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground hover:underline"
              >
                Synomilo
              </a>
            </li>

            <li>
              <a
                href="https://nsuworks.nova.edu/cgi/viewcontent.cgi?article=1731&context=fse_etd"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground hover:underline"
              >
                Research on ESL lesson stages
              </a>
            </li>

            <li>
              <a
                href="https://www.slideshare.net/slideshow/lesson-steps/34290429?nway-content_model=A"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground hover:underline"
              >
                Lesson steps and activity allocation
              </a>
            </li>
          </ol>
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
