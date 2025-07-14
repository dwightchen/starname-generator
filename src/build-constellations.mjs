#!/usr/bin/env node
/**
 * Generate src/constellationData.json with constellation names
 * extracted from the star data.
 *   npm run build:constellations
 */

import fs from 'node:fs/promises';
import fetch from 'node-fetch';
import { load } from 'cheerio';

const WIKI = 'https://en.wikipedia.org/wiki/List_of_proper_names_of_stars';

const html = await fetch(WIKI).then(r => r.text());
const $ = load(html);

const constellations = new Set();

/**
 * Extract constellation names from the first column of the star table.
 */
$('table.wikitable.sortable tbody tr').each((_, tr) => {
  const cells = $(tr).find('td');
  if (cells.length < 1) return;        // skip header rows

  // Get the first column which contains the constellation name
  const constellationCell = cells.eq(0);
  const name = constellationCell.text().trim();

  if (name) {
    constellations.add(name);
  }
});

// Convert Set to sorted array
const constellationList = Array.from(constellations).sort();

if (!constellationList.length) {
  console.error('⚠️  No constellation names extracted—Wikipedia layout may have changed.');
  process.exit(1);
}

await fs.writeFile(
  new URL('./constellationData.json', import.meta.url),
  JSON.stringify(constellationList, null, 2) + '\n'
);

console.log(`✅  Wrote ${constellationList.length} constellation names to constellationData.json`);
