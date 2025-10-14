"use client";

import { useEffect, useState } from "react";
import { Geist } from "next/font/google";

const geist = Geist({ subsets: ["latin"] });

type Heading = { id: string; text: string; level: number };

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export default function TableOfContents() {
  const [headings, setHeadings] = useState<Heading[]>([]);

  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>("main h2, main h3"));
    const found: Heading[] = nodes.map((el) => {
      let id = el.id;
      if (!id) {
        const generated = slugify(el.innerText || el.textContent || "");
        el.id = generated;
        id = generated;
      }
      const level = el.tagName === "H2" ? 2 : 3;
      return { id, text: el.innerText || el.textContent || "", level };
    });
    setHeadings(found);
  }, []);

  if (!headings.length) return null;

  return (
    <nav aria-label="On this page" className="space-y-2">
      <h3 className="text-sm font-semibold text-muted-foreground">On this page</h3>
      <ul className={`space-y-2 text-sm ${geist.className}`}>
        {headings.map((h) => (
          <li key={h.id} className={h.level === 3 ? "ml-3" : ""}>
            <a href={`#${h.id}`} className="text-muted-foreground hover:text-foreground">
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}