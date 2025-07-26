"use client";
import React, { useEffect, useState } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { useUserStore } from "@/data/useUserStore";
import { Geist } from "next/font/google";
import { databases, databaseId, assignmentsId } from "@/data/appwrite";
import { ID, Query } from "appwrite";
import { toast } from "sonner";
import { Check, Plus, Send } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface AssignProps {
  conversationId: string;
  trigger: React.ReactNode;
}

const geist = Geist({ subsets: ["latin"] });

const Assign = ({ conversationId, trigger }: AssignProps) => {
  const [open, setOpen] = useState(false);
  const friends = useUserStore((state) => state.friends);
  const studentFriends = friends.filter((f) => !f.isTeacher);
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [assignedStudentIds, setAssignedStudentIds] = useState<string[]>([]);

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
        const ids = res.documents.map((doc) => doc.studentId);
        setAssignedStudentIds(ids);
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

    const response = await databases.listDocuments(
      databaseId,
      assignmentsId,
      [
        Query.equal("studentId", studentId),
        Query.equal("conversationId", conversationId),
      ]
    );

    if (response.documents.length > 0) {
      toast.info("This conversation is already assigned to the student.");
      return;
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
      setAssignedStudentIds((prev) => [...prev, studentId]);
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
        <div className="space-y-2 max-h-100 w-auto overflow-y-auto">
          {studentFriends.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              No student friends found.
            </p>
          ) : (
            studentFriends.map((student) => {
              const isAssigned = assignedStudentIds.includes(student.$id);
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
                      handleAssign(student.$id);
                    }}
                  >
                    {loadingId === student.$id ? (
                      <div className="flex flex-row gap-1 items-center">
                        Assigning...
                      </div>
                    ) : isAssigned ? (
                      <div className="flex flex-row gap-1 items-center">
                        <Check size={13} className="" />
                        Assigned
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
            })
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default Assign;
