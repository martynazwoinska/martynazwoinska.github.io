# Taipei *Caenorhabditis briggsae* BRC20390 location research and art brief

Last updated: 2026-07-28

## Purpose

This dossier defines the evidence boundary and illustration contract for the
Taipei, Taiwan · BRC20390 environment and its three paired accessories.

## Exact CaeNDR record

The CaeNDR BRC20390 isotype page records:

- species: *Caenorhabditis briggsae*;
- isotype and reference strain: BRC20390;
- sampling date: 4 October 2015;
- coordinates: 25.027105, 121.576542;
- elevation: 174 m;
- landscape: forest;
- substrate: ND;
- sampled by J. Wang;
- substrate temperature, ambient temperature and ambient humidity: ND;
- isotype release: 3 August 2021;
- eleven strains in the isotype: BRC20076, BRC20086, BRC20247, BRC20390,
  BRC20408, BRC20462, NIC826, NIC876, NIC877, NIC884 and NIC1629.

CaeNDR states that the summary table describes the isotype reference strain.
It does not list an isolator for BRC20390 on the isotype page.

The page provides two BRC20390 photographs. They show dark, irregular
sample fragments in a plate or plastic container and a handwritten field
identifier. They do not establish a botanical identity or a precise forest
microhabitat. Treat them as source documentation rather than a landscape
photograph.

## Evidence boundary

The date, coordinate, elevation, forest category, collector and eleven-strain
isotype membership are exact CaeNDR evidence.

The coordinate lies within Taipei's wooded hills, but the CaeNDR page does not
name Xiangshan, a trail, district, park, mountain, plant, substrate, weather or
viewpoint. The current Xiangshan-specific title, boulder emphasis and Taipei
tower cue therefore overstate the record.

The landscape may show an anonymised humid subtropical forest floor on a
moderate slope. A very narrow, indistinct city-edge light slit may orient the
scene to Taipei, but it must not depict or name Taipei 101 or claim a recorded
view from the collection point.

## Primary source

- CaeNDR BRC20390 isotype record and its linked source photographs:
  https://caendr.org/isotype/BRC20390/

## Game metadata

Display name: `Taipei, Taiwan · BRC20390`

Coordinates in game order: `[121.576542, 25.027105]`

Marker source: `CaeNDR BRC20390 isotype record`

Profile ID: `taipei-brc20390-forest-slope`

Profile title: `Taipei forest slope at 174 m`

Profile note:

> BRC20390 is the reference strain of an eleven-strain *C. briggsae*
> isotype sampled by J. Wang in forest at 174 m in Taipei on 4 October 2015.
> CaeNDR records the substrate and environmental measurements as ND. The
> layered slope and narrow city-edge light are restrained regional context,
> not a reconstruction of the collection view.

Source label: `CaeNDR BRC20390 isotype record`

Source URL: `https://caendr.org/isotype/BRC20390/`

Recommended palette: `palettes.wetCity`

## Environment illustration contract

Use an optimized painted 3:2 background derived from a preserved source PNG.
The worms and accessories remain live SVG layers in the 600 × 430 scene.

Composition lock:

> A damp leaf-littered forest slope descends diagonally through layered
> smooth trunks and tangled roots toward one narrow, indistinct pale city-edge
> opening; the centre remains calm enough for the worms and instruments.

Foreground:

- Wet brown leaf litter, exposed roots and moss on a moderate diagonal slope.
- A few dark, irregular anonymous decomposing fragments may echo the CaeNDR
  source photographs without being identified as wood, fruit, flower or soil.
- No dominant boulder, flower, fruit or named plant.

Middle:

- Unequal smooth trunks, fern-like understorey and a broken diagonal foot-slope
  structure.
- Keep the forest specific in texture but anonymous in species.

Background:

- Layered humid canopy and mist-softened depth.
- One very narrow pale opening may imply Taipei's urban edge, but no readable
  building or landmark.

Forbidden:

- Taipei 101 or any identifiable skyline;
- Xiangshan label or summit panorama;
- invented substrate, plant identity, weather or trail;
- ornamental boulder field;
- symmetrical generic rainforest pattern.

## Accessory contract

### Field cameras

Scientific basis: the CaeNDR page links two BRC20390 source photographs.

Primary: a large teal field camera with a clear lens, flash, grip, shutter
button and coral neck strap. A small `2 PHOTOS` tab records the two source
images without copying their content.

Companion: a compact camera in the same orientation, with the same identifiable
lens, flash, grip, shutter and strap construction.

The drawings represent the existence and composition of the two source
photographs, not copied photographs or identified substrate.

### Eleven-sample carriers

Scientific basis: CaeNDR lists eleven strains in the BRC20390 isotype.

Primary: a broad indigo field case holding eleven clearly separated capped
sample vials in two rows. One coral vial marks the reference strain and a large
`11` badge makes the recorded set size legible.

Companion: a compact handled carrier with the same eleven-vial construction,
one independently positioned coral reference vial and its own count badge.

Do not imply that the eleven strains came from one sample or location.

### 174 m altimeters

Scientific basis: the reference record gives a forest landscape, 174 m
elevation and exact coordinate, while substrate and environmental measurements
are ND.

Primary: a large analogue wrist altimeter with a coral strap, indigo case,
graduated ivory dial, readable pointer and central `174 metres` display.

Companion: a compact analogue wrist altimeter in the same orientation, with a
shorter strap, fewer readable tick marks and a central `174 m` display.

The slope is an illustrative reading device, not a measured terrain angle.

## Suggested starting layouts

```js
"brc20390-two-photo-provenance-viewer": {
  primary: [386, 139, .46, -2],
  companion: [24, 126, .35, 2]
},
"brc20390-eleven-strain-isotype-constellation": {
  primary: [250, 196, .42, 0],
  companion: [128, 216, .34, 0]
},
"taipei-174m-forest-record-inclinometer": {
  primary: [382, 272, .42, -3],
  companion: [194, 293, .34, 2]
}
```

## Acceptance checks

- Dedicated profile, composition, painted background and fallback.
- No active `taipei-xiangshan`, tower cue or old boulder/fern/tower accessory.
- Exactly three bespoke families and six structurally distinct drawings.
- Pointer drag, Arrow, Shift+Arrow and isolated Home reset for all six pieces.
- 360, 768, 1024 and wide responsive checks with no horizontal overflow.
- Fixed light-palette review, clean console and successful asset requests.
- Catalogue, pair-distinctness and environment-distinctness audits remain valid.
- Full diff review and `git diff --check`.

## Implementation status

Implemented and browser-checked on 28 July 2026:

- the Xiangshan-specific profile, tower cue, boulder composition and three old
  accessories were removed;
- a dedicated painted Taipei forest-slope background and its preserved source
  PNG were added;
- the marker source, strain history, profile note and CaeNDR link were aligned
  with the reference-isotype record;
- the former miniature evidence-led mechanisms were replaced in August 2026
  by large, recognizable field cameras, eleven-vial carriers and analogue
  altimeters, with a brighter teal, indigo, coral and gold material palette;
- the scene plaque and accessory buttons omit the strain code under the
  Game-wide visible-label rule;
- all six pieces passed direct pointer drag, Arrow and Shift+Arrow movement,
  and isolated Home reset;
- 360, 768, 1024 and 1440 px checks found no horizontal overflow and kept all
  pieces inside the scene;
- the browser console was clean and the runtime image returned HTTP 200.
