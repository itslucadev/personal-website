import { notFound } from 'next/navigation';

/** Sends unknown paths below a locale to `[lang]/not-found.tsx`, inside the localized layout. */
export default function CatchAll() {
  notFound();
}
