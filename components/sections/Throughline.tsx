'use client';

import { SectionShell, Reveal } from '@/components/ui/primitives';
import { THROUGHLINE, EDUCATION } from '@/lib/content';

export function Throughline() {
  return (
    <SectionShell id="throughline">
      <Reveal>
        <div className="mb-3 flex items-center gap-3 font-mono text-[10px] uppercase tracking-wider text-text-dim">
          <span className="text-amber">01</span>
          <span className="h-px w-8 bg-line" />
          <span>thesis</span>
        </div>
        <p className="max-w-4xl font-display text-2xl font-semibold leading-snug tracking-tight text-text sm:text-4xl sm:leading-snug">
          {THROUGHLINE.split('. ').map((s, i, arr) => (
            <span key={i}>
              {s}
              {i < arr.length - 1 ? '. ' : ''}
            </span>
          ))}
        </p>
      </Reveal>

      <Reveal delay={0.1}>
        <div className="mt-12 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {[
            { k: 'FOCUS', v: 'Low-Latency · Quant · AI' },
            { k: 'BASE', v: 'Columbus, OH' },
            { k: 'STATUS', v: 'JPMorganChase SWE Intern' },
            { k: 'GPA', v: EDUCATION.gpa },
          ].map((c) => (
            <div key={c.k} className="bg-surface px-4 py-4">
              <div className="font-mono text-[9px] uppercase tracking-wider text-text-dim">{c.k}</div>
              <div className="mt-1 font-mono text-[13px] text-text">{c.v}</div>
            </div>
          ))}
        </div>
      </Reveal>

      <Reveal delay={0.15}>
        <div className="mt-px grid gap-px border border-t-0 border-line bg-line lg:grid-cols-[1fr_1.4fr]">
          <div className="bg-surface px-4 py-5">
            <div className="font-mono text-[9px] uppercase tracking-wider text-text-dim">education</div>
            <div className="mt-2 font-sans text-[15px] font-semibold text-text">{EDUCATION.school}</div>
            <div className="font-mono text-[12px] text-text-dim">{EDUCATION.degree}</div>
            <div className="mt-1 font-mono text-[11px] text-amber">{EDUCATION.dates}</div>
            <p className="mt-3 text-[12px] leading-relaxed text-text-dim">{EDUCATION.scholar}</p>
          </div>
          <div className="bg-surface px-4 py-5">
            <div className="font-mono text-[9px] uppercase tracking-wider text-text-dim">relevant coursework</div>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {EDUCATION.coursework.map((c) => (
                <span key={c} className="border border-line bg-ink/40 px-2 py-1 font-mono text-[11px] text-text-dim">
                  {c}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Reveal>
    </SectionShell>
  );
}
