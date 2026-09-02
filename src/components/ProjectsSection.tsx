"use client";

import { motion } from "framer-motion";
import { homeCascade } from "@/lib/home-cascade";
import { ProjectCard } from "./ProjectCard";

const cascade = homeCascade("projects");

const projects = [
  {
    title: "Agent Notch",
    description:
      "Native macOS side notch that shows your Claude, Cursor and Codex usage limits as rings, with reset times and live sessions on hover.",
    status: "Active" as const,
    link: "/agent-notch",
  },
  {
    title: "GridVote F1",
    description:
      "Social Formula 1 prediction game focused on competition, seasons, and friends.",
    status: "In Development" as const,
    link: "#",
  },
  {
    title: "BilliardRank",
    description:
      "Ranking and competition management system for billiard players and clubs.",
    status: "In Development" as const,
    link: "#",
    logo: "/projects/logo-billiardrank.png",
  },
  {
    title: "MinimaFinance",
    description:
      "Monitor your finances with ease. Track daily spending with intuitive grid charts, custom categories, and bill reminders — all with privacy-first local storage.",
    status: "Active" as const,
    link: "https://minimafinance.app",
    logo: "/projects/logo-minimafinance.svg",
  },
];

export function ProjectsSection() {
  return (
    <section className="scroll-mt-6 px-4 py-10 sm:px-6" id="projects">
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
          Projects
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
          These are my personal projects, both past and ongoing:
        </motion.p>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {projects.map((project, index) => (
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
