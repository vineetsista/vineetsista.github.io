'use client';

import { SectionShell, SectionHeader, Reveal } from '@/components/ui/primitives';
import { SKILLS } from '@/lib/content';

const GROUPS: { key: string; label: string; items: readonly string[] }[] = [
  { key: 'LANG', label: 'languages', items: SKILLS.LANG },
  { key: 'FRAMEWORKS', label: 'frameworks & libraries', items: SKILLS.FRAMEWORKS },
  { key: 'INFRA', label: 'infrastructure & tools', items: SKILLS.INFRA },
];

export function SystemSpec() {
  return (
    <SectionShell id="spec">
      <SectionHeader
        index="07"
        label="system spec"
        title="Technical Arsenal"
        caption="The datasheet — grouped by subsystem, the way a device spec or risk sheet reads."
      />

      <Reveal>
        <div className="border border-line bg-surface/40 font-mono">
          {/* file header */}
          <div className="flex items-center justify-between border-b border-line px-4 py-2.5 text-[10px] uppercase tracking-wider text-text-dim">
            <span className="text-amber">$ cat system_spec.txt</span>
            <span>vineet@osu · rev a1f9c3e</span>
          </div>

          {GROUPS.map((g, gi) => (
            <div
              key={g.key}
              className={`grid grid-cols-1 gap-x-4 px-4 py-4 sm:grid-cols-[180px_1fr] ${gi < GROUPS.length - 1 ? 'border-b border-line' : ''}`}
            >
              <div className="mb-3 flex items-start gap-2 sm:mb-0">
                <span className="mt-1 inline-block h-2 w-2 shrink-0 bg-amber" aria-hidden />
                <div>
                  <div className="text-[12px] font-bold tracking-wider text-text">{g.key}</div>
                  <div className="text-[9px] uppercase tracking-wider text-text-dim">{g.label}</div>
                  <div className="tnum mt-1 text-[10px] text-text-dim">[{String(g.items.length).padStart(2, '0')}]</div>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {g.items.map((item) => (
                  <span
                    key={item}
                    className="border border-line bg-ink/50 px-2.5 py-1 text-[12px] text-text transition-colors hover:border-amber/60 hover:text-amber"
                    data-magnetic
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}

          <div className="border-t border-line px-4 py-2.5 text-[10px] text-text-dim">
            <span className="text-bid">●</span> all subsystems operational ·{' '}
            <span className="tnum">{SKILLS.LANG.length + SKILLS.FRAMEWORKS.length + SKILLS.INFRA.length}</span> components loaded
          </div>
        </div>
      </Reveal>
    </SectionShell>
  );
}
