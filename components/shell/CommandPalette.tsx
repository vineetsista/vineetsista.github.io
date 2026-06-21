'use client';

import { Command } from 'cmdk';
import { useEffect, useState } from 'react';
import { useTerminal } from './ThemeProvider';
import { IDENTITY, PROJECTS, SECTIONS } from '@/lib/content';
import { copyEmail, openExternal, scrollToSection } from '@/lib/nav';
import { blipExec } from '@/lib/sound';

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const { setTheme, theme, toggleSound, sound, toggleHud } = useTerminal();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const run = (fn: () => void) => {
    if (sound) blipExec();
    fn();
    setOpen(false);
  };

  return (
    <Command.Dialog
      open={open}
      onOpenChange={setOpen}
      label="Command palette"
      shouldFilter
    >
      <Command.Input placeholder="Type a command or search…  ( ⌘K )" />
      <Command.List>
        <Command.Empty>No results — try &ldquo;projects&rdquo; or &ldquo;theme&rdquo;.</Command.Empty>

        <Command.Group heading="Navigate">
          {SECTIONS.map((s) => (
            <Command.Item key={s.id} value={`go ${s.label} ${s.id}`} onSelect={() => run(() => scrollToSection(s.id))}>
              <span className="text-text-dim">cd</span> /{s.label}
            </Command.Item>
          ))}
        </Command.Group>

        <Command.Group heading="Instruments">
          {PROJECTS.map((p) => (
            <Command.Item
              key={p.ticker}
              value={`open ${p.ticker} ${p.name}`}
              onSelect={() =>
                run(() => {
                  if (p.live) openExternal(p.live);
                  else if (p.repo) openExternal(p.repo);
                  else scrollToSection('instruments');
                })
              }
            >
              <span className="w-12 text-amber">{p.ticker}</span> {p.name}
            </Command.Item>
          ))}
        </Command.Group>

        <Command.Group heading="System">
          <Command.Item value="theme crt amber" onSelect={() => run(() => setTheme('crt'))}>
            theme amber — {theme === 'crt' ? 'active' : 'CRT phosphor mode'}
          </Command.Item>
          <Command.Item value="theme dark" onSelect={() => run(() => setTheme('dark'))}>
            theme dark — {theme === 'dark' ? 'active' : 'modern dark mode'}
          </Command.Item>
          <Command.Item value="sound toggle audio" onSelect={() => run(toggleSound)}>
            sound — {sound ? 'on' : 'off'}
          </Command.Item>
          <Command.Item value="hud fps performance" onSelect={() => run(toggleHud)}>
            toggle perf HUD
          </Command.Item>
        </Command.Group>

        <Command.Group heading="Contact">
          <Command.Item value="copy email" onSelect={() => run(() => copyEmail(IDENTITY.email))}>
            copy email — {IDENTITY.email}
          </Command.Item>
          <Command.Item value="github" onSelect={() => run(() => openExternal(IDENTITY.github))}>
            open GitHub
          </Command.Item>
          <Command.Item value="linkedin" onSelect={() => run(() => openExternal(IDENTITY.linkedin))}>
            open LinkedIn
          </Command.Item>
        </Command.Group>
      </Command.List>
    </Command.Dialog>
  );
}
