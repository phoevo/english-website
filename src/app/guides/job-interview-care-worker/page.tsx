import GuideArticle from "@/components/guides/GuideArticle";
import styles from "@/components/guides/guide-article.module.css";
import { ArrowLeft, Lightbulb } from "lucide-react";
import Link from "next/link";
import GuidePlusCta from "@/components/guides/GuidePlusCta";


/* eslint react/no-unescaped-entities: 0 */


export const metadata = {
  title:
    "Care Worker Phone Interview: B1 English Speaking Practice and Teaching Notes | Synomilo",
  description:
    "B1 English speaking practice: a conversation in which a care home manager phones someone about their job application, with vocabulary, phone phrases and classroom activities.",
  alternates: { canonical: "/guides/job-interview-care-worker" },
  openGraph: {
    title: "Care Worker Phone Interview: B1 English Speaking Practice | Synomilo",
    description:
      "A care home manager phones someone about their job application. Speaking practice, vocabulary, phone phrases and role-play activities for B1 learners.",
    url: "/guides/job-interview-care-worker",
    type: "article",
  },
};

const keyVocabulary = [
  {
    term: "resident",
    meaning: "A person who lives in a care home.",
  },
  {
    term: "senior carer",
    meaning:
      "An experienced carer who leads a shift and supports the other carers.",
  },
  {
    term: "safeguarding",
    meaning:
      "Protecting people from harm, and telling someone when you are worried.",
  },
  {
    term: "rota",
    meaning: "A list that shows who works on which days and shifts.",
  },
  {
    term: "shadow shift",
    meaning:
      "A shift where a new worker follows an experienced carer and watches how they work.",
  },
  {
    term: "face-to-face interview",
    meaning:
      "An interview where you meet the employer in person, often after a phone interview.",
  },
];

const expressions = [
  {
    expression: "hold on",
    meaning: "to wait for a short time, often on the phone",
  },
  {
    expression: "learn on the job",
    meaning: "to learn by doing something, not by studying it first",
  },
  {
    expression: "put yourself in someone's shoes",
    meaning: "to imagine how another person feels",
  },
  {
    expression: "keep your cool",
    meaning: "to stay calm when things are difficult",
  },
  {
    expression: "take something personally",
    meaning: "to feel hurt because you think something is about you",
  },
  {
    expression: "that works for me",
    meaning: "said to agree that a time or plan is good for you",
  },
  {
    expression: "bear with me",
    meaning: "please wait a moment",
  },
];

const comprehensionQuestions = [
  "Why does Amira ask Sue to hold on at the start of the call?",
  "What is the purpose of this phone call?",
  "Who did Amira look after, and what did she do for them?",
  "What does Sue say about unpaid caring experience?",
  "How did Amira help the woman at the supermarket?",
  "What would Amira do if a resident didn't want to take their tablets?",
  "What does Amira say about night shifts, and how often would she work them?",
  "When is the next interview, and what does Amira need to bring?",
];

const discussionQuestions = [
  "What makes someone good at care work?",
  "Should looking after a family member count as work experience? Why or why not?",
  "Is a phone interview easier or harder than a face-to-face one? Why?",
  "What small things help an older person feel respected?",
  "In your country, who usually looks after older people: families or care homes?",
  "Is care work valued enough? What would make more people want to do it?",
];

const scenarioPrompts = [
  "A resident doesn't want to have a shower today.",
  "A resident tells you they feel lonely.",
  "A resident falls, but says they are fine.",
  "A family member says their mother's room is untidy.",
  "A resident wants to go outside, but it's raining.",
  "Two residents need help at the same time.",
];

type relatedGuides = {
  title: string;
  href: string;
};

const relatedGuides: relatedGuides[] = [
  {
    title: "Café Job Interview: A2 English Conversation and Speaking Practice",
    href: "/guides/job-interview-cafe-worker",
  },
  {
    title: "Nursing Job Interview: B2 English Conversation and Speaking Practice",
    href: "/guides/job-interview-nursing",
  },
  {
    title: "Job Interview English: B2 ESL Lesson and Speaking Practice",
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
            <span>Care Worker Phone Interview</span>
          </nav>

          <div className={styles.meta}>
            <span className={styles.tag}>B1</span>
            <span className={styles.tag}>Business English</span>
            <span className={styles.tag}>Care Work</span>
            <span className={styles.tag}>Plus</span>
          </div>

          <h1 >
            Care Worker Phone Interview: B1 English Conversation and Speaking Practice
          </h1>

          <p className={styles.muted}>
            Amira has applied for a care assistant job. Sue, the care home
            manager, phones her for a first chat before inviting her to a
            proper interview. She asks about Amira's experience of looking
            after her dad, gives her two situations, and checks when she can
            work.
          </p>
        </header>

        {/* Conversation first */}
        <section >
          <h2 >From the Conversation</h2>

          <p>
            After a quick start to the call, Sue asks Amira to tell her about
            herself.
          </p>

          <div className={styles.card}>
            <p><strong>Sue:</strong> Lovely. So, tell me a little about yourself.</p>
            <p><strong>Amira:</strong> Well, at the moment I work part-time in a supermarket. Before that, I looked after my dad for five years, after he had a stroke.</p>
            <p><strong>Sue:</strong> Oh, I'm sorry to hear that. What did you do for him?</p>
            <p><strong>Amira:</strong> Everything, really. I helped him wash and get dressed, I cooked for him, and I took him to his appointments. At first I didn't know what I was doing, but I learned on the job.</p>
            <p className={styles.muted}>…</p>
          </div>

          <p>
            Before students read Sue's reply, ask them: does looking after a
            family member count as work experience? Would they mention it in
            an interview? Then compare their answers with Sue's.
          </p>

          <GuidePlusCta lineCount={45} />
        </section>

        {/* Vocabulary */}
        <section >
          <h2 >Vocabulary</h2>

          <p>
            Care and work terms that come up in the call. Learners who haven't
            worked in care won't know most of them, so pre-teach them before
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
            Amira and Sue also use some everyday expressions, several of them
            common on the phone. Some of them:
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
            <Link href="/pricing">
              Read the full conversation with Plus
            </Link>
          </p>
        </section>

        {/* Language point */}
        <section >
          <h2 >Phone Phrases</h2>

          <p>
            On the phone you can't see the other person's face, so you have
            to say things out loud. Amira answers with "Speaking", then asks
            Sue to wait while she moves somewhere quieter. When she needs a
            moment to write something down, she says so. At the end, she
            repeats the day and time back to Sue to check she has them right.
          </p>

          <div className={styles.callout}>
            <Lightbulb className={styles.icon} size={20} />

            <div>
              <strong>Phrases students can reuse</strong>

              <p className={styles.muted + " " + styles.spaced}>
                Speaking. · Can you hold on a second? · Bear with me, I'll just
                grab a pen. · So that's… Is that right? · That works for me. ·
                See you then.
              </p>
            </div>
          </div>

          <p>
            If the line is bad, students can also use: "Sorry, you're breaking
            up." and "Could you say that again?"
          </p>
        </section>

        {/* Speaking */}
        <section >
          <h2 >Speaking: Phone Interview</h2>

          <p>
            In pairs, one student plays the care home manager and the other
            the candidate. Sit back to back, so you can't see each other, like
            on a real phone call.
          </p>

          <p>
            Before they start, the candidate thinks of a time they looked
            after someone without being paid: a family member, a neighbour, a
            child or a volunteer job. They describe it in the past tense, the
            way Amira does ("I looked after… I helped… I learned…").
          </p>

          <p>
            The manager asks the candidate to tell them about themselves,
            then reads out one of the situations below and asks about
            weekends and nights. At the end, the manager invites the candidate
            to an interview, and the candidate repeats the day and time back.
            Then swap.
          </p>

          <ul >
            {scenarioPrompts.map((prompt) => (
              <li key={prompt}>{prompt}</li>
            ))}
          </ul>

          <p>
            Students who haven't looked after anyone can invent an experience
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
