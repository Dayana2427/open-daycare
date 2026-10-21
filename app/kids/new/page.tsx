import Link from "next/link";

export default function NewKidPage() {
  return (
    <div className="flex min-h-screen items-start justify-center px-6 py-10">
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
        <div className="px-[26px] py-6">
          <div className="mb-2 text-[12px] font-extrabold tracking-[.7px] text-muted-dark">
            NOMBRE COMPLETO
          </div>
          <input
            placeholder="Ej. Martina López"
            className="mb-[18px] w-full rounded-[14px] border-[1.5px] border-input-border bg-white px-4 py-[13px] text-[15px] text-ink placeholder:text-placeholder"
          />

          <div className="mb-[18px] flex gap-[14px]">
            <div className="flex-1">
              <div className="mb-2 text-[12px] font-extrabold tracking-[.7px] text-muted-dark">
                FECHA DE NACIMIENTO
              </div>
              <input
                placeholder="aaaa-mm-dd"
                className="w-full rounded-[14px] border-[1.5px] border-input-border bg-white px-4 py-[13px] text-[15px] text-ink placeholder:text-placeholder"
              />
            </div>
            <div className="flex-1">
              <div className="mb-2 text-[12px] font-extrabold tracking-[.7px] text-muted-dark">
                SALA
              </div>
              <div className="relative">
                <select className="w-full appearance-none rounded-[14px] border-[1.5px] border-input-border bg-white px-4 py-[13px] text-[15px] font-bold text-ink">
                  <option>Soles</option>
                </select>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 flex-none text-photo-ink"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </div>
            </div>
          </div>

          <div className="mb-2 text-[12px] font-extrabold tracking-[.7px] text-muted-dark">
            ALERGIAS (ETIQUETAS)
          </div>
          <input
            placeholder="Ej. Maní, Lactosa"
            className="mb-[18px] w-full rounded-[14px] border-[1.5px] border-input-border bg-white px-4 py-[13px] text-[15px] text-ink placeholder:text-placeholder"
          />

          <div className="mb-2 text-[12px] font-extrabold tracking-[.7px] text-muted-dark">
            NOTAS MÉDICAS
          </div>
          <textarea
            placeholder="Indicaciones, medicación, contactos…"
            className="min-h-[90px] w-full resize-y rounded-[14px] border-[1.5px] border-input-border bg-white px-4 py-[13px] text-[15px] leading-[1.5] text-ink placeholder:text-placeholder"
          />
        </div>
      </div>
    </div>
  );
}
