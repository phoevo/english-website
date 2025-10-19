import { DM_Sans, Geist } from "next/font/google";
import Link from "next/link";
import posts from "./posts";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CircleArrowLeft } from "lucide-react";

const geist = Geist({ subsets: ['latin'] });
const dmSans = DM_Sans({ subsets: ['latin'] });

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <ScrollArea className="h-[100dvh] w-full lg:pr-10">
      <a href={"/"}>
        <p className={`${dmSans.className} flex flex-row items-center gap-1 absolute top-1 m-2 left-10 cursor-pointer hover:border-b border-foreground`}>
          <CircleArrowLeft size={15}/> Back to app</p>
      </a>
      <div className="flex flex-col lg:flex-row bg-muted/30 rounded-lg w-full p-4 lg:p-10 mx-auto gap-8 lg:pr-4">

       <aside className="lg:w-xs lg:sticky lg:top-11 self-start bg-card border rounded-lg p-4 space-y-6">
        <div>
          <h2 className={`font-semibold text-sm uppercase tracking-wide mb-3 ${dmSans.className}`}>Articles</h2>
          <ul className="space-y-2">
            {posts.map((post) => (
              <li key={post.slug} className={`${geist.className}`}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="text-muted-foreground hover:text-foreground"
                >
                  {post.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </aside>

      <main className="flex-1 min-w-0">

        <h1 className={`text-3xl lg:text-6xl flex items-center ${dmSans.className}`}>
          Synomilo Insights
          <span>

          </span>
        </h1>
        <div className={`text-lg lg:text-xl text-muted-foreground flex items-center ${dmSans.className}`}>
          Short articles on English fluency, conversation and teaching</div>
        <div className={`mt-6 bg-card border rounded-lg p-4 ${geist.className}`}>
          {children}
        </div>
      </main>
      </div>
    </ScrollArea>
  );
}
