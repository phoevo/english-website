"use client";

import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import styles from "./auth.module.css";

gsap.registerPlugin(useGSAP);

export default function AuthPanel({ title, description, children, footer }: {
  title: string;
  description: string;
  children: ReactNode;
  footer?: ReactNode;
}) {
  const panel = useRef<HTMLElement>(null);
  useGSAP(() => {
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.from("[data-auth-header] > *, [data-auth-body]", {
        y: 12, opacity: 0, duration: 0.55, stagger: 0.07, ease: "power2.out",
      });
    });
    return () => media.revert();
  }, { scope: panel });

  return <section ref={panel} className={styles.panel} aria-labelledby="auth-title">
    <header data-auth-header className={styles.panelHeader}>
      <h1 id="auth-title">{title}</h1>
      <p>{description}</p>
    </header>
    <div data-auth-body>{children}</div>
    {footer && <footer className={styles.panelFooter}>{footer}</footer>}
  </section>;
}
