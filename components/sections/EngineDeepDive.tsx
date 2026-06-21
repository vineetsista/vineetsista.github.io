'use client';

import { useState } from 'react';
import { SectionShell, SectionHeader, Reveal, Tag } from '@/components/ui/primitives';
import { OrderBookView } from '@/components/hero/OrderBookView';
import { useOrderBookSim } from '@/components/hero/useOrderBookSim';
import type { Level } from '@/components/hero/orderBookSim';
import { useTerminal } from '@/components/shell/ThemeProvider';
import { blipUp, blipDown } from '@/lib/sound';
import { openExternal } from '@/lib/nav';
import { LatencyJourney } from './LatencyJourney';

const PIPELINE = [
  { k: 'FEED', t: 'ITCH 5.0 Feed Handler', d: 'Raw UDP/PCAP ingest of NASDAQ TotalView-ITCH 5.0 messages.' },
  { k: 'PARSE', t: 'Zero-Copy Parser', d: 'Zero-copy decode of Add/Cancel/Execute/Replace into the book.' },
  { k: 'BOOK', t: 'Limit Order Book', d: 'Full-depth reconstruction; intrusive, cache-conscious price levels; O(1) best-bid/ask.' },
  { k: 'MATCH', t: 'Matching Core', d: 'Price-time priority crossing; deterministic fills.' },
  { k: 'REPLAY', t: 'Market-Replay Backtester', d: 'Queue-position-aware replay; lock-free parallel across symbols.' },
  { k: 'MM', t: 'Market Maker', d: 'Quoting strategy with PnL & adverse-selection analytics.' },
  { k: 'BENCH', t: 'Microbench Harness', d: 'Hot-path latency probes; ~85 ns match, percentile capture.' },
];

export function EngineDeepDive() {
  const { sound } = useTerminal();
  const { snap, fireMarket } = useOrderBookSim({ cadenceMs: 360, config: { startMid: 187.42, marketOrderProb: 0.16 } });
  const [hover, setHover] = useState<{ level: Level; side: 'bid' | 'ask' } | null>(null);

  const fire = (side: 'buy' | 'sell') => {
    if (sound) (side === 'buy' ? blipUp : blipDown)();
    fireMarket(side, 700);
  };

  return (
    <SectionShell id="engine">
      <SectionHeader
        index="04"
        label="signature · deep-dive"
        title="The Order Book Engine"
        caption="A low-latency NASDAQ ITCH 5.0 limit order book engine in C++20 — plus a queue-position-aware market-replay backtester and a market maker with PnL / adverse-selection analytics. The flagship, in active development."
      />

      <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
        {/* architecture */}
        <Reveal>
          <div className="border border-line bg-surface/40 p-4 sm:p-6">
            <div className="mb-4 font-mono text-[9px] uppercase tracking-wider text-text-dim">architecture · data path</div>
            <div className="flex flex-col gap-0">
              {PIPELINE.map((stage, i) => (
                <div key={stage.k}>
                  <div className="grid grid-cols-[64px_1fr] items-start gap-3">
                    <div className="flex h-full flex-col items-center">
                      <div className="flex h-11 w-full items-center justify-center border border-amber/40 bg-ink/60 font-mono text-[10px] font-bold tracking-wider text-amber">
                        {stage.k}
                      </div>
                    </div>
                    <div className="pb-1">
                      <div className="font-sans text-[14px] font-medium text-text">{stage.t}</div>
                      <div className="font-mono text-[11.5px] leading-relaxed text-text-dim">{stage.d}</div>
                    </div>
                  </div>
                  {i < PIPELINE.length - 1 && (
                    <div className="ml-[31px] h-4 w-px bg-gradient-to-b from-amber/40 to-line" aria-hidden />
                  )}
                </div>
              ))}
            </div>

            <div className="mt-6 grid grid-cols-2 gap-px border border-line bg-line sm:grid-cols-4">
              {[
                { k: 'MATCH LAT', v: '~85 ns' },
                { k: 'PRIORITY', v: 'PRICE-TIME' },
                { k: 'LANG', v: 'C++20' },
                { k: 'REPLAY', v: 'LOCK-FREE' },
              ].map((s) => (
                <div key={s.k} className="bg-surface px-3 py-3">
                  <div className="font-mono text-[8px] uppercase tracking-wider text-text-dim">{s.k}</div>
                  <div className="tnum mt-0.5 font-mono text-[13px] text-amber">{s.v}</div>
                </div>
              ))}
            </div>

            <div className="mt-4 flex flex-wrap gap-1.5">
              {['C++20', 'NASDAQ ITCH 5.0', 'Zero-copy parsing', 'Lock-free replay', 'Market maker', 'Microbenchmarking'].map((t) => (
                <Tag key={t}>{t}</Tag>
              ))}
            </div>

            <button
              onClick={() => openExternal('https://github.com/vineetsista/limit-order-book-engine')}
              className="mt-4 inline-flex items-center gap-2 font-mono text-[11px] text-amber link-underline"
            >
              view source — github.com/vineetsista/limit-order-book-engine ↗
            </button>
          </div>
        </Reveal>

        {/* interactive book */}
        <Reveal delay={0.1}>
          <div>
            <div className="mb-2 flex items-center justify-between font-mono text-[9px] uppercase tracking-wider text-text-dim">
              <span>interactive · cross the book</span>
              <span className="text-bid">● live</span>
            </div>
            <OrderBookView
              snap={snap}
              rows={7}
              showDepth={false}
              onHoverLevel={(level, side) => setHover(level ? { level, side } : null)}
            />

            {/* resting-order inspector */}
            <div className="mt-2 h-12 border border-line bg-ink/50 px-3 py-2 font-mono text-[11px]">
              {hover ? (
                <div className="flex items-center justify-between">
                  <span style={{ color: hover.side === 'bid' ? 'var(--bid)' : 'var(--ask)' }}>
                    {hover.side.toUpperCase()} @ {hover.level.price.toFixed(2)}
                  </span>
                  <span className="text-text-dim">
                    resting <span className="tnum text-text">{hover.level.size.toLocaleString()}</span> · cum{' '}
                    <span className="tnum text-text">{hover.level.cum.toLocaleString()}</span>
                  </span>
                </div>
              ) : (
                <span className="text-text-dim">hover a level to inspect resting orders →</span>
              )}
            </div>

            {/* fire market order */}
            <div className="mt-2 grid grid-cols-2 gap-2">
              <button
                onClick={() => fire('buy')}
                className="border border-bid/50 bg-bid/10 px-3 py-2 font-mono text-[12px] font-medium text-bid transition-colors hover:bg-bid/20"
                data-magnetic
              >
                ▲ BUY market — lift the ask
              </button>
              <button
                onClick={() => fire('sell')}
                className="border border-ask/50 bg-ask/10 px-3 py-2 font-mono text-[12px] font-medium text-ask transition-colors hover:bg-ask/20"
                data-magnetic
              >
                ▼ SELL market — hit the bid
              </button>
            </div>
            <p className="mt-2 font-mono text-[10px] leading-relaxed text-text-dim">
              Fire a market order and watch it walk the book — consuming resting size at price-time priority, just like the C++ core.
            </p>
          </div>
        </Reveal>
      </div>

      {/* the optimization journey — the "how fast can I make it" centerpiece */}
      <Reveal>
        <div className="mt-6">
          <LatencyJourney />
        </div>
      </Reveal>
    </SectionShell>
  );
}
