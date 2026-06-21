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
      'Engineering on production financial systems at one of the largest banks in the world — where latency, correctness, and scale are not optional.',
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
      'Coordinates AWS-based projects, guiding system design across compute, storage, and data services.',
      'Mentors peers on architectural patterns, service selection, and cloud security fundamentals.',
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
      'Implemented Python data pipelines to clean and organize EHR, genomics, and wearable data from the All of Us Research Program, supporting cohort construction and downstream research analysis.',
      'Analyzed longitudinal clinical datasets for time-series and LLM projects: feature engineering, exploratory analysis, and structured data prep for modeling workflows.',
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
      'Built an explainable-medicine workflow generating heatmaps by probing LLMs with targeted token removals, surfacing the features most predictive of clinical decision-making and reducing hallucinations.',
      'Processed and cleaned 260,000+ de-identified patient notes (Regex + PyTorch), applied NER models to extract clinical entities, and trained a sparse autoencoder with 5,000+ activations — using UMAP to visualize how urgent-care conditions cluster in latent space and reveal meaningful clinical structure.',
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
      'Building an ML pipeline that detects Linux malware from system-call traces — improving classification accuracy by 16% with TF-IDF feature extraction and Random Forest tuning. (See Instruments → MLWR.)',
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
      'Wrote embedded software for the vehicle-electronics subsystem of Ohio State’s Formula SAE race car — real hardware, real deadlines, real consequences.',
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
      'Guided 72 first-year students through problem-solving in programming, design, and data analysis (MATLAB, Excel).',
      'Ran 3 weekly lab sessions and office hours; graded reports and projects with constructive feedback on data acquisition, modeling, and technical design.',
    ],
  },
  {
    id: 'robotics',
    dates: 'Jan 2025 → Sep 2025',
    duration: '9 mos',
    start: '2025-01',
    role: 'Autonomous Systems Developer',
    org: 'AI Robotics Club',
    location: 'Columbus, OH',
    active: false,
    bullets: [
      'Developed perception and control software for autonomous robotic systems.',
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
  { id: 'research', label: 'research' },
  { id: 'spec', label: 'skills' },
  { id: 'terminal', label: 'terminal' },
  { id: 'contact', label: 'contact' },
];

export const BUILD_HASH = 'a1f9c3e'; // static build marker
