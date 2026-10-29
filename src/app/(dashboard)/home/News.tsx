"use client";

import { useEffect, useState } from "react";
import { BadgePlus, BookOpen, BugOff, CircleArrowUp, Newspaper, type LucideIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import AuthLoading from "@/components/auth/AuthLoading";
import { listNewsDocuments, type NewsDocument } from "@/data/appwrite";
import styles from "./home.module.css";

const TAGS: Record<string, { label: string; className: string; Icon: LucideIcon }> = {
  news: { label: "News", className: "bg-blue-500 text-white", Icon: Newspaper },
  updates: { label: "Updates", className: "bg-green-500 text-white", Icon: CircleArrowUp },
  conversations: { label: "Conversations", className: "bg-orange-500 text-white", Icon: BookOpen },
  bugfixes: { label: "Bug Fixes", className: "bg-foreground text-background", Icon: BugOff },
  features: { label: "Features", className: "bg-pink-500 text-white", Icon: BadgePlus },
};

function resolveTag(tag?: string) {
  const key = (tag || "").toLowerCase().replace(/[^a-z0-9]/g, "").trim();
  return TAGS[key] || { label: tag || "News", className: "bg-blue-500 text-white", Icon: Newspaper };
}

function formatDate(iso?: string) {
  if (!iso) return "";
  const date = new Date(iso);
  return Number.isNaN(date.getTime()) ? "" : date.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
}

export default function News() {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState<NewsDocument[]>([]);

  useEffect(() => {
    let mounted = true;
    const run = async () => {
      try {
        const docs = await listNewsDocuments();
        if (mounted) setItems(docs);
      } catch {
        if (mounted) setItems([]);
      } finally { if (mounted) setLoading(false); }
    };
    void run();
    return () => { mounted = false; };
  }, []);

  return <section className={`${styles.card} ${styles.newsCard}`} aria-labelledby="news-heading" aria-busy={loading}>
    <header className={styles.newsHeader}><h2 id="news-heading">News and updates</h2><p>New conversations, features and changes to Synomilo.</p></header>
    {loading ? <div className={styles.newsPending}><AuthLoading /></div>
      : items.length === 0 ? <p className={styles.newsEmpty}>No updates yet.</p>
      : <div className={styles.newsList} role="region" aria-label="News items" tabIndex={0}>{items.map(doc => {
        const tag = resolveTag(doc.tag);
        const date = formatDate(doc.$createdAt);
        return <article key={doc.$id} className={styles.newsItem}>
          <div className={styles.newsMeta}><Badge className={`${tag.className} border-transparent px-2 py-0.5 text-[10px] font-medium [&_svg]:size-3`}><tag.Icon size={12} aria-hidden="true" />{tag.label}</Badge>{date && <time dateTime={doc.$createdAt}>{date}</time>}</div>
          {doc.title && <h3>{doc.title}</h3>}
          {doc.content && <p>{doc.content}</p>}
        </article>;
      })}</div>}
  </section>;
}
