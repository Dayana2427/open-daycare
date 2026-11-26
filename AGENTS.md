<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

<!-- END:nextjs-agent-rules -->

## Commands

- `npm run dev` — dev server at http://localhost:3000
- `npm run lint` — runs `eslint` (flat config, ESLint 9). This is **not** `next lint`; don't run `next lint`.
- Typecheck: `npx tsc --noEmit` (there is no `typecheck` script).
- No test framework is configured — don't invent test commands.

## Stack notes

- Next.js 16.2.10 (App Router) + React 19.2.4. TypeScript strict, `noEmit`, `moduleResolution: bundler`.
- Path alias `@/*` maps to the repo root (`./*`), not `src/`.
- Tailwind CSS v4: configured inline via `@import "tailwindcss"` + `@theme` in `app/globals.css` and the `@tailwindcss/postcss` plugin. There is **no** `tailwind.config.ts`; do not create one.

## Project context

- `open-daycare`: a Spanish-language daycare management app (staff + family/parent flows). UI copy is in Spanish.
- `app/page.tsx` is still the default create-next-app scaffold — the real UI has not been built yet.
- `references/pantallas/*.dc.html` are the design source of truth for each screen; open `references/pantallas/index.dc.html` for the catalog of 15 screens. `references/screenshots/*.png` are rendered previews. Implement against these: fonts are Fredoka (headings) + Nunito (body) on a warm palette (background `#f6ecdf`, accent `#d9583c`/`#f2937a`, staff blue `#2e89a6`, family purple `#7b5fc0`).

## MCPs

- Playwright: screenshots and any Playwright output go in `.playwright-mcp/` (gitignored).
- Context7: use it to fetch current framework docs instead of relying on training data.
- Supabase: disponible mediante MCP para consultar documentación, inspeccionar el esquema, ejecutar SQL, gestionar migraciones y Edge Functions, revisar logs y consultar advisors. Antes de modificar el esquema, inspeccionar las tablas existentes; al depurar, empezar por los logs y los advisors de seguridad, rendimiento y salud. Preferir desarrollo y pruebas locales antes de aplicar cambios al proyecto remoto. Nunca leer archivos del servidor ni ejecutar comandos del sistema operativo mediante SQL.

## Supabase - Skills

- `/supabase`: cargar esta skill para cualquier tarea relacionada con Supabase, incluidas las integraciones con Next.js (`supabase-js` y `@supabase/ssr`), Auth, RLS, Storage, Realtime, Edge Functions, migraciones y diagnóstico. Consultar el changelog y la documentación vigente antes de implementar, y verificar cada cambio con una prueba o consulta.
- `/supabase-postgres-best-practices`: cargar esta skill antes de escribir SQL o modificar cualquier elemento de Postgres (tablas, columnas, tipos, índices, políticas RLS, triggers, funciones, migraciones, colas y tareas programadas), así como al diagnosticar problemas de rendimiento, bloqueos o visibilidad de datos.
- No exponer `service_role` ni claves secretas en clientes públicos; usar claves publicables en el frontend. Habilitar RLS en las tablas de esquemas expuestos y ejecutar los advisors después de cambios DDL.

## Agents

- `spec-verifier`: Verifies acceptance criteria of a spec file. Reviews implementation against each criterion, fixes code/spec issues found, and marks checkboxes. Uses Playwright MCP with vision to compare screenshots against references, and Context7 MCP to validate Next.js best practices.

## Spec Driven Development - Skills

- /spec Usaremos esta habilidad para crear las especificaciones.
- /spec-impl Usaremos esta skill para hacer las implementaciones.
- /verify-spec Usaremos este comando para verificar los criterios de aceptación de una spec.

## Reglas de código

- Usar código limpio, nombres, funciones, variables, etc. en inglés.
