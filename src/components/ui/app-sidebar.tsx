import { BookOpen, BookMarked, ArrowUpRight } from "lucide-react"

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


// Menu items.
const items = [
  {
    title: "Recents",
    url: "/home/recents",
    icon: ArrowUpRight,
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
    <Sidebar className="w-60 h-auto mb-2 rounded-lg absolute">
      <SidebarContent className="">
        <SidebarGroup>
          <SidebarGroupLabel>Tabs</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
