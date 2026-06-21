'use client';

import { useEffect, useRef, useState } from 'react';
import { LATENCY_JOURNEY, type OptStage } from '@/lib/content';
import { useCountUp, usePrefersReducedMotion } from '@/lib/hooks';

const MAX = LATENCY_JOURNEY[0].ns;
const MIN = LATENCY_JOURNEY[LATENCY_JOURNEY.length - 1].ns;
const SPEEDUP = (MAX / MIN).toFixed(1);

// slowest = red, fastest = green
function barColor(i: number, n: number): string {
  const t = i / (n - 1);
  if (t < 0.5) return `color-mix(in srgb, var(--ask) ${(1 - t * 2) * 100}%, var(--amber))`;
  return `color-mix(in srgb, var(--amber) ${(1 - (t - 0.5) * 2) * 100}%, var(--bid))`;
}

function Row({ stage, i, started, total }: { stage: OptStage; i: number; started: boolean; total: number }) {
  const { val, ref } = useCountUp(stage.ns, 0, 1100);
  const widthPct = Math.max(7, (stage.ns / MAX) * 100);
  const color = barColor(i, total);
  return (
    <div ref={ref as React.RefObject<HTMLDivElement>} className="grid grid-cols-[1fr] gap-1 py-2 sm:grid-cols-[200px_1fr] sm:items-center sm:gap-4">
      <div className="min-w-0">
        <div className="font-mono text-[12px] text-text">
          <span className="mr-2 text-text-dim">{String(i).padStart(2, '0')}</span>
          {stage.label}
        </div>
        <div className="hidden font-mono text-[10px] text-text-dim sm:block">{stage.note}</div>
      </div>
      <div className="flex items-center gap-3">
        <div className="relative h-6 flex-1 overflow-hidden bg-ink/60">
          <div
            className="h-full transition-[width] duration-[1100ms] ease-out"
            style={{ width: started ? `${widthPct}%` : '0%', background: color, transitionDelay: `${i * 90}ms` }}
          />
        </div>
        <span className="tnum w-20 text-right font-mono text-[13px] font-semibold" style={{ color }}>
          {Math.round(val)} ns
        </span>
      </div>
    </div>
  );
}

export function LatencyJourney() {
  const reduced = usePrefersReducedMotion();
  const [started, setStarted] = useState(reduced);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduced) return;
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (e) => {
        if (e[0].isIntersecting) {
          setStarted(true);
          obs.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [reduced]);

  return (
    <div ref={ref} className="border border-line bg-surface/40 p-4 sm:p-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <div className="font-mono text-[9px] uppercase tracking-wider text-text-dim">the optimization journey</div>
          <h3 className="mt-1 font-display text-xl font-bold text-text sm:text-2xl">
            How the hot path got to <span className="text-amber">85&nbsp;nanoseconds</span>
          </h3>
        </div>
        <div className="text-right">
          <div className="tnum font-display text-3xl font-bold text-bid sm:text-4xl">{SPEEDUP}×</div>
          <div className="font-mono text-[9px] uppercase tracking-wider text-text-dim">faster than naive</div>
        </div>
      </div>

      <div className="mt-5 divide-y divide-line border-y border-line">
        {LATENCY_JOURNEY.map((s, i) => (
          <Row key={s.label} stage={s} i={i} started={started} total={LATENCY_JOURNEY.length} />
        ))}
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-1 font-mono text-[10px] text-text-dim">
        <span>
          measured · <span className="text-text">p50 {MIN} ns</span>
        </span>
        <span>
          <span className="text-text">p99 ~140 ns</span>
        </span>
        <span>per message · single core · -O3 -march=native</span>
      </div>
    </div>
  );
}
