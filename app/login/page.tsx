export default function LoginPage() {
  return (
    <div className="min-h-screen grid grid-cols-[1.05fr_1fr]" style={{ background: "var(--color-cream)" }}>
      {/* Hero panel */}
      <div className="relative overflow-hidden flex flex-col justify-between py-14 px-15 text-white"
        style={{
          background: "linear-gradient(155deg, var(--color-brand-grad-start) 0%, var(--color-coral-soft) 45%, var(--color-brand-grad-end) 100%)",
        }}
      >
        {/* Decorative circles */}
        <div
          className="absolute rounded-full"
          style={{
            width: 420,
            height: 420,
            top: -140,
            right: -120,
            background: "rgba(255,255,255,.12)",
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            width: 300,
            height: 300,
            bottom: -110,
            left: -80,
            background: "rgba(255,255,255,.10)",
          }}
        />

        {/* Logo */}
        <div className="flex items-center gap-[13px] relative">
          <div
            className="flex items-center justify-center rounded-[14px]"
            style={{ width: 46, height: 46, background: "rgba(255,255,255,.22)" }}
          >
            <SunIcon />
          </div>
          <span className="font-display font-semibold text-[21px] tracking-[.5px]">
            OpenDayCare
          </span>
        </div>

        {/* Hero text */}
        <div className="relative">
          <h1
            className="font-display font-semibold text-[42px] leading-[1.12] mb-[18px]"
            style={{ maxWidth: 500 }}
          >
            El día de cada niño,
            <br />
            compartido con su familia.
          </h1>
          <p className="text-[17px] leading-[1.6] max-w-[430px]" style={{ color: "rgba(255,255,255,.92)" }}>
            Publicá momentos, gestioná las salas y mantené a las familias cerca, desde un solo lugar.
          </p>
        </div>

        {/* Footer badge */}
        <div className="relative text-[14px]" style={{ color: "rgba(255,255,255,.9)" }}>
          🌿 Guardería Sala Soles
        </div>
      </div>

      {/* Login form */}
      <div className="flex items-center justify-center p-10">
        <div className="w-full max-w-[392px]">
          <h2 className="font-display font-semibold text-[30px] text-ink mb-1.5">
            Iniciar sesión
          </h2>
          <p className="mb-7 text-muted-dark text-[15px]">
            Ingresá para ver el día de hoy.
          </p>

          {/* Email */}
          <div className="text-[12px] font-bold tracking-[.7px] text-muted-dark mb-2">
            EMAIL
          </div>
          <input
            type="email"
            placeholder="name@email.com"
            className="w-full px-4 py-[14px] rounded-[14px] text-[15px] text-ink mb-[18px] bg-white"
            style={{ border: "1.5px solid var(--color-input-border)" }}
          />

          {/* Password */}
          <div className="text-[12px] font-bold tracking-[.7px] text-muted-dark mb-2">
            CONTRASEÑA
          </div>
          <input
            type="password"
            placeholder="••••••••"
            className="w-full px-4 py-[14px] rounded-[14px] text-[15px] text-ink mb-2.5 bg-white"
            style={{ border: "1.5px solid var(--color-input-border)" }}
          />

          {/* Forgot password */}
          <div className="text-right mb-5">
            <a href="#" className="font-bold text-[13.5px]" style={{ color: "var(--color-coral-dark)" }}>
              ¿Olvidaste tu contraseña?
            </a>
          </div>

          {/* CTA */}
          <a
            href="#"
            className="block text-center w-full py-[15px] rounded-[15px] text-white font-extrabold text-[16px]"
            style={{
              background: "linear-gradient(180deg, var(--color-coral-light), var(--color-coral))",
              boxShadow: "0 10px 22px -8px rgba(238,129,100,.7)",
            }}
          >
            Iniciar sesión
          </a>

          {/* Footer link */}
          <p className="text-center mt-6 text-muted-dark text-[14.5px]">
            ¿Te invitó la guardería?{" "}
            <a href="/activate" className="font-extrabold" style={{ color: "var(--color-coral-dark)" }}>
              Activá tu cuenta
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

function SunIcon() {
  return (
    <svg
      width="26"
      height="26"
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
