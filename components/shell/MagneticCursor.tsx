'use client';

import { useEffect, useRef } from 'react';
import { usePrefersReducedMotion, useIsCoarsePointer } from '@/lib/hooks';

export function MagneticCursor() {
  const reduced = usePrefersReducedMotion();
  const coarse = useIsCoarsePointer();
  const reticle = useRef<HTMLDivElement>(null);
  const dot = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduced || coarse) return;
    const r = reticle.current;
    const d = dot.current;
    if (!r || !d) return;

    let rx = -100;
    let ry = -100;
    let tx = -100;
    let ty = -100;
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      d.style.transform = `translate(${tx}px, ${ty}px)`;
      const target = e.target as HTMLElement;
      const interactive = target.closest('a, button, [role="button"], input, [data-magnetic]');
      r.style.width = interactive ? '40px' : '26px';
      r.style.height = interactive ? '40px' : '26px';
      r.style.opacity = '1';
    };

    const loop = () => {
      rx += (tx - rx) * 0.18;
      ry += (ty - ry) * 0.18;
      r.style.transform = `translate(${rx}px, ${ry}px)`;
      raf = requestAnimationFrame(loop);
    };

    const onLeave = () => {
      r.style.opacity = '0';
    };

    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerleave', onLeave);
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerleave', onLeave);
      cancelAnimationFrame(raf);
    };
  }, [reduced, coarse]);

  if (reduced || coarse) return null;

  return (
    <>
      <div ref={reticle} className="cursor-reticle" style={{ opacity: 0 }} aria-hidden />
      <div ref={dot} className="cursor-dot" aria-hidden />
    </>
  );
}
