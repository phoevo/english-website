import {
  ArrowLeft,
  Check,
  Lightbulb,
} from "lucide-react";
import Link from "next/link";
import { Geist } from "next/font/google";

const geist = Geist({ subsets: ["latin"] });

/* eslint react/no-unescaped-entities: 0 */

export const metadata = {
  title:
    "CEFR Levels: Designing Discussion Prompts for A2–B2 | Synomilo",
  description:
    "Learn how to design level-appropriate ESL discussion prompts for A2, B1, and B2 adult learners using real-world scenarios, task constraints, and practical lesson planning.",
  alternates: {
    canonical: "/guides/cefr-discussion-prompts",
  },
  openGraph: {
    title:
      "CEFR Levels: Designing Discussion Prompts for A2–B2",
    description:
      "Learn how to design level-appropriate ESL discussion prompts for A2, B1, and B2 adult learners using scenario-grounded tasks.",
    url: "/guides/cefr-discussion-prompts",
    type: "article",
  },
};

const frameworkStages = [
  {
    number: "Stage 1",
    title: "Anchor to a Real Scenario",
    description:
      "Choose a concrete, recognizable situation your student might face, such as ordering food, making small talk at a conference, or explaining a problem to a landlord.",
  },
  {
    number: "Stage 2",
    title: "Identify the Interaction Band",
    description:
      "Determine what kind of spoken interaction your student needs to practise: simple exchange, managed turn-taking, or sustained discussion.",
  },
  {
    number: "Stage 3",
    title: "Design the Task Constraint",
    description:
      "Build the prompt with specific boundaries that match the interaction band, so the student is stretched without becoming stranded.",
  },
  {
    number: "Stage 4",
    title: "Layer Teacher Instructions",
    description:
      "Write yourself a short note on what success looks like, what to listen for, and where to intervene. This keeps preparation light while keeping the lesson focused.",
  },
];

const interactionDimensions = [
  {
    title: "Discourse control",
    description:
      "A2 learners respond to direct, clearly paced input. B1 learners manage turn-taking and ask others to elaborate. B2 learners can steer conversations, redirect topics, and close exchanges naturally.",
  },
  {
    title: "Depth of reasoning",
    description:
      "A2 interaction stays concrete and factual. B1 introduces simple explanation and comparison. B2 reaches abstract reasoning, weighing pros and cons and making hypotheses.",
  },
  {
    title: "Collaborative interaction",
    description:
      "At A2, the tutor carries more of the conversational load. At B1, the student begins co-constructing meaning. At B2, they can participate as a near-equal partner in discussion.",
  },
];

const levelExamples = [
  {
    level: "A2",
    title: "Simple exchange",
    description:
      "Learners handle practical situations with clear roles, concrete language, and manageable choices.",
    example:
      "You and your colleague are choosing a restaurant for a team lunch. One of you prefers somewhere cheap and nearby. The other wants somewhere nicer, even if it is farther. Decide together.",
    skills:
      "Suggesting, agreeing and disagreeing, and simple negotiation.",
  },
  {
    level: "B1",
    title: "Managed turn-taking",
    description:
      "Learners can ask follow-up questions, explain reasons, check understanding, and adjust their response based on new information.",
    example:
      "You are recommending a restaurant to a new colleague who has dietary restrictions you're not sure about. Find out what they need, suggest options, and explain why you're recommending each one.",
    skills:
      "Clarifying questions, explaining reasons, asking follow-up questions, and adapting suggestions.",
  },
  {
    level: "B2",
    title: "Sustained discussion",
    description:
      "Learners can sustain discussion, respond to objections, reason about alternatives, and work toward a resolution.",
    example:
      "Your company is choosing between two catering options for an event. Present the case for one option and respond to objections from a colleague who prefers the other. After discussing, reach a joint recommendation.",
    skills:
      "Sustained argumentation, counterargument, reasoning, and collaborative resolution.",
  },
];

const warmUpIndicators = [
  "Use a micro-scenario related to the main task.",
  "Keep the warm-up concrete and connected to the lesson.",
  "Use it to gauge the student's fluency and confidence today.",
  "Notice whether the student needs more scaffolding or is ready for a greater challenge.",
];

const adjustmentLevers = [
  {
    title: "Input",
    description:
      "Change how you present the task. Speak more slowly, rephrase your side of the dialogue, or add a visual or written prompt.",
  },
  {
    title: "Constraint",
    description:
      "Change the difficulty of the task itself. Simplify the goal, remove a variable, or add a complication if the student is coasting.",
  },
  {
    title: "Output expectation",
    description:
      "Change how much the student is expected to produce. Accept shorter responses when they are struggling, or push for more elaboration when they are ready.",
  },
];

const scenarioExamples = [
  {
    title: "Making Plans with a Friend",
    levels: [
      {
        level: "A2",
        text: "Your friend wants to go to the cinema on Saturday. You want to go, but you're busy in the morning. Agree on a time.",
      },
      {
        level: "B1",
        text: "Your friend suggests seeing a movie this weekend, but you've heard mixed reviews. Ask your friend why they want to see it, share your concerns, and decide together whether to go or do something else.",
      },
      {
        level: "B2",
        text: "You and a friend are planning a weekend together but have very different ideas about what's fun. One of you prefers cultural activities; the other prefers outdoor adventures. Discuss your preferences, acknowledge each other's points, and design a compromise weekend plan.",
      },
    ],
  },
  {
    title: "A Problem at Work",
    levels: [
      {
        level: "A2",
        text: "Your computer isn't working. Ask your colleague for help. Describe the problem simply.",
      },
      {
        level: "B1",
        text: "You've noticed a recurring problem with a process at work. Explain the problem to your manager, suggest a solution, and respond to their questions.",
      },
      {
        level: "B2",
        text: "Two departments disagree about how to handle a workflow issue. You represent one side. Present your position, respond to objections, and work toward a compromise.",
      },
    ],
  },
];

const commonMistakes = [
  {
    title: "Treating CEFR as a rigid sorting hat",
    description:
      "Levels are ranges, not fixed categories. A student might be B1 in familiar topics and A2 in unfamiliar ones. Use descriptors as guides, not gates.",
  },
  {
    title: "Over-prepping to compensate for uncertainty",
    description:
      "If you spend 45 minutes preparing a 30-minute lesson, the issue is often the design process rather than effort. A short framework with clear constraints can be more useful than an elaborate lesson plan.",
  },
  {
    title: "Confusing silence with failure",
    description:
      "Processing time is not necessarily shutdown. A2 and B1 learners may need several seconds to formulate a response. Jumping in too quickly can remove useful productive struggle.",
  },
  {
    title: "Recycling prompts without recalibrating",
    description:
      "Using the same prompt as a student progresses from A2 to B1 can reinforce the same interaction habits. Revisit the same scenario with a new constraint instead.",
  },
];

const sourceLinks = [
  {
    title: "Council of Europe: CEFR Framework",
    href: "https://rm.coe.int/common-european-framework-of-reference-for-languages-learning-teaching/16802fc1bf",
  },
  {
    title: "European Commission: Using the CEFR in the Classroom",
    href: "https://school-education.ec.europa.eu/en/discover/news/step-step-using-cefr-classroom",
  },
  {
    title: "Council of Europe: CEFR Self-Assessment Grid",
    href: "https://www.coe.int/en/web/common-european-framework-reference-languages/table-2-cefr-3.3-common-reference-levels-self-assessment-grid",
  },
  {
    title: "Council of Europe: CEFR Companion Volume",
    href: "https://rm.coe.int/common-european-framework-of-reference-for-languages-learning-teaching/16809ea0d4",
  },
  {
    title: "Learner Corpus Study",
    href: "https://pubmed.ncbi.nlm.nih.gov/41452080/",
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

            <span>CEFR Discussion Prompts</span>
          </nav>

          <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
            <span className="rounded-full border bg-card px-3 py-1">
              A2–B2
            </span>

            <span className="rounded-full border bg-card px-3 py-1">
              Lesson Planning
            </span>

            <span className="rounded-full border bg-card px-3 py-1">
              Speaking
            </span>

            <span className="rounded-full border bg-card px-3 py-1">
              Adult ESL
            </span>
          </div>

          <h1 className="border-b pb-3 text-4xl leading-tight">
            CEFR Levels: Designing Discussion Prompts for A2–B2
          </h1>

          <p className="max-w-3xl text-lg text-muted-foreground">
            Learn how discussion prompts must shift across CEFR levels A2
            through B2 to match real learner capabilities. This guide helps ESL
            tutors replace generic topics with scenario-grounded conversation
            tasks calibrated to where adult students actually stall.
          </p>
        </header>

        {/* TL;DR */}
        <section className="space-y-5">
          <h2 className="border-b pb-2 text-2xl">
            TL;DR
          </h2>

          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <Check
                className="mt-0.5 flex-shrink-0 text-green-500"
                size={19}
              />

              <span>
                <strong>Generic discussion prompts break down between A2 and B2.</strong>{" "}
                CEFR levels represent different kinds of interaction, not just
                different vocabulary sizes. The same topic needs different task
                structures at each level.
              </span>
            </li>

            <li className="flex items-start gap-3">
              <Check
                className="mt-0.5 flex-shrink-0 text-green-500"
                size={19}
              />

              <span>
                <strong>Anchor every lesson to a real scenario.</strong>{" "}
                Concrete situations from a student's life create motivation and
                give the conversation a natural structure that abstract topics
                often lack.
              </span>
            </li>

            <li className="flex items-start gap-3">
              <Check
                className="mt-0.5 flex-shrink-0 text-green-500"
                size={19}
              />

              <span>
                <strong>Design constraints, not topics.</strong>{" "}
                Roles, goals, and information gaps are what elicit
                level-appropriate interaction. Change the constraint to change
                the difficulty without needing a new topic.
              </span>
            </li>

            <li className="flex items-start gap-3">
              <Check
                className="mt-0.5 flex-shrink-0 text-green-500"
                size={19}
              />

              <span>
                <strong>Keep teacher instructions short.</strong>{" "}
                Target language, intervention triggers, and a success picture
                can replace lengthy lesson plans.
              </span>
            </li>

            <li className="flex items-start gap-3">
              <Check
                className="mt-0.5 flex-shrink-0 text-green-500"
                size={19}
              />

              <span>
                <strong>Adjust one lever at a time.</strong>{" "}
                If a task isn't working, change the input, constraint, or output
                expectation rather than changing everything at once.
              </span>
            </li>
          </ul>
        </section>

        {/* Guide Orientation */}
        <section className="space-y-4">
          <h2 className="border-b pb-2 text-2xl">
            Guide Orientation
          </h2>

          <p>
            This guide is for independent online ESL tutors who teach adult
            learners between A2 and B2 and want to run engaging conversation
            lessons without spending hours sourcing and adapting material.
          </p>

          <p>
            If you've ever pulled up a discussion prompt only to watch it land
            flat because it was too open for your A2 student or too shallow for
            your B1 learner, this guide is for you.
          </p>

          <p>
            By the end, you'll understand how discussion prompts need to shift
            across CEFR levels, why generic prompts fail at the
            beginner-to-intermediate range, and how to build or choose
            scenario-grounded conversation tasks that match where your students
            actually are.
          </p>

          <div className="rounded-md border bg-card p-5">
            <strong className="block text-lg">This guide focuses on</strong>

            <ul className="mt-3 space-y-2">
              <li className="flex items-start gap-2">
                <Check
                  className="mt-0.5 text-green-500"
                  size={18}
                />
                Spoken interaction for adult learners
              </li>

              <li className="flex items-start gap-2">
                <Check
                  className="mt-0.5 text-green-500"
                  size={18}
                />
                One-to-one and small-group teaching
              </li>

              <li className="flex items-start gap-2">
                <Check
                  className="mt-0.5 text-green-500"
                  size={18}
                />
                A2, B1, and B2 learners
              </li>

              <li className="flex items-start gap-2">
                <Check
                  className="mt-0.5 text-green-500"
                  size={18}
                />
                Practical lesson and discussion task design
              </li>
            </ul>
          </div>
        </section>

        {/* Why prompts matter */}
        <section className="space-y-4">
          <h2 className="border-b pb-2 text-2xl">
            Why Level-Appropriate Discussion Prompts Matter
          </h2>

          <p>
            Here's a scenario most tutors recognize: you find a conversation
            topic like "Talk about your ideal vacation." You use it with an A2
            student who manages three short sentences before stalling. Later,
            you use the same prompt with a B1 student who gives a decent answer
            but never really stretches.
          </p>

          <p>
            The topic was fine. The prompt design was the problem.
          </p>

          <p>
            The gap between A2 and B2 isn't just about vocabulary size.
            According to the{" "}
            <a
              href="https://rm.coe.int/common-european-framework-of-reference-for-languages-learning-teaching/16802fc1bf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink-500 hover:underline"
            >
              Council of Europe's CEFR framework
            </a>
            , these levels represent qualitatively different interaction
            abilities.
          </p>

          <p>
            A2 learners handle simple everyday exchanges. B1 learners begin
            managing turn-taking and checking understanding. B2 learners can
            initiate, sustain, and close conversations while reasoning about
            more abstract topics.
          </p>

          <p>
            A prompt that ignores these distinctions wastes lesson time and can
            quietly erode student confidence.
          </p>

          <p>
            For tutors, the cost is double. You spend prep time hunting for
            material, then spend lesson time compensating when that material
            doesn't fit.
          </p>

          <p>
            The{" "}
            <a
              href="https://school-education.ec.europa.eu/en/discover/news/step-step-using-cefr-classroom"
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink-500 hover:underline"
            >
              European Commission's guidance on using the CEFR in classrooms
            </a>{" "}
            recommends selecting target descriptors and refining them into
            communicative aims rather than simply reusing the same prompts
            across levels.
          </p>

          <p>
            This isn't about adding complexity for its own sake. It's about
            designing conversation tasks that meet your student where their
            confidence actually breaks down.
          </p>
        </section>

        {/* Core Concepts */}
        <section className="space-y-5">
          <h2 className="border-b pb-2 text-2xl">
            Core Concepts: What Changes Between CEFR Levels?
          </h2>

          <h3 className="text-xl font-semibold">
            It's Not "Harder Vocabulary on the Same Topic"
          </h3>

          <p>
            A common misconception about CEFR levels is that moving from A2 to
            B2 simply means discussing the same things with bigger words.
          </p>

          <p>
            In reality, the{" "}
            <a
              href="https://www.coe.int/en/web/common-european-framework-reference-languages/table-2-cefr-3.3-common-reference-levels-self-assessment-grid"
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink-500 hover:underline"
            >
              CEFR self-assessment grid
            </a>{" "}
            covers 34 scales across skills, and the spoken interaction
            descriptors reveal a shift in what learners can do with language,
            not just what language they know.
          </p>

          <h3 className="text-xl font-semibold">
            Three Dimensions That Actually Shift
          </h3>

          <div className="grid gap-4 md:grid-cols-3">
            {interactionDimensions.map((dimension) => (
              <div
                key={dimension.title}
                className="rounded-md border bg-card p-5"
              >
                <strong className="text-lg">
                  {dimension.title}
                </strong>

                <p className="mt-3 text-sm text-muted-foreground">
                  {dimension.description}
                </p>
              </div>
            ))}
          </div>

          <h3 className="text-xl font-semibold">
            Why This Matters for Prompt Design
          </h3>

          <p>
            When you understand these three dimensions, you stop asking "What
            topic should I use?" and start asking "What kind of interaction am
            I trying to elicit?"
          </p>

          <p>
            The topic can stay the same. The task structure is what needs to
            change. This is the core principle behind everything that follows.
          </p>
        </section>

        {/* Framework */}
        <section className="space-y-5">
          <h2 className="border-b pb-2 text-2xl">
            The Framework: Scenario-Grounded Task Calibration
          </h2>

          <p>
            Instead of browsing activity banks for "interesting topics," use a
            four-stage approach to building or selecting conversation tasks
            that match your student's actual interaction level.
          </p>

          <div className="grid gap-4 md:grid-cols-2">
            {frameworkStages.map((stage) => (
              <div
                key={stage.number}
                className="rounded-md border bg-card p-5"
              >
                <span className="text-sm font-medium text-pink-500">
                  {stage.number}
                </span>

                <h3 className="mt-1 text-lg font-semibold">
                  {stage.title}
                </h3>

                <p className="mt-3 text-sm text-muted-foreground">
                  {stage.description}
                </p>
              </div>
            ))}
          </div>

          <p>
            These stages interconnect. The scenario gives context. The
            interaction band tells you how complex the task should be. The
            constraint keeps the student in productive difficulty. The teacher
            instructions keep you from over-scaffolding or under-supporting.
          </p>
        </section>

        {/* Step 1 */}
        <section className="space-y-4">
          <h2 className="border-b pb-2 text-2xl">
            Step 1: Anchor to a Real Scenario
          </h2>

          <p>
            <strong>Objective:</strong> Select a situation your student
            recognizes and cares about, so motivation is built into the task
            from the start.
          </p>

          <p>
            Generic topics such as "Talk about travel" or "Discuss technology"
            feel safe, but they give students no entry point.
          </p>

          <p>
            A scenario is different. It places the learner inside a specific
            moment: you're at a work lunch and someone asks what you did last
            weekend. You're checking into a hotel and something is wrong with
            your room. You're at a networking event and need to introduce
            yourself to a stranger.
          </p>

          <p>
            The best scenarios come from your student's life. Ask during intake
            or early lessons: Where do you use English? Where do you wish you
            could?
          </p>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-md border bg-card p-5">
              <strong>Anti-patterns</strong>

              <p className="mt-2 text-sm text-muted-foreground">
                Avoid scenarios that are too exotic or hypothetical for your
                student's context, such as being stranded on a desert island.
                Also avoid scenarios so broad they could mean anything, such as
                "a conversation at work."
              </p>
            </div>

            <div className="rounded-md border bg-card p-5">
              <strong>Success indicators</strong>

              <p className="mt-2 text-sm text-muted-foreground">
                Your student can picture the scenario without explanation. They
                say something like "Oh yes, this happens to me" or "I need
                this." If you need more than about 30 seconds to set the scene,
                the scenario may be too abstract.
              </p>
            </div>
          </div>
        </section>

        {/* Step 2 */}
        <section className="space-y-4">
          <h2 className="border-b pb-2 text-2xl">
            Step 2: Identify the Interaction Band
          </h2>

          <p>
            <strong>Objective:</strong> Match the task complexity to what your
            student can do with spoken interaction right now, using CEFR
            interaction descriptors as your guide.
          </p>

          <p>
            This is where many discussion prompts go wrong. The{" "}
            <a
              href="https://rm.coe.int/common-european-framework-of-reference-for-languages-learning-teaching/16802fc1bf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink-500 hover:underline"
            >
              CEFR describes A2 spoken interaction
            </a>{" "}
            as being able to make and respond to suggestions, agree and
            disagree, and discuss everyday practical issues when addressed
            clearly, slowly, and directly.
          </p>

          <p>
            At B1, the picture shifts. The{" "}
            <a
              href="https://rm.coe.int/common-european-framework-of-reference-for-languages-learning-teaching/16809ea0d4"
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink-500 hover:underline"
            >
              CEFR describes B1 spoken interaction
            </a>{" "}
            as being able to allocate turns in discussion, ask others to
            elaborate, and check understanding of concepts that have been
            explained.
          </p>

          <p>
            At B2, the descriptors shift again: learners can initiate, maintain,
            and close face-to-face conversation, give directions in a
            collaborative task, and discuss complex abstract topics by
            targeting questions and encouraging reasoning.
          </p>

          <div className="rounded-md border bg-card p-5">
            <strong>Quick test</strong>

            <p className="mt-2 text-muted-foreground">
              You should be able to articulate in one sentence what kind of
              interaction you're targeting.
            </p>

            <ul className="mt-3 list-disc space-y-2 pl-5 text-muted-foreground">
              <li>
                A2: "I want my student to practise agreeing and disagreeing
                about a practical decision."
              </li>
              <li>
                B1: "I want my student to practise asking follow-up questions
                and checking understanding."
              </li>
              <li>
                B2: "I want my student to practise sustaining a discussion,
                reasoning, and responding to opposing views."
              </li>
            </ul>
          </div>
        </section>

        {/* Step 3 */}
        <section className="space-y-4">
          <h2 className="border-b pb-2 text-2xl">
            Step 3: Design the Task Constraint
          </h2>

          <p>
            <strong>Objective:</strong> Build boundaries into the prompt that
            keep the student in the productive zone between comfort and
            confusion.
          </p>

          <p>
            A constraint is anything that shapes what the student does with the
            scenario.
          </p>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-md border bg-card p-5">
              <strong className="text-lg">
                Topic
              </strong>

              <p className="mt-3 text-sm text-muted-foreground">
                "Talk about restaurants."
              </p>
            </div>

            <div className="rounded-md border bg-card p-5">
              <strong className="text-lg">
                Constrained task
              </strong>

              <p className="mt-3 text-sm text-muted-foreground">
                "You and your colleague are choosing a restaurant for a team
                lunch. One of you prefers something cheap and nearby. The other
                wants somewhere nicer, even if it's farther. Decide together."
              </p>
            </div>
          </div>

          <p>
            The second version gives both speakers a position, a goal, and a
            natural reason to negotiate. It works at A2 because the language
            stays concrete and the roles are clear.
          </p>

          <div className="rounded-md border bg-card p-5">
            <strong>Find the sweet spot</strong>

            <p className="mt-2 text-muted-foreground">
              Avoid constraints so tight they become a script. Avoid
              constraints so loose that they're really just topics in disguise.
              The sweet spot is a clear situation with a clear goal but no
              predetermined language.
            </p>
          </div>
        </section>

        {/* Step 4 */}
        <section className="space-y-4">
          <h2 className="border-b pb-2 text-2xl">
            Step 4: Layer Your Teacher Instructions
          </h2>

          <p>
            <strong>Objective:</strong> Give yourself a concise reference for
            what to listen for, when to intervene, and what "good enough" looks
            like.
          </p>

          <p>
            Your teacher instructions don't need to be a full lesson plan. They
            need three things: a target language note, an intervention trigger,
            and a success picture.
          </p>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-md border bg-card p-5">
              <strong>Target language</strong>

              <p className="mt-2 text-sm text-muted-foreground">
                What structures or communicative functions do you expect to
                hear?
              </p>
            </div>

            <div className="rounded-md border bg-card p-5">
              <strong>Intervention trigger</strong>

              <p className="mt-2 text-sm text-muted-foreground">
                What signals that the student needs help?
              </p>
            </div>

            <div className="rounded-md border bg-card p-5">
              <strong>Success picture</strong>

              <p className="mt-2 text-sm text-muted-foreground">
                What should the interaction look like when it is working?
              </p>
            </div>
          </div>

          <div className="rounded-md border bg-card p-5">
            <strong>A2 example</strong>

            <p className="mt-3 text-muted-foreground">
              Target language: suggesting ("How about...", "Why don't we..."),
              agreeing and disagreeing ("That's a good idea," "I'm not sure").
              Intervene if the student switches to L1 for more than one phrase
              or goes silent for more than five seconds.
            </p>

            <p className="mt-3 text-muted-foreground">
              Success: the student makes at least two suggestions and responds
              to at least two suggestions.
            </p>
          </div>

          <p>
            This kind of lightweight planning is where platforms like{" "}
            <a
              href="https://www.synomilo.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink-500 hover:underline"
            >
              Synomilo
            </a>{" "}
            can save real time. Synomilo's native-written dialogues are built
            around practical scenarios such as networking, social interactions,
            and everyday situations, giving tutors a starting point for
            scenario-grounded conversation practice.
          </p>

          <div className="flex items-start gap-3 rounded-md bg-muted p-5">
            <Lightbulb
              className="mt-0.5 flex-shrink-0 text-yellow-500"
              size={22}
            />

            <p>
              Keep your teacher instructions short. If your notes are longer
              than a few bullet points, you're probably over-planning.
            </p>
          </div>
        </section>

        {/* Step 5 */}
        <section className="space-y-4">
          <h2 className="border-b pb-2 text-2xl">
            Step 5: Run the Warm-Up as a Confidence Check
          </h2>

          <p>
            <strong>Objective:</strong> Use the first two minutes of the lesson
            to gauge where your student is today, not where they were last
            week.
          </p>

          <p>
            Adult learners' confidence and fluency fluctuate. A student who
            managed B1-level interaction on Thursday might show up on Monday
            tired, stressed, or rusty.
          </p>

          <p>
            Instead of generic "How was your weekend?" small talk, use a
            micro-scenario related to the lesson's main task.
          </p>

          <div className="rounded-md border bg-card p-5">
            <strong>Example</strong>

            <p className="mt-2 text-muted-foreground">
              If the main task is about recommending restaurants, the warm-up
              might be: "What did you eat for lunch today? Was it good?"
            </p>

            <p className="mt-3 text-muted-foreground">
              Keep it simple and concrete. The goal is to see how freely the
              student is producing language and how much scaffolding they need
              today.
            </p>
          </div>

          <ul className="space-y-3">
            {warmUpIndicators.map((indicator) => (
              <li
                key={indicator}
                className="flex items-start gap-2"
              >
                <Check
                  className="mt-0.5 flex-shrink-0 text-green-500"
                  size={18}
                />
                {indicator}
              </li>
            ))}
          </ul>
        </section>

        {/* Step 6 */}
        <section className="space-y-5">
          <h2 className="border-b pb-2 text-2xl">
            Step 6: Adapt in Real Time Without Losing Structure
          </h2>

          <p>
            <strong>Objective:</strong> Make mid-lesson adjustments that keep
            the student in productive difficulty without abandoning your task
            design.
          </p>

          <p>
            Even with good preparation, lessons sometimes need adjustment. The
            key is knowing your adjustment levers.
          </p>

          <div className="grid gap-4 md:grid-cols-3">
            {adjustmentLevers.map((lever) => (
              <div
                key={lever.title}
                className="rounded-md border bg-card p-5"
              >
                <strong className="text-lg">
                  {lever.title}
                </strong>

                <p className="mt-3 text-sm text-muted-foreground">
                  {lever.description}
                </p>
              </div>
            ))}
          </div>

          <p>
            For A2 students who freeze, the most effective lever is often
            input: slow down, use shorter sentences, and offer a choice rather
            than an open question.
          </p>

          <p>
            For B1 students who are coasting, the best lever is often the
            constraint: introduce an unexpected detail that forces them to
            adjust.
          </p>

          <p>
            <a
              href="https://www.synomilo.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink-500 hover:underline"
            >
              Synomilo
            </a>{" "}
            can also work as a fallback or supplement here. If a student is
            struggling with a task you've designed, a related scenario-based
            dialogue can provide model language before they try again.
          </p>

          <div className="flex items-start gap-3 rounded-md border bg-card p-4">
            <Lightbulb
              className="mt-0.5 flex-shrink-0 text-yellow-500"
              size={20}
            />

            <div>
              <strong>One lever at a time</strong>

              <p className="mt-2 text-muted-foreground">
                Don't change input, constraint, and output expectation all at
                once. Change one thing and see what happens.
              </p>
            </div>
          </div>
        </section>

        {/* Practical Examples */}
        <section className="space-y-5">
          <h2 className="border-b pb-2 text-2xl">
            Practical Examples: Same Topic, Three Levels
          </h2>

          <p>
            Notice that the topic can stay almost identical while the
            interaction changes significantly.
          </p>

          {scenarioExamples.map((scenario) => (
            <div
              key={scenario.title}
              className="space-y-4 rounded-md border bg-card p-5"
            >
              <h3 className="text-xl font-semibold">
                Scenario: {scenario.title}
              </h3>

              {scenario.levels.map((item) => (
                <div
                  key={item.level}
                  className="border-t pt-4 first:border-t-0 first:pt-0"
                >
                  <div className="flex items-center gap-2">
                    <span className="rounded-full border px-3 py-1 text-sm">
                      {item.level}
                    </span>
                  </div>

                  <p className="mt-3">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          ))}

          <div className="rounded-md border bg-muted p-5">
            <strong>What changes?</strong>

            <p className="mt-2 text-muted-foreground">
              At A2, the student needs concrete language, clear roles, and a
              manageable goal. At B1, the task introduces follow-up questions,
              explanations, and adaptation. At B2, the student must sustain
              reasoning, respond to opposing views, and work toward a
              resolution.
            </p>
          </div>
        </section>

        {/* CEFR Restaurant Examples */}
        <section className="space-y-5">
          <h2 className="border-b pb-2 text-2xl">
            One Scenario, Three Interaction Levels
          </h2>

          <div className="grid gap-4 md:grid-cols-3">
            {levelExamples.map((example) => (
              <div
                key={example.level}
                className="rounded-md border bg-card p-5"
              >
                <span className="text-sm font-medium text-pink-500">
                  {example.level}
                </span>

                <h3 className="mt-1 text-lg font-semibold">
                  {example.title}
                </h3>

                <p className="mt-3 text-sm text-muted-foreground">
                  {example.description}
                </p>

                <div className="mt-4 rounded-md bg-muted p-3">
                  <strong className="text-sm">
                    Example task
                  </strong>

                  <p className="mt-2 text-sm text-muted-foreground">
                    {example.example}
                  </p>
                </div>

                <p className="mt-4 text-sm">
                  <strong>Practises:</strong> {example.skills}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Common Mistakes */}
        <section className="space-y-5">
          <h2 className="border-b pb-2 text-2xl">
            Common Mistakes and Pitfalls
          </h2>

          <div className="grid gap-4 md:grid-cols-2">
            {commonMistakes.map((mistake) => (
              <div
                key={mistake.title}
                className="rounded-md border bg-card p-5"
              >
                <strong>
                  {mistake.title}
                </strong>

                <p className="mt-2 text-sm text-muted-foreground">
                  {mistake.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* What to Do Next */}
        <section className="space-y-4">
          <h2 className="border-b pb-2 text-2xl">
            What to Do Next
          </h2>

          <p>
            Pick one student you're teaching this week. Before the lesson,
            spend five minutes running through the four stages: choose a
            scenario from their life, identify the interaction band, write one
            constrained prompt, and jot down three bullet points of teacher
            instructions.
          </p>

          <p>
            That's it. See how the lesson feels compared to your usual
            approach.
          </p>

          <div className="rounded-md border bg-card p-5">
            <strong>Build your own task library</strong>

            <p className="mt-2 text-muted-foreground">
              If the task lands well, save your notes. Over a few weeks, you'll
              build a personal library of scenario-grounded tasks calibrated to
              your specific students, which is more valuable than a generic
              activity bank.
            </p>
          </div>

          <p>
            If it doesn't land perfectly, adjust one lever and try again. The
            framework improves with use, not with perfection on the first
            attempt.
          </p>

          <p>
            You don't need to overhaul your teaching. You need a sharper lens
            for matching conversation tasks to where your students actually
            are. Start with one lesson, and let the results guide what comes
            next.
          </p>
        </section>

        {/* FAQ */}
        <section className="space-y-5">
          <h2 className="border-b pb-2 text-2xl">
            Frequently Asked Questions
          </h2>

          <div className="space-y-5">
            <div>
              <h3 className="text-lg font-semibold">
                What are ESL conversation lesson blueprints?
              </h3>

              <p className="mt-2 text-muted-foreground">
                A conversation lesson blueprint is a reusable task structure
                built around a real-world scenario, with constraints calibrated
                to a specific interaction level. Unlike a full lesson plan,
                it's lightweight: a scenario, a task goal, and a few notes on
                what to listen for.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold">
                How can I adapt ESL conversation lessons for online teaching?
              </h3>

              <p className="mt-2 text-muted-foreground">
                The scenario-grounded approach works well online because it
                doesn't depend on physical materials. Describe the scenario
                verbally, share key vocabulary in the chat, and run the task
                through conversation. For one-to-one online lessons, you can
                play one role in the scenario yourself.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold">
                When should I use warm-up activities in ESL speaking lessons?
              </h3>

              <p className="mt-2 text-muted-foreground">
                Keep them short, around two to three minutes, and connected to
                the main task. A warm-up activates relevant vocabulary and gives
                you a real-time read on the student's fluency and confidence
                that day.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold">
                How do I create a communicative goal for ESL conversation
                activities?
              </h3>

              <p className="mt-2 text-muted-foreground">
                Start with the CEFR interaction descriptors for your student's
                level and translate the descriptor into a concrete outcome. For
                example, "can ask others to elaborate" can become "student asks
                at least three follow-up questions during the task."
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold">
                Why do the same discussion prompts fail at different CEFR
                levels?
              </h3>

              <p className="mt-2 text-muted-foreground">
                Because CEFR levels represent different kinds of interaction,
                not just different vocabulary sizes. An A2 learner can handle a
                simple exchange with clear roles. A B1 learner can manage
                turn-taking and clarification. A B2 learner can sustain
                abstract discussion.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold">
                How much prep time should a conversation lesson actually take?
              </h3>

              <p className="mt-2 text-muted-foreground">
                With a clear framework, five to ten minutes is realistic for
                most lessons. Most of that time goes to choosing a scenario and
                writing the task constraint. A reusable structure should reduce
                the need to design every lesson from scratch.
              </p>
            </div>
          </div>
        </section>

        {/* Sources */}
        <section className="space-y-4">
          <h2 className="border-b pb-2 text-2xl">
            Sources
          </h2>

          <p className="text-sm text-muted-foreground">
            The following sources informed the CEFR and classroom guidance
            discussed in this guide.
          </p>

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
            Back to all Synomilo guides
          </Link>
        </footer>
      </article>
    </div>
  );
}