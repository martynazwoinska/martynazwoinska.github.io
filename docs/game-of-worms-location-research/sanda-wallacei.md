# Sanda, Bali *Caenorhabditis wallacei* JU1873 location research and art brief

Last updated: 2026-07-14

## Purpose

This dossier defines the evidence boundary and illustration contract for the
Sanda, Bali · JU1873 environment and its three paired accessories.

## Exact collection record

The primary collection record gives:

- Species at collection: *Caenorhabditis* sp. 16, later named *C. wallacei*
- Isolate: JU1873
- Other name: ZB.5
- Substrate: rotting cacao fruit
- Place: Sanda Center, Bali, Indonesia
- Coordinates: -8.36130, 115.02965
- Collector and isolator: J.-B. Pénigault
- Collection date: 11 November 2009
- Plating date: 16 November 2009
- Reproduction: females and males
- Status: type and reference isolate

The record does not report elevation, weather, plantation structure,
associated crops or the fruit’s exact state of decay.

## Evidence boundary

One rotting cacao fruit from a cacao plantation near Sanda Center is exact
record evidence. Cacao fruit and cauliflorous flower morphology may be grounded
in the Kew reference.

Official Sanda and Pupuan sources support only a broader upland agricultural
setting. They do not establish JU1873’s elevation, terraces, shade trees,
coffee association, collection weather or viewpoint. Published regional
coffee elevations must not be assigned to this isolate.

A faint Pupuan ridge may be shown only as regional context. The plantation
layout must remain anonymous and interpretive.

The current terraces, rain, highland-agroforest description, coffee or
fruit-tree layering and symmetrical cacao arch are unsupported and must not be
retained.

## Primary and authoritative sources

- Kiontke et al. 2011 article:
  https://pmc.ncbi.nlm.nih.gov/articles/PMC3277298/
- Kiontke et al. collection-record supplement:
  https://pmc.ncbi.nlm.nih.gov/articles/instance/3277298/bin/1471-2148-11-339-S8.DOC
- Félix Lab JU1873 record:
  https://justbio.com/tools/worms/details.php?strain_id=333372
- CGC JU1873 record:
  https://cgc.umn.edu/strain/JU1873
- Félix et al. 2014 species description:
  https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0094723
- Kew cacao morphology:
  https://powo.science.kew.org/taxon/urn%3Alsid%3Aipni.org%3Anames%3A320783-2/general-information
- Official Sanda village profile, regional context only:
  https://sanda.desa.id/artikel/2024/05/17/profil-desa-sanda
- Official Pupuan district site, regional context only:
  https://pupuan.tabanankab.go.id/

## Game metadata

Display name: `Sanda, Bali · JU1873`

Coordinates in game order: `[115.02965, -8.36130]`

Marker source: `Félix Lab JU1873 record`

Profile ID: `sanda-ju1873-cacao-plantation`

Profile title: `Sanda cacao plantation floor`

Profile note:

> JU1873 came from one rotting cacao fruit in a cacao plantation near Sanda
> Center. The cacao morphology is botanically grounded; the faint Pupuan ridge
> is regional context only. Elevation, plantation structure and collection
> weather were not reported.

Source URL:
`https://justbio.com/tools/worms/details.php?strain_id=333372`

Recommended palette: `palettes.rainforest`

Use no generic weather, water or feature cues.

## Environment illustration contract

Create a dedicated original SVG scene at the existing 600 × 430 viewBox.

Camera:

- Close, low plantation-floor view rather than a broad landscape.

Foreground:

- One dominant decaying cacao fruit, slightly off-centre, among irregular
  fallen leaves.
- A partially opened rind may make decay legible, but the UI note or dossier
  must preserve that this is an illustration choice because the sample’s exact
  decay state was not recorded.

Middle:

- Two unequal cacao trunks lean inward without forming a symmetric arch.
- Include restrained cauliflorous flowers and one or two intact ribbed fruits
  growing directly from the trunks, following Kew morphology.
- Leave an irregular dark plantation-row opening between the trunks.

Background:

- At most one narrow mist-softened Pupuan ridge band as regional context.

Silhouette lock:

> Two unequal inward-bending cacao trunks frame one dominant decaying fruit
> beneath a narrow pale ridge gap.

Forbidden:

- Terraces, stepped fields or a panoramic highland view.
- Rain curtain, coffee plants, bananas or rice.
- Temple gates, national symbols or generic Bali decoration.
- Named mountains or invented elevation.
- A symmetrical trunk arch or multiple competing cacao specimens.

The decaying fruit and trunk lock must remain legible behind both worms and at
mobile thumbnail size.

## Accessory contract

All three are independently movable props, not costumes. Primary and companion
versions must be materially different objects rather than resized or
recoloured duplicates.

### JU1873 rotten-cacao specimen lantern

Family ID: `ju1873-cacao-specimen-lantern`

Scientific basis: the exact rotting-cacao substrate, with fruit morphology
grounded in Kew.

Primary: a broad horizontal hinged half-fruit lantern with ribbed rind halves,
a softly translucent pulp-and-seed chamber, curved carrying handle and small
decay-speck shutters.

Companion: a tall louvered rind-column lamp with one separate oval inspection
window, hooked peduncle-like top and offset foot.

Keep the silhouettes horizontal versus vertical. Do not present the decay
pattern as a diagnosed disease.

### JU1873 five-day plating chronograph

Family ID: `ju1873-plating-chronograph`

Scientific basis: collection on 11 November and plating on 16 November.

Primary: a wide low five-notch date wheel connecting a specimen cup to a
culture-plate cradle through a visible coherent escapement.

Companion: a tall `11 → 16` flip-calendar column with a zigzag five-step
mechanism, separate side cradle and pendulum.

Every connector must have an obvious mechanical purpose. Do not add arbitrary
rods or sticks touching the plate. The five divisions encode the documented
calendar interval only; do not call it incubation time or infer undocumented
intermediate handling.

### JU1873 living-type voucher vault

Family ID: `ju1873-living-type-vault`

Scientific basis: JU1873 is the type and reference isolate retained as a
living repository strain.

Primary: a low horizontal double-wall storage carousel containing one clearly
labelled JU1873 vial, three unequal storage ports and a hinged retrieval rail.

Companion: a tall double-wall lift vault with one suspended capillary, offset
retrieval arm, narrow temperature dial and separate lower cradle.

This must read as standalone storage and retrieval equipment, not a backpack
or jetpack. Do not display an invented storage temperature.

## Suggested starting layouts

These values require final browser tuning:

```js
"ju1873-cacao-specimen-lantern": {
  primary: [385, 132, .37, -2],
  companion: [-8, 118, .28, 3]
},
"ju1873-plating-chronograph": {
  primary: [240, 175, .32, 1],
  companion: [126, 205, .27, -2]
},
"ju1873-living-type-vault": {
  primary: [385, 248, .34, -1],
  companion: [18, 286, .27, 2]
}
```

## Species copy boundary

Defensible compact copy:

> *C. wallacei* is an outcrossing species whose type isolate, JU1873, came
> from a rotting cacao fruit in a plantation near Sanda, Bali.

> JU1873 is the type isolate of a female–male species. Its closest known
> sister species is the self-fertilising *C. tropicalis*.

## Variant and interaction requirements

- Each primary and companion pair must differ in outer silhouette,
  orientation, internal construction, attachment point and negative space.
- Add a custom initial layout for each family.
- Inspect all three accessories together on both worms.
- Keep facial features, species label and body outline readable.
- Verify direct pointer drag, keyboard movement, Home reset and focus treatment
  independently for all six pieces.
- Respect reduced motion and existing touch-target behaviour.

## Semantic reuse ledger

Remove the cacao cuirass, terrace boots and cacao-pod xylophone concepts.

Classify the new designs as the second and final use of three semantic
families:

- Specimen lantern — Santeuil and Sanda JU1873
- Sample-record timekeeper — Trivandrum JU1325 and Sanda JU1873
- Cryogenic preservation device — Bristol N2 and Sanda JU1873

The visual forms must remain substantially different between locations.

Expected totals:

- 16 families used exactly twice
- 79 singleton families
- 111 concepts across 37 accessory sets
- no semantic family used more than twice

## Acceptance checks

- Exactly 37 explicit environment profiles and composition IDs.
- Exactly 37 accessory sets and 111 unique accessory design IDs.
- No remaining active `sanda-cacao-highland` profile or obsolete
  `bali-cacao` scene group.
- No generic-renderer fallback for the six new accessory illustrations.
- No initial overlap among the three accessories or with critical worm detail.
- No unexplained rods or shapes touching the culture plate.
- Desktop and mobile checks near 360, 768, 1024 and wide viewports.
- Light and dark themes, reduced motion, keyboard focus and direct drag.
- No horizontal overflow, failed requests or console errors.
- Full diff review and `git diff --check`.
