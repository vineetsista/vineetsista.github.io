'use client';

import { useEffect, useRef, useState } from 'react';
import { usePrefersReducedMotion } from '@/lib/hooks';

interface Trade {
  id: number;
  t: string;
  price: number;
  size: number;
  buy: boolean;
}

function fmtTime(n: number): string {
  // synthetic HH:MM:SS.mmm clock derived from a counter
  const base = 34_200 + n; // ~09:30:00 in seconds
  const hh = Math.floor(base / 3600) % 24;
  const mm = Math.floor(base / 60) % 60;
  const ss = base % 60;
  const ms = (n * 137) % 1000;
  const p = (x: number, l = 2) => String(x).padStart(l, '0');
  return `${p(hh)}:${p(mm)}:${p(ss)}.${p(ms, 3)}`;
}

function makeTrade(id: number, price: number): Trade {
  const buy = Math.random() < 0.5;
  return { id, t: fmtTime(id), price, size: 10 + Math.floor(Math.random() * 990), buy };
}

export function TradeTape() {
  const reduced = usePrefersReducedMotion();
  const priceRef = useRef(187.42);
  const idRef = useRef(0);
  const [trades, setTrades] = useState<Trade[]>(() => {
    const seed: Trade[] = [];
    let p = 187.42;
    for (let i = 0; i < 12; i += 1) {
      p = Math.max(180, p + (Math.random() - 0.49) * 0.06);
      seed.unshift(makeTrade(i, parseFloat(p.toFixed(2))));
    }
    idRef.current = 12;
    priceRef.current = p;
    return seed;
  });

  useEffect(() => {
    if (reduced) return;
    const id = window.setInterval(() => {
      priceRef.current = Math.max(180, priceRef.current + (Math.random() - 0.49) * 0.06);
      idRef.current += 1;
      const t = makeTrade(idRef.current, parseFloat(priceRef.current.toFixed(2)));
      setTrades((prev) => [t, ...prev].slice(0, 13));
    }, 950);
    return () => window.clearInterval(id);
  }, [reduced]);

  return (
    <div className="border border-line bg-ink/50 font-mono">
      <div className="flex items-center justify-between border-b border-line px-3 py-2 text-[10px] uppercase tracking-wider text-text-dim">
        <span>time &amp; sales</span>
        <span className="hidden sm:inline">price · size</span>
      </div>
      <div className="grid grid-cols-[1fr_auto_auto] gap-x-3 px-3 py-1 text-[8px] uppercase tracking-wider text-text-dim">
        <span>time</span>
        <span className="text-right">price</span>
        <span className="text-right">size</span>
      </div>
      <div className="divide-y divide-line/60">
        {trades.map((tr, i) => (
          <div
            key={tr.id}
            className={`grid grid-cols-[1fr_auto_auto] gap-x-3 px-3 py-[3px] text-[11px] ${i === 0 ? 'flash-up' : ''}`}
            style={i === 0 ? { animationName: tr.buy ? 'flashUp' : 'flashDown' } : undefined}
          >
            <span className="tnum text-text-dim">{tr.t}</span>
            <span className="tnum text-right font-medium" style={{ color: tr.buy ? 'var(--bid)' : 'var(--ask)' }}>
              {tr.price.toFixed(2)}
            </span>
            <span className="tnum text-right text-text-dim">{tr.size}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
