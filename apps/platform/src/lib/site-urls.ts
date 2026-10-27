export const webUrl = (path: string) =>
  `${(process.env.NEXT_PUBLIC_WEB_URL || "http://localhost:3000").replace(/\/$/, "")}${path}`;
