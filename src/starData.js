// Tiny load-helper so index.js can stay as-is.
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);

const starNames = require('./starData.json');   // ← 505 names

export default starNames;
