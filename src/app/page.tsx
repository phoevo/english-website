"use client";
import ModeToggle from "@/components/ui/ModeToggle";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Geist } from "next/font/google";
import { DM_Sans } from "next/font/google";
import { motion, AnimatePresence } from "motion/react";
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger,} from "@/components/ui/accordion"
import { ScrollArea } from "@/components/ui/scroll-area";
import { TestConversation } from "./(dashboard)/TestConversation";
import TestDictionary from "./(dashboard)/TestDictionary";
import { AlignLeft, ArrowDown, ArrowLeft, ArrowRight, ArrowUp, BookOpenCheck, Check, ChevronDown, EyeOff, GalleryHorizontalEnd, Info, IterationCcw, MousePointer2, Pause, Play, RectangleHorizontal, Sword, Swords } from "lucide-react";
import TestWordBoard from "./(dashboard)/TestWordBoard";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { getUserCount, getConversationCount } from "@/data/getData";
import { useEffect, useState } from "react";
import {Card} from "@/components/ui/card"
import TestConversationCover from "./(dashboard)/TestConversationCover";
import TestFriends from "./(dashboard)/TestFriends";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import CountUp from 'react-countup';
import TestTeacherPage from "./(dashboard)/TestTeacherPage";






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
  const [userCount, setUserCount] = useState(0);
  const [convoCount, setConvoCount] = useState(0);
  const [showAbout, setShowAbout] = useState(true);

  useEffect(() => {
  getUserCount().then(setUserCount);
}, []);

useEffect(() => {
  getConversationCount().then(setConvoCount);
}, []);

  const questions = [
          {
            question: "Is it free?",
            answer: "There are free and paid options"
          },
          {
            question: "What do I get with the paid option?",
            answer: (
              <>
                You get access to:
                <ul className="list-disc pl-5">
                  <li>Conversation Audio</li>
                  <li>All existing and future conversations to go through at your own pace.</li>
                  <li>Color customization</li>
                </ul>
                <p className="flex items-center gap-2 text-[18px] pt-5">
                  Find out more on the{" "}
                  <Link
                    className="underline underline-offset-5 hover:underline-offset-10 transition-all duration-300"
                    href="/pricing"
                  >
                    Pricing
                  </Link>{" "}
                  page.
                </p>
              </>
            )
          },
          {
            question: "Do I need an account?",
            answer: (
              <>
                <p>Quick answer: No.</p>
                <p className="pt-5">
                  But if you want to keep track of your progress, you will need an account. It&apos;s free.
                </p>
              </>
            )
          },
          {
            question: "Do I need to download anything?",
            answer: <>Nope, it runs entirely in your browser.</>
          },



        ]


  return (
    <ScrollArea className={`flex bg-landing-bg flex-col items-center h-screen overflow-x-hidden ${dmSans.className}`}>
       <nav className="sticky top-0 w-screen z-50">
        {/*shadow-[0_1px_5px_var(--color-ring)] dark:shadow-[0_0.5px_5px_var(--color-ring)] */}
        <div className="flex items-center h-12 lg:h-18">
            <h1 className="hidden lg:block text-3xl lg:text-3xl font-normal absolute left-5 lg:left-10">Synomilo</h1>
            <div className={`flex absolute right-5 lg:right-10 gap-3 ${geist.className}`}>
              <Link href={"/register"}> <Button className="hidden lg:block cursor-pointer">Sign up</Button> </Link>
              <Link href={"/login"}> <Button className="hidden lg:block cursor-pointer" variant="secondary">Log in</Button> </Link>
              <Link href="/pricing">
              <Button variant="outline" className="hidden lg:block shadow-[0_0_5px_1px_rgba] shadow-pink-500 cursor-pointer">Pricing</Button>
              </Link>
              <ModeToggle />
            </div>
        </div>
    </nav>


      <div className="flex flex-col w-screen border-b bg-landing-bg justify-center items-center gap-10">
        <div className="flex flex-col gap-2 items-center">

          <div className="flex flex-col items-center lg:flex-row lg:items-end">
            <h1 className="lg:pl-25 text-6xl lg:text-8xl bg-landing-bg font-normal">Synomilo</h1>
            <span className="text-muted-foreground w-auto text-xs lg:text-sm bg-muted p-1 lg:p-2 rounded-full">Early Access</span>

          </div>

          {/* <div className="flex flex-row bg-landing-bg text-1xl font-normal mt-3 gap-2" >
            <p>/ˌsɪn.oʊˈmiː.loʊ/</p> <span>•</span> <span>sin-oh-MEE-low</span>
          </div> */}
          <p className="text-zinc-500 bg-landing-bg">Greek for: &quot;I converse&quot;</p>
        </div>

        <div className="flex flex-col items-center gap-5">
        <h2 className=" text-3xl p-5 text-center lg:text-5xl lg:p-0 font-normal bg-landing-bg mt-10">Focused on Real Conversation</h2>
        <p className="lg:text-xl text-center m-2 bg-muted rounded-full py-2 px-4 font-normal">This isn't study. It's rehearsal.</p>


      <div className="h-auto w-full lg:w-1/2 flex items-center">
        <Card className={`w-full h-auto flex flex-row justify-evenly shadow-none border-none items-center p-5 ${dmSans.className}`}>
          <div className="flex flex-col items-center space-y-2 w-1/2">
            <p className="text-4xl lg:text-5xl font-bold text-center">
              <CountUp end={686} duration={1.5} separator="," />
            </p>
            <p className="text-md font-semibold text-muted-foreground text-center">Users</p>
          </div>

          <div className="flex flex-col items-center space-y-2 w-1/2">
            <p className="text-4xl lg:text-5xl font-bold text-center">
              <CountUp end={31} duration={1.5} separator="," />
            </p>
            <p className="text-md font-semibold text-muted-foreground text-center">Conversations</p>
          </div>
        </Card>
      </div>


        <div className="flex flex-row gap-5">

          <Button variant="ghost"
           onClick={() => setShowAbout(!showAbout)}
            className="flex items-center gap-2 text-muted-foreground cursor-pointer">
            {showAbout ? (
              <>
                <EyeOff className="w-4 h-4" />
                Hide
              </>
            ) : (
              <>
                <Info className="w-4 h-4" />
                About
              </>
            )}
          </Button>


        </div>

        <motion.div

          transition={{ layout: { duration: 0.3, ease: "easeInOut" } }}
          className="flex flex-col max-w-4xl h-auto bg-card rounded-4xl justify-start items-center p-5 lg:p-5 space-y-4 "
        >

     <AnimatePresence>
        {showAbout && (
          <motion.div
            layout
            initial={{ opacity: 0, height: "auto" }}
            animate={{ opacity: 1, height: "auto"}}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="flex flex-col max-w-4xl bg-card rounded-4xl justify-start items-center space-y-4 overflow-hidden"
          >
            <p className={`text-md lg:text-xl leading-relaxed bg-card text-center ${dmSans.className}`}>
              Synomilo helps English learners move beyond studying by giving them a place to actively practice.
              With realistic conversations and tools built for real-world speaking, students can practice solo or with a tutor.
              Tutors can already join sessions and guide students using Synomilo’s content, with dedicated tools for assigning, tracking, and giving feedback coming soon.
            </p>

          </motion.div>
        )}
      </AnimatePresence>
      </motion.div>




        <div className="w-screen gap-10 flex flex-col justify-center items-center border-b bg-landing-bg">

       <motion.div
       className="sticky top-5 mb-20 z-30 p-3 lg:p-5 bg-card border-1 rounded-full shadow-lg"
       initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true}}
          transition={transition1}>
        <h1
          className="text-xl lg:text-2xl font-semibold"

        >
          <div className="flex flex-row gap-2 items-center">

          Here&apos;s what&apos;s offered <span><ArrowDown className= "text-pink-500" size={30}/></span>
          </div>
        </h1>
      </motion.div>




      <motion.div
      className="hidden lg:block z-20 sticky top-30 lg:top-42 self-start m-2 lg:m-4 lg:mb-33 text-md lg:text-3xl font-semibold"
      initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-200px"}}
          transition={transition1}>
        <span className="px-1 text-pink-500">
          1.
        </span>
        Conversations
        </motion.div>


        <motion.div
          className={`w-screen h-auto ${geist.className}`}
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 200 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={transition2}
        >
          <div className="flex flex-col m-2 lg:flex-row justify-end lg:mr-12 lg:gap-10">

          <TestConversation />

          <p className="lg:self-center lg:w-40 text-2xl font-semibold p-10 lg:p-0">
            <ArrowUp size={40} className="text-pink-500 lg:hidden"/>
            <ArrowLeft size={40} className="text-pink-500 hidden lg:block"/>
            Highlight words types for easy reading</p>
          </div>
        </motion.div>

        <div className="hidden lg:block z-20 sticky top-30 left-43 text lg:left-0 lg:top-52 self-start m-4 mb-23 lg:text-3xl font-semibold">
        <span className="px-1 text-pink-500 text">
          2.
        </span>
        Dictionary
        </div>

        <motion.div
          className={`flex flex-row gap-10 items-center justify-center w-full h-auto ${geist.className}`}
          initial={{ opacity: 0, y: 200 }}
          whileInView={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 80 }}
          viewport={{ once: true, margin: "0px" }}
          transition={transitionImage}
        >
          <div className="flex flex-col lg:flex-row items-center justify-center gap-10">
            <TestDictionary />
            <TestWordBoard/>
          </div>
        </motion.div>


        <div className="hidden lg:block z-20 sticky top-30 left-full lg:left-0 text-1xl lg:top-62 lg:mb-14 self-start m-4 lg:text-3xl font-semibold">
        <span className="px-1 text-pink-500">
          3.
        </span>
        Tools & Features
        </div>

       <div className="grid grid-cols-2 m-2 sm:grid-cols-2 lg:grid-cols-3 gap-5 p-2 rounded-lg">

    <motion.div
    className="flex flex-col items-center justify-center border rounded-md p-5 gap-5 shadow-md"
    initial={{ opacity: 0, y: 100 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px", }}
    transition={{ delay: 0.1, duration: 0.2 }}
    >
    <span className="flex justify-center items-center h-20">
      <Play size={50} className="fill-current" />
      <Pause size={50} className="fill-current" />
    </span>
    <div className="flex items-center justify-center text-center">Audio for conversations</div>
  </motion.div>

 <motion.div
 className="flex flex-col items-center justify-center border rounded-md p-5 gap-5 shadow-md"
 initial={{ opacity: 0, y: 100 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px", }}
    transition={{ delay: 0.1, duration: 0.2 }}
    >
  <span className="relative flex justify-center items-center h-20 w-20">
    <MousePointer2 size={35} strokeWidth={1} fill="bg-foreground" className="absolute bottom-0 right-0" />
    <RectangleHorizontal size={80} strokeWidth={1} className="text-pink-500" />
  </span>
  <div className="flex items-center justify-center text-center">Hover</div>
</motion.div>


   <motion.div
   className="flex flex-col items-center justify-center border rounded-md p-5 gap-5 shadow-md"
   initial={{ opacity: 0, y: 100 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px", }}
    transition={{ delay: 0.1, duration: 0.2 }}>
    <span className="flex justify-center items-center h-20">
      <IterationCcw size={50} className="" />
    </span>
    <div className="flex items-center justify-center text-center">Recents</div>
  </motion.div>

  <motion.div
  className="flex flex-col items-center justify-center border rounded-md p-5 gap-5 shadow-md"
  initial={{ opacity: 0, y: 100 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px", }}
    transition={{ delay: 0.2, duration: 0.2 }}
    >
    <span className="flex justify-center items-center h-20">
      <GalleryHorizontalEnd size={50} className="fill-current" />
    </span>
    <div className="flex items-center justify-center text-center">Custom flashcard builder</div>
  </motion.div>

  <motion.div
  className="flex flex-col items-center justify-center border rounded-md p-5 gap-5 shadow-md"
  initial={{ opacity: 0, y: 100 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px", }}
    transition={{ delay: 0.2, duration: 0.2 }}>
    <span className="flex justify-center items-center h-20">
      <BookOpenCheck strokeWidth={2} size={50} />
    </span>
    <div className="flex items-center justify-center text-center">
      Beginner <ArrowRight className="text-pink-500 mx-1" size={15} /> Advanced Levels
    </div>
  </motion.div>

   <motion.div
   className="flex flex-col items-center justify-center border rounded-md p-5 gap-5 shadow-md"
   initial={{ opacity: 0, y: 100 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px", }}
    transition={{ delay: 0.2, duration: 0.2 }}
    >
  <span className="relative flex justify-center items-center h-20 w-20">
    <Check size={35} strokeWidth={2} className="absolute bottom-0 right-2 text-green-500" />
    <AlignLeft size={60} strokeWidth={2} className="" />
  </span>
  <div className="flex items-center justify-center text-center">Progress tracking</div>
</motion.div>

 <motion.div
   className="flex flex-col items-center justify-center border rounded-md p-5 gap-5 shadow-md"
   initial={{ opacity: 0, y: 100 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px", }}
    transition={{ delay: 0.2, duration: 0.2 }}
    >
  <span className="relative flex justify-center items-center h-20 w-20">
    <Sword size={50} className="rotate-45"/>
  </span>
  <div className="flex items-center justify-center text-center">Tasks</div>
</motion.div>

<motion.div
   className="flex flex-col items-center justify-center border rounded-md p-5 gap-5 shadow-md"
   initial={{ opacity: 0, y: 100 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px", }}
    transition={{ delay: 0.2, duration: 0.2 }}
    >
  <div className="relative flex justify-center items-center h-20 w-20">
    <Swords className="fill-current" size={50}/>
  </div>
  <div className="flex items-center justify-center text-center">Challenges</div>
</motion.div>

<motion.div
  className="flex flex-col items-center justify-center border rounded-md p-5 gap-5 shadow-md"
  initial={{ opacity: 0, y: 100 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-100px" }}
  transition={{ delay: 0.2, duration: 0.2 }}
>
  <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-3 gap-1 p-4">
   <div className="flex justify-center"><Badge className="bg-foreground text-background">1</Badge></div>
  <div className="flex justify-center"><Badge className="bg-green-500 text-white">3</Badge></div>
  <div className="flex justify-center"><Badge className="bg-gradient-to-r from-emerald-400 to-blue-600 text-white bg-clip-padding">10</Badge></div>
  <div className="flex justify-center"><Badge className="bg-gradient-to-r from-blue-600 via-pink-600 to-purple-600  text-white bg-clip-padding rounded-full animate-gradient">30</Badge></div>
  <div className="flex justify-center"><Badge className="bg-gradient-to-r from-red-500 via-purple-500 to-cyan-300 text-white bg-clip-padding rounded-full animate-gradient ring-1 ring-foreground">50</Badge></div>
  <div className="flex justify-center"><Badge className="bg-gradient-to-r from-red-500 via-orange-500 to-yellow-300 text-black bg-clip-padding rounded-full animate-gradient uneven-glow border-none">100</Badge></div>
  </div>

  <div className="flex items-center justify-center text-center">Streaks</div>
</motion.div>
</div>



 <div className="hidden lg:block z-20 sticky top-30 left-full lg:left-0 text-1xl lg:top-72 self-start m-4 lg:text-3xl font-semibold">
    <span className="px-1 text-pink-500">
      4.
    </span>
      Tutors
  </div>


  <motion.div className="flex flex-col w-full lg:w-1/2 space-y-6 lg:border-1 p-10 rounded-md shadow-md"
  initial={{ opacity: 0, y: 100 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-100px" }}
  transition={{ delay: 0.2, duration: 0.2 }}
  >
    <div className="flex flex-row text-2xl lg:text-4xl font-normal justify-start">Coming Soon</div>
    <p className="text-md lg:text-lg text-muted-foreground">
      As we enter early access, we’re creating dedicated tutor tools to make helping students
      faster, easier, and more effective. Until then, use Synomilo solo or screen-share with your tutor.
    </p>

    <div className="flex flex-col items-center py-5 font-normal">
      <p className="text-2xl lg:text-3xl">Tutors, these are for you</p>
      <p className="text-muted-foreground">Here's what's coming</p>
      </div>

    <div className="flex flex-col items-center space-y-6">

      <div className=" flex flex-col items-center gap-2 lg:p-5 w-full rounded-md">
        <p className="flex text-lg lg:self-start lg:text-xl">Find all your students in one place</p>
        <TestFriends/>
      </div>


      <div className=" flex flex-col items-center gap-2 p-5 w-full rounded-md">
        <p className="flex text-xl">Assign them any Conversation</p>
        <TestConversationCover/>
      </div>

      <div className=" flex flex-col items-center gap-2 p-5 w-full rounded-md">
        <p className="flex text-xl">View progress on assigned Conversations</p>
        <TestTeacherPage/>
      </div>
    </div>


      <div className="flex flex-col space-y-3 text-md lg:text-lg text-muted-foreground">
        <p className="">Soon, tutors will have their own UI to track Student's progress,
      instantly see what they've been working on, and jump into the session prepared.</p>
        <p className="self-start px-3 py-1 text-foreground bg-muted rounded-full">Lesson finished early? No awkward filler</p>
        <p className="self-start px-3 py-1 text-foreground bg-muted rounded-full">No lesson planning</p>
        <p className="self-start px-3 py-1 text-foreground bg-muted rounded-full">No content prep</p>
        <p className="self-start px-3 py-1 text-foreground bg-muted rounded-full">No scrambling for what to do next</p>

      <p>Synomilo does the heavy lifting. Meet your Student or Tutor on your platform of choice and get started.</p>
    </div>
  </motion.div>







        <motion.div
        className="flex flex-col justify-start items-center text-center bg-landing-bg w-full lg:p-20 m-0 z-30"
        initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ delay: 0.1, duration: 0.2 }}
          >
            <div>
            <h2 className="text-3xl lg:text-5xl font-normal m-5">Looks good? Let’s get you started.</h2>

            </div>
        <div
        className={`flex flex-col lg:flex-row items-center gap-4 p-5 h-auto ${geist.className}`}>
        <Link href="/register">
          <Button className="cursor-pointer px-6 py-4">Get Started</Button>
        </Link>
        <Link href="/home">
          <Button variant="outline" className="cursor-pointer px-6 py-4">Try Without an Account</Button>
        </Link>
        <Link href="/pricing">
          <Button variant="outline" className="shadow-[0_0_5px_1px_rgba] shadow-pink-500 cursor-pointer px-6 py-4">Pricing</Button>
        </Link>
      </div>
      </motion.div>

        </div>







        </div>


        {/* <h2 className="flex items-center text-2xl font-semibold">Head to the
           <Link className="p-2 underline underline-offset-5 hover:underline-offset-10 transition-all duration-300" href="/home">Home</Link>
           page and start for free or <Link className="p-2 underline underline-offset-5 hover:underline-offset-10 transition-all duration-300" href={"/register"}> create an account</Link>
           </h2> */}
      </div>


      {/*<div className="flex w-screen h-auto items-center justify-evenly flex-row bg-landing-bg p-40 border-b">
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

        > <p>Learn English differently—with a focus on real conversation. Synomilo helps you build speaking skills first.</p>
          <p>You don&apos;t need to know words like <i>elbow</i> or <i>curtain</i> when all you want to do is ask how much something
           costs or where the train station is. Synomilo helps you learn what actually matters—first.</p>

        </motion.h2>
        </div>

        <div className="flex items-center flex-col m-2 gap-40">


          <motion.div
          {...transitionImage}>
            <Image
            src="/images/Screenshot1.png"
            alt="Image 3"
            width={500}
            height={500}
            className="object-cover rounded-xl shadow-md"
          />
          </motion.div>


         <motion.div
          {...transitionImage}>
            <Image
            src="/images/Screenshot2.png"
            alt="Image 3"
            width={500}
            height={500}
            className="object-cover rounded-xl shadow-md"
          />
          </motion.div>

          <motion.div
          {...transitionImage}>
            <Image
            src="/images/Screenshot3.png"
            alt="Image 3"
            width={500}
            height={500}
            className="object-cover rounded-xl shadow-md"
          />
          </motion.div>


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
            <li>Interactive hover feature</li>
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



      <div className="flex w-screen h-auto items-center justify-center flex-col bg-landing-bg p-40 border-b">
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

      */}



    <div className="flex w-screen h-auto items-center justify-center flex-col bg-accent">
      <h2 className="text-3xl lg:text-5xl font-normal m-10">Some questions you may have</h2>

      <Accordion className="w-full p-10 lg:w-1/2" type="single" collapsible>
      {questions.map((question, index) => (
        <AccordionItem key={index} value={`item-${index}`}>
          <AccordionTrigger className="text-lg lg:text-lg cursor-pointer">
            {question.question}
          </AccordionTrigger>
          <AccordionContent className="text-md lg:text-lg text-muted-foreground">
            {question.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>


    </div>

      <footer className="mb-[env(safe-area-inset-bottom)] lg:mb-0 w-screen lg:w-full bg-landing-bg z-50 shadow-[0_1px_5px_var(--color-ring)] dark:shadow-[0_0.5px_5px_var(--color-ring)]">
  <div className="flex flex-row lg:flex-row items-center h-auto lg:h-40 gap-5 p-10">
    <div className="flex justify-center w-1/3">
      <ul className="flex flex-col text-xs lg:text-md gap-2">
        <Link href="/">About</Link>
        <Link href="/">Contact</Link>
        <Link href="/">Pricing</Link>
      </ul>
    </div>
    <div className="flex justify-center w-1/3">
      <h1 className="text-xl lg:text-2xl font-normal">Synomilo</h1>
    </div>
    <div className="flex justify-center w-1/3">
      <ul className="flex justify-center text-xs lg:text-md flex-col gap-2">
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
