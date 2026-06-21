import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: 'var(--ink)',
        surface: 'var(--surface)',
        'surface-2': 'var(--surface-2)',
        line: 'var(--line)',
        text: 'var(--text)',
        'text-dim': 'var(--text-dim)',
        bid: 'var(--bid)',
        ask: 'var(--ask)',
        amber: 'var(--amber)',
        cyan: 'var(--cyan)',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
        display: ['var(--font-display)', 'var(--font-sans)', 'sans-serif'],
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
      },
      borderRadius: {
        none: '0',
        sm: '2px',
        DEFAULT: '3px',
      },
      letterSpacing: {
        tight: '-0.01em',
        wide: '0.08em',
        wider: '0.16em',
      },
      keyframes: {
        flicker: {
          '0%,100%': { opacity: '1' },
          '92%': { opacity: '1' },
          '94%': { opacity: '0.82' },
          '96%': { opacity: '1' },
          '98%': { opacity: '0.92' },
        },
        blink: {
          '0%,49%': { opacity: '1' },
          '50%,100%': { opacity: '0' },
        },
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(12px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
        'marquee-rev': {
          from: { transform: 'translateX(-50%)' },
          to: { transform: 'translateX(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '200% center' },
          '100%': { backgroundPosition: '-200% center' },
        },
        float: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'pulse-glow': {
          '0%,100%': { opacity: '0.5' },
          '50%': { opacity: '1' },
        },
      },
      animation: {
        blink: 'blink 1s steps(1) infinite',
        'fade-up': 'fade-up 0.5s ease-out both',
        marquee: 'marquee 40s linear infinite',
        'marquee-rev': 'marquee-rev 40s linear infinite',
        shimmer: 'shimmer 6s linear infinite',
        float: 'float 7s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

export default config;
