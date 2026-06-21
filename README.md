# VINEET SISTA // TERMINAL

A personal portfolio rendered as a low-latency trading terminal — because that's the
world the work lives in. The career renders as a position blotter, projects as tradable
instruments, skills as a system spec sheet, and the hero is a live, breathing limit
order book modeled on a C++ matching engine.

**Live:** https://vineetsista.github.io

## Highlights

- **Live order book hero** — a client-side market-data simulator (GBM mid + Poisson
  order flow + market orders) with bid/ask ladders, spread, and a cumulative depth chart.
- **⌘K command palette** ([cmdk](https://cmdk.paco.me/)) — Bloomberg-style keyboard-first
  navigation.
- **Interactive CLI** — a real shell: `help`, `whoami`, `ls projects`, `cat resume`,
  `cd <section>`, `open <project>`, `theme amber|dark`, `latency`, `contact`, plus
  history (↑/↓) and tab-completion.
- **CRT amber-phosphor theme** — a toggleable vintage terminal mode (scanlines, phosphor
  glow), reachable from ⌘K or the status bar.
- **Persistent status bar** — live ET clock, real NYSE market status (weekends/holidays
  computed), interaction latency, FPS, location, and build hash.
- **WebGL research lab** — a React Three Fiber point cloud evoking the UMAP latent space
  of the clinical-ML work, with a static 2D fallback under reduced-motion.

## Engineering

- **Next.js 14** (App Router) · **TypeScript strict** · static export (`output: 'export'`).
- **Tailwind CSS** with the design tokens wired as CSS variables.
- **Motion:** Framer Motion + Lenis smooth scroll. **3D:** Three.js / R3F / drei,
  lazy-loaded so the hero is interactive immediately.
- **Fonts:** self-hosted Geist + Geist Mono via `next/font` (zero layout shift).
- Heavy WebGL is code-split into a separate chunk and mounted only when its section
  nears the viewport. `prefers-reduced-motion` is fully honored everywhere.

## Develop

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # static export → ./out
npm run serve      # serve the built ./out locally
```

## Deploy (GitHub Pages)

This is a **user page** repo (`vineetsista.github.io`), served at the root.
`.github/workflows/deploy.yml` builds the static export and publishes it via GitHub
Pages on every push to `main`.

1. Push to `main`.
2. In **Settings → Pages**, set **Source = GitHub Actions** (one time).
3. The site deploys to https://vineetsista.github.io.

## License

© Vineet Sista. All rights reserved.
