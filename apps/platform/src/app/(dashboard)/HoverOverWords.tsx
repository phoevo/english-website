"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const TEXT = "Fully interactive!";

export default function HoverOverWords() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const letters = Array.from(
      container.querySelectorAll<HTMLSpanElement>(".how-letter")
    );

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      if (prefersReduced) {
        gsap.set(letters, { opacity: 1, y: 0 });
        return;
      }

      // Intro: each letter jumps up and flashes pink, then lands.
      gsap.set(letters, { opacity: 0, y: 20, color: "" });
      gsap.to(letters, {
        opacity: 1,
        y: -10,
        color: "#ec4899",
        duration: 0.15,
        ease: "power2.out",
        stagger: 0.035,
        onComplete: () => {
          // Land each letter and fade colour back to inherit.
          gsap.to(letters, {
            y: 0,
            color: "",
            duration: 0.02,
            ease: "power3.in",
            stagger: 0.025,
            onComplete: () => {
              // Very subtle idle wave.
              gsap.to(letters, {
                y: -4,
                duration: 1,
                ease: "sine.inOut",
                repeat: -1,
                yoyo: true,
                stagger: { each: 0.1, from: "start" },
              });
            },
          });
        },
      });
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="border rounded-md self-center p-5 lg:p-10 text-2xl font-semibold lg:absolute lg:top-10 cursor-default select-none"
      aria-label={TEXT}
    >
      <span className="inline-flex flex-wrap" aria-hidden="true">
        {TEXT.split("").map((char, i) => (
          <span
            key={i}
            className="how-letter inline-block will-change-transform"
          >
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </span>
    </div>
  );
}
