---
description: Verifica y marca los checks de "Acceptance criteria" de un spec de specs/ usando el agente spec-verifier.
agent: spec-verifier
---

Verifica los criterios de aceptación del spec indicado por el usuario: $ARGUMENTS

Sigue el flujo completo del agente (identificar spec → clasificar criterios → verificar con evidencia real, incluyendo screenshots en `.playwright-mcp/` comparados con `referencias/` → corregir y re-verificar → marcar `- [x]` sólo los verificados → reportar con tabla de evidencias).
