'use client';

import { useMemo, useState } from 'react';
import { usePriceSeries } from './usePriceSeries';
import { useIsCoarsePointer } from '@/lib/hooks';

const TIMEFRAMES = [
  { key: '1D', trend: 2.1, seed: 7 },
  { key: '5D', trend: 5.8, seed: 21 },
  { key: '1M', trend: 12.4, seed: 42 },
  { key: 'YTD', trend: 28.6, seed: 99 },
];

export function PriceChart() {
  const coarse = useIsCoarsePointer();
  const [tf, setTf] = useState(0);
  const conf = TIMEFRAMES[tf];
  const s = usePriceSeries({ length: 90, start: 187.42, trend: conf.trend, seed: conf.seed, cadenceMs: 1000, live: !coarse });

  const W = 600;
  const H = 200;
  const { line, area } = useMemo(() => {
    const pts = s.points;
    const min = Math.min(...pts);
    const max = Math.max(...pts);
    const range = max - min || 1;
    const coords = pts.map((p, i) => {
      const x = (i / (pts.length - 1)) * W;
      const y = H - ((p - min) / range) * (H - 16) - 8;
      return [x, y] as const;
    });
    const l = coords.map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`).join(' ');
    const a = `${l} L${W},${H} L0,${H} Z`;
    return { line: l, area: a, last: coords[coords.length - 1] };
  }, [s.points]);

  const color = s.up ? 'var(--bid)' : 'var(--ask)';

  return (
    <div className="border border-line bg-ink/50 p-4 font-mono">
      {/* header */}
      <div className="mb-3 flex flex-wrap items-end justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 text-[10px] uppercase tracking-wider text-text-dim">
            <span className="inline-block h-1.5 w-1.5 animate-pulse-glow rounded-full bg-bid" />
            VNT · composite index
          </div>
          <div className="mt-1 flex items-end gap-2.5">
            <span className="tnum font-display text-3xl font-bold text-text sm:text-4xl">{s.last.toFixed(2)}</span>
            <span className="tnum mb-1 text-[13px] font-medium" style={{ color }}>
              {s.up ? '▲' : '▼'} {s.up ? '+' : ''}
              {s.changePct.toFixed(2)}%
            </span>
          </div>
        </div>
        <div className="flex gap-1">
          {TIMEFRAMES.map((t, i) => (
            <button
              key={t.key}
              onClick={() => setTf(i)}
              className={`border px-2 py-1 text-[10px] tracking-wide transition-colors ${
                i === tf ? 'border-amber/60 bg-amber/10 text-amber' : 'border-line text-text-dim hover:text-text'
              }`}
              aria-pressed={i === tf}
            >
              {t.key}
            </button>
          ))}
        </div>
      </div>

      {/* chart */}
      <div className="relative">
        <svg viewBox={`0 0 ${W} ${H}`} className="h-40 w-full sm:h-48" preserveAspectRatio="none" aria-label="VNT composite index price chart">
          <defs>
            <linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity="0.22" />
              <stop offset="100%" stopColor={color} stopOpacity="0" />
            </linearGradient>
          </defs>
          {/* gridlines */}
          {[0.25, 0.5, 0.75].map((g) => (
            <line key={g} x1="0" y1={H * g} x2={W} y2={H * g} stroke="var(--line)" strokeWidth="0.5" strokeDasharray="2 4" />
          ))}
          <path d={area} fill="url(#chartFill)" />
          <path d={line} fill="none" stroke={color} strokeWidth="1.6" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
        </svg>
      </div>

      {/* stat row */}
      <div className="mt-3 grid grid-cols-3 gap-px border-t border-line pt-3 text-[11px]">
        {[
          { k: 'OPEN', v: s.open.toFixed(2) },
          { k: 'HIGH', v: s.high.toFixed(2) },
          { k: 'LOW', v: s.low.toFixed(2) },
        ].map((c) => (
          <div key={c.k}>
            <span className="text-[9px] uppercase tracking-wider text-text-dim">{c.k}</span>
            <div className="tnum text-text">{c.v}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
