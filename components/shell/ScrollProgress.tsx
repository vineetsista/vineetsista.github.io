'use client';

import { motion, useScroll, useSpring } from 'framer-motion';

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });
  return (
    <motion.div
      style={{ scaleX }}
      className="fixed left-0 top-7 z-40 h-px w-full origin-left bg-amber"
      aria-hidden
    >
      <div className="h-full w-full" style={{ boxShadow: '0 0 8px var(--amber)' }} />
    </motion.div>
  );
}
