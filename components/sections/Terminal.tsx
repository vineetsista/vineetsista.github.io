'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { SectionShell, SectionHeader, Reveal } from '@/components/ui/primitives';
import { IDENTITY, PROJECTS, SECTIONS, EDUCATION } from '@/lib/content';
import { findProject, openExternal, resolveSectionId, scrollToSection } from '@/lib/nav';
import { useTerminal } from '@/components/shell/ThemeProvider';
import { blipExec } from '@/lib/sound';

interface Line {
  kind: 'in' | 'out' | 'err' | 'amber';
  text: string;
}

const COMMANDS = ['help', 'whoami', 'ls', 'cat', 'cd', 'open', 'theme', 'latency', 'contact', 'clear', 'sudo', 'banner'];

const BANNER = [
  ' __   _____ _   _ _____ _____ _____ ',
  ' \\ \\ / /_ _| \\ | | ____| ____|_   _|',
  "  \\ V / | ||  \\| |  _| |  _|   | |  ",
  '   | |  | || |\\  | |___| |___  | |  ',
  '   |_| |___|_| \\_|_____|_____| |_|  ',
];

export function Terminal() {
  const { setTheme, sound } = useTerminal();
  const soundRef = useRef(false);
  soundRef.current = sound;

  const [lines, setLines] = useState<Line[]>([
    { kind: 'amber', text: 'vineet.sh — interactive shell · type `help` for commands' },
  ]);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [lines]);

  const print = (newLines: Line[]) => setLines((p) => [...p, ...newLines]);

  const run = (raw: string) => {
    const cmd = raw.trim();
    if (soundRef.current) blipExec();
    print([{ kind: 'in', text: cmd }]);
    if (!cmd) return;
    setHistory((h) => [...h, cmd]);
    setHistIdx(-1);

    const [name, ...args] = cmd.toLowerCase().split(/\s+/);
    const arg = args.join(' ');

    switch (name) {
      case 'help':
        print([
          { kind: 'out', text: 'AVAILABLE COMMANDS' },
          { kind: 'out', text: '  help              this list' },
          { kind: 'out', text: '  whoami            short bio' },
          { kind: 'out', text: '  ls [projects]     list sections / projects' },
          { kind: 'out', text: '  cat resume        concise resume summary' },
          { kind: 'out', text: '  cd <section>      scroll to a section' },
          { kind: 'out', text: '  open <project>    open a repo / demo' },
          { kind: 'out', text: '  theme amber|dark  toggle CRT phosphor mode' },
          { kind: 'out', text: '  latency           page interaction latency' },
          { kind: 'out', text: '  contact           email / linkedin / github' },
          { kind: 'out', text: '  clear             clear the terminal' },
        ]);
        break;
      case 'whoami':
        print([
          { kind: 'amber', text: IDENTITY.name },
          { kind: 'out', text: IDENTITY.positioning },
          { kind: 'out', text: 'CS Honors @ Ohio State · JPMorganChase SWE Intern · aspiring quant developer.' },
        ]);
        break;
      case 'ls':
        if (arg === 'projects') {
          print(PROJECTS.map((p) => ({ kind: 'out' as const, text: `  ${p.ticker.padEnd(7)} ${p.name}` })));
        } else {
          print([
            { kind: 'out', text: SECTIONS.map((s) => s.label).join('   ') },
            { kind: 'out', text: 'tip: `ls projects` to list instruments' },
          ]);
        }
        break;
      case 'cat':
        if (arg === 'resume' || arg === 'resume.txt') {
          print([
            { kind: 'amber', text: `${IDENTITY.name} — Resume` },
            { kind: 'out', text: `${EDUCATION.school} · ${EDUCATION.degree} · ${EDUCATION.dates}` },
            { kind: 'out', text: `GPA ${EDUCATION.gpa} · Engineering Scholar (1 of 96)` },
            { kind: 'out', text: 'Now: JPMorganChase SWE Intern · AWS Cloud Club Technical Lead' },
            { kind: 'out', text: 'Research: BMBL + AIMed (explainable medicine, clinical ML)' },
            { kind: 'out', text: 'Flagship: C++ limit order book matching engine (NASDAQ ITCH 5.0)' },
            { kind: 'amber', text: `→ reach out: ${IDENTITY.email}` },
          ]);
        } else {
          print([{ kind: 'err', text: `cat: ${arg || '?'}: no such file. try \`cat resume\`` }]);
        }
        break;
      case 'cd': {
        const id = resolveSectionId(arg);
        if (id) {
          print([{ kind: 'out', text: `→ /${arg}` }]);
          scrollToSection(id);
        } else {
          print([{ kind: 'err', text: `cd: ${arg || '?'}: no such section. try: ${SECTIONS.map((s) => s.label).join(', ')}` }]);
        }
        break;
      }
      case 'open': {
        const p = findProject(arg);
        if (p && (p.live || p.repo)) {
          const url = p.live || p.repo!;
          print([{ kind: 'out', text: `opening ${p.name} → ${url}` }]);
          openExternal(url);
        } else if (p) {
          print([{ kind: 'err', text: `open: ${p.name} has no public link (it's ${p.building ? 'in active development' : 'private'})` }]);
        } else {
          print([{ kind: 'err', text: `open: ${arg || '?'}: unknown project. try \`ls projects\`` }]);
        }
        break;
      }
      case 'theme':
        if (arg === 'amber' || arg === 'crt') {
          setTheme('crt');
          print([{ kind: 'amber', text: 'theme → amber phosphor (CRT). welcome to 1987.' }]);
        } else if (arg === 'dark') {
          setTheme('dark');
          print([{ kind: 'out', text: 'theme → modern dark.' }]);
        } else {
          print([{ kind: 'err', text: 'usage: theme amber | theme dark' }]);
        }
        break;
      case 'latency': {
        const t0 = performance.now();
        requestAnimationFrame(() =>
          requestAnimationFrame(() => {
            const dt = performance.now() - t0;
            print([
              { kind: 'out', text: `interaction latency: ${dt.toFixed(2)} ms (paint round-trip)` },
              { kind: 'out', text: 'engine match latency: ~85 ns (microbenchmarked)' },
            ]);
          }),
        );
        break;
      }
      case 'contact':
        print([
          { kind: 'out', text: `email     ${IDENTITY.email}` },
          { kind: 'out', text: `linkedin  ${IDENTITY.linkedinHandle}` },
          { kind: 'out', text: `github    ${IDENTITY.githubHandle}` },
          { kind: 'amber', text: 'tip: `open contact` or run `cd contact`' },
        ]);
        break;
      case 'clear':
        setLines([]);
        return;
      case 'banner':
        print(BANNER.map((b) => ({ kind: 'amber' as const, text: b })));
        break;
      case 'sudo':
        if (arg.includes('hire')) {
          print([
            { kind: 'amber', text: '[sudo] authenticating intent... ✓' },
            { kind: 'out', text: 'permission granted. excellent decision.' },
            { kind: 'amber', text: `→ ${IDENTITY.email} · ${IDENTITY.linkedinHandle}` },
          ]);
        } else {
          print([{ kind: 'err', text: `${IDENTITY.name.split(' ')[0].toLowerCase()} is not in the sudoers file. this incident will be reported. 😏` }]);
        }
        break;
      case 'rm':
        print([{ kind: 'err', text: "nice try. this terminal is read-only — like a well-tuned matching engine." }]);
        break;
      default:
        print([{ kind: 'err', text: `command not found: ${name}. type \`help\`.` }]);
    }
  };

  const onKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      run(input);
      setInput('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (!history.length) return;
      const idx = histIdx < 0 ? history.length - 1 : Math.max(0, histIdx - 1);
      setHistIdx(idx);
      setInput(history[idx]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (histIdx < 0) return;
      const idx = histIdx + 1;
      if (idx >= history.length) {
        setHistIdx(-1);
        setInput('');
      } else {
        setHistIdx(idx);
        setInput(history[idx]);
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const parts = input.split(/\s+/);
      if (parts.length === 1) {
        const match = COMMANDS.find((c) => c.startsWith(parts[0].toLowerCase()));
        if (match) setInput(match + ' ');
      } else if (parts[0].toLowerCase() === 'open') {
        const match = PROJECTS.find((p) => p.ticker.toLowerCase().startsWith(parts[1]?.toLowerCase() ?? ''));
        if (match) setInput(`open ${match.ticker}`);
      } else if (parts[0].toLowerCase() === 'cd') {
        const match = SECTIONS.find((s) => s.label.startsWith(parts[1]?.toLowerCase() ?? ''));
        if (match) setInput(`cd ${match.label}`);
      }
    }
  };

  const color = useMemo(
    () => ({ in: 'var(--text)', out: 'var(--text-dim)', err: 'var(--ask)', amber: 'var(--amber)' }),
    [],
  );

  return (
    <SectionShell id="terminal">
      <SectionHeader
        index="07"
        label="interactive · cli"
        title="Terminal"
        caption="A real shell. Type a command — `help` to start. Arrow keys for history, Tab to complete."
      />
      <Reveal>
        <div
          className="border border-line bg-ink/80 font-mono"
          onClick={() => inputRef.current?.focus()}
        >
          <div className="flex items-center gap-2 border-b border-line px-3 py-2">
            <span className="flex gap-1.5" aria-hidden>
              <span className="h-2.5 w-2.5 rounded-full" style={{ background: 'var(--ask)' }} />
              <span className="h-2.5 w-2.5 rounded-full" style={{ background: 'var(--amber)' }} />
              <span className="h-2.5 w-2.5 rounded-full" style={{ background: 'var(--bid)' }} />
            </span>
            <span className="text-[10px] uppercase tracking-wider text-text-dim">vineet@terminal — bash</span>
          </div>

          <div ref={scrollRef} className="h-72 overflow-y-auto px-3 py-3 text-[12.5px] leading-relaxed sm:h-80">
            {lines.map((l, i) => (
              <div key={i} className="whitespace-pre-wrap break-words" style={{ color: color[l.kind] }}>
                {l.kind === 'in' ? <span><span className="text-bid">vineet@osu</span>:<span className="text-cyan">~</span>$ {l.text}</span> : l.text}
              </div>
            ))}
            <div className="flex items-center">
              <span className="text-bid">vineet@osu</span>
              <span className="text-text-dim">:</span>
              <span className="text-cyan">~</span>
              <span className="text-text-dim">$&nbsp;</span>
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={onKey}
                className="flex-1 bg-transparent text-text outline-none"
                spellCheck={false}
                autoComplete="off"
                autoCapitalize="off"
                aria-label="Terminal command input"
              />
            </div>
          </div>
        </div>
      </Reveal>
    </SectionShell>
  );
}
