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

### Two-photo provenance viewer

Scientific basis: the CaeNDR page links two BRC20390 source photographs.

Primary: a broad hinged light table with two unequal image windows, an
`BRC20390` index tab and abstract dark fragment silhouettes.

Companion: a tall twin-slide cabinet with vertically staggered windows,
independent shutters and a small reference-strain drawer.

The drawings represent the existence and composition of the two source
photographs, not copied photographs or identified substrate.

### Eleven-strain isotype constellation

Scientific basis: CaeNDR lists eleven strains in the BRC20390 isotype.

Primary: a wide brass network table with one central reference-strain hub and
ten unequal satellite nodes linked in an asymmetric genomic constellation.

Companion: a tall rotating registry with eleven independently placed tabs and
one highlighted BRC20390 reference window.

Do not imply that the eleven strains came from one sample or location.

### Taipei 174 m forest-record inclinometer

Scientific basis: the reference record gives a forest landscape, 174 m
elevation and exact coordinate, while substrate and environmental measurements
are ND.

Primary: a wide slope inclinometer with a 174 m elevation drum, forest-field
aperture and three closed `ND` shutters.

Companion: a tall pendulum surveyor with coordinate scroll, 174 m counterweight
and three separate blank measurement drawers.

The slope is an illustrative reading device, not a measured terrain angle.

## Suggested starting layouts

```js
"brc20390-two-photo-provenance-viewer": {
  primary: [384, 136, .38, -2],
  companion: [-8, 119, .29, 3]
},
"brc20390-eleven-strain-isotype-constellation": {
  primary: [232, 186, .34, 1],
  companion: [116, 213, .27, -2]
},
"taipei-174m-forest-record-inclinometer": {
  primary: [382, 258, .34, -1],
  companion: [195, 294, .27, 2]
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
- the three evidence-led mechanisms above replaced the spectacles, fan and
  fiddle, with six structurally distinct movable drawings;
- the scene plaque and accessory buttons omit the strain code under the
  Game-wide visible-label rule;
- all six pieces passed direct pointer drag, Arrow and Shift+Arrow movement,
  and isolated Home reset;
- 360, 768, 1024 and 1440 px checks found no horizontal overflow and kept all
  pieces inside the scene;
- the browser console was clean and the runtime image returned HTTP 200.
