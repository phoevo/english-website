import AuthLoading from "@/components/auth/AuthLoading";
import { Suspense } from "react";
import OAuthCallbackContent from "./OAuthCallbackContent";

export default function Page() {
  return (
    <Suspense fallback={<AuthLoading />}>
      <OAuthCallbackContent />
    </Suspense>
  );
}
