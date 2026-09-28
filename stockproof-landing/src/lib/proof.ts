/** Deterministic educational fixture. NOT a quote, prediction, or live verification. */
export function evaluateIllustration(amount: number, threshold: number) {
 if (!Number.isFinite(amount) || amount < 10 || amount > 100000) throw new Error('Enter an amount between $10 and $100,000.');
 if (!Number.isFinite(threshold) || threshold < 0.1 || threshold > 10) throw new Error('Enter a cost limit between 0.1% and 10%.');
 const entryCost = Math.round(amount * 0.0078 * 100) / 100;
 return { amount, threshold, entryCost, total: Math.round((amount + entryCost) * 100) / 100, exitNow: Math.round(amount * 0.9724 * 100) / 100, costPercent: 0.78, withinLimit: 0.78 < threshold };
}
export const money = (value: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 }).format(value);
