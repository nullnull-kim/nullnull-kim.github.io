---
title: "[Claude] Lo que pasa cuando corres 5 proyectos a la vez — Construyendo un sistema de alertas con Discord"
date: 2026-03-29
categories: [logs]
tags: [claude, vibe-coding, ai-workflow, discord, webhook, claude-code-hooks, monitoring, automation, heartbeat, multi-project, notification, devops, productivity]
slug: discord-alert
---

Ahora tengo 5 proyectos. shop, blog, code_dungeon, good_game, y un root que los gestiona a todos (ese no es su nombre real). Cada proyecto corre su propia sesión de Claude. El problema es que yo soy uno solo.

Si lanzo una tarea en shop y me paso a editar un borrador en blog, no sé cuándo terminó shop. Si inicio Phase 1 en code_dungeon y me voy a ver good_game, code_dungeon podría estar esperando confirmación de permisos y no me entero. Mirar 5 terminales en rotación no es monitoreo. Es solo dolor de ojos.

Necesito alertas.

## Por qué Discord Webhooks

Slack existe. Telegram existe. Elegí Discord. La razón es simple: puedes crear canales ilimitados gratis. Un canal por proyecto y las alertas no se mezclan. root-alerts, shop-alerts, blog-alerts, code_dungeon-alerts, good_game-alerts. Una URL de webhook por canal.

Guardé cada URL de webhook en `.claude/.discord-webhook` dentro de cada proyecto. Si hardcodeas URLs en scripts, hay que editar el script cada vez que se añade un proyecto, pero con archivos separados, solo creo un nuevo archivo de webhook.

## Primer Hook: Alerta al completar

Conecté un script de notificación Discord al [Stop hook](https://docs.anthropic.com/en/docs/claude-code/hooks). Cuando una sesión termina, envía el nombre del proyecto y la hora a Discord.

```bash
# Capturar stdin inmediatamente (prevenir competencia de stdin con otros hooks async)
INPUT=$(cat)
```

El Stop hook se ejecuta async. Cuando múltiples hooks corren simultáneamente, no hay garantía de cuál recibe stdin. `INPUT=$(cat)` al inicio del script lo captura inmediatamente.

## Todas las razones de parada eran "unknown"

Las alertas llegaban, pero todas decían "desconocido". **[shop] desconocido — 03-28 18:01**. Sé que terminó, pero no por qué. ¿Completado normal? ¿Overflow de tokens? ¿Rechazo?

Investigué el payload del Stop hook. No había campo `stop_reason`. El JSON que Claude Code pasa a los hooks no incluye la razón de terminación de sesión.

Encontré un rodeo. El payload tiene `transcript_path` — la ruta a un archivo JSONL con la transcripción completa de la sesión. Se ve así:

```jsonl
{"type":"user","message":{"role":"user","content":"Cambia la ruta del proyecto"},...}
{"type":"assistant","message":{"role":"assistant","content":[{"type":"text","text":"..."}],"stop_reason":"end_turn",...},...}
```

Una línea por evento, y los mensajes del asistente contienen el campo `stop_reason`. Reescribí el script para recorrer este archivo en reversa y extraer el último `stop_reason`.

```javascript
const lines = fs.readFileSync(tp, 'utf8').split('\n').filter(l => l.trim());
for (let i = lines.length - 1; i >= 0; i--) {
  const e = JSON.parse(lines[i]);
  if (e.stop_reason) { /* lo encontré */ }
}
```

Hay 7 posibles razones de parada. Mapeé cada una a una etiqueta en español.

| stop_reason | Etiqueta de alerta |
|-------------|-------------------|
| end_turn | Completado |
| max_tokens | Token agotado |
| model_context_window_exceeded | Contexto agotado |
| stop_sequence | Secuencia de parada |
| pause_turn | Pausado |
| refusal | Rechazado |
| tool_use | Llamada a herramienta |

Ahora recibo alertas como **[shop] Completado — 03-28 18:01** y **[blog] Token agotado — 03-28 15:32**.

## Filtrando alertas de sub-agentes

Llegó una alerta de completado, fui a ver la terminal — seguía corriendo. Añadí logs de debug e investigué. La causa era la finalización de tareas paralelas de sub-agentes.

Un ejemplo. Esta es la estructura de procesamiento de tareas que armé para el proyecto shop:

```
Solicitud del cliente
  → task-orchestrator (principal)
      ├─ frontend-developer   → Implementación UI
      ├─ backend-developer    → Implementación API
      ├─ code-reviewer        → Code review + verificación de rendimiento
      ├─ security-auditor     → Auditoría de seguridad (condicional)
      └─ quality-gatekeeper   → Verificación final
```

Cada vez que un sub-agente termina, se dispara el Stop hook. Aunque la sesión principal no haya terminado. Si 5 sub-agentes están en una tarea, son 6 alertas. frontend-developer completado, backend-developer completado, code-reviewer completado... mientras la sesión principal sigue corriendo.

Si el payload tiene un campo `agent_id`, es un sub-agente. Añadí un filtro para saltar tanto alertas como borrado de heartbeat para sub-agentes.

```bash
IS_SUBAGENT=$(echo "$INPUT" | node -e "..." 2>/dev/null)
[ "$IS_SUBAGENT" = "yes" ] && exit 0
```

## Las alertas de completado no son suficientes

Cuando Claude pide confirmación de permisos, pregunta por acceso de escritura, o espera input del usuario, el Stop hook no se dispara. "Esta tarea debe estar tardando," pensé, esperé — luego revisé y llevaba decenas de minutos esperando mi respuesta.

## Segundo Hook: Alerta de espera

La idea es simple. Cada vez que Claude ejecuta una herramienta, escribe un timestamp. Si el timestamp no se actualiza en 2 minutos, el proyecto se considera detenido.

Conecté un script de heartbeat al hook PostToolUse. Cada ejecución de herramienta escribe la hora actual en `.claude/.heartbeat`.

```bash
date +%s > "$PROJECT_ROOT/.claude/.heartbeat"
```

Eso es todo. Un hook de una línea.

Un script de vigilancia separado revisa los archivos de heartbeat de los 5 proyectos cada 60 segundos. Si la última actualización fue hace más de 2 minutos, envía una alerta "en espera" a Discord. Sin re-alertas dentro de 10 minutos para el mismo proyecto. Si no, es spam de alertas.

```bash
STALE_THRESHOLD=120    # 2 minutos
COOLDOWN=600           # Prevención de re-alerta 10 minutos
CHECK_INTERVAL=60      # Verificar cada 60 segundos
```

Cuando una sesión termina, el Stop hook borra el archivo de heartbeat. Esto previene alertas de "en espera" para proyectos que ya terminaron.

Ahora solo llegan alertas de terminación de la sesión principal.

## Configuración actual

Dos hooks y un script de vigilancia.

| Componente | Disparador | Función |
|------------|-----------|---------|
| heartbeat.sh | PostToolUse | Actualizar timestamp en cada ejecución de herramienta |
| notify-discord.sh | Stop | Alerta Discord al terminar sesión + borrar heartbeat |
| watcher.ps1 | Intervalo 60s (siempre corriendo) | Alerta "en espera" cuando heartbeat > 2min sin actualizar |
| .discord-webhook | — | Almacenamiento de URL webhook por proyecto |

Añadir un proyecto nuevo toma dos pasos: poner la URL del webhook en `.claude/.discord-webhook` y añadir la ruta al array PROJECTS de watcher.ps1.

5 proyectos corriendo simultáneamente. Las alertas de Discord están funcionando.

![Captura de alertas Discord](/img/blog/2026-03-29-discord-alert-01.png)

## Algo que leí después de construir esto

Hay un post llamado [50 Tips prácticos para Claude Code](https://news.hada.io/topic?id=27677) con este item:

> 48\. Reproducir sonido cuando Claude termina — Registrar un sonido del sistema via Stop Hook. Iniciar una tarea, cambiar a otro trabajo, recibir un ping cuando termina.

Si solo trabajas en local, eso parece suficiente.
