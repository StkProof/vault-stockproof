# StockProof landing

Independent Next.js + TypeScript + Tailwind + Framer Motion landing, kept separate from the existing product documentation.

## Local development

Requires Node.js 20.9+ and npm.

```sh
npm install
npm run dev
```

Open http://127.0.0.1:3000. The development server binds only to localhost.

```sh
npm run typecheck
npm test
```

No production build was run, per project instructions. No external font, wallet, analytics, or financial API connection is required.

## Demo boundaries

The interactive demo accepts $10–$100,000 and a 0.1–10% additional entry-cost limit. The fixture uses a fixed 0.78% entry cost and an illustrative exit return of 97.24% of principal, producing $503.90 / $486.20 for the $500 example. A strict “below” threshold rejects equality. These are narrative fixtures, not real estimates. No token or issuer is verified, no trades are prepared, and no funds move.

Exit Now is a current-quote concept; Exit Availability describes published rules; Exit Risk describes sourced observations. Missing live data is shown as unknown, never synthesized as a forecast.

## Structure

- `src/components/landing.tsx`: responsive editorial sections and interactive walkthrough.
- `src/lib/proof.ts`: deterministic fixture, validation and formatting.
- `src/lib/proof.test.ts`: fixture and boundary tests.
- `src/app/globals.css`: paper/ink/ultraviolet visual system and reduced-motion styles.

## Next steps

Connect separately verified asset/quote/simulation adapters, add source timestamps and quote expiry, and require explicit user authorization before introducing any wallet flow. Remove noindex only when this prototype is ready to publish.
