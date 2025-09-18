"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function LeftSide() {
  const containerRef = useRef<HTMLDivElement>(null);

  const tailwindColors = [
    "bg-red-500",
    "bg-green-500",
    "bg-blue-500",
    "bg-yellow-400",
    "bg-purple-500",
    "bg-cyan-500",
    "bg-lime-300",
    "bg-violet-500",
    "bg-pink-500",
    "bg-cyan-700",
    "bg-orange-500",
    "bg-fuchsia-600"
  ];

  const NUM_ROWS = 8;
  const RECT_PER_ROW = 10;

  const generateRect = () => ({
    w: 200 + Math.floor(Math.random() * 1000),
    h: 40,
    color: tailwindColors[Math.floor(Math.random() * tailwindColors.length)],
  });

  const rowData = Array.from({ length: NUM_ROWS }, () =>
    Array.from({ length: RECT_PER_ROW }, generateRect)
  );

  // Subtle wiggle using CSS variables so it composes with repulsion
  useEffect(() => {
    if (!containerRef.current) return;

    const boxes = containerRef.current.querySelectorAll<HTMLDivElement>(".highlight");

    boxes.forEach((box, index) => {
      // Random small movement
      const amplitudeX = 2 + Math.random() * 5;
      const amplitudeY = 1 + Math.random() * 5;
      const duration = 3 + Math.random() * 3;

      gsap.to(box, {
        css: {
          "--wigX": `+=${(Math.random() > 0.5 ? amplitudeX : -amplitudeX).toFixed(2)}px`,
          "--wigY": `+=${(Math.random() > 0.5 ? amplitudeY : -amplitudeY).toFixed(2)}px`,
        },
        duration: duration,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Fade in once with render delay
      gsap.to(box, {
        opacity: 1,
        delay: 0.005 * index, // same stagger
      });
    });
  }, []);

  // Pointer-based repulsion
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const boxes = Array.from(container.querySelectorAll<HTMLDivElement>(".highlight"));
    let mouseX = 0;
    let mouseY = 0;
    let rafId: number | null = null;

    const maxPush = 80; // px
    const radius = 140; // influence radius in px

    const step = () => {
      rafId = null;
      const crect = container.getBoundingClientRect();

      for (const el of boxes) {
        const r = el.getBoundingClientRect();
        const cx = (r.left + r.right) / 2 - crect.left;
        const cy = (r.top + r.bottom) / 2 - crect.top;
        const dx = cx - mouseX;
        const dy = cy - mouseY;
        const dist = Math.hypot(dx, dy) || 1;

        if (dist < radius) {
          const force = (1 - dist / radius) ** 2; // quadratic falloff
          const repelX = (dx / dist) * force * maxPush;
          const repelY = (dy / dist) * force * maxPush;

          gsap.to(el, {
            css: {
              "--repelX": `${repelX.toFixed(2)}px`,
              "--repelY": `${repelY.toFixed(2)}px`,
            },
            duration: 0.18,
            ease: "sine.out",
            overwrite: "auto",
          });
        } else {
          gsap.to(el, {
            css: { "--repelX": "0px", "--repelY": "0px" },
            duration: 0.4,
            ease: "sine.out",
            overwrite: "auto",
          });
        }
      }
    };

    const onMove = (e: PointerEvent) => {
      const crect = container.getBoundingClientRect();
      mouseX = e.clientX - crect.left;
      mouseY = e.clientY - crect.top;
      if (rafId == null) rafId = requestAnimationFrame(step);
    };

    const onLeave = () => {
      for (const el of boxes) {
        gsap.to(el, { css: { "--repelX": "0px", "--repelY": "0px" }, duration: 0.35, ease: "sine.out", overwrite: "auto" });
      }
    };

    container.addEventListener("pointermove", onMove);
    container.addEventListener("pointerleave", onLeave);
    return () => {
      container.removeEventListener("pointermove", onMove);
      container.removeEventListener("pointerleave", onLeave);
      if (rafId != null) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative flex flex-col justify-evenly gap-15 h-full w-full p-10 overflow-hidden bg-popover"
    >
      {rowData.map((row, rowIndex) => (
        <div key={rowIndex} className="highlight-row flex gap-3 whitespace-nowrap">
          {row.map((rect, idx) => (
            <div
              key={idx}
              className={`highlight rounded-sm ${rect.color}`}
              style={{
                width: `${rect.w}px`,
                height: `${rect.h}px`,
                opacity: 0,
                // initialize CSS variables for motion composition
                "--wigX": "0px",
                "--wigY": "0px",
                "--repelX": "0px",
                "--repelY": "0px",
                transform:
                  "translate(calc(var(--wigX, 0px) + var(--repelX, 0px)), calc(var(--wigY, 0px) + var(--repelY, 0px)))",
              } as React.CSSProperties}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
