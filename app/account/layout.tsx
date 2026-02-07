import Sidebar from "./components/Sidebar";

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-muted/30 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-6 max-w-6xl mx-auto">
          <Sidebar />
          <div className="flex-1">
            <div className="bg-card text-card-foreground rounded-lg shadow-md min-h-[500px] p-6">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
