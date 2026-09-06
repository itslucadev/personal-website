"use client";

import {
  type AnimationPlaybackControls,
  animate,
  type MotionValue,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
} from "framer-motion";
import { type RefObject, useEffect, useMemo, useRef } from "react";
import type { ContributionCalendar, ContributionDay } from "@/lib/github";
import {
  DAY_LABELS,
  dayTitle,
  FILL,
  type Level,
  monthLabels,
  weekdayOf,
} from "./contributions";

export type Layout = "flat" | "iso";

/*
 * One scene morphs between GitHub's flat calendar and the isometric skyline.
 *
 * Both layouts are affine images of the same grid space: day (col, row) sits at
 * x = STEP * col, y = STEP * row when flat and at x = HALF_W * (col - row),
 * y = HALF_H * (col + row) when isometric. The ground plane is therefore drawn
 * once, in grid units, and carried between the two by a single interpolated
 * matrix() on its wrapping <g>: one animated transform instead of 371 animated
 * squares. The bars cannot ride inside that group - their lift is vertical in
 * screen space and the shear would bend it - so they live outside it in final
 * isometric coordinates and only rise once the plane has landed.
 */

/* The flat calendar, GitHub's own metrics. */
const CELL = 10;
const GAP = 3;
const STEP = CELL + GAP;
const LABEL_W = 28;
const LABEL_H = 16;
const ROWS = 7;
/** A day in grid units: the cell spans CELL of its STEP, with the gap trailing. */
const SPAN = CELL / STEP;
/** The flat cell's 2px corner radius, expressed in grid units. */
const CORNER = 2 / STEP;

/*
 * The isometric projection: a 2.5:1 tile rather than the textbook 2:1 one. A
 * year of contributions is a 53-by-7 strip, so the steeper the grid the more
 * of the card it spends on the empty corners either side of the diagonal.
 */
const HALF_W = 10;
const HALF_H = 4;
/**
 * A day with nothing on it still stands proud of the plane, so the year reads
 * as one block of material the activity is carved out of rather than bars
 * scattered on a floor.
 */
const BASE_LIFT = 2;
/** The quietest active day starts here; the busiest day of the year is tallest. */
const MIN_LIFT = 7;
const MAX_LIFT = 52;
/**
 * The month labels sit out beyond the grid's front edge, so they read as an
 * axis under the skyline and no bar can stand in front of one.
 */
const LABEL_ROW = ROWS + 1.5;
const LABEL_DESCENT = 3;
/** Margins: the front-edge labels reach further left than any bar does. */
const PAD_LEFT = 24;
const PAD_RIGHT = 4;
const PAD_Y = 2;
/** The month labels run along the week axis, which tilts by atan(HALF_H/HALF_W). */
const AXIS_TILT = (Math.atan2(HALF_H, HALF_W) * 180) / Math.PI;

/** Axis labels are chart chrome, not copy: a drag should not highlight them. */
const LABEL_CLASS = "select-none fill-muted-foreground text-[10px]";

/*
 * Choreography. Toward the skyline: the plane tilts while the card grows to
 * make headroom, holds a breath on landing, then the bars sweep up from the
 * far corner of the year toward the viewer. Back to flat runs the mirror:
 * the wave retreats front to back, then the plane folds down with the card.
 */
const TILT_SECONDS = 0.55;
const UNTILT_SECONDS = 0.5;
const RISE_SECONDS = 0.9;
const SINK_SECONDS = 0.6;
const LANDING_BREATH = 0.08;
/** Fraction of the rise sweep each individual bar spends in motion. */
const RISE_WINDOW = 0.45;
/** easeInOutCubic: the plane leans in, shears through, and settles. */
const TILT_EASE: [number, number, number, number] = [0.65, 0, 0.35, 1];
/** Flat labels are gone before the shear gets obvious. */
const FLAT_LABEL_FADE = 0.35;
/** Isometric labels only arrive as the plane comes in to land. */
const ISO_LABEL_START = 0.6;
/**
 * easeOutBack with the tension turned down: a bar overshoots its final height
 * by under 4 percent and settles. Played backwards on the way down it doubles
 * as anticipation - a bar lifts slightly before collapsing.
 */
const BACK_TENSION = 1;
/** Peak of riseEase over [0, 1]; the skyline's headroom must fit the overshoot. */
const BACK_PEAK = 1.038;

function riseEase(progress: number) {
  const u = progress - 1;
  return 1 + (BACK_TENSION + 1) * u * u * u + BACK_TENSION * u * u;
}

function clamp01(value: number) {
  return Math.min(1, Math.max(0, value));
}

function mix(from: number, to: number, t: number) {
  return from + (to - from) * t;
}

function flatLabelOpacity(t: number) {
  return clamp01(1 - t / FLAT_LABEL_FADE);
}

function isoLabelOpacity(t: number) {
  return clamp01((t - ISO_LABEL_START) / (1 - ISO_LABEL_START));
}

/** Darkens `#rrggbb` towards black; a bar's sides catch less light than its top. */
function shade(hex: string, factor: number) {
  const channels = [1, 3, 5].map((start) =>
    Math.round(Number.parseInt(hex.slice(start, start + 2), 16) * factor)
      .toString(16)
      .padStart(2, "0")
  );
  return `#${channels.join("")}`;
}

function sideFills(factor: number): Record<Level, string> {
  return {
    0: shade(FILL[0], factor),
    1: shade(FILL[1], factor),
    2: shade(FILL[2], factor),
    3: shade(FILL[3], factor),
    4: shade(FILL[4], factor),
  };
}

const LEFT_FILL = sideFills(0.84);
const RIGHT_FILL = sideFills(0.68);

/**
 * Square-root scaling, so one very busy day does not flatten the rest of the
 * year into the baseline.
 */
function liftOf(count: number, peak: number) {
  if (count === 0) {
    return BASE_LIFT;
  }
  return Math.round(MIN_LIFT + (MAX_LIFT - MIN_LIFT) * Math.sqrt(count / peak));
}

interface Bar {
  col: number;
  day: ContributionDay;
  /** When this bar's rise starts, as a fraction of the whole sweep. */
  delay: number;
  level: Level;
  lift: number;
  row: number;
}

/** Everything about this calendar's geometry that both states share. */
function buildScene(weeks: ContributionCalendar["weeks"]) {
  const cols = weeks.length;
  const days = weeks.flatMap((week, col) =>
    week.map((day) => ({ col, day, row: weekdayOf(day) }))
  );
  const peak = Math.max(1, ...days.map((entry) => entry.day.count));
  const depthMax = Math.max(1, cols - 1 + ROWS - 1);
  // Every day gets a bar, empty ones included: they rise to a thin slab, so
  // the whole field lifts off the plane together and the year reads as one
  // block of material rather than bars standing on a floor.
  const bars: Bar[] = days
    .map((entry) => ({
      ...entry,
      // The sweep rolls along the depth axis, oldest corner first, so the
      // wave of bars breaks toward the viewer in painting order.
      delay: ((entry.col + entry.row) / depthMax) * (1 - RISE_WINDOW),
      level: entry.day.level,
      lift: liftOf(entry.day.count, peak),
    }))
    // Painter's algorithm: the far corner of the grid is drawn first, so a
    // bar in front covers whatever stands behind it.
    .sort((a, b) => a.col + a.row - (b.col + b.row));

  const labels = monthLabels(weeks);
  const flatWidth = LABEL_W + cols * STEP - GAP;
  const flatHeight = LABEL_H + ROWS * STEP - GAP;

  // Headroom is whatever the skyline actually needs, overshoot included.
  // Reserving the full bar height would leave a dead band above the shorter
  // end of the year. The 0 only stands in for an empty calendar.
  const crest = Math.min(
    0,
    ...bars.map((bar) => (bar.col + bar.row) * HALF_H - bar.lift * BACK_PEAK)
  );
  const floor = Math.max(
    (cols + ROWS - 2 + 2 * SPAN) * HALF_H,
    ...labels.map(
      (label) => (label.index + 0.5 + LABEL_ROW) * HALF_H + LABEL_DESCENT
    )
  );
  const originX = PAD_LEFT + ROWS * HALF_W;
  const originY = PAD_Y - crest;
  return {
    bars,
    flatHeight,
    flatWidth,
    isoHeight: originY + floor + PAD_Y,
    isoWidth: PAD_LEFT + (cols + ROWS) * HALF_W + PAD_RIGHT,
    labels,
    originX,
    originY,
  };
}

type Scene = ReturnType<typeof buildScene>;

/** Projects a grid corner, raised by `lift`, into isometric screen space. */
function isoCorner(scene: Scene, col: number, row: number, lift: number) {
  return `${scene.originX + (col - row) * HALF_W},${scene.originY + (col + row) * HALF_H - lift}`;
}

/**
 * The three visible faces of a bar. Its footprint is the ground tile's own
 * bounding square, so at lift 0 the top face caps its tile exactly and the
 * rise reads as extrusion rather than a swap.
 */
function facesOf(scene: Scene, bar: Bar, lift: number) {
  const far = bar.col;
  const near = bar.col + SPAN;
  const back = bar.row;
  const front = bar.row + SPAN;
  return {
    left: [
      isoCorner(scene, far, front, lift),
      isoCorner(scene, near, front, lift),
      isoCorner(scene, near, front, 0),
      isoCorner(scene, far, front, 0),
    ].join(" "),
    right: [
      isoCorner(scene, near, front, lift),
      isoCorner(scene, near, back, lift),
      isoCorner(scene, near, back, 0),
      isoCorner(scene, near, front, 0),
    ].join(" "),
    top: [
      isoCorner(scene, far, back, lift),
      isoCorner(scene, near, back, lift),
      isoCorner(scene, near, front, lift),
      isoCorner(scene, far, front, lift),
    ].join(" "),
  };
}

/**
 * The affine map from grid space at tilt t: the exact flat calendar at 0, the
 * exact isometric ground plane at 1, and a correct shear the whole way
 * between, because every matrix entry is linear in t.
 */
function planeTransform(scene: Scene, t: number) {
  const a = mix(STEP, HALF_W, t);
  const b = mix(0, HALF_H, t);
  const c = mix(0, -HALF_W, t);
  const d = mix(STEP, HALF_H, t);
  const e = mix(LABEL_W, scene.originX, t);
  const f = mix(LABEL_H, scene.originY, t);
  return `matrix(${a} ${b} ${c} ${d} ${e} ${f})`;
}

/** The viewBox at tilt t. Content stays inside it: corners travel straight
 * lines between the two states, so their extremes never exceed the lerp. */
function frameOf(scene: Scene, t: number) {
  return {
    height: mix(scene.flatHeight, scene.isoHeight, t),
    width: mix(scene.flatWidth, scene.isoWidth, t),
  };
}

/** The DOM the per-frame appliers write to, bundled so they can live here. */
interface Stage {
  /** Last per-bar progress written to the DOM, so settled bars skip writes. */
  applied: number[];
  bars: RefObject<SVGGElement | null>;
  flatLabels: RefObject<SVGGElement | null>;
  isoLabels: RefObject<SVGGElement | null>;
  plane: RefObject<SVGGElement | null>;
  svg: RefObject<SVGSVGElement | null>;
}

// Per-frame work happens here, off React's render path: one transform, one
// viewBox, two label opacities. The card's second beat is the aspect-ratio
// write - the svg keeps its viewBox ratio, so easing the ratio is what grows
// the card in step with the tilt.
function applyTiltFrame(scene: Scene, stage: Stage, t: number) {
  stage.plane.current?.setAttribute("transform", planeTransform(scene, t));
  const svg = stage.svg.current;
  if (svg) {
    const frame = frameOf(scene, t);
    svg.setAttribute("viewBox", `0 0 ${frame.width} ${frame.height}`);
    svg.style.aspectRatio = `${frame.width} / ${frame.height}`;
  }
  if (stage.flatLabels.current) {
    stage.flatLabels.current.style.opacity = String(flatLabelOpacity(t));
  }
  if (stage.isoLabels.current) {
    stage.isoLabels.current.style.opacity = String(isoLabelOpacity(t));
  }
}

function applyRiseFrame(scene: Scene, stage: Stage, r: number) {
  const group = stage.bars.current;
  if (!group) {
    return;
  }
  // At rest the degenerate bars would cap the flat calendar's rounded cells
  // with sharp corners, so the group hides until the plane has landed.
  group.style.visibility = r > 0 ? "visible" : "hidden";
  scene.bars.forEach((bar, index) => {
    const progress = clamp01((r - bar.delay) / RISE_WINDOW);
    if (progress === stage.applied[index]) {
      return;
    }
    stage.applied[index] = progress;
    const faces = facesOf(scene, bar, riseEase(progress) * bar.lift);
    const cube = group.children[index];
    // Children are <title>, left, right, top - the order the scene renders.
    cube?.children[1]?.setAttribute("points", faces.left);
    cube?.children[2]?.setAttribute("points", faces.right);
    cube?.children[3]?.setAttribute("points", faces.top);
  });
}

/** The breath only happens on a fresh landing, not when resuming mid-rise. */
function breathBefore(rise: MotionValue<number>) {
  return rise.get() === 0 ? LANDING_BREATH : 0;
}

/**
 * Sequences the beats toward whichever state is the target, and jumps
 * straight there under reduced motion - not a faster transition, the settled
 * state immediately. Durations scale with the distance left, so interrupting
 * a half-finished beat resumes at the same speed instead of stretching the
 * remainder.
 */
function useChoreography(
  reducedMotion: boolean,
  rise: MotionValue<number>,
  target: number,
  tilt: MotionValue<number>
) {
  const controls = useRef<AnimationPlaybackControls | null>(null);
  useEffect(() => {
    if (reducedMotion) {
      tilt.jump(target);
      rise.jump(target);
      return;
    }
    let cancelled = false;
    const raiseSkyline = async () => {
      if (tilt.get() < 1) {
        const tilting = animate(tilt, 1, {
          duration: TILT_SECONDS * (1 - tilt.get()),
          ease: TILT_EASE,
        });
        controls.current = tilting;
        await tilting;
      }
      if (cancelled || rise.get() === 1) {
        return;
      }
      // A linear driver: the sweep's shape lives in each bar's own window.
      controls.current = animate(rise, 1, {
        delay: breathBefore(rise),
        duration: RISE_SECONDS * (1 - rise.get()),
        ease: "linear",
      });
    };
    const flattenSkyline = async () => {
      if (rise.get() > 0) {
        const sinking = animate(rise, 0, {
          duration: SINK_SECONDS * rise.get(),
          ease: "linear",
        });
        controls.current = sinking;
        await sinking;
      }
      if (cancelled || tilt.get() === 0) {
        return;
      }
      controls.current = animate(tilt, 0, {
        duration: UNTILT_SECONDS * tilt.get(),
        ease: TILT_EASE,
      });
    };
    if (target === 1) {
      raiseSkyline();
    } else {
      flattenSkyline();
    }
    return () => {
      cancelled = true;
      controls.current?.stop();
    };
  }, [reducedMotion, rise, target, tilt]);
}

/** The morphing ground plane: one rounded square per day, in grid units. */
function GroundPlane({
  groupRef,
  scene,
  t,
  weeks,
}: {
  groupRef: RefObject<SVGGElement | null>;
  scene: Scene;
  t: number;
  weeks: ContributionCalendar["weeks"];
}) {
  return (
    <g ref={groupRef} transform={planeTransform(scene, t)}>
      {weeks.map((week, col) =>
        week.map((day) => (
          <rect
            fill={FILL[day.level]}
            height={SPAN}
            key={day.date}
            rx={CORNER}
            width={SPAN}
            x={col}
            y={weekdayOf(day)}
          >
            <title>{dayTitle(day)}</title>
          </rect>
        ))
      )}
    </g>
  );
}

/** The skyline at final height; the rise animates its polygons in place. */
function SkylineBars({
  groupRef,
  scene,
  visible,
}: {
  groupRef: RefObject<SVGGElement | null>;
  scene: Scene;
  visible: boolean;
}) {
  return (
    <g ref={groupRef} style={{ visibility: visible ? "visible" : "hidden" }}>
      {scene.bars.map((bar) => {
        const faces = facesOf(scene, bar, bar.lift);
        return (
          <g key={bar.day.date}>
            <title>{dayTitle(bar.day)}</title>
            <polygon fill={LEFT_FILL[bar.level]} points={faces.left} />
            <polygon fill={RIGHT_FILL[bar.level]} points={faces.right} />
            <polygon fill={FILL[bar.level]} points={faces.top} />
          </g>
        );
      })}
    </g>
  );
}

/** The flat calendar's axes: months along the top, weekdays down the side. */
function FlatLabels({
  groupRef,
  scene,
  t,
}: {
  groupRef: RefObject<SVGGElement | null>;
  scene: Scene;
  t: number;
}) {
  return (
    <g ref={groupRef} style={{ opacity: flatLabelOpacity(t) }}>
      {scene.labels.map((label) => (
        <text
          className={LABEL_CLASS}
          key={label.index}
          x={LABEL_W + label.index * STEP}
          y={10}
        >
          {label.text}
        </text>
      ))}
      {Object.entries(DAY_LABELS).map(([day, text]) => (
        <text
          className={LABEL_CLASS}
          key={day}
          x={0}
          y={LABEL_H + Number(day) * STEP + CELL - 1}
        >
          {text}
        </text>
      ))}
    </g>
  );
}

/** Months only. The weekday axis stays in the flat view: at this tilt its
 * rows sit 22px apart, too close to label without collisions. */
function IsoLabels({
  groupRef,
  scene,
  t,
}: {
  groupRef: RefObject<SVGGElement | null>;
  scene: Scene;
  t: number;
}) {
  return (
    <g ref={groupRef} style={{ opacity: isoLabelOpacity(t) }}>
      {scene.labels.map((label) => {
        const col = label.index + 0.5;
        const x = scene.originX + (col - LABEL_ROW) * HALF_W;
        const y = scene.originY + (col + LABEL_ROW) * HALF_H;
        return (
          <text
            className={LABEL_CLASS}
            key={label.index}
            textAnchor="middle"
            transform={`rotate(${AXIS_TILT} ${x} ${y})`}
            x={x}
            y={y}
          >
            {label.text}
          </text>
        );
      })}
    </g>
  );
}

/** The calendar itself: a morphing ground plane plus the rising skyline. */
export function ContributionScene({
  layout,
  weeks,
}: {
  layout: Layout;
  weeks: ContributionCalendar["weeks"];
}) {
  const reducedMotion = Boolean(useReducedMotion());
  const scene = useMemo(() => buildScene(weeks), [weeks]);
  const target = layout === "iso" ? 1 : 0;
  const tilt = useMotionValue(target);
  const rise = useMotionValue(target);
  const stage = useRef<Stage>({
    applied: [],
    bars: { current: null },
    flatLabels: { current: null },
    isoLabels: { current: null },
    plane: { current: null },
    svg: { current: null },
  }).current;

  useMotionValueEvent(tilt, "change", (t) => applyTiltFrame(scene, stage, t));
  useMotionValueEvent(rise, "change", (r) => applyRiseFrame(scene, stage, r));
  useChoreography(reducedMotion, rise, target, tilt);

  // React renders from the motion values' current positions, so a re-render
  // can never snap the picture; this re-sync only matters when the calendar
  // itself changes under a settled scene.
  useEffect(() => {
    stage.applied = [];
    applyTiltFrame(scene, stage, tilt.get());
    applyRiseFrame(scene, stage, rise.get());
  });

  const t = tilt.get();
  const ariaLabel =
    layout === "iso"
      ? "Contribution calendar as an isometric grid, one bar per day, taller on busier days"
      : "Contribution calendar, one square per day";
  const frame = frameOf(scene, t);

  return (
    <svg
      aria-label={ariaLabel}
      className="block w-full font-sans"
      ref={stage.svg}
      role="img"
      style={{ aspectRatio: `${frame.width} / ${frame.height}` }}
      viewBox={`0 0 ${frame.width} ${frame.height}`}
    >
      <GroundPlane groupRef={stage.plane} scene={scene} t={t} weeks={weeks} />
      <SkylineBars
        groupRef={stage.bars}
        scene={scene}
        visible={rise.get() > 0}
      />
      {/* Text cannot survive the shear, so both label sets live outside the
          transformed group and cross-fade as the plane passes between them. */}
      <FlatLabels groupRef={stage.flatLabels} scene={scene} t={t} />
      <IsoLabels groupRef={stage.isoLabels} scene={scene} t={t} />
    </svg>
  );
}
