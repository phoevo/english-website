import React from "react"
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/ui/app-sidebar'
import { Geist } from "next/font/google";
import ChallengeWatcher from '@/data/ChallengeWatcher';


const geist = Geist({ subsets: ['latin'] });



function homeLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`flex h-screen w-auto ${geist.className}`}>
      <div className='flex h-auto w-auto'>
       <SidebarProvider
         defaultOpen={true}
         className="md:[--app-sidebar-width:10rem] lg:[--app-sidebar-width:16rem]"
         style={{ "--sidebar-width": "var(--app-sidebar-width, 16rem)" } as React.CSSProperties}
       >
      <AppSidebar />
      <main className="">
        <SidebarTrigger />
      </main>
    </SidebarProvider>
    </div>
      <div className='flex bg-background border-1 rounded-lg relative min-h-svm mb-4 overflow-y-auto lg:overflow-hidden w-screen'>
        <ChallengeWatcher/>
       {children}
      </div>

    </div>
  )
}

export default homeLayout
