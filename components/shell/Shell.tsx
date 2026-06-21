'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
import { StatusBar } from './StatusBar';
import { CommandPalette } from './CommandPalette';
import { BootSequence } from './BootSequence';
import { MagneticCursor } from './MagneticCursor';
import { usePrefersReducedMotion } from '@/lib/hooks';

export function Shell({ children }: { children: React.ReactNode }) {
  const reduced = usePrefersReducedMotion();

  // Lenis smooth scroll — disabled entirely under reduced-motion.
  useEffect(() => {
    if (reduced) return;
    const lenis = new Lenis({
      duration: 1.05,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, [reduced]);

  return (
    <>
      <BootSequence />
      <StatusBar />
      <MagneticCursor />
      <CommandPalette />
      <main className="pt-7">{children}</main>
      {/* CRT overlays — controlled by [data-theme='crt'] */}
      <div className="crt-scanlines" aria-hidden />
      <div className="crt-vignette" aria-hidden />
    </>
  );
}
