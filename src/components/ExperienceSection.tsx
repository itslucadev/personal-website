"use client";

import { motion } from "framer-motion";
import {
  Briefcase,
  Calendar,
  ExternalLink,
  GraduationCap,
  MapPin,
} from "lucide-react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";

const experiences = [
  {
    title: "Freelance Software Engineer",
    company: "Freelance",
    url: null,
    period: "Apr 2025 - Present",
    duration: "10 mos",
    location: "Remote",
    skills: [
      "React Native",
      "Custom Software",
      "Personal Assistance",
      "Artificial Intelligence (AI)",
    ],
  },
  {
    title: "Werkstudent",
    company: "DATEV eG",
    url: "https://www.datev.de",
    logo: "/experience/logo-datev.svg",
    type: "Work Study",
    period: "Jun 2021 - Apr 2025",
    duration: "3 yrs 11 mos",
    location: "Nuremberg, Bavaria, Germany",
    skills: [
      "React Native",
      "SwiftUI",
      "Swift",
      "iOS Development",
      "Mobile Application Development",
      "Android Development",
    ],
  },
];

export function ExperienceSection() {
  return (
    <section className="px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-3xl">
        {/* Section Header */}
        <motion.h2
          animate={{ opacity: 1, y: 0 }}
          className="mb-2 font-medium text-muted-foreground text-xs uppercase tracking-wider"
          initial={{ opacity: 0, y: 20 }}
          transition={{
            duration: 0.5,
            delay: 0.45,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
        >
          Experience
        </motion.h2>

        {/* Description */}
        <motion.p
          animate={{ opacity: 1, y: 0 }}
          className="mb-5 text-foreground text-sm"
          initial={{ opacity: 0, y: 20 }}
          transition={{
            duration: 0.5,
            delay: 0.48,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
        >
          My professional journey and work experience:
        </motion.p>

        {/* Experience List */}
        <div className="space-y-4">
          {experiences.map((experience, index) => (
            <motion.div
              animate={{ opacity: 1, y: 0 }}
              className="rounded-lg border border-border bg-card p-4 transition-colors hover:bg-accent/50"
              initial={{ opacity: 0, y: 20 }}
              key={experience.title + experience.company}
              transition={{
                duration: 0.5,
                delay: 0.5 + index * 0.1,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
            >
              <div className="flex items-start gap-3">
                <div className="mt-0.5">
                  {experience.logo ? (
                    <Image
                      alt={experience.company}
                      className="h-4 w-4 rounded-sm object-contain"
                      height={16}
                      src={experience.logo}
                      width={16}
                    />
                  ) : (
                    <Briefcase className="h-4 w-4 text-muted-foreground" />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold text-foreground text-sm">
                    {experience.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {experience.url ? (
                      <a
                        className="group inline-flex items-center gap-1 transition-colors hover:text-foreground"
                        href={experience.url}
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        {experience.company}
                        <ExternalLink className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
                      </a>
                    ) : (
                      experience.company
                    )}
                    {experience.type && (
                      <span className="text-muted-foreground">
                        {" "}
                        · {experience.type}
                      </span>
                    )}
                  </p>
                  <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-muted-foreground text-xs">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {experience.period} · {experience.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {experience.location}
                    </span>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {experience.skills.map((skill) => (
                      <Badge
                        className="h-5 bg-secondary/50 px-1.5 py-0 font-normal text-[10px]"
                        key={skill}
                        variant="secondary"
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
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 border-border border-t pt-6"
          initial={{ opacity: 0, y: 20 }}
          transition={{
            duration: 0.5,
            delay: 0.9,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
        >
          <h3 className="mb-4 font-medium text-muted-foreground text-xs uppercase tracking-wider">
            Qualifications
          </h3>
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="rounded-lg border border-border bg-card p-4 transition-colors hover:bg-accent/50"
            initial={{ opacity: 0, y: 20 }}
            transition={{
              duration: 0.5,
              delay: 0.95,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          >
            <div className="flex items-start gap-3">
              <Image
                alt="FAU"
                className="mt-0.5 h-4 w-4 rounded-sm object-contain"
                height={16}
                src="/experience/logo-fau.jpeg"
                width={16}
              />
              <div className="min-w-0 flex-1">
                <h4 className="font-semibold text-foreground text-sm">
                  <a
                    className="group inline-flex items-center gap-1 transition-colors hover:text-foreground"
                    href="https://www.fau.de"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    FAU Universität Erlangen-Nürnberg
                    <ExternalLink className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
                  </a>
                </h4>
                <p className="text-muted-foreground text-sm">
                  Bachelor of Science - BS, Computer Science
                </p>
                <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-muted-foreground text-xs">
                  <span className="flex items-center gap-1">
                    <GraduationCap className="h-3 w-3" />
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
