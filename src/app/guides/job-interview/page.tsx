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
    meaning: "A person who is applying for a job or position.",
  },
  {
    term: "leadership",
    meaning:
      "The ability to guide, support, and motivate a group of people.",
  },
  {
    term: "adaptability",
    meaning:
      "The ability to adjust successfully to new situations or challenges.",
  },
  {
    term: "dependable",
    meaning:
      "Reliable and trusted to complete work or keep a promise.",
  },
  {
    term: "prioritize",
    meaning:
      "To decide which tasks are the most important and complete them first.",
  },
  {
    term: "deadline",
    meaning:
      "The latest time or date by which a task must be completed.",
  },
  {
    term: "cultural fit",
    meaning:
      "How well a person's values and working style match an organization.",
  },
  {
    term: "technical interview",
    meaning:
      "An interview that tests the practical skills required for a role.",
  },
];

const usefulExpressions = [
  {
    expression: "Take a seat",
    meaning:
      "A polite invitation telling someone that they may sit down.",
  },
  {
    expression: "Look forward to",
    meaning:
      "To feel pleased or excited about something that will happen.",
  },
  {
    expression: "Catch someone's attention",
    meaning:
      "To make someone notice or become interested in something.",
  },
  {
    expression: "Push yourself further",
    meaning:
      "To challenge yourself to improve or achieve more.",
  },
  {
    expression: "Calm under pressure",
    meaning:
      "Able to remain relaxed and think clearly in a stressful situation.",
  },
  {
    expression: "The problem at hand",
    meaning:
      "The particular problem that needs to be dealt with now.",
  },
  {
    expression: "Stay aligned",
    meaning:
      "Continue sharing the same goals, priorities, or understanding.",
  },
  {
    expression: "Take on too much",
    meaning:
      "To accept more work or responsibility than you can reasonably manage.",
  },
  {
    expression: "Let someone down",
    meaning:
      "To disappoint someone by failing to do what they expected.",
  },
  {
    expression: "Step back",
    meaning:
      "To pause and consider a situation from a wider perspective.",
  },
  {
    expression: "Bite off more than you can chew",
    meaning:
      "To accept a task that is too difficult or too large to manage.",
  },
  {
    expression: "Keep a cool head",
    meaning:
      "To remain calm and think clearly during a difficult situation.",
  },
  {
    expression: "Part and parcel",
    meaning:
      "An unavoidable or normal part of a particular situation.",
  },
  {
    expression: "Hit the ground running",
    meaning:
      "To begin a new role and work effectively from the start.",
  },
  {
    expression: "Add value",
    meaning:
      "To make a useful or positive contribution to an organization.",
  },
  {
    expression: "From day one",
    meaning:
      "From the very first day that something begins.",
  },
  {
    expression: "Wrap up",
    meaning:
      "To finish a meeting, conversation, task, or activity.",
  },
  {
    expression: "Secure the position",
    meaning:
      "To successfully obtain the job that you applied for.",
  },
  {
    expression: "Out of time",
    meaning:
      "Having no time remaining to continue an activity.",
  },
  {
    expression: "Be in contact",
    meaning:
      "To communicate with someone again in the future.",
  },
];

const comprehensionQuestions = [
  "What position is Daniel interviewing for?",
  "How many years of professional experience does Daniel have?",
  "What responsibilities did Daniel have in his previous role?",
  "Why did Daniel decide to leave his last job?",
  "Which strengths does Daniel mention during the interview?",
  "What weakness does Daniel describe?",
  "What has Daniel learned to do when he has too much work?",
  "How does Daniel deal with tight deadlines?",
  "Why does Daniel believe he is a good fit for the position?",
  "Where would Daniel like to be in five years?",
  "What qualities is the company looking for in the successful candidate?",
  "What will happen during the next two interview rounds?",
];

const discussionQuestions = [
  "Have you ever attended a job interview in English?",
  "What is the most difficult interview question to answer?",
  "How should a candidate prepare before an interview?",
  "Is it acceptable to memorize answers before an interview?",
  "Which personal qualities make someone a strong candidate?",
  "What is more important: qualifications, experience, or personality?",
  "Should candidates always be completely honest about their weaknesses?",
  "How can someone demonstrate that they work well under pressure?",
  "How important is cultural fit when choosing a new employee?",
  "What questions should a candidate ask at the end of an interview?",
  "What mistakes can create a bad first impression?",
  "Would you prefer an online interview or an in-person interview? Why?",
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

type relatedGuides = {
  title: string;
  href: string;
};

const relatedGuides: relatedGuides[] = [
  {
    title: "Remote Work vs Office Work: B2 ESL Guide",
    href: "/guides/working-from-home-vs-the-office",
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
            <span>Job Interview ESL Lesson</span>
          </nav>

          <div className={styles.meta}>
            <span className={styles.tag}>
              B2
            </span>

            <span className={styles.tag}>
              Business English
            </span>

            <span className={styles.tag}>
              Speaking Lesson
            </span>

            <span className={styles.tag}>
              Job Interviews
            </span>
          </div>

          <h1 >
            Job Interview English: B2 ESL Lesson
          </h1>

          <p className={styles.muted}>
            A ready-to-use B2 Business English lesson about job interviews,
            including vocabulary, comprehension questions, discussion prompts,
            a mock interview role-play, and homework. Students practise giving
            clear, developed answers instead of short or memorised responses.
          </p>
        </header>

        {/* Lesson introduction */}
        <section >
          <h2 >
            About This Job Interview Lesson
          </h2>

          <p>
            Job interviews are a practical and important topic for adult
            English learners. Candidates must introduce themselves,
            summarize their experience, explain their strengths and
            weaknesses, and respond clearly to follow-up questions.
          </p>

          <p>
            The full Synomilo conversation follows Daniel during the first
            round of an interview for a front-end developer position.
            Miranda asks him several common interview questions about his
            background, previous role, ability to handle pressure, and
            career goals.
          </p>

          <p>
            Daniel uses natural professional English throughout the
            conversation. He supports his answers with explanations and
            examples instead of relying on short, memorized responses.
          </p>

          <div className={styles.card}>
            <strong className={styles.largeLabel}>Lesson focus</strong>

            <ul className={styles.checkList + " " + styles.spaced}>
              <li className={styles.checkItem}>
                <Check
                  className={styles.icon}
                  size={18}
                />
                Answering common English job interview questions
              </li>

              <li className={styles.checkItem}>
                <Check
                  className={styles.icon}
                  size={18}
                />
                Describing professional experience and responsibilities
              </li>

              <li className={styles.checkItem}>
                <Check
                  className={styles.icon}
                  size={18}
                />
                Discussing strengths and weaknesses professionally
              </li>

              <li className={styles.checkItem}>
                <Check
                  className={styles.icon}
                  size={18}
                />
                Using workplace idioms and natural business expressions
              </li>

              <li className={styles.checkItem}>
                <Check
                  className={styles.icon}
                  size={18}
                />
                Supporting answers with clear reasons and examples
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
            Begin with a short warm-up. Ask students to imagine they are
            preparing for an important job interview. Which part of the
            interview would make them feel most nervous?
          </p>

          <div className={styles.gridThree}>
            <div className={styles.card}>
              <strong className={styles.option}>
                Option A
              </strong>

              <p className={styles.smallText + " " + styles.spaced}>
                Introducing yourself and discussing your experience
              </p>
            </div>

            <div className={styles.card}>
              <strong className={styles.option}>
                Option B
              </strong>

              <p className={styles.smallText + " " + styles.spaced}>
                Talking about your weaknesses and previous mistakes
              </p>
            </div>

            <div className={styles.card}>
              <strong className={styles.option}>
                Option C
              </strong>

              <p className={styles.smallText + " " + styles.spaced}>
                Asking the interviewer questions at the end
              </p>
            </div>
          </div>

          <p>
            Encourage students to explain their choice. Useful follow-up
            prompts include:
          </p>

          <ul >
            <li>
              Have you ever attended a job interview in English?
            </li>

            <li>
              How do you normally prepare for an interview?
            </li>

            <li>
              What creates a positive first impression?
            </li>

            <li>
              What qualities would you look for if you were the
              interviewer?
            </li>
          </ul>
        </section>

        {/* Vocabulary */}
        <section >
          <h2 >
            Key Job Interview Vocabulary
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
            These expressions help students understand natural workplace
            English and give more detailed, confident interview answers.
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
          <h2 >Job Interview Conversation Preview</h2>
          <p>
            In the full conversation, Miranda interviews Daniel for a front-end
            developer role. This extract shows how Daniel supports his answers
            with reasons and examples.
          </p>
          <div className={styles.card}>
            <p><strong>Miranda:</strong> Can you tell me a bit about yourself?</p>
            <p><strong>Daniel:</strong> I'm a front-end developer with about five years of experience. In my last role, I led a small team and focused on improving performance and user experience.</p>
            <p><strong>Miranda:</strong> What would you say your strengths are?</p>
            <p><strong>Daniel:</strong> I'd say I'm organised and calm under pressure. I also believe clear communication is essential when a team is working toward a common goal.</p>
          </div>
        </section>

        {/* Comprehension */}
        <section >
          <h2 >
            Job Interview Comprehension Questions
          </h2>

          <p>
            Ask students to answer these questions after reading or
            listening to the conversation.
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
            Job Interview Discussion Questions
          </h2>

          <p>
            Use these questions to move from comprehension into a longer
            discussion about interviews, careers, and recruitment.
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

          <Link href="/home/conversations/69a3093fb5ff6367494c"
          target="_blank" rel="noopener noreferrer">
            <span className={styles.button}>
              Open the conversation
              <ArrowRight className={styles.iconInline} size={17} />
            </span>
          </Link>
        </section>


        {/* Language task */}
        <section >
          <h2 >
            Language Focus: Building Strong Interview Answers
          </h2>

          <p>
            Short answers can make a candidate sound unprepared. Encourage
            students to develop each answer by giving a clear statement,
            a reason, and a relevant example.
          </p>

          <div className={styles.card}>
            <strong className={styles.block}>
              Basic answer
            </strong>

            <p className={styles.muted + " " + styles.spaced}>
              "I'm organized."
            </p>

            <strong className={styles.block + " " + styles.spaced}>
              Developed answer
            </strong>

            <p className={styles.muted + " " + styles.spaced}>
              "I'd say I'm organized because I plan my workload carefully
              and decide which tasks are most urgent. In my previous role,
              this helped my team meet tight deadlines without lowering
              the quality of our work."
            </p>
          </div>

          <p>
            Ask students to prepare a developed answer for each of the
            following questions:
          </p>

          <ol >
            {interviewQuestions.map((question) => (
              <li key={question}>{question}</li>
            ))}
          </ol>

          <div className={styles.callout}>
            <Lightbulb
              className={styles.icon}
              size={20}
            />

            <div>
              <strong>Useful answer structure</strong>

              <p className={styles.muted + " " + styles.spaced}>
                Statement · Reason · Example · Connection to the role
              </p>
            </div>
          </div>
        </section>

        {/* Speaking activity */}
        <section >
          <h2 >
            Speaking Activity: Conduct a Mock Interview
          </h2>

          <p>
            Put students into pairs. One student is the interviewer and
            the other is the candidate. Give them a few minutes to choose
            a job and prepare their roles.
          </p>

          <div className={styles.gridTwo}>
            <div className={styles.card}>
              <strong className={styles.largeLabel}>
                Student A: Interviewer
              </strong>

              <ul className={styles.spaced}>
                <li>Introduce yourself and the company.</li>
                <li>Ask at least five interview questions.</li>
                <li>Ask two unexpected follow-up questions.</li>
                <li>Take notes about the candidate's answers.</li>
                <li>Give the candidate brief feedback.</li>
              </ul>
            </div>

            <div className={styles.card}>
              <strong className={styles.largeLabel}>
                Student B: Candidate
              </strong>

              <ul className={styles.spaced}>
                <li>Introduce your professional background.</li>
                <li>Give developed answers with examples.</li>
                <li>Use at least three expressions from the lesson.</li>
                <li>Ask two questions about the company.</li>
                <li>Thank the interviewer before leaving.</li>
              </ul>
            </div>
          </div>

          <p>
            When the interview is complete, students should switch roles
            and repeat the activity with a different position.
          </p>
        </section>

        {/* Common mistakes */}
        <section >
          <h2 >
            Common Job Interview Mistakes
          </h2>

          <div className={styles.gridTwo}>
            <div className={styles.card}>
              <strong>Giving very short answers</strong>

              <p className={styles.smallText + " " + styles.spaced}>
                Candidates should explain their answer and provide a
                relevant example.
              </p>
            </div>

            <div className={styles.card}>
              <strong>Speaking negatively about a previous employer</strong>

              <p className={styles.smallText + " " + styles.spaced}>
                Keep the answer professional and focus on growth or new
                opportunities.
              </p>
            </div>

            <div className={styles.card}>
              <strong>Claiming to have no weaknesses</strong>

              <p className={styles.smallText + " " + styles.spaced}>
                Choose a genuine weakness and explain the steps being
                taken to improve it.
              </p>
            </div>

            <div className={styles.card}>
              <strong>Having no questions for the interviewer</strong>

              <p className={styles.smallText + " " + styles.spaced}>
                Prepare thoughtful questions about the role, team, or
                company expectations.
              </p>
            </div>
          </div>
        </section>

        {/* Homework */}
        <section >
          <h2 >
            Homework Idea
          </h2>

          <p>
            Ask students to choose a real job advertisement written in
            English. They should study the description and prepare
            answers to the following questions:
          </p>

          <ul >
            <li>Why are you interested in this position?</li>
            <li>Which of your skills match the job description?</li>
            <li>What relevant experience can you describe?</li>
            <li>What is one professional weakness you are improving?</li>
            <li>Why should the company choose you?</li>
            <li>What questions would you ask the interviewer?</li>
          </ul>

          <p>
            Students should record a two-minute introduction beginning
            with "Tell me about yourself." In the next lesson, they can
            listen to the recording, identify areas for improvement, and
            complete another mock interview.
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
              Encourage students to memorize ideas rather than complete
              scripts. Real interviewers often ask follow-up questions or
              change the wording of a question. Students who understand
              their main points can adapt more naturally and avoid
              sounding rehearsed.
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
