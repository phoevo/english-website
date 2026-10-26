"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { BookOpen, BookMarked, IterationCcw, Home, UserRound, LogOut, LogIn } from "lucide-react";
import { account } from "@/data/appwrite";
import { useUserStore } from "@/data/useUserStore";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "./sidebar";

const items = [
  { title: "Home", url: "/home", icon: Home },
  { title: "Conversations", url: "/home/conversations", icon: BookOpen },
  { title: "Recents", url: "/home/recents", icon: IterationCcw },
  { title: "Dictionary", url: "/home/dictionary", icon: BookMarked },
];

export function AppSidebar() {
  const { user } = useUserStore();
  const pathname = usePathname();
  const router = useRouter();

  async function logout() {
    await account.deleteSession("current");
    await useUserStore.getState().fetchUser();
    router.push("/login");
  }

  return <Sidebar collapsible="icon" className="border-r bg-background">
    <SidebarHeader className="p-4">
      <Link href="/home" className="text-xl tracking-tight group-data-[collapsible=icon]:hidden">Synomilo</Link>
      <p className="text-xs text-muted-foreground group-data-[collapsible=icon]:hidden">Conversations, ready to teach.</p>
    </SidebarHeader>
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>Your library</SidebarGroupLabel>
        <SidebarMenu>
          {items.map(({ title, url, icon: Icon }) => <SidebarMenuItem key={url}>
            <SidebarMenuButton asChild closeOnSelectMobile tooltip={title} isActive={url === "/home" ? pathname === url : pathname.startsWith(url)}>
              <Link href={url} aria-current={(url === "/home" ? pathname === url : pathname.startsWith(url)) ? "page" : undefined}><Icon /><span>{title}</span></Link>
            </SidebarMenuButton>
          </SidebarMenuItem>)}
        </SidebarMenu>
      </SidebarGroup>
    </SidebarContent>
    <SidebarFooter className="border-t p-3">
      <SidebarMenu>
        <SidebarMenuItem><SidebarMenuButton asChild closeOnSelectMobile tooltip="Account"><Link href={user ? "/profile" : "/login"}><UserRound /><span>{user?.name || "Log in to save your progress"}</span></Link></SidebarMenuButton></SidebarMenuItem>
        {user ? <SidebarMenuItem><SidebarMenuButton onClick={logout} tooltip="Log out"><LogOut /><span>Log out</span></SidebarMenuButton></SidebarMenuItem> : <SidebarMenuItem><SidebarMenuButton asChild closeOnSelectMobile tooltip="Create account"><Link href="/register"><LogIn /><span>Create account</span></Link></SidebarMenuButton></SidebarMenuItem>}
      </SidebarMenu>
    </SidebarFooter>
  </Sidebar>;
}
