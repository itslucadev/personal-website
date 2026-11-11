'use client';

import { motion } from 'framer-motion';
import { Briefcase, Calendar, ExternalLink, MapPin } from 'lucide-react';
import Image from 'next/image';

import { CaseStudyLayout } from '@/components/PageLayout';
import { useI18n } from '@/i18n/I18nProvider';
import { ease } from '@/lib/motion';

const stack = ['Next.js', 'TypeScript', 'Sanity CMS', 'Tailwind CSS', 'Framer Motion', 'Vercel', 'Cuescore API'];

const shots = [
  { src: '/clients/bv-q-club-tournaments.webp', alt: 'tournamentsAlt', caption: 'tournamentsCaption' },
  { src: '/clients/bv-q-club-membership.webp', alt: 'membershipAlt', caption: 'membershipCaption' },
] as const;

export function ClientPageBvqClub() {
  const { dict, lang } = useI18n();
  const t = dict.bvq;
  const meta = [
    { icon: Briefcase, label: t.role },
    { icon: Calendar, label: '2026' },
    { icon: MapPin, label: t.location },
  ];

  return (
    <CaseStudyLayout
      backHref={`/${lang}#client-work`}
      backLabel={dict.caseStudy.backToClientWork}
      description={t.description}
      header={
        <>
          <Image
            alt={t.crestAlt}
            className="h-10 w-10 rounded-md object-contain"
            height={40}
            src="/clients/logo-bv-q-club.png"
            width={40}
          />
          <div>
            <h1 className="text-2xl font-bold leading-tight tracking-tight sm:text-[28px]">
              BV Q-Club <span className="text-amber-600">e.V.</span>
            </h1>
            <p className="text-xs text-muted-foreground">Poolbillard-Verein Fürth</p>
          </div>
        </>
      }
      headerClassName="flex items-center gap-3"
      meta={meta}
      stack={stack}
    >
      <motion.a
        animate={{ opacity: 1, y: 0 }}
        className="group mb-10 inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium transition-colors duration-200 hover:border-foreground/20 hover:bg-accent/50"
        href="https://bv-q-club.de"
        initial={{ opacity: 0, y: 20 }}
        rel="noopener noreferrer"
        target="_blank"
        transition={{ duration: 0.5, delay: 0.4, ease }}
      >
        {t.visit}
        <ExternalLink className="h-3.5 w-3.5 text-muted-foreground transition-colors duration-200 group-hover:text-foreground" />
      </motion.a>

      <motion.figure
        animate={{ opacity: 1, y: 0 }}
        className="mb-4 overflow-hidden rounded-lg border border-border"
        initial={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.5, delay: 0.45, ease }}
      >
        <Image
          alt={t.heroAlt}
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
                alt={t[shot.alt]}
                className="h-auto w-full"
                height={900}
                sizes="(max-width: 640px) 100vw, 376px"
                src={shot.src}
                width={1440}
              />
            </div>
            <figcaption className="mt-2 text-xs text-muted-foreground">{t[shot.caption]}</figcaption>
          </motion.figure>
        ))}
      </div>
    </CaseStudyLayout>
  );
}
