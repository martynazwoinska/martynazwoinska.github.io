# PROJECT_STATUS.md

Last updated: 2026-07-16

This file records approved decisions and the verified implementation state. Always inspect the current repository before acting.

## Website

- Repository: `martynazwoinska/martynazwoinska.github.io`
- Hosting: GitHub Pages from `main` and the repository root
- Stack: plain HTML, CSS, and JavaScript
- Main visual direction: restrained Art Nouveau / Pre-Raphaelite
- Primary colours: emerald, antique gold, muted violet or berry
- Display font: Cormorant Garamond
- Light and dark themes must remain functional
- The dark-theme top navigation uses a restrained saturated bronze (`#302a20`); the light-theme green remains `#cbe3d7`.
- Homepage language options: English, Swedish, and Polish

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
- The official Cocoa of Excellence Flavour Wheel is the only approved preview graphic.
- The Cabinet link and flavour-wheel button remain separate semantic controls.

The two cards have equal visual weight, stack on mobile, retain emerald and antique-gold borders, preserve visible focus, and respect reduced motion.

## Verified implementation on `main`

- The homepage, Game of Worms, and Cabinet of Curiosities are deployed through GitHub Pages.
- Shared theme and language-preference handling is present under `shared/`.
- Homepage behaviour and translations are separated into `home.js` and `home-i18n.js`.
- Each worm’s copy of a Game of Worms accessory can be repositioned independently. There is no separate worm-target selector: visitors switch an accessory on, then drag its visible copy directly. Keyboard users focus that same visible object, move it with the arrow keys, and press Home to reset it. Positions remain separate for each worm, species, and location during the session. The random `Surprise me` control has been removed.
- The Game has 37 explicit, source-backed regional landscape profiles and 37 matching scene compositions. Each composition has its own ground, middle distance, foreground cues, route, cue order, and recognisable silhouette; there is no generic environment fallback.
- The Game has 37 explicit three-item accessory sets: 111 named designs in total. No accessory family is used more than twice, paired objects have visibly different geometry, and no emoji or species-level costume fallback remains. N2 keeps its seeded NGM agar plate, fitted lab coat, and cryo-vial jetpack.
- `docs/game-of-worms-art-catalogue.md` is the durable illustration catalogue for landscape evidence, composition locks, and accessory concepts. Clothing and props are playful geography-, ecology-, collection-, or research-derived designs, not claims of authentic local dress.
- Sixteen locations are complete under the higher-detail, one-location-at-a-time art workflow: Bristol N2, Santeuil, Edinburgh, Tenerife, Kauaʻi XZ1516, Australian Capital Territory QG2811, Auckland ECA36, Araucanía JU4400, Trivandrum JU1325, Singapore ZF1220, Praslin YR106, São Tomé JU2484, Pohnpei QG4739, Queensland QG2904, Saint-Benoît JU1373 (Réunion) and Nouragues JU1428. Each has a dedicated scene tied to its collection evidence, six bespoke movable objects and completed responsive interaction QA.
- `docs/game-of-worms-location-research/` stores the evidence boundary, illustration contract and interaction acceptance tests for each researched location. Every remaining location requires an equivalent dossier before revision.
- Each landscape retains a short `Place clues` lesson and a primary or official source link. The landscape is clearly described as wider regional context rather than the exact microscopic collection substrate.
- The Cabinet uses separate HTML, CSS, JavaScript, translation, and data files.
- The Cabinet presents the authentic photographed object board inside an extended fantasy surround.
- On phones held vertically, the Cabinet asks the visitor to turn the device sideways; the interactive board is presented in landscape orientation.
- The board has percentage-based responsive hotspots for 35 chocolate packages, two crocheted eyes, and the S-Foodies sticker.
- A browseable collection index and reusable accessible object-detail dialog are implemented.
- The Cocoa of Excellence Flavour Wheel opens in a separate accessible dialog with source and licence attribution.
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
- Vigdis Rosenkilde: Echarete, 80%.
- Kamm: Ecuador, 85%.
- Luisa Abram: Rio Juruá, 70%.
- Paradai: Nakhon Si Thammarat Red Pod, 70%; EU distributor:
  `https://premifair.com/products/paradai-schokolade-nakhon-si-thammarat-red-pod-70-thailand`
- Paradai: Chanthaburi, 70%; EU distributor:
  `https://premifair.com/products/paradai-chanthaburi-70`
- Malmö Chokladfabrik: Craft Madagascar; the central rectangular wrapper showing the chocolate-making process.
- Friis-Holm mini bars share:
  `https://friisholmchokolade.dk/products/bag-mix-12-x-5-g`
- Taza: the circular package, not the Malmö Chokladfabrik wrapper.
- Zotter Labooko White: the small pale wrapper on the right, not Omnom.
- Chocolate Naive: Xocoatl.

All chocolate identities currently recorded in `cabinet-data.js` were confirmed by the user on 2026-07-13. The Friis-Holm bars link to the official mixed mini-bars collection because individual flavours are not assigned.

## Crochet eyes

Both crocheted eyes use the confirmed Blooming Eye Crochet Pattern:

```text
https://www.etsy.com/listing/4342094945/blooming-eye-crochet-pattern-pdf
```

The Etsy pattern is the only external link planned for these objects.

## Current follow-up work

1. Revise the remaining 21 Game locations one at a time. For each location, research the collection area, landscape, landmarks and plausible local or scientific objects; write its dossier; then complete and review its landscape and three accessory pairs before starting another location.
2. Treat catalogue uniqueness as a structural check, not proof of visual quality. Compare every revised pair for silhouette, material construction, body fit, combined readability and genuinely different primary/companion geometry.
3. Keep the maximum-two accessory-family rule and N2’s three approved concepts. If a family is used twice, the two location designs must differ in material, outline, proportions and internal construction.
4. Test direct pointer and keyboard movement independently for both worm copies at every revised location.
5. Keep `game-of-worms/` unchanged during Cabinet-only work.
