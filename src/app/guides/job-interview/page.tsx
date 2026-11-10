import GuideArticle from "@/components/guides/GuideArticle";
import styles from "@/components/guides/guide-article.module.css";
import { ArrowLeft, ArrowRight, Lightbulb } from "lucide-react";
import Link from "next/link";


/* eslint react/no-unescaped-entities: 0 */

const conversationHref = "/home/conversations/69a3093fb5ff6367494c";

export const metadata = {
  title:
    "B2 Job Interview ESL Lesson: Questions, Vocabulary and Role-Play | Synomilo",
  description:
    "A ready-to-use B2 job interview ESL lesson with vocabulary, comprehension questions, discussion prompts, role-play activities, and homework.",
  alternates: { canonical: "/guides/job-interview" },
  openGraph: {
    title: "B2 Job Interview ESL Lesson | Synomilo",
    description:
      "Teach job interview English with vocabulary, questions, role-play activities, and homework for B2 learners.",
    url: "/guides/job-interview",
    type: "article",
  },
};

const keyVocabulary = [
  {
    term: "candidate",
    meaning: "A person who is applying for a job.",
  },
  {
    term: "front-end developer",
    meaning:
      "A programmer who builds the parts of a website or app that users see.",
  },
  {
    term: "prioritize",
    meaning: "To decide which tasks are most important and do them first.",
  },
  {
    term: "deadline",
    meaning: "The latest time or date by which something must be finished.",
  },
  {
    term: "cultural fit",
    meaning:
      "How well a person's values and way of working match a company's.",
  },
  {
    term: "technical interview",
    meaning: "An interview that tests the practical skills a job needs.",
  },
];

const expressions = [
  {
    expression: "catch someone's attention",
    meaning: "to make someone notice or become interested",
  },
  {
    expression: "push yourself further",
    meaning: "to challenge yourself to do more",
  },
  {
    expression: "calm under pressure",
    meaning: "able to think clearly in a stressful situation",
  },
  {
    expression: "stay aligned",
    meaning: "to keep sharing the same goals and priorities",
  },
  {
    expression: "bite off more than you can chew",
    meaning: "to take on more than you can manage",
  },
  {
    expression: "hit the ground running",
    meaning: "to work effectively from the very start",
  },
  {
    expression: "add value",
    meaning: "to make a useful contribution",
  },
];

const comprehensionQuestions = [
  "What position is Daniel interviewing for, and how much experience does he have?",
  "What did Daniel do in his previous role?",
  "Why did Daniel decide to leave his last job?",
  "Which strengths does Daniel mention?",
  "What weakness does Daniel describe, and what is he doing about it?",
  "How does Daniel deal with tight deadlines?",
  "Where would Daniel like to be in five years?",
  "What happens in the next two interview rounds?",
];

const interviewQuestions = [
  "Can you tell me a bit about yourself?",
  "Why did you leave your last job?",
  "What would you say your strengths are?",
  "What are your weaknesses?",
  "How do you handle pressure?",
  "Why are you the right fit for this position?",
  "Where do you see yourself in five years?",
  "Do you have any questions for us?",
];

const discussionQuestions = [
  "What is the most difficult interview question to answer well?",
  "Is it a good idea to memorise answers before an interview?",
  "Should candidates always be completely honest about their weaknesses?",
  "What matters more: qualifications, experience or personality?",
  "How important is cultural fit when choosing a new employee?",
  "Would you prefer an online interview or an in-person one? Why?",
];

type relatedGuides = {
  title: string;
  href: string;
};

const relatedGuides: relatedGuides[] = [
  {
    title: "Nursing Job Interview: B2 English Conversation",
    href: "/guides/job-interview-nursing",
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
            <span>Job Interview ESL Lesson</span>
          </nav>

          <div className={styles.meta}>
            <span className={styles.tag}>B2</span>
            <span className={styles.tag}>Business English</span>
            <span className={styles.tag}>Job Interviews</span>
          </div>

          <h1 >
            Job Interview English: B2 ESL Lesson
          </h1>

          <p className={styles.muted}>
            Daniel is interviewing for a front-end developer role. Miranda
            takes him through the standard first-round questions: his
            background, why he left his last job, his strengths and
            weaknesses, and where he sees himself in five years.
          </p>
        </header>

        {/* Conversation first */}
        <section >
          <h2 >From the Conversation</h2>

          <p>
            The interview starts with the question almost every interview
            starts with.
          </p>

          <div className={styles.card}>
            <p><strong>Miranda:</strong> Sounds fantastic, right then, let's start with the basics, shall we? Can you tell me a bit about yourself?</p>
            <p><strong>Daniel:</strong> Absolutely. I'm a front-end developer with about five years of experience. I began working on smaller projects, mainly building responsive interfaces, and gradually moved on to more complex applications. In my last role, I led a small team and focused on improving performance and user experience.</p>
            <p className={styles.muted}>…</p>
            <p><strong>Miranda:</strong> Sounds great. Why did you leave your last job?</p>
          </div>

          <p>
            Before students see Daniel's answer, ask them how they would
            answer without criticising their old employer. Then compare
            their answers with his.
          </p>

          <p>
            Anyone can read the full conversation, with highlighted
            vocabulary. Audio is part of Plus.
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
            Words that come up in the interview. Pre-teach them before
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
            Daniel also uses a number of workplace expressions to talk about
            himself. Some of them:
          </p>

          <ul >
            {expressions.map((item) => (
              <li key={item.expression}>
                <strong>{item.expression}</strong>: {item.meaning}
              </li>
            ))}
          </ul>

          <p className={styles.muted}>
            The conversation highlights 20 expressions in total.
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
              Open the conversation
            </Link>
          </p>
        </section>

        {/* Language point */}
        <section >
          <h2 >Developing an Answer</h2>

          <p>
            Short answers make a candidate sound unprepared. Daniel rarely
            stops after one sentence: he says what he means, gives a reason,
            and adds an example from his last job.
          </p>

          <div className={styles.card}>
            <strong className={styles.block}>Short</strong>
            <p className={styles.muted + " " + styles.spaced}>
              "I'm organised."
            </p>

            <strong className={styles.block + " " + styles.spaced}>Developed</strong>
            <p className={styles.muted + " " + styles.spaced}>
              "I'd say I'm organised. I plan my workload carefully and decide
              which tasks are most urgent. In my last role, that helped the
              team meet tight deadlines without lowering the quality of our
              work."
            </p>
          </div>

          <div className={styles.callout}>
            <Lightbulb className={styles.icon} size={20} />

            <div>
              <strong>A pattern students can reuse</strong>

              <p className={styles.muted + " " + styles.spaced}>
                Statement · Reason · Example · Connection to the role
              </p>
            </div>
          </div>
        </section>

        {/* Speaking */}
        <section >
          <h2 >Speaking: Mock Interview</h2>

          <p>
            In pairs, students choose a job and one plays the interviewer.
            The interviewer asks four of the questions below and one
            follow-up question after each answer. The candidate develops
            each answer using the pattern above. Then swap, with a different
            job.
          </p>

          <ol >
            {interviewQuestions.map((question) => (
              <li key={question}>{question}</li>
            ))}
          </ol>

          <p>
            For homework, students can record a two-minute answer to "Tell
            me about yourself" for a real job advert, and review it in the
            next lesson.
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

          <p>
            For a healthcare version with scenario questions, see the{" "}
            <Link href="/guides/job-interview-nursing">nursing job interview</Link>.
          </p>
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
