"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, BookOpen, Bookmark } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useUserStore } from "@/data/useUserStore";
import AuthLoading from "@/components/auth/AuthLoading";
import { Skeleton } from "@/components/ui/skeleton";
import GuideTour, { type GuideStep } from "../GuideTour";
import News from "./News";
import styles from "./home.module.css";

gsap.registerPlugin(useGSAP);

const homeGuideSteps: GuideStep[] = [
  { target: "home-welcome", title: "Welcome", description: "Your recent conversation, saved vocabulary and news are all here." },
  { target: "home-recent", title: "Most recent conversation", description: "Continue your most recently viewed conversation, or open your history." },
  { target: "home-news", title: "News and updates", description: "Find updates about Synomilo and new content here." },
];

export default function HomePage() {
  const root = useRef<HTMLDivElement>(null);
  const { user, recentConversations, loading, dictionaryWords } = useUserStore();
  const conversation = recentConversations[0];
  const recentWords = [...dictionaryWords].reverse().slice(0, 5).map(entry => {
    const [word = ""] = entry.split("::");
    return word.replace(/\/.*?\//g, "").replace(/^\w/, letter => letter.toUpperCase());
  });

  useGSAP(() => {
    if (loading) return;
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.from("[data-home-intro] > *, [data-home-panel]", {
        y: 12, opacity: 0, duration: 0.55, stagger: 0.07, ease: "power2.out",
      });
    });
    return () => media.revert();
  }, { scope: root, dependencies: [loading, Boolean(user)], revertOnUpdate: true });

  return <div ref={root} className={styles.page} aria-busy={loading}>
    {loading ? <div className={styles.inner}>
      <div className={styles.loadingHeader}><Skeleton className="mt-5 h-9 w-64 max-w-full" /><Skeleton className="mt-3 h-4 w-80 max-w-full" /></div>
      <div className={styles.grid}><div className={styles.mainColumn}><Skeleton className="h-full min-h-0 w-full rounded-xl" /><Skeleton className="h-full min-h-0 w-full rounded-xl" /></div><Skeleton className="h-full min-h-0 w-full rounded-xl" /></div>
    </div> : <div className={styles.inner}>
      {user && <GuideTour id="home-page" steps={homeGuideSteps} />}
      <header data-guide="home-welcome" className={styles.welcome}>
        <div data-home-intro>
          <h1>{user ? `Welcome back, ${user.name}` : "Welcome to Synomilo"}</h1>
          {user ? <p>Your recent conversations, saved words and updates.</p> : <p><Link href="/login">Log in</Link> or <Link href="/register">create an account</Link> to keep your conversations and vocabulary in one place.</p>}
        </div>
      </header>

      <div className={user ? styles.grid : styles.guestGrid}>
        {user && <div className={styles.mainColumn}>
          <section data-home-panel data-guide="home-recent" className={styles.card} aria-labelledby="recent-heading">
            <header className={styles.cardHeader}><h2 id="recent-heading">Most recent conversation</h2><Link href="/home/recents" className={styles.smallLink}>View history<ArrowUpRight size={14} aria-hidden="true" /></Link></header>
            {conversation ? <Link href={`/home/conversations/${conversation.$id}`} className={styles.recentConversation}>
              <div className={styles.meta}>{conversation.level && <span>{conversation.level}</span>}{conversation.category && <span>{conversation.category}</span>}</div>
              <h3>{conversation.title}</h3>
              {conversation.description && <p>{conversation.description}</p>}
              <span className={styles.continueLink}>Continue reading<ArrowRight size={17} aria-hidden="true" /></span>
            </Link> : <div className={styles.empty}>
              <BookOpen size={22} strokeWidth={1.5} aria-hidden="true" /><p>No recent conversations yet.</p><Link href="/home/conversations" className={styles.textLink}>Browse the library<ArrowRight size={16} aria-hidden="true" /></Link>
            </div>}
          </section>

          <section data-home-panel data-guide="home-dictionary" className={styles.card} aria-labelledby="words-heading">
            <header className={styles.cardHeader}><h2 id="words-heading">Recently saved words</h2><Link href="/home/dictionary" className={styles.smallLink}>Open dictionary<ArrowUpRight size={14} aria-hidden="true" /></Link></header>
            {recentWords.length ? <ul className={styles.words}>{recentWords.map((word, index) => <li key={`${word}-${index}`}><span aria-hidden="true" className={styles.wordDot} /><span>{word}</span></li>)}</ul> : <div className={styles.empty}>
              <Bookmark size={22} strokeWidth={1.5} aria-hidden="true" /><p>No saved words yet.</p><p className={styles.emptyHint}>Save words from a conversation to find them here.</p>
            </div>}
          </section>
        </div>}
        <aside data-home-panel data-guide="home-news" className={styles.newsColumn} aria-label="News and updates"><News /></aside>
      </div>
    </div>}
  </div>;
}
