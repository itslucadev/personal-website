'use client';

import { motion } from 'framer-motion';
import { homeCascade } from '@/lib/home-cascade';
import { SocialBadge } from './SocialBadge';

const cascade = homeCascade('social');

const socialLinks = [
  { platform: 'GitHub', url: 'https://github.com/phoenix-error' },
  { platform: 'X/Twitter', url: 'https://twitter.com/phoenixdevluca' },
  { platform: 'LinkedIn', url: 'https://www.linkedin.com/in/luca-becker-10a736231/' },
];

export function SocialSection() {
  return (
    <section className="py-10 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        {/* Section Header */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: cascade.header,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2"
        >
          Find me on
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: cascade.description,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          className="text-sm text-foreground mb-5"
        >
          You can find me on the following social platforms:
        </motion.p>

        {/* Social Badges */}
        <div className="flex flex-wrap gap-2">
          {socialLinks.map((link, index) => (
            <SocialBadge
              key={link.platform}
              platform={link.platform}
              url={link.url}
              index={index}
              baseDelay={cascade.body}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
