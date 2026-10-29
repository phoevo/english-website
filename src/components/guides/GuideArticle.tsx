import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import GuideShell from "./GuideShell";
import styles from "./guide-article.module.css";

type RelatedGuide = { title: string; href: string };

export default function GuideArticle({ children, relatedGuides = [] }: {
  children: ReactNode;
  relatedGuides?: readonly RelatedGuide[];
}) {
  return <GuideShell>
    <main id="guide-main" className={styles.articleLayout}>
      <Link href="/guides" className={styles.backLink}><ArrowLeft size={16} aria-hidden="true" />All guides</Link>
      <article data-guide-content className={styles.content}>{children}</article>
      {relatedGuides.length > 0 && <aside aria-labelledby="related-guides-title" className={styles.related}>
        <h2 id="related-guides-title">Related guides</h2>
        <div className={styles.relatedGrid}>{relatedGuides.map(guide => <Link data-guide-card key={guide.href} href={guide.href} className={styles.relatedCard}>
          <h3>{guide.title}</h3><span>Read guide<ArrowUpRight size={16} aria-hidden="true" /></span>
        </Link>)}</div>
      </aside>}
    </main>
  </GuideShell>;
}
