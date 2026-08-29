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
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import TestTutorConversation from "./(dashboard)/TestTutorConversation";
import LoginChecker from "./(auth)/login/loginChecker";
import { Card, CardContent } from "@/components/ui/card";
import { GuidePreview } from "./guides/GuidePreview";

const geist = Geist({ subsets: ['latin'] });
const dmSans = DM_Sans({ subsets: ['latin'] });

const conversationTopics = [
  {
    title: "Everyday Conversations",
    description:
      "Everyday situations like shopping, hobbies, family and daily routines.",
    category: "Beginner - Intermediate",
    href: "/home/conversations/68d7ccc8ad1883908843",
  },
  {
    title: "Travel & Directions",
    description:
      "Airports, hotels, transport and asking for directions with confidence.",
    category: "Beginner - Intermediate",
    href: "/home/conversations/68f1112fe34924c519ad",
  },
  {
    title: "Business English",
    description:
      "Job interviews, meetings, networking and workplace communication.",
    category: "Intermediate",
    href: "/home/conversations/68ce638012a4e95d0cfe",
  },
  {
  title: "Everyday Life",
  description:
    "Conversations about hobbies, relationships, routines and the people around us.",
  category: "All",
  href: "/home/conversations/69ff65793c924e35625a",
},
  // {
  //   title: "Health",
  //   description:
  //     "Doctor visits, pharmacies and other situations where clear communication matters.",
  //   category: "All",
  //   href: "/home/conversations/health",
  // },
];




export default function LandingPage() {

  const questions = [
  {
    question: "Who is Synomilo for?",
    answer:
      "Synomilo is designed primarily for English tutors who want realistic conversation material they can use and adapt during lessons.",
  },
  {
    question: "Do I have to follow the teaching guides?",
    answer:
      "No. The conversations can be used however you like. The guides are completely optional.",
  },
  {
    question: "Can I adapt the conversations?",
    answer:
      "Yes. The material is there for you to use, adapt, or build your own activities around.",
  },
  {
    question: "Do I need to download anything?",
    answer:
      "Nope, Synomilo runs entirely in your browser.",
  },
  {
    question: "Is there a free option?",
    answer:
      "Yes. There are free and paid options.",
  },
];


return (
  <div className="bg-gradient">
    <ScrollArea id="landing-scroll" className={`flex scroll-auto flex-col items-center h-screen overflow-x-hidden ${dmSans.className}`}>
       <nav className="sticky backdrop-blur-2xl top-0 w-full z-30">
        {/*shadow-[0_1px_5px_var(--color-ring)] dark:shadow-[0_0.5px_5px_var(--color-ring)] */}
        <div className="flex items-center h-12 lg:h-18">
            <h1 className="text-xl lg:text-3xl font-normal absolute left-2 lg:left-10">Synomilo</h1>

            <div className={`flex absolute right-2 md:right-5 lg:right-10 gap-1 lg:gap-2 ${geist.className}`}>
              <Link href={"/register"}> <Button className="md:block rounded-lg lg:block cursor-pointer hover:bg-gradient" size={"sm"} variant={"default"}>Start free</Button> </Link>
              <LoginChecker/>
              <Link href={"/pricing"}> <Button className="border border-foreground md:border-none md:block lg:block cursor-pointer hover:bg-gradient" size={"sm"} variant={"ghost"}>Pricing</Button> </Link>
              <Link href={"/guides"}> <Button className="border border-foreground md:border-none md:block lg:block cursor-pointer hover:bg-gradient" size={"sm"} variant={"ghost"}>Guides</Button> </Link>
              <ModeToggle />
            </div>
        </div>
    </nav>

     <div className="flex flex-col w-screen justify-center items-center">
       <div className="flex flex-col items-center space-y-[200px]">
   <motion.div
  layout
  initial={{ opacity: 0 }}
    whileInView={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, height: 0 }}
    transition={{ duration: 0.3, ease: "easeInOut" }}
    className="flex flex-col mt-10 p-5 lg:px-20 h-full items-start justify-center lg:flex-row"
  >
  <div className="w-full justify-center lg:w-1/2 space-y-4">

    <div className="flex w-full flex-col justify-center lg:flex-row lg:items-start lg:p-5">
      <div className="space-y-8">
        <Badge className="border border-foreground bg-transparent text-foreground">
      Early Access
    </Badge>

        <h1 className="w-full text-start text-5xl font-semibold md:w-2/3 lg:w-xl lg:text-7xl">
        Ready-made conversation material for English tutors.
      </h1>

      <p
        className={`text-start text-base leading-relaxed text-muted-foreground lg:w-xl lg:text-lg ${geist.className}`}
      >
        Realistic conversations you can use as-is, adapt to your lessons, or build your own activities around.
      </p>
      </div>
    </div>
  </div>

  <div className="flex flex-col w-full items-start justify-end lg:w-1/2 mt-10">


    <TestTutorConversation />
  </div>

</motion.div>

<motion.section
  className="w-full py-15"
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-100px" }}
  transition={{ duration: 0.45, ease: "easeOut" }}
>
  <div className="mx-auto flex max-w-7xl flex-col items-center px-6">

    <h2 className="text-center text-4xl font-semibold lg:text-5xl">
      Browse Conversations
    </h2>

    <p className={`mt-4 max-w-2xl text-center text-base lg:text-lg text-muted-foreground ${geist.className}`}>
      Realistic conversations covering everyday and professional topics.
    </p>

    <div className="mt-14 grid w-full grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
  {conversationTopics.map((topic, index) => (
    <motion.div
      key={topic.title}
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.32, delay: index * 0.08, ease: "easeOut" }}
    >
      <Link href={topic.href}>
        <Card className="group h-full cursor-pointer transition-all hover:shadow-lg">
          <CardContent className="flex h-full flex-col">
            <Badge variant={"secondary"} className="">{topic.category}</Badge>

            <h3 className="mt-5 font-semibold">{topic.title}</h3>

            <p className="mt-2 flex-1 text-sm text-muted-foreground">
              {topic.description}
            </p>

            <div className="mt-6 flex items-center gap-2 pt-4 text-sm font-medium">
              <span>Try conversation</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  ))}
</div>

    <Link href="/home/conversations">
      <Button size="lg"
      variant={"outline"}
      className="mt-14 cursor-pointer rounded-full">
        Browse all conversations

      <ArrowRight className="ml-2 h-4 w-4" />

      </Button>
    </Link>

  </div>
</motion.section>

<motion.section
  className="w-full py-24"
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-120px" }}
  transition={{ duration: 0.45, ease: "easeOut" }}
>
  <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-2 lg:gap-20">

    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-120px" }}
      transition={{ duration: 0.35, delay: 0.05, ease: "easeOut" }}
    >


      <h2 className="text-4xl font-semibold lg:text-5xl">
        Need a little more to work with?
      </h2>

      <p className={`max-w-xl text-base leading-relaxed text-muted-foreground lg:text-lg ${geist.className}`}>
       Each conversation also has an optional teaching guide with vocabulary,
        warm-up ideas, discussion prompts, speaking activities, and homework ideas.
      </p>

      <p className="max-w-xl text-base leading-relaxed text-muted-foreground lg:text-lg">
        Use the whole guide, take a few ideas from it, or teach the
        conversation entirely your own way.
      </p>

      <Link href="/guides">
        <Button
          size="lg"
          variant="outline"
          className="mt-2 cursor-pointer rounded-full"
        >
          View teaching guides
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </Link>
    </motion.div>

    <motion.div
      className="w-full"
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-120px" }}
      transition={{ duration: 0.35, delay: 0.12, ease: "easeOut" }}
    >
      <GuidePreview/>
    </motion.div>

  </div>
</motion.section>


        <div className="w-screen gap-10 flex flex-col justify-center items-center  ">



        <motion.div
        className="flex flex-col justify-start items-center text-center w-full py-24"
        initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ delay: 0, duration: 0.5 }}
          >
            <div className="flex flex-col items-center">
            <h2 className="text-4xl font-semibold lg:text-5xl">
              Make it your own
            </h2>


            <p className={`mt-4 max-w-xl text-base leading-relaxed text-muted-foreground lg:text-lg ${geist.className}`}>
              Use Synomilo as it is, adapt it to your lessons, or build around it.

            </p>

            <Link href="/register">
              <Button className="cursor-pointer px-6 rounded-full mt-10">
                Get Started
              </Button>
            </Link>
            <p className={`mt-4 max-w-xl text-md leading-relaxed text-muted-foreground lg:text-lg ${geist.className}`}>
              No prescribed teaching method. Just material for your classes.

            </p>
            </div>


      </motion.div>

        </div>
        </div>



      </div>


    <div className="flex w-screen h-auto items-center justify-center flex-col mt-20 bg-background/40 py-10">
      <h2 className="text-3xl lg:text-5xl font-normal">Some questions you may have</h2>

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

      <footer className="bg-background/50 mb-[env(safe-area-inset-bottom)] lg:mb-0 w-screen lg:w-full z-50 shadow-[0_1px_5px_var(--color-ring)] dark:shadow-[0_0.5px_5px_var(--color-ring)]">
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
        <Link href="/refund">Refund Policy</Link>
      </ul>
    </div>
  </div>
</footer>



    </ScrollArea>
    </div>

  );
}
