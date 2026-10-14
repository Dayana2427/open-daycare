import { PostCard } from "@/components/post-card";
import { Sidebar } from "@/components/sidebar";
import { currentUser, posts } from "@/lib/data/feed";

export default function Home() {
  return (
    <div className="flex min-h-screen bg-cream">
      <Sidebar user={currentUser} />
      <main className="h-screen min-w-0 flex-1 overflow-y-auto">
        <div className="mx-auto w-full max-w-[760px] px-10 pt-[34px] pb-20">
          <div className="flex flex-col gap-4">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
