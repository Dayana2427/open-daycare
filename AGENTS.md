<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Project

`open-daycare`: Next.js 16.4.0 + React 19.3 + Tailwind CSS v4 (App Router, TypeScript strict). Still scaffold state — `app/page.tsx` is the default create-next-app page; no app features exist yet.

## Commands

- Dev: `npm run dev` (Turbopack is the bundler)
- Lint: `npm run lint`
- Typecheck: **no script exists** — run `npx tsc --noEmit`
- Build: `npm run build`
- No test framework and no CI. Verify changes with lint → tsc → build.

## Next.js 16 quirks

- Docs for this exact version live in `node_modules/next/dist/docs/` — read them before writing framework code (see generated block above).
- `next.config.ts` enables `cacheComponents`, `partialPrefetching`, and `experimental.agentFeedback`.
- Tailwind v4 is wired through a Turbopack rule (`@tailwindcss/turbopack` loader) in `next.config.ts`. There is no `tailwind.config.js`; styles live in `app/globals.css`.
- Layouts/pages are typed with generated global route types, e.g. `LayoutProps<"/">` in `app/layout.tsx`. These types are emitted into `.next/types/` by dev/build — if `tsc` reports them missing, run `npm run dev` once first.

## Design references

- `referencias/pantallas/*.dc.html` are the visual spec for the daycare UI: Nunito + Fredoka fonts, cream palette (bg `#f6ecdf`, text `#3f362e`). `referencias/screenshots/` holds target-state PNGs. The scaffold's Geist/default styling is NOT the target look.
- `referencias/pantallas/support.js` is generated runtime — never edit.

## Spec workflow

- `/spec` and `/spec-impl` skills (`.agents/skills/`, tracked by `skills-lock.json`) drive feature work: specs are written to `specs/`, and `spec-impl` only implements specs marked Approved, on a per-spec git branch. Both are user-invoked only — do not trigger them yourself.
- `spec-verifier` agent (`.opencode/agent/spec-verifier.md`) verifies, fixes and checks off the `## Acceptance criteria` of a spec in `specs/` with real evidence (lint/tsc/build, Context7 + `node_modules/next/dist/docs/`, Playwright screenshots vs `referencias/`). Never marks a check without verifying it in-session, and never edits spec content other than the checkboxes.
- `/verify-spec` command (`.opencode/command/verify-spec.md`) invokes `spec-verifier` with the spec number, slug, or path as argument, e.g. `/verify-spec 01` or `/verify-spec home-feed`. User-invoked only.

## Supabase

- Usar el MCP de Supabase para consultar la documentación actualizada (`search_docs`), inspeccionar tablas, ejecutar SQL, revisar logs y consultar los advisors de seguridad, rendimiento y salud. Antes de modificar el esquema, inspeccionar las tablas existentes; al depurar, comenzar por logs y advisors.
- Antes de implementar una funcionalidad de Supabase, consultar su documentación y changelog actuales; no basarse únicamente en conocimiento previo. Después de cada cambio, verificarlo con una consulta o prueba real.
- Para cambios de base de datos, seguir el flujo de trabajo del proyecto (esquemas declarativos o migraciones imperativas), revisar las migraciones generadas y ejecutar los advisors antes de finalizar.
- Habilitar RLS en todas las tablas de esquemas expuestos (`public` por defecto) y crear políticas acordes al modelo de acceso. Nunca exponer claves `service_role` o secretas en el cliente; en frontend usar claves publicables.
- El directorio de referencia `07-DB-Schema` contiene el esquema objetivo, pero no representa tablas ya implementadas en la base de datos.

### Skills de Supabase instaladas

- `supabase` (`.agents/skills/supabase/SKILL.md`, v0.1.2): cargarla para cualquier tarea relacionada con Supabase, incluidos Database, Auth, SSR, RLS, migraciones, CLI/MCP y depuración.
- `supabase-postgres-best-practices` (`.agents/skills/supabase-postgres-best-practices/SKILL.md`, v1.1.1): cargarla antes de escribir o modificar SQL, esquemas, tablas, índices, políticas RLS, funciones o triggers, y al diagnosticar problemas de rendimiento, concurrencia o seguridad en Postgres. Consultar los archivos de `references/` según la regla aplicable.
- Ambas skills proceden de `supabase/agent-skills` y están registradas, junto con sus hashes, en `skills-lock.json`.

## Conventions

- `@/*` path alias maps to the repo root (there is no `src/` directory).
- Playwright screenshots y cualquier cosa relacionada a Playwright tienen que estar en la carpeta `.playwright-mcp/` (gitignored).
- Context7 usaremos este MCP para traer la documentación actualizada del framework.


### Spec Driven Developmnet - Skills

- /spec usaremos esta habilidad para crera las especificaciones.
- /spec-impl usaremos esta skill para hacer las implementaciones
- /verify-spec usaremos este comando para invocar al agente `spec-verifier` y verificar los criterios de aceptación de un spec.


### MCPs

- Playwright Screenshot y cualquier cosa relacionada a Playwright tienen que estar en la carpeta .playwright-mcp.


### Reglas de código

- Usar código limpio, nombres, funciones, variables, etc en inglés.