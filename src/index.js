#!/usr/bin/env node
/**
 * starname-generator / src/index.js
 *
 * Public API + tiny CLI.
 * Depends on `starData.js`, which exports an async function to load
 * the full 505-entry IAU/WGSN star-name catalogue from starData.json.
 *
 * Usage (programmatic):
 *   import { init, randomStar, randomStarList } from 'starname-generator';
 *
 * Usage (CLI):
 *   npx starname-generator 10
 */

import getStarNames from './starData.js';
import getConstellationNames from './constellationData.js';

let starNames = [];
let constellationNames = [];

/**
 * Initialize star and constellation data.
 * Must be called (and awaited) before using any random* function.
 */
export async function init() {
  starNames = await getStarNames();
  constellationNames = await getConstellationNames();
}

/**
 * Return one random constellation name.
 * @returns {string}
 */
export function randomConstellation() {
  if (!constellationNames.length) throw new Error('Call init() before using randomConstellation()');
  return constellationNames[Math.floor(Math.random() * constellationNames.length)];
}

/**
 * Return an array of `count` random constellation names.
 *
 * @param {number}  count   How many names to return (default = 1)
 * @param {boolean} unique  If true, do not repeat names (throws if
 *                          count > available names)
 * @returns {string[]}
 */
export function randomConstellationList(count = 1, unique = true) {
  if (!constellationNames.length) throw new Error('Call init() before using randomConstellationList()');
  if (!Number.isInteger(count) || count < 1) {
    throw new TypeError('`count` must be a positive integer');
  }

  if (!unique) {
    // allow repeats – faster path
    return Array.from({ length: count }, () => randomConstellation());
  }

  // For unique names, ensure no duplicates (constellation names are already unique)
  if (count > constellationNames.length) {
    throw new RangeError(
      `Requested ${count} unique names, but only ${constellationNames.length} constellation names available`
    );
  }

  // unique draw from the constellation names
  const pool = [...constellationNames];
  const out = [];
  while (out.length < count) {
    const idx = Math.floor(Math.random() * pool.length);
    out.push(pool.splice(idx, 1)[0]);
  }
  return out;
}

/**
 * Return one random star name.
 * @returns {string}
 */
export function randomStar() {
  if (!starNames.length) throw new Error('Call init() before using randomStar()');
  return starNames[Math.floor(Math.random() * starNames.length)];
}

/**
 * Return an array of `count` random star names.
 *
 * @param {number}  count   How many names to return (default = 1)
 * @param {boolean} unique  If true, do not repeat names (throws if
 *                          count > available names)
 * @returns {string[]}
 */
export function randomStarList(count = 1, unique = true) {
  if (!starNames.length) throw new Error('Call init() before using randomStarList()');
  if (!Number.isInteger(count) || count < 1) {
    throw new TypeError('`count` must be a positive integer');
  }

  if (!unique) {
    // allow repeats – faster path
    return Array.from({ length: count }, () => randomStar());
  }

  // For unique names, we need to work with unique values, not just unique indices
  const uniqueStarNames = [...new Set(starNames)];
  
  if (count > uniqueStarNames.length) {
    throw new RangeError(
      `Requested ${count} unique names, but only ${uniqueStarNames.length} unique names available`
    );
  }

  // unique draw from the unique names
  const pool = [...uniqueStarNames];
  const out = [];
  while (out.length < count) {
    const idx = Math.floor(Math.random() * pool.length);
    out.push(pool.splice(idx, 1)[0]);
  }
  return out;
}

// ---------------------------------------------------------------------------
// CLI execution (node src/index.js 5)
// ---------------------------------------------------------------------------
if (import.meta.url === `file:///${process.argv[1].replace(/\\/g, '/')}`) {
  const arg = process.argv[2] ?? '1';
  const howMany = Number.parseInt(arg, 10);

  if (!Number.isInteger(howMany) || howMany < 1) {
    console.error('Usage: starname-gen <positive integer>');
    process.exit(1);
  }

  // Ensure data is loaded before generating names
  (async () => {
    await init();
    console.log(randomStarList(howMany).join('\n'));
  })();
}
