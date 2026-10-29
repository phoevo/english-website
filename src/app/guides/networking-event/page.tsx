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
    "B1 Networking Event English Guide | Business English Conversation Practice | Synomilo",
  description:
    "Practise English for networking events with this B1 conversation guide. Includes vocabulary, business expressions, comprehension questions, role-play activities, and an interactive conversation.",
  alternates: {
    canonical: "/guides/networking-event",
  },
  openGraph: {
    title:
      "B1 Networking Event English Guide | Business English Conversation Practice",
    description:
      "Learn how to introduce yourself, discuss your career, make small talk, and end professional conversations politely.",
    url: "/guides/networking-event",
    type: "article",
  },
};

const keyVocabulary = [
  {
    term: "networking",
    meaning:
      "The activity of meeting people and building professional relationships.",
  },
  {
    term: "IT support",
    meaning:
      "Technical help provided to people who are having problems with computers or software.",
  },
  {
    term: "project management",
    meaning:
      "The process of planning, organizing, and completing a project.",
  },
  {
    term: "startup",
    meaning:
      "A new company that is usually trying to grow quickly.",
  },
  {
    term: "promotion",
    meaning:
      "A move to a more senior position with greater responsibility.",
  },
  {
    term: "workload",
    meaning:
      "The amount of work that a person is responsible for completing.",
  },
  {
    term: "career goals",
    meaning:
      "The professional achievements or positions someone hopes to reach.",
  },
  {
    term: "creativity",
    meaning:
      "The ability to produce original ideas or find new ways of doing things.",
  },
];

const usefulExpressions = [
  {
    expression: "Do you mind if I join you?",
    meaning:
      "A polite way to ask whether you can sit or spend time with someone.",
  },
  {
    expression: "What brings you here?",
    meaning:
      "A natural way to ask why someone is attending an event or visiting a place.",
  },
  {
    expression: "Fingers crossed",
    meaning:
      "Used to say that you hope something will happen successfully.",
  },
  {
    expression: "It's not what you know, it's who you know",
    meaning:
      "An expression suggesting that personal connections can be important for success.",
  },
  {
    expression: "Give it your all",
    meaning:
      "To make your strongest possible effort.",
  },
  {
    expression: "Stretch your legs",
    meaning:
      "Literally, to move after sitting; figuratively, to have more freedom or opportunity.",
  },
  {
    expression: "Full to the brim",
    meaning:
      "Completely full of something, such as ideas, energy, or emotion.",
  },
  {
    expression: "Burn the candle at both ends",
    meaning:
      "To work very hard for long periods without getting enough rest.",
  },
  {
    expression: "On the flip side",
    meaning:
      "Used to introduce the opposite or contrasting side of a situation.",
  },
  {
    expression: "No hard feelings",
    meaning:
      "Used to say that you are not angry or upset about something.",
  },
];

const comprehensionQuestions = [
  "Why does Anna decide to speak to David?",
  "Why had David not approached anyone before Anna arrived?",
  "What does David currently do for work?",
  "Which career would David like to move into?",
  "Why is David attending the networking event?",
  "What does Anna do at her current company?",
  "Why is Anna interested in finding a new position?",
  "What does Anna enjoy about working at a startup?",
  "What difficulties does Anna experience at work?",
  "Why does Anna leave the conversation?",
];

const discussionQuestions = [
  "Have you ever attended a professional networking event?",
  "Do you find it easy or difficult to start conversations with strangers?",
  "What makes someone approachable at a networking event?",
  "Is networking more effective online or face-to-face?",
  "How important are professional connections when looking for work?",
  "Would you rather work for a startup or a large company?",
  "What questions are appropriate when meeting someone professionally?",
  "How can someone make a good first impression?",
  "What should you avoid talking about when meeting a new professional contact?",
  "How can you leave a conversation politely without sounding rude?",
];

const networkingPrompts = [
  "Introduce yourself and explain what you do.",
  "Ask the other person what brought them to the event.",
  "Describe one career goal.",
  "Ask a follow-up question about their work.",
  "Mention one thing you like or dislike about your current role.",
  "End the conversation politely.",
];

type RelatedGuide = {
  title: string;
  href: string;
};

const relatedGuides: RelatedGuide[] = [
  {
    title: "Job Interview English: B2 Conversation Guide",
    href: "/guides/job-interview",
  },
  {
    title: "Remote Work vs Office Work: B2 Conversation Guide",
    href: "/guides/working-from-home-vs-the-office",
  },
];

export default function PostPage() {
  return (
    <GuideArticle relatedGuides={relatedGuides}>
        <header >
          <nav
            aria-label="Breadcrumb"
            className={styles.breadcrumb}
          >
            <Link href="/guides" >
              Guides
            </Link>

            <span>/</span>

            <span>Networking Event</span>
          </nav>

          <div className={styles.meta}>
            <span className={styles.tag}>B1</span>

            <span className={styles.tag}>
              Business English
            </span>

            <span className={styles.tag}>
              Conversation Guide
            </span>

            <span className={styles.tag}>
              Networking
            </span>
          </div>

          <h1 >
            Networking Event: B1 English Conversation Guide
          </h1>

          <p className={styles.muted}>
            A practical B1 English guide for starting conversations at
            networking events. Learn how to introduce yourself, discuss your
            career, ask natural follow-up questions, and leave a professional
            conversation politely.
          </p>
        </header>

        {/* Guide introduction */}
        <section >
          <h2 >
            About This Networking Guide
          </h2>

          <p>
            Networking can feel uncomfortable, even for confident speakers.
            Starting a conversation with a stranger requires more than knowing
            the correct vocabulary. You also need to show interest, ask useful
            questions, and keep the conversation moving naturally.
          </p>

          <p>
            The full Synomilo conversation follows Anna and David as they meet
            for the first time at a professional networking event. They discuss
            their current jobs, future career plans, startup culture, and the
            reasons they are hoping to make new professional connections.
          </p>

          <p>
            Their exchange demonstrates how a short professional introduction
            can develop into a relaxed and meaningful conversation.
          </p>

          <div className={styles.card}>
            <strong className={styles.largeLabel}>What you'll practise</strong>

            <ul className={styles.checkList + " " + styles.spaced}>
              <li className={styles.checkItem}>
                <Check
                  className={styles.icon}
                  size={18}
                />
                Introducing yourself naturally at a professional event
              </li>

              <li className={styles.checkItem}>
                <Check
                  className={styles.icon}
                  size={18}
                />
                Asking someone about their job and career plans
              </li>

              <li className={styles.checkItem}>
                <Check
                  className={styles.icon}
                  size={18}
                />
                Keeping a conversation going with follow-up questions
              </li>

              <li className={styles.checkItem}>
                <Check
                  className={styles.icon}
                  size={18}
                />
                Using natural workplace expressions and idioms
              </li>

              <li className={styles.checkItem}>
                <Check
                  className={styles.icon}
                  size={18}
                />
                Ending a conversation politely
              </li>
            </ul>
          </div>
        </section>

        {/* Before starting */}
        <section >
          <h2 >Before You Start</h2>

          <p>
            Ask learners to imagine that they have just arrived at a networking
            event where they do not know anyone. Which approach would they feel
            most comfortable using?
          </p>

          <div className={styles.gridThree}>
            <div className={styles.card}>
              <strong className={styles.option}>Option A</strong>

              <p className={styles.smallText + " " + styles.spaced}>
                Walk up to someone and introduce yourself directly
              </p>
            </div>

            <div className={styles.card}>
              <strong className={styles.option}>Option B</strong>

              <p className={styles.smallText + " " + styles.spaced}>
                Wait for someone else to begin the conversation
              </p>
            </div>

            <div className={styles.card}>
              <strong className={styles.option}>Option C</strong>

              <p className={styles.smallText + " " + styles.spaced}>
                Join a group that is already talking
              </p>
            </div>
          </div>

          <p>Use these warm-up questions:</p>

          <ul >
            <li>Have you ever attended a networking event?</li>
            <li>Do you enjoy talking to strangers?</li>
            <li>What makes a good professional introduction?</li>
            <li>What would you want someone to remember about you?</li>
          </ul>

          <div className={styles.callout}>
            <Lightbulb
              className={styles.icon}
              size={20}
            />

            <div>
              <strong>Warm-up challenge</strong>

              <p className={styles.muted + " " + styles.spaced}>
                Ask learners to introduce themselves and explain what they do
                in no more than 30 seconds.
              </p>
            </div>
          </div>
        </section>

        {/* Vocabulary */}
        <section >
          <h2 >
            Key Networking Vocabulary
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

                <span className={styles.muted}>
                  {item.meaning}
                </span>
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
            These expressions help learners start professional conversations,
            discuss career goals, and respond naturally to another person's
            experiences.
          </p>

          <div className={styles.gridTwo}>
            {usefulExpressions.map((item) => (
              <div
                key={item.expression}
                className={styles.card}
              >
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
          <h2 >
            Networking Conversation Preview
          </h2>

          <p>
            Anna decides to approach David after noticing that he is also
            standing alone at the event.
          </p>

          <div className={styles.card}>
            <div>
              <strong>Anna:</strong>
              <p className={styles.muted + " " + styles.spaced}>
                Excuse me, hello.
              </p>
            </div>

            <div>
              <strong>David:</strong>
              <p className={styles.muted + " " + styles.spaced}>Oh, hey.</p>
            </div>

            <div>
              <strong>Anna:</strong>
              <p className={styles.muted + " " + styles.spaced}>
                Hi, my name is Anna. I promised myself I would talk to people
                here. Do you mind if I join you for a moment?
              </p>
            </div>

            <div>
              <strong>David:</strong>
              <p className={styles.muted + " " + styles.spaced}>
                No, not at all. Please, have a seat. I promised myself the same
                thing. I just couldn't find it within me to actually do it.
              </p>
            </div>

            <div>
              <strong>Anna:</strong>
              <p className={styles.muted + " " + styles.spaced}>
                Nice to meet you. So, what brings you to the event? What do you
                do?
              </p>
            </div>
          </div>

          <p className={styles.smallText + " " + styles.spaced}>
            The full conversation continues with Anna and David discussing
            their current jobs, career goals, and experiences working for
            different types of companies.
          </p>
        </section>

        {/* Comprehension */}
        <section >
          <h2 >
            Networking Conversation Comprehension Questions
          </h2>

          <p>
            Ask learners to answer these questions after reading or listening
            to the complete conversation.
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
            Networking Discussion Questions
          </h2>

          <p>
            Use these questions to extend the topic into a longer conversation
            about professional relationships and career development.
          </p>

          <ol >
            {discussionQuestions.map((question) => (
              <li key={question}>{question}</li>
            ))}
          </ol>
        </section>

        {/* CTA */}
        <section className={styles.conversationCta}>
          <BookOpen  size={30} />

          <h2 >
            Open in Synomilo
          </h2>

          <p className={styles.muted + " " + styles.spaced}>
            Open the complete conversation in Synomilo to read the full
            dialogue, explore highlighted expressions, save useful vocabulary,
            and practise professional English in context. Student audio
            requires a Plus account.
          </p>

          <Link href="/home/conversations/68ce638012a4e95d0cfe"
          target="_blank" rel="noopener noreferrer">
            <span className={styles.button}>
              Open the conversation
              <ArrowRight className={styles.iconInline} size={17} />
            </span>
          </Link>
        </section>

        {/* Language focus */}
        <section >
          <h2 >
            Language Focus: Starting a Networking Conversation
          </h2>

          <p>
            A successful networking conversation usually begins with a polite
            introduction followed by an open question.
          </p>

          <div className={styles.gridTwo}>
            <div className={styles.card}>
              <strong className={styles.block}>Less effective</strong>

              <p className={styles.muted + " " + styles.spaced}>
                "Hi. What do you do?"
              </p>
            </div>

            <div className={styles.card}>
              <strong className={styles.block}>More natural</strong>

              <p className={styles.muted + " " + styles.spaced}>
                "Hi, I'm Anna. Do you mind if I join you? What brings you to
                the event?"
              </p>
            </div>
          </div>

          <p>
            The second version sounds friendlier because it introduces the
            speaker, asks permission, and uses an open question that encourages
            a longer answer.
          </p>

          <div className={styles.callout}>
            <Lightbulb
              className={styles.icon}
              size={20}
            />

            <div>
              <strong>Useful conversation structure</strong>

              <p className={styles.muted + " " + styles.spaced}>
                Introduction · Open question · Follow-up question · Shared
                experience · Polite ending
              </p>
            </div>
          </div>
        </section>

        {/* Speaking activity */}
        <section >
          <h2 >
            Speaking Activity: Networking Role-Play
          </h2>

          <p>
            Put learners into pairs and ask them to imagine that they have met
            at a professional event. Each learner should create a simple
            professional identity.
          </p>

          <div className={styles.gridTwo}>
            <div className={styles.card}>
              <strong className={styles.largeLabel}>Person A</strong>

              <ul className={styles.spaced}>
                <li>You work in marketing.</li>
                <li>You want a more creative position.</li>
                <li>You currently work for a small company.</li>
                <li>You are hoping to meet potential employers.</li>
              </ul>
            </div>

            <div className={styles.card}>
              <strong className={styles.largeLabel}>Person B</strong>

              <ul className={styles.spaced}>
                <li>You work in IT support.</li>
                <li>You want to move into project management.</li>
                <li>You have worked at your company for three years.</li>
                <li>You want advice about changing careers.</li>
              </ul>
            </div>
          </div>

          <p>
            Learners should include each of the following tasks in their
            conversation:
          </p>

          <ol >
            {networkingPrompts.map((prompt) => (
              <li key={prompt}>{prompt}</li>
            ))}
          </ol>

          <p>
            After the first role-play, learners should change partners and
            create a new identity.
          </p>
        </section>

        {/* Common mistakes */}
        <section >
          <h2 >
            Common Networking Mistakes
          </h2>

          <div className={styles.gridTwo}>
            <div className={styles.card}>
              <strong>Talking only about yourself</strong>

              <p className={styles.smallText + " " + styles.spaced}>
                Ask follow-up questions and show genuine interest in the other
                person's experience.
              </p>
            </div>

            <div className={styles.card}>
              <strong>Giving one-word answers</strong>

              <p className={styles.smallText + " " + styles.spaced}>
                Add a reason, example, or detail that gives the other person
                something to respond to.
              </p>
            </div>

            <div className={styles.card}>
              <strong>Making the conversation too formal</strong>

              <p className={styles.smallText + " " + styles.spaced}>
                Professional conversations can still be relaxed, warm, and
                conversational.
              </p>
            </div>

            <div className={styles.card}>
              <strong>Leaving abruptly</strong>

              <p className={styles.smallText + " " + styles.spaced}>
                Give a brief reason for leaving and end with a friendly phrase
                such as "It was great meeting you."
              </p>
            </div>
          </div>
        </section>

        {/* Homework */}
        <section >
          <h2 >Independent Practice</h2>

          <p>
            Ask learners to prepare a short professional introduction that
            could be used at a real networking event.
          </p>

          <ul >
            <li>Your name and current role</li>
            <li>What your company or industry does</li>
            <li>One thing you enjoy about your work</li>
            <li>One professional goal</li>
            <li>Three questions you could ask a new contact</li>
          </ul>

          <p>
            Learners can record their introduction and listen for pauses,
            unclear sentences, or sections that sound memorized. They should
            then record it again using only brief notes.
          </p>
        </section>

        {/* Tutor tip */}
        <section >
          <h2 >Tutor Tip</h2>

          <div className={styles.callout}>
            <Lightbulb
              className={styles.icon}
              size={22}
            />

            <p>
              Some learners believe networking means trying to impress or sell
              themselves. Encourage them to focus on curiosity instead. Asking
              thoughtful questions, listening carefully, and finding shared
              interests usually creates a better professional connection than
              delivering a perfect sales pitch.
            </p>
          </div>
        </section>

        <footer >
          <Link
            href="/guides"
            className={styles.muted}
          >
            <ArrowLeft size={16} />
            Back to all conversation guides
          </Link>
        </footer>
          </GuideArticle>
  );
}
