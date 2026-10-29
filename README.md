# 遺傳學實驗室 · Inheritance lab

An offline-capable, dependency-free bilingual learning simulation for Hong Kong senior secondary biology. Traditional Chinese is the default; the persistent English switch changes presentation without resampling offspring. Essential assets are local. No accounts, API keys, external fonts or runtime services are required.

## Offline release

Download `offline.html` and double-click it. It contains all CSS, JavaScript and text; no server, installation or network is required. Rebuild after changes with `npm run build`. The modular source remains the maintainable development version.

## Run

Requires Python 3. From the repository directory:

```sh
python3 -m http.server 8000 --bind 0.0.0.0
```

Open the server in your browser. `npm start` runs the same command. To test the scientific model with Node.js 18 or newer:

```sh
npm test
```

Any static web host can serve these files; no build is necessary. Do not open `index.html` via `file://`, as browser module security requires HTTP.

## Learning workflow

Select a cross, inspect parental allele segregation, and generate 1, 10, 100 or 1000 independent offspring. Dashed highlighted gametes show the latest selection; play/pause, slower playback and single step allow inspection. Reset repeats the current seed; replay reproduces the entire current run. New run chooses a fresh seed and a fresh hidden test parent. Changing crosses clears only the current run; saved snapshots remain fixed. Save repeated independent runs for comparison, then export their real model settings, seed, counts, genotype and phenotype probabilities, assumptions and written responses as CSV. CSV export explicitly reveals the parental genotype, including a hidden test parent.

Explore reveals theory immediately. Guided mode hides completed squares and probabilities until an attempt or explicit reveal. Students predict, operate, observe and write an ungraded explanation. Six prompts and two optional hint steps cover the specified concepts. The label toggle hides diagram labels while retaining allele symbols. Native controls support keyboard access; no drag interaction is required. Motion honours the system reduced-motion preference.

## Scientific model

`model.js` separates scientific logic from the interface. Every fertilisation samples one equally likely allele slot from each parent independently, using a seeded Mulberry32 generator. Equivalent unordered genotypes are canonicalised before counting. Slot duplication correctly models homozygote gamete probabilities. No outcome balancing is used.

- Tall/short peas: complete dominance, TT/Tt tall and tt short.
- Test cross: a hidden TT or Tt crossed with tt. Recessive offspring excludes TT; a finite all-dominant sample never establishes certainty. Old hidden runs have their own explicit reveal button.
- Dihybrid peas: independent R/r shape and Y/y colour loci with complete dominance. The 9:3:3:1 ratio applies to RrYy × RrYy, not every cross.
- ABO: three population alleles, two per diploid genotype. A and B each retain two possible genotypes; AB is codominant. Unicode superscripts are retained in UI and CSV.
- XX/XY and fictional X-linked recessive example: equal sex probabilities, alleles on X only, no father-to-son X inheritance. Carrier mother × unaffected father gives affected offspring in 50% of sons and 25% of all offspring. This is a simplified textbook-style model, not a complete description of sex or gender.

The quantities are simulations, not experimental or measured human data. Bigger samples tend to approach theoretical proportions overall, but no individual larger sample is guaranteed closer. Playback speed changes viewing only. Language is persisted locally; run data remain in memory until the page is closed or refreshed. `i18n.js` contains the stable-ID bilingual text dictionary and full supplied glossary.

## Source boundary

The supplied pasted specification and glossary are the implemented source. The referenced `te_26_c.pdf` was **not attached**. Textbook pages, diagrams and the applicable EDB supplementary document have not been independently checked; source alignment remains a teacher-review task when those sources are supplied. Diagrams are original HTML/CSS. No enrichment outside the requested scope is included.

## Completed acceptance checks

`tests/model.test.js`: five tests, all passed:

1. TT × tt → only Tt; Tt × tt → 1:1; Tt × Tt → 1:2:1 genotypes and 3:1 phenotypes.
2. Identical seeds reproduce outcomes; four-offspring samples across seeds produce several recessive counts, rather than a forced ratio.
3. Correct RrYy gametes and 9:3:3:1 probabilities; rryy control does not use that ratio.
4. All six ABO genotype mappings and Iᴬi × Iᴮi → 25% each A/B/AB/O.
5. X-linked affected-son probability 25% overall and 50% among sons; paternal gametes Xᴳ or Y.

Headless Chromium functional checks passed: all six modules generate offspring; 100-offspring replay reproduces the original result; language switching preserves counts; saved batch remains while selecting new crosses; finite all-dominant test evidence preserves uncertainty; challenge attempts and hints operate; 390 px viewport has no horizontal overflow; no browser page errors. Additional browser checks cover CSV download, hidden-parent language retention, and saved snapshot stability. These checks demonstrate model and browser behaviour, not independent textbook/EDB verification.

Offline validation: loaded the complete `offline.html` document into Chromium with networking disabled and verified sampling, bilingual state retention, saved snapshots and CSV download. The managed browser blocks `file://` navigation by administrator policy, so direct double-click navigation could not be exercised in this environment. The offline file uses classic inline JavaScript and local styles, with guarded optional local storage, to avoid module/file-origin restrictions.
