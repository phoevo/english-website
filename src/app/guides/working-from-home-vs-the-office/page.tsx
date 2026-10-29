import GuideArticle from "@/components/guides/GuideArticle";
import styles from "@/components/guides/guide-article.module.css";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Check,
  Lightbulb,
} from "lucide-react";
import Link from "next/link";



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
    <GuideArticle relatedGuides={relatedGuides}>
      <header >
        <nav aria-label="Breadcrumb" className={styles.breadcrumb}>
          <Link href="/guides" >Guides</Link>
          <span className={styles.separator}>/</span>
          <span>Remote Work ESL Lesson</span>
        </nav>

        <div className={styles.meta}>
          <span className={styles.tag}>B2</span>
          <span className={styles.tag}>
            Business English
          </span>
          <span className={styles.tag}>
            Speaking Lesson
          </span>
        </div>

        <h1 >
          Remote Work vs Office Work: B2 ESL Lesson
        </h1>

        <p className={styles.muted}>
          A ready-to-use B2 Business English lesson about remote and office
          work, including vocabulary, comprehension questions, discussion
          prompts, polite disagreement practice, and homework.
        </p>
      </header>

      {/* Lesson introduction */}
      <section >
        <h2 >
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

        <div className={styles.card}>
          <strong className={styles.largeLabel}>Lesson focus</strong>

          <ul className={styles.checkList + " " + styles.spaced}>
            <li className={styles.checkItem}>
              <Check className={styles.icon} size={18} />
              Discussing the advantages and disadvantages of remote work
            </li>
            <li className={styles.checkItem}>
              <Check className={styles.icon} size={18} />
              Expressing agreement and disagreement politely
            </li>
            <li className={styles.checkItem}>
              <Check className={styles.icon} size={18} />
              Using workplace idioms and conversational expressions
            </li>
            <li className={styles.checkItem}>
              <Check className={styles.icon} size={18} />
              Supporting opinions with reasons and examples
            </li>
          </ul>
        </div>
      </section>

      {/* Before reading */}
      <section >
        <h2 >
          Before the Conversation
        </h2>

        <p>
          Begin with a short warm-up. Ask students to choose one of the options
          below and explain their answer.
        </p>

        <div className={styles.gridThree}>
          <div className={styles.card}>
            <strong className={styles.option}>Option A</strong>
            <p className={styles.smallText + " " + styles.spaced}>
              Work from home full-time
            </p>
          </div>

          <div className={styles.card}>
            <strong className={styles.option}>Option B</strong>
            <p className={styles.smallText + " " + styles.spaced}>
              Work in the office full-time
            </p>
          </div>

          <div className={styles.card}>
            <strong className={styles.option}>Option C</strong>
            <p className={styles.smallText + " " + styles.spaced}>
              Follow a hybrid schedule
            </p>
          </div>
        </div>

        <p>
          Encourage students to give at least two reasons for their choice.
          Useful follow-up prompts include:
        </p>

        <ul >
          <li>How long is your ideal commute?</li>
          <li>Do you find it easy to concentrate at home?</li>
          <li>How important is face-to-face communication?</li>
        </ul>
      </section>

      {/* Vocabulary */}
      <section >
        <h2 >
          Key Remote Work Vocabulary
        </h2>

        <div className={styles.vocabulary}>
          <div className={styles.vocabularyHeader}>
            <span>Word or phrase</span>
            <span>Meaning</span>
          </div>

          {keyVocabulary.map((item) => (
            <div
              key={item.term}
              className={styles.vocabularyRow}
            >
              <strong>{item.term}</strong>
              <span className={styles.muted}>{item.meaning}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Expressions */}
      <section >
        <h2 >
          Useful Expressions From the Conversation
        </h2>

        <p>
          These expressions help students respond naturally during a
          disagreement without sounding too direct.
        </p>

        <div className={styles.gridTwo}>
          {usefulExpressions.map((item) => (
            <div key={item.expression} className={styles.card}>
              <strong>{item.expression}</strong>
              <p className={styles.smallText + " " + styles.spaced}>
                {item.meaning}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Conversation preview */}
      <section >
        <h2 >Remote Work Conversation Preview</h2>
        <p>
          The full conversation follows two colleagues with different views on
          remote work. One values flexibility and avoiding the commute, while
          the other prefers face-to-face collaboration and office culture.
        </p>
        <div className={styles.gridTwo}>
          <div className={styles.card}>
            <strong>Working from home</strong>
            <p className={styles.smallText + " " + styles.spaced}>Flexibility, fewer interruptions, no commute, and improved work-life balance.</p>
          </div>
          <div className={styles.card}>
            <strong>Working in the office</strong>
            <p className={styles.smallText + " " + styles.spaced}>Faster communication, easier collaboration, stronger team relationships, and a clearer work routine.</p>
          </div>
        </div>
      </section>

      {/* Comprehension */}
      <section >
        <h2 >
          Comprehension Questions
        </h2>

        <p>
          Ask students to answer these questions after reading or listening to
          the conversation.
        </p>

        <ol >
          {comprehensionQuestions.map((question) => (
            <li key={question}>{question}</li>
          ))}
        </ol>
      </section>

      {/* Discussion */}
      <section >
        <h2 >
          Remote Work Discussion Questions
        </h2>

        <p>
          Use these questions to move from comprehension into a longer
          opinion-based discussion.
        </p>

        <ol >
          {discussionQuestions.map((question) => (
            <li key={question}>{question}</li>
          ))}
        </ol>
      </section>


      {/* CTA to app */}
      <section className={styles.conversationCta}>
        <BookOpen  size={30} />

        <h2 >
          Open in Synomilo
        </h2>

        <p className={styles.muted + " " + styles.spaced}>
          Read the full dialogue, highlight useful vocabulary, and save
          expressions to a personal dictionary. Reading tools are free;
          student audio requires a Plus account.
        </p>

        <Link href="/home/conversations/6a1c68581f9bbab1c1d9"
          target="_blank" rel="noopener noreferrer">
          <span
            className={styles.button}
          >
            Open the conversation
            <ArrowRight className={styles.iconInline} size={17} />
          </span>
        </Link>
      </section>


      {/* Language task */}
      <section >
        <h2 >
          Language Focus: Polite Disagreement
        </h2>

        <p>
          Ask students to respond to each statement without using the word
          "no."
        </p>

        <ul >
          <li>Everyone is more productive in the office.</li>
          <li>Remote workers do less work.</li>
          <li>Video calls are as effective as face-to-face meetings.</li>
          <li>Companies should completely remove their offices.</li>
        </ul>

        <div className={styles.callout}>
          <Lightbulb
            className={styles.icon}
            size={20}
          />

          <div>
            <strong>Useful sentence starters</strong>
            <p className={styles.muted + " " + styles.spaced}>
              "I see your point, but..." · "That may be true in some cases,
              however..." · "I get where you're coming from, although..."
            </p>
          </div>
        </div>
      </section>

      {/* Homework */}
      <section >
        <h2 >Homework Idea</h2>

        <p>
          Ask the student to interview someone who has experience with remote or
          hybrid work. They should ask:
        </p>

        <ul >
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
      <section >
        <h2 >Teaching Tip</h2>

        <div className={styles.callout}>
          <Lightbulb
            className={styles.icon}
            size={22}
          />

          <p>
            Do not let students stop after stating an opinion. Ask them to give
            a reason, an example, and a possible counterargument. This turns
            short answers into more natural B2-level discussion.
          </p>
        </div>
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
