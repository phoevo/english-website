"use client";

import React, { useState } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { useUserStore } from "@/data/useUserStore";
import { Geist } from "next/font/google";

interface AssignProps {
  conversationId: string;
  trigger: React.ReactNode;
}

const geist = Geist({ subsets: ['latin'] });

const Assign = ({ conversationId, trigger }: AssignProps) => {
  const [open, setOpen] = useState(false);
  const friends = useUserStore((state) => state.friends);
  const studentFriends = friends.filter((f) => !f.isTeacher);

  const handleAssign = async (studentId: string) => {
    console.log(`Assigning ${conversationId} to student ${studentId}`);
    setOpen(false);
    // TODO: replace with your assign logic
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>{trigger}</PopoverTrigger>
      <PopoverContent side="bottom" align="start" className={`w-72 p-4 ${geist.className}`}>
        <div className="space-y-2 max-h-60 overflow-y-auto">
          {studentFriends.length === 0 ? (
            <p className="text-sm text-muted-foreground">No student friends found.</p>
          ) : (
            studentFriends.map((student) => (
              <div
                key={student.$id}
                className="flex justify-between items-center border p-2 rounded-md"
              >
                <div>
                  <p className="font-medium">{student.name}</p>
                  <p className="text-xs text-muted-foreground">{student.email}</p>
                </div>
                <Button size="sm" onClick={(e) => {
                    e.stopPropagation();
                    handleAssign(student.$id)
                  }}>
                  Assign
                </Button>
              </div>
            ))
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default Assign;
