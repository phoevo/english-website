export type Post = {
  slug: string;
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
    title: "Working From Home vs the Office",
    description:
      "A B2 ESL lesson with workplace vocabulary, discussion questions and activities about remote and office work.",
    level: "B2",
    topic: "Work and Careers",
    date: "2026-07-11",
    },



];

export default posts;