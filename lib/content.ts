// Single source of truth — sourced verbatim from the dossier. No invented facts.

export const IDENTITY = {
  name: 'VINEET SISTA',
  positioning: 'Low-latency systems · Quantitative development · AI products',
  heroLine:
    'I build systems that have to be fast — order books, ML pipelines, and AI products — and I care about the nanoseconds.',
  location: 'Columbus, Ohio',
  locationAlt: 'Naperville, IL',
  email: 'vineet.sista@gmail.com',
  github: 'https://github.com/vineetsista',
  githubHandle: 'github.com/vineetsista',
  linkedin: 'https://linkedin.com/in/vineetsista',
  linkedinHandle: 'linkedin.com/in/vineetsista',
  phone: '(630) 703-8902',
} as const;

export const THROUGHLINE =
  'Vineet sits at the intersection of low-latency systems, quantitative finance, and AI products. The same instinct runs through everything — from a C++ order-book matching engine that cares about nanoseconds, to ML research probing how language models make clinical decisions, to shipping AI products that deliver intelligence on a deadline. He builds things that have to be fast, correct, and real.';

export const EDUCATION = {
  school: 'The Ohio State University',
  degree: 'Honors B.S. in Computer Science',
  dates: 'Aug 2024 → May 2028',
  scholar:
    'Engineering Scholar — selected as 1 of 96 students for a competitive program focused on innovation and hands-on engineering projects.',
  gpa: '3.8 / 4.0',
  coursework: [
    'Data Structures & Algorithms',
    'Systems Programming / x86-64 Assembly',
    'Files & Databases',
    'Object-Oriented Programming',
    'Engineering Statistics',
    'Linear Algebra',
    'Electronics',
  ],
} as const;

export interface Role {
  id: string;
  dates: string;
  duration: string; // e.g. "1 yr 5 mos"
  start: string; // sortable YYYY-MM
  role: string;
  org: string;
  sub?: string; // sub-label / team / advisor
  location: string;
  active: boolean;
  bullets: string[];
}

// Newest first.
export const ROLES: Role[] = [
  {
    id: 'jpmc',
    dates: 'Jun 2026 → Present',
    duration: '1 mo',
    start: '2026-06',
    role: 'Software Engineering Intern',
    org: 'JPMorganChase',
    location: 'Columbus, OH',
    active: true,
    bullets: [
      'Shipping software on production financial systems at one of the world’s largest banks.',
      'Where latency, correctness, and scale aren’t features — they’re the baseline.',
    ],
  },
  {
    id: 'aws',
    dates: 'Jan 2026 → Present',
    duration: '6 mos',
    start: '2026-01',
    role: 'Technical Lead',
    org: 'AWS Cloud Club @ Ohio State',
    location: 'Columbus, OH',
    active: true,
    bullets: [
      'Leads cloud architecture across the club’s AWS projects — compute, storage, data, security.',
      'Mentors peers on system design: when to reach for which service, and why.',
    ],
  },
  {
    id: 'aimed',
    dates: 'Jan 2026 → Apr 2026',
    duration: '4 mos',
    start: '2026-01',
    role: 'AI Research Assistant',
    org: 'OSU Wexner Medical Center',
    sub: 'AIMed Lab · Dr. Ping Zhang',
    location: 'Columbus, OH',
    active: false,
    bullets: [
      'Built Python pipelines turning messy EHR, genomics, and wearable data (All of Us) into model-ready cohorts.',
      'Ran feature engineering and exploratory analysis powering time-series and LLM clinical projects.',
    ],
  },
  {
    id: 'bmbl',
    dates: 'Sep 2025 → Apr 2026',
    duration: '8 mos',
    start: '2025-09',
    role: 'AI Research Intern',
    org: 'Bioinformatics & Mathematical Biosciences Lab',
    sub: 'BMBL · Dr. Qin Ma',
    location: 'Columbus, OH',
    active: false,
    bullets: [
      'Built an explainable-medicine workflow that probes LLMs with token ablations to surface what actually drives clinical decisions — cutting hallucinations.',
      'Cleaned 260K+ patient notes and trained a sparse autoencoder (5K+ activations), mapping urgent-care conditions in latent space with UMAP.',
    ],
  },
  {
    id: 'malware',
    dates: 'Feb 2025 → Present',
    duration: '1 yr 5 mos',
    start: '2025-02',
    role: 'ML Engineer',
    org: 'Dynamic Linux Malware Analysis',
    sub: 'Independent research · also a flagship project',
    location: 'Remote',
    active: true,
    bullets: [
      'Building an ML pipeline that fingerprints Linux malware from system-call traces.',
      '+16% classification accuracy via TF-IDF features and Random Forest tuning. (See Instruments → MLWR.)',
    ],
  },
  {
    id: 'formula',
    dates: 'Aug 2025 → Dec 2025',
    duration: '5 mos',
    start: '2025-08',
    role: 'Embedded Systems Software Engineer',
    org: 'Formula Buckeyes',
    sub: 'Vehicle Electronics',
    location: 'Columbus, OH',
    active: false,
    bullets: [
      'Wrote embedded firmware for the vehicle-electronics subsystem of OSU’s Formula SAE racecar.',
      'Real hardware, real deadlines — software that has to survive the track.',
    ],
  },
  {
    id: 'ta',
    dates: 'Apr 2025 → Dec 2025',
    duration: '9 mos',
    start: '2025-04',
    role: 'Undergraduate Teaching Assistant',
    org: 'OSU College of Engineering',
    sub: 'ENGR 1181 · Fundamentals of Engineering',
    location: 'Columbus, OH',
    active: false,
    bullets: [
      'Taught 72 first-year engineers problem-solving in programming, design, and data analysis.',
      'Ran 3 weekly labs and office hours; graded for clarity on modeling and data acquisition.',
    ],
  },
  {
    id: 'robotics',
    dates: 'Jan 2025 → Sep 2025',
    duration: '9 mos',
    start: '2025-01',
    role: 'Autonomous Systems Developer',
    org: 'AI Robotics Club',
    sub: 'F1Tenth · ROS autonomy',
    location: 'Columbus, OH',
    active: false,
    bullets: [
      'Built ROS autonomy for an F1Tenth autonomous racer — PID lane-following tuned in simulation.',
      'Cut cross-track error ~74% and navigation latency ~29% while holding LiDAR at 20 Hz.',
    ],
  },
];

export interface Metric {
  label: string;
  value: string;
  dir?: 'up' | 'down' | 'flat';
}

export interface Project {
  ticker: string;
  name: string;
  thesis: string;
  tech: string[];
  metrics: Metric[];
  date?: string;
  repo?: string;
  live?: string;
  building?: boolean;
  featured?: boolean; // full-width flagship w/ deep-dive
  elevated?: boolean; // accent border, no deep-dive
  accent?: 'amber' | 'bid' | 'cyan';
  // synthetic market data for the watchlist
  price?: number;
  change?: number; // percent
}

export const PROJECTS: Project[] = [
  {
    ticker: 'LOB',
    name: 'Limit Order Book Engine',
    thesis:
      'A low-latency NASDAQ ITCH 5.0 limit order book engine in C++20 — zero-copy parsing, full-depth reconstruction, price-time priority matching, and a measured optimization journey down to ~85 ns hot paths. Paired with a queue-position-aware market-replay backtester (lock-free parallel replay) and a market maker with PnL / adverse-selection analytics.',
    tech: ['C++20', 'NASDAQ ITCH 5.0', 'Zero-copy parsing', 'Lock-free replay', 'Microbenchmarking'],
    metrics: [
      { label: 'MATCH LAT', value: '~85ns', dir: 'flat' },
      { label: 'PRIORITY', value: 'PRICE-TIME', dir: 'flat' },
      { label: 'STATUS', value: 'BUILDING', dir: 'up' },
    ],
    date: '2025 → Present',
    repo: 'https://github.com/vineetsista/limit-order-book-engine',
    building: true,
    featured: true,
    accent: 'amber',
    price: 187.42,
    change: 2.18,
  },
  {
    ticker: 'VLLM',
    name: 'miniVLLM',
    thesis:
      'A from-scratch, high-performance LLM inference engine — paged KV cache, continuous batching, speculative decoding, a custom Triton kernel, and an OpenAI-compatible streaming server. Systems engineering all the way down to the GPU.',
    tech: ['Python', 'PyTorch', 'Triton', 'CUDA', 'Streaming API'],
    metrics: [
      { label: 'KV CACHE', value: 'PAGED', dir: 'up' },
      { label: 'BATCHING', value: 'CONTINUOUS', dir: 'up' },
      { label: 'API', value: 'OPENAI-COMPAT', dir: 'flat' },
    ],
    date: '2025 → Present',
    repo: 'https://github.com/vineetsista/minivllm',
    elevated: true,
    accent: 'cyan',
    price: 42.88,
    change: 5.64,
  },
  {
    ticker: 'VELO',
    name: 'VeloQuant',
    thesis:
      'AI morning intelligence platform for independent financial advisors — institutional-grade briefings, SEC filing alerts, and portfolio Q&A delivered every weekday at 7:30am ET.',
    tech: ['React', 'Flask', 'PostgreSQL', 'Stripe', 'Financial APIs'],
    metrics: [
      { label: 'DELIVERY', value: '7:30 ET', dir: 'flat' },
      { label: 'CADENCE', value: 'DAILY', dir: 'up' },
    ],
    repo: 'https://github.com/vineetsista/VeloQuant',
    price: 73.05,
    change: 1.42,
  },
  {
    ticker: 'PHNTM',
    name: 'Phantom — Codebase Explainer',
    thesis: 'AI that turns any GitHub repo into a cinematic ~2-minute video explainer.',
    tech: ['Next.js 14', 'FastAPI', 'Celery', 'Redis', 'PostgreSQL', 'Claude', 'ElevenLabs', 'Remotion', 'Docker'],
    metrics: [
      { label: 'OUTPUT', value: '~2MIN VIDEO', dir: 'flat' },
      { label: 'PIPELINE', value: 'CLAUDE→11L→RMTN', dir: 'up' },
    ],
    repo: 'https://github.com/vineetsista/Phantom-Codebase-Explainer',
    price: 58.30,
    change: 3.11,
  },
  {
    ticker: 'WRTH',
    name: 'Wraith',
    thesis: 'Dark, tactical, AI-native resale arbitrage intelligence — a personal Next.js 14 concept.',
    tech: ['Next.js 14', 'TypeScript', 'Tailwind'],
    metrics: [
      { label: 'MODE', value: 'TACTICAL', dir: 'flat' },
      { label: 'STATUS', value: 'LIVE', dir: 'up' },
    ],
    repo: 'https://github.com/vineetsista/Wraith',
    live: 'https://wraith-tau.vercel.app',
    price: 31.77,
    change: -0.88,
  },
  {
    ticker: 'ALPHA',
    name: 'AlphaStream',
    thesis:
      'Self-hosted quant engine for Kalshi player-prop markets — Z-score anomaly detection, fractional Kelly sizing, live Discord alerts.',
    tech: ['Flask', 'React', 'Statistical modeling'],
    metrics: [
      { label: 'SIGNAL', value: 'Z-SCORE', dir: 'up' },
      { label: 'SIZING', value: 'FRAC KELLY', dir: 'flat' },
    ],
    repo: 'https://github.com/vineetsista/AlphaStream',
    price: 64.20,
    change: 2.73,
  },
  {
    ticker: 'DRKM',
    name: 'Darkmile',
    thesis:
      'AI-powered deal intelligence for independent CRE brokers — daily AI briefings, opportunity scoring, ⌘K command palette, AI co-pilot.',
    tech: ['Next.js', 'TypeScript', 'LLM integration'],
    metrics: [
      { label: 'SCORING', value: 'AI OPP', dir: 'up' },
      { label: 'BRIEFING', value: 'DAILY', dir: 'flat' },
    ],
    repo: 'https://github.com/vineetsista/Darkmile',
    price: 49.95,
    change: 1.07,
  },
  {
    ticker: 'MLWR',
    name: 'Dynamic Malware Analysis',
    thesis:
      'ML pipeline detecting Linux malware via system-call traces, improving classification accuracy by 16% through TF-IDF feature extraction and Random Forest tuning.',
    tech: ['Python', 'Scikit-Learn', 'Flask'],
    metrics: [
      { label: 'ACCURACY', value: '+16%', dir: 'up' },
      { label: 'FEATURES', value: 'TF-IDF', dir: 'flat' },
    ],
    date: 'Mar 2025 → Present',
    repo: 'https://github.com/vineetsista',
    price: 27.16,
    change: 4.02,
  },
  {
    ticker: 'PLNT',
    name: 'Plant Care Assistant',
    thesis:
      'AI-powered plant care assistant with a Streamlit frontend and a 98%-accurate ML model recommending plants based on light, humidity, and temperature inputs.',
    tech: ['Python', 'Scikit-Learn', 'Streamlit'],
    metrics: [
      { label: 'MODEL', value: '98%', dir: 'up' },
      { label: 'UI', value: 'STREAMLIT', dir: 'flat' },
    ],
    date: 'Aug 2025',
    repo: 'https://github.com/vineetsista/Plant-Care-Assistant',
    price: 19.80,
    change: 0.64,
  },
];

// ── Personal voice — the human layer ──────────────────────────────
export const MANIFESTO = {
  eyebrow: '// the operator',
  // Each line renders on its own; the serif/amber words carry the voice.
  lines: [
    "I'm Vineet — a CS Honors student at Ohio State who got a little obsessed with one question:",
    'how fast can a thing actually go?',
  ],
  body: [
    "Most days I'm somewhere between a C++ order book that argues about nanoseconds, a research lab teaching language models to explain themselves, and an AI product that has to ship intelligence before the market opens at 7:30.",
    "I like problems that are equal parts fast, correct, and real. I build things that have to hold up when it counts — and I don't love waiting.",
  ],
  signoff: "Let's build something that has to be fast.",
};

export interface CurrentItem {
  k: string;
  v: string;
  accent?: 'amber' | 'bid' | 'cyan';
}

export const CURRENTLY: CurrentItem[] = [
  { k: 'interning', v: 'JPMorganChase · Software Engineering', accent: 'amber' },
  { k: 'building', v: 'A nanosecond C++ order book + an LLM inference engine', accent: 'bid' },
  { k: 'leading', v: 'AWS Cloud Club @ Ohio State', accent: 'cyan' },
  { k: 'researching', v: 'Explainable medicine & clinical ML', accent: 'amber' },
  { k: 'reading the tape', v: 'NASDAQ ITCH 5.0', accent: 'bid' },
  { k: 'based in', v: 'Columbus, OH · from Naperville, IL', accent: 'cyan' },
];

export interface StatItem {
  value: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  label: string;
  sub: string;
  accent?: 'amber' | 'bid' | 'ask' | 'cyan';
}

export const STATS: StatItem[] = [
  { value: 260, suffix: 'K+', label: 'patient notes', sub: 'cleaned & processed', accent: 'amber' },
  { value: 16, prefix: '+', suffix: '%', label: 'malware accuracy', sub: 'TF-IDF + RF tuning', accent: 'bid' },
  { value: 98, suffix: '%', label: 'model accuracy', sub: 'plant-care recommender', accent: 'cyan' },
  { value: 85, suffix: 'ns', label: 'match latency', sub: 'order-book hot path', accent: 'ask' },
  { value: 3.8, decimals: 1, label: 'GPA', sub: 'honors · 4.0 scale', accent: 'amber' },
  { value: 96, prefix: '1 / ', label: 'engineering scholars', sub: 'competitive selection', accent: 'bid' },
];

// Ticker-tape facts that scroll across the screen.
export interface Tick {
  label: string;
  value: string;
  dir?: 'up' | 'down' | 'flat';
}

export const TICKER: Tick[] = [
  { label: 'JPM', value: 'SWE INTERN', dir: 'up' },
  { label: 'GPA', value: '3.80', dir: 'up' },
  { label: 'SCHOLAR', value: '1 OF 96', dir: 'up' },
  { label: 'NOTES', value: '260K+', dir: 'flat' },
  { label: 'MLWR', value: '+16%', dir: 'up' },
  { label: 'PLNT', value: '98%', dir: 'up' },
  { label: 'LOB', value: '~85ns', dir: 'flat' },
  { label: 'VLLM', value: 'PAGED-KV', dir: 'up' },
  { label: 'LANGS', value: '×9', dir: 'flat' },
  { label: 'AWS', value: 'TECH LEAD', dir: 'up' },
  { label: 'OSU', value: "CS '28 HON", dir: 'flat' },
  { label: 'ITCH', value: '5.0', dir: 'flat' },
  { label: 'LOC', value: 'COLUMBUS·OH', dir: 'flat' },
];

export const SKILLS = {
  LANG: ['Python', 'C++', 'Java', 'JavaScript', 'TypeScript', 'SQL', 'R', 'MATLAB', 'HTML', 'CSS'],
  FRAMEWORKS: [
    'Flask', 'React', 'Next.js', 'Node.js', 'PyTorch', 'TensorFlow', 'Scikit-Learn',
    'NumPy', 'Pandas', 'Matplotlib', 'Remotion', 'Framer Motion',
  ],
  INFRA: [
    'Git', 'Docker', 'AWS', 'PostgreSQL', 'BigQuery', 'Azure ML Studio',
    'Redis', 'Celery', 'Tableau', 'Linux', 'Streamlit', 'VS Code',
  ],
} as const;

export interface SectionDef {
  id: string;
  label: string;
}

export const SECTIONS: SectionDef[] = [
  { id: 'hero', label: 'home' },
  { id: 'about', label: 'about' },
  { id: 'throughline', label: 'thesis' },
  { id: 'blotter', label: 'experience' },
  { id: 'instruments', label: 'projects' },
  { id: 'engine', label: 'engine' },
  { id: 'inference', label: 'inference' },
  { id: 'research', label: 'research' },
  { id: 'spec', label: 'skills' },
  { id: 'terminal', label: 'terminal' },
  { id: 'contact', label: 'contact' },
];

// ── The Optimization Journey — latency benchmark (order book hot path) ──
export interface OptStage {
  label: string;
  ns: number; // measured latency, nanoseconds
  note: string;
}

export const LATENCY_JOURNEY: OptStage[] = [
  { label: 'Naive std::map book', ns: 1240, note: 'red-black tree, pointer chasing, cache misses everywhere' },
  { label: 'Flat array + intrusive lists', ns: 410, note: 'contiguous price levels, no per-order allocation' },
  { label: 'Cache-conscious layout', ns: 190, note: 'hot fields packed; best bid/ask in one cache line' },
  { label: 'Branchless hot path', ns: 112, note: 'predication over branches; fewer mispredicts' },
  { label: 'Zero-copy SIMD parse', ns: 85, note: 'parse + apply in place; vectorized field decode' },
];

// ── miniVLLM inference panel ───────────────────────────────────────
export const INFERENCE = {
  prompt: 'def is_prime(n):',
  // streamed token-by-token; each entry is one "token"
  completion: [
    '\n    ', 'if', ' n', ' <', ' 2', ':', '\n        ', 'return', ' False',
    '\n    ', 'for', ' i', ' in', ' range', '(2', ', int', '(n', '**', '0.5)',
    '+1', '):', '\n        ', 'if', ' n', ' %', ' i', ' ==', ' 0', ':',
    '\n            ', 'return', ' False', '\n    ', 'return', ' True',
  ],
  tokensPerSec: 1840,
  specs: [
    { k: 'KV CACHE', v: 'PAGED' },
    { k: 'BATCHING', v: 'CONTINUOUS' },
    { k: 'DECODE', v: 'SPECULATIVE' },
    { k: 'KERNEL', v: 'TRITON' },
  ],
  repo: 'https://github.com/vineetsista/minivllm',
};

export const BUILD_HASH = 'a1f9c3e'; // static build marker
