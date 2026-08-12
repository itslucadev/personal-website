'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const skills = [
  { name: 'TypeScript', icon: '/tech/logo-typescript.svg', url: 'https://www.typescriptlang.org' },
  { name: 'JavaScript', icon: '/tech/logo-javascript.svg', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript' },
  { name: 'React', icon: '/tech/logo-react.svg', url: 'https://react.dev' },
  { name: 'React Native', icon: '/tech/logo-react-native.svg', url: 'https://reactnative.dev' },
  { name: 'React Native Reusables', icon: '/tech/logo-react-native-reusables.svg', url: 'https://rnr-docs.vercel.app/' },
  { name: 'Uniwind', icon: '/tech/logo-uniwind.svg', url: 'https://uniwind.dev/' },
  { name: 'Next.js', icon: '/tech/logo-nextjs.svg', url: 'https://nextjs.org' },
  { name: 'Expo', icon: '/tech/logo-expo.svg', url: 'https://expo.dev' },
  { name: 'Tailwind CSS', icon: '/tech/logo-tailwind.svg', url: 'https://tailwindcss.com' },
  { name: 'shadcn/ui', icon: '/tech/logo-shadcn-ui.svg', url: 'https://ui.shadcn.com' },
  { name: 'TanStack', icon: '/tech/logo-tanstack.svg', url: 'https://tanstack.com' },
  { name: 'Zustand', icon: '/tech/logo-zustand.svg', url: 'https://zustand-demo.pmnd.rs/' },
  { name: 'RevenueCat', icon: '/tech/logo-revenuecat.svg', url: 'https://www.revenuecat.com' },
  { name: 'Stripe', icon: '/tech/logo-stripe.svg', url: 'https://stripe.com' },
  { name: 'Convex', icon: '/tech/logo-convex.svg', url: 'https://www.convex.dev' },
  { name: 'Clerk', icon: '/tech/logo-clerk.svg', url: 'https://clerk.com' },
  { name: 'WorkOS', icon: '/tech/logo-workos.svg', url: 'https://workos.com' },
  { name: 'AI SDK', icon: '/tech/logo-ai-sdk.svg', url: 'https://sdk.vercel.ai' },
  { name: 'ChatGPT', icon: '/tech/logo-chatgpt.svg', url: 'https://openai.com/chatgpt' },
  { name: 'Claude', icon: '/tech/logo-claude:claude-code.svg', url: 'https://claude.ai' },
  { name: 'Turborepo', icon: '/tech/logo-turborepo.svg', url: 'https://turbo.build' },
  { name: 'Git', icon: '/tech/logo-git.svg', url: 'https://git-scm.com' },
  { name: 'Figma', icon: '/tech/logo-figma.svg', url: 'https://www.figma.com' },
];

export function SkillsSection() {
  return (
    <section className="py-10 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        {/* Section Header */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: 0.78,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2"
        >
          Skills
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: 0.81,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          className="text-sm text-foreground mb-5"
        >
          Here are the frameworks, libraries, services and runtimes I have experience with. This is not a complete list! I'm constantly gaining new skills, and hence it can be a little bit outdated.
        </motion.p>

        {/* Skills Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: 0.84,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          className="grid grid-cols-5 sm:grid-cols-6 gap-3"
        >
          {skills.map((skill, index) => {
            const content = (
              <>
                <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-lg border border-border bg-card p-2 transition-colors group-hover:bg-accent/50 group-hover:border-foreground/20">
                  <Image
                    src={skill.icon}
                    alt={skill.name}
                    width={48}
                    height={48}
                    className="w-full h-full object-contain"
                  />
                </div>
                <span className="text-[10px] text-muted-foreground text-center leading-tight">
                  {skill.name}
                </span>
              </>
            );

            return (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.4,
                  delay: 0.88 + index * 0.03,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                whileHover={{ scale: 1.1, y: -2 }}
                className="flex flex-col items-center gap-1.5 group"
              >
                {skill.url ? (
                  <a
                    href={skill.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center gap-1.5"
                  >
                    {content}
                  </a>
                ) : (
                  content
                )}
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
