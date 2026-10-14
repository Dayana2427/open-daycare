import type { Post, PostKind } from "@/lib/data/feed";

interface PostCardProps {
  post: Post;
}

const kindLabels: Record<PostKind, string> = {
  achievement: "LOGRO",
  activity: "ACTIVIDAD",
  announcement: "ANUNCIO",
};

const kindStyles: Record<
  PostKind,
  { badge: string; dot: string; avatar: string }
> = {
  achievement: {
    badge: "bg-[#CFEBD8] text-[#3E9B6C]",
    dot: "bg-[#3E9B6C]",
    avatar: "bg-avatar-sky text-avatar-sky-ink",
  },
  activity: {
    badge: "bg-[#C7E7F1] text-[#2E89A6]",
    dot: "bg-[#2E89A6]",
    avatar: "bg-avatar-sky text-avatar-sky-ink",
  },
  announcement: {
    badge: "bg-[#CCD8F4] text-[#4E72C8]",
    dot: "bg-[#4E72C8]",
    avatar: "bg-[#CCD8F4] text-[#4E72C8]",
  },
};

function HeartIcon() {
  return (
    <svg
      width="19"
      height="19"
      viewBox="0 0 24 24"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21.2l7.8-7.8 1-1a5.5 5.5 0 0 0 0-7.8z" />
    </svg>
  );
}

function CommentIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8z" />
    </svg>
  );
}

function MegaphoneIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m3 11 18-5v12L3 14v-3zM11.6 16.8a3 3 0 1 1-5.8-1.6" />
    </svg>
  );
}

function PhotoIcon() {
  return (
    <svg
      width="30"
      height="30"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <circle cx="9" cy="9" r="2" />
      <path d="m21 15-3.6-3.6a2 2 0 0 0-2.8 0L6 21" />
    </svg>
  );
}

export function PostCard({ post }: PostCardProps) {
  const styles = kindStyles[post.kind];

  return (
    <article className="rounded-[20px] border border-border bg-surface px-[22px] py-5 shadow-[0_4px_16px_-12px_rgba(120,90,60,.5)]">
      <header className="mb-[14px] flex items-center gap-3">
        <span
          className={`flex h-11 w-11 flex-none items-center justify-center rounded-full font-display text-[17px] font-semibold ${styles.avatar}`}
        >
          {post.kind === "announcement" ? <MegaphoneIcon /> : post.authorInitial}
        </span>
        <span className="flex-1">
          <span className="block font-display text-[16.5px] font-semibold text-ink">
            {post.authorName}
          </span>
          <span className="block text-[12.5px] text-muted">
            {post.time} · publicado por vos
          </span>
        </span>
        <span
          className={`flex items-center gap-[7px] rounded-full px-3 py-[6px] ${styles.badge}`}
        >
          <span className={`h-2 w-2 rounded-full ${styles.dot}`} />
          <span className="text-[12px] font-extrabold tracking-[.5px]">
            {kindLabels[post.kind]}
          </span>
        </span>
      </header>

      <div className="mb-[10px] text-[12.5px] text-muted">{post.audience}</div>

      <p className="text-[15.5px] leading-[1.55] text-body">{post.body}</p>

      {post.photoLabel !== undefined && (
        <a
          href="#"
          className="mt-[14px] flex h-[200px] flex-col items-center justify-center gap-2 rounded-2xl border-[1.5px] border-dashed border-photo-border bg-photo-bg text-photo-ink"
        >
          <PhotoIcon />
          <span className="text-[13.5px]">{post.photoLabel}</span>
        </a>
      )}

      <footer className="mt-4 flex items-center gap-[18px] border-t border-border-soft pt-[14px]">
        <span className="flex items-center gap-[7px] text-[14px] font-bold text-coral-bright">
          <HeartIcon />
          {post.likes}
        </span>
        <a
          href="#"
          className="flex items-center gap-[7px] text-[14px] font-bold text-muted-dark"
        >
          <CommentIcon />
          {post.comments}
        </a>
        <span className="flex-1" />
        <a href="#" className="text-[14px] font-extrabold text-coral-dark">
          Editar
        </a>
      </footer>
    </article>
  );
}
