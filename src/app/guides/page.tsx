import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import posts from "./posts";
import { fetchPublishedGuides } from "@/lib/guides";
import GuideShell from "@/components/guides/GuideShell";
import styles from "@/components/guides/guide-article.module.css";

export const metadata = {
  title: "ESL Conversation Activities and Teaching Resources | Synomilo",
  description:
    "Explore ESL conversation lessons, vocabulary guides, discussion questions and teaching activities.",
};
export const dynamic = "force-dynamic";

export default async function GuidesPage() {
  const appwriteGuides = await fetchPublishedGuides();
  const fromAppwrite = appwriteGuides.map((guide) => ({
    slug: guide.slug,
    img: guide.featuredImage || "",
    title: guide.title,
    description: guide.meta_description || guide.description || "",
    level: guide.level,
    topic: guide.topic,
    date: guide.published || guide.updated || guide.$createdAt || new Date().toISOString(),
  }));
  const staticFallback = posts.filter(
    (post) => !fromAppwrite.some((guide) => guide.slug === post.slug)
  );
  const sortedPosts = [...fromAppwrite, ...staticFallback].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return <GuideShell>
    <main id="guide-main" className={styles.index}>
      <header data-guide-index-intro className={styles.indexIntro}>
        <h1>Conversation guides</h1>
        <p>Optional vocabulary, questions and activities to use alongside the conversations.</p>
      </header>
      <div className={styles.indexGrid}>
        {sortedPosts.map(post => <article data-guide-card key={post.slug} className={styles.indexCard}>
          {post.img ? <Image className={styles.indexImage} src={post.img} alt={post.title} width={1200} height={675} sizes="(max-width: 639px) 100vw, (max-width: 1200px) 50vw, 576px" /> : <div aria-hidden="true" className={styles.indexImage} />}
          <div className={styles.indexCardBody}>
            <div className={styles.meta}>{post.level && <span>{post.level}</span>}{post.topic && <span>{post.topic}</span>}</div>
            <h2><Link href={`/guides/${post.slug}`}>{post.title}</Link></h2>
            <p>{post.description}</p>
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <Link href={`/guides/${post.slug}`} className={styles.readLink}>Read guide<ArrowUpRight size={16} aria-hidden="true" /></Link>
          </div>
        </article>)}
      </div>
    </main>
  </GuideShell>;
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(date));
}
