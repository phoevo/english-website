import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/ui/app-sidebar'
import { Geist } from "next/font/google";
import ChallengeWatcher from '@/data/ChallengeWatcher';


const geist = Geist({ subsets: ['latin'] });



function homeLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`flex h-screen w-auto ${geist.className}`}>
      <div className='flex h-auto w-auto'>
       <SidebarProvider>
      <AppSidebar />
      <main>
        <SidebarTrigger />
      </main>
    </SidebarProvider>
    </div>
      <div className='flex bg-background border-1 rounded-lg h-auto mb-22 w-screen'>
        <ChallengeWatcher/>
       {children}
      </div>

    </div>
  )
}

export default homeLayout