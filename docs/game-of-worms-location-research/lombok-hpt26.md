# Lingsar, Lombok *Caenorhabditis nigoni* HPT26 location research and art brief

Last updated: 2026-09-05

> **Current production accessory contract:** `Lingsar spring collars`, `Ficus fruit transformations`, and `spring-water currents`. The figs refer to the recorded substrate. The water designs are playful references to springs in the wider Lingsar area.

## Purpose

This dossier defines the evidence boundary and illustration contract for the
Lombok, Indonesia · HPT26 environment and its three paired accessories.

## Exact collection record

Devi et al. 2025 Supplementary Table S1 records:

- Species: *Caenorhabditis nigoni*
- Strain: HPT26
- Sample ID: L14
- Isolation: L14.1
- Date: 4 May 2024
- Location: Lingsar, Lombok, Indonesia
- Coordinates: -8.527466, 116.239667
- Elevation: 293 m
- Landscape category: `forest with some culture`
- Substrate: rotting *Ficus* fruits on the ground
- Culture type: isofemale strain
- Lombok sheet-level note: samples were put on plates on 8 May

The article attributes the survey fieldwork and isolation or culture work to
teams, but it does not identify an individual collector or isolator for HPT26.
Do not assign one.

HPT27 is a useful exact comparison from the same Lingsar survey. It is sample
L22, isolation L22.1, a *C. nigoni* line from rotting *Arenga pinnata* fruit
collected on the same date at 290 m.

## Evidence boundary

The Lingsar coordinate, elevation, date, landscape category, ground contact
and rotting *Ficus*-fruit substrate are exact record evidence.

The phrase `forest with some culture` supports a restrained forest and
cultivation transition, but the record does not identify the cultivated crop,
*Ficus* species, property, weather, river or exact viewpoint.

The Smithsonian Global Volcanism Program places Rinjani at approximately
-8.42, 116.47. Its coordinate is about 28 km from HPT26 by great-circle
calculation. That distance is an inference from the two coordinate records.
A tiny muted volcanic shoulder may be used only as distant regional
orientation. The record does not establish that Rinjani was visible from the
sampling point.

The current Segara Anak and elevated caldera-rim scene is unsupported and must
not be retained.

## Primary and authoritative sources

- Devi et al. 2025, including Supplementary Table S1:
  https://academic.oup.com/g3journal/article/15/8/jkaf134/8171306
- DOI for the source link in the Game:
  https://doi.org/10.1093/g3journal/jkaf134
- Smithsonian Global Volcanism Program Rinjani record:
  https://volcano.si.edu/volcano.cfm?vn=264030
- Rinjani-Lombok UNESCO Global Geopark regional context:
  https://www.unesco.org/en/iggp/rinjani-lombok-unesco-global-geopark

## Game metadata

Display name: `Lombok, Indonesia · HPT26`

Coordinates in game order: `[116.239667, -8.527466]`

Marker source: `Devi et al. 2025`

Profile ID: `lingsar-hpt26-ficus-forest-edge`

Profile title: `Lingsar Ficus-fruit forest edge`

Profile note:

> HPT26 (L14.1) came from rotting Ficus fruits on the ground at 293 m in
> Lingsar, in the survey’s category “forest with some culture.” The
> forest–cultivation transition is a visual interpretation of that category;
> any tiny Rinjani shoulder is distant regional orientation, not the
> collection view.

Source label: `Devi et al. 2025, Supplementary Table S1`

Source URL: `https://doi.org/10.1093/g3journal/jkaf134`

Recommended palette: `palettes.rainforest`

## Environment illustration contract

Use the optimized painted background
`game-of-worms/assets/lombok-hpt26-painted-background.webp`, derived from the
preserved source PNG under `game-of-worms/assets/source/`, in the existing
600 × 430 scene viewBox. The worms and accessories remain live SVG layers.

Composition lock:

> A collapsed anonymous *Ficus*-fruit cluster below a diagonal
> forest-to-cultivation edge, framed by one dense leaning canopy and one narrow
> sky slit containing only a tiny distant volcanic shoulder.

Foreground:

- Damp reddish-brown soil and broken anonymous leaf litter across roughly the
  lower 40 percent.
- An asymmetric sample cluster near the lower left: one visibly collapsed
  fruit and two unequal softened generic *Ficus* fruits.
- Show roots, torn organic texture and soil-contact shadows without naming a
  *Ficus* species.

Middle:

- A broken diagonal transition from dense trunks and understorey on the left
  to a restrained row of anonymous cultivated vegetation on the right.
- Do not identify or imply a crop.

Background:

- Layered humid lower-slope canopy with one narrow sky opening.
- If retained, the blue-grey volcanic shoulder occupies less than 8 to 10
  percent of the scene height and remains visually subordinate.

Camera:

- Use a low near-ground sample perspective, not a scenic panorama.

Forbidden:

- Segara Anak, crater lake, caldera interior, cone-in-lake or rim viewpoint.
- River, waterfall, beach or rice terrace.
- Temple, culturally coded clothing or national decoration.
- Identifiable farm or property.
- Named crop or named *Ficus* species.
- Symmetrical generic jungle patterns.

## Accessory contract

### Lingsar spring collars

Two fitted enamel-and-gold cuffs with translucent droplet pendants. The female
has a broad three-drop cuff. The male has a smaller single-drop clasp.
Both follow their worm's neck angle and bobbing motion.

### Ficus fruit transformations

A split-fruit costume opens around each worm's lower body. Purple outer skin,
a pale rind and a rose interior with contained seed marks make the cut surface
readable. The female fruit has two broad halves. The male has a narrow side-cut
form with a turned-away far half. The opening animation settles after 0.8 seconds.

The exact Ficus species was unrecorded. Fruit colour and opening construction
are imaginative. The drawing uses general Ficus structure, without assigning
HPT26 to a particular fig species.

### Spring-water currents

A translucent curling pool sits beneath each tail. The female pool has a broad
eddy and raised curl. The male pool has a short side splash and a different
ripple pattern. Moving foam traces the current. Reduced-motion mode keeps the
water and fruit static.

These are movable fantasy accessories. The landscape and collection record
remain terrestrial.

## Reference additions

- Lombok Barat government, Lingsar history and the Ai' Mual spring:
  https://lombokbaratkab.go.id/sejarah-singkat-pura-lingsar/
- Kew, Plants of the World Online, Ficus general structure:
  https://powo.science.kew.org/taxon/urn%3Alsid%3Aipni.org%3Anames%3A327905-2/general-information

The spring source supports regional context. It does not identify HPT26's
sampling point as a spring or a temple.

## Initial layouts

Values use the existing worm SVG coordinate system.

```js
"lingsar-spring-collar": {
  primary: [330, 100, 1, 25],
  companion: [110, 125, 1, 27]
},
"lingsar-ficus-fruit-transformation": {
  primary: [186, 201, .66, 13],
  companion: [49, 172, .32, 21]
},
"lingsar-springwater-current": {
  primary: [105, 289, .84, 0],
  companion: [12, 213, .63, -6]
}
```

## Validation

Inspect all six objects together at 360, 768, 1024 and 1440 px. Verify each
copy's pointer drag, keyboard movement and Home reset independently. Check
reduced motion, body attachment, scene boundaries and the catalogue audits.

The earlier sample trays, calendars and comparison boxes are retired.
The approved painted landscape remains unchanged.
