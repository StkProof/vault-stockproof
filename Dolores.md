---
tags:
  - evidencia
---

# Dolores

Cinco problemas medidos en el mercado de acciones tokenizadas, con foco en BNB. Justifican el corte de [[Idea]]. Los links están en [[Fuentes]].

Las ventanas importan. El estudio de bStocks on-chain es del 30 jun al 29 jul 2026. El de profundidad, del 26 jul al 24 ago 2026. El fee de maker en cero de QQQB terminó el 31 ago 2026 a las 23:59 UTC. La profundidad de julio estaba subsidiada. Al 26 sep la estructura sigue; el ancho del libro puede haber cambiado.

## 1. El ticker que aparece no es el token

En BNB Chain, Bitquery contó **1.307 contratos impostores** bajo símbolos de bStocks. Movieron **$324,8M**, el **11,66%** de todo el volumen bajo esos nombres (30 jun–29 jul 2026).

- El **94,9%** de las wallets que operaron un impostor nunca tocaron un bStock genuino. De 86.322 direcciones, 435 operaron ambos.
- El SK Hynix falso hizo **$178,7M** en 30 días, **26 veces** el token real, y salió **24 horas antes** del listing. 2.468 wallets perdieron más de $100. El agregado de esas pérdidas fue **$58,7M**. La peor wallet perdió $148.737.
- Un falso QQQB, mismo patrón de supply, hizo **$126,4M en un día** (19 jul).
- En COINB, AMZNB, PLTRB y MSTRB, cada dólar on-chain de esa ventana fue falso. No había contrato genuino operando.
- Dos impostores copiaron el principio y el final de la dirección real. Mirar los primeros y últimos caracteres no alcanza.
- El filtro que sí separa: los genuinos son **BEP-8056** con label de custodia en BscScan. Los falsos son BEP-20 comunes. Un índice que rankea por símbolo entrega el scam primero.

## 2. Un monto de ahorro no entra

Sobre 424 contratos y seis chains (26 jul–24 ago 2026):

- Trade mediano: **$45**.
- **3 de 424** absorben $10.000 con menos de 1% de impacto.
- Ningún contrato absorbe $50.000 bajo 1%.
- En todo el mes, **38** trades superaron $100.000.
- El round trip de un trade chico sale ~**9–10 puntos básicos** con el mercado abierto, de noche y el fin de semana.

| Token | Emisor | $10.000 | $50.000 |
| --- | --- | --- | --- |
| QQQB | bStocks | 0,5% | 2,5% |
| SPCXB | bStocks | 0,7% | 3,5% |
| SPYB | bStocks | 1,3% | 6,6% |
| NVDAB | bStocks | 1,8% | 8,9% |
| NVDAx | xStocks | 6,3% | 31,6% |
| TSLAB | bStocks | 14,2% | 70,8% |
| SKHYB | bStocks | 16,5% | 82,4% |

Por encima de ~$10.000 las cifras son proyección del impacto observado, y Bitquery advierte que el costo real a ese tamaño tiende a ser peor. La lectura de producto: la gente que iba a perder en la ejecución cerró la pestaña. Esas órdenes no quedaron en el tape.

## 3. El anaquel y el mercado son dos productos

En el tape on-chain de bStocks (30 jun–29 jul):

- **QQQB es el 96,2%** del volumen. El resto de los tickers, juntos, es el 3,8%.
- Tesla: **$42.614 en el mes**, 488 wallets, fill mediano de $10.
- Meta: $1.186. Apple: contrato verificado, **cero trades**.
- **El 73,9% de las posiciones de holders es SpaceX** (SPCXB), una empresa sin cotización. Fill mediano **$12**. QQQB, con casi todo el volumen, tenía 2.157 holders.
- En SpaceX, **5,37%** de los fills quedó a más de 5% del precio del día ($2,49M afectados). 4.125 trades quedaron a más de 20% de la mediana del día. Dos pools discrepan **0,239%** en el mismo minuto. En QQQB esa discrepancia es **0,012%**.

La demanda que se ve en holders es acceso a lo que un broker no vende. Ese libro es el peor preciado.

## 4. El número de la pantalla no es la acción

- **Ondo** es un tracker de retorno total. Con el tiempo el precio del token no tiene que coincidir con la cotización. La página de soporte existe porque la gente pregunta exactamente eso. En BNB y Solana, una wallet sin Scaled UI muestra otro balance que una que sí lo integró, con la misma tenencia.
- **bStocks** reinvierte el dividendo neto en un **Multiplier** (BEP-677 / Scaled UI Amount), después de una retención estadounidense de alrededor del 30%. No llega cash. El balance que se ve cambia. Splits usan el mismo mecanismo.
- Bitquery no pudo reconciliar precios on-chain con la acción (SNDKB a $1.373, por ejemplo) y lo dejó como la pregunta abierta más importante del producto: la unidad que muestra la wallet puede no ser una acción.
- El certificado de bStocks (BTech Holdings, ADGM) no es la acción. No hay voto hasta una conversión. La conversión 1:1 sin fee ocurre en Binance, no en el pool.

## 5. Cada emisor es otro mercado cuando cierra Wall Street

- **bStocks on-chain:** el **91,2%** del volumen se imprimió con el mercado de contado de EEUU cerrado. El precio, en los índices, se movió menos: QQQB a **0,73×** la volatilidad de la sesión, SPYB a **0,57×**. Un sábado y domingo enteros, el rango horario de QQQB fue **0,36–1,24%**. SPYB no pasó de **0,71%**. Es cinta clavada al book de Binance, no descubrimiento.
- Sobre siete fines de semana, esos precios capturaron la mediana del **92%** del movimiento del lunes, con residuo de **0,19%** en la apertura. En gaps de más de 3%, la dirección acertó en los 41 casos y capturó el **99,6%** del movimiento.
- **Ondo en BNB** va al revés. En su propio tape, el finde fue el **0,55%** del volumen: la gente sigue el reloj de Wall Street porque el mint y el redeem lo seguían. El spread off-hours se abre y algunos activos directamente no operan. Desde fines de junio de 2026 hay mint 24/7 en un puñado de nombres (entre ellos SPY, QQQ, NVDA, TSLA, GOOGL, CRCL), no en todo el anaquel.
- **xStocks** cotiza contra pools prefondeados. Cuando cierra el subyacente, ese pool se adelgaza.
- Quien pone liquidez en PancakeSwap deja el pool abierto toda la noche. El arbitraje del lunes arrastra el precio de golpe. En un pool nuevo, esa pérdida impermanente es el riesgo principal. Por eso el MVP no incluye un vault de LP.

## Quién pierde

De las wallets que operaron menos de $1.000 en el mes, el **10,4%** terminó más de $100 arriba. Por encima de $1M de volumen, el 59,5%. El **37,6%** de las wallets apareció un solo día y no volvió. Nueve de cada diez traders chicos terminaron planos o abajo. El producto les tiene que hablar antes de la firma, no después del fill.
