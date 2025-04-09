import Navbar from "@/components/ui/Navbar";
import { Montserrat, Raleway, Geist, Geist_Mono } from "next/font/google";


const raleway = Raleway({ subsets: ['latin'] });
const montserrat = Montserrat({ subsets: ['latin'] });
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${geistSans.className}`}>
      <Navbar />
      <main className="m-2">{children}</main>
    </div>
  );
}
