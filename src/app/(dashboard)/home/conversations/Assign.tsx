"use client";
import React, { useEffect, useState } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { useUserStore } from "@/data/useUserStore";
import { Geist } from "next/font/google";
import { databases, databaseId, assignmentsId } from "@/data/appwrite";
import { ID, Query } from "appwrite";
import { toast } from "sonner";
import { Check, Send } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface AssignProps {
  conversationId: string;
  trigger: React.ReactNode;
}

const geist = Geist({ subsets: ["latin"] });

const Assign = ({ conversationId, trigger }: AssignProps) => {
  const [open, setOpen] = useState(false);
  const friends = useUserStore((state) => state.friends);
  const isSubscribed = useUserStore((state) => state.isSubscribed);
  const isTeacher = useUserStore((state) => state.isTeacher);
  const canAssign = isTeacher && isSubscribed;
  const studentFriends = friends.filter((f) => !f.isTeacher);
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [assignmentStatuses, setAssignmentStatuses] = useState<Record<string, "Pending" | "Completed">>({});

  // Fetch assigned students when popover opens
  useEffect(() => {
    async function fetchAssignedStudents() {
      if (!open) return;
      try {
        const res = await databases.listDocuments(
          databaseId,
          assignmentsId,
          [Query.equal("conversationId", conversationId)]
        );
        const statuses: Record<string, "Pending" | "Completed"> = {};
        for (const doc of res.documents) {
          statuses[doc.studentId] = doc.status;
        }
        setAssignmentStatuses(statuses);
      } catch (err) {
        console.error("Failed to fetch assigned students:", err);
      }
    }

    fetchAssignedStudents();
  }, [open, conversationId]);

  const handleAssign = async (studentId: string) => {
    const teacherId = useUserStore.getState().user?.$id;
    if (!teacherId) {
      toast.error("You must be logged in as a teacher to assign.");
      return;
    }
    if (!isTeacher) {
      toast.error("Only tutors can assign. Wait, how can you see this?");
      return;
    }
    if (!isSubscribed) {
      toast.info("Assigning requires a Pro account.");
      setOpen(false);
      return;
    }

    const response = await databases.listDocuments(
      databaseId,
      assignmentsId,
      [
        Query.equal("studentId", studentId),
        Query.equal("conversationId", conversationId),
      ]
    );

    const existing = response.documents[0];
    if (existing && existing.status === "Pending") {
      toast.info("This conversation is already assigned to the student.");
      return;
    }

    // Delete completed assignment before re-assigning
    if (existing && existing.status === "Completed") {
      await databases.deleteDocument(databaseId, assignmentsId, existing.$id);
    }

    setLoadingId(studentId);
    try {
      await databases.createDocument(databaseId, assignmentsId, ID.unique(), {
        studentId,
        teacherId,
        conversationId,
        status: "Pending",
      });

      toast.success("Assignment sent!");
      setAssignmentStatuses((prev) => ({ ...prev, [studentId]: "Pending" }));
      setLoadingId(null);
      setOpen(false);
    } catch (error) {
      console.error("Failed to assign conversation:", error);
      toast.error("Something went wrong.");
      setLoadingId(null);
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>{trigger}</PopoverTrigger>
      <PopoverContent
        side="bottom"
        align="start"
        className={`w-auto p-4 ${geist.className}`}
      >
        {!canAssign ? (
          <div className="space-y-2 max-w-[320px]">
            <p className="text-sm text-muted-foreground">
              {!isTeacher
                ? "Only tutors can assign conversations. Wait, how can you see this?"
                : "Assigning requires a Plus account."}
            </p>
          </div>
        ) : (
          <div className="space-y-2 max-h-100 w-auto overflow-y-auto">
            {studentFriends.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                No student friends found.
              </p>
            ) : (
              studentFriends.map((student) => {
                const status = assignmentStatuses[student.$id];
                const isPending = status === "Pending";
                const isCompleted = status === "Completed";
                return (
                  <div
                    key={student.$id}
                    className="flex justify-between gap-2 items-center border p-2 rounded-md"
                  >
                    <div>
                      <p className="font-sm">{student.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {student.email}
                      </p>
                    </div>
                    <Badge
                      className="text-xs cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (!canAssign || loadingId || isPending) return;
                        handleAssign(student.$id);
                      }}
                    >
                      {loadingId === student.$id ? (
                        <div className="flex flex-row gap-1 items-center">
                          Assigning...
                        </div>
                      ) : isPending ? (
                        <div className="flex flex-row gap-1 items-center">
                          <Check size={13} />
                          Assigned
                        </div>
                      ) : isCompleted ? (
                        <div className="flex flex-row gap-1 items-center">
                          <span className="text-green-500">Complete.</span> Reassign?
                        </div>
                      ) : (
                        <div className="flex flex-row gap-1 items-center">
                          <Send size={12} />
                          Assign
                        </div>
                      )}
                    </Badge>
                  </div>
                );
              }))
            }
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
};

export default Assign;
