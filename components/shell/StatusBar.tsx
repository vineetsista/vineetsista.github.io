'use client';

import { useEffect, useRef, useState } from 'react';
import { getETParts, getMarketStatus, type MarketState } from '@/lib/market';
import { BUILD_HASH } from '@/lib/content';
import { useTerminal } from './ThemeProvider';
import { useMounted } from '@/lib/hooks';

const STATE_COLOR: Record<MarketState, string> = {
  OPEN: 'var(--bid)',
  CLOSED: 'var(--ask)',
  PRE: 'var(--amber)',
  AFTER: 'var(--amber)',
};

function Cell({ label, children, hideMobile = false }: { label: string; children: React.ReactNode; hideMobile?: boolean }) {
  return (
    <div className={`flex items-center gap-1.5 whitespace-nowrap ${hideMobile ? 'hidden md:flex' : 'flex'}`}>
      <span className="text-[9px] uppercase tracking-wider text-text-dim">{label}</span>
      <span className="tnum text-[11px] text-text">{children}</span>
    </div>
  );
}

export function StatusBar() {
  const mounted = useMounted();
  const { theme, toggleTheme, hud } = useTerminal();
  const [clock, setClock] = useState('--:--:--');
  const [market, setMarket] = useState<{ state: MarketState; detail: string }>({ state: 'CLOSED', detail: '' });
  const [fps, setFps] = useState(60);
  const [latency, setLatency] = useState(0);

  // ET clock + market status (1s tick).
  useEffect(() => {
    const tick = () => {
      const p = getETParts(new Date());
      setClock(p.label);
      const m = getMarketStatus(p);
      setMarket({ state: m.state, detail: m.detail });
    };
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  // FPS meter via rAF.
  const frames = useRef(0);
  const last = useRef(0);
  useEffect(() => {
    let raf = 0;
    const loop = (t: number) => {
      if (!last.current) last.current = t;
      frames.current += 1;
      if (t - last.current >= 1000) {
        setFps(frames.current);
        frames.current = 0;
        last.current = t;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  // Interaction latency — measure pointer→paint round-trip.
  useEffect(() => {
    const onClick = () => {
      const t0 = performance.now();
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setLatency(Math.max(0, performance.now() - t0));
        });
      });
    };
    window.addEventListener('pointerdown', onClick);
    return () => window.removeEventListener('pointerdown', onClick);
  }, []);

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 h-7 border-b border-line bg-ink/95 backdrop-blur-sm font-mono"
      role="banner"
    >
      <div className="flex h-full items-center justify-between gap-2 px-2 sm:px-3">
        {/* left cluster */}
        <div className="flex items-center gap-2 sm:gap-3 overflow-hidden">
          <span className="flex items-center gap-1.5">
            <span
              className="inline-block h-1.5 w-1.5 rounded-full"
              style={{ background: STATE_COLOR[market.state], boxShadow: `0 0 6px ${STATE_COLOR[market.state]}` }}
              aria-hidden
            />
            <span className="text-[11px] font-medium tracking-wide" style={{ color: STATE_COLOR[market.state] }}>
              MKT {mounted ? market.state : '····'}
            </span>
            <span className="hidden sm:inline text-[9px] uppercase tracking-wider text-text-dim">{market.detail}</span>
          </span>
          <span className="h-3 w-px bg-line" aria-hidden />
          <Cell label="ET">{mounted ? clock : '--:--:--'}</Cell>
        </div>

        {/* right cluster */}
        <div className="flex items-center gap-2 sm:gap-3">
          <Cell label="LAT" hideMobile>
            <span style={{ color: latency < 16 ? 'var(--bid)' : latency < 40 ? 'var(--amber)' : 'var(--ask)' }}>
              {latency.toFixed(1)}ms
            </span>
          </Cell>
          {hud && (
            <Cell label="FPS">
              <span style={{ color: fps >= 55 ? 'var(--bid)' : fps >= 30 ? 'var(--amber)' : 'var(--ask)' }}>{fps}</span>
            </Cell>
          )}
          <Cell label="LOC" hideMobile>
            COLUMBUS·OH
          </Cell>
          <Cell label="BUILD" hideMobile>
            {BUILD_HASH}
          </Cell>
          <button
            onClick={toggleTheme}
            className="flex items-center gap-1.5 border border-line px-1.5 py-0.5 text-[10px] uppercase tracking-wider text-text-dim transition-colors hover:border-amber hover:text-amber"
            aria-label={`Switch to ${theme === 'crt' ? 'dark' : 'CRT amber'} theme`}
          >
            <span className="inline-block h-1.5 w-1.5" style={{ background: theme === 'crt' ? 'var(--amber)' : 'var(--text-dim)' }} aria-hidden />
            {theme === 'crt' ? 'CRT' : 'DARK'}
          </button>
        </div>
      </div>
    </header>
  );
}
