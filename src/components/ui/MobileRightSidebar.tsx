"use client";

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Menu } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import React from "react";
import { DM_Sans } from "next/font/google";

const dmSans = DM_Sans({ subsets: ['latin'] });

type MobileRightSidebarProps = {
  userName?: string;
  isSubscribed?: boolean;
  streak?: number;
  actions?: React.ReactNode; // extra actions like tasks, challenges, logout, theme
};

export function MobileRightSidebar({
  userName = "Guest",
  isSubscribed = false,
  streak,
  actions,
}: MobileRightSidebarProps) {
  return (
    <div className={`lg:hidden md:hidden absolute right-10 mt-200 bg-foreground text-background rounded-full ${dmSans.className}`}>
      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon" variant="ghost" aria-label="Open menu" className="cursor-pointer">
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>

        <SheetContent side="right" className={`w-50 p-0 ${dmSans.className}`}>
          <div className="flex flex-col">
            <SheetHeader className="p-4 border-b">
              <SheetTitle>Menu</SheetTitle>
            </SheetHeader>

            <div className="p-4 flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <Badge className={isSubscribed ? "bg-pink-500 text-foreground" : ""}>
                  {isSubscribed ? "Pro" : "Free"}
                </Badge>
                <span className="text-sm">{userName}</span>
                {typeof streak === "number" && (
                  <Badge title="Current streak" className="ml-auto">{streak}</Badge>
                )}
              </div>

              <nav className="flex flex-col gap-2">
                <Link href="/home" className="rounded-md px-3 py-2 hover:bg-muted">Home</Link>
                <Link href="/profile" className="rounded-md px-3 py-2 hover:bg-muted">Profile</Link>
                <Link href="/pricing" className="rounded-md px-3 py-2 hover:bg-muted">Pricing</Link>
              </nav>

              {actions && (
                <div className="mt-2 border-t pt-4 flex flex-col gap-2">
                  {actions}
                </div>
              )}
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
