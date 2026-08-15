"use client";

import { motion } from "framer-motion";

interface SocialBadgeProps {
  /** Stagger offset so badges slot into the section's place in the page cascade. */
  baseDelay: number;
  index: number;
  platform: string;
  url: string;
}

const iconMap: Record<string, string> = {
  GitHub: "/socials/logo-github.svg",
  "X/Twitter": "/socials/logo-x:twitter.svg",
  LinkedIn: "/socials/logo-linkedin.svg",
};

export function SocialBadge({
  platform,
  url,
  index,
  baseDelay,
}: SocialBadgeProps) {
  const iconSrc = iconMap[platform];

  return (
    <motion.a
      animate={{ opacity: 1, y: 0 }}
      className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-1.5 text-foreground text-sm transition-colors duration-200 hover:bg-secondary"
      href={url}
      initial={{ opacity: 0, y: 20 }}
      rel="noopener noreferrer"
      target="_blank"
      transition={{
        duration: 0.5,
        delay: baseDelay + index * 0.05,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {iconSrc && (
        <img alt={platform} className="h-4 w-4 object-contain" src={iconSrc} />
      )}
      <span>{platform}</span>
    </motion.a>
  );
}
