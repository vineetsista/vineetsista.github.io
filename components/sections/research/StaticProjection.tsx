'use client';

import { useMemo } from 'react';
import { CLUSTERS } from './PointCloud';

function mulberry32(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// A beautiful static 2D UMAP projection — used under reduced-motion / SSR.
export function StaticProjection() {
  const W = 600;
  const H = 420;
  const dots = useMemo(() => {
    const rand = mulberry32(7);
    const out: { x: number; y: number; c: string; r: number }[] = [];
    for (const cluster of CLUSTERS) {
      const cx = W / 2 + cluster.center[0] * 90;
      const cy = H / 2 - cluster.center[1] * 80;
      for (let n = 0; n < Math.round(cluster.count * 0.6); n += 1) {
        const gx = (rand() + rand() + rand() - 1.5) * cluster.spread * 70;
        const gy = (rand() + rand() + rand() - 1.5) * cluster.spread * 70;
        out.push({ x: cx + gx, y: cy + gy, c: cluster.color, r: 1.2 + rand() * 1.3 });
      }
    }
    return out;
  }, []);

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="h-full w-full" role="img" aria-label="UMAP latent-space projection of urgent-care clusters">
      {dots.map((d, i) => (
        <circle key={i} cx={d.x} cy={d.y} r={d.r} fill={d.c} opacity={0.7} />
      ))}
      {CLUSTERS.map((c) => {
        const cx = W / 2 + c.center[0] * 90;
        const cy = H / 2 - c.center[1] * 80;
        return (
          <g key={c.label}>
            <text
              x={cx}
              y={cy - 60}
              fill={c.color}
              fontSize="11"
              fontFamily="var(--font-mono), monospace"
              textAnchor="middle"
              letterSpacing="1"
            >
              {c.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
