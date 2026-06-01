"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { BadgePlus, Bug, Lightbulb, MessageCircle, Check } from "lucide-react";
import { useUserStore } from "@/data/useUserStore";
import { databaseId, databases, feedbackCollectionId } from "@/data/appwrite";
import GuideTour, { type GuideStep } from "../../GuideTour";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardDescription,
  CardTitle,
  CardHeader,
  CardContent,
} from "@/components/ui/card";
import { DM_Sans, Geist } from "next/font/google";
import { ID } from "appwrite";


const geist = Geist({ subsets: ['latin'] });

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
      await databases.createDocument(
        databaseId,
        feedbackCollectionId,
        ID.unique(),
        {
          tag: selectedTag!,
          feedback: message.trim(),
          name: name.trim() || undefined,
          email: email.trim() || undefined,
        }
      );
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
    return (
      <div className="flex flex-col w-full">

      <div className="m-10 space-y-8">
        <Skeleton className="w-[300px] h-[32px]" />
        <Skeleton className="w-[400px] h-[15px]" />
      </div>

        <div className="flex flex-row mx-10 gap-10">
          <Skeleton className="w-1/2 h-100" />
          <Skeleton className="w-1/2 h-100" />
        </div>

      </div>
    );
  }

  if (!user) {
    return (
      <div className="m-10">
        <p>
          Please <Link href="/login" className="underline">log in</Link> or{" "}
          <Link href="/register" className="underline">create an account</Link> to provide feeback.
        </p>
      </div>
    );
  }

  return (
    <div className="h-full w-full space-y-3 lg:space-y-5 m-5 lg:m-10">
      <div>
        <GuideTour id="feedback-page" steps={feedbackGuideSteps} />
        <h1 data-guide="feedback-title" className={`text-2xl lg:text-3xl font-normal ${geist.className}`}>Feedback</h1>
        </div>

          <p className="text-sm lg:text-base text-muted-foreground">Feedback from our users is crucial at this stage of launch.
          </p>

      <div className="flex flex-col lg:flex-row w-full gap-10">

      {/* Feedback form */}
      <Card data-guide="feedback-form" className="bg-background w-full lg:w-1/2">
        <CardHeader>
          <CardTitle>Send feedback</CardTitle>
          <CardDescription>
            Pick a tag, write your feedback, and optionally leave your name and email.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="tag">Tag</Label>
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
                value={message}
                onChange={(e) => { setMessage(e.target.value); if (submitted) setSubmitted(false); }}
                aria-invalid={!!error && !message.trim()}
                placeholder="Tell us what’s on your mind..."
                className="border-input placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground flex min-h-28 w-full rounded-md border bg-transparent px-3 py-2 text-sm shadow-xs transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
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
                  placeholder="Your name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email (optional)</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); if (submitted) setSubmitted(false); }}
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div className="pt-2">
             <Button
                type="submit"
                disabled={submitted || submitted}
                className="cursor-pointer transition-all duration-500 inline-flex items-center justify-center"

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


      <Card className="bg-background w-full lg:w-1/2">
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

    </div>

  );
}

export default FeedbackPage;
