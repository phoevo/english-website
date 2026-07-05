import Link from "next/link";
import { Button } from "@/components/ui/button";
import { DM_Sans } from "next/font/google";

const dmSans = DM_Sans({ subsets: ['latin'] });


export default function SubscribeCanceledPage() {

  return (
    <main className={`w-full h-screen flex flex-col items-center justify-center mx-auto p-6 space-y-4 ${dmSans.className}`}>
      <h1 className="text-3xl font-semibold text-red-500">Payment canceled</h1>
      <p className="text-muted-foreground text-center">
        You did not finish checking out. No payment has been made.
      </p>
      <Link href="/pricing">
        <Button variant="outline" className="cursor-pointer">Back to Pricing</Button>
      </Link>
    </main>
  );
}
