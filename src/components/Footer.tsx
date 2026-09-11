"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import Link from "next/link";
import { ease } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * Each frame mirrors the content wrapper of its shell so the footer lines up
 * with the text above it: the homepage keeps its padding inside the 1200px cap,
 * the inner pages put it outside the `max-w-3xl` column. Without a frame the
 * footer is a flex item in `PageShell` and collapses to its content width.
 */
const FRAME = {
  wide: { outer: "mx-auto max-w-[1200px] px-6", inner: "" },
  narrow: { outer: "px-4 sm:px-6", inner: "mx-auto max-w-3xl" },
} as const;

export function Footer({ width = "wide" }: { width?: keyof typeof FRAME }) {
  const frame = FRAME[width];

  return (
    <motion.footer
      animate={{ opacity: 1 }}
      className={cn("w-full py-8", frame.outer)}
      initial={{ opacity: 0 }}
      transition={{
        duration: 0.5,
        delay: 1.1,
        ease,
      }}
    >
      <div className={frame.inner}>
        <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
          <div className="flex flex-col gap-1">
            <p className="flex items-center gap-1 text-muted-foreground text-xs">
              © {new Date().getFullYear()} Built with{" "}
              <Heart className="h-3 w-3 fill-red-500 text-red-500" /> by Luca
            </p>
            <a
              className="text-muted-foreground text-xs transition-colors duration-200 hover:text-foreground"
              href="https://github.com/itslucadev/personal-website"
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
        <p className="mt-4 text-[11px] text-muted-foreground/80">
          Apple, the Apple logo and App Store are trademarks of Apple Inc.
        </p>
      </div>
    </motion.footer>
  );
}
