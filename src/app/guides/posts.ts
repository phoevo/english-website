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



];

export default posts;