"use client";

import { useEffect, useRef, useState } from "react";
import { Search, X } from "lucide-react";
import { useConversations } from "@/hooks/useConversations";
import { useUserStore } from "@/data/useUserStore";
import { matchesConversationSearch } from "@/lib/conversationSearch";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogTrigger, AlertDialogCancel, AlertDialogFooter } from "@/components/ui/alert-dialog";
import AuthLoading from "@/components/auth/AuthLoading";
import DashboardPage from "@/components/dashboard/DashboardPage";
import { dashboardStyles } from "@/components/dashboard/styles";
import GuideTour, { type GuideStep } from "../../GuideTour";
import PlacementTest from "../placementTest";
import ConversationCover from "./ConversationCover";

const levels = [["A1", "A1 — Beginner"], ["A2", "A2 — Basic"], ["B1", "B1 — Intermediate"], ["B2", "B2 — Independent"]] as const;
const categories = [
  ["Everyday", "Everyday/Casual"], ["Directions", "Directions/Travel"], ["Business", "Business/Work"],
  ["School", "School/Study"], ["Shopping", "Shopping/Services"], ["Health", "Health/Emergencies"],
  ["Lifestyle", "Lifestyle/Daily Life"], ["Society", "Society/Culture"], ["Emotional", "Emotional/Personal Topics"],
  ["Advanced", "Advanced/Abstract Topics"],
] as const;
const convoGuideSteps: GuideStep[] = [
  { target: "convo-title", title: "Conversations", description: "Browse the conversation library by level and topic." },
  { target: "convo-filters", title: "Search and filters", description: "Search by title, description, topic or level, then narrow the results with the filters." },
  { target: "convo-grid", title: "Conversation cards", description: "Open a conversation to start reading. The pink sparkle indicates Plus content and the green check indicates completion. Hover over words for definitions and save them to your dictionary." },
];
type CoverConversation = { $id: string; title: string; description?: string; level: string; audioFileId: string; isPro: boolean; category: string };

export default function ConversationsPage() {
  const { conversations, loading: conversationsLoading, error } = useConversations();
  const { loading: userLoading, user, isTeacher } = useUserStore();
  const [search, setSearch] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("All");
  const [category, setCategory] = useState("All");
  const [test, setTest] = useState(false);
  const results = useRef<HTMLDivElement>(null);
  const searchInput = useRef<HTMLInputElement>(null);
  const loading = conversationsLoading || userLoading;
  const hasFilters = Boolean(search.trim()) || selectedLevel !== "All" || category !== "All";
  const list = Array.isArray(conversations) ? conversations as unknown as CoverConversation[] : [];
  const filtered = list.filter(conversation => {
    const levelMatches = selectedLevel === "All" || conversation.level === selectedLevel;
    const categoryMatches = category === "All" || conversation.category === category;
    const userCanAccess = isTeacher || !conversation.isPro || Boolean(user?.isSubscribed);
    return levelMatches && categoryMatches && userCanAccess && matchesConversationSearch(conversation, search);
  });

  useEffect(() => { results.current?.scrollTo({ top: 0 }); }, [search, selectedLevel, category]);

  function clearFilters() {
    setSearch(""); setSelectedLevel("All"); setCategory("All");
  }

  return <DashboardPage ready={!loading && !error}>
    {user && !loading && !error && <GuideTour id="conversations-page" steps={convoGuideSteps} />}
    <header data-guide="convo-title" data-dashboard-intro className="shrink-0">
      <h1 className={dashboardStyles.heading}>Conversations</h1>
      <p className={dashboardStyles.description}>Find a conversation by topic or level.</p>
    </header>

    {loading ? <div className="flex min-h-0 flex-1 items-center justify-center"><AuthLoading /></div>
      : error ? <div role="alert" className="mt-6 rounded-xl border border-red-500/25 bg-red-500/5 p-5 text-sm leading-7 text-red-500">{error}</div>
      : <>
        <div data-guide="convo-filters" data-dashboard-entry className="mt-5 grid shrink-0 grid-cols-2 gap-3 lg:flex lg:items-end">
          <div className="col-span-2 min-w-0 lg:flex-1">
            <Label htmlFor="conversation-search" className="sr-only">Search conversations</Label>
            <div className="relative">
              <Search size={17} aria-hidden="true" className="pointer-events-none absolute top-1/2 left-3 z-10 -translate-y-1/2 text-muted-foreground" />
              <Input ref={searchInput} id="conversation-search" type="search" placeholder="Search conversations" value={search} onChange={event => setSearch(event.target.value)} autoComplete="off" spellCheck={false}
                className={cn(dashboardStyles.field, "pl-10 pr-10 [&::-webkit-search-cancel-button]:appearance-none")} />
              {search && <button type="button" aria-label="Clear search" onClick={() => { setSearch(""); searchInput.current?.focus(); }} className="absolute top-1/2 right-2 inline-flex size-7 -translate-y-1/2 items-center justify-center rounded-sm text-muted-foreground hover:bg-muted hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"><X size={15} aria-hidden="true" /></button>}
            </div>
          </div>
          <div className="min-w-0 lg:w-44">
            <Label htmlFor="conversation-level" className="mb-2 block text-xs font-medium">Level</Label>
            <Select value={selectedLevel} onValueChange={setSelectedLevel}>
              <SelectTrigger id="conversation-level" className={cn(dashboardStyles.field, "w-full data-[size=default]:h-11")}><SelectValue /></SelectTrigger>
              <SelectContent><SelectItem value="All">All levels</SelectItem>{levels.map(([value, label]) => <SelectItem key={value} value={value}>{label}</SelectItem>)}</SelectContent>
            </Select>
          </div>
          <div className="min-w-0 lg:w-56">
            <Label htmlFor="conversation-category" className="mb-2 block text-xs font-medium">Category</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger id="conversation-category" className={cn(dashboardStyles.field, "w-full data-[size=default]:h-11")}><SelectValue /></SelectTrigger>
              <SelectContent><SelectItem value="All">All categories</SelectItem>{categories.map(([value, label]) => <SelectItem key={value} value={value}>{label}</SelectItem>)}</SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex shrink-0 flex-wrap items-center justify-between gap-x-4 gap-y-2 py-3.5">
          <div className="flex flex-wrap items-center gap-3">
            <p role="status" aria-live="polite" aria-atomic="true" className="text-xs text-muted-foreground">{filtered.length} {filtered.length === 1 ? "conversation" : "conversations"}</p>
            {hasFilters && <button type="button" onClick={clearFilters} className={dashboardStyles.textLink}>Clear filters</button>}
          </div>
          {!isTeacher && <AlertDialog open={test} onOpenChange={setTest}>
            <AlertDialogTrigger asChild><button type="button" className={dashboardStyles.textLink}>Not sure of your level?</button></AlertDialogTrigger>
            <AlertDialogContent className="max-h-[calc(100dvh-2rem)] overflow-y-auto rounded-xl border-border bg-background sm:max-w-xl">
              <AlertDialogHeader>
                <AlertDialogTitle className="text-2xl font-medium tracking-[-.035em]">Quick placement test</AlertDialogTitle>
                <AlertDialogDescription className="leading-7">Not sure where to begin? Take this quick test to get a better idea of which conversations match your current level.</AlertDialogDescription>
                <p className="text-xs leading-6 text-muted-foreground">This is not an official exam and is intended only as a general guide. Your score will not be stored.</p>
              </AlertDialogHeader>
              <PlacementTest />
              <AlertDialogFooter><AlertDialogCancel className="cursor-pointer">Back</AlertDialogCancel></AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>}
        </div>

        <div ref={results} role="region" aria-label="Conversation results" tabIndex={0} className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-1 pt-1 pb-4 [scrollbar-gutter:stable] focus-visible:rounded-md focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-foreground">
          <ul data-guide="convo-grid" className="grid auto-rows-fr grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 min-[1800px]:grid-cols-4">
            {filtered.map(conversation => <li key={conversation.$id} className="min-w-0">
              <ConversationCover conversationTitle={conversation.title} conversationDescription={conversation.description || ""} level={conversation.level} conversationId={conversation.$id} audioFileId={conversation.audioFileId} category={conversation.category} isPro={conversation.isPro} />
            </li>)}
          </ul>
          {!filtered.length && <div className="flex min-h-48 flex-col items-center justify-center rounded-xl border border-dashed border-border p-6 text-center">
            <Search size={22} strokeWidth={1.5} aria-hidden="true" className="mb-4 text-muted-foreground" />
            <h2 className="text-lg font-medium tracking-[-.02em]">{hasFilters ? "No conversations found." : "No conversations available yet."}</h2>
            <p className="mt-2 max-w-sm text-sm leading-7 text-muted-foreground">{hasFilters ? "Try a different search or clear your filters." : "Check back soon for more conversation material."}</p>
            {hasFilters && <button type="button" onClick={clearFilters} className="mt-4 rounded-md border border-border px-4 py-2 text-sm hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground">Clear search and filters</button>}
          </div>}
        </div>
      </>}
  </DashboardPage>;
}
