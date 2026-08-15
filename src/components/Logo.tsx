"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export function Logo() {
  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      className="absolute top-6 left-6 z-50"
      initial={{ opacity: 0, y: -10 }}
      transition={{
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      <Link
        className="font-bold text-foreground text-sm tracking-tight transition-opacity hover:opacity-80"
        href="/"
      >
        <span className="text-amber-600">{"//"}</span> LB
      </Link>
    </motion.div>
  );
}
