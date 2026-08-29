"use client";

import { motion } from "framer-motion";
import { homeCascade } from "@/lib/home-cascade";
import { SocialBadge } from "./SocialBadge";

const cascade = homeCascade("social");

const socialLinks = [
  { platform: "GitHub", url: "https://github.com/itslucadev" },
  { platform: "X/Twitter", url: "https://x.com/itslucadev" },
  {
    platform: "LinkedIn",
    url: "https://www.linkedin.com/in/luca-becker-10a736231/",
  },
];

export function SocialSection() {
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
            delay: cascade.header,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
        >
          Find me on
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
          You can find me on the following social platforms:
        </motion.p>

        {/* Social Badges */}
        <div className="flex flex-wrap gap-2">
          {socialLinks.map((link, index) => (
            <SocialBadge
              baseDelay={cascade.body}
              index={index}
              key={link.platform}
              platform={link.platform}
              url={link.url}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
