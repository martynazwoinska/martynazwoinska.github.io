# PROJECT_STATUS.md

Last updated: 2026-07-19

This file records approved decisions and the verified implementation state. Always inspect the current repository before acting.

## Website

- Repository: `martynazwoinska/martynazwoinska.github.io`
- Hosting: GitHub Pages from `main` and the repository root
- Stack: plain HTML, CSS, and JavaScript
- Main visual direction: restrained Art Nouveau / Pre-Raphaelite
- Primary colours: emerald, antique gold, muted violet or berry
- Display font: Cormorant Garamond
- Homepage and Cabinet light and dark themes must remain functional. The Game intentionally uses one fixed light theme, independent of the website theme preference.
- The paired Ivory Ink and Marine Ink themes use page-matched navigation backgrounds with a fine antique-gold hairline. Marine Ink uses the approved balanced `#213d50` field, with coordinated `#294b5e` and `#34576c` surfaces, rather than either the former darker navy or the washed-out Harbour study. The theme toggle keeps its 34 px interaction box and 28 px antique-gold face at every viewport. In the compact mobile header, only the half-filled glyph reduces from 20 px to 17 px; the face retains its dimensions while using a softer fill and half-pixel hairline.
- Homepage language options: English, Swedish, and Polish
- The Swedish homepage uses Martyna’s supplied official Swedish institutional and postal address. English retains the existing English form; Polish intentionally falls back to that English form until separate Polish wording is supplied or approved. The translated email-button label is separate.

## Parallel ownership

- `agent/site-architecture`: homepage, shared files, documentation and integration
- `agent/cabinet`: `cabinet-of-curiosities/**` only
- `agent/game-worms`: `game-of-worms/**` only
- independent QA: read-only review with no file edits

The durable workflow is documented in `docs/agent-workflow.md`. The shared layer uses prefixed `--site-*` tokens and preserves the existing `language` and `theme` storage keys. Translation dictionaries remain page-local.

## Beyond Research

Approved information architecture:

```text
Beyond Research
├── The Game of Worms
└── The Cabinet of Curiosities
```

### The Game of Worms card

- Description: `A browser game inspired by nematode biology, with creative input from my children.`
- Action: `Play →`
- Destination: `game-of-worms/index.html`
- The card includes a restrained interactive nematode preview.

### The Cabinet of Curiosities card

- Description: `Craft chocolate became another subject I got really into!`
- Action: `Explore →`
- Destination: `cabinet-of-curiosities/index.html`
- The Cacao of Excellence programme’s official 2021 `Cocoa of Excellence Flavour Wheel` is the only approved preview graphic.
- The Cabinet link and flavour-wheel button remain separate semantic controls.
- The homepage preview uses short translated accessibility names and a compact visible `CC BY-NC 4.0` source/licence link, with no written wheel instruction or full attribution caption below the graphic.

The two cards have equal visual weight, stack on mobile, retain emerald and antique-gold borders, preserve visible focus, and respect reduced motion.

## Verified implementation on `main`

- The homepage, Game of Worms, and Cabinet of Curiosities are deployed through GitHub Pages.
- The homepage hero uses the approved transparent botanical assets in paired Ivory Ink light and Marine Ink dark palettes. Desktop and wide tablet layouts (760 px and above) retain the oval portrait between deliberately separated upper-left and lower-right ornaments; the name and portrait read as one compact composition centred between those botanical borders. The portrait has one theme-coherent outline rather than a double cameo ring. A small antique-gold Quiet Atelier signet closes the hero without acting as a section divider. The compact 621–759 px layout keeps the upper flourish and a scaled signet. Phones omit the portrait, upper ornament and signet, centre the name in three rows, and use the lower flourish as the hero-specific transition into About. On phones, the translated affiliation deliberately stacks the department, university and country on three separate lines; wider layouts retain compact comma-separated wording. The standard divider is suppressed only above About; later section dividers remain.
- The approved hero sources are `photo.jpg`, `assets/hero/quiet-atelier-upper-left.png`, `assets/hero/quiet-atelier-upper-left-dark.png`, `assets/hero/quiet-atelier-lower-right.png`, and `assets/hero/quiet-atelier-lower-right-dark.png`. Preserve these assets rather than reconstructing their ornament. Display headings use real Cormorant Garamond 700 with a subtle theme-aware optical stroke. The hero name uses `.46px` in Ivory Ink and `.34px` in Marine Ink; do not substitute a synthetic 800 weight.
- Shared theme and language-preference handling is present under `shared/`.
- The homepage footer uses the exact page background in both themes so the page remains visually continuous; its antique-gold top rule provides the only separation.
- The desktop homepage header includes a restrained `MZ` monogram that is omitted from compact navigation. Collaborators and students share one numbered, flat folio-list treatment; research interests, Beyond Research and Contact retain their existing card treatments. The chatbot quotation is presented as a quiet editorial field note, and the footer contains only the localized copyright affiliation line.
- Explicit homepage and Cabinet theme choices update their browser `theme-color` metadata, and the homepage theme control follows a live operating-system theme change when no explicit preference is stored.
- Homepage behaviour and translations are separated into `home.js` and `home-i18n.js`.
- The Game does not load shared theme tokens or preferences. Its one light palette, browser colour and module cache keys remain independent after navigating from either homepage theme; obsolete dark-only Game CSS overrides have been removed.
- Each worm’s copy of a Game of Worms accessory can be repositioned independently. There is no separate worm-target selector: visitors switch an accessory on, then drag its visible copy directly. Keyboard users focus that same visible object, move it with the arrow keys, and press Home to reset it. Positions remain separate for each worm, species, and location during the session. The random `Surprise me` control has been removed.
- The Game has 37 explicit, source-backed regional landscape profiles and 37 matching scene compositions. Each composition has its own ground, middle distance, foreground cues, route, cue order, and recognisable silhouette; there is no generic environment fallback.
- The Game has 37 explicit three-item accessory sets: 111 named designs in total. No accessory family is used more than twice, paired objects have visibly different geometry, and no emoji or species-level costume fallback remains. N2 keeps its seeded NGM agar plate, fitted lab coat, and cryo-vial jetpack.
- `docs/game-of-worms-art-catalogue.md` is the durable illustration catalogue for landscape evidence, composition locks, and accessory concepts. Clothing and props are playful geography-, ecology-, collection-, or research-derived designs, not claims of authentic local dress.
- Seventeen locations are complete under the higher-detail, one-location-at-a-time art workflow: Bristol N2, Santeuil, Edinburgh, Tenerife, Kauaʻi XZ1516, Australian Capital Territory QG2811, Auckland ECA36, Araucanía JU4400, Trivandrum JU1325, Singapore ZF1220, Praslin YR106, São Tomé JU2484, Pohnpei QG4739, Queensland QG2904, Saint-Benoît JU1373 (Réunion), Nouragues JU1428 and Manaus region JU1976. Each has a dedicated scene tied to its collection evidence, six bespoke movable objects and completed responsive interaction QA.
- `docs/game-of-worms-location-research/` stores the evidence boundary, illustration contract and interaction acceptance tests for each researched location. Every remaining location requires an equivalent dossier before revision.
- Each landscape retains an internal evidence note and primary or official source link in the Game data/catalogue; these provenance notes are not displayed as a `Place clues` block on the public Game page. The landscape is clearly described internally as wider regional context rather than the exact microscopic collection substrate.
- The Cabinet uses separate HTML, CSS, JavaScript, translation, and data files.
- The Cabinet presents the authentic photographed object board inside an extended fantasy surround.
- On phones held vertically, the Cabinet asks the visitor to turn the device sideways; the interactive board is presented in landscape orientation.
- On coarse-pointer phones held sideways, the Cabinet scene supports one-finger panning, two-finger pinch zoom, visible zoom/reset controls and keyboard equivalents. The authentic scene and its percentage-based hotspot overlay share one transform, so markers remain aligned while the visitor moves or scales the view.
- The board has percentage-based responsive hotspots for 35 chocolate packages, two crocheted eyes, and the S-Foodies sticker.
- A browseable collection index and reusable accessible object-detail dialog are implemented.
- The Cacao of Excellence programme’s 2021 `Cocoa of Excellence Flavour Wheel` opens in a separate accessible dialog with source and licence attribution.
- The long crocheted worm, blue crocheted octopus, and surrounding decoration remain non-interactive.
- No temporary deployment workflow remains under `.github/workflows/`.

## Cabinet source images

Approved stylised source image:

```text
cabinet-of-curiosities/assets/cabinet-of-curiosities.png
```

Untouched original photograph:

```text
cabinet-of-curiosities/assets/cabinet-original-photo.jpg
```

Do not overwrite or confuse these files. The original photograph is the source of truth for wrapper identities, wrapper text, and object placement. Live composite derivatives must preserve the authentic photographed board and extend only the surrounding fantasy setting.

## Confirmed chocolate information

- Storm & Bille: Uganda chilli bar, 70%.
- Raaka: Tanzania, 100%.
- Vigdis Rosenkilde: Echarate, 80%.
- Kamm: Ecuador, 85%.
- Luisa Abram: Rio Juruá, 70%.
- Paradai: Nakhon Si Thammarat Red Pod, 70%; EU distributor:
  `https://premifair.com/products/paradai-schokolade-nakhon-si-thammarat-red-pod-70-thailand`
- Paradai: Chanthaburi, 70%; EU distributor:
  `https://premifair.com/products/paradai-chanthaburi-70`
- Malmö Chokladfabrik: Sambirano, Madagascar, 70%; the central rectangular wrapper showing the chocolate-making process.
- Friis-Holm mini bars share:
  `https://friisholmchokolade.dk/products/bag-mix-12-x-5-g`
- Taza: the circular package, not the Malmö Chokladfabrik wrapper.
- Zotter Labooko White: the small pale wrapper on the right, not Omnom.
- Chocolate Naive: Xocoatl.

All chocolate identities currently recorded in `cabinet-of-curiosities/cabinet-data.js` were confirmed by the user on 2026-07-13. The Friis-Holm bars link to the official mixed mini-bars collection because individual flavours are not assigned.

## Crochet eyes

Both crocheted eyes use the confirmed Blooming Eye Crochet Pattern:

```text
https://www.etsy.com/listing/4342094945/blooming-eye-crochet-pattern-pdf
```

The Etsy pattern is the only external link planned for these objects.

## Current follow-up work

1. Revise the remaining 20 Game locations one at a time. Validate and update the existing dossier where one is already present; create a source-backed dossier for each of the nine locations that still lacks one before revising its landscape and three accessory pairs.
2. Treat catalogue uniqueness as a structural check, not proof of visual quality. Compare every revised pair for silhouette, material construction, body fit, combined readability and genuinely different primary/companion geometry.
3. Keep the maximum-two accessory-family rule and N2’s three approved concepts. If a family is used twice, the two location designs must differ in material, outline, proportions and internal construction.
4. Test direct pointer and keyboard movement independently for both worm copies at every revised location.
5. Keep `game-of-worms/` unchanged during Cabinet-only work.
