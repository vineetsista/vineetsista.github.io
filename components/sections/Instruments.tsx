'use client';

import { SectionShell, SectionHeader, Reveal, Tag } from '@/components/ui/primitives';
import { PROJECTS, type Project } from '@/lib/content';
import { openExternal, scrollToSection } from '@/lib/nav';

function MetricChip({ label, value, dir }: { label: string; value: string; dir?: 'up' | 'down' | 'flat' }) {
  const color = dir === 'up' ? 'var(--bid)' : dir === 'down' ? 'var(--ask)' : 'var(--text)';
  return (
    <div className="flex flex-col">
      <span className="font-mono text-[8px] uppercase tracking-wider text-text-dim">{label}</span>
      <span className="tnum font-mono text-[12px] font-medium" style={{ color }}>
        {dir === 'up' && '▲ '}
        {dir === 'down' && '▼ '}
        {value}
      </span>
    </div>
  );
}

function InstrumentCard({ p }: { p: Project }) {
  const featured = p.featured;
  const onClick = () => {
    if (featured) scrollToSection('engine');
    else if (p.live) openExternal(p.live);
    else if (p.repo) openExternal(p.repo);
  };

  return (
    <div
      className={`group relative flex flex-col border bg-surface/50 p-4 transition-all duration-200 ${
        featured
          ? 'border-amber/50 sm:col-span-2 lg:col-span-3'
          : 'border-line hover:-translate-y-0.5 hover:border-amber/60 hover:bg-surface-2/70'
      }`}
      style={featured ? { boxShadow: '0 0 0 1px var(--glow-amber), inset 0 0 60px rgba(255,176,0,0.04)' } : undefined}
    >
      {/* header row */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span
            className={`font-mono text-[13px] font-bold tracking-wide ${featured ? 'text-amber' : 'text-text'}`}
          >
            {p.ticker}
          </span>
          {p.building && (
            <span className="border border-amber/60 px-1.5 py-0.5 font-mono text-[8px] uppercase tracking-wider text-amber">
              ● building
            </span>
          )}
          {p.live && (
            <span className="border border-bid/50 px-1.5 py-0.5 font-mono text-[8px] uppercase tracking-wider text-bid">
              live
            </span>
          )}
        </div>
        <div className="flex gap-2 font-mono text-[10px] text-text-dim">
          {p.repo && (
            <button
              onClick={(e) => { e.stopPropagation(); openExternal(p.repo!); }}
              className="hover:text-amber"
              aria-label={`Open ${p.name} repository`}
            >
              repo ↗
            </button>
          )}
          {p.live && (
            <button
              onClick={(e) => { e.stopPropagation(); openExternal(p.live!); }}
              className="hover:text-amber"
              aria-label={`Open ${p.name} live demo`}
            >
              demo ↗
            </button>
          )}
        </div>
      </div>

      <button onClick={onClick} className="mt-1 text-left" aria-label={`${p.name} — ${featured ? 'view deep-dive' : 'open'}`}>
        <h3 className={`font-sans font-semibold text-text group-hover:text-amber ${featured ? 'text-xl sm:text-2xl' : 'text-[15px]'}`}>
          {p.name}
        </h3>
        <p className={`mt-2 leading-relaxed text-text-dim ${featured ? 'max-w-2xl text-[14px]' : 'text-[12.5px]'}`}>
          {p.thesis}
        </p>
      </button>

      {/* metrics quote line */}
      <div className={`mt-4 flex flex-wrap gap-x-6 gap-y-2 border-t border-line pt-3 ${featured ? '' : ''}`}>
        {p.metrics.map((m) => (
          <MetricChip key={m.label} label={m.label} value={m.value} dir={m.dir} />
        ))}
      </div>

      {/* tech tags */}
      <div className="mt-3 flex flex-wrap gap-1.5">
        {p.tech.map((t) => (
          <Tag key={t}>{t}</Tag>
        ))}
      </div>

      {featured && (
        <button
          onClick={() => scrollToSection('engine')}
          className="mt-4 self-start font-mono text-[11px] text-amber underline-offset-4 hover:underline"
        >
          → open deep-dive: matching engine architecture
        </button>
      )}
    </div>
  );
}

export function Instruments() {
  const featured = PROJECTS.filter((p) => p.featured);
  const rest = PROJECTS.filter((p) => !p.featured);
  return (
    <SectionShell id="instruments">
      <SectionHeader
        index="03"
        label="watchlist"
        title="Instruments"
        caption="Each project as a tradable instrument — ticker, thesis, live spec, and stack. The order book engine is the flagship."
      />
      <Reveal>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((p) => (
            <InstrumentCard key={p.ticker} p={p} />
          ))}
          {rest.map((p) => (
            <InstrumentCard key={p.ticker} p={p} />
          ))}
        </div>
      </Reveal>
    </SectionShell>
  );
}
