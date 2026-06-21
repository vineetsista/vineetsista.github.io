'use client';

import { memo, useEffect, useRef } from 'react';
import type { BookSnapshot, Level } from './orderBookSim';

interface Props {
  snap: BookSnapshot;
  rows?: number;
  showDepth?: boolean;
  compact?: boolean;
  onHoverLevel?: (level: Level | null, side: 'bid' | 'ask') => void;
}

function fmtPrice(p: number): string {
  return p.toFixed(2);
}
function fmtSize(s: number): string {
  return s.toLocaleString('en-US');
}

const Row = memo(function Row({
  level,
  side,
  maxCum,
  onHover,
}: {
  level: Level;
  side: 'bid' | 'ask';
  maxCum: number;
  onHover?: (l: Level | null, s: 'bid' | 'ask') => void;
}) {
  const priceRef = useRef<HTMLSpanElement>(null);
  const prev = useRef(level.size);

  useEffect(() => {
    if (level.size === prev.current) return;
    const el = priceRef.current;
    if (el) {
      const cls = level.size > prev.current ? 'flash-up' : 'flash-down';
      el.classList.remove('flash-up', 'flash-down');
      // force reflow so the animation restarts
      void el.offsetWidth;
      el.classList.add(cls);
    }
    prev.current = level.size;
  }, [level.size]);

  const depthPct = maxCum > 0 ? (level.cum / maxCum) * 100 : 0;
  const color = side === 'bid' ? 'var(--bid)' : 'var(--ask)';
  const depthBg = side === 'bid' ? 'rgba(22,199,132,0.12)' : 'rgba(234,57,67,0.12)';

  return (
    <div
      className="relative grid grid-cols-[1fr_1fr] items-center px-2 py-[3px] text-[11px] sm:text-[12px]"
      onMouseEnter={() => onHover?.(level, side)}
      onMouseLeave={() => onHover?.(null, side)}
      data-magnetic
    >
      {/* depth bar */}
      <div
        className="absolute inset-y-0 right-0"
        style={{
          width: `${depthPct}%`,
          background: depthBg,
          [side === 'bid' ? 'right' : 'left']: 0,
        }}
        aria-hidden
      />
      <span ref={priceRef} className="tnum relative z-10 font-medium" style={{ color }}>
        {fmtPrice(level.price)}
      </span>
      <span className="tnum relative z-10 text-right text-text-dim">{fmtSize(level.size)}</span>
    </div>
  );
});

export const OrderBookView = memo(function OrderBookView({
  snap,
  rows = 9,
  showDepth = true,
  compact = false,
  onHoverLevel,
}: Props) {
  const bids = snap.bids.slice(0, rows);
  const asks = snap.asks.slice(0, rows);
  const maxCum = Math.max(bids[bids.length - 1]?.cum ?? 1, asks[asks.length - 1]?.cum ?? 1);
  const lastUp = snap.lastSide === 'ask'; // a buy lifting the ask pushes price up

  return (
    <div className="select-none border border-line bg-surface/60 font-mono backdrop-blur-sm">
      {/* header */}
      <div className="grid grid-cols-[1fr_1fr] border-b border-line px-2 py-1.5 text-[9px] uppercase tracking-wider text-text-dim">
        <span>Price · USD</span>
        <span className="text-right">Size</span>
      </div>

      {/* asks — ascending price, render top (highest) down to best */}
      <div className="flex flex-col-reverse">
        {asks.map((l, i) => (
          <Row key={`a${i}`} level={l} side="ask" maxCum={maxCum} onHover={onHoverLevel} />
        ))}
      </div>

      {/* mid / spread */}
      <div className="flex items-center justify-between border-y border-line bg-ink/40 px-2 py-1.5">
        <span className="flex items-center gap-1.5">
          <span
            className={`tnum text-[13px] font-semibold sm:text-[15px] ${lastUp ? 'flash-up' : 'flash-down'}`}
            style={{ color: lastUp ? 'var(--bid)' : 'var(--ask)' }}
            key={snap.seq}
          >
            {fmtPrice(snap.mid)}
          </span>
          <span aria-hidden style={{ color: lastUp ? 'var(--bid)' : 'var(--ask)' }}>
            {lastUp ? '▲' : '▼'}
          </span>
        </span>
        <span className="flex items-center gap-2 text-[9px] uppercase tracking-wider text-text-dim">
          <span>spread</span>
          <span className="tnum text-amber">{snap.spread.toFixed(2)}</span>
        </span>
      </div>

      {/* bids — descending price */}
      <div className="flex flex-col">
        {bids.map((l, i) => (
          <Row key={`b${i}`} level={l} side="bid" maxCum={maxCum} onHover={onHoverLevel} />
        ))}
      </div>

      {showDepth && !compact && <DepthChart bids={bids} asks={asks} />}
    </div>
  );
});

function DepthChart({ bids, asks }: { bids: Level[]; asks: Level[] }) {
  const W = 280;
  const H = 56;
  const maxCum = Math.max(bids[bids.length - 1]?.cum ?? 1, asks[asks.length - 1]?.cum ?? 1);

  const buildPath = (levels: Level[], dir: 1 | -1) => {
    if (!levels.length) return '';
    const half = W / 2;
    const pts = levels.map((l, i) => {
      const x = half + dir * ((i + 1) / levels.length) * half;
      const y = H - (l.cum / maxCum) * H;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    });
    const startX = half;
    const endX = half + dir * half;
    return `M ${startX},${H} L ${pts.join(' L ')} L ${endX.toFixed(1)},${H} Z`;
  };

  return (
    <div className="border-t border-line px-2 py-2">
      <div className="mb-1 text-[8px] uppercase tracking-wider text-text-dim">cumulative depth</div>
      <svg viewBox={`0 0 ${W} ${H}`} className="h-12 w-full" preserveAspectRatio="none" aria-hidden>
        <path d={buildPath(bids, -1)} fill="rgba(22,199,132,0.18)" stroke="var(--bid)" strokeWidth="1" />
        <path d={buildPath(asks, 1)} fill="rgba(234,57,67,0.18)" stroke="var(--ask)" strokeWidth="1" />
        <line x1={W / 2} y1="0" x2={W / 2} y2={H} stroke="var(--line)" strokeWidth="1" strokeDasharray="2 2" />
      </svg>
    </div>
  );
}
