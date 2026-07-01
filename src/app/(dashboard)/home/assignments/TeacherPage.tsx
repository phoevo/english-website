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
  notesCollectionId,
} from "@/data/appwrite";
import { ID, Query, Models } from "appwrite";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X, Plus, ArrowUpRight } from "lucide-react";
import { toast } from "sonner";
import { Geist } from "next/font/google";
import { motion } from "motion/react";
import Link from "next/link";
import { ScrollArea } from "@/components/ui/scroll-area";

const geist = Geist({ subsets: ["latin"] });

type AssignmentWithConversation = {
  $id: string;
  conversationId: string;
  status: "Pending" | "Completed";
  title: string;
  level: string;
};

type Note = {
  $id: string;
  tutorId: string;
  studentId: string;
  content: string;
  $createdAt: string;
};

type AssignmentDocument = Models.Document & {
  conversationId: string;
  status: "Pending" | "Completed";
  studentId: string;
};

type ConversationDocument = Models.Document & {
  title?: string;
  level?: string;
};

function TeacherPage() {
  const { user, friends } = useUserStore();
  const studentFriends = friends.filter((f) => !f.isTeacher);

  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(
    null
  );
  const [assignments, setAssignments] = useState<AssignmentWithConversation[]>([]);
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNoteText, setNewNoteText] = useState("");
  const [loading, setLoading] = useState(false);
  const [submittingNote, setSubmittingNote] = useState(false);

  const handleDeleteAssignment = async (assignmentId: string) => {
    try {
      await databases.deleteDocument(databaseId, assignmentsId, assignmentId);
      setAssignments((prev) => prev.filter((a) => a.$id !== assignmentId));
      toast.success("Assignment removed.");
    } catch (err) {
      console.error("Failed to delete assignment:", err);
      toast.error("Failed to remove assignment.");
    }
  };

  const handleCreateNote = async () => {
    const content = newNoteText.trim();
    if (!content || !user || !selectedStudentId) return;

    setSubmittingNote(true);
    try {
      const res = await databases.createDocument(
        databaseId,
        notesCollectionId,
        ID.unique(),
        {
          tutorId: user.$id,
          studentId: selectedStudentId,
          content,
        }
      );
      setNotes((prev) => [res as unknown as Note, ...prev]);
      setNewNoteText("");
      toast.success("Note added");
    } catch (err) {
      console.error("Failed to create note:", err);
      toast.error("Failed to add note");
    } finally {
      setSubmittingNote(false);
    }
  };

  const handleDeleteNote = async (noteId: string) => {
    try {
      await databases.deleteDocument(databaseId, notesCollectionId, noteId);
      setNotes((prev) => prev.filter((n) => n.$id !== noteId));
      toast.success("Note deleted");
    } catch (err) {
      console.error("Failed to delete note:", err);
      toast.error("Failed to delete note");
    }
  };

  // Fetch assignments AND notes when student changes
  useEffect(() => {
    if (!selectedStudentId || !user) return;

    const studentId = selectedStudentId;
    const tutorId = user.$id;

    async function fetchStudentData() {
      setLoading(true);

      try {
        // Fetch assignments and notes in parallel
        const [assignmentRes, notesRes] = await Promise.all([
          databases.listDocuments(databaseId, assignmentsId, [
            Query.equal("studentId", studentId),
          ]),
          databases.listDocuments(databaseId, notesCollectionId, [
            Query.equal("tutorId", tutorId),
            Query.equal("studentId", studentId),
            Query.orderDesc("$createdAt"),
          ]),
        ]);

        // Process assignments
        const assignmentDocs = assignmentRes.documents as AssignmentDocument[];

        if (assignmentDocs.length === 0) {
          setAssignments([]);
        } else {
          const conversationIds = assignmentDocs.map((a) => a.conversationId);
          const conversationRes = await databases.listDocuments(
            databaseId,
            conversationsCollectionId,
            [Query.equal("$id", conversationIds)]
          );
          const conversationDocs = conversationRes.documents as ConversationDocument[];

          setAssignments(
            assignmentDocs.map((a) => {
              const convo = conversationDocs.find((c) => c.$id === a.conversationId);
              return {
                $id: a.$id,
                conversationId: a.conversationId,
                status: a.status,
                title: convo?.title ?? "Untitled",
                level: convo?.level ?? "Unknown",
              };
            })
          );
        }

        // Process notes
        setNotes(notesRes.documents as unknown as Note[]);
      } catch (err) {
        console.error("Failed to load student data:", err);
        toast.error("Failed to load student data.");
      } finally {
        setLoading(false);
      }
    }

    fetchStudentData();
  }, [selectedStudentId, user]);

  return (
    <Card className={`flex flex-col lg:w-full h-full bg-background ${geist.className}`}>
      <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
        <div className="flex flex-col gap-2">
          <CardTitle>Student Overview</CardTitle>
          <CardDescription>
            Select a student to view assignments and notes
          </CardDescription>
        </div>

        {studentFriends.length > 0 ? (
          <Select
            onValueChange={(value) => {
              setSelectedStudentId(value);
              setNewNoteText("");
            }}
            value={selectedStudentId || ""}
          >
            <SelectTrigger className="w-1/3 cursor-pointer">
              <SelectValue placeholder="Select Student" />
            </SelectTrigger>
            <SelectContent className={`cursor-pointer ${geist.className}`}>
              {studentFriends.map((student) => (
                <SelectItem key={student.$id} value={student.$id} className="cursor-pointer">
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

      {selectedStudentId && (
        <CardContent className="flex-1 gap-5 min-h-0 flex flex-col">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <>
              {/* Assignments section */}
               <>
  {/* Assignments section */}
  <section className="rounded-lg border bg-background p-4">
    <div className="mb-3 flex items-center gap-1">
      <h3 className="font-semibold text-sm">Assigned Conversations</h3>
      <Badge variant="outline">{assignments.length}</Badge>
    </div>

    <ScrollArea className="min-h-[30px] h-[150px]">
      {assignments.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          No assignments for this student.
        </p>
      ) : (
        <ul className="space-y-2 pr-2">
          {assignments.map((a) => (
            <li
              key={a.$id}
              className="flex items-center justify-between rounded-md border bg-card p-3 transition "
            >
              <div className="flex flex-wrap items-center gap-2">
                <h4 className="font-semibold text-sm">{a.title}</h4>

                <Badge variant="outline">{a.level}</Badge>

                <Badge
                  variant={a.status === "Completed" ? "default" : "outline"}
                  className={
                    a.status === "Completed" ? "bg-green-500 text-white" : ""
                  }
                >
                  {a.status}
                </Badge>

                <Link href={`conversations/${a.conversationId}`} target="_blank">
                  <Button size="sm" variant="link" className="h-auto p-0 cursor-pointer">
                    Open <ArrowUpRight size={12} />
                  </Button>
                </Link>
              </div>

              {a.status === "Completed" && (
                <Button
                  variant="destructive"
                  size="icon"
                  className="ml-3 h-5 w-5 shrink-0 cursor-pointer"
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
      )}
    </ScrollArea>
  </section>

  {/* Notes section */}
  <section className="flex min-h-0 flex-1 flex-col rounded-lg border bg-muted p-4">
    <div className="mb-3 flex items-center gap-1">
      <h3 className="font-semibold text-sm">Notes</h3>
      <Badge variant="outline">{notes.length}</Badge>
    </div>

    <div className="mb-3 flex gap-2">
      <textarea
        placeholder="Write a note about this student..."
        value={newNoteText}
        onChange={(e) => setNewNoteText(e.target.value)}
        className="flex-1 h-[50px] resize-none rounded-md border bg-background px-3 py-2 text-sm shadow-xs placeholder:text-muted-foreground outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
      />

      <Button
        size="sm"
        className="self-end h-7 cursor-pointer gap-1"
        disabled={!newNoteText.trim() || submittingNote}
        onClick={handleCreateNote}
      >
        <Plus size={14} />
        {submittingNote ? "Saving..." : "Add"}
      </Button>
    </div>

    {notes.length === 0 ? (
      <p className="text-sm text-muted-foreground">
        No notes yet for this student.
      </p>
    ) : (
      <ScrollArea className="min-h-0 flex-1">
        <div className="space-y-2 pr-2">
          {notes.map((note) => (
            <div
              key={note.$id}
              className="flex items-start justify-between gap-2 rounded-md border bg-background p-3"
            >
              <div className="flex-1">
                <p className="text-xs text-muted-foreground">
                  {new Date(note.$createdAt).toLocaleDateString(undefined, {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </p>

                <p className="text-sm whitespace-pre-wrap">{note.content}</p>
              </div>

              <Button
                variant="destructive"
                size="icon"
                className="ml-4 h-5 w-5 cursor-pointer self-center"
                onClick={() => handleDeleteNote(note.$id)}
              >
                <motion.div
                  whileHover={{ rotate: 90 }}
                  transition={{ duration: 0.1 }}
                >
                  <X className="h-4 w-4" />
                </motion.div>
              </Button>
            </div>
          ))}
        </div>
      </ScrollArea>
    )}
  </section>
</>
            </>
          )}
        </CardContent>
      )}
    </Card>
  );
}

export default TeacherPage;
