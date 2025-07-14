// Tiny load-helper for constellation names.
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);

const constellationNames = require('./constellationData.json');

export default constellationNames;
