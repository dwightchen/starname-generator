#!/usr/bin/env node

import { init, randomStarList } from './index.js';

const arg = process.argv[2] ?? '1';
const howMany = Number.parseInt(arg, 10);

if (!Number.isInteger(howMany) || howMany < 1) {
  console.error('Usage: starname-gen <positive integer>');
  process.exit(1);
}

(async () => {
  await init();
  console.log(randomStarList(howMany).join('\n'));
})();