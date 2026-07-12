import { DM_Sans, Geist } from "next/font/google";
import Link from "next/link";
import { ArrowRight, CircleArrowLeft } from "lucide-react";
import posts from "./posts";

const geist = Geist({ subsets: ["latin"] });
const dmSans = DM_Sans({ subsets: ["latin"] });

export const metadata = {
  title: "ESL Conversation Activities and Teaching Resources | Synomilo",
  description:
    "Explore ESL conversation lessons, vocabulary guides, discussion questions and teaching activities.",
};

export default function BlogPage() {
  const sortedPosts = [...posts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const topics = Array.from(
    new Set(sortedPosts.map((post) => post.topic).filter(Boolean))
  );

  return (
    <div className="flex justify-center items-center flex-col mx-auto w-full max-w-7xl px-4 py-6">
      <Link
        href="/"
        className={`${dmSans.className} inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground`}
      >
        <CircleArrowLeft size={16} />
        Back to Synomilo
      </Link>

      <header className="">

        <h1
          className={`${dmSans.className} mt-2 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl`}
        >
          ESL Conversation Activities and Teaching Resources
        </h1>

        <p
          className={`${dmSans.className} mt-4 text-base leading-7 text-muted-foreground sm:text-lg`}
        >
          Explore conversation lessons, vocabulary guides, discussion
          questions and practical activities for English tutors and learners.
        </p>
      </header>

      <div className="mt-10 grid gap-8 lg:grid-cols-[220px_minmax(0,1fr)]">
        <aside className="self-start rounded-xl border bg-background p-4 lg:sticky lg:top-6">
          <nav aria-label="Blog topics">
            <h2
              className={`${dmSans.className} text-sm font-semibold uppercase tracking-wide`}
            >
              Browse topics
            </h2>

            <ul className={`${geist.className} mt-4 space-y-2`}>
              {topics.map((topic) => (
                <li key={topic}>
                  <span className="text-sm text-muted-foreground">
                    {topic}
                  </span>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        <main className="min-w-0">
          <div className="flex items-end gap-4">
            <div className={`${dmSans.className}`}>
              <h2
                className={`text-2xl font-semibold tracking-tight`}
              >
                Latest articles <span>({sortedPosts.length})</span>
              </h2>

              <p className="mt-1 text-sm text-muted-foreground">
                Lesson ideas and resources for conversation-focused English
                practice.
              </p>
            </div>


          </div>

          <section
  className={`${geist.className} mt-6 grid max-h-[70vh] gap-5 overflow-y-auto md:grid-cols-2`}
          >
            {sortedPosts.map((post) => (
              <article
                key={post.slug}
      className="flex flex-col rounded-xl border bg-background p-5 transition-shadow hover:shadow-sm"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-muted px-2.5 py-1 text-xs font-medium">
                    {post.level}
                  </span>

                  <span className="text-xs font-medium text-muted-foreground">
                    {post.topic}
                  </span>
                </div>

                <h3
                  className={`${dmSans.className} mt-4 text-xl font-semibold leading-snug`}
                >
                  <Link
                    href={`/blog/${post.slug}`}
                    className="hover:underline"
                  >
                    {post.title}
                  </Link>
                </h3>

                <p className="mt-3 line-clamp-3 text-sm leading-6 text-muted-foreground">
                  {post.description}
                </p>

                <time
                  dateTime={post.date}
                  className="mt-4 text-xs text-muted-foreground"
                >
                  {formatDate(post.date)}
                </time>

                <div className="mt-auto pt-6">
                  <Link
                    href={`/blog/${post.slug}`}
                    className={`${dmSans.className} inline-flex items-center gap-1 text-sm font-semibold hover:underline`}
                  >
                    Read article
                    <ArrowRight size={15} />
                  </Link>
                </div>
              </article>
            ))}
          </section>
        </main>
      </div>
    </div>
  );
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(date));
}