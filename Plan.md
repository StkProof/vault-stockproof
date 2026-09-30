---
tags:
  - plan
aliases:
  - Plan de desarrollo
---

# Plan de desarrollo

Cómo se construye el [[MVP]] entre tres personas hasta el cierre del 11 oct 2026, 12:00 UTC (09:00 en Argentina). Las ventanas y el alcance son los del [[MVP]]; esta nota dice cómo se reparte y en qué orden. Lo que no está en el vault se marca como **propuesta** hasta que el equipo lo confirme.

## Equipo

Según el [[Índice]] (27 sep 2026):

| Rol | Quién | Qué hace |
| --- | --- | --- |
| Frontend y producto | Luciano | La pantalla única, los textos en castellano, el bloque de salida en pantalla |
| Lógica | Agustín y Lautaro, juntos | Las cuatro preguntas, la simulación, la ejecución por Agentic Wallet, Exit Now / Availability / Risk |

Se encuentran en el resultado de la evaluación. La pantalla no decide si el contrato es real ni si la orden entra.

Entregables (video, README, instrucciones de juez, Developer Experience Report): Lautaro, sujeto a cambios.

## El punto de encuentro: la evaluación

- La base de código es `stock-proof/lib/evaluate.ts`.
- La pantalla trabaja con los cinco estados de `lib/evaluation-examples.ts` mientras la lógica no está conectada. Así nadie espera a nadie.
- **Propuesta:** sumar ya al formato de la evaluación el bloque de salida (Exit Now, Exit Availability, Exit Risk) y un valor «sin dato». Cambiar el formato más tarde obliga a tocar pantalla y lógica a la vez.
- **Propuesta:** que la simulación de la pregunta 2 reciba la dirección (compra o venta) desde el principio. Exit Now es esa misma simulación hacia el otro lado.

## Orden de construcción

Primero una tajada de punta a punta, después se ensancha: un ticker líquido (QQQB), preguntas 1 y 2 reales, pantalla real. Eso ya es demoable, como dice el [[MVP]].

| Ventana | Frontend y producto | Lógica | Queda demoable |
| --- | --- | --- | --- |
| 26 sep – 3 oct | Pantalla con los cinco estados de ejemplo; después, conectada a la evaluación real | Preguntas 1 y 2: lista y attestation por ticker, simulación del monto en los tres wrappers, corte por contrato o por impacto | Sí. Impostores y órdenes que no entran |
| 4 oct – 9 oct | Preguntas 3 y 4 y bloque de salida en pantalla. Frase en castellano | Preguntas 3 y 4. Exit Now, Availability y Risk. Agente que se niega o firma un monto chico en mainnet | El video de 4 minutos |
| 10 oct | Buffer | Buffer | Repo, instrucciones de juez, Developer Experience Report |
| 11 oct | Envío antes de las 12:00 UTC | | |

**Propuesta:** adelantar a la primera ventana una transacción de prueba muy chica en BSC mainnet. La primera firma real suele traer sorpresas (aprobaciones, gas, configuración de la wallet del agente) y conviene verlas antes del 4 oct.

## Olas de la lógica (propuesta)

Cada ola termina con algo que corre. Agustín toma lo que simula y firma; Lautaro, lo que lee datos publicados y el log. Las fechas caen dentro de las ventanas del [[MVP]].

| Ola | Fechas | Agustín | Lautaro | Al terminar |
| --- | --- | --- | --- | --- |
| 0. Base común | 28–29 sep | Cliente de las APIs de Binance con la key del `.env` | Log automático de cada llamada (monto, precio, costo, error) para el Developer Experience Report | Con Luciano: formato de la evaluación congelado, con bloque de salida y «sin dato» |
| 1. Preguntas 1 y 2 | 29 sep – 1 oct | Pregunta 2: cotización y simulación del monto en bStocks, Ondo y xStocks, compra y venta; corte por umbral de impacto | Pregunta 1: búsqueda por ticker, lista oficial, attestation, BEP-8056 contra BEP-20 | Cada pregunta devuelve su respuesta real para QQQB |
| 2. Punta a punta | 2–3 oct | Conectar a `evaluate.ts`. Transacción de prueba muy chica en mainnet | Casos de prueba de las escenas 1 a 3 del video: monto chico, monto que no entra, contrato impostor | Primera ventana demoable: impostores y órdenes que no entran |
| 3. Preguntas 3 y 4 + salida | 4–6 oct | Pregunta 4 (libro clavado se informa en el líquido; pools que no coinciden cortan). Exit Now como compuerta: venta del mismo monto; si no hay quote o se pasa del tope, no se firma. Exit Risk informa | Pregunta 3 (referencia contra pool, multiplicador: con causa se explica y sigue). Exit Availability informa (mercado, próxima apertura, mint, redeem, canje) | QQQB sábado firma con libro clavado. SPCXB sábado corta en la venta y devuelve el monto que sí pasa |
| 4. Agente | 7–9 oct | Frase en castellano por Agentic Wallet: se niega o firma un monto chico en mainnet | Correr las cinco escenas del video todos los días. Borrador del informe desde el log | Video grabable el 9 oct |
| Buffer | 10 oct | Arreglos | Informe, instrucciones de juez | Envío el 11 antes de las 12:00 UTC |

Si una ola se atrasa, lo que se recorta es lo de la ola siguiente, no la ola 2: esa es la que asegura una demo.

## Tablero (propuesta)

Un solo GitHub Project para los tres, a nivel de la organización StkProof, con tareas de `stock-proof` y de este vault:

- Campo **Área**: Front y producto / Lógica / Entregables.
- Campo **Ola**: 0 a 4 y Buffer.
- Una vista por persona y una vista por ola.
- Una tarea que depende del otro lado (por ejemplo, un cambio en el formato de la evaluación) se marca como bloqueante.
- Las decisiones se anotan en el [[Índice]], no en el tablero.
- Las tareas se cargan en el tablero existente con `herramientas/cargar-olas.mjs` (instrucciones en `herramientas/README.md`): las 29 tareas de las olas con área, ola, responsable y fecha límite.

## Dónde nos podemos pisar (propuesta)

| Punto de choque | Quiénes | Regla |
| --- | --- | --- |
| Formato de la evaluación | Los tres | Se congela en la ola 0. Un cambio va en su propio pull request, lo aprueba alguien del otro lado, y quien lo cambia actualiza `evaluation-examples.ts` en el mismo cambio |
| `evaluate.ts` | Agustín y Lautaro | Cada pregunta y cada capa de salida en su propio archivo. `evaluate.ts` solo las llama en orden y lo toca una sola persona (Agustín) |
| Estado del mercado (abierto, cerrado, próxima apertura) | Pregunta 4 (Agustín) y Exit Availability (Lautaro) | Una sola función, dueño Lautaro. Agustín la usa, no la reescribe |
| Precios de pool y de referencia | Pregunta 3 (Lautaro) y pregunta 4 / Exit Risk (Agustín) | Una sola función de lectura de precios, dueño Agustín |
| Cliente de las APIs de Binance | Los dos | Después de la ola 0 solo se le agregan cosas; no se cambia lo que ya existe sin avisar |
| Umbrales (impacto máximo, costo máximo) | Lógica y pantalla | Un solo archivo de configuración. Ningún número suelto en el código |
| Textos en castellano | Lógica y pantalla | La lógica devuelve un código de motivo; Luciano escribe el texto que ve la persona |
| API key y límites de uso | Los dos | Cada entrada del log dice quién y desde dónde llamó, para no mezclar pruebas con datos del informe |
| Wallet de mainnet | Agustín y quien pruebe | Solo Agustín firma en mainnet. Las pruebas de los demás son simulaciones |
| [[Índice]] y notas del vault | Los tres | Cada uno agrega su línea al final de «Estado» y hace commit enseguida. Las decisiones grandes, por pull request |

Forma de trabajo en `stock-proof`: `main` protegido, una rama corta por tarea del tablero, pull requests chicos y unidos el mismo día o el siguiente. Una rama que vive más de dos días es la que termina en conflicto.

## Reglas que ya están en el vault

- Si el 9 oct la demo ya corre, el buffer no se usa para abrir alcance ([[MVP]]).
- El log del Developer Experience Report se arma desde la primera llamada, no el 10 oct ([[MVP]]). Incluye la venta del mismo monto.
- Agent Studio, DeFi, b402, vault de LP y perpetuos quedan afuera ([[Alineamiento]]).
- Si una cifra no está en [[Fuentes]], no entra en el pitch.
- Exit Availability y Exit Risk informan con fuente y fecha; no predicen ([[Diferenciador]]).

## Criterio para decidir qué entra

Una pregunta: ¿aparece en el guion del video del [[MVP]]? Si no aparece, es opcional.

## Ritmo (propuesta)

Un encuentro corto por día, siempre a la misma hora: qué terminé, qué hago hoy, qué me traba. Las decisiones que salen de ahí se anotan en el [[Índice]], en «Estado», con fecha.
