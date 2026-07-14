# Kauaʻi *Caenorhabditis tropicalis* QG131 location research and art brief

Last updated: 2026-07-14

## Purpose

This dossier defines the evidence boundary and illustration contract for the
Kauaʻi QG131 environment and its three paired accessories. It concerns the
*C. tropicalis* Kauaʻi record only. It must not import evidence or artwork from
the completed *C. elegans* XZ1516 Kōkeʻe scene, the *C. briggsae* QG130 record,
or other Kauaʻi *C. tropicalis* isolates.

## Representative choice and current-marker caveat

Use QG131 as the explicit representative.

The current 20250627 CaeNDR dataset contains several Kauaʻi *C. tropicalis*
isotype-reference strains. QG131 is the strongest illustration representative
because its record supplies:

- an exact named locality;
- exact coordinates and elevation;
- a specifically identified substrate at genus level;
- the number of sampled fruits;
- their placement beneath the source tree;
- collector and isolator;
- collection date;
- species-identification method;
- a dated culture-transfer and freezing sequence.

The current Game marker `[-159.478, 22.194]` lies in the Hanalei National
Wildlife Refuge cluster represented by ECA791, ECA792 and ECA793. ECA791 and
ECA792 came from vegetal litter or mix; ECA793 has no recorded substrate. The
current marker is approximately 3.96 km south of QG131 and must move if QG131
is selected.

Public copy must describe QG131 as one representative Kauaʻi isolate, not as
every Kauaʻi record.

## Representative collection record

- Species: *Caenorhabditis tropicalis*
- Strain and isotype reference: QG131
- Previous name in current CaeNDR data: none
- Coordinates: 22.22955, -159.4764
- Elevation: 10 m
- Landscape: beach
- Locality: Sealodge Beach, Princeville, Kauaʻi, Hawaiʻi
- Substrate category: rotting nut, pod, seed or fruit
- Substrate comment: pandanus
- Exact collection note: two rotten pandanus fruits beneath a pandanus tree
  along the trail down to Sealodge Beach
- Collection date: 3 August 2009
- Sampled by: M. Rockman
- Isolated by: M. Rockman
- Species-identification method: mating
- Substrate temperature: not done
- Ambient temperature: not done
- Ambient humidity: not done
- Associated organism: unreported
- Isotype-reference strain: yes
- Whole-genome sequence: yes
- Distributable through CaeNDR: yes
- Strain issues: none reported

The detailed CaeNDR note says that worms were isolated on agar plates, carried
to CA in tubes on 8 August, transferred to NGM with OP50 in Abby Dernburg's lab
on 14 August, and frozen on 23 August without having been bleached.

The sources do not report:

- the pandanus species, variety or cultivar;
- fruit colour, size, decomposition stage or exact geometry;
- whether individual fruit keys had separated;
- the precise collection-patch view;
- surrounding plant species;
- trail surface or width;
- whether sand or ocean was visible from the collection point;
- weather or light conditions;
- an associated organism;
- the mating partner or assay outcome;
- a collection photograph.

## Why the current implementation is unsupported

The active scene is `kauai-hanalei-valley`, titled `Hanalei valley wetlands`.
It uses the Hanalei Refuge page as its live source and depicts or names:

- a river and broad wetland floor;
- kalo plots;
- paddy geometry;
- several waterfall curtains;
- a broad mountain amphitheatre;
- visible rain;
- a taro bonnet;
- wetland waders;
- a paddy metronome or waterfall-drop timer.

None of those elements comes from QG131.

Even for ECA791 and ECA792, the strain records say only vegetal litter or mix
at Hanalei National Wildlife Refuge. They do not establish that the sample was
taken in a kalo plot, paddy, river edge, waterfall view or active rainfall.

The current Hanalei scene and accessories must therefore be replaced rather
than relabelled.

## Exact-versus-context evidence boundary

Exact collection evidence:

- QG131 and isotype-reference status
- coordinates and 10 m elevation
- beach landscape
- Sealodge Beach and Princeville locality
- two rotten pandanus fruits
- beneath a pandanus tree
- along the trail down to the beach
- sampling and isolation by M. Rockman on 3 August 2009
- mating as the identification method
- agar isolation, tube transport, NGM plus OP50 transfer and freezing sequence
- the exact recorded dates 3, 8, 14 and 23 August 2009
- no bleaching before freezing

Restrained botanical and site context:

- official Hawaiian sources describe hala or *Pandanus tectorius* as a
  moisture-tolerant coastal tree with long blade-like leaves, prop roots and
  segmented fruit;
- the collected record says only "pandanus," so the artwork must not claim a
  species, variety or cultivar;
- a descending trail and a narrow sand-and-sea opening may communicate the
  recorded beach locality, but must be described as illustrative site context,
  not a reconstructed view.

## Primary and official sources

- [CaeNDR QG131 isotype record](https://caendr.org/isotype/QG131/)
- [Current CaeNDR *C. tropicalis* release](https://caendr.org/data/data-release/c-tropicalis/latest)
- [Current CaeNDR *C. tropicalis* strain CSV](https://caendr.org/request-strains/download/c-tropicalis/20250627/strain-data/csv)
- [CaeNDR ECA791 Hanalei-area record](https://caendr.org/isotype/ECA791/)
- [CaeNDR ECA793 Hanalei-area record](https://caendr.org/isotype/ECA793/)
- [Hawaiʻi DLNR hala profile](https://dlnr.hawaii.gov/forestry/plants/hala/)
- [National Tropical Botanical Garden pandanus profile](https://ntbg.org/database/plants/detail/pandanus-tectorius)

The botanical pages are form references only. They do not identify the sampled
tree beyond CaeNDR's genus-level "pandanus" description.

## Game metadata

Display name: `Kauaʻi, Hawaiʻi · QG131`

Representative strain: `QG131`

Coordinates in Game order: `[-159.4764, 22.22955]`

Style: `ocean`

Profile ID: `kauai-qg131-sealodge-pandanus-beach-trail`

Profile title: `QG131 Sealodge pandanus-fruit beach trail`

Profile note:

> QG131 was sampled and isolated by M. Rockman on 3 August 2009 from two
> rotten pandanus fruits beneath a pandanus tree along the trail down to
> Sealodge Beach, at 10 m. The illustrated prop roots, descending trail and
> narrow coastal opening are restrained site context; exact fruit decay
> geometry, weather and collection viewpoint were not recorded.

Source label: `CaeNDR QG131 isotype record`

Source URL: `https://caendr.org/isotype/QG131/`

Use `palettes.island`, no generic water layer, no weather effect and no generic
landmark cues. Render a dedicated custom scene.

Suggested marker object:

```js
{
  name: "Kauaʻi, Hawaiʻi · QG131",
  coordinates: [-159.4764, 22.22955],
  source: "CaeNDR",
  style: "ocean",
  strain: "QG131",
  history: "QG131 is a sequenced, distributable C. tropicalis isotype reference. M. Rockman sampled and isolated it on 3 August 2009 from two rotten pandanus fruits beneath a pandanus tree along the trail down to Sealodge Beach, Princeville, at 10 m. CaeNDR records mating as its identification method. The culture note records agar isolation, tube transport on 8 August, transfer to NGM with OP50 on 14 August, and freezing without bleaching on 23 August."
}
```

Suggested profile:

```js
"tropicalis::Kauaʻi, Hawaiʻi · QG131": profile(
  "kauai-qg131-sealodge-pandanus-beach-trail",
  "QG131 Sealodge pandanus-fruit beach trail",
  "QG131 was sampled and isolated by M. Rockman on 3 August 2009 from two rotten pandanus fruits beneath a pandanus tree along the trail down to Sealodge Beach, at 10 m. The illustrated prop roots, descending trail and narrow coastal opening are restrained site context; exact fruit decay geometry, weather and collection viewpoint were not recorded.",
  "CaeNDR QG131 isotype record",
  "https://caendr.org/isotype/QG131/",
  palettes.island,
  [[0, 248], [80, 241], [160, 250], [240, 243], [320, 251], [400, 242], [480, 247], [600, 240]],
  { weather: "none", cues: [] }
)
```

## Environment illustration contract

Create a dedicated original SVG scene in the existing 600 × 430 viewBox.

### Camera

- Use a low, close coastal-trail viewpoint.
- Preserve central play space approximately from `x=175–445`, `y=155–350`.
- Use a strong diagonal descent rather than XZ1516's misty S-shaped upland
  path.
- Include no mountain panorama.

### Foreground

- Place two unequal softened pandanus fruit heads beneath the left-side tree.
- Keep them close to the outer lower-left edge, approximately around
  `x=78–165`, `y=350–415`.
- One may be a compressed segmented head and the other a more collapsed,
  partly opened form.
- The number, shape and arrangement of fruit segments are illustrative; do not
  imply that keys were counted or recovered separately.
- Use muted ochre, old orange, umber and leaf-litter brown.
- Include no kalo, taro plot, paddy wall or wetland channel.

### Middle

- Build one stout, asymmetric pandanus-like trunk against the left edge.
- Give it several unequal prop-root braces that visibly meet the ground.
- Let long blade-like leaves enter from the upper-left border without forming
  a decorative crown or headdress.
- Run a descending trail diagonally from a small upper-right coastal opening
  toward the lower centre.
- Use irregular leaf litter and restrained warm coastal soil.
- Keep the collection patch anonymous and non-navigational.

### Background

- Close most of the background with layered coastal vegetation.
- At the far right, leave one narrow pale opening with a small strip of sand
  and calm sea to communicate the recorded beach locality.
- The opening is site context only; do not present it as the collector's exact
  view.
- Include no ridge fins, fog curtain, waterfall, river, wetland, buildings,
  resort architecture or signs.

### Silhouette lock

> A broad blade-leaf canopy and stilt-like prop roots anchor the left edge,
> two fallen segmented fruits sit beneath them, and one descending diagonal
> trail terminates in a narrow sand-and-sea opening at the far right.

This silhouette must be immediately distinguishable from XZ1516's
left-leaning upland canopy, forked right trunk, S-shaped red-soil path and fog
curtain.

### Forbidden

- Kōkeʻe, XZ1516 or upland-cloud-forest cues.
- Fog curtain, fern bank, rust-red upland path or haplotype imagery.
- Hanalei Refuge, river, wetland, kalo plots, paddies or waterfalls.
- Secret Falls cues from ECA790 or ECA794.
- QG130's glider, waterfall lyre or fruit-capsule geometry.
- Identified pandanus species, variety or cultivar.
- Invented fruit colour, intactness, key count or decay sequence.
- Visible rain, claimed collection weather or temperature.
- Wildlife, protected birds, monk seals, sea turtles or invented associates.
- Resort buildings, property markers, trail directions or claims of public
  access.
- Lei, hula, kapa-like patterning, tiki imagery, royal featherwork, surfing
  shorthand or generic "Hawaiian" costume.
- Lauhala weaving used as costume decoration.
- Harvesting or cutting living leaves.
- Any implication that the scene is a precise reconstruction.

## Accessory contract

Use this exact data row:

```js
[
  "tropicalis",
  "Kauaʻi, Hawaiʻi · QG131",
  "QG131 paired-pandanus key sorter",
  "qg131-paired-pandanus-key-sorter",
  "QG131 four-date culture relay",
  "qg131-four-date-culture-relay",
  "QG131 mating-ID motion theatre",
  "qg131-mating-id-motion-theatre"
]
```

Use location-scoped renderer IDs:

```js
const kauaiQG131RendererIds = new Set([
  "tropicalis::Kauaʻi, Hawaiʻi · QG131::headwear",
  "tropicalis::Kauaʻi, Hawaiʻi · QG131::wrap",
  "tropicalis::Kauaʻi, Hawaiʻi · QG131::charm"
]);
```

### QG131 paired-pandanus key sorter

Family ID: `qg131-paired-pandanus-key-sorter`

Exact basis: QG131 was isolated from two rotten pandanus fruits beneath one
pandanus tree.

Primary: a broad low sorting bench with two unequal segmented-fruit cradles,
separate indexing wheels, an exposed linkage, two blank specimen shutters and
one converging transparent chute ending at a separate QG131 culture vial.

Companion: a tall asymmetric counterweighted elevator with two independent
input cups, staggered wedge-like trays, an exposed chain, a lower receiving
drawer, side specimen vial and small `2 FRUITS` plate.

The companion must not be a rotated fruit head or reduced copy of the primary.
Do not imply that individual keys were counted, selected or proven to contain
worms.

### QG131 four-date culture relay

Family ID: `qg131-four-date-culture-relay`

Exact basis: the collection note records 3, 8, 14 and 23 August 2009, agar
isolation, tube transport, NGM plus OP50 transfer and freezing without
bleaching.

Primary: a long horizontal articulated rail with four connected date stations:
`03 AUG`, `08 AUG`, `14 AUG` and `23 AUG`. Show a shallow agar cradle, a tube
carrier, a clearly different NGM/OP50 plate cradle and an insulated freezer
drawer, all driven by one visible chain and hand wheel.

Companion: a tall four-level rotary escapement with an upper fruit-to-agar
gate, offset tube capsule, lower culture-plate cradle and insulated terminal
chamber. Use four quarter-turn date tabs, a vertical drive shaft and separate
QG131 vial.

Do not invent a travel route, laboratory measurements, survival percentage,
freezing temperature or bleaching comparison. Do not expand "CA" beyond the
source wording.

### QG131 mating-ID motion theatre

Family ID: `qg131-mating-id-motion-theatre`

Exact basis: CaeNDR records mating as QG131's species-identification method.

Primary: a wide twin-track motion drum with two abstract worm ribbons entering
from opposite sides, separate drive gears and a central frosted observation
window. A side crank turns an `MATING / ID` shutter without displaying an
invented result.

Companion: a tall open strip viewer with two offset spiral tracks, separate
culture wells, one crossing observation window, a descending motion strip and
a reversible `QG131` identification plate.

Do not invent the mating partner, fertility outcome, offspring number,
genotype, gene-drive status or survival ratio. Do not use DNA-helix shorthand
or copy the test-cross mechanism used elsewhere.

## Suggested initial layouts

These require final browser tuning:

```js
"qg131-paired-pandanus-key-sorter": {
  primary: [374, 126, .34, -2],
  companion: [-8, 116, .27, 2]
},
"qg131-four-date-culture-relay": {
  primary: [220, 187, .32, -1],
  companion: [108, 213, .26, 2]
},
"qg131-mating-id-motion-theatre": {
  primary: [370, 266, .33, -1],
  companion: [0, 292, .27, 2]
}
```

## Semantic reuse ledger

Current post-Oʻahu baseline:

- 14 families used exactly twice
- 83 singleton families
- 111 concepts

Delete:

- tropicalis Kauaʻi's use of the Bonnet family; Orsay's pond-disc bonnet remains
- Wetland waders, a singleton family
- Paddy metronome, a singleton family

Add three singleton families:

- Paired-pandanus source sorter
- Four-date culture relay
- Mating-identification motion theatre

Expected resulting totals:

- 13 families used exactly twice
- 85 singleton families
- 111 concepts across 37 accessory sets
- no family used more than twice

## Stale implementation cleanup

- Replace tropicalis `Kauaʻi, Hawaiʻi` with
  `Kauaʻi, Hawaiʻi · QG131` in marker, profile and accessory keys.
- Preserve the separate *C. elegans* `Kauaʻi, Hawaiʻi` XZ1516 key unchanged.
- Preserve `Kauaʻi, Hawaiʻi · QG130` under *C. briggsae* unchanged.
- Replace `[-159.478, 22.194]` with `[-159.4764, 22.22955]`.
- Add `strain: "QG131"` and the exact marker history.
- Change marker style from `kauai` to `ocean`.
- Delete active `tropicalis::Kauaʻi, Hawaiʻi` profile references.
- Delete active `kauai-hanalei-valley` profile and composition references.
- Remove `Hanalei valley wetlands`.
- Replace the USFWS refuge source with the QG131 CaeNDR record.
- Remove the active river, rain, taro, waterfall and paddy settings.
- Remove the broad wet-amphitheatre silhouette.
- Add `drawKauaiQG131SealodgeScene` and a dedicated dispatch.
- Do not alter `drawKauaiKokeeScene` or XZ1516 styling.
- Replace taro bonnet, wetland waders and paddy metronome data.
- Remove `paddy-metronome` from the explicit renderer set and delete its
  dedicated renderer case.
- Remove `waders` from the repeated renderer set and delete its renderer case
  after confirming no remaining consumer.
- Preserve the pond-disc bonnet renderer for Orsay, but remove the unreachable
  tropicalis taro-bonnet branch.
- Add the three QG131 location-scoped renderer IDs and explicit layouts.
- Add scoped light- and dark-theme styling for the new scene and mechanisms.
- Refresh relevant Game asset cache versions.
- Do not remove generic taro, waterfall or paddy environment primitives if
  another active location still consumes them.

## Cultural, ecological and access safeguards

- Treat pandanus first as the recorded substrate and a living coastal plant,
  not as costume shorthand.
- Do not copy traditional weaving patterns or convert cultural practice into a
  decorative prop.
- Avoid protected wildlife and unrecorded ecological associations.
- Do not identify or depict private resort property.
- Do not provide access directions or imply that the collection trail has a
  particular current access status.
- Keep the setting anonymised beyond the source-backed name and coordinates.
- Make no native, introduced or cultivar claim about the sampled tree.
- Keep all wider botanical forms explicitly contextual.

## Variant and interaction requirements

- All six objects must differ in silhouette, orientation, attachment,
  construction and negative space.
- No pair may be mirrored, merely scaled or differentiated only by object
  count.
- Every gear, chain, rail, chute, axle, drawer and support must visibly
  terminate in a functional component.
- Preserve independent primary and companion positions.
- Keep worm faces and body outlines visible.
- Test direct pointer dragging independently for all six objects.
- Test Arrow movement, Shift+Arrow movement and Home reset.
- Preserve visible focus, minimum 44 px targets and reduced motion.

## Acceptance checks

- Exactly 37 environment profiles, compositions and accessory sets.
- Exactly 111 design IDs.
- Correct QG131 marker, strain, coordinate, profile, history and source.
- No active `kauai-hanalei-valley`, taro-bonnet, wetland-waders or
  paddy-metronome reference.
- No Hanalei Refuge, kalo, paddy, river, waterfall or rain implication.
- No XZ1516 upland-forest geometry or accessory reuse.
- No QG130 glider, lyre or capsule geometry.
- No invented pandanus species or fruit details.
- No cultural-costume shorthand, protected wildlife or access claim.
- No generic renderer fallback for any new object.
- No initial art or target collision at mobile, tablet or desktop widths.
- Test approximately 360, 768, 1024 and 1440 px.
- Test light and dark themes and reduced motion.
- Source link resolves.
- No horizontal overflow, failed request or console error.
- Full diff review and `git diff --check`.
