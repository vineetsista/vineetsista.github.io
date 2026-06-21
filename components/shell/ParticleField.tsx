'use client';

import { useEffect, useRef } from 'react';
import { usePrefersReducedMotion, useIsCoarsePointer } from '@/lib/hooks';

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

export function ParticleField() {
  const reduced = usePrefersReducedMotion();
  const coarse = useIsCoarsePointer();
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let dpr = 1;
    let nodes: Node[] = [];
    const LINK_DIST = 130;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 1.6);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      // density scales with area; fewer on small/coarse screens
      const base = coarse ? 14000 : 9000;
      const count = Math.min(80, Math.max(22, Math.floor((w * h) / base)));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
      }));
    };

    // read theme accent at draw time (works for dark + CRT)
    const accent = () =>
      getComputedStyle(document.documentElement).getPropertyValue('--amber').trim() || '#ffb000';

    const drawFrame = (animate: boolean) => {
      ctx.clearRect(0, 0, w, h);
      const a = accent();
      for (const n of nodes) {
        if (animate) {
          n.x += n.vx;
          n.y += n.vy;
          if (n.x < 0 || n.x > w) n.vx *= -1;
          if (n.y < 0 || n.y > h) n.vy *= -1;
        }
      }
      // links
      for (let i = 0; i < nodes.length; i += 1) {
        for (let j = i + 1; j < nodes.length; j += 1) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.hypot(dx, dy);
          if (dist < LINK_DIST) {
            const o = (1 - dist / LINK_DIST) * 0.14;
            ctx.strokeStyle = `rgba(126,140,160,${o})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }
      // nodes
      for (let i = 0; i < nodes.length; i += 1) {
        const n = nodes[i];
        const hot = i % 7 === 0;
        ctx.fillStyle = hot ? `${a}` : 'rgba(126,140,160,0.5)';
        ctx.globalAlpha = hot ? 0.5 : 0.35;
        ctx.beginPath();
        ctx.arc(n.x, n.y, hot ? 1.6 : 1.1, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };

    resize();

    if (reduced) {
      drawFrame(false);
      const onResizeStatic = () => {
        resize();
        drawFrame(false);
      };
      window.addEventListener('resize', onResizeStatic);
      return () => window.removeEventListener('resize', onResizeStatic);
    }

    let raf = 0;
    let last = 0;
    const loop = (t: number) => {
      // ~36fps cap — plenty for ambient drift, lighter on the CPU
      if (t - last >= 28) {
        drawFrame(true);
        last = t;
      }
      raf = requestAnimationFrame(loop);
    };
    const start = () => {
      if (!raf) raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
    };
    const onVis = () => (document.hidden ? stop() : start());

    window.addEventListener('resize', resize);
    document.addEventListener('visibilitychange', onVis);
    start();

    return () => {
      stop();
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', onVis);
    };
  }, [reduced, coarse]);

  return (
    <canvas
      ref={ref}
      className="pointer-events-none fixed inset-0 z-0 opacity-70"
      aria-hidden
    />
  );
}
