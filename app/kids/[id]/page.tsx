import Link from "next/link";
import { notFound } from "next/navigation";
import { Sidebar } from "@/components/sidebar";
import { currentUser } from "@/lib/data/feed";
import { getKidById, kids, type KidParent, type ParentStatus } from "@/lib/data/kids";
import { avatarBgClasses, avatarInkClasses } from "@/lib/avatar-colors";

function BackIcon() {
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
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}

function WarningIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z" />
      <path d="M12 9v4M12 17h.01" />
    </svg>
  );
}

function SunIcon() {
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
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </svg>
  );
}

function PlusIcon() {
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
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

const parentStatusPills: Record<ParentStatus, { label: string; styles: string }> = {
  active: { label: "ACTIVA", styles: "bg-pill-active text-pill-active-ink" },
  pending: { label: "PENDIENTE", styles: "bg-pill-pending text-pill-pending-ink" },
};

function ParentRow({ parent }: { parent: KidParent }) {
  const pill = parentStatusPills[parent.status];
  return (
    <div className="flex items-center gap-3">
      <span
        className={`flex h-10 w-10 flex-none items-center justify-center rounded-full font-display text-[16px] font-semibold text-white ${avatarBgClasses[parent.color]}`}
      >
        {parent.initial}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-[14.5px] font-extrabold text-ink">{parent.name}</span>
        <span className="block text-[12.5px] text-muted">
          {parent.relation} · {parent.statusDetail}
        </span>
      </span>
      <span
        className={`flex-none rounded-full px-[9px] py-[4px] text-[10.5px] font-extrabold ${pill.styles}`}
      >
        {pill.label}
      </span>
    </div>
  );
}

export const instant = false;
export const ensureStatic = "navigation";

export function generateStaticParams() {
  return kids.map((kid) => ({ id: kid.id }));
}

export default async function KidProfilePage(props: PageProps<"/kids/[id]">) {
  const { id } = await props.params;
  const kid = getKidById(id);

  if (!kid) {
    notFound();
  }

  const details: { label: string; value: string }[] = [
    { label: "Fecha de nacimiento", value: kid.birthDate },
    { label: "Sala", value: kid.room },
    { label: "Ingreso", value: kid.admittedSince },
  ];

  return (
    <div className="flex min-h-screen bg-cream">
      <Sidebar user={currentUser} activeItem="kids" />

      <main className="h-screen min-w-0 flex-1 overflow-y-auto">
        <div className="mx-auto w-full max-w-[820px] px-10 pt-[34px] pb-20">
          <Link
            href="/kids"
            className="mb-5 flex items-center gap-[7px] text-[14px] font-bold text-muted-dark"
          >
            <BackIcon />
            Volver a Niños
          </Link>

          <div className="flex flex-wrap items-start gap-[26px]">
            <div className="flex min-w-[300px] flex-1 flex-col gap-[18px]">
              <div className="flex items-center gap-[18px]">
                <span
                  className={`flex h-[84px] w-[84px] flex-none items-center justify-center rounded-full font-display text-[34px] font-semibold ${avatarBgClasses[kid.color]} ${avatarInkClasses[kid.color]}`}
                >
                  {kid.name.charAt(0)}
                </span>
                <span className="flex-1">
                  <span className="block font-display text-[28px] font-semibold text-ink">
                    {kid.name}
                  </span>
                  <span className="mt-[3px] block text-[15px] text-muted-dark">
                    {kid.age} años · Sala {kid.room}
                  </span>
                </span>
                <Link
                  href="#"
                  className="flex-none rounded-xl border-[1.5px] border-border bg-surface px-4 py-[9px] text-[14px] font-bold text-nav"
                >
                  Editar
                </Link>
              </div>

              {kid.allergyNote !== undefined && (
                <div className="flex gap-[14px] rounded-2xl bg-alert-bg px-[18px] py-4">
                  <span className="flex h-10 w-10 flex-none items-center justify-center rounded-[11px] bg-alert-border text-white">
                    <WarningIcon />
                  </span>
                  <span>
                    <span className="mb-[2px] block text-[15px] font-extrabold text-alert-strong">
                      Alergias y notas
                    </span>
                    <span className="block text-[14.5px] leading-[1.5] text-alert-ink">
                      {kid.allergyNote}
                    </span>
                  </span>
                </div>
              )}

              <div className="overflow-hidden rounded-2xl border border-border bg-surface">
                {details.map((detail, index) => (
                  <div
                    key={detail.label}
                    className={`flex justify-between px-[18px] py-[15px] ${index < details.length - 1 ? "border-b border-border-soft" : ""}`}
                  >
                    <span className="text-[14.5px] text-muted-dark">{detail.label}</span>
                    <span className="text-[14.5px] font-extrabold text-ink">{detail.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex w-[300px] flex-none flex-col gap-[14px]">
              <Link
                href="#"
                className="flex w-full items-center justify-center gap-[9px] rounded-[14px] bg-ink p-[13px] text-[15px] font-extrabold text-white"
              >
                <SunIcon />
                Resumen del día
              </Link>

              <div className="rounded-2xl border border-border bg-surface px-[18px] py-4">
                <div className="mb-[14px] text-[12.5px] font-extrabold tracking-[.8px] text-label">
                  PADRES VINCULADOS
                </div>
                <div className="flex flex-col gap-[14px]">
                  {kid.parents.map((parent) => (
                    <ParentRow key={parent.name} parent={parent} />
                  ))}
                  <Link
                    href="#"
                    className="flex items-center gap-3 pt-2"
                  >
                    <span className="flex h-10 w-10 flex-none items-center justify-center rounded-full border-[1.5px] border-dashed border-[#D8CBBA] text-photo-ink">
                      <PlusIcon />
                    </span>
                    <span className="text-[14.5px] font-extrabold text-coral-dark">
                      Vincular otro padre
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
