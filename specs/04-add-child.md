# SPEC 04 — Pantalla Agregar niño (solo UI)

> **Status:** Aprobado
> **Depends on:** SPEC 02
> **Date:** 2026-10-20
> **Objective:** Implementar `agregar-nino.dc.html` como la ruta `/kids/new`, una card de formulario sin sidebar y sin lógica, visualmente idéntica a la referencia.

## Scope

**In:**

- `app/kids/new/page.tsx` nuevo: pantalla completa cream con una card centrada (`max-w` 520px, fondo `#FBF4EC`, borde `#ECE0D0`, radio 24px, sombra) — sin `Sidebar`, fiel a la referencia.
- Header de la card: link "Cancelar" a la izquierda (en `--color-muted-dark`), título "Agregar niño" al centro (Fredoka 600, 18px) y link "Guardar" a la derecha (en `--color-coral-strong`); ambos links navegan a `/kids`.
- Cuerpo del formulario con 5 campos vacíos, sin `defaultValue` y sin handlers: NOMBRE COMPLETO (`placeholder="Ej. Martina López"`), fila de dos columnas con FECHA DE NACIMIENTO (`placeholder="dd/mm/aaaa"`) y SALA (`<select>` nativo con `appearance-none`, única opción "Soles" y chevron SVG), ALERGIAS (ETIQUETAS) (`placeholder="Ej. Maní, Lactosa"`) y NOTAS MÉDICAS (`<textarea>` de min-height 90px con `placeholder="Indicaciones, medicación, contactos…"`).
- `app/globals.css`: token nuevo `--color-card: #fbf4ec` en `@theme`; el resto de colores de la pantalla ya existen (`cream`, `border`, `ink`, `muted-dark`, `coral-strong`, `input-border`, `placeholder`, `photo-ink`).
- Cambio en `app/kids/page.tsx`: el botón "Agregar niño" pasa de `href="#"` a `href="/kids/new"`.

**Out of scope (para specs futuros):**

- Persistencia de cualquier tipo: "Guardar" no crea el niño, solo navega a `/kids`.
- Validación de campos, estados de error, disabled y loading.
- Selector real de salas (la única opción es "Soles").
- Tag-input de alergias: el campo es un texto libre con placeholder.
- Fecha nativa con `<input type="date">` o picker de calendario.
- Editar o eliminar un niño existente.
- Autenticación, sesión real.
- Versión mobile / responsive (la referencia "idéntica" es desktop, igual que SPEC 01–03).

## Data model

Esta feature no introduce nuevas estructuras de datos. No hay mock: los cinco campos nacen vacíos y no se lee ningún dato de `lib/data/*`. La ruta reusa el `currentUser` y el `kids` de SPEC 02 solo en la pantalla `/kids` que enlaza aquí.

## Implementation plan

1. `app/globals.css`: agregar `--color-card: #fbf4ec` a `@theme`. Verificación: `npm run dev` y `/`, `/kids` y `/login` se ven idénticas (token aún sin usar).
2. `app/kids/new/page.tsx`: server component con el shell de la pantalla (contenedor cream de `min-h-screen`, card centrada, header con "Cancelar"/"Agregar niño"/"Guardar" usando `Link` a `/kids`). Verificación: `/kids/new` muestra la card con el header correcto y la navegación funciona en ambos links.
3. Mismo archivo: los 5 campos del cuerpo (inputs, fila de fecha/sala con `select` + chevron, textarea) con las clases exactas de la referencia (padding 13px 16px, radio 14px, borde 1.5px `--color-input-border`, font 15px, labels 12px/800/`.7px`). Verificación: visual contra `referencias/pantallas/agregar-nino.dc.html` abierto en el navegador (capturas en `.playwright-mcp/`).
4. `app/kids/page.tsx`: `href="#"` → `href="/kids/new"` en el botón "Agregar niño". Verificación: `/kids` sin cambios visuales y el botón navega a `/kids/new`.
5. Verificación final: `npm run lint`, `npx tsc --noEmit` y `npm run build` sin errores; repaso desktop de `/kids/new` contra la referencia y smoke de `/`, `/kids` y `/kids/mateo`.

## Acceptance criteria

- [ ] `/kids/new` renderiza una card centrada de `max-w` 520px con fondo `#FBF4EC`, borde `#ECE0D0`, radio 24px y sombra `0 20px 50px -24px rgba(63,54,46,.35)` sobre fondo cream, sin `Sidebar`.
- [ ] El header de la card muestra "Cancelar" en `#94887B` (izquierda), "Agregar niño" en Fredoka 600 18px (centro) y "Guardar" en `#D9583C` (derecha).
- [ ] "Cancelar" y "Guardar" navegan a `/kids`.
- [ ] El formulario contiene NOMBRE COMPLETO (placeholder "Ej. Martina López"), FECHA DE NACIMIENTO (placeholder "dd/mm/aaaa"), SALA con `select` de única opción "Soles" y chevron, ALERGIAS (ETIQUETAS) (placeholder "Ej. Maní, Lactosa") y NOTAS MÉDICAS (textarea min-h 90px, placeholder "Indicaciones, medicación, contactos…").
- [ ] Los 5 campos están vacíos por defecto (sin `defaultValue`) y ninguno tiene handler, estado ni lógica de validación.
- [ ] `app/kids/new/page.tsx` es server component sin `"use client"` (el `<select>` no tiene `onChange`).
- [ ] El botón "Agregar niño" de `/kids` navega a `/kids/new` y el resto de la pantalla `/kids` no cambia visualmente.
- [ ] Identificadores de código en inglés; todos los textos visibles en español idénticos a la plantilla.
- [ ] Los colores se resuelven con tokens `@theme` existentes más el token nuevo `--color-card`; no hay hex huérfanos repetidos en el componente.
- [ ] `npm run lint`, `npx tsc --noEmit` y `npm run build` terminan sin errores.
- [ ] La revisión visual desktop (≥1024px) de `/kids/new` contra `referencias/pantallas/agregar-nino.dc.html` no muestra diferencias apreciables.

## Decisions

- **Sí:** ruta `/kids/new`, anidada bajo `/kids`; convención de rutas en inglés de SPEC 02 y semántica REST estándar (decisión del usuario).
- **Sí:** sin sidebar, card centrada a todo alto; la referencia no lo incluye, igual que `/login` y `/activate` (decisión del usuario).
- **Sí:** "Guardar" y "Cancelar" solo navegan a `/kids`, sin crear el niño; coherencia con el patrón "solo UI" de SPEC 01–03 (decisión del usuario).
- **No:** persistencia o estado de cliente (localStorage, `useState` en el listado); rompería el árbol 100% server component y merece spec propio.
- **Sí:** `<select>` nativo con `appearance-none` + chevron SVG y única opción "Soles"; es un form element permitido en server components sin handlers y se ve como la plantilla (decisión del usuario).
- **No:** `<input type="date">`; el picker nativo cambia el aspecto respecto de la referencia (decisión del usuario).
- **No:** tag-input de alergias con pills; añade UI nueva que no existe en la plantilla y requiere client JS (decisión del usuario).
- **No:** validación ni estados de error/disabled; no existe el flujo de guardado.
- **Sí:** token `--color-card: #fbf4ec` en `@theme`; sigue la convención de SPEC 02/03 de centralizar hex en tokens (el de la card se repite en borde, header y cuerpo).
- **No:** componente reutilizable nuevo; es una sola pantalla y no hay segunda aparición del patrón de form card.
- **Sí:** actualizar el botón "Agregar niño" de `/kids` a `/kids/new`; sin esto la pantalla es inalcanzable por UI (decisión del usuario).

## Risks

| Risk | Mitigation |
| --- | --- |
| El `<select>` nativo difiere del div de la plantilla (flecha/altura por defecto) | `appearance-none`, sin estilos del UA, chevron SVG literal (`stroke="#B0A290"`) posicionado a la derecha y comparación visual |
| `agregar-nino.dc.html` no tiene screenshot en `referencias/screenshots/` | Verificación abriendo el HTML de referencia en el navegador junto a `/kids/new`, con captura en `.playwright-mcp/` (igual que SPEC 02/03) |
| Cambiar el `href` del botón de `/kids` | Es un solo atributo; el paso 4 verifica que `/kids` no cambia visualmente |

## What is **not** in this spec

- Persistencia: "Guardar" no crea ni guarda el niño.
- Validación, errores y estados de carga del formulario.
- Salas múltiples (solo "Soles").
- Tag-input de alergias con pills.
- Fecha nativa con picker.
- Edición o borrado de niños.
- Autenticación.
- Versión mobile.

Cada uno, si llega, va en su propio spec.
