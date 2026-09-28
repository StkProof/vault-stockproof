import { test } from 'node:test';
import assert from 'node:assert/strict';
import { evaluateIllustration } from './proof.ts';
test('default narrative', () => { const p = evaluateIllustration(500, 1); assert.equal(p.total, 503.9); assert.equal(p.exitNow, 486.2); assert.equal(p.withinLimit, true); });
test('strict limit', () => { assert.equal(evaluateIllustration(500, .78).withinLimit, false); assert.equal(evaluateIllustration(500, .5).withinLimit, false); });
test('recalculates amount', () => { const p = evaluateIllustration(1000, 1); assert.equal(p.total, 1007.8); assert.equal(p.exitNow, 972.4); });
test('validates inputs', () => { for (const n of [NaN, Infinity, -1, 0, 100001]) assert.throws(() => evaluateIllustration(n, 1)); assert.throws(() => evaluateIllustration(500, 0)); });
