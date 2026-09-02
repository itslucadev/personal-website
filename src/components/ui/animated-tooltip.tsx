"use client";

import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import Image from "next/image";
import { type MouseEvent, useState } from "react";
import { cn } from "@/lib/utils";

export interface AnimatedTooltipItem {
  /** What it is and what it is used for, one line. */
  designation: string;
  href: string;
  id: string;
  image: string;
  name: string;
}

/**
 * Aceternity's animated tooltip (spring pop, tilt that follows the cursor)
 * on square icon tiles. Ported to framer-motion and next/image; the tooltip is
 * also shown on keyboard focus.
 */
export function AnimatedTooltip({
  items,
  className,
}: {
  items: AnimatedTooltipItem[];
  className?: string;
}) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const reducedMotion = Boolean(useReducedMotion());
  const springConfig = { stiffness: 100, damping: 15 };
  const x = useMotionValue(0);
  const rotate = useSpring(useTransform(x, [-16, 16], [-12, 12]), springConfig);
  const translateX = useSpring(
    useTransform(x, [-16, 16], [-20, 20]),
    springConfig
  );

  const handleMouseMove = (event: MouseEvent<HTMLAnchorElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    x.set(event.clientX - rect.left - rect.width / 2);
  };

  return (
    <ul className={cn("flex flex-wrap gap-2", className)}>
      {items.map((item) => {
        const tooltipId = `tooltip-${item.id}`;
        const open = hoveredId === item.id;
        return (
          <li
            className="group relative"
            key={item.id}
            onMouseEnter={() => setHoveredId(item.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            <AnimatePresence>
              {open ? (
                <motion.div
                  animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    transition: reducedMotion
                      ? { duration: 0 }
                      : { type: "spring", stiffness: 260, damping: 14 },
                  }}
                  className="pointer-events-none absolute bottom-full left-1/2 z-50 mb-2 flex w-max max-w-[16rem] -translate-x-1/2 flex-col items-start rounded-md bg-[#14181F] px-3 py-2 text-left shadow-xl"
                  exit={
                    reducedMotion
                      ? { opacity: 0 }
                      : { opacity: 0, y: 12, scale: 0.7 }
                  }
                  id={tooltipId}
                  initial={
                    reducedMotion
                      ? { opacity: 0 }
                      : { opacity: 0, y: 12, scale: 0.7 }
                  }
                  role="tooltip"
                  style={
                    reducedMotion
                      ? undefined
                      : { translateX, rotate, transformOrigin: "bottom center" }
                  }
                >
                  <div className="absolute inset-x-8 -bottom-px z-30 h-px bg-gradient-to-r from-transparent via-amber-500 to-transparent" />
                  <div className="relative z-30 font-sans font-semibold text-sm text-white">
                    {item.name}
                  </div>
                  <div className="whitespace-normal font-sans text-[#B4BCC9] text-xs leading-snug">
                    {item.designation}
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
            <a
              aria-describedby={open ? tooltipId : undefined}
              className="flex size-8 items-center justify-center rounded-[6px] border border-[#DCE2EA] bg-white transition-[border-color,transform] duration-200 hover:-translate-y-0.5 hover:border-amber-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-600 focus-visible:ring-offset-2"
              href={item.href}
              onBlur={() => setHoveredId(null)}
              onFocus={() => setHoveredId(item.id)}
              onMouseMove={handleMouseMove}
              rel="noopener noreferrer"
              target="_blank"
            >
              <Image
                alt=""
                className="size-4 object-contain"
                height={16}
                src={item.image}
                width={16}
              />
              <span className="sr-only">{item.name}</span>
            </a>
          </li>
        );
      })}
    </ul>
  );
}
