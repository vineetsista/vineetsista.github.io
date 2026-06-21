'use client';

import { useOrderBookSim } from './useOrderBookSim';
import { OrderBookView } from './OrderBookView';
import { IDENTITY } from '@/lib/content';
import { useIsCoarsePointer } from '@/lib/hooks';

export function OrderBookHero() {
  const coarse = useIsCoarsePointer();
  const { snap, live } = useOrderBookSim({ cadenceMs: 300, light: coarse });

  return (
    <section id="hero" className="relative min-h-[calc(100vh-1.75rem)] overflow-hidden">
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-40" aria-hidden />
      {/* amber wash */}
      <div
        className="pointer-events-none absolute -left-40 top-1/4 h-[420px] w-[420px] rounded-full opacity-[0.07] blur-[120px]"
        style={{ background: 'var(--amber)' }}
        aria-hidden
      />

      <div className="relative mx-auto grid min-h-[calc(100vh-1.75rem)] max-w-6xl grid-cols-1 items-center gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8">
        {/* identity */}
        <div className="order-2 lg:order-1">
          <div className="mb-5 flex items-center gap-3 font-mono text-[10px] uppercase tracking-wider text-text-dim">
            <span className="flex items-center gap-1.5">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-bid" style={{ boxShadow: '0 0 6px var(--bid)' }} />
              {live ? 'feed live' : 'feed snapshot'}
            </span>
            <span className="h-px w-6 bg-line" />
            <span>NASDAQ ITCH 5.0</span>
          </div>

          <h1 className="font-sans text-[12vw] font-bold leading-[0.92] tracking-tight sm:text-6xl lg:text-7xl">
            <span className="block text-text">VINEET</span>
            <span className="block text-text">
              SI<span className="text-amber">STA</span>
            </span>
          </h1>

          <p className="mt-6 max-w-md font-mono text-sm leading-relaxed text-text-dim sm:text-[15px]">
            {IDENTITY.positioning}
          </p>
          <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-text sm:text-base">
            {IDENTITY.heroLine}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3 font-mono text-[11px]">
            <kbd className="border border-line bg-surface px-2 py-1 text-text-dim">⌘K</kbd>
            <span className="text-text-dim">command palette</span>
            <span className="hidden text-line sm:inline">/</span>
            <span className="hidden text-text-dim sm:inline">
              or scroll to the <a href="#terminal" className="text-amber underline-offset-4 hover:underline">terminal ↓</a>
            </span>
          </div>
        </div>

        {/* live book */}
        <div className="order-1 w-full max-w-sm justify-self-center lg:order-2 lg:justify-self-end">
          <div className="mb-2 flex items-center justify-between font-mono text-[9px] uppercase tracking-wider text-text-dim">
            <span>VNT · limit order book</span>
            <span className="text-bid">● {live ? 'streaming' : 'static'}</span>
          </div>
          <OrderBookView snap={snap} rows={8} />
          <div className="mt-2 flex items-center justify-between font-mono text-[9px] uppercase tracking-wider text-text-dim">
            <span>price-time priority</span>
            <span>matching latency <span className="text-amber">~85 ns</span></span>
          </div>
        </div>
      </div>

      {/* scroll cue */}
      <div className="absolute bottom-4 left-1/2 hidden -translate-x-1/2 font-mono text-[10px] uppercase tracking-wider text-text-dim lg:block">
        <span className="animate-blink text-amber">▼</span> scroll
      </div>
    </section>
  );
}
