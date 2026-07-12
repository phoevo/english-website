import type { ReactNode } from "react";

export default function BlogLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <div className="flex items-start h-screen bg-gradient">{children}</div>;
}