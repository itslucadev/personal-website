'use client';

import { motion } from 'framer-motion';
import { ProjectCard } from './ProjectCard';

const clientWork = [
  {
    title: 'BV Q-Club e.V.',
    description:
      "Designed and built the website and Sanity CMS for Fürth's pool billiard club - the board publishes updates itself, and tournament results sync in from Cuescore.",
    status: 'Live' as const,
    link: '/work/bv-q-club',
    logo: '/clients/logo-bv-q-club.png',
  },
];

export function ClientWorkSection() {
  return (
    <section id="client-work" className="scroll-mt-6 py-10 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        {/* Section Header */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: 0.66,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2"
        >
          Client Work
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: 0.69,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          className="text-sm text-foreground mb-5"
        >
          Selected projects I&apos;ve built for clients:
        </motion.p>

        {/* Client Work Grid - a lone project spans the full width */}
        <div
          className={`grid gap-4 ${clientWork.length === 1 ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-2'}`}
        >
          {clientWork.map((project, index) => (
            <ProjectCard
              key={project.title}
              title={project.title}
              description={project.description}
              status={project.status}
              link={project.link}
              logo={project.logo}
              index={index}
              baseDelay={0.72}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
