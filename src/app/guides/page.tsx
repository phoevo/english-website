import { DM_Sans, Geist } from "next/font/google";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CircleArrowLeft } from "lucide-react";
import posts from "./posts";

const geist = Geist({ subsets: ["latin"] });
const dmSans = DM_Sans({ subsets: ["latin"] });

export const metadata = {
  title: "ESL Conversation Activities and Teaching Resources | Synomilo",
  description:
    "Explore ESL conversation lessons, vocabulary guides, discussion questions and teaching activities.",
};

export default function GuidesPage() {
  const sortedPosts = [...posts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const topics = Array.from(
    new Set(sortedPosts.map((post) => post.topic).filter(Boolean))
  );

  return (
    <div className="mx-auto flex h-dvh w-full flex-col overflow-hidden py-6">
      <Link
        href="/"
        className={`${dmSans.className} inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground`}
      >
        <CircleArrowLeft size={16} />
        Back to Synomilo
      </Link>

      <header className="flex flex-col items-center">

        <h1
          className={`${dmSans.className} mt-2 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl px-5`}
        >
          ESL Conversation Activities and Teaching Resources
        </h1>

        <p
          className={`${dmSans.className} mt-4 text-base leading-7 text-muted-foreground sm:text-lg px-5`}
        >
          Explore conversation lessons, vocabulary guides, discussion
          questions and practical activities for English tutors and learners.
        </p>
      </header>

      <div className="h-full w-full min-h-0">
         {/* <aside className="hidden lg:block self-start rounded-xl border bg-background p-4 lg:sticky lg:top-6">
          <nav aria-label="Guide topics">
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
        </aside> */}

        <main className="min-w-0 min-h-0 h-full w-full">


          <section
            className={`${geist.className} mt-6 grid h-full min-h-0 gap-5 overflow-y-auto pb-4 md:grid-cols-2 lg:grid-cols-3 px-5 lg:px-20`}
          >
            {sortedPosts.map((post) => (
           <article
  key={post.slug}
  className="flex flex-col rounded-xl border bg-background transition-shadow hover:shadow-sm"
>
  <Image
    className="rounded-t-xl min-h-md"
    src={post.img}
    alt={post.title}
    width={1200}
    height={800}
    sizes="(max-width: 768px) 100vw, 33vw"
  />

  <div className="flex flex-1 flex-col p-5">
    <h3
      className={`${dmSans.className} text-xl font-semibold leading-snug`}
    >
      <Link
        href={`/guides/${post.slug}`}
        className="flex items-start gap-2 hover:underline"
      >
        <span className="min-w-0">{post.title}</span>

        {post.level && <span className="shrink-0 rounded-full border bg-secondary px-2 py-0.5 text-sm font-medium">
          {post.level}
        </span>}
      </Link>
    </h3>

    <div className="flex flex-wrap items-center gap-2">
      <span className="text-xs font-medium text-muted-foreground">
        {post.topic}
      </span>
    </div>

    <p className="mt-3 text-sm text-muted-foreground">
      {post.description}
    </p>

    <time
      dateTime={post.date}
      className="mt-4 text-xs text-muted-foreground"
    >
      {formatDate(post.date)}
    </time>

    <div className="mt-auto pt-4">
      <Link
        href={`/guides/${post.slug}`}
        className={`${dmSans.className} inline-flex items-center gap-1 text-sm font-semibold hover:underline`}
      >
        Read guide
        <ArrowRight size={15} />
      </Link>
    </div>
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