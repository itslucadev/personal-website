"use client";

import { useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

export type DotBloomOrigin = {
  x: number;
  y: number;
};

export type DotBloomProps = {
  color?: string;
  dotSize?: number;
  pitch?: number;
  className?: string;
  active: boolean;
  origin: DotBloomOrigin | null;
};

type Phase = "idle" | "in" | "out";

type Dot = {
  x: number;
  y: number;
  jitter: number;
  radius: number;
  alpha: number;
  delay: number;
  fromAlpha: number;
};

function easeOutCubic(t: number): number {
  return 1 - (1 - t) ** 3;
}

/** Advances the bloom-in animation; returns true when every dot has settled. */
function stepIn(dots: Dot[], elapsed: number, size: number): boolean {
  let done = true;
  for (const dot of dots) {
    const local = elapsed - dot.delay;
    if (local <= 0) {
      done = false;
      continue;
    }
    const t = clamp01(local / 250);
    const e = easeOutCubic(t);
    dot.radius = size * e;
    dot.alpha = e;
    if (t < 1) {
      done = false;
    }
  }
  return done;
}

/** Advances the fade-out; returns true once fully transparent. */
function stepOut(dots: Dot[], elapsed: number): boolean {
  const t = clamp01(elapsed / 300);
  for (const dot of dots) {
    dot.alpha = dot.fromAlpha * (1 - t);
  }
  if (t < 1) {
    return false;
  }
  for (const dot of dots) {
    dot.alpha = 0;
    dot.radius = 0;
  }
  return true;
}

function clamp01(t: number): number {
  if (t <= 0) {
    return 0;
  }
  if (t >= 1) {
    return 1;
  }
  return t;
}

function buildDots(width: number, height: number, pitch: number): Dot[] {
  const dots: Dot[] = [];
  if (width <= 0 || height <= 0 || pitch <= 0) {
    return dots;
  }
  const start = pitch / 2;
  for (let y = start; y < height; y += pitch) {
    for (let x = start; x < width; x += pitch) {
      dots.push({
        x,
        y,
        jitter: Math.random() * 120,
        radius: 0,
        alpha: 0,
        delay: 0,
        fromAlpha: 0,
      });
    }
  }
  return dots;
}

export function DotBloom({
  color = "#D97706",
  dotSize = 1.6,
  pitch = 12,
  className,
  active,
  origin,
}: DotBloomProps) {
  const reducedMotion = Boolean(useReducedMotion());
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const colorRef = useRef(color);
  const dotSizeRef = useRef(dotSize);
  const syncRef = useRef<
    ((nextActive: boolean, nextOrigin: DotBloomOrigin | null) => void) | null
  >(null);

  colorRef.current = color;
  dotSizeRef.current = dotSize;

  useEffect(() => {
    if (reducedMotion) {
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }
    const parent = canvas.parentElement;
    if (!parent) {
      return;
    }
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      return;
    }

    let width = 0;
    let height = 0;
    let dots: Dot[] = [];
    let phase: Phase = "idle";
    let t0 = 0;
    let raf = 0;
    let cancelled = false;
    let lastActive = false;
    let lastOrigin: DotBloomOrigin | null = null;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = colorRef.current;
      for (const dot of dots) {
        if (dot.alpha <= 0.001 || dot.radius <= 0) {
          continue;
        }
        ctx.globalAlpha = dot.alpha;
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };

    const stopLoop = () => {
      if (raf !== 0) {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    };

    const tick = (now: number) => {
      if (cancelled) {
        return;
      }
      raf = 0;
      const elapsed = now - t0;
      let done = true;
      if (phase === "in") {
        done = stepIn(dots, elapsed, dotSizeRef.current);
      } else if (phase === "out") {
        done = stepOut(dots, elapsed);
      }

      draw();

      if (done) {
        phase = "idle";
        return;
      }
      raf = requestAnimationFrame(tick);
    };

    const startLoop = () => {
      if (raf === 0 && !cancelled) {
        raf = requestAnimationFrame(tick);
      }
    };

    const beginIn = (point: DotBloomOrigin) => {
      let maxDistance = 0;
      for (const dot of dots) {
        const dist = Math.hypot(dot.x - point.x, dot.y - point.y);
        if (dist > maxDistance) {
          maxDistance = dist;
        }
      }
      for (const dot of dots) {
        const dist = Math.hypot(dot.x - point.x, dot.y - point.y);
        dot.delay =
          (maxDistance > 0 ? (dist / maxDistance) * 450 : 0) + dot.jitter;
        dot.radius = 0;
        dot.alpha = 0;
      }
      phase = "in";
      t0 = performance.now();
      startLoop();
    };

    const beginOut = () => {
      let anyVisible = false;
      for (const dot of dots) {
        dot.fromAlpha = dot.alpha;
        if (dot.alpha > 0.001) {
          anyVisible = true;
        }
      }
      if (!anyVisible) {
        phase = "idle";
        stopLoop();
        draw();
        return;
      }
      phase = "out";
      t0 = performance.now();
      startLoop();
    };

    syncRef.current = (nextActive, nextOrigin) => {
      lastActive = nextActive;
      lastOrigin = nextOrigin;
      if (nextActive && nextOrigin) {
        const settled =
          phase === "in" ||
          (phase === "idle" &&
            dots.length > 0 &&
            dots.every((dot) => dot.alpha >= 0.999));
        if (!settled) {
          beginIn(nextOrigin);
        }
        return;
      }
      if (!nextActive) {
        const settled =
          phase === "out" ||
          (phase === "idle" && dots.every((dot) => dot.alpha <= 0.001));
        if (!settled) {
          beginOut();
        }
      }
    };

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const nextWidth = parent.clientWidth;
      const nextHeight = parent.clientHeight;
      width = nextWidth;
      height = nextHeight;
      canvas.width = Math.max(1, Math.round(nextWidth * dpr));
      canvas.height = Math.max(1, Math.round(nextHeight * dpr));
      canvas.style.width = `${nextWidth}px`;
      canvas.style.height = `${nextHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      dots = buildDots(nextWidth, nextHeight, pitch);
      phase = "idle";
      stopLoop();
      if (lastActive && lastOrigin) {
        beginIn(lastOrigin);
      } else {
        draw();
      }
    };

    resize();

    const observer = new ResizeObserver(() => {
      resize();
    });
    observer.observe(parent);

    return () => {
      cancelled = true;
      stopLoop();
      observer.disconnect();
      syncRef.current = null;
    };
  }, [pitch, reducedMotion]);

  useEffect(() => {
    if (reducedMotion) {
      return;
    }
    syncRef.current?.(active, origin);
  }, [active, origin, reducedMotion, pitch]);

  if (reducedMotion) {
    return null;
  }

  return (
    <canvas
      aria-hidden
      className={cn("pointer-events-none absolute inset-0", className)}
      ref={canvasRef}
    />
  );
}
