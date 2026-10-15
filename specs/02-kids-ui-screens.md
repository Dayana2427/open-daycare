# SPEC 02 — Pantallas Niños y Perfil de niño (solo UI)

> **Status:** Draft
> **Depends on:** SPEC 01
> **Date:** 2026-10-14
> **Objective:** Implementar las pantallas `ninos.dc.html` y `perfil-nino.dc.html` como rutas `/kids` y `/kids/[id]` con datos estáticos y componentes reutilizables, visualmente idénticas a las referencias.

## Scope

**In:**

- `app/kids/page.tsx` nuevo: pantalla Niños — header ("GESTIÓN" / "Niños"), botón "Agregar niño", barra "Buscar niño…" (solo visual), fila "SALA SOLES · 8 niños" y grid de 2 columnas con las 8 cards de la plantilla.
- `app/kids/[id]/page.tsx` nuevo: perfil de niño — link "Volver a Niños", cabecera con avatar/nombre/edad/sala + botón "Editar", alerta de alergias (condicional), tarjeta de datos (fecha de nacimiento / sala / ingreso), botón "Resumen del día" y panel "PADRES VINCULADOS" con filas de padres y link "Vincular otro padre".
- Componente nuevo `components/kid-card.tsx`: card del grid con avatar por color, nombre, "X años · N padres vinculados" (derivado de `parents.length`) y indicador derecho según datos: pill de alergia (`MANÍ`/`LACTOSA`), pill `VINCULAR` si `parents.length === 0`, o chevron en resto.
- `lib/data/kids.ts` nuevo: mock tipado (`Kid`, `KidParent`, `ParentStatus`, `AvatarColor`) con los 8 niños exactos de la lista de referencia; perfil completo y exacto para Mateo Fernández y datos verosímiles para los otros 7. `getKidById` + `generateStaticParams` para los 8 ids; `notFound()` para id desconocido.
- Cambio en `components/sidebar.tsx`: `NavItem` gana `id` e `href` (`/` para Feed, `/kids` para Niños, `#` para Avisos/Mi cuenta) y `Sidebar` recibe la prop `activeItem` para marcar el item activo; el link "Niños" queda activo en `/kids` y `/kids/[id]`.
- Cambio en `app/page.tsx`: pasar `activeItem="feed"` al Sidebar (comportamiento idéntico al actual).
- `app/globals.css`: extender `@theme` con los tokens nuevos usados por ambas pantallas: paleta de avatares (sky/pink/green/yellow/purple con su variante ink), fondo/tinta de pills de alergia (`#FBD8CC/#D9684A`), VINCULAR (`#F9D2DE/#C56486`), estados ACTIVA (`#CFEBD8/#3E9B6C`) y PENDIENTE (`#F7E7A6/#9A7B1E`), y rojo de la alerta de alergias (`#FBDAD6`, `#F4A8A0`, `#C5413A`, `#B25249`).

**Out of scope (para specs futuros):**

- Rutas `agregar-nino`, `resumen-dia` y `vincular-padre`: sus links quedan `href="#"`.
- Lógica del buscador: el input existe visualmente pero no filtra (confirmado en la definición).
- Autenticación, sesión real y logout funcional.
- Base de datos o persistencia: todo es mock estático en `lib/data/kids.ts`.
- Interactividad real (crear/editar niños, vincular padres, reacciones).
- Versión mobile / responsive (la referencia "idéntica" es desktop, igual que SPEC 01).
- Fotos reales: los avatares siguen siendo iniciales con fondo de color, como en la plantilla.

## Data model

```ts
// lib/data/kids.ts
export type AvatarColor = "sky" | "pink" | "green" | "yellow" | "purple";
export type ParentStatus = "active" | "pending";

export interface KidParent {
  name: string;         // "Lucía Fernández"
  relation: string;     // "Mamá" | "Papá" (visible en español)
  status: ParentStatus;
  statusDetail: string; // "activa" | "invitación enviada"
  initial: string;      // "L"
  color: AvatarColor;
}

export interface Kid {
  id: string;             // "mateo" (slug minúsculo sin acentos; sirve de route param)
  name: string;           // "Mateo Fernández"
  age: number;            // 3 → se renderiza "3 años"
  room: string;           // "Soles"
  birthDate: string;      // "12 mar 2022"
  admittedSince: string;  // "feb 2025"
  allergyTag?: string;    // "MANÍ" | "LACTOSA" (pill en la card)
  allergyNote?: string;   // "Alergia al maní. Evitar frutos secos. Lleva inhalador en la mochila." (alerta del perfil)
  parents: KidParent[];   // [] → card muestra pill "VINCULAR"
}

export const kids: Kid[];                    // 8, en el orden exacto de ninos.dc.html
export function getKidById(id: string): Kid | undefined;
```

- Los textos derivados ("3 años · 2 padres vinculados", "sin padres vinculados", "8 niños") se calculan con helpers en `kid-card.tsx` y `app/kids/page.tsx`; no se mockean como strings.
- Los valores de `AvatarColor` mapean a clases Tailwind vía un `Record<AvatarColor, string>` en un helper compartido `lib/avatar-colors.ts` (avatar de niño y de padre usan los mismos colores).
- La paleta de avatares de la referencia: sky `#A9D9E8/#1F7A93`, pink `#F4B8CC/#C44A7A`, green `#B9DEC4/#3E8B62`, yellow `#F4DC8E/#9A7B1E`, purple `#C9B6E8/#7B5FC0`.
- No se crean nuevas estructuras de usuario: el perfil reusa `CurrentUser` del mock de SPEC 01 para el sidebar.

## Implementation plan

1. `app/globals.css`: añadir los tokens nuevos de `@theme` (avatares, pills, alerta). Verificación: `npm run dev` y `/` se ve idéntica a `referencias/screenshots/feed.png` (los tokens nuevos aún no se usan).
2. `lib/data/kids.ts`: crear tipos, los 8 `Kid` (Mateo exacto a la referencia, resto verosímil coherente con la lista: Sofía 1 padre, Benjamín 2, Valentina 0, Tomás 1 + `allergyNote` de lactosa, Emma/Lucas/Olivia 1) y `getKidById`. Verificación: `npx tsc --noEmit` pasa.
3. `lib/avatar-colors.ts` + `components/kid-card.tsx`: componente `KidCard` que recibe `Kid` con la lógica de indicador derecho (allergyTag → pill, `parents.length === 0` → VINCULAR, resto → chevron) y link a `/kids/${id}`. Verificación: tsc pasa.
4. `components/sidebar.tsx` + `app/page.tsx`: agregar `href`/`id` a `NavItem` y prop `activeItem` a `Sidebar`; Feed apunta a `/`, Niños a `/kids`, resto `#`; `/` sigue viéndose igual. Verificación: `/` sin cambios visuales y el link "Niños" navega a un 404 temporal (aún no existe la página, se crea en el paso siguiente).
5. `app/kids/page.tsx`: componer pantalla Niños con `Sidebar activeItem="kids"`, header, botón "Agregar niño" (`href="#"`), buscador estático, fila "SALA SOLES · 8 niños" y grid `repeat(2,1fr)` con las 8 `KidCard`. Verificación: visual contra `referencias/screenshots/ninos.png` (capturas en `.playwright-mcp/`).
6. `app/kids/[id]/page.tsx`: perfil con `generateStaticParams` de los 8 ids, `getKidById` + `notFound()`, cabecera, alerta condicional por `allergyNote`, tarjeta de datos, "Resumen del día" (`href="#"`, dark) y panel de padres con pills ACTIVA/PENDIENTE y "Vincular otro padre" (`href="#"`). Verificación: `/kids/mateo` visual contra `referencias/pantallas/perfil-nino.dc.html` abierta en el navegador.
7. Verificación final: `npm run lint`, `npx tsc --noEmit` y `npm run build` sin errores; repaso desktop de `/kids` y `/kids/mateo` contra las referencias.

## Acceptance criteria

- [ ] `/kids` muestra header "GESTIÓN / Niños", botón "Agregar niño", barra "Buscar niño…", fila "SALA SOLES · 8 niños" y 8 `KidCard` en el mismo orden y texto que `ninos.dc.html`.
- [ ] Las pills de las cards siguen la regla de datos: Mateo `MANÍ`, Tomás `LACTOSA`, Valentina `VINCULAR`, resto chevron; ningún texto de badge está hardcodeado por card.
- [ ] `/kids/[id]` genera estáticamente los 8 ids y `/kids/mateo` es visualmente idéntico a `perfil-nino.dc.html`: "Mateo Fernández", "3 años · Sala Soles", alerta "Alergia al maní…", filas "12 mar 2022 / Soles / feb 2025", botón dark "Resumen del día" y panel "PADRES VINCULADOS" con Lucía (ACTIVA) y Diego (PENDIENTE).
- [ ] Los otros 7 perfiles abren con datos coherentes (edad, sala, padres) sin romper el layout; un id inexistente devuelve 404.
- [ ] "Volver a Niños" navega a `/kids`; "Editar", "Agregar niño", "Resumen del día" y "Vincular otro padre" usan `href="#"`.
- [ ] El sidebar muestra "Niños" activo (fondo coral) en `/kids` y `/kids/[id]`; "Feed" sigue activo en `/` y la pantalla `/` no sufre ningún cambio visual respecto de SPEC 01.
- [ ] La barra de búsqueda no tiene lógica: ambas páginas son server components sin `"use client"`.
- [ ] Identificadores de código en inglés (`kids`, `allergyTag`, `activeItem`); todo texto visible en español idéntico a la plantilla.
- [ ] Los colores nuevos viven como tokens en `@theme` de `app/globals.css`; no hay hex huérfanos repetidos en componentes (usa `bg-[#...]` solo para valores de un solo uso).
- [ ] `npm run lint`, `npx tsc --noEmit` y `npm run build` terminan sin errores.
- [ ] La revisión visual desktop (≥1024px) de `/kids` contra `referencias/screenshots/ninos.png` y de `/kids/mateo` contra `perfil-nino.dc.html` no muestra diferencias apreciables.

## Decisions

- **Sí:** rutas en inglés `/kids` y `/kids/[id]` con id slug (`mateo`); decisión explícita del usuario de no usar nombres de página en español.
- **Sí:** buscador solo visual, sin filtrado en cliente; decisión del usuario ("solo interfaces y componentes").
- **Sí:** 8 perfiles mock completos; cualquier card abre su perfil, más fiel al flujo real y sin inventar UI nueva.
- **No:** que las 7 cards sin referencia abran el perfil de Mateo; engaña al navegar.
- **Sí:** `Sidebar` server component con prop `activeItem`; evita `"use client"` + `usePathname` y mantiene el árbol 100% estático.
- **No:** nav con `usePathname` client-side; client JS innecesario para una UI estática.
- **Sí:** badge de card derivado de `allergyTag`/`parents.length`; la regla de negocio de la referencia queda en datos, no en markup.
- **Sí:** `generateStaticParams` + `notFound()`; los 8 perfiles se prerenderan y cualquier otro id da 404 sin página de error custom.
- **Sí:** tokens nuevos en `@theme` + helper compartido `lib/avatar-colors.ts`; sigue la convención de SPEC 01 de centralizar hex y cubre la paleta repetida (cards, perfil, padres).
- **No:** breakpoint mobile; la referencia "idéntica" es desktop (coherente con SPEC 01).
- **No:** rutas de agregar-nino / resumen-dia / vincular-padre; cada una irá en su propio spec.

## Risks

| Risk | Mitigation |
| --- | --- |
| Modificar el `Sidebar` de SPEC 01 puede romper el feed existente | El paso 4 incluye comparar `/` contra `feed.png` antes de continuar; `activeItem="feed"` preserva el estado actual |
| `perfil-nino.dc.html` no tiene screenshot en `referencias/screenshots/` | Verificación abriendo el HTML de referencia en el navegador junto a `/kids/mateo`, con captura en `.playwright-mcp/` |
| Los 7 perfiles inventados pueden desviarse del estilo de la referencia | Ceñirse estrictamente a las plantillas de texto de Mateo (formatos de fecha "12 mar 2022", edades y relaciones "Mamá/Papá") sin agregar campos nuevos |

## What is **not** in this spec

- Rutas `agregar-nino`, `resumen-dia` y `vincular-padre` (cada una en su spec).
- Búsqueda funcional ni filtrado del listado.
- Autenticación ni sesión real.
- Base de datos o persistencia.
- Interactividad real (crear, editar, vincular).
- Versión mobile.
- Fotos reales de los niños.

Cada uno, si llega, va en su propio spec.
