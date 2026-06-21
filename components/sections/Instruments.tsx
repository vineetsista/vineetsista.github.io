'use client';

import { motion } from 'framer-motion';
import { SectionShell, SectionHeader, Reveal, Tag } from '@/components/ui/primitives';
import { PROJECTS, type Project } from '@/lib/content';
import { openExternal, scrollToSection } from '@/lib/nav';
import { MarketBoard } from '@/components/market/MarketBoard';
import { usePrefersReducedMotion } from '@/lib/hooks';

const ACCENT: Record<string, string> = {
  amber: 'var(--amber)',
  bid: 'var(--bid)',
  cyan: 'var(--cyan)',
};

const GLOW: Record<string, string> = {
  amber: 'rgba(255,176,0,0.13)',
  bid: 'rgba(22,199,132,0.13)',
  cyan: 'rgba(45,212,191,0.13)',
};

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

function InstrumentCard({ p, index }: { p: Project; index: number }) {
  const reduced = usePrefersReducedMotion();
  const featured = p.featured;
  const accentColor = p.accent ? ACCENT[p.accent] : 'var(--amber)';
  const onClick = () => {
    if (featured) scrollToSection('engine');
    else if (p.live) openExternal(p.live);
    else if (p.repo) openExternal(p.repo);
  };

  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 16 }}
      whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.45, delay: Math.min(index * 0.04, 0.3), ease: [0.16, 1, 0.3, 1] }}
      whileHover={reduced ? undefined : { y: -4 }}
      className={`group relative flex flex-col border bg-surface/50 p-4 transition-colors duration-200 ${
        featured
          ? 'border-amber/50 sm:col-span-2 lg:col-span-3'
          : p.elevated
            ? 'border-cyan/40 hover:border-cyan'
            : 'border-line hover:border-amber/60 hover:bg-surface-2/70'
      }`}
      style={
        featured || p.elevated
          ? { boxShadow: `0 0 0 1px ${GLOW[p.accent ?? 'amber']}, inset 0 0 60px ${GLOW[p.accent ?? 'amber']}` }
          : undefined
      }
    >
      {/* corner glow */}
      {(featured || p.elevated) && (
        <div
          className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full opacity-20 blur-2xl transition-opacity duration-300 group-hover:opacity-40"
          style={{ background: accentColor }}
          aria-hidden
        />
      )}

      {/* header row */}
      <div className="relative flex items-start justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span className="font-mono text-[13px] font-bold tracking-wide" style={{ color: featured || p.elevated ? accentColor : 'var(--text)' }}>
            {p.ticker}
          </span>
          {p.building && (
            <span className="border border-amber/60 px-1.5 py-0.5 font-mono text-[8px] uppercase tracking-wider text-amber">
              ● building
            </span>
          )}
          {p.elevated && (
            <span className="border px-1.5 py-0.5 font-mono text-[8px] uppercase tracking-wider" style={{ borderColor: `${accentColor}99`, color: accentColor }}>
              systems
            </span>
          )}
          {p.live && (
            <span className="border border-bid/50 px-1.5 py-0.5 font-mono text-[8px] uppercase tracking-wider text-bid">
              live
            </span>
          )}
        </div>
        <div className="flex items-center gap-2 font-mono text-[10px] text-text-dim">
          {p.date && <span className="hidden text-text-dim/70 sm:inline">{p.date}</span>}
          {p.repo && (
            <button onClick={(e) => { e.stopPropagation(); openExternal(p.repo!); }} className="hover:text-amber" aria-label={`Open ${p.name} repository`}>
              repo ↗
            </button>
          )}
          {p.live && (
            <button onClick={(e) => { e.stopPropagation(); openExternal(p.live!); }} className="hover:text-amber" aria-label={`Open ${p.name} live demo`}>
              demo ↗
            </button>
          )}
        </div>
      </div>

      <button onClick={onClick} className="relative mt-1 text-left" aria-label={`${p.name} — ${featured ? 'view deep-dive' : 'open'}`}>
        <h3 className={`font-display font-bold text-text transition-colors group-hover:text-amber ${featured ? 'text-xl sm:text-2xl' : 'text-[16px]'}`}>
          {p.name}
        </h3>
        <p className={`mt-2 leading-relaxed text-text-dim ${featured ? 'max-w-2xl text-[14px]' : 'text-[12.5px]'}`}>{p.thesis}</p>
      </button>

      <div className="relative mt-4 flex flex-wrap gap-x-6 gap-y-2 border-t border-line pt-3">
        {p.metrics.map((m) => (
          <MetricChip key={m.label} label={m.label} value={m.value} dir={m.dir} />
        ))}
      </div>

      <div className="relative mt-3 flex flex-wrap gap-1.5">
        {p.tech.map((t) => (
          <Tag key={t}>{t}</Tag>
        ))}
      </div>

      {featured && (
        <button
          onClick={() => scrollToSection('engine')}
          className="relative mt-4 self-start font-mono text-[11px] text-amber link-underline"
        >
          → open deep-dive: matching engine architecture
        </button>
      )}
    </motion.div>
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
        caption="Each project as a tradable instrument — ticker, thesis, live spec, and stack. Two flagship systems lead: a C++ order book and a from-scratch LLM inference engine."
      />

      <Reveal>
        <div className="mb-8">
          <MarketBoard />
        </div>
      </Reveal>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {featured.map((p, i) => (
          <InstrumentCard key={p.ticker} p={p} index={i} />
        ))}
        {rest.map((p, i) => (
          <InstrumentCard key={p.ticker} p={p} index={i + 1} />
        ))}
      </div>
    </SectionShell>
  );
}
