'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { OrderBookSim, type BookSnapshot, type SimConfig } from './orderBookSim';
import { usePrefersReducedMotion } from '@/lib/hooks';

interface Options {
  cadenceMs?: number;
  config?: Partial<SimConfig>;
  light?: boolean;
  running?: boolean;
}

export function useOrderBookSim({ cadenceMs = 280, config, light, running = true }: Options = {}) {
  const reduced = usePrefersReducedMotion();
  const simRef = useRef<OrderBookSim | null>(null);
  if (!simRef.current) simRef.current = new OrderBookSim(config);

  const [snap, setSnap] = useState<BookSnapshot>(() => OrderBookSim.staticSnapshot(config));
  const live = running && !reduced;

  useEffect(() => {
    if (!live) {
      // Static, well-composed snapshot for reduced-motion.
      setSnap(OrderBookSim.staticSnapshot(config));
      return;
    }
    const interval = light ? cadenceMs * 1.6 : cadenceMs;
    // Pause when tab hidden — keep it honest about FPS/latency.
    let id = 0;
    const start = () => {
      id = window.setInterval(() => {
        if (simRef.current) setSnap(simRef.current.step());
      }, interval);
    };
    const onVis = () => {
      window.clearInterval(id);
      if (!document.hidden) start();
    };
    start();
    document.addEventListener('visibilitychange', onVis);
    return () => {
      window.clearInterval(id);
      document.removeEventListener('visibilitychange', onVis);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [live, cadenceMs, light]);

  const fireMarket = useCallback((side: 'buy' | 'sell', qty?: number) => {
    if (simRef.current) setSnap(simRef.current.fireMarket(side, qty));
  }, []);

  return { snap, fireMarket, live };
}
