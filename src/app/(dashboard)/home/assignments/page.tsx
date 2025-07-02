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
import { ArrowRight, Plus } from "lucide-react";
import StudentPage from "./StudentPage";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Geist } from "next/font/google";
import { motion } from "motion/react";


const geist = Geist({ subsets: ['latin'] });

function AssignmentsPage() {
  const { user, loading } = useUserStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleSearch = async () => {
    setSearchLoading(true);
    const results = await searchUsers(searchQuery);
    setSearchResults(results);
    setSearchLoading(false);
    setSearched(true);
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
  <div className="m-10 flex flex-col w-full">

    <div className="flex flex-row justify-between items-center gap-10">
      <div className="flex flex-col space-y-5">
      <UserGuidePopover
        id="assignments-page"
        title="The Assignments Page"
        description={
          <div>
            The Assignments page is a shared workspace for both students and teachers,
            where teachers assign work and students can track and complete their work.
            <div className="text-red-500">
              Set your role in Settings <ArrowRight className="inline w-4 h-4" /> Account.
            </div>
          </div>
        }
        side="top"
        align="start"
      >
        <h1 className="text-3xl font-light">Assignments</h1>
      </UserGuidePopover>
        <p className="text-zinc-500">A shared workspace for Students and Teachers.</p>
        </div>

      <div>
        <div className="relative flex flex-col space-y-4 w-full max-w-md">
  <Label htmlFor="search">
    Search our database for your student or teacher. Username or email
  </Label>

  <Popover open={searchLoading || searchResults.length > 0 || searched}>
    <PopoverTrigger asChild>
      <div className="flex flex-row gap-2">
        <Input
          id="search"
          placeholder="Enter username or email"
          className="bg-muted"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSearch();
          }}
        />
        <Button onClick={handleSearch} disabled={searchLoading}>
          Search
        </Button>
      </div>
    </PopoverTrigger>

    <PopoverContent align="start" className={`w-90 p-2 space-y-2 bg-background ${geist.className}`}>
       <Button
      variant="outline"
      className="text-sm p-2 h-5 cursor-pointer"
      onClick={() => {
        setSearchQuery("");
        setSearchResults([]);
        setSearched(false);
      }}
    >
      Clear
    </Button>

      {searchLoading ? (
          <p className="text-sm text-muted-foreground">Searching...</p>
        ) : searchResults.length === 0 ? (
          <p className="text-sm text-muted-foreground">No results found.</p>
        ) : (
          <ul className="space-y-2">
          {searchResults.map((u) => (
            <div
              key={u.$id}
              className="p-2 border rounded-md bg-muted"
            >
              <div className="flex flex-row items-center justify-between">
                <div className="flex flex-col">
                  <div className="flex gap-2 items-center">
                  <span className="font-medium">{u.name || "N/A"}</span>
                  <Badge
                  className="text-xs h-5"
                  variant="default">
                    {u.isTeacher ? "Teacher" : "Student"}
                  </Badge>
              </div>
              <p className="text-sm text-muted-foreground">{u.email}</p>
              </div>

              <Button
                  variant="secondary"
                  size="icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                  }}
                  className="cursor-pointer h-5 w-5 self-center bg-green-500 hover:bg-green-500"
                >
                  <motion.div whileHover={{ rotate: 90 }} transition={{ duration: 0.1 }}>
                    <Plus className="h-4 w-4" />
                  </motion.div>
                </Button>
            </div>
            </div>


          ))}
        </ul>
      )}
    </PopoverContent>
  </Popover>
</div>

      </div>

    </div>

    <div className="grid grid-cols-2 gap-6 mt-10 w-full">

      <StudentPage />


<Card className='bg-background p-2'>




        <CardHeader>
          <CardTitle>My Teachers</CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>
        <CardContent>
          <p>Card Content</p>
        </CardContent>


      </Card>



    </div>
  </div>
);

}

export default AssignmentsPage;
