/* eslint react/no-unescaped-entities: 0 */
"use client";
import ModeToggle from "@/components/ui/ModeToggle";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Geist } from "next/font/google";
import { DM_Sans } from "next/font/google";
import { motion } from "motion/react";
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger,} from "@/components/ui/accordion"
import { ScrollArea } from "@/components/ui/scroll-area";
import { TestConversation } from "./(dashboard)/TestConversation";
import TestDictionary from "./(dashboard)/TestDictionary";
import { AlignLeft, ArrowDown, ArrowLeft, ArrowRight, ArrowUp, BookOpenCheck, Check, GalleryHorizontalEnd, IterationCcw, MousePointer2, Pause, Play, RectangleHorizontal, Sword, Swords } from "lucide-react";
import TestWordBoard from "./(dashboard)/TestWordBoard";
import { Badge } from "@/components/ui/badge";
import TestConversationCover from "./(dashboard)/TestConversationCover";
import TestFriends from "./(dashboard)/TestFriends";
import TestTeacherPage from "./(dashboard)/TestTeacherPage";
import TestWorkflow from "./(dashboard)/TestWorkflow";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import LoginChecker from "./(auth)/login/loginChecker";

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




  const handleScroll = () => {
    const viewport = document.querySelector('#landing-scroll [data-slot="scroll-area-viewport"]') as HTMLElement | null;
    viewport?.scrollBy({
      top: 900,
      behavior: "smooth",
    });
  };

  const questions = [
          {
            question: "Is it free?",
            answer: "There are free and paid options"
          },
          {
            question: "What do I get with the paid option?",
            answer: (
              <>

                <p>Students get access to:</p>
                <ul className="list-disc pl-5 text-sm">
                  <li>Conversation Audio</li>
                  <li>All existing and future conversations</li>
                  <li>Color customization</li>
                  <li>Challenges</li>
                </ul>

                <p className="mt-5" >Tutors get access to:</p>
                <ul className="list-disc pl-5 text-sm">
                  <li>Assigning</li>
                  <li>Student progress tracking</li>
                </ul>

                <p className="flex items-center gap-2 pt-5">
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
            question: "Do I need to download anything?",
            answer: <>Nope, it runs entirely in your browser.</>
          },
          {
            question: "What if my tutor/student already has a subscription?",
            answer:
            <>
            <p>You get some benefits too, even if you remain on the free tier.</p>
            <p>See how they interact on the{" "}
              <Link
                    className="underline underline-offset-5 hover:underline-offset-10 transition-all duration-300"
                    href="/pricing"
                  >
                    Pricing
                  </Link>{" "} page.</p>

            </>
          },



        ]


return (
    <ScrollArea id="landing-scroll" className={`flex scroll-auto bg-landing-bg flex-col items-center h-screen overflow-x-hidden ${dmSans.className}`}>
       <nav className="sticky backdrop-blur-2xl top-0 w-full z-30">
        {/*shadow-[0_1px_5px_var(--color-ring)] dark:shadow-[0_0.5px_5px_var(--color-ring)] */}
        <div className="flex items-center h-12 lg:h-18">
            <h1 className="hidden lg:block text-3xl lg:text-3xl font-normal absolute left-5 lg:left-10">Synomilo</h1>

            <div className={`flex absolute right-5 md:right-5 lg:right-10 md:gap-0 lg:gap-1 ${geist.className}`}>
              <Link href={"/register"}> <Button className="hidden md:block lg:block cursor-pointer" variant={"ghost"}>Sign up</Button> </Link>
              <LoginChecker/>
              <Link href={"/pricing"}> <Button className="hidden md:block lg:block cursor-pointer" variant={"ghost"}>Pricing</Button> </Link>
              <Link href="/blog"> <Button variant="ghost" className="hidden md:block lg:block shadow-[0_0_5px_1px_rgba] cursor-pointer">Blog</Button></Link>
              <ModeToggle />
            </div>
        </div>
    </nav>


      <div className="flex flex-col w-screen border-b bg-landing-bg justify-center items-center gap-20">
        <div className="flex flex-col gap-2 items-center">

             <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, height: "auto"}}
            whileInView={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="flex flex-col items-center lg:flex-row lg:ml-35 text-6xl lg:text-8xl bg-landing-bg font-normal">Synomilo
            <span className="text-muted-foreground lg:w-auto text-sm lg:text-lg font-capital bg-muted px-3 py-1 lg:px-3 rounded-full">Early Access</span>

            </motion.div>



          {/* <div className="flex flex-row bg-landing-bg text-1xl font-normal mt-3 gap-2" >
            <p>/ˌsɪn.oʊˈmiː.loʊ/</p> <span>•</span> <span>sin-oh-MEE-low</span>
          </div> */}

           <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, height: "auto"}}
            whileInView={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="text-zinc-500 bg-landing-bg">Greek for: &quot;I converse&quot;
            </motion.div>
        </div>

        <div className="flex flex-col items-center gap-2">

         <motion.div
            layout
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, height: 0 }}
            transition={{duration: 0.3, delay:0.1, ease: "easeInOut" }}
            className="flex flex-col lg:gap-5 items-center justify-center"
            >

        <p className="text-2xl p-5 text-center md:w-2/3 lg:text-5xl lg:p-0 font-medium bg-landing-bg">
          Conversation-based ESL tool for tutors and students
        </p>

        <motion.div
            layout
            initial={{ opacity: 0, height: "auto" }}
            animate={{ opacity: 1, height: "auto"}}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4 , delay:0.2, ease: "easeInOut" }}
            className="flex flex-col max-w-4xl bg-card rounded-4xl justify-start items-center overflow-hidden"
          >
            <p className={`text-md p-2 lg:text-xl leading-relaxed bg-landing-bg text-center ${dmSans.className}`}>
            Built for ESL tutors, online teachers, and independent learners, Synomilo provides conversation content, interactive tools, assignments, and student progress tracking for real world English practice.
            </p>

          </motion.div>

        </motion.div>

        <motion.div
          layout
          initial={{ opacity: 0, height: "auto" }}
          animate={{ opacity: 1, height: "auto"}}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.4 , delay:0.2, ease: "easeInOut" }}
          className="flex gap-2 mt-20">
          <Link href={"/register"}>
          <Button size={"lg"} className="w-auto cursor-pointer rounded-full shadow-foreground">Get Started</Button>
          </Link>

          <Button
          className="w-auto cursor-pointer rounded-full"
          size={"lg"}
          variant={"outline"}
          onClick={handleScroll}>
          See more <ArrowDown/>
          </Button>

        </motion.div>

        {/* <p className="flex justify-center text-sm lg:text-xl m-2 text-muted-foreground">This isn't theory. It's rehearsal for when you're face to face.</p> */}


       {/* <motion.div
            layout
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, height: 0 }}
            transition={{duration: 0.3, ease: "easeInOut" }}
      className="h-auto w-full lg:w-1/2 flex items-center">
        <Card className={`w-full h-auto flex flex-row justify-evenly shadow-none border-none items-center p-5 ${dmSans.className}`}>
          <div className="flex flex-col items-center space-y-2 w-1/2">
            <p className="text-4xl lg:text-5xl font-bold text-center">
              <CountUp end={userCount} duration={1.5} separator="," />
            </p>
            <p className="text-md font-semibold text-muted-foreground text-center">Users</p>
          </div>

          <div className="flex flex-col items-center space-y-2 w-1/2">
            <p className="text-4xl lg:text-5xl font-bold text-center">
              <CountUp end={convoCount} duration={1.5} separator="," />
            </p>
            <p className="text-md font-semibold text-muted-foreground text-center">Conversations</p>
          </div>
        </Card>
      </motion.div> */}




        <div className="w-screen gap-10 flex flex-col justify-center items-center border-b bg-landing-bg">

       <motion.div
        className="sticky top-5 z-30 mt-20 p-3 lg:p-4 bg-card border-1 rounded-full shadow-lg"
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true}}
        transition={{duration: 0.4, delay:1, ease: "easeInOut"}}>

          <div className="flex flex-row text-xl lg:text-xl font-semibold gap-2 z-20 items-center">
          Here&apos;s what&apos;s offered <span><ArrowDown className= "text-pink-500" size={30}/></span>
          </div>
      </motion.div>




      <motion.div
      className="hidden lg:block z-20 sticky top-30 lg:top-42 self-start m-2 lg:m-4 lg:mb-33 text-md lg:text-2xl font-semibold"
      initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px"}}
          transition={transition1}>
        <span className="px-1 text-pink-500">
          1.
        </span>
        Tutors
        </motion.div>

         <motion.div className="w-full lg:w-2/3 space-y-8 border-none lg:border lg:border-border/50 p-6 lg:p-10 rounded-2xl lg:shadow-lg bg-landing-bg lg:bg-background/60 backdrop-blur-sm"
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ delay: 0.2, duration: 0.2 }}
          >

    <div className="flex flex-row text-2xl lg:text-4xl font-normal justify-start">Made with Tutors in Mind</div>
    <p className="text-md lg:text-lg text-muted-foreground">
      Built for ESL tutors, Synomilo helps reduce prep time with real-world, ready-made conversations,
      assignments, and student progress tracking. Stay organized and prepared for every session.
    </p>
    <span className="text-pink-500">Try it yourself, everything here is interactive.</span>

    <div className="flex flex-col items-center space-y-12 lg:space-y-6">

      <div className="flex flex-col lg:flex-row items-center gap-2 lg:p-5 w-full rounded-md">
        <div className="flex flex-col lg:w-1/2 items-start border-b">
          <p className="flex text-lg lg:text-2xl">Keep track of your students </p>
          <p className="text-sm lg:self-start text-muted-foreground italic">On the Assignments page, you can find your current connections or add new ones.</p>
        </div>
        <TestFriends/>
      </div>


      <div className="flex flex-col lg:flex-row-reverse items-center justify-evenly lg:p-5 w-full rounded-md">
        <div className="flex flex-col lg:w-1/2 items-center border-b">
          <p className="flex text-lg lg:text-2xl">Assign conversations</p>
          <p className="text-sm text-muted-foreground italic">On the Conversations page, each tile will have the Assign button </p>
        </div>

        <TestConversationCover/>

      </div>

      <div className="flex flex-col lg:flex-row items-center gap-2 lg:p-5 w-full rounded-md">
        <div className="flex flex-col lg:w-1/2 items-start border-b">
          <p className="flex text-lg lg:text-2xl">View progress</p>
          <p className="text-sm text-muted-foreground italic">This is also located on the Assignments page</p>
        </div>

        <TestTeacherPage/>

      </div>
    </div>



    <div className="flex flex-row text-2xl lg:text-4xl font-normal justify-start mt-10">Why use Synomilo?</div>
    <p className="text-md lg:text-lg text-muted-foreground">
      Synomilo helps tutors spend less time searching for materials and more time teaching.
    </p>

    <p className="text-md lg:text-lg text-muted-foreground">Whether you build lessons around it or use it to fill the last 10 minutes of class, it’s there when you need it.</p>



      <div className="flex flex-col space-y-3 text-md lg:text-lg text-muted-foreground">
        <Table>
  <TableHeader className="text-lg">
    <TableRow>
      <TableHead className="">What tutors usually do</TableHead>
      <TableHead>What Synomilo helps with</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody className="text-base">
    <TableRow>
      <TableCell>Writing or searching for conversation material</TableCell>
      <TableCell>Ready-made conversation material</TableCell>
    </TableRow>
    <TableRow>
      <TableCell>Tracking student progress in notebooks or Google Docs</TableCell>
      <TableCell>Built-in student tracking</TableCell>
    </TableRow>
    <TableRow>
      <TableCell>Finishing lessons early and improvising conversation topics</TableCell>
      <TableCell>Jump into a quick speaking activity to close off the lesson</TableCell>
    </TableRow>
    <TableRow>
      <TableCell>Trying to remember what students struggled with last lesson</TableCell>
      <TableCell>Review progress before the session starts</TableCell>
    </TableRow>
  </TableBody>
</Table>
      </div>

  </motion.div>




        <div className="hidden lg:block z-20 sticky top-30 left-43 text lg:left-0 lg:top-52 self-start m-4 mb-23 lg:text-2xl font-semibold">
        <span className="px-1 text-pink-500 text">
          2.
        </span>
        Students
        </div>

        <motion.div
          className={`w-full lg:w-2/3 mx-auto space-y-8 lg:border lg:border-border/50 p-6 lg:p-10 rounded-2xl shadow-lg bg-landing-bg lg:bg-background/60 backdrop-blur-sm`}
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 200 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={transition2}
        >

          <div className="flex flex-col space-y-6 justify-start items-start">

          <h1 className="text-2xl lg:text-4xl font-normal">Ready-made Conversations</h1>
          <p className="text-md lg:text-lg text-muted-foreground">
            Students have access to conversations that reflect real life scenarios, better preparing them for something as simple
            as asking for directions, to more complicated topics like job interviews. Each conversation includes interactive features
            such as audio, color-coded words that reveal definitions and word types, adjustable text sizes,
            and the ability to save words to a personal dictionary.
          </p>
          </div>

          <div className="flex justify-end">
          <p className="hidden lg:block lg:text-xl font-semibold">Try it, highlight word types for easy identification</p>
          <ArrowDown size={30} className="hidden lg:block text-pink-500"/>
          </div>


          <div className={`flex flex-col m-2 lg:flex-row justify-center lg:gap-10 ${geist.className}`}>

          <TestConversation />



          </div>

        <div className="relative overflow-hidden rounded-xl border border-border/50">
    <video
      className="relative overflow-hidden rounded-xl border border-border/50"
      src="/conversationDemo.mp4"
      autoPlay
      loop
      muted
      playsInline
    />
  </div>

        </motion.div>




        <motion.div
          className="flex flex-col w-full lg:w-1/2 space-y-6 p-10 rounded-md lg:bg-background/60 lg:shadow-md"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.25 }}
        >
            <h3 className="text-2xl lg:text-4xl font-normal">Why this works</h3>

        <p className="text-md lg:text-lg text-muted-foreground">
          Reading and listening to natural conversations helps you recognize patterns in real English.
          Instead of memorizing isolated grammar rules or vocabulary lists, you learn how people actually speak in everyday situations.
        </p>

        <ul className="pl-5 text-md lg:text-lg space-y-4">

          <li>
            <p>Train your ear</p>
            <p className="self-start px-4 py-2 text-muted-foreground rounded-lg lg:rounded-full">
              Hearing natural phrasing repeatedly makes spoken English feel more familiar and easier to follow.
            </p>
          </li>

          <li>
            <p>Learn through context</p>
            <p className="self-start px-4 py-2 text-muted-foreground rounded-full">
              Words and phrases are easier to remember when you see how they are used in real conversations.
            </p>
          </li>

        </ul>

        <p className="text-md lg:text-lg text-muted-foreground">
          Practicing with realistic conversations builds confidence before real interactions happen,
          whether that’s traveling, working, studying, or everyday communication.
        </p>

            <h3 className="text-2xl lg:text-4xl font-normal mt-5">AI</h3>
             <p className="text-md lg:text-lg text-muted-foreground">
             AI is not used to write any material. Every conversation is written by native English speakers,
             ensuring they sound as natural as possible and reflect real spoken English. For now, AI is only used
             for audio. As the platform grows, a switch will be made to record and use audio from native speakers.
            </p>


        </motion.div>

        <motion.div
  className={`w-full lg:w-2/3 space-y-8 lg:border lg:border-border/50 p-6 lg:p-10 rounded-2xl shadow-lg bg-landing-bg lg:bg-background/60 backdrop-blur-sm`}
  initial={{ opacity: 0, y: 80 }}
  whileInView={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0, y: 40 }}
  viewport={{ once: true }}
  transition={transitionImage}
>
  {/* Header */}
  <div className="flex flex-col space-y-4 text-left">
    <h1 className="text-2xl lg:text-4xl font-normal">
      Dictionary & Flashcard Builder
    </h1>

    <p className="text-muted-foreground text-base lg:text-lg">
      Words saved from the conversation you were just reading will appear here, along with their definitions, word type and an exampe sentence.
    </p>
  </div>

  {/* Interactive Preview */}
  <div className={`flex flex-col lg:flex-row items-center justify-center gap-8 ${geist.className}`}>
    <TestDictionary />
    <TestWordBoard />
  </div>

  {/* Demo Video */}
  <div className="relative overflow-hidden rounded-xl border border-border/50">
    <video
      className="relative overflow-hidden rounded-xl border border-border/50"
      src="/dictionaryDemo.mp4"
      autoPlay
      loop
      muted
      playsInline
    />
  </div>
</motion.div>


        <div className="hidden lg:block z-20 sticky top-30 left-43 text lg:left-0 lg:top-62 self-start m-4 mb-23 lg:text-2xl font-semibold">
        <span className="px-1 text-pink-500 text">
          2.
        </span>
        Workflow
        </div>


        <motion.div
          className={`w-full lg:w-2/3 m-10 space-y-6 lg:border-1 p-10 rounded-md shadow-md`}
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 200 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={transition2}
        >

           <div className="flex flex-col space-y-6 justify-start items-start">

          <h1 className="text-2xl lg:text-4xl font-normal">Workflow</h1>
          <p className="text-md lg:text-lg text-muted-foreground">
            Here's a glimpse of Synomilo's usual workflow.
          </p>
          </div>

          <span className="text-pink-500">Try it yourself, everything here is interactive.</span>
          <TestWorkflow />


        </motion.div>


        <div className="hidden lg:block z-20 sticky top-30 left-full lg:left-0 text-1xl lg:top-72 lg:mb-14 self-start m-4 lg:text-2xl font-semibold">
        <span className="px-1 text-pink-500">
          3.
        </span>
        Tools & Features
        </div>

       <div className="grid grid-cols-3 gap-2 m-2 lg:grid-cols-3 lg:gap-5 lg:p-2 rounded-lg">

    <motion.div
    className="flex flex-col items-center justify-center bg-card border rounded-md p-5 gap-5 shadow-md text-sm"
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
 className="flex flex-col items-center justify-center bg-card border rounded-md p-5 gap-5 shadow-md text-sm"
 initial={{ opacity: 0, y: 100 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px", }}
    transition={{ delay: 0.1, duration: 0.2 }}
    >
  <span className="relative flex justify-center items-center lg:h-20 lg:w-20">
    <MousePointer2 size={35} strokeWidth={1} fill="bg-foreground" className="absolute bottom-0 right-0" />
    <RectangleHorizontal size={80} strokeWidth={1} className="text-pink-500" />
  </span>
  <div className="flex items-center justify-center text-center">Hover</div>
</motion.div>


   <motion.div
   className="flex flex-col items-center justify-center bg-card border rounded-md p-5 gap-5 shadow-md text-sm"
   initial={{ opacity: 0, y: 100 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px", }}
    transition={{ delay: 0.1, duration: 0.2 }}>
    <span className="flex justify-center items-center lg:h-20">
      <IterationCcw size={50} className="" />
    </span>
    <div className="flex items-center justify-center text-center">Recents</div>
  </motion.div>

  <motion.div
  className="flex flex-col items-center justify-center bg-card border rounded-md p-5 gap-5 shadow-md text-sm"
  initial={{ opacity: 0, y: 100 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px", }}
    transition={{ delay: 0.2, duration: 0.2 }}
    >
    <span className="flex justify-center items-center lg:h-20">
      <GalleryHorizontalEnd size={50} className="fill-current" />
    </span>
    <div className="flex items-center justify-center text-center">Custom flashcard builder</div>
  </motion.div>

  <motion.div
  className="flex flex-col items-center justify-center bg-card border rounded-md p-5 gap-5 shadow-md text-sm"
  initial={{ opacity: 0, y: 100 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px", }}
    transition={{ delay: 0.2, duration: 0.2 }}>
    <span className="flex justify-center items-center lg:h-20">
      <BookOpenCheck strokeWidth={2} size={50} />
    </span>
    <div className="flex flex-col lg:flex-row items-center justify-center text-center">
      Beginner
      <ArrowRight className="text-pink-500 mx-1 lg:block hidden" size={15} />
      <ArrowDown className="text-pink-500 mx-1 block lg:hidden" size={15} />
      Advanced Levels
    </div>
  </motion.div>

   <motion.div
   className="flex flex-col items-center justify-center bg-card border rounded-md p-5 gap-5 shadow-md text-sm"
   initial={{ opacity: 0, y: 100 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px", }}
    transition={{ delay: 0.2, duration: 0.2 }}
    >
  <span className="relative flex justify-center items-center lg:h-20 lg:w-20">
    <Check size={35} strokeWidth={2} className="absolute bottom-0 right-2 text-green-500" />
    <AlignLeft size={60} strokeWidth={2} className="" />
  </span>
  <div className="flex items-center justify-center text-center">Progress tracking</div>
</motion.div>

 <motion.div
   className="flex flex-col items-center justify-center bg-card border rounded-md p-5 gap-5 shadow-md text-sm"
   initial={{ opacity: 0, y: 100 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px", }}
    transition={{ delay: 0.2, duration: 0.2 }}
    >
  <span className="relative flex justify-center items-center lg:h-20 lg:w-20">
    <Sword size={50} className="rotate-45"/>
  </span>
  <div className="flex items-center justify-center text-center">Tasks</div>
</motion.div>

<motion.div
   className="flex flex-col items-center justify-center bg-card border rounded-md p-5 gap-5 shadow-md text-sm"
   initial={{ opacity: 0, y: 100 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px", }}
    transition={{ delay: 0.2, duration: 0.2 }}
    >
  <div className="relative flex justify-center items-center lg:h-20 lg:w-20">
    <Swords className="fill-current" size={50}/>
  </div>
  <div className="flex items-center justify-center text-center">Challenges</div>
</motion.div>

<motion.div
  className="flex flex-col items-center justify-center bg-card border rounded-md p-5 gap-5 shadow-md text-sm"
  initial={{ opacity: 0, y: 100 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-100px" }}
  transition={{ delay: 0.2, duration: 0.2 }}
>
  <div className="grid grid-cols-2 p-1 lg:grid-cols-3 gap-2 lg:p-4">
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



        <motion.div
        className="flex flex-col justify-start items-center text-center bg-landing-bg w-full lg:p-20 m-0 z-26"
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
          <Button className="cursor-pointer px-6 rounded-full">Get Started</Button>
        </Link>
        <Link href="/pricing">
          <Button variant="outline" className="rounded-full hover:shadow-[0_0_3px_0.5px_rgba] hover:shadow-pink-500 cursor-pointer px-6">Pricing</Button>
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
          <AccordionContent className="text-md lg:text-md text-[16px]">
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
        <Link href="/about">About</Link>
        <Link href="/pricing">Pricing</Link>
      </ul>
    </div>
    <div className="flex justify-center w-1/3">
      <h1 className="text-xl lg:text-2xl font-normal">Synomilo</h1>
    </div>
    <div className="flex justify-center w-1/3">
      <ul className="flex justify-center text-xs lg:text-md flex-col gap-2">
        <Link href="/privacy">Privacy Policy</Link>
        <Link href="/ToS">Terms of Service</Link>
        {/*<Link href="/">Refund and Cancellation Policy</Link>*/}
      </ul>
    </div>
  </div>
</footer>



    </ScrollArea>

  );
}
