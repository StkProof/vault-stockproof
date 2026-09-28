# StockProof

> **The trust & execution layer for tokenized stocks.**  
> Tell StockProof what you want to buy. It verifies the asset, understands the market, simulates the execution, enforces your constraints, and only then allows the trade.

**Hackathon:** BNB Hack — Tokenized Stocks Edition  
**Network:** BNB Smart Chain (BSC) Mainnet  
**Status:** Hackathon MVP  
**Submission deadline:** October 11, 2026 — 12:00 UTC

## Para el equipo

Esta sección no va al jurado. Lo que sigue es el relato de la entrega. Los cortes y el calendario mandan desde las notas de este vault (28 sep 2026). Si este archivo y esas notas se contradicen, mandan las notas.

| Qué | Dónde | Estado |
| --- | --- | --- |
| Eslogan, visión B2B y posicionamiento | §1, §25, §26, §34, §35, §38 | Relato. No entra al build |
| Preguntas 1 y 2, umbral fijo de 1%, tres wrappers, corte sin inventar un precio | `../stock-proof/lib/evaluate.ts` | Ya construido. Sin frase y sin firma |
| El 1% y la verificación corren aunque la frase no los pida. Un tope de desvío (acá, 2%) se suma y no reemplaza la pregunta del precio | `Idea.md` | Decisión vigente |
| La pregunta 4, el régimen del ticker, sigue. El arbitraje de fin de semana queda afuera | `Idea.md`, `Alineamiento.md` | Decisión vigente. Este README la deja diluida en el estado de mercado |
| Ventanas del 26 sep al 3 oct y del 4 al 9 oct | `MVP.md` | Decisión vigente. La fase 0 (§31) y el monorepo (§30) no son el plan |

---

## 1. One-line idea

**StockProof turns a natural-language investment intent into a verified, simulated and policy-controlled tokenized-stock transaction on BSC.**

A user should be able to say:

> “Buy $500 of NVIDIA, but only if the asset is verified, total execution cost is below 1%, and the on-chain price is not more than 2% away from the reference price.”

StockProof interprets the intent, converts it into explicit constraints, verifies the tokenized asset, inspects the market, obtains executable quotes, simulates the transaction and either:

- **EXECUTES** the best valid route, or
- **REFUSES** to execute and explains exactly which condition failed.

The LLM is the interface and reasoning/orchestration layer. **Prices, balances, verification, simulations and execution decisions must be grounded in deterministic data and explicit rules.**

---

# 2. The problem

Tokenized stocks make traditional equity exposure available on-chain, but the user experience is still fragmented.

A user who wants exposure to a familiar ticker may need to answer several questions before signing a transaction:

1. **Am I interacting with the real tokenized asset?**
2. **What exactly does this token represent?**
3. **How does its on-chain price compare with the underlying reference?**
4. **Is there enough liquidity for my order size?**
5. **What will the trade actually cost after price impact and slippage?**
6. **Can the transaction succeed?**
7. **Does the trade satisfy the conditions I asked for?**

Today these answers can live across token lists, attestations, explorers, market APIs, DEX quotes, transaction simulations and wallet interfaces.

**StockProof compresses that fragmented pre-trade process into one verifiable execution pipeline.**

---

# 3. Why StockProof exists

The goal is **not** to build another trading dashboard.

The goal is to create a layer between:

```text
USER INTENT
     ↓
STOCKPROOF
     ↓
ON-CHAIN EXECUTION
```

StockProof acts as an **execution guard**.

The defining behavior of the product is not merely that it can trade.

It is that:

> **StockProof knows when a requested trade should not be signed under the user's own constraints.**

This is the product's strongest demo moment and one of its clearest differentiators.

---

# 4. Product thesis

Tokenized-stock infrastructure already makes assets tradable on-chain.

What is missing is a simple layer that can turn:

```text
"I want $500 of NVIDIA"
```

into:

```text
What asset?
Is it authentic?
What economic exposure does it represent?
Is the market/reference state acceptable?
What routes are actually executable?
What will $500 really cost?
Will the transaction succeed?
Does it satisfy the user's policy?
Which valid route should be used?
```

and then:

```text
EXECUTE
```

or:

```text
REFUSE + PROOF
```

---

# 5. Core innovation

## StockProof is not “an LLM that buys stocks”

Natural-language trading agents already exist as a concept and are explicitly within the hackathon's scope.

Our innovation is the **verification and execution pipeline between intent and signature**.

### The StockProof pipeline

```text
Intent
  ↓
Parse Constraints
  ↓
Resolve Asset
  ↓
Verify Authenticity
  ↓
Understand Representation
  ↓
Inspect Market State
  ↓
Discover Executable Routes
  ↓
Normalize & Quote
  ↓
Simulate Transaction
  ↓
Evaluate User Policy
  ↓
Select Best Valid Route
  ↓
Execute
  ↓
Verify Result
```

Every stage should produce structured evidence.

The LLM can explain that evidence, but it cannot invent it.

---

# 6. The StockProof Promise

Every trade must answer four high-level questions before execution.

## Proof 1 — Is this the real asset?

StockProof resolves the ticker against official RWA/token data.

It checks available metadata such as:

- token identity;
- contract address;
- issuer/platform;
- supported tokenized-stock ecosystem;
- attestation information where available;
- relevant token standard/metadata;
- chain.

If StockProof cannot establish that the asset is the intended supported asset:

```text
STATUS: BLOCKED
REASON: ASSET_VERIFICATION_FAILED
```

No swap is prepared.

---

## Proof 2 — Can this order actually be executed reasonably?

StockProof does not ask only:

> “What is the token price?”

It asks:

> “What happens if **this user** tries to buy **this amount** right now?”

For every viable route, StockProof should inspect:

- executable quote;
- expected output;
- estimated price impact;
- slippage assumptions;
- route/DEX;
- gas where available;
- approvals required;
- transaction simulation result.

A $50 trade and a $50,000 trade are not the same problem.

---

## Proof 3 — What am I actually buying?

Different tokenized-stock products can implement economic exposure differently.

StockProof should surface relevant differences instead of pretending that every representation is identical.

Depending on the data exposed by the platform, this can include:

- issuer/platform;
- reference asset;
- price mechanics;
- dividend treatment;
- multiplier/scaled-balance mechanics;
- redemption characteristics;
- attestation/custody information;
- market-hours behavior.

The objective is **not legal equivalence analysis**.

The objective is to prevent a misleading comparison based solely on the number displayed as “price”.

---

## Proof 4 — Does this trade satisfy my rules?

The user can attach explicit execution constraints.

Example:

```text
Buy: NVDA
Amount: $500
Max execution cost: 1.00%
Max reference deviation: 2.00%
Require verified asset: true
Require successful simulation: true
```

StockProof evaluates these conditions deterministically.

```text
IF all required conditions pass:
    route may execute
ELSE:
    refuse
```

This is where natural language becomes **machine-enforceable execution policy**.

---

# 7. Example user experience

The entire product should be understandable without prior Web3 knowledge.

### User

> Buy $500 of NVIDIA. Don't execute if the cost is above 1% or the on-chain price is more than 2% away from the reference.

### StockProof

```text
NVIDIA — Pre-trade proof

✓ Asset verified
  Official supported contract resolved.

✓ Market state understood
  Reference and on-chain market data retrieved.

✓ Execution route found
  Quote available for $500.

✓ Price impact
  Within your 1.00% execution threshold.

✓ Reference deviation
  Within your 2.00% threshold.

✓ Transaction simulation
  Successful.

BEST VALID ROUTE
[route/provider]

Estimated receive: [...]
Estimated execution cost: [...]
Reference deviation: [...]

READY TO EXECUTE
```

The user confirms.

StockProof executes the exact validated path.

---

# 8. Refusal is a feature

StockProof should be memorable because it can say **no**.

### Example — insufficient liquidity / excessive impact

User:

> Buy $50,000 of NVIDIA. Maximum 1% impact.

StockProof:

```text
TRADE BLOCKED

✓ Asset verified
✓ Market data available
✕ Estimated execution impact: 8.9%
  Your maximum: 1.0%

StockProof refused to sign this transaction.
```

### Example — unsupported or unverified contract

```text
TRADE BLOCKED

✕ Contract could not be verified as the supported tokenized asset.

No quote requested.
No transaction prepared.
No signature requested.
```

The refusal must be visible, deterministic and explainable.

---

# 9. Architecture

```text
┌─────────────────────────────────────┐
│            USER / UI                │
│ Natural language + structured form  │
└─────────────────┬───────────────────┘
                  │
                  ▼
┌─────────────────────────────────────┐
│         INTENT / AGENT LAYER        │
│                                     │
│ "Buy $500 NVDA under 1% cost"       │
│              ↓                      │
│ Structured ExecutionIntent          │
└─────────────────┬───────────────────┘
                  │
                  ▼
┌─────────────────────────────────────┐
│       STOCKPROOF EXECUTION ENGINE   │
│                                     │
│ 1. Asset Resolver                   │
│ 2. Verification Engine              │
│ 3. Representation Analyzer          │
│ 4. Market State Engine              │
│ 5. Route Discovery                  │
│ 6. Quote Normalizer                 │
│ 7. Transaction Simulator            │
│ 8. Policy Engine                    │
│ 9. Route Selector                   │
│ 10. Execution Guard                 │
└──────┬─────────┬─────────┬──────────┘
       │         │         │
       ▼         ▼         ▼
   RWA Data    Market    Trading
      API       API        API
       │         │         │
       └────┬────┴────┬────┘
            │         │
            ▼         ▼
      Transaction    Wallet
          API         API
            │
            ▼
   Agentic Wallet / Wallet Skills
            │
            ▼
       BSC MAINNET
            │
            ▼
      PancakeSwap / liquidity
```

---

# 10. Suggested domain model

## ExecutionIntent

```ts
type ExecutionIntent = {
  action: "BUY" | "SELL";
  ticker: string;
  amountUsd: number;

  constraints: {
    verifiedAssetRequired: boolean;
    maxPriceImpactPct?: number;
    maxReferenceDeviationPct?: number;
    maxExecutionCostPct?: number;
    simulationRequired: boolean;
  };
};
```

## RouteEvaluation

```ts
type RouteEvaluation = {
  platform: string;
  tokenAddress: string;

  verified: boolean;

  referencePrice?: number;
  onchainPrice?: number;
  referenceDeviationPct?: number;

  quotedInput: number;
  quotedOutput: number;

  priceImpactPct?: number;
  estimatedExecutionCostPct?: number;

  simulationPassed: boolean;

  violations: string[];
};
```

## ExecutionDecision

```ts
type ExecutionDecision = {
  status: "READY" | "BLOCKED";
  selectedRoute?: RouteEvaluation;
  evaluatedRoutes: RouteEvaluation[];
  violations: string[];
  proofId: string;
};
```

This keeps the core decision auditable and independent from the LLM.

---

# 11. Binance / BNB stack strategy

The hackathon rewards **depth of integration**, so every API should solve a real part of the execution pipeline.

## RWA Data API

Use for:

- ticker resolution;
- token/platform lists;
- on-chain vs underlying reference price;
- company/token information;
- attestation reports;
- market status;
- next market open.

**Role:** identity + RWA context.

---

## Market API

Use for:

- real-time token prices;
- candles;
- token analytics;
- contextual market data.

**Role:** market state and research context.

---

## Trading API

Use for:

- aggregated quotes;
- swap routing;
- approvals;
- executable transaction preparation;
- MEV-protected execution where supported.

**Role:** route discovery and execution economics.

---

## Transaction API

This should be one of the most visible integrations.

Every execution candidate should be dry-run before funds are committed.

Use for:

- transaction simulation;
- failure detection;
- broadcasting when appropriate.

**Role:** prove that a theoretically good route is actually executable.

---

## Wallet API

Use for:

- balances;
- positions;
- portfolio state;
- verifying whether the user can perform the requested action.

**Role:** user state.

---

## Agentic Wallet / Wallet Skills

This should be central rather than decorative.

The agent should be capable of:

1. receiving an execution intent;
2. gathering required evidence;
3. invoking the StockProof engine;
4. receiving `READY` or `BLOCKED`;
5. executing only an approved transaction;
6. returning the transaction result.

**The AI execution layer must not bypass the deterministic guard.**

This architecture creates a credible target for the hackathon's **Best Use of Agentic Wallet / Wallet Skills** special prize.

---

# 12. Optional: BNB Agent Studio

BNB Agent Studio is **Phase 2**, not a blocker for the MVP.

Only integrate it after the main flow works reliably.

Potential use:

- persistent StockProof agent identity;
- autonomous runtime;
- agent-to-agent tasks;
- future pay-per-proof or pay-per-execution services;
- x402/b402-related experimentation where relevant.

Rule:

> **Never sacrifice the core mainnet execution demo to chase the Agent Studio bounty.**

---

# 13. What the LLM does

The LLM is responsible for:

### Intent understanding

```text
"Put $200 into NVIDIA but only if slippage stays under 0.5%"
```

↓

```json
{
  "action": "BUY",
  "ticker": "NVDA",
  "amountUsd": 200,
  "constraints": {
    "maxPriceImpactPct": 0.5
  }
}
```

### Orchestration

The agent determines which tools are required to evaluate the request.

### Explanation

It translates machine-readable evidence into language a normal user understands.

---

# 14. What the LLM must NEVER do

The LLM must never invent or guess:

- token addresses;
- prices;
- quotes;
- liquidity;
- slippage;
- balances;
- attestations;
- transaction results;
- simulation results;
- whether a condition passed.

Those come from APIs, blockchain state and deterministic code.

This separation is critical for credibility.

---

# 15. Policy Engine

The Policy Engine is one of StockProof's most important components.

Example:

```ts
function evaluatePolicy(
  intent: ExecutionIntent,
  route: RouteEvaluation
): string[] {
  const violations: string[] = [];

  if (
    intent.constraints.verifiedAssetRequired &&
    !route.verified
  ) {
    violations.push("ASSET_NOT_VERIFIED");
  }

  if (
    intent.constraints.maxPriceImpactPct !== undefined &&
    route.priceImpactPct !== undefined &&
    route.priceImpactPct > intent.constraints.maxPriceImpactPct
  ) {
    violations.push("PRICE_IMPACT_LIMIT_EXCEEDED");
  }

  if (
    intent.constraints.maxReferenceDeviationPct !== undefined &&
    route.referenceDeviationPct !== undefined &&
    route.referenceDeviationPct >
      intent.constraints.maxReferenceDeviationPct
  ) {
    violations.push("REFERENCE_DEVIATION_LIMIT_EXCEEDED");
  }

  if (
    intent.constraints.simulationRequired &&
    !route.simulationPassed
  ) {
    violations.push("SIMULATION_FAILED");
  }

  return violations;
}
```

The important idea:

> **The agent proposes. The policy engine authorizes.**

---

# 16. Proof object

Every evaluation should generate a reusable **StockProof Proof**.

Example:

```json
{
  "proofId": "sp_...",
  "timestamp": "...",
  "intent": {
    "ticker": "NVDA",
    "amountUsd": 500
  },
  "asset": {
    "verified": true,
    "platform": "...",
    "contract": "0x..."
  },
  "market": {
    "referencePrice": 0,
    "onchainPrice": 0,
    "deviationPct": 0
  },
  "execution": {
    "quotedOutput": 0,
    "priceImpactPct": 0,
    "simulationPassed": true
  },
  "policy": {
    "passed": true,
    "violations": []
  },
  "decision": "READY"
}
```

For the hackathon this can remain an application-level artifact.

Long term it could become a standardized execution receipt.

---

# 17. Comparable execution cost

A potentially powerful differentiator is comparing **effective execution**, not merely displayed token price.

If multiple viable representations/routes exist for equivalent exposure, StockProof should compare:

```text
User capital
    ↓
Executable quote
    ↓
Expected token exposure
    ↓
Price impact
    ↓
Reference deviation
    ↓
Transaction feasibility
    ↓
Effective execution result
```

The product should **not claim economic equivalence when the available data cannot establish it**.

If two representations differ materially, StockProof should say so instead of forcing a ranking.

---

# 18. MVP scope

The MVP must prove one thing extremely well:

> **Natural-language intent → verified pre-trade proof → simulation → deterministic decision → small BSC mainnet execution.**

## P0 — Must work

- BSC mainnet;
- one highly liquid ticker;
- stablecoin → tokenized stock;
- natural-language intent;
- structured intent extraction;
- asset verification;
- reference/on-chain price retrieval;
- executable quote;
- price-impact/slippage information where available;
- Transaction API simulation;
- policy evaluation;
- Agentic Wallet / Wallet Skills;
- successful small live transaction;
- transaction hash;
- refusal path;
- clean single-screen UI;
- detailed logs for DevEx report.

## P1 — Strong differentiators

- multiple routes/platforms when genuinely comparable;
- representation analysis;
- normalized effective execution comparison;
- proof object/history;
- multiple constraint types;
- polished explanation of refusals.

## P2 — Only if everything else is finished

- BNB Agent Studio;
- persistent autonomous agent;
- b402/x402 experiments;
- portfolio automation;
- scheduled strategies;
- thematic baskets;
- advanced charts;
- mobile application.

---

# 19. What NOT to build before submission

Do **not** burn hackathon time on:

- complex authentication;
- social features;
- a full brokerage dashboard;
- news feeds;
- dozens of charts;
- dozens of tickers before one works perfectly;
- portfolio analytics unrelated to the execution flow;
- token issuance;
- perps;
- other chains;
- complicated DeFi strategies;
- custom blockchain infrastructure;
- unnecessary microservices.

The winning version of StockProof should feel **small, deep and finished**.

---

# 20. The ideal UI

One screen.

```text
┌──────────────────────────────────────────────┐
│ STOCKPROOF                                   │
│ Prove the trade before you sign it.          │
│                                              │
│ ┌──────────────────────────────────────────┐ │
│ │ Buy $500 of NVIDIA if total execution   │ │
│ │ cost is under 1%.                       │ │
│ └──────────────────────────────────────────┘ │
│                                              │
│                [ PROVE TRADE ]               │
│                                              │
│ Asset                         VERIFIED ✓     │
│ Market reference              HEALTHY  ✓     │
│ Execution cost                0.xx%    ✓     │
│ Transaction simulation        PASSED   ✓     │
│                                              │
│ Best valid route: [...]                      │
│                                              │
│            READY TO EXECUTE                  │
│                                              │
│              [ EXECUTE ]                     │
└──────────────────────────────────────────────┘
```

No Web3 vocabulary should be required for the primary user flow.

Advanced information can be expandable.

---

# 21. Demo strategy

The demo video should be designed as part of the product.

Maximum: **4 minutes**.

## 0:00–0:25 — Problem

Explain the fragmentation:

> Tokenized stocks trade on-chain, but before signing a trade users still need to know whether the asset is authentic, whether its price represents what they think it does, whether their order fits the available liquidity, and whether the transaction will actually execute.

---

## 0:25–0:45 — Product

> StockProof is the trust and execution layer between user intent and an on-chain tokenized-stock trade.

Show:

```text
Intent → Proof → Execute
```

---

## 0:45–1:35 — Successful trade

User enters:

> Buy $20 of [demo ticker]. Maximum 1% execution cost.

Show in real time:

```text
✓ Asset verified
✓ Market checked
✓ Quote received
✓ Constraints passed
✓ Simulation successful
```

Then:

```text
EXECUTE
```

Show the resulting BSC transaction.

---

## 1:35–2:15 — Liquidity / policy refusal

Increase the amount or tighten a threshold.

Show:

```text
✕ User constraint violated

STOCKPROOF REFUSED TO SIGN
```

The judge should immediately understand why.

---

## 2:15–2:45 — Authenticity refusal

Provide an unsupported/unverified contract or intentionally invalid asset input.

Show:

```text
✕ ASSET VERIFICATION FAILED

No quote.
No transaction.
No signature.
```

---

## 2:45–3:20 — Technical architecture

Show:

```text
Natural Language
      ↓
ExecutionIntent
      ↓
StockProof Engine
      ↓
RWA + Market + Trading + Transaction + Wallet
      ↓
Policy Engine
      ↓
Agentic Wallet
      ↓
BSC
```

Briefly show actual API responses/logs.

---

## 3:20–3:45 — Developer Experience

Show one or two **real** integration discoveries:

- an API edge case;
- latency behavior;
- documentation mismatch;
- tokenized-stock representation difference;
- simulation issue;
- liquidity behavior.

This proves the team actually built against the stack.

---

## 3:45–4:00 — Vision

> Today StockProof protects a tokenized-stock trade. Tomorrow any wallet, fintech, broker or AI agent can use StockProof as the execution guard before signing one.

End on:

# **Prove the trade before you sign it.**

---

# 22. Hackathon scoring strategy

The official judging weights are:

| Criterion | Weight |
|---|---:|
| Technical implementation | 30% |
| Creativity & originality | 25% |
| Developer Experience Report | 25% |
| Product quality & UX | 20% |

Our build priorities should mirror those weights.

---

## Technical implementation — 30%

Target:

- multiple Binance Web3 API modules used for real purposes;
- robust error handling;
- deterministic execution engine;
- transaction simulation;
- Agentic Wallet integration;
- real BSC mainnet transaction;
- auditable logs;
- graceful failures.

Depth > number of features.

---

## Creativity & originality — 25%

Our originality thesis:

> **StockProof is not another trading agent. It is an execution guard that turns natural-language constraints into verifiable pre-trade policy and refuses to sign trades that fail the proof.**

Potential differentiators:

- proof-before-signing model;
- deterministic policy engine beneath the LLM;
- representation-aware execution;
- effective execution comparison;
- reusable Proof object;
- explicit refusal UX.

---

## Developer Experience Report — 25%

Treat this as a product deliverable from **day one**.

For every integration session record:

```text
Date/time:
API/module:
Endpoint/action:
Goal:
Input:
Expected behavior:
Actual behavior:
Latency:
Error:
Documentation used:
Where documentation was unclear:
Workaround:
Suggested API/docs improvement:
Tokenized-stock observation:
AI/Agentic Wallet observation:
```

Do not reconstruct this report at the end.

The official rules explicitly reject generic or AI-generated DevEx reports.

Our final report must be based on **real build logs and firsthand observations**.

---

## Product & UX — 20%

The primary UX test:

> Can someone who knows what NVIDIA is but knows nothing about token contracts, DEX routing or transaction simulation understand what is happening?

If yes, StockProof is doing its job.

---

# 23. Tie-break strategy

Official hackathon guidance says tie-breaks prioritize:

1. **depth of Binance Web3 Wallet/API usage**;
2. **quality of the Developer Experience feedback**.

Therefore:

- integrate deeply rather than broadly;
- preserve raw logs;
- document edge cases;
- make every module visibly necessary to the product.

---

# 24. Special prize strategy

## Best Use of Agentic Wallet / Wallet Skills — $2,000

This is a natural target.

To make the integration credible:

```text
User intent
   ↓
Agent
   ↓
StockProof proof generation
   ↓
Policy decision
   ↓
Agentic Wallet execution
```

The agent must **not** simply call a swap function.

It must participate in a guarded execution workflow.

---

## Best Use of BNB Agent Studio — $2,000

Secondary objective.

Attempt only after P0 is stable.

Potential story:

> StockProof becomes a persistent autonomous execution agent with an on-chain identity that can receive constrained execution tasks from other applications or agents.

---

# 25. Business model

The hackathon MVP is consumer-facing because it makes the value easy to understand.

The long-term business can be infrastructure.

## B2B API / SDK

Potential customers:

- Web3 wallets;
- fintech applications;
- tokenized-asset platforms;
- brokers;
- trading interfaces;
- AI agents;
- portfolio applications.

Integration concept:

```ts
const proof = await stockProof.prove({
  ticker: "NVDA",
  amountUsd: 500,
  constraints: {
    maxExecutionCostPct: 1,
    maxReferenceDeviationPct: 2
  }
});

if (proof.status === "READY") {
  await stockProof.execute(proof);
}
```

Potential pricing:

- per proof;
- per successful execution;
- monthly API tier;
- enterprise SDK/API contracts.

The exact pricing model is **not required for the hackathon** and should not distract from proving demand and technical value.

---

# 26. Long-term vision

StockProof can evolve from:

```text
Tokenized-stock trading interface
```

into:

```text
Execution safety infrastructure for AI-controlled finance
```

Future architecture:

```text
Wallet
Broker
Fintech
AI Agent
Portfolio Manager
Trading Bot
     │
     └──────────────┐
                    ▼
              STOCKPROOF API
                    │
         Verify → Simulate → Policy
                    │
             Execute / Refuse
                    │
                    ▼
               Blockchain
```

The long-term insight:

> As financial agents gain the ability to move money autonomously, they need a deterministic layer between **reasoning** and **signing**.

StockProof can be that layer.

---

# 27. Security principles

## Never trust the LLM as a source of truth

All financial/on-chain facts must come from trusted APIs or blockchain state.

## Simulate before execution

Every supported trade should be simulated whenever the API flow allows it.

## Explicit constraints

No hidden interpretation of user risk tolerance.

## Fail closed

If a required verification cannot be completed:

```text
BLOCK
```

not:

```text
probably okay
```

## Exact transaction binding

The transaction executed should correspond to the transaction/path that passed validation.

Avoid validating one route and executing another without re-validation.

## Small hackathon mainnet amounts

The demo proves the mechanism; it does not require meaningful capital.

---

# 28. Error model

Use explicit machine-readable failures.

Examples:

```text
ASSET_NOT_FOUND
ASSET_NOT_VERIFIED
ATTESTATION_UNAVAILABLE
REFERENCE_PRICE_UNAVAILABLE
MARKET_DATA_UNAVAILABLE
NO_EXECUTABLE_ROUTE
PRICE_IMPACT_LIMIT_EXCEEDED
REFERENCE_DEVIATION_LIMIT_EXCEEDED
EXECUTION_COST_LIMIT_EXCEEDED
INSUFFICIENT_BALANCE
APPROVAL_REQUIRED
SIMULATION_FAILED
QUOTE_EXPIRED
ROUTE_CHANGED
TRANSACTION_REVERTED
```

Each error should have:

- internal code;
- technical details;
- user-facing explanation;
- retryability.

---

# 29. Observability

Every proof should generate logs for:

- intent parsing;
- API calls;
- API latency;
- token resolution;
- verification;
- quote discovery;
- simulation;
- policy evaluation;
- execution;
- transaction result.

This improves:

1. debugging;
2. DevEx report quality;
3. demo credibility;
4. future analytics.

---

# 30. Repository structure

Suggested structure:

```text
stockproof/
│
├── apps/
│   ├── web/
│   └── api/
│
├── packages/
│   ├── agent/
│   ├── execution-engine/
│   ├── policy-engine/
│   ├── binance-web3/
│   ├── proof-schema/
│   └── shared/
│
├── docs/
│   ├── architecture.md
│   ├── devex-log.md
│   ├── demo-script.md
│   ├── api-notes.md
│   └── research.md
│
├── tests/
│   ├── policy/
│   ├── integration/
│   └── fixtures/
│
├── .env.example
├── README.md
└── LICENSE
```

For a very small team, a simpler monorepo is fine. **Do not over-engineer the repository at the expense of the demo.**

---

# 31. Build plan

## Phase 0 — Technical spike

Before polishing UI:

**Goal:** prove that the core execution chain is possible.

One ticker.

One small amount.

Prove:

```text
resolve
→ verify
→ reference price
→ quote
→ simulate
→ decision
→ mainnet transaction
```

If this chain does not work, fix it before building anything else.

---

## Phase 1 — Deterministic engine

Implement:

- typed schemas;
- asset resolver;
- verification;
- quote adapter;
- market/reference adapter;
- simulation;
- policy engine;
- decision object;
- errors;
- logging.

No LLM dependency should be required to unit-test this layer.

---

## Phase 2 — Agent

Add:

- natural-language parser;
- tool orchestration;
- explanations;
- Agentic Wallet / Wallet Skills.

The agent consumes the deterministic engine.

---

## Phase 3 — UX

Build the single-screen experience.

Priorities:

1. clarity;
2. speed;
3. trust;
4. visible evidence;
5. beautiful refusal state.

---

## Phase 4 — Adversarial testing

Try to break StockProof:

- fake/unsupported contract;
- unknown ticker;
- insufficient balance;
- impossible threshold;
- huge order;
- stale quote;
- API timeout;
- failed simulation;
- route changes;
- market closed;
- missing reference data.

The product should fail safely.

---

## Phase 5 — Mainnet rehearsal

Run the complete demo repeatedly with tiny amounts.

Record:

- exact inputs;
- latency;
- API behavior;
- transaction hashes;
- failure cases;
- screenshots;
- DevEx notes.

---

## Phase 6 — Submission

Freeze features.

Focus only on:

- reliability;
- README;
- setup instructions;
- public repo;
- deployed demo;
- 4-minute video;
- DevEx report;
- judge instructions.

---

# 32. Definition of Done

StockProof is hackathon-ready when a judge can:

1. open the application;
2. enter a natural-language trade;
3. see StockProof resolve the intended asset;
4. see real market/reference evidence;
5. see an executable quote;
6. see a successful transaction simulation;
7. see explicit policy evaluation;
8. execute a tiny real BSC transaction;
9. inspect the transaction;
10. intentionally request a bad trade;
11. watch StockProof refuse it;
12. understand why without knowing Web3.

If any of those critical steps is unreliable, fix it before adding another feature.

---

# 33. North-star demo

The product should ultimately make this interaction real:

```text
USER
Buy $20 of NVIDIA.
Only execute if:
- the asset is verified,
- execution cost is below 1%,
- reference deviation is below 2%,
- and the transaction simulation succeeds.

STOCKPROOF

PROVING TRADE...

✓ Asset authenticity
✓ Representation identified
✓ Market/reference check
✓ Executable route
✓ Execution threshold
✓ Transaction simulation

PROOF PASSED

Ready to execute.
```

Then:

```text
EXECUTE
```

Then:

```text
TRANSACTION CONFIRMED
0x...
```

And when conditions fail:

```text
PROOF FAILED

StockProof refused to sign.

Reason:
PRICE_IMPACT_LIMIT_EXCEEDED
Expected: ≤ 1.00%
Observed: 8.90%
```

---

# 34. Positioning

## Primary

> **StockProof — Prove the trade before you sign it.**

## Technical

> **A policy-controlled execution layer for tokenized stocks.**

## Agent-focused

> **The guardrail between AI intent and on-chain execution.**

## Product explanation

> **Tell StockProof what you want to buy. It verifies the asset, checks the market, simulates the transaction and only executes if your rules pass.**

---

# 35. Why StockProof can matter to the BNB ecosystem

StockProof is designed around BSC rather than treating BNB Chain as a deployment checkbox.

It demonstrates how the Binance/BNB stack can become one cohesive user experience:

```text
RWA identity
+
market context
+
DEX routing
+
transaction simulation
+
wallet state
+
AI execution
=
safe, understandable tokenized-stock execution
```

For BNB Chain, the value proposition is:

- more useful tokenized-stock applications on BSC;
- a better onboarding experience for non-crypto-native users;
- deeper usage of Binance Web3 APIs;
- credible Agentic Wallet execution;
- an example of AI agents using BSC without allowing the LLM to blindly control funds.

---

# 36. Hackathon facts

**BNB Hack: Tokenized Stocks Edition**

- Build window: September 16 – October 11, 2026.
- Submission deadline: October 11, 12:00 UTC.
- BSC mainnet only.
- Spot only.
- At least one of bStocks, Ondo or xStocks must be central.
- Working project required.
- Public repository required.
- Demo video: four minutes or less.
- Deployed link or judge instructions required.
- Developer Experience Report required.
- Main prize pool: $20,000.
- First place: $6,000.
- Best Use of Agentic Wallet / Wallet Skills: $2,000.
- Best Use of BNB Agent Studio: $2,000.
- Main placement and special prizes can stack.

---

# 37. Team rule

Until submission:

> **If a feature does not improve technical depth, originality, DevEx evidence, product clarity or demo reliability, it does not get built.**

---

# 38. Final objective

We are not trying to build the largest project in the hackathon.

We are trying to build the project that makes the clearest argument:

> **AI agents should not sign financial transactions simply because they understood the user's sentence. They should prove the transaction first.**

That is StockProof.

---

## StockProof

### **Prove the trade before you sign it.**
