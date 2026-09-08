# PROJECT_STATUS.md

Last updated: 2026-08-30

This file records approved decisions and the verified implementation state. Always inspect the current repository before acting.

For the next Game scene, start with the
[scene review checklist](docs/game-of-worms-scene-review-queue.md).
It tracks all 31 active scenes: 18 left to check in the current interaction
pass and 13 completed, including the published Ho Chi Minh City revision.
Do not repeat whole-atlas visual reviews. Check the next queued scene and update
its entry. "To check" is not a judgement that a scene needs a redesign.

### Ahmedabad recorded digging sound, approved 2026-09-09

Martyna requested deployment of the reviewed foreground digging positions and
recorded sounds on 2026-09-09. Production files remain identical to the preview.
Release branch: `codex/kauai-recording-scene`, published through `main`.

The synthetic soil burst is replaced with three short CC0 excerpts of Joseph
SARDIN's BigSoundBank 1305 shovel recording. The spade uses a 650 ms stroke.
The male's two scoops use different 350/390 ms takes, with quieter playback.
Each main transient aligns with maximum blade pressure. No loops, generated
soil noise, pitch shifting or reverb. Kite sounds, visuals, public copy and
the previous local foreground-placement fix are unchanged.

New audio tests cover PCM format, fades, peaks, distinct takes, contact timing,
gesture-only loading, cached decoding, cancellation, retries, silent failures
and skipped late cues. The existing hands regression and syntax/diff checks
pass. Both browser digging actions completed, with replay and Escape cancellation
checked. No browser warnings/errors. The audio module and all three WAV paths
returned HTTP 200 with the expected content types on the local server.
Direct listening remains manual because this session cannot perceive audio.
No new layout proof is required for this audio-only follow-up. The previous
full-page screenshot limitation remains and was disclosed before approval.

Created: three `game-of-worms/assets/audio/ahmedabad-dig-*.wav` production files
(133572 bytes total) and `scripts/check-ahmedabad-audio.cjs`.
Changed for this follow-up: `game-of-worms/ahmedabad-audio.js`, cue timing/import
in `ahmedabad-hands.js`, cache keys in `game.js`/`index.html`,
`scripts/check-ahmedabad-hands.cjs`, `game-of-worms/assets/audio/SOURCES.md`,
the Ahmedabad dossier and this file. Nothing deleted. Homepage/Cabinet untouched.
Source downloads and the reproducible processing script stay in ignored
`tmp/ahmedabad-audio/`. Preview:
`http://127.0.0.1:8765/game-of-worms/?review=ahmedabad-grounded-dig`.

### Ahmedabad foreground digging, approved 2026-09-09

Digging now places the pair in separate foreground lanes, using the current
scene and body bounds instead of fixed body-space drops. Both move into place
before the first scoop. The shovel grip is calculated from its displayed blade
tip so enlarged tools still meet the same soil patch. Ground marks remain on
the soil. Clothing and shadows follow the body. Kite use restores the original
pose. No drawing paths, sound, public copy or background assets changed.

The first visual review found a phone overlap with the location caption. A
refinement adds at least 40 screen pixels of lower clearance for the bodies.
Normal browser views were checked at 360, 768, 1024 and 1440 px. No horizontal
overflow. Both digging actions, all accessory groups together, 120% shovels,
keyboard movement, Home, Escape and scene-change cleanup were checked. No
browser warnings or errors. Geometry, action timing, reduced-motion and audio
regression tests pass. Physical phones, Safari and direct listening remain
manual. Game remains fixed light, independent of the homepage theme.

Full-page attempts returned 345 x 2400, 753 x 2323, 1009 x 1777 and 1425 x 1876
pixel files for the four widths. The capture tool still creates compressed,
duplicated or blank page regions. These are not valid full-page proofs.
Martyna approved deployment of this contextual preview on 2026-09-09.

Changed: `game-of-worms/ahmedabad-hands.js`, import cache keys in
`game-of-worms/game.js` and `game-of-worms/index.html`,
`scripts/check-ahmedabad-hands.cjs`, the Ahmedabad dossier, art catalogue and
this file. No files created or deleted. Homepage and Cabinet untouched.
Preview: `http://127.0.0.1:8765/game-of-worms/?review=ahmedabad-grounded-dig`.

### N2 return-flight sound, 2026-09-08

The return now repeats the existing departure exhaust at 4100 ms for the
larger worm and 4380 ms for the male. Pitch, volume, duration and synthesis
parameters are identical to departure. Frost cues, flight paths, drawings,
accessory sizes and public copy are unchanged. Reduced motion still omits
flight sounds. Cancellation stops both current and scheduled return cues.

N2 audio, flight and tailoring tests pass, including identical outgoing/return
parameters, timing against each worm's return frame, cancellation, late resume
and silent fallback. The local browser completed a full flight and an Escape
cancellation without warnings, errors or leftover effects. No layout changes
or new visual proof. Direct listening, physical phones and Safari remain manual.
Committed and deployed at `bf4bf20`. Pages run `34278661781` succeeded.
Public `index.html`, `game.js`, `n2-cryo-flight.js` and `n2-cryo-audio.js`
returned HTTP 200 and matched the committed files.

Changed: `game-of-worms/n2-cryo-audio.js`, import cache keys in
`game-of-worms/n2-cryo-flight.js`, `game-of-worms/game.js` and
`game-of-worms/index.html`, `scripts/check-n2-cryo-audio.cjs`, and this file.
No files created or deleted. Homepage and Cabinet untouched.
Preview: `http://127.0.0.1:8765/game-of-worms/?review=n2-return-sound`.

### Ho Chi Minh City fruit-delivery publication, 2026-09-08

Martyna approved the final JU4356 preview and requested deployment. The scene
now provides one shared scooter ride, female starfruit cutting/male collecting
and tasting, and phin brewing/iced-coffee stirring. Only one activity runs at
a time. Three CC0 recorded cues cover scooter travel, fruit cutting and stirring.
The original background is unchanged. Catalogue labels are Scooter, Starfruit
and Vietnamese coffee. The obsolete accessory-list sentence was removed from
Tiny surprise. Exact English-only copy is in the location dossier.

Five SVGs received a refinement pass for construction, tandem seating, fruit
ribs, hand targets, tray contents and initial placement. New drawing/frame/audio
tests and targeted regressions pass. Browser action, keyboard cancellation,
mutual exclusion and retained x=4 px/scale=1.1 scooter checks pass. No fresh
console errors. Width checks at 360/768/1024/1440 px show no horizontal overflow.
Full-page capture remains defective at all four widths: half-width content and
repeated sections. The dossier records actual JPEG sizes and this limitation.
Physical-device/Safari, pointer-drag and direct-listening checks remain manual.

Martyna approved the exact visual/copy preview for deployment, explicitly aware
of the capture and listening limitations. Commit `7e37b9a` was pushed to `main`
from `codex/kauai-recording-scene`. Pages run `34275912526` succeeded. All six
published text files match local content after line-ending normalization and
all three WAVs match their local SHA-256 hashes. All nine paths return HTTP 200.
Live-browser checks confirmed accessories initially off, approved labels and
copy, a complete scooter ride with original body styles restored, starfruit
cutting, coffee stirring and Escape cancellation. No fresh console warnings,
errors or horizontal overflow. Ho Chi Minh City is closed in the review queue.
Next: Saint-Benoît, Réunion · JU1373. No other scene was revised.

Created: `hcmc-art.js`, `hcmc-play.js`, `hcmc-audio.js` under `game-of-worms/`,
three `game-of-worms/assets/audio/hcmc-*.wav` clips and `scripts/check-hcmc.cjs`.
Changed: `game-of-worms/accessory-designs.js`, `game.js`, `index.html`, audio
`SOURCES.md`, this status file, the location dossier, art catalogue and review
queue. Seven files created, eight changed, none deleted. Homepage and Cabinet
untouched. Live: `https://martynazwoinska.github.io/game-of-worms/?verify=7e37b9a`.

### Nambucca recorded-sound follow-up, 2026-09-08

Martyna requested more accurate sounds and deployment. The Nambucca audio
module now uses five short CC0 recording excerpts: three brush takes, a paper
rustle and a damped book closure as foley for the paper-buffered press. Exact
sources and processing are in `game-of-worms/assets/audio/SOURCES.md`. No
public-facing labels or prose changed. All approved illustrations, layouts
and visual animation frames are unchanged.

Brush cues now start at contact, after each lift. The screws remain quiet.
The male's sheet has outward and return cues. Audio loads on gesture, is reused,
never plays late, stays silent with reduced motion and stops on cancellation.
Five clips total 196024 bytes. New recorded-audio tests pass for format, levels,
cue timing, separate takes, cancellation, failure/retry and late-load silence.
Existing Nambucca art/frame, labels, visit-reset and Panama sound tests pass.
Local browser checks passed for painting completion, both presses, cancellation
and clean console. Width checks at 360, 768, 1024 and 1440 px show no horizontal
overflow. Runtime commit `fa8533f` was pushed to `main` from
`codex/kauai-recording-scene`. Pages run `34268162760` succeeded. The five
published text files match local content after line-ending normalization, and
all five WAV files match their local SHA-256 hashes. All ten paths return HTTP
200. Live-browser painting and both flower-press actions finish without console
warnings, errors or horizontal overflow.
Direct audio audition is unavailable in this session. The final subjective
listening check remains manual. No visual change requires new screenshot proof.

Added: five WAV clips and `scripts/check-nambucca-audio.cjs`.
Changed: `nambucca-audio.js`, audio cues/import in `nambucca-play.js`, Game
module cache keys in `game.js` and `index.html`, the Nambucca test, audio
sources, location dossier and this status file. No files deleted. Homepage,
Cabinet, background images and accessory drawings untouched.

### Dois Rios jackfruit and music publication, 2026-09-08

Martyna explicitly requested deployment of the existing Brazil preview on
2026-09-08, approving the displayed artwork and English-only wording. Commit
`8cbf580` was pushed to `main` from `codex/kauai-recording-scene`. Pages run
`34257605054` succeeded. All six changed/new public runtime files returned HTTP
200 and matched local text after line-ending normalization. The live browser
loaded all six accessories, started the duet by keyboard, cancelled it with
Escape and reported no errors or horizontal overflow. Replaces the three active EG5612 accessory families with
sticky jackfruit, Brazilian music and floral neckerchiefs. The male and larger
worm use separately constructed props. Music and fruit actions share one
controller and cannot run together. The approved forest image is unchanged.

The website-maintainer review found and corrected a small-screen drum/scarf
touch-target overlap. Checks at 360, 768, 1024 and 1440 px show no horizontal
overflow. Keyboard movement, pointer drag, tap, Home, Escape, action replacement
and retained user size passed in the browser. Catalogue and paired-geometry
startup audits passed. New drawing/frame/audio tests and existing accessory
label, visit-reset, legacy refinement and Panama audio tests passed.

Full-page screenshot captures remain defective (half-scale content and repeated
sections). Recorded capture sizes: 345 x 2376, 753 x 2375, 1009 x 1753 and
1425 x 1928. These are not valid full-page visual proofs. Normal viewport
screenshots were inspected. Physical devices, Safari and subjective audio
quality still need manual review. Reduced-motion frames are unit-tested, not
verified through an operating-system preference in this browser session.

Files added: `game-of-worms/dois-rios-art.js`, `dois-rios-play.js`,
`dois-rios-audio.js` (all under `game-of-worms/`), and
`scripts/check-dois-rios.cjs`. Files changed: `game-of-worms/accessory-designs.js`,
`game-of-worms/game.js`, `game-of-worms/index.html`,
`scripts/check-six-location-accessories.cjs`, this status file, the art catalogue
and Dois Rios research dossier. No files deleted. Homepage and Cabinet untouched.

### Nambucca Heads approved interaction revision, 2026-09-08

Martyna explicitly approved the final contextual preview, English-only labels
and Tiny surprise on 2026-09-08 and requested deployment. The approved runtime
files are unchanged. Implementation is on `codex/kauai-recording-scene`, based
on `290250a`. Commit `80310a1` was pushed to `main`. Pages run `34264416595`
succeeded. All six changed/new public runtime files returned HTTP 200 and
matched local text after line-ending normalization. Live checks confirmed
accessories initially off, six rendered props, five completed painting strokes,
Home reset, male flower pressing and Escape cancellation. No browser warnings,
errors or horizontal overflow were reported. The live scene was visually
inspected. Brazil remains live at `8cbf580`.

Six independently drawn props, original short foley and a shared controller
replace the old QG2814 objects. The approved garden image is untouched. Only one
activity runs at a time. The brush reveals paint at its tip, the larger press
compresses its paper layers, and the male pulls out a flower sheet. Fitted aprons
remain quiet. The first review corrected the male apron scaling origin, added
stone facets, enlarged presses and separated the phone touch areas. Targets are
remeasured after the entrance animation settles.

New art/frame/audio tests pass, alongside accessory labels, visit reset, legacy
refinement and Dois Rios regressions. Browser checks confirm initial accessories
off, completed painting, retained size/position, single-action replacement,
Escape and Home reset, pointer activation for both worms, hiding an active
accessory and resize cleanup. No horizontal overflow at 360, 768, 1024 or 1440 px.
Normal viewport renders inspected. The Game intentionally has one fixed light
palette. Reduced-motion frames are unit-tested. Physical devices, Safari and
subjective sound quality remain manual checks.

The full-page screenshot tool remains defective: phone capture 345 x 2376 and
small-desktop capture 1009 x 1753 and wide capture 1425 x 1928 contain half-scale/repeated content. The 768 px
capture failed twice. These are not valid complete-page proofs. Martyna's final
approval acknowledged this capture limitation and the manual sound check.

Created: `game-of-worms/nambucca-art.js`, `nambucca-play.js`,
`nambucca-audio.js`, and `scripts/check-nambucca.cjs`.
Changed: Game accessory dispatch, game controller and page module version,
this status file, art catalogue, Nambucca dossier and scene review checklist.
No files deleted. Homepage and Cabinet untouched. The checklist marks Nambucca
complete, with 19 other scenes still waiting. Ho Chi Minh City is next to review.

### Panama recorded scissors sound, 2026-09-08

Replaces the rejected synthesized hiss with a single 400 ms real scissors
closure from Joseph SARDIN / BigSoundBank (CC0). Source, excerpt, processing
and hashes are in `game-of-worms/assets/audio/SOURCES.md`. The clip plays at
natural pitch and quiet gain, with its strongest transient on blade closure.
Loading is gesture-only, cached and retryable. Late downloads cannot cause
late playback. Cancellation and reduced-motion silence are preserved.
The drawings, object positions, animation paths, labels and other sounds are
unchanged. The old noise generator is removed. No public prose was changed.

Created: `game-of-worms/panama-leaf-audio.js`,
`game-of-worms/assets/audio/panama-scissor-snip.wav`, and
`scripts/check-panama-leaf-audio.cjs`. Changed: this status file, audio source
notes, `panama-play.js`, `panama-leaf-cutting.js`, its existing regression test,
and the cache references in `game.js`, `index.html`, `accessory-designs.js` and
`panama-refinement.js`. No files deleted. Only Game files, tests and supporting
documentation are touched. Martyna approved committing and deploying this
exact revision. Audio loading, levels, timing, cancellation and retry tests
pass, along with the Panama geometry, interaction, labels and visit-reset
checks. Local browser completion, replay, Home and Escape pass without
console errors. Drawings and responsive layout are unchanged. Physical-device
and subjective speaker checks remain manual.

### Panama leaf cutting, 2026-09-08

Requested replacement for the forest-census fans. The primary worm has original
hinged steel scissors, the male a separately drawn broad leaf. Tapping either
starts one shared sequence: hands grip the loops and stem, the blades close
across the leaf, a cut tip flutters to clear forest floor and one leaf-cutter
ant carries it away. The ant has six articulated legs, elbowed antennae,
mandibles and a two-node waist. This is playful regional context, not collection
equipment or an asserted association with QG2726. The background, Gustavia
headpieces, flower bait and scientific prose are unchanged.

The existing Panama controller coordinates all actions. Starting the blender,
spoon or flower interrupts cutting and restores held objects. Escape, dragging,
resizing, hiding and scene changes cancel. User sizes and positions are retained.
The leaf stays cut after completion, and Home or replay restores it. Reduced
motion shows the cut without hand travel, falling, walking or sound. The brief
original synthesized snip/rustle plays once at blade contact, after a gesture.
The English-only labels `Leaf cutting`, `Scissors` and `Leaf` were explicitly
approved by Martyna. No Swedish or Polish Game strings exist.

Refinement corrected blade coordinate separators and matrix interoperability,
separated the two handle openings at closure, layered the front blade above
the leaf, tapered the arms, removed the initial cut seam and moved the ant
route off the bait dish. The source drawings receive no post-approval processing.
Martyna approved the exact contextual preview and deployment after disclosure
of the full-page capture fault. New regression coverage checks path command arity, construction, six ant legs,
the cut/pickup timeline, sound waveform and one cue, three scales, cut/reset
and reduced-motion frames. Browser checks passed full-cycle restoration of a
1.1 primary scale and 4 px offset, independent pointer dragging and Home reset,
keyboard activation, Escape and blender handover with only one active effect.
Hiding, scene changes and viewport resizing also remove all temporary effects.
No new browser errors occurred after the draft matrix correction. The full
catalogue and paired geometry are audited by the running Game. The Panama,
accessory-label, visit-reset, six-location, Araucanía and Claremont checks pass.

Files created: `game-of-worms/panama-leaf-cutting.js` and
`scripts/check-panama-leaf-cutting.cjs`. Files changed: this status file,
`docs/game-of-worms-art-catalogue.md`, the Barro Colorado location dossier,
`game-of-worms/accessory-designs.js`, `game.js`, `index.html`, `panama-play.js`,
`panama-refinement.js`, `scripts/check-panama-play.cjs` and
`scripts/check-panama-refinement.cjs`. No files deleted. Homepage and Cabinet
are untouched. Branch: `codex/kauai-recording-scene`.

Full-page capture attempts at 360/768/1024/1440 exported 345x2449, 753x2399,
1009x1801 and 1425x1928 images. The known duplicated/half-scale capture defect
persists, so these are not valid full-page proofs. Normal contextual views and
DOM bounds were inspected at each width. All six resting props remain inside
the scene, without horizontal overflow. Physical phones, Safari and subjective
sound listening remain manual checks.

### Accessories off at the start of each visit

Fresh loads already initialize empty per-location wardrobes, hidden accessory
groups and unpressed buttons, without restoring switches from browser storage.
The new lifecycle reset also switches off every location before leaving and
after a Back/Forward-cache restoration. Freestyle drawing mode switches off too.
Tab visibility changes and movement between scenes within the same visit keep
the visitor's selections. Cached-page sizes, positions, drawings and species
progress are preserved. No artwork or public copy changed.
`scripts/check-accessory-visit.cjs` checks initial state, every-location reset,
Back/Forward events, tab-switch preservation and active-gesture cleanup.
Local browser checks passed for all 31 locations, all four N2 slots, the three
Araucanía slots, drawing mode, leaving/returning, and reload. Choices survived
scene changes within the same visit. No console errors or horizontal overflow.
The browser's history test reloaded the document, so the persisted-cache branch
is covered by the lifecycle regression test. Physical-device testing is pending.

### Araucanía recorded bread bites and mate sip

Requested after b14f759: replaced the rejected synthesized eating and drinking
effects with CC0 recordings of bread bites and drinking through a straw.
Three distinct 380–460 ms bread takes follow the existing bite cues. Both worms
use a 580 ms straw sip. Source links, licences, excerpt positions and processing
are in `game-of-worms/assets/audio/SOURCES.md`. The first eating or sipping action
waits for decoding, with a bounded fetch timeout. Recordings are reused and never
play late after cancellation. Missing audio fails silently and can retry.
Other sounds, drawings, placement, animation phases and public copy are unchanged.

Checks: PCM format, clip duration, fades, levels, distinct takes, cached loading,
failure/retry, no autoplay, one source, hidden-page suppression and cancellation.
Existing Araucanía, labels, Claremont and six-location checks pass.
Local browser: all four recordings returned HTTP 200, the first bread action
worked on a cold cache, both drinking turns and Escape cleanup passed, and
there were no console errors or horizontal overflow. Drawings and layout are
unchanged. Listening assessment and physical-device audio checks remain manual.

### Araucanía compost work and Chilean break, deployment requested

Requested by Martyna after ee446f1. The three accessory slots now contain a
wheelbarrow/fork pair, mate/kettle pair and rolling-pin/bread pair. Original
SVG drawings live in `araucania-art.js`, with one activity controller in
`araucania-play.js`. It coordinates tipping, fork work, a male wheelbarrow ride,
pouring, shared mate, rolling and snacks. A 180 ms return-to-rest
handover prevents competing activities. Gesture-only foley uses one sound
source at a time. Home resets the selected family, Escape and scene changes
cancel, and reduced motion applies state changes without animated travel.

The refinement pass enlarged all six objects, revised the wheel and enamel
edges, fitted the male inside the tray, shortened reaches by moving the cup
and dough boards, and separated preparation from the compost. Existing user
position and size are preserved. Background and scientific copy are unchanged.
English-only buttons: `Compost work`, `Mate`, `Sopaipillas`. Paired
names: `Wheelbarrow`, `Compost fork`, `Mate`, `Kettle`, `Rolling pin`, `Sopaipillas`.
Martyna requested deployment after the final bread-eating refinement.

Placement correction after user review: wheelbarrow moved upward/right and the
large food board moved below/left of it. Rolling now keeps the board in its food
area. Sampled 15 tipping frames at each of 360, 768, 1024 and 1440 px, including
visible falling particles: no food collision, covered labels or overflow.
Added layout-clearance and stationary-rolling regression checks.

Mate pouring audio correction: replaced the shared soil-like noise texture with
a separate soft trickle and irregular short liquid resonances. Its 756 ms duration
uses the same start/end interval as the visible stream. Other activity sounds,
object drawings and placement are unchanged. Waveform fade/level checks at 44.1
and 48 kHz and one-source interruption tests pass. Agent listening review was unavailable.

Latest interaction correction: drinking mate uses a separate 320 ms straw-slurp
effect for both worms. The male now has three ready-to-eat sopaipillas on his board,
with no raw dough or cutter. Every tap brings one bread to his mouth immediately.
The larger worm keeps the rolling action. Placement and single-activity control
are preserved. English-only paired label changed from `Dough cutter` to `Sopaipillas`.

Final eating refinement: a 3-second pickup, two visible bites and a final morsel,
with pauses, chewing and three small crumbs. Each serving remains consumed after
the hand returns. The three pieces are eaten in order, and the next tap on the
empty board refills it for replay. Home also refills it. Cancellation restores
the unfinished piece and the original smile. Bites, chewing, no covered labels
and no overflow checked at 360/768/1024/1440 px. Custom size/position survives.
Waveform, state, source-count, labels and Claremont regressions pass. The full-page
capture fault persists (360 px request produced a distorted 345 × 2501 image).

Final browser checks at 360, 768, 1024 and 1440 px found no horizontal overflow,
out-of-scene default objects or covered scene labels. A scene-only pose adjustment
raises the pair and removes the old forager tilt to reserve the caption strip.
Checked activity handover, both drinking turns, pouring, food preparation, barrow
ride, keyboard focus, cancellation, scene switching and preservation of custom
size/position. Console errors: none. Geometry, interaction, audio-source and
existing label/Claremont/six-location regression checks pass. Audio output has
not been assessed by listening, and physical phones/Safari remain untested.
The browser's full-page capture returns distorted composites, so viewport proofs
and DOM bounds were used. A valid uncropped full-page proof remains outstanding.

### Consistent accessory-label capitalization, approved for deployment

All 94 English-only accessory labels now start consistently with a capital
letter. A shared formatter changes only the first lowercase letter, preserving
UV, DNA, 18S, ITS2, Ficus and all remaining wording. This normalizes 60 catalogue
labels and nine paired-object names used by accessibility labels and size controls.
IDs, family keys, artwork, geometry and saved settings are untouched. Exact copy
changes are listed in `docs/game-accessory-label-review.md` and approved by Martyna
for deployment. `scripts/check-accessory-labels.cjs` covers the full catalogue,
key preservation, scientific abbreviations and paired-label integration.
The Wormbook revisions below are included in the same approved release.

### Claremont page motion and varied spreads, approved for deployment

New requested refinement after deployed 72444fa. The male cover opens in
920 ms, with less skew than a leaf. Subsequent 780 ms page turns now leave
illustrated left pages behind, with reverse-side artwork corrected for the
sloping hinge. The opening endpaper is hidden until the moving cover reveals
it. Home restores the approved closed cover. The large book has four distinct
spreads: title/rods, agar/feeding, division/cocci and mushroom/spiral. Original
new drawings vary the composition without adding public labels. Cover artwork,
Lemonade, sounds, saved accessory size and scene background are unchanged.
Martyna approved the revised preview and requested deployment.

Checks: opening, mid-turn and settled male pages inspected. Four large-book
spreads traversed in order. The male's 1.1 scale and 4 px user offset survive
opening. Resize interruption clears the moving leaf. No console errors,
duplicate SVG IDs or horizontal overflow at 360/768/1024/1440 px. Full-page
exports measured 345x2549, 753x2424, 1009x1950 and 1425x1928. The existing
stitching defect still prevents full-page approval proof. Direct viewport
renders were reviewed. Mushroom gills and stem shading received a second pass.
Syntax, Claremont page/hinge/content/audio tests, Edinburgh and six-location
regressions pass. Physical phones, Safari and reduced-motion browser emulation
remain untested. No files added or deleted, no homepage or Cabinet changes.

### Claremont Wormbook and Lemonade, 2026-09-08, approved for deployment

Martyna approved the exact revised preview and deployment. The title lettering
now follows a curved baseline on the large page and a sloping baseline on the
male cover. Each illustration has a centred inset panel in its page plane.
The male hardback has layered cover edges, recessed oval artwork and a defined
banded spine. The public accessory name is the requested `Lemonade`. This and
`Wormbook` are intentionally English-only, as is the Game. The previously
previewed reading, sipping and pouring interactions are included in this release.
No homepage or Cabinet changes are part of this commit.

The notes below record the preceding iterations and their verification limits.

Follow-up requested by Martyna: both books now use `claremont-book-art.js`,
with slimmer bound covers, layered page blocks, calm margins and original
natural-history-style bacterial illustrations. The approved English-only title
is `Wormbook`. The original page/cover artwork is superseded by this requested
redraw. Background, glasses, drink drawings and accessory labels are unchanged.
The second drawing pass gives the title-page worm a tapered silhouette and
puts the more detailed rod-shaped cell illustration on the opening spread.
Page motion lasts 620 ms, with a 170 ms rustle at lower gain. Tap either drink
or press Enter/Space for its own straw-to-mouth sip, puckered mouth and a quiet
280 ms slurp. The male takes a quicker sip. Fluid levels fall after drinking.
Dragging the jug near the glass still pours, with Shift+Enter as the keyboard
equivalent. Home restores drinks and books. All changes remain unpublished.

Follow-up verification: both straw-to-mouth sips were inspected in the browser,
including the male at 360 px. Custom scale 1.1 and position were identical
before and after the larger worm's sip. Drag-to-pour and Shift+Enter both
started pouring. Escape removed the active animation and temporary mouth.
No horizontal overflow at 360, 768, 1024 or 1440 px, and no console errors.
Fresh full-page exports were 345x2549, 753x2424, 1009x1950 and 1425x1928,
but the known stitching fault prevents treating them as full-page approval
proofs. Regular viewport renders were inspected instead. Syntax, Claremont,
Edinburgh, Ahmedabad and six-location checks pass. Audio timing and lifecycle
were tested, but subjective sound quality still needs a listening review.

Earlier preview record below is retained for history. Its references to
unchanged resting book drawings apply only to the first iteration.

Implemented in `claremont-play.js`, with narrow interaction hooks in `game.js`.
Tap a book or use Enter/Space to open/turn pages. The small hardback opens on
its own sloping binding. New uncluttered spreads contain original schematic
bacterial drawings. The original artwork returns with Home. Drag the pitcher
near the male's tumbler, or activate either drink, to pour. Liquid stays level
while the pitcher tilts, the glass fills over two servings, and Home refills
the jug. Both actions have short gesture-triggered synthesized foley.

The background, glasses, original resting drawings and public text are unchanged.
Bounds and scale pivots are held stable while the art changes. Pointer drop,
keyboard activation, Home, Escape and custom-size/position restoration were
checked in the local browser. Geometry, sound-lifecycle, syntax and existing
Edinburgh/six-location regression checks pass. No console errors or horizontal
overflow at 360, 768, 1024 and 1440 px. Full-page capture attempts exported
345x2549, 753x2424, 1009x1950 and 1425x1928. The capture tool still produces
duplicated sections and blank space, so these are not valid full-page proofs.
Physical phones, Safari, reduced-motion browser emulation and subjective audio
quality remain manual checks. The reduced-motion branch changes state without
running the motion timeline. This work is not committed or deployed yet.

### Edinburgh playable bagpipes, 2026-09-08

User requested implementation and deployment. Each existing bagpipe plays a
different original short synthesized phrase on tap or Enter/Space. Three
continuous drones accompany the chanter. The mouthpiece lifts to the mouth,
the bag gently compresses, and temporary finger pads follow the note changes.
The approved resting drawings, kilts, telescopes and public copy are unchanged.
Second tap, Escape, movement, hiding the accessory or changing scene stops it.
Reduced motion keeps the instrument still while sound remains user-triggered.

Paired-score, motion, audio lifecycle and regression tests pass. Browser checks
passed pointer/keyboard playback, second activation, Escape, toggle cleanup,
Home and exact custom position/scale restoration after playback. Direct scene
views and overflow checks cover 360, 768, 1024 and 1440 px, with no page errors.
Full-page captures were attempted at all four widths (345x2645, 753x2448,
1009x1998, 1425x1942), but the browser capture tool duplicated sections and
left blank areas. These are invalid full-page proofs, not a completed visual
QA gate. Physical phones, Safari and subjective speaker/audio quality remain
manual checks. No dependency or sampled recording was added.

### Ahmedabad pair spacing, 2026-09-08

Requested adjustment and deployment after mobile screenshots. Moves the pair
slightly right/up and the male separately left/up, with his waistcoat using
the identical attachment. Limits digging drops to 35 primary / 95 companion
body units (formerly 65 / 220). Parked reels drop 80 / 120 instead of 140 / 250.
This keeps the default digging pair separated and the reels inside the scene.
No artwork paths, copy, audio, saved user offsets or other locations changed.

Full-page proofs at 360/768/1024/1440: 345x2400, 753x2323, 1009x1777,
1425x1876 pixels. Also reviewed at 390. Both digging actions and return to
kites, Home and keyboard activation checked. No console errors or overflow.
Ahmedabad hands, drawings and six-location regression tests pass.
Physical phones and Safari remain untested. Edinburgh bagpipe request is
pending, with no changes to Edinburgh included in this deployment.

### Six-species celebration preview, 2026-09-08

Approved for deployment on 2026-09-08. Replaces the old confetti with tapered,
shaded worm silhouettes, curled gold/berry streamers, sparse gold lozenges and
six crawling worms with travelling body bends and attached faces. The approved
compass emblem and completion tracking are unchanged. Mobile uses fewer pieces.
Refinement separates opposing crawler lanes to avoid face-to-face overlap.
No public copy, sound, scene artwork or accessory-size changes.

New geometry and lifecycle tests pass, including reduced motion, hidden pages,
timeout, Escape and relaunch cleanup. Browser tests confirm no burst at 5/6,
keyboard activation at 6/6, retained focus, non-blocking overlay and automatic
cleanup. No console errors or horizontal overflow. Full-page proofs at viewport
360/768/1024/1440: 345x2416, 753x2293, 1009x1748, 1425x1846 pixels, excluding
the browser scrollbar. Fixed-light Game only. Physical phones and Safari untested.

The preceding male flower correction is deployed as `a4e0587`. Pages run
`34167164046` succeeded and all five changed published runtime paths matched
the committed files.

### Panama male flower correction, 2026-09-08

Approved for deployment on 2026-09-08. Replaces the male's reaching hand
and tilted bloom with closing and reopening petals. The attachment stays fixed.
Existing paths morph into a closed bud, the stamens recede, and a small petal
fold line appears. Original open paths, colour, position and size are restored
exactly. The hermaphrodite's flower and all other actions are unchanged.

Path morph, animation and six-location tests pass. Browser checks confirm no
hand, complete closure, exact reopening and custom size preservation. Full-page
proof: 650x2268. Four-width revalidation remains outstanding because the browser
viewport override was ineffective. No public copy or background changes.

### Bali cacao cracking sound, 2026-09-08

Adds an original 420 ms synthesized woody snap and short fibrous tail when
the female's hanging cacao pod begins opening at 840 ms. Initializes audio
only from the user's click/key gesture. Plays once per cut, stops on cancel,
reset, scene change, hiding or resize, and skips late frames or suspended audio.
Reduced motion keeps the immediate reveal with one crack. No changes to
drawings, backgrounds, animation movement, accessory size, labels or male nibs.

Waveform checks at four sample rates, audio lifecycle tests and the pod,
nibs and gong regressions pass. Browser opening, replay, Home, Escape and
scene-switch cleanup passed without console errors or overflow. Full-page
Bali proof is 650x2219. The viewport override did not affect this tab, so new
Bali four-width proofs were not obtained. This is an audio-only change.
Physical devices, Safari and subjective listening remain untested.

Panama is deployed as `2acd41e`. Pages run `34165730531` succeeded, all six
published runtime files matched, and the live blender interaction passed.

### Panama flower-bait interaction preview, 2026-09-08

Approved for deployment on 2026-09-08 after the final contextual review.
Replaces the active Golden
Fleece cape with a sealed glass blender for the hermaphrodite and separately
drawn spoon, mixing bowl and receiving dish for the male. Existing flower and
fan artwork retained, with animation wrappers and revised fan starting positions.
The larger flower folds over the eyes and shakes open. The male's bloom tips
and is straightened with a hand. Fans have individual rhythms, hand grips,
subtle airflow and flower movement. Blender has contained animated petals,
mixture and dial, two contact hands and a quiet gesture-triggered motor sound.
The male transfers a spoonful between dishes. Home clears the receiving dish.

English-only labels explicitly approved by Martyna: `Flower bait`, `blender`,
`spoon and dish`. No other public prose changes. The painted background and
collection metadata are unchanged. The new props are playful interpretations,
not a reconstruction of the experimental equipment.

Critical refinement enlarged blender and dishes, separated the male spoon
from his fan, and rerouted the lower blender arm outside the glass. Full-page
proofs at 360/768/1024/1440 viewports: 345x2449, 753x2399, 1009x1801, 1425x1928
(scrollbar excluded). Six action starts and Escape cancellation, spoon result
persistence and Home reset, custom blender scale preservation checked.
Drawing, animation-frame and six-location checks pass, plus Trivandrum and
Ahmedabad regression tests. No document overflow. Fixed-light Game only.
Physical touch devices, Safari and subjective sound listening remain untested.

Previous Trivandrum work is deployed as `4a92520`. Pages run `34164097672`
succeeded. All six published runtime files matched the commit and live watering
completed without browser errors.

### Trivandrum loupe overlap and watering preview, 2026-09-07

Approved for deployment on 2026-09-07: "once ready, deploy".
The active loupe moves above its
partner and magnifies that partner's physical frame, glass and handle without
recursive optical windows. Keyboard focus survives the layer change.
The larger female's can lifts above the male and showers his head, then returns.
The male's can tips downward with a pulsed pour. Existing drawings, labels and
default placements are unchanged. Water and soft gesture-triggered sound stop
on cancellation or location changes. Custom accessory scale is preserved.

Refinement fixed changing SVG bounds pulling the rotating can off-screen.
Loupe overlap in both directions, keyboard movement, pouring, exact return,
custom scale and Escape cancellation checked in Chromium. Full-page proofs for
360/768/1024/1440 viewports are 345x2545, 753x2423, 1009x1897 and 1425x1928
(scrollbar excluded). Mobile shower remains within the scene. No overflow.
Loupe, watering, Trivandrum drawing, Ahmedabad regression and six-location
tests pass. Game remains fixed-light. Physical touch devices, Safari and
subjective sound listening remain untested. No public copy changes.

Ahmedabad commit `9e68244` is deployed. GitHub Pages run `34161261583`
succeeded and the six published files matched the commit.

### Ahmedabad hands, digging and sound preview, 2026-09-07

Final contextual render and English-only label `waistcoats` explicitly approved
by Martyna on 2026-09-07: "Approve and deploy". Publishing the complete Ahmedabad
bundle below. Historical preview notes are retained as the revision record.
Final QA: drawing, timeline/audio and six-location audits, syntax and diff checks
pass. Full-page proofs at 360/768/1024/1440 viewports are 345x2400, 753x2323,
1009x1777 and 1425x1876 (scrollbar excluded). No horizontal overflow or console
errors/warnings. Both kite actions, primary digging, matching body/cloth transforms
and Home reset checked. Physical devices, Safari and subjective sound listening
remain untested. No source illustration files changed after approval.
Paper/cloth correction: kite canopies now have straight cut-paper perimeters,
flat two-colour pasted-paper patterns, one bowed bamboo spar and one straight
spine. Thin edges replace the padded highlights. The primary kite starts farther
left/up to separate its tail from the costume. Waistcoats have bound rounded
necklines and original floral embroidery, with open-front berry primary and
short buttoned indigo companion. Construction sources are in the dossier.
All earlier hand-reach, digging, sound, default-spacing and spade-only work is
retained. User approved deployment of the bundle and the English-only label
`waistcoats` after viewing the final contextual render.
Second arm-reach correction: the primary reel lifts 120 local units instead of
24, with eased early lift so the raised pose is sustained through the pull.
The guiding hand advances higher and the tether control point follows the lift.
Regression checks require the reel hand to clear the upper shoulder at default
size. Male motion, digging, canopies, costumes and sound are unchanged. Updated
the hands module, its test, two cache keys and this status note. No files added
or deleted. Four-width full-page checks repeated with the dimensions below,
no overflow or console warnings/errors. Keyboard activation and Home checked.
Arm-reach follow-up: primary guiding hand slides farther up the kite tether,
reel moves outward/up through a larger gesture, and elbows open away from the
belly. Digging holds the spade farther forward with a broader stroke. Male
geometry/timing, clothing/canopy drawings, audio, labels and manual controls stay
unchanged. Reach tests cover finite positions, exact return and unchanged male
movement. Changed hands controller, its test, Game/index cache keys and these
three documentation files. No new or deleted files in this follow-up.
Arm-reach QA: controller/refinement/six-location checks and syntax checks pass.
Full-page browser captures at viewport widths 360, 768, 1024 and 1440 measure
345x2400, 753x2323, 1009x1777 and 1425x1876 pixels respectively (scrollbar
excluded). No horizontal overflow or browser warnings/errors. Desktop and mobile
renders inspected. Physical-device touch and Safari remain untested.

Latest revision replaces the selectable lattice fans with two fitted embroidered
waistcoats. The larger worm wears separate open fronts, the male a short buttoned
cut. Inner cloth follows body motion during digging without changing outer user
drag/scale. Fans are retained as unused drawings, not assigned elsewhere.
Canopies now use two clean paper designs, finer outlines and partial translucency.
The primary kite is raised clear of the waistcoat. Parked reels stay in frame.
Only public wording change: `waistcoats` replaces `lattice fans`, including
derived accessible names. The Game is intentionally English-only. This label and
the contextual drawing require approval before commit/deployment.
Waistcoat validation: both cloth transforms match their moving body during digging.
Keyboard move/Home and Escape checked, and zero fan pieces rendered. Latest full-page
proofs at 360/768/1024/1440: 345x2400, 753x2323, 1009x1777, 1425x1876.
No overflow or console warnings/errors. Drawing, timeline/audio, retained-fan,
palette and six-location tests pass. Physical touch, Safari and sound listening
remain untested. This revision changed accessory-designs.js, ahmedabad-refinement.js,
ahmedabad-hands.js, game.js, index.html, check-ahmedabad-refinement.cjs and these
three project/art documents. No files created or deleted in this revision.

Follow-up refinement: paper canopies now have bowed edges, bamboo spars,
reinforcement patches and restrained shading. Initial positions spread the
canopies above the worms, fans to the sides and digging tools below. The bucket,
tray and sample extras were removed at Martyna's request. Arms now taper through
defined elbows into larger gloves. Kite excursions are wider. Manual drag/scale
handling, sounds and other locations are unchanged.
Fresh full-page proofs: viewport 360 -> 345 x 2400, 768 -> 753 x 2323,
1024 -> 1009 x 1777, 1440 -> 1425 x 1876 (15 px scrollbar excluded).
No horizontal overflow or browser warnings/errors. Keyboard kite and digging
actions and Escape reset checked. Geometry, paint, hands/audio, fan and
six-location checks pass. Physical touch devices, Safari and sound listening
remain manual checks. No new files in this follow-up, none deleted.

Tap either kite rig to tug its tether with attached hands and a small body lean.
The larger worm guides the line with one hand, while the male grips both ends
of his reel and responds more quickly. Tap either soil kit to lower the worm,
set the reel aside and dig with the same hands. The larger worm has a D-grip
spade and one scoop, the male a hand trowel and two quick scoops. Holes and soil
piles remain until reset or scene/accessory changes. Home resets the selected
pair member, Escape cancels, and keyboard movement/size controls remain available.
Original procedural wind, reel clicks and soil crunches start only after a
gesture. Reduced-motion mode uses still poses without these sound effects.
No public copy or labels changed. Game remains English-only and fixed-light.

Created `game-of-worms/ahmedabad-hands.js`, `game-of-worms/ahmedabad-audio.js`
and `scripts/check-ahmedabad-hands.cjs`. Changed the Ahmedabad renderer, catalogue
dispatcher/layout, Game controller/cache keys and the three documentation files.
Nothing deleted. No homepage or Cabinet changes.
Checks: Ahmedabad timelines/audio, artwork/paint, fans/palette, six-location
artwork, Ishigaki interaction/audio regression, syntax and diff checks pass.
Browser checks cover pointer/keyboard activation, both scoops, switching tools,
Escape, scene interruption and exact preservation of a selected 1.1 accessory
scale through a kite cycle. No console errors or horizontal overflow.
Final uncropped full-page proofs: requested 360/768/1024/1440 viewports produced
345x2400, 753x2323, 1009x1777 and 1425x1876 images (15 px scrollbar excluded).
Physical-device drag/pinch, Safari, reduced-motion browser emulation and an
auditory listening review remain manual. The reduced-motion/audio paths have
automated checks. Preview: `http://127.0.0.1:4198/game-of-worms/?review=ahmedabad-hands`.

### Ishigaki wing flights and opening figs, 2026-09-07

Tap either wing pair for an individual flight with attached accessories,
root-pivoted wingbeats and exact return. Tap either basket to lift and open a
fig, revealing florets around a cavity and enlarged moving nematodes. Tap again
to close. Home resets the fig, Escape stops flight, and scene changes clean up
all temporary drawings. Reduced motion keeps worms still and opens figs directly.
The Game remains English-only with existing accessory names. No new visible copy.
Four full-page proofs at requested 360/768/1024/1440 widths were inspected
(345x2403, 753x2399, 1009x1780, 1425x1928 excluding scrollbars). No overflow or
console errors. Pointer/keyboard opening, closing, both flights, reset and
scene-change interruption were checked. Timeline and catalogue checks pass.
Added a quiet original synthesized wing buzz, with separate pitches and
durations for the two worms and tremolo matched to the drawn wingbeat timing.
It starts from the triggering gesture and fades on landing or interruption.
Stationary reduced motion remains silent. Audio scheduling and cancellation
tests pass. The agent has not aurally reviewed the effect.

### Canberra coffee and faster café raid, 2026-09-07

Martyna approved the exact refined cup and faster café animation in the
Canberra preview and requested deployment. The primary cup has a glazed
berry body, open handle, porcelain rim and foot, contained microfoam and
separate saucer/spoon. The male retains his distinct biscuit plate. The
cockatoo raid lasts 2700 ms (previously 4800), with 320 ms wingbeats,
banking and an edge grip on the real biscuit. Sipping and biting follow
small arcs. The background, bird drawings, napkins and public copy are unchanged.

Four full-page proofs were inspected at requested widths 360/768/1024/1440.
Capture dimensions excluding the scrollbar: 345x2573, 753x2425, 1009x1950
and 1425x1928. Café state, cockatoo drawing, N2 audio/tailoring regressions,
syntax and diff checks pass. Browser interaction checks cover sipping,
theft and cleanup. No cockatoo audio is included: a documented natural flight
call was found, but excerpt reuse permission remains unverified.

### N2 freeze-flight sound and size-control cleanup, 2026-09-07

Added original synthesized frost/chime cues followed by a short jet whoosh,
timed to the existing N2 freeze and staggered departure. Audio starts only
from the existing user-triggered animation. Interrupted runs stop their
scheduled sources. Reduced motion uses only the freezing cues. Unsupported
or blocked audio leaves the animation usable. No artwork, flight paths or
public copy changed. Removed the requested visible accessory-size percentage,
retaining the slider's accessible value and keyboard controls.

Audio scheduling, interruption, replay, delayed resume, unsupported audio,
reduced motion, N2 flight/tailoring and Bali gong regression checks pass.
Local browser checks confirm a complete cycle restores the scene, focused
jetpack Enter/Escape works, the percentage badge is absent and no console
errors occur. Sound has not been aurally reviewed by the agent.

### Bali cacao interactions, 2026-09-06, approved release

The female's existing machete cuts the pod hanging from the right tree.
Click, Enter/Space or dropping the blade on the fruit starts a backswing,
150 ms accelerating handle-pivoted strike, impact hold, recoil and return.
The pod jolts at contact, then two separately illustrated rind halves rotate apart,
revealing the seed-filled and empty interior faces. The original painting,
ground fruit and female accessory drawing are
unchanged. Home restores the original fruit. Scene changes clear the effect,
and cancellation restores the exact source prop. Reduced motion opens the
pod directly. Two optional PNGs load only on first use. This replaces the
rejected ground-pod wipe effect.

The male's club and pod half are replaced by an open paper packet with five
angular roasted nibs. Click or Enter/Space feeds him one nib. The nib travels
from its actual packet position to his moving mouth. Home refills the packet,
and another click after it empties also refills it. Reduced motion consumes
one nib without travel. Interruptions before contact restore it, while eaten
nibs stay consumed. A second drawing pass refines the lip, gusset and creases.
The only new wording is the requested "cacao nibs" on the packet and its
individual accessible name. Shared toggles and scientific copy are unchanged.
The Game is English-only. No new captions or explanations are added.

Preview: `http://127.0.0.1:4198/game-of-worms/?review=bali-nibs`.
Martyna approved the exact final packet and interaction together with the
female's hanging-pod strike and requested deployment of all Bali changes.
Seven regression scripts, syntax and diff checks pass. Browser verified
desktop/phone feeding, keyboard reset, Escape and the hanging-pod strike,
without console errors. Publication is verified separately after the push.
See the Sanda dossier for asset provenance, tests and screenshot limitations.

### Cabinet white list backgrounds v103 — approved release

At Martyna's request, all 34 list product photographs now use reversible
per-photo CSS display outlines on a white 64 × 64 px field. Each packaged
bar has 4 px minimum breathing room, without changing its aspect ratio.
Coloured source backgrounds and extra photo props are excluded from the
list display. All original photo files, Cabinet artwork and approved
alpha/object layers remain untouched. Detail previews and public text are
unchanged; credits are retained. Twenty responsive full-page cases pass
in both themes, including image loading/fallback, focus, gestures and
overflow. Martyna approved this exact preview and requested publication.
Publication verification is recorded after the push. No Game changes.

### Cabinet list photographs v102, 2026-09-06 — approved release

All 34 chocolate entries now have internet product photographs in both Browse
the collection lists. Twenty-four new files include the clearer full-size La
Dalia 70% photograph; ten previously accepted photographs remain unchanged.
Martyna confirmed permission from the other makers/retailers as well as
Friis-Holm. Exact sources and packaging-edition caveats are documented in
`cabinet-of-curiosities/assets/collection-products/SOURCES-v102.md`.
No names, percentages, detail photographs, furniture or alpha layers change.
Twenty responsive full-page cases across light/dark modes pass, including
34 decoded photos per list, fallback, keyboard/focus, touch gestures and no
horizontal overflow. The v75/v76 alpha hashes match their approved versions.
Martyna approved the exact production-photo preview and source credits and
requested publication. Release verification is recorded after the push.
No Game files changed in this Cabinet update.

### Cabinet unified furniture, 2026-09-06

Martyna requested the new unified furniture picture on desktop and mobile,
with verification and deployment. The same `cabinet-study-unified-v2.png`
now supplies the complete cabinet, woven recess, window, lamp, smaller plant,
counter and inset drawer on every layout. Its bytes are unchanged from the
desktop preview. An outer camera encloses the whole image; an inner assembly
preserves the original object/hotspot coordinates. The v75/v76 alpha layers
are byte-identical to their approved sources. Portrait phones show the full
scene above the collection, with optional interactive Cabinet view; landscape
phones retain pan, pinch, keyboard zoom and reset. No repeated timber strips.
The full-size Friis-Holm photos requested previously are list-only, with the
proper-name credit `© Friis-Holm Chokolade`; the Cabinet remains English-only.
Twenty full-page browser cases across both themes pass, including responsive
layout, dialogs/focus, gestures, image fallbacks, reduced motion and overflow.
No Game files are changed by this Cabinet release. Publication verification
is recorded in the release report after the push.

### Game accessory refinement, 2026-09-05

Canberra interactive café preview, 2026-09-06: replaces the unpublished
flight-only draft. Her original flat-white cup lifts and tilts to her mouth.
His grinder becomes three individually drawn biscuits with bite/consumption
state. Airborne cockatoos have no bases or pre-attached food. Each flies to
an actual biscuit, picks it up and leaves head-first, then returns empty.
The companion bird prefers a bitten biscuit. Linen napkins replace balloons,
with distinct loose folds after a refinement pass. Dragging over a mouth or
tap/Enter/Space wipes foam/crumbs and leaves a stain. Home resets food/cloth.
Finite effects preserve saved accessory transforms and restore on Escape,
movement, hiding, drawing, location change, page hide and reduced-motion change.
Tests pass for state, geometry, timelines, cancellation, reduced motion and
N2/Ahmedabad/Bali regressions. Browser verified drinking, biting, both raids,
pickup, keyboard wiping, phone taps, reset and Escape without console errors.
No overflow at 360/768/1024/1440. Full-page captures remain defective:
345x2573, 753x2431, 1009x1950, 1425x1934, with duplicated sections and blank
space. Normal desktop/phone renders inspected. Drag contact is covered by
controller tests, with manual pointer-drag review still recommended.
English-only labels shown in the approved preview: Coffee & biscuits, Napkins, Cockatoos, with
individual flat white/biscuits names. Tiny surprise drops the balloon clause.
No translation dictionaries exist for Game content. Martyna requested
deployment of this preview. Release integrates main's d454e5b female-pod
removal and the newer Cabinet publication without altering the approved art.
Publication is confirmed separately after push and live checks.

Ahmedabad fan interaction preview, 2026-09-06: tapping a lattice fan or
pressing Enter/Space fans its worm for about three seconds. The primary fan
has three broader sweeps, the male four quicker sweeps. The existing artwork
is wrapped in a neutral motion group and rotates around the grip. Three
short breeze strokes map from the fan to its own worm's cheek using current
screen matrices, including saved position, size and body movement.
Public labels, drawings and collection text are unchanged. Reduced motion
keeps the fan stationary with a brief static breeze cue. Dragging, keyboard
movement/reset, hiding, changing location, drawing mode and page hiding
cancel and restore the original transform. Replay cannot accumulate effects.
Timeline and lifecycle tests plus Ahmedabad, Bali gong and N2 regressions
pass. Browser checked tap/Enter/Space, male and primary targeting, exact
restoration, keyboard movement/Home and hiding while active. No console
errors or overflow at 360/768/1024/1440. Normal desktop and phone views were
inspected. Full-page captures retain the existing tool limitation, with
sizes 345x2400, 753x2329, 1009x1777 and 1425x1882. Approved for deployment
with the pending Bali gong interaction. Publication is verified after push.

Bali gongs local interaction preview, 2026-09-06: tap or Enter/Space plays
the female's single low strike or the male's two alternating kettle strikes.
Original drawing paths, paint, placement and labels are unchanged. Neutral
SVG groups isolate the mallets and metal faces from the stationary frames.
The refinement pass adjusted each male mallet's travel to its existing boss.
Quiet original synthesized percussion starts only from a user gesture, with
bounded decay and no claim of traditional tuning. Unsupported audio falls
back to motion. Reduced motion leaves the drawings stationary. Moving,
resetting, hiding, changing location, drawing mode and page hiding cancel
playback and restore the exact resting transforms. Rapid replay cancels the
previous sound with a short release rather than accumulating voices.
Timeline/audio-lifecycle tests, Bali drawing, N2 and loupe regressions pass.
Browser checked both keyboard strikes, Escape, arrow movement/Home reset,
pointer activation and phone activation, with no console errors or overflow
at 360/768/1024/1440. Full-page captures remain defective (half-scale content
and duplicate sections): 345x2400, 753x2381, 1009x1753 and 1425x1934 pixels.
Normal desktop and phone views were inspected. Sound timbre still needs the
user's listening review. No public-facing copy was added. Included in the
approved interaction release with Ahmedabad. Publication is verified after push.

N2 freeze-flight release, 2026-09-06: tapping either visible cryovial
pack (or Enter/Space) freezes both worms, flies them out and back, then thaws
them over 8.2 seconds. They exit upper-right and return head-first from
lower-left. The male has a delayed, slightly corrective landing.
Existing bodies, coats, goggles and packs travel together without changing
their drawings or saved positions. Food plates stay in the scene. Temporary
ice/plume layers are removed on completion, Escape, hiding an accessory,
drawing mode, page hiding or location changes. Reduced motion keeps the worms
stationary with a short frost fade. No animation explanations were added.
The separately approved English-only introduction adds: "In the lab these
nematodes eat bacteria growing on agar plates." Both HTML and species data
use the identical sentence.
Timeline tests and N2/Bali/loupe regressions pass. Browser checked complete
cycles, exact position restoration, actual motion pause/resume, mobile tap,
replay and cancellation. No overflow at 360/768/1024/1440 or console errors.
Full-page capture retains the known rendering defect. Martyna approved the
final route and requested deployment. Publication is verified after push.

Sanda, Bali JU1873 release, 2026-09-06: separate draped female and tied
male endek wraps follow the worm bodies. The female has a bronze hanging gong
in a timber frame, the male a low pair of cord-supported kettle gongs. Cacao
tools pair a steel machete for the female with a wooden pod-opening club for
the male, beside opened pods with pulp-covered beans. The male's individual
English-only control uses the approved name "wooden pod-opening club".
Background, shared toggle labels and scientific text are unchanged.
The refinement pass separated the large pod from the gong, added rim/boss
depth and moved the small gong setup clear of the species label. Six-object
paint/geometry, full catalogue and regression checks pass. Independent
desktop dragging, keyboard movement, resizing and reset were checked, as
were phone interactions. No overflow at 360, 768, 1024 or 1440 px and no
browser errors. Complete-page capture remains affected by the previously
reported half-scale/duplicate-section defect. Martyna approved the paired
refinement and requested the male club followed by deployment. Publication
verification follows the release push.

Panama release `33b3eee` is published on main. Pages run `34034162185`
succeeded. All four release runtime files match the approved commit, and
the live browser renders six refined drawings without errors or warnings.

Panama QG2726 local refinement, 2026-09-06: six separately drawn objects in
`game-of-worms/panama-refinement.js`. Gustavia flower headpieces fit above
the heads, fleece capes follow the body curves, and census fans have joined
pleated paper leaves and visible ribs. Primary and male versions differ in
construction and silhouette. A second visual pass softened the fleece hems
and enlarged the male bloom. Worn pieces share the body animation clock.
Background, collection records, labels and public copy are unchanged.
Scoped drawing, catalogue geometry, N2, six-location and live-loupe checks
pass, together with pointer dragging and keyboard movement/reset checks.
Normal renders were inspected at 360, 768, 1024 and 1440 px with no document
overflow or browser errors. Full-page captures still have the existing
half-scale/duplicate-section defect and are not valid complete-page proofs.
Martyna approved this exact contextual preview for deployment on 2026-09-06.
Publication verification follows the release push.

Trivandrum JU1325 approved for deployment, 2026-09-06: six redrawn props in
`game-of-worms/trivandrum-refinement.js`. The female has a long-grip magnifier
and broad oval enamel watering can. The male has a straight compact magnifier and a
tall compact can. Both tubes have ribbed caps and contained curled leaves and
petals. A second pass removed opaque lens backing and enlarged the male tube.
The painting, approved labels and public copy are unchanged.
Syntax, scoped drawing checks and full catalogue geometry pass.
Follow-up: both magnifiers start about 12% larger and now show a live 2x view
of the actual background, worms and other props. Removed the decorative worm
symbols from the lenses. The male grip is straight, with a short metal neck.
`live-loupes.js` maps source coordinates into fixed, clipped lens viewports.
It excludes headwear to prevent recursion, supports drag and size changes,
and restores normal layering and removes its animation loop on location change.
Optics mapping, hidden props, cleanup, pointer/keyboard, mobile sizing and
switch-away/back checks pass. Martyna approved the revised interactive preview
for deployment, including larger working lenses and the straight male grip.
All six controls pass pointer drag, keyboard movement and isolated Home reset.
The browser reports no errors or warnings. Four widths have no
document overflow. Full-page captures remain defective (half-scale content
with duplicate sections), so they do not constitute valid full-page proofs.
Capture sizes: 345 x 2545, 753 x 2429, 1009 x 1897 and 1425 x 1934 pixels for
360, 768, 1024 and 1440 px viewports. Native phone and desktop views were inspected.

Ahmedabad AF16 approved for deployment, 2026-09-06: refined paper/wood fans and kites,
painted-metal pail/probe and a separate male tray/trowel. Paired differences
include geometry and construction, not just scale. Background and copy are
unchanged. Six-piece pointer/keyboard/resize/reset, geometry, paint, regression
and overflow checks pass. Normal phone and desktop views reviewed. Complete
full-page screenshot proof is still blocked by duplicated half-scale captures.
Martyna approved the final larger-canopy preview for deployment. See the Ahmedabad dossier.
The subsequent kite preview adds longer curved threads and independently
timed drifting motion with fixed reel anchors and a reduced-motion fallback.
The earlier deployment hold was resolved by the approved larger kite-to-reel proportions.
The latest preview enlarges only the primary/male paper by 50%/65%, respectively.

Kauaʻi release 9ad179b is published on main. GitHub Pages run 34020523952
succeeded, and all four deployed runtime files match the approved commit.

Bristol N2 is approved for deployment on 2026-09-06: body-fitted aprons,
smaller transparent goggles, and larger side-view cryovial packs with
overlapping cylinders and prominent rear exhaust pipes. Worn pieces share
the body animation clock. Agar plates, Bristol painting and public copy are
unchanged. The Game remains fixed-light. N2, six-location and Kauaʻi checks,
syntax checks, keyboard movement/reset and four-width overflow checks pass.
Martyna approved the final contextual preview after disclosure of the ongoing
full-page screenshot defect. Publication verification follows the release push.

Latest Kauaʻi follow-up, 2026-09-06, approved for deployment:
male ear cups now share equal geometry and a balanced band. Both microphone
stands have neutral charcoal bases, silver poles and neutral grey hardware.
Short English-only public labels: Headphones, Microphones, Tape recorder.
Labels also propagate to accessible piece names and size controls. Martyna
approved the wording and contextual artwork. Four accessory regression checks,
syntax and diff checks pass. Male keyboard movement/reset was verified.
DOM overflow checks pass at 360, 768, 1024 and 1440 px. Normal phone/desktop
renders were inspected. This pass's full-page captures are invalid: half-scale
content and duplicated sections returned at 345 × 2400, 753 × 2381,
1009 × 1753 and 1425 × 1934 pixels. Complete responsive proof remains pending.

Kauaʻi follow-up, 2026-09-06, local preview awaiting visual approval:
the male headset now has two padded ear cups and a visible far-side hinge.
Microphone fittings and recorder reels/meters use cool silver instead of
yellow brass. Berry microphone housings and recorder fascia improve contrast.
Primary headset, accessory positions, background and public copy are unchanged.
Four accessory regression checks, syntax and diff checks pass. Male-headset
keyboard movement/reset works and browser console has no warnings or errors.
Complete page captures were reviewed at viewport widths 360, 768, 1024 and 1440.
Their content images are 345 × 2448, 753 × 2382, 1009 × 1806 and 1425 × 1935
pixels respectively, excluding the browser's 15-pixel scrollbar. No overflow.
Game remains fixed-light. No commit or deployment for this follow-up yet.

Kauaʻi headset-fit follow-up was approved for deployment on 2026-09-06.
Both headsets sit lower with reduced tilt. The male monitor is 30% larger,
with a fuller ear cup and a tighter headband. Berry cups and ivory bands
increase contrast against the forest. Recorder, microphones, painting and
public copy are unchanged. Both pointer/keyboard/resize/reset checks and
four-width overflow checks pass. The full-page capture limitation remains.

Kauaʻi XZ1516 is approved for release on `codex/kauai-recording-scene`.
One shared reel-to-reel recorder replaces the genome tuning wheels. Fitted
headphones and separate floor/desk microphones complete the revised equipment.
The first draft was refined for case construction, footprint and placement.
The English-only label is `reel-to-reel sound recorder`. The approved painting,
collection record and Tiny surprise are unchanged. All five pointer, keyboard,
resize/reset checks pass. Responsive overflow checks pass at 360, 768, 1024
and 1440 px. Full-page capture still duplicates content at half scale.
Martyna requested commit and deployment after the contextual preview and
full-page capture-limit disclosure. See the Kauaʻi dossier.

Santeuil paired-prop preview and its English-only button labels
`organ & concertina` and `locomotive & trolley` received positive user review.
The male has an open pump trolley and a fitted concertina.
A subsequent uniform-fit correction is approved for deployment: caps are
centred on the heads, while separate jacket fit groups bring the collars
forward and the lower hems back along the body curves. Original uniform
drawing details and both primary props are preserved. Martyna approved release
of these follow-ups after the contextual previews and capture-limit disclosure.
All six pointer, keyboard, resize/reset checks pass at the tested sizes.
Full-page capture remains defective. See the Santeuil dossier for the proof limit.

Santeuil is approved for release on `codex/santeuil-accessory-polish`.
Its uniforms now follow each worm's native body coordinates and motion.
The locomotives and cylinder organs have separately drawn paired construction,
with a second material/readability refinement pass. Labels, public copy and
the painted landscape are unchanged. Martyna requested commit and deployment
after the preview and disclosure of the full-page capture limitation.
Pointer, keyboard, resize/reset and overflow checks pass. Full-page screenshot
proof remains blocked by the browser capture's duplicated/half-scale output.
See the Santeuil dossier for exact checks and file scope.

Tenerife is approved for release on `codex/tenerife-accessory-polish`.
Its canary costumes and timples are redrawn and separately fitted.
The costume fit follow-up uses slim feathered mantles along the nematode
curves and removes the detached bird-torso silhouette. Timples and bowls
are unchanged by that follow-up.
Body fit and raised side-and-up wings are approved.
Avocado snack bowls replace the star lanterns. The background and collection
copy are unchanged. The English-only label `avocado snack bowls` is approved
with the contextual preview. Publication verification follows the release push.

Approved Edinburgh revision: independently fitted kilts now use an explicit waist
pivot, contained tartan, overlapping aprons, side pleats and leather sporrans.
Their motion follows each worm. Bagpipes have clearer wood and ivory fittings,
three drones per instrument and quieter stitched fabric. The telescope palette
has restrained brass, painted-metal and timber details. Background and public
copy are unchanged. The kilt revision was approved. A follow-up telescope
preview aligns the two eyepieces to the eyes, aims each barrel towards the
observatory and supports tap/Enter/Space focus-wheel movement. Body-phase
synchronization maintains contact, and reduced motion disables wheel animation.
Both revisions are approved for publication. Deployment verification is pending.

Follow-up: Salt Lake City hats and Orsay flower crowns have independently
adjusted head placement and tilt. Orsay's companion crown is smaller.
Both sets follow their worm's bobbing phase, including when enabled later.
The illustration paths, colours, backgrounds and public copy are unchanged.

The six priority sets at Nambucca Heads QG2814, Ho Chi Minh City JU4356,
Saint-Benoît JU1373, Araucanía, Dois Rios EG5612 and Kauaʻi QG130 now use
explicit material-aware SVG constructions in `accessory-refinements.js`.
Approved backgrounds, public labels and scientific copy are unchanged.
The refinement and validation record is in
[`docs/game-of-worms-six-location-refinement.md`](docs/game-of-worms-six-location-refinement.md).

## Website

- Repository: `martynazwoinska/martynazwoinska.github.io`
- Hosting: GitHub Pages from `main` and the repository root
- Stack: plain HTML, CSS, and JavaScript
- Main visual direction: restrained Art Nouveau / Pre-Raphaelite
- Primary colours: emerald, antique gold, muted violet or berry
- Display font: Cormorant Garamond
- Homepage and Cabinet light and dark themes must remain functional. The Game intentionally uses one fixed light theme, independent of the website theme preference.
- Divider terminals use a dedicated theme-aware ornament berry: warm crimson-berry in Ivory Ink and plum-violet in Petrol Ink, tying the small dividers to the painted flowers without changing the accessible interaction berry. Text selection uses a quiet berry tint in Ivory Ink and a deep plum field in Petrol Ink rather than the browser's unrelated blue, with theme-appropriate selected text colours.
- The paired Ivory Ink and Petrol Ink themes use page-matched navigation backgrounds with a fine antique-gold hairline. Petrol Ink uses the balanced blue-green `#104a52` field, with coordinated `#185b61` and `#246a6d` surfaces: warmer and more saturated than the former blue-grey Marine Ink, but less green than the superseded Deep Teal study. Ivory Ink remains unchanged because its warm `#faf8f2` field already provides the clearest complementary light treatment. Petrol Ink is the first-visit default; a visitor’s explicit light or dark choice remains stored and takes precedence. In both themes, the theme toggle keeps its 34 px interaction box and an unfiltered, solid 28 px antique-gold face without background blending or inset shading. In the compact mobile header, only the half-filled glyph reduces from 20 px to 17 px; the face retains its dimensions.
- The navigation uses the approved Z3 `MZ` monogram production artwork: a smooth, unswollen central M junction flows directly into a subtly reinforced lower sweep, giving the enlarged Z sufficient optical weight beside the M before tapering into the terminal curl. The open antique-gold upper-left curl, richly shaded berry bellflower and restrained antique-gold terminal complete the mark. Ivory Ink and Petrol Ink use separate 380 × 328 px transparent PNGs with byte-identical alpha geometry and theme-specific palettes. The Ivory Ink flower uses a restrained muted-crimson shadow, richer berry midtone and narrow rose ridge highlight; the Petrol Ink flower retains its deeper berry body, defined inner bell and underside shadows, gently lifted central petal and coloured ridge highlight without white glare. Their exact production bytes are embedded losslessly as PNG data sources because the Pages edge omitted the newly added binary paths; the committed PNGs remain the production masters. The artwork displays within a 58 × 38 px footprint, preserving the existing header height and accessible home-link name. The former separate horizontal rule after the monogram is retired so the custom mark stands on its own. The monogram remains visible in full and compact navigation from 420 px upward and is omitted only on narrower phone headers.
- The former viewport-fixed lower-right botanical frame is retired at every width. Its approved source and derivative files remain archived but unused; the hero-local compact ornament is the only active large botanical decoration.
- Homepage language options: English, Swedish, and Polish
- The Swedish homepage uses Martyna’s supplied official Swedish institutional and postal address. English retains the existing English form; Polish intentionally falls back to that English form until separate Polish wording is supplied or approved. The translated email-button label is separate.

## Parallel ownership

- `agent/site-architecture`: homepage, shared files, documentation and integration
- `agent/cabinet`: `cabinet-of-curiosities/**` only
- `agent/game-worms`: `game-of-worms/**` only
- independent QA: read-only review with no file edits

The durable workflow is documented in `docs/agent-workflow.md`. The shared layer uses prefixed `--site-*` tokens and preserves the existing `language` and `theme` storage keys. Translation dictionaries remain page-local.

## Beyond Research

Approved information architecture:

```text
Beyond Research
├── The Game of Worms
└── The Cabinet of Curiosities
```

### The Game of Worms card

- Description: `A browser game inspired by nematode biology, with creative input from my children.`
- Action: `Play →`
- Destination: `game-of-worms/index.html`
- The card includes a restrained interactive nematode preview.

### The Cabinet of Curiosities card

- Description: `Craft chocolate became another subject I got really into!`
- Action: `Explore →`
- Destination: `cabinet-of-curiosities/index.html`
- The Cacao of Excellence programme’s official 2021 `Cocoa of Excellence Flavour Wheel` is the only approved preview graphic.
- The Cabinet link and flavour-wheel button remain separate semantic controls.
- The homepage preview uses short translated accessibility names and a compact visible `CC BY-NC 4.0` source/licence link, with no written wheel instruction or full attribution caption below the graphic.

The two cards have equal visual weight, stack on mobile, retain emerald and antique-gold borders, preserve visible focus, and respect reduced motion.

## Verified implementation on `main`

- The homepage, Game of Worms, and Cabinet of Curiosities are deployed through GitHub Pages.
- The homepage hero leads with the two-line statement `From lab to code, from ideas to execution`. On desktop and tablet from 760 px upward, the full name follows as a larger, optically reinforced Cormorant Garamond identity line, with two compact sans-serif expertise lines beneath it: `Evolutionary biology · Experimental research` and `Genomics · Data analysis · Applied AI`. The statement, name and expertise share one editorial left edge. The portrait-and-copy group is shifted inward, its internal gap is reduced, and the lower-right ornament is pulled inward and slightly upward so portrait, copy and ornament read as one compact composition rather than three edge-anchored objects. The institutional affiliation is intentionally omitted from the hero because it is available in Contact and structured metadata. Swedish and Polish use the corresponding approved localized statement and expertise wording. The circular `photo.jpg` portrait retains its fine organic antique-gold and emerald frame. A central antique-gold diamond with two short hairlines closes the hero; only on wide desktop fields do those hairlines lengthen modestly, while the diamond and its 20 px breathing gap remain unchanged. Below 760 px, the portrait, statement and gold pause are omitted and one consistent centred identity lockup is used at both tablet and phone widths: the reinforced name appears on exactly three lines, followed by the expertise pyramid `Evolutionary biology · Experimental research`, then `Genomics · Data analysis`, then `Applied AI`. At 350 px and below the first pair separates for a safe four-row lockup. A dedicated one-plant, one-open-flower crescent is anchored at the far right of the expertise band, with its lower curl passing beneath `Applied AI`; it completes the lockup without becoming a separate row or increasing the hero unnecessarily. There is no separate middle-width expertise grid. The standard divider remains suppressed only above About. The full-width antique-gold rule between Research and the project subsection uses the same six-pixel diamond and 20-pixel central breathing gap as the hero pause; only the rule length differs.
- The approved hero sources remain preserved as `photo.jpg`, `assets/hero/quiet-atelier-upper-left.png`, `assets/hero/quiet-atelier-upper-left-dark.png`, `assets/hero/quiet-atelier-lower-right.png`, and `assets/hero/quiet-atelier-lower-right-dark.png`. The former lower-right tulip pair and viewport-fixed botanical frame are no longer displayed. One responsive compact ornament is used at every width. The active derivatives are `compact-crescent-harmonized-light-ivory.webp` and `compact-crescent-harmonized-dark-petrol.webp`, derived from the preserved arrow-shaped pair without changing either source's alpha geometry. Their berry-crimson and plum-violet flower and buds use one computed midpoint saturation/value map across 25,176 painted pixels: identical narrow crease depth, moderately lifted central petal, deeper inner-bell and underside shadow, and one small coloured ridge highlight without white glare. Hue provides the principal theme distinction. Stems, leaves, antique gold, geometry and full opacity remain unchanged. Below 760 px the ornament moves inward from the right edge and curls immediately beneath the centred expertise lockup; larger breakpoints use the same restrained responsive footprint, including the widest screens. The prior refined and depth pairs, unmodified arrow pair, later M23-B, earlier half-moon and B2 derivatives, the former fixed-frame assets and their transparent source masters remain preserved but unused. The portrait uses a slightly wider inset inside the existing frame to soften its crop without modifying the approved source image. Hero typography scales continuously within the compact and desktop compositions; the single deliberate structural transition remains at 760 px. Display headings use real Cormorant Garamond 700 with a subtle theme-aware optical stroke. The hero statement uses `.52px` in Ivory Ink and `.34px` in Petrol Ink; do not substitute a synthetic 800 weight.
- Homepage titles use `Martyna Zwoińska` as the primary public name in English, Swedish and Polish. Person structured data records `Katarzyna` as the additional name and includes the full, abbreviated and unaccented name forms as alternatives. Homepage metadata use the approved first-person evolutionary-biologist description in all three languages. The chatbot introduction and quotation remain visible on the page but are marked with `data-nosnippet`, so they are not eligible for Google result snippets after the page is recrawled.
- Shared theme and language-preference handling is present under `shared/`.
- The homepage footer uses the exact page background in both themes so the page remains visually continuous; its antique-gold top rule provides the only separation.
- The homepage header includes a restrained `MZ` monogram in full navigation and in compact navigation from 420 px upward; only narrower phone headers omit it. The standard floral divider introduces every full homepage section except About, which follows the hero-specific transition. Its gold and emerald stems use reinforced 1.6 and 2.9 SVG-mask strokes with modest theme-aware contrast; on phones the approved dimensions and footprint remain unchanged while a fine same-colour edge reinforcement keeps the compressed stems and botanical terminals legible. Current work alone uses a fine full-width antique-gold line with the same centred diamond and breathing gap as the hero pause because it is an internal subsection of the broader Research chapter. Research interests use an unnumbered, two-column editorial index with quiet neutral hairlines instead of static cards. Collaborators is one main section: the collaborator list and nested Students subsection share the same flat folio treatment, with one quiet antique-gold internal divider before Students. Beyond Research retains its functional card treatment. The three publication actions are text-only controls with regular rounded-rectangular outlines and no elevation. Contact is a flat composition without an outer card or shadow; its functional actions retain one fixed asymmetric two-column grid on standard phones, one column on the narrowest screens, and a complete set of matching antique-gold line icons. The chatbot introduction and quotation use the original editorial flow, with a fine gold rule beside the quotation, and the footer contains only the copyright name line.
- Explicit homepage and Cabinet theme choices update their browser `theme-color` metadata. Without a stored preference, Petrol Ink is applied as the deliberate homepage default rather than following the operating-system theme.
- Homepage behaviour and translations are separated into `home.js` and `home-i18n.js`. On wider screens, Contact uses one compact grid: the address and 540 px action matrix form the editorial column, while the 184 px Uppsala photograph sits 32 px beside it as a secondary place-emblem. The photograph is no longer absolutely anchored to a distant section edge. Its established 194 px centred mobile placement remains unchanged.
- The Game does not load shared theme tokens or preferences. Its one light palette, browser colour and module cache keys remain independent after navigating from either homepage theme; obsolete dark-only Game CSS overrides have been removed.
- The Game's six-species introduction includes an accessible information dialog explaining mostly selfing and outcrossing in plain language and the three independent origins of selfing. The explanatory sentence sits beneath `Meet the species`, followed in the same reading path by a compact asymmetric teal `Meet the whole family →` plaque with an antique-gold arrow. On wide screens the sentence and plaque share one supporting row; narrower layouts retain the approved stacked mobile placement. The dialog uses one clear title without an eyebrow or kicker that repeats it; future Game interfaces should likewise avoid redundant micro-headings. A subtle bracket marks the Elegans group. Its data-driven SVG renders the 70-species phylogeny from Rockman et al. (2025 preprint), highlights the six species used in the game, and separately notes the peer-reviewed count of 86 known *Caenorhabditis* species from Fusca et al. (2025). After all six species have been deliberately selected, the existing discovery counter becomes an accessible globe button with one compact `6/6` badge; it opens the same family dialog, where a single original six-worm globe illustration marks completion without adding another heading. The Game remains intentionally English-only.
- The Game's `Listen` control uses the visitor's installed English speech voices as an interim narration layer. It ranks recognised female voices first, favours natural or enhanced voices and British English, and reads each location as one continuous passage at near-normal speed. Pause, resume, cancellation and the screen-reader status remain available; browsers without speech synthesis keep the existing unavailable state.
- Each worm’s copy of a Game of Worms accessory can be repositioned independently. There is no separate worm-target selector: visitors switch an accessory on, then drag its visible copy directly. Keyboard users focus that same visible object, move it with the arrow keys, and press Home to reset it. Positions remain separate for each worm, species, and location during the session. The random `Surprise me` control has been removed.
- The Game retains 32 explicit, source-backed regional landscape profiles and matching scene compositions; 31 locations are active. There is no generic environment fallback.
- Bristol N2 uses the optimized painted background `game-of-worms/assets/n2-bristol-painted-background.webp`, derived from the preserved source PNG under `game-of-worms/assets/source/`. The compost-filled urban garden dominates the foreground; unequal wooded and limestone gorge faces frame a restrained River Avon; and the Clifton Suspension Bridge is the only strong Bristol landmark. Generic terrace symbols are intentionally omitted. The animated worms and all eight independently movable N2 accessories remain live SVG layers above the painting.
- Ishigaki uses the optimized painted background `game-of-worms/assets/ishigaki-reef-painted-background.webp`, derived from the preserved source PNG under `game-of-worms/assets/source/`. Fresh attached *Ficus septica* figs and an opened syconium dominate the foreground as the documented microhabitat; subtropical vegetation frames a distant reef as wider Ishigaki context. Its accessory set is `fig UV visors`, `field specimen baskets`, and `fig-wasp wings`, drawn as six separately constructed movable objects. The visor carries a small fig medallion, the basket holds fresh and cut figs, and the paired wings use individual wing panels, venation and a fitted harness on each worm. The animated worms and all six independently movable Ishigaki accessories remain live SVG layers above the painting.
- Ahmedabad AF16 uses the optimized painted background `game-of-worms/assets/ahmedabad-pol-painted-background.webp`, derived from the preserved source PNG under `game-of-worms/assets/source/`. A dry soil patch preserves the documented collection material; unequal carved pol façades, deep lane shade, one chabutro and a narrow Sabarmati opening provide explicitly regional context. The animated worms and all six independently movable Ahmedabad accessories remain live SVG layers above the painting.
- Barro Colorado QG2726 uses the optimized painted background `game-of-worms/assets/barro-colorado-painted-background.webp`, derived from the preserved source PNG under `game-of-worms/assets/source/`. A low forest-floor view centres the documented six-position experimental *Gustavia superba* slurry-bait array beneath an unequal buttress and closed lowland canopy; lake, canal, dock and ship imagery is intentionally excluded. Its accessory set is `Gustavia flower headpiece`, `Golden Fleece cape`, and `forest-census map fans`; the broad seven-leaf primary and asymmetric four-blade companion fans use separate silhouettes and treat the `50 HA` map-and-tree language as a playful research reference rather than collection apparatus or reconstructed plot data. The animated worms and all six independently movable QG2726 accessories remain live SVG layers above the painting.
- Sanda JU1873 uses the optimized painted background `game-of-worms/assets/sanda-ju1873-painted-background.webp`, derived from the preserved source PNG under `game-of-worms/assets/source/`. A close plantation-floor view centres the documented rotting cacao fruit between unequal cauliflorous cacao trunks; only a narrow mist-softened Pupuan ridge gap is used as regional context. Unsupported terraces, rain, coffee and generic Bali decoration are intentionally excluded. The animated female and male worms and all six independently movable JU1873 accessories remain live SVG layers above the painting.
- La Selva QG3845 is retired from the playable atlas. Its research dossier, optimized painting and source artwork remain preserved for provenance, but its location record, map marker, environment profile, composition, renderer and accessory set are no longer loaded.
- Guadeloupe NIC203 uses the optimized painted background `game-of-worms/assets/guadeloupe-nic203-painted-background.webp`, derived from the preserved source PNG under `game-of-worms/assets/source/`. One softened torch-ginger flower anchors a humid forest-floor trail, while the Third Carbet Fall remains a narrow subordinate site cue. Unsupported Soufrière, fumarole and aquatic-sample imagery is intentionally excluded. The animated worms and all six independently movable NIC203 accessories remain live SVG layers above the painting.
- Oʻahu ECA789 uses the optimized painted background `game-of-worms/assets/oahu-eca789-painted-background.webp`, derived from the preserved source PNG under `game-of-worms/assets/source/`. The scene is now a close oblique macro still life: huge rain-softened anonymous petals sweep in from the right around wet ground, while pale bark ribbons cross the upper-left. It contains no trail corridor, horizon, complete radial flower or species claim. Its playful Mānoa rain-orchestra set is `petal rain trumpets`, `raindrop harps`, and `cacao-key xylophones`; every companion version has separately drawn construction. The cacao instrument is an Oʻahu-wide craft reference without producer branding and does not identify the collection flower. The animated worms and all six independently movable ECA789 accessories remain live SVG layers above the painting.
- Kauaʻi QG131 is retired from the active *C. tropicalis* location list so that Hawaiʻi is represented by one location for each of three species and by both Kauaʻi and Oʻahu. Its source-backed dossier, scene code and existing assets remain preserved for provenance rather than displayed as a second *C. tropicalis* record.
- New Taipei NIC1648 uses the optimized painted background `game-of-worms/assets/new-taipei-nic1648-painted-background.webp`, derived from the preserved source PNG under `game-of-worms/assets/source/`. Small anonymous fig forms are divided between a broad concrete tread and adjacent leaf litter within one enclosed zig-zag forest stair corridor. Yehliu coast, hoodoos, waterfall, temple, skyline and evidence from other New Taipei strains are intentionally excluded. Its playful accessory set is `Taiwan blue-magpie kites`, `single-tail rain boots`, and `bubble-tea jetpacks`. The hermaphrodite wears one flexible coral rubber boot-sock whose upper follows the tail's own U-shaped Bézier curve and finishes in a small blended reinforced toe with a short aqua outsole only beneath the free tip; the smaller male receives a separately constructed indigo boot-sock traced to his shorter tail curve, with its own muted reinforced toe and short gold outsole. Both use narrow body-coloured cuffs and sparse seams, without rigid shafts, full-length soles or pull loops. The geometric diamond and six-sided kites use visible spars, bridles, flying lines, ribbon tails and blue-magpie motifs so their kite construction reads before their decoration. The slightly enlarged drink-powered packs remain strapped to each body. All three concepts are explicitly Taiwan-wide fantasy references rather than collection evidence. The animated worms and all six independently movable NIC1648 accessories remain live SVG layers above the painting.
- Mahahual JU2617 uses the optimized painted background `game-of-worms/assets/mahahual-ju2617-painted-background.webp`, derived from the preserved source PNG under `game-of-worms/assets/source/`. A dominant terrestrial heap of collapsed oranges anchors the documented rural-garden microhabitat; coastal scrub, a narrow Caribbean horizon and one tiny Mahahual lighthouse remain subordinate regional context. The obsolete underwater reef, seagrass and mangrove-root treatment is retired. Its beach-ensemble accessory set is `reef-ruffle swim costumes`, `Caribbean sun spectacles`, and `sea-grape beach parasols`, all explicitly playful regional fantasy rather than collection equipment. The animated worms and all six independently movable accessories remain live SVG layers above the painting.
- Mauritius JU2909 uses the optimized painted background `game-of-worms/assets/mauritius-ju2909-painted-background.webp`, derived from the preserved source PNG under `game-of-worms/assets/source/`. One anonymous split oval fruit and its large woody nut anchor the documented Casela ground microhabitat; an S-curving planted path and one Rempart Mountain tooth remain regional context. The unrelated Le Morne lagoon, reef, sandbar and cane treatment is retired. Its playful Mauritius accessory set is `wriggle-powered ravanne drums`, `Vacoas fruit-gathering tail baskets`, and `dodo-beak fruit grabbers`. The six separately constructed production objects include shallow skinned drum frames with worm-powered beaters, open woven tail scoops and collar-mounted articulated beaks. The animated worms and all six independently movable JU2909 accessories remain live SVG layers above the painting.
- Ho Chi Minh City JU4356 uses the optimized painted background `game-of-worms/assets/hcmc-ju4356-painted-background.webp`, derived from the preserved source PNG under `game-of-worms/assets/source/`. One softened five-rib carambola anchors the documented anonymous urban-garden ground microhabitat beneath a forked trunk and shallow-V path split; only a narrow generic roof slit appears as city context. The unrelated Cần Giờ mangrove, saltpan, tidal-water and rain treatment is retired. The animated worms and all six independently movable JU4356 accessories remain live SVG layers above the painting.
- Lombok HPT26 uses the optimized painted background `game-of-worms/assets/lombok-hpt26-painted-background.webp`, derived from the preserved source PNG under `game-of-worms/assets/source/`. Three unequal softened Ficus fruits anchor the documented Lingsar ground sample at the restrained forest/cultivation edge; only a tiny distant volcanic shoulder remains as regional context. The unsupported Rinjani caldera, crater lake and cone scene is retired. The animated worms and all six independently movable HPT26 accessories remain live SVG layers above the painting. Its revised accessories are fitted spring collars, split Ficus fruits and translucent spring-water currents. Primary and companion objects are separately drawn. Worn pieces follow body motion, and all six preserve independent dragging, keyboard movement and reset.
- Salt Lake City EG4181 replaces Taipei BRC20390 in the active *C. briggsae* set. It uses `game-of-worms/assets/salt-lake-eg4181-painted-background.jpg`, derived from the preserved source PNG under `game-of-worms/assets/source/`. The scene stays low beneath a mature apricot tree, with one split rotten apricot as the documented substrate, an anonymised fence and only a narrow Wasatch foothill opening; it does not reconstruct the private home. Its refined regional accessory set is `apricot blossom hats`, `beehive saddle packs`, and `single-tail mountain skis`. The hats now use structured felt brims, orchard branches, layered blossoms and tiny apricot fruit; the saddle packs use dimensional wicker ribs, coloured honeycomb insets, leather harnessing and distinct cloth layers; and the skis use snow-coloured decks, contrasting sidewalls, bindings and upturned tips fitted separately to the hermaphrodite and male tails. The animated worms and all six independently movable accessories remain live SVG layers above the painting.
- Kauaʻi QG130 uses the optimized painted background `game-of-worms/assets/kauai-qg130-painted-background.webp`, derived from the preserved source PNG under `game-of-worms/assets/source/`. A near-top-down under-root chamber replaces the former ground-level forest vista: one massive wet root encloses a black-soil basin, two shallow reflective puddles and a partly concealed anonymous softened plant-material patch. There is no path, horizon or central light opening. Its under-root forest-fair set is `kukui-shell glow carts`, `root-loop carousel rides`, and `three-worm ribbon hoops`, with separate primary and companion construction. The animated worms and all six independently movable accessories remain live SVG layers above the painting.
- Réunion JU1375 uses the optimized painted background `game-of-worms/assets/reunion-ju1375-painted-background.webp`, derived from the preserved source PNG under `game-of-worms/assets/source/`. A damp agricultural edge at 123 m and one subordinate generic shell replace unsupported sugar-cane rows, basalt display and dramatic volcanic-ridge reconstruction. The mollusk species, crop and weather remain explicitly unasserted. Its approved replacement set is `vanilla vine wraps`, `sugarcane juice`, and `Bourbon green gecko companions`, drawn as six separately constructed movable objects and bounded as wider Réunion fantasy references rather than collection equipment or substrate claims.
- Orsay JU2518 uses the optimized painted background `game-of-worms/assets/orsay-ju2518-painted-background.webp`, derived from the preserved source PNG under `game-of-worms/assets/source/`. One partly decayed apple anchors the documented rural-garden substrate beside an early-autumn passage; the unsupported pond, reeds and reconstructed Yvette-water view are retired. Its approved accessory set replaces the former specimen boxes, association cards and rectangular field notebooks with pressed-flower crowns, apple field satchels and dated notebook-and-pencil harnesses. The animated worms and all six independently movable accessories remain live SVG layers above the painting.
- Dois Rios EG5612 uses the optimized painted background `game-of-worms/assets/dois-rios-eg5612-painted-background.webp`, derived from the preserved source PNG under `game-of-worms/assets/source/`. The visible locality is corrected from broad Angra dos Reis to the documented site near Dois Rios, Ilha Grande. One split rotten jackfruit anchors a low Atlantic Forest corridor; the unsupported cove, water, mangrove and island scene is retired. The animated worms and all six independently movable provenance- and test-cross-led accessories remain live SVG layers above the painting.
- Nambucca Heads QG2814 uses the optimized painted background `game-of-worms/assets/nambucca-qg2814-painted-background.webp`, derived from the preserved source PNG under `game-of-worms/assets/source/`. Three anonymous collapsed flowers anchor the documented rainforest garden behind Marcel Towers, while the tower remains a narrow subordinate site cue. The unsupported estuary, banksia and eucalyptus scene is retired. The animated worms and all six independently movable collection-, founding- and 18S-led accessories remain live SVG layers above the painting.
- Trivandrum JU1325 uses the optimized painted background `game-of-worms/assets/trivandrum-ju1325-painted-background.webp`, derived from the preserved source PNG under `game-of-worms/assets/source/`. An irregular damp patch of anonymous decomposing leaves and wilted flowers anchors the documented collection substrate; the connected wooded-lake edge, rising garden path, unequal planted terraces, golden bamboo and partly screened museum roof remain subordinate campus context. Its display layer expands the complete painting slightly in height to fill the 600 × 430 habitat without pale bands or cropped edges. The original custom SVG scene is retained only as an asset-load fallback. The animated female and male worms and all six independently movable Trivandrum accessories remain live SVG layers above the painting.
- Santeuil JU1925 uses the optimized painted background `game-of-worms/assets/santeuil-ju1925-painted-background.webp`, derived from the preserved source PNG under `game-of-worms/assets/source/`. A broken, hollow, decomposing common-hogweed stem anchors the wet wooded-stream bank; a restrained railway crossing, compact village, Saint-Pierre-Saint-Paul church silhouette and Vexin plateau remain wider regional context. The original custom SVG scene is retained only as an asset-load fallback. The animated worms and all six independently movable Santeuil accessories remain live SVG layers above the painting.
- Tenerife NIC1787 uses the optimized painted background `game-of-worms/assets/tenerife-nic1787-painted-background.webp`, derived from the preserved source PNG under `game-of-worms/assets/source/`. One collapsed, split and visibly decayed avocado anchors the exact representative substrate in damp garden litter; a massive asymmetric *Ficus* root colonnade, unequal historic beds and paths, the old reservoir, garden wall, Orotava slope and tiny screened Teide notch remain wider Puerto de la Cruz botanical-garden context. The original custom SVG scene is retained only as an asset-load fallback. The animated worms and all six independently movable Tenerife accessories remain live SVG layers above the painting.
- Kauaʻi XZ1516 uses the optimized painted background `game-of-worms/assets/kauai-xz1516-painted-background.webp`, derived from the preserved source PNG under `game-of-worms/assets/source/`. A steep side-on cloud-forest ledge replaces the former central path: rust-red volcanic shelves, a diagonal silver-lichen trunk and fog-filled upper-left opening create a strongly vertical 983 m composition. The small anonymous fibrous substrate fragment is tucked beneath the right shelf. Its Kōkeʻe forest-radio set is `forest-bird listening headphones`, `ʻōhiʻa blossom microphones`, and `genome tuning wheels`; the first two are wider regional fantasy references, while the third playfully reflects XZ1516's documented divergence. The animated worms and all six independently movable XZ1516 accessories remain live SVG layers above the painting.
- Australian Capital Territory QG2811 uses the optimized painted background `game-of-worms/assets/act-qg2811-painted-background.webp`, derived from the preserved source PNG under `game-of-worms/assets/source/`. Two differently collapsed rotting figs anchor the exact O'Connor urban-garden substrate in one curved litter patch; unequal edging, stepping stones and anonymous dry plantings establish a non-identifiable backyard, while one open Yellow Box-like crown, low O'Connor Ridge woodland and a hairline Black Mountain tower remain neighbourhood context. The old Lake Burley Griffin and field-quadrat treatment is retired. Its playful Canberra-morning accessory set is `Flat white`, `Balloon carriages`, and `Cockatoo café raids`: a glazed flat-white cup paired with a separate hand grinder; two differently constructed panelled balloons with burners, cables and woven baskets; and side- and front-facing sulphur-crested cockatoo scenes with distinct café props. These are bounded regional or urban-garden references, not collection equipment or claims about the private collection site. The original custom SVG scene is retained only as an asset-load fallback. The animated worms and all six independently movable QG2811 accessories remain live SVG layers above the painting.
- Claremont ECA250 replaces Auckland ECA36 in the active *C. elegans* set. It uses `game-of-worms/assets/claremont-eca250-painted-background.jpg`, derived from the preserved source PNG under `game-of-worms/assets/source/`. An elevated three-quarter view across rain-darkened terracotta tiles separates this location from the low garden-floor scenes; one decaying mushroom cluster and broken pot anchor the historical record, while citrus, bougainvillea, stucco and a narrow foothill opening remain restrained Claremont context rather than a reconstruction. Its cohesive California garden-reading accessory set is `Bookworm books`, `California lemonade`, and `sunny reading glasses`. The set combines a literal bookworm joke and Claremont's college-town identity with playful warm-weather garden details, without implying collection equipment or repeating generic hats, bags or vehicles. Primary and companion objects use separately drawn silhouettes and construction details. The animated worms and all six independently movable accessories remain live SVG layers above the painting.
- Araucanía JU4400 uses the optimized painted background `game-of-worms/assets/araucania-ju4400-painted-background.webp`, derived from the preserved source PNG under `game-of-worms/assets/source/`. One off-centre irregular compost crescent anchors the exact rural-garden substrate through layered anonymous vegetal decomposition and dark soil; a receding worn path, low diagonal weathered fence, unequal generic beds and restrained shelterbelt establish anonymised garden depth, while gentle terrain and a tiny cloud-softened two-summit Llaima cue remain regional orientation only. The old reflective lake, dominant snow cone and foreground araucaria treatment remain retired. The original custom SVG scene is retained only as an asset-load fallback. The animated worms and all six independently movable JU4400 accessories remain live SVG layers above the painting.
- Praslin YR106 uses the optimized painted background `game-of-worms/assets/praslin-yr106-painted-background.webp`, derived from the preserved source PNG under `game-of-worms/assets/source/`. Intact palm litter, exposed pink-grey granite, an irregular fractured slab and a narrow diagonal boulder-choked drainage thread establish explicitly regional forest-floor context without inventing a sample substrate. Unequal rooted fan palms, a stilt palm, Pandanus-like growth, concave forest depth and a closed humid ridge form a continuous Praslin palm-forest vault with no collection-site claim. The old Vallée de Mai title and sea opening remain retired. Its playful regional accessory set is `giant-tortoise shell costumes`, `black-parrot carnival caps`, and `Seychelles carnival bell bracelets`; the bracelets are imaginative carnival rhythm accessories rather than authentic local dress. The original custom SVG scene is retained only as an asset-load fallback. The animated worms and all six independently movable YR106 accessories remain live SVG layers above the painting.
- São Tomé JU2484 uses the optimized painted background `game-of-worms/assets/sao-tome-ju2484-painted-background.webp`, derived from the preserved source PNG under `game-of-worms/assets/source/`. One taxonomically anonymous collapsed rotten fruit anchors the exact ground substrate in layered litter; an off-centre forked tree base, unequal fern and liana layers, one living asymmetric São Tomé begonia-like regional cue and a single diffuse canopy opening create an enclosed altitude-neutral forest. The old cacao, volcanic needle, waterfall, coast, islet and stream treatment remains retired. The approved accessory set is `São Tomé chocolate bars`, `birdsong music boxes`, and `begonia stained-glass parasols`, rendered as six non-identical movable objects in distinct cacao-and-copper, blue-lacquer-and-rose, and aqua-violet-glass palettes. These are playful island-wide or regional references, not claims about the JU2484 collection substrate, equipment or exact forest locality. The original custom SVG scene is retained only as an asset-load fallback.
- Pohnpei QG4739 uses the optimized painted background `game-of-worms/assets/pohnpei-qg4739-painted-background.webp`, derived from the preserved source PNG under `game-of-worms/assets/source/`. One modest softened kotop-fruit sample sits in damp litter inside the open root lattice of a pale ringed palm; a long pinnate frond, strong rising floor diagonal, layered trunks, thin habitat-context mist and one narrow high light slit establish the recorded Paies cloudforest without reconstructing the source tree or collection-day weather. Its playful accessory set is `Kotop-fruit parasols`, `Peppercorn rollerboards`, and `Cloudforest rain-leaf sleds`. The parasols reference the recorded kotop substrate without claiming the sample's exact appearance, the rollerboards use a wider Pohnpei black-pepper reference, and the sleds use unidentified folded cloudforest leaves. The unrelated Nan Madol, basalt, coral, mangrove, lagoon, waterfall and island-panorama treatment remains retired. The original custom SVG scene is retained only as an asset-load fallback. The animated worms and all six independently movable QG4739 accessories remain live SVG layers above the painting.
- Queensland QG2904 uses the optimized painted background `game-of-worms/assets/queensland-qg2904-painted-background.webp`, derived from the preserved source PNG under `game-of-worms/assets/source/`. One long, fully sealed blackbean-like pod lies diagonally in damp litter beneath two unequal buttress fins; irregular lowland-rainforest layers enclose the scene, while only a hairline fragment of the Daintree Rainforest Observatory canopy crane appears behind foliage through a narrow upper-right aperture. Its playful accessory set is `Sealed-pod drums`, `Funnel megaphones`, and `Canopy kaleidoscopes`. The drums retain the pod's closed seam, the megaphones refer to the recorded funnel-plating step, and the kaleidoscopes use the observatory's canopy research as wider place context. The old beach, reef, mangrove, fan-palm and forest-to-coast treatment remains retired. The original custom SVG scene is retained only as an asset-load fallback. The animated worms and all six independently movable QG2904 accessories remain live SVG layers above the painting.
- Saint-Benoît JU1373 uses the optimized painted background `game-of-worms/assets/reunion-ju1373-painted-background.webp`, derived from the preserved source PNG under `game-of-worms/assets/source/`. One softened collapsed torch-ginger inflorescence anchors dark agricultural litter beneath two unequal ginger-leaf clusters and an enormous diagonal leaf; dense anonymous farm-fringe vegetation screens all but one narrow cloud-softened glimpse of a rounded windward upland shoulder. The old cirque, lava, piton and generic volcanic-island treatment remains retired. The original custom SVG scene is retained only as an asset-load fallback. The animated worms and all six independently movable JU1373 accessories remain live SVG layers above the painting.
- Manaus JU1976 is retired from the playable atlas. Its research dossier, optimized painting and source artwork remain preserved for provenance, but its location record, map marker, environment profile, composition, renderer and accessory set are no longer loaded.
- The Game discovery counter starts at zero. The default Bristol N2 preview is not treated as a meeting; a species enters the six-species visited set only after an explicit species-tab or map-marker selection.
- The Game has 31 active explicit three-item accessory sets plus a fourth Bristol N2 accessory: 94 named designs in total. No accessory family is used more than twice, paired objects have visibly different geometry, and no emoji or species-level costume fallback remains. N2 keeps its agar plate with bacteria, fitted lab coat, cryo-vial jetpack and lab goggles.
- `docs/game-of-worms-art-catalogue.md` is the durable illustration catalogue for landscape evidence, composition locks, and accessory concepts. Clothing and props are playful geography-, ecology-, collection-, or research-derived designs, not claims of authentic local dress.
- `docs/game-of-worms-accessory-quality-standard.md` is the mandatory production gate for all new and revised accessories, costumes and paired props. Passing uniqueness and geometry audits is not visual approval: each object must read without its label at the default in-page size, show coherent material construction, use genuinely distinct paired geometry, fit its worm deliberately and complete a critical refinement pass before contextual approval.
- All thirty-one active locations use dedicated evidence-led optimized painted backgrounds, each with a separately preserved source PNG, an asset-load SVG fallback, live animated worms and at least six bespoke independently movable SVG objects; Bristol N2 has eight. The earlier QG131, QG3845 and JU1976 dossiers and assets remain preserved. Painted backgrounds use a complete-image fit inside the fixed 600 × 430 habitat geometry; approved source artwork is not enlarged on hover.
- Freestyle drawing uses an invisible 600 × 430 overlay covering the complete habitat. It has no visible boundary and leaves the scene labels above the drawing surface.
- `docs/game-of-worms-location-research/` contains one evidence-boundary, illustration-contract and interaction-acceptance dossier for each current or preserved historical location.
- Each landscape retains an internal evidence note and primary or official source link in the Game data/catalogue; these provenance notes are not displayed as a `Place clues` block on the public Game page. The landscape is clearly described internally as wider regional context rather than the exact microscopic collection substrate.
- The Cabinet uses separate HTML, CSS, JavaScript, translation, and data files.
- The Cabinet presents the authentic photographed object board inside an extended fantasy surround.
- On phones held vertically, the Cabinet asks the visitor to turn the device sideways; the interactive board is presented in landscape orientation.
- On coarse-pointer phones held sideways, the Cabinet scene supports one-finger panning, two-finger pinch zoom, visible zoom/reset controls and keyboard equivalents. The authentic scene and its percentage-based hotspot overlay share one transform, so markers remain aligned while the visitor moves or scales the view.
- The board has percentage-based responsive hotspots for 35 chocolate packages, two crocheted eyes, and the S-Foodies sticker.
- A browseable collection index and reusable accessible object-detail dialog are implemented.
- The Cacao of Excellence programme’s 2021 `Cocoa of Excellence Flavour Wheel` opens in a separate accessible dialog with source and licence attribution.
- The long crocheted worm, blue crocheted octopus, and surrounding decoration remain non-interactive.
- No temporary deployment workflow remains under `.github/workflows/`.

## Cabinet source images

Approved stylised source image:

```text
cabinet-of-curiosities/assets/cabinet-of-curiosities.png
```

Untouched original photograph:

```text
cabinet-of-curiosities/assets/cabinet-original-photo.jpg
```

Do not overwrite or confuse these files. The original photograph is the source of truth for wrapper identities, wrapper text, and object placement. Live composite derivatives must preserve the authentic photographed board and extend only the surrounding fantasy setting.

## Confirmed chocolate information

- Storm & Bille: Uganda chilli bar, 70%.
- Raaka: Tanzania, 100%.
- Vigdis Rosenkilde: Echarate, 80%.
- Kamm: Ecuador, 85%.
- Luisa Abram: Rio Juruá, 70%.
- Paradai: Nakhon Si Thammarat Red Pod, 70%; EU distributor:
  `https://premifair.com/products/paradai-schokolade-nakhon-si-thammarat-red-pod-70-thailand`
- Paradai: Chanthaburi, 70%; EU distributor:
  `https://premifair.com/products/paradai-chanthaburi-70`
- Malmö Chokladfabrik: Sambirano, Madagascar, 70%; the central rectangular wrapper showing the chocolate-making process.
- Friis-Holm Indio Rojo, Medagla, Johe, and La Dalia mini bars: 70%. They share:
  `https://friisholmchokolade.dk/products/bag-mix-12-x-5-g`
- Taza: the circular package, not the Malmö Chokladfabrik wrapper.
- Zotter Labooko White: the small pale wrapper on the right, not Omnom.
- Chocolate Naive: Xocoatl.

All chocolate identities currently recorded in `cabinet-of-curiosities/cabinet-data.js` were confirmed by the user, most recently on 2026-08-26. The Friis-Holm bars link to the official mixed mini-bars collection.

## Crochet eyes

Both crocheted eyes use the confirmed Blooming Eye Crochet Pattern:

```text
https://www.etsy.com/listing/4342094945/blooming-eye-crochet-pattern-pdf
```

The Etsy pattern is the only external link planned for these objects.

## Current follow-up work

1. Preserve all 36 evidence-backed location dossiers and archived landscapes; maintain the three bespoke accessory pairs for each of the 31 active locations.
2. Enforce `docs/game-of-worms-accessory-quality-standard.md` for every new or revised pair. Treat catalogue uniqueness as a structural check, not proof of visual quality; reject weak first renders before approval rather than scheduling avoidable redraws after deployment.
3. Keep the maximum-two accessory-family rule and N2’s four approved concepts. If a family is used twice, the two location designs must differ in material, outline, proportions and internal construction.
4. Re-run direct pointer and keyboard movement checks independently for both worm copies after any future location or accessory revision.
5. Keep `game-of-worms/` unchanged during Cabinet-only work.
