'use client';

import { SectionShell, Reveal } from '@/components/ui/primitives';
import { MANIFESTO, CURRENTLY, STATS, IDENTITY, type StatItem } from '@/lib/content';
import { useCountUp } from '@/lib/hooks';
import { openExternal } from '@/lib/nav';

const ACCENT: Record<string, string> = {
  amber: 'var(--amber)',
  bid: 'var(--bid)',
  ask: 'var(--ask)',
  cyan: 'var(--cyan)',
};

function Stat({ s }: { s: StatItem }) {
  const { val, ref } = useCountUp(s.value, s.decimals ?? 0);
  const color = ACCENT[s.accent ?? 'amber'];
  const shown = (s.decimals ? val.toFixed(s.decimals) : Math.round(val).toString());
  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className="group relative overflow-hidden border border-line bg-surface/50 px-4 py-5 transition-colors hover:border-amber/40"
    >
      <div
        className="pointer-events-none absolute -right-6 -top-6 h-16 w-16 rounded-full opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-40"
        style={{ background: color }}
        aria-hidden
      />
      <div className="tnum font-display text-4xl font-bold sm:text-5xl" style={{ color }}>
        {s.prefix}
        {shown}
        {s.suffix}
      </div>
      <div className="mt-2 font-mono text-[11px] uppercase tracking-wider text-text">{s.label}</div>
      <div className="font-mono text-[10px] text-text-dim">{s.sub}</div>
    </div>
  );
}

export function Manifesto() {
  return (
    <SectionShell id="about" className="overflow-hidden">
      <div className="mesh" aria-hidden />
      <div className="relative grid gap-12 lg:grid-cols-[1.25fr_0.75fr]">
        {/* voice */}
        <Reveal>
          <div className="mb-5 font-mono text-[10px] uppercase tracking-wider text-amber">{MANIFESTO.eyebrow}</div>
          <h2 className="font-display text-3xl font-bold leading-[1.08] tracking-tight text-text sm:text-[44px]">
            {MANIFESTO.lines[0]}{' '}
            <span className="font-serif-accent text-amber italic font-normal">{MANIFESTO.lines[1]}</span>
          </h2>
          <div className="mt-7 max-w-2xl space-y-4 text-[15px] leading-relaxed text-text-dim sm:text-[17px]">
            {MANIFESTO.body.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          <p className="mt-7 font-serif-accent text-2xl italic text-text sm:text-[28px]">
            {MANIFESTO.signoff}
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <button
              onClick={() => openExternal(IDENTITY.github)}
              className="group inline-flex items-center gap-2 border border-amber/50 bg-amber/10 px-4 py-2.5 font-mono text-[12px] font-medium text-amber transition-all hover:bg-amber/20 hover:gap-3"
              data-magnetic
            >
              view my github <span className="transition-transform group-hover:translate-x-0.5">↗</span>
            </button>
            <a
              href={`mailto:${IDENTITY.email}`}
              className="inline-flex items-center gap-2 border border-line bg-surface px-4 py-2.5 font-mono text-[12px] text-text-dim transition-colors hover:border-text-dim hover:text-text"
              data-magnetic
            >
              {IDENTITY.email}
            </a>
          </div>
        </Reveal>

        {/* currently */}
        <Reveal delay={0.1}>
          <div className="border border-line bg-ink/60 font-mono">
            <div className="flex items-center gap-2 border-b border-line px-3 py-2">
              <span className="inline-block h-1.5 w-1.5 animate-pulse-glow rounded-full bg-bid" aria-hidden />
              <span className="text-[10px] uppercase tracking-wider text-text-dim">currently.log</span>
            </div>
            <ul className="divide-y divide-line">
              {CURRENTLY.map((c) => (
                <li key={c.k} className="px-3 py-3">
                  <div className="text-[9px] uppercase tracking-wider text-text-dim">{c.k}</div>
                  <div className="mt-0.5 text-[12.5px]" style={{ color: ACCENT[c.accent ?? 'amber'] }}>
                    {c.v}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>

      {/* stats strip */}
      <Reveal delay={0.05}>
        <div className="mt-14">
          <div className="mb-4 flex items-center gap-3 font-mono text-[10px] uppercase tracking-wider text-text-dim">
            <span className="h-px w-8 bg-line" />
            <span>by the numbers</span>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {STATS.map((s) => (
              <Stat key={s.label} s={s} />
            ))}
          </div>
        </div>
      </Reveal>
    </SectionShell>
  );
}
