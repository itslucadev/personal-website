import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

const FOCUS =
  "rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-600 focus-visible:ring-offset-2";

const STACK =
  "TypeScript, React, React Native, Expo, Next.js, Swift, SwiftUI, Tailwind CSS, shadcn/ui, TanStack, Zustand, Convex, Clerk, WorkOS, Stripe, RevenueCat, AI SDK, Turborepo, Git, Figma.";

function Ext({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      className={cn("font-medium text-foreground hover:underline", FOCUS)}
      href={href}
      rel="noopener noreferrer"
      target="_blank"
    >
      {children}
    </a>
  );
}

export function About() {
  return (
    <section
      aria-labelledby="about-heading"
      className="scroll-mt-24"
      id="about"
    >
      <h2
        className="mb-6 font-mono text-[11px] text-muted-foreground uppercase tracking-[0.12em]"
        id="about-heading"
      >
        About
      </h2>
      <div className="space-y-5 font-sans text-base text-muted-foreground">
        <p>
          I&apos;m a fullstack developer in{" "}
          <span className="font-medium text-foreground">Fürth</span>, near{" "}
          <span className="font-medium text-foreground">Nuremberg</span>. I
          build native <span className="font-medium text-foreground">Mac</span>{" "}
          tools and web apps for small teams, and I like the part where the
          thing actually ships. Before going freelance in 2025 I spent four
          years at <Ext href="https://www.datev.de">DATEV</Ext> as a working
          student on mobile apps in{" "}
          <span className="font-medium text-foreground">React Native</span> and{" "}
          <span className="font-medium text-foreground">Swift</span>, alongside
          a computer science degree at{" "}
          <Ext href="https://www.fau.de">FAU Erlangen-Nürnberg</Ext>, finished
          in February 2026.
        </p>
        <p>
          Right now that means{" "}
          <a
            className={cn("font-medium text-foreground hover:underline", FOCUS)}
            href="#agent-notch"
          >
            Agent Notch
          </a>
          , a <span className="font-medium text-foreground">macOS</span> app
          that shows your{" "}
          <span className="font-medium text-foreground">Claude</span>,{" "}
          <span className="font-medium text-foreground">Cursor</span> and{" "}
          <span className="font-medium text-foreground">Codex</span> limits in
          the notch, and client work in{" "}
          <span className="font-medium text-foreground">Next.js</span> and{" "}
          <span className="font-medium text-foreground">React Native</span>. If
          you have a small product that needs building properly,{" "}
          <Ext href="https://cal.eu/lucabecker">book a call</Ext>.
        </p>
      </div>
      <p className="mt-8 font-sans text-base text-muted-foreground">
        <span className="font-mono text-[11px] uppercase tracking-[0.12em]">
          Stack
        </span>{" "}
        {STACK}
      </p>
    </section>
  );
}
