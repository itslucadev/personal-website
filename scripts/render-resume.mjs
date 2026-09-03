// Rasterises the resume PDFs in public/ to WebP pages in public/resume/.
// Run after replacing main_en.pdf or main_de.pdf: `npm run resume:render`.
// Browsers on phones do not render embedded PDFs, so the site shows these
// images and links to the PDF for download.

import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { createCanvas } from "@napi-rs/canvas";
import { getDocument } from "pdfjs-dist/legacy/build/pdf.mjs";
import sharp from "sharp";

const ROOT = path.resolve(import.meta.dirname, "..");
const OUT_DIR = path.join(ROOT, "public", "resume");
const MANIFEST = path.join(ROOT, "src", "lib", "resume-pages.json");
const SCALE = 2.5; // 595pt wide A4 -> ~1490px, sharp on retina at the panel width
const SOURCES = [
  ["main_en.pdf", "en"],
  ["main_de.pdf", "de"],
];

await mkdir(OUT_DIR, { recursive: true });

const manifest = {};

for (const [file, lang] of SOURCES) {
  const data = new Uint8Array(await readFile(path.join(ROOT, "public", file)));
  const pdf = await getDocument({ data, useSystemFonts: true }).promise;
  const pages = [];

  for (let number = 1; number <= pdf.numPages; number += 1) {
    const page = await pdf.getPage(number);
    const viewport = page.getViewport({ scale: SCALE });
    const canvas = createCanvas(viewport.width, viewport.height);
    const context = canvas.getContext("2d");
    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, viewport.width, viewport.height);
    await page.render({ canvas, canvasContext: context, viewport }).promise;

    const name = `${lang}-${number}.webp`;
    await writeFile(
      path.join(OUT_DIR, name),
      await sharp(canvas.toBuffer("image/png")).webp({ quality: 88 }).toBuffer()
    );
    pages.push({
      src: `/resume/${name}`,
      width: Math.round(viewport.width),
      height: Math.round(viewport.height),
    });
    console.log(
      `rendered ${name} (${pages.at(-1).width}x${pages.at(-1).height})`
    );
  }

  manifest[lang] = pages;
}

await writeFile(MANIFEST, `${JSON.stringify(manifest, null, 2)}\n`);
console.log("wrote src/lib/resume-pages.json");
