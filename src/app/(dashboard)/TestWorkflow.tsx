"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Toaster } from "sonner";
import { Check, Plus, Send, BookOpen } from "lucide-react";
import { DM_Sans, Geist } from "next/font/google";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { motion } from "motion/react";
import { Separator } from "@/components/ui/separator";

const geist = Geist({ subsets: ["latin"] });
const dmSans = DM_Sans({ subsets: ["latin"] });


const TUTOR_NAME = "tutor";
const TUTOR_EMAIL = "tutor@gmail.com";
const STUDENT_NAME = "student";
const STUDENT_EMAIL = "student@gmail.com";

export default function TestWorkflow() {
  // Step 1 – Adding
  const [requestSent, setRequestSent] = useState(false);
  const [requestAccepted, setRequestAccepted] = useState(false);

  // Step 2 – Assigning
  const [assigned, setAssigned] = useState(false);

  // Step 3 – Opening
  const [conversationOpen, setConversationOpen] = useState(false);
  const [markedComplete, setMarkedComplete] = useState(false);

  return (
    <div className={`flex flex-col gap-16 w-full ${dmSans.className}`}>
      <Toaster />

      <section className="flex flex-col gap-4">
        <div>
          <h3 className="text-2xl lg:text-3xl font-normal">Adding</h3>
          <p className="text-base text-muted-foreground mt-1">
            The tutor searches for and sends a connection request to the student.
          </p>
        </div>

        <div className={`flex flex-col lg:flex-row gap-4 ${geist.className}`}>
          <Card className="flex-1 bg-card border dark:border-2 shadow-lg">
            <CardHeader>
              <Badge className="w-fit">Tutor View</Badge>
              <CardTitle className="text-lg">Search Results</CardTitle>
              <CardDescription className="flex flex-row flex-wrap items-center gap-1">
                <p>Search for a student to add them using the</p>
                <Button
                  size="icon"
                  className="cursor-pointer h-5 w-5 shadow-md bg-green-500 hover:bg-green-600">
                    <motion.div whileHover={{ rotate: 90 }} transition={{ duration: 0.1 }}>
                      <Plus className="h-4 w-4 text-white" />
                    </motion.div>
                    </Button>
                    <p>button</p>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between border p-3 rounded-md">
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-base">{STUDENT_NAME}</p>
                    <Badge variant="secondary">
                      Student
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {STUDENT_EMAIL}
                  </p>
                </div>
                <Button
                  size="icon"
                  variant={requestSent ? "outline" : "secondary"}
                  disabled={requestSent}
                  className={`cursor-pointer h-5 w-5 shadow-md ${
                    requestSent
                      ? "bg-muted text-muted-foreground"
                      : "bg-green-500 hover:bg-green-600"
                  }`}
                  onClick={() => {
                    setRequestSent(true);
                    toast.success(`Request sent to ${STUDENT_EMAIL}`);
                  }}
                >
                  {requestSent ? (
                    <Check className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <motion.div whileHover={{ rotate: 90 }} transition={{ duration: 0.1 }}>
                      <Plus className="h-4 w-4 text-white" />
                    </motion.div>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="flex-1 bg-card border dark:border-2 shadow-lg">
            <CardHeader>
              <Badge variant="secondary" className="w-fit">
                Student View
              </Badge>
              <CardTitle className="text-lg">Requests</CardTitle>
              <CardDescription>Incoming connection requests</CardDescription>
            </CardHeader>
            <CardContent>
              {requestSent && !requestAccepted ? (
                <div className="flex items-center justify-between border p-3 rounded-md">
                  <span className="text-sm">
                    <strong>{TUTOR_NAME}</strong> wants to add you.
                  </span>
                  <div className="flex gap-1">
                    <Badge
                      className="bg-green-500 hover:bg-green-600 cursor-pointer border-none text-white"
                      onClick={() => {
                        setRequestAccepted(true);
                        toast.success("Request accepted!");
                      }}
                    >
                      Accept
                    </Badge>
                    <Badge className="bg-red-500 cursor-pointer border-none text-white">
                      Deny
                    </Badge>
                  </div>
                </div>
              ) : requestAccepted ? (
                <div className="flex items-center gap-2 border p-3 rounded-md">
                  <Check className="text-green-500" size={16} />
                  <span className="text-sm">
                    Connected with <strong>{TUTOR_NAME}</strong>
                  </span>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  No pending requests.
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <div>
          <h3 className="text-2xl lg:text-3xl font-normal">Assigning</h3>
          <p className="text-md text-muted-foreground mt-1">
          The tutor assigns a conversation to the student using the{" "}

          <Badge
            className={`inline-flex items-center gap-1 align-middle ${geist.className}`}
          >
            <Send size={12} />
            Assign
          </Badge>

          {" "}button
        </p>
        </div>

        <div className={`flex flex-col lg:flex-row gap-4 ${geist.className}`}>

          <Card className="flex lg:w-80 lg:h-80 bg-card border dark:border-2 shadow-lg">
            <CardHeader>
              <Badge className="w-fit">Tutor View</Badge>
              <div className="flex flex-row justify-between">
                <div>
                  <CardTitle className="text-lg">Conversation Title</CardTitle>
                  <CardDescription className="border-b pb-2">
                    B1
                  </CardDescription>
                </div>

                <div>

                  <Popover>
                <PopoverTrigger asChild>
                  <Badge
                    className={`cursor-pointer shadow-md ${
                      !requestAccepted
                        ? "opacity-50 pointer-events-none"
                        : ""
                    }`}
                  >
                    <Send size={14} /> Assign
                  </Badge>
                </PopoverTrigger>
                <PopoverContent className={`w-auto space-y-2 ${geist.className}`}>
                  <div className="flex items-center justify-between border p-2 rounded-md">
                    <div>
                      <p className="text-sm font-medium">{STUDENT_NAME}</p>
                      <p className="text-xs text-muted-foreground">
                        {STUDENT_EMAIL}
                      </p>
                    </div>
                    <Badge
                      className={`text-xs cursor-pointer ml-3 ${
                        assigned ? "text-white" : ""
                      }`}
                      onClick={() => {
                        if (!assigned) {
                          setAssigned(true);
                          toast.success(
                            `Conversation assigned to ${STUDENT_NAME}`
                          );
                        }
                      }}
                    >
                      {assigned ? (
                        <div className="flex items-center gap-1">
                          <Check size={13} />
                          Assigned
                        </div>
                      ) : (
                        <div className="flex items-center gap-1">
                          <Send size={12} />
                          Assign
                        </div>
                      )}
                    </Badge>
                  </div>
                </PopoverContent>
              </Popover>


                </div>

              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Conversations will have short descriptions to help students and
                tutors quickly understand the context.
              </p>

            </CardContent>
          </Card>

          <Card className="flex-1 bg-card border dark:border-2 shadow-lg">
            <CardHeader>
              <Badge variant="secondary" className="w-fit">
                Student View
              </Badge>
              <CardTitle className="text-lg">My Assigned Tasks</CardTitle>
              <CardDescription>Tasks assigned by your tutor</CardDescription>
            </CardHeader>
            <CardContent>
              {assigned ? (
                <div className="flex items-center justify-between border p-3 rounded-md hover:bg-muted/50 transition">
                  <div className="flex flex-col space-y-2">
                    <p className="font-semibold text-sm">
                      Conversation Title
                    </p>
                    <p className="text-xs text-muted-foreground">Level: B1</p>
                    <Badge variant="outline" className="text-xs mt-1">
                      Pending
                    </Badge>
                  </div>
                  <Button
                    size="sm"
                    variant="default"
                    className="cursor-pointer text-xs"
                    onClick={() => {
                      setConversationOpen(true);
                      toast("Opening conversation… Done");
                    }}
                  >
                    <BookOpen size={14} /> Open
                  </Button>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  No assignments yet.
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <div>
          <h3 className="text-2xl lg:text-3xl font-normal">Opening</h3>
          <p className="text-md text-muted-foreground mt-1">
            The student opens the assigned conversation and can mark it as complete.
          </p>
        </div>

        <div className={`flex flex-col lg:flex-row gap-4 ${geist.className}`}>
          <Card className="flex-1 bg-card border dark:border-2 shadow-lg">
            <CardHeader>
              <Badge className="w-fit">Tutor View</Badge>
            </CardHeader>
            <CardContent>
              <div className="border rounded-md bg-background">
                <div className="border-b p-3 text-lg font-medium">
                  Conversation Title
                </div>
                <div className="p-4 space-y-4">
                  <div className="flex gap-3">
                    <span className="font-semibold min-w-[60px]">
                      Hannah
                    </span>
                    <p>Wait, we're not even a proper conversation?</p>
                  </div>
                  <div className="flex gap-3">
                    <span className="font-semibold min-w-[60px]">
                      Mark
                    </span>
                    <p>Yeah, it's unfortunate, really.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="flex-1 bg-card border dark:border-2 shadow-lg">
            <CardHeader>
              <Badge variant="secondary" className="w-fit">
                Student View
              </Badge>
            </CardHeader>
            <CardContent>
              {conversationOpen ? (
                <div className="border rounded-md bg-background">
                  <div className="border-b p-3 text-lg font-medium">
                    Conversation Title
                  </div>
                  <div className="p-4 space-y-4">
                    <div className="flex gap-3">
                      <span className="font-semibold min-w-[60px]">
                        Hanna
                      </span>
                      <p>Wait, we're not even a proper conversation?</p>
                    </div>
                    <div className="flex gap-3">
                      <span className="font-semibold min-w-[60px]">
                        Mark
                      </span>
                      <p>Yeah, it's unfortunate, really.</p>
                    </div>
                  </div>
                  <div className="border-t p-3 flex justify-start">
                    <Badge
                      onClick={() => {
                        if (!markedComplete) {
                          setMarkedComplete(true);
                          toast.success("Marked as complete!");
                        }
                      }}
                      className={`cursor-pointer ${
                        markedComplete
                          ? "bg-green-500 text-white"
                          : ""
                      }`}
                      variant={"default"}
                    >
                      {markedComplete ? (
                        <div className="flex items-center gap-1">
                          Completed
                        </div>
                      ) : (
                        "Mark as Complete"
                      )}
                    </Badge>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  Open the conversation from the Assigning step above.
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <div>
          <h3 className="text-2xl lg:text-3xl font-normal">Tracking</h3>
          <p className="text-md text-muted-foreground mt-1">
            The tutor can track whether the student completed the assignment.
          </p>
        </div>

        <div className={`flex flex-col lg:flex-row gap-4 ${geist.className}`}>
          <Card className="flex-1 bg-card border dark:border-2 shadow-lg">
            <CardHeader>
              <Badge className="w-fit">Tutor View</Badge>
              <CardTitle className="text-lg">
                My Assigned Tasks
              </CardTitle>
              <CardDescription>Select a student to view their assigned conversations</CardDescription>
            </CardHeader>
            <CardContent>
              {assigned ? (
                <div className="border p-3 rounded-md">
                  <h4 className="font-semibold text-md">
                    Conversation Title
                  </h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    Level: B1
                  </p>
                  <Badge
                    variant={markedComplete ? "default" : "outline"}
                    className={`text-xs ${
                      markedComplete ? "bg-green-500 text-white" : ""
                    }`}
                  >
                    {markedComplete ? "Complete" : "Pending"}
                  </Badge>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  Assign a conversation first.
                </p>
              )}
            </CardContent>
          </Card>

          <Card className="flex-1 bg-card border dark:border-2 shadow-lg">
            <CardHeader>
              <Badge variant="secondary" className="w-fit">
                Student View
              </Badge>
              <CardTitle className="text-lg">My Assigned Tasks</CardTitle>
              <CardDescription>Your completed and pending tasks</CardDescription>
            </CardHeader>
            <CardContent>
              {assigned ? (
                <div className="border p-3 rounded-md">
                  <h4 className="font-semibold text-md">
                    Conversation Title
                  </h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    Level: B1
                  </p>
                  <Badge
                    variant={markedComplete ? "default" : "outline"}
                    className={`text-xs ${
                      markedComplete ? "bg-green-500 text-white" : ""
                    }`}
                  >
                    {markedComplete ? "Complete" : "Pending"}
                  </Badge>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  No assignments yet.
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
