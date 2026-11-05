import { Check, LockKeyhole } from "lucide-react";

interface ConversationRowProps {
  title: string;
  level?: string;
  category?: string;
  description?: string;
  isPro?: boolean;
  isComplete?: boolean;
}

/** Row content shared by the conversation library and recents lists. */
export default function ConversationRow({ title, level, category, description, isPro, isComplete }: ConversationRowProps) {
  return <span className="flex min-w-0 flex-1 flex-col">
    <span className="flex items-center justify-between gap-3">
      <span className="flex min-w-0 items-center gap-2">
        <h2 className="truncate text-base font-medium leading-snug tracking-[-.02em]">{title}</h2>
        {isComplete && <span className="inline-flex shrink-0 text-green-500" title="Completed"><Check size={15} strokeWidth={2.5} aria-hidden="true" /><span className="sr-only">Completed</span></span>}
      </span>
      {isPro && <span className="inline-flex shrink-0 items-center gap-1.5 text-xs text-muted-foreground"><LockKeyhole size={13} aria-hidden="true" />Plus</span>}
    </span>
    <span className="mt-1 text-xs text-muted-foreground"><span className="text-foreground">{level}</span>{level && category ? " · " : ""}{category}</span>
    {description && <span className="mt-2 truncate text-sm text-muted-foreground">{description}</span>}
  </span>;
}
