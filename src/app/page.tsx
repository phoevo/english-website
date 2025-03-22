"use client";
import ModeToggle from "@/components/ui/ModeToggle";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Raleway } from "next/font/google";
// import { Montserrat } from "next/font/google";
import { motion } from "motion/react"
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger,} from "@/components/ui/accordion"



const raleway = Raleway({ subsets: ['latin'] });

const transition1 = {
  duration: 1,
  delay: 0,
  ease: [0, 0.71, 0.2, 1.01],
}

const transition2 = {
  duration: 1,
  delay: 0.2,
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



      <div className="flex flex-col w-screen border-b bg-card justify-center items-center gap-30 p-20">
        <div className="flex flex-col gap-5 items-center">
          <h1 className="text-8xl font-normal">Synomilo</h1>
          <div className="flex flex-row text-2xl font-normal gap-2" >
            <p>/ˌsɪn.oʊˈmiː.loʊ/</p> <span>•</span> <span>sin-oh-MEE-low</span>
          </div>
          <p className="text1xl text-zinc-500">Greek for: &quot;I conversate&quot;</p>

        </div>
        <h2 className="text-3xl font-normal">Conversation based English learning platform</h2>
        <div className="flex flex-col w-180 h-100 justify-start items-center border-b p-10 ">
          <h2 className="text-4xl font-bold p-5">Our Mission:</h2>
          <p className="text-2xl font-light">Our mission is to allow English learners
             have meaningful conversations faster by employing methods inspired by Assimil.
            These methods help keep the student engaged through dialogues that reflect real-life scenarios,
            increasing their comprehension and ability to learn (and most importantly) use English.


          </p>
        </div>
        <h2 className="flex items-center gap-2 text-2xl font-light">Head to the
           <Link className="underline underline-offset-5 hover:underline-offset-10 transition-all duration-300" href="/home">Home</Link>
           page and start for free</h2>
      </div>

      <div className="flex w-screen h-auto items-center justify-evenly flex-row bg-background p-40 border-b">
      <div className="sticky top-1/3 self-start border-b ">
        <motion.h1 className="text-5xl font-semibold"
         initial={{ opacity: 0 }}
         whileInView={{ opacity: 1, y: -50 }}
         viewport={{margin: "0px" }}
         transition={transition1}
        >Conversation comes first</motion.h1>

        <motion.h2 className="flex flex-col gap-10 text-[20px] text-zinc-500 font-medium mt-10 w-150"
         initial={{ opacity: 0 }}
         whileInView={{ opacity: 1, y: -50 }}
         viewport={{margin: "0px" }}
         transition={transition2}
        > <p>An atypical approach to learning English. Synomilo helps you with your conversation skill first.</p>
        <p>You dont need to know the meaning of <i>elbow</i> or <i>highway </i> when you are asking how much
        something costs or where the train station is.</p>
        </motion.h2>
        </div>

        <div className="flex items-center flex-col m-2 gap-40">
          <motion.span className="flex justify-center items-center h-150 w-150 rounded-xl bg-red-500" {...transitionImage}>Image showing conversations page</motion.span>
          <motion.span className="flex justify-center items-center h-150 w-150 rounded-xl bg-blue-500" {...transitionImage}>Image showing highlightable words</motion.span>
          <motion.span className="flex justify-center items-center h-150 w-150 rounded-xl bg-green-500" {...transitionImage}>Image showing translations and meaning of said words</motion.span>
        </div>
      </div>




      <div className="flex w-screen h-auto items-center justify-evenly flex-row-reverse bg-card p-40 border-b">
      <div className="sticky top-1/3 self-start border-b ">
        <motion.h1 className="text-5xl font-semibold"
         initial={{ opacity: 0 }}
         whileInView={{ opacity: 1, y: -50 }}
         viewport={{once: true, margin: "-100px" }}
         transition={transition1}
        >Tools at your disposal</motion.h1>

        <motion.h2 className="flex flex-col gap-10 text-[20px] text-zinc-500 font-medium mt-10 w-150"
         initial={{ opacity: 0 }}
         whileInView={{ opacity: 1, y: -50 }}
         viewport={{ once: true, margin: "-100px" }}
         transition={transition2}
        > <p>Synomilo provides you with tools to assist your English learning</p>
          <ul className="flex flex-col gap-5">
          <li>AI bot for quick searches</li>
          <li>Your own dictionary where you can save words</li>
          <li>other stuff</li>
        </ul>

        </motion.h2>
        </div>

        <div className="flex items-center flex-col m-2 gap-40">
          <motion.span className="flex justify-center items-center h-150 w-150 rounded-xl bg-red-500" {...transitionImage}>Image showing conversations page</motion.span>
          <motion.span className="flex justify-center items-center h-150 w-150 rounded-xl bg-blue-500" {...transitionImage}>Image showing highlightable words</motion.span>
          <motion.span className="flex justify-center items-center h-150 w-150 rounded-xl bg-green-500" {...transitionImage}>Image showing translations and meaning of said words</motion.span>
        </div>
      </div>



      <div className="flex w-screen h-auto items-center justify-center flex-col bg-background p-40 border-b">
      <div className="">
        <motion.h1 className="text-5xl font-semibold"
         initial={{ opacity: 0 }}
         whileInView={{ opacity: 1, y: -50 }}
         viewport={{ margin: "0px" }}
         transition={transition1}
        >Learn at your own pace</motion.h1>

        <motion.h2 className="text-2xl text-zinc-500 font-medium mt-10 w-150"
         initial={{ opacity: 0 }}
         whileInView={{ opacity: 1, y: -50 }}
         viewport={{ margin: "-100px" }}
         transition={transition2}
        >Once a week? Everyday? Whenever you want. Pick up where you left off and resume your learning.</motion.h2>
        </div>

        <div className="flex items-center flex-row m-2 gap-10 pb-10 border-b">
          <motion.span className="flex justify-center items-center h-100 w-100 rounded-xl bg-red-500" {...transitionImage}>Image showing Recents tab</motion.span>
          <motion.span className="flex justify-center items-center h-100 w-100 rounded-xl bg-blue-500" {...transitionImage}>Image showing progress bar</motion.span>
          <motion.span className="flex justify-center items-center h-100 w-100 rounded-xl bg-green-500" {...transitionImage}>Image showing Objectives?</motion.span>
        </div>
      </div>

    <div className="flex w-screen h-auto items-center justify-center flex-col bg-card pt-20">
      <h1 className="text-4xl font-semibold">Some quick questions you may have</h1>
      <Accordion type="single" collapsible className="flex flex-col justify-center w-200 p-10">
      <AccordionItem value="item-1">
        <AccordionTrigger className="text-2xl">Is it free?</AccordionTrigger>
        <AccordionContent className="text-[18px]">
          There are free and paid options.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger className="text-2xl">What do I get with the paid option?</AccordionTrigger>
        <AccordionContent className="text-[18px] ">You get access to:
          <ul className="list-disc pl-5">
          <li>An assortment of tools like the AI helper and the <span className="bg-pink-500 pl-1 pr-1 rounded-[3px]">Hover</span> feature.</li>
          <li>All conversations to go through at your own pace.</li>
          <li>All future conversations to be added.</li>
          </ul>
          <p className="flex items-center gap-2 text-[18px] pt-5">Find out more on the
           <Link className="underline underline-offset-5 hover:underline-offset-10 transition-all duration-300" href="/home">Subscriptions</Link>page.</p>

          </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger className="text-2xl">Do I need an account?</AccordionTrigger>
        <AccordionContent className="text-[18px]">
        <p>Quick answer: No.</p>
        <p className="pt-5">But if you want to keep track of your progress, you will need an account. It is free.</p>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
    </div>

    <footer className="sticky bot-0 w-full bg-landing-bg z-50 shadow-[0_1px_5px_var(--color-ring)] dark:shadow-[0_0.5px_5px_var(--color-ring)]">
        <div className="flex justify-around items-center h-40 ">
          <div className="flex justify-center w-60">
            <ul className="flex flex-col gap-2">
              <Link href="/">About</Link>
              <Link href="/">Contact</Link>
              <Link href="/">Pricing</Link>
            </ul>
          </div>
          <div className="flex justify-center w-60">
            <h1 className="text-2xl font-normal">Synomilo</h1>
          </div>

            <div className="flex justify-center w-60">
            <ul className="flex justify-center text-1xl flex-col gap-2">
            <Link href="/">Terms of Service</Link>
            <Link href="/">Privacy Policy</Link>
            <Link href="/">Refund and Cancellation Policy</Link>
            </ul>
            </div>
        </div>
    </footer>


    </div>
  );
}
