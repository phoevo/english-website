import posts from "./posts";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Synomilo Blog — English Learning Insights",
  description: "Practical advice for learners and tutors to improve English fluency.",
};

export default function BlogPage() {
  const latest = posts
    .slice()
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0] || posts[0];

  if (latest) {
    redirect(`/blog/${latest.slug}`);
  }

  return null;
}
