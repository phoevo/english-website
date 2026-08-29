import { DM_Sans } from "next/font/google";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft, Clock3 } from "lucide-react";
import { fetchGuideBySlug } from "@/lib/guides";

const dmSans = DM_Sans({ subsets: ["latin"] });

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
    <article className={`mx-auto max-w-4xl px-5 py-8 lg:px-8 h-screen overflow-y-auto ${dmSans.className}`}>
      <Link
        href="/guides"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground transition hover:text-foreground"
      >
        <ArrowLeft size={16} />
        Back to all guides
      </Link>

      <header className="mt-6 space-y-4 border-b pb-6">
        <h1 className="text-3xl font-semibold leading-tight tracking-tight lg:text-5xl">
          {guide.title}
        </h1>

        <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
          {guide.level ? (
            <span className="rounded-full border bg-card px-3 py-1">{guide.level}</span>
          ) : null}
          {guide.topic ? (
            <span className="rounded-full border bg-card px-3 py-1">{guide.topic}</span>
          ) : null}
          {readTimeLabel ? (
            <span className="inline-flex items-center gap-1 rounded-full border bg-card px-3 py-1">
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
          <p className="max-w-3xl text-muted-foreground">{guide.meta_description}</p>
        ) : null}
      </header>

      {guide.featuredImage ? (
        <div className="relative mt-8 aspect-[16/8] w-full overflow-hidden rounded-xl border">
          <Image
            src={guide.featuredImage}
            alt={guide.title}
            fill
            sizes="(max-width: 1024px) 100vw, 1024px"
            className="object-cover"
          />
        </div>
      ) : null}

      <section
        className="prose prose-zinc prose-lg mt-10 max-w-none dark:prose-invert prose-headings:font-semibold prose-headings:tracking-tight prose-headings:text-foreground prose-h2:mt-12 prose-h2:mb-4 prose-h2:border-b prose-h2:pb-2 prose-h2:text-3xl prose-h3:mt-10 prose-h3:mb-3 prose-h3:text-2xl prose-p:my-5 prose-p:leading-8 prose-li:my-1 prose-ul:my-5 prose-ol:my-5 prose-blockquote:my-8 prose-blockquote:border-l-2 prose-blockquote:pl-6 prose-blockquote:text-2xl prose-blockquote:font-medium prose-a:text-pink-500 prose-a:no-underline hover:prose-a:underline prose-strong:text-foreground prose-code:rounded prose-code:bg-muted prose-code:px-1 prose-code:py-0.5"
        dangerouslySetInnerHTML={{ __html: guide.content }}
      />
    </article>
  );
}
