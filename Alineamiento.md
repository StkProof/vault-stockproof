---
tags:
  - idea
---

# Alineamiento

[[Idea|StockProof]] entra en el track único de la hackathon y ataca dolores medidos, no la lista de ideas del brief. Reglas y fechas en [[Brief]].

## Puntaje

| Criterio | Peso | Cómo lo cubre StockProof |
| --- | --- | --- |
| Implementación | 30% | RWA (lista, attestation, dos precios, estado de mercado), Trading (cotización), Transaction (simular el monto), Market (régimen del ticker), Wallet (posición). El flujo corre en BSC mainnet con un monto chico |
| Originalidad | 25% | La lista oficial pide arbitraje de horario, arbitraje entre wrappers, monitor de spread, DCA y canastas. StockProof usa esos datos para decidir si la orden se firma. El rechazo es el producto |
| Developer Experience Report | 25% | Cada cotización deja slippage real, gap contra la referencia y diferencia entre bStocks, Ondo y xStocks. El informe es el log del producto, con la sección de stack de IA |
| UX | 20% | Una pantalla: ticker, monto, cuatro respuestas en castellano. Sirve a quien no vive en cripto |

Los dos premios especiales se pueden ganar junto con un puesto.

| Premio | Monto | Encaje |
| --- | --- | --- |
| Best Use of Agentic Wallet / Wallet Skills | $2.000 | El agente traduce la orden en lenguaje natural, simula y firma, o se niega con una razón |
| Best Use of BNB Agent Studio | $2.000 | Queda fuera del MVP. Identidad y runtime entran solo si la pantalla de las cuatro preguntas ya está demoable |

## Reglas del track

| Regla | Cumplimiento |
| --- | --- |
| Al menos uno de bStocks, Ondo o xStocks en el centro | Los tres se cotizan. El swap sale de uno de ellos |
| Cruce con cripto o stablecoins permitido | La pata de entrada es USDT u otro stable. No hace falta un libro de acciones contra acciones |
| Solo spot. Perpetuos afuera | No hay perps, funding ni apalancamiento |
| Solo BSC mainnet | Cotización, simulación y demo en BSC. Unos pocos dólares alcanzan |
| Proyecto que corre, no un deck | Repo público, link o instrucciones, y video de hasta 4 minutos |
| Repo, demo y link vivos durante el judging (12–23 oct) | Se dejan publicados hasta el anuncio, semana del 26 oct |

## Qué queda afuera a propósito

- Bot de arbitraje de fin de semana. En QQQB el precio del finde está clavado y el round trip chico cuesta ~10 puntos básicos. No es el dolor.
- Onboarding de «comprá Apple on-chain». En la ventana medida, el contrato verificado de Apple no tradó una vez.
- Vault de liquidez en PancakeSwap. El pool abierto el finde come el salto del lunes.
- Perpetuos, otras chains, y un segundo agente que vende la señal por b402.

## Combinación de APIs

La hackathon pide combinaciones que parecen no cerrar y cierran. StockProof junta attestation de un RWA, simulación de un swap y el estado del mercado tradicional en una sola decisión de firma. Sin esa junta, cada API por separado ya existe en un explorer o en un quote.
