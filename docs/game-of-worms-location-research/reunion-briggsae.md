# Réunion *Caenorhabditis briggsae* JU1375 location research and art brief

Last updated: 2026-08-31

## Exact record

The CaeNDR reference-isotype page records:

- species, isotype and reference strain: *C. briggsae*, JU1375;
- alternative name: R8N1;
- sampling date: 31 December 2007;
- coordinates: -21.0469, 55.6885;
- elevation: 123 m;
- landscape: agricultural land;
- substrate: mollusk;
- sampled by V. Robert;
- substrate temperature, ambient temperature and humidity: ND;
- a singleton isotype.

## Evidence boundary

The coordinate, elevation, date, agricultural landscape, mollusk substrate,
sampler, alternative name and singleton status are evidence. The mollusk
species, whether a shell was occupied, crop, property, weather, exact
collection-patch view and neighbouring features are unreported.

The old scene treated sugar cane, basalt and a volcanic ridge as observed
collection features. The replacement uses anonymous mixed vegetation and a
subordinate wet-interior shoulder as regional context, without naming a crop
or reconstructing a landmark view.

## Primary source

- CaeNDR JU1375 isotype page:
  https://caendr.org/isotype/JU1375/

## Game metadata

Profile ID: `reunion-ju1375-agricultural-mollusk-edge`

Profile title: `Réunion agricultural mollusk edge`

Profile note:

> This singleton reference isotype was sampled by V. Robert from a mollusk in
> agricultural land at 123 m on 31 December 2007. The anonymous wet field edge
> and distant interior shoulder are restrained regional interpretation; the
> mollusk species, crop, weather and exact collection view are unreported.

## Environment contract

Use a preserved painted 3:2 source PNG and optimized WebP, with live SVG worms
and accessories above it.

- Foreground: damp volcanic soil, litter and one small, generic shell clue.
- Middle: a curved working strip between unequal banks of anonymous cultivated
  and volunteer vegetation.
- Background: one soft blue-green shoulder of the wet interior.
- Keep the centre open for the worms.
- No sugar-cane rows, torch ginger, named crop, waterfall, sea, dramatic
  volcano cone, basalt display, buildings or invented weather.

## Accessory contract

The replacement set uses three immediately recognisable wider Réunion
references. They are playful scene elements, not collection equipment or
claims about the JU1375 substrate, crop or exact field.

### Vanilla vine wraps

Primary: a long, asymmetric green vine with two broad leaves, one open pale
vanilla flower, two mature dark pods and loose tendrils following the larger
worm's curve.

Companion: a shorter loop with a differently posed flower, one leaf, one pod
and a separate tendril fitted to the smaller worm.

### Sugarcane juice

Primary: a tall transparent tumbler with pale-gold juice, visible froth,
condensation, a nodal cane-stalk stirrer and a separate curved sipping straw.

Companion: a squat handled glass with its own rim, juice chamber,
condensation and shorter nodal cane stalk.

### Bourbon green gecko companions

Primary: a large side-facing green gecko with a long curved tail, four planted
limbs, separated toes, warm dorsal markings and a clear face.

Companion: a smaller, differently posed gecko with a tighter tail curve,
different limb geometry and its own marking pattern.

## Acceptance checks

- No active cane-row, basalt or dramatic volcanic-ridge composition.
- Six structurally distinct drawings across three bespoke families.
- Pointer drag, keyboard movement and isolated Home reset.
- 360, 768, 1024 and wide checks, fixed light palette, clean console.
- Catalogue and environment audits valid; runtime image HTTP 200.

## Implementation status

The evidence-bounded agricultural-edge composition and preserved painted
background remain unchanged. The former jar, calendar and altimeter drawings
were replaced on 2026-08-31 by the vanilla, cane-juice and green-gecko set;
the exact production render and public labels were approved on 2026-08-31.

## Accessory refinement preview — 2026-09-17

Requested scope: improve the existing three accessories, with short animations
and sounds. No new accessory category, background change or scientific copy.
Local branch: `codex/reunion-accessories`, based on main `58adb7d`.
Production preview files: `reunion-ju1375-art.js` and `reunion-ju1375-play.js`.
Preview: `http://127.0.0.1:8772/game-of-worms/?preview=20260917-reunion-2`.
Uncommitted and unpublished; not yet visually approved by Martyna.

- Vanilla vines now follow each body's curve and idle motion, with veined leaves,
  pale orchid flowers and separate slender pods. Clicking gives a brief gentle
  petal response and quiet leaf rustle; no continuous decorative activity.
- Juice retains the tall tumbler and small handled cup. Both have curved rims,
  contained liquid, glass highlights, cane stirrers and separate straws. The
  hermaphrodite stirs then sips; the male takes two small sips. A hand contacts
  the stirrer or glass side. Liquid decreases over four actions, then resets
  full at the beginning of the next action.
- Gecko pairs retain separate outlines, now with four jointed legs, five toes
  per foot, rounded pupils, dorsal markings, a pale side stripe and tapered
  tails. Their default perches are on the worms, below the flowers; independent
  visitor drag/size adjustments remain on their unchanged parent pieces.
  A click gives short steps, a head turn and tail motion, then a return home.
- One action runs at a time. Escape, moving/resizing, hiding an accessory,
  switching scene, drawing mode, window resize and page hiding cancel safely.
  Reduced motion suppresses movement/audio and applies the sip result briefly.
- First render refinement corrected the shared fill-box transform origin that
  displaced fitted vines; second pass improved gecko contrast and perch spacing,
  and gave the stirring hand a visible point of contact.

### Construction references

Original SVG drawing, not copied source artwork. Primary-source species and
flower descriptions informed the pale flower, vine, gecko outline and feet:

- Parc national de La Réunion, Gecko vert de Bourbon:
  https://www.reunion-parcnational.fr/fr/des-connaissances/la-faune/les-especes-endemiques/le-gecko-vert-de-bourbon
- Plantation Vanilla Bourbon, cultivation and flower description:
  https://vanille-reunion.fr/culture-de-la-vanille-a-la-reunion/

These are fantasy companions, not a claim of geckos at the collection site or
gecko pollination of vanilla. Foley is handling sound, not gecko vocalization.

### Validation

- `node scripts/check-reunion-ju1375.cjs`: finite and continuous action poses,
  distinct pairs, four articulated feet, contained SVG details, lowering liquid,
  sipping contact interval and reduced-motion frames passed.
- Existing New Taipei and Guadeloupe interaction tests passed. JavaScript syntax
  and `git diff --check` passed; catalogue initialization reported no errors.
- Browser: keyboard start/Escape restored the glass and removed effects; changing
  position and size before an action preserved both exact values afterward.
- Viewport checks at 360, 768, 1024 and 1440 px: no horizontal overflow;
  artwork and controls inspected in the Game's single fixed light palette.
- Full-page capture attempted at all four widths. Encoded results measured
  345x2458, 753x2375, 1009x1777 and 1425x1928 respectively. The tool excludes the
  scrollbar and duplicates/scales sections with white areas, so these are NOT
  valid full-page proofs. Direct viewport inspection is supplementary only.
- Browser console: no errors/warnings during the interaction checks.
- Subjective audio listening, physical touch gestures and full-page visual proof
  remain manual. No publication has been performed.

## Approved interaction follow-up — preview reunion-4

Martyna approved border-walking geckos and distinct juice-making roles. This
supersedes the reunion-2 interaction description above; it is not deployed.

- The primary juice accessory is now a guarded twin-roller hand-cranked press,
  with a nodal cane feed, cast frame, timber base and a collecting spout. Each
  click makes two crank turns and adds one third of a glass. The input stalk
  remains clipped at the inlet as the rollers pull it inward. A filled glass
  cannot be overfilled by further presses.
- The male carries his glass to the spout while the larger worm turns the
  crank. He returns to his own position with the collected juice. Once full,
  clicking his glass lifts it for two short sips and leaves it empty. An empty
  or partly full glass can be inspected without adding liquid or sip sounds.
- Both worms, their clothing and all visitor transforms are restored after
  each action or cancellation. Cup levels commit only after a complete action.
- Clicking a gecko starts a route along an independent SVG layer matching the
  habitat border, rather than the tilted/scaled worm group. The larger gecko
  completes a circuit in 13 seconds; the smaller travels a shorter route in
  10 seconds, pausing to peek. Both return to their saved starting positions.
  Positions and tangents join continuously around rounded corners. No idle loop.
- The male now wears just a small vanilla flower, one leaf and a single pod;
  the larger worm retains the longer fitted vine.
- Original manual-press drawing informed by manufacturer construction details:
  https://www.rawatimpex.in/products/manual-sugarcane-juice-machine
  The artwork is unbranded, simplified, and not a historical equipment claim.
- Visual refinement fixed explicit SVG matrix serialization for the temporary
  male pose, improved the crank's contrast, and raised the press so the visiting
  male's tail clears the scene label. A temporary slow playback check was removed;
  the production action lasts 4.5 seconds per press.
- Added focused checks for rounded-border continuity, contained route centres,
  distinct routes/pauses and the bounded press cycle. The prior capture and
  subjective audio-listening limitations remain applicable.

Current preview: http://127.0.0.1:8772/game-of-worms/?preview=20260917-reunion-4

### Follow-up validation

- Browser verified three completed presses fill the glass in thirds; a fourth
  press does not overfill it. Clicking the full glass returns it empty.
- Escape during pressing leaves the prior fill level unchanged and restores all
  hidden originals; Escape during a gecko trip removes its border layer.
- Final preview inspected at 360, 768, 1024 and 1440 px with no horizontal
  overflow. Full-page capture dimensions were again 345x2458, 753x2375,
  1009x1777 and 1425x1928, with the same invalid-capture limitation above.
- Console warnings/errors were empty. Focused action tests, syntax checks and
  diff whitespace checks passed. No commit or deployment.

## Gecko pacing and label clearance — preview reunion-6

Follow-up to Martyna's report that the geckos moved too fast and unnaturally,
and passed behind both scene labels. This supersedes the previous trip timings.

- Movement now advances with alternating diagonal footfalls: an 820 ms push,
  a 280 ms settle, and a longer pause after every four steps. Subtle opposing
  body/tail movement replaces the fast continuous wobble.
- Each gecko approaches the nearest border along a curve, follows a shorter
  stretch in its own direction, pauses to turn, and walks back along its route.
  Distance-based speed avoids fast entry/return slides and corner acceleration.
  Typical outings take about 50–60 seconds, depending on size and position.
- The route measures the actual tops of both labels and reserves that bottom
  band plus the complete tail radius and an 8 px margin. Label stacking and
  approved art, backgrounds and visitor transforms are unchanged.
- Focused tests cover the whole excursion at four scene sizes, label clearance,
  bounded speed, pauses and exact return to the original position. Reduced
  motion retains the existing stationary short response.

Current local preview: http://127.0.0.1:8772/game-of-worms/?preview=20260917-reunion-6
Not committed or deployed.

Follow-up validation: observed the primary return home without residual hidden
art or border layers, and the male walking clear of the lower label at 360 px.
Keyboard activation and Escape cancellation passed. Four-width viewport checks
(360, 768, 1024, 1440 px) found no horizontal overflow. Full-page encoded sizes
remain 345x2458, 753x2375, 1009x1777 and 1425x1928; the known capture distortion
still prevents using these as complete visual proofs. The roaming layer is
above the worm artwork on mobile. If a visitor enlarges a gecko beyond the
available safe route, it stays at its saved position instead of being resized
or sent across a label. No new sound or illustration assets were added.

## Independent gecko walks — preview reunion-7

Martyna requested both geckos walking together while the worms do other activities.
Each gecko now owns its own animation frame and border layer. Cane pressing,
drinking and vanilla actions use a separate activity track and do not reset
walking geckos. Gecko walking no longer pauses the worms' idle movements.
Visibility is shared safely when a gecko leaves the male during pressing: its
perched copy is hidden until it returns, and it returns to the saved home rather
than the temporary position at the press. If the male is still away, the gecko
pauses before completing its return. Global Escape, scene changes, resizing and
reduced-motion changes still clean up all tracks. Existing routes, pace, artwork,
labels and sounds are unchanged.

Preview: http://127.0.0.1:8772/game-of-worms/?preview=20260917-reunion-7
Local only; not committed or deployed.

Validation: browser showed two independent border layers during pressing,
drinking and a vanilla action. Walkers continued after each activity finished;
three presses still filled the glass and drinking returned it to empty. Starting
both walks during pressing also succeeded. Press completion kept both originals
hidden while walking; Escape removed both border layers and all activity effects
and restored both original geckos. No console warnings/errors. Focused Node
checks include returning to the saved home after departure from the press;
syntax and diff whitespace checks passed. The earlier full-page capture
limitation remains; no artwork or layout dimensions changed in this follow-up.

## Deployment approval — 2026-09-17

Martyna explicitly requested deployment of preview `20260917-reunion-7`.
This approves the exact local artwork and concurrent interactions above.
The scene is closed for this review pass; Praslin YR106 is next. Prior local-only
statements are historical. Publication and direct live verification follow.
