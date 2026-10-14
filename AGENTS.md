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

- `/spec` and `/spec-impl` skills (`.agents/skills/`, tracked by `skills-lock.json`) drive feature work: specs are written to `specs/` (does not exist yet), and `spec-impl` only implements specs marked Approved, on a per-spec git branch. Both are user-invoked only — do not trigger them yourself.

## Conventions

- `@/*` path alias maps to the repo root (there is no `src/` directory).
- Playwright screenshots y cualquier cosa relacionada a Playwright tienen que estar en la carpeta `.playwright-mcp/` (gitignored).
- Context7 usaremos este MCP para traer la documentación actualizada del framework.


### Spec Driven Developmnet - Skills

- /spec usaremos esta habilidad para crera las especificaciones.
- /spec-impl usaremos esta skill para hacer las implementaciones


### MCPs

- Playwright Screenshot y cualquier cosa relacionada a Playwright tienen que estar en la carpeta .playwright-mcp.


### Reglas de código

- Usar código limpio, nombres, funciones, variables, etc en inglés.

### 