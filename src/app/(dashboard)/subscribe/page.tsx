import { Suspense } from 'react'
import { SubscribeClient } from './SubscribeClient'

export default function SubscribePage() {
  return (
    <Suspense fallback={<div className="p-4 text-sm text-muted-foreground">Loading...</div>}>
      <SubscribeClient />
    </Suspense>
  )
}