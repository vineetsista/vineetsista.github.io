'use client';

import { useState } from 'react';
import { SectionShell, Reveal } from '@/components/ui/primitives';
import { IDENTITY, BUILD_HASH } from '@/lib/content';
import { copyEmail } from '@/lib/nav';

export function Contact() {
  const [copied, setCopied] = useState(false);
  const onCopy = async () => {
    const ok = await copyEmail(IDENTITY.email);
    if (ok) {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    }
  };

  const links = [
    { label: 'EMAIL', value: IDENTITY.email, href: `mailto:${IDENTITY.email}` },
    { label: 'LINKEDIN', value: IDENTITY.linkedinHandle, href: IDENTITY.linkedin },
    { label: 'GITHUB', value: IDENTITY.githubHandle, href: IDENTITY.github },
  ];

  return (
    <SectionShell id="contact" className="pb-24">
      <Reveal>
        <div className="mb-3 flex items-center gap-3 font-mono text-[10px] uppercase tracking-wider text-text-dim">
          <span className="text-amber">09</span>
          <span className="h-px w-8 bg-line" />
          <span>open channel</span>
        </div>
        <h2 className="font-display text-4xl font-bold tracking-tight text-text sm:text-6xl">
          The terminal is <span className="font-serif-accent italic text-amber">open</span>.
        </h2>
        <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-text-dim">
          Building something fast, correct, and real — or hiring someone who cares about the nanoseconds? Let&rsquo;s talk.
        </p>

        <div className="mt-8 grid gap-px border border-line bg-line sm:grid-cols-3">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              target={l.href.startsWith('mailto') ? undefined : '_blank'}
              rel="noopener noreferrer"
              className="group bg-surface px-4 py-5 transition-colors hover:bg-surface-2"
              data-magnetic
            >
              <div className="font-mono text-[9px] uppercase tracking-wider text-text-dim">{l.label}</div>
              <div className="mt-1 break-all font-mono text-[13px] text-text group-hover:text-amber">{l.value} ↗</div>
            </a>
          ))}
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-3">
          <button
            onClick={onCopy}
            className="border border-amber/50 bg-amber/10 px-4 py-2 font-mono text-[12px] text-amber transition-colors hover:bg-amber/20"
            data-magnetic
          >
            {copied ? '✓ copied to clipboard' : 'copy email'}
          </button>
          <span className="font-mono text-[11px] text-text-dim">or press ⌘K → copy email</span>
        </div>

        {/* terminal closer */}
        <div className="mt-12 border-t border-line pt-6 font-mono text-[11px] text-text-dim">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span>
              <span className="text-bid">vineet@osu</span>:<span className="text-cyan">~</span>${' '}
              <span className="animate-blink text-amber">▋</span>
            </span>
            <span className="tnum">
              COLUMBUS·OH · build {BUILD_HASH} · © {new Date().getFullYear()} Vineet Sista
            </span>
          </div>
        </div>
      </Reveal>
    </SectionShell>
  );
}
