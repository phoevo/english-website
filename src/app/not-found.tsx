  "use client";

  import Link from "next/link";
  import { Button } from "@/components/ui/button";
  import { FileQuestionIcon } from "lucide-react";
  import { DM_Sans } from "next/font/google";


  const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-geist", display: "swap" });


  export default function NotFound() {


    return (
      <div className={`flex flex-col items-center justify-center h-screen text-center px-4`}>
        <div className={`flex flex-col items-center mb-10 ${dmSans.className}`}>
          <FileQuestionIcon strokeWidth={1.5} className="w-20 h-20 text-muted-foreground mb-6" />
          <h1 className="text-4xl font-bold mb-2">Page Not Found</h1>
          <p className="text-muted-foreground mb-6">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
          <Link href="/home">
            <Button className="cursor-pointer" variant="default">Go Back Home</Button>
          </Link>


        </div>

      </div>
    );
  }
