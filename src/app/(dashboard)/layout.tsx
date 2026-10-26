"use client";

import { useEffect } from "react";
import { Toaster } from "sonner";
import { Geist } from "next/font/google";
import { useUserStore } from "@/data/useUserStore";


const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });

export default function DashboardLayout({ children }: { children: React.ReactNode }) {

  useEffect(() => {
    const loadUser = async () => {
      await useUserStore.getState().fetchUser();

    };

    loadUser();
  }, []);

  return (
    <div className={`${geistSans.className}`}>
      <div className="font-sans bg-background">
        <main className="m-2">{children}</main>
        <Toaster />
      </div>
    </div>
  );
}