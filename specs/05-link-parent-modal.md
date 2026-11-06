# SPEC 05 — Modal Vincular padre (solo UI)

> **Status:** Implementado
> **Depends on:** SPEC 02
> **Date:** 2026-11-05
> **Objective:** Integrar en todos los perfiles `/kids/[id]` un modal interactivo para vincular otro padre, fiel a `vincular-padre.dc.html`, con envío simulado y sin persistencia.

## Scope

**In:**

- `components/link-parent-modal.tsx` nuevo: Client Component que contiene el disparador "Vincular otro padre", un `<dialog>` nativo y el formulario con estado local.
- El disparador conserva el aspecto actual del enlace de `app/kids/[id]/page.tsx`: ícono plus dentro de círculo dashed y texto coral, pero usa un `<button type="button">`.
- `app/kids/[id]/page.tsx`: reemplazar el `Link href="#"` actual por `LinkParentModal`, pasando `kid.name` como prop; la página sigue siendo server component.
- Overlay local sobre el perfil, sin cambio de URL: backdrop `rgba(63,54,46,.45)`, sin blur, y card centrada de `max-width` 480px.
- Card fiel a `referencias/pantallas/vincular-padre.dc.html`: fondo `#FBF4EC`, borde `#ECE0D0`, radio 24px, sombra de la referencia, header con título "Vincular padre" y subtítulo dinámico `a {kid.name}`.
- Aviso azul con el texto "Le enviaremos un correo con un código para que active su cuenta. Solo verá el feed de {primer nombre}." e ícono de información.
- Formulario con NOMBRE DEL PADRE/MADRE (`placeholder="Ej. Diego Fernández"`), EMAIL (`type="email"`, `placeholder="correo@ejemplo.com"`) y PARENTESCO con las opciones "Mamá", "Papá" y "Tutor/a".
- Nombre y email obligatorios mediante validación nativa; los mensajes de validación son los del navegador.
- Estado inicial en cada apertura: nombre y email vacíos, "Mamá" seleccionado y código de invitación visible.
- Selección visual de exactamente un parentesco mediante botones `type="button"`; "Mamá" usa los estilos azules seleccionados de la referencia al abrir.
- Bloque de invitación con label "CÓDIGO DE INVITACIÓN", código fijo `7K4P9` y texto "Vence en 7 días", visibles antes de enviar.
- CTA "Enviar invitación" con ícono de envío y gradiente coral de la referencia.
- Cierre con la X, Escape, clic directo en el backdrop y submit válido; cerrar descarta los valores y la próxima apertura usa el estado inicial.
- El submit válido solo cierra el modal: no agrega un padre, no cambia pills ni contadores y no navega.
- Accesibilidad nativa del `<dialog>`: fondo inerte, foco dentro del modal al abrir, foco devuelto al disparador al cerrar, nombre accesible asociado al título y botón de cierre con `aria-label="Cerrar"`.
- `app/globals.css`: tokens nuevos `--color-info-bg: #e3ecfb`, `--color-info-accent: #4e72c8`, `--color-info-ink: #3f5694`, `--color-relation-active-bg: #ccd8f4`, `--color-relation-active-border: #9fb8ec`, `--color-invite-border: #e6d08a` y `--color-invite-label: #a88526`.
- Reuso de los tokens existentes para los demás colores, incluidos `--color-consent-bg` y `--color-consent-ink` en el fondo y código de la invitación.
- Revisión visual desktop (≥1024px) de `/kids/mateo` con el modal abierto contra `vincular-padre.dc.html`, con capturas en `.playwright-mcp/`.

**Out of scope (para specs futuros):**

- Persistencia de cualquier tipo, backend, API routes y Server Actions.
- Envío real de emails y generación real de códigos o fechas de vencimiento.
- Alta de un padre PENDIENTE y actualización del perfil o del listado `/kids` después del submit.
- Validación personalizada, mensajes inline, estados loading, success o error.
- Pantalla de confirmación posterior al envío.
- URL propia para el modal, parallel routes, intercepting routes, deep linking o integración con atrás/adelante.
- Conexión del código con `/activate` y flujo real de activación.
- Reenvío, duplicados o límites de invitaciones.
- Versión mobile / responsive, igual que SPECs 01–04.

## Data model

La feature no introduce datos persistidos ni modifica los mocks existentes. Solo agrega estado local dentro de `components/link-parent-modal.tsx`:

```ts
type ParentRelation = "mother" | "father" | "guardian";

interface LinkParentFormState {
  name: string;
  email: string;
  relation: ParentRelation;
}

const initialFormState: LinkParentFormState = {
  name: "",
  email: "",
  relation: "mother",
};

interface LinkParentModalProps {
  childName: string;
}
```

- `childName` es el nombre completo del niño y se usa en el subtítulo.
- El primer nombre para el aviso azul se deriva de `childName`.
- Los textos visibles de parentesco siguen siendo "Mamá", "Papá" y "Tutor/a"; los identificadores de código quedan en inglés.
- `INVITATION_CODE = "7K4P9"` y `INVITATION_EXPIRY_LABEL = "Vence en 7 días"` son constantes presentacionales locales.
- No se reutiliza `lib/data/activation.ts`: su `Invite` representa otra invitación y no pertenece a este flujo.
- No se modifican `Kid`, `KidParent`, `kids` ni `getKidById` en `lib/data/kids.ts`.

## Implementation plan

1. `app/globals.css`: agregar los siete tokens nuevos a `@theme`. Verificación: `npx tsc --noEmit` y smoke visual de `/kids/mateo` sin cambios.
2. `components/link-parent-modal.tsx`: crear el Client Component con el disparador, el `<dialog>` vacío, header dinámico y ciclos de apertura/cierre con X, Escape y backdrop. Verificación: TypeScript compila y el estado vuelve al inicial después de cada cierre.
3. Mismo archivo: agregar nombre, email y selector de parentesco con estado controlado y validación nativa. Verificación: solo puede quedar un parentesco seleccionado y el submit inválido no cierra el diálogo.
4. Mismo archivo: agregar aviso azul, bloque de código fijo y CTA de submit; completar las clases visuales de toda la card según la referencia. Verificación: submit válido cierra sin efectos externos.
5. `app/kids/[id]/page.tsx`: sustituir el enlace `href="#"` por `LinkParentModal childName={kid.name}` sin convertir la página en Client Component. Verificación: el botón abre el modal en `/kids/mateo` y en otro perfil, con el nombre correspondiente y sin cambiar la URL.
6. Verificación final: `npm run lint`, `npx tsc --noEmit` y `npm run build` sin errores; pruebas de teclado, validación y reset con Playwright; comparación visual desktop y smoke de `/kids` y perfiles sin el modal abierto.

## Acceptance criteria

- [x] "Vincular otro padre" es un botón con la misma apariencia anterior y abre el modal en cualquier ruta `/kids/[id]` válida.
- [x] Abrir o cerrar el modal no cambia la URL ni navega a otra pantalla.
- [x] El modal usa un `<dialog>` nativo centrado sobre un backdrop `rgba(63,54,46,.45)` sin blur; el resto del perfil queda inerte.
- [x] La card tiene `max-width` 480px, fondo `#FBF4EC`, borde `#ECE0D0`, radio 24px y la sombra de la referencia.
- [x] El header muestra "Vincular padre", `a {nombre completo del perfil}` y una X con `aria-label="Cerrar"`.
- [x] El aviso azul reproduce el texto de la referencia y usa el primer nombre del niño actual en "Solo verá el feed de {primer nombre}.".
- [x] En cada apertura, NOMBRE DEL PADRE/MADRE y EMAIL están vacíos, "Mamá" está seleccionado y el código visible es `7K4P9` con "Vence en 7 días".
- [x] Los placeholders son exactamente "Ej. Diego Fernández" y "correo@ejemplo.com"; el email usa `type="email"` y ambos campos son obligatorios.
- [x] "Mamá", "Papá" y "Tutor/a" son seleccionables, nunca queda más de una opción activa y la activa reproduce los estilos de la referencia.
- [x] Un submit con nombre vacío o email inválido mantiene el modal abierto y muestra la validación nativa del navegador.
- [x] Un submit válido cierra el modal sin agregar padres, cambiar datos, mostrar confirmación ni ejecutar requests.
- [x] La X, Escape y el clic directo en el backdrop cierran el modal; cualquier cierre descarta los valores y restablece "Mamá" para la próxima apertura.
- [x] Al abrir, el foco queda dentro del diálogo; al cerrar, vuelve al botón "Vincular otro padre".
- [x] `app/kids/[id]/page.tsx` sigue siendo server component y la interactividad queda encapsulada en `components/link-parent-modal.tsx`.
- [x] No se modifican `lib/data/kids.ts` ni `lib/data/activation.ts`, no se agregan dependencias y no existen handlers de backend.
- [x] Los colores nuevos provienen de los siete tokens declarados y los colores existentes se reusan mediante `@theme`; identificadores en inglés y textos visibles en español.
- [x] `npm run lint`, `npx tsc --noEmit` y `npm run build` terminan sin errores.
- [x] La revisión visual desktop (≥1024px) de `/kids/mateo` con el modal abierto contra `referencias/pantallas/vincular-padre.dc.html` no muestra diferencias apreciables en la card, salvo el backdrop propio del overlay.
- [x] Las capturas de Playwright quedan en `.playwright-mcp/` y el perfil sin modal abierto no presenta regresiones visuales.

## Decisions

- **Sí:** overlay local sin URL; el usuario pidió un modal y no necesita deep linking ni navegación atrás/adelante.
- **Sí:** una isla cliente acotada en `components/link-parent-modal.tsx`; mantiene el perfil como server component y evita convertir toda la pantalla en cliente.
- **Sí:** `<dialog>` nativo y elementos HTML sin nuevas dependencias; aporta foco, fondo inerte y Escape con la mínima infraestructura.
- **Sí:** backdrop `rgba(63,54,46,.45)` sin blur; decisión del usuario porque la referencia solo define la card, no el overlay.
- **Sí:** envío simulado que cierra sin cambios; no se inventa persistencia, confirmación ni un padre pendiente ausentes del alcance.
- **Sí:** código fijo `7K4P9` y vencimiento de siete días visibles desde la apertura; reproduce exactamente la referencia.
- **Sí:** nombre y email obligatorios con validación nativa; evita diseñar un sistema de errores personalizado para un flujo sin backend.
- **Sí:** campos vacíos y "Mamá" preseleccionado en cada apertura; cerrar descarta el borrador, según decisión del usuario.
- **Sí:** disponible para todos los niños con subtítulo y aviso dinámicos; no se limita al mock de Mateo.
- **Sí:** primer nombre en el aviso y nombre completo en el subtítulo; reproduce "Mateo" y "Mateo Fernández" de la referencia.
- **No:** reutilizar el mock `Invite` de activación; tiene otro propósito y acoplaría dos flujos independientes.
- **No:** parallel o intercepting routes; sería complejidad innecesaria para un overlay local sin URL.
- **No:** estados loading, success o error; el submit es síncrono y no ejecuta ninguna operación externa.
- **No:** responsive mobile; se mantiene el alcance desktop de SPECs 01–04.

## Risks

| Risk | Mitigation |
| --- | --- |
| Un clic dentro de la card se interpreta como clic en el backdrop | Cerrar solo cuando el objetivo del clic sea el backdrop y cubrir el caso con Playwright |
| El foco o el estado quedan inconsistentes al alternar Escape, X y submit | Centralizar el cierre/reset y verificar cada mecanismo, incluida la devolución del foco al disparador |
| La card se compara contra una referencia a pantalla completa que no incluye overlay | Comparar la card de `/kids/mateo` con la referencia y revisar el backdrop por separado sobre el perfil |
| La isla cliente altera la generación estática de `/kids/[id]` | Pasar únicamente la prop serializable `childName`, no usar APIs de request y verificar `npm run build` |

## What is **not** in this spec

- Persistencia, backend, Server Actions o envío real de emails.
- Generación real de invitaciones, códigos o vencimientos.
- Alta de padres pendientes y actualización del perfil o listado.
- Validación personalizada, loading, success, error o confirmación.
- URL del modal, deep linking e integración con historial.
- Activación de cuenta mediante el código.
- Reenvíos, duplicados o límites de invitaciones.
- Versión mobile.

Cada uno, si llega, va en su propio spec.
