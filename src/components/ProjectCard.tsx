'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Folder, ExternalLink, ArrowRight } from 'lucide-react';

interface ProjectCardProps {
  title: string;
  description: string;
  status: 'In Development' | 'Active' | 'Ongoing' | 'Sold' | 'Live';
  link?: string;
  logo?: string;
  index: number;
  /** Stagger offset so cards slot into the section's place in the page cascade. */
  baseDelay: number;
}

const statusStyles = {
  'In Development': {
    bg: 'bg-gradient-to-r from-blue-500/20 to-cyan-400/20',
    text: 'text-blue-700 dark:text-blue-300',
    border: 'border-blue-400/30',
  },
  'Active': {
    bg: 'bg-gradient-to-r from-emerald-500/20 to-green-400/20',
    text: 'text-emerald-700 dark:text-emerald-300',
    border: 'border-emerald-400/30',
  },
  'Ongoing': {
    bg: 'bg-gradient-to-r from-amber-500/20 to-orange-400/20',
    text: 'text-amber-700 dark:text-amber-300',
    border: 'border-amber-400/30',
  },
  'Sold': {
    bg: 'bg-gradient-to-r from-amber-500/20 to-orange-400/20',
    text: 'text-amber-700 dark:text-amber-300',
    border: 'border-amber-400/30',
  },
  'Live': {
    bg: 'bg-gradient-to-r from-emerald-500/20 to-green-400/20',
    text: 'text-emerald-700 dark:text-emerald-300',
    border: 'border-emerald-400/30',
  },
};

export function ProjectCard({
  title,
  description,
  status,
  link,
  logo,
  index,
  baseDelay,
}: ProjectCardProps) {
  const statusStyle = statusStyles[status];
  const href = link && link !== '#' ? link : undefined;
  const isInternal = href?.startsWith('/') ?? false;

  const CardContent = (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: baseDelay + index * 0.05,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      whileHover={{ y: -2 }}
      className={`group relative h-full p-5 border border-border rounded-lg bg-card hover:border-foreground/20 transition-colors duration-200 ${href ? 'cursor-pointer' : 'cursor-default'}`}
    >
      <div className="flex items-start gap-3 mb-2">
        {logo ? (
          <Image
            src={logo}
            /* Decorative: the title next to it already names the project. */
            alt=""
            width={20}
            height={20}
            className="w-5 h-5 object-contain flex-shrink-0 mt-0.5 rounded-md"
          />
        ) : (
          <Folder className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
        )}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-sm font-medium text-foreground">{title}</h3>
            <span
              className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium border ${statusStyle.bg} ${statusStyle.text} ${statusStyle.border}`}
            >
              <span className="flex items-center gap-0 group-hover:gap-1 transition-all duration-200">
                {status.toLowerCase()}
                {href &&
                  (isInternal ? (
                    <ArrowRight className="w-0 h-3 group-hover:w-3 opacity-0 group-hover:opacity-100 transition-all duration-200 overflow-hidden" />
                  ) : (
                    <ExternalLink className="w-0 h-3 group-hover:w-3 opacity-0 group-hover:opacity-100 transition-all duration-200 overflow-hidden" />
                  ))}
              </span>
            </span>
          </div>
        </div>
  
      </div>
      <p className="text-sm text-muted-foreground leading-relaxed pl-8">
        {description}
      </p>
    </motion.div>
  );

  if (!href) {
    return CardContent;
  }

  if (isInternal) {
    return (
      <Link href={href} className="block h-full">
        {CardContent}
      </Link>
    );
  }

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="block h-full">
      {CardContent}
    </a>
  );
}
