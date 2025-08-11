import { motion } from 'framer-motion';
import React, { useState } from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { CornerRightUp } from 'lucide-react';
import { Geist } from "next/font/google";

const geist = Geist({ subsets: ['latin'] });

type MockAssignmentWithConversation = {
  $id: string;
  conversationId: string;
  status: "Pending" | "Completed";
  title: string;
  level: string;
};

function TestTeacherPage() {
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null);

  const dummyStudents = [
    { id: '1', name: 'Yuna', email: 'yunak33@example.com' },
    { id: '2', name: 'Mateo Alonso', email: 'malosno@example.com' },
  ];

  // Mock assignments data for each student
  const mockAssignments: Record<string, MockAssignmentWithConversation[]> = {
    '1': [
      {
        $id: 'assignment1',
        conversationId: 'conv1',
        status: 'Completed',
        title: 'Restaurant Ordering Conversation',
        level: 'B1'
      },
      {
        $id: 'assignment2',
        conversationId: 'conv2',
        status: 'Pending',
        title: 'Job Interview Practice',
        level: 'B2'
      },
      {
        $id: 'assignment3',
        conversationId: 'conv3',
        status: 'Completed',
        title: 'Travel Planning Discussion',
        level: 'B1'
      }
    ],
    '2': [
      {
        $id: 'assignment4',
        conversationId: 'conv4',
        status: 'Pending',
        title: 'Daily Routine Chat',
        level: 'A2'
      },
      {
        $id: 'assignment5',
        conversationId: 'conv5',
        status: 'Completed',
        title: 'Weather and Seasons',
        level: 'A2'
      }
    ]
  };

  const selectedStudentAssignments = selectedStudentId ? mockAssignments[selectedStudentId] || [] : [];

  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.1 }}
      className="w-full lg:w-2/3 bg-muted p-5 rounded-lg"
    >
      <Card className="bg-card w-auto h-100">
        <CardHeader className="flex flex-col gap-2">
          <div className="flex justify-between items-start">
            <div className="flex flex-col gap-2">
              <CardTitle className="text-lg">My Assigned Tasks</CardTitle>
              <CardDescription>Select a student to view their assigned conversations</CardDescription>
            </div>
            <div className="flex flex-col gap-1 items-end">

            </div>
          </div>

          <Select
            onValueChange={(value) => setSelectedStudentId(value)}
            value={selectedStudentId || ""}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Student" />
            </SelectTrigger>
            <SelectContent className={`${geist.className}`}>
              {dummyStudents.map((student) => (
                <SelectItem key={student.id} value={student.id}>
                  {student.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardHeader>

        <CardContent className="overflow-y-auto">
          {selectedStudentId ? (
            selectedStudentAssignments.length === 0 ? (
              <p className="text-muted-foreground text-sm">No assignments found for this student.</p>
            ) : (
              <ul className="space-y-2">
                {selectedStudentAssignments.map((assignment) => (
                  <li
                    className="cursor-pointer border p-3 rounded-md hover:bg-muted transition text-sm"
                    key={assignment.$id}
                  >
                    <h4 className="font-semibold text-sm">{assignment.title}</h4>
                    <p className="text-xs text-muted-foreground mb-1">Level: {assignment.level}</p>
                    <Badge
                      variant={assignment.status === "Completed" ? "default" : "outline"}
                      className={`text-xs ${assignment.status === "Completed" ? "bg-green-500 text-white" : ""}`}
                    >
                      {assignment.status}
                    </Badge>
                  </li>
                ))}
              </ul>
            )
          ) : (
            <p className="text-muted-foreground text-sm">Please select a student to view their assignments.</p>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default TestTeacherPage;
