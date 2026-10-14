# SPEC 01 — Home feed con identidad visual OpenDayCare

> **Status:** Implementado
> **Depends on:** ninguna
> **Date:** 2026-10-09
> **Objective:** Implementar la plantilla `referencias/pantallas/feed.dc.html` como home `/` con datos estáticos y estilo visualmente idéntico al proporcionado.

## Scope

**In:**

- Reescribir `app/page.tsx` como el feed: header de saludo ("Buenas, Caro" / "12 niños · martes 17 jun"), barra composer ("Compartí un momento…"), separador "PUBLICADO HOY" y lista de 3 posts.
- Componente nuevo `components/sidebar.tsx`: logo OpenDayCare / Sala Soles, botón "Nueva publicación", nav Feed (activo) / Niños / Avisos / Mi cuenta, footer con la usuaria Caro Giménez e ícono de logout.
- Componente nuevo `components/post-card.tsx`: card con avatar, nombre, hora, badge por tipo (LOGRO / ACTIVIDAD / ANUNCIO), destinatario, texto, placeholder de foto (sólo tipo actividad) y footer con reacciones, comentarios y "Editar".
- `lib/data/feed.ts` nuevo: mock tipado (`Post`, `PostKind`, `CurrentUser`) con exactamente los 3 posts y la usuaria de la plantilla.
- `app/globals.css`: reemplazar estilos del scaffold (Geist, dark mode) por tokens de la paleta cream en `@theme` y variables de fuente.
- `app/layout.tsx`: fuentes Nunito y Fredoka vía `next/font/google`, `lang="es"`, metadata title "OpenDayCare".
- Todos los links a rutas inexistentes quedan con `href="#"`.

**Out of scope (para specs futuros):**

- Autenticación, sesión real y logout funcional.
- Base de datos o persistencia: todo es mock estático.
- Rutas `crear-publicacion`, `ninos`, `avisos`, `mi-cuenta`, `detalle-publicacion`, `foto`, `login`.
- Interactividad real: reaccionar, comentar, editar o crear publicaciones.
- Versión mobile / responsive.
- Imágenes reales: la foto queda como placeholder punteado, igual que en la plantilla.

## Data model

```ts
// lib/data/feed.ts
export type PostKind = "achievement" | "activity" | "announcement";

export interface Post {
  id: string;
  kind: PostKind;
  authorName: string;   // "Mateo" | "Anuncio general"
  authorInitial: string; // "M"; el tipo announcement usa ícono de megáfono en su lugar
  time: string;          // "14:20"
  audience: string;      // "Para: familia de Mateo" | "Para: toda la sala"
  body: string;
  photoLabel?: string;   // "Foto · pintando con témperas" (sólo activity)
  likes: number;
  comments: number;
}

export interface CurrentUser {
  name: string;         // "Caro Giménez"
  role: string;         // "Maestra · Soles"
  initial: string;      // "C"
  greeting: string;     // "Buenas, Caro"
  roomSummary: string;  // "12 niños · martes 17 jun"
}
```

Los valores de `PostKind` están en inglés siguiendo las reglas de código limpio del repo; el texto visible del badge sigue en español ("LOGRO", "ACTIVIDAD", "ANUNCIO") mediante un map `Record<PostKind, string>` en `post-card.tsx`.

Colores de badge por `kind` fijados en `post-card.tsx`: achievement `#CFEBD8/#3E9B6C`, activity `#C7E7F1/#2E89A6`, announcement `#CCD8F4/#4E72C8`.

## Implementation plan

1. `app/globals.css`: eliminar estilos Geist/dark del scaffold; definir tokens `@theme` (cream `#F6ECDF`, surface `#FFFDF9`, border `#ECE0D0`, ink `#3F362E`, muted, coral de acento) y base del body + scrollbar. Verificación: `npm run dev` compila y `/` muestra fondo cream.
2. `app/layout.tsx`: registrar `Nunito` y `Fredoka` de `next/font/google` como variables CSS en `@theme`, `lang="es"`, metadata OpenDayCare; quitar Geist. Verificación: dev renderiza con las fuentes nuevas.
3. `lib/data/feed.ts`: crear el mock tipado con los 3 posts y la usuaria. Verificación: `npx tsc --noEmit` pasa.
4. `components/sidebar.tsx`: sidebar de 248px sticky con los SVG inline de la plantilla, item Feed activo y links `href="#"`. Verificación: renderizado temporal en `/` muestra la columna completa.
5. `components/post-card.tsx`: card que recibe `Post`, con badge por `kind`, placeholder de foto condicional y footer de reacciones. Verificación: `/` lista los 3 posts del mock.
6. `app/page.tsx`: componer sidebar + main (header, composer, separador, lista de `PostCard`); borrar todo el markup del scaffold. Verificación: revisión visual de `/` contra `referencias/screenshots/feed.png`.
7. Verificación final: `npm run lint`, `npx tsc --noEmit` y `npm run build` sin errores; repaso visual desktop contra `feed.dc.html`.

## Acceptance criteria

- [x] `/` muestra sidebar, header de saludo, composer, separador "PUBLICADO HOY" y 3 posts en el mismo orden y estructura que `feed.dc.html`.
- [x] Fondos, superficies, bordes y textos usan la paleta de la plantilla (`#F6ECDF`, `#FFFDF9`, `#ECE0D0`, `#3F362E`).
- [x] Nunito es la fuente de texto y Fredoka la de títulos/logo, cargadas vía `next/font/google` (sin `<link>` a Google en el HTML).
- [x] Los badges LOGRO (verde), ACTIVIDAD (celeste) y ANUNCIO (lila) aparecen con punto, mayúsculas y colores de la plantilla.
- [x] Los identificadores de código (`PostKind`, campos, componentes, variables) están en inglés; los textos visibles mantienen el español exacto de la plantilla.
- [x] El post de actividad muestra el placeholder punteado con ícono y etiqueta; el anuncio muestra avatar con megáfono en vez de inicial.
- [x] Ningún link navega a un 404: todos los destinos inexistentes son `href="#"`.
- [x] No quedan referencias a Geist, al scaffold de create-next-app ni a dark mode en `app/`.
- [x] `npm run lint`, `npx tsc --noEmit` y `npm run build` terminan sin errores.
- [x] La revisión visual manual de `/` en viewport desktop (≥1024px) contra `referencias/screenshots/feed.png` no muestra diferencias apreciables.

## Decisions

- **Sí:** sidebar y `PostCard` como componentes compartidos; las demás pantallas de `referencias/` reusan el mismo shell y la misma card.
- **Sí:** `href="#"` para rutas muertas; evita 404s hasta que existan los specs de navegación.
- **Sí:** mock tipado en `lib/data/feed.ts`; el spec de base de datos sólo cambiará el origen del dato, no los componentes.
- **Sí:** Tailwind v4 con tokens en `@theme`; es el stack del repo (no hay `tailwind.config.js`) y centraliza los hex.
- **Sí:** `next/font/google`; self-hosting sin requests runtime a Google ni layout shift.
- **Sí:** identificadores internos en inglés (`achievement` / `activity` / `announcement`) con labels visibles en español vía un map en `post-card.tsx`; cumple las reglas de código limpio sin alterar la UI.
- **No:** inline styles 1:1; replicarían la plantilla pero son ajenos al stack e inmantenibles.
- **No:** breakpoint mobile en este spec; la referencia "idéntica" es desktop y el responsive se definirá con navegación real.
- **No:** diff de píxeles automatizado (pixelmatch); agregaría dependencias y umbrales para una verificación puntual que la revisión manual cubre.
- **No:** route group `(app)/layout.tsx` para el sidebar; con una sola ruta real, un componente basta y no condiciona el routing futuro.

## Risks

| Risk | Mitigation |
| --- | --- |
| Nunito/Fredoka vía `next/font` difieren levemente de los `<link>` de Google en la plantilla (pesos disponibles, métricas) | Declarar exactamente los pesos de la plantilla (Fredoka 400–700, Nunito 400–800) y comparar visualmente contra `feed.png` |
| Radios y sombras approximados por Tailwind se desvían de los valores inline de la plantilla | Usar valores arbitrarios (`rounded-[18px]`, `shadow-[0_4px_16px_-12px_rgba(120,90,60,.5)]`) donde no haya token exacto |

## What is **not** in this spec

- Autenticación ni sesión real.
- Base de datos o persistencia.
- Las rutas crear-publicacion, ninos, avisos, mi-cuenta, detalle-publicacion, foto y login.
- Interactividad real (reacciones, comentarios, edición).
- Versión mobile.
- Imágenes reales.

Cada uno, si llega, va en su propio spec.
