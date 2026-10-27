"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { ArrowDown, ArrowUpRight, ArrowRight, Plus } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import styles from "./landing.module.css";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const topics = [
  { name: "Everyday life", level: "A1 · Everyday", title: "A small introduction", lines: ["Hi, I’m Alex. Is this your first time here?", "It is! I’ve just moved to the neighbourhood.", "Welcome, then. Let me show you around."], phrase: "show you around", meaning: "Help someone get to know a place." },
  { name: "Travel", level: "A2 · Directions", title: "Finding your way", lines: ["Excuse me. Is the station far from here?", "Not at all. Keep going until you reach the square.", "Thanks. I’m still finding my way around."], phrase: "finding my way", meaning: "Learning how to get from one place to another." },
  { name: "Work", level: "B1 · Business", title: "After the meeting", lines: ["What did you think of the new proposal?", "It’s a good starting point. We need more detail.", "Shall we pick it up again tomorrow?"], phrase: "pick it up", meaning: "Continue something after a pause." },
  { name: "Different opinions", level: "B2 · Society", title: "Room for a different view", lines: ["I think working from home gives people more freedom.", "I see your point. But I miss talking to people in person.", "Maybe there’s a middle ground."], phrase: "middle ground", meaning: "A position between two different opinions." },
];
const questions = [
  ["Who is it for?", "English tutors who want conversation material they can bring straight into a lesson. Learners can use the library too."],
  ["Do I have to follow a lesson plan?", "No. Read it together, turn it into a role-play, pull out useful language, or let it lead to a completely different discussion. The teaching guides are optional."],
  ["Can I save words and keep my place?", "Yes. With an account, you can add vocabulary to your dictionary, revisit recent conversations, and mark conversations complete."],
  ["Can I try it first?", "Yes. Browse the library and start with the free conversations. You can see the available plans on the pricing page."],
];

export default function LandingPage() {
  const page = useRef<HTMLDivElement>(null);
  const preview = useRef<HTMLDivElement>(null);
  const [topicIndex, setTopicIndex] = useState(0);
  const [highlighted, setHighlighted] = useState(false);
  const topic = topics[topicIndex];

  const { contextSafe } = useGSAP(() => {
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.timeline({ defaults: { ease: "power4.out" } })
        .from("[data-hero-line]", { yPercent: 110, rotation: 3, duration: 1.15, stagger: 0.13 })
        .from("[data-hero-detail]", { y: 24, opacity: 0, duration: 0.7, stagger: 0.1 }, "-=0.65")
        .from("[data-paper]", { y: 100, rotation: -8, opacity: 0, duration: 1.1 }, "-=0.8");
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach(element => {
        gsap.from(element, { y: 55, opacity: 0, duration: 0.9, ease: "power3.out", scrollTrigger: { trigger: element, start: "top 90%", once: true } });
      });
      gsap.fromTo("[data-emphasis]", { backgroundSize: "0% 100%" }, { backgroundSize: "100% 100%", ease: "power2.inOut", duration: 0.9, scrollTrigger: { trigger: "[data-emphasis]", start: "top 80%", once: true } });
    }, page);
    return () => media.revert();
  }, { scope: page });

  const chooseTopic = contextSafe((index: number) => {
    setTopicIndex(index);
    setHighlighted(false);
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.fromTo(preview.current, { y: 24, rotation: -2, opacity: 0.3 }, { y: 0, rotation: 0, opacity: 1, duration: 0.65, ease: "power3.out", overwrite: true });
    }
  });

  const highlight = contextSafe(() => {
    setHighlighted(value => !value);
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.fromTo("[data-phrase]", { scale: 1.09 }, { scale: 1, duration: 0.55, ease: "elastic.out(1, 0.45)", overwrite: true });
    }
  });

  return <div ref={page} className={styles.page}>
    <a href="#main" className={styles.skip}>Skip to content</a>
    <header className={styles.header}>
      <Link href="/" className={styles.wordmark} aria-label="Synomilo home">synomilo<span aria-hidden="true">.</span></Link>
      <nav aria-label="Main navigation" className={styles.nav}>
        <Link href="#conversations" className={styles.desktopLink}>The conversations</Link>
        <Link href="/pricing" className={styles.desktopLink}>Pricing</Link>
        <Link href="/login">Log in</Link>
        <Link href="/home/conversations" className={styles.navCta}>Open the library <ArrowUpRight size={17} /></Link>
      </nav>
    </header>

    <main id="main">
      <section className={styles.hero} aria-labelledby="hero-title">
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow} data-hero-detail><span className={styles.dot} /> English conversations. Ready to teach.</p>
          <h1 id="hero-title" className={styles.heroTitle}>
            <span className={styles.line}><span data-hero-line>Here&apos;s the</span></span>
            <span className={styles.line}><span data-hero-line>content.</span></span>
            <span className={`${styles.line} ${styles.serif}`}><span data-hero-line>Teach it your way.</span></span>
          </h1>
          <div className={styles.heroBottom} data-hero-detail>
            <p>Good conversations leave room for you.<br />Find one. Open it. See where the lesson goes.</p>
            <Link href="/home/conversations" className={styles.primaryCta}>Find a conversation <ArrowUpRight size={21} /></Link>
          </div>
        </div>
        <div className={styles.heroArt} data-paper>
          <div className={styles.paperBack} aria-hidden="true" />
          <div className={styles.paper}>
            <div className={styles.paperMeta}><span>A2 / Everyday life</span><span>01</span></div>
            <h2>A table<br />for two.</h2>
            <div className={styles.dialogue}>
              <p><span>MAYA</span><span>Do you come here often?</span></p>
              <p><span>LEO</span><span>Only for the coffee. And maybe the cake.</span></p>
              <p><span>MAYA</span><span>Well, <mark>when in Rome.</mark></span></p>
            </div>
            <div className={styles.marginNote}><span aria-hidden="true">↳</span> A phrase. A story.<br />A whole new conversation.</div>
            <div className={styles.paperFoot}><span>Conversation excerpt · Preview</span><ArrowUpRight size={19} /></div>
          </div>
          <span className={styles.artCaption}>A little material. A lot to talk about.</span>
        </div>
      </section>

      <div className={styles.sectionBreak}><span>Less preparation. More conversation.</span><a href="#conversations" aria-label="Explore the conversations"><ArrowDown size={20} /></a></div>

      <section id="conversations" className={styles.library} aria-labelledby="library-title">
        <div className={styles.sectionHeading} data-reveal>
          <p className={styles.eyebrow}>01 / Find your starting point</p>
          <h2 id="library-title">Real life.<br /><span className={styles.muted}>Worth talking about.</span></h2>
          <p>From first introductions to different points of view.<br />Choose the level. Follow your curiosity.</p>
        </div>
        <div className={styles.libraryBody} data-reveal>
          <div className={styles.topicList} role="group" aria-label="Preview a conversation topic">
            {topics.map((item, index) => <button key={item.name} type="button" aria-pressed={topicIndex === index} aria-controls="conversation-preview" onClick={() => chooseTopic(index)} className={`${styles.topicButton} ${topicIndex === index ? styles.topicActive : ""}`}><span className={styles.topicNumber}>0{index + 1}</span>{item.name}<ArrowUpRight size={22} /></button>)}
            <Link href="/home/conversations" className={styles.textLink}>Browse by level and category <ArrowRight size={17} /></Link>
          </div>
          <div id="conversation-preview" className={styles.preview} ref={preview}>
            <div className={styles.previewMeta}><span>{topic.level}</span><span>Sample conversation</span></div>
            <div aria-live="polite" aria-atomic="true">
              <h3>{topic.title}</h3>
              <div className={styles.previewLines}>{topic.lines.map((line, index) => <p key={`${topicIndex}-${index}`}><span>{index % 2 === 0 ? "A" : "B"}</span><span>{line.includes(topic.phrase) ? <>{line.split(topic.phrase)[0]}<mark data-phrase className={highlighted ? styles.phraseActive : styles.phrase}>{topic.phrase}</mark>{line.split(topic.phrase)[1]}</> : line}</span></p>)}</div>
            </div>
            <button type="button" aria-pressed={highlighted} onClick={highlight} className={styles.highlightButton}>{highlighted ? "Hide the meaning" : "Try highlighting a phrase"}<Plus size={17} className={highlighted ? styles.plusOpen : ""} /></button>
            {highlighted && <p className={styles.meaning} role="status"><strong>{topic.phrase}</strong> — {topic.meaning}</p>}
          </div>
        </div>
      </section>

      <section className={styles.approach} aria-labelledby="approach-title">
        <p className={styles.eyebrow} data-reveal>02 / Make it yours</p>
        <h2 id="approach-title" data-reveal>The conversation is<br />a starting point.<br /><span data-emphasis>The lesson is yours.</span></h2>
        <div className={styles.approachBottom}>
          <p data-reveal>Read it together. Switch roles. Follow a tangent.<br />You know your students. Take it from here.</p>
          <div className={styles.features}>
            {[["Find useful language.", "Highlight words and phrases as you read."], ["Keep what matters.", "Save vocabulary to your dictionary. Pick up from your recents."], ["Teach your way.", "Use the optional guides, or bring your own ideas."]].map(([title, description], index) => <div key={title} data-reveal><span>0{index + 1}</span><div><h3>{title}</h3><p>{description}</p></div></div>)}
          </div>
        </div>
      </section>

      <section className={styles.faq} aria-labelledby="faq-title">
        <div data-reveal><p className={styles.eyebrow}>A few things to know</p><h2 id="faq-title">Before you<br />jump in.</h2></div>
        <div className={styles.questions}>{questions.map(([question, answer]) => <details key={question} data-reveal><summary>{question}<Plus size={21} /></summary><p>{answer}</p></details>)}</div>
      </section>

      <section className={styles.closing}>
        <p className={styles.eyebrow} data-reveal>Your next lesson starts here.</p>
        <Link href="/home/conversations" className={styles.closingLink} data-reveal>Let&apos;s talk.<ArrowUpRight aria-hidden="true" /></Link>
        <div className={styles.closingBottom}><span>Open the library. Find something good.</span><Link href="/register">Create a free account <ArrowRight size={17} /></Link></div>
      </section>
    </main>
    <footer className={styles.footer}>
      <Link href="/" className={styles.wordmark}>synomilo.</Link><p>Here&apos;s the content. Teach it your way.</p>
      <nav aria-label="Footer"><Link href="/guides">Guides</Link><Link href="/about">About</Link><Link href="/pricing">Pricing</Link><Link href="/privacy">Privacy</Link><Link href="/ToS">Terms</Link></nav>
    </footer>
  </div>;
}
