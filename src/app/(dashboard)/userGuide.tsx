"use client";

import { useEffect, useState } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Geist } from "next/font/google";

const geist = Geist({ subsets: ["latin"] });

type UserGuidePopoverProps = {
  id: string;
  title: string;
  description: string;
  children: React.ReactNode;
  side?: "top" | "right" | "bottom" | "left";
  align?: "start" | "center" | "end";
};

export default function UserGuidePopover({
  id,
  title,
  description,
  children,
  side = "bottom",
  align = "center",
}: UserGuidePopoverProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const hasSeen = localStorage.getItem(`guide-${id}`);
    if (!hasSeen) setOpen(true);
  }, [id]);

  const handleAcknowledge = () => {
    localStorage.setItem(`guide-${id}`, "true");
    setOpen(false);
  };

  return (
    <>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>{children}</PopoverTrigger>
        <PopoverContent
          side={side}
          align={align}
          className={`w-200 h-auto z-50 border shadow-lg bg-background backdrop-blur-[1px] ${geist.className}`}
          style={{ backdropFilter: "blur(10px)" }}
        >
          <h3 className="text-md font-semibold mb-1">{title}</h3>
          <p className="text-md mb-3">{description}</p>
          <Button size="sm" onClick={handleAcknowledge}>
            Got it
          </Button>
        </PopoverContent>
      </Popover>

      {/* Blur overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-transparent backdrop-blur-xs z-4 pointer-events-none"
          aria-hidden="true"
        />
      )}
    </>
  );
}
