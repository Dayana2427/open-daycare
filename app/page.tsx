import { PostCard } from "@/components/post-card";
import { Sidebar } from "@/components/sidebar";
import { currentUser, posts } from "@/lib/data/feed";

function CameraIcon() {
  return (
    <svg
      width="19"
      height="19"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
      <circle cx="12" cy="13" r="4" />
    </svg>
  );
}

export default function Home() {
  return (
    <div className="flex min-h-screen bg-cream">
      <Sidebar user={currentUser} activeItem="feed" />

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

          <a
            href="#"
            className="mb-6 flex items-center gap-[14px] rounded-[18px] border border-border bg-surface px-[18px] py-[14px] shadow-[0_4px_14px_-10px_rgba(120,90,60,.4)]"
          >
            <span className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-coral-soft font-display text-[16px] font-semibold text-white">
              {currentUser.initial}
            </span>
            <span className="flex-1 text-[15px] text-muted">
              Compartí un momento…
            </span>
            <span className="flex h-[38px] w-[38px] items-center justify-center rounded-xl bg-coral-wash text-coral-bright">
              <CameraIcon />
            </span>
          </a>

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
