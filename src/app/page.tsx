"use client";
import ModeToggle from "@/components/ui/ModeToggle";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Raleway } from "next/font/google";
import { Geist } from "next/font/google";
import { DM_Sans } from "next/font/google";

// import { Montserrat } from "next/font/google";
import { motion } from "motion/react";
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger,} from "@/components/ui/accordion"
import { ScrollArea } from "@/components/ui/scroll-area";
import { TestConversation } from "./(dashboard)/TestConversation";
import TestDictionary from "./(dashboard)/TestDictionary";
import { ArrowDown, BookOpenCheck, FileStack, GalleryHorizontalEnd, ListCheck, Play } from "lucide-react";

console.log("Motion import:", motion);

const raleway = Raleway({ subsets: ['latin'] });
const geist = Geist({ subsets: ['latin'] });
const dmSans = DM_Sans({ subsets: ['latin'] });

const transition1 = {
  duration: 1,
  delay: 0,
  ease: [0, 0.71, 0.2, 1.01],
}

const transition2 = {
  duration: 0.2,
  delay: 0.1,
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
    <ScrollArea className={`flex bg-background flex-col items-center h-screen overflow-x-hidden ${dmSans.className}`}>
       <nav className="sticky top-0 w-full z-50">
        {/*shadow-[0_1px_5px_var(--color-ring)] dark:shadow-[0_0.5px_5px_var(--color-ring)] */}
        <div className="flex items-center h-18">
            <h1 className="text-3xl font-normal absolute left-10">Synomilo</h1>
            <div className={`flex absolute right-10 gap-3 ${geist.className}`}>
              <Link href={"/register"}> <Button className="cursor-pointer">Sign Up</Button> </Link>
              <Link href={"/login"}> <Button className="cursor-pointer" variant="outline">Log in</Button> </Link>
              <ModeToggle />
            </div>
        </div>
    </nav>


      <div className="flex flex-col w-screen border-b bg-background bg-dots justify-center items-center gap-20 p-10">
        <div className="flex flex-col gap-1 items-center">
          <h1 className="text-8xl p-5 font-normal bg-background ">Synomilo</h1>
          <div className="flex flex-row text-xl font-normal gap-2 bg-background" >
            <p>/ˌsɪn.oʊˈmiː.loʊ/</p> <span>•</span> <span>sin-oh-MEE-low</span>
          </div>
          <p className="text-zinc-500">Greek for: &quot;I conversate&quot;</p>
        </div>

        <div className="flex flex-col items-center gap-3">
        <h2 className="text-5xl font-normal bg-background mt-10"> A conversation-based English learning platform</h2>
        <h2 className="text-4xl font-semibold bg-background mt-20"/>


        <div className=" w-screen gap-10 flex flex-col justify-center items-center border-b bg-background">
       <div className="sticky top-5 z-30 p-5 bg-accent border-1 mb-12 rounded-full shadow-lg">
        <motion.h1
          className="text-3xl font-semibold"
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true}}
          transition={transition1}
        >
          <div className="flex flex-row items-center gap-1 ">

          Here&apos;s what&apos;s offered <span><ArrowDown className= "text-pink-500" size={30}/></span>
          </div>
        </motion.h1>
      </div>

      <motion.div
      className="z-20 sticky top-42 self-start m-4 text-3xl font-semibold"
      initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-200px"}}
          transition={transition1}>
        <span className="px-1 text-pink-500 text">
          1.
        </span>
        Conversations
        </motion.div>


        {/* Animated Conversation Component */}
        <motion.div
          className={`w-auto h-auto mt-10 ${geist.className}`}
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 200 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={transition2}
        >
          <TestConversation />
        </motion.div>

        {/* Animated Dictionary Component */}

        <div className="z-20 sticky top-52 self-start m-4 text-3xl font-semibold">
        <span className="px-1 text-pink-500 text">
          2.
        </span>
        Dictionary
        </div>

        <motion.div
          className={`flex flex-row gap-10 mt-10 items-center justify-center w-full h-auto ${geist.className}`}
          initial={{ opacity: 0, y: 200 }}
          whileInView={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 80 }}
          viewport={{ once: true, margin: "0px" }}
          transition={transitionImage}
        >
          <div className="flex items-center justify-center">
            <TestDictionary />
          </div>
        </motion.div>


        <div className="z-20 sticky top-62 self-start m-4 text-3xl font-semibold">
        <span className="px-1 text-pink-500">
          3.
        </span>
        <span>An assortment</span>
        <p className="pl-8">of tools</p>
        </div>



        <div className="flex flex-row justify-center items-center w-2/3 h-100 p-2 gap-5 rounded-lg">

        <div className="flex flex-col items-center justify-center border-1 rounded-md p-5 gap-5 w-1/3 shadow-md">
          <span className="flex justify-center items-center h-20">
            <Play size={50} className="fill-current" />
          </span>
          <div className="flex items-center justify-center">Audio for conversations</div>
        </div>

        <div className="flex flex-col items-center justify-center border-1 rounded-md p-5 gap-5 w-1/3 shadow-md">
          <span className="flex justify-center items-center h-20">
            <GalleryHorizontalEnd size={50} className="fill-current" />
          </span>
          <div className="flex items-center justify-center">Custom flashcard builder</div>
        </div>

         <div className="flex flex-col items-center justify-center border-1 rounded-md p-5 gap-5 w-1/3 shadow-md">
          <span className="flex justify-center items-center h-20">
            <BookOpenCheck size={50} className="" />
          </span>
          <div className="flex items-center justify-center">Beginner - Advanced Levels</div>
        </div>

        <div className="flex flex-col items-center justify-center border-1 rounded-md p-5 gap-5 w-1/3 shadow-md">
          <span className="flex justify-center items-center h-20">
            <ListCheck size={50} className="" />
          </span>
          <div className="flex items-center justify-center">Conversation tracking</div>
        </div>

      </div>




        <motion.div
        className="flex flex-col justify-start items-center bg-accent w-1/3 p-10 m-10 border-1 shadow-md rounded-lg z-30"
        initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}

          >
          <h2 className="text-3xl font-semibold bg-accent mt-5">Like what you see?</h2>
        <div
        className={`flex flex-row gap-4 bg-accent h-auto p-5 ${geist.className}`}>
        <Link href="/register">
          <Button className="cursor-pointer px-6 py-4">Get Started</Button>
        </Link>
        <Link href="/home">
          <Button variant="outline" className=" cursor-pointer px-6 py-4">Try Without Account</Button>
        </Link>
        <Link href="/subscribe">
          <Button variant="ghost" className="shadow-[0_0_5px_1px_rgba] shadow-pink-500 cursor-pointer px-6 py-4">Pricing</Button>
        </Link>
      </div>
      </motion.div>

        </div>







        </div>

        <div className="flex flex-col max-w-4xl h-auto bg-accent border-1 rounded-4xl justify-start items-center p-20 space-y-6 shadow-md">
          <h2 className="text-4xl font-bold bg-accent">Our Mission</h2>
          <p className={`text-lg text-zinc-500 leading-relaxed bg-accent ${dmSans.className}`}>Our mission is to allow English learners
             have meaningful conversations faster by employing methods inspired by Assimil.
            These methods help keep the student engaged through dialogues that reflect real-life scenarios,
            increasing their comprehension and ability to learn, and most importantly <i>use</i> English.


          </p>
        </div>
        <h2 className="flex items-center text-2xl font-semibold">Head to the
           <Link className="p-2 underline underline-offset-5 hover:underline-offset-10 transition-all duration-300" href="/home">Home</Link>
           page and start for free or <Link className="p-2 underline underline-offset-5 hover:underline-offset-10 transition-all duration-300" href={"/register"}> create an account</Link>
           </h2>
      </div>


      <div className="flex w-screen h-auto items-center justify-evenly flex-row bg-background p-40 border-b">
      <div className="sticky top-1/3 self-start border-b ">
        <motion.h1 className="text-5xl font-semibold"
         initial={{ opacity: 0 }}
         whileInView={{ opacity: 1, y: -50 }}
         viewport={{margin: "0px" }}
         transition={transition1}
        >Conversation comes first</motion.h1>

        <motion.h2 className="flex flex-col gap-10 text-lg text-zinc-500 leading-relaxed mt-10 w-150"
         initial={{ opacity: 0 }}
         whileInView={{ opacity: 1, y: -50 }}
         viewport={{margin: "0px" }}
         transition={transition2}
        > <p>An atypical approach to learning English. Synomilo helps you with your conversation skill first.</p>
        <p>You dont need to know the meaning of <i>elbow</i> or <i>curtain </i> when you are asking how much
        something costs or where the train station is.</p>
        </motion.h2>
        </div>

        <div className="flex items-center flex-col m-2 gap-40">
          <motion.span className="flex justify-center items-center h-150 w-150 rounded-xl bg-red-500" {...transitionImage}>Image showing conversations page</motion.span>
          <motion.span className="flex justify-center items-center h-150 w-150 rounded-xl bg-blue-500" {...transitionImage}>Image showing highlightable words</motion.span>
          <motion.span className="flex justify-center items-center h-150 w-150 rounded-xl bg-green-500" {...transitionImage}>Image showing translations and meaning of said words</motion.span>
        </div>
      </div>




      <div className="flex w-screen h-auto items-center justify-evenly flex-row-reverse bg-accent p-40 border-b">
      <div className="sticky top-1/3 self-start border-b ">
        <motion.h1 className="text-5xl font-semibold"
         initial={{ opacity: 0 }}
         whileInView={{ opacity: 1, y: -50 }}
         viewport={{once: true, margin: "-100px" }}
         transition={transition1}
        >Tools at your disposal</motion.h1>

        <motion.h2 className="flex flex-col gap-10 text-lg text-zinc-500 leading-relaxed mt-10 w-150"
         initial={{ opacity: 0 }}
         whileInView={{ opacity: 1, y: -50 }}
         viewport={{ once: true, margin: "-100px" }}
         transition={transition2}
        > <p>Synomilo provides you with tools to assist your English learning</p>
          <ol className="flex flex-col gap-2">
          <li>Audio for reading along conversations</li>
          <li>Your own dictionary where you can save words</li>
          <li>Custom flashcard decks</li>
        </ol>

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
        <motion.h1 className="text-5xl font-semibold flex justify-center"
         initial={{ opacity: 0 }}
         whileInView={{ opacity: 1, y: -50 }}
         viewport={{ margin: "0px" }}
         transition={transition1}
        >Learn at your own pace</motion.h1>

        <motion.h2 className="text-lg text-zinc-500 leading-relaxed mt-10 w-auto"
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

    <div className="flex w-screen h-auto items-center justify-center flex-col bg-accent pt-20">
      <h1 className="text-5xl font-semibold">Some quick questions you may have</h1>
      <Accordion type="single" collapsible className="flex flex-col justify-center w-200 p-10">
      <AccordionItem value="item-1">
        <AccordionTrigger className="text-xl cursor-pointer">Is it free?</AccordionTrigger>
        <AccordionContent className="text-[18px]">
          There are free and paid options.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-2">
        <AccordionTrigger className="text-xl cursor-pointer">What do I get with the paid option?</AccordionTrigger>
        <AccordionContent className="text-[18px] ">You get access to:
          <ul className="list-disc pl-5">
          <li>Conversation Audio</li>
          <li>All existing and future conversations to go through at your own pace.</li>
          <li>Color customization</li>
          </ul>
          <p className="flex items-center gap-2 text-[18px] pt-5">Find out more on the
           <Link className="underline underline-offset-5 hover:underline-offset-10 transition-all duration-300" href="/subscribe">Subscriptions</Link>page.</p>
          </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-3">
        <AccordionTrigger className="text-xl cursor-pointer">Do I need an account?</AccordionTrigger>
        <AccordionContent className="text-[18px]">
        <p>Quick answer: No.</p>
        <p className="pt-5">But if you want to keep track of your progress, you will need an account. It&apos;s free.</p>
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


    </ScrollArea>

  );
}
