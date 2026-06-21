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
  gpa: '3.7 / 4.0',
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
  start: string; // sortable YYYY-MM
  role: string;
  org: string;
  location: string;
  active: boolean;
  bullets: string[];
}

// Newest first.
export const ROLES: Role[] = [
  {
    id: 'jpmc',
    dates: 'Jun 2026 → Present',
    start: '2026-06',
    role: 'Software Engineering Intern',
    org: 'JPMorganChase',
    location: 'Columbus, OH',
    active: true,
    bullets: [],
  },
  {
    id: 'aws',
    dates: 'Jan 2026 → Present',
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
    start: '2026-01',
    role: 'AI Research Assistant',
    org: 'OSU Wexner Medical Center — AIMed Lab (Dr. Ping Zhang)',
    location: 'Columbus, OH',
    active: false,
    bullets: [
      'Built Python data pipelines to clean and organize EHR, genomics, and wearable data from the All of Us Research Program, supporting cohort construction and downstream analysis.',
      'Analyzed longitudinal clinical datasets for time-series and LLM projects: feature engineering, exploratory analysis, structured data prep for modeling.',
    ],
  },
  {
    id: 'bmbl',
    dates: 'Sep 2025 → Apr 2026',
    start: '2025-09',
    role: 'AI Research Intern',
    org: 'Bioinformatics & Mathematical Biosciences Lab (Dr. Qin Ma)',
    location: 'Columbus, OH',
    active: false,
    bullets: [
      'Built an explainable-medicine workflow generating heatmaps by probing LLMs with targeted token removals, surfacing the features most predictive of clinical decision-making and reducing hallucinations.',
      'Processed and cleaned 260,000+ de-identified patient notes (Regex + PyTorch), applied NER models to extract clinical entities, and trained a sparse autoencoder with 5,000+ activations, using UMAP to visualize how urgent-care conditions cluster in latent space.',
    ],
  },
  {
    id: 'formula',
    dates: 'Aug 2025 → Dec 2025',
    start: '2025-08',
    role: 'Embedded Systems Software Engineer (Vehicle Electronics)',
    org: 'Formula Buckeyes',
    location: 'Columbus, OH',
    active: false,
    bullets: [],
  },
  {
    id: 'ta',
    dates: 'Apr 2025 → Dec 2025',
    start: '2025-04',
    role: 'Undergraduate Teaching Assistant — ENGR 1181 Fundamentals of Engineering',
    org: 'OSU College of Engineering',
    location: 'Columbus, OH',
    active: false,
    bullets: [
      'Guided 72 first-year students through programming, design, and data analysis (MATLAB, Excel).',
      'Ran 3 weekly lab sessions and office hours; graded reports and projects with constructive feedback.',
    ],
  },
  {
    id: 'malware',
    dates: 'Feb 2025 → Present',
    start: '2025-02',
    role: 'ML Engineer — Dynamic Linux Malware Analysis',
    org: 'Independent Research',
    location: 'Remote',
    active: true,
    bullets: [
      'ML pipeline detecting Linux malware via system-call traces (also a flagship project — see Instruments).',
    ],
  },
  {
    id: 'robotics',
    dates: 'Jan 2025 → Sep 2025',
    start: '2025-01',
    role: 'Autonomous Systems Developer',
    org: 'AI Robotics Club',
    location: 'Columbus, OH',
    active: false,
    bullets: [],
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
  repo?: string;
  live?: string;
  building?: boolean;
  featured?: boolean;
}

export const PROJECTS: Project[] = [
  {
    ticker: 'LOB',
    name: 'Limit Order Book Engine',
    thesis:
      'A nanosecond-latency limit order book matching engine in C++, processing real market data from the NASDAQ ITCH 5.0 feed — price-time priority matching, intrusive data structures, cache-conscious design, microbenchmarked hot paths.',
    tech: ['C++', 'NASDAQ ITCH 5.0', 'Low-latency structures', 'Microbenchmarking'],
    metrics: [
      { label: 'MATCH LAT', value: '~85ns', dir: 'flat' },
      { label: 'PRIORITY', value: 'PRICE-TIME', dir: 'flat' },
      { label: 'STATUS', value: 'BUILDING', dir: 'up' },
    ],
    building: true,
    featured: true,
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
    repo: 'https://github.com/vineetsista/Plant-Care-Assistant',
  },
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
  { id: 'throughline', label: 'about' },
  { id: 'blotter', label: 'experience' },
  { id: 'instruments', label: 'projects' },
  { id: 'engine', label: 'engine' },
  { id: 'research', label: 'research' },
  { id: 'spec', label: 'skills' },
  { id: 'terminal', label: 'terminal' },
  { id: 'contact', label: 'contact' },
];

export const BUILD_HASH = 'a1f9c3e'; // static build marker
