'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Briefcase, MapPin, Calendar, ExternalLink, GraduationCap } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const experiences = [
  {
    title: 'Freelance Software Engineer',
    company: 'Freelance',
    url: null,
    period: 'Apr 2025 - Present',
    duration: '10 mos',
    location: 'Remote',
    skills: ['React Native', 'Custom Software', 'Personal Assistance', 'Artificial Intelligence (AI)'],
  },
  {
    title: 'Werkstudent',
    company: 'DATEV eG',
    url: 'https://www.datev.de',
    logo: '/experience/logo-datev.svg',
    type: 'Work Study',
    period: 'Jun 2021 - Apr 2025',
    duration: '3 yrs 11 mos',
    location: 'Nuremberg, Bavaria, Germany',
    skills: ['React Native', 'SwiftUI', 'Swift', 'iOS Development', 'Mobile Application Development', 'Android Development'],
  },
];

export function ExperienceSection() {
  return (
    <section className="py-10 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        {/* Section Header */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: 0.45,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2"
        >
          Experience
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: 0.48,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          className="text-sm text-foreground mb-5"
        >
          My professional journey and work experience:
        </motion.p>

        {/* Experience List */}
        <div className="space-y-4">
          {experiences.map((experience, index) => (
            <motion.div
              key={experience.title + experience.company}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: 0.5 + index * 0.1,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className="border border-border rounded-lg p-4 bg-card hover:bg-accent/50 transition-colors"
            >
              <div className="flex items-start gap-3">
                <div className="mt-0.5">
                  {experience.logo ? (
                    <Image
                      src={experience.logo}
                      alt={experience.company}
                      width={16}
                      height={16}
                      className="w-4 h-4 object-contain rounded-sm"
                    />
                  ) : (
                    <Briefcase className="w-4 h-4 text-muted-foreground" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold text-foreground">
                    {experience.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {experience.url ? (
                      <a
                        href={experience.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 hover:text-foreground transition-colors group"
                      >
                        {experience.company}
                        <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </a>
                    ) : (
                      experience.company
                    )}
                    {experience.type && (
                      <span className="text-muted-foreground"> · {experience.type}</span>
                    )}
                  </p>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1.5 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {experience.period} · {experience.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {experience.location}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {experience.skills.map((skill) => (
                      <Badge
                        key={skill}
                        variant="secondary"
                        className="text-[10px] px-1.5 py-0 h-5 font-normal bg-secondary/50"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Qualifications Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: 0.9,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          className="mt-6 pt-6 border-t border-border"
        >
          <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-4">
            Qualifications
          </h3>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: 0.95,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            className="border border-border rounded-lg p-4 bg-card hover:bg-accent/50 transition-colors"
          >
            <div className="flex items-start gap-3">
              <Image
                src="/experience/logo-fau.jpeg"
                alt="FAU"
                width={16}
                height={16}
                className="w-4 h-4 object-contain mt-0.5 rounded-sm"
              />
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-semibold text-foreground">
                  <a
                    href="https://www.fau.de"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 hover:text-foreground transition-colors group"
                  >
                    FAU Universität Erlangen-Nürnberg
                    <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </h4>
                <p className="text-sm text-muted-foreground">
                  Bachelor of Science - BS, Computer Science
                </p>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1.5 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <GraduationCap className="w-3 h-3" />
                    Graduated February 2026
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
