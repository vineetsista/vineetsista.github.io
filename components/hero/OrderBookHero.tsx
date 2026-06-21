'use client';

import { motion } from 'framer-motion';
import { useOrderBookSim } from './useOrderBookSim';
import { OrderBookView } from './OrderBookView';
import { IDENTITY } from '@/lib/content';
import { useIsCoarsePointer, usePrefersReducedMotion } from '@/lib/hooks';
import { openExternal, scrollToSection } from '@/lib/nav';

const ease = [0.16, 1, 0.3, 1] as const;

export function OrderBookHero() {
  const coarse = useIsCoarsePointer();
  const reduced = usePrefersReducedMotion();
  const { snap, live } = useOrderBookSim({ cadenceMs: 300, light: coarse });

  const stagger = (i: number) =>
    reduced
      ? {}
      : { initial: { opacity: 0, y: 18 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.7, delay: 0.15 + i * 0.08, ease } };

  return (
    <section id="hero" className="relative min-h-[calc(100vh-1.75rem)] overflow-hidden">
      <div className="mesh" aria-hidden />
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-30" aria-hidden />
      <div
        className="pointer-events-none absolute -left-40 top-1/4 h-[480px] w-[480px] rounded-full opacity-[0.08] blur-[130px] animate-pulse-glow"
        style={{ background: 'var(--amber)' }}
        aria-hidden
      />

      <div className="relative mx-auto grid min-h-[calc(100vh-1.75rem)] max-w-6xl grid-cols-1 items-center gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8">
        {/* identity */}
        <div className="order-2 lg:order-1">
          <motion.div
            {...stagger(0)}
            className="mb-5 flex flex-wrap items-center gap-3 font-mono text-[10px] uppercase tracking-wider text-text-dim"
          >
            <span className="flex items-center gap-1.5">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-bid" style={{ boxShadow: '0 0 6px var(--bid)' }} />
              {live ? 'feed live' : 'feed snapshot'}
            </span>
            <span className="h-px w-6 bg-line" />
            <span className="text-amber">JPMORGANCHASE · SWE INTERN</span>
          </motion.div>

          <motion.h1
            {...stagger(1)}
            className="font-display text-[15vw] font-extrabold leading-[0.86] tracking-tight sm:text-7xl lg:text-8xl"
          >
            <span className="block text-text">VINEET</span>
            <span className="block">
              SI<span className="grad-text grad-text-anim glow-amber-text">STA</span>
            </span>
          </motion.h1>

          <motion.p {...stagger(2)} className="mt-6 max-w-md font-mono text-sm leading-relaxed text-text-dim sm:text-[15px]">
            {IDENTITY.positioning}
          </motion.p>
          <motion.p {...stagger(3)} className="mt-4 max-w-lg text-[16px] leading-relaxed text-text sm:text-[18px]">
            I build systems that have to be fast —{' '}
            <span className="font-serif-accent italic text-amber">order books, ML pipelines, and AI products</span> — and I
            care about the nanoseconds.
          </motion.p>

          <motion.div {...stagger(4)} className="mt-8 flex flex-wrap items-center gap-3">
            <button
              onClick={() => openExternal(IDENTITY.github)}
              className="group inline-flex items-center gap-2 border border-amber/50 bg-amber/10 px-4 py-2.5 font-mono text-[12px] font-medium text-amber transition-all hover:bg-amber/20"
              data-magnetic
            >
              view github <span className="transition-transform group-hover:translate-x-0.5">↗</span>
            </button>
            <button
              onClick={() => scrollToSection('terminal')}
              className="inline-flex items-center gap-2 border border-line bg-surface px-4 py-2.5 font-mono text-[12px] text-text-dim transition-colors hover:border-text-dim hover:text-text"
              data-magnetic
            >
              open terminal
            </button>
            <span className="flex items-center gap-2 font-mono text-[11px] text-text-dim">
              <kbd className="border border-line bg-surface px-2 py-1">⌘K</kbd> palette
            </span>
          </motion.div>
        </div>

        {/* live book */}
        <motion.div
          initial={reduced ? undefined : { opacity: 0, scale: 0.97 }}
          animate={reduced ? undefined : { opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.1, ease }}
          className="order-1 w-full max-w-sm justify-self-center lg:order-2 lg:justify-self-end"
        >
          <div className="mb-2 flex items-center justify-between font-mono text-[9px] uppercase tracking-wider text-text-dim">
            <span>VNT · limit order book</span>
            <span className="text-bid">● {live ? 'streaming' : 'static'}</span>
          </div>
          <OrderBookView snap={snap} rows={8} />
          <div className="mt-2 flex items-center justify-between font-mono text-[9px] uppercase tracking-wider text-text-dim">
            <span>price-time priority</span>
            <span>
              matching latency <span className="text-amber">~85 ns</span>
            </span>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-4 left-1/2 hidden -translate-x-1/2 font-mono text-[10px] uppercase tracking-wider text-text-dim lg:block">
        <span className="animate-blink text-amber">▼</span> scroll
      </div>
    </section>
  );
}
