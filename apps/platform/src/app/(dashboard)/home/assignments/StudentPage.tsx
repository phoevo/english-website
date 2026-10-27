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
import { Query, Models } from "appwrite";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { BookOpen, Check, ClipboardCheck, Sparkles } from "lucide-react";
import { motion } from "motion/react";

type Assignment = Models.Document & {
  conversationId: string;
  status: "Pending" | "Completed";
};

type Conversation = Models.Document & {
  title?: string;
  level?: string;
  category?: string;
  description?: string;
  isPro?: boolean;
};

type AssignmentWithConversation = {
  $id: string;
  conversationId: string;
  status: "Pending" | "Completed";
  title: string;
  level: string;
  category: string;
  description: string;
  isPro: boolean;
};

function StudentPage() {
  const { user } = useUserStore();
  const completeConversations = useUserStore(
    (state) => state.completeConversations
  );

  const router = useRouter();

  const [assignments, setAssignments] = useState<
    AssignmentWithConversation[]
  >([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const assignmentRes = await databases.listDocuments(
          databaseId,
          assignmentsId,
          [
            Query.equal("studentId", user.$id),
            Query.equal("status", "Pending"),
          ]
        );

        const fetchedAssignments = assignmentRes.documents as Assignment[];
        const conversationIds = fetchedAssignments.map(
          (a) => a.conversationId
        );

        if (conversationIds.length === 0) {
          setAssignments([]);
          return;
        }

        const conversationRes = await databases.listDocuments(
          databaseId,
          conversationsCollectionId,
          [Query.equal("$id", conversationIds)]
        );

        const conversations = conversationRes.documents as Conversation[];

        const merged: AssignmentWithConversation[] =
          fetchedAssignments.map((assignment) => {
            const convo = conversations.find(
              (c) => c.$id === assignment.conversationId
            );

            return {
              $id: assignment.$id,
              conversationId: assignment.conversationId,
              status: assignment.status,
              title: convo?.title ?? "Untitled",
              level: convo?.level ?? "Unknown",
              category: convo?.category ?? "General",
              description:
                convo?.description ??
                "Continue practicing your conversation skills.",
              isPro: convo?.isPro ?? false,
            };
          });

        setAssignments(merged);
      } catch (err) {
        console.error("Failed to load assignments:", err);
        toast.error("Failed to load assignments");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [user]);

  const handleMarkComplete = async (id: string) => {
    try {
      await databases.updateDocument(databaseId, assignmentsId, id, {
        status: "Completed",
      });

      toast.success("Assignment complete");

      setAssignments((prev) => prev.filter((a) => a.$id !== id));
    } catch (err) {
      console.error("Failed to mark assignment complete:", err);
      toast.error("Failed to mark assignment complete");
    }
  };

  return (
    <Card className="bg-background h-full flex flex-col">
      <CardHeader>
        <CardTitle>My Assigned Tasks</CardTitle>
        <CardDescription>Your tasks assigned by your tutor</CardDescription>
      </CardHeader>

      <CardContent className="flex-1 min-h-0 p-0">
        <ScrollArea className="max-h-140 overflow-auto px-5">
          {loading ? (
            <p>Loading...</p>
          ) : assignments.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <ClipboardCheck
                className="text-muted-foreground mb-3"
                size={32}
              />

              <p className="font-medium">No assignments yet</p>

              <p className="text-sm text-muted-foreground">
                Make sure you&apos;ve connected with your tutor and they have
                assigned you a conversation.
              </p>
            </div>
          ) : (
            <div className="space-y-4 pb-5">
              {assignments.map((assignment) => {
                const isComplete = completeConversations.includes(
                  assignment.conversationId
                );

                return (
                  <motion.div
                    key={assignment.$id}
                    className="rounded-xl border p-4"
                  >
                    <div className="flex justify-between gap-4">
                      <div className="flex flex-col flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold">
                            {assignment.title}
                          </h4>

                          {assignment.isPro && (
                            <Sparkles size={14} className="text-pink-500" />
                          )}
                        </div>

                        <p className="text-sm text-muted-foreground mt-1">
                          {assignment.description}
                        </p>

                        <div className="flex items-center gap-2 mt-3">
                          <Badge variant="secondary">
                            {assignment.level}
                          </Badge>
                          <Badge variant="outline">
                            {assignment.category}
                          </Badge>
                          {isComplete ? <Check size={20} className="text-green-500"/> : ""}
                        </div>
                      </div>

                      <div className="flex flex-col justify-end gap-2">
                        <Button
                        className="flex items-center gap-0 cursor-pointer h-10"
                          onClick={() =>
                            router.push(
                              `conversations/${assignment.conversationId}`
                            )
                          }
                        >
                          <BookOpen className="mr-2 h-4 w-4" />
                          Open
                        </Button>

                        <Button
                        className="cursor-pointer h-6 text-xs"
                        size={"sm"}
                        variant={"outline"}
                          onClick={() =>
                            handleMarkComplete(assignment.$id)}>
                          Mark as Complete
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}

export default StudentPage;