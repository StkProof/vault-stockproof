---
tags:
  - mapa
aliases:
  - Index
  - Home
---

# Hacka BNB — acciones tokenizadas

Vault de la participación en [BNB Hack: Tokenized Stocks Edition](https://www.bnbchain.org/en/hackathons/tokenized-stocks). Abrí **esta carpeta** (`vault-stockproof/`) como vault en Obsidian.

El producto se llama **StockProof**. Dado un ticker y un monto, responde cuatro preguntas antes de firmar el swap.

Brief para compartir, fuera de las notas: [ideamiento-alineamiento.pdf](../ideamiento-alineamiento.pdf).

El vault es la fuente de verdad del proyecto: decisiones, alcance y números salen de estas notas.

## Leer en este orden

1. [[Idea]] — qué construimos y para quién.
2. [[Alineamiento]] — cómo entra en el puntaje, las reglas y los premios.
3. [[Dolores]] — la evidencia que justifica el corte.
4. [[Brief]] — fechas, premios, stack y restricciones.
5. [[MVP]] — qué entra en las dos semanas y cómo se demo.
6. [[Diferenciador]] — la salida: el punto ciego que nadie más va a mirar.
7. [[Plan]] — cómo se reparte y en qué orden se construye.
8. [[Fuentes]] — de dónde salen los números.

## Estado

- Fecha de este corte: 26 de septiembre de 2026.
- Cierre de envíos: 11 de octubre de 2026, 12:00 UTC.
- Decisión vigente: la pantalla de las cuatro preguntas. El arbitraje de fin de semana queda afuera.
- 27 sep 2026: el código arranca en `stock-proof/` (repo `StkProof/stock-proof`) sobre la plantilla Next.js del harness. El producto se llama StockProof. La primera spec, todavía en borrador, es la ventana de preguntas 1 y 2.
- 27 sep 2026: el equipo son tres. Una persona hace frontend y producto. Las otras dos hacen juntas la lógica. Se encuentran en el resultado de la evaluación (contrato real y si la orden entra); la pantalla no decide eso.
- 27 sep 2026: la base de código es `stock-proof/lib/evaluate.ts`. La pantalla puede usar los cinco estados de `lib/evaluation-examples.ts`. Hay API key del portal de Binance; el código todavía no la llama. Va en `.env`, fuera del repo.
- 28 sep 2026: diferenciador agregado en [[Diferenciador]]. Además de las cuatro preguntas de entrada, StockProof muestra un bloque de salida en tres capas: Exit Now (simulación real), Exit Availability (reglas y horarios publicados) y Exit Risk (señales observables, sin predecir).
- 28 sep 2026: plan de desarrollo en [[Plan]], alineado con las ventanas del [[MVP]]. [[Idea]], [[MVP]] y [[Alineamiento]] ya incluyen el bloque de salida.
- 28 sep 2026: roles con nombre. Luciano: frontend y producto. Agustín y Lautaro: lógica. Olas de la lógica y propuesta de tablero en [[Plan]].
- 28 sep 2026: Lautaro queda a cargo de los entregables, sujeto a cambios. Reglas para no pisarse en [[Plan]].
- 28 sep 2026: [StockProof_README.md](StockProof_README.md) queda como relato para el jurado. Tres decisiones, el detalle en [[Idea#La frase no apaga los cortes]] y [[MVP]]:
  - El 1% y la verificación corren aunque la frase no los pida. Un tope de desvío que escriba el usuario se suma; no reemplaza la pregunta 3.
  - La pregunta 4 se queda. El arbitraje de fin de semana sigue afuera.
  - Se construye por las ventanas del [[MVP]], no por la fase 0 del README. Lo ya construido es preguntas 1 y 2 en `evaluate`.
- 30 sep 2026: la idea se queda. Se suman tres reglas, el detalle en [[Idea#La frase no apaga los cortes]] y [[Diferenciador]]:
  - No se cambia de wrapper en silencio. Se ven las tres cotizaciones. Se firma una sola, con compra y venta bajo el tope. Si hay más de una, la de menor impacto. El comprobante nombra cuál quedó.
  - Toda negativa devuelve la orden que sí firmaría.
  - Exit Now es compuerta, al mismo nivel que la compra. Availability y Risk informan y no deciden. Si la venta no se puede medir, no se firma.
  - El mismo sábado se firma en un nombre líquido (el libro está clavado) y corta en un nombre fino si la venta se pasa del tope. El reloj no es el corte.
  - El agente opera solo después de una orden, con la wallet de esa orden. No busca trades. La pantalla de las cuatro preguntas sigue. Queda afuera un wrapper por defecto callado y un comprobante que reemplace las cuatro respuestas.
  - `evaluate` hoy elige por impacto de compra. La regla nueva manda cuando exista la cotización de venta.
