"use client";
import React, { useEffect, useState } from "react";
import { searchUsers, getUserById } from "@/data/appwrite";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useUserStore } from "@/data/useUserStore";
import Link from "next/link";
import UserGuidePopover from "../../userGuide";
import { ArrowRight, CheckCircle, Ellipsis, Loader, Plus, SearchIcon, Sword, Swords, X, } from "lucide-react";
import StudentPage from "./StudentPage";
import TeacherPage from "./TeacherPage";
import { Badge } from "@/components/ui/badge";
import { Card} from "@/components/ui/card";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Geist, DM_Sans } from "next/font/google";
import { motion} from "motion/react";
import { toast } from "sonner";
import { fetchPendingRequests, hasPendingRequest, sendFriendRequest, updateRequestStatus, addFriend, deleteFriendRequest, removeFriend, addActiveStudent, removeActiveStudent } from "@/data/friendRequests";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area";
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";


const geist = Geist({ subsets: ['latin'] });
const dmSans = DM_Sans({ subsets: ['latin'] });

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

function AssignmentsPage() {
  const { user, loading, friendsList, friends, isTeacher, activeStudents, setActiveStudents, isSubscribed } = useUserStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const studentConnectionsCount = (friends || []).filter((f) => !f.isTeacher).length;
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
    catch {
    toast.error("Failed to decline request.");
  } finally {
    setLoadingRequestId(null);
  }
  };

  const handleRemoveConnection = async (friendId: string) => {
    if (!user) return;
    try {
      await removeFriend(user.$id, friendId);
      useUserStore.setState((state) => {
        const updatedFriendsList = (state.friendsList || []).filter((id) => id !== friendId);
        const updatedFriends = (state.friends || []).filter((f) => f.$id !== friendId);

        return {
          friendsList: updatedFriendsList,
          friends: updatedFriends,
          user: state.user ? { ...state.user, friendsList: updatedFriendsList } : state.user,
        };
      });
      toast.success("Connection removed.");
    } catch {
      // Error toast handled in removeFriend
    }
  };

  const handleRemoveActiveStudent = async (studentId: string) => {
    if (!user) return;
    try {
      await removeActiveStudent(user.$id, studentId);
      await setActiveStudents();
    } catch {
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
  <div className="m-5 lg:m-10 flex flex-col w-full h-5/6">

    <div className="flex flex-row justify-between items-center gap-10">
      <div className="flex flex-col space-y-6">
      <UserGuidePopover
        id="assignments-page"
        title="The Assignments Page"
        content={
          <div>
            The Assignments page is a shared workspace for both students and tutors,
            where teachers assign work and students can track and complete their work.
          </div>
        }
        side="top"
        align="start"
      >
        <h1 className={`text-3xl font-normal ${dmSans.className}`}>Assignments</h1>
      </UserGuidePopover>
        <p className="text-muted-foreground">A shared workspace for Students and Tutors.</p>
        </div>


    </div>

    <div className="flex flex-col lg:flex-row gap-6 mt-10 h-5/6">

      {isTeacher ? <TeacherPage/> : <StudentPage />}

      <Card className="bg-background p-5 h-full lg:w-1/2 flex flex-col min-h-0">

  <div className="relative flex flex-col space-y-4 w-full">

  <Popover open={searchLoading || searchResults.length > 0 || searched}>
    <PopoverTrigger asChild>
      <div className="flex flex-row gap-2">
        <Input
          id="search"
          placeholder="Find your Student or Tutor by username or email"
          className="bg-muted text-muted-foreground"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSearch();
          }}
        />
        <Button onClick={handleSearch} disabled={searchLoading}>
          <SearchIcon/>
        </Button>
      </div>
    </PopoverTrigger>

    <PopoverContent align="start" side="bottom" className={`w-100 h-max-100 p-2 space-y-2 bg-background ${geist.className}`}>
       <Button
        variant="default"
        size="icon"
        className="w-5 h-5 cursor-pointer bg-muted-foreground"
        onClick={() => {
          setSearchQuery("");
          setSearchResults([]);
          setSearched(false);
        }}
    >
      <X/>
    </Button>

      {searchLoading ? (
          <p className="text-sm text-muted-foreground">Searching...</p>
        ) : searchResults.length === 0 ? (
          <p className="text-sm text-muted-foreground">No results found.</p>
        ) : (
          <ul className="space-y-2">
          {searchResults.map((u) => (
            <ScrollArea
              key={u.$id}
              className="py-2 rounded-md border-1"
            >
              <div className="flex flex-row items-center justify-between">
                <div className="flex flex-col mx-1">
                  <div className="flex gap-2 items-center">
                  <span className="font-medium">{u.name || "N/A"}</span>
                  <Badge
                  className="text-xs h-5"
                  variant={u.isTeacher ? "outline" : "secondary"}>
                    {u.isTeacher ? "Teacher" : "Student"}
                  </Badge>
              </div>
              <p className="text-sm text-muted-foreground">{u.email}</p>
              </div>

             <Button
              variant="secondary"
              size="icon"
              disabled={
                user.friendsList?.includes(u.$id) ||
                (isTeacher && !isSubscribed && !u.isTeacher && studentConnectionsCount >= 2)
              }
              className={`cursor-pointer m-1 h-5 w-5 self-center shadow-md ${
                user.friendsList?.includes(u.$id) || (isTeacher && !isSubscribed && !u.isTeacher && studentConnectionsCount >= 2)
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
                  toast.warning("You can't send a request to yourself.");
                  return;
                }

                if (user.friendsList?.includes(u.$id)) {
                  toast.info("You're already connected");
                  return;
                }

                try {
                  const alreadySent = await hasPendingRequest(user.$id, u.$id);
                  if (alreadySent) {
                    toast.info("You've already sent a request to this user.");
                    return;
                  }

                  await sendFriendRequest(user.$id, u.$id);
                  toast.success(`Request sent to ${u.name || u.email}`);
                } catch (error) {
                  toast.error("Failed to send request. Please try again.");
                  console.error("Request error:", error);
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
            </ScrollArea>


          ))}
        </ul>
      )}
    </PopoverContent>
  </Popover>






  <div className="flex-1 min-h-0 flex flex-col">
      <Tabs defaultValue="connections" className="w-full">
  <TabsList className="w-full">
    <TabsTrigger value="connections">Connections</TabsTrigger>
    {/* {isTeacher && <TabsTrigger value="active">Active Students</TabsTrigger>} */}
    <TabsTrigger value="requests">Requests</TabsTrigger>
  </TabsList>

  <TabsContent value="connections">
    <Card className="bg-background flex flex-col p-2 border-none shadow-none h-full overflow-y-auto">

  {friendsList.length === 0 ? (
    <p className="text-sm text-muted-foreground">You have no connections yet.</p>
  ) : (

    <div className="rounded-md space-y-4">
      {friends.map((f) => (
        <div
          key={f.$id}
          className="flex bg-background items-center justify-between p-2 rounded-lg border-1 shadow-xs"
        >
          <div className="flex flex-col gap-1">

                <div>
                <Badge variant={f.isTeacher ? "outline" : "secondary"}>
                  {f.isTeacher ? "Teacher" : "Student"}
                </Badge>
                <span className="text-sm text-muted-foreground px-2">{f.email}</span>
                </div>
            <div className="flex gap-2 items-center mt-2">

              <div className="flex flex-row border-1 rounded-full p-1 h-8 shadow-xs">

              {f.isSubscribed ? (
                <Badge className="text-foreground bg-pink-500 border-none">Plus</Badge>
              ) : (
                <Badge className="text-background bg-foreground border-none">Free</Badge>
              )}


              <span className="font-normal px-2">{f.name || "Unnknown"}</span>

              {f.streak !== undefined && (
                <div className="flex justify-center">
                  <Badge className={getStreakBadgeClass(f.streak ?? 0)}>
                    {f.streak ?? 0}
                  </Badge>
                </div>
              )}

              </div>


            <Badge className="p-2" variant="secondary"> <Sword className="rotate-45"/> {f.taskCount || 0}</Badge>
            <Badge className="p-2"> <Swords/> {f.challengeCount?.length || 0}</Badge>

            </div>
          </div>


            <div className="flex flex-row">
              {/* {isTeacher && !f.isTeacher && (
                <Button
                  className="cursor-pointer flex h-4 items-center justify-center rounded-md border px-2 py-2.5 text-xs w-fit"
                  size={"icon"}
                  onClick={async () => {
                    if (!user) return;
                    await addActiveStudent(user.$id, f.$id);
                    await setActiveStudents();
                  }}
                  disabled={activeStudents?.includes(f.$id)}
                  variant={activeStudents?.includes(f.$id) ? "active" : "outline"}
                >
                  {activeStudents?.includes(f.$id) ? "Active" : "Set as Active"}
                </Button>
              )} */}
          <AlertDialog>
        <AlertDialogTrigger asChild>
          <div className="flex items-center gap-2">
           <Button
            variant="destructive"
            size="icon"
            className="ml-4 cursor-pointer h-5 w-5 self-center"
            >
            <motion.div whileHover={{ rotate: 90 }} transition={{ duration: 0.1 }}>
            <X className="h-4 w-4" />
            </motion.div>
           </Button>

          </div>
        </AlertDialogTrigger>


      <AlertDialogContent className={geist.className}>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure you want to remove this connection?</AlertDialogTitle>
          <AlertDialogDescription>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className='cursor-pointer'>Go back</AlertDialogCancel>



            <Button
            variant="destructive"
            onClick={() => handleRemoveConnection(f.$id)}
            className="cursor-pointer self-center"
            >
              Remove
           </Button>

        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
    </div>

        </div>
      ))}
    </div>
  )}
</Card>


  </TabsContent>


  <TabsContent value="requests">
  <Card className="shadow-none border-none bg-background h-full overflow-y-auto">
    {pendingRequests.length === 0 ? (
      <p className="text-sm text-muted-foreground">No pending friend requests.</p>
    ) : (
      <div className="flex flex-col gap-2 rounded-md">
        {pendingRequests.map((request) => (
          <div key={request.id} className="flex justify-between items-center p-3 rounded-sm border-1">
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

{isTeacher && (
  <TabsContent value="active">
    <Card className="bg-background flex flex-col p-2 border-none shadow-none h-full overflow-y-auto">
      {!activeStudents || activeStudents.length === 0 ? (
        <p className="text-sm text-muted-foreground">No active students yet.</p>
      ) : (
        <div className="rounded-md space-y-4">
          {friends
            .filter((f) => activeStudents?.includes(f.$id) && !f.isTeacher)
            .map((f) => (
              <div
                key={f.$id}
                className="flex bg-background items-center justify-between p-2 rounded-lg border-1 shadow-xs"
              >
                <div className="flex flex-col gap-1">
                  <div>
                    <Badge variant="secondary">Student</Badge>
                    <span className="text-sm text-muted-foreground px-2">{f.email}</span>
                  </div>
                  <div className="flex gap-2 items-center mt-2">
                    <div className="flex flex-row border-1 rounded-full p-1 h-8 shadow-xs">

              {f.isSubscribed ? (
                <Badge className="text-foreground bg-pink-500 border-none">Plus</Badge>
              ) : (
                <Badge className="text-background bg-foreground border-none">Free</Badge>
              )}

              <span className="font-normal px-2">{f.name || "Unknown"}</span>

                      {f.streak !== undefined && (
                <div className="flex justify-center">
                  <Badge className={getStreakBadgeClass(f.streak ?? 0)}>
                    {f.streak ?? 0}
                  </Badge>
                </div>
              )}

                    </div>
                    <Badge className="p-2" variant="secondary"> <Sword className="rotate-45"/> {f.taskCount || 0}</Badge>
                    <Badge className="p-2"> <Swords/> {f.challengeCount?.length || 0}</Badge>
                  </div>
                </div>
                <div className="flex flex-row">

          <AlertDialog>
        <AlertDialogTrigger asChild>
          <div className="flex items-center gap-2">
           <Button
            variant={"default"}
            className="ml-4 cursor-pointer flex h-4 items-center justify-center rounded-md border px-2 py-2.5 text-xs w-fit"
            >
            Set as Inactive
           </Button>

          </div>
        </AlertDialogTrigger>


      <AlertDialogContent className={geist.className}>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure you want to remove this active student?</AlertDialogTitle>
          <AlertDialogDescription>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className='cursor-pointer'>Go back</AlertDialogCancel>



            <Button
            variant="destructive"
            onClick={async () => handleRemoveActiveStudent(f.$id)}
            className="cursor-pointer self-center"
            >
              Yes
           </Button>

        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
    </div>
              </div>
            ))}
        </div>
      )}
    </Card>
  </TabsContent>
)}

</Tabs>
  </div>
</div>

      </Card>




    </div>
  </div>
);

}

export default AssignmentsPage;