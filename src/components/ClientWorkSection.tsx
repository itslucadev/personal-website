"use client";

import { motion } from "framer-motion";
import { homeCascade } from "@/lib/home-cascade";
import { ProjectCard } from "./ProjectCard";

const cascade = homeCascade("clientWork");

const clientWork = [
  {
    title: "BV Q-Club e.V.",
    description:
      "Designed and built the website and Sanity CMS for Fürth's pool billiard club - the board publishes updates itself, and tournament results sync in from Cuescore.",
    status: "Live" as const,
    link: "/work/bv-q-club",
    logo: "/clients/logo-bv-q-club.png",
  },
];

export function ClientWorkSection() {
  return (
    <section className="scroll-mt-6 px-4 py-10 sm:px-6" id="client-work">
      <div className="mx-auto max-w-3xl">
        {/* Section Header */}
        <motion.h2
          animate={{ opacity: 1, y: 0 }}
          className="mb-2 font-medium text-muted-foreground text-xs uppercase tracking-wider"
          initial={{ opacity: 0, y: 20 }}
          transition={{
            duration: 0.5,
            delay: cascade.header,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
        >
          Client Work
        </motion.h2>

        {/* Description */}
        <motion.p
          animate={{ opacity: 1, y: 0 }}
          className="mb-5 text-foreground text-sm"
          initial={{ opacity: 0, y: 20 }}
          transition={{
            duration: 0.5,
            delay: cascade.description,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
        >
          Selected projects I&apos;ve built for clients:
        </motion.p>

        {/* Client Work Grid - a lone project spans the full width */}
        <div
          className={`grid gap-4 ${clientWork.length === 1 ? "grid-cols-1" : "grid-cols-1 sm:grid-cols-2"}`}
        >
          {clientWork.map((project, index) => (
            <ProjectCard
              baseDelay={cascade.body}
              description={project.description}
              index={index}
              key={project.title}
              link={project.link}
              logo={project.logo}
              status={project.status}
              title={project.title}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
