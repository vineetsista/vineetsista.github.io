'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { usePrefersReducedMotion } from '@/lib/hooks';

export interface Series {
  points: number[];
  last: number;
  open: number;
  high: number;
  low: number;
  changePct: number;
  up: boolean;
}

function mulberry32(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Generate a plausible GBM-ish path that ends near `end` with a `trend` drift. */
export function genPath(len: number, end: number, trend: number, seed: number): number[] {
  const rand = mulberry32(seed);
  const open = end / (1 + trend / 100);
  const pts: number[] = [open];
  for (let i = 1; i < len; i += 1) {
    const drift = (trend / 100) * (open / len);
    const shock = (rand() - 0.5) * open * 0.018;
    pts.push(Math.max(open * 0.6, pts[i - 1] + drift + shock));
  }
  // nudge the final point toward `end`
  pts[len - 1] = end;
  return pts;
}

function summarize(points: number[], openOverride?: number): Series {
  const last = points[points.length - 1];
  const open = openOverride ?? points[0];
  const high = Math.max(...points);
  const low = Math.min(...points);
  const changePct = ((last - open) / open) * 100;
  return { points, last, open, high, low, changePct, up: changePct >= 0 };
}

interface Options {
  length?: number;
  start?: number;
  trend?: number; // overall drift %
  cadenceMs?: number;
  seed?: number;
  live?: boolean;
}

export function usePriceSeries({
  length = 80,
  start = 187.42,
  trend = 2.1,
  cadenceMs = 900,
  seed = 7,
  live = true,
}: Options = {}) {
  const reduced = usePrefersReducedMotion();
  const initial = useMemo(() => genPath(length, start, trend, seed), [length, start, trend, seed]);
  const open = useRef(initial[0]);
  const [points, setPoints] = useState<number[]>(initial);

  useEffect(() => {
    if (reduced || !live) return;
    const id = window.setInterval(() => {
      setPoints((prev) => {
        const lastP = prev[prev.length - 1];
        const shock = (Math.random() - 0.485) * lastP * 0.012;
        const next = Math.max(open.current * 0.6, lastP + shock);
        return [...prev.slice(1), next];
      });
    }, cadenceMs);
    return () => window.clearInterval(id);
  }, [reduced, live, cadenceMs]);

  return summarize(points, open.current);
}

export { summarize };
