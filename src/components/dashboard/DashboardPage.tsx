"use client";

import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";
import { dashboardStyles } from "./styles";

gsap.registerPlugin(useGSAP);

export default function DashboardPage({ children, ready = true, className }: {
  children: ReactNode;
  ready?: boolean;
  className?: string;
}) {
  const root = useRef<HTMLDivElement>(null);
  // The heading enters on mount and stays visible when the data becomes ready.
  useGSAP(() => {
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.from("[data-dashboard-intro] > *", {
        y: 12, opacity: 0, duration: 0.5, stagger: 0.045, ease: "power2.out",
      });
    });
    return () => media.revert();
  }, { scope: root, dependencies: [] });

  useGSAP(() => {
    if (!ready) return;
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.from("[data-dashboard-entry]", {
        y: 12, opacity: 0, duration: 0.5, stagger: 0.045, ease: "power2.out",
      });
    });
    return () => media.revert();
  }, { scope: root, dependencies: [ready], revertOnUpdate: true });
  return <div ref={root} className={cn(dashboardStyles.page, className)}>{children}</div>;
}
