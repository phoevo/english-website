import AuthLoading from "@/components/auth/AuthLoading";
import { Suspense } from 'react'
import { ResetPasswordClient } from './ResetPasswordClient'

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<AuthLoading />}>
      <ResetPasswordClient />
    </Suspense>
  )
}
