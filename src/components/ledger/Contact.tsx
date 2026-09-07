import Link from "next/link";
import { cn } from "@/lib/utils";

const FOCUS =
  "rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-600 focus-visible:ring-offset-2";

export function Contact() {
  return (
    <section
      aria-labelledby="contact-heading"
      className="scroll-mt-24"
      id="contact"
    >
      <h2
        className="mb-4 font-mono text-[11px] text-muted-foreground uppercase tracking-[0.12em]"
        id="contact-heading"
      >
        Contact
      </h2>
      <p className="font-sans text-base text-muted-foreground">
        Available for freelance and projects.
      </p>
      <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 font-sans text-base">
        <a
          className={cn(
            "text-foreground transition-colors hover:text-amber-600",
            FOCUS
          )}
          href="https://cal.eu/lucabecker"
          rel="noopener noreferrer"
          target="_blank"
        >
          Book a call →
        </a>
        <Link
          className={cn(
            "text-foreground transition-colors hover:text-amber-600",
            FOCUS
          )}
          href="/contact"
        >
          Send a message →
        </Link>
      </div>
    </section>
  );
}
