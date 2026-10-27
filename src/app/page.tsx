"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import ModeToggle from "@/components/ui/ModeToggle";
import { ArrowRight, ArrowUpRight, Check, Plus, BookOpen, ArrowDown } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type ConversationCover = { title: string; level: string; category: string; description: string; href: string };

const covers: ConversationCover[] = [
  { title: "Networking Event", level: "B1", category: "Business", description: "Meeting someone at a networking event.", href: "/home/conversations/68ce638012a4e95d0cfe" },
  { title: "Introducing Friends", level: "B1", category: "Everyday", description: "Two friends meet for the first time.", href: "/home/conversations/68d7ccc8ad1883908843" },
  { title: "Short Introduction", level: "A1", category: "Everyday", description: "Friends introduce themselves.", href: "/home/conversations/68e40ca8c90bed6fa1fb" },
  { title: "Directions", level: "A1", category: "Directions", description: "A student asks a shop clerk for directions.", href: "/home/conversations/68f1112fe34924c519ad" },
  { title: "Getting to Oxford", level: "A2", category: "Directions", description: "A student asks for help at a London station.", href: "/home/conversations/699c47e1e303e8d208cd" },
  { title: "Job Interview", level: "B2", category: "Business", description: "First round interview at a new company.", href: "/home/conversations/69a3093fb5ff6367494c" },
  { title: "Scheduling Dinner with a Friend", level: "A2", category: "Lifestyle", description: "Two friends arrange dinner.", href: "/home/conversations/69ff65793c924e35625a" },
  { title: "Working from Home vs The Office", level: "B2", category: "Business", description: "Two colleagues discuss where they prefer to work.", href: "/home/conversations/6a1c68581f9bbab1c1d9" },
];

const definitions: Record<string, string> = {
  can: "To be able to do something.", you: "The person being spoken to.", tell: "To give someone information.", me: "The person speaking.", a: "Introduces one person or thing.", bit: "A small amount.", about: "On the subject of something.", yourself: "The person being addressed.",
  in: "Within a place, period or situation.", my: "Belonging to the person speaking.", last: "The most recent one before now.", role: "A person's job or responsibilities.", i: "The person speaking.", led: "Managed or guided; the past tense of lead.", small: "Limited in size or number.", team: "People working together.", and: "Connects words or ideas.", focused: "Gave particular attention to something.", on: "Indicates the subject of attention or activity.", improving: "Making something better.", performance: "How well or efficiently something works.", user: "A person who uses a product or service.", experience: "What using a product feels like; also knowledge gained through doing things.",
  what: "Asks for information about something.", would: "Used to describe a possible situation or make a question less direct.", say: "To express something in words.", your: "Belonging to the person being addressed.", strengths: "Things someone does well.", are: "A form of the verb be.",
  "i'd": "Short for I would.", "i'm": "Short for I am.", organised: "Able to plan and arrange things effectively.", calm: "Not worried, angry or excited.", under: "In this phrase, experiencing a difficult demand.", pressure: "Demands that make a situation difficult or stressful.", also: "In addition.", believe: "To think something is true.", clear: "Easy to understand.", communication: "Sharing information and ideas.", is: "A form of the verb be.", essential: "Completely necessary.", when: "At the time that something happens.", working: "Doing a job or making an effort.", toward: "In the direction of an aim.", common: "Shared by more than one person.", goal: "Something you are trying to achieve.",
};
const nounWords = new Set(["bit", "role", "team", "performance", "user", "experience", "strengths", "pressure", "communication", "goal"]);
const verbWords = new Set(["can", "tell", "led", "focused", "improving", "would", "say", "are", "i'd", "i'm", "believe", "is", "working"]);
const lines: [speaker: string, text: string][] = [
  ["Miranda", "Can you tell me a bit about yourself?"],
  ["Daniel", "In my last role, I led a small team and focused on improving performance and user experience."],
  ["Miranda", "What would you say your strengths are?"],
  ["Daniel", "I'd say I'm organised and calm under pressure. I also believe clear communication is essential when a team is working toward a common goal."],
];
const labels = ["Dialogue", "Nouns", "Verbs", "Idioms", "Dictionary", "Guides"];
const clean = (word: string): string => word.toLowerCase().replace(/[^a-z'-]/g, "");
const color = {
  nouns: "bg-pink-500 text-white",
  verbs: "bg-red-500 text-white",
  idioms: "bg-indigo-500 text-white",
};

function Cover({ cover, duplicate }: { cover: ConversationCover; duplicate: boolean }) {
  return (
    <Link href={cover.href} tabIndex={duplicate ? -1 : undefined}
      className="block min-h-[260px] rounded-2xl border border-border bg-background p-5 text-foreground transition-colors hover:border-foreground/35 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground motion-reduce:transition-none">
      <h2 className="border-b border-border pb-1.5 text-base font-semibold leading-snug">{cover.title}</h2>
      <p className="mt-2 flex flex-wrap gap-x-2 text-xs"><span>{cover.level}</span><span className="text-muted-foreground">{cover.category}</span></p>
      <p className="mt-7 text-sm leading-6 text-foreground/85">{cover.description}</p>
    </Link>
  );
}

function Guide() {
  return (
    <article style={{ colorScheme: "light" }} className="h-full overflow-y-auto rounded-xl border border-white/20 bg-[#fafafa] p-6 text-black sm:p-8" aria-label="Job interview teaching guide preview">
      <div className="flex items-center gap-2 border-b border-black/10 pb-4 text-xs text-black/50"><BookOpen size={14} aria-hidden="true" />Teaching guide · B2</div>
      <h3 className="mt-6 text-3xl font-medium tracking-tight">Job interview</h3>
      <p className="mt-3 text-sm leading-6 text-black/60">Daniel interviews for a developer role. Use these questions alongside the conversation.</p>
      <h4 className="mt-6 font-medium">Vocabulary</h4>
      <dl className="mt-3 space-y-3 text-sm leading-6">
        <div><dt className="font-medium">Candidate</dt><dd className="text-black/60">A person applying for a job.</dd></div>
        <div><dt className="font-medium">Under pressure</dt><dd className="text-black/60">Dealing with difficult demands or expectations.</dd></div>
      </dl>
      <h4 className="mt-6 border-t border-black/10 pt-5 font-medium">Questions</h4>
      <ul className="mt-3 list-disc space-y-2 pl-4 text-sm leading-6 text-black/60"><li>How many years of professional experience does Daniel have?</li><li>What is more important: qualifications, experience or personality?</li></ul>
      <h4 className="mt-6 border-t border-black/10 pt-5 font-medium">Role-play</h4>
      <p className="mt-3 text-sm leading-6 text-black/60">Work in pairs. One person is the interviewer and the other is the candidate. Choose a job and practise an interview, then switch roles.</p>
      <Link href="/guides/job-interview" className="mt-6 inline-flex items-center gap-2 text-sm underline underline-offset-4">Read the full guide<ArrowUpRight size={14} /></Link>
    </article>
  );
}

export default function LandingPage() {
  const page = useRef<HTMLDivElement>(null);
  const story = useRef<HTMLElement>(null);
  const textSide = useRef<HTMLDivElement>(null);
  const demoSide = useRef<HTMLDivElement>(null);
  const lastStage = useRef(-1);
  const previousTextStage = useRef(-1);
  const [stage, setStage] = useState(0);
  const [autoSaved, setAutoSaved] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const [saved, setSaved] = useState<string[]>([]);
  const [paused, setPaused] = useState(false);
  const marqueeInteraction = useRef({ pointer: false, focus: false });
  const manualPause = useRef(false);
  const marqueeTweens = useRef<gsap.core.Tween[]>([]);
  const storyTrigger = useRef<ScrollTrigger | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [popoverPosition, setPopoverPosition] = useState({ left: 20, top: 130 });
  const activeStage = stage;
  const guideStage = activeStage === 5;
  const demoWord = activeStage === 4 && hovered === null ? "pressure" : null;
  const [hoverLine, hoverToken] = hovered ? hovered.split("-").map(Number) : [];
  const definitionWord = hovered
    ? clean(lines[hoverLine ?? 0]?.[1].split(/(\s+)/)[hoverToken ?? 0] || "")
    : demoWord;
  const definitionType = definitionWord && ["under", "pressure"].includes(definitionWord) ? "idiom"
    : definitionWord && nounWords.has(definitionWord) ? "noun"
    : definitionWord && verbWords.has(definitionWord) ? "verb"
    : definitionWord && ["organised", "calm", "clear", "essential", "common", "small", "last"].includes(definitionWord) ? "adjective"
    : definitionWord && ["i", "you", "me", "my", "your", "yourself"].includes(definitionWord) ? "pronoun"
    : definitionWord && ["in", "on", "about", "toward"].includes(definitionWord) ? "preposition"
    : definitionWord === "a" ? "article"
    : definitionWord && ["and", "when"].includes(definitionWord) ? "conjunction" : "adverb";
  const definitionMeaning = definitionType === "idiom" ? "facing difficult demands or expectations" : definitions[definitionWord || ""];
  const definitionSaved = (definitionWord !== null && saved.includes(definitionWord)) || (autoSaved && definitionWord === "pressure");

  useGSAP(() => {
    const root = page.current;
    if (!root) return;
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const columns = gsap.utils.toArray<HTMLElement>("[data-cover-track]");
      marqueeTweens.current = columns.map((track, index) => gsap.fromTo(track,
        { yPercent: index === 1 ? -50 : 0 },
        { yPercent: index === 1 ? 0 : -50, duration: 64 + index * 6, repeat: -1, ease: "none" }));
      const row = root.querySelector("[data-cover-row]");
      if (row) marqueeTweens.current.push(gsap.to(row, { xPercent: -50, duration: 70, repeat: -1, ease: "none" }));
      gsap.to("[data-scroll-cue]", { y: 5, duration: 0.9, repeat: -1, yoyo: true, ease: "power1.inOut" });
      gsap.from("[data-hero-copy] > *", { y: 20, opacity: 0, duration: 0.8, stagger: 0.13, ease: "power3.out" });
    });
    media.add({ desktop: "(min-width: 900px)", motion: "(prefers-reduced-motion: no-preference)" }, context => {
      const { desktop, motion } = context.conditions ?? { desktop: false, motion: false };
      if (!motion) return;
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: story.current, start: "top top", end: () => `+=${window.innerHeight * (desktop ? 9 : 6)}`,
          pin: true, scrub: 0.65, invalidateOnRefresh: true,
          onUpdate: self => {
            const progress = root.querySelector<HTMLElement>("[data-scroll-progress]");
            if (progress) { progress.style.transform = `scaleX(${self.progress})`; progress.parentElement?.setAttribute("aria-valuenow", String(Math.round(self.progress * 100))); }
            const next = Math.min(5, Math.floor(self.progress * 6));
            if (lastStage.current !== next) { lastStage.current = next; setStage(next); setHovered(null); }
            setAutoSaved(self.progress >= 0.75 && self.progress < 5 / 6);
          },
        },
      });
      storyTrigger.current = timeline.scrollTrigger ?? null;
      timeline.to({}, { duration: 5.25 });
      if (desktop) {
        const distance = (): number => {
          const panel = demoSide.current;
          const grid = root.querySelector<HTMLElement>("[data-story-grid]");
          return panel && grid ? panel.getBoundingClientRect().width + parseFloat(getComputedStyle(grid).columnGap) : 0;
        };
        timeline.to(textSide.current, { x: distance, duration: 0.8, ease: "power2.inOut" }, 5.25)
          .to(demoSide.current, { x: () => -distance(), duration: 0.8, ease: "power2.inOut" }, 5.25);
      } else timeline.to({}, { duration: 0.8 }, 5.25);
      timeline.to({}, { duration: 0.25 });
    });
    return () => { media.revert(); marqueeTweens.current = []; storyTrigger.current = null; if (closeTimer.current) clearTimeout(closeTimer.current); };
  }, { scope: page });

  useGSAP(() => {
    const root = page.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (stage === 4) {
      const body = root.querySelector("[data-dialogue-body]");
      const word = body?.querySelector("[data-word=pressure]");
      if (body && word) {
        body.scrollTo({ top: body.scrollTop + word.getBoundingClientRect().top - body.getBoundingClientRect().top - body.clientHeight / 2 });
        positionPopover(word as HTMLElement);
      }
    }
    const previous = previousTextStage.current;
    previousTextStage.current = stage;
    const wordOnly = stage >= 1 && stage <= 3 && previous >= 1 && previous <= 3;
    gsap.fromTo(wordOnly ? "[data-word-type]" : "[data-story-copy]", { opacity: 0.4, y: 10 }, { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" });
    if (stage === 5 || previous === 5) {
      gsap.fromTo("[data-active-panel]", { opacity: 0.55 }, { opacity: 1, duration: 0.4 });
    }
  }, { scope: page, dependencies: [stage], revertOnUpdate: true });

  function syncMarquee() {
    const shouldPause = manualPause.current || marqueeInteraction.current.pointer || marqueeInteraction.current.focus;
    marqueeTweens.current.forEach(tween => tween.paused(shouldPause));
  }
  function toggleMarquee() {
    manualPause.current = !manualPause.current;
    setPaused(manualPause.current);
    syncMarquee();
  }
  function chooseStage(index: number) {
    const trigger = storyTrigger.current;
    if (trigger) {
      window.scrollTo({ top: trigger.start + (trigger.end - trigger.start) * (index === 5 ? 0.985 : (index + 0.4) / 6), behavior: "smooth" });
      return;
    }
    setStage(index); setHovered(null); setAutoSaved(false);
  }
  function keepPopoverOpen() {
    if (closeTimer.current) { clearTimeout(closeTimer.current); closeTimer.current = null; }
  }
  function schedulePopoverClose() {
    keepPopoverOpen();
    closeTimer.current = setTimeout(() => {
      const focused = document.activeElement;
      if (focused instanceof Element && focused.closest("[data-word], [data-definition-popover]")) return;
      setHovered(null);
    }, 180);
  }
  function positionPopover(target: HTMLElement) {
    const card = target.closest<HTMLElement>("[data-dialogue-card]");
    if (!card) return;
    const cardBox = card.getBoundingClientRect();
    const wordBox = target.getBoundingClientRect();
    const width = Math.min(192, cardBox.width - 24);
    const left = Math.max(12, Math.min(cardBox.width - width - 12, wordBox.left - cardBox.left + wordBox.width / 2 - width / 2));
    const below = wordBox.bottom - cardBox.top + 6;
    const top = below + 140 < cardBox.height - 12 ? below : Math.max(12, wordBox.top - cardBox.top - 140);
    setPopoverPosition({ left, top });
  }
  function openPopover(id: string, target: HTMLElement) {
    keepPopoverOpen(); positionPopover(target); setHovered(id);
  }
  function saveWord(word: string, id: string) {
    const key = clean(word);
    setSaved(words => words.includes(key) ? words : [...words, key]);
    setHovered(id);
  }
  function renderWords(text: string, lineIndex: number) {
    return text.split(/(\s+)/).map((token, index) => {
      if (/^\s+$/.test(token)) return token;
      const key = clean(token);
      const type = stage === 1 && nounWords.has(key) ? "nouns" : stage === 2 && verbWords.has(key) ? "verbs" : stage === 3 && ["under", "pressure"].includes(key) ? "idioms" : null;
      const id = `${lineIndex}-${index}`;
      const isOpen = hovered === id || (demoWord === key && lineIndex === 3);
      const isSaved = saved.includes(key) || (autoSaved && key === "pressure");
      return <span key={id} className="relative inline">
        <button type="button" onMouseEnter={event => openPopover(id, event.currentTarget)} onMouseLeave={schedulePopoverClose} onFocus={event => openPopover(id, event.currentTarget)} onBlur={event => { if (!(event.relatedTarget instanceof Element) || !event.relatedTarget.closest("[data-definition-popover]")) schedulePopoverClose(); }}
          data-word={key} onClick={() => saveWord(token, id)} aria-describedby={isOpen ? "definition-tooltip" : undefined} onKeyDown={event => { if (event.key === "Escape") setHovered(null); }} aria-label={`${token}: ${definitions[key]}. ${isSaved ? "Saved in demo dictionary" : "Save to demo dictionary"}`}
          className={`inline cursor-pointer rounded-sm px-0 py-0 text-left leading-[inherit] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${type ? color[type] : "text-inherit hover:bg-white/10"}`}>
          {token}
        </button>

      </span>;
    });
  }

  return <div ref={page} className="bg-background text-foreground [font-family:var(--font-geist-sans,Arial),Arial,sans-serif] [&_a]:underline-offset-4 [&_button]:[-webkit-tap-highlight-color:transparent] motion-reduce:[&_*]:!transition-none">
    <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:bg-background focus:text-foreground focus:p-3">Skip to content</a>
    <header className="mx-auto flex min-h-20 max-w-[1440px] items-center justify-between gap-6 px-6 lg:px-12">
      <Link href="/" className="text-2xl font-medium tracking-tight" aria-label="Synomilo home">synomilo</Link>
      <nav aria-label="Main navigation" className="flex items-center gap-6 text-sm"><Link href="/guides" className="hidden hover:underline sm:block">Guides</Link><Link href="/pricing" className="hover:underline">Pricing</Link><Link href="/login" className="hover:underline">Log in</Link><ModeToggle /></nav>
    </header>
    <main id="main">
      <section aria-labelledby="hero-title" className="mx-auto grid max-w-[1440px] items-center gap-12 overflow-hidden px-6 pt-12 pb-14 lg:min-h-[min(640px,calc(100svh-140px))] lg:grid-cols-[0.95fr_1.3fr] lg:gap-10 lg:px-12 lg:py-7">
        <div data-hero-copy className="max-w-xl">
          <h1 id="hero-title" className="text-[clamp(2rem,3vw,2.8rem)] font-medium leading-[1.08] tracking-[-.055em]"><span className="lg:whitespace-nowrap">Raw English conversations.</span><br /><span className="text-muted-foreground">No fixed lesson plan.</span></h1>
          <Link href="/home/conversations" className="mt-9 inline-flex items-center gap-2 rounded-md bg-primary px-2 py-2 text-sm text-primary-foreground hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground">Browse conversations<ArrowUpRight size={17} aria-hidden="true" /></Link>
        </div>
        <div onMouseEnter={() => { marqueeInteraction.current.pointer = true; syncMarquee(); }} onMouseLeave={() => { marqueeInteraction.current.pointer = false; syncMarquee(); }} onFocusCapture={() => { marqueeInteraction.current.focus = true; syncMarquee(); }} onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget as Node | null)) { marqueeInteraction.current.focus = false; syncMarquee(); } }}>
          <div className="relative hidden h-[min(530px,calc(100svh-220px))] min-h-[360px] grid-cols-3 gap-3 overflow-hidden [mask-image:linear-gradient(transparent,black_5%,black_95%,transparent)] lg:grid" aria-label="Conversation library previews">
            {[0, 1, 2].map(column => {
              const items = [covers[column]!, covers[column + 3]!, covers[(column + 6) % covers.length]!];
              return <div key={column} data-cover-track className="flex h-max flex-col will-change-transform">
                {[0, 1].map(copy => <div key={copy} aria-hidden={copy === 1 ? "true" : undefined} className="flex flex-col gap-3 pb-3">{items.map(cover => <Cover key={cover.title} cover={cover} duplicate={copy === 1} />)}</div>)}
              </div>;
            })}
          </div>
          <div className="overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_2%,black_98%,transparent)] lg:hidden" aria-label="Conversation library previews">
            <div data-cover-row className="flex w-max will-change-transform">{[0, 1].map(copy => <div key={copy} aria-hidden={copy === 1 ? "true" : undefined} className="flex gap-3 pr-3">{covers.map(cover => <div key={cover.title} className="w-60"><Cover cover={cover} duplicate={copy === 1} /></div>)}</div>)}</div>
          </div>
          <div className="mt-4 flex justify-end"><button type="button" onClick={toggleMarquee} aria-pressed={paused} className="text-xs text-muted-foreground underline underline-offset-4 motion-reduce:hidden">{paused ? "Resume previews" : "Pause previews"}</button></div>
        </div>
      </section>

      <section ref={story} style={{ colorScheme: "dark" }} aria-label="Explore the conversation tools" className="relative flex min-h-svh items-center bg-black px-6 pt-4 pb-24 text-white lg:px-12 lg:pt-12 lg:pb-28">
        <div data-story-grid className="mx-auto grid w-full max-w-[1344px] grid-cols-1 items-center gap-5 min-[900px]:grid-cols-2 min-[900px]:gap-20">
          <div ref={textSide} className={`relative min-w-0 ${guideStage ? "motion-reduce:min-[900px]:order-2" : ""}`}>
            <div data-story-copy className="min-h-[130px] min-[900px]:min-h-[280px]" aria-live="polite">
              <p className="mb-5 text-xs text-white/40">{String(stage + 1).padStart(2, "0")} / 06</p>
              {stage === 0 && <><h2 className="text-[clamp(2rem,4vw,4rem)] font-medium leading-[1.08] tracking-[-.045em]">Original English dialogues.</h2><p className="mt-5 max-w-sm text-sm leading-7 text-white/55 [@media(max-height:740px)_and_(max-width:899px)]:hidden">Read the conversation as it is, then decide what to discuss.</p></>}
              {[1, 2, 3].includes(stage) && <><h2 className="text-[clamp(2rem,4vw,4rem)] font-medium leading-[1.08] tracking-[-.045em]">Discuss <span data-word-type style={{ display: "inline-block" }} className={stage === 1 ? "text-pink-500" : stage === 2 ? "text-red-500" : "text-indigo-500"}>{stage === 1 ? "nouns" : stage === 2 ? "verbs" : "idioms"}</span>.</h2><p className="mt-5 max-w-sm text-sm leading-7 text-white/55 [@media(max-height:740px)_and_(max-width:899px)]:hidden">Use the language in the dialogue as a starting point for discussion.</p></>}
              {stage === 4 && <><h2 className="text-[clamp(1.75rem,3.3vw,3.5rem)] font-medium leading-[1.1] tracking-[-.045em]">Hover over words and save them to your dictionary.</h2><p className="mt-5 max-w-sm text-sm leading-7 text-white/55 [@media(max-height:740px)_and_(max-width:899px)]:hidden">Move over a word to see its meaning. Click to save it. On a touchscreen, tap a word.</p></>}
              {stage === 5 && <><h2 className="text-[clamp(1.75rem,3.5vw,3.75rem)] font-medium leading-[1.1] tracking-[-.045em]">Optional guides for vocabulary, questions and activities.</h2><p className="mt-5 max-w-sm text-sm leading-7 text-white/55 [@media(max-height:740px)_and_(max-width:899px)]:hidden">Use a guide for some direction, or work directly from the conversation.</p><Link href="/guides" className="mt-6 inline-flex items-center gap-2 text-sm underline">Browse guides<ArrowUpRight size={15} /></Link></>}
            </div>
            <nav aria-label="Preview stages" className="mt-4 flex flex-wrap gap-x-4 gap-y-2 min-[900px]:mt-10">{labels.map((label, index) => <button key={label} type="button" onClick={() => chooseStage(index)} aria-pressed={stage === index} className={`border-b py-1 text-xs transition-colors ${stage === index ? "border-white text-white" : "border-transparent text-white/40 hover:text-white"}`}>{label}</button>)}</nav>
          </div>

          <div ref={demoSide} className={`relative min-w-0 ${guideStage ? "motion-reduce:min-[900px]:order-1" : ""}`}>
            <div data-active-panel className="h-[min(42svh,400px)] min-h-[260px] min-[900px]:h-[min(62svh,550px)]">
              {guideStage ? <Guide /> : <article data-dialogue-card aria-labelledby="demo-title" className="relative flex h-full flex-col rounded-xl border border-white/20 bg-[#0d0d0d] p-5 sm:p-7">
                <header className="flex items-baseline justify-between gap-4 border-b border-white/15 pb-4"><h3 id="demo-title" className="text-xl font-medium tracking-tight">Job interview</h3><p className="shrink-0 text-xs text-white/45">B2 · Work</p></header>
                <div data-dialogue-body className="min-h-0 flex-1 overflow-y-auto py-5 pr-1 text-[13px] leading-[1.9] sm:text-sm">{lines.map(([speaker, text], index) => <p key={index} className="mb-4 grid grid-cols-[5rem_minmax(0,1fr)] gap-4 sm:grid-cols-[5.75rem_minmax(0,1fr)] sm:gap-5 last:mb-0"><span className="border-r border-white/35 pr-3 text-sm font-semibold leading-[1.9] text-inherit sm:pr-4 sm:text-base">{speaker}</span><span>{renderWords(text, index)}</span></p>)}</div>
                {definitionWord && <aside id="definition-tooltip" data-definition-popover role="dialog" aria-label={`Definition of ${definitionWord}`} onMouseEnter={keepPopoverOpen} onMouseLeave={schedulePopoverClose} onFocusCapture={keepPopoverOpen} onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget as Node | null)) schedulePopoverClose(); }} onKeyDown={event => { if (event.key === "Escape") setHovered(null); }}
                  style={{ left: popoverPosition.left, top: popoverPosition.top, width: "min(192px, calc(100% - 24px))", colorScheme: "light" }}
                  className="absolute z-30 rounded-xl border border-black/10 bg-white px-3 py-3 text-center text-black shadow-[0_3px_6px_rgba(0,0,0,0.16)]">
                  <strong className="block text-sm font-semibold">{definitionType}</strong>
                  <p className="mt-2 text-xs leading-4">{definitionMeaning}</p>
                  <button type="button" disabled={definitionSaved} onClick={() => { if (definitionWord) saveWord(definitionWord, hovered || `3-${lines[3]![1].split(/(\s+)/).findIndex(token => clean(token) === "pressure")}`); }} aria-label={definitionSaved ? `${definitionWord} saved` : `Add ${definitionWord} to dictionary`}
                    className="mx-auto mt-2 flex h-7 w-8 items-center justify-center rounded-xl border border-black/10 bg-[#f7f7f7] shadow-sm hover:bg-black/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black disabled:cursor-default">
                    {definitionSaved ? <Check size={15} aria-hidden="true" /> : <Plus size={18} strokeWidth={1.75} aria-hidden="true" />}
                  </button>
                  <span role="status" className="sr-only">{definitionSaved ? "Saved to dictionary" : ""}</span>
                </aside>}
                <footer className="flex flex-wrap items-center justify-between gap-2 border-t border-white/15 pt-4 text-xs text-white/40">
                <span>End of Job Interview</span>
                </footer>
              </article>}
            </div>
            <p className="mt-3 text-[10px] leading-5 text-white/35">Preview only. Saved words stay on this page.</p>
          </div>
        </div>
       <div
  data-pinned-scroll-indicator
  className="pointer-events-none absolute inset-x-0 bottom-5 z-20 flex justify-center px-5 motion-reduce:hidden lg:bottom-7"
>
  <div className="flex flex-col items-center gap-2 rounded-full border border-white/25 bg-black/90 px-5 py-3 text-center text-white">
    <p className="text-sm font-medium">
      {stage === 5
        ? "Scroll to continue to the library"
        : "Keep scrolling to explore"}
    </p>
    <div aria-hidden="true" className="flex justify-center gap-1.5">
      {labels.map((label, index) => (
        <span
          key={label}
          className={`h-1 w-5 rounded-full transition-colors ${
            index <= stage ? "bg-white" : "bg-white/25"
          }`}
        />
      ))}
    </div>
  </div>
</div>
      </section>

      <section
  aria-label="Browse conversations"
  className="flex justify-center px-6 py-16 lg:py-24"
>
  <Link
    href="/home/conversations"
    className="inline-flex min-h-12 items-center gap-6 rounded-md bg-primary px-6 py-3 text-sm text-primary-foreground hover:bg-primary/90"
  >
    Browse conversations
    <ArrowRight size={17} aria-hidden="true" />
  </Link>
</section>
    </main>
    <footer className="mx-auto flex max-w-[1440px] flex-wrap items-center justify-between gap-6 border-t border-border px-6 py-8 lg:px-12"><Link href="/" className="text-xl font-medium tracking-tight">synomilo</Link><nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-3 text-xs text-muted-foreground">{([["Guides", "/guides"], ["Pricing", "/pricing"], ["About", "/about"], ["Privacy", "/privacy"], ["Terms", "/ToS"], ["Refund policy", "/refund"]] as const).map(([label, href]) => <Link key={href} href={href} className="hover:text-foreground hover:underline">{label}</Link>)}</nav></footer>
  </div>;
}
