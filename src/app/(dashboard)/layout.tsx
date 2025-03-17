import Navbar from "@/components/ui/Navbar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Navbar />
      <main className="p-4">{children}</main>
    </div>
  );
}
