"use client";
import Link from "next/link";
import { useUserStore } from "@/data/useUserStore";

export default function Navbar() {
  const { user } = useUserStore();
  return <nav aria-label="Main navigation" className="flex flex-wrap items-center justify-between gap-4 border-b bg-background px-6 py-4">
    <Link href="/home" className="text-xl tracking-tight">Synomilo</Link>
    <div className="flex flex-wrap gap-5 text-sm"><Link href="/home/conversations">Conversations</Link><Link href="/home/recents">Recents</Link><Link href="/home/dictionary">Dictionary</Link><Link href={user ? "/profile" : "/login"}>{user ? "Account" : "Log in"}</Link></div>
  </nav>;
}
