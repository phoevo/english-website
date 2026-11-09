import GuideArticle from "@/components/guides/GuideArticle";
import styles from "@/components/guides/guide-article.module.css";
import { ArrowLeft, ArrowRight, Lightbulb } from "lucide-react";
import Link from "next/link";


/* eslint react/no-unescaped-entities: 0 */

const conversationHref = "/home/conversations/6ae34e1061747e118e0c";

export const metadata = {
  title:
    "Nursing Job Interview: B2 English Conversation and Teaching Notes | Synomilo",
  description:
    "A B2 English conversation in which a newly qualified nurse is interviewed for a hospital ward job, with vocabulary, scenario questions and classroom activities.",
  alternates: { canonical: "/guides/job-interview-nursing" },
  openGraph: {
    title: "Nursing Job Interview: B2 English Conversation | Synomilo",
    description:
      "A newly qualified nurse is interviewed for a hospital ward job. Vocabulary, scenario questions and classroom activities for B2 learners.",
    url: "/guides/job-interview-nursing",
    type: "article",
  },
};

const keyVocabulary = [
  {
    term: "ward manager",
    meaning: "The senior nurse who runs a hospital ward and its team.",
  },
  {
    term: "placement",
    meaning:
      "A period of practical training in a real workplace during a course.",
  },
  {
    term: "A&E",
    meaning:
      "Accident and Emergency: the hospital department for urgent cases.",
  },
  {
    term: "observations",
    meaning:
      "Regular checks of a patient's temperature, pulse, blood pressure and breathing.",
  },
  {
    term: "healthcare assistant",
    meaning:
      "A member of staff who supports nurses with basic patient care.",
  },
  {
    term: "discharge",
    meaning:
      "The process of allowing a patient to leave hospital and go home.",
  },
];

const expressions = [
  {
    expression: "cut your teeth",
    meaning: "to get your first real experience of a job",
  },
  {
    expression: "be thrown in at the deep end",
    meaning: "to face something difficult with little preparation",
  },
  {
    expression: "be hard on yourself",
    meaning: "to criticise yourself too much",
  },
  {
    expression: "speak up",
    meaning: "to tell someone clearly about a problem",
  },
  {
    expression: "turn a blind eye",
    meaning: "to pretend not to notice something wrong",
  },
  {
    expression: "clear the air",
    meaning: "to talk openly so bad feelings end",
  },
  {
    expression: "switch off",
    meaning: "to stop thinking about work and relax",
  },
];

const comprehensionQuestions = [
  "Where did Maria do her placements, and which one taught her the most?",
  "Why did Maria decide to become a nurse?",
  "How did Maria check that an anxious patient had understood her?",
  "In the busy shift scenario, what does Maria do first, second and third?",
  "What would Maria do if a patient refused their medication?",
  "How did Maria and another student resolve their disagreement?",
  "Why did Maria apply to this ward in particular?",
  "What does Maria find out about the shifts and the next steps?",
];

const discussionQuestions = [
  "What qualities make someone a good nurse?",
  "Why do healthcare interviews use so many \"What would you do if...\" questions?",
  "Should a patient always have the right to refuse treatment?",
  "How should you tell a colleague they are doing something unsafe?",
  "What can hospitals do to reduce burnout among staff?",
  "How is nursing seen as a profession in your country?",
];

const scenarioPrompts = [
  "A patient's relative becomes angry with you.",
  "You realise you gave a patient the wrong dose of a medicine.",
  "You don't know how to use a piece of equipment.",
  "A patient asks you to keep something from the doctor.",
  "You're asked to stay late at the end of a long shift.",
  "Two patients need you at the same time.",
];

type relatedGuides = {
  title: string;
  href: string;
};

const relatedGuides: relatedGuides[] = [
  {
    title: "Job Interview English: B2 ESL Guide",
    href: "/guides/job-interview",
  },
  {
    title: "Remote Work vs Office Work: B2 ESL Guide",
    href: "/guides/working-from-home-vs-the-office",
  },
];

export default function PostPage() {
  return (
    <GuideArticle relatedGuides={relatedGuides}>
        <header >
          <nav aria-label="Breadcrumb" className={styles.breadcrumb}>
            <Link href="/guides" >Guides</Link>
            <span className={styles.separator}>/</span>
            <span>Nursing Job Interview</span>
          </nav>

          <div className={styles.meta}>
            <span className={styles.tag}>B2</span>
            <span className={styles.tag}>Business English</span>
            <span className={styles.tag}>Healthcare</span>
            <span className={styles.tag}>Plus</span>
          </div>

          <h1 >
            Nursing Job Interview: B2 English Conversation
          </h1>

          <p className={styles.muted}>
            Maria has just qualified as a nurse and is interviewing for her
            first job on a hospital ward. Helen, the ward manager, asks about
            her training, then gives her a series of situations and asks what
            she would do.
          </p>
        </header>

        {/* Conversation first */}
        <section >
          <h2 >From the Conversation</h2>

          <p>
            The interview opens with Maria's training, then moves on to
            scenario questions. This is the first one.
          </p>

          <div className={styles.card}>
            <p><strong>Helen:</strong> So, can you start by telling me a bit about your training?</p>
            <p><strong>Maria:</strong> Sure. I finished my degree in June, and I got my registration in August. My placements were on a surgical ward, in a care home and in A&E. A&E was the last one, and that's really where I cut my teeth.</p>
            <p className={styles.muted}>…</p>
            <p><strong>Helen:</strong> Let's talk about a busy shift. You've got six patients. One is getting worse, a relative wants to speak to you, and two people are waiting for their medication. What do you do?</p>
          </div>

          <p>
            Before students see Maria's answer, ask them to put the three
            tasks in order and explain why. Then compare their order with
            hers.
          </p>

          <p>
            The full conversation is about 40 lines, with audio and
            highlighted vocabulary. It is part of Plus.
          </p>

          <Link href={conversationHref} target="_blank" rel="noopener noreferrer">
            <span className={styles.button}>
              Open the conversation
              <ArrowRight className={styles.iconInline} size={17} />
            </span>
          </Link>
        </section>

        {/* Vocabulary */}
        <section >
          <h2 >Vocabulary</h2>

          <p>
            Hospital terms that come up in the interview. Most learners
            outside healthcare won't know them, so pre-teach them before
            reading.
          </p>

          <div className={styles.vocabulary}>
            <div className={styles.vocabularyHeader}>
              <span>Word or phrase</span>
              <span>Meaning</span>
            </div>

            {keyVocabulary.map((item) => (
              <div key={item.term} className={styles.vocabularyRow}>
                <strong>{item.term}</strong>
                <span className={styles.muted}>{item.meaning}</span>
              </div>
            ))}
          </div>

          <p>
            Maria also uses a number of informal expressions to talk about
            herself and her colleagues. Some of them:
          </p>

          <ul >
            {expressions.map((item) => (
              <li key={item.expression}>
                <strong>{item.expression}</strong>: {item.meaning}
              </li>
            ))}
          </ul>

          <p className={styles.muted}>
            The conversation highlights 16 expressions in total.
          </p>
        </section>

        {/* Comprehension, next to the conversation link */}
        <section >
          <h2 >Comprehension Questions</h2>

          <p>
            For use after reading or listening to the full conversation.
          </p>

          <ol >
            {comprehensionQuestions.map((question) => (
              <li key={question}>{question}</li>
            ))}
          </ol>

          <p>
            <Link href={conversationHref} target="_blank" rel="noopener noreferrer">
              Open the conversation (Plus)
            </Link>
          </p>
        </section>

        {/* Language point */}
        <section >
          <h2 >Answering "What would you do if…?"</h2>

          <p>
            Helen's questions describe situations that haven't happened, so
            Maria answers with <em>I'd</em> rather than <em>I do</em>. She
            also puts her actions in order, and says who she would tell.
            Interviewers listen for both.
          </p>

          <div className={styles.callout}>
            <Lightbulb className={styles.icon} size={20} />

            <div>
              <strong>A pattern students can reuse</strong>

              <p className={styles.muted + " " + styles.spaced}>
                First, I'd… · Then I'd… · If that didn't work, I'd… · I'd
                tell / write it in…
              </p>
            </div>
          </div>
        </section>

        {/* Speaking */}
        <section >
          <h2 >Speaking: Scenario Interview</h2>

          <p>
            In pairs, one student plays the ward manager and the other the
            candidate. The manager reads out three of the situations below
            and asks one follow-up question after each answer, the way Helen
            does ("How did you know he understood?"). Then swap.
          </p>

          <ul >
            {scenarioPrompts.map((prompt) => (
              <li key={prompt}>{prompt}</li>
            ))}
          </ul>

          <p>
            Students who don't work in healthcare can invent a background
            for the candidate.
          </p>
        </section>

        {/* Discussion */}
        <section >
          <h2 >Discussion</h2>

          <ol >
            {discussionQuestions.map((question) => (
              <li key={question}>{question}</li>
            ))}
          </ol>
        </section>

        <footer >
          <Link href="/guides" >
            <ArrowLeft size={16} />
            Back to all Synomilo articles
          </Link>
        </footer>
    </GuideArticle>
  );
}
