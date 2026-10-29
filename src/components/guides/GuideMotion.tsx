"use client";

import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/** Keeps animation client-side while article content remains server-rendered. */
export default function GuideMotion({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.from("[data-guide-content] > header > *, [data-guide-index-intro] > *", {
        y: 14, opacity: 0, duration: 0.65, stagger: 0.07, ease: "power2.out",
      });
      gsap.utils.toArray<HTMLElement>("[data-guide-content] > section, [data-guide-card]").forEach(section => {
        gsap.from(section, {
          y: 14, opacity: 0, duration: 0.6, ease: "power2.out",
          scrollTrigger: { trigger: section, start: "top 94%", once: true },
        });
      });
    });
    return () => media.revert();
  }, { scope: root });
  return <div ref={root}>{children}</div>;
}
