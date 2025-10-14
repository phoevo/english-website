import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";

/* eslint react/no-unescaped-entities: 0 */
export const metadata = {
  title: "How to Sound More Native in English | Synomilo",
  description:
    "Learn natural English expressions, rhythm, and habits that make you sound more fluent and confident in conversation.",
};

export default function PostPage() {
  return (
    <div className="w-full lg:p-10 space-y-6">
      <header className="mb-10 space-y-4">
        <h1 className="text-4xl border-b pb-2">How to Sound More Native in English</h1>
        <p>
          Sounding native isn’t just about having perfect grammar or a native-sounding accent. It's about using English
          naturally. The rhythm, expressions, and reactions that make speech sound real. The way
          native speakers connect words, use casual language, and respond with intent gives English
          its natural flow. This guide focuses on small, practical changes you can make today to
          sound more natural and confident.
        </p>
      </header>

      {/* QUICK FIXES */}
      <section className="space-y-3">
  <h2 className="text-2xl border-b pb-1">Quick Adjustments You Can Make Now</h2>
  <p>
    Before diving into deeper habits, here are a few quick changes that make your English sound instantly
    more natural. These don't require extra study, just awareness and small adjustments when you speak.
  </p>

  <ul className="list ml-6 mt-2 space-y-6">
    <li className="bg-accent p-5 rounded-md">
      <strong className="text-lg">Use small pauses and fillers</strong>
      <br />
      Native speakers say “uh,” “um,” and “you know” when they think. Using them occasionally makes speech
      sound real, not robotic. The key is moderation, one or two in a sentence, not every few words.
      <div className="flex flex-col border bg-card rounded-md mt-5 p-2">
        <strong>Example</strong>
        <p className="flex flex-row items-center gap-2">
          <X className="text-red-500" /> "I am not sure I agree with that."
        </p>
        <p className="flex flex-row items-center gap-2">
          <Check className="text-green-500" /> “Uh, I'm not sure I agree with that, you know?”
        </p>
      </div>
    </li>

    <li className="bg-accent p-5 rounded-md">
      <strong className="text-lg">Use contractions</strong>
      <br />
      Instead of “I am not sure,” say “I'm not sure.” Instead of “I cannot,” say “I can't.” Nearly all native
      speech uses contractions, and skipping them makes you sound overly formal, as if you're reading from a textbook.
      <div className="flex flex-col border bg-card rounded-md mt-5 p-2">
        <strong>Example</strong>
        <p className="flex flex-row items-center gap-2">
          <X className="text-red-500" /> "I cannot believe it is already Friday."
        </p>
        <p className="flex flex-row items-center gap-2">
          <Check className="text-green-500" /> “I can't believe it's already Friday!”
        </p>
      </div>
    </li>

    <li className="bg-accent p-5 rounded-md">
      <strong className="text-lg">Simplify your word choice</strong>
      <br />
      Don't say “I would like to purchase a ticket” Say “I want to buy a ticket” Avoid overly formal textbook language.
      <div className="flex flex-col border bg-card rounded-md mt-5 p-2">
        <strong>Example</strong>
        <p className="flex flex-row items-center gap-2">
          <X className="text-red-500" /> "I would like to request your assistance."
        </p>
        <p className="flex flex-row items-center gap-2">
          <Check className="text-green-500" /> “I'm looking for some help, please?”
        </p>
      </div>
    </li>

    <li className="bg-accent p-5 rounded-md">
      <strong className="text-lg">Don't overpronounce every word</strong>
      <br />
      Native speakers often blend words together naturally. For example: “want to” becomes “wanna,” “going to” becomes
      “gonna.” You don't have to force it, just listen for it and copy it naturally.
      <div className="flex flex-col border bg-card rounded-md mt-5 p-2">
        <strong>Example</strong>
        <p className="flex flex-row items-center gap-2">
          <X className="text-red-500" /> "I am going to call you later."
        </p>
        <p className="flex flex-row items-center gap-2 mb-5">
          <Check className="text-green-500" /> “I'm gonna call you later.”
        </p>
         <p className="flex flex-row items-center gap-2">
          <X className="text-red-500" /> "What are you doing?"
        </p>
        <p className="flex flex-row items-center gap-2">
          <Check className="text-green-500" /> “Whaddya doing?”
        </p>
      </div>
    </li>

    <li className="bg-accent p-5 rounded-md">
      <strong className="text-lg">React naturally</strong>
      <br />
      Short expressions like “Really?”, “Oh wow!”, “No way!”, and “That's great!” show genuine emotion and
      make conversation flow better.
      <div className="flex flex-col border bg-card rounded-md mt-5 p-2">
        <strong>Example</strong>
        <p className="flex flex-row items-center gap-2">
          <X className="text-red-500" /> "That is surprising."
        </p>
        <p className="flex flex-row items-center gap-2">
          <Check className="text-green-500" /> “No way!”
        </p>
      </div>
    </li>
  </ul>

  <p>
    These small tweaks alone can make a huge difference. The goal isn't to copy every native habit, but just
    enough to make your speech sound more relaxed and confident.
  </p>
</section>



      {/* 1 */}
      <section className="space-y-3 mt-20">
        <h2 className="text-2xl border-b pb-1">1. Phrasal Verbs</h2>
        <p>
          Phrasal verbs are one of the biggest signs of natural English. Native speakers almost
          never say “encounter an old friend”, they say{" "}
          <strong>“run into an old friend.”</strong> These short two-word phrases replace longer,
          more formal words and can help make your speech sound fluent.
        </p>

        <p>Common examples include:</p>
        <ul className="list-disc ml-6 bg-accent rounded-md pl-10 py-5">
          <li>“pick up” instead of “collect”</li>
          <li>“hang out” instead of “spend time”</li>
          <li>“find out” instead of “discover”</li>
          <li>“come across” instead of “find by chance”</li>
          <li>“put off” instead of “delay”</li>
        </ul>

        <p>
          Using phrasal verbs makes you sound more natural and relaxed. However, keep in mind that these phrases can only be used in a casual setting, like with a friend.
        </p>
        <div className="flex flex-row items-center gap-2 bg-accent p-5 rounded-md border-1 border-pink-500">
          <p>To see phrasal verbs with surrounding context and audio</p>
          <a href={"/"}>
          <Button size={"sm"} variant={"default"} className="cursor-pointer border-1 text-background bg-pink-500 hover:bg-pink-500/85">Try Synomilo for free</Button>
          </a>
        </div>
      </section>

      {/* 2 */}
      <section className="space-y-3 mt-20">
        <h2 className="text-2xl border-b pb-1">2. Match Rhythm and Intonation</h2>
        <p>
          English has a rhythm. Sort of like a pattern of stress and tone that gives words more meaning and emphasis. Words rise
          and fall depending on what's important, emotional, or surprising. Pay attention to how
          speakers emphasize certain words in a sentence.
        </p>
          <div className="bg-accent rounded-md pl-10 py-5">
        <p className="italic">
          "How come you never called me?"
        </p>
        <p className="italic">
          “I <strong>did</strong> call you.”
        </p>
        </div>
          <p>The stress on “did” shows emotion or contrast.</p>
        <p>
          Listening closely and mimicking this rhythm helps your speech sound more alive. You'll
          notice that native speakers often “link” words together, so “What do you want to eat?”
          becomes “Whaddya wanna eat?” Just like the example further up.
        </p>
      </section>

      {/* 3 */}
      <section className="space-y-3 mt-20">
        <h2 className="text-2xl border-b pb-1">3. Stop Translating in Your Head</h2>
        <p>
          Many learners sound unnatural because they think in their native language first, then try
          to translate into English. When speaking to a native, they will notice this immediately, but will rarely correct you. They'll assume English isn't your first language. (It isn't, but that's not our goal).
          The best way to fix this is to think directly in English, even
          for simple thoughts.
        </p>
        <p>
          Try describing what's around you, planning your day in English, or summarizing what you
          just read out loud. Over time, your brain will skip the translation step completely.
        </p>
      </section>

      {/* 4 */}
      <section className="space-y-3 mt-20">
        <h2 className="text-2xl border-b pb-1">4. Learn Natural Reactions and Interjections</h2>
        <p>
          Natives often respond with quick, emotional phrases, not full sentences. These small
          words show emotion, surprise, or agreement and make conversations sound smoother.
        </p>
        <ul className="list-disc bg-accent rounded-md pl-10 py-5">
          <li>“Oh really?”</li>
          <li>“That's awesome!”</li>
          <li>“No way!”</li>
          <li>“Exactly!”</li>
          <li>“Totally.”</li>
        </ul>
        <p>
          Learning a few of these helps you sound more expressive and understanding. You're showing the speaker that you're actively listening.
        </p>
      </section>

      {/* Conclusion */}
      <section className="space-y-3">
        <h2 className="text-2xl border-b pb-1">Conclusion</h2>
        <p>
          Sounding more native isn't about imitating every detail, it's about relaxing, reacting
          naturally, and using the same patterns native speakers use every day.
          Start noticing the things mentioned in this article, and see how it feels to incorporate them into your speech.”
          Do whatever feels natural and not forced.
        </p>
      </section>
    </div>
  );
}
