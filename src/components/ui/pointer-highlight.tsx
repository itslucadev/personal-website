"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  type ReactNode,
  type SVGProps,
  useEffect,
  useRef,
  useState,
} from "react";
import { cn } from "@/lib/utils";

export type PointerHighlightProps = {
  children: ReactNode;
  rectangleClassName?: string;
  pointerClassName?: string;
  containerClassName?: string;
  label?: string;
};

export function PointerHighlight({
  children,
  rectangleClassName,
  pointerClassName,
  containerClassName,
  label,
}: PointerHighlightProps) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const reducedMotion = Boolean(useReducedMotion());

  useEffect(() => {
    const node = containerRef.current;
    if (node) {
      const { width, height } = node.getBoundingClientRect();
      setDimensions({ width, height });
    }

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        setDimensions({ width, height });
      }
    });

    if (node) {
      resizeObserver.observe(node);
    }

    return () => {
      if (node) {
        resizeObserver.unobserve(node);
      }
    };
  }, []);

  return (
    <span
      className={cn("relative inline-block", containerClassName)}
      ref={containerRef}
    >
      {children}
      {dimensions.width > 0 && dimensions.height > 0 && (
        <motion.span
          animate={{ opacity: 1, scale: 1 }}
          className="pointer-events-none absolute inset-0 z-0 block"
          initial={
            reducedMotion
              ? false
              : { opacity: 0, scale: 0.95, originX: 0, originY: 0 }
          }
          transition={
            reducedMotion ? { duration: 0 } : { duration: 0.5, ease: "easeOut" }
          }
        >
          <motion.span
            className={cn(
              "absolute inset-0 block border border-amber-600",
              rectangleClassName
            )}
            initial={reducedMotion ? false : { width: 0, height: 0 }}
            transition={
              reducedMotion
                ? { duration: 0 }
                : { duration: 1, ease: "easeInOut" }
            }
            viewport={{ once: true }}
            whileInView={{
              width: dimensions.width,
              height: dimensions.height,
            }}
          />
          <motion.span
            className="pointer-events-none absolute top-0 left-0 block"
            initial={
              reducedMotion
                ? {
                    opacity: 1,
                    x: dimensions.width + 4,
                    y: dimensions.height + 4,
                  }
                : { opacity: 0 }
            }
            transition={
              reducedMotion
                ? { duration: 0 }
                : {
                    opacity: { duration: 0.1, ease: "easeInOut" },
                    duration: 1,
                    ease: "easeInOut",
                  }
            }
            viewport={{ once: true }}
            whileInView={{
              opacity: 1,
              x: dimensions.width + 4,
              y: dimensions.height + 4,
            }}
          >
            <span
              className="inline-flex"
              style={{ transform: "rotate(-90deg)" }}
            >
              <Pointer
                className={cn("h-5 w-5 text-amber-600", pointerClassName)}
              />
            </span>
            {label ? (
              <span className="absolute top-5 left-0 whitespace-nowrap rounded-[2px] bg-amber-600 px-1 py-px font-mono text-[10px] text-white leading-none">
                {label}
              </span>
            ) : null}
          </motion.span>
        </motion.span>
      )}
    </span>
  );
}

function Pointer({ ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      aria-hidden="true"
      fill="currentColor"
      height="1em"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1"
      viewBox="0 0 16 16"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M14.082 2.182a.5.5 0 0 1 .103.557L8.528 15.467a.5.5 0 0 1-.917-.007L5.57 10.694.803 8.652a.5.5 0 0 1-.006-.916l12.728-5.657a.5.5 0 0 1 .556.103z" />
    </svg>
  );
}
