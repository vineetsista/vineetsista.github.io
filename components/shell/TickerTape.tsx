'use client';

import { TICKER, type Tick } from '@/lib/content';

function TickItem({ t }: { t: Tick }) {
  const color = t.dir === 'up' ? 'var(--bid)' : t.dir === 'down' ? 'var(--ask)' : 'var(--text)';
  const arrow = t.dir === 'up' ? '▲' : t.dir === 'down' ? '▼' : '·';
  return (
    <span className="mx-5 inline-flex items-center gap-2 font-mono text-[11px] tracking-wide">
      <span className="text-text-dim">{t.label}</span>
      <span className="tnum font-medium" style={{ color }}>
        {t.value}
      </span>
      <span aria-hidden style={{ color }}>
        {arrow}
      </span>
      <span className="ml-3 text-line" aria-hidden>
        |
      </span>
    </span>
  );
}

export function TickerTape({ reverse = false }: { reverse?: boolean }) {
  // One track containing the set twice → translateX(-50%) loops seamlessly.
  const doubled = [...TICKER, ...TICKER];
  return (
    <div className="marquee-mask relative overflow-hidden border-y border-line bg-surface/50 py-2 backdrop-blur-sm">
      <div className={`flex w-max ${reverse ? 'animate-marquee-rev' : 'animate-marquee'}`} aria-hidden>
        {doubled.map((t, i) => (
          <TickItem key={i} t={t} />
        ))}
      </div>
    </div>
  );
}
