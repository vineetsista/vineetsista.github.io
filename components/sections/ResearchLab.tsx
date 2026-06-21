'use client';

import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';
import { SectionShell, SectionHeader, Reveal } from '@/components/ui/primitives';
import { StaticProjection } from './research/StaticProjection';
import { usePrefersReducedMotion } from '@/lib/hooks';

// Lazy-load the WebGL cloud — never blocks first paint.
const PointCloud = dynamic(() => import('./research/PointCloud'), {
  ssr: false,
  loading: () => (
    <div className="flex h-full items-center justify-center font-mono text-[11px] text-text-dim">
      loading latent space…
    </div>
  ),
});

const METRICS = [
  { k: 'NOTES', v: '260K+', d: 'de-identified patient notes processed (Regex + PyTorch)' },
  { k: 'ACTIVATIONS', v: '5,000+', d: 'sparse-autoencoder activations trained' },
  { k: 'PIPELINE', v: 'NER', d: 'clinical entity extraction from raw notes' },
  { k: 'VIZ', v: 'UMAP', d: 'latent-space clustering of urgent-care conditions' },
];

export function ResearchLab() {
  const reduced = usePrefersReducedMotion();
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Only mount the heavy canvas once the section is near the viewport.
  useEffect(() => {
    if (reduced) return;
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { rootMargin: '200px' },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [reduced]);

  return (
    <SectionShell id="research">
      <SectionHeader
        index="06"
        label="research lab"
        title="Explainable Medicine & Clinical ML"
        caption="At OSU's BMBL and AIMed labs — probing how language models make clinical decisions, and mapping where urgent-care conditions cluster in latent space."
      />

      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <Reveal>
          <div
            ref={ref}
            className="relative aspect-[4/3] w-full overflow-hidden border border-line bg-ink/60"
          >
            <div className="bg-grid pointer-events-none absolute inset-0 opacity-20" aria-hidden />
            {reduced ? (
              <StaticProjection />
            ) : inView ? (
              <PointCloud />
            ) : (
              <div className="flex h-full items-center justify-center font-mono text-[11px] text-text-dim">
                initializing webgl…
              </div>
            )}
            <div className="pointer-events-none absolute bottom-2 left-2 font-mono text-[9px] uppercase tracking-wider text-text-dim">
              {reduced ? 'static projection' : 'drag to orbit · scroll to zoom'}
            </div>
            <div className="pointer-events-none absolute right-2 top-2 font-mono text-[9px] uppercase tracking-wider text-amber">
              sparse autoencoder · latent space
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="flex flex-col gap-3">
            <div className="grid grid-cols-2 gap-px border border-line bg-line">
              {METRICS.map((m) => (
                <div key={m.k} className="bg-surface px-3 py-4">
                  <div className="tnum font-sans text-2xl font-bold text-amber">{m.v}</div>
                  <div className="mt-0.5 font-mono text-[9px] uppercase tracking-wider text-text-dim">{m.k}</div>
                  <div className="mt-1.5 font-mono text-[10.5px] leading-snug text-text-dim">{m.d}</div>
                </div>
              ))}
            </div>
            <div className="border border-line bg-surface/40 px-4 py-4">
              <p className="text-[13px] leading-relaxed text-text-dim">
                Built an <span className="text-text">explainable-medicine workflow</span> generating heatmaps by probing
                LLMs with targeted token removals — surfacing the features most predictive of clinical decision-making and
                reducing hallucinations. Trained a sparse autoencoder and used UMAP to visualize how urgent-care conditions
                cluster in latent space.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </SectionShell>
  );
}
