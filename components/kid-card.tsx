import Link from "next/link";
import type { Kid } from "@/lib/data/kids";
import { avatarBgClasses, avatarInkClasses } from "@/lib/avatar-colors";

interface KidCardProps {
  kid: Kid;
}

function parentsLabel(kid: Kid): string {
  const count = kid.parents.length;
  if (count === 0) return `${kid.age} años · sin padres vinculados`;
  const noun = count === 1 ? "padre vinculado" : "padres vinculados";
  return `${kid.age} años · ${count} ${noun}`;
}

function ChevronIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

const pillStyles =
  "flex-none rounded-full px-[9px] py-[5px] text-[11px] font-extrabold";

function CardIndicator({ kid }: KidCardProps) {
  if (kid.allergyTag !== undefined) {
    return (
      <span className={`${pillStyles} bg-pill-allergy text-pill-allergy-ink`}>
        {kid.allergyTag}
      </span>
    );
  }
  if (kid.parents.length === 0) {
    return (
      <span className={`${pillStyles} bg-pill-unlinked text-pill-unlinked-ink`}>
        VINCULAR
      </span>
    );
  }
  return (
    <span className="flex-none text-[#CBB89F]">
      <ChevronIcon />
    </span>
  );
}

export function KidCard({ kid }: KidCardProps) {
  return (
    <Link
      href={`/kids/${kid.id}`}
      className="flex min-w-0 items-center gap-[14px] rounded-[18px] border border-border bg-surface p-4 shadow-[0_4px_14px_-12px_rgba(120,90,60,.5)] transition duration-150 hover:-translate-y-[2px] hover:border-[#F2A78E]"
    >
      <span
        className={`flex h-12 w-12 flex-none items-center justify-center rounded-full font-display text-[19px] font-semibold ${avatarBgClasses[kid.color]} ${avatarInkClasses[kid.color]}`}
      >
        {kid.name.charAt(0)}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block font-display text-[16px] font-semibold text-ink">
          {kid.name}
        </span>
        <span className="block text-[13px] text-muted">{parentsLabel(kid)}</span>
      </span>
      <CardIndicator kid={kid} />
    </Link>
  );
}
