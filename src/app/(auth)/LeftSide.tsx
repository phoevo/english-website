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

  useEffect(() => {
    if (!containerRef.current) return;

    const boxes = containerRef.current.querySelectorAll<HTMLDivElement>(".highlight");

    boxes.forEach((box, index) => {
      // Random small movement
      const amplitudeX = 2 + Math.random() * 5;
      const amplitudeY = 1 + Math.random() * 5;
      const duration = 3 + Math.random() * 3;

      gsap.to(box, {
        x: `+=${Math.random() > 0.5 ? amplitudeX : -amplitudeX}`,
        y: `+=${Math.random() > 0.5 ? amplitudeY : -amplitudeY}`,
        duration: duration,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",

      });

      // Fade in once with render delay
      gsap.to(box, {
        opacity: 1,
        delay: 0.01 * index, // same stagger
      });
    });
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative flex flex-col gap-15 h-full w-full p-10 overflow-hidden bg-popover"
    >

      {/* <div className="absolute inset-0 flex items-center justify-center z-10">
        <h1 className="text-4xl font-bold text-white">Synomilo</h1>
      </div> */}

      {rowData.map((row, rowIndex) => (
        <div key={rowIndex} className="highlight-row flex gap-3 whitespace-nowrap">
          {row.map((rect, idx) => (
            <div
              key={idx}
              className={`highlight rounded-sm ${rect.color}`}
              style={{ width: `${rect.w}px`, height: `${rect.h}px`, opacity: 0 }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
