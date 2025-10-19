export type Post = {
  title: string;
  slug: string;
  excerpt: string;
  date: string; // ISO date
  tags?: string[];
};

export const posts: Post[] = [
  {
    title: "How to Sound More Native",
    slug: "how-to-sound-native",
    excerpt: "Use natural expressions to sound fluent fast.",
    date: "2025-10-10",
    tags: ["Speaking", "Fluency"],
  },
  {
    title: "Common English Conversation Mistakes",
    slug: "common-english-conversation-mistakes",
    excerpt: "Correct commmon mistakes to improve your fluency.",
    date: "2025-10-18",
    tags: ["Speaking", "Fluency", "Mistakes"],
  },
];

export default posts;