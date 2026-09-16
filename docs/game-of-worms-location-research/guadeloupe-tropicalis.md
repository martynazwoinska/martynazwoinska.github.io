# Current interaction pass: 2026-09-16

**Final gwoka-11 preview approved for deployment on 2026-09-16.**
The local-only entries below record earlier checkpoints; the user has now
authorized publication of the final artwork, interaction and English-only copy.

## Revised local preview: gwoka-9

Martyna rejected gwoka-2: one strike per click, rigid jerking and unsatisfactory
hummingbird costumes. This revision addresses all three points.

- One click plays a twelve-beat phrase over a 4.1-second action. The two drums
  have different rhythms with low, open and muted recorded tones and varied
  accents. Beats are scheduled on the audio clock.
- The larger hermaphrodite dances when the smaller male's drum is clicked.
  Clicking the other drum swaps roles. Clicking an already-playing drum does
  not restart the movement or pile up sound.
- A smooth travelling wave bends the actual middle of the worm's path. Face
  and tail-tip coordinates stay anchored. The fitted costume bends with the
  body; wing feathers move together around their shoulder attachments.
- Completely redrawn costumes: fitted emerald vests, layered pointed wings,
  purple throat feathers, tail fans and long costume beaks. The two patterns
  have different silhouettes and feather arrangements.
- Reference: [BirdsCaribbean, Purple-throated Carib](https://www.birdscaribbean.org/2020/05/from-the-nest-day-28/).
  Anatomy and plumage guided the original drawings; no source artwork copied.
  These are imaginative costumes, not a species identification or bird sex
  assignment for the worms.
- Original background and drum shells retained. Existing visitor
  positions and sizes retained. Reduced motion uses a still response.
- Sound remains licensed conga foley, not an authentic ka-drum recording or a
  reconstruction of a traditional gwoka performance. Sources and hashes:
  `game-of-worms/assets/audio/SOURCES.md`.
- No new public wording beyond the earlier English-only **Madras crowns** and
  audio credit. The Game intentionally has no Swedish or Polish interface.

## Refinement and verification

- First in-page draft exposed an oversized empty bounding box that displaced
  the vest. Corrected the transform origin and used individual drawn-path
  bounds for clamping. Touch padding is limited to the vest, avoiding the empty
  area between wings and beak. This change is scoped to the Guadeloupe costume.
- Replaced the flat throat patch highlight with overlapping feather marks,
  lengthened the visible beaks and preserved crown layering during dance.
- `node scripts/check-guadeloupe-play.cjs` passed: twelve-beat audio timing,
  hand contact, anchored face/tail, continuous visible body wave, reduced motion,
  both costume path sets, cancellation, loading reuse and failed-download retry.
- `node scripts/check-mauritius-play.cjs` passed as a focused regression.
- JavaScript syntax checks and `git diff --check` passed.
- Browser: actual pointer click, Enter/Space, both roles, repeated clicks,
  Escape and automatic cleanup checked. The moving body has deformed path data
  and no rigid transform on the dancer group. No console errors or warnings.
- Accessory styles matched after a completed phrase. A costume moved 4 px and
  scaled to 1.1 retained those settings during playback. Test changes restored.
- Scene screenshots inspected at viewport widths 360, 768, 1024 and 1440 px.
  No horizontal overflow. Background and all six accessories remain visible.
  The Game retains its fixed light palette.
- **Full-page proof limitation:** the capture tool returned duplicated/scaled
  page sections and blank space. This is not a valid full-page proof. Normal
  viewport captures worked and were used for scene inspection. No claim of
  exact-width full-page validation.
- Subjective listening and physical touchscreen/pinch testing remain manual.

## Crown follow-up

- Replaced the flat triangular crowns with a pleated madras fan for the larger
  worm and an independently drawn low wrap with a side knot for the smaller one.
  Checked fabric fills stay inside each fold; folded edges and shadowed pleats
  communicate cloth. Both wraps fit above the eyes and follow the idle head bob.
- Construction reference: [Dody cotton fan coiffe](https://dody.shop/coiffes-femmes/coiffe-madras-eventail-hibiscus_724.html).
  The photograph guided fabric construction only; no image copied into the game.
  These original dress-up designs do not reproduce a specific ceremonial coiffe
  or imply the coded meaning of traditional point arrangements.
- Refinement pass deepened the fan folds and clarified the small tied ends.
  During testing the dance clone lost its pattern fill; fixed by retaining
  separately named pattern definitions in the visible clone.
- Preview gwoka-9: inspected the scene at 360, 768, 1024 and 1440 px, with no
  horizontal overflow. Checked both dancer roles, keyboard crown movement and
  sizing, and retention of a 4 px / 1.1 scale adjustment through playback.
  Test adjustments restored. No browser warnings or errors.
- Full-page capture was retried at 360 px and still produced duplicated sections
  and blank space. It is not a valid full-page proof; viewport proofs only.
- Created `game-of-worms/guadeloupe-crowns.js`; changed the accessory renderer,
  bounds handling, clone pattern handling, stylesheet and module cache versions.
  No public copy changes, files deleted, commit or deployment in this follow-up.

## Costume detail follow-up: gwoka-11

- Martyna approved the gwoka-9 hats and requested richer costumes. Crown file
  SHA-256 remains `92F129203B7FB6FC54013E3B9AD706B796187F5F36962D69EF041A55056A91DB`.
- Added overlapping emerald body feathers, layered wing coverts, individually
  shaped purple collar feathers and longer internal tail feathers. Each worm
  retains its own arrangement and existing costume fit. New body details bend
  with the vest; shoulder details follow the existing wing hinges.
- Refinement made collar feathers broader and clearer at the default size and
  added restrained shaft/barb details to the long wing feathers.
- Existing BirdsCaribbean reference informed feather structure; no source
  artwork copied, and no new biological or public-facing copy claims.
- Final scene inspected at 360, 768, 1024 and 1440 px. No horizontal overflow;
  both dance roles retain the new featherwork and approved crowns. Syntax and
  the focused Guadeloupe tests pass; no console errors or warnings. The prior
  full-page screenshot tool limitation remains; these are viewport checks.
- Changed `guadeloupe-costumes.js`, module cache keys in `index.html`, `game.js`,
  `accessory-designs.js` and `guadeloupe-play.js`, plus the four review/status
  documents. No files created or deleted for this follow-up. No commit or deploy.

## Files and publication

Worktree: `output/guadeloupe-nic203`; branch: `codex/guadeloupe-drum-dance`.
Based on main `6b51cc537540e2ea476d9794d7afe220dd3b0b74`.
Preview: http://127.0.0.1:8767/game-of-worms/?preview=20260916-gwoka-11
Deployment authorized; publication is being verified. Unrelated checkout work remains intact.

Created across this Guadeloupe revision:

- `game-of-worms/guadeloupe-play.js`
- `game-of-worms/guadeloupe-dance.js`
- `game-of-worms/guadeloupe-costumes.js`
- `game-of-worms/guadeloupe-crowns.js`
- `game-of-worms/assets/audio/guadeloupe-{low,open,muted}.mp3`
- `scripts/check-guadeloupe-play.cjs`

Changed: `game.js`, `accessory-designs.js`, `index.html`, `style.css` and
`assets/audio/SOURCES.md` under `game-of-worms/`; `PROJECT_STATUS.md`, the
scene queue, art catalogue and this dossier. Deleted files: none.

The historical notes below describe older inventories and retired objects.
They are not the current production contract.

---


## Historical research, 2026-08-10

# Guadeloupe *Caenorhabditis tropicalis* NIC203 location research and art brief

Last updated: 2026-08-10

> **Current production accessory contract:** `hummingbird costumes`, `madras carnival crowns`, and `gwo ka drums`. These are imaginative Guadeloupe-linked dress-up objects rather than claims about collection equipment, traditional ceremonial dress or worm biology.

## Purpose

This dossier defines the evidence boundary and illustration contract for the
Guadeloupe NIC203 environment and its three paired accessories.

Implemented on 2026-07-26 with a dedicated painted humid-forest-floor
background, exact NIC203 marker metadata and six independently movable bespoke
objects.

## Representative choice and current-marker caveat

Use NIC203 as the explicit representative.

The existing Game coordinate `[-61.643, 16.044]` rounds to NIC114 at Chutes du
Carbet II, not NIC203. NIC114 is a valid isotype-reference record from Cecropia
fruits collected by C. Braendle in March 2010, with the exact day unknown.

NIC203 is preferred because it has a precise collection date, a named substrate
and strong relevance to the Game’s toxin–antidote lesson. Its own coordinate
must replace the old NIC114-derived coordinate. Public text must describe
NIC203 as one representative Guadeloupe isolate, not as every Guadeloupe
record.

## Representative collection record

- Species: *Caenorhabditis tropicalis*
- Strain and isotype reference: NIC203
- Previous name: G-H1a1
- Coordinates: 16.0459, -61.6262
- Elevation: 420 m
- Landscape: forest
- Substrate category: rotting flower
- Substrate identification: torch ginger, *Etlingera elatior*
- Locality: 3ème Chute du Carbet, Capesterre-Belle-Eau, Guadeloupe
- Collection date: 4 September 2011
- Sampled by: N. Poullet
- Isolated by: N. Poullet
- Species-identification method: mating and ITS2

CaeNDR reports no strain issue. Substrate temperature, ambient temperature and
humidity are not available.

The record does not state whether the flower was attached or lying on the
ground, its colour or maturity when sampled, its precise decay geometry,
associated organisms, weather, distance from water or a collection-patch
photograph.

## Laboratory genetics context

Laboratory crosses between NIC203 from Guadeloupe and EG6180 from Puerto Rico
revealed three maternal-effect toxin–antidote systems in NIC203, on chromosomes
II, III and V.

This supports one genetics-derived accessory. It does not show that the
collection flower, waterfall, forest conditions or Guadeloupe environment
caused or maintained those elements.

Do not invent genetic sequences, penetrance, offspring ratios or field
adaptation.

## Exact-versus-regional evidence boundary

Exact collection evidence:

- NIC203 strain, isotype-reference status and previous name
- Coordinates and 420 m elevation
- Forest landscape
- Rotting *Etlingera elatior* flower substrate
- Third Carbet Falls locality
- Sampling and isolation by N. Poullet on 4 September 2011
- Identification by mating and ITS2

Exact later laboratory context:

- NIC203 was crossed with EG6180
- Three toxin–antidote systems were identified on chromosomes II, III and V

Site or regional context only:

- The Third Carbet Fall is approximately 20 m high and ends in a circular basin
- The Grand Carbet river forms three principal waterfalls
- The wider Chutes du Carbet area lies in humid Basse-Terre forest
- The river begins on the eastern flank of La Soufrière
- Torch ginger has a cone-like inflorescence with overlapping showy bracts

No source shows that NIC203 was collected in waterfall spray, beside the river,
with a view of the fall or volcano, beneath a tree fern, or at a fumarole.

## Primary and authoritative sources

- CaeNDR NIC203:
  https://caendr.org/isotype/NIC203/
- CaeNDR NIC114, documenting the old marker’s underlying record:
  https://caendr.org/isotype/NIC114/
- Latest CaeNDR *C. tropicalis* release:
  https://caendr.org/data/data-release/c-tropicalis/latest
- Current CaeNDR strain data:
  https://caendr.org/request-strains/download/c-tropicalis/20250627/strain-data/csv
- Tikanova et al. 2025, NIC203 toxin–antidote systems:
  https://www.nature.com/articles/s41559-025-02894-2
- Pliota et al., NIC203 slow-1/grow-1:
  https://pmc.ncbi.nlm.nih.gov/articles/PMC10990930/
- Guadeloupe National Park, Carbet Falls:
  https://www.guadeloupe-parcnational.fr/fr/des-decouvertes/les-sites/espaces-terrestres-du-parc-national/les-chutes-du-carbet
- Guadeloupe National Park, dense humid forest:
  https://guadeloupe-parcnational.fr/fr/des-connaissances/patrimoines-naturels/les-milieux/milieux-forestiers/foret-dense-humide
- Missouri Botanical Garden, *Etlingera elatior* morphology:
  https://www.missouribotanicalgarden.org/PlantFinder/PlantFinderDetails.aspx?taxonid=291516

## Game metadata

Display name: `Guadeloupe · NIC203`

Representative strain: `NIC203`

Coordinates in Game order: `[-61.6262, 16.0459]`

Style: `rainforest`

Profile ID: `guadeloupe-nic203-torch-ginger-forest`

Profile title: `NIC203 torch-ginger forest floor`

Profile note:

> NIC203 was sampled and isolated by N. Poullet from a rotting torch-ginger
> flower in forest at 420 m at the Third Carbet Falls locality on 4 September
> 2011. The narrow waterfall and humid-forest setting are site context; the
> sample’s exact placement and collection-patch view were not recorded.

Source label: `CaeNDR NIC203 isotype record`

Source URL: `https://caendr.org/isotype/NIC203/`

Use `palettes.rainforest`. Use no generic weather effect, water layer or feature
cue. Render the site through a dedicated custom scene.

Marker history:

> This marker represents NIC203, an isotype-reference *C. tropicalis* strain
> previously called G-H1a1. N. Poullet sampled and isolated it from a rotting
> *Etlingera elatior* flower in forest at 420 m at the Third Carbet Falls
> locality on 4 September 2011; mating and ITS2 supported its identification.
> Later laboratory crosses with EG6180 helped reveal three maternal-effect
> toxin–antidote systems in NIC203.

## Environment illustration contract

Create a dedicated original SVG scene in the existing 600 × 430 viewBox.

### Camera

- Use a close, low forest-floor viewpoint.
- Make the recorded flower substrate the visual focus.
- Preserve open central space for both worms and all six movable objects.
- Keep the waterfall narrow and subordinate.

### Foreground

- Place one dominant softened torch-ginger inflorescence near the lower left.
- Build it from unequal overlapping waxy bracts around a compressed centre.
- Use muted berry, oxblood and ochre rather than a pristine ornamental bloom.
- Add a bent or shortened stalk without claiming the original break pattern.
- Place it in irregular dark litter, explicitly as an illustrative placement.
- Include no worms, labels, sample flag or collection apparatus.

### Middle

- Create an S-curving wet trail moving diagonally toward the right.
- Frame it with two unequal trunks, broad exposed roots and differently sized
  dark volcanic stones.
- Use restrained generic broad leaves and small ferns as supporting texture.
- Keep the central play area open and readable.

### Background

- Close most of the horizon with layered humid forest.
- At far right, leave one narrow vertical opening containing the short,
  high-volume Third Carbet Fall.
- Crop most of its circular basin behind forest and rock.
- The waterfall is a site cue, not a reconstruction of the collection view.
- Include no visible summit or broad mountain panorama.

### Silhouette lock

> A collapsed radial torch-ginger flower sits below an S-curving trail,
> opposed by one narrow vertical waterfall slit inside otherwise closed forest.

### Forbidden

- La Soufrière dome, crater, summit or fumarole plume.
- Dominant waterfall panorama or three simultaneous scenic waterfalls.
- Claim that the sample was aquatic or collected in spray.
- Oversized tree fern as the defining silhouette.
- Botanical-garden display or pristine ornamental flower.
- Invented insects, pollinators or associated organisms.
- Native-status claim for *Etlingera elatior*.
- Tourism platform, bridge, signs, crowds or identifiable property.
- Flags or cultural motifs unrelated to the collection record.

## Accessory contract

### NIC203 torch-ginger bract stage

Family ID: `nic203-torch-ginger-bract-stage`

Exact basis: NIC203 came from a rotting *Etlingera elatior* flower. The
collection method and flower placement were not recorded.

Primary: a broad low asymmetric radial stage with overlapping hinged bract
panels, a connected central specimen cradle, separate culture vial, exposed
hand-crank linkage and reversible `G-H1a1 / NIC203` plate.

Companion: a tall open stalk-frame with vertically staggered downturned bracts,
sliding flower cage, separate side vial, lower litter drawer and offset
`4 SEP 2011` wheel.

The pair must not become two decorative flowers. Every hinge, rail and support
must visibly connect to the specimen-handling mechanism.

### Carbet three-fall hydraulic sequencer

Family ID: `carbet-three-fall-hydraulic-sequencer`

Regional basis: the Grand Carbet river has three principal falls described by
the National Park as approximately 115 m, 110 m and 20 m. NIC203’s locality is
the Third Fall, but the sample is not recorded as aquatic.

Primary: a broad horizontal stepped flume with three differently constructed
drops, connected catch basins, restrained `115 / 110 / 20 m` tabs, side drive
wheel and one circular final basin.

Companion: a tall three-window flow tower with offset drop shutters, separate
catch cups, exposed linked drainpipe and a circular-basin base.

Do not imply measured discharge, collection weather, sample immersion or exact
field instrumentation.

### NIC203 toxin–antidote inheritance automaton

Family ID: `nic203-toxin-antidote-automaton`

Laboratory basis: crosses between NIC203 and EG6180 revealed three
maternal-effect toxin–antidote systems in NIC203 on chromosomes II, III and V.

Primary: a broad horizontal three-gate logic board with one maternal-loading
wheel, three differently shaped paired rescue locks, blank offspring shutters,
visible connecting rods and restrained chromosome tabs `II`, `III` and `V`.

Companion: a tall helical three-stop inheritance tower with separate upper egg
chamber, descending rescue keys, three offset chromosome windows and a lower
winding drum.

Do not show invented nucleotide sequences, survival percentages, embryo counts
or claim that the systems were discovered in the field.

## Suggested initial layouts

These require final browser tuning:

```js
"nic203-torch-ginger-bract-stage": {
  primary: [384, 132, .35, -2],
  companion: [-8, 120, .27, 2]
},
"carbet-three-fall-hydraulic-sequencer": {
  primary: [236, 181, .33, 1],
  companion: [124, 211, .26, -1]
},
"nic203-toxin-antidote-automaton": {
  primary: [382, 252, .33, -1],
  companion: [200, 292, .27, 1]
}
```

## Semantic reuse ledger

Delete:

- Fumarole wig
- Waterfall glass harmonica
- Fern epaulettes

Wig changes from a twice-used family to a singleton at Nambucca Heads.

Add three singleton families:

- Botanical flower-substrate stage
- Three-fall hydrology demonstrator
- Maternal-effect toxin–antidote automaton

Expected totals become:

- 16 families used exactly twice
- 79 singleton families
- 111 concepts across 37 accessory sets
- no semantic family used more than twice

## Stale implementation cleanup

- Replace `Guadeloupe` with `Guadeloupe · NIC203` consistently in the marker,
  environment-profile key and accessory-set key.
- Replace `[-61.643, 16.044]` with `[-61.6262, 16.0459]`.
- Replace style `ocean` with `rainforest`.
- Delete active `guadeloupe-soufriere` profile and composition references.
- Remove the generic mist, fumarole, waterfall and fern cue list.
- Add a dedicated `drawGuadeloupeNic203Scene` renderer and dispatch.
- Replace the three old accessory rows and add three dedicated renderers.
- Remove `fern-epaulettes` from the explicit renderer set and delete its
  dedicated case.
- Retain the `wig` renderer because Nambucca still uses its banksia variant.
- Remove only Guadeloupe’s harmonica use; do not disturb unrelated musical
  renderers.
- Add explicit layouts for all three new family IDs.
- Add scoped light- and dark-theme CSS for the new scene and objects.
- Refresh relevant Game asset cache versions after implementation.

## Variant and interaction requirements

- All six drawings must differ in silhouette, orientation, internal
  construction, attachment point and negative space.
- No pair may be a mirrored, scaled, recoloured or count-only variation.
- Every rod, support, pipe, rail and axle must visibly connect to a functional
  component.
- Keep both worm faces and body outlines readable.
- Preserve independent primary and companion positions.
- Verify direct pointer dragging independently for all six objects.
- Verify Arrow movement, Shift+Arrow movement and Home reset.
- Preserve visible focus, minimum 44 px touch targets and reduced motion.

## Acceptance checks

- Exactly 35 preserved environment profiles and composition IDs, with 34 active locations.
- Exactly 34 active accessory sets and 103 unique design IDs.
- Correct NIC203 marker, strain, history, coordinate, profile and source.
- No active `guadeloupe-soufriere`, fumarole-wig, waterfall-glass-harmonica or
  fern-epaulettes reference for Guadeloupe.
- No Soufrière dome or fumarole in the revised scene.
- No generic renderer fallback for any of the six new objects.
- No initial art or target collision at mobile, tablet or desktop sizes.
- Test approximately 360, 768, 1024 and 1440 px.
- Test light and dark themes and reduced motion.
- Source link resolves.
- No horizontal overflow, failed request or console error.
- Full diff review and `git diff --check`.
