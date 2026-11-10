# SPEC 06 — Modal Nueva publicación (solo UI)

> **Status:** Implementado
> **Depends on:** SPEC 01, SPEC 02
> **Date:** 2026-11-06
> **Objective:** Abrir desde los dos disparadores del feed `/` un modal interactivo para redactar una nueva publicación, fiel a `crear-publicacion.dc.html`, con publicación simulada y sin persistencia.

## Scope

**In:**

- `components/create-post-modal.tsx` nuevo: Client Component con variantes de disparador `sidebar` y `composer`, un `<dialog>` nativo y estado local para destinatarios y descripción.
- `app/page.tsx`: usar el modal tanto en “Nueva publicación” del sidebar como en “Compartí un momento…”, conservando la apariencia actual de ambos disparadores.
- `components/sidebar.tsx`: aceptar un disparador opcional para “Nueva publicación”; `/` pasa el modal y las demás pantallas conservan el enlace actual `href="#"`.
- Overlay local sobre `/`, sin cambio de URL: backdrop `rgba(63,54,46,.45)`, sin blur, y card centrada de `max-width` 580px.
- Card fiel a `referencias/pantallas/crear-publicacion.dc.html`: fondo `#FBF4EC`, borde `#ECE0D0`, radio 24px, sombra de la referencia y header con “Cancelar”, “Nueva publicación” y “Publicar”.
- Sección PARA con los 8 niños de `lib/data/kids.ts`, en su orden actual y con su primer nombre, inicial y color de avatar; “Toda la sala” aparece después de los niños.
- Selección múltiple de niños mediante botones `type="button"`; cada niño puede activarse o desactivarse individualmente.
- “Toda la sala” es excluyente: activarlo vacía la selección de niños y activar cualquier niño desactiva “Toda la sala”.
- Estado inicial en cada apertura: ningún niño seleccionado, “Toda la sala” desactivado y descripción vacía.
- Sección TIPO con los 7 controles de la referencia, solo visuales y sin estado: “Comida”, “Siesta”, “Actividad”, “Logro”, “Ánimo”, “Foto” y “Anuncio”.
- Los estilos fijos de TIPO reproducen literalmente la referencia: “Comida” y “Actividad” usan fondo oscuro con texto blanco; los otros cinco usan sus fondos pastel y textos de color.
- DESCRIPCIÓN con textarea controlado, vacío al abrir, `required`, validación nativa y placeholder exacto “Contá cómo le fue hoy…”.
- FOTOS con el placeholder de imagen y el control “Agregar” de la referencia, ambos decorativos y sin selector de archivos, previews ni carga.
- “Publicar” es el submit del formulario; con descripción válida cierra el modal, descarta el borrador y no agrega publicaciones ni ejecuta requests.
- Cierre con “Cancelar”, Escape, clic directo en el backdrop y submit válido; todo cierre restablece el estado inicial para la próxima apertura.
- Accesibilidad nativa del `<dialog>`: fondo inerte, foco dentro del modal al abrir, foco devuelto al disparador correspondiente al cerrar, nombre accesible asociado al título e IDs únicos entre las dos instancias del feed.
- `app/globals.css`: tokens nuevos `--color-post-nap-bg: #e7dcf6` y `--color-post-activity: #2e89a6`; reuso de los tokens existentes para los demás colores.
- Revisión visual desktop (≥1024px) de `/` con el modal abierto contra `crear-publicacion.dc.html`, con capturas en `.playwright-mcp/`.

**Out of scope (para specs futuros):**

- Persistencia de cualquier tipo, backend, API routes y Server Actions.
- Crear una publicación, modificar `posts`, agregar una card al feed o cambiar contadores después del submit.
- Abrir el modal desde `/kids`, `/kids/[id]` u otras pantallas distintas de `/`.
- Selección interactiva del tipo de publicación o integración con `PostKind`.
- Selector de archivos, previews, upload, almacenamiento de imágenes o eliminación de fotos.
- Validación de destinatarios, descripción con trim, mensajes personalizados, estados disabled, loading, success o error.
- Pantalla de confirmación posterior a publicar.
- URL propia para el modal, parallel routes, intercepting routes, deep linking o integración con atrás/adelante.
- Guardar borradores entre cierres o sesiones.
- Versión mobile / responsive, igual que SPECs 01–05.

## Data model

La feature no introduce datos persistidos ni modifica `Post`, `PostKind`, `posts`, `Kid` ni `kids`. Reutiliza los 8 registros de `lib/data/kids.ts` y solo agrega estado local dentro de `components/create-post-modal.tsx`:

```ts
type CreatePostTrigger = "sidebar" | "composer";

interface CreatePostModalProps {
  trigger: CreatePostTrigger;
}

interface CreatePostFormState {
  selectedKidIds: string[];
  allRoom: boolean;
  description: string;
}

const initialFormState: CreatePostFormState = {
  selectedKidIds: [],
  allRoom: false,
  description: "",
};
```

- `selectedKidIds` contiene valores de `Kid.id`.
- Activar un niño alterna su `id` en `selectedKidIds` y fija `allRoom` en `false`.
- Activar “Toda la sala” fija `allRoom` en `true` y `selectedKidIds` en `[]`; activarlo nuevamente lo desactiva.
- El nombre visible de cada niño se deriva del primer nombre de `Kid.name`; la inicial y los colores se derivan del mismo mock.
- TIPO y FOTOS no tienen estado porque son controles exclusivamente visuales.
- No se extiende `PostKind`: este flujo no crea publicaciones ni necesita representar los cuatro tipos adicionales en el modelo del feed.

## Implementation plan

1. `app/globals.css`: agregar `--color-post-nap-bg` y `--color-post-activity` a `@theme`. Verificación: `npx tsc --noEmit` y smoke visual de `/` sin cambios.
2. `components/create-post-modal.tsx`: crear el Client Component con las dos variantes de disparador, el `<dialog>` y el header; implementar apertura, cierre por Cancelar, Escape y backdrop, reset y devolución de foco. Verificación: cada instancia abre su propio diálogo sin cambiar la URL y reabre con el estado inicial.
3. Mismo archivo: agregar el formulario con textarea controlado, `required`, placeholder y submit simulado. Verificación: una descripción vacía mantiene el diálogo abierto mediante validación nativa; una descripción no vacía lo cierra sin requests.
4. Mismo archivo: renderizar los 8 niños desde `lib/data/kids.ts` y “Toda la sala”, con selección múltiple y exclusión mutua. Verificación: alternar niños, activar y desactivar toda la sala, y comprobar el reset después de cada cierre.
5. Mismo archivo: agregar los 7 tipos estáticos, la sección FOTOS y las clases visuales completas de la card según la referencia. Verificación: los tipos y “Agregar” no cambian estado ni abren selectores.
6. `components/sidebar.tsx` y `app/page.tsx`: incorporar el disparador opcional del sidebar, pasar `CreatePostModal trigger="sidebar"` solo desde `/` y reemplazar el composer actual por `CreatePostModal trigger="composer"`. Verificación: ambos disparadores abren el modal, conservan su aspecto y el botón del sidebar fuera de `/` sigue siendo `href="#"`.
7. Verificación final: `npm run lint`, `npx tsc --noEmit` y `npm run build` sin errores; pruebas de teclado, validación, selección y reset con Playwright; comparación visual desktop y smoke de `/kids` y `/kids/mateo`.

## Acceptance criteria

- [x] “Nueva publicación” del sidebar y “Compartí un momento…” abren el modal en `/` sin cambiar la URL ni navegar.
- [x] Los dos disparadores conservan la apariencia que tenían antes de incorporar el modal y usan `<button type="button">`.
- [x] El botón “Nueva publicación” de `/kids` y `/kids/[id]` no abre el modal y conserva su comportamiento actual.
- [x] El modal usa un `<dialog>` nativo centrado sobre un backdrop `rgba(63,54,46,.45)` sin blur; el resto del feed queda inerte.
- [x] La card tiene `max-width` 580px, fondo `#FBF4EC`, borde `#ECE0D0`, radio 24px y la sombra de la referencia.
- [x] El header muestra “Cancelar” a la izquierda, “Nueva publicación” al centro y “Publicar” a la derecha con los estilos de la referencia.
- [x] En cada apertura no hay destinatarios seleccionados y la descripción está vacía con placeholder “Contá cómo le fue hoy…”.
- [x] PARA muestra los 8 niños de `lib/data/kids.ts` en orden, usando primer nombre, inicial y colores de avatar del mock, seguidos por “Toda la sala”.
- [x] Cada niño puede seleccionarse y deseleccionarse sin alterar la selección de los demás niños.
- [x] Activar “Toda la sala” deselecciona todos los niños; activar un niño desactiva “Toda la sala”; activar nuevamente “Toda la sala” la deselecciona.
- [x] TIPO muestra exactamente “Comida”, “Siesta”, “Actividad”, “Logro”, “Ánimo”, “Foto” y “Anuncio”.
- [x] “Comida” y “Actividad” conservan los fondos oscuros con texto blanco de la referencia y los otros tipos conservan sus combinaciones pastel.
- [x] Los controles de TIPO son solo visuales: hacer clic no cambia sus estilos, no agrega estado y no modifica otros campos.
- [x] FOTOS reproduce el placeholder y “Agregar” de la referencia; hacer clic no abre un selector de archivos ni cambia el contenido.
- [x] El textarea es obligatorio mediante `required`; un submit vacío mantiene el modal abierto y muestra la validación nativa del navegador.
- [x] Un submit con descripción válida cierra el modal sin agregar publicaciones, modificar `posts`, mostrar confirmación ni ejecutar requests.
- [x] “Cancelar”, Escape y el clic directo en el backdrop cierran el modal incluso si el formulario es inválido; un clic dentro de la card no lo cierra.
- [x] Cualquier cierre descarta descripción y destinatarios, y la próxima apertura vuelve al estado inicial.
- [x] Al abrir, el foco queda dentro del diálogo; al cerrar, vuelve al mismo disparador que lo abrió.
- [x] Las dos instancias usan IDs accesibles únicos y cada diálogo tiene su nombre accesible asociado al título “Nueva publicación”.
- [x] `app/page.tsx` y `components/sidebar.tsx` siguen siendo server components y la interactividad queda encapsulada en `components/create-post-modal.tsx`.
- [x] No se modifican `lib/data/feed.ts` ni `lib/data/kids.ts`, no se agregan dependencias y no existen handlers de backend.
- [x] Los colores nuevos provienen de los dos tokens declarados y los colores existentes se reusan mediante `@theme`; identificadores en inglés y textos visibles en español.
- [x] `npm run lint`, `npx tsc --noEmit` y `npm run build` terminan sin errores.
- [x] La revisión visual desktop (≥1024px) de `/` con el modal abierto contra `referencias/pantallas/crear-publicacion.dc.html` no muestra diferencias apreciables en la card, salvo los ocho niños, el formulario inicialmente vacío y el backdrop propio del overlay.
- [x] Las capturas de Playwright quedan en `.playwright-mcp/` y el feed sin modal abierto no presenta regresiones visuales.

## Decisions

- **Sí:** modal disponible desde los dos disparadores de `/`; son los dos puntos de entrada elegidos por el usuario.
- **No:** habilitarlo desde el sidebar de `/kids` o `/kids/[id]`; el alcance queda limitado al feed.
- **Sí:** una isla cliente acotada en `components/create-post-modal.tsx`; mantiene el feed y el sidebar como server components.
- **Sí:** dos instancias independientes con variantes `sidebar` y `composer`; cada una conserva su propio disparador, foco y estado sin introducir un provider global.
- **Sí:** `<dialog>` nativo y elementos HTML sin nuevas dependencias; aporta foco, fondo inerte y Escape con la mínima infraestructura.
- **Sí:** backdrop `rgba(63,54,46,.45)` sin blur; mantiene el patrón visual adoptado en SPEC 05.
- **Sí:** formulario vacío en cada apertura; es una publicación nueva y cerrar descarta el borrador, según decisión del usuario.
- **Sí:** los 8 niños del mock; decisión del usuario aunque la referencia solo muestra tres.
- **Sí:** selección múltiple de niños y “Toda la sala” excluyente en ambos sentidos; evita estados de audiencia contradictorios.
- **Sí:** TIPO completamente estático con “Comida” y “Actividad” oscuros; reproduce literalmente la referencia y no inventa una selección de tipos.
- **Sí:** descripción obligatoria con validación nativa; no se validan destinatarios ni se agregan mensajes personalizados.
- **Sí:** FOTOS decorativa; no se introduce un flujo de archivos sin backend ni persistencia.
- **Sí:** publicación simulada que solo cierra y resetea; no se modifica el feed ni se muestra confirmación.
- **No:** extender `Post` o `PostKind`; no se crea ninguna publicación y los tipos visuales no forman parte del estado.
- **No:** URL, parallel o intercepting routes; sería complejidad innecesaria para un overlay local.
- **No:** responsive mobile; se mantiene el alcance desktop de SPECs 01–05.

## Risks

| Risk | Mitigation |
| --- | --- |
| Las dos instancias del modal generan IDs duplicados en `/` | Generar IDs por instancia con `useId` y verificar las asociaciones accesibles de ambos diálogos |
| Un clic dentro de la card se interpreta como clic en el backdrop | Cerrar solo cuando el objetivo del clic sea el backdrop y cubrir el caso con Playwright |
| El foco vuelve al disparador equivocado | Mantener refs y estado por instancia y probar apertura/cierre desde cada disparador |
| Los 8 niños y el formulario vacío difieren de la referencia visual | Registrar ambas desviaciones deliberadas en los criterios y comparar el resto de la card por separado |
| El trigger opcional altera el sidebar de otras rutas | Conservar el enlace actual como fallback y hacer smoke visual y funcional de `/kids` y `/kids/mateo` |

## What is **not** in this spec

- Persistencia, backend, Server Actions o creación real de publicaciones.
- Actualización del feed después de publicar.
- Apertura del modal fuera de `/`.
- Selección interactiva del tipo de publicación.
- Selector, preview, upload o almacenamiento de fotos.
- Validación de destinatarios, validación personalizada, loading, success, error o confirmación.
- Guardado de borradores.
- URL del modal, deep linking e integración con historial.
- Versión mobile.

Cada uno, si llega, va en su propio spec.
