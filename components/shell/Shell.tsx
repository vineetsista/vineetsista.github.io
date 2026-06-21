'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { StatusBar } from './StatusBar';
import { CommandPalette } from './CommandPalette';
import { BootSequence } from './BootSequence';
import { MagneticCursor } from './MagneticCursor';
import { ScrollProgress } from './ScrollProgress';
import { ParticleField } from './ParticleField';
import { usePrefersReducedMotion } from '@/lib/hooks';

export function Shell({ children }: { children: React.ReactNode }) {
  const reduced = usePrefersReducedMotion();

  // Lenis smooth scroll + GSAP ScrollTrigger — disabled under reduced-motion.
  useEffect(() => {
    if (reduced) return;
    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      duration: 1.05,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    // Drive ScrollTrigger from Lenis so scrub effects stay in sync.
    lenis.on('scroll', ScrollTrigger.update);
    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    // Scrub-driven parallax on any [data-parallax] element.
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('[data-parallax]').forEach((el) => {
        const speed = parseFloat(el.dataset.parallax || '0.2');
        gsap.fromTo(
          el,
          { yPercent: -speed * 50 },
          {
            yPercent: speed * 50,
            ease: 'none',
            scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true },
          },
        );
      });
    });

    const refresh = window.setTimeout(() => ScrollTrigger.refresh(), 300);

    return () => {
      window.clearTimeout(refresh);
      cancelAnimationFrame(raf);
      ctx.revert();
      lenis.destroy();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [reduced]);

  return (
    <>
      <ParticleField />
      <BootSequence />
      <StatusBar />
      <ScrollProgress />
      <MagneticCursor />
      <CommandPalette />
      <main className="relative z-10 pt-7">{children}</main>
      {/* texture + CRT overlays */}
      <div className="grain" aria-hidden />
      <div className="crt-scanlines" aria-hidden />
      <div className="crt-vignette" aria-hidden />
    </>
  );
}
