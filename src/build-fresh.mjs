#!/usr/bin/env node
/**
 * Regenerate src/starData.json from Wikipedia.
 *   npm run build:fresh
 */

import fs from 'node:fs/promises';
import fetch from 'node-fetch';           // OK for Node ≥ 18, or use global fetch
import { load } from 'cheerio';

const WIKI = 'https://en.wikipedia.org/wiki/List_of_proper_names_of_stars';

const html = await fetch(WIKI).then(r => r.text());
const $    = load(html);

const names = [];

/**
 * Each star row lives in a sortable wikitable.
 * We grab every <tr> inside every .wikitable.sortable and take the first <td>.
 */
$('table.wikitable.sortable tbody tr').each((_, tr) => {
  const firstCell = $(tr).find('td').first();
  if (!firstCell.length) return;        // skip header rows

  // Remove footnote markers like “Achird [a]” or “Adhara [15]”
  const name = firstCell.text().replace(/\[\w+?]/g, '').trim();

  // Rows that aren’t IAU-approved have a †; skip them.
  if (name && !name.endsWith('†')) names.push(name);
});

if (!names.length) {
  console.error('⚠️  No names extracted—Wikipedia layout may have changed.');
  process.exit(1);
}

await fs.writeFile(
  new URL('./starData.json', import.meta.url),
  JSON.stringify(names, null, 2) + '\n'
);

console.log(`✅  Wrote ${names.length} names to starData.json`);
