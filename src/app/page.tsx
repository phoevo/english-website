"use client";
import ModeToggle from "@/components/ui/ModeToggle";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Raleway } from "next/font/google";
import { Montserrat } from "next/font/google";
import { motion } from "motion/react"



const raleway = Raleway({ subsets: ['latin'] });

const transition1 = {
  duration: 1,
  delay: 0,
  ease: [0, 0.71, 0.2, 1.01],
}

const transition2 = {
  duration: 1,
  delay: 0.3,
  ease: [0, 0.71, 0.2, 1.01],
}

const transitionImage = {
  initial: { opacity: 0.3, scale: 0.9 },
  whileInView: { opacity: 1, scale: 1 },
  viewport: { margin: "-200px" },
  transition: {
    duration: 2,
    delay: 0,
    ease: [0, 0.71, 0.4, 0.91]

  },
};





export default function LandingPage() {
  return (
    <div className={`flex bg-background flex-col items-center h-screen overflow-scroll overflow-x-hidden ${raleway.className}`}>
       <nav className="sticky top-0 w-full bg-landing-bg z-50 shadow-[0_1px_5px_var(--color-ring)] dark:shadow-[0_0.5px_5px_var(--color-ring)]">
        <div className="flex items-center h-20 ">
            <h1 className="text-3xl font-normal absolute left-10">Synomilo</h1>
            <div className="flex absolute right-10 gap-3">
              <Button className="cursor-pointer">Sign Up</Button>
              <Button className="cursor-pointer" variant="outline">Log in</Button>
              <ModeToggle />
            </div>
        </div>
    </nav>



      <div className="flex flex-col w-screen bg-card justify-center items-center gap-50 p-20">
        <h1 className="text-8xl font-normal">Synomilo</h1>
        <h2 className="text-3xl font-normal">Conversation based English learning platform</h2>
        <h2 className="flex items-center gap-2 text-2xl font-light">Head to the
           <Link className="underline underline-offset-5 hover:underline-offset-10 transition-all duration-300" href="/home">Home</Link>
           page and start for free</h2>

      </div>

      <div className="flex w-screen h-auto items-center justify-evenly flex-row bg-background p-20">

      <div className="sticky top-1/3 self-start ">
        <motion.h1 className="text-5xl font-semibold"
         initial={{ opacity: 0 }}
         whileInView={{ opacity: 1, y: -50 }}
         viewport={{ margin: "-100px" }}
         transition={transition1}
        >Learn at your own pace</motion.h1>

        <motion.h2 className="text-2xl font-medium mt-10 w-150"
         initial={{ opacity: 0 }}
         whileInView={{ opacity: 1, y: -50 }}
         viewport={{ margin: "-100px" }}
         transition={transition2}
        >Once a week or everyday. Pick up where you left off and resume your learning.</motion.h2>
        </div>

        <div className="flex items-center flex-col m-2 gap-40">
          <motion.span className="flex justify-center items-center h-150 w-150 rounded-xl bg-red-500" {...transitionImage}>Image showing Recents tab</motion.span>
          <motion.span className="flex justify-center items-center h-150 w-150 rounded-xl bg-blue-500" {...transitionImage}>Image showing progress bar</motion.span>
          <motion.span className="flex justify-center items-center h-150 w-150 rounded-xl bg-green-500" {...transitionImage}>Image showing Objectives?</motion.span>
        </div>
      </div>


      <div className="flex w-screen h-auto items-center justify-evenly flex-row-reverse bg-card pt-20">
      <div className="sticky top-1/3 self-start ">
        <motion.h1 className="text-5xl font-semibold"
         initial={{ opacity: 0 }}
         whileInView={{ opacity: 1, y: -50 }}
         viewport={{ margin: "-100px" }}
         transition={transition1}
        >Learn at your own pace</motion.h1>

        <motion.h2 className="text-2xl font-medium mt-10 w-150"
         initial={{ opacity: 0 }}
         whileInView={{ opacity: 1, y: -50 }}
         viewport={{ margin: "-100px" }}
         transition={transition2}
        >Once a week or everyday. Pick up where you left off and resume your learning.</motion.h2>
        </div>

        <div className="flex items-center flex-col m-2 gap-40">
          <motion.span className="flex justify-center items-center h-150 w-150 rounded-xl bg-red-500" {...transitionImage}>Image showing Recents tab</motion.span>
          <motion.span className="flex justify-center items-center h-150 w-150 rounded-xl bg-blue-500" {...transitionImage}>Image showing progress bar</motion.span>
          <motion.span className="flex justify-center items-center h-150 w-150 rounded-xl bg-green-500" {...transitionImage}>Image showing Objectives?</motion.span>
        </div>
      </div>


    </div>
  );
}
