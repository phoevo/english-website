"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Geist } from "next/font/google";

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

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!mounted) return;
    if (localStorage.getItem(`guide-${id}`)) return;
    const t = setTimeout(() => setActive(true), 600);
    return () => clearTimeout(t);
  }, [id, mounted]);

  const measure = useCallback(() => {
    if (!active || !steps[step]) return;

    if (prevElRef.current) {
      prevElRef.current.classList.remove("guide-highlight");
    }

    const el = document.querySelector(`[data-guide="${steps[step].target}"]`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "nearest" });
      requestAnimationFrame(() => {
        setRect(el.getBoundingClientRect());
        el.classList.add("guide-highlight");
        prevElRef.current = el;
      });
    } else {
      setRect(null);
    }
  }, [active, step, steps]);

  useEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    window.addEventListener("scroll", measure, true);
    return () => {
      window.removeEventListener("resize", measure);
      window.removeEventListener("scroll", measure, true);
      if (prevElRef.current) {
        prevElRef.current.classList.remove("guide-highlight");
      }
    };
  }, [measure]);

  const dismiss = useCallback(() => {
    localStorage.setItem(`guide-${id}`, "true");
    if (prevElRef.current) {
      prevElRef.current.classList.remove("guide-highlight");
      prevElRef.current = null;
    }
    setActive(false);
  }, [id]);

  const next = () => {
    if (step < steps.length - 1) setStep((s) => s + 1);
    else dismiss();
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
