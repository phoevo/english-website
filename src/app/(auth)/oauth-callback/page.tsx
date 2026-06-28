import { Suspense } from "react";
import OAuthCallbackContent from "./OAuthCallbackContent";

export default function Page() {
  return (
    <Suspense fallback={<div>Signing in...</div>}>
      <OAuthCallbackContent />
    </Suspense>
  );
}