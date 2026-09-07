import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { GitHubContribution } from "./GitHubContribution";

const FOCUS =
  "rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-600 focus-visible:ring-offset-2";

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

function Strong({ children }: { children: ReactNode }) {
  return <span className="font-medium text-foreground">{children}</span>;
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
      <div className="max-w-[62ch] space-y-5 font-sans text-[17px] text-muted-foreground leading-relaxed">
        <p>
          I&apos;m a <Strong>mobile developer</Strong> based in{" "}
          <Strong>Nuremberg</Strong>, with enough fullstack experience to ship
          the whole thing: the app, the backend behind it, and the website that
          sells it. Most of my work is <Strong>React Native</Strong> and{" "}
          <Strong>Swift</Strong>, with <Strong>Next.js</Strong> when a project
          needs a web side.
        </p>
        <p>
          Before going freelance in 2025 I spent four years at{" "}
          <Ext href="https://www.datev.de">DATEV</Ext> as a working student,
          building mobile apps in React Native and Swift, alongside a computer
          science degree at{" "}
          <Ext href="https://www.fau.de">FAU Erlangen-Nürnberg</Ext> that I
          finished in February 2026.
        </p>
        <p>
          Right now that means{" "}
          <a
            className={cn("font-medium text-foreground hover:underline", FOCUS)}
            href="#agent-notch"
          >
            Agent Notch
          </a>
          , a macOS app that shows your Claude, Cursor and Codex limits in the
          notch,{" "}
          <a
            className={cn("font-medium text-foreground hover:underline", FOCUS)}
            href="#minimafinance"
          >
            MinimaFinance
          </a>{" "}
          on the App Store, and client work for businesses around Nuremberg. If
          you have a product that needs building properly,{" "}
          <Ext href="https://cal.eu/lucabecker">book a call</Ext>.
        </p>
      </div>
      <GitHubContribution />
    </section>
  );
}
