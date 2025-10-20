"use client";
import * as React from "react";
import { SunIcon, MoonIcon, MoonStarIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export default function ModeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="relative cursor-pointer group hover:scale-110 transition-transform duration-150"
    >
      <SunIcon
        className="
          h-[1.2rem] w-[1.2rem]
          transition-transform duration-500 ease-in-out
          scale-100 rotate-45
          dark:hidden
        "
      />

      <MoonIcon
        className="
          absolute h-[1.2rem] w-[1.2rem]
          transition-all duration-500 ease-in-out
          rotate-0 scale-100 opacity-100
          group-hover:opacity-0
          dark:block hidden
        "
      />

      <MoonStarIcon
        className="
          absolute h-[1.2rem] w-[1.2rem]
          transition-all duration-500 ease-in-out
          opacity-0 scale-90
          group-hover:opacity-100 group-hover:scale-100
          dark:block hidden
        "
      />

      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
