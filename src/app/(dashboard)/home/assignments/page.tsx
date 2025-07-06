"use client";
import React, { useEffect, useState } from "react";
import { searchUsers, getUserById } from "@/data/appwrite";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useUserStore } from "@/data/useUserStore";
import Link from "next/link";
import UserGuidePopover from "../../userGuide";
import { ArrowRight, CheckCircle, Loader, Plus, } from "lucide-react";
import StudentPage from "./StudentPage";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Geist } from "next/font/google";
import { motion} from "motion/react";
import { toast } from "sonner";
import { fetchPendingRequests, hasPendingRequest, sendFriendRequest, updateRequestStatus, addFriend, deleteFriendRequest } from "@/data/friendRequests";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"



const geist = Geist({ subsets: ['latin'] });

function AssignmentsPage() {
  const { user, loading, friendsList, friends } = useUserStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [pendingRequests, setPendingRequests] = useState<
  { id: string; fromUserId: string; senderName: string }[]
>([]);
const [loadingRequestId, setLoadingRequestId] = useState<string | null>(null);


// const [friends, setFriends] = useState<any[]>([]);


  const handleSearch = async () => {
  setSearchLoading(true);
  const results = await searchUsers(searchQuery);
  const filteredResults = results.filter((u) => u.$id !== user?.$id);
  setSearchResults(filteredResults);
  setSearchLoading(false);
  setSearched(true);
};

// useEffect(() => {
//   async function loadFriends() {
//     if (!user?.friendsList || !Array.isArray(user.friendsList)) return;

//     try {
//       const data = await Promise.all(
//         user.friendsList.map(async (friendId: string) => {
//           try {
//             return await getUserById(friendId);
//           } catch (err) {
//             console.error(`Failed to fetch user ${friendId}:`, err);
//             return null;
//           }
//         })
//       );

//       setFriends(data.filter(Boolean));
//     } catch (err) {
//       console.error("Error loading friends:", err);
//     }
//   }

//   loadFriends();
// }, [user]);



useEffect(() => {
  async function loadRequests() {
    try {
      if (!user) return;

      const requests = await fetchPendingRequests(user.$id);

      const withNames = await Promise.all(
        requests.map(async (req) => {
          const sender = await getUserById(req.fromUserId);
          return {
            id: req.$id,
            fromUserId: req.fromUserId,
            senderName: sender.name || sender.email || "Unknown",
          };
        })
      );

      setPendingRequests(withNames);
    } catch (error) {
      console.error("Error loading pending requests:", error);
    }
  }

  loadRequests();
}, [user]);


  const handleAccept = async (requestId: string, fromUserId: string) => {
  try {
    if (!user) return;
    setLoadingRequestId(requestId);

    await updateRequestStatus(requestId, "accepted");

    await addFriend(user.$id, fromUserId);
    await addFriend(fromUserId, user.$id);
    await deleteFriendRequest(requestId);

    setPendingRequests((prev) => prev.filter((r) => r.id !== requestId));

    toast.success("Friend request accepted!");
  } catch (error) {
    console.error("Error accepting friend request:", error);
    toast.error("Something went wrong. Please try again.");
  } finally{
    setLoadingRequestId(null);
  }
};

  const handleDecline = async (requestId: string) => {
    try{
      setLoadingRequestId(requestId);
      await updateRequestStatus(requestId, "declined");
      await deleteFriendRequest(requestId);
      setPendingRequests((prev) => prev.filter((r) => r.id !== requestId));
  }
    catch (error) {
    toast.error("Failed to decline request.");
  } finally {
    setLoadingRequestId(null);
  }
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


    </div>

    <div className="grid grid-cols-2 gap-6 mt-10 w-full h-full">

      <StudentPage />

      <Card className="bg-background p-5 h-100 h-full">

  <div className="relative flex flex-col space-y-4 w-full">

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

    <PopoverContent align="start" side="bottom" className={`w-100 h-max-100 p-2 space-y-2 bg-background ${geist.className}`}>
       <Button
      variant="default"
      className="w-15 h-5 cursor-pointer"
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
              className="p-2 rounded-md border-1"
            >
              <div className="flex flex-row items-center justify-between">
                <div className="flex flex-col">
                  <div className="flex gap-2 items-center">
                  <span className="font-medium">{u.name || "N/A"}</span>
                  <Badge
                  className="text-xs h-5"
                  variant={u.isTeacher ? "default" : "secondary"}>
                    {u.isTeacher ? "Teacher" : "Student"}
                  </Badge>
              </div>
              <p className="text-sm text-muted-foreground">{u.email}</p>
              </div>

             <Button
              variant="secondary"
              size="icon"
              disabled={user.friendsList?.includes(u.$id)}
              className={`cursor-pointer h-5 w-5 self-center shadow-md ${
                user.friendsList?.includes(u.$id)
                  ? "bg-muted text-muted-foreground"
                  : "bg-green-500 hover:bg-green-600"
              }`}
              onClick={async (e) => {
                e.stopPropagation();
                e.preventDefault();

                if (!user) {
                  toast.error("You must be logged in to send a friend request.");
                  return;
                }

                if (user.$id === u.$id) {
                  toast.warning("You can't send a friend request to yourself.");
                  return;
                }

                if (user.friendsList?.includes(u.$id)) {
                  toast.info("You're already friends.");
                  return;
                }

                try {
                  const alreadySent = await hasPendingRequest(user.$id, u.$id);
                  if (alreadySent) {
                    toast.info("You've already sent a friend request to this user.");
                    return;
                  }

                  await sendFriendRequest(user.$id, u.$id);
                  toast.success(`Friend request sent to ${u.name || u.email}`);
                } catch (error) {
                  toast.error("Failed to send friend request. Please try again.");
                  console.error("Friend request error:", error);
                }
              }}
            >
              {user.friendsList?.includes(u.$id) ? (
                <motion.div animate={{ scale: 1 }} >
                  <CheckCircle className="h-4 w-4 text-muted-foreground" />
                </motion.div>
              ) : (
                <motion.div whileHover={{ rotate: 90 }} transition={{ duration: 0.1 }}>
                  <Plus className="h-4 w-4" />
                </motion.div>
              )}
            </Button>

            </div>
            </div>


          ))}
        </ul>
      )}
    </PopoverContent>
  </Popover>







  <div className="">
      <Tabs defaultValue="friends" className="w-full">
  <TabsList className="w-full">
    <TabsTrigger value="friends">Friends</TabsTrigger>
    <TabsTrigger value="requests">Requests</TabsTrigger>
  </TabsList>

  <TabsContent value="friends">
    <Card className="bg-muted flex flex-col p-2 border-none shadow-none">

  {friendsList.length === 0 ? (
    <p className="text-sm text-zinc-500">You have no friends yet.</p>
  ) : (

    <div className="rounded-md space-y-2">
      {friends.map((f) => (
        <div
          key={f.$id}
          className="flex bg-card justify-between p-4 rounded-lg bg-card shadow-sm"
        >
          <div className="flex flex-col gap-1">
            <div className="flex gap-2 items-center">
              <span className="font-semibold">{f.name || "Unnamed"}</span>

              {f.isSubscribed ? (
                <Badge className="text-foreground bg-pink-500 border-none">Pro</Badge>
              ) : (
                <Badge className="text-background bg-foreground border-none">Free</Badge>
              )}

              {f.streak !== undefined && (
                <Badge className="border-none">{f.streak}</Badge>
              )}

            <Badge variant={f.isTeacher ? "default" : "secondary"}>
              {f.isTeacher ? "Teacher" : "Student"}
            </Badge>

            </div>



            <span className="text-sm text-muted-foreground">{f.email}</span>
          </div>
        </div>
      ))}
    </div>
  )}
</Card>


  </TabsContent>


  <TabsContent value="requests">
  <Card className="bg-muted p-2 shadow-none border-none">
    {pendingRequests.length === 0 ? (
      <p className="text-sm text-zinc-500">No pending friend requests.</p>
    ) : (
      <div className="flex flex-col gap-2 rounded-md">
        {pendingRequests.map((request) => (
          <div key={request.id} className="flex bg-card justify-between items-center p-2 rounded-sm shadow-sm">
            <div>
              <span className="font-semibold">{request.senderName}</span> wants to add you.
            </div>
            <div className="flex flex-row items-center gap-2">
               {loadingRequestId === request.id ? (
                <Badge className="bg-green-500 h-5 w-13 text-muted-foreground">
                  <Loader className="bg-green-500 animate-spin text-background"/>
                </Badge>
                ) : (
              <Badge className="bg-green-500 hover:bg-green-600 cursor-pointer border-none"
              onClick={() => handleAccept(request.id, request.fromUserId)}
              >Accept
              </Badge>
              )}
              {/* <Button
                variant="secondary"
                size="icon"
                onClick={() => handleAccept(request.id, request.fromUserId)}
                className="cursor-pointer h-5 w-5 self-center shadow-md text-foreground bg-green-500 hover:bg-green-600"
              >
                 <motion.div whileHover={{ rotate: 90 }} transition={{ duration: 0.1 }}>
                  <Plus className="h-4 w-4" />
                </motion.div>
              </Button> */}



              <Badge className="bg-red-500 hover:bg-red-600 cursor-pointer border-none"
              onClick={() => handleDecline(request.id)}
              >
                Deny
              </Badge>
              {/* <Button
                variant="secondary"
                size='icon'
                onClick={() => handleDecline(request.id)}
                className="cursor-pointer h-5 w-5 self-center shadow-md text-foreground bg-red-500 hover:bg-red-600"
              >
                 <motion.div whileHover={{ rotate: 90 }} transition={{ duration: 0.1 }}>
                  <X className="h-4 w-4" />
                </motion.div>
              </Button> */}
            </div>
          </div>
        ))}
      </div>
    )}
  </Card>
</TabsContent>

</Tabs>
  </div>
</div>

      </Card>




    </div>
  </div>
);

}

export default AssignmentsPage;
