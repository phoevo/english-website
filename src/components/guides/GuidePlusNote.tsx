import Link from "next/link";
import styles from "./guide-article.module.css";

type FreeGuide = { title: string; href: string };

/**
 * Shown under the intro of guides whose conversation is part of Plus, pointing
 * to a related free guide that has a full conversation and PDF.
 */
export default function GuidePlusNote({ freeGuide }: { freeGuide?: FreeGuide }) {
  return <p className={styles.plusNote}>
    <strong>This conversation is part of Plus.</strong>{" "}
    {freeGuide
      ? <>For a free example, the <Link href={freeGuide.href}>{freeGuide.title}</Link> has a full conversation you can read online or download as a PDF.</>
      : <>For a free example, the <Link href="/guides">free guides</Link> have full conversations you can read online or download as a PDF.</>}
  </p>;
}
