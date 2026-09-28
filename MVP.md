---
tags:
  - idea
---

# MVP

Alcance para llegar al 11 oct con algo que un juez puede usar. La definición del producto está en [[Idea]]. El encaje, en [[Alineamiento]].

## Pantalla única

1. El usuario escribe un ticker y un monto.
2. StockProof responde las cuatro preguntas, en orden.
3. Si pasan, muestra el wrapper elegido (bStocks, Ondo o xStocks), el costo simulado y un botón de firma.
4. Si alguna falla, explica cuál y no arma la transacción.
5. Una frase en castellano («comprame $200 de NVIDIA si el contrato es el real y el costo es menor al 1%») dispara el mismo camino por Agentic Wallet.

## Dos semanas

| Ventana | Entra | Queda demoable aunque no haya más |
| --- | --- | --- |
| 26 sep – 3 oct | Preguntas 1 y 2. Lista y attestation por ticker. Simulación del monto en los tres wrappers. Pantalla que corta si el contrato no es el oficial o si el impacto pasa un umbral | Sí. Ya ataca impostores y órdenes que no entran |
| 4 oct – 9 oct | Preguntas 3 y 4. Referencia contra pool, nota de multiplicador cuando la API lo expone, régimen según mercado abierto y dispersión. Agente que se niega o firma un monto chico en mainnet | El video de 4 minutos |
| 10 oct | Buffer. Repo, instrucciones de juez, borrador del Developer Experience Report con los números medidos durante el build | Envío el 11 a las 12:00 UTC |

Agent Studio, parqueo del stable en DeFi y un segundo agente que cobra la consulta por b402 no entran. Si el 9 oct la demo ya corre, el buffer no se usa para abrir alcance.

## Guion del video (4 minutos)

1. Ticker de un nombre líquido, monto chico, mercado cerrado: las cuatro respuestas en verde y el costo simulado cerca de la referencia.
2. El mismo ticker con un monto que el pool no absorbe: la pantalla muestra el impacto y no firma.
3. Un símbolo con contrato impostor, o una dirección que no está en la lista oficial: corte en la pregunta 1.
4. Una frase en castellano que pide el swap solo bajo el umbral. Se ve la simulación y, si el umbral pasa, una transacción chica en BSC mainnet.

## Informe de experiencia

Ir anotando, desde la primera llamada, tres cosas que el jurado pidió por escrito:

- Slippage del mismo monto en bStocks, Ondo y xStocks.
- Gap entre precio on-chain y referencia, con el mercado abierto y cerrado.
- Qué se rompió en la API: errores, campos que no coinciden con el precio de la wallet, rate limits, simulación que no matchea el fill.

Ese log es el 25% del puntaje. No se redacta el 10 oct desde cero.

## Checklist de envío

- [ ] Repo público con el flujo de las cuatro preguntas
- [ ] Demo en BSC mainnet con monto chico, o instrucciones reproducibles
- [ ] Video de hasta 4 minutos
- [ ] Developer Experience Report enviado, con sección de stack de IA
- [ ] Links vivos hasta el 23 oct
