"use client";

import { motion } from "framer-motion";
import { Calendar, Mail } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="px-4 pt-20 pb-12 sm:px-6">
      <div className="mx-auto max-w-3xl">
        {/* Name */}
        <motion.h1
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 text-center font-bold text-2xl leading-tight tracking-tight sm:text-[28px]"
          initial={{ opacity: 0, y: 20 }}
          transition={{
            duration: 0.5,
            delay: 0.2,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
        >
          Hey, I'm <span className="text-amber-600">Luca Becker</span>!
        </motion.h1>

        {/* Tagline */}
        <motion.p
          animate={{ opacity: 1, y: 0 }}
          className="mx-auto mb-6 max-w-lg text-center text-muted-foreground text-sm leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          transition={{
            duration: 0.5,
            delay: 0.3,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
        >
          Full stack developer building modern mobile and web apps with a focus
          on clean design and user experience.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 flex flex-wrap justify-center gap-3"
          initial={{ opacity: 0, y: 20 }}
          transition={{
            duration: 0.5,
            delay: 0.4,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
        >
          <motion.div
            transition={{ duration: 0.2 }}
            whileHover={{ scale: 1.02, y: -1 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              asChild
              className="flex items-center gap-2 rounded-md bg-foreground px-4 py-2 font-medium text-background text-sm hover:bg-foreground/90"
            >
              <a
                href="https://cal.eu/lucabecker"
                rel="noopener noreferrer"
                target="_blank"
              >
                <Calendar className="h-4 w-4" />
                Book a call
              </a>
            </Button>
          </motion.div>

          <motion.div
            transition={{ duration: 0.2 }}
            whileHover={{ scale: 1.02, y: -1 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              asChild
              className="flex items-center gap-2 rounded-md border-border bg-transparent px-4 py-2 font-medium text-sm hover:bg-secondary"
              variant="outline"
            >
              <Link href="/contact">
                <Mail className="h-4 w-4" />
                Get in touch
              </Link>
            </Button>
          </motion.div>
        </motion.div>

        {/* Availability Indicator */}
        <motion.div
          animate={{ opacity: 1 }}
          className="flex items-center justify-center gap-2"
          initial={{ opacity: 0 }}
          transition={{
            duration: 0.4,
            delay: 0.5,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
        >
          <span className="relative flex h-2 w-2">
            {/* Subtle glow gradient */}
            <span className="absolute -inset-2 animate-pulse-glow rounded-full bg-green-400/20 blur-sm" />
            <span className="absolute -inset-1 animate-pulse-glow rounded-full bg-green-400/30 blur-[2px] delay-75" />
            {/* Pulse ring */}
            <span className="absolute inline-flex h-full w-full animate-pulse-dot rounded-full bg-green-500 opacity-75" />
            {/* Core dot */}
            <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
          </span>
          <span className="text-muted-foreground text-xs">
            Available for freelance and projects
          </span>
        </motion.div>
      </div>
    </section>
  );
}
