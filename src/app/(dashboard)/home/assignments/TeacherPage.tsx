"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
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
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { toast } from "sonner";
import { Geist } from "next/font/google";
import { motion } from "motion/react";

const geist = Geist({ subsets: ["latin"] });

type AssignmentWithConversation = {
  $id: string;
  conversationId: string;
  status: "Pending" | "Completed";
  title: string;
  level: string;
};

type AssignmentDocument = {
  $id: string;
  conversationId: string;
  status: "Pending" | "Completed";
  studentId: string;
};

type ConversationDocument = {
  $id: string;
  title?: string;
  level?: string;
};

function TeacherPage() {
  const { friends } = useUserStore();
  const studentFriends = friends.filter((f) => !f.isTeacher);

  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(
    null
  );
  const [assignments, setAssignments] = useState<
    AssignmentWithConversation[]
  >([]);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleDeleteAssignment = async (assignmentId: string) => {
    try {
      await databases.deleteDocument(
        databaseId,
        assignmentsId,
        assignmentId
      );

      setAssignments((prev) => prev.filter((a) => a.$id !== assignmentId));
      toast.success("Assignment removed.");
    } catch (err) {
      console.error("Failed to delete assignment:", err);
      toast.error("Failed to remove assignment.");
    }
  };

  useEffect(() => {
    if (!selectedStudentId) return;

    async function fetchStudentAssignments() {
      setLoading(true);

      try {
        // 1. Fetch assignments
        const assignmentRes = await databases.listDocuments(
          databaseId,
          assignmentsId,
          [Query.equal("studentId", selectedStudentId)]
        );

        const assignmentDocs =
          assignmentRes.documents as unknown as AssignmentDocument[];

        if (assignmentDocs.length === 0) {
          setAssignments([]);
          return;
        }

        const conversationIds = assignmentDocs.map(
          (a) => a.conversationId
        );

        // 2. Fetch related conversations
        const conversationRes = await databases.listDocuments(
          databaseId,
          conversationsCollectionId,
          [Query.equal("$id", conversationIds)]
        );

        const conversationDocs =
          conversationRes.documents as unknown as ConversationDocument[];

        // 3. Merge data
        const enrichedAssignments: AssignmentWithConversation[] =
          assignmentDocs.map((a) => {
            const convo = conversationDocs.find(
              (c) => c.$id === a.conversationId
            );

            return {
              $id: a.$id,
              conversationId: a.conversationId,
              status: a.status,
              title: convo?.title ?? "Untitled",
              level: convo?.level ?? "Unknown",
            };
          });

        setAssignments(enrichedAssignments);
      } catch (err) {
        console.error("Failed to load assignments:", err);
        toast.error("Failed to load assignments.");
      } finally {
        setLoading(false);
      }
    }

    fetchStudentAssignments();
  }, [selectedStudentId]);

  return (
    <Card className="flex flex-col h-full lg:w-full bg-background">
      <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
        <div className="flex flex-col gap-4">
          <CardTitle>My Assigned Tasks</CardTitle>
          <CardDescription>
            Select a student to view their assigned conversations
          </CardDescription>
        </div>

        {studentFriends.length > 0 ? (
          <Select
            onValueChange={(value) => setSelectedStudentId(value)}
            value={selectedStudentId || ""}
          >
            <SelectTrigger className="w-1/3">
              <SelectValue placeholder="Select Student" />
            </SelectTrigger>
            <SelectContent className={geist.className}>
              {studentFriends.map((student) => (
                <SelectItem key={student.$id} value={student.$id}>
                  {student.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        ) : (
          <p className="text-sm text-muted-foreground">
            No students in connections.
          </p>
        )}
      </CardHeader>

      <CardContent className="flex-1 min-h-0 overflow-y-auto">
        {selectedStudentId ? (
          loading ? (
            <p>Loading...</p>
          ) : assignments.length === 0 ? (
            <p className="text-muted-foreground">
              No assignments found for this student.
            </p>
          ) : (
            <ul className="space-y-3">
              {assignments.map((a) => (
                <li
                  key={a.$id}
                  className="flex items-center justify-between border p-4 rounded-md hover:bg-muted transition"
                >
                  <div
                    onClick={() =>
                      router.push(`conversations/${a.conversationId}`)
                    }
                    className="cursor-pointer flex-1"
                  >
                    <h4 className="font-semibold">{a.title}</h4>
                    <p className="text-sm text-muted-foreground mb-1">
                      Level: {a.level}
                    </p>

                    <Badge
                      variant={
                        a.status === "Completed" ? "default" : "outline"
                      }
                      className={
                        a.status === "Completed"
                          ? "bg-green-500 text-white"
                          : ""
                      }
                    >
                      {a.status}
                    </Badge>
                  </div>

                  {a.status === "Completed" && (
                    <Button
                      variant="destructive"
                      size="icon"
                      className="ml-3 h-5 w-5 shrink-0"
                      onClick={() => handleDeleteAssignment(a.$id)}
                    >
                      <motion.div
                        whileHover={{ rotate: 90 }}
                        transition={{ duration: 0.1 }}
                      >
                        <X className="h-4 w-4" />
                      </motion.div>
                    </Button>
                  )}
                </li>
              ))}
            </ul>
          )
        ) : null}
      </CardContent>
    </Card>
  );
}

export default TeacherPage;