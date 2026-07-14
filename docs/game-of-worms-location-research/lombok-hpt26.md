# Lingsar, Lombok *Caenorhabditis nigoni* HPT26 location research and art brief

Last updated: 2026-07-14

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

Create a dedicated original SVG scene at the existing 600 × 430 viewBox.

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

### HPT26 Ficus-ground contact stage

Scientific basis: HPT26 came from rotting *Ficus* fruits on the ground.

Primary: a broad low litter table with three unequal softened fruits, exposed
soil-contact membrane and an offset `L14.1 / HPT26` flipplate.

Companion: a tall open C-frame gantry with one suspended fruit above a
removable ground cassette and a lateral contact gauge.

Do not present either as documented field equipment or infer a *Ficus*
species.

### Lingsar field-to-plate calendar

Scientific basis: collection took place on 4 May and the Lombok sheet notes
that samples were put on plates on 8 May.

Primary: a wide horizontal mechanism with separate `4 MAY` and `8 MAY` end
drums, four interval notches, a ground-sample tray and an abstract agar plate.

Companion: a tall twin-date tower with vertically separated date windows,
hanging sample cup, lower plate cradle and side crank.

The intermediate notches indicate elapsed days only. They must not imply
undocumented daily procedures.

### HPT26–HPT27 substrate diptych

Scientific basis: HPT26 and HPT27 are separate *C. nigoni* samples from the
same Lingsar survey date at nearby recorded elevations and different fruit
substrates.

Primary: a wide hinged bench. The left panel shows a generic ground *Ficus*
sample labelled `L14 · 293 m`; the right shows *Arenga pinnata* fruit labelled
`L22 · 290 m`; a central `4 MAY` tab keeps the comparison date explicit.

Companion: a tall back-to-back rotating cabinet with separate HPT26/*Ficus*
and HPT27/*Arenga* compartments, independent shutters and twin elevation pins.

The diptych is a comparison, not a claim that the samples were mixed.

## Suggested starting layouts

These values require final browser tuning:

```js
"hpt26-ficus-ground-contact-stage": {
  primary: [385, 142, .43, -2],
  companion: [14, 132, .30, 3]
},
"lingsar-field-to-plate-calendar": {
  primary: [238, 199, .42, -1],
  companion: [117, 218, .30, 2]
},
"hpt26-hpt27-substrate-diptych": {
  primary: [382, 270, .39, -1],
  companion: [30, 291, .28, 2]
}
```

## Variant and interaction requirements

- Each primary and companion pair must differ in outer silhouette,
  orientation, internal construction, attachment point and negative space.
- Variants must not be scale, colour or count changes of one base drawing.
- Add a custom initial layout for each family.
- Inspect all three accessories together on both worms.
- Keep facial features, species label and body outline readable.
- Verify direct pointer drag, keyboard movement, Home reset and focus treatment
  independently for all six pieces.
- Respect reduced motion and existing touch-target behaviour.

## Semantic reuse ledger

Remove Lombok from the shared skirt entry. Tropicalis Réunion becomes a
singleton skirt family.

Remove the caldera-headband and altimeter-ukulele concepts. Add the three new
Lombok concepts as singleton families.

Expected totals after this catalogue correction:

- 13 families used exactly twice
- 85 singleton families
- 111 concepts across 37 accessory sets
- no semantic family used more than twice

Plucked-string instruments remain limited to Kauaʻi QG130 and Tenerife after
the Lombok ukulele is removed.

## Acceptance checks

- Exactly 37 explicit environment profiles and composition IDs.
- Exactly 37 accessory sets and 111 unique accessory design IDs.
- No remaining active `lombok-rinjani` profile or orphaned caldera composition.
- No generic-renderer fallback for the six new accessory illustrations.
- No initial overlap among the three accessories or with critical worm detail.
- Desktop and mobile checks near 360, 768, 1024 and wide viewports.
- Light and dark themes.
- Keyboard operation, direct drag and visible focus.
- Reduced-motion behaviour.
- No horizontal overflow, failed requests or console errors.
- Full diff review and `git diff --check`.
