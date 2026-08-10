# Kauaʻi *C. elegans* location research and art brief

Last updated: 2026-08-10

This dossier is the evidence and review contract for the *Caenorhabditis elegans* Kauaʻi landscape and its three accessory pairs. It follows the Bristol N2, Santeuil, Edinburgh and Tenerife batches in the location-by-location Game of Worms illustration workflow.

## Evidence boundaries

### Representative collection record

The current Game marker says only `Kauaʻi, Hawaiʻi` at 22.147, -159.663. Current CaeNDR data place several records nearby. This illustration uses **XZ1516** as an explicit representative because its record is about 0.56 km from the current rounded marker and population-genomic research identifies it among Kauaʻi's exceptionally divergent isotypes:

- species: *Caenorhabditis elegans*;
- strain and isotype reference: XZ1516;
- coordinates: 22.149, -159.668;
- collection date: 15 October 2014;
- elevation: 983 m;
- substrate category: rotting nut, pod, seed or fruit;
- sampler: M. Ailion;
- landscape: not recorded.

XZ1514 and XZ1515 share the same coordinates, date, elevation and broad substrate category. XZ1516 is an illustration representative, not the only Kauaʻi isolate. The artwork must not invent the host plant, exact fruit or nut, collection viewpoint, path or surrounding vegetation.

Primary sources:

- [CaeNDR XZ1516 isotype page](https://caendr.org/isotype/XZ1516/)
- [CaeNDR XZ1514 isotype page](https://caendr.org/isotype/XZ1514/)
- [CaeNDR XZ1515 isotype page](https://caendr.org/isotype/XZ1515/)
- [Lee et al., 2021, Balancing selection maintains hyper-divergent haplotypes in *C. elegans*](https://elifesciences.org/articles/50465)
- [Crombie et al., 2022, Deep sampling of Hawaiian *C. elegans* reveals high genetic diversity and admixture](https://www.nature.com/articles/s41559-021-01435-x)

### Correct regional setting

The existing Waimea Canyon overlook is regionally recognisable but is not justified as XZ1516's collection site. Kōkeʻe includes wet native upland forest near the canyon rim, yet CaeNDR records neither an open canyon view nor a waterfall, gorge, sea view or fern-lined overlook for XZ1516.

The replacement scene therefore begins with exact evidence—983 m elevation and decaying botanical substrate—and uses a restrained Kōkeʻe upland-forest setting as a clearly bounded regional inference. Hawaiian ecological sampling independently supports moderately moist, high-elevation native forest as an important *C. elegans* niche, but does not prove XZ1516's exact local vegetation.

Regional sources:

- [Hawaiʻi DLNR Kōkeʻe State Park](https://dlnr.hawaii.gov/dsp/parks/kauai/kokee-state-park/)
- [Crombie et al., 2022, Hawaiian *Caenorhabditis* ecology](https://pubmed.ncbi.nlm.nih.gov/35167162/)

These pages are factual and visual references only. The website uses an original painted illustration and does not trace an external photograph, map or agency graphic.

## Landscape composition contract

The scene is a continuous ground-level upland-forest view rather than a tourist panorama or a row of forest symbols.

### Foreground: recorded decay microhabitat

- Damp leaf litter and rust-red volcanic soil establish a bacteria-rich decomposing floor.
- One split, irregular piece of decaying botanical material is the closest object.
- The material remains taxonomically anonymous: it is not labelled or shaped as pineapple, koa, avocado, a particular nut or any other unrecorded plant.
- The substrate does not resemble Tenerife's pear-shaped avocado viewer or N2's circular agar plate.

### Middle ground: inferred upland forest

- An asymmetric fern bank and a narrow S-shaped red-soil path lead into the scene.
- Two structurally different living forest trees frame the opening: one left-leaning canopy and one forked right trunk.
- Trunks, understory and canopy overlap in depth rather than repeating one generic tree glyph.
- Living ʻōhiʻa may be suggested in the regional setting, but no harvested wood, injured branch or transported plant material appears.

### Background: mist lock silhouette

- A pale horizontal fog curtain and low broken upland ridge sit behind fading canopy silhouettes.
- The locked thumbnail silhouette is a left-leaning canopy and forked right trunk framing one path that disappears into fog.
- There is no canyon panorama, waterfall, sea, kalo plot, exposed overlook or Hanalei-style amphitheatre.

## Accessory evidence and design contract

The accessories translate the documented substrate, upland moisture and XZ1516's scientific significance into movable teaching objects. They do not use Native Hawaiian cultural motifs as generic costume decoration.

### Plant sample cases

- **Primary:** an open waterproof field case containing a clearly bounded plant sample, collection vial and XZ1516 ticket.
- **Companion:** a compact case in the same viewing orientation, with simplified compartments that remain legible at the smaller scale.

### Mist collector bottles

- **Primary:** a transparent graduated bottle beneath a turquoise mesh funnel, with visible collected droplets and a secure field cap.
- **Companion:** a smaller collector in the same orientation, preserving the funnel, bottle and droplet cues.
- The objects refer to the wet upland setting without claiming that this device was used to collect XZ1516.

### XZ1516 haplotype cards

Population-genomic work gives XZ1516 a scientifically grounded accessory that is different from Edinburgh's observatory telescope.

- **Primary:** a clipped fan of high-contrast comparison cards with colored marker bands and a clear XZ1516 tab.
- **Companion:** a smaller card fan in the same orientation, retaining the marker bands and strain tab.
- The graphics are original abstractions and do not reproduce a published figure, exact genetic sequence or institutional logo.

## Cultural and scientific safeguards

- Do not use lei, hula, kapa patterns, kiʻi or tiki forms, royal featherwork or other Native Hawaiian cultural forms as generic costumes.
- Do not turn threatened or endangered forest birds into props.
- Do not show worms harvesting, cutting or transporting living ʻōhiʻa material.
- Do not identify the recorded decaying botanical substrate beyond CaeNDR's broad category.
- Do not transfer the nearby ECA701 rotting-flower record to XZ1516; it is a different sample.

## Quality benchmark

The revised Bristol N2, Santeuil, Edinburgh and Tenerife batches are the minimum quality floor, not templates to repeat. This Kauaʻi scene must exceed them through an evidence-led forest-floor focal point, coherent misty depth, distinct mechanisms, two genuinely different drawings per concept and a readable combined composition.

## Implementation status

- Preserved source painting: `game-of-worms/assets/source/kauai-xz1516-painted-background-source.png`
- Optimized runtime derivative: `game-of-worms/assets/kauai-xz1516-painted-background.webp`
- The original detailed SVG scene remains in `game-of-worms/environment-scenes.js` as the asset-load fallback.
- The painted background uses the existing responsive SVG coordinate system; animated worms and accessories remain separate live SVG layers.
- Fresh checks at 360, 768, 1024 and 1440 px confirmed the painted asset, all six active accessory copies and zero horizontal overflow.
- Pointer dragging moved all six copies independently. Keyboard arrow movement and Home reset affected only the focused copy.
- Browser-console checks reported no errors.

## Review and interaction acceptance

- Only the *C. elegans* Kauaʻi landscape and its accessory data and drawings change in the Game feature batch.
- The marker moves to XZ1516's exact rounded coordinates and the public label remains `Kauaʻi, Hawaiʻi`.
- Explanatory copy distinguishes the documented record from the inferred Kōkeʻe upland-forest context.
- Every concept has a dedicated SVG drawing path; none uses the old canyon crest, waterfall scarf, fern reel or a generic fallback renderer.
- Primary and companion copies differ in outline, construction, internal detail and placement.
- All three pairs remain legible together and do not hide worm faces.
- Each of the six visible objects remains independently draggable and keyboard movable; Home resets only the focused copy.
- Accessible names match the visible objects.
- Pointer and keyboard tests cover all six copies.
- Visual checks cover the Game's fixed light palette and responsive widths from 360 px to wide desktop.
- No horizontal overflow, console error, broken source link or change to another location is accepted.
- Environment/accessory audits, syntax checks, `git diff --check` and the full diff pass before integration.
