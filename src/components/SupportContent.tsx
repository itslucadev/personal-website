'use client';

import { motion } from 'framer-motion';
import { HelpCircle } from 'lucide-react';
import { Logo } from '@/components/Logo';
import { Footer } from '@/components/Footer';
import { ContactForm } from '@/components/ContactForm';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';

const faqs = [
  {
    question: 'What services do you offer?',
    answer:
      'I specialize in building modern mobile and web applications using React Native, Expo, TypeScript, and Next.js. I offer freelance development, consulting, and technical support for existing projects.',
  },
  {
    question: 'How can I request a project or collaboration?',
    answer:
      "You can reach out via the contact form below or send me an email directly at luca.dev@outlook.de. I'm also available for a quick call — you can book one through my calendar link on the home page.",
  },
  {
    question: 'What is your typical response time?',
    answer:
      "I usually respond within 24–48 hours on business days. For urgent matters, please mention it in the subject line and I'll do my best to get back to you sooner.",
  },
  {
    question: 'Do you provide support for your apps?',
    answer:
      "Yes! If you're experiencing issues with one of my apps, please describe the problem in the contact form below and I'll get back to you as soon as possible.",
  },
  {
    question: 'Are your apps open source?',
    answer:
      'Some of my projects are open source and available on GitHub. Check the projects section on the home page for links and details on each project.',
  },
];

const ease = [0.25, 0.46, 0.45, 0.94] as const;

export function SupportContent() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Logo />

      <main className="flex-1">
        {/* Hero */}
        <section className="pt-20 pb-12 px-4 sm:px-6">
          <div className="max-w-3xl mx-auto">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2, ease }}
              className="text-2xl sm:text-[28px] font-bold text-center mb-4 leading-tight tracking-tight"
            >
              How can I <span className="text-amber-500">help</span>?
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3, ease }}
              className="text-sm text-muted-foreground text-center mb-6 leading-relaxed max-w-lg mx-auto"
            >
              Find answers to common questions below or reach out directly
              through the contact form.
            </motion.p>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-10 px-4 sm:px-6">
          <div className="max-w-3xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4, ease }}
              className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2"
            >
              Frequently Asked Questions
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.43, ease }}
              className="text-sm text-foreground mb-5"
            >
              Quick answers to the most common questions:
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.46, ease }}
              className="border border-border rounded-lg px-4 bg-card"
            >
              <Accordion type="single" collapsible>
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`faq-${index}`}>
                    <AccordionTrigger className="text-foreground">
                      <span className="flex items-center gap-2">
                        <HelpCircle className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                        {faq.question}
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground pl-5.5">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </motion.div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="py-10 px-4 sm:px-6">
          <div className="max-w-3xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.55, ease }}
              className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2"
            >
              Get in Touch
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.58, ease }}
              className="text-sm text-foreground mb-5"
            >
              Didn't find what you're looking for? Send me a message:
            </motion.p>

            <ContactForm animationDelay={0.61} />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
