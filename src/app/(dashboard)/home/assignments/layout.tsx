import { redirect } from "next/navigation";
import { legacyWorkflowsEnabled } from "@/lib/product";

export default function AssignmentsLayout({ children }: { children: React.ReactNode }) {
  if (!legacyWorkflowsEnabled) redirect("/home/conversations");
  return children;
}
