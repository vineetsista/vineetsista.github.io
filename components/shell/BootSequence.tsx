'use client';

import { useEffect, useRef, useState } from 'react';
import { usePrefersReducedMotion } from '@/lib/hooks';

const LINES = [
  { text: 'booting vineet.sh ...', status: null },
  { text: 'mounting /experience /projects /research', status: 'ok' },
  { text: 'connecting feed: NASDAQ ITCH 5.0', status: 'ok' },
  { text: 'matching engine online — latency 85ns', status: 'ok' },
  { text: 'render.', status: null },
];

const SESSION_KEY = 'terminal.booted';

export function BootSequence() {
  const reduced = usePrefersReducedMotion();
  const [visible, setVisible] = useState(true);
  const [shown, setShown] = useState(0);
  const [done, setDone] = useState(false);
  const decided = useRef(false);

  useEffect(() => {
    if (decided.current) return;
    decided.current = true;
    let alreadyBooted = false;
    try {
      alreadyBooted = sessionStorage.getItem(SESSION_KEY) === '1';
    } catch {
      /* noop */
    }
    if (alreadyBooted || reduced) {
      setVisible(false);
      return;
    }
    try {
      sessionStorage.setItem(SESSION_KEY, '1');
    } catch {
      /* noop */
    }
    // ~1.1s total — reveal a line every ~190ms.
    const timers: number[] = [];
    LINES.forEach((_, i) => {
      timers.push(window.setTimeout(() => setShown(i + 1), 120 + i * 190));
    });
    timers.push(window.setTimeout(() => setDone(true), 120 + LINES.length * 190 + 120));
    timers.push(window.setTimeout(() => setVisible(false), 120 + LINES.length * 190 + 480));
    return () => timers.forEach((t) => window.clearTimeout(t));
  }, [reduced]);

  const skip = () => {
    setDone(true);
    setVisible(false);
  };

  useEffect(() => {
    if (!visible) return;
    const onKey = () => skip();
    window.addEventListener('keydown', onKey, { once: true });
    return () => window.removeEventListener('keydown', onKey);
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-[200] flex items-center justify-center bg-ink font-mono transition-opacity duration-300 ${done ? 'opacity-0' : 'opacity-100'}`}
      onClick={skip}
      role="status"
      aria-label="Booting terminal"
    >
      <div className="w-full max-w-lg px-6">
        <pre className="text-[12px] leading-relaxed sm:text-[13px]">
          {LINES.slice(0, shown).map((l, i) => (
            <div key={i} className="flex items-baseline justify-between gap-4">
              <span className="text-text">
                <span className="text-amber">{'> '}</span>
                {l.text}
              </span>
              {l.status === 'ok' && <span className="text-bid">[ ok ]</span>}
            </div>
          ))}
          {shown < LINES.length && (
            <span className="inline-block h-3 w-2 translate-y-0.5 bg-amber animate-blink" aria-hidden />
          )}
        </pre>
        <div className="mt-6 text-[10px] uppercase tracking-wider text-text-dim">press any key to skip</div>
      </div>
    </div>
  );
}
