"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { homeCascade } from "@/lib/home-cascade";

const cascade = homeCascade("skills");

const skills = [
  {
    name: "TypeScript",
    icon: "/tech/logo-typescript.svg",
    url: "https://www.typescriptlang.org",
  },
  {
    name: "JavaScript",
    icon: "/tech/logo-javascript.svg",
    url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
  },
  { name: "React", icon: "/tech/logo-react.svg", url: "https://react.dev" },
  {
    name: "React Native",
    icon: "/tech/logo-react-native.svg",
    url: "https://reactnative.dev",
  },
  {
    name: "React Native Reusables",
    icon: "/tech/logo-react-native-reusables.svg",
    url: "https://rnr-docs.vercel.app/",
  },
  {
    name: "Uniwind",
    icon: "/tech/logo-uniwind.svg",
    url: "https://uniwind.dev/",
  },
  { name: "Next.js", icon: "/tech/logo-nextjs.svg", url: "https://nextjs.org" },
  { name: "Expo", icon: "/tech/logo-expo.svg", url: "https://expo.dev" },
  {
    name: "Tailwind CSS",
    icon: "/tech/logo-tailwind.svg",
    url: "https://tailwindcss.com",
  },
  {
    name: "shadcn/ui",
    icon: "/tech/logo-shadcn-ui.svg",
    url: "https://ui.shadcn.com",
  },
  {
    name: "TanStack",
    icon: "/tech/logo-tanstack.svg",
    url: "https://tanstack.com",
  },
  {
    name: "Zustand",
    icon: "/tech/logo-zustand.svg",
    url: "https://zustand-demo.pmnd.rs/",
  },
  {
    name: "RevenueCat",
    icon: "/tech/logo-revenuecat.svg",
    url: "https://www.revenuecat.com",
  },
  { name: "Stripe", icon: "/tech/logo-stripe.svg", url: "https://stripe.com" },
  {
    name: "Convex",
    icon: "/tech/logo-convex.svg",
    url: "https://www.convex.dev",
  },
  { name: "Clerk", icon: "/tech/logo-clerk.svg", url: "https://clerk.com" },
  { name: "WorkOS", icon: "/tech/logo-workos.svg", url: "https://workos.com" },
  {
    name: "AI SDK",
    icon: "/tech/logo-ai-sdk.svg",
    url: "https://sdk.vercel.ai",
  },
  {
    name: "ChatGPT",
    icon: "/tech/logo-chatgpt.svg",
    url: "https://openai.com/chatgpt",
  },
  {
    name: "Claude",
    icon: "/tech/logo-claude:claude-code.svg",
    url: "https://claude.ai",
  },
  {
    name: "Turborepo",
    icon: "/tech/logo-turborepo.svg",
    url: "https://turbo.build",
  },
  { name: "Git", icon: "/tech/logo-git.svg", url: "https://git-scm.com" },
  { name: "Figma", icon: "/tech/logo-figma.svg", url: "https://www.figma.com" },
];

export function SkillsSection() {
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
          Skills
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
          Here are the frameworks, libraries, services and runtimes I have
          experience with. This is not a complete list! I'm constantly gaining
          new skills, and hence it can be a little bit outdated.
        </motion.p>

        {/* Skills Grid */}
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-5 gap-3 sm:grid-cols-6"
          initial={{ opacity: 0, y: 20 }}
          transition={{
            duration: 0.5,
            delay: cascade.body,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
        >
          {skills.map((skill, index) => {
            const content = (
              <>
                <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-card p-2 transition-colors group-hover:border-foreground/20 group-hover:bg-accent/50 sm:h-12 sm:w-12">
                  <Image
                    alt={skill.name}
                    className="h-full w-full object-contain"
                    height={48}
                    src={skill.icon}
                    width={48}
                  />
                </div>
                <span className="text-center text-[10px] text-muted-foreground leading-tight">
                  {skill.name}
                </span>
              </>
            );

            return (
              <motion.div
                animate={{ opacity: 1, scale: 1 }}
                className="group flex flex-col items-center gap-1.5"
                initial={{ opacity: 0, scale: 0.9 }}
                key={skill.name}
                transition={{
                  duration: 0.4,
                  delay: cascade.item(index),
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                whileHover={{ scale: 1.1, y: -2 }}
              >
                {skill.url ? (
                  <a
                    className="flex flex-col items-center gap-1.5"
                    href={skill.url}
                    rel="noopener noreferrer"
                    target="_blank"
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
