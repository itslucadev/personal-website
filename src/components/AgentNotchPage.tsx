'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { Download, Eye, Github, KeyRound, Laptop, MousePointerClick, Move } from 'lucide-react';
import Image from 'next/image';

import { CaseStudyLayout } from '@/components/PageLayout';
import { Button } from '@/components/ui/button';
import { useI18n } from '@/i18n/I18nProvider';
import { ease } from '@/lib/motion';

export const agentNotchDownloadUrl = 'https://lucabecker.dev/agent-notch/AgentNotch.zip';
export const agentNotchRepoUrl = 'https://github.com/itslucadev/AgentNotch';

const stack = ['Swift', 'SwiftUI', 'AppKit', 'Sparkle'];

const heroPoster = '/projects/agent-notch/hero-poster.webp';
const heroVideo = '/projects/agent-notch/hero.mp4';
const features = [
  { key: 'rings', icon: Eye },
  { key: 'hover', icon: MousePointerClick },
  { key: 'signIn', icon: KeyRound },
  { key: 'position', icon: Move },
] as const;

export function AgentNotchPage() {
  const reducedMotion = Boolean(useReducedMotion());
  const { dict, lang } = useI18n();
  const t = dict.agentNotch;
  const meta = [
    { icon: Laptop, label: t.requirement },
    { icon: KeyRound, label: t.free },
  ];

  return (
    <CaseStudyLayout
      backHref={`/${lang}#projects`}
      backLabel={dict.caseStudy.backToProjects}
      description={t.description}
      header={
        <>
          <h1 className="text-2xl font-bold leading-tight tracking-tight sm:text-[28px]">
            Agent <span className="text-amber-600">Notch</span>
          </h1>
          <p className="text-xs text-muted-foreground">{t.tagline}</p>
        </>
      }
      meta={meta}
      stack={stack}
    >
      <motion.div
        animate={{ opacity: 1, y: 0 }}
        className="mb-2 flex flex-wrap items-center gap-3"
        initial={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.5, delay: 0.4, ease }}
      >
        <Button asChild>
          <a href={agentNotchDownloadUrl}>
            <Download />
            {t.download}
          </a>
        </Button>
        <Button asChild variant="outline">
          <a href={agentNotchRepoUrl} rel="noopener noreferrer" target="_blank">
            <Github />
            {t.github}
          </a>
        </Button>
      </motion.div>

      <motion.p
        animate={{ opacity: 1, y: 0 }}
        className="mb-10 text-xs text-muted-foreground"
        initial={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.5, delay: 0.42, ease }}
      >
        {t.notarized}
      </motion.p>

      <motion.figure
        animate={{ opacity: 1, y: 0 }}
        className="relative mb-4 aspect-[16/10] overflow-hidden rounded-lg border border-border bg-muted"
        initial={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.5, delay: 0.45, ease }}
      >
        {reducedMotion ? (
          <Image
            alt={t.heroAlt}
            className="object-cover"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 540px"
            src={heroPoster}
          />
        ) : (
          <video
            aria-label={t.heroAlt}
            autoPlay
            className="absolute inset-0 h-full w-full object-cover"
            loop
            muted
            playsInline
            poster={heroPoster}
            preload="metadata"
            src={heroVideo}
          />
        )}
      </motion.figure>
      <motion.p
        animate={{ opacity: 1, y: 0 }}
        className="mb-10 text-xs text-muted-foreground"
        initial={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.5, delay: 0.5, ease }}
      >
        {t.heroCaption}
      </motion.p>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {features.map(({ key, icon: Icon }, index) => (
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="rounded-lg border border-border bg-card p-4"
            initial={{ opacity: 0, y: 20 }}
            key={key}
            transition={{
              duration: 0.5,
              delay: 0.55 + index * 0.05,
              ease,
            }}
          >
            <div className="mb-2 flex items-center gap-2">
              <Icon className="h-3.5 w-3.5 text-amber-600" />
              <h2 className="text-sm font-medium">{t.features[key].title}</h2>
            </div>
            <p className="text-xs leading-relaxed text-muted-foreground">{t.features[key].body}</p>
          </motion.div>
        ))}
      </div>

      <motion.p
        animate={{ opacity: 1, y: 0 }}
        className="mt-8 text-xs leading-relaxed text-muted-foreground"
        initial={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.5, delay: 0.8, ease }}
      >
        {t.note}{' '}
        <a
          className="link-underline text-foreground"
          href="https://x.com/hivinz_"
          rel="noopener noreferrer"
          target="_blank"
        >
          Codenotch
        </a>{' '}
        {t.credit}
      </motion.p>
    </CaseStudyLayout>
  );
}
