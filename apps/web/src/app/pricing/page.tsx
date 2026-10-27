import { platformUrl } from "@/lib/site-urls";
import type { Metadata } from "next";
import Link from "next/link";
export const metadata: Metadata = {
  title: "Pricing | Synomilo",
  description: "Start with free conversations or choose Plus access to the Synomilo library.",
  alternates: { canonical: "https://synomilo.com/pricing" },
};
export default function Pricing() {
  return <main className="mx-auto max-w-4xl px-6 py-16 space-y-10">
    <Link href="/">← Synomilo</Link>
    <h1 className="text-5xl font-semibold">Choose your library access</h1>
    <p>Start with free conversations. Choose Plus for full access. Early access rates apply while the platform is being polished.</p>
    <div className="grid gap-6 md:grid-cols-3">
      {[{ title: "Free", price: "€0", detail: "Browse the free conversations and create an account to save your vocabulary and progress." },
        { title: "Student Plus", price: "€4.99/month", detail: "Or €49.99/year. Plus access for learners." },
        { title: "Tutor Plus", price: "€9.99/month", detail: "Or €89.99/year. Plus access for tutors." }].map(plan =>
        <section key={plan.title} className="rounded-xl border p-6 space-y-4">
          <h2 className="text-2xl">{plan.title}</h2><p className="text-xl">{plan.price}</p><p>{plan.detail}</p>
        </section>)}
    </div>
    <p><a className="underline" href={platformUrl("/login")} >Log in</a> or <a className="underline" href={platformUrl("/register")} >create an account</a> to start.</p>
    <a className="inline-block rounded-lg bg-foreground px-6 py-3 text-background" href={`${process.env.NEXT_PUBLIC_PLATFORM_URL || "http://localhost:3001"}/pricing`}>View plans and subscribe</a>
    <p><a className="underline" href={platformUrl("/profile")} >Manage your subscription</a> · <Link className="underline" href="/refund">Refund policy</Link></p>
  </main>;
}
