import { motion } from 'framer-motion';

export function ContactSection() {
  return (
    <section className="py-10 px-4 sm:px-6">
      <div className="max-w-xl mx-auto">
        {/* Section Header */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: 1.0,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2"
        >
          Get in touch
        </motion.h2>

        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: 1.03,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          className="space-y-2"
        >
          <p className="text-sm text-foreground">
            You can reach me <strong>anytime</strong> at{' '}
            <a
              href="mailto:luca.dev@outlook.de"
              className="text-amber-600 link-underline-static hover:text-amber-700 transition-colors"
            >
              luca.dev@outlook.de
            </a>
          </p>
          <p className="text-sm text-foreground">
            Or book a call on{' '}
            <a
              href="https://cal.eu/lucabecker"
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-600 link-underline-static hover:text-amber-700 transition-colors"
            >
              Cal.com
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
