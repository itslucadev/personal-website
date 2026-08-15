"use client";

import { motion } from "framer-motion";
import { HelpCircle } from "lucide-react";
import { ContactForm } from "@/components/ContactForm";
import { Footer } from "@/components/Footer";
import { Logo } from "@/components/Logo";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What services do you offer?",
    answer:
      "I specialize in building modern mobile and web applications using React Native, Expo, TypeScript, and Next.js. I offer freelance development, consulting, and technical support for existing projects.",
  },
  {
    question: "How can I request a project or collaboration?",
    answer:
      "You can reach out via the contact form below or send me an email directly at luca.dev@outlook.de. I'm also available for a quick call — you can book one through my calendar link on the home page.",
  },
  {
    question: "What is your typical response time?",
    answer:
      "I usually respond within 24–48 hours on business days. For urgent matters, please mention it in the subject line and I'll do my best to get back to you sooner.",
  },
  {
    question: "Do you provide support for your apps?",
    answer:
      "Yes! If you're experiencing issues with one of my apps, please describe the problem in the contact form below and I'll get back to you as soon as possible.",
  },
  {
    question: "Are your apps open source?",
    answer:
      "Some of my projects are open source and available on GitHub. Check the projects section on the home page for links and details on each project.",
  },
];

const ease = [0.25, 0.46, 0.45, 0.94] as const;

export function SupportContent() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Logo />

      <main className="flex-1">
        {/* Hero */}
        <section className="px-4 pt-20 pb-12 sm:px-6">
          <div className="mx-auto max-w-3xl">
            <motion.h1
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 text-center font-bold text-2xl leading-tight tracking-tight sm:text-[28px]"
              initial={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.2, ease }}
            >
              How can I <span className="text-amber-600">help</span>?
            </motion.h1>

            <motion.p
              animate={{ opacity: 1, y: 0 }}
              className="mx-auto mb-6 max-w-lg text-center text-muted-foreground text-sm leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.3, ease }}
            >
              Find answers to common questions below or reach out directly
              through the contact form.
            </motion.p>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="px-4 py-10 sm:px-6">
          <div className="mx-auto max-w-3xl">
            <motion.h2
              animate={{ opacity: 1, y: 0 }}
              className="mb-2 font-medium text-muted-foreground text-xs uppercase tracking-wider"
              initial={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.4, ease }}
            >
              Frequently Asked Questions
            </motion.h2>

            <motion.p
              animate={{ opacity: 1, y: 0 }}
              className="mb-5 text-foreground text-sm"
              initial={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.43, ease }}
            >
              Quick answers to the most common questions:
            </motion.p>

            <motion.div
              animate={{ opacity: 1, y: 0 }}
              className="rounded-lg border border-border bg-card px-4"
              initial={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.46, ease }}
            >
              <Accordion collapsible type="single">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`faq-${index}`}>
                    <AccordionTrigger className="text-foreground">
                      <span className="flex items-center gap-2">
                        <HelpCircle className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                        {faq.question}
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="pl-5.5 text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </motion.div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="px-4 py-10 sm:px-6">
          <div className="mx-auto max-w-3xl">
            <motion.h2
              animate={{ opacity: 1, y: 0 }}
              className="mb-2 font-medium text-muted-foreground text-xs uppercase tracking-wider"
              initial={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.55, ease }}
            >
              Get in Touch
            </motion.h2>

            <motion.p
              animate={{ opacity: 1, y: 0 }}
              className="mb-5 text-foreground text-sm"
              initial={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.58, ease }}
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
