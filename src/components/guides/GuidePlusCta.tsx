import Link from "next/link";
import { ArrowRight } from "lucide-react";
import styles from "./guide-article.module.css";

/** Shown under the excerpt on guides whose conversation is part of Plus. */
export default function GuidePlusCta({ lineCount }: { lineCount: number }) {
  return <>
    <p>
      The full conversation is about {lineCount} lines, with audio and
      highlighted vocabulary. It is part of Plus.
    </p>

    <Link href="/pricing">
      <span className={styles.button}>
        Read the full conversation with Plus
        <ArrowRight className={styles.iconInline} size={17} />
      </span>
    </Link>

    <p className={`${styles.smallText} ${styles.spaced}`}>
      Or <Link href="/register">create a free account</Link> to read the free
      conversations, highlight word types and save words to your dictionary.
    </p>
  </>;
}
