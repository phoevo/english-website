"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { trackEvent } from "@/lib/analytics";

/** Records a guide_view for the guide at the current path, once per visit. */
export default function TrackGuideView() {
  const pathname = usePathname();
  const tracked = useRef<string | null>(null);
  useEffect(() => {
    const guide = pathname.split("/").filter(Boolean)[1];
    if (!guide || tracked.current === pathname) return;
    tracked.current = pathname;
    trackEvent("guide_view", { guide });
  }, [pathname]);
  return null;
}
