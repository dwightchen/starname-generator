import assert from 'node:assert/strict';
import { randomStar, randomStarList } from '../src/index.js';

console.log('⭐  starname-generator – sanity checks');

// 1. `random()` returns a non-empty string
const single = randomStar();
assert.equal(typeof single, 'string', '`randomStar()` should return a string');
assert.ok(single.length > 0, '`randomStar()` should not return an empty string');

// 2. `randomList(10)` returns 10 unique names
const list = randomStarList(10);           // default unique=true
console.log(list)
assert.equal(list.length, 10, 'randomStarList should return 10 items');
assert.equal(new Set(list).size, 10, 'names should be unique');

// 3. `randomList(5, false)` allows duplicates
const dupesOk = randomStarList(5, false);
assert.equal(dupesOk.length, 5, 'randomStarList should still give 5 items when unique=false');

console.log('✅  All simple tests passed!');
