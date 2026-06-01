"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  title?: string;
  media?: React.ReactNode;
  content?: React.ReactNode;
  footer?: React.ReactNode;
  children: React.ReactNode;
  side?: "top" | "right" | "bottom" | "left";
  align?: "start" | "center" | "end";
  onNext?: () => void;
};

export default function UserGuidePopover({
  id,
  title: _title,
  media,
  content,
  footer,
  children,
  side = "bottom",
  align = "center",
  onNext,
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

  const handleNext = () => {
    handleAcknowledge();
    onNext?.();
  };

  return (
    <>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>{children}</PopoverTrigger>

        <AnimatePresence>
          {open && (
            <PopoverContent
              side={side}
              align={align}
              className={`lg:w-full w-sm z-50 border shadow-xl
                          bg-background/90 backdrop-blur-lg rounded-2xl p-5
                          ${geist.className}`}
            >
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
              >

                {media && (
                  <div className="mb-3 rounded-lg overflow-hidden">
                    {media}
                  </div>
                )}

                {content && (
                  <div className="text-md text-muted-foreground mb-4 leading-relaxed">
                    {content}
                  </div>
                )}

                {footer ? (
                  <div className="mt-4">{footer}</div>
                ) : (
                  <div className="flex justify-end gap-2">
                    {onNext && (
                      <Button size="sm" variant="outline" onClick={handleNext}>
                        Next
                      </Button>
                    )}
                    <Button size="sm" onClick={handleAcknowledge}>
                      Got it
                    </Button>
                  </div>
                )}
              </motion.div>
            </PopoverContent>
          )}
        </AnimatePresence>
      </Popover>

      {/* Optional background blur overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-transparent backdrop-blur-xs z-40 pointer-events-none"
          aria-hidden="true"
        />
      )}
    </>
  );
}
