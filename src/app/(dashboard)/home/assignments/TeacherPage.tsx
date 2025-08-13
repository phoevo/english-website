"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
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
import { Geist } from "next/font/google";

const geist = Geist({ subsets: ['latin'] });


type AssignmentWithConversation = {
  $id: string;
  conversationId: string;
  status: "Pending" | "Completed";
  title: string;
  level: string;
  [key: string]: any;
};

function TeacherPage() {
  const { friends } = useUserStore();
  const studentFriends = friends.filter((f) => !f.isTeacher);
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null);
  const [assignments, setAssignments] = useState<AssignmentWithConversation[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!selectedStudentId) return;

    async function fetchStudentAssignments() {
      setLoading(true);
      try {
        const assignmentRes = await databases.listDocuments(
          databaseId,
          assignmentsId,
          [Query.equal("studentId", selectedStudentId)]
        );

        const assignments = assignmentRes.documents;
        const conversationIds = assignments.map((a) => a.conversationId);

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

        const enrichedAssignments = assignments.map((assignment) => {
          const convo = conversations.find(
            (c) => c.$id === assignment.conversationId
          );

          return {
            ...assignment,
            title: convo?.title || "Untitled",
            level: convo?.level || "Unknown",
          };
        });

        setAssignments(enrichedAssignments);
      } catch (err) {
        console.error("Failed to load assignments:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchStudentAssignments();
  }, [selectedStudentId]);

  return (
    <Card className="flex flex-col h-full min-h-0 bg-background">
      <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">

        <div className="flex flex-col gap-4">
          <CardTitle>My Assigned Tasks</CardTitle>
          <CardDescription>Select a student to view their assigned conversations</CardDescription>
        </div>
        <Select
          onValueChange={(value) => setSelectedStudentId(value)}
          value={selectedStudentId || ""}

        >
          <SelectTrigger className="w-1/3">
            <SelectValue placeholder="Select Student" />
          </SelectTrigger>
          <SelectContent className={`${geist.className}`}>
            {studentFriends.map((student) => (
              <SelectItem key={student.$id} value={student.$id}>
                {student.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardHeader>

      <CardContent className="flex-1 min-h-0 overflow-y-auto">
      {selectedStudentId ? (
        loading ? (
          <p>Loading...</p>
        ) : assignments.length === 0 ? (
          <p className="text-muted-foreground">No assignments found for this student.</p>
        ) : (
          <ul className="space-y-3">
            {assignments.map((a) => (
              <li
                onClick={() => router.push(`conversations/${a.conversationId}`)}
                className="cursor-pointer border p-4 rounded-md hover:bg-muted transition"
                key={a.$id}
              >
                <h4 className="font-semibold">{a.title}</h4>
                <p className="text-sm text-muted-foreground mb-1">Level: {a.level}</p>
                 <Badge variant={a.status === "Completed" ? "default" : "outline"}
                        className={a.status === "Completed" ? "bg-green-500 text-white" : ""}>
                  {a.status}
                </Badge>
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
