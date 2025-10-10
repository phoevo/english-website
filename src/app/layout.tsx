// app/layout.tsx (RootLayout - remains a Server Component)
import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/ThemeProvider";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Synomilo",
  description: "Real English conversation practice. No circling or filling in the blanks.",
  icons: [
    { rel: "icon", url: "/favicon-light.svg", media: "(prefers-color-scheme: light)" },
    { rel: "icon", url: "/favicon-dark.svg", media: "(prefers-color-scheme: dark)" },
    { rel: "icon", url: "/favicon.png" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <div className="min-h-screen flex flex-col">
            <div className="">{children}</div>
            <Toaster richColors position="bottom-right" />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
