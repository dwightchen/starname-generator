import assert from 'node:assert/strict';
import { init, randomStar, randomStarList, randomConstellation, randomConstellationList } from '../src/index.js';

console.log('⭐  starname-generator – sanity checks');

(async () => {
  await init(); // Ensure data is loaded before running tests

  // 1. `randomStar()` returns a non-empty string
  const single = randomStar();
  assert.equal(typeof single, 'string', '`randomStar()` should return a string');
  assert.ok(single.length > 0, '`randomStar()` should not return an empty string');

  // 2. `randomStarList(10)` returns 10 unique names
  const list = randomStarList(10);           // default unique=true
  console.log('Random stars:', list);
  assert.equal(list.length, 10, 'randomStarList should return 10 items');
  assert.equal(new Set(list).size, 10, 'star names should be unique');

  // 3. `randomStarList(5, false)` allows duplicates
  const dupesOk = randomStarList(5, false);
  assert.equal(dupesOk.length, 5, 'randomStarList should still give 5 items when unique=false');

  // 4. `randomConstellation()` returns a non-empty string
  const singleConstellation = randomConstellation();
  assert.equal(typeof singleConstellation, 'string', '`randomConstellation()` should return a string');
  assert.ok(singleConstellation.length > 0, '`randomConstellation()` should not return an empty string');

  // 5. `randomConstellationList(5)` returns 5 unique constellation names
  const constellationList = randomConstellationList(5);
  console.log('Random constellations:', constellationList);
  assert.equal(constellationList.length, 5, 'randomConstellationList should return 5 items');
  assert.equal(new Set(constellationList).size, 5, 'constellation names should be unique');

  // 6. `randomConstellationList(3, false)` allows duplicates
  const constellationDupesOk = randomConstellationList(3, false);
  assert.equal(constellationDupesOk.length, 3, 'randomConstellationList should still give 3 items when unique=false');

  console.log('✅  All Node.js tests passed!');

  // --- Web browser compatibility test (pseudo-test) ---
  // This is a usage example for browser environments.
  // To actually run this, copy into a browser test harness or HTML file.
  if (typeof window !== 'undefined') {
    (async () => {
      // Import the module (assumes ES module support and correct path)
      // import { init, randomStar } from './src/index.js';
      await init();
      const star = randomStar();
      if (typeof star === 'string' && star.length > 0) {
        console.log('✅ Browser test: randomStar() returned:', star);
      } else {
        throw new Error('❌ Browser test: randomStar() did not return a valid string');
      }
    })();
  } else {
    console.log('ℹ️ Browser test skipped (not running in browser)');
  }
})();
