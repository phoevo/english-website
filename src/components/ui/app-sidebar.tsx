import { BookOpen, BookMarked, ArrowUpRight, GraduationCap, IterationCcw, Users, ClipboardCheck } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import Link from "next/link"
import { DM_Sans } from "next/font/google";

const dmSans = DM_Sans({ subsets: ['latin'] });



// Menu items.
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
  return (
    <Sidebar className="h-auto mb-2 rounded-lg absolute">
      <SidebarContent className="bg-background">
        <SidebarGroup>
          <SidebarGroupLabel>Explore</SidebarGroupLabel>
          <SidebarGroupContent className={`${dmSans.className}`}>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
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
                  <SidebarMenuButton asChild disabled>
                    <Link href="">
                      <ClipboardCheck />
                      <span>Coming soon</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>

            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
