'use client';

import { createContext, useCallback, useContext, useEffect, useState } from 'react';

export type Theme = 'dark' | 'crt';

interface TerminalCtx {
  theme: Theme;
  setTheme: (t: Theme) => void;
  toggleTheme: () => void;
  sound: boolean;
  toggleSound: () => void;
  hud: boolean;
  toggleHud: () => void;
}

const Ctx = createContext<TerminalCtx | null>(null);

const STORE_KEY = 'terminal.theme';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('dark');
  const [sound, setSound] = useState(false);
  const [hud, setHud] = useState(false);

  // Hydrate from localStorage.
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORE_KEY) as Theme | null;
      if (saved === 'crt' || saved === 'dark') setThemeState(saved);
    } catch {
      /* sandbox — fall back to state */
    }
  }, []);

  // Apply to <html> and persist.
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-theme', theme);
    if (theme === 'crt') {
      root.classList.add('crt-boot');
      const t = window.setTimeout(() => root.classList.remove('crt-boot'), 950);
      try {
        localStorage.setItem(STORE_KEY, theme);
      } catch {
        /* noop */
      }
      return () => window.clearTimeout(t);
    }
    try {
      localStorage.setItem(STORE_KEY, theme);
    } catch {
      /* noop */
    }
  }, [theme]);

  const setTheme = useCallback((t: Theme) => setThemeState(t), []);
  const toggleTheme = useCallback(
    () => setThemeState((p) => (p === 'crt' ? 'dark' : 'crt')),
    [],
  );
  const toggleSound = useCallback(() => setSound((p) => !p), []);
  const toggleHud = useCallback(() => setHud((p) => !p), []);

  return (
    <Ctx.Provider value={{ theme, setTheme, toggleTheme, sound, toggleSound, hud, toggleHud }}>
      {children}
    </Ctx.Provider>
  );
}

export function useTerminal(): TerminalCtx {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useTerminal must be used within ThemeProvider');
  return ctx;
}
