import { motion } from "framer-motion";

export function ContactSection() {
  return (
    <section className="px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-xl">
        {/* Section Header */}
        <motion.h2
          animate={{ opacity: 1, y: 0 }}
          className="mb-2 font-medium text-muted-foreground text-xs uppercase tracking-wider"
          initial={{ opacity: 0, y: 20 }}
          transition={{
            duration: 0.5,
            delay: 1.0,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
        >
          Get in touch
        </motion.h2>

        {/* Contact Info */}
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="space-y-2"
          initial={{ opacity: 0, y: 20 }}
          transition={{
            duration: 0.5,
            delay: 1.03,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
        >
          <p className="text-foreground text-sm">
            You can reach me <strong>anytime</strong> at{" "}
            <a
              className="link-underline-static text-amber-600 transition-colors hover:text-amber-700"
              href="mailto:luca.dev@outlook.de"
            >
              luca.dev@outlook.de
            </a>
          </p>
          <p className="text-foreground text-sm">
            Or book a call on{" "}
            <a
              className="link-underline-static text-amber-600 transition-colors hover:text-amber-700"
              href="https://cal.eu/lucabecker"
              rel="noopener noreferrer"
              target="_blank"
            >
              Cal.com
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
