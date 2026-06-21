'use client';

import { motion } from 'framer-motion';
import { usePrefersReducedMotion } from '@/lib/hooks';

export function SectionShell({
  id,
  children,
  className = '',
}: {
  id: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`relative scroll-mt-7 border-t border-line px-4 py-16 sm:px-6 sm:py-24 ${className}`}>
      <div className="mx-auto max-w-6xl">{children}</div>
    </section>
  );
}

export function SectionHeader({
  index,
  label,
  title,
  caption,
}: {
  index: string;
  label: string;
  title: string;
  caption?: string;
}) {
  return (
    <div className="mb-10 sm:mb-14">
      <div className="mb-3 flex items-center gap-3 font-mono text-[10px] uppercase tracking-wider text-text-dim">
        <span className="text-amber">{index}</span>
        <span className="h-px w-8 bg-line" />
        <span>{label}</span>
      </div>
      <h2 className="font-sans text-2xl font-semibold tracking-tight text-text sm:text-4xl">{title}</h2>
      {caption && <p className="mt-3 max-w-2xl text-sm leading-relaxed text-text-dim sm:text-base">{caption}</p>}
    </div>
  );
}

export function Reveal({
  children,
  delay = 0,
  className = '',
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduced = usePrefersReducedMotion();
  if (reduced) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block border border-line bg-surface/60 px-1.5 py-0.5 font-mono text-[10px] tracking-wide text-text-dim">
      {children}
    </span>
  );
}
