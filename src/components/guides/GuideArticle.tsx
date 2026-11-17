import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowDown, ArrowLeft, ArrowUpRight } from "lucide-react";
import GuideShell from "./GuideShell";
import styles from "./guide-article.module.css";

type RelatedGuide = { title: string; href: string };

export default function GuideArticle({ children, relatedGuides = [] }: {
  children: ReactNode;
  relatedGuides?: readonly RelatedGuide[];
}) {
  const hasRelated = relatedGuides.length > 0;
  return <GuideShell>
    <main id="guide-main" className={hasRelated ? `${styles.articleLayout} ${styles.withRail}` : styles.articleLayout}>
      <div className={styles.articleTop}>
        <Link href="/guides" className={styles.backLink}><ArrowLeft size={16} aria-hidden="true" />All guides</Link>
        {/* Narrow screens: no room for the side column, so jump to the cards at the end. */}
        {hasRelated && <a href="#related-guides" className={styles.jumpLink}>Related guides<ArrowDown size={16} aria-hidden="true" /></a>}
      </div>
      <article data-guide-content className={styles.content}>{children}</article>
      {/* Wide screens: related guides stay beside the article while reading. */}
      {hasRelated && <nav aria-labelledby="related-rail-title" className={styles.rail}>
        <h2 id="related-rail-title">Related guides</h2>
        <ul>{relatedGuides.map(guide => <li key={guide.href}><Link href={guide.href}>{guide.title}<ArrowUpRight size={14} aria-hidden="true" /></Link></li>)}</ul>
      </nav>}
      {hasRelated && <aside id="related-guides" aria-labelledby="related-guides-title" className={styles.related}>
        <h2 id="related-guides-title">Related guides</h2>
        <div className={styles.relatedGrid}>{relatedGuides.map(guide => <Link data-guide-card key={guide.href} href={guide.href} className={styles.relatedCard}>
          <h3>{guide.title}</h3><span>Read guide<ArrowUpRight size={16} aria-hidden="true" /></span>
        </Link>)}</div>
      </aside>}
    </main>
  </GuideShell>;
}
