import { LoaderCircle } from "lucide-react";

/** Pink spinner for authentication flows; inline mode fits submit buttons. */
export default function AuthLoading({ inline = false }: { inline?: boolean }) {
  return (
    <span role="status" aria-live="polite" className={inline ? "inline-flex items-center justify-center" : "inline-flex flex-col items-center justify-center gap-2"}>
      <LoaderCircle aria-hidden="true" className="size-6 animate-spin text-pink-500 motion-reduce:animate-none" />
      <span className={inline ? "sr-only" : "text-sm text-muted-foreground"}>Loading...</span>
    </span>
  );
}
