# SPEC 03 — Pantallas Login y Activar cuenta (solo UI)

> **Status:** Aprobado
> **Depends on:** SPEC 01
> **Date:** 2026-10-16
> **Objective:** Implementar `login.dc.html` y `activar-cuenta.dc.html` como rutas estáticas `/login` y `/activate`, sin el selector de rol del login y visualmente idénticas a las referencias.

## Scope

**In:**

- `app/login/page.tsx` nuevo: layout split de 2 columnas — panel hero izquierdo (gradiente coral `155deg`, círculos decorativos, logo OpenDayCare, H1 "El día de cada niño, compartido con su familia.", párrafo y "🌿 Guardería Sala Soles") + formulario derecho ("Iniciar sesión", email y contraseña, "¿Olvidaste tu contraseña?", CTA, link "Activá tu cuenta").
- **Sin selector de rol**: la sección "INGRESO COMO" con los botones Personal/Familia no existe; inputs de email vacíos con placeholder (decisión del usuario).
- `app/activate/page.tsx` nuevo: card centrada (max-w 440px) — ícono sol con gradiente, "Bienvenida a OpenDayCare", aviso de invitado (avatar "M" + "Mateo · Sala Soles"), inputs CÓDIGO DE INVITACIÓN / EMAIL / CREAR CONTRASEÑA con los valores de la referencia, checkbox de autorización visual (verde, checked), CTA "Activar mi cuenta" y "¿Ya tenés cuenta? Iniciar sesión".
- `lib/data/activation.ts` nuevo: mock tipado `Invite` con `code`, `email`, `childName`, `room`, `initial` y `color` (avatar-sky) con los valores exactos de la referencia.
- `app/globals.css`: tokens nuevos en `@theme`: `--color-brand-grad-start: #f6a98e`, `--color-brand-grad-end: #ec7e62`, `--color-input-border: #eadfd0`, `--color-placeholder: #b6a99b`, `--color-consent-bg: #fbf1d6`, `--color-consent-ink: #8a7234`, `--color-consent-check: #5fb97e`.
- Links cruzados reales: "Activá tu cuenta" → `/activate` y "Iniciar sesión" → `/login`. CTAs ("Iniciar sesión", "Activar mi cuenta") y "¿Olvidaste tu contraseña?" con `href="#"`.

**Out of scope (para specs futuros):**

- Autenticación real: validación, sesión, cookies, logout funcional (incluye el logout del sidebar de SPEC 01, que sigue con `#`).
- Selector de rol Personal/Familia y cualquier redirección post-login (`familia-feed`, destino del login de staff).
- Flujo de token en activación (`/activate?code=...`): la invitación es un mock estático.
- Estados de error/éxito de formularios, disabled, loading.
- Base de datos o persistencia.
- Versión mobile / responsive.

## Data model

```ts
// lib/data/activation.ts
export interface Invite {
  code: string;       // "7K4P9"
  email: string;      // "lucia.fernandez@gmail.com"
  childName: string;  // "Mateo"
  room: string;       // "Sala Soles"
  initial: string;    // "M"
  color: AvatarColor; // "sky" → reusa AvatarColor de lib/data/kids.ts
}

export const invite: Invite; // único mock, valores exactos de activar-cuenta.dc.html
```

- Login no introduce datos: ambos inputs quedan vacíos con placeholder (`name@email.com` / `••••••••`).
- El placeholder del campo de email se define en el page; no es dato mockeable.

## Implementation plan

1. `app/globals.css`: agregar los 7 tokens nuevos a `@theme`. Verificación: `/` y `/kids` se ven idénticas (tokens aún sin usar).
2. `lib/data/activation.ts`: tipo `Invite` + mock. Verificación: `npx tsc --noEmit` pasa.
3. `app/login/page.tsx`: server component con el split grid `1.05fr / 1fr`, hero con gradiente y círculos absolutos, formulario sin selector de rol, inputs `defaultValue` vacíos con `placeholder`, links según Scope. Verificación: `/login` visual contra `referencias/pantallas/login.dc.html` abierto en el navegador (capturas en `.playwright-mcp/`).
4. `app/activate/page.tsx`: server component centrado que renderiza `invite`, checkbox visual estático (span con check SVG, como el buscador estático de SPEC 02), links según Scope. Verificación: `/activate` visual contra `activar-cuenta.dc.html`.
5. Verificación final: `npm run lint`, `npx tsc --noEmit` y `npm run build` sin errores; repaso desktop de ambas rutas y smoke de `/` y `/kids`.

## Acceptance criteria

- [ ] `/login` muestra el hero con gradiente `#F6A98E→#F2937A→#EC7E62`, logo, H1, subtítulo y "🌿 Guardería Sala Soles", y a la derecha el formulario con email + contraseña con placeholder vacío.
- [ ] `/login` no contiene la sección "INGRESO COMO" ni botones Personal/Familia.
- [ ] "¿Olvidaste tu contraseña?" y "Iniciar sesión" (CTA) son `href="#"`; "Activá tu cuenta" navega a `/activate`.
- [ ] `/activate` muestra avatar "M" celeste, "Mateo · Sala Soles", código `7K4P9`, email `lucia.fernandez@gmail.com`, contraseña con borde `#F2A78E`, checkbox verde checked con texto de autorización en `#FBF1D6`, y "Iniciar sesión" navega a `/login`.
- [ ] Los valores de `/activate` provienen de `lib/data/activation.ts`; ningún string de la invitación está hardcodeado en el JSX.
- [ ] Ambas páginas son server components sin `"use client"`; ningún input tiene lógica.
- [ ] Nunito/Fredoka y paleta cream aplicadas vía tokens `@theme`; sin `<link>` a Google Fonts.
- [ ] Identificadores en inglés (`Invite`, `code`, `childName`); textos visibles idénticos en español a las plantillas.
- [ ] `npm run lint`, `npx tsc --noEmit` y `npm run build` terminan sin errores.
- [ ] Revisión visual desktop (≥1024px) de `/login` y `/activate` contra sus `.dc.html` sin diferencias apreciables.

## Decisions

- **Sí:** eliminar la sección completa "INGRESO COMO" y el email pre-rellenado; Inputs vacíos con placeholder (decisión del usuario en la definición).
- **Sí:** rutas `/login` y `/activate` en inglés; convención de SPEC 02.
- **Sí:** todo estático, sin submit ni validación; coherente con SPEC 01/02.
- **Sí:** mock `Invite` en `lib/data/activation.ts`; la convención del repo es que un futuro backend sólo cambie el origen del dato.
- **Sí:** links cruzados `/login ↔ /activate` reales; el resto de CTAs `href="#"` (no existe el flujo post-login).
- **No:** cambiar el logout del sidebar a `/login`; sigue en el spec de autenticación.
- **No:** `/activate?code=` con búsqueda de invitación; merece su spec junto con la auth.
- **No:** breakpoint mobile; la referencia idéntica es desktop.
- **No:** checkbox con `<input type="checkbox">` real interactivo; sería `"use client"` o CSS hack para una UI que no convalida nada.

## Risks

| Risk | Mitigation |
| --- | --- |
| `login.dc.html` y `activar-cuenta.dc.html` no tienen screenshot en `referencias/screenshots/` | Verificación abriendo cada HTML de referencia en el navegador junto a la ruta, con captura en `.playwright-mcp/` (igual que SPEC 02) |
| Gradientes y círculos decorativos del hero difieren al pasar de inline styles a Tailwind | Usar arbitrary values exactos (`bg-gradient-to-br`, `rounded-full`, tamaños/offsets literales de la plantilla) y comparar visualmente |

## What is **not** in this spec

- Autenticación, sesión, logout funcional.
- Selector de rol y destinos post-login.
- Activación con token real de invitación.
- Validación o estados de error de formularios.
- Base de datos o persistencia.
- Versión mobile.

Cada uno, si llega, va en su propio spec.
