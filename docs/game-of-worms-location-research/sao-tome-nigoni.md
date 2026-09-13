# São Tomé *C. nigoni* location research and art brief

Last updated: 2026-09-13

## Current revision: shared snail ride and leaf reveal

Implemented on `codex/sao-tome-snail`, based on current main `3deacf6`.
Martyna approved the final contextual render for deployment on 2026-09-13.
The English-only labels are `Snail ride`, `Lift the leaf` and `Fallen leaf`.
The existing begonia stained-glass parasols remain unchanged.
This section supersedes the older accessory contract and six-object acceptance
criteria retained below as historical context.

### Regional link and visual references

The Obô giant snail, *Archachatina bicarinata*, is endemic to São Tomé and
Príncipe and lives in the islands' forests. Fallen leaves and fruit form part
of its diet. It is distinct from the introduced *A. marginata*.

- [Forest Giants conservation project](https://www.forestgiants.org/about/)
- [Mossy Earth, Helping Forest Giants](https://www.mossy.earth/projects/helping-forest-giants)
- [Fundação Príncipe, Obô giant snail](https://fundacaoprincipe.org/en/projects/terrestrial-conservation/obo-giant-snail)

The Fundação Príncipe photographs were inspected for the long, rounded shell
spire, inflated body whorl, aperture lip, grey textured foot and two long
eye-bearing tentacles with shorter sensory tentacles. The vectors are original,
not traced or copied from those photographs. The approved snail drawing is
preserved in the ride.

### Biology and approved copy

Phoresy is transport by another animal. Transport inside a carrier is termed
endophoresy. Nematode associations with gastropods are documented, including
experimental work on *C. elegans*. This does not establish a specific transport
relationship between JU2484 and the Obô giant snail. The collection record
names neither an associated organism nor Obô Natural Park. The shared shell
ride and relative sizes are playful representations of the general phenomenon.

Primary sources checked for the terminology and evidence:

- [Petersen et al., 2015, C. elegans and slugs](https://pmc.ncbi.nlm.nih.gov/articles/PMC4501285/)
- [Sudhaus, 2018, nematode associations with gastropods](https://doi.org/10.25674/4jp6-0v30)
- [Petersen, Krahn and Leippe, 2023, invertebrate associations](https://doi.org/10.3389/fevo.2023.1069056)

The approved English-only Tiny surprise is:

> This female-founded C. nigoni line came from an unidentified rotten fruit lying on the forest floor on São Tomé. Some nematodes reach new feeding sites by travelling with snails and slugs, a form of hitchhiking called phoresy.

The existing first sentence is unchanged. Only the approved second sentence
was added. No Swedish or Polish Game version exists.

### Exact implementation

- `sao-tome-art.js`: one shared snail and one asymmetric fallen leaf. Shell
  grain stays inside its clipped silhouette, with the aperture layered over
  the foot. All racing flags have been removed.
- `sao-tome-play.js`: the male boards first, followed by the female. Different
  body curves fit the far and near sides of the same shell. Both riders use
  the snail's travelling coordinate system. After it stops, they climb off
  into separate foreground positions, then restore their original poses.
- The female raises the leaf while both worms lean beside it. This separate
  action hides the idle snail to avoid displaying two snails. The leaf's
  initial offset leaves the snail's front exposed when both buttons are on.
- The unchanged parasols are the static third accessory. Four movable
  objects replace the previous six. Home restores the focused object's
  placement and size. Temporary layers preserve the visitor's original styles.
- Original-speed excerpts of the existing CC0 `pohnpei-leaves.ogg` provide
  quiet leaf handling and boarding/climbing-off rustling. There is no invented
  snail vocalisation, ambient loop or automatic sound on page load.
- Reduced motion keeps the worms in place and uses a brief static reveal,
  without relocation, crawling, leaf rotation or sound.
- Escape, changing scene, toggling an accessory, resizing, leaving the visible
  scene and hiding the page cancel the action and restore original styles.
- The forest painting, map and all unrelated scenes are unchanged.

### Refinement and verification, 2026-09-13

The race prototype was replaced following Martyna's request for transport.
Critical review first found the male's face partly hidden, then an over-corrected
floating pose. His separately drawn curve now rises from the rear shell, with
his tail occluded behind it. On dismount he moves into the foreground. The two
landing positions are separated. Both final poses were shown in the actual page.
The leaf stays behind the faces and the female's grip follows its hinge.
Legacy SVGMatrix conversion uses explicit DOMMatrix components.

Passed: focused motion/geometry tests, complete catalogue and paired-geometry
audits, label consistency, fresh-visit defaults, Pohnpei regression tests,
syntax and whitespace checks. Browser checks covered pointer and keyboard
activation, size and position changes, Home, Escape, resize cancellation,
complete ride and leaf reveal, and exact saved-style restoration. No console
errors were reported in the final QA tab.

Full-page screenshots were inspected from header through the bottom source
section at viewport widths 360, 768, 1024 and 1440. Captured content dimensions
were respectively **345 × 2521**, **753 × 2399**, **1009 × 1849** and
**1425 × 1928** pixels. The browser capture excludes the 15 px scrollbar.
These are complete content captures, not manually cropped or stitched images.
No horizontal content overflow was observed. Normal viewport captures also
checked the active phone ride, desktop riding and landing, and raised leaf.
The Game has one fixed light palette, so no separate dark version was added.

Physical phones, Safari, OS reduced-motion browser emulation and subjective
audio listening remain unverified. Final contextual approval was received.
Publication and direct live verification follow the approved commit.

### Changed-file inventory

Created:

- `game-of-worms/sao-tome-art.js`
- `game-of-worms/sao-tome-play.js`
- `scripts/check-sao-tome.cjs`

Changed:

- `game-of-worms/accessory-designs.js`
- `game-of-worms/game.js`
- `game-of-worms/index.html`
- `game-of-worms/assets/audio/SOURCES.md`
- `docs/game-of-worms-location-research/sao-tome-nigoni.md`
- `docs/game-of-worms-scene-review-queue.md`
- `docs/game-of-worms-art-catalogue.md`
- `PROJECT_STATUS.md`

Deleted: none. Existing image and audio bytes are unchanged.

## Historical 2026-08-21 brief

> **Previous accessory contract:** `São Tomé chocolate bars`, `birdsong music boxes`, and `begonia stained-glass parasols`.

This dossier is the evidence and review contract for the *Caenorhabditis nigoni* São Tomé landscape and its three accessory pairs. It responds directly to the earlier generic and reused São Tomé artwork by making the exact forest-floor record the centre of the scene.

## Evidence boundaries

### JU2484 collection record

The authoritative Worldwide Worms/Félix entry records:

- species: *Caenorhabditis nigoni*;
- strain: JU2484;
- former name: Goy1;
- locality: São Tomé, with no district, park, trail or named forest;
- coordinates: 0.2° N, 6.6° E;
- collection date: 28 February 2013;
- landscape: forest;
- substrate: rotten fruit on the ground;
- sampler: Rémy Froissart;
- isolator: Lise Frézal;
- inbreeding state: isofemale.

Elevation, fruit identity, substrate comments, associated organism, life stage and precise micro-site are unreported. The current Game point is about 21 km from the published rounded point and must move to `[6.6, 0.2]`. Those one-decimal coordinates remain coarse and cannot identify a particular forest stand or justify an exact sightline.

Primary sources:

- [Worldwide Worms/Félix JU2484 record](https://www.justbio.com/tools/worldwideworms/search.php?selector=strain&select=JU2484)
- [Moya et al. *C. nigoni* long-read genomics preprint](https://pmc.ncbi.nlm.nih.gov/articles/PMC12715550/)

The genomic preprint independently confirms JU2484 as one of five isofemale lines used for long-read sequencing, but it is not the source for collection details.

### Correct forest setting

The existing cacao trees, volcanic needle, vertical waterfall, coast and islet are unsupported at JU2484's collection site and are retired. Cacao is particularly misleading because the fruit identity is unknown, while Sanda JU1873 is the Game record with documented rotten cacao.

Island-wide sources describe volcanic peaks, forests, coasts and cacao, but they cannot establish those features at JU2484's site. São Tomé also contains sharply different lowland, mountain and cloud-forest formations and several land-use categories. With no elevation or finer landscape field, the artwork stays altitude-neutral and does not name primary forest, secondary forest, shade plantation, Obô Natural Park or any particular formation.

Regional sources:

- [UNESCO São Tomé biosphere overview](https://www.unesco.org/en/mab/ilha-de-sao-tome)
- [São Tomé and Príncipe national biodiversity strategy](https://www.cbd.int/doc/world/st/st-nbsap-v2-en.pdf)
- [Dallimer et al., 2013, Biodiversity and land-use change on São Tomé](https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0074148)

These pages are factual and visual references only. The website uses an original painted illustration and does not trace an external photograph, map, protected organism or institutional graphic.

## Landscape composition contract

The scene is a continuous, closed, ground-level forest view centred on the exact rotten-fruit record. It must not become an island tourism montage.

### Foreground: exact fruit microhabitat

- One dominant anonymous collapsed fruit lies in layered forest litter.
- Irregular torn rind and softened pulp communicate decay without suggesting cacao, banana, guava, jackfruit, citrus or another diagnostic fruit.
- Ground placement is exact record evidence; the fruit species, condition details and surrounding plants remain unknown.

### Middle ground: altitude-neutral forest

- One off-centre forked tree base supports unequal fern and liana layers.
- A single oversized asymmetric São Tomé begonia cue may appear as explicitly regional flora, never the sampled plant.
- Trunks, litter, ferns and lianas overlap into one enclosed space without a stream, plantation row or generic rainforest icon strip.

### Background: closed-canopy lock silhouette

- Tightly overlapping canopy leaves only one irregular shaft of diffuse light and no scenic horizon.
- The locked thumbnail silhouette is a collapsed fruit below a diagonal forked trunk, opposed by one oversized asymmetric leaf group beneath a closed canopy.
- There is no cacao plantation, coffee, roça, waterfall, coast, islet, stream, Pico Cão Grande, volcanic needle or cloud-forest fog.

## Accessory evidence and design contract

The accessories combine one island-wide cocoa reference with original birdsong and begonia-inspired fantasy objects. They are not claimed collection equipment, local traditional artefacts or evidence about JU2484's unidentified fruit.

### São Tomé chocolate bars

- **Primary:** a tall partially unwrapped segmented chocolate bar with plum paper, copper-gold foil, restrained ribbing and an abstract botanical medallion.
- **Companion:** a shorter skewed open bar with differently folded paper and a separate broken chocolate square.
- The bars are unbranded and carry no invented percentage, producer or product identity. Cocoa is an island-wide reference only; the drawings do not imply that JU2484 was collected from cacao.

Regional basis: [Government of São Tomé and Príncipe country profile](https://stp.gov.st/sobre_pais).

### Birdsong music boxes

- **Primary:** a wide blue-lacquer cabinet with an arched violet lid, visible pinned cylinder, separately constructed rose bird automaton, gold filigree, curved feet and a large brass key.
- **Companion:** a compact domed cabinet with its own cylinder, a differently proportioned rose bird and tail, a musical flourish and a smaller separately constructed key.
- The birds are decorative silhouettes rather than named species. The drawings contain no captured animal, nest coordinate, institutional logo or copied call trace.

### Begonia stained-glass parasols

The decorative canopy geometry references published research on the island's begonias without implying the collection or possession of protected plants.

Source: [Plana et al., 2004, A phylogeny of the African and São Tomé begonias](https://doi.org/10.1016/j.ympev.2003.08.023).

- **Primary:** a wide lobed violet leaf canopy with contained aqua, rose and gold panes, dark leading, alternating hanging jewels, amber finial and curved brass handle.
- **Companion:** a compact aqua flower canopy with differently arranged rose and gold panes, separate leading, a shorter alternating fringe and a smaller curved handle.
- Both are clearly constructed stained-glass fantasy props; neither drawing uses a real specimen, herbarium sheet or protected plant as a costume.

## Cultural and ecological safeguards

- Do not identify the rotten fruit or claim JU2484 came from Obô Natural Park, primary forest, a plantation or a particular elevation.
- Keep famous peaks, waterfalls, coasts and plantation imagery out of the scene.
- Do not turn endemic birds, snails or plants into trophies, pets, costumes or collectible specimens.
- Do not borrow Tchiloli clothing, flags, colonial-roça imagery or national colours as decorative shorthand.
- Treat the chocolate, birdsong and begonia objects as original fantasy accessories, not local traditional artefacts or collection evidence.

## Quality benchmark

The revised preceding locations are the minimum quality floor, not templates to repeat. São Tomé must exceed them through an exact anonymous-fruit focal point, coherent closed-canopy depth, recognizable material construction, two genuinely different drawings per concept and a readable combined composition.

## Painted-background implementation status

- The approved runtime painting is `game-of-worms/assets/sao-tome-ju2484-painted-background.webp`.
- Its full-resolution source is preserved separately as `game-of-worms/assets/source/sao-tome-ju2484-painted-background-source.png`.
- The previous custom SVG landscape remains in `environment-scenes.js` only as an asset-load fallback.
- The painting preserves the exact anonymous rotten-fruit-on-ground record and deliberately avoids a cacao identity, named forest, elevation, plantation, coast, waterfall, stream or landmark claim.
- The animated worms and all six independently movable accessories remain live SVG layers above the painting.

## Review and interaction acceptance

- Only the São Tomé accessory data, drawings and cache keys change in this refinement; the approved landscape and map metadata remain unchanged.
- Public copy preserves the unknown elevation, fruit identity and exact forest locality.
- Every concept has a dedicated SVG drawing path; none uses a generic field-object renderer or species-level fallback.
- Primary and companion copies differ in outline, construction, internal detail and placement.
- All three pairs remain legible together and do not intersect one another or hide worm faces.
- Each of the six visible objects remains independently draggable and keyboard movable; Home resets only the focused copy.
- Accessible names match the visible objects.
- Pointer and keyboard tests cover all six copies, including after a responsive resize.
- Visual checks cover the Game's fixed light palette and responsive widths from 360 px to wide desktop.
- No horizontal overflow, console error, broken source link or change to another location is accepted.
- Environment/accessory audits, syntax checks, `git diff --check` and the full diff pass before integration.
