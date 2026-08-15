"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <motion.footer
      animate={{ opacity: 1 }}
      className="border-border border-t px-4 py-6 sm:px-6"
      initial={{ opacity: 0 }}
      transition={{
        duration: 0.5,
        delay: 1.1,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      <div className="flex flex-col items-center justify-between gap-2 sm:flex-row">
        <div className="flex flex-col items-center gap-1 sm:items-start">
          <p className="flex items-center gap-1 text-muted-foreground text-xs">
            © {new Date().getFullYear()} Built with{" "}
            <Heart className="h-3 w-3 fill-red-500 text-red-500" /> by Luca
          </p>
          <a
            className="text-muted-foreground text-xs transition-colors duration-200 hover:text-foreground"
            href="https://github.com"
            rel="noopener noreferrer"
            target="_blank"
          >
            This website is open source
          </a>
        </div>

        <div className="flex items-center gap-3">
          <Link
            className="text-muted-foreground text-xs transition-colors duration-200 hover:text-foreground"
            href="/contact"
          >
            Contact
          </Link>
          <Link
            className="text-muted-foreground text-xs transition-colors duration-200 hover:text-foreground"
            href="/support"
          >
            Support
          </Link>
        </div>
      </div>
    </motion.footer>
  );
}
