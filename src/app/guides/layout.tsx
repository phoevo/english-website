import type { ReactNode } from "react";

export default function GuideLayout({ children }: { children: ReactNode }) {
  return <div className="min-h-svh w-full bg-background">{children}</div>;
}
