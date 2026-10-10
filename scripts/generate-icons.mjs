// Generates the favicon and touch icons from one SVG design: a gravity-assist
// flyby around a planet, the same mark as the header logo (src/components/Logo.astro).
// Usage: pnpm icons
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { chromium } from '@playwright/test';

import {
  FLYBY,
  FLYBY_DASH,
  FLYBY_STROKE_WIDTH,
  PLANET,
} from '../src/lib/logo-flyby.ts';

const PUBLIC_DIR = resolve(
  dirname(fileURLToPath(import.meta.url)),
  '../public',
);

const BACKGROUND = '#171a2b';
const STAR = '#3a3f63';
const INK = '#e9ebf5';
const ORBIT = '#a3adff';

// A few faint stars, on the 32 unit logo grid, clear of the trajectory.
const STARS = [
  [4, 15, 0.45],
  [9, 27.5, 0.35],
  [24.5, 26, 0.4],
  [28, 13, 0.3],
];

/**
 * @param {{ maskable?: boolean }} options Maskable icons are full-bleed, with the
 * mark kept inside the 80% safe zone so any platform mask shape fits.
 */
function iconSvg({ maskable = false } = {}) {
  const scale = maskable ? 12 : 16;
  const offset = (512 - 32 * scale) / 2;
  const stars = STARS.map(
    ([cx, cy, r]) => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${STAR}"/>`,
  ).join('');

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <rect width="512" height="512" rx="${maskable ? 0 : 112}" fill="${BACKGROUND}"/>
  <g transform="translate(${offset} ${offset}) scale(${scale})">
    ${stars}
    <circle cx="${PLANET.cx}" cy="${PLANET.cy}" r="${PLANET.r}" fill="${ORBIT}"/>
    <g fill="none" stroke-width="${FLYBY_STROKE_WIDTH}" stroke-linecap="round" stroke-linejoin="round">
      <path d="${FLYBY.incoming}" stroke="${INK}"/>
      <path d="${FLYBY.outgoing}" stroke="${ORBIT}" stroke-dasharray="${FLYBY_DASH}"/>
    </g>
  </g>
</svg>
`;
}

const outputs = [
  { file: 'favicon.svg', svg: iconSvg() },
  { file: 'favicon.64.png', svg: iconSvg(), size: 64 },
  { file: 'favicon.512.png', svg: iconSvg(), size: 512 },
  { file: 'apple-touch-icon.png', svg: iconSvg({ maskable: true }), size: 180 },
];

const browser = await chromium.launch();
const page = await browser.newPage();

for (const { file, svg, size } of outputs) {
  const target = resolve(PUBLIC_DIR, file);
  mkdirSync(dirname(target), { recursive: true });
  if (!size) {
    writeFileSync(target, svg);
  } else {
    await page.setViewportSize({ width: size, height: size });
    await page.setContent(
      `<html><body style="margin:0;background:transparent">
        <img src="data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}" width="${size}" height="${size}" style="display:block">
      </body></html>`,
    );
    await page.screenshot({ path: target, omitBackground: true });
  }
  console.log(`wrote public/${file}`);
}

await browser.close();
