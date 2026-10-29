/** Shared Tailwind styles for dashboard screens and their cards. */
export const dashboardStyles = {
  page: "flex h-full min-h-0 w-full flex-col overflow-hidden bg-background p-4 text-foreground sm:p-5 xl:p-6 2xl:p-8 [font-family:var(--font-geist-sans,Arial),Arial,sans-serif]",
  heading: "text-[clamp(1.75rem,2.7vw,2.4rem)] font-medium leading-[1.15] tracking-[-.045em]",
  description: "mt-2 text-sm leading-7 text-muted-foreground",
  card: "rounded-xl border border-border bg-background text-foreground shadow-none",
  field: "h-11 rounded-md border-border bg-background text-sm shadow-none focus-visible:border-foreground/50 focus-visible:ring-0",
  textLink: "inline-flex items-center gap-1.5 text-xs text-muted-foreground underline-offset-4 hover:text-foreground hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground",
} as const;
