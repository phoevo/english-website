import GuideArticle from "@/components/guides/GuideArticle";
import styles from "@/components/guides/guide-article.module.css";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Clock3 } from "lucide-react";
import { fetchGuideBySlug } from "@/lib/guides";



type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const guide = await fetchGuideBySlug(slug);

  if (!guide) {
    return {
      title: "Guide not found | Synomilo",
    };
  }

  return {
    title: `${guide.title} | Synomilo`,
    description: guide.meta_description || guide.description || undefined,
    alternates: {
      canonical: `/guides/${guide.slug}`,
    },
    openGraph: {
      title: guide.title,
      description: guide.meta_description || guide.description || undefined,
      url: `/guides/${guide.slug}`,
      type: "article",
      images: guide.featuredImage ? [{ url: guide.featuredImage }] : undefined,
    },
  };
}

export default async function GuidePage({ params }: Props) {
  const { slug } = await params;
  const guide = await fetchGuideBySlug(slug);

  if (!guide) {
    notFound();
  }

  const publishedDate = guide.published || guide.updated || guide.$createdAt || null;
  const readTimeLabel =
    typeof guide.read_time === "number" && Number.isFinite(guide.read_time)
      ? `${guide.read_time} min read`
      : typeof guide.read_time === "string" && guide.read_time.trim().length > 0
        ? guide.read_time.trim()
        : null;

  return (
    <GuideArticle>
      <header >
        <h1 >
          {guide.title}
        </h1>

        <div className={styles.meta}>
          {guide.level ? (
            <span className={styles.tag}>{guide.level}</span>
          ) : null}
          {guide.topic ? (
            <span className={styles.tag}>{guide.topic}</span>
          ) : null}
          {readTimeLabel ? (
            <span className={styles.tag}>
              <Clock3 size={14} />
              {readTimeLabel}
            </span>
          ) : null}
          {publishedDate ? (
            <time dateTime={publishedDate}>
              {new Intl.DateTimeFormat("en", {
                day: "numeric",
                month: "long",
                year: "numeric",
                timeZone: "UTC",
              }).format(new Date(publishedDate))}
            </time>
          ) : null}
        </div>

        {guide.meta_description ? (
          <p >{guide.meta_description}</p>
        ) : null}
      </header>

      {guide.featuredImage ? (
        <div className={styles.featuredImage}>
          <Image
            src={guide.featuredImage}
            alt={guide.title}
            fill
            sizes="(max-width: 1024px) 100vw, 1024px"

          />
        </div>
      ) : null}

      <section
        className={styles.richText}
        dangerouslySetInnerHTML={{ __html: guide.content }}
      />
    </GuideArticle>
  );
}
