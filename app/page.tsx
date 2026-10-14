import { Sidebar } from "@/components/sidebar";
import { currentUser } from "@/lib/data/feed";

export default function Home() {
  return (
    <div className="flex min-h-screen bg-cream">
      <Sidebar user={currentUser} />
      <main className="h-screen min-w-0 flex-1 overflow-y-auto" />
    </div>
  );
}
