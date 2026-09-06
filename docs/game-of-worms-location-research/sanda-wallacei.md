# Sanda, Bali *Caenorhabditis wallacei* JU1873 location research and art brief

## Hanging pod cutting preview, 2026-09-06

Male nib-feeding follow-up: replaces his wooden club and pod half with an
open paper packet. The user supplied the sole new wording "cacao nibs".
It appears on the packet and in its individual accessible name. The Game
is intentionally English-only. No shared toggle or scientific prose changes.
Five angular pieces have different profiles, fracture faces and positions.
The paper has a separate side gusset, dark opening, turned lip and crimped
foot. A second pass softened its silhouette and refined its folded corners.
The packet tilts toward the male without covering his eyes or cloth.

Click/Enter/Space takes one actual nib from the packet to the male's current
mouth position. Dropping the packet opening at his mouth also feeds him.
Each nib disappears at contact. Home refills the packet. Clicking an empty
packet refills it. Reduced motion changes food state without travel.
Cancellation, replay, hiding and reset are covered by dedicated lifecycle
tests. The existing female strike, gongs and cloth remain independent.
This is fantasy play, not a claim about nematode diet or the collection.
Construction reference: ICCO processing guidance distinguishes roasted nibs
from the separated shell: https://www.icco.org/processing-cocoa/ .
No external artwork was copied.

Current preview: `http://127.0.0.1:4198/game-of-worms/?review=bali-nibs`.
Martyna approved the final drawing and both interactions for deployment.
Seven regression scripts, syntax and diff checks pass. Browser verified
phone/desktop feeding, reset, Escape and the female strike with no errors.
Four-width overflow checks pass.
Full-page captures still exhibit the known duplicate/half-size capture defect,
at 345x2400, 753x2381, 1009x1753 and 1425x1934 pixels. They are not valid
full-page proofs. Normal contextual views and interaction checks supplement
them. Existing raster source bytes are preserved.

`bali-cacao.js` animates the existing female machete along the reddish pod
hanging from the right tree. The ground fruit remains unchanged. Click or
Enter/Space starts the cut, as does dropping the blade onto the
fruit. Home resets both fruit and tool. Scene changes clear it. Interruptions
restore the exact tool opacity and the pre-animation fruit state. Reduced
motion reveals the opened pod without moving the blade. This is playful
cacao processing, not a reconstruction of the isolate's collection.

Production assets `assets/sanda-hanging-pod-backing.png` and
`assets/sanda-hanging-pod-halves.png` were made with the built-in image
generation tool, using the original background as reference. They are copied
byte-for-byte from its PNGs. The halves have genuine RGBA transparency.
No original raster or accessory path was changed. A tight clip limits the
clean backing to the original hanging fruit's footprint. Separate original
exterior surfaces rotate away as the seed-filled and empty inner faces turn
into view. Each half has a distinct angle, followed by a restrained settling
motion. The two optional images decode before animation starts.

Generation prompts:

> Precise object removal for an animation clean plate. In this exact painting REMOVE ONLY the dark reddish-brown cacao pod hanging from the RIGHT tree trunk, at approximately x1027-1140 y210-410 of the 1200x859 image. Fill its footprint with coherent shaded bark and small understory leaves matching those immediately behind it. Leave its short stem at the top. Keep the other green hanging pod, all flowers, foliage, trees, large rotten golden pod on the ground, lighting, perspective, composition and framing unchanged. The entire original landscape must remain identical as far as possible. No new objects. Same full original aspect ratio. This is only the empty backing behind the removed right hanging fruit.

> Use case: precise-object-edit / animation sprite extraction. Reference: ONLY the slim DARK REDDISH BROWN cacao pod hanging from the tree at the upper right of this painting. Produce a genuinely TRANSPARENT PNG containing TWO SEPARATE LENGTHWISE HALVES of this one pod, both vertical, pointed tips DOWN and stem ends UP. Left half has dense cream-white moist pulp-covered oval cacao seeds attached in natural longitudinal rows around the central axis. Right half is a slightly narrower concave empty rind half with pale inner pith and a few adherent white pulp fibres. The halves show their freshly cut inner faces toward viewer, with thick pale cut edges and dark reddish-brown ribbed exterior visible along outside rims. Botanically realistic cacao, NOT coconut or papaya. Retain original painting's muted textured realism, directional dappled light and weathered burgundy rind. Place left half entirely within LEFT HALF of canvas and right half entirely within RIGHT HALF with generous transparent separation. Match heights and scale as two sides of the SAME elongated 2:1 pod, no exaggerated wide bowls. Straight vertical axes so they can be individually rotated in animation. Keep each object fully visible, padding on every edge. No ground, no cast shadow onto background, no sky, no trees, no text, NO knife, no additional pods. Real transparent alpha around both cutouts. Square canvas.

Martyna rejected the first ground-fruit wipe as unnatural. This revision
targets the tree fruit, delays opening until the cut is complete and uses
physical half rotations with visible rind thickness and different interiors.
After the first contextual review, added a small asymmetric settling motion.
Motion-only follow-up: Martyna found the sliding blade unnatural. Replaced it
with a 520 ms wind-up, 120 ms anticipation, 150 ms accelerating chop around
the handle, 35 ms impact hold and a visible recoil. The cutting edge lands
at the hanging pod's near side. A brief pod jolt follows contact, and the
halves start opening 50 ms after impact. The complete action lasts 2150 ms.
After reviewing contact in-browser, strengthened the recoil clearance so the
blade does not linger against the opening fruit. All raster bytes unchanged.
No labels or other public prose changed, and the Game remains English-only.

Checks: `check-bali-cacao.cjs`, Bali refinement/gongs, Canberra café,
Ahmedabad fans and N2/full-catalogue geometry pass. Syntax and diff checks
pass. Actual browser checks cover click, drag-to-pod, Enter, reset, normal
phone/tablet/desktop views and no horizontal overflow at 360, 768, 1024 and
1440 px. Full-page screenshot attempts: 345 x 2400, 753 x 2381, 1009 x 1753,
1425 x 1934. The known capture defect still duplicates sections and blanks
part of those images, so these are not valid full-page proofs. Reduced
motion and load-failure/cancellation paths are covered by automated tests.
The hanging-pod strike is approved with the male nib-feeding follow-up.
Publication is verified separately after the release push.

Last updated: 2026-08-11

## Purpose

This dossier defines the evidence boundary and illustration contract for the
Sanda, Bali · JU1873 environment and its three paired accessories.

Implemented on 2026-07-26 with a dedicated painted cacao-plantation-floor
background, exact JU1873 marker metadata and six independently movable bespoke
objects.

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
- International Cocoa Organization harvesting and pod-opening guidance:
  https://www.icco.org/harvesting-post-harvest-new/
- Official Sanda village profile, regional context only:
  https://sanda.desa.id/artikel/2024/05/17/profil-desa-sanda
- Official Pupuan district site, regional context only:
  https://pupuan.tabanankab.go.id/
- Bali Province Endek textile reference, regional context only:
  https://www.baliprov.go.id/web/ny-putri-koster-ajak-gaungkan-upaya-pelestarian-kain-endek/
- UNESCO gamelan reference, Indonesian cultural context only:
  https://ich.unesco.org/en/RL/gamelan-01607

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

### JU1873 cacao-pod machete

Family ID: `ju1873-cacao-specimen-lantern`

Scientific basis: the exact rotting-cacao substrate, with fruit morphology
grounded in Kew. The International Cocoa Organization documents machetes as
one tool used to split harvested cacao pods, although a wooden club reduces
the risk of cutting the beans. The accessory is playful plantation context,
not a claim that this tool was used to open the JU1873 source fruit.

Primary: a broad side-view working machete with a gently curved steel blade,
visible bevel and spine highlight, short berry-wrapped handle, gold guard and
one separate opened cacao half near the blade tip.

Companion: a shorter upward-angled machete with a compact broad blade, distinct
handle proportions and a smaller opened cacao half. Its blade and handle must
remain one clear silhouette at production size.

Keep both blades away from the worms' faces. Do not imply that a machete is the
only or preferred pod-opening method, and do not present the illustrated pod
as the documented JU1873 fruit's exact decay state.

### Balinese endek wrap

Family ID: `ju1873-balinese-endek-wrap`

Regional basis: Endek is a traditional Balinese woven textile. The accessory
is playful Bali context, not evidence about the collector, plantation workers
or the JU1873 collection event.

Primary: a fitted asymmetric mid-body wrap with a curved upper edge, layered
lower border, visible warp and weft, loose fringe and an original repeating
diamond construction in indigo, emerald, berry, aqua and antique gold.

Companion: a narrower fitted wrap using the same material language and body
orientation but different motif spacing, fringe rhythm and proportions.

Do not copy or name a traditional motif. All weave lines and ikat-style
geometry must remain clipped inside the textile boundary. The cloth should
follow each worm's body angle rather than float as a flat rectangle.

### Balinese gamelan gong

Family ID: `ju1873-balinese-gamelan-gong`

Regional basis: gamelan is an Indonesian percussion tradition strongly
associated with Bali. The accessory is broader cultural context only, with no
claim that a gong was present at the collection site.

Primary: a complete bronze hanging gong with a raised central boss, concentric
hammered rings, controlled metallic highlights, two suspension cords, a
carved freestanding frame, stable feet and a padded mallet.

Companion: a compact gong with a differently proportioned frame and boss,
shorter suspension system and separately angled mallet.

The gong must read immediately as a playable suspended instrument. The frame,
cords and mallet need plausible attachment and support; the disc must not read
as an unexplained medallion or shield.

## Suggested starting layouts

The 2026-09-06 refinement below supersedes these starting layouts and the
earlier paired-construction details. Collection evidence remains unchanged.

These values require final browser tuning:

```js
"ju1873-cacao-specimen-lantern": {
  primary: [385, 132, .37, -2],
  companion: [-8, 118, .28, 3]
},
"ju1873-balinese-endek-wrap": {
  primary: [254, 190, .43, 13],
  companion: [113, 199, .34, 20]
},
"ju1873-balinese-gamelan-gong": {
  primary: [390, 257, .38, -2],
  companion: [24, 283, .31, 3]
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

The cacao-pod machete remains plantation context. The endek wrap and gamelan
gong replace the generic timekeeper and cryogenic-storage families with two
single-use Bali-context families. Their forms must remain distinct from every
other textile and musical accessory in the Game.

Expected totals:

- 16 families used exactly twice
- 79 singleton families
- 111 concepts across 37 accessory sets
- no semantic family used more than twice

## Acceptance checks

- Exactly 35 preserved environment profiles and composition IDs, with 34 active locations.
- Exactly 34 active accessory sets and 103 unique accessory design IDs.
- No remaining active `sanda-cacao-highland` profile or obsolete
  `bali-cacao` scene group.
- No generic-renderer fallback for the six new accessory illustrations.
- No initial overlap among the three accessories or with critical worm detail.
- Endek weave geometry is fully contained inside both cloth silhouettes.
- Both gongs show complete support frames, suspension cords and mallets.
- Desktop and mobile checks near 360, 768, 1024 and wide viewports.
- Light and dark themes, reduced motion, keyboard focus and direct drag.
- No horizontal overflow, failed requests or console errors.
- Full diff review and `git diff --check`.

## Body-fitted and complementary-pair refinement, 2026-09-06

Local production module: `game-of-worms/bali-refinement.js`. The original
painting, location record, shared labels and scientific prose remain unchanged.
Martyna requested more meaningful differences between the worms' props.

- Female: overlapping draped endek wrap with a folded return edge, narrow
  fringe and original stepped weft-like motifs. Male: compact tied wrap with
  a short loose end and independently arranged motifs. Both use actual body
  coordinates and synchronized motion. Weave detail is clipped to fabric.
- Female: broad side-view steel machete with a fitted grip, rivets, bevel,
  lanyard and separate opened cacao half. Male: wooden pod-opening club above a
  differently oriented pod half. Rind ribs and white pulp-covered beans
  replace the old tiny pink shapes. Each pair is independently drawn.
- Female: raised-boss bronze gong hanging by two cords from a freestanding
  timber frame with stable feet. Male: two small kettle gongs supported on
  cords in a low cradle, with separate beaters. This is a playful abbreviated
  setup, not a depiction of a full reyong instrument or a named ensemble.

Construction references checked:

- Met collection, Balinese gong suwukan, 1986.467.58a,b:
  https://www.metmuseum.org/art/collection/search/504441
  Viewed the reference photograph for suspension, rim depth and raised boss.
- Soniccouture, Balinese Gamelan II, recorded Balinese kettle-gong families:
  https://www.soniccouture.com/en/products/31-cultures/g26-balinese-gamelan-ii/
- Powerhouse Museum, Balinese endek shoulder/breast cloth, object 344535:
  https://collection.powerhouse.com.au/object/344535
- Asian Art Museum, kampuh endek overwrap, object 21490:
  https://searchcollection.asianart.org/objects/21490/noblemans-ceremonial-overwrap-kampuh-endek-or-saput-endek
- ICCO pod opening reference retained from the existing brief:
  https://www.icco.org/harvesting-post-harvest-new/

All artwork is original vector geometry. No source image or named textile
motif was reproduced. Cloth styling and instruments are regional context.
The machete and club are cacao-processing props, not claimed collection tools.
ICCO describes wooden clubs for splitting pods. The male club uses a rounded
striking head, carved tapered grip, palm stop, longitudinal grain and visible
end grain. A refinement pass removed the closed grain loop that could read
as a spoon bowl and strengthened the grip stop at the default displayed size.
The approved individual control name is "wooden pod-opening club". The Game
is English-only. Shared toggles and scientific text are unchanged.

Critical review and refinement: separated the larger pod from the gong crown,
enlarged its rind and pulp details, replaced flat concentric gong areas with
an inset face, dark return rim and raised boss, and moved the male's cradle
upward so its feet do not intersect the species badge at 1024 px.

Checks: six-piece explicit-paint/clipping/geometry tests and full catalogue
pair audit pass. Panama, N2, six-location and live-loupe regressions pass.
Independent pointer dragging, keyboard movement, +/- sizing and Home reset
were checked. Small male pieces were directly dragged in the phone preview
after allowing focus-induced scrolling to settle. The Game stays fixed-light
and uses the existing reduced-motion fallback for fitted garments.

Normal phone, tablet and desktop views were inspected. No document overflow
at 360, 768, 1024 and 1440 px. Browser reports no errors or warnings.
Full-page captures were attempted with dimensions 345 x 2400, 753 x 2381,
1009 x 1753 and 1425 x 1934 pixels. The known tool defect persists: half-scale
content and duplicated sections make those captures invalid full-page proofs.
Martyna approved the paired refinement, then the different male cacao tool,
and requested deployment after implementation. Publication is verified after push.
