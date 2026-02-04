"use client"
import { BookOpen, BookMarked, IterationCcw, ClipboardCheck, MessageCirclePlus, HomeIcon, User, Swords, Sword, LogOut, UserRound, LogIn, ChevronDown } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import Link from "next/link"
import { DM_Sans } from "next/font/google";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/data/useUserStore";
import { account } from "@/data/appwrite";
import { Skeleton } from "./skeleton";
import DailyTasks from "@/app/(dashboard)/home/dailyTasks";
import { Button } from "./button";
import Challenges from "@/app/(dashboard)/home/Challenges";
import { Badge } from "./badge";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./hover-card";
import ModeToggle from "./ModeToggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const dmSans = DM_Sans({ subsets: ['latin'] });

function getStreakColor(streak: number) {
  if (streak >= 1 && streak <= 2) return "bg-foreground text-background";
  if (streak >= 3 && streak <= 9) return "bg-green-500 text-white";
  if (streak >= 10 && streak <= 29) return "bg-gradient-to-r from-emerald-400 to-blue-600 bg-clip-padding text-white ";
  if (streak >= 30 && streak <= 49)
    return "bg-gradient-to-r from-blue-600 via-pink-600 to-purple-600 text-white bg-clip-padding animate-gradient border-none ring-none";
  if (streak >= 50 && streak <= 99)
    return "bg-gradient-to-r from-red-500 via-purple-500 to-cyan-300 text-white bg-clip-padding rounded-full animate-gradient ring-1 ring-foreground";
  if (streak >= 100 && streak <= 1000)
    return "bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 text-black bg-clip-padding rounded-full animate-gradient-fire uneven-glow border-none";
  return "";
}



const items = [
  {
    title: "Recents",
    url: "/home/recents",
    icon: IterationCcw,
  },
  {
    title: "Conversations",
    url: "/home/conversations",
    icon: BookOpen,
  },
  {
    title: "Dictionary",
    url: "/home/dictionary",
    icon: BookMarked,
  },



]

export function AppSidebar() {

  const { user, loading, isSubscribed, setSubscribed, challengeCount, taskCount, streak } = useUserStore();
  const router = useRouter();

  const badgeColor = getStreakColor(streak);

   const handleLogout = async (): Promise<void> => {
      try {
        await account.deleteSession("current");
        router.push("/login");
      } catch (err) {
        console.error("Error logging out:", err);
      }
    };

  return (
    <Sidebar collapsible="icon" className="h-auto mb-2 rounded-lg absolute md:[--sidebar-width:10rem] lg:[--sidebar-width:16rem] bg-accent">
      <SidebarHeader className="p-1">
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>

        <div className="flex flex-col bg-muted rounded-md p-2 cursor-pointer">

          <div className="flex flex-row items-center gap-1">
          <p className="text-lg">
          {user ? user.name : "Guest"}
          </p>
          <HoverCard>
          <HoverCardTrigger asChild>
          <Badge
          className={`cursor-pointer ${badgeColor}`}
          aria-label={`Current streak: ${streak}`}>
            {streak}
          </Badge>
          </HoverCardTrigger>
          <HoverCardContent side="top" align="center" className={`${dmSans.className} w-auto text-xs`}>
            Your current daily streak
          </HoverCardContent>
        </HoverCard>
          </div>
          <p className="text-muted-foreground text-sm">{user ? user.email : ""}</p>
        </div>

          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-full bg-muted border-1">
            <DropdownMenuItem>
              <User/> Profile
            </DropdownMenuItem>
            <DropdownMenuItem>
              <span>Acme Inc</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>


      </SidebarHeader>
      <SidebarContent className={`${dmSans.className}`}>
        <SidebarGroup>
          <SidebarGroupContent className={`${dmSans.className}`}>
            <SidebarMenu>


                <SidebarMenuItem>
                  <SidebarMenuButton asChild tooltip="Home">
                    <Link href="/home">
                      <HomeIcon/>
                      <span>Home</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent >
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>App</SidebarGroupLabel>
          <SidebarGroupContent className={`${dmSans.className}`}>
            <SidebarMenu>

              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild tooltip={item.title}>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent >
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Classroom</SidebarGroupLabel>
          <SidebarGroupContent className={`${dmSans.className}`}>
            <SidebarMenu>

              <SidebarMenuItem key="Classroom">
                  <SidebarMenuButton asChild>
                    <Link href="/home/assignments" className="cursor-pointer">
                      <ClipboardCheck />
                      <span>Assignments</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>

            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Early Access</SidebarGroupLabel>
          <SidebarGroupContent className={`${dmSans.className}`}>
            <SidebarMenu>
              <SidebarMenuItem key="Classroom">
                  <SidebarMenuButton asChild>
                      <Link href="/home/feedback">
                      <MessageCirclePlus/>
                      <span className="">Feedback</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarFooter>
          <div className={`flex-col hidden md:flex lg:flex items-center md:gap-2 lg:gap-2`}>
           <div className="flex flex-col items-center sm:items-start gap-2 md:gap-2 text-sm md:text-sm">
              {loading ? (
                <Skeleton className="w-[56px] h-[18px] lg:h-[36px]" />
              ) : (
                <DailyTasks>
                  <Button
                    variant="secondary"
                    className="flex items-center justify-center cursor-pointer w-full shadow-sm md:rounded-full md:h-6 md:p-2 lg:rounded-sm lg:p-2 lg:h-auto lg:w-auto"
                  >
                    <Sword className="rotate-45" /> {taskCount}
                  </Button>
                </DailyTasks>
              )}

              {loading ? (
                <Skeleton className="w-[56px] h-[18px] lg:h-[36px]" />
              ) : (
                isSubscribed && (
                  <Challenges>
                    <Button
                    className="flex items-center justify-center cursor-pointer w-full md:rounded-full md:h-6 md:py-1 lg:rounded-sm lg:p-2 lg:h-auto lg:w-auto"
                    >
                      <Swords /> {challengeCount.length}
                    </Button>
                  </Challenges>
                )
              )}
            </div>



            {loading ? (
              <Skeleton className="w-10 lg:w-20 h-10 rounded-md" />
            ) : user ? (
            <SidebarMenuButton onClick={handleLogout} variant="outline" className="cursor-pointer flex items-center gap-2">
              <LogOut className="h-4 w-4" />
              <span className="hidden lg:inline">Logout</span>
            </SidebarMenuButton>
            ) : (

              <Link href={"/login"}>
              <SidebarMenuButton className="w-full">
                <LogIn/>
                <span className="cursor-pointer">Log in</span>
              </SidebarMenuButton>
              </Link>

            )}

              <span>

              <ModeToggle />
              </span>
          </div>
        </SidebarFooter>
      </SidebarContent>
    </Sidebar>
  )
}
