'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export function Logo() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      className="absolute top-6 left-6 z-50"
    >
      <Link href="/" className="text-sm font-bold tracking-tight text-foreground hover:opacity-80 transition-opacity">
        <span className="text-amber-600">//</span> LB
      </Link>
    </motion.div>
  );
}
