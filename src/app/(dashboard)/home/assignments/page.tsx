"use client";
import React, { useState } from "react";
import { searchUsers } from "@/data/appwrite";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { useUserStore } from "@/data/useUserStore";
import Link from "next/link";
import UserGuidePopover from "../../userGuide";
import { ArrowRight } from "lucide-react";
import StudentPage from "./StudentPage";
import { Badge } from "@/components/ui/badge";

function AssignmentsPage() {
  const { user, loading } = useUserStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [searchLoading, setSearchLoading] = useState(false);

  const handleSearch = async () => {
    setSearchLoading(true);
    const results = await searchUsers(searchQuery);
    setSearchResults(results);
    setSearchLoading(false);
  };

  if (loading) {
    return (
      <div className="m-10 space-y-8">
        <Skeleton className="w-[300px] h-[32px]" />
      </div>
    );
  }

    if (!user) {
      return (
        <div className="m-10">
          <p>
            Please <Link href="/login" className="underline">log in</Link> or{" "}
            <Link href="/register" className="underline">create an account</Link> to access the Assignments page.
          </p>
        </div>
      );
    }


  return (
    <div className="m-10 flex flex-col">
      <div className="space-y-5">
        <UserGuidePopover
          id="assignments-page"
          title="The Assignments Page"
          description={
            <div>
              The Assignments page is a shared workspace for both students and teachers,
              where teachers assign work and students can track and complete their work.
              <div className="text-red-500">Set your role in Settings <ArrowRight className="inline w-4 h-4" /> Account.</div>
            </div>
          }
          side="top"
          align="start"
        >
          <h1 className="text-3xl font-light">Assignments</h1>
        </UserGuidePopover>
        <p className="text-zinc-500">A shared workspace for Students and Teachers.</p>
      </div>

      <div className="flex flex-col space-y-4 w-full h-full border-1 mt-10">
        <Label htmlFor="search">Search our database for your student or teacher. Username or email</Label>
        <div className="flex flex-row gap-2">
          <Input
            id="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button onClick={handleSearch} disabled={searchLoading}>
            {searchLoading ? "Searching..." : "Search"}
          </Button>
        </div>

        {searchResults.length > 0 && (
          <div className="space-y-2 m-2">
            <ul className="space-y-1">
              {searchResults.map((u) => (
                  <div key={u.$id} className="p-2 border rounded-md shadow-sm">
                    <Badge className="h-5" variant={u.isTeacher ? "default" : "outline"}>
                      {u.isTeacher ? "Teacher" : "Student"}
                    </Badge>

                   <div className="flex flex-row gap-2 mt-2 px-1">
                    <p>{u.name || "N/A"}</p>
                    <p className="text-zinc-500">{u.email}</p>
                   </div>
                  </div>
              ))}
            </ul>
          </div>
        )}
      </div>

      <StudentPage />
    </div>
  );
}

export default AssignmentsPage;
