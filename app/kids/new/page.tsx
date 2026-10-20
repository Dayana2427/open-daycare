import Link from "next/link";

export default function NewKidPage() {
  return (
    <div className="flex min-h-screen items-start justify-center px-6 pt-10">
      <div className="w-full max-w-[520px] overflow-hidden rounded-[24px] border border-border bg-card shadow-[0_20px_50px_-24px_rgba(63,54,46,.35)]">
        <div className="flex items-center justify-between border-b border-border px-[26px] py-5">
          <Link href="/kids" className="text-[15px] font-bold text-muted-dark">
            Cancelar
          </Link>
          <span className="font-display text-[18px] font-semibold text-ink">
            Agregar niño
          </span>
          <Link href="/kids" className="text-[15px] font-extrabold text-coral-strong">
            Guardar
          </Link>
        </div>
        <div className="px-[26px] py-6" />
      </div>
    </div>
  );
}
