'use client';

import { PriceChart } from './PriceChart';
import { Sparkline } from './Sparkline';
import { TradeTape } from './TradeTape';
import { PROJECTS, type Project } from '@/lib/content';
import { openExternal, scrollToSection } from '@/lib/nav';

function WatchRow({ p, i }: { p: Project; i: number }) {
  const up = (p.change ?? 0) >= 0;
  const color = up ? 'var(--bid)' : 'var(--ask)';
  const go = () => {
    if (p.featured) scrollToSection('engine');
    else if (p.live) openExternal(p.live);
    else if (p.repo) openExternal(p.repo);
    else scrollToSection('instruments');
  };
  return (
    <button
      onClick={go}
      className="group grid w-full grid-cols-[52px_1fr_auto] items-center gap-3 border-b border-line px-3 py-2 text-left transition-colors last:border-b-0 hover:bg-surface-2/60"
      data-magnetic
    >
      <span className="font-mono text-[12px] font-bold tracking-wide text-text group-hover:text-amber">{p.ticker}</span>
      <span className="hidden sm:block">
        <Sparkline end={p.price ?? 50} trend={p.change ?? 0} seed={i * 13 + 3} up={up} />
      </span>
      <span className="flex items-center justify-end gap-3">
        <span className="tnum font-mono text-[12px] text-text">{(p.price ?? 0).toFixed(2)}</span>
        <span className="tnum w-16 text-right font-mono text-[11px]" style={{ color }}>
          {up ? '▲' : '▼'} {up ? '+' : ''}
          {(p.change ?? 0).toFixed(2)}%
        </span>
      </span>
    </button>
  );
}

export function MarketBoard() {
  const rows = PROJECTS.filter((p) => p.price !== undefined);
  return (
    <div className="grid gap-3 lg:grid-cols-[1.5fr_1fr]">
      <PriceChart />
      <div className="border border-line bg-ink/50">
        <div className="flex items-center justify-between border-b border-line px-3 py-2.5 font-mono text-[10px] uppercase tracking-wider text-text-dim">
          <span>watchlist · {rows.length} instruments</span>
          <span className="hidden sm:inline">price · 24h</span>
        </div>
        <div>
          {rows.map((p, i) => (
            <WatchRow key={p.ticker} p={p} i={i} />
          ))}
        </div>
      </div>
      <div className="lg:col-span-2">
        <TradeTape />
      </div>
    </div>
  );
}
