import type { ReactNode } from "react";
import Link from "next/link";
import ModeToggle from "@/components/ui/ModeToggle";
import LeftSide from "./LeftSide";
import styles from "@/components/auth/auth.module.css";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return <div className={styles.shell}>
    <a href="#auth-main" className={styles.skipLink}>Skip to content</a>
    <aside className={styles.leftArtwork} aria-hidden="true"><LeftSide /></aside>
    <div className={styles.rightSide}>
      <header className={styles.siteHeader}>
        <Link href="/" className={styles.brand} aria-label="Synomilo home">synomilo</Link>
        <nav aria-label="Main navigation"><Link href="/guides">Guides</Link><Link href="/pricing">Pricing</Link><ModeToggle /></nav>
      </header>
      <main id="auth-main" className={styles.formColumn}>{children}</main>
    </div>
  </div>;
}
