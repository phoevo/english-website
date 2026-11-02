"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { BadgePlus, Bug, Lightbulb, MessageCircle, Check } from "lucide-react";
import { useUserStore } from "@/data/useUserStore";
import { sendMyFeedback } from "@/data/accountActions";
import GuideTour, { type GuideStep } from "../../GuideTour";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardDescription,
  CardTitle,
  CardHeader,
  CardContent,
} from "@/components/ui/card";
import DashboardPage from "@/components/dashboard/DashboardPage";
import { dashboardStyles } from "@/components/dashboard/styles";
import { Badge } from "@/components/ui/badge";

const feedbackGuideSteps: GuideStep[] = [
  { target: "feedback-title", title: "Feedback", description: "Help us improve Synomilo by sharing what you liked, disliked, or think is missing." },
  { target: "feedback-form", title: "Send Feedback", description: "Pick a tag, write your feedback, and optionally leave your name and email." },
];



function FeedbackPage() {
  const { user, loading } = useUserStore();

  // Feedback form state
  const [selectedTag, setSelectedTag] = useState<
    "bug" | "suggestion" | "missing" | "general" | null
  >(null);
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    if (!selectedTag) {
      setError("Please select a tag.");
      return;
    }
    if (!message.trim()) {
      setError("Please enter your feedback.");
      return;
    }
    setSubmitting(true);
    try {
      await sendMyFeedback({ tag: selectedTag, feedback: message.trim(), name: name.trim(), email: email.trim() });
      // Reset
      setMessage("");
      setName("");
      setEmail("");
      setSelectedTag(null);
      setSubmitted(true);
    } catch (e: unknown) {
      console.error("Failed to submit feedback:", e);
      setError("Failed to submit feedback. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return <DashboardPage ready={false} className="overflow-y-auto"><div role="status" aria-busy="true" aria-label="Loading feedback page" className="space-y-5">
      <span className="sr-only">Loading...</span>
      <div aria-hidden="true" className="space-y-3"><Skeleton className="h-8 w-48 max-w-full" /><Skeleton className="h-4 w-3/4 max-w-2xl" /></div>
      <div aria-hidden="true" className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <section className="rounded-xl border border-border opacity-100">
          <div className="space-y-2 border-b border-border p-6"><Skeleton className="h-5 w-36" /><Skeleton className="h-4 w-64 max-w-full" /></div>
          <div className="space-y-5 p-6">
            <div className="space-y-3"><Skeleton className="h-4 w-12" /><div className="flex flex-wrap gap-2"><Skeleton className="h-7 w-16 rounded-full" /><Skeleton className="h-7 w-24 rounded-full" /><Skeleton className="h-7 w-28 rounded-full" /><Skeleton className="h-7 w-28 rounded-full" /></div></div>
            <div className="space-y-2"><Skeleton className="h-4 w-28" /><Skeleton className="h-28 w-full rounded-md" /></div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2"><div className="space-y-2"><Skeleton className="h-4 w-28" /><Skeleton className="h-10 w-full" /></div><div className="space-y-2"><Skeleton className="h-4 w-32" /><Skeleton className="h-10 w-full" /></div></div>
            <Skeleton className="h-10 w-24 rounded-md" />
          </div>
        </section>
        <section className="rounded-xl border border-border opacity-60">
          <div className="space-y-2 border-b border-border p-6"><Skeleton className="h-5 w-28" /><Skeleton className="h-4 w-56 max-w-full" /></div>
          <div className="space-y-3 p-6">{[0, 1, 2].map(index => <div key={index} className={`space-y-2 rounded-lg border border-border p-3 ${index === 2 ? "opacity-50" : ""}`}><Skeleton className="h-4 w-2/5" /><Skeleton className="h-3 w-full" /><Skeleton className="h-3 w-4/5" /></div>)}</div>
        </section>
      </div>
    </div></DashboardPage>;
  }

  if (!user) {
    return <DashboardPage className="overflow-y-auto"><header data-dashboard-intro><h1 className={dashboardStyles.heading}>Feedback</h1><p className={dashboardStyles.description}>Share what works well and what could be improved.</p></header><p data-dashboard-entry className="mt-8 text-sm leading-7 text-muted-foreground">Please <Link href="/login" className="text-foreground underline underline-offset-4">log in</Link> or <Link href="/register" className="text-foreground underline underline-offset-4">create an account</Link> to send feedback.</p></DashboardPage>;
  }

  return (
    <DashboardPage className="overflow-y-auto">
      <header data-dashboard-intro>
        <GuideTour id="feedback-page" steps={feedbackGuideSteps} />
        <h1 data-guide="feedback-title" className={dashboardStyles.heading}>Feedback</h1>
        <p className={dashboardStyles.description}>Share what works well, what could be clearer, or what is missing.</p>
      </header>

      <div className="mt-6 flex w-full flex-col gap-4 lg:flex-row">

      {/* Feedback form */}
      <Card data-guide="feedback-form" data-dashboard-entry className={dashboardStyles.card + " w-full lg:w-1/2"}>
        <CardHeader>
          <CardTitle>Send feedback</CardTitle>
          <CardDescription>
            Pick a tag, write your feedback, and optionally leave your name and email.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="tag">Feedback type</Label>
              <div className="flex flex-wrap gap-2">
                <Badge
                  role="button"
                  aria-pressed={selectedTag === "bug"}
                  variant={"outline"}
                  onClick={() => { setSelectedTag("bug"); setSubmitted(false); }}
                  className={`${selectedTag === "bug" ? "bg-foreground text-background" : ""} cursor-pointer select-none`}
                >
                  <Bug/>Bug
                </Badge>
                <Badge
                  role="button"
                  aria-pressed={selectedTag === "suggestion"}
                  variant={"outline"}
                  onClick={() => { setSelectedTag("suggestion"); setSubmitted(false); }}
                  className={`${selectedTag === "suggestion" ? "bg-amber-500 text-foreground" : ""} cursor-pointer select-none`}

                >
                  <Lightbulb/>Suggestion
                </Badge>
                <Badge
                  role="button"
                  aria-pressed={selectedTag === "missing"}
                  variant={"outline"}
                  onClick={() => { setSelectedTag("missing"); setSubmitted(false); }}
                  className={`${selectedTag === "missing" ? "bg-pink-500 text-foreground" : ""} cursor-pointer select-none`}
                >
                  <BadgePlus/>Missing feature
                </Badge>
                <Badge
                  role="button"
                  aria-pressed={selectedTag === "general"}
                  variant={"outline"}
                  onClick={() => { setSelectedTag("general"); setSubmitted(false); }}
                  className={`${selectedTag === "general" ? "bg-green-500 text-foreground" : ""} cursor-pointer select-none`}
                >
                  <MessageCircle/>General feedback
                </Badge>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Your feedback</Label>
              <textarea
                id="message"
                maxLength={1000}
                value={message}
                onChange={(e) => { setMessage(e.target.value); if (submitted) setSubmitted(false); }}
                aria-invalid={!!error && !message.trim()}
                placeholder="Tell us what’s on your mind..."
                className="min-h-40 w-full resize-y rounded-md border border-border bg-background px-3 py-2 text-sm leading-6 placeholder:text-muted-foreground outline-none transition-[color,box-shadow] focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
              />
              {error && !message.trim() && (
                <p className="text-xs text-destructive">{error}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name (optional)</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => { setName(e.target.value); if (submitted) setSubmitted(false); }}
                  placeholder="Name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email (optional)</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); if (submitted) setSubmitted(false); }}
                  placeholder="Email address"
                />
              </div>
            </div>

            <div className="pt-2">
             <Button
                type="submit"
                disabled={submitting || submitted}
                className="inline-flex cursor-pointer items-center justify-center transition-colors"

              >
                {submitting ? (
                  "Submitting..."
                ) : submitted ? (
                  <span className="inline-flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-500" />
                    Submitted. Thank you!
                  </span>
                ) : (
                  "Submit"
                )}
              </Button>

            </div>
          </form>
        </CardContent>
      </Card>


      <Card data-dashboard-entry className={dashboardStyles.card + " w-full lg:w-1/2"}>
  <CardHeader>
    <CardTitle>Need ideas?</CardTitle>
    <CardDescription>
      Here are a few things you could mention in your feedback.
    </CardDescription>
  </CardHeader>

  <CardContent>
    <div className="space-y-3 text-sm text-muted-foreground">

      <div className="rounded-lg border p-3">
        <p className="font-medium text-foreground">
          What felt confusing?
        </p>
        <p>
          Were there any pages, buttons, or features that didn’t feel obvious?
        </p>
      </div>

      <div className="rounded-lg border p-3">
        <p className="font-medium text-foreground">
          What worked well?
        </p>
        <p>
          Which features or parts of the experience did you enjoy the most?
        </p>
      </div>

      <div className="rounded-lg border p-3">
        <p className="font-medium text-foreground">
          Missing something?
        </p>
        <p>
          Is there a tool, workflow, or feature you expected to find?
        </p>
      </div>

      <div className="rounded-lg border p-3">
        <p className="font-medium text-foreground">
          Any friction?
        </p>
        <p>
          Did anything feel slow, awkward, repetitive, or difficult to use?
        </p>
      </div>
    </div>
  </CardContent>
</Card>
      </div>
    </DashboardPage>

  );
}

export default FeedbackPage;
