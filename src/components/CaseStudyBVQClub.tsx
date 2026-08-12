'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ExternalLink, Calendar, MapPin, Briefcase, Globe } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Logo } from '@/components/Logo';
import { Footer } from '@/components/Footer';

const ease = [0.25, 0.46, 0.45, 0.94] as const;

const meta = [
  { icon: Briefcase, label: 'Design & Development' },
  { icon: Calendar, label: '2026' },
  { icon: MapPin, label: 'Fürth, Germany' },
  { icon: Globe, label: 'German' },
];

const stack = [
  'Next.js',
  'TypeScript',
  'Sanity CMS',
  'Tailwind CSS',
  'Framer Motion',
  'Vercel',
  'Cuescore API',
];

const highlights = [
  {
    title: 'An editorial homepage, not a template',
    body: 'A display serif, a near-black palette with oxblood and gold, and a scroll-driven 8-ball that carries you from the hero into the club story. The club looks like a club, not like a page builder.',
  },
  {
    title: 'The board edits it, not me',
    body: 'Every section is modelled in Sanity: teams and leagues, membership tiers, gallery, downloads, and the legal pages. Volunteers update the site between seasons without touching code or waiting on a developer.',
  },
  {
    title: 'Tournament results sync themselves',
    body: 'The club already ran its tournaments on Cuescore. Rather than ask anyone to copy results across by hand, the site pulls schedule, entrants, and podium straight from there - so the results page is current the moment a tournament ends.',
  },
  {
    title: 'Built for a German e.V.',
    body: 'Impressum, Datenschutz, and Satzung are first-class pages, and the membership application is a downloadable PDF, which is how the club actually signs people up.',
  },
];

const shots = [
  {
    src: '/clients/bv-q-club-tournaments.webp',
    width: 1440,
    height: 900,
    alt: 'Tournament results section of bv-q-club.de, listing recent tournaments with podium placements pulled from Cuescore',
    caption: 'Results sync from Cuescore - no manual entry.',
  },
  {
    src: '/clients/bv-q-club-membership.webp',
    width: 1440,
    height: 900,
    alt: 'Membership section of bv-q-club.de showing four pricing tiers on a light background',
    caption: 'Four membership tiers, priced in plain language.',
  },
];

export function CaseStudyBVQClub() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Logo />

      <main className="flex-1">
        {/* Header */}
        <section className="pt-20 pb-8 px-4 sm:px-6">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15, ease }}
            >
              <Link
                href="/#client-work"
                className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors duration-200 mb-6 group"
              >
                <ArrowLeft className="w-3 h-3 group-hover:-translate-x-0.5 transition-transform duration-200" />
                Back to client work
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2, ease }}
              className="flex items-center gap-3 mb-3"
            >
              <Image
                src="/clients/logo-bv-q-club.png"
                alt="BV Q-Club e.V. crest"
                width={40}
                height={40}
                className="w-10 h-10 object-contain rounded-md"
              />
              <div>
                <h1 className="text-2xl sm:text-[28px] font-bold leading-tight tracking-tight">
                  BV Q-Club <span className="text-amber-600">e.V.</span>
                </h1>
                <p className="text-xs text-muted-foreground">
                  Poolbillard-Verein Fürth
                </p>
              </div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.28, ease }}
              className="text-sm text-foreground leading-relaxed mb-5"
            >
              Fürth&apos;s pool billiard club needed a website that could pull its
              weight: win over people thinking about walking in for a first game,
              and stay current without a webmaster on call. I designed and built
              it end to end - the site, the CMS behind it, and the automation that
              keeps its tournament results honest.
            </motion.p>

            {/* Meta row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.34, ease }}
              className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground mb-5"
            >
              {meta.map((item) => (
                <span key={item.label} className="flex items-center gap-1.5">
                  <item.icon className="w-3 h-3" />
                  {item.label}
                </span>
              ))}
            </motion.div>

            <motion.a
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4, ease }}
              href="https://bv-q-club.de"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border bg-card text-sm font-medium hover:border-foreground/20 hover:bg-accent/50 transition-colors duration-200 group"
            >
              Visit bv-q-club.de
              <ExternalLink className="w-3.5 h-3.5 text-muted-foreground group-hover:text-foreground transition-colors duration-200" />
            </motion.a>
          </div>
        </section>

        {/* Hero shot */}
        <section className="pb-10 px-4 sm:px-6">
          <div className="max-w-3xl mx-auto">
            <motion.figure
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.46, ease }}
              className="overflow-hidden rounded-lg border border-border bg-card"
            >
              <Image
                src="/clients/bv-q-club-hero.webp"
                alt="Homepage hero of bv-q-club.de: the words Q-CLUB FÜRTH set in a large display serif behind a rendered black 8-ball"
                width={1440}
                height={900}
                priority
                sizes="(max-width: 768px) 100vw, 768px"
                className="w-full h-auto"
              />
            </motion.figure>
          </div>
        </section>

        {/* The club */}
        <section className="py-10 px-4 sm:px-6">
          <div className="max-w-3xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, ease }}
              className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2"
            >
              The Client
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: 0.05, ease }}
              className="text-sm text-foreground leading-relaxed mb-5"
            >
              Founded in 2013 by nine players, the BV Q-Club is now one of the most
              active pool billiard clubs in the region: around 90 members, four
              teams in the Bavarian league system, and its own clubhouse on
              Kaiserstraße since 2019 - six Dynamic tournament tables across more
              than 200 m², open to members around the clock. Their motto,{' '}
              <span className="text-foreground font-medium">
                &ldquo;jeder kann, keiner muss&rdquo;
              </span>{' '}
              (everyone can, nobody has to), set the tone for the whole site.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: 0.1, ease }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-3"
            >
              {[
                { value: '6', label: 'Tournament tables' },
                { value: '90+', label: 'Members' },
                { value: '200+', label: 'm² clubhouse' },
                { value: '4', label: 'League teams' },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="border border-border rounded-lg bg-card p-4"
                >
                  <div className="text-xl font-bold text-foreground">
                    {stat.value}
                  </div>
                  <div className="text-[11px] text-muted-foreground leading-tight mt-0.5">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* What I built */}
        <section className="py-10 px-4 sm:px-6">
          <div className="max-w-3xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, ease }}
              className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2"
            >
              What I Built
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: 0.05, ease }}
              className="text-sm text-foreground mb-5"
            >
              Nine pages, one content model, and no dependency on me to keep it
              running:
            </motion.p>

            <div className="space-y-3">
              {highlights.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.5, delay: index * 0.06, ease }}
                  className="border border-border rounded-lg p-4 bg-card hover:bg-accent/50 transition-colors duration-200"
                >
                  <h3 className="text-sm font-semibold text-foreground mb-1.5">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.body}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Screens */}
        <section className="py-10 px-4 sm:px-6">
          <div className="max-w-3xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, ease }}
              className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-5"
            >
              A Closer Look
            </motion.h2>

            <div className="space-y-6">
              {shots.map((shot) => (
                <motion.figure
                  key={shot.src}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.6, ease }}
                >
                  <div className="overflow-hidden rounded-lg border border-border bg-card">
                    <Image
                      src={shot.src}
                      alt={shot.alt}
                      width={shot.width}
                      height={shot.height}
                      sizes="(max-width: 768px) 100vw, 768px"
                      className="w-full h-auto"
                    />
                  </div>
                  <figcaption className="text-xs text-muted-foreground mt-2">
                    {shot.caption}
                  </figcaption>
                </motion.figure>
              ))}

              {/* Mobile */}
              <motion.figure
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.6, ease }}
                className="flex flex-col items-center"
              >
                <div className="overflow-hidden rounded-xl border border-border bg-card max-w-[260px]">
                  <Image
                    src="/clients/bv-q-club-mobile.webp"
                    alt="bv-q-club.de homepage on a phone-sized viewport, with the display type and 8-ball hero reflowed to a single column"
                    width={780}
                    height={1317}
                    sizes="260px"
                    className="w-full h-auto"
                  />
                </div>
                <figcaption className="text-xs text-muted-foreground mt-2 text-center">
                  Most members find the club on a phone, so the layout was built
                  for that first.
                </figcaption>
              </motion.figure>
            </div>
          </div>
        </section>

        {/* Stack */}
        <section className="py-10 px-4 sm:px-6">
          <div className="max-w-3xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, ease }}
              className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2"
            >
              Stack
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: 0.05, ease }}
              className="flex flex-wrap gap-1.5"
            >
              {stack.map((tech) => (
                <Badge
                  key={tech}
                  variant="secondary"
                  className="text-[11px] px-2 py-0 h-6 font-normal bg-secondary/50"
                >
                  {tech}
                </Badge>
              ))}
            </motion.div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-10 px-4 sm:px-6">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, ease }}
              className="border border-border rounded-lg p-5 bg-card"
            >
              <h2 className="text-sm font-semibold text-foreground mb-1.5">
                Need something similar?
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                Clubs, associations, and small businesses that want a site with
                character - and one they can actually maintain themselves.
              </p>
              <div className="flex flex-wrap gap-2">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border text-sm font-medium hover:border-foreground/20 hover:bg-accent/50 transition-colors duration-200"
                >
                  Get in touch
                </Link>
                <a
                  href="https://bv-q-club.de"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border text-sm font-medium hover:border-foreground/20 hover:bg-accent/50 transition-colors duration-200 group"
                >
                  See it live
                  <ExternalLink className="w-3.5 h-3.5 text-muted-foreground group-hover:text-foreground transition-colors duration-200" />
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
