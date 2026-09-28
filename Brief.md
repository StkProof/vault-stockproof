---
tags:
  - hackathon
---

# Brief

[BNB Hack: Tokenized Stocks Edition](https://www.bnbchain.org/en/hackathons/tokenized-stocks). Pool de **$20.000**, un solo track. Cómo el producto entra: [[Alineamiento]].

## Fechas (UTC)

| Hito | Cuándo |
| --- | --- |
| Apertura y arranque | mié 16 sep 2026, 12:00 |
| Este corte de idea | sáb 26 sep 2026 |
| Cierre de envíos | dom 11 oct 2026, 12:00 |
| Judging | 12–23 oct 2026 |
| Ganadores | semana del 26 oct 2026 |

Quedan unos 15 días desde este corte. Repo, demo y link tienen que seguir accesibles durante el judging.

## Premios

| Puesto | Premio |
| --- | --- |
| 1º | $6.000 |
| 2º | $4.000 |
| 3º | $3.000 |
| 4º | $2.000 |
| 5º | $1.000 |
| Agentic Wallet / Wallet Skills | $2.000, apilable |
| BNB Agent Studio | $2.000, apilable |

## Puntaje

| Criterio | Peso |
| --- | --- |
| Implementación técnica | 30% |
| Creatividad y originalidad | 25% |
| Developer Experience Report | 25% |
| Calidad de producto y UX | 20% |

El informe de experiencia de desarrollador pide cosas concretas: profundidad de liquidez, slippage, comportamiento fuera de horario, gap entre precio on-chain y referencia, y en qué se diferencian en la práctica bStocks, Ondo y xStocks. Incluye una sección de stack de IA. Sin relleno.

## Reglas que acotan el build

- Equipos o solo. Una entrada por equipo.
- Al menos uno de **bStocks, Ondo o xStocks** en el centro.
- Cruce con cripto o stablecoins, permitido.
- **Solo spot.** Perpetuos afuera.
- **Solo BSC mainnet.** Simular con la Transaction API. La demo, con unos pocos dólares propios.
- Entregable: repo público, video de hasta 4 minutos (recomendado), link deployado o instrucciones que un juez pueda seguir.

Jurisdicciones excluidas del hackathon y del producto de Binance Wallet: Estados Unidos, Canadá, Países Bajos, Irán, Cuba, Corea del Norte, Crimea, Donetsk, Luhansk, Reino Unido y Japón. Argentina no está en esa lista. Cada participante confirma que cumple la ley que le aplica.

## Stack que hay que usar de verdad

| Módulo | Para qué lo pide StockProof |
| --- | --- |
| RWA Data API | Lista de tokens y plataformas, precio on-chain contra referencia, búsqueda por ticker, perfil y attestation, estado de mercado y próxima apertura |
| Market API | Velas y régimen del ticker: clavado o disperso |
| Trading API | Cotización agregada entre DEX, con protección MEV |
| Transaction API | Simular cada swap antes de difundir |
| Wallet API | Posición de la dirección |
| Agentic Wallet / Wallet Skills | Ejecutar o negarse. Premio especial |
| BNB Agent Studio | Opcional, fuera del MVP |
| DeFi API y b402 | Fuera del MVP |

Portal de API keys: [web3.binance.com/en/dev-portal](https://web3.binance.com/en/dev-portal). Registro de la hackathon y formulario de envío están en la página del evento. El template del Developer Experience Report también.

## Lo que el brief ya puso sobre la mesa

Agente de estrategia en lenguaje natural, arbitraje de horario, arbitraje entre protocolos, monitor de spread, DCA, agente de earnings, portfolio cripto/equity, primera compra on-chain, canastas temáticas, y un MCP o SDK. Esa lista va a estar repetida. [[Idea|StockProof]] usa los mismos datos y entrega otra decisión: firmar o no firmar.
