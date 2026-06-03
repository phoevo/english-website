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
  const router = useRouter();

  const [assignments, setAssignments] = useState<AssignmentWithConversation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
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

        const assignments = assignmentRes.documents as Assignment[];

        const conversationIds = assignments.map((a) => a.conversationId);

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

        const merged: AssignmentWithConversation[] = assignments.map((a) => {
          const convo = conversations.find(
            (c) => c.$id === a.conversationId
          );

          return {
            $id: a.$id,
            conversationId: a.conversationId,
            status: a.status,

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
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [user]);

  const handleMarkComplete = async (id: string) => {
    try {
      await databases.updateDocument(
        databaseId,
        assignmentsId,
        id,
        { status: "Completed" }
      );

      setAssignments((prev) => prev.filter((a) => a.$id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Card className="bg-background h-full flex flex-col">
      <CardHeader>
        <CardTitle>My Assigned Tasks</CardTitle>
        <CardDescription>Your tasks assigned by your tutor</CardDescription>
      </CardHeader>

      <CardContent className="flex-1 min-h-0 p-0">
        <ScrollArea className="h-full px-5">
          {loading ? (
            <p>Loading...</p>
          ) : assignments.length === 0 ? (
            <p className="text-muted-foreground text-center py-10">
              No assignments yet
            </p>
          ) : (
            <div className="space-y-4 pb-5">
              {assignments.map((a) => (
                <motion.div
                  key={a.$id}
                  className="rounded-xl border p-4"
                >
                  <div className="flex justify-between gap-4">
                    <div className="flex flex-col flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold">{a.title}</h4>

                        {a.isPro && (
                          <Sparkles size={14} className="text-pink-500" />
                        )}
                      </div>

                      <p className="text-sm text-muted-foreground mt-1">
                        {a.description}
                      </p>

                      <div className="flex gap-2 mt-3">
                        <Badge variant="secondary">{a.level}</Badge>
                        <Badge variant="outline">{a.category}</Badge>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-2">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal size={18} />
                          </Button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent align="end" className={geist.className}>
                          <DropdownMenuItem
                            onClick={() =>
                              router.push(
                                `/conversations/${a.conversationId}`
                              )
                            }
                          >
                            Open
                          </DropdownMenuItem>

                          <DropdownMenuItem
                            onClick={() => handleMarkComplete(a.$id)}
                          >
                            Mark as Complete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>

                      <Button
                        onClick={() =>
                          router.push(`conversations/${a.conversationId}`)
                        }
                      >
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