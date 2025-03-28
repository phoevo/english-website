"use client"

import ModeToggle from "@/components/ui/ModeToggle";


export default function AuthLayout({ children }: { children: React.ReactNode }){

  return(
    <div className="flex w-screen h-screen bg-red-500">
      <div className="absolute top-5 right-5 z-1">
        <ModeToggle/>
      </div>

      <div className="flex justify-center items-center w-1/2 h-screen bg-foreground hover:w-2/3 transition-all duration-500 ease-in-out">
      <div className="flex justify-center items-center h-100 w-100 rounded-xl bg-red-500">Images showing app</div>
      </div>

      <div className="flex justify-center items-center w-1/2 h-screen bg-background hover:w-2/3 transition-all duration-500 ease-in-out">
        <div className="flex justify-center items-center border 1 rounded-lg w-150 h-200">
          {children}


        </div>

      </div>



    </div>
  );
}