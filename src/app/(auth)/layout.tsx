"use client"

import ModeToggle from "@/components/ui/ModeToggle";
import Link from "next/link";
import { Montserrat, Raleway, Geist, Geist_Mono } from "next/font/google";


const raleway = Raleway({ subsets: ['latin'] });
const montserrat = Montserrat({ subsets: ['latin'] });
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})



export default function AuthLayout({ children }: { children: React.ReactNode }){

  return(
    <div className={`flex w-screen h-screen bg-red-500 ${geistSans.className}`}>
      <div className="absolute top-5 right-5 z-1">
        <div className="flex gap-3 items-center">
        <Link className="underline underline-offset-5 hover:underline-offset-10 transition-all duration-300" href={"/home"}>Home</Link>
        <ModeToggle/>
        </div>
      </div>



      <div className="flex justify-center items-center w-1/2 h-screen bg-foreground hover:w-2/3 transition-all duration-500 ease-in-out">
      <div className="flex justify-center items-center h-100 w-100 rounded-xl bg-red-500">Images showing app</div>
      </div>

      <div className="flex justify-center items-center w-1/2 h-screen bg-background hover:w-2/3 transition-all duration-500 ease-in-out">

        <div className="flex justify-center items-center border-1 shadow-md rounded-lg w-150 h-180">

          {children}


        </div>

      </div>



    </div>
  );
}