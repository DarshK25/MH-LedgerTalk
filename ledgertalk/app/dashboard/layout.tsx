import Sidebar from "@/components/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      
      {/* Main Content */}
      <main style={{ flex: 1, padding: "20px" }}>
        {children}
      </main>
    </div>
  );
}
