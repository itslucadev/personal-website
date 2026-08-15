/**
 * Entrance timing for the homepage sections below the experience list, in the order they
 * appear on the page.
 *
 * Every section listed here reads its start, description, and body delays from here instead
 * of hardcoding them, and each start is derived from the spans of the sections above it.
 * Inserting or reordering a section is a single edit to this list, and the sections below
 * shift with it automatically.
 * Per-item staggering within a section body still lives in the component that renders those
 * items, such as ProjectCard and SocialBadge, and is not controlled by this module.
 *
 * The hero, experience, and footer are not part of this cascade and still hardcode their own
 * delays, so changing FIRST_SECTION_DELAY or a span here can collide with them.
 */
const SECTIONS = [
  { key: "projects", span: 0.11 },
  { key: "clientWork", span: 0.12 },
  /** Wider span: the skill badges keep fanning in well past the grid itself. */
  { key: "skills", span: 0.17 },
  { key: "social", span: 0.15 },
] as const;

export type HomeSection = (typeof SECTIONS)[number]["key"];

/** When the first stacked section starts: after the hero, while the experience list is still fanning in. */
const FIRST_SECTION_DELAY = 0.55;

/** Gap between two consecutive elements inside the same section. */
const ELEMENT_STEP = 0.03;

const round = (seconds: number) => Number(seconds.toFixed(3));

export function homeCascade(section: HomeSection) {
  const index = SECTIONS.findIndex((entry) => entry.key === section);
  const start = SECTIONS.slice(0, index).reduce(
    (delay, entry) => delay + entry.span,
    FIRST_SECTION_DELAY
  );

  return {
    header: round(start),
    description: round(start + ELEMENT_STEP),
    /** The grid, list, or card row that makes up the section body. */
    body: round(start + 2 * ELEMENT_STEP),
    /** The nth item staggering in inside the section body. */
    item: (itemIndex: number) =>
      round(start + 3 * ELEMENT_STEP + itemIndex * ELEMENT_STEP),
  };
}
