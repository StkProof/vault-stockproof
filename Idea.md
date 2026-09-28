---
tags:
  - idea
aliases:
  - Antes
---

# StockProof

Dado un ticker y un monto en dólares, **StockProof** dice si conviene firmar el swap de esa acción tokenizada en BSC. La respuesta son cuatro preguntas, en este orden. Si una falla, no hay transacción.

## Para quién

Alguien que no opera en el horario de Nueva York, busca un ticker que conoce y mueve cientos de dólares. En el primer mes de bStocks, el 41,5% de los registros no había operado acciones ni perpetuos. El horario pico on-chain es las 07:00 UTC: las 3 de la mañana en Nueva York. El trade típico del mercado, en seis chains, fue de unos $45. Ver [[Dolores]].

## Las cuatro preguntas

| # | Pregunta | Qué mira | Si falla |
| --- | --- | --- | --- |
| 1 | ¿Este contrato es el real? | Lista oficial, attestation y estándar del token (BEP-8056 en bStocks) | Corta. No hay swap |
| 2 | ¿Esta orden entra? | Simulación del monto en bStocks, Ondo y xStocks | Muestra el costo y ofrece el wrapper que sí llena, o frena |
| 3 | ¿Este número es la acción? | Precio de referencia, precio del pool y multiplicador de dividendos | Explica el desvío antes de que parezca un despegue |
| 4 | ¿En qué régimen está este ticker? | Mercado abierto o cerrado, y si el libro está clavado o los pools no coinciden | En un nombre fino, frena o parte la orden |

## Qué hace el agente

El agente ejecuta solo si las cuatro pasan. Su trabajo visible es negarse: contrato falso, monto que rompe el pool, o un precio de fin de semana que en ese ticker no es la acción. Cuando ejecuta, elige el wrapper que llena ese monto con menos impacto y simula antes de difundir.

## La salida

Las cuatro preguntas miran la entrada. Antes de la firma, StockProof agrega un bloque de salida en tres capas: **Exit Now** (simulación real de vender el mismo monto ahora), **Exit Availability** (horarios, mint, redeem y canje publicados) y **Exit Risk** (señales observables, con fuente y fecha). No predice precio ni liquidez futura. Detalle en [[Diferenciador]].

## Por qué este corte

El brief de la hackathon cuenta el gap del viernes a las 16:00. En los nombres líquidos (QQQB, SPYB) ese gap casi no existe: el finde mueve el precio menos que la sesión, porque el book de Binance lo clava. El daño medido está en otra parte.

- La gente compra un contrato que se llama igual y no es el token.
- Una orden de $10.000 rompe casi todo el anaquel, salvo tres contratos.
- El precio en la wallet no es el precio de la acción cuando hay dividendo o cuando el token es de retorno total.
- SpaceX y los nombres finos sí deambulan. QQQ no.

El detalle y las fuentes están en [[Dolores]]. Cómo esto puntúa está en [[Alineamiento]]. Qué se construye primero está en [[MVP]].
