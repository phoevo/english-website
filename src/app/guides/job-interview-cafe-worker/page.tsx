import GuideArticle from "@/components/guides/GuideArticle";
import styles from "@/components/guides/guide-article.module.css";
import { ArrowLeft, Lightbulb } from "lucide-react";
import Link from "next/link";
import GuidePlusCta from "@/components/guides/GuidePlusCta";


/* eslint react/no-unescaped-entities: 0 */


export const metadata = {
  title:
    "Café Job Interview: A2 English Conversation and Teaching Notes | Synomilo",
  description:
    "An A2 English conversation in which a café owner interviews someone for a part-time job, with vocabulary, polite questions and classroom activities.",
  alternates: { canonical: "/guides/job-interview-cafe-worker" },
  openGraph: {
    title: "Café Job Interview: A2 English Conversation | Synomilo",
    description:
      "A café owner interviews someone for a part-time job. Vocabulary, polite questions and role-play activities for A2 learners.",
    url: "/guides/job-interview-cafe-worker",
    type: "article",
  },
};

const keyVocabulary = [
  {
    term: "till",
    meaning: "The machine in a shop or café where customers pay.",
  },
  {
    term: "queue",
    meaning: "A line of people waiting for something.",
  },
  {
    term: "part-time",
    meaning: "Working only some hours of the week, not every day.",
  },
  {
    term: "tips",
    meaning: "Extra money that customers give to staff to say thank you.",
  },
  {
    term: "trial shift",
    meaning:
      "A short time working in a new job, so the employer can see how you work.",
  },
  {
    term: "apron",
    meaning: "A piece of clothing you wear over your clothes to keep them clean.",
  },
];

const expressions = [
  {
    expression: "that's me",
    meaning: "yes, I'm the person you're asking about",
  },
  {
    expression: "take orders",
    meaning: "to ask customers what they want and write it down",
  },
  {
    expression: "get the hang of it",
    meaning: "to learn how to do something after some practice",
  },
  {
    expression: "be paid by the hour",
    meaning: "to get money for each hour you work",
  },
  {
    expression: "by the way",
    meaning: "used to add something new to a conversation",
  },
  {
    expression: "see you then",
    meaning: "goodbye, until the time we agreed",
  },
];

const comprehensionQuestions = [
  "How did Tomás find out about the job?",
  "Why does Tomás want a part-time job?",
  "Where did Tomás work before, and what did he do there?",
  "What does Jess say is the hardest part of making coffee?",
  "What does Tomás say about busy days?",
  "What would Tomás do if a customer said their coffee was cold?",
  "When can Tomás work?",
  "How does the café share the tips?",
  "When is the trial shift, and is it paid?",
  "What does Tomás need to wear?",
];

const discussionQuestions = [
  "Would you like to work in a café? Why or why not?",
  "What is the most difficult thing about working in a café?",
  "Is it a good idea to work while you study a language? Why?",
  "Do people leave tips in cafés in your country?",
  "Is it OK to ask about the pay in a job interview?",
  "What is a good first job for a young person?",
];

const scenarioPrompts = [
  "A customer says their sandwich is wrong.",
  "A customer asks for a drink you don't know how to make.",
  "The queue is very long and you are alone.",
  "Someone drops a drink on the floor.",
  "A customer leaves their phone on the table.",
  "A customer asks for the Wi-Fi password.",
];

type relatedGuides = {
  title: string;
  href: string;
};

const relatedGuides: relatedGuides[] = [
  {
    title: "Care Worker Phone Interview: B1 English Conversation",
    href: "/guides/job-interview-care-worker",
  },
  {
    title: "Nursing Job Interview: B2 English Conversation",
    href: "/guides/job-interview-nursing",
  },
  {
    title: "Job Interview English: B2 ESL Guide",
    href: "/guides/job-interview",
  },
];

export default function PostPage() {
  return (
    <GuideArticle relatedGuides={relatedGuides}>
        <header >
          <nav aria-label="Breadcrumb" className={styles.breadcrumb}>
            <Link href="/guides" >Guides</Link>
            <span className={styles.separator}>/</span>
            <span>Café Job Interview</span>
          </nav>

          <div className={styles.meta}>
            <span className={styles.tag}>A2</span>
            <span className={styles.tag}>Business English</span>
            <span className={styles.tag}>Hospitality</span>
            <span className={styles.tag}>Plus</span>
          </div>

          <h1 >
            Café Job Interview: A2 English Conversation
          </h1>

          <p className={styles.muted}>
            Tomás is studying English and wants a part-time job. He sees a
            sign in a café window and has an informal interview with Jess,
            who runs the café. She asks about his experience and when he can
            work, he asks about hours and pay, and she offers him a trial
            shift.
          </p>
        </header>

        {/* Conversation first */}
        <section >
          <h2 >From the Conversation</h2>

          <p>
            Tomás has worked in a restaurant, but never in a café. Jess asks
            how he feels about the lunchtime rush, then gives him a problem.
          </p>

          <div className={styles.card}>
            <p><strong>Jess:</strong> So, it's very busy here at lunchtime. Sometimes there are fifteen people in the queue. How do you feel about that?</p>
            <p><strong>Tomás:</strong> I think it's OK. Saturdays at the restaurant were very busy. I like it when it's busy, actually. The day goes quickly.</p>
            <p><strong>Jess:</strong> Ha, that's true. And what if a customer isn't happy? Say someone comes back and says, "This coffee is cold."</p>
            <p className={styles.muted}>…</p>
          </div>

          <p>
            Before students hear Tomás's answer, ask them what they would
            say and do. Then compare their ideas with his, and with what
            Jess says next.
          </p>

          <GuidePlusCta lineCount={50} />
        </section>

        {/* Vocabulary */}
        <section >
          <h2 >Vocabulary</h2>

          <p>
            Café and work words from the interview. Pre-teach them before
            reading, and check that students know the difference between a
            till and a queue.
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
            Some everyday phrases from the conversation:
          </p>

          <ul >
            {expressions.map((item) => (
              <li key={item.expression}>
                <strong>{item.expression}</strong>: {item.meaning}
              </li>
            ))}
          </ul>
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
            <Link href="/pricing">
              Read the full conversation with Plus
            </Link>
          </p>
        </section>

        {/* Language point */}
        <section >
          <h2 >Asking Questions at the End</h2>

          <p>
            Many learners are nervous about asking questions in an interview,
            especially about money. Tomás asks four, and he keeps them short
            and polite. He starts some of them with "Sorry" to sound less
            direct. At the end, he repeats the important details back to
            Jess to check them.
          </p>

          <div className={styles.callout}>
            <Lightbulb className={styles.icon} size={20} />

            <div>
              <strong>Phrases students can reuse</strong>

              <p className={styles.muted + " " + styles.spaced}>
                How many hours is it? · Sorry, can I ask about the pay? ·
                Sorry, one more question. · Is the trial shift paid? · What
                do I need to wear? · So, Saturday at nine.
              </p>
            </div>
          </div>
        </section>

        {/* Speaking */}
        <section >
          <h2 >Speaking: Café Interview</h2>

          <p>
            Before the role-play, each student draws a simple plan of their
            week and marks when they are busy (classes, work, family) and
            when they are free.
          </p>

          <p>
            In pairs, one student is the café owner and the other is the
            candidate. The owner asks about experience, reads out one of the
            situations below, and asks which days the candidate can work. The
            candidate answers from their plan, then asks at least two
            questions from the box above. The owner offers a trial shift, and
            the candidate repeats the day, time and what to wear. Then swap.
          </p>

          <ul >
            {scenarioPrompts.map((prompt) => (
              <li key={prompt}>{prompt}</li>
            ))}
          </ul>
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
