export type Post = {
  slug: string;
  img?: string;
  title: string;
  description: string
  level?: string;
  readTime?: string;
  topic: string;
  date: string; // ISO date
  tags?: string[];
};

const posts = [
  {
    slug: "working-from-home-vs-the-office",
    img:"https://images.unsplash.com/photo-1591382696684-38c427c7547a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Working From Home vs the Office",
    description:
      "A B2 ESL lesson guide with workplace vocabulary, discussion questions and activities about remote and office work.",
    level: "B2",
    topic: "Work and Careers",
    date: "2026-07-11",
    },
    {
    slug: "job-interview",
    img: "https://images.unsplash.com/photo-1573497620053-ea5300f94f21?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Job Interview",
    description:
      "A B2 ESL lesson guide with interview vocabulary, discussion questions and activities about interview performance.",
    level: "B2",
    topic: "Work and Careers",
    date: "2026-07-12",
    },
      {
    slug: "networking-event",
    img: "https://images.unsplash.com/photo-1675716921224-e087a0cca69a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Networking Event",
    description:
      "A B1 ESL lesson guide with vocabulary needed for networking, discussion questions and activities about networking events and interactions.",
    level: "B1",
    topic: "Work and Careers",
    date: "2026-07-13",
    },
    {
  slug: "directions",
  img: "https://images.unsplash.com/photo-1556741533-6e6a62bd8b49?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  title: "Asking for Directions",
  description:
    "An A2 ESL lesson guide with vocabulary needed for networking, discussion questions and activities about networking events and interactions.",
  level: "A2",
  topic: "Everyday & Travel English",
  date: "2026-08-22",
},
{
  slug: "cefr-discussion-prompts",
  img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  title: "CEFR Levels: Designing Discussion Prompts for A2–B2",
  description:
    "Learn how to design level-appropriate discussion tasks for A2, B1, and B2 adult learners using real-world scenarios, clear constraints, and practical lesson-planning techniques.",
  level: "A2–B2",
  topic: "Lesson Planning",
  date: "2026-08-26",
},
{
  slug: "esl-conversation-lessons-build-a-reusable-prep-template",
  img: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  title: "ESL Conversation Lessons: Build a Reusable Prep Template",
  description:
    "Build a reusable ESL conversation lesson template and fill every stage with ready-made material in under 15 minutes. Follow this step-by-step prep tutorial.",
  level: "A2–B2",
  topic: "For Tutors",
  date: "2026-08-27",
},
{
  slug: "online-teaching-resources-why-usability-beats-breadth",
  img: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by5wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  title: "Online Teaching Resources: Why Usability Beats Breadth",
  description:
    "Find out why the best online teaching resources prioritize immediate usability over breadth and how tutors can stop wasting prep time on sprawling libraries.",
  topic: "Teaching Resources",
  date: "2026-08-28",
},
{
  slug: "self-correction-the-tutor-skill-nobody-teaches",
  img: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  title: "Self-Correction: The Tutor Skill Nobody Teaches",
  description:
    "Discover why self-correction outperforms traditional corrective feedback in one-to-one lessons and how tutors can build this powerful habit in learners.",
  topic: "Teaching Resources",
  date: "2026-08-28",
},
{
  slug: "fluency-system-for-esl-why-b1-learners-freeze",
  img: "https://images.unsplash.com/photo-1514369118554-e20d93546b30?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  title: "Fluency System for ESL: Why B1 Learners Freeze",
  description:
    "Discover why B1 ESL students freeze mid-conversation despite strong comprehension skills, and how scenario-based speaking practice can close the gap.",
  topic: "Teaching Resources",
  date: "2026-08-28",
},


];

export default posts;