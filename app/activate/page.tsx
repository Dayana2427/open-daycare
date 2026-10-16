import { invite } from "@/lib/data/activation";

export default function ActivatePage() {
  return (
    <div
      className="min-h-screen flex items-center justify-center py-10 px-10"
      style={{ background: "var(--color-cream)" }}
    >
      <div className="w-full max-w-[440px]">
        {/* Sun icon */}
        <div
          className="flex items-center justify-center rounded-[18px] mb-[22px]"
          style={{
            width: 58,
            height: 58,
            background:
              "linear-gradient(155deg, var(--color-brand-start), var(--color-coral-soft))",
            boxShadow: "0 12px 26px -10px rgba(238,129,100,.65)",
          }}
        >
          <SunIcon />
        </div>

        {/* Title & subtitle */}
        <h1 className="font-display font-semibold text-[32px] leading-[1.15] text-ink mb-2">
          Bienvenida a OpenDayCare
        </h1>
        <p className="mb-[26px] text-[15.5px] leading-[1.55]" style={{ color: "var(--color-muted-dark)" }}>
          Te invitaron a seguir el día de tu hijo. Creá tu contraseña para activar la cuenta.
        </p>

        {/* Invite card */}
        <InviteCard invite={invite} />

        {/* Invitation code */}
        <Label> CÓDIGO DE INVITACIÓN</Label>
        <Input
          value={invite.code}
          className="text-[18px] tracking-[3px] font-bold font-display mb-[18px]"
        />

        {/* Email */}
        <Label>EMAIL</Label>
        <Input
          type="email"
          value={invite.email}
          className="mb-[18px]"
        />

        {/* Password */}
        <Label>CREAR CONTRASEÑA</Label>
        <input
          type="password"
          defaultValue="contraseña"
          readOnly
          className="w-full px-4 py-[14px] rounded-[14px] text-[15px] text-ink mb-[18px] bg-white"
          style={{ border: "1.5px solid #F2A78E" }}
        />

        {/* Consent checkbox */}
        <ConsentCheckbox />

        {/* CTA */}
        <a
          href="#"
          className="block text-center w-full py-[15px] rounded-[15px] text-white font-extrabold text-[16px]"
          style={{
            background: "linear-gradient(180deg, var(--color-coral-light), var(--color-coral))",
            boxShadow: "0 10px 22px -8px rgba(238,129,100,.7)",
          }}
        >
          Activar mi cuenta
        </a>

        {/* Footer link */}
        <p className="text-center mt-[22px] text-muted-dark text-[14.5px]">
          ¿Ya tenés cuenta?{" "}
          <a href="/login" className="font-extrabold" style={{ color: "var(--color-coral-dark)" }}>
            Iniciar sesión
          </a>
        </p>
      </div>
    </div>
  );
}

/* ── Sub-components ── */

function InviteCard({ invite }: { invite: typeof import("@/lib/data/activation").invite }) {
  const colorMap: Record<string, { bg: string; fg: string }> = {
    sky: { bg: "var(--color-avatar-sky)", fg: "var(--color-avatar-sky-ink)" },
    pink: { bg: "var(--color-avatar-pink)", fg: "var(--color-avatar-pink-ink)" },
    green: { bg: "var(--color-avatar-green)", fg: "var(--color-avatar-green-ink)" },
    yellow: { bg: "var(--color-avatar-yellow)", fg: "var(--color-avatar-yellow-ink)" },
    purple: { bg: "var(--color-avatar-purple)", fg: "var(--color-avatar-purple-ink)" },
  };

  const c = colorMap[invite.color] ?? colorMap.sky;

  return (
    <div
      className="flex items-center gap-[14px] rounded-[16px] p-[14px] mb-[22px]"
      style={{
        border: "1.5px solid var(--color-input-border)",
        background: "white",
      }}
    >
      <div
        className="flex items-center justify-center rounded-full"
        style={{
          width: 44,
          height: 44,
          background: c.bg,
          color: c.fg,
        }}
      >
        <span className="font-display font-semibold text-[19px]">
          {invite.initial}
        </span>
      </div>
      <div>
        <div className="text-[13px]" style={{ color: "var(--color-muted-dark)" }}>
          Te invitaron a seguir a
        </div>
        <div className="font-display font-semibold text-[17px] text-ink">
          {invite.childName} · {invite.room}
        </div>
      </div>
    </div>
  );
}

function Label({ children }: { children: string }) {
  return (
    <div className="text-[12px] font-bold tracking-[.7px] text-muted-dark mb-2">
      {children}
    </div>
  );
}

function Input({
  value,
  type = "text",
  className = "",
}: {
  value: string;
  type?: string;
  className?: string;
}) {
  return (
    <input
      type={type}
      defaultValue={value}
      readOnly
      className={`w-full px-4 py-[14px] rounded-[14px] text-[15px] text-ink bg-white ${className}`}
      style={{ border: "1.5px solid var(--color-input-border)" }}
    />
  );
}

function ConsentCheckbox() {
  return (
    <label
      className="flex items-start gap-3 rounded-[14px] p-[14px] mb-6 cursor-pointer"
      style={{
        background: "var(--color-consent-bg)",
        color: "var(--color-consent-ink)",
      }}
    >
      <span
        className="flex-none flex items-center justify-center rounded-lg"
        style={{
          width: 24,
          height: 24,
          marginTop: 1,
          background: "var(--color-consent-check)",
        }}
      >
        <svg
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#fff"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </span>
      <span className="text-[14px] leading-[1.45]">
        Autorizo a la guardería a tomar y compartir fotos de mi hijo dentro de la app.
      </span>
    </label>
  );
}

function SunIcon() {
  return (
    <svg
      width="30"
      height="30"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#fff"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </svg>
  );
}
