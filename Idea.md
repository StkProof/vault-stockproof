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
| 2 | ¿Esta orden entra y se puede salir? | Compra y venta del mismo monto en bStocks, Ondo y xStocks. Las tres cotizaciones se ven | Firma un solo wrapper con compra y venta bajo el tope. Si hay más de uno, el de menor impacto. Si ninguno, frena y devuelve el monto que sí pasaría |
| 3 | ¿Este número es la acción? | Precio de referencia, precio del pool y multiplicador de dividendos | Si el desvío es el multiplier o el retorno total, lo explica y sigue. Si no tiene causa, corta |
| 4 | ¿En qué régimen está este ticker? | Mercado abierto o cerrado, libro clavado, pools que no coinciden | En un nombre líquido el sábado se firma y el comprobante dice que el libro está clavado. En un nombre fino, si la venta de ese monto se pasa del tope, corta la salida. El reloj solo no corta. Los pools que no coinciden cortan |

## Qué hace el agente

El agente opera solo después de una orden: un ticker y un monto, o una frase en castellano. No sale a buscar trades. La wallet que firma es la de esa orden. En la demo puede ser la wallet del equipo; la posición queda en la wallet que dio la orden.

Su trabajo visible sigue siendo negarse: contrato falso, monto que no entra o no se puede vender, precio que no se puede explicar, pools que no coinciden. Cuando firma, muestra las tres cotizaciones, nombra el wrapper que quedó y los que no, y el costo de entrar y de salir ahora. Cuando se niega, devuelve la orden que sí firmaría: mismo ticker, mismo wrapper, monto más chico, o la frase de que ese wrapper no tiene salida bajo el tope.

## La frase no apaga los cortes

> [!important] 28 sep 2026
> La política que escribe el usuario se suma a las cuatro preguntas. No las reemplaza. El relato para el jurado está en [StockProof_README.md](StockProof_README.md). Si ese archivo y esta nota se contradicen, manda esta nota.

La frase puede pedir topes («costo menor al 1%», «el precio on-chain a menos del 2% de la referencia»). Esos topes se miran después de las cuatro preguntas.

- La pregunta 1 y el umbral de impacto del 1% corren aunque la frase no los nombre.
- Un tope de desvío contra la referencia se suma a la pregunta 3. No la reemplaza: si el token es de retorno total o el dividendo cambia el balance, el precio de la wallet se explica igual.
- La pregunta 4 sigue. El arbitraje de fin de semana sigue afuera. El mercado cerrado no corta por el reloj: en un nombre líquido el comprobante dice que el libro está clavado; en un nombre fino corta la venta si se pasa del tope, aunque la frase no hable del horario.

> [!important] 30 sep 2026
> Tres reglas que se suman a esta nota. La pantalla de las cuatro preguntas se queda. El trabajo visible del agente sigue siendo negarse.
>
> 1. No se cambia de wrapper en silencio. Se ven las tres cotizaciones. Se firma una sola: la que tiene compra y venta bajo el tope. Si hay más de una, la de menor impacto de compra. El comprobante nombra el instrumento que quedó y los que no.
> 2. Toda negativa devuelve la orden que sí firmaría: mismo ticker, mismo wrapper, monto más chico, o la frase de que ese wrapper no tiene salida bajo el tope.
> 3. La venta del mismo monto (Exit Now) es compuerta, al mismo nivel que la compra. El horario de canje y las señales históricas informan y no deciden. Si la venta no se puede medir, no se firma.
>
> El mismo sábado es inofensivo en QQQB y caro en un nombre fino. El corte del nombre fino es el costo de salir, no el calendario.
>
> Queda afuera un wrapper por defecto callado, y reemplazar las cuatro respuestas por un comprobante solo.
>
> Lo ya construido en `evaluate` elige por impacto de compra, sin venta. Esta regla lo reemplaza cuando la venta del mismo monto se cotiza.

## La salida

Antes de la firma, StockProof agrega un bloque de salida en tres capas: **Exit Now** (simulación real de vender el mismo monto ahora; es compuerta), **Exit Availability** (horarios, mint, redeem y canje publicados; informa) y **Exit Risk** (señales observables, con fuente y fecha; informa). No predice precio ni liquidez futura. Detalle en [[Diferenciador]].

## Por qué este corte

El brief de la hackathon cuenta el gap del viernes a las 16:00. En los nombres líquidos (QQQB, SPYB) ese gap casi no existe: el finde mueve el precio menos que la sesión, porque el book de Binance lo clava. El daño medido está en otra parte.

- La gente compra un contrato que se llama igual y no es el token.
- Una orden de $10.000 rompe casi todo el anaquel, salvo tres contratos.
- El precio en la wallet no es el precio de la acción cuando hay dividendo o cuando el token es de retorno total.
- SpaceX y los nombres finos sí deambulan. QQQ no.

El detalle y las fuentes están en [[Dolores]]. Cómo esto puntúa está en [[Alineamiento]]. Qué se construye primero está en [[MVP]].
