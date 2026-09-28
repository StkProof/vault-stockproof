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

| Rol | Qué hace |
| --- | --- |
| Frontend y producto (1 persona) | La pantalla única, los textos en castellano, el bloque de salida en pantalla |
| Lógica (2 personas, juntas) | Las cuatro preguntas, la simulación, la ejecución por Agentic Wallet, Exit Now / Availability / Risk |

Se encuentran en el resultado de la evaluación. La pantalla no decide si el contrato es real ni si la orden entra.

Pendiente: anotar acá quién es quién, y quién se hace cargo de los entregables (video, README, instrucciones de juez, Developer Experience Report).

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
