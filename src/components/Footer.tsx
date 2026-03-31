'use client';

import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import Link from 'next/link';

export function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: 0.5,
        delay: 1.1,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className="py-6 px-4 sm:px-6 border-t border-border"
    >
      <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
        <div className="flex flex-col items-center sm:items-start gap-1">
          <p className="text-xs text-muted-foreground flex items-center gap-1">
            © {new Date().getFullYear()} Built with{' '}
            <Heart className="w-3 h-3 text-red-500 fill-red-500" /> by Luca
          </p>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-muted-foreground hover:text-foreground transition-colors duration-200"
          >
            This website is open source
          </a>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/contact"
            className="text-xs text-muted-foreground hover:text-foreground transition-colors duration-200"
          >
            Contact
          </Link>
          <Link
            href="/support"
            className="text-xs text-muted-foreground hover:text-foreground transition-colors duration-200"
          >
            Support
          </Link>
        </div>
      </div>
    </motion.footer>
  );
}
