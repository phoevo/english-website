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
    "Asking for Directions in English: A2 Conversation Guide | Synomilo",
  description:
    "Practise asking for and giving directions in English with this A2 conversation guide. Learn useful vocabulary, phrases, comprehension questions, and speaking activities.",
  alternates: {
    canonical: "/guides/directions",
  },
  openGraph: {
    title: "Asking for Directions in English: A2 Conversation Guide",
    description:
      "Learn how to ask for directions, understand simple instructions, and give directions in English with this A2 conversation guide.",
    url: "/guides/directions",
    type: "article",
  },
};

const keyVocabulary = [
  {
    term: "lost",
    meaning: "Unable to find your way or unsure where you are.",
  },
  {
    term: "around the corner",
    meaning: "Very close, usually just beyond the corner of a street.",
  },
  {
    term: "traffic lights",
    meaning:
      "Lights that control traffic at a road intersection.",
  },
  {
    term: "straight ahead",
    meaning: "Moving directly forward without turning.",
  },
  {
    term: "turn right",
    meaning: "Change direction towards the right.",
  },
  {
    term: "bridge",
    meaning:
      "A structure that allows people or vehicles to cross over a river, road, or other obstacle.",
  },
  {
    term: "block",
    meaning:
      "The distance between two streets in a town or city.",
  },
  {
    term: "clock tower",
    meaning:
      "A tall structure with a large clock that can be used as a landmark.",
  },
];

const usefulExpressions = [
  {
    expression: "I've lost my way",
    meaning:
      "A natural way to say that you don't know where you are or how to get somewhere.",
  },
  {
    expression: "Just around the corner",
    meaning:
      "Very close and not far away.",
  },
  {
    expression: "Walking forever",
    meaning:
      "An informal expression used to exaggerate how long a journey feels.",
  },
  {
    expression: "Point me in the right direction",
    meaning:
      "To give someone information about which way they should go.",
  },
  {
    expression: "Keep an eye out for",
    meaning:
      "To watch carefully for something that you expect to see.",
  },
  {
    expression: "No worries",
    meaning:
      "A friendly way of saying that something is not a problem.",
  },
];

const comprehensionQuestions = [
  "What is Emma trying to find?",
  "Who does Emma ask for help?",
  "Where does the shop clerk say the train station is?",
  "What should Emma do when she reaches the traffic lights?",
  "What will Emma see on her left?",
  "What does Emma need to cross?",
  "What landmark is next to the train station?",
  "What coffee shop should Emma look out for?",
];

const discussionQuestions = [
  "Do you usually use a map when you travel?",
  "What do you do when you get lost?",
  "Is it easy for you to ask strangers for help?",
  "Would you rather use Google Maps or ask someone for directions?",
  "Have you ever been completely lost in a new city?",
  "What landmarks are useful for giving directions in your town?",
  "How would you explain the way to your home to a visitor?",
  "What is the most useful phrase for asking for directions?",
];

const directionPrompts = [
  "Ask someone where a train station is.",
  "Explain that you are lost.",
  "Give directions using 'go straight ahead'.",
  "Tell someone when to turn left or right.",
  "Use a landmark to help someone find their destination.",
  "Check that the other person understands your directions.",
];

type RelatedGuide = {
  title: string;
  href: string;
};

const relatedGuides: RelatedGuide[] = [
  {
    title: "Networking Event: B1 English Conversation Guide",
    href: "/guides/networking-event",
  },
  {
    title: "Job Interview English: B2 Conversation Guide",
    href: "/guides/job-interview",
  },
];

export default function PostPage() {
  return (
    <GuideArticle relatedGuides={relatedGuides}>
        {/* Header */}
        <header >
          <nav
            aria-label="Breadcrumb"
            className={styles.breadcrumb}
          >
            <Link
              href="/guides"

            >
              Guides
            </Link>

            <span className={styles.separator}>/</span>

            <span>Asking for Directions</span>
          </nav>

          <div className={styles.meta}>
            <span className={styles.tag}>
              A2
            </span>

            <span className={styles.tag}>
              Everyday English
            </span>

            <span className={styles.tag}>
              Travel English
            </span>

            <span className={styles.tag}>
              Speaking Guide
            </span>
          </div>

          <h1 >
            Asking for Directions in English: A2 Conversation Guide
          </h1>

          <p className={styles.muted}>
            Learn how to ask for and give directions in English with this A2
            conversation guide. Practise useful phrases for getting around a
            town or city, understanding directions, and asking for help when
            you're lost.
          </p>
        </header>

        {/* Introduction */}
        <section >
          <h2 >
            About This Directions Guide
          </h2>

          <p>
            Asking for directions is one of the most useful English skills for
            travelling. Whether you're looking for a train station, hotel,
            restaurant, or another landmark, knowing how to ask for help can
            make travelling much easier.
          </p>

          <p>
            The full Synomilo conversation follows Emma as she asks a shop
            clerk for directions to the train station. The conversation
            introduces simple phrases for explaining where you are, describing
            turns, and identifying landmarks.
          </p>

          <p>
            The language is designed for A2 learners, with practical
            expressions that can be used in real situations.
          </p>

          <div className={styles.card}>
            <strong className={styles.largeLabel}>Guide focus</strong>

            <ul className={styles.checkList + " " + styles.spaced}>
              <li className={styles.checkItem}>
                <Check
                  className={styles.icon}
                  size={18}
                />
                Asking someone for directions politely
              </li>

              <li className={styles.checkItem}>
                <Check
                  className={styles.icon}
                  size={18}
                />
                Understanding basic directions
              </li>

              <li className={styles.checkItem}>
                <Check
                  className={styles.icon}
                  size={18}
                />
                Using landmarks to describe locations
              </li>

              <li className={styles.checkItem}>
                <Check
                  className={styles.icon}
                  size={18}
                />
                Using common travel and location vocabulary
              </li>
            </ul>
          </div>
        </section>

        {/* Before conversation */}
        <section >
          <h2 >
            Before the Conversation
          </h2>

          <p>
            Begin by asking learners how they usually find their way around an
            unfamiliar city.
          </p>

          <div className={styles.gridThree}>
            <div className={styles.card}>
              <strong className={styles.option}>
                Option A
              </strong>

              <p className={styles.smallText + " " + styles.spaced}>
                Use Google Maps or another navigation app
              </p>
            </div>

            <div className={styles.card}>
              <strong className={styles.option}>
                Option B
              </strong>

              <p className={styles.smallText + " " + styles.spaced}>
                Ask someone nearby for help
              </p>
            </div>

            <div className={styles.card}>
              <strong className={styles.option}>
                Option C
              </strong>

              <p className={styles.smallText + " " + styles.spaced}>
                Try to work it out yourself
              </p>
            </div>
          </div>

          <p>Useful warm-up questions include:</p>

          <ul >
            <li>Have you ever been lost in another city?</li>
            <li>Is it easy for you to ask strangers for help?</li>
            <li>Do you usually use a map when travelling?</li>
            <li>What landmarks do you know near your home?</li>
          </ul>

          <div className={styles.callout}>
            <Lightbulb
              className={styles.icon}
              size={20}
            />

            <div>
              <strong>Warm-up challenge</strong>

              <p className={styles.muted + " " + styles.spaced}>
                Ask learners to explain how to get from their home to a nearby
                shop, school, station, or other familiar place.
              </p>
            </div>
          </div>
        </section>

        {/* Vocabulary */}
        <section >
          <h2 >
            Key Directions Vocabulary
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
            These expressions are useful when asking for help, describing your
            location, or following directions.
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

        {/* Conversation Preview */}
        <section >
          <h2 >
            Asking for Directions Conversation Preview
          </h2>

          <p>
            Emma is trying to find the train station when she asks a shop clerk
            for help.
          </p>

          <div className={styles.card}>
            <div>
              <strong>Emma:</strong>

              <p className={styles.muted + " " + styles.spaced}>
                Excuse me, could you help me, please?
              </p>
            </div>

            <div>
              <strong>Shop Clerk:</strong>

              <p className={styles.muted + " " + styles.spaced}>
                Hello, yes of course! What do you need?
              </p>
            </div>

            <div>
              <strong>Emma:</strong>

              <p className={styles.muted + " " + styles.spaced}>
                I'm trying to find the train station, but I think I've lost my
                way.
              </p>
            </div>

            <div>
              <strong>Shop Clerk:</strong>

              <p className={styles.muted + " " + styles.spaced}>
                No worries. You're actually just around the corner. It's across
                the bridge, not far from here.
              </p>
            </div>
          </div>

          <p className={styles.smallText + " " + styles.spaced}>
            The full conversation continues with the shop clerk explaining the
            route using traffic lights, a park, a bridge, and a clock tower as
            landmarks.
          </p>
        </section>

        {/* Comprehension */}
        <section >
          <h2 >
            Directions Conversation Comprehension Questions
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
            Directions Discussion Questions
          </h2>

          <p>
            Use these questions to move beyond the conversation and get
            learners talking about travel and navigation.
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
            Practise the Full Directions Conversation
          </h2>

          <p className={styles.muted + " " + styles.spaced}>
            Open the full conversation in Synomilo to practise asking for and
            giving directions in context, explore useful vocabulary, and build
            confidence with everyday English.
          </p>

          <Link href="/home/conversations/68f1112fe34924c519ad">
            <span
              className={styles.button}
            >
              Open the conversation
              <ArrowRight className={styles.iconInline} size={17} />
            </span>
          </Link>
        </section>

        {/* Language Focus */}
        <section >
          <h2 >
            Language Focus: Asking for Directions
          </h2>

          <p>
            There are several simple ways to ask someone for directions.
            Encourage learners to use polite phrases when speaking to someone
            they don't know.
          </p>

          <div className={styles.gridTwo}>
            <div className={styles.card}>
              <strong>Could you help me?</strong>

              <p className={styles.smallText + " " + styles.spaced}>
                A polite way to get someone's attention before asking for
                information.
              </p>
            </div>

            <div className={styles.card}>
              <strong>Which way should I go?</strong>

              <p className={styles.smallText + " " + styles.spaced}>
                A natural question when you want someone to explain which
                direction to take.
              </p>
            </div>

            <div className={styles.card}>
              <strong>How do I get to...?</strong>

              <p className={styles.smallText + " " + styles.spaced}>
                One of the most common ways to ask how to reach a place.
              </p>
            </div>

            <div className={styles.card}>
              <strong>Is it far from here?</strong>

              <p className={styles.smallText + " " + styles.spaced}>
                A useful follow-up question when you want to know how long the
                journey will take.
              </p>
            </div>
          </div>

          <div className={styles.callout}>
            <Lightbulb
              className={styles.icon}
              size={20}
            />

            <div>
              <strong>Useful direction words</strong>

              <p className={styles.muted + " " + styles.spaced}>
                Go straight · turn left · turn right · cross the bridge · on
                your left · on your right · next to · across from · around the
                corner
              </p>
            </div>
          </div>
        </section>

        {/* Speaking Activity */}
        <section >
          <h2 >
            Speaking Activity: Give Me Directions
          </h2>

          <p>
            Put learners into pairs. One learner needs to find a location and
            the other learner must give directions.
          </p>

          <div className={styles.gridTwo}>
            <div className={styles.card}>
              <strong className={styles.largeLabel}>Person A</strong>

              <ul className={styles.spaced}>
                <li>You are visiting a new city.</li>
                <li>You are looking for the train station.</li>
                <li>You don't know the area.</li>
                <li>Ask at least three questions.</li>
              </ul>
            </div>

            <div className={styles.card}>
              <strong className={styles.largeLabel}>Person B</strong>

              <ul className={styles.spaced}>
                <li>You know the area well.</li>
                <li>Give clear directions.</li>
                <li>Use at least two landmarks.</li>
                <li>Check that the other person understands.</li>
              </ul>
            </div>
          </div>

          <p>
            Learners should include each of the following in their
            conversation:
          </p>

          <ol >
            {directionPrompts.map((prompt) => (
              <li key={prompt}>{prompt}</li>
            ))}
          </ol>
        </section>

        {/* Common mistakes */}
        <section >
          <h2 >
            Common Mistakes When Giving Directions
          </h2>

          <div className={styles.gridTwo}>
            <div className={styles.card}>
              <strong>Giving too many instructions at once</strong>

              <p className={styles.smallText + " " + styles.spaced}>
                Give one or two directions at a time so the listener can follow
                the route.
              </p>
            </div>

            <div className={styles.card}>
              <strong>Forgetting landmarks</strong>

              <p className={styles.smallText + " " + styles.spaced}>
                Places such as shops, parks, bridges, and traffic lights can
                make directions much easier to understand.
              </p>
            </div>

            <div className={styles.card}>
              <strong>Using unclear language</strong>

              <p className={styles.smallText + " " + styles.spaced}>
                Words such as "there" or "that way" can be confusing. Try to
                give a clear direction instead.
              </p>
            </div>

            <div className={styles.card}>
              <strong>Not checking understanding</strong>

              <p className={styles.smallText + " " + styles.spaced}>
                Ask if the other person understands or let them repeat the
                instructions back to you.
              </p>
            </div>
          </div>
        </section>

        {/* Homework */}
        <section >
          <h2 >
            Independent Practice
          </h2>

          <p>
            Ask learners to choose a familiar place near their home and write
            simple directions from their home to that location.
          </p>

          <p>They should include:</p>

          <ul >
            <li>At least two turns</li>
            <li>One landmark</li>
            <li>One phrase using "next to" or "across from"</li>
            <li>One distance expression</li>
            <li>A polite opening question</li>
          </ul>

          <p>
            Once finished, they should try to give the directions without
            looking at their notes.
          </p>
        </section>

        {/* Teaching tip */}
        <section >
          <h2 >
            Teaching Tip
          </h2>

          <div className={styles.callout}>
            <Lightbulb
              className={styles.icon}
              size={22}
            />

            <p>
              Directions become much easier to practise when learners have a
              visual map. Draw a simple street with a few shops, a park, a
              bridge, and traffic lights. Give each learner a different
              destination and have them ask each other for directions.
            </p>
          </div>
        </section>

        {/* Footer */}
        <footer >
          <Link
            href="/guides"

          >
            <ArrowLeft size={16} />
            Back to all Synomilo guides
          </Link>
        </footer>
          </GuideArticle>
  );
}
