---
tags:
  - idea
aliases:
  - Salida
  - Cuánto cuesta arrepentirse
---

# Diferenciador: la salida

Las cuatro preguntas de [[Idea|StockProof]] miran la compra. Ninguna mira la venta. Esta nota es el punto que el equipo no va a ver mientras construye, y el que ningún otro proyecto va a traer.

## El punto ciego

El MVP gira alrededor de un botón: firmar o no firmar. Vender se piensa como «lo mismo al revés». No lo es. StockProof hoy revisa que la puerta abra para entrar, no que abra para salir.

La evidencia ya está en [[Dolores]]:

| Dato | Qué dice sobre la salida |
| --- | --- |
| 9 de cada 10 traders chicos terminan planos o abajo. El 37,6% de las wallets aparece un día y no vuelve | La pérdida se cierra después del fill, no en la firma |
| El 73,9% de las posiciones de holders es SpaceX (SPCXB), fill mediano $12 | Donde está la gente es el libro peor preciado: 5,37% de los fills a más de 5% del precio del día |
| Ondo en BNB: el finde es el 0,55% del volumen, el spread off-hours se abre y algunos activos no operan | Comprar el viernes a la noche y no poder vender el sábado |
| xStocks: cuando cierra el subyacente, el pool prefondeado se adelgaza | La ventanilla de salida se vacía justo cuando la gente opera (07:00 UTC) |
| bStocks: la conversión 1:1 sin fee ocurre en Binance, no en el pool | Tener el token no es poder canjearlo por la acción |

## Por qué es fácil pasarlo por alto al desarrollar

- La spec, el flujo y la demo terminan en la firma. Lo que pasa después no tiene pantalla, así que no tiene tarea.
- La pregunta 2 simula el monto de entrada. El costo de salida del mismo monto, en otro horario, es otro número.
- Las preguntas pueden dar las cuatro en verde un viernes y el sábado la posición queda sin salida. Cada pregunta pasa; la combinación no.
- «Canjear por la acción» suena a detalle legal. Para el usuario es la diferencia entre tener una acción y tener un certificado.

## Qué agrega StockProof

Antes del botón de firma, un bloque de salida con tres capas separadas. Cada una dice de dónde sale y ninguna adivina el futuro.

| Capa | Qué responde | De dónde sale | Qué **no** hace |
| --- | --- | --- | --- |
| **Exit Now** | Si vendés este monto ahora, cuánto recuperás | Simulación real y ejecutable de la venta del mismo monto, en el mismo momento y el mismo wrapper (Trading API + Transaction API). Reusa la pregunta 2 | No proyecta el precio de mañana. Vale para este instante |
| **Exit Availability** | Cuándo se puede salir y por dónde | Datos publicados: estado del mercado y próxima apertura (RWA Data API), horario de mint y redeem del emisor, dónde se canjea por la acción (bStocks: en Binance, no en el pool). Reusa las preguntas 3 y 4 | No promete que haya contraparte en ese horario. Dice qué reglas conocidas aplican |
| **Exit Risk** | Qué señales observables dicen que salir puede costar más | Datos medidos hoy: dispersión entre pools del mismo ticker, profundidad actual, si el emisor opera fuera de horario de EEUU, historial de fills lejos del precio del día (Market API y log propio) | No estima un número futuro. Muestra la señal, su fuente y la fecha del dato |

Ejemplo de cómo se lee en pantalla:

> **Exit Now:** ponés $200; si vendés ahora, recuperás $X (simulado hace 5 s).
> **Exit Availability:** mercado de EEUU cerrado; abre el lunes 13:30 UTC. El canje por la acción se hace en Binance.
> **Exit Risk:** hoy los dos pools de este ticker difieren Y%. Dato medido: en su tape, el finde fue el 0,55% del volumen (fuente y fecha al lado).

Regla del bloque: si un dato no se puede medir o consultar, se dice «sin dato», no se completa. Si Exit Now pasa el umbral de costo, el agente puede negarse igual que con la entrada. Exit Availability y Exit Risk informan; no deciden solos.

## Por qué suma puntaje

| Criterio | Peso | Aporte |
| --- | --- | --- |
| Originalidad | 25% | «Todos te ayudan a comprar. StockProof te dice cuánto te cuesta arrepentirte» |
| Developer Experience Report | 25% | Slippage de compra **y** de venta por emisor, abierto y cerrado. Es exactamente lo que el jurado pidió, medido en las dos direcciones |
| UX | 20% | «Cuánto recupero si me arrepiento» se entiende sin saber nada de cripto |
| Implementación | 30% | Usa las mismas APIs con otra pregunta; no suma dependencias. Separar medido, publicado y observado muestra rigor, no marketing |

## Dónde entra en el MVP

- Ventana 4–9 oct, junto a las preguntas 3 y 4. No abre alcance: reusa la simulación de la pregunta 2.
- Orden de construcción: Exit Now primero (es la pregunta 2 al revés), después Exit Availability, y Exit Risk con las señales que ya se midan para la pregunta 4.
- Escena extra del video (unos 20 segundos): SPCXB un sábado, cuatro respuestas en verde y, abajo, las tres capas: lo que recuperás ahora, cuándo abre y qué señales de riesgo hay hoy.
- Log del informe: desde la primera cotización, guardar también la cotización inversa del mismo monto.

## Pendiente de verificar

- Si la Trading API cotiza la venta con el mismo detalle que la compra en los tres wrappers.
- Qué expone la RWA Data API sobre horario de mint y redeem por emisor (Ondo tiene 24/7 solo en algunos nombres desde fines de junio de 2026).
- Qué señales de Exit Risk se pueden leer en vivo y cuáles solo salen del log propio. Las que no se midan, no se muestran.
