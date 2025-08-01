# starname-generator

> **Generate random, real star names and constellation names from the complete IAU / WGSN catalogue**

The lists in `src/starData.json` and `src/constellationData.json` are pulled from the Wikipedia article **"List of proper names of stars"** (revision **11 July 2025**):

- **Star names**: extracted from the *Modern proper name* column (505 names)
- **Constellation names**: extracted from the *Constellation* column, deduplicated (78 unique names)

`starname-generator` is a tiny JavaScript / Node package that returns one‑liner access to every officially recognised modern proper star name—*all 505 of them, as of the IAU Working Group on Star Names (WGSN) list dated **11 July 2025***—plus the 78 constellation names where those stars are located.

- **📚 Accurate** – dataset scraped directly from the latest Wikipedia table that mirrors the IAU list
- **🪶 Lightweight** – < 12 kB JSON payload total
- **⚡️ Zero‑dependency CLI & API** – Node ≥ 18 and modern ESM bundlers
- **🔄 Easy to update** – one command refreshes the JSON when new stars are approved
- **🌌 Stars + Constellations** – Generate both individual star names and constellation names

---

## Installation

```bash
npm install starname-generator      # package + CLI
# or
npx starname-generator 10           # quick one‑off use
```

## Quick start (CLI)

```bash
npx starname-generator 5
# → Sirius
#   Deneb
#   Miaplacidus
#   Altair
#   Shaula
```

## Quick start (programmatic)

```js
import { init, randomStar, randomStarList, randomConstellation, randomConstellationList } from 'starname-generator';

await init(); // <-- You must call and await this before using any random* function

// Generate star names
console.log(randomStar());           // "Vega"
console.log(randomStarList(3));      // [ "Rigel", "Betelgeuse", "Acrux" ]
console.log(randomStarList(4, false)); // allow duplicates

// Generate constellation names
console.log(randomConstellation());     // "Orion"
console.log(randomConstellationList(3)); // [ "Cassiopeia", "Ursa Major", "Draco" ]
```

---

## API Reference

### Initialization

| Function      | Returns   | Notes                                                                                      |
| ------------- | --------- | ------------------------------------------------------------------------------------------ |
| `init()`      | `Promise` | **Must be called and awaited before using any random* function.** Loads star/constellation data. |

### Star Functions

| Function                               | Returns    | Notes                                                                                                                                                                                                   |
| -------------------------------------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `randomStar()`                         | `string`   | One random star name. Throws if `init()` was not called.                                                                                                         |
| `randomStarList(count = 1, unique = true)` | `string[]` | • `count` must be a positive integer. <br>• When `unique` is `true` (default), duplicates are prevented and the function throws if `count` > 505.<br>• When `unique` is `false`, names may repeat.      |

### Constellation Functions

| Function                               | Returns    | Notes                                                                                                                                                                                                   |
| -------------------------------------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `randomConstellation()`                | `string`   | One random constellation name. Throws if `init()` was not called.                                                                                                |
| `randomConstellationList(count = 1, unique = true)` | `string[]` | • `count` must be a positive integer. <br>• When `unique` is `true` (default), duplicates are prevented and the function throws if `count` > 78.<br>• When `unique` is `false`, names may repeat.       |

All functions throw `TypeError` for invalid arguments and `RangeError` when you request more unique names than exist.

---

## Usage Notes

### Why is there an `await init()` step?

To support both Node.js and browser environments, this package loads its star and constellation data asynchronously from JSON files. Before you can use any of the random name functions, you must call and `await init()`. This ensures the data is loaded and available, preventing errors or undefined results.

**Example:**
```js
import { init, randomStar } from 'starname-generator';

await init(); // Must be called before using randomStar()
console.log(randomStar());
```

### Can I avoid the `await init()` step?

If your environment supports [ESM JSON imports with import assertions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import#json_modules) (Node.js ≥ 20, modern browsers, or with a bundler like Vite/Webpack), you can import the `.json` files directly for synchronous access, eliminating the need for `init()`. For maximum compatibility, the default package uses the async loader.

**If you want to use direct JSON imports:**
- Replace the async loader in `starData.js` and `constellationData.js` with:
  ```js
  import starNames from './starData.json' assert { type: 'json' };
  import constellationNames from './constellationData.json' assert { type: 'json' };
  ```
- Update your code to use the imported arrays directly.
- This approach is not supported in all environments, so check your runtime or bundler documentation.

---

## Dataset provenance

The list in `src/starData.json` is pulled from the Wikipedia article **“List of proper names of stars”** (revision **11 July 2025**) whose first column is the *Modern proper name* recognised by the IAU WGSN.

*URL used by the scraper:* `https://en.wikipedia.org/wiki/List_of_proper_names_of_stars`

### Keeping it fresh

Running:

```bash
npm run build:fresh              # Updates star names
npm run build:constellations     # Updates constellation names
```

These scripts:

1. fetch the current Wikipedia page,
2. extract the relevant star/constellation names (skipping footnote markers), and
3. rewrite the JSON files with the new arrays.

If WGSN adds or changes names, just re‑run the scripts and bump your package version.

---

## Project structure

```
starname-generator/
├── package.json
├── README.md        ← you are here
└── src
    ├── starData.json          ← 505‑element array of star names
    ├── starData.js            ← universal loader for star names JSON
    ├── constellationData.json ← 78‑element array of constellation names  
    ├── constellationData.js   ← tiny loader for constellation names JSON
    ├── build-fresh.mjs        ← scraper to regenerate star names JSON
    ├── build-constellations.mjs ← scraper to regenerate constellation names JSON
    └── index.js               ← public API & CLI
```

---

## Contributing

1. Fork / clone.
2. `npm install`.
3. Make changes and add tests (PRs without coverage may sit).
4. Run `npm run build:fresh` if you believe the star list changed.
5. Open a pull request.

---

## License

MIT © 2025 Dwight Chen

This module is freely available for use under the [MIT License](./LICENSE.txt).

