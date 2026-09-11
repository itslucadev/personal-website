"use client";

import { motion } from "framer-motion";
import { Briefcase, Calendar, ExternalLink, MapPin } from "lucide-react";
import Image from "next/image";
import { CaseStudyLayout } from "@/components/PageLayout";
import { ease } from "@/lib/motion";

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
    <CaseStudyLayout
      backHref="/#client-work"
      backLabel="Back to client work"
      description="Designed and built the website and Sanity CMS for Fürth's pool billiard club - the board publishes updates itself, and tournament results sync in from Cuescore."
      header={
        <>
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
        </>
      }
      headerClassName="flex items-center gap-3"
      meta={meta}
      stack={stack}
    >
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
    </CaseStudyLayout>
  );
}
