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

type AssignmentWithConversation = {
  $id: string;
  conversationId: string;
  status: "Pending" | "Completed";
  title: string;
  level: string;
  [key: string]: any;
};

function StudentPage() {
  const { user } = useUserStore();
  const [assignments, setAssignments] = useState<AssignmentWithConversation[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function fetchAssignmentsWithConversations() {
      if (!user) return;

      try {
        const assignmentRes = await databases.listDocuments(
          databaseId,
          assignmentsId,
          [Query.equal("studentId", user.$id)]
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

    fetchAssignmentsWithConversations();
  }, [user]);

  const handleMarkComplete = async (assignmentId: string) => {
  try {
    await databases.updateDocument(
      databaseId,
      assignmentsId,
      assignmentId,
      { status: "completed" }
    );

    setAssignments((prev) =>
      prev.map((a) =>
        a.$id === assignmentId ? { ...a, status: "Completed" } : a
      )
    );
  } catch (err) {
    console.error("Failed to update status:", err);
  }
};


  return (
    <Card className="bg-background">
      <CardHeader>
        <CardTitle>My Assigned Tasks</CardTitle>
        <CardDescription>Your tasks assigned by your teacher</CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <p>Loading...</p>
        ) : assignments.length === 0 ? (
          <p>No assignments yet.</p>
        ) : (
          <div className="space-y-3">
            {assignments.map((a) => (
  <div
    key={a.$id}
    className="flex justify-between items-center border p-4 rounded-md hover:bg-muted transition"
  >

    <div
      onClick={() => router.push(`conversations/${a.conversationId}`)}
      className="cursor-pointer"
    >
      <h4 className="font-semibold">{a.title}</h4>
      <p className="text-sm text-muted-foreground mb-1">Level: {a.level}</p>

     <Badge variant={a.status === "Completed" ? "default" : "outline"}>
      {a.status}
    </Badge>

    </div>

    {a.status === "Pending" && (
      <Badge
        onClick={() => handleMarkComplete(a.$id)}
        className="cursor-pointer"

      >
        Mark as Complete
      </Badge>
    )}
  </div>
))}

          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default StudentPage;
