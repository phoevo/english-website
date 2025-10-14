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
    date: "2024-09-15",
    tags: ["Speaking", "Fluency"],
  },
];

export default posts;