# Orsay *Caenorhabditis briggsae* JU2518 location research and art brief

Last updated: 2026-09-19

## Current sketching preview, 2026-09-19

This section supersedes the retired specimen-box / record-card / ledger
accessory contract below. Those descriptions are historical, not current art.

Current approved direction: the worms draw one another, with no apple-balancing
activity. Either notebook starts a 9.4-second shared action with its owner
sketching and the other worm holding an expressive curved pose. The model
winks once. At the end, the artist brings the finished portrait closer and
the model bends its upper body to inspect it; both tails remain planted.

Apple-shaped satchels now contain pencils and an eraser in separate pockets.
Tapping a bag simply opens or closes it, without sound or a competing body
animation. The artist uses a pencil from its own bag when it is enabled;
otherwise it uses the notebook's pencil. A bag's chosen open/closed state and
all visitor accessory positions/sizes survive the drawing action.

Two distinct drawings replace the notebook and satchel artwork:

- Primary: cloth-bound open sketchbook, facing botanical study, sewn gutter,
  layered paper edges and ribbon; rounded red apple bag with gusset, stitched
  flap, strap tabs, rivets and brass clasp.
- Male: compact top-spiral pad, wrapped-back cover, stacked sheets and curled
  corner; flatter russet apple pouch with a separate front pocket.
- Existing flower-crown artwork, approved fit, initial positions and scales,
  garden painting, scientific record and all public labels remain unchanged.

Construction reference: [Canson sketchbook construction and binding](https://en.canson.com/expert-advice/drawing-create-sketchbook)
and [spiral-bound XL Drawing Book](https://en.canson.com/xl-drawing-book).
Original SVG drawings; no reference artwork was copied. Leather construction
extends the existing approved apple-shaped bag design.

Refinement after the first actual-page inspection: lift the book towards the
chest to avoid excessively stretched arms; keep idle accessories above the
temporary body poses; strengthen fine graphite marks for small-screen
legibility; add cover edging, binding stitches and functional strap attachments.
The first draft was not presented as approved production art. Follow-up removes
all fruit geometry and tail balancing, gives the bags useful art supplies,
and replaces idle swaying with a held pose, a wink and a bounded curious lean.

Sound uses recorded pencil writing and existing paper rustling. See the
[audio source ledger](../../game-of-worms/assets/audio/SOURCES.md).
No music, synthesized scratching, autoplay or permanent sound loop.

Implementation: `codex/orsay-sketching`, based on main `68f1e59`.
Preview: `http://127.0.0.1:8776/game-of-worms/?preview=20260919-sketch-3`.
Preview 3 approved for deployment by Martyna on 2026-09-19. Publication verification follows the commit.

Validation:

- Focused tests cover continuous timing, bounded peeking, planted
  tails, middle-body bending, complete settling, paired geometry and SVG paths.
- JavaScript syntax, labels, fresh-visit behaviour, Salt Lake regression and
  whitespace checks pass. Runtime catalogue/pair audits report no warnings.
- Browser: both artist roles, pointer and Enter activation, progressive
  portraits, exact body restoration, preserved visitor position/size,
  Escape, keyboard arrows/size/Home and male notebook pointer dragging checked.
- Satchel activation opens drawing supplies without starting a body action; leaving the scene
  during an action removes temporary objects and restores both bodies. No
  browser errors or warnings in the final preview.
- CSS widths 360, 768, 1024 and 1440: no horizontal overflow. Habitat renders
  inspected at normal display size. Game remains intentionally fixed-light.
- Full-page capture at CSS 360 x 800 (document height 2435) is defective:
  duplicated/scaled sections and large blank regions. It is not a valid
  full-page proof. This limitation remains open.
- Reduced motion is code-reviewed: stationary result for 1.2 seconds,
  no body movement and no sound. OS/browser emulation, physical multi-touch,
  Safari and subjective listening remain manual checks.

Files added: `game-of-worms/orsay-art.js`, `game-of-worms/orsay-play.js`,
`game-of-worms/assets/audio/orsay-pencil.mp3`,
`scripts/check-orsay-sketching.cjs`.
Files changed: `game-of-worms/accessory-designs.js`, `game-of-worms/game.js`,
`game-of-worms/index.html`, `game-of-worms/assets/audio/SOURCES.md`,
`PROJECT_STATUS.md`, the art catalogue, scene-review queue and this dossier.
No deleted files. Other checkouts remain untouched.

## Exact record

The CaeNDR reference-isotype page and its embedded strain record specify:

- species, isotype and reference strain: *C. briggsae*, JU2518;
- sampling date: 6 September 2012;
- coordinates: 48.7015, 2.1725;
- elevation: 65 m;
- locality: Orsay, France;
- landscape: rural garden;
- substrate category: rotting nut, pod, seed or fruit;
- substrate comment: apple;
- associated organism: Santeuil virus;
- sampled and isolated by L. Frezal;
- substrate temperature, ambient temperature and humidity: ND;
- a singleton isotype.

## Evidence boundary

The coordinate, elevation, date, rural-garden landscape, rotten apple,
associated-organism field, sampler/isolator and singleton status are evidence.
The apple cultivar, property, weather, exact collection-patch view, river,
pond and neighbouring plants are unreported.

The old Yvette-valley scene invented a pond, reeds and a valley-water view.
The replacement uses an anonymous early-autumn rural garden with one
subordinate roof plane as regional context.

## Primary source

- CaeNDR JU2518 isotype page:
  https://caendr.org/isotype/JU2518/

## Game metadata

Profile ID: `orsay-ju2518-rural-garden-apple`

Profile title: `Orsay rural-garden apple floor`

Profile note:

> This singleton reference isotype was sampled and isolated by L. Frezal from
> a rotten apple in a rural garden at 65 m on 6 September 2012. CaeNDR records
> Santeuil virus as the associated organism. The garden passage and distant
> roof plane are restrained context; the property, cultivar, weather and exact
> collection view are unreported.

## Environment contract

Use a preserved painted 3:2 source PNG and optimized WebP, with live SVG worms
and accessories above it.

- Foreground: one recognisable, partly decayed russet-red apple in grass and
  leaf litter.
- Middle: an asymmetric pale gravel-and-earth passage, low old brick edging
  and loose perennial foliage.
- Background: mixed deciduous trees, pale early-autumn sky and one small
  anonymous grey roof plane.
- Keep the centre open for the worms.
- No pond, stream, river, reeds, landmark, named property, fruit basket or
  invented weather.

## Accessory contract

### Apple specimen box

Primary: a transparent lidded field box containing a recognisable russet-red
apple with a small decay patch and a bold `APPLE SAMPLE` band.

Companion: a narrower box in the same upright orientation, with an independently
proportioned apple and lid.

### Virus association cards

Primary: two overlapping clipped record cards, one with an apple icon and one
marked `SV`, joined by a visible association line. The cards communicate the
database relationship without depicting virion morphology.

Companion: a narrower pair of cards in the same orientation with a shorter
association line.

### 6 September field notebook

Primary: a large indigo spiral notebook with ruled page, `06 SEP 2012`, apple
mark and coral field pen.

Companion: a compact notebook in the same upright orientation with narrower
page and binding.

The buttons omit the strain code. Internal IDs may retain it.

## Acceptance checks

- No active pond, reeds or Yvette-water composition.
- Six structurally distinct drawings across three bespoke families.
- Pointer drag, keyboard movement and isolated Home reset.
- 360, 768, 1024 and wide checks, fixed light palette, clean console.
- Catalogue and environment audits valid; runtime image HTTP 200.

## Implementation status

Implemented and validated on 2026-07-28 with the preserved source PNG,
optimized WebP, evidence-bounded rural-garden apple composition and six
bespoke independently movable accessory drawings.

## Headwear fit, 2026-09-05

Adjusted each worm's headwear position and tilt without changing artwork paths
or colours. The companion Orsay crown has a smaller fitted scale. Headwear now
follows the corresponding body animation, synchronized whenever enabled.
Full-page 360, 768, 1024 and 1440 px proofs, independent pointer and keyboard
movement, Home reset, reduced motion and animation-phase checks passed locally.
