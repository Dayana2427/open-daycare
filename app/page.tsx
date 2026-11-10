import { CreatePostModal } from "@/components/create-post-modal";
import { PostCard } from "@/components/post-card";
import { Sidebar } from "@/components/sidebar";
import { currentUser, posts } from "@/lib/data/feed";

export default function Home() {
  return (
    <div className="flex min-h-screen bg-cream">
      <Sidebar
        user={currentUser}
        activeItem="feed"
        createPostTrigger={<CreatePostModal trigger="sidebar" />}
      />

      <main className="h-screen min-w-0 flex-1 overflow-y-auto">
        <div className="mx-auto w-full max-w-[760px] px-10 pt-[34px] pb-20">
          <header className="mb-6">
            <div className="mb-1 text-[12.5px] font-extrabold tracking-[.8px] text-coral-strong">
              GUARDERÍA · SALA SOLES
            </div>
            <h1 className="font-display text-[30px] font-semibold text-ink">
              {currentUser.greeting}
            </h1>
            <p className="mt-[5px] text-[14.5px] text-muted-dark">
              {currentUser.roomSummary}
            </p>
          </header>

          <CreatePostModal trigger="composer" />

          <div className="mb-[14px] flex items-center gap-[14px]">
            <span className="text-[12.5px] font-extrabold tracking-[.8px] text-label">
              PUBLICADO HOY
            </span>
            <span className="h-px flex-1 bg-divider" />
          </div>

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
