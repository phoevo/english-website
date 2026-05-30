import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/ThemeProvider";
import { Toaster } from "@/components/ui/sonner";
import CookieConsent from "@/components/CookieConsent";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Synomilo - Conversations for tutors and students",
  description: "Conversation-based ESL tools for tutors and students",
    icons: [
    { rel: "icon", url: "/favicon-light.svg", media: "(prefers-color-scheme: light)" },
    { rel: "icon", url: "/favicon-dark.svg", media: "(prefers-color-scheme: dark)" },
    { rel: "icon", url: "/favicon.png" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} antialiased bg-accent`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <div className="min-h-screen flex flex-col">
            <div className="bg-background">{children}</div>
            <Toaster richColors position="bottom-right" />
            <CookieConsent />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
