"use client";

import { motion } from "framer-motion";
import {
  ArrowLeft,
  Briefcase,
  Calendar,
  ExternalLink,
  MapPin,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Logo } from "@/components/Logo";
import { Badge } from "@/components/ui/badge";

const ease = [0.25, 0.46, 0.45, 0.94] as const;

const meta = [
  { icon: Briefcase, label: "Design & Development" },
  { icon: Calendar, label: "2026" },
  { icon: MapPin, label: "Fürth, Germany" },
];

const stack = [
  "Next.js",
  "TypeScript",
  "Sanity CMS",
  "Tailwind CSS",
  "Framer Motion",
  "Vercel",
  "Cuescore API",
];

const shots = [
  {
    src: "/clients/bv-q-club-tournaments.webp",
    alt: "Tournament results section of bv-q-club.de, listing recent tournaments with podium placements pulled from Cuescore",
    caption: "Results sync from Cuescore - no manual entry.",
  },
  {
    src: "/clients/bv-q-club-membership.webp",
    alt: "Membership section of bv-q-club.de showing four pricing tiers on a light background",
    caption: "Membership tiers the board edits in Sanity.",
  },
];

export function ClientPageBvqClub() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Logo />

      <main className="flex-1">
        <section className="px-4 pt-20 pb-16 sm:px-6">
          <div className="mx-auto max-w-3xl">
            {/* Back link */}
            <motion.div
              animate={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.15, ease }}
            >
              <Link
                className="group mb-6 inline-flex items-center gap-1.5 text-muted-foreground text-xs transition-colors duration-200 hover:text-foreground"
                href="/#client-work"
              >
                <ArrowLeft className="h-3 w-3 transition-transform duration-200 group-hover:-translate-x-0.5" />
                Back to client work
              </Link>
            </motion.div>

            {/* Header */}
            <motion.div
              animate={{ opacity: 1, y: 0 }}
              className="mb-3 flex items-center gap-3"
              initial={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.2, ease }}
            >
              <Image
                alt="BV Q-Club e.V. crest"
                className="h-10 w-10 rounded-md object-contain"
                height={40}
                src="/clients/logo-bv-q-club.png"
                width={40}
              />
              <div>
                <h1 className="font-bold text-2xl leading-tight tracking-tight sm:text-[28px]">
                  BV Q-Club <span className="text-amber-600">e.V.</span>
                </h1>
                <p className="text-muted-foreground text-xs">
                  Poolbillard-Verein Fürth
                </p>
              </div>
            </motion.div>

            {/* Meta */}
            <motion.div
              animate={{ opacity: 1, y: 0 }}
              className="mb-5 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-muted-foreground text-xs"
              initial={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.25, ease }}
            >
              {meta.map(({ icon: Icon, label }) => (
                <span className="inline-flex items-center gap-1.5" key={label}>
                  <Icon className="h-3 w-3" />
                  {label}
                </span>
              ))}
            </motion.div>

            {/* The one paragraph */}
            <motion.p
              animate={{ opacity: 1, y: 0 }}
              className="mb-5 text-foreground text-sm leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.3, ease }}
            >
              Designed and built the website and Sanity CMS for Fürth&apos;s
              pool billiard club - the board publishes updates itself, and
              tournament results sync in from Cuescore.
            </motion.p>

            {/* Stack */}
            <motion.div
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 flex flex-wrap gap-1.5"
              initial={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.35, ease }}
            >
              {stack.map((tech) => (
                <Badge
                  className="h-6 bg-secondary/50 px-2 py-0 font-normal text-[11px]"
                  key={tech}
                  variant="secondary"
                >
                  {tech}
                </Badge>
              ))}
            </motion.div>

            {/* Visit */}
            <motion.a
              animate={{ opacity: 1, y: 0 }}
              className="group mb-10 inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2 font-medium text-sm transition-colors duration-200 hover:border-foreground/20 hover:bg-accent/50"
              href="https://bv-q-club.de"
              initial={{ opacity: 0, y: 20 }}
              rel="noopener noreferrer"
              target="_blank"
              transition={{ duration: 0.5, delay: 0.4, ease }}
            >
              Visit bv-q-club.de
              <ExternalLink className="h-3.5 w-3.5 text-muted-foreground transition-colors duration-200 group-hover:text-foreground" />
            </motion.a>

            {/* Hero screenshot */}
            <motion.figure
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 overflow-hidden rounded-lg border border-border"
              initial={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.45, ease }}
            >
              <Image
                alt="Homepage hero of bv-q-club.de: the words Q-CLUB FÜRTH set in a large display serif behind a rendered black 8-ball"
                className="h-auto w-full"
                height={900}
                priority
                sizes="(max-width: 768px) 100vw, 768px"
                src="/clients/bv-q-club-hero.webp"
                width={1440}
              />
            </motion.figure>

            {/* Detail shots */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {shots.map((shot, index) => (
                <motion.figure
                  animate={{ opacity: 1, y: 0 }}
                  initial={{ opacity: 0, y: 20 }}
                  key={shot.src}
                  transition={{
                    duration: 0.5,
                    delay: 0.5 + index * 0.05,
                    ease,
                  }}
                >
                  <div className="overflow-hidden rounded-lg border border-border">
                    <Image
                      alt={shot.alt}
                      className="h-auto w-full"
                      height={900}
                      sizes="(max-width: 640px) 100vw, 376px"
                      src={shot.src}
                      width={1440}
                    />
                  </div>
                  <figcaption className="mt-2 text-muted-foreground text-xs">
                    {shot.caption}
                  </figcaption>
                </motion.figure>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
