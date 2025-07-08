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

type AssignmentWithConversation = {
  $id: string;
  conversationId: string;
  status: "pending" | "completed";
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

        // ✅ Check AFTER fetching
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
          <ul className="space-y-3">
            {assignments.map((a) => (
              <li
                onClick={() => router.push(`conversations/${a.conversationId}`)}
                className="cursor-pointer border p-4 rounded-md hover:bg-muted transition"
                key={a.$id}
              >
                <h4 className="font-semibold">{a.title}</h4>
                <p className="text-sm text-muted-foreground mb-1">Level: {a.level}</p>
                <p className="text-xs">Status: {a.status}</p>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}

export default StudentPage;
