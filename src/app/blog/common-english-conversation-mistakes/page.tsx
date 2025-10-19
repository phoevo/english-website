import { Button } from "@/components/ui/button";
import { Check, CircleAlert, X } from "lucide-react";

/* eslint react/no-unescaped-entities: 0 */
export const metadata = {
  title: "Common English Conversation Mistakes | Synomilo",
  description:
    "Learn the most common mistakes ESL learners make in English conversations and how to fix them. Improve your fluency, confidence, and natural flow.",
};

export default function PostPage() {
  return (
    <div className="w-full lg:p-10 space-y-6">
      <header className="mb-10 space-y-4">
        <h1 className="text-4xl border-b pb-2">
          Common English Conversation Mistakes (and How to Fix them)
        </h1>
        <p>
          Many English learners spend years studying grammar and vocabulary, but still struggle
          when it comes to real conversations. Often, the problem isn't grammar, it's small
          habits that make speech sound unnatural or awkward. Here are some of the most
          common English conversation mistakes and how to fix them.
        </p>
      </header>

      {/* 1 */}
      <section className="space-y-3">
        <h2 className="text-2xl border-b pb-1">1. Overusing Formal Language</h2>
        <p>
          Many learners speak as if they're writing an essay or reading from a textbook. Real conversation is much more
          relaxed. Instead of long, polite forms, use shorter, natural expressions.
        </p>

        <div className="flex flex-col border bg-card rounded-md mt-5 p-3">
          <strong>Example</strong>
          <p className="flex flex-row items-center gap-2">
            <X className="text-red-500" /> “I would like to make a reservation for two.”
          </p>
          <p className="flex flex-row items-center gap-2">
            <Check className="text-green-500" /> “Can I book a table for two?”
          </p>
        </div>

        <p>
          Native speakers use contractions and simpler words in daily speech. You don't have to be
          overly polite to sound respectful, just natural.
        </p>

        <p>However, there is a time and a place for formal language. Booking a table at an expensive restaurant for example, would likely favour a more polite form.</p>
      </section>

      {/* 2 */}
      <section className="space-y-3 mt-20">
        <h2 className="text-2xl border-b pb-1">2. Forgetting to Ask Questions Back</h2>
        <p>
          Many learners answer questions but forget to continue the conversation. Perhaps out fear they might
          say something incorrect, or are just shy to use English. Sometimes, it's as simple as asking the same question back.
        </p>

        <div className="flex flex-col border bg-card rounded-md mt-5 p-3">
          <strong>Example</strong>
          <p className="flex flex-row items-center gap-2">
            <X className="text-red-500" /> A: “Where are you from?” B: “I'm from Italy.”
          </p>
          <p className="flex flex-row items-center gap-2">
            <Check className="text-green-500" /> A: “Where are you from?” B: “I'm from Italy. How
            about you?”
          </p>
        </div>

        <p>Other times the conversation demands listening, thinking and responding.</p>

        <div className="flex flex-col border bg-card rounded-md mt-5 p-3">
          <strong>Example</strong>
          <div className="flex flex-col gap-2 bg-red-500/40 dark:bg-red-500/70 border-2 p-5 border-red-500 rounded-md">
            <p>A: “Where are you from?”</p>
            <p>B: “I'm from Italy. How about you?”</p>
            <p>A: "England"</p>
            <p>B: "Cool"</p>
          </div>

           <div className="flex flex-col gap-2 mt-5 bg-green-500/40 dark:bg-green-500/70 border-2 p-5 border-green-500 rounded-md">
            <p>A: “Where are you from?”</p>
            <p>B: “I'm from Italy. How about you?”</p>
            <p>A: "England"</p>
            <p>B: "Cool, where from in England?"</p>
            <p>A: "Newcastle. Have you heard of it?"</p>
            <p>B: "Yes, I have. My cousin went to University there.</p>
            <p>...And so on...</p>
          </div>

        </div>

        <p>
          Showing curiosity makes conversations flow naturally. It also helps you sound more
          confident and socially comfortable.
        </p>
      </section>

      {/* 3 */}
      <section className="space-y-3 mt-20">
        <h2 className="text-2xl border-b pb-1">3. Translating Directly from Your Language</h2>
        <p>
          Thinking in your native language first and translating can create unnatural expressions.
          English has its own idioms and phrasing, so try to think directly in English.
        </p>

        <div className="flex flex-col border bg-card rounded-md mt-5 p-3">
          <strong>Example</strong>
          <p className="flex flex-row items-center gap-2">
            <X className="text-red-500" /> “It makes me hungry in my eyes.” - <i>French idiom</i>
          </p>
          <p className="flex flex-row items-center gap-2">
            <Check className="text-green-500" /> “That looks delicious!”
          </p>
        </div>

        <p>
          The best fix is practice. Listen, read, and speak English regularly until certain
          phrases become automatic. When you start to say phrases (not words) naturally and automatically,
          English gets a bit easier to use.
        </p>
      </section>

      {/* 4 */}
      <section className="space-y-3 mt-20">
        <h2 className="text-2xl border-b pb-1">4. Using Textbook Expressions Too Often</h2>
        <p>
          Textbook English sounds correct but not real. Phrases like “It is very nice to meet you”
          or “I am fine, thank you” are rarely said that way in real life.
        </p>

        <div className="flex flex-row items-center justify-start text-base">
          <CircleAlert className="text-red-500 flex-shrink-0" size={20}/><i className="text-muted-foreground"> Who you are talking to matters.
            It's better to use formal English in professional or academic settings, and with superiors or elders.</i>
        </div>

        <div className="flex flex-col border bg-card rounded-md mt-5 p-3">
          <strong>Example</strong>
          <p className="flex flex-row items-center gap-2">
            <X className="text-red-500" /> “It is very nice to meet you.”
          </p>
          <p className="flex flex-row items-center gap-2">
            <Check className="text-green-500" /> “Nice to meet you!”
          </p>
        </div>

        <div className="flex flex-col border bg-card rounded-md mt-5 p-3">
          <strong>Example 2</strong>

          <strong className="py-2 px-8">"Q: Hey, how are you?"</strong>
          <p className="flex flex-row items-center gap-2">
            <X className="text-red-500" /> “I am doing good, how are you doing?”
          </p>
          <p className="flex flex-row items-center gap-2">
            <Check className="text-green-500" /> “I'm good, how are you?”
          </p>
        </div>

        <p>
          Simple, quick and casual. Natural English is shorter and to the point, almost sounding like one long word.</p>
      </section>

      {/* CTA */}
      <section className="space-y-3 mt-20">
        <div className="flex flex-col items-center text-center bg-accent p-8 rounded-md">
          <h3 className="text-xl font-semibold mb-3">
            Want to practice real English conversations?
          </h3>
          <p className="mb-5">
            Synomilo lets you go beyond studying. Practice real scenarios with native-written
            conversations and audio.
          </p>
          <a href="/">
            <Button
              size="sm"
              variant="default"
              className="cursor-pointer text-background bg-pink-500 hover:bg-pink-500/85"
            >
              Try Synomilo for free
            </Button>
          </a>
        </div>
      </section>

      {/* Conclusion */}
      <section className="space-y-3 mt-20">
        <h2 className="text-2xl border-b pb-1">Conclusion</h2>
        <p>
          Small changes make a big difference in how natural you sound. Don't worry about
          perfection, just focus on relaxing, reacting, and connecting like you would in your first
          language. With consistent practice, these fixes will become automatic.
        </p>

        <p>
          Also read:{" "}
          <a
            href="/blog/how-to-sound-native"
            className="text-pink-500 hover:underline"
          >
            How to Sound More Native in English
          </a>
        </p>
      </section>
    </div>
  );
}
