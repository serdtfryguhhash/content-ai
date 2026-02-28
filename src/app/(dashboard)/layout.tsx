import Navbar from "@/components/layout/Navbar";
import DashboardSidebar from "@/components/layout/DashboardSidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="flex">
        <DashboardSidebar />
        <main className="flex-1 p-6 lg:p-8 overflow-auto min-h-[calc(100vh-4rem)]">
          {children}
        </main>
      </div>
    </div>
  );
}
