import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import GuideShell from "@/components/guides/GuideShell";
import styles from "@/components/guides/guide-article.module.css";

/** About and policy pages share the article typography and motion. */
export default function InfoPage({ title, effectiveDate, intro, children }: {
  title: string;
  effectiveDate?: string;
  intro?: ReactNode;
  children: ReactNode;
}) {
  return <GuideShell>
    <main id="guide-main" className={styles.articleLayout}>
      <Link href="/" className={styles.backLink}><ArrowLeft size={16} aria-hidden="true" className="text-pink-500" />Back to Synomilo</Link>
      <article data-guide-content className={styles.content}>
        <header>
          {effectiveDate && <div className={styles.meta}><span>Effective date: {effectiveDate}</span></div>}
          <h1>{title}</h1>
          {intro && <p>{intro}</p>}
        </header>
        {children}
      </article>
    </main>
  </GuideShell>;
}
