"use client";

import React, { useEffect, useState } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from '@/components/ui/badge'
import {
  BadgePlus,
  BookOpen,
  BugOff,
  CircleArrowUp,
  Newspaper
} from 'lucide-react'
import { ScrollArea } from '@/components/ui/scroll-area'
import { listNewsDocuments, type NewsDocument } from '@/data/appwrite'


const TAGS: Record<string, { label: string; colorClass: string; icon: React.ReactNode }> = {
  news: { label: 'News', colorClass: 'bg-blue-500',   icon: <Newspaper /> },
  updates: { label: 'Updates', colorClass: 'bg-green-500', icon: <CircleArrowUp /> },
  conversations: { label: 'Conversations', colorClass: 'bg-orange-500', icon: <BookOpen /> },
  bugfixes: { label: 'Bug Fixes', colorClass: 'bg-foreground', icon: <BugOff /> },
  features:{ label: 'Features', colorClass: 'bg-pink-500', icon: <BadgePlus /> },
}

function resolveTagConfig(tagRaw?: string) {
  const key = (tagRaw || '').toLowerCase().replace(/[^a-z0-9]/g, '').trim()
  return TAGS[key] || { label: tagRaw || 'News', colorClass: 'bg-blue-500', icon: <Newspaper /> }
}

function formatDate(iso?: string) {
  if (!iso) return ''
  try {
    const d = new Date(iso)
    return d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })
  } catch {
    return ''
  }
}

function News() {
  const [loading, setLoading] = useState(true)
  const [items, setItems] = useState<NewsDocument[]>([])

  useEffect(() => {
    let mounted = true
    const run = async () => {
      setLoading(true)
      const docs = await listNewsDocuments()
      if (mounted) setItems(docs)
      setLoading(false)
    }
    run()
    return () => { mounted = false }
  }, [])

  return (
    <div className="h-full">
      <Card className="h-full bg-background overflow-y-auto">
        <CardHeader>
          <CardTitle className="text-xl">News and Updates</CardTitle>
          <CardDescription>
            News about updates, bug fixes, new features and content
          </CardDescription>
        </CardHeader>

        <ScrollArea className="flex flex-col m-0 max-h-[440px]">
          {loading ? (
            <CardContent className="py-2">
              <div className="border rounded-md p-3 text-sm text-muted-foreground">Loading news...</div>
            </CardContent>
          ) : items.length === 0 ? (
            <CardContent className="py-2">
              <div className="border rounded-md p-3 text-sm text-muted-foreground">No news yet.</div>
            </CardContent>
          ) : (
            items.map((doc) => {
              const cfg = resolveTagConfig(doc.tag)
              const date = formatDate(doc.$createdAt)
              const titleText = doc.title
              return (
                <CardContent key={doc.$id} className="py-2">
                  <div className="border rounded-md p-1">
                    <div className='flex flex-row items-center m-1'>
                      <Badge className={`relative text-background ${cfg.colorClass}`}>
                        {cfg.icon} {cfg.label}
                      </Badge>
                      {date && (
                        <span className="ml-2 text-muted-foreground text-xs underline">{date}</span>
                      )}
                    </div>
                    <div className="flex flex-col gap-1 mt-2 p-2 rounded-sm bg-muted text-sm">
                      {titleText && (
                        <p className="font-semibold">{titleText}</p>
                      )}
                      {doc.content && (
                        <p className="text-muted-foreground">{doc.content}</p>
                      )}
                    </div>
                  </div>
                </CardContent>
              )
            })
          )}
        </ScrollArea>
      </Card>
    </div>
  )
}

export default News;
