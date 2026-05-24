"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { useUserStore } from "@/data/useUserStore";
import {
  databaseId,
  databases,
  assignmentsId,
  conversationsCollectionId,
} from "@/data/appwrite";
import { Query } from "appwrite";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import {
  BookOpen,
  MoreHorizontal,
  Sparkles,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { motion } from "motion/react";
import { Geist } from "next/font/google";

const geist = Geist({ subsets: ['latin'] });


type AssignmentWithConversation = {
  $id: string;
  conversationId: string;
  status: "Pending" | "Completed";
  title: string;
  level: string;
  isPro: boolean;
  category?: string;
  description?: string;
  [key: string]: any;
};

function StudentPage() {
  const { user } = useUserStore();
  const [assignments, setAssignments] = useState<
    AssignmentWithConversation[]
  >([]);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    async function fetchAssignmentsWithConversations() {
      if (!user) return;

      try {
        const assignmentRes = await databases.listDocuments(
          databaseId,
          assignmentsId,
          [
            Query.equal("studentId", user.$id),
            Query.equal("status", "Pending"),
          ]
        );

        const assignments = assignmentRes.documents;

        const conversationIds = assignments.map(
          (a) => a.conversationId
        );

        if (conversationIds.length === 0) {
          setAssignments([]);
          setLoading(false);
          return;
        }

        const conversationRes = await databases.listDocuments(
          databaseId,
          conversationsCollectionId,
          [Query.equal("$id", conversationIds)]
        );

        const conversations = conversationRes.documents;

        const enrichedAssignments = assignments.map(
          (assignment) => {
            const convo = conversations.find(
              (c) => c.$id === assignment.conversationId
            );

            return {
              ...assignment,
              title: convo?.title || "Untitled",
              level: convo?.level || "Unknown",
              category: convo?.category || "General",
              description:
                convo?.description ||
                "Continue practicing your conversation skills.",
              isPro: convo?.isPro ?? false,
            };
          }
        );

        setAssignments(enrichedAssignments);
      } catch (err) {
        console.error("Failed to load assignments:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchAssignmentsWithConversations();
  }, [user]);

  const handleMarkComplete = async (
    assignmentId: string
  ) => {
    try {
      await databases.updateDocument(
        databaseId,
        assignmentsId,
        assignmentId,
        { status: "Completed" }
      );

      setAssignments((prev) =>
        prev.filter((a) => a.$id !== assignmentId)
      );
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  };

  return (
    <Card className="bg-background h-full w-full lg:w-full flex flex-col">
      <CardHeader>
        <CardTitle>My Assigned Tasks</CardTitle>
        <CardDescription>
          Your tasks assigned by your tutor
        </CardDescription>
      </CardHeader>

      <CardContent className="flex-1 min-h-0 p-0">
        <ScrollArea className="h-full px-5">
          {loading ? (
            <p>Loading...</p>
          ) : assignments.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <BookOpen
                className="text-muted-foreground mb-3"
                size={32}
              />

              <p className="font-medium">
                No assignments yet
              </p>

              <p className="text-sm text-muted-foreground">
                Your tutor assigned conversations will
                appear here.
              </p>
            </div>
          ) : (
            <div className="space-y-4 pb-5">
              {assignments.map((a) => (
                <motion.div
                  key={a.$id}
                  transition={{ duration: 0.15 }}
                  className="
                    group
                    rounded-xl
                    border
                    bg-background
                    p-4
                    transition-all
                  "
                >
                  <div className="flex justify-between gap-4">
                    <div className="flex gap-3 flex-1">

                      <div className="flex flex-col flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold text-base">
                            {a.title}
                          </h4>

                          {a.isPro && (
                            <Sparkles
                              size={15}
                              className="text-pink-500"
                            />
                          )}
                        </div>

                        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                          {a.description}
                        </p>

                        <div className="flex flex-wrap gap-2 mt-3">
                          <Badge variant="secondary">
                            {a.level}
                          </Badge>

                          <Badge variant="outline">
                            {a.category}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col items-end justify-between gap-3">
                      {/* Dropdown */}
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="opacity-70 hover:opacity-100 cursor-pointer"
                          >
                            <MoreHorizontal size={18} />
                          </Button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent align="end" className={`${geist.className}`}>
                          <DropdownMenuItem
                            className="cursor-pointer"
                            onClick={() =>
                              router.push(
                                `conversations/${a.conversationId}`)}>
                              Open
                          </DropdownMenuItem>

                          <DropdownMenuItem
                            className="cursor-pointer"
                            onClick={() => handleMarkComplete(a.$id)}>
                            Mark as Complete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>

                      <Button
                        className="cursor-pointer"
                        onClick={() =>
                          router.push(
                            `conversations/${a.conversationId}`)}>
                        <BookOpen />
                        Open
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}

export default StudentPage;