import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/ui/app-sidebar'
import { Raleway } from "next/font/google";


const raleway = Raleway({ subsets: ['latin'] });


function homeLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`flex h-500 w-auto h-auto ${raleway}`}>
      <div className='flex h-auto w-auto'>
       <SidebarProvider>
      <AppSidebar />
      <main>
        <SidebarTrigger />
      </main>
    </SidebarProvider>
    </div>
      <div className='flex bg-background border-1 rounded-lg h-auto w-screen mb-22'>
       {children}
      </div>

    </div>
  )
}

export default homeLayout
