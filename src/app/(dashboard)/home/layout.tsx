import React from "react"
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/ui/app-sidebar'
import { Geist } from "next/font/google";
import ChallengeWatcher from '@/data/ChallengeWatcher';


const geist = Geist({ subsets: ['latin'] });



function homeLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`flex h-screen w-full overflow-hidden ${geist.className}`}>
      <div className="flex h-full shrink-0">
        <SidebarProvider
          defaultOpen={true}
          className="md:[--app-sidebar-width:10rem] lg:[--app-sidebar-width:16rem]"
          style={{ "--sidebar-width": "var(--app-sidebar-width, 16rem)" } as React.CSSProperties}
        >
          <AppSidebar />
          <main>
            <SidebarTrigger />
          </main>
        </SidebarProvider>
      </div>

      <div className="flex flex-1 min-w-0 h-[calc(100vh-1rem)] min-h-0 mb-4 bg-background border rounded-lg relative overflow-hidden">
        <ChallengeWatcher />
        {children}
      </div>
    </div>
  );
}

export default homeLayout
