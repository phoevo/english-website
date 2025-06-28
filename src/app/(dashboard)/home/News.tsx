import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from '@/components/ui/badge'
import {
  ArrowBigUpDashIcon,
  BadgePlus,
  BookOpen,
  BugOff,
  CircleArrowUp,
  Newspaper
} from 'lucide-react'
import { ScrollArea } from '@/components/ui/scroll-area'
import Link from 'next/link'

const newsItems = [
  {
    type: "Conversations",
    icon: <BookOpen/>,
    color: "bg-orange-500",
    date: "June 11, 2025",
    content: (
      <div>
        <p className="font-semibold">Conversation Title</p>
        <p className="text-zinc-500">B1</p>
      </div>
    )
  },
  {
    type: "News",
    icon: <Newspaper/>,
    color: "bg-blue-500",
    date: "June 11, 2025",
    content: "10,000 sign ups! Thank you!"
  },
  {
    type: "Updates",
    icon: <CircleArrowUp />,
    color: "bg-green-500",
    date: "June 11, 2025",
    content: (
      <div className="flex space-x-1">
        <Link href="home/learn" className="underline">Study</Link>
        <span>Page re-design</span>
      </div>
    )
  },
  {
    type: "Bug Fixes",
    icon: <BugOff />,
    color: "bg-foreground",
    date: "June 11, 2025",
    content: "Fixed words not saving correctly"
  },
  {
    type: "Features",
    icon: <BadgePlus/>,
    color: "bg-pink-500",
    date: "June 11, 2025",
    content: (
      <div>
        <h1 className="font-medium">Leaderboard feature</h1>
        <ul className="list-disc px-3">
          <li>Compare statistics to other Synomilo users.</li>
          <li>Top 100 learners receive bonuses</li>
        </ul>
      </div>
    )
  },
]

function News() {
  return (
    <div className="h-auto">
      <Card className="h-full bg-background overflow-y-auto">
        <CardHeader>
          <CardTitle className="text-xl">News and Updates</CardTitle>
          <CardDescription>
            News about updates, bug fixes, new features and content
          </CardDescription>
        </CardHeader>

        <ScrollArea className="flex flex-col m-0 max-h-[440px]">
          {newsItems.map((item, index) => (
            <CardContent key={index} className="py-2">
              <div className="border rounded-md p-1">
                <div className='flex flex-row items-center m-1'>
                  <Badge className={`relative ${item.color}`}>
                    {item.icon} {item.type}
                  </Badge>
                  {item.date && (
                    <span className="ml-2 text-zinc-500 text-xs underline">{item.date}</span>
                  )}
                </div>
                <div className="flex flex-start mt-2 p-2 rounded-sm bg-muted text-sm">
                  {item.content}
                </div>
              </div>
            </CardContent>
          ))}
        </ScrollArea>
      </Card>
    </div>
  )
}

export default News;
