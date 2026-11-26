# SPEC 07 — Tabla `daycares` con migración y datos semilla

> **Estado:** Implementado
> **Depende de:** Ninguna (primera tabla del esquema)
> **Fecha:** 2026-11-25
> **Objetivo:** Crear la tabla `public.daycares` según el esquema de referencia, registrar su migración local y aplicarla al proyecto Supabase conectado con RLS y cuatro guarderías iniciales.

## Scope

**In:**

- Inicializar `supabase/migrations/` replicando el historial remoto existente:
  - `20261123204658_create_test_table.sql`.
  - `20261123211210_drop_test_table.sql`.
- Crear una migración versionada para `public.daycares` con las columnas `id`, `name` y `created_at`.
- Configurar `id` con valor generado por defecto, `created_at` con la fecha de creación por defecto y `name` como obligatorio y no vacío.
- Habilitar RLS sin crear políticas, manteniendo bloqueado el acceso de `anon` y `authenticated`.
- Insertar cuatro datos semilla: `Guardería Sala Soles`, `Guardería Arcoíris`, `Guardería Semillitas` y `Guardería Estrellitas`.
- Evitar duplicados por coincidencia exacta de `name` si el SQL de la semilla se vuelve a ejecutar manualmente.
- Aplicar únicamente la nueva migración al proyecto Supabase conectado mediante `apply_migration`; las migraciones de prueba ya están aplicadas y no se volverán a ejecutar.
- Verificar la estructura, restricciones, RLS, datos semilla e historial de migraciones.
- Ejecutar los advisors de seguridad, rendimiento y salud después del cambio.

**Out of scope (para specs futuras):**

- Agregar `address`, `updated_at` o cualquier otra columna no definida para `daycares` en la referencia.
- Crear políticas de lectura o escritura basadas en usuarios o pertenencia a una guardería.
- Crear las tablas `users`, `rooms`, `children` o cualquier otra tabla y enum del modelo.
- Integrar la tabla con las pantallas, mocks, clientes Supabase o tipos TypeScript de la aplicación.
- Instalar Supabase CLI, levantar un entorno local o crear una rama de desarrollo remota.
- Agregar una restricción de unicidad sobre `name`.
- Modificar o revertir las migraciones remotas de prueba existentes.

## Data model

La migración crea la tabla en el esquema `public`, siguiendo los nombres y tipos de la referencia:

```sql
create table public.daycares (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  created_at timestamptz not null default now(),
  constraint daycares_name_not_blank
    check (btrim(name) <> '')
);

alter table public.daycares enable row level security;
```

Convenciones:

- `id` usa el UUID generado por `gen_random_uuid()` definido en la referencia.
- `created_at` se asigna automáticamente con `now()`.
- `name` no admite `NULL`, cadenas vacías ni valores compuestos únicamente por espacios.
- No se crea ninguna política RLS en esta migración.
- No se agrega una restricción `UNIQUE` sobre `name`.

Datos semilla:

```sql
insert into public.daycares (name)
select seed.name
from (
  values
    ('Guardería Sala Soles'),
    ('Guardería Arcoíris'),
    ('Guardería Semillitas'),
    ('Guardería Estrellitas')
) as seed(name)
where not exists (
  select 1
  from public.daycares as daycare
  where daycare.name = seed.name
);
```

La semilla solo proporciona `name`; `id` y `created_at` usan sus valores por defecto. La comparación de nombres es exacta y distingue mayúsculas, minúsculas y acentos.

## Implementation plan

1. **Replicar el historial remoto.** Crear `supabase/migrations/20261123204658_create_test_table.sql` y `supabase/migrations/20261123211210_drop_test_table.sql` con los nombres, versiones y sentencias registrados en Supabase. No volver a aplicar estas migraciones.

2. **Aplicar y registrar `daycares`.** Confirmar que `public.daycares` todavía no existe y aplicar el SQL aprobado mediante `apply_migration` con el nombre `create_daycares_table`. Consultar después la versión asignada por Supabase y crear `supabase/migrations/<versión>_create_daycares_table.sql` con exactamente el mismo SQL.

3. **Verificar el cambio remoto.** Inspeccionar columnas, tipos, valores por defecto, restricciones y RLS. Confirmar que no existen políticas y que están las cuatro guarderías. Probar la reejecución de la semilla dentro de una transacción que termine en `ROLLBACK`, verificando que no genera duplicados ni cambios permanentes. Ejecutar los advisors de seguridad, rendimiento y salud; corregir cualquier problema nuevo atribuible a esta migración sin relajar RLS.

4. **Cerrar la trazabilidad.** Comparar los tres archivos locales con el historial remoto. Marcar en esta spec los criterios de aceptación comprobados, registrar la versión aplicada y cambiar su estado a `Implementado` únicamente si todas las verificaciones pasan.

## Acceptance criteria

- [x] Existen localmente `20261123204658_create_test_table.sql` y `20261123211210_drop_test_table.sql`, con las mismas sentencias registradas en el historial remoto.
- [x] Las migraciones remotas de prueba aparecen una sola vez en el historial y no fueron reaplicadas.
- [x] Existe `supabase/migrations/<versión>_create_daycares_table.sql`, cuya versión y contenido coinciden con la migración `create_daycares_table` registrada en Supabase.
- [x] `public.daycares` existe y contiene únicamente las columnas `id`, `name` y `created_at`.
- [x] `id` es `uuid`, forma la clave primaria y tiene `gen_random_uuid()` como valor por defecto.
- [x] `created_at` es `timestamptz NOT NULL` y tiene `now()` como valor por defecto.
- [x] `name` es `text NOT NULL` y la restricción `daycares_name_not_blank` rechaza cadenas vacías o compuestas únicamente por espacios.
- [x] No existe una restricción `UNIQUE` sobre `name`.
- [x] RLS está habilitado en `public.daycares` y la tabla no tiene políticas RLS.
- [x] La tabla contiene exactamente cuatro filas, una por cada nombre acordado: `Guardería Sala Soles`, `Guardería Arcoíris`, `Guardería Semillitas` y `Guardería Estrellitas`.
- [x] Las cuatro filas tienen `id` y `created_at` generados automáticamente.
- [x] Una segunda ejecución del SQL de la semilla agrega cero filas y la transacción de prueba se revierte sin cambios permanentes.
- [x] La migración `create_daycares_table` aparece una sola vez en el historial remoto.
- [x] Se ejecutaron los advisors de seguridad, rendimiento y salud; cualquier hallazgo nuevo relacionado con `daycares` quedó corregido o documentado como una decisión deliberada.

## Implementation record

- **Migración aplicada:** `20261126202423_create_daycares_table` (`create_daycares_table`).
- Los tres archivos locales fueron comparados con `supabase_migrations.schema_migrations`; sus versiones y sentencias coinciden, y cada migración aparece una sola vez.
- Las pruebas de restricciones y de reejecución de la semilla terminaron en `ROLLBACK`; la tabla conserva exactamente las cuatro filas iniciales.
- Advisors ejecutados el 2026-11-26: rendimiento y salud sin hallazgos. Seguridad reportó `rls_enabled_no_policy` (`INFO`) para `public.daycares`, mantenido como una decisión deliberada de menor privilegio según `Decisions` y `Risks`.
- Los avisos sobre `public.rls_auto_enable()` no son atribuibles a esta migración y quedan fuera de su alcance.

## Decisions

- **Sí:** Mantener únicamente `id`, `name` y `created_at`. La migración debe respetar la referencia sin anticipar campos que todavía no tienen un caso de uso.
- **No:** Agregar `address` o `updated_at`. Podrán incorporarse mediante una migración posterior cuando exista una necesidad confirmada.
- **Sí:** Usar `uuid` con `gen_random_uuid()` para la clave primaria. Mantiene la convención definida para todo el modelo de OpenDayCare.
- **No:** Cambiar a `bigint identity` o UUIDv7. Aunque son alternativas válidas, introducirían una convención distinta desde la primera tabla.
- **Sí:** Exigir un nombre no vacío con `NOT NULL` y `CHECK`. Evita registros sin un nombre utilizable.
- **No:** Exigir nombres únicos. Dos guarderías diferentes pueden compartir nombre y la referencia no establece esa regla de negocio.
- **Sí:** Habilitar RLS sin políticas. Es la opción de menor privilegio mientras no exista `users` para determinar qué guardería puede ver o modificar cada usuario.
- **No:** Permitir lectura pública, lectura autenticada global ni políticas de escritura temporales. Expondrían datos sin el modelo de autorización definitivo.
- **Sí:** Insertar las cuatro guarderías semilla en la misma migración. Dejan datos de demostración disponibles desde el primer cambio del esquema.
- **Sí:** Usar `WHERE NOT EXISTS` por coincidencia exacta de `name`. Evita duplicados al reejecutar manualmente la semilla sin agregar unicidad ni UUIDs fijos.
- **No:** Confiar en `ON CONFLICT DO NOTHING`. Sin una restricción única no evitaría nombres duplicados.
- **Sí:** Replicar localmente las dos migraciones remotas de prueba antes de registrar la nueva. El directorio `supabase/migrations/` quedará alineado con el historial existente.
- **No:** Reaplicar ni modificar las migraciones de prueba remotas. Ya surtieron efecto y no forman parte del cambio funcional.
- **Sí:** Aplicar directamente al proyecto conectado mediante MCP y usar la versión asignada por Supabase en el nombre del archivo local. Evita instalar la CLI e inventar versiones.
- **No:** Configurar Supabase CLI, levantar un stack local o crear una rama remota. Amplían el trabajo sin ser necesarios para esta migración.
- **No:** Integrar la aplicación con la tabla ni generar tipos TypeScript. Esta spec termina en la base de datos y su historial de migraciones.

## Risks

| Risk | Mitigation |
| ---- | ---------- |
| RLS sin políticas impide que la aplicación lea las cuatro guarderías o cree nuevas mediante `anon` y `authenticated`. | Es el comportamiento deliberado de esta versión. Las políticas se diseñarán cuando exista `users`; no se deshabilitará RLS como solución temporal. |
| Un advisor puede señalar que RLS está habilitado sin políticas. | Revisar el hallazgo y documentarlo como una restricción intencional si corresponde, en lugar de agregar una política permisiva solo para eliminar el aviso. |
| La semilla solo reconoce coincidencias exactas de `name`; diferencias de mayúsculas, acentos o espacios pueden producir nombres parecidos y ejecuciones concurrentes podrían duplicarlos. | Usar los cuatro valores exactos definidos y ejecutar la migración una sola vez. Cualquier normalización o unicidad adicional requerirá una decisión y migración posterior. |
| La migración se aplica directamente al proyecto conectado, sin una ejecución previa en un stack local o una rama. | Confirmar antes que `daycares` no existe, aplicar el SQL ya revisado una sola vez y verificar inmediatamente el resultado. Ante un error, diagnosticar la causa antes de reintentar. |
| Crear archivos para un historial remoto ya existente puede producir diferencias entre las versiones o sentencias locales y remotas. | Copiar las sentencias registradas, usar la versión asignada por Supabase para la nueva migración y comparar los tres archivos con `list_migrations` antes de cerrar la spec. |

## What is **not** in this spec

- Columnas adicionales como `address` o `updated_at`.
- Políticas RLS de lectura o escritura y acceso de la aplicación a los datos semilla.
- Una restricción `UNIQUE` o normalización de `name`.
- Tablas relacionadas, enums, triggers o funciones adicionales.
- Integración con pantallas, mocks, clientes Supabase o tipos TypeScript.
- Instalación de Supabase CLI, desarrollo con un stack local o creación de una rama remota.
- Modificación o reaplicación de las migraciones remotas de prueba.

Cada uno de esos cambios, si llega, va en su propia spec.
