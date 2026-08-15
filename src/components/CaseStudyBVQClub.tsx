"use client";

import { motion } from "framer-motion";
import {
  ArrowLeft,
  Briefcase,
  Calendar,
  ExternalLink,
  Globe,
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
  { icon: Globe, label: "German" },
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

const highlights = [
  {
    title: "An editorial homepage, not a template",
    body: "A display serif, a near-black palette with oxblood and gold, and a scroll-driven 8-ball that carries you from the hero into the club story. The club looks like a club, not like a page builder.",
  },
  {
    title: "The board edits it, not me",
    body: "Every section is modelled in Sanity: teams and leagues, membership tiers, gallery, downloads, and the legal pages. Volunteers update the site between seasons without touching code or waiting on a developer.",
  },
  {
    title: "Tournament results sync themselves",
    body: "The club already ran its tournaments on Cuescore. Rather than ask anyone to copy results across by hand, the site pulls schedule, entrants, and podium straight from there - so the results page is current the moment a tournament ends.",
  },
  {
    title: "Built for a German e.V.",
    body: "Impressum, Datenschutz, and Satzung are first-class pages, and the membership application is a downloadable PDF, which is how the club actually signs people up.",
  },
];

const shots = [
  {
    src: "/clients/bv-q-club-tournaments.webp",
    width: 1440,
    height: 900,
    alt: "Tournament results section of bv-q-club.de, listing recent tournaments with podium placements pulled from Cuescore",
    caption: "Results sync from Cuescore - no manual entry.",
  },
  {
    src: "/clients/bv-q-club-membership.webp",
    width: 1440,
    height: 900,
    alt: "Membership section of bv-q-club.de showing four pricing tiers on a light background",
    caption: "Four membership tiers, priced in plain language.",
  },
];

export function CaseStudyBVQClub() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Logo />

      <main className="flex-1">
        {/* Header */}
        <section className="px-4 pt-20 pb-8 sm:px-6">
          <div className="mx-auto max-w-3xl">
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

            <motion.p
              animate={{ opacity: 1, y: 0 }}
              className="mb-5 text-foreground text-sm leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.28, ease }}
            >
              Fürth&apos;s pool billiard club needed a website that could pull
              its weight: win over people thinking about walking in for a first
              game, and stay current without a webmaster on call. I designed and
              built it end to end - the site, the CMS behind it, and the
              automation that keeps its tournament results honest.
            </motion.p>

            {/* Meta row */}
            <motion.div
              animate={{ opacity: 1, y: 0 }}
              className="mb-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-muted-foreground text-xs"
              initial={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.34, ease }}
            >
              {meta.map((item) => (
                <span className="flex items-center gap-1.5" key={item.label}>
                  <item.icon className="h-3 w-3" />
                  {item.label}
                </span>
              ))}
            </motion.div>

            <motion.a
              animate={{ opacity: 1, y: 0 }}
              className="group inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2 font-medium text-sm transition-colors duration-200 hover:border-foreground/20 hover:bg-accent/50"
              href="https://bv-q-club.de"
              initial={{ opacity: 0, y: 20 }}
              rel="noopener noreferrer"
              target="_blank"
              transition={{ duration: 0.5, delay: 0.4, ease }}
            >
              Visit bv-q-club.de
              <ExternalLink className="h-3.5 w-3.5 text-muted-foreground transition-colors duration-200 group-hover:text-foreground" />
            </motion.a>
          </div>
        </section>

        {/* Hero shot */}
        <section className="px-4 pb-10 sm:px-6">
          <div className="mx-auto max-w-3xl">
            <motion.figure
              animate={{ opacity: 1, y: 0 }}
              className="overflow-hidden rounded-lg border border-border bg-card"
              initial={{ opacity: 0, y: 24 }}
              transition={{ duration: 0.6, delay: 0.46, ease }}
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
          </div>
        </section>

        {/* The club */}
        <section className="px-4 py-10 sm:px-6">
          <div className="mx-auto max-w-3xl">
            <motion.h2
              className="mb-2 font-medium text-muted-foreground text-xs uppercase tracking-wider"
              initial={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5, ease }}
              viewport={{ once: true, margin: "-80px" }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              The Client
            </motion.h2>

            <motion.p
              className="mb-5 text-foreground text-sm leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.05, ease }}
              viewport={{ once: true, margin: "-80px" }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              Founded in 2013 by nine players, the BV Q-Club is now one of the
              most active pool billiard clubs in the region: around 90 members,
              four teams in the Bavarian league system, and its own clubhouse on
              Kaiserstraße since 2019 - six Dynamic tournament tables across
              more than 200 m², open to members around the clock. Their motto,{" "}
              <span className="font-medium text-foreground">
                &ldquo;jeder kann, keiner muss&rdquo;
              </span>{" "}
              (everyone can, nobody has to), set the tone for the whole site.
            </motion.p>

            <motion.div
              className="grid grid-cols-2 gap-3 sm:grid-cols-4"
              initial={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.1, ease }}
              viewport={{ once: true, margin: "-80px" }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              {[
                { value: "6", label: "Tournament tables" },
                { value: "90+", label: "Members" },
                { value: "200+", label: "m² clubhouse" },
                { value: "4", label: "League teams" },
              ].map((stat) => (
                <div
                  className="rounded-lg border border-border bg-card p-4"
                  key={stat.label}
                >
                  <div className="font-bold text-foreground text-xl">
                    {stat.value}
                  </div>
                  <div className="mt-0.5 text-[11px] text-muted-foreground leading-tight">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* What I built */}
        <section className="px-4 py-10 sm:px-6">
          <div className="mx-auto max-w-3xl">
            <motion.h2
              className="mb-2 font-medium text-muted-foreground text-xs uppercase tracking-wider"
              initial={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5, ease }}
              viewport={{ once: true, margin: "-80px" }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              What I Built
            </motion.h2>

            <motion.p
              className="mb-5 text-foreground text-sm"
              initial={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.05, ease }}
              viewport={{ once: true, margin: "-80px" }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              Nine pages, one content model, and no dependency on me to keep it
              running:
            </motion.p>

            <div className="space-y-3">
              {highlights.map((item, index) => (
                <motion.div
                  className="rounded-lg border border-border bg-card p-4 transition-colors duration-200 hover:bg-accent/50"
                  initial={{ opacity: 0, y: 20 }}
                  key={item.title}
                  transition={{ duration: 0.5, delay: index * 0.06, ease }}
                  viewport={{ once: true, margin: "-80px" }}
                  whileInView={{ opacity: 1, y: 0 }}
                >
                  <h3 className="mb-1.5 font-semibold text-foreground text-sm">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {item.body}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Screens */}
        <section className="px-4 py-10 sm:px-6">
          <div className="mx-auto max-w-3xl">
            <motion.h2
              className="mb-5 font-medium text-muted-foreground text-xs uppercase tracking-wider"
              initial={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5, ease }}
              viewport={{ once: true, margin: "-80px" }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              A Closer Look
            </motion.h2>

            <div className="space-y-6">
              {shots.map((shot) => (
                <motion.figure
                  initial={{ opacity: 0, y: 24 }}
                  key={shot.src}
                  transition={{ duration: 0.6, ease }}
                  viewport={{ once: true, margin: "-80px" }}
                  whileInView={{ opacity: 1, y: 0 }}
                >
                  <div className="overflow-hidden rounded-lg border border-border bg-card">
                    <Image
                      alt={shot.alt}
                      className="h-auto w-full"
                      height={shot.height}
                      sizes="(max-width: 768px) 100vw, 768px"
                      src={shot.src}
                      width={shot.width}
                    />
                  </div>
                  <figcaption className="mt-2 text-muted-foreground text-xs">
                    {shot.caption}
                  </figcaption>
                </motion.figure>
              ))}

              {/* Mobile */}
              <motion.figure
                className="flex flex-col items-center"
                initial={{ opacity: 0, y: 24 }}
                transition={{ duration: 0.6, ease }}
                viewport={{ once: true, margin: "-80px" }}
                whileInView={{ opacity: 1, y: 0 }}
              >
                <div className="max-w-[260px] overflow-hidden rounded-xl border border-border bg-card">
                  <Image
                    alt="bv-q-club.de homepage on a phone-sized viewport, with the display type and 8-ball hero reflowed to a single column"
                    className="h-auto w-full"
                    height={1317}
                    sizes="260px"
                    src="/clients/bv-q-club-mobile.webp"
                    width={780}
                  />
                </div>
                <figcaption className="mt-2 text-center text-muted-foreground text-xs">
                  Most members find the club on a phone, so the layout was built
                  for that first.
                </figcaption>
              </motion.figure>
            </div>
          </div>
        </section>

        {/* Stack */}
        <section className="px-4 py-10 sm:px-6">
          <div className="mx-auto max-w-3xl">
            <motion.h2
              className="mb-2 font-medium text-muted-foreground text-xs uppercase tracking-wider"
              initial={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5, ease }}
              viewport={{ once: true, margin: "-80px" }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              Stack
            </motion.h2>

            <motion.div
              className="flex flex-wrap gap-1.5"
              initial={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.05, ease }}
              viewport={{ once: true, margin: "-80px" }}
              whileInView={{ opacity: 1, y: 0 }}
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
          </div>
        </section>

        {/* CTA */}
        <section className="px-4 py-10 sm:px-6">
          <div className="mx-auto max-w-3xl">
            <motion.div
              className="rounded-lg border border-border bg-card p-5"
              initial={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5, ease }}
              viewport={{ once: true, margin: "-80px" }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <h2 className="mb-1.5 font-semibold text-foreground text-sm">
                Need something similar?
              </h2>
              <p className="mb-4 text-muted-foreground text-sm leading-relaxed">
                Clubs, associations, and small businesses that want a site with
                character - and one they can actually maintain themselves.
              </p>
              <div className="flex flex-wrap gap-2">
                <Link
                  className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 font-medium text-sm transition-colors duration-200 hover:border-foreground/20 hover:bg-accent/50"
                  href="/contact"
                >
                  Get in touch
                </Link>
                <a
                  className="group inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 font-medium text-sm transition-colors duration-200 hover:border-foreground/20 hover:bg-accent/50"
                  href="https://bv-q-club.de"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  See it live
                  <ExternalLink className="h-3.5 w-3.5 text-muted-foreground transition-colors duration-200 group-hover:text-foreground" />
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
