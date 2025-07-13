"use client";
import React from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Sword, Swords } from "lucide-react";
import { Geist } from "next/font/google";


const geist = Geist({ subsets: ['latin'] });


function getStreakBadgeClass(streak: number): string {
  if (streak >= 100) {
    return "bg-gradient-to-r from-red-500 via-orange-500 to-yellow-300 text-black rounded-full animate-gradient uneven-glow bg-clip-padding";
  } else if (streak >= 50) {
    return "bg-gradient-to-r from-red-500 via-purple-500 to-cyan-300 text-white rounded-full animate-gradient ring-1 ring-foreground bg-clip-padding";
  } else if (streak >= 30) {
    return "bg-gradient-to-r from-blue-600 via-pink-600 to-purple-600 text-white rounded-full animate-gradient bg-clip-padding";
  } else if (streak >= 10) {
    return "bg-gradient-to-r from-emerald-400 to-blue-600 text-white bg-clip-padding";
  } else if (streak >= 3) {
    return "bg-green-500 text-white";
  } else {
    return "bg-foreground text-background";
  }
}

const mockFriends = [
  {
    $id: "1",
    name: "Alice Johnson",
    email: "alice@example.com",
    isTeacher: false,
    isSubscribed: true,
    streak: 42,
    taskCount: 7,
    challengeCount: [1, 2],
  },
  {
    $id: "2",
    name: "Mr. Smith",
    email: "smith@school.edu",
    isTeacher: true,
    isSubscribed: false,
    streak: 12,
    taskCount: 15,
    challengeCount: [],
  },
];

const mockRequests = [
  {
    id: "req-1",
    fromUserId: "99",
    senderName: "John Doe",
  },
];

function TestFriends() {
  return (
    <div className="bg-muted p-5 rounded-lg">
    <Card className={`p-5 w-full h-auto bg-card shadow-md ${geist.className}`}>
      <Tabs defaultValue="friends" className="w-full">
        <TabsList className="w-full mb-4">
          <TabsTrigger value="friends">Connections</TabsTrigger>
          <TabsTrigger value="requests">Requests</TabsTrigger>
        </TabsList>

        {/* Friends Tab */}
        <TabsContent value="friends">
            <div className="space-y-3">
              {mockFriends.map((f) => (
                <div
                  key={f.$id}
                  className="flex flex-col bg-card border p-2 rounded-lg"
                >
                  <div className="flex flex-row justify-between">
                    <div className="space-y-1">
                      <Badge variant={f.isTeacher ? "default" : "secondary"}>
                        {f.isTeacher ? "Teacher" : "Student"}
                      </Badge>

                      <div className="text-sm text-muted-foreground">{f.email}</div>

                      <div className="flex flex-row gap-2">

                      <div className="flex flex-row border rounded-full p-1 gap-1">
                        {f.isSubscribed ? (
                        <Badge className="bg-pink-500 text-white">Pro</Badge>
                      ) : (
                        <Badge className="bg-foreground text-background">Free</Badge>
                      )}

                        {f.name}

                        {f.streak !== undefined && (
                        <Badge className={getStreakBadgeClass(f.streak)}>
                          {f.streak}
                        </Badge>
                      )}


                        </div>

                        <Badge className="p-2" variant="secondary">
                          <Sword className="rotate-45 mr-1" size={16} /> {f.taskCount || 0}
                        </Badge>
                        <Badge className="p-2">
                          <Swords className="mr-1" size={16} /> {f.challengeCount?.length || 0}
                        </Badge>
                      </div>

                    </div>


                  </div>


                </div>
              ))}
            </div>

        </TabsContent>

        {/* Requests Tab */}
        <TabsContent value="requests">
          {mockRequests.length === 0 ? (
            <p className="text-sm text-muted-foreground">No pending friend requests.</p>
          ) : (
            <div className="space-y-3">
              {mockRequests.map((req) => (
                <div
                  key={req.id}
                  className="flex justify-between items-center p-3 rounded-md border bg-card"
                >
                  <span className="text-sm">
                    <strong>{req.senderName}</strong> wants to add you.
                  </span>
                  <div className="flex gap-2">
                    <Badge className="bg-green-500 text-white cursor-pointer">Accept</Badge>
                    <Badge className="bg-red-500 text-white cursor-pointer">Deny</Badge>
                  </div>
                </div>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </Card>
    </div>
  );
}

export default TestFriends;
