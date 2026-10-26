"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useUserStore } from "@/data/useUserStore";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

export default function HomePage() {
  const { user, recentConversations, dictionaryWords, loading } = useUserStore();
  return <div className="w-full overflow-y-auto px-6 py-10 md:px-12 lg:py-16">
    <div className="mx-auto max-w-5xl space-y-12">
      <header className="max-w-2xl space-y-5">
        <p className="text-sm text-muted-foreground">The Synomilo conversation library</p>
        <h1 className="text-3xl tracking-tight sm:text-5xl leading-tight">Here&apos;s the content.<br />Teach it your way.</h1>
        <p className="text-muted-foreground text-lg">Find a conversation by level or topic. Highlight useful language, save vocabulary, and make the lesson your own.</p>
        <Link href="/home/conversations" className="inline-flex items-center gap-3 rounded-full bg-primary px-6 py-3 text-primary-foreground">Browse conversations <ArrowRight size={18} /></Link>
      </header>
      {loading ? <Skeleton className="h-48 w-full" /> : user ? <div className="grid gap-10 md:grid-cols-2">
        <section className="space-y-5">
          <div className="flex items-center justify-between"><h2 className="text-xl">Pick up where you left off</h2><Link href="/home/recents" className="text-sm underline underline-offset-4">All recents</Link></div>
          {recentConversations.length ? recentConversations.slice(0, 3).map(conversation => <Link key={conversation.$id} href={`/home/conversations/${conversation.$id}`} className="block rounded-xl border p-5 transition-colors hover:bg-muted/40 focus-visible:ring-2 focus-visible:ring-ring">
            <div className="mb-3 flex gap-2"><Badge variant="secondary">{conversation.level}</Badge><Badge variant="outline">{conversation.category}</Badge></div>
            <h3 className="font-medium">{conversation.title}</h3><p className="mt-2 text-sm text-muted-foreground line-clamp-2">{conversation.description}</p>
          </Link>) : <p className="text-muted-foreground">Conversations you open will appear here.</p>}
        </section>
        <section className="space-y-5">
          <div className="flex items-center justify-between"><h2 className="text-xl">Saved vocabulary</h2><Link href="/home/dictionary" className="text-sm underline underline-offset-4">Your dictionary</Link></div>
          {dictionaryWords.length ? <ul className="divide-y">{[...dictionaryWords].reverse().slice(0, 5).map((entry, i) => <li className="py-3" key={`${entry}-${i}`}>{entry.split("::")[0].replace(/\/.*?\//g, "")}</li>)}</ul> : <p className="text-muted-foreground">Save words while reading to build your own vocabulary collection.</p>}
        </section>
      </div> : <p className="text-muted-foreground"><Link href="/login" className="underline">Log in</Link> to keep your recents, vocabulary, and completed conversations together.</p>}
    </div>
  </div>;
}
