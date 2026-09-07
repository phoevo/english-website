"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import ModeToggle from "@/components/ui/ModeToggle";
import { Geist } from "next/font/google";

const geist = Geist({ subsets: ["latin"] });


export function MobileLandingSidebar() {
  return (
    <div className={`md:hidden ${geist.className}`}>
      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon" variant="ghost" aria-label="Open menu">
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>

        <SheetContent side="right" className={`w-72 p-0 bg-gradient ${geist.className}`}>
          <SheetHeader className="border-b">
            <SheetTitle>Menu</SheetTitle>
          </SheetHeader>

          <div className="flex flex-col gap-2 p-4">
            <Link href="/pricing" className="rounded-md px-3 py-2 hover:bg-muted">
              Pricing
            </Link>
            <Link href="/guides" className="rounded-md px-3 py-2 hover:bg-muted">
              Guides
            </Link>
            <Link href="/login" className="rounded-md px-3 py-2 hover:bg-muted">
              Log in
            </Link>

            <Link href="/register" className="mt-2">
              <Button size={"sm"} className="rounded-lg">Start free</Button>
            </Link>

            <div className="mt-2">
              <ModeToggle />
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
