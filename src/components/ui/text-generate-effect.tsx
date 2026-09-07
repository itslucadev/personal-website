"use client";

import { motion, stagger, useAnimate, useReducedMotion } from "framer-motion";
import { useEffect } from "react";
import { cn } from "@/lib/utils";

export type TextGenerateEffectProps = {
  words: string;
  className?: string;
  filter?: boolean;
  duration?: number;
  enabled?: boolean;
};

export function TextGenerateEffect({
  words,
  className,
  filter = true,
  duration = 0.5,
  enabled = true,
}: TextGenerateEffectProps) {
  const reducedMotion = Boolean(useReducedMotion());
  const [scope, animate] = useAnimate();
  const wordsArray = words.split(" ");
  const skipMotion = !enabled || reducedMotion;

  useEffect(() => {
    if (skipMotion) {
      return;
    }
    animate(
      "span",
      {
        opacity: 1,
        filter: filter ? "blur(0px)" : "none",
      },
      {
        duration: duration ? duration : 1,
        delay: stagger(0.2),
      }
    );
  }, [animate, duration, filter, skipMotion, words]);

  if (skipMotion) {
    return <span className={cn(className)}>{words}</span>;
  }

  return (
    <motion.span className={cn(className)} ref={scope}>
      {wordsArray.map((word, idx) => (
        <motion.span
          className="opacity-0"
          key={word + idx}
          style={{
            filter: filter ? "blur(10px)" : "none",
          }}
        >
          {word}{" "}
        </motion.span>
      ))}
    </motion.span>
  );
}
