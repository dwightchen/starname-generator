# starname-generator

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
import { randomStar, randomStarList } from 'starname-generator';

console.log(randomStar());           // "Vega"
console.log(randomStarList(3));      // [ "Rigel", "Betelgeuse", "Acrux" ]
console.log(randomStarList(4, false)); // allow duplicates
```

---

## API Reference

| Function                               | Returns    | Notes                                                                                                                                                                                                   |
| -------------------------------------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `random()`                             | `string`   | One random star name.                                                                                                                                                                                   |
| `randomList(count = 1, unique = true)` | `string[]` | • `count` must be a positive integer.• When `unique` is `true` (default), duplicates are prevented and the function throws if `count` > 505.• When `unique` is `false`, names may repeat (faster path). |

Both functions throw `TypeError` for invalid arguments and `RangeError` when you request more unique names than exist.

---

## Dataset provenance

The list in `src/starData.json` is pulled from the Wikipedia article **“List of proper names of stars”** (revision **11 July 2025**) whose first column is the *Modern proper name* recognised by the IAU WGSN.

*URL used by the scraper:* `https://en.wikipedia.org/wiki/List_of_proper_names_of_stars`

### Keeping it fresh

Running:

```bash
npm run build:fresh
```

executes `src/build-fresh.mjs`, which:

1. fetches the current Wikipedia page,
2. extracts the first‑column star names (skipping footnote markers), and
3. rewrites `starData.json` with the new array.

If WGSN adds or changes names, just re‑run the script and bump your package version.

---

## Project structure

```
starname-generator/
├── package.json
├── README.md        ← you are here
└── src
    ├── starData.json   ← 505‑element array
    ├── starData.js     ← tiny loader for the JSON
    ├── build-fresh.mjs ← scraper to regenerate the JSON
    └── index.js        ← public API & CLI
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

