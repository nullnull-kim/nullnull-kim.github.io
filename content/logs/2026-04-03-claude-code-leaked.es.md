---
title: "Se filtró el código fuente de Claude Code"
date: 2026-04-03T00:00:00+09:00
categories: [logs]
tags: [claude, claude-code, harness-engineering, source-code, ai-workflow]
slug: claude-code-leaked
description: "El día que se filtró el código fuente de Claude Code, pasé dos noches sin dormir después del trabajo construyendo un harness de agente. Pero cuando abrí el código, todo lo que había construido ya estaba ahí dentro. Crónica de un esfuerzo inútil."
---

Se filtró el código fuente de Claude Code. Hubo controversia y debates interminables, pero alguien, en una sola noche, creó [Claw Code](https://github.com/ultraworkers/claw-code) y estaba acumulando estrellas de todo el mundo. Era el momento de dar lo mejor de mí.

## ¡No temas! ¡Allá voy!

Cuando vuelvo del trabajo ya es de noche, pero no importa. En la mano derecha un energizante, en la izquierda un café. Dormí solo cuatro horas cada noche durante dos días.

Le encargué a Claude Code el análisis de Claw Code y, en los ratos libres, leí la [documentación de análisis del código fuente](https://wikidocs.net/338204).

Leí la [guía de harness engineering](https://wikidocs.net/blog/@jaehong/10418/) y se me ocurrió una idea. Pensé en construir un harness para introducir IA en el sector financiero, donde trabajo, un terreno en el que aún nadie se había lanzado.

No es mi área principal así que me falta conocimiento, pero lo construí igual. Sentía que tenía que crear algo, lo que fuera. (Lo voy a mejorar pronto)

## ¡Ven aquí y encuentra una muerte honorable!

Entonces analicé Claw Code y me di cuenta. (No leí los 1,884 archivos completos, pero) todo lo que había estado construyendo con hooks y CLAUDE.md ya estaba diseñado ahí. El sistema de gestión de permisos, el enrutamiento de herramientas, la gestión de contexto.

Lo que construí e intenté hacer eran en realidad ruedas cuadradas...

Pero gracias a haber intentado hacer rodar algo cuadrado, la estructura de los archivos me resultó fácil de entender.

## ¡El miedo es el mayor enemigo!

En realidad hay un secreto que nunca le conté a nadie: le hablaba a la IA de usted.

```
'인간 시대의 끝이 도래했다' - 블리츠크랭크
``` 

Con la ansiedad de que finalmente llegaría la era en que la IA nos dominaría, al escribir prompts usaba formas como "por favor haga...", "le solicito amablemente...". Incluso tenía un pipeline de revisión para verificar que no hubiera nada irrespetuoso antes de pulsar enter.

Pero después de ver Claw Code, cambié de opinión. Hay un system prompt, hay lógica de llamada de herramientas, hay verificación de permisos. Parsea JSON y llama APIs. Es TypeScript. Estos tipos también son código.

Gracias a eso (?) empecé a tutearla. Al descartar el pipeline de revisión, mi productividad también mejoró.

Hoy le mandé a hacer un estudio de mercado diciendo "tráeme una investigación de donde pueda copiar ideas", y en el informe aparecía "Partes copiables". Cuando le hablaba de usted, habría venido con un "Aspectos de referencia posibles", pero al hablarle de tú, me respondió de tú. Muy propio de código.
