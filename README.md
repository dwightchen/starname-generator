# starname-generator

> **Generate random star names and constellation names fromThe lists in `src/starData.json` and `src/constellationData.json` are pulled from the Wikipedia article **"List of proper names of stars"** (revision **11 July 2025**):

- **Star names**: extracted from the *Modern proper name* column (505 names)
- **Constellation names**: extracted from the *Constellation* column, deduplicated (78 unique names)the complete IAU / WGSN catalogue**

`starname-generator` is a tiny JavaScript / Node package that returns one‑liner access to every officially recognised modern proper star name—\*all 505 of them, as of the IAU Working Group on Star Names (WGSN) list dated \****11 July 2025***—plus the 78 constellation names where those stars are located.

- **📚 Accurate** – dataset scraped directly from the latest Wikipedia table that mirrors the IAU list
- **🪶 Lightweight** – < 12 kB JSON payload total
- **⚡️ Zero‑dependency CLI & API** – Node ≥ 18 and modern ESM bundlers
- **🔄 Easy to update** – one command refreshes the JSON when new stars are approved
- **🌌 Stars + Constellations** – Generate both individual star names and constellation names-generator

> **Generate random, real star names from the complete IAU / WGSN catalogue**

`starname-generator` is a tiny JavaScript / Node package that returns one‑liner access to every officially recognised modern proper star name—\*all 505 of them, as of the IAU Working Group on Star Names (WGSN) list dated \****11 July 2025***.

- **📚 Accurate** – dataset scraped directly from the latest Wikipedia table that mirrors the IAU list
- **🪶 Lightweight** – < 8 kB JSON payload
- **⚡️ Zero‑dependency CLI & API** – Node ≥ 18 and modern ESM bundlers
- **🔄 Easy to update** – one command refreshes the JSON when new stars are approved

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
import { randomStar, randomStarList, randomConstellation, randomConstellationList } from 'starname-generator';

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

### Star Functions

| Function                               | Returns    | Notes                                                                                                                                                                                                   |
| -------------------------------------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `randomStar()`                         | `string`   | One random star name.                                                                                                                                                                                   |
| `randomStarList(count = 1, unique = true)` | `string[]` | • `count` must be a positive integer.• When `unique` is `true` (default), duplicates are prevented and the function throws if `count` > 505.• When `unique` is `false`, names may repeat (faster path). |

### Constellation Functions

| Function                               | Returns    | Notes                                                                                                                                                                                                   |
| -------------------------------------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `randomConstellation()`                | `string`   | One random constellation name.                                                                                                                                                                          |
| `randomConstellationList(count = 1, unique = true)` | `string[]` | • `count` must be a positive integer.• When `unique` is `true` (default), duplicates are prevented and the function throws if `count` > 78.• When `unique` is `false`, names may repeat (faster path). |

Both functions throw `TypeError` for invalid arguments and `RangeError` when you request more unique names than exist.

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
    ├── starData.js            ← tiny loader for star names JSON
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

MIT © 2025 Your Name

