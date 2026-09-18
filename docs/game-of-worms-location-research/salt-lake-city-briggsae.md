# Salt Lake City *Caenorhabditis briggsae* EG4181 location research and art brief

## Status

Active replacement for Taipei BRC20390. EG4181 is retained as the public strain because it is the directly documented collection record; CaeNDR's current reference for its wider isotype is EG4360.

## Evidence boundary

- The CGC EG4181 record gives 40°42′26.16″N, 111°52′3.27″W and records a rotting apricot beneath a garden tree on the north side of a home in Salt Lake City on 4 August 2006.
- The collected worms were noted to move very rapidly, and the strain was founded from one L4 hermaphrodite.
- The private house and collection viewpoint must not be reconstructed or exposed.
- CaeNDR places EG4181 in the EG4360 isotype; the interface therefore cites both the direct CGC strain record and the current CaeNDR grouping.

Sources:

- [CGC EG4181 strain record](https://cgc.umn.edu/strain/EG4181)
- [CaeNDR EG4360 isotype record](https://caendr.org/isotype/EG4360/)

## Approved environment

The production background is a low under-tree garden view with a dominant mature apricot trunk at right, one split decomposing apricot in the foreground, dry litter, an anonymised blue-grey fence and a narrow pale Wasatch foothill opening. The house is excluded.

The low camera, large trunk and fruit sample contrast with Claremont's elevated tiled courtyard. This distinction is part of the composition lock.

## Previous accessory set (retired in the local bubble preview)

1. **Apricot blossom hats** — coral-and-indigo hats built from brims, crowns, layered flowers, centres and leaves; the companion uses one independently constructed blossom.
2. **Beehive saddle packs** — handled tiered hives with bands, cells, entrances, harnesses and bees; playful Utah-wide beehive symbolism, not collection equipment.
3. **Single-tail mountain skis** — long curved one-tail skis with real bindings, upturned tips, inlays and small Wasatch peak lines; the primary and companion skis follow different tail lengths.

## Production assets

- Preserved source: `game-of-worms/assets/source/salt-lake-eg4181-painted-background-source.png`
- Runtime derivative: `game-of-worms/assets/salt-lake-eg4181-painted-background.jpg`

## Headwear fit, 2026-09-05

Adjusted each worm's hat position and tilt without changing artwork paths
or colours. Both hats now sit lower on the heads. Headwear now
follows the corresponding body animation, synchronized whenever enabled.
Full-page 360, 768, 1024 and 1440 px proofs, independent pointer and keyboard
movement, Home reset, reduced motion and animation-phase checks passed locally.


## Bubble-play revision, 2026-09-18 — local preview only

Martyna approved bubble play after rejecting further hats, skis and a bee/honey
activity. The original garden painting and locality text are unchanged.

- **Giant bubble loop:** broad metal hoop, wrapped grip and shallow solution tray.
  The hermaphrodite dips and raises the hoop, bends through the middle with a
  planted tail, stretches a large bubble and returns the hoop to its resting spot.
- **Little bubble kit:** independently drawn open threaded bottle, cap and narrow
  oval wand. The male blows five small bubbles; the first briefly rests on its nose.
- **Picnic blanket:** quiet shared cloth with woven checks, seams, fringe and folded
  corners, layered beneath the worms. No extra activity.
- Tap either kit or use Enter/Space. Both actors can run together. Bubble centres
  have transparent pointer targets of at least approximately 44 screen pixels.
  Enter/Space also pops focused bubbles, with a visible focus ring. Giant pops
  alternate three smaller bubbles and a plain burst, with a brief body reaction.
  Small bubbles can attach to the rim of a floating large bubble.
- Dragging, arrow keys, scaling and Home keep their existing controls. Actions
  use the visitor's current placement/scale and restore the original body paths.
  Escape, leaving the scene, resize and hiding the page stop the activity.
- Reduced motion creates stationary, poppable bubbles without body movement or
  sound. Effects are finite and removed when they finish.

Construction reference: [Exploratorium soap bubbles exhibit](https://annex.exploratorium.edu/texnet/exhibits/weather/soap_bubbles/).
Original SVG drawings; no external artwork copied. The play is imaginative garden
play, not a claim about EG4181 behaviour or a Utah-specific tradition.
Sound credits and unchanged downloaded-file hashes are in `assets/audio/SOURCES.md`.

Visible labels are exactly: **Giant bubble loop**, **Little bubble kit**,
**Picnic blanket**. Accessible bubble labels: **Pop bubble**, **Pop giant bubble**,
**Floating bubbles**. These follow the existing English-only Game interface;
there are no corresponding Swedish or Polish Game accessory strings.

### Validation and limits

- Preview: `http://127.0.0.1:8775/game-of-worms/?preview=20260918-picnic-3`.
- Branch: `codex/salt-lake-bubbles`; base: `96eeffd`. Not committed or published.
- Node checks: planted tail, visible middle bend, continuous motion envelope,
  completion and SVG path command arity. Module syntax and diff whitespace checks.
- Browser: simultaneous kits, pointer starts, keyboard bubble popping, both giant
  pop outcomes, exact restoration of body paths/transforms, retained moved/scaled
  accessory transform, Escape cleanup and scene-change cleanup passed. Bristol
  normal accessory layer restoration checked without reviewing its artwork.
- CSS viewport widths 360, 768, 1024 and 1440 had no horizontal overflow. The
  browser capture backend returned distorted full-page images with repeated
  sections: 268x1873, 582x1828, 778x1368 and 1098x1482 pixels respectively.
  These are not valid final responsive proofs. Normal viewport scene inspection
  was possible; complete responsive visual approval remains pending.
- Reduced-motion behaviour was code-reviewed, not browser-emulated. Physical
  touch and subjective sound listening remain manual. Fixed Game light palette.
- First drawing refined before review: enlarged hoop/tray and small kit, improved
  arm/grip alignment, planted the tail during bending, returned each wand to its
  saved resting position, replaced the oversized native SVG focus outline.


### Handling and cloth refinement, preview 7

Martyna liked popping and requested more natural kits, worm movement and blanket.
The large grooved hoop now lies in a recessed handled tray, lifts edge-first from
solution, and moves beside the face. The smaller narrow loop fits inside the
bottle mouth; the bottle has a visible liquid surface, rim, threads and open cap.
The body lowers towards the tray with the tail planted, pauses during dipping,
rises before pulling, and returns gently over a 6.3-second action. Head and face
turn with the upper body; the male purses its mouth for blowing. Pop reactions
use one soft recoil instead of repeated shaking. Visitor transforms and the
existing popping behaviour remain intact.

The blanket now uses a warped fabric surface: checks, stitching and hems follow
the same folds. An uneven draped edge, turned corner, underside, short fringe,
crease highlights and contact shadow replace the rigid straight-edged board.
Construction references: [Pustefix ring and tray kits](https://www.pustefix.de/en/)
and [Pendleton outdoor blanket construction](https://www.pendleton-usa.com/product/roll-up-blanket/XC334-53589-UNIT.html).
These informed construction only; drawings and pattern are original.
No labels or audio changed. No new or deleted files in this refinement.

Follow-up validation: both activities ran together; keyboard popping, exact body
restoration after completion/recoil, moved/scaled kit preservation and Escape
cleanup passed. No console warnings/errors. Node movement and SVG checks pass.
No horizontal overflow at CSS widths 360, 768, 1024 and 1440. Full-page screenshot
capture now fails outright; earlier distorted captures are not approval proofs.
Normal-size scene inspection was possible. Responsive visual approval, physical
touch, reduced-motion browser emulation and listening remain manual limitations.

### Male bubble spacing, preview 8

Emission spacing increases from 350 to 520 ms. The five bubbles have smaller,
varied radii and diverging drift directions, with a brief gentle release puff.
The nose bubble leaves upward-left while the others fan rightward at different
angles. Popping, giant bubble behaviour, props and body motion are retained.

### Hermaphrodite blowing sound, preview 9

Removed the male-only condition from the existing blowing cue. Both worms now
play the soft recorded breath once, at the start of bubble formation (2.43 s
after activating a kit). Existing gesture loading, cancellation and silent
reduced-motion behaviour remain in place. No new sound files or labels.


### Apricot picnic, preview 2, 2026-09-18

Approved addition: three controls now read **Bubbles**, **Apricot picnic** and
**Picnic blanket**. Bubbles toggles both existing kits together; they retain
independent positions, sizes and actions. Accessible piece names remain Giant
bubble loop / Little bubble kit with the appropriate worm. The Game remains
English-only; no Swedish or Polish accessory strings exist.

Original SVG basket: open hinged woven lid, arched handle, curved wicker wall,
linen over the rim, apricot halves with empty stone cavities and two slices.
Its shadow and lower wall rest on the blanket, with fruit behind the near rim.
Construction references: [National Trust picnic hamper](https://www.nationaltrustcollections.org.uk/object/653075.1)
and [RHS apricots](https://www.rhs.org.uk/fruit/apricots/grow-your-own).
No reference artwork copied. Basket refinement strengthened apricot colour
separation from the wicker and aligned the offering hand with its lifted slice.

Click the basket or press Enter/Space for a six-second action. The larger worm
picks up two slices and offers one to the male, who brings it to its own mouth.
Two quiet soft-fruit cues accompany visible bite notches and gentle chewing.
The basket stays open between clicks. Starting a picnic settles active bubble
hands; existing floating bubbles remain poppable. New blowing waits until the
snack ends. Reduced motion shows stationary slices briefly without sound or
body motion. Escape, resizing, hiding the page, toggling or changing scene
restores original paths and hides transient food/arms. Drag/scale remain intact.

Sound reuses the existing `reunion-eat.wav` unchanged; source details are in
`assets/audio/SOURCES.md`. No files created or deleted for this addition.
Still a local preview, not committed or deployed; five queue scenes remain open.

Picnic validation: six-second completion restores original body paths/transforms
and basket servings exactly; Escape restores them early. Keyboard movement and
scale survive the action. Both grouped bubble kits still start independently
and run together. Syntax, focused movement/SVG checks and diff whitespace pass;
no console warnings/errors. CSS widths 360, 768, 1024 and 1440 have no horizontal
overflow. Full-page screenshot capture failed again; normal-size contextual
inspection was possible. Complete responsive proof and subjective listening
remain manual; reduced motion was code-reviewed, not browser-emulated.

### Eating cue refinement, preview 3

Shortened each eating cue from 0.58 to 0.19 s, retaining the bite transient
from 0.145-0.335 s of the existing recording. Peak target lowered from 0.09
to 0.04. Cues remain aligned at 3350/3700 ms, now with a 160 ms quiet gap.
This removes the overlapping chewing and later mouth noise. No animation,
artwork or labels changed; no new/deleted files. Subjective listening is manual.

### Deployment approval, 2026-09-18

Martyna requested deployment of preview `20260918-picnic-3` after the eating
sound refinement. This approves the current exact art and English labels
(Bubbles, Apricot picnic, Picnic blanket); the Game has no Swedish/Polish
accessory strings. Salt Lake is closed for this interaction pass: 27 completed,
four remaining. Next is C. briggsae, Orsay JU2518. The capture and listening
coverage limits above remain recorded; publication requires live verification.
