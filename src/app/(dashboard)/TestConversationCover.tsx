import { motion } from 'framer-motion';
import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from '@/components/ui/badge';
import { CornerRightUp, Send, Check } from 'lucide-react';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Geist } from 'next/font/google';

const geist = Geist({ subsets: ["latin"] });

function TestConversationCover() {
  const [popoverOpen, setPopoverOpen] = useState(false);

  const dummyStudents = [
    { id: '1', name: 'Yuna', email: 'yunak33@example.com', assigned: true },
    { id: '2', name: 'Mateo Alonso', email: 'malosno@example.com', assigned: false },
  ];

  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.1 }}
      className="w-80 bg-muted p-5 rounded-lg"
    >
      <Card className="bg-card w-auto h-80">
        <CardHeader>
          <CardTitle className="flex justify-between items-start gap-2">
            <p className='w-auto'>Conversation Title</p>

            <div className="flex flex-col gap-1 items-end">
              <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
                <PopoverTrigger asChild>
                  <Badge className="cursor-pointer"><Send size={14} /> Assign</Badge>
                </PopoverTrigger>
                <PopoverContent className={`w-auto space-y-2 ${geist.className}`}>
                  {dummyStudents.map((student) => (
                    <div
                      key={student.id}
                      className="flex justify-between items-center border p-2 rounded-md"
                    >
                      <div>
                        <p className="text-sm font-medium">{student.name}</p>
                        <p className="text-xs text-muted-foreground">{student.email}</p>
                      </div>
                      <Badge className="text-xs cursor-default ml-3">
                        {student.assigned ? (
                          <div className="flex items-center gap-1">
                            <Check size={13} />
                            Assigned
                          </div>
                        ) : (
                          <div className="flex items-center gap-1">
                            <Send size={12} />
                            Assign
                          </div>
                        )}
                      </Badge>
                    </div>
                  ))}
                </PopoverContent>
              </Popover>

              <div className='flex flex-row justify-center w-auto'>
                <p className='text-sm font-normal w-1/2'>UI only Tutors will see</p>
                <CornerRightUp size={30} className='text-pink-500' />
              </div>
            </div>
          </CardTitle>
          <CardDescription className="border-b">B1</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Conversations will have short descriptions to help students and tutors quickly understand the context.
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default TestConversationCover;
