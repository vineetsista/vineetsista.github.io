'use client';

import { useEffect, useRef, useState } from 'react';
import { SectionShell, SectionHeader, Reveal, Tag } from '@/components/ui/primitives';
import { INFERENCE } from '@/lib/content';
import { useCountUp, usePrefersReducedMotion } from '@/lib/hooks';
import { openExternal } from '@/lib/nav';

const TOTAL = INFERENCE.completion.length;
const KV_BLOCKS = 48;
const LANES = 4;

function useStream() {
  const reduced = usePrefersReducedMotion();
  const [shown, setShown] = useState(reduced ? TOTAL : 0);
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    if (reduced) return;
    let holding = 0;
    const id = window.setInterval(() => {
      setFrame((f) => f + 1);
      setShown((s) => {
        if (s >= TOTAL) {
          holding += 1;
          if (holding > 14) {
            holding = 0;
            return 0;
          }
          return s;
        }
        return s + 1;
      });
    }, 75);
    return () => window.clearInterval(id);
  }, [reduced]);

  return { shown, frame, reduced };
}

export function Inference() {
  const { shown, frame, reduced } = useStream();
  const tps = useCountUp(INFERENCE.tokensPerSec, 0, 1400);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [shown]);

  const text = INFERENCE.completion.slice(0, shown).join('');
  const activeKv = reduced ? Math.floor(KV_BLOCKS * 0.55) : Math.floor((shown / TOTAL) * KV_BLOCKS);

  return (
    <SectionShell id="inference">
      <SectionHeader
        index="05"
        label="ml systems · inference"
        title="miniVLLM"
        caption="The second flagship — a from-scratch, high-performance LLM inference engine. Systems engineering all the way down to the GPU: paged KV cache, continuous batching, speculative decoding, a custom Triton kernel, and an OpenAI-compatible streaming server."
      />

      <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        {/* streaming generation */}
        <Reveal>
          <div className="flex h-full flex-col border border-line bg-ink/70 font-mono">
            <div className="flex items-center justify-between border-b border-line px-3 py-2">
              <span className="flex items-center gap-2 text-[10px] uppercase tracking-wider text-text-dim">
                <span className="inline-block h-1.5 w-1.5 animate-pulse-glow rounded-full bg-cyan" />
                POST /v1/completions · streaming
              </span>
              <span className="tnum text-[10px] text-cyan">{shown}/{TOTAL} tok</span>
            </div>
            <div ref={scrollRef} className="h-56 overflow-y-auto px-3 py-3 text-[12.5px] leading-relaxed">
              <div className="text-text-dim">
                <span className="text-cyan">prompt</span> ▸ <span className="text-text">{INFERENCE.prompt}</span>
              </div>
              <pre className="mt-1 whitespace-pre-wrap break-words text-bid">
                {text}
                {!reduced && <span className="ml-0.5 inline-block h-3.5 w-2 translate-y-0.5 animate-blink bg-cyan align-middle" />}
              </pre>
            </div>
            <div className="grid grid-cols-2 gap-px border-t border-line bg-line">
              <div className="bg-ink px-3 py-2.5">
                <div className="text-[8px] uppercase tracking-wider text-text-dim">throughput</div>
                <div className="tnum mt-0.5 text-[15px] font-semibold text-cyan">
                  {Math.round(tps.val).toLocaleString()}
                  <span className="ml-1 text-[10px] text-text-dim">tok/s</span>
                </div>
              </div>
              <div ref={tps.ref as React.RefObject<HTMLDivElement>} className="bg-ink px-3 py-2.5">
                <div className="text-[8px] uppercase tracking-wider text-text-dim">ttft</div>
                <div className="tnum mt-0.5 text-[15px] font-semibold text-text">
                  19<span className="ml-1 text-[10px] text-text-dim">ms</span>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* systems viz */}
        <Reveal delay={0.1}>
          <div className="flex h-full flex-col gap-3">
            {/* paged KV cache */}
            <div className="border border-line bg-surface/40 p-4">
              <div className="mb-2 flex items-center justify-between font-mono text-[9px] uppercase tracking-wider text-text-dim">
                <span>paged kv-cache</span>
                <span className="tnum text-cyan">{activeKv}/{KV_BLOCKS} pages</span>
              </div>
              <div className="grid grid-cols-12 gap-1">
                {Array.from({ length: KV_BLOCKS }).map((_, i) => {
                  const active = i < activeKv;
                  const edge = active && i >= activeKv - 2;
                  return (
                    <div
                      key={i}
                      className="aspect-square transition-colors duration-200"
                      style={{
                        background: active ? (edge ? 'var(--cyan)' : 'color-mix(in srgb, var(--cyan) 45%, transparent)') : 'var(--surface-2)',
                        border: '1px solid var(--line)',
                      }}
                    />
                  );
                })}
              </div>
            </div>

            {/* continuous batching lanes */}
            <div className="border border-line bg-surface/40 p-4">
              <div className="mb-2 font-mono text-[9px] uppercase tracking-wider text-text-dim">continuous batching</div>
              <div className="space-y-2">
                {Array.from({ length: LANES }).map((_, lane) => {
                  const speed = 0.6 + lane * 0.25;
                  const width = 18 + (lane % 3) * 10;
                  const pos = reduced ? (lane * 23) % 80 : (frame * speed + lane * 30) % (100 + width);
                  const x = pos - width;
                  return (
                    <div key={lane} className="relative h-3 overflow-hidden bg-ink/60">
                      <div
                        className="absolute top-0 h-full"
                        style={{
                          left: `${x}%`,
                          width: `${width}%`,
                          background: `color-mix(in srgb, var(--amber) ${50 + lane * 12}%, var(--bid))`,
                          opacity: 0.8,
                        }}
                      />
                      <span className="absolute left-1 top-1/2 -translate-y-1/2 font-mono text-[7px] text-text-dim">req {lane + 1}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* specs */}
            <div className="grid grid-cols-2 gap-px border border-line bg-line sm:grid-cols-4">
              {INFERENCE.specs.map((s) => (
                <div key={s.k} className="bg-surface px-3 py-2.5">
                  <div className="font-mono text-[8px] uppercase tracking-wider text-text-dim">{s.k}</div>
                  <div className="tnum mt-0.5 font-mono text-[12px] text-cyan">{s.v}</div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex flex-wrap gap-1.5">
                {['Python', 'PyTorch', 'Triton', 'CUDA'].map((t) => (
                  <Tag key={t}>{t}</Tag>
                ))}
              </div>
              <button
                onClick={() => openExternal(INFERENCE.repo)}
                className="font-mono text-[11px] text-cyan link-underline"
                data-magnetic
              >
                view source ↗
              </button>
            </div>
          </div>
        </Reveal>
      </div>
    </SectionShell>
  );
}
