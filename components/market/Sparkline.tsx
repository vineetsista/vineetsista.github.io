'use client';

import { useMemo } from 'react';
import { genPath } from './usePriceSeries';

export function Sparkline({
  end,
  trend,
  seed,
  up,
  w = 84,
  h = 26,
}: {
  end: number;
  trend: number;
  seed: number;
  up: boolean;
  w?: number;
  h?: number;
}) {
  const { d, area } = useMemo(() => {
    const pts = genPath(24, end, trend, seed);
    const min = Math.min(...pts);
    const max = Math.max(...pts);
    const range = max - min || 1;
    const coords = pts.map((p, i) => {
      const x = (i / (pts.length - 1)) * w;
      const y = h - ((p - min) / range) * (h - 4) - 2;
      return [x, y] as const;
    });
    const line = coords.map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`).join(' ');
    const areaPath = `${line} L${w},${h} L0,${h} Z`;
    return { d: line, area: areaPath };
  }, [end, trend, seed, w, h]);

  const color = up ? 'var(--bid)' : 'var(--ask)';
  const gid = `spark-${seed}-${up ? 'u' : 'd'}`;

  return (
    <svg viewBox={`0 0 ${w} ${h}`} width={w} height={h} className="overflow-visible" aria-hidden>
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.28" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill={`url(#${gid})`} />
      <path d={d} fill="none" stroke={color} strokeWidth="1.4" strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  );
}
