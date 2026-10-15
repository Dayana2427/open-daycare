import Link from "next/link";
import { KidCard } from "@/components/kid-card";
import { Sidebar } from "@/components/sidebar";
import { currentUser } from "@/lib/data/feed";
import { kids } from "@/lib/data/kids";

function PlusIcon() {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

function SearchIcon() {
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
      <circle cx="11" cy="11" r="7" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

export default function KidsPage() {
  return (
    <div className="flex min-h-screen bg-cream">
      <Sidebar user={currentUser} activeItem="kids" />

      <main className="h-screen min-w-0 flex-1 overflow-y-auto">
        <div className="mx-auto w-full max-w-[880px] px-10 pt-[34px] pb-20">
          <div className="mb-[22px] flex items-end justify-between gap-4">
            <div>
              <div className="mb-1 text-[12.5px] font-extrabold tracking-[.8px] text-coral-strong">
                GESTIÓN
              </div>
              <h1 className="font-display text-[30px] font-semibold text-ink">
                Niños
              </h1>
            </div>
            <Link
              href="#"
              className="flex flex-none items-center gap-2 rounded-[14px] bg-[linear-gradient(180deg,var(--color-coral-light),var(--color-coral))] px-[18px] py-[11px] text-[14.5px] font-extrabold text-white shadow-[0_8px_18px_-8px_rgba(238,129,100,.7)]"
            >
              <PlusIcon />
              Agregar niño
            </Link>
          </div>

          <div className="mb-[22px] flex items-center gap-[11px] rounded-[14px] border border-border bg-surface px-4 py-3">
            <span className="flex-none text-[#B0A290]">
              <SearchIcon />
            </span>
            <input
              placeholder="Buscar niño…"
              className="flex-1 border-none bg-transparent text-[15px] text-ink outline-none placeholder:text-[#B6A99B]"
            />
          </div>

          <div className="mb-[14px] flex items-center gap-3">
            <span className="text-[12.5px] font-extrabold tracking-[.8px] text-ink">
              SALA SOLES
            </span>
            <span className="text-[13px] text-muted">{kids.length} niños</span>
            <span className="h-px flex-1 bg-divider" />
          </div>

          <div className="grid grid-cols-2 gap-[14px]">
            {kids.map((kid) => (
              <KidCard key={kid.id} kid={kid} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
