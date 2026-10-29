import React from "react"
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/ui/app-sidebar'
import { Geist } from "next/font/google";
import ChallengeWatcher from '@/data/ChallengeWatcher';


const geist = Geist({ subsets: ['latin'] });



function homeLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`flex h-[calc(100dvh-1rem)] min-h-0 w-full overflow-hidden ${geist.className}`}>
      <div className="flex h-full shrink-0">
        <SidebarProvider
          defaultOpen={true}
          className="h-full min-h-0 md:[--app-sidebar-width:10rem] lg:[--app-sidebar-width:16rem]"
          style={{ "--sidebar-width": "var(--app-sidebar-width, 16rem)" } as React.CSSProperties}
        >
          <AppSidebar />
          <main>
            <SidebarTrigger />
          </main>
        </SidebarProvider>
      </div>

      <div className="flex flex-1 min-w-0 h-full min-h-0 bg-background border rounded-lg relative overflow-hidden">
        <ChallengeWatcher />
        {children}
      </div>
    </div>
  );
}

export default homeLayout
