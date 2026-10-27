"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Geist } from "next/font/google";
import {
  account,
  databases,
  databaseId,
  usersCollectionId,
} from "@/data/appwrite";

const geist = Geist({ subsets: ["latin"] });

export type GuideStep = {
  target: string;
  title: string;
  description: string;
};

type GuideTourProps = {
  id: string;
  steps: GuideStep[];
};

export default function GuideTour({ id, steps }: GuideTourProps) {
  const [active, setActive] = useState(false);
  const [step, setStep] = useState(0);
  const [rect, setRect] = useState<DOMRect | null>(null);
  const [mounted, setMounted] = useState(false);

  const prevElRef = useRef<Element | null>(null);
  const localKey = `guide-${id}`;

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    let cancelled = false;
    let timeout: ReturnType<typeof setTimeout>;

    async function checkGuideProgress() {
      if (localStorage.getItem(localKey) === "true") return;

      try {
        const authUser = await account.get();

        const userDoc = await databases.getDocument(
          databaseId,
          usersCollectionId,
          authUser.$id
        );

        if (cancelled) return;

        const completedGuides = userDoc.guideTour ?? [];

        if (completedGuides.includes(id)) {
          localStorage.setItem(localKey, "true");
          return;
        }

        timeout = setTimeout(() => {
          if (!cancelled) setActive(true);
        }, 600);
      } catch (error) {
        console.error("Failed to check guide progress:", error);

        timeout = setTimeout(() => {
          if (!cancelled) setActive(true);
        }, 600);
      }
    }

    checkGuideProgress();

    return () => {
      cancelled = true;
      clearTimeout(timeout);
    };
  }, [id, mounted, localKey]);

  const measure = useCallback(() => {
    if (!active || !steps[step]) return;

    prevElRef.current?.classList.remove("guide-highlight");

    const el = document.querySelector(`[data-guide="${steps[step].target}"]`);

    if (!el) {
      setRect(null);
      return;
    }

    el.scrollIntoView({ behavior: "smooth", block: "nearest" });

    requestAnimationFrame(() => {
      setRect(el.getBoundingClientRect());
      el.classList.add("guide-highlight");
      prevElRef.current = el;
    });
  }, [active, step, steps]);

  useEffect(() => {
    measure();

    window.addEventListener("resize", measure);
    window.addEventListener("scroll", measure, true);

    return () => {
      window.removeEventListener("resize", measure);
      window.removeEventListener("scroll", measure, true);
      prevElRef.current?.classList.remove("guide-highlight");
    };
  }, [measure]);

  const dismiss = useCallback(async () => {
    localStorage.setItem(localKey, "true");

    try {
      const authUser = await account.get();

      const userDoc = await databases.getDocument(
        databaseId,
        usersCollectionId,
        authUser.$id
      );

      const completedGuides = userDoc.guideTour ?? [];

      if (!completedGuides.includes(id)) {
        await databases.updateDocument(
          databaseId,
          usersCollectionId,
          authUser.$id,
          {
            guideTour: [...completedGuides, id],
          }
        );
      }
    } catch (error) {
      console.error("Failed to save guide progress:", error);
    }

    prevElRef.current?.classList.remove("guide-highlight");
    prevElRef.current = null;

    setActive(false);
  }, [id, localKey]);

  const next = () => {
    if (step < steps.length - 1) {
      setStep((s) => s + 1);
    } else {
      dismiss();
    }
  };

  const back = () => {
    if (step > 0) setStep((s) => s - 1);
  };

  if (!active || !rect || !mounted) return null;

  const gap = 12;
  const belowSpace = window.innerHeight - rect.bottom;
  const placeBelow = belowSpace > 180;

  const tooltipStyle: React.CSSProperties = {
    position: "fixed",
    left: Math.max(12, Math.min(rect.left, window.innerWidth - 340)),
    ...(placeBelow
      ? { top: rect.bottom + gap }
      : { bottom: window.innerHeight - rect.top + gap }),
  };

  const current = steps[step];

  return createPortal(
    <>
      <div
        className="fixed inset-0 bg-black/20 backdrop-blur-[2px] z-40"
        onClick={dismiss}
      />

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          className={`fixed max-w-xs bg-background border-1 p-4 rounded-xl shadow-xl z-[51] ${geist.className}`}
          style={tooltipStyle}
          initial={{ opacity: 0, y: placeBelow ? -8 : 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <p className="font-semibold text-sm">{current.title}</p>

          <p className="text-sm text-muted-foreground mt-1">
            {current.description}
          </p>

          <div className="flex justify-between items-center mt-3">
            <span className="text-xs text-muted-foreground">
              {step + 1} / {steps.length}
            </span>

            <div className="flex gap-2">
              {step > 0 && (
                <Button
                  size="sm"
                  variant="ghost"
                  className="cursor-pointer"
                  onClick={back}
                >
                  Back
                </Button>
              )}

              <Button size="sm" className="cursor-pointer" onClick={next}>
                {step === steps.length - 1 ? "Got it" : "Next"}
              </Button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </>,
    document.body
  );
}