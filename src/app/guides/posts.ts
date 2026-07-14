export type Post = {
  slug: string;
  img?: string;
  title: string;
  description: string
  level: string;
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



];

export default posts;