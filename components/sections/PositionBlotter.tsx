'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { SectionShell, SectionHeader, Reveal } from '@/components/ui/primitives';
import { ROLES, type Role } from '@/lib/content';
import { usePrefersReducedMotion } from '@/lib/hooks';

function BlotterRow({ role, open, onToggle }: { role: Role; open: boolean; onToggle: () => void }) {
  const reduced = usePrefersReducedMotion();
  const hasDetail = role.bullets.length > 0;
  return (
    <div className="border-b border-line last:border-b-0">
      <button
        onClick={onToggle}
        disabled={!hasDetail}
        className={`group grid w-full grid-cols-[auto_1fr] items-center gap-x-3 gap-y-1 px-3 py-3 text-left transition-colors hover:bg-surface-2/60 sm:grid-cols-[140px_1fr_180px_120px] ${hasDetail ? 'cursor-pointer' : 'cursor-default'}`}
        aria-expanded={open}
      >
        {/* date */}
        <span className="flex items-center gap-2 font-mono text-[11px] text-text-dim">
          <span
            className="inline-block h-1.5 w-1.5 rounded-full"
            style={{
              background: role.active ? 'var(--bid)' : 'var(--text-dim)',
              boxShadow: role.active ? '0 0 6px var(--bid)' : 'none',
            }}
            aria-hidden
          />
          <span className="tnum">{role.dates}</span>
        </span>
        {/* role + org */}
        <span className="min-w-0">
          <span className="block truncate font-sans text-[14px] font-medium text-text group-hover:text-amber sm:text-[15px]">
            {role.role}
          </span>
          <span className="block truncate font-mono text-[11px] text-text-dim sm:hidden">{role.org}</span>
        </span>
        {/* org (desktop) */}
        <span className="hidden truncate font-mono text-[12px] text-text-dim sm:block">{role.org}</span>
        {/* location + expand */}
        <span className="hidden items-center justify-end gap-2 font-mono text-[11px] text-text-dim sm:flex">
          {role.active && <span className="text-[9px] uppercase tracking-wider text-bid">active</span>}
          {role.location}
          {hasDetail && (
            <span className="text-amber transition-transform" style={{ transform: open ? 'rotate(90deg)' : 'none' }}>
              ›
            </span>
          )}
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && hasDetail && (
          <motion.div
            initial={reduced ? false : { height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={reduced ? undefined : { height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <ul className="space-y-2 border-l border-amber/40 px-3 pb-4 pl-5 sm:ml-[140px]">
              {role.bullets.map((b, i) => (
                <li key={i} className="flex gap-2 text-[13px] leading-relaxed text-text-dim">
                  <span className="mt-1.5 h-1 w-1 shrink-0 bg-amber" aria-hidden />
                  {b}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function PositionBlotter() {
  const [open, setOpen] = useState<string | null>(ROLES[1]?.id ?? null);

  return (
    <SectionShell id="blotter">
      <SectionHeader
        index="02"
        label="position blotter"
        title="Experience"
        caption="Eight positions, newest first — a trade history of where the work has been. Rows with detail expand."
      />
      <Reveal>
        <div className="border border-line bg-surface/40">
          <div className="hidden grid-cols-[140px_1fr_180px_120px] gap-x-3 border-b border-line px-3 py-2 font-mono text-[9px] uppercase tracking-wider text-text-dim sm:grid">
            <span>date range</span>
            <span>role</span>
            <span>org</span>
            <span className="text-right">location</span>
          </div>
          {ROLES.map((r) => (
            <BlotterRow key={r.id} role={r} open={open === r.id} onToggle={() => setOpen(open === r.id ? null : r.id)} />
          ))}
        </div>
      </Reveal>
    </SectionShell>
  );
}
