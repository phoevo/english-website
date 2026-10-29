import type { ReactNode } from "react";
import Link from "next/link";
import ModeToggle from "@/components/ui/ModeToggle";
import GuideMotion from "./GuideMotion";
import styles from "./guide-article.module.css";

export default function GuideShell({ children }: { children: ReactNode }) {
  return <div className={styles.shell}>
    <a href="#guide-main" className={styles.skipLink}>Skip to content</a>
    <header className={styles.siteHeader}>
      <Link href="/" className={styles.brand} aria-label="Synomilo home">synomilo</Link>
      <nav aria-label="Main navigation" className={styles.siteNav}>
        <Link href="/guides">Guides</Link>
        <Link href="/pricing">Pricing</Link>
        <Link href="/home/conversations" className={styles.headerBrowse}>Conversations</Link>
        <ModeToggle />
      </nav>
    </header>
    <GuideMotion>{children}</GuideMotion>
    <footer className={styles.siteFooter}>
      <Link href="/" className={styles.brand}>synomilo</Link>
      <nav aria-label="Legal"><Link href="/about">About</Link><Link href="/ToS">Terms</Link><Link href="/privacy">Privacy</Link><Link href="/refund">Refunds</Link></nav>
    </footer>
  </div>;
}
