import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { GitHubActivity } from "./GitHubActivity";

const HREF = {
  x: "https://x.com/itslucadev",
  github: "https://www.github.com/itslucadev",
  instagram: "https://www.instagram.com/itslucadev",
  email: "mailto:luca.dev@outlook.de",
  call: "https://cal.eu/lucabecker",
} as const;

// Resolved once at module scope: the class list is static, so there is no
// reason to re-run tailwind-merge on every render.
const LINK_CLASS = cn(
  "inline-block font-medium text-foreground underline decoration-border",
  "transition-[color,text-decoration-color,transform] duration-200",
  "hover:-translate-y-0.5 hover:decoration-foreground",
  "rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-600 focus-visible:ring-offset-2"
);

function TextLink({ href, children }: { href: string; children: ReactNode }) {
  const isExternal = href.startsWith("https://");

  return (
    <a
      className={LINK_CLASS}
      href={href}
      rel={isExternal ? "noopener noreferrer" : undefined}
      target={isExternal ? "_blank" : undefined}
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
          I&apos;m a <Strong>mobile developer / fullstack developer</Strong>.
          Most of my work is <Strong>React Native</Strong> and{" "}
          <Strong>Next.js</Strong>.
        </p>

        <p>
          You can find me at <TextLink href={HREF.x}>@itslucadev</TextLink>, on{" "}
          <TextLink href={HREF.github}>Github</TextLink>,{" "}
          <TextLink href={HREF.instagram}>Instagram</TextLink> or contact me via{" "}
          <TextLink href={HREF.email}>email</TextLink>.
        </p>

        <p>
          I am also available for freelance work. If you want to discuss a
          project, feel free to{" "}
          <TextLink href={HREF.call}>book a call</TextLink>.
        </p>
      </div>

      <GitHubActivity />
    </section>
  );
}
