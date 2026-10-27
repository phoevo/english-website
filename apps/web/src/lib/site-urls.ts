export const platformUrl = (path: string) =>
  `${(process.env.NEXT_PUBLIC_PLATFORM_URL || "http://localhost:3001").replace(/\/$/, "")}${path}`;
