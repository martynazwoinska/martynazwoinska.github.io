# PROJECT_STATUS.md

Last updated: 2026-09-23

This file records approved decisions and the verified implementation state. Always inspect the current repository before acting.

For the next Game scene, start with the
[scene review checklist](docs/game-of-worms-scene-review-queue.md).
It tracks all 31 active scenes: 0 left to check in the current interaction
pass and 31 completed, including Mauritius JU2909, Guadeloupe NIC203, New Taipei NIC1648 and Réunion JU1375.
Do not repeat whole-atlas visual reviews. Check the next queued scene and update
its entry. "To check" is not a judgement that a scene needs a redesign.

## Four focused scene motion improvements, 2026-09-23

Martyna requested implementation and deployment of the four shortlisted scenes.
Araucanía's wheelbarrow and fork now sit lower; tipping pivots around the wheel,
the larger worm bends toward the handles, and the male boards before the cart
rolls. The wheel rotation follows travel, the shadow follows the cart, and soil
falls toward the ground. Dois Rios adds planted body bends to the duet and a
delayed recoil when sticky fruit releases. Its music controller now selects only
the two actual accessory pieces, preventing a duplicate primary-worm actor and
incorrect face layering after the action.

Saint-Benoît adds reaching and body movement. Its completed bouquet stays through
other prop actions, resizing and temporary page hiding; another flower tap resets
it. Bristol N2 adds plate lifting with supporting hands, mouth pumping and one
consumed colony per tap. The two plates track portions separately; tapping an
empty plate refills it. Reduced motion changes the portion without an animation.
All temporary body paths, costume wrappers and prop transforms restore exactly.
Existing artwork, labels, sounds, cryopack actions and saved visitor adjustments
are retained. No public copy or theme changes.

Validation: check-four-scenes-motion, check-araucania-garden, check-dois-rios,
check-reunion, check-n2-cryo-flight and check-n2-tailoring --n2-only pass. The
unscoped legacy tailoring test's catalogue-wide mock fails on an unrelated
JU1375 attribute selector; the new flag permits the complete Bristol-only checks
without that older atlas-wide audit. In-browser review covered each action,
body/face restoration, repeated feeding and refill, Escape cancellation before
consumption, pointer and keyboard activation, adjusted plate size/position,
bouquet persistence/reset and cryopack completion. No console errors or horizontal
overflow at 360, 768, 1024 and 1440 CSS px. The Game retains its fixed light palette.

Uncropped full-page screenshots were attempted at each width: 345x2255,
753x2211, 1009x1896 and 1425x1865 image px (scrollbars account for 15 px).
The capture tool still scales the page and duplicates strips. Clean viewport
views and DOM measurements were inspected, but these captures are not valid
full-page visual proof. Physical touch-device and manual listening checks remain
unavailable; no audio was changed. Reduced-motion paths were tested in code.

Created: game-of-worms/scene-body-motion.js, game-of-worms/n2-feeding.js and
scripts/check-four-scenes-motion.cjs. Changed: game-of-worms/accessory-designs.js,
araucania-art.js, araucania-play.js, dois-rios-play.js, reunion-play.js, game.js,
index.html; scripts/check-araucania-garden.cjs, scripts/check-n2-tailoring.cjs;
this file and docs/game-of-worms-scene-review-queue.md. No files deleted.
Unrelated Cabinet checkout changes were preserved.

## Trivandrum plate-triggered persistent examination, 2026-09-22

Only the male's Petri plate starts the female's sample-transfer sequence.
Tapping the tube does not start or cancel it. The examination pose now stays
raised indefinitely; another plate tap returns the setup over 900 ms. Once held,
the male loupe can independently lower and rise on successive taps without
moving the plate or replaying the transfer. Tube/loupe inspection and adjustment
remain available. Resizing and temporarily hiding the page no longer reset the
held sample pose. Escape, Home, changing activities and scene cleanup still work.
No artwork, labels, sounds or gem mounting points changed.

Verified tube taps stay idle, plate taps start/return, holding beyond the old
timeout, glass-centre loupe taps leave the plate transform unchanged, keyboard
activation, repeated runs and resize persistence. In a separate local-origin
save, moving the female loupe over the gem inside the female tube revealed the
gem while the sample sequence stayed idle. Sample timing/trigger/return,
watering, live-loupe and loupe-blink checks pass, including reduced-motion logic.
No console errors or overflow at 360/768/1024/1440 CSS px. Full-page captures
were attempted at each width (268x1808, 582x1682, 778x1381, 1098x1434 image px);
the capture tool still scales and duplicates strips, so clean full-page visual
proof and physical touch-device testing remain unavailable. The fixed light
palette and layout are unchanged. git diff --check passes.

Changed game.js, index.html, trivandrum-samples.js, trivandrum-watering.js,
scripts/check-trivandrum-samples.cjs and PROJECT_STATUS.md. No production files
created or deleted. Unrelated Cabinet checkout changes were preserved.

## Shorter Worm Atlas header, 2026-09-22

The desktop title now shares the unused centre of the top navigation row,
reducing the header by 42 px at 1440 CSS px and about 36 px at tablet widths.
The title remains centred and keeps its font size. Species boxes retain their
dimensions. Mobile keeps two rows, with 6 px less vertical spacing. The family
link and species choices move up with the shorter header. No public copy,
illustrations, scene animations or theme behaviour changed.

Checked 360/768/1024/1440 CSS px: no horizontal overflow or header overlaps.
Family and treasure dialogs open with Enter, close with Escape and return focus
to their triggers. No browser console errors. Full-page captures measured
345x2479, 753x2109, 1009x1896 and 1425x1864 px, respectively. The browser capture
tool still produces half-scale duplicate strips, so these are not clean visual
proofs; header geometry and control operation were checked directly in-browser.
The Game intentionally keeps its fixed light palette. git diff --check passes.

Changed game-of-worms/style.css, game-of-worms/index.html and PROJECT_STATUS.md.
No production files created or deleted.

## Trivandrum glass click-through correction, 2026-09-22

The previous handle-focused checks missed a centre-of-glass failure. Reproduced
on the live bbe5508 scene with all three accessories: clicking the male optical
window focused Samples for the male and changed examining to settling, restarting
the handoff. Added a transparent elliptical pointer surface above each optical
window. The surface follows the glass dimensions, moves with the loupe and is
removed on unmount. Artwork, magnification, labels and the gem's female-tube
mounting point are unchanged.

Verified the same glass-centre click now focuses Field loupe for the male and
keeps examining. Tested repeated centre clicks at 360 px, both glasses and glass
dragging at 1440 px, with all accessories enabled. Live-loupe regression coverage
now checks separate hit geometry, pointer capture surface and cleanup. Existing
sample and loupe-blink checks pass. No browser errors or horizontal overflow at
360/768/1024/1440 CSS px. Full-page captures were attempted at each size, producing
345x2357, 753x2222, 1009x1836 and 1425x1907 px images; the browser capture tool
introduced half-scale duplicate strips, so these are not clean visual proofs.
No visible design changed. Physical touch-device testing remains manual.

Changed live-loupes.js, game.js, index.html, scripts/check-live-loupes.cjs and
PROJECT_STATUS.md. No production files created or deleted.

## Trivandrum loupe interaction fix, 2026-09-22

Clicking either loupe during the sample activity no longer cancels it. Pointer
movement, keyboard movement and loupe resizing continue while the dish is held.
Tiny pointer movements remain taps. Cleanup restores only animation-owned CSS
properties, preserving the visitor's updated position and size. Escape and Home
still stop the activity; switching scenes/accessories retains normal cleanup.
No art or public wording changed. Four Game files changed: game.js, index.html,
trivandrum-watering.js and trivandrum-samples.js; no files created or deleted.

Verified male loupe clicks during examination at desktop and 360 px, handle drag,
keyboard movement/resize, persistence after natural completion, size slider and
Escape. Sample, watering and live-loupe checks pass; browser console is clear.
Full-page proofs at 360/768/1024/1440 CSS px are 345x2357, 753x2222, 1009x1836 and
1425x1908 px (scrollbar excluded), with no horizontal overflow. Fixed light palette
unchanged. Physical touch-device testing remains manual.

## Trivandrum sample handoff, 2026-09-22

Implementation and deployment requested by Martyna; Ahmedabad's kites and other
activities are explicitly retained. English-only control text: Samples, replacing
Sample tube, with generated Samples for the female / Samples for the male names.
This wording was proposed before Martyna instructed us to continue. No Swedish
or Polish version exists in the Game. Other wording is unchanged.

The female keeps the labelled sample tube. The male now has a shallow transparent
examination dish with separate far rim, inset floor, wall and near rim. Clicking
either starts an 11.9-second sequence: open cap, raise and tip the tube, slide a
leaf through the opening into the held dish, replace the cap, then raise the dish
and male loupe for inspection. A tiny animated specimen appears on the received
leaf, which remains in the dish afterward. The real body paths bend with planted
tails and supporting hands follow the props. The original loupe renderer samples
the live dish; visitors can still drag their optics manually afterward.

A visual refinement raised the handoff/examination clear of the small watering
can and shortened the female's post-transfer reach. Both watering actions remain
unchanged. The female tube contents clip and treasure mounting point remain
unchanged, as does treasure-hunt.js. The background, can/loupe art, saved accessory
placements and original body paths are preserved. Existing recorded paper/closure
sounds are reused quietly; no new audio files or external dependencies.

Validation: sample sequencing/continuity/reduced-motion checks, Trivandrum art,
watering, live-loupe, loupe-blink and existing treasure-discovery checks pass.
Browser checks: both sample triggers, visible handoff and magnified examination,
Escape restores exact body paths and accessory transforms, keyboard movement,
shower activation and no console errors. Full-page proofs at 360/768/1024/1440
CSS px measure 345x2357, 753x2222, 1009x1836 and 1425x1908 px (scrollbar excluded),
with no horizontal overflow. Fixed light palette preserved. Reduced motion is
tested in the timeline, not browser-emulated. Fresh gem collection was not reset
in the user's browser; its unchanged mounting point and lens mechanism were
checked in source. Physical-device and subjective listening checks remain manual.

Created: game-of-worms/trivandrum-samples.js; scripts/check-trivandrum-samples.cjs.
Changed: game-of-worms/trivandrum-refinement.js, trivandrum-watering.js,
accessory-designs.js, game.js, index.html; scripts/check-trivandrum-refinement.cjs;
PROJECT_STATUS.md; this location dossier; docs/game-of-worms-scene-review-queue.md.
No files deleted. Local preview: ?preview=trivandrum-samples-1, port 8792.

## Santeuil railway motion preview, 2026-09-22

Deployment approved on 2026-09-22 for the reviewed preview on codex/atlas-header-balance:
http://127.0.0.1:8792/game-of-worms/?preview=santeuil-ride-1

The 18.2-second journey now has a larger-worm push-off and farewell,
a compact boarding pose for the male, body bends following the pump handle,
and a longer run with gradual acceleration, a stop, reversal and braking.
Vehicle angles align with the shared track while riding. Wheels and the
connecting rod follow distance travelled. Steam advances continuously;
quiet filtered-noise rail impacts follow the wheel travel, alongside the
existing recorded whistle. The organ march remains separately playable.
The distance is capped by available right-side scene space. Original uniforms,
vehicle drawings, saved accessory transforms and background are preserved.
No public wording changed. The separate Pohnpei preview remains intact.

Validation: final-scene timing, smooth stop/start, artwork and Santeuil fit
checks pass; syntax and git diff checks pass. Browser Enter activation on both
vehicles, Escape cancellation, complete-ride transform restoration and console
checks pass. No warnings/errors in the final preview. Full-page screenshots
at 360/768/1024/1440 CSS px measure 345x2361, 753x2200, 1009x1817 and
1425x1908 px (scrollbar excluded); no horizontal overflow. Fixed Game light
palette retained. Reduced-motion skip/cleanup reviewed in code, not emulated
in the browser. Subjective listening and physical touch-device checks remain
manual. The new sounds are synthesized impacts, not field recordings.

Changed for this follow-up: game-of-worms/santeuil-railway.js,
final-scenes-play.js, game.js, index.html; scripts/check-final-scenes.cjs;
PROJECT_STATUS.md; docs/game-of-worms-location-research/santeuil.md;
docs/game-of-worms-scene-review-queue.md. No production files created/deleted.

## Pohnpei birdwatching preview, 2026-09-22

Implemented locally on codex/atlas-header-balance, based on current main de7424f.
Deployment approved on 2026-09-22. The user approved the English-only button labels
Birdwatching, Bird calls and Camouflage capes. There are no Swedish or Polish
Game strings for these labels. The final contextual artwork is approved.

Replaced the shared leaf sled with one forked branch and perched lorikeet.
The larger worm lifts its binoculars and the male leans toward his scope,
with curved body poses and hands supporting their different optics. One
11.2-second action includes a recorded call, hop, short curved flight, second
call and return. Wing opening/folding, feet and lower bill have separate motion.
The capes, optics drawings and default fits are retained. A refinement pass
moved the branch above the male, extended its base toward the painted trunk,
and made the automatic lens view focus on the bird's head. Manual lens movement
retains the original scene magnification. Optical samples are hidden from
assistive technology so they do not duplicate interactive controls.

The background painting, collection text, regional wildlife attribution and
licensed audio bytes are unchanged. No new wildlife recording or claim about
the collection substrate was introduced. References were refreshed against
eBird pohlor1 and the US Fish and Wildlife Service Pohnpei lorikeet entry.

Validation: focused Pohnpei motion/audio tests, accessory labels, fresh-visit
checks and syntax checks pass. Browser startup runs catalogue and paired-art
geometry audits successfully. Enter, Escape, live lens movement and exact
restoration of paths/accessory transforms were checked. Reduced-motion flight
and body limits are tested programmatically; physical devices and subjective
audio listening remain manual. No final-preview console warnings/errors.
Uncropped full-page proofs at 360/768/1024/1440 CSS px measured 345x2285,
753x2174, 1009x1725 and 1425x1908 px respectively (scrollbar excluded), with
no horizontal overflow. The Game retains its fixed light palette.
An older Sao Tome test's partial DOM mock failed on existing Lombok
querySelectorAll usage during its whole-catalogue check. That unrelated mock
was not changed; the real-browser catalogue checks completed successfully.

Changed files: game-of-worms/pohnpei-art.js, pohnpei-play.js,
accessory-designs.js, game.js, index.html; scripts/check-pohnpei.cjs;
PROJECT_STATUS.md; docs/game-of-worms-location-research/pohnpei-tropicalis.md;
docs/game-of-worms-art-catalogue.md; docs/game-of-worms-scene-review-queue.md.
No production files created or deleted. Untracked helper scripts stay in output.

## Larger puzzle area, 2026-09-22

Both playing and completed boards can now reach 560 px wide. The completed
board's previous cap was 440 px. Removed the height-based shrink rule; shorter
windows can scroll the puzzle content while the close control stays outside
that scrolling area. The dialog is wider with slimmer side padding, and the
shared gem tray now sits beside the close button in the header. All eight
gems remain visible. No public wording, artwork or game rules changed.

Changed Game treasure.css, treasure-hunt.js, index.html and game.js cache
references, plus this record. No production files created or deleted.
Browser checks cover 360/768/1024/1440 px viewports and a shorter 592x673
window, board completion/heartbeat, restart, inline reset cancellation and
Escape/focus restoration. Full-page proofs measure 345x2485, 753x2145,
1009x1937 and 1425x1906 px (15 px scrollbar excluded). No horizontal
overflow or console warnings/errors. The short-window board measured 486 px
wide and its controls remained reachable through the content scroll area.
The Game retains its fixed light palette and existing reduced-motion behavior.

## Restored species groups and closer heart view, 2026-09-22

Restored the rounded, softly tinted shared boxes around each sister-species
pair while retaining the larger individual buttons and current header.
The puzzle now has compact filled/outlined difficulty buttons and a
“Start again” button, as approved in the request. The visible “Your treasure
chest” heading is removed; its existing accessible dialog name remains.
The Game is English-only, so this approved English wording has no Swedish
or Polish counterpart.

After completion the board fits closely around the unchanged heart geometry,
with a thin gold edge and substantially less unused felt. Before completion,
the full playing area stays available. Restart restores that full area.
The shared gem tray, existing finish, press/release heartbeat and save rules
are retained. A final spacing refinement keeps the playing-board controls
inside the panel at the tested desktop height.

Changed Game style.css, treasure.css, treasure-board-art.js,
treasure-puzzle.js, treasure-hunt.js, game.js, index.html and this record.
No production files created or deleted; no gem, worm or accessory assets changed.
Full-page browser proofs at 360/768/1024/1440 px viewports measured
345x2485, 753x2145, 1009x1937 and 1425x1906 px, excluding the 15 px scrollbar.
Checks cover restored species grouping, both puzzle levels, completed and
unfinished board layout, keyboard/heartbeat, restart, reduced motion, Escape
and focus restoration. Puzzle geometry/save, audio/finish and interaction
checks passed. No horizontal overflow or browser warnings/errors. The Game
keeps its fixed light palette.

## Playable finished heart and puzzle panel, 2026-09-22

The completed gem heart now compresses on press and returns with two small
pulses, a brief sheen and a quiet double heartbeat. The existing completion
animation remains. Pointer, touch and Enter/Space work; cancellation, blur,
hidden tabs, dialog closure and board replacement clear the interaction.
Reduced motion keeps light feedback without displacement. Completion transfers
keyboard focus from the last piece to the finished heart. Saved collections
and both puzzle levels remain intact. At the user's request the heart reuses
“A heart! Eight discoveries, one treasure.” as its accessible name. The Game
is English-only; no new public wording or translations were introduced.

The puzzle panel uses one shared gem tray, unboxed completion text, quiet
level controls and a viewport-fitted board. The approved gem and board art
is unchanged. Gem notifications now appear at the top inside each scene,
remain click-through and retain their original wording and lifetime.

Created game-of-worms/treasure-heart-play.js and
scripts/check-treasure-heart-play.cjs. Changed treasure-puzzle.js,
treasure-finish-sound.js, treasure-hunt.js, treasure.css, Game index.html and
game.js cache keys, scripts/check-treasure-finish.cjs and this record.
No files deleted. No other scene artwork, accessories or homepage files changed.

Validation: puzzle geometry/save, restart, finish audio and new heart interaction
checks passed. Browser checks covered Easy and Mystery completion, mouse and
keyboard activation, restart, close/reopen, Escape/focus restoration, reduced
motion, final-gem collection and notification positioning. Full-page proofs at
360/768/1024/1440 px viewports measured 345x2461, 753x2136, 1009x1928,
1425x1897 px (15 px scrollbar excluded). No horizontal overflow or console
warnings/errors. The Game keeps its fixed light palette. The new sound was
verified through its scheduled audio behavior, not a separate listening test.

## Atlas header balance release, 2026-09-22

Implemented the requested removal of "Meet our six worms"; the existing
"Meet the whole family" control now occupies its left-hand position. The
centred Worm Atlas title is larger. The family control is now unboxed, with lighter text and a preserved 44 px touch target. Sister-species outer frames and their hover shadows are removed; individual species buttons remain distinct. Sister-species groups, species names and
reproduction labels have more room and larger type than the compact release.
The back link and Hidden gems occupy the top row, with the title centred in its own row below at every width. Below 741 px the three pairs stack. Tablet names
remain on one line. The English-only Game has no Swedish or Polish equivalent
of the removed heading; no new wording or translations were introduced.

Changed game-of-worms/index.html, game-of-worms/style.css and this record.
Header spacing is tightened, the unboxed family link is slightly larger, and the yellow Tiny surprise inset is replaced by an aligned heading and thin divider. All public wording remains unchanged in this refinement. No assets or files created/deleted. No scene or treasure interaction changes.
Full-page browser proofs at 360/768/1024/1440 px viewports measure
345x2461, 753x2140, 1009x1928 and 1425x1897 px (15 px scrollbar excluded).
No horizontal overflow or console warnings/errors. Family and treasure dialogs
open by keyboard, close with Escape and restore focus. Existing fixed light
palette and reduced-motion rules are preserved. git diff --check passed.
Approved for deployment from codex/atlas-header-balance after review of header-balance-4. Public Pages verification follows the release commit.

## Species heading line fit, 2026-09-21

Removed the mobile heading's artificial 14-character width limit so "Meet our
six worms" stays on one line whenever space permits. Changed Game style.css
and its index.html cache key; no public wording, artwork, or other pages changed.
No files created or deleted. Full-page browser proofs at viewport widths 360,
768, 1024 and 1440 px measured 345x2498, 753x2129, 1009x1937 and 1425x1875 px
(the browser excludes its 15 px scrollbar). All headings fit one line, with no
horizontal overflow. Family dialog keyboard opening, Escape and restored focus
passed; console had no warnings/errors. Game retains its fixed light palette.
No unresolved issue; git diff --check passed.

## Gem reveal motion review and release, 2026-09-21

User requested the centred header deployment, then review, improvement and
release of gem reveals across the eight hiding scenes. Header commit 2603ee9
is live: Pages run 35657344323 succeeded and both changed public files matched
committed bytes. This supersedes the earlier header preview status below.

Reviewed all eight discovery routes in the browser. The cacao gem now drops
from the opened pod; the compost gem leaves the tipping wheelbarrow with the
soil rather than appearing beside its wheel afterward. The Mauritius gem is
uncovered when the fruit clears the ground, before the basket deposit. Bubble
and towel releases use accelerating falls, two small diminishing rebounds and
a fixed ground shadow. No crystal stretching or inflating during a fall.
The towel, bubble and canopy handovers retain source scale and orientation;
size/orientation metadata survives save/reload. The small bubble's gem is more
visible while staying inside the bubble. India retains the loupe discovery,
follows the sample tube smoothly, and hides when its tube is switched off.
The telescope focus interaction and canopy leaf opening are retained.

Created game-of-worms/treasure-motion.js and scripts/check-treasure-motion.cjs.
Changed the Game treasure hunt/model/CSS, five scene modules, game.js and
index.html cache keys, and treasure-puzzle.js's model import. No deleted files,
new assets, public copy changes or edits to other checkouts. Existing approved
backgrounds, accessories, saved placements and puzzle rules are retained.

Validation: all eight real discovery paths collected to 8/8 in an isolated
local test origin. Inspected falls at normal and slow playback, refined small
bubble readability, and checked India hide/show and scene/reload restoration.
Reduced-motion compost and male towel finds remain collectible without falling motion.
No console warnings/errors. Full-page fixed-light proofs at CSS viewports
1440/1024/768/360 produced uncropped 1425x1864, 1009x1716, 753x2158 and 345x2225
images respectively; no horizontal overflow. This fresh browser tab resolved
the scaling/capture glitch from the earlier header-only preview. A 48px gem
hit target remains available on the phone layout and keyboard collection works.

Passed motion invariants across 108 size/release combinations, metadata save
validation, treasure discoveries/puzzle/restart/finish checks, the six affected
scene checks (Araucania, Bali cacao, Kauai bath, Mauritius, Salt Lake, Queensland),
JavaScript syntax checks and git diff --check. Local-only playback controls and
preview server files remain under untracked output and are excluded from release.

## Centred atlas title approved for release, 2026-09-21

Centred Worm Atlas between the back link and treasure control on compact screens.
At 540 px and below the title stays centred above a single row of controls.
Only game-of-worms/style.css, its index.html cache key and this status file changed.
No artwork or copy changed. No files created or deleted. Deployment explicitly requested.
Preview: http://127.0.0.1:8792/game-of-worms/?preview=compact-2

Verified CSS viewport widths 360, 768, 1024 and 1440: title centre within 0.01 px
of the header centre, no horizontal overflow. Treasure and family controls open
with Enter, close with Escape and restore focus. No browser warnings or errors.
Full-page captures were attempted at all four widths (268x1900, 582x1637,
778x1489 and 1098x1440 output pixels), but the browser's 1.3 scaling produced
stitched-image duplication below the header; these are not valid full-page
visual proofs. Header appearance was inspected in the normal preview. The Game
uses its fixed light palette. Full-page visual confirmation remains manual.

## Combined release approved, 2026-09-21

Martyna explicitly requested deployment of all three recent changes: the final
Lombok forest scene (forest-4), site-wide decorative dot removal, and compact
Game navigation (compact-1). This approval supersedes the local-preview status
in the historical entries below. English, Swedish and Polish separator edits
keep all words unchanged; Game and Cabinet remain intentionally English-only.
Treasure module cache keys are refreshed so returning browsers receive the
updated displayed labels. Main was fetched and confirmed at 7ece380 before release.
No changes from other physical checkouts are included. Two new Game modules:
lombok-forest-art.js and lombok-flight.js. No deleted files or new raster/audio
assets. The published commit and deployment are verified after push.

## Compact Game navigation, local preview, 2026-09-21

User requested less space above the game, with a screenshot of the stacked header.
The narrow header now groups title/back link on the left and gems on the right.
The family control is a quieter 44px button beside the smaller section heading.
All six species choices remain visible in shorter sister-pair cards; tablets
use one row of three pairs. No public copy or art changed in this layout pass.

Changed game-of-worms/style.css, treasure.css and stylesheet cache keys in
index.html, plus this status entry. No files created or deleted for this pass.
Existing Lombok and divider changes preserved. Branch codex/lombok-fig-hide-seek;
preview compact-1; not committed or deployed.

Full-page uncropped proofs at viewport widths 360/768/1024/1440:
345x2468, 753x2129, 1009x1937, 1425x1875 pixels (scrollbar excluded).
Scene starts at 383/248/249/249 CSS px from the top, compared with about 665px
on the previous phone layout. No horizontal overflow. Fixed light palette.
Family and gem dialogs open by keyboard, close with Escape and restore focus.
Species selection, visible focus, console and diff checks passed. Existing
reduced-motion rules retained; no new animation. User visual review pending.

## Lombok figs, fans and butterflies, local preview, 2026-09-21

Follow-up forest-4, 2026-09-21: fixed the fig finish flash by keeping the
original accessory group in place. Reparenting had restarted its CSS pop-in.
Leaf fans now have curved blades, folded tips, clipped curved veins and shaded
surfaces. Butterflies now have turquoise-blue wings; twig perches were removed.
Each butterfly can roam on its own continuous path while figs or fans are active.
A second click returns it smoothly. Escape, scene changes, dragging, resizing,
page hiding and reduced motion stop flight and restore visitor placement.
No public labels changed. Added lombok-flight.js and focused route checks.
Browser verified both flights together, flight with fig/fan actions, return clicks,
clean fig completion and both fan grips. No console errors. Full-page proofs at
360/768/1024/1440 CSS px: 345x2451, 753x2333, 1009x1759, 1425x1886 pixels;
no horizontal overflow. Initial zoomed captures were invalid and replaced.
Focused timeline, audio, flight-continuity/bounds and syntax checks passed.
No files deleted, no commit or deployment; current contextual proof awaits review.


Supersedes the fig-only preview below. User explicitly chose Leaf fans and
Butterflies. Three paired accessories now support fig hide-and-seek, held fan
waving with a quiet leaf rustle, and a short silent flight from a twig perch.
Fig art now has shaded plum skin, cream pith and seeded red interiors. Refinement
fixed body containment inside the closed fig, male fan reach and butterfly perches.
Background and visitor fig transforms are preserved. English-only Game labels:
Leaf fans, Figs, Butterflies. Preview forest-1; not committed or deployed.

Created game-of-worms/lombok-forest-art.js. Changed accessory-designs.js,
lombok-play.js, lombok-sound.js, game.js and index.html under game-of-worms,
scripts/check-lombok-play.cjs, audio/SOURCES.md and the scene queue, art catalogue
and Lombok dossier. No files deleted. Earlier divider cleanup remains intact.

Validation: both hide/peek cycles, both fan actions and butterfly flights,
Escape restoration and keyboard placement checked. Browser catalogue and geometry
audits passed at load; no console errors or warnings. Full-page uncropped proofs
at viewport widths 360/768/1024/1440: 345x2451, 753x2333, 1009x1759, 1425x1886.
Scrollbar excluded from capture widths. No horizontal overflow. Game uses its
fixed light palette. Focused hide-and-seek and audio checks, syntax checks and git diff --check passed.
User visual assessment and listening review remain pending.

## Text divider cleanup, local preview, 2026-09-21

User requested removing dots between words across the website. Replaced decorative
middle dots with en spaces in homepage EN/SV/PL expertise labels, student rows,
Cabinet title and image credits, and Game scene/map/treasure labels. Cabinet's
English-only touch instruction now reads: "Drag, pinch to zoom, tap an object."
Game and Cabinet remain intentionally English-only. Game location identifiers
retain their original values; formatting changes happen when labels are rendered.
Normal punctuation and decorative particle effects are unchanged. No new/deleted
files or assets. Not committed or deployed; included in the Lombok preview branch.

Files for this cleanup: index.html, home-i18n.js, cabinet-of-curiosities/index.html,
cabinet-i18n.js and cabinet-product-images.js in that directory, plus Game game.js,
index.html, accessory-designs.js and treasure-model.js. Original Cabinet checkout
and its uncommitted edits remain untouched.

Validation: JS syntax and diff checks passed. Language controls, Game selection,
Cabinet details and Escape checked. No errors in homepage/Cabinet console. Complete
page captures at viewport widths 360/768/1024/1440: homepage in both themes
345x8870 / 753x6477 / 1009x5143 / 1425x4693; Cabinet in both themes
345x4629 / 753x3033 / 1024x900 / 1440x900; Game fixed light theme
345x2347 / 753x2230 / 1009x1759 / 1425x1784. Scrollbars excluded where present.
No horizontal overflow. Initial background-tab Game captures were invalid and
replaced with the verified foreground-tab captures listed above.

## Lombok fig hide-and-seek, local preview, 2026-09-21

User requested trying a coherent fig-only activity after rejecting the pool concept.
Based on main 7ece380, branch codex/lombok-fig-hide-seek. Not committed or deployed.
Swimming goggles and pool are omitted from this location's controls. Original
forest background, fig drawings, placement and size controls remain. Either worm
curls into its fig; the other bends toward it, taps twice and waits. Another click
makes the hidden worm peek, then emerge while its partner draws back.

Public label for review: "Figs". Game accessory labels are intentionally English-only.
Recorded fruit handling and quiet contact cues replace splash playback. Focused
checks pass for both roles, taps, peek, return, reduced motion, lazy audio and
cancellation. Browser checks verified both roles without new console errors after
fixing SVGPoint/DOMMatrix conversion, and restoration after opening and resize.
Full-page proofs at 360, 768, 1024 and 1440 viewport widths measured 345x2347,
753x2333, 1009x1759 and 1425x1886 pixels respectively (scrollbar excluded).
No horizontal overflow. Fixed Game light palette retained. Subjective listening
and user approval of the new activity remain outstanding.

## Three selected scene animations, 2026-09-21

Implementation and deployment requested for Lombok HPT26, Nambucca Heads QG2814
and Pohnpei QG4739 after the focused weak-animation review. Based on main 812c6d5.

- Lombok: persistent swimming with travelling body waves and water contact ripples.
  Repeat pool clicks alternate tail splashes and reactions; sound follows contact.
  Figs remain visible, and the existing hide-and-seek is preserved.
- Nambucca: both craft workers bend toward their tools, with aprons and shoulders
  following the body. Completed stones lift and tilt for inspection before returning.
- Pohnpei: push-off, a small bump and braking reactions, then dismounting followed
  by pulling the empty sled home. Existing leaf recordings follow the new phases.

Approved backgrounds, accessory drawings, user placement/size and public copy remain
unchanged. The stone drawing only gains a group to move it independently of the brush.
No files added or deleted. Seven Game files, three checks and two documentation files
changed on branch codex/three-scenes-motion.

Validation: check-lombok-play, check-nambucca, check-nambucca-audio and check-pohnpei
pass, including reduced motion, timeline geometry, recorded audio and cancellation.
Browser checks covered swimming, repeat pointer splashes, Escape, both painters,
finished-stone pose, sled boarding/riding/return and birdwatching, with no new console
errors after fixes. Full-page proofs at viewports 360/768/1024/1440 px measured
345x2453, 753x2385, 1009x1783 and 1425x1938 pixels; additional mobile Lombok and
Pohnpei proofs were 345x2503. Captures exclude the 15px browser scrollbar. No horizontal
overflow. Game uses its fixed light palette. Sound scheduling and files were checked;
subjective listening was not available. Publication still requires Pages/live verification.

## Hidden gems and puzzle, deployment approved 2026-09-20

2026-09-21: approved heart finish now lifts and pulses twice with a quiet original
three-second musical phrase and jewel sparks. Restored puzzles remain quiet;
reduced motion stays static. Geometry, art, saved progress and copy are unchanged.
Focused checks and four responsive browser layouts pass. See treasure hunt notes.

2026-09-21: removed the treasure chest's Give me a hint panel at Martyna's
request. Gem collection, puzzle controls and inline restart are preserved.

Restart-gem-hunt preview added on 2026-09-21, based on main `3205d7a`.
Confirmation clears only the gem collection and puzzle progress, with saved
restart tracking across tabs. Functional checks pass; responsive viewport
override was unavailable. The revised confirmation expands below the puzzle
in the same window, as requested after review. Martyna approved deployment on
2026-09-21 and requested shorter puzzle instructions.
Details are in the treasure hunt notes.

Martyna approved the complete treasure hunt and polished geometric pieces for deployment.
Branch: `codex/gem-hunt`; current polish is based on main `5b206e1`.
The old species-met badge is replaced by Hidden gems and an eight-piece collection.
Discoveries are tied to existing accessories in India, Bali, Mauritius, Scotland,
Salt Lake City, Araucanía, Queensland and the Kauaʻi forest bath.
Finding all eight unlocks Easy and Mystery (the former Medium rules).
The final heart stays unannounced during the hunt. Progress saves in the browser.
The eight original pieces have regular straight edges, distinct jewel colours,
polished facets and fixed geometry. Existing scene art and visitor transforms remain intact.
The Game remains English-only. New copy was reviewed in the local preview;
no partial Swedish or Polish version is introduced.

Eleven focused checks passed, plus syntax and whitespace checks. All discoveries,
reduced-motion discovery paths, all puzzle levels, persistence and keyboard controls
were exercised during preview development. Final polish preserved geometry exactly.
Responsive DOM checks passed at 360, 768, 1024 and 1440 px with no overflow.
The approved polish adds a wooden chest icon, canopy-photo leaf discovery,
towel gem drop, compact discovery notices, an always-visible collection tray,
an emerald puzzle board and a brief shining heart finish. Old freeform Mystery
saves migrate without losing gems. Full-page proofs at 360/768/1024/1440 px
measure 360x2675, 768x2352, 1024x1997 and 1440x1933 pixels.
Details, copy and file inventory are in
[the treasure hunt implementation notes](docs/game-of-worms-treasure-hunt.md).
This release was deployed as `ade4a73`; Pages success and live files were verified.

Board refinement deployed and verified as `0caa43a`: simple gold corner lines,
a recessed heart centre, a separate title/close header and a tray showing only
the gem pieces. Puzzle rules, gem geometry and saved progress are unchanged.
Physical-depth refinement deployed and verified as `09de74e` on 2026-09-21:
raised gold collar, bevelled walls, eight Easy sockets with dividing edges,
an undivided Mystery recess, and separate loose/fitted contact shadows.
Gem art, fit geometry, saves and rules remain unchanged. Focused checks pass.
See the treasure hunt notes for validation and screenshot limitations.

Hidden gems button redesign requested for deployment on 2026-09-21: original
open wooden chest with visible jewels, emerald/gold button, clear count badge
and a two-row phone header. Wording and treasure logic remain unchanged.
Keyboard, asset and responsive checks pass; full-page capture limitations remain.

## Bali gong duet, deployment approved 2026-09-20

Martyna approved improving the gongs while keeping the cacao activity and
existing accessories. Branch: `codex/bali-gong-duet`, based on main `c8292de`.
Preview: http://127.0.0.1:8783/game-of-worms/?preview=20260920-gong-duet-2
Martyna approved the refined preview and requested deployment on 2026-09-20.

Either gong starts an 11.6-second exchange: four slow low strikes by the female,
eleven alternating kettle-gong replies by the male, and a shared last beat.
Hands grip the original mallets, wind up, meet each raised boss on the sound
cue and rebound. Both bodies bend on their own beats with planted tails;
wraps follow the torso. Instruments come slightly closer while playing and
return to exact visitor positions/sizes. Drawings, background and cacao
opening/eating are unchanged. No public copy changed. Production imports
`bali-gong-duet.js`; the old gong module is retired.

Refinement corrected crossed female arms and shortened reaching distance.
Three CC0 recordings replace synthetic oscillators. Measured waveform offsets
remove leading silence; original pitches remain. Audio source notes distinguish
the West Sumatran kettle-gong samples from Balinese instruments. The phrase is
original playful music, not traditional gamelan tuning or a traditional score.

Checks: 15 cues, exact mallet/boss and hand/grip contact at three scales,
planted tails, unchanged originals, late cues, delayed loading, cancellation
and reduced motion pass. Existing cacao, nib eating, sound and art tests pass.
Browser confirms both activation targets, exact restoration, keyboard movement,
resizing, Escape/Home and switching to cacao. Console clean. Full-page captures
at viewport widths 360/768/1024/1440: 345x2434, 753x2375, 1009x1747 and
1425x1928 pixels (15px scrollbar excluded); no horizontal overflow. Fixed light
Game palette. Subjective listening and physical-phone use remain manual.

## Shared flower-bait preparation, deployment approved 2026-09-20

Martyna requested a connected blender/spoon activity. Preview:
http://127.0.0.1:8782/game-of-worms/?preview=20260920-mixing-5
Branch: codex/panama-blender, based on main d58c00f. Martyna approved mixing-5 and requested deployment on 2026-09-20.

Click either the blender or the spoon/dishes to start one 13-second sequence.
The larger worm opens the lid, adds petals, reseats and holds the lid, then
operates the motor. Only after the motor stops does it lift and tip the jar
into the male's bowl. The male moves the spoon aside, brings the bowl forward,
then scoops mixture into the separate small dish. The serving persists after
completion; Home resets it. Body bends and headpiece tracking follow each job.
A refinement separated the bowls during pouring, kept fingers on handles and
kept the glass clipping boundary fixed as its liquid level falls.

Existing drawings, palette, resting layout, backgrounds and visitor placements
are preserved. Added SVG groups provide movable mechanisms; a regression test
compares all painted geometry to the approved original. Leaf cutting, ant
visitors and both flower-headpiece actions retain their existing controller.
No public labels or scientific copy changed. Reduced motion shows the finished
serving without movement or sound. Escape, movement, scene changes, page hiding
and resizing stop the activity and restore original body/prop transforms.

Sound: real CC0 blender recording by VSokorelos, plus the existing recorded
spoon/glass and pouring foley. Original pitch/speed; short faded runtime
excerpts. No synthetic motor buzz. Source and hash are in assets/audio/SOURCES.md.

Validation: mixing ordering, finite/smooth motion, planted tails, exact stream
endpoints at three prop sizes, unchanged artwork, preserved originals, sound
cues and reduced motion pass. Existing flower/leaf/ant/scissor-audio tests pass.
Browser confirms activation from either prop, completed serving, exact position
restoration, keyboard move/resize/Home/Escape and leaf cutting after mixing.
Responsive DOM checks show no overflow at viewport widths 360, 768, 1024, 1440.
Full-page captures cover the complete page: 345x2483, 753x2399, 1009x1801,
1425x1928 pixels (the 15px scrollbar is excluded). Game uses its fixed light
palette. Subjective sound quality and physical-device use remain manual checks.

### Tenerife duet, shaker and eating, approved 2026-09-20

Martyna approved the successive Tenerife previews and requested deployment,
including audible avocado eating sounds. Either timple leads a call-and-answer
duet with shorter exchanges and a shared ending. Hands and body motion follow
the recorded strings; the fitted canary costumes follow each body bend.
The male's second avocado is replaced by a handled gourd shaker. He puts his
timple down, lifts the shaker and plays a seed-rattle rhythm with the larger
worm's guitar, then returns both instruments. With guitars hidden it plays solo.

Each avocado click eats one of three bacteria: reach, grasp, lift, bite, chew and
return. Completed bites persist through other activities; the next click on an
empty bowl refills it. Home resets portions and position. A .23 s recorded
soft-food bite at 1900 ms is followed by a quieter .26 s chew at 2340 ms,
with no pitch shift or synthetic tone. All sound stops on cancellation;
reduced motion consumes the selected portion without animation or sound.
The background, primary avocado, guitars, costumes and visitor transforms are
preserved. Original body paths and accessory placements restore exactly.

Approved English-only labels: `Avocado & shaker`, `Avocado bowl`, `Gourd shaker`.
The Game is intentionally English-only; there are no Swedish/Polish counterparts.
Gourd construction follows [the Met reference](https://www.metmuseum.org/art/collection/search/502806):
hollow shell, wood handle, cord binding and plugged crown; no copied artwork.
The shaker is a playful prop, not a claim of a traditional Canarian instrument.
Recording sources, CC0 licences and hashes are in assets/audio/SOURCES.md.

Validation: snack state and sound timing, duet scheduling/cancellation, accessory
geometry and final-scene regressions pass. Browser checks cover all three
portions, persistent depletion, cancellation before/after eating, Home reset,
restoration and guitar/shaker interactions, with no console errors. DOM layout
checks pass at 360/768/1024/1440 px. Full-page screenshot service duplicates and
rescales sections (268x1950, 582x1846, 778x1445, 1098x1482 pixels respectively),
so exact full-page proofs remain manual. Normal-size scene renders were reviewed.
Sound quality remains a listening judgement; timing and playback are tested.
Branch: `codex/tenerife-duet`. Deployment is authorized; verify Pages after push.

### Claremont reader-facing books, approved 2026-09-20

Martyna approved preview books-7 and requested deployment. Both books start
open, with lettering and pictures facing their readers. Larger high-contrast
illustrations, bolder retained `Wormbook` lettering and less flattened pages
improve readability. The violet volume and stitched berry book have distinct
construction; lemonade sits beside the pages. Visitor placements/scales remain.

Two different wordless comics have four spreads each. The large book follows
an enormous bacterial snack, a toppling food pile, an overloaded leaf boat and
a shared mushroom picnic. The small book follows a sleepy worm, a runaway leaf
blanket, rain and mushroom shelter, then sleep on a book and a food dream.
Refinement corrected sail/mast attachment, pillow contact and the bedtime pose.
No new public wording or translations; existing labels and recorded foley stay.

Each worm reads, turns pages and holds its pose independently; both may read
at once. The male gradually dozes and wakes only on his own next page turn.
His shallower lean and hands reaching the far corners keep his face clear and
arms behind the book. Moving/sizing/resetting a prop or sipping stops only its
reader; Escape, scene departure, resize and shared wardrobe toggles clear both.
Shared pouring interrupts both readers because it uses both drinks.

Validation: focused book/play checks, syntax and diff checks; browser verified
independent starts, simultaneous reading, unchanged male pose during a primary
page turn, individual prop movement/reset/sipping, pointer/keyboard activation
and exact cleanup/restoration. Startup catalogue/paired-geometry audits pass;
no console errors or overflow at actual widths 360, 768, 1024 and 1440.
Full-page capture service scales and repeats sections: outputs were 268x1987,
582x1865, 778x1482 and 1098x1482 respectively, so complete-page visual proofs
remain unavailable. Device reduced-motion preference and listening remain manual.
The older Sao Tome Node harness has an incomplete querySelectorAll mock for
Taipei; real-browser startup audits pass. No unrelated test change was made.
Deployment authorized; public verification follows publication.
Branch: `codex/claremont-reading`.

### Claremont reading follow-up, 2026-09-20

Martyna requested the next proposed scene after the deployed Trivandrum update.
The larger worm bends toward its book and follows the spread; the male peeks,
gradually closes his eyes and holds a dozing pose. The next book tap turns a
page and wakes him from that same pose. Each click advances one spread; there
is no automatic page loop. A brief hand gesture follows the turning leaf.

Both glasses follow the heads through temporary wrappers while retaining the
visitor's placement and size. Book illustrations, background, glasses design
and lemonade artwork are unchanged. Escape, moving/resizing props, hiding a
wardrobe group, changing location or opening a drink action restore the exact
original body paths, eye attributes and glasses styles. Idle dozing holds still
without a continuing animation loop. Reduced motion changes pages immediately.

Recorded CC0 paper, straw-sip and pouring foley replaces synthesized sounds,
using existing production audio files. No public labels or copy changed.
Tap tolerance is 6 pixels; a page tap does not clamp a user-positioned book.

Validation: book geometry/hinges, liquid bounds and drink regressions; new
reading/sleep/wake timing and planted-tail checks. Browser verified both books,
repeat-tap waking, drink interruption and exact Escape restoration. No console
errors or overflow at actual widths 360, 768, 1024 and 1439 CSS pixels.
Full-page captures remain scaled/duplicated by the capture service; complete
page visual proof, device-level reduced-motion preference and listening checks
remain manual. Implementation/deployment authorized; public verification follows
publication. Branch: `codex/claremont-reading`.

### Trivandrum shared shower, deployment requested, 2026-09-20

Martyna approved the proposed female lift/pour and male duck/rub/shake sequence
and explicitly requested implementation and deployment. The shared shower now
lasts 7.8 seconds. The female turns the can toward the male, grips it with both
hands and leans into the lift. Water follows the male's ducking head; he rubs
his head once the stream stops, then shakes off droplets and settles. The small
can retains a separate shorter pour with supporting hands and body movement.

Existing body paths are temporarily bent with planted tails, then restored
byte-for-byte. Face groups follow the moving head. Original bodies remain in
the document so the live loupes continue sampling them. Both can placements,
sizes, the loupes, sample tubes and background are preserved. Recorded CC0
water/sponge foley replaces synthetic noise; existing audio files are reused.
No public copy or accessory drawing changes.

Validation: timeline/order/continuity, planted tails, exact settling and static
reduced-motion tests; accessory-art and live-loupe/blink checks. Browser checks
cover both cans, enabled loupes, Escape, keyboard positioning and exact original
path/position restoration. No console errors or horizontal overflow at actual
360, 768, 1024 and 1439 CSS pixels. Reduced motion verified by tests and code;
device preference and audio listening remain manual. Full-page capture produces
scaled or duplicated sections, so complete-page visual proof remains manual.

### Santeuil railway and uniform follow-up, approved for deployment, 2026-09-19

Requested by Martyna: move the larger worm's costume parts independently and
improve both uniforms' fit. Cap and jacket now have separate drag, keyboard,
resize and reset targets. Both jackets have a longer fitted cut; cap seating
and tilt are adjusted separately. Existing drawn details, colours, scene props
and background are preserved. Performance copies retain the new cap fits.
Follow-up: the organ march now uses a continuous 14.4-second excerpt (previously
7.2 seconds) from the same recording. The 16.2-second action includes settling;
crank travel increases so its pace stays consistent. Concertina is unchanged.
Recording duration and performance settling checks pass.

Railway story follow-up: one shared timber-and-rail line sits in the foreground.
Either vehicle starts a 16.2-second inspection trip: the male boards and pumps
the trolley, the locomotive travels ahead, pauses and returns, then the male
steps off. The larger worm plays the departure march when the organ is enabled;
otherwise it gives a departure gesture. Wheel rotation and linkage follow actual
travel; steam stops at rest. Concertina stays quiet while its owner rides.
The trolley's default height now matches the locomotive track. Visitor moves
and sizes remain independent and return unchanged after the performance.
The track follows moved props and is removed when the train pair is hidden.
Railway preview checks: no horizontal overflow at 360, approximately 768, 1024
and 1440 CSS pixels. Scene screenshots inspected; the browser capture service
still clips or scales some wider captures, so these are not full-page proofs.
Boarding/departure/pause/return timing, hide/show track cleanup, and browser
console checks pass. Original body and accessory controls restore after travel.


Branch: `codex/santeuil-uniform-fit`; integrating onto main `c5582c6`
so the deployed Queensland canopy-camera fix is retained.
Preview: `http://127.0.0.1:8777/game-of-worms/?preview=20260919-railway-3`.
Martyna explicitly approved deployment of the railway scene on 2026-09-19.
Edinburgh's unfinished preview remains in its own worktree. New piece names are exactly **Cap** and **Jacket**; the Game catalogue
is intentionally English-only, so there are no corresponding Swedish/Polish
catalogue strings to update. These names are included in the approved preview.

Validation: Santeuil geometry/piece-partition checks, final-scene regressions,
JavaScript syntax and diff checks pass. Browser drag, independent keyboard move,
resize/reset, cap tracking during music and console checks pass. No horizontal
overflow at 360, 768, 1024 and 1440 CSS pixels; respective full-page DOM heights
were 2534, 2400, 1878 and 1928 pixels. Contextual screenshots inspected at these
sizes. Full-page screenshot capture remains defective (duplicated content and
large blank regions), so full-page visual proof remains manual. Fixed Game light
palette retained. Reduced-motion code remains unchanged; no device-level motion
preference test performed.

### Queensland QG2904 canopy photography fix, deployment requested, 2026-09-19

Martyna requested taking photos while lifted into the canopy and deployment.
The lift now waits at canopy height until tapped again; a second tap descends
smoothly from its current height. Its real pointer target travels with the
basket. Both cameras remain independent during boarding, ascent, waiting and
descent. Small pointer wobble stays a tap, and tapping no longer clamps a camera
away from its chosen fit while it is carried by the lift. No public wording,
artwork, sound assets or other scenes changed.

Branch `codex/canopy-camera-lift`, based on main `cc1aea0`. Santeuil and Edinburgh
previews remain separate and are not part of this deployment. Timeline and
matrix/audio regression checks pass. Local browser verified simultaneous camera
shots at canopy height and pointer-triggered descent; no console errors.
Existing responsive layout and fixed light palette are unchanged. Full-page
screenshot capture remains unreliable; no new full-page proof is claimed.

### Orsay JU2518 steady portrait pose follow-up, deployment approved, 2026-09-19

Martyna approved preview `20260919-orsay-hold-1` for deployment after requesting
a steady pose with stationary accessories. The model now transitions once
into a distinct body curve and holds it throughout drawing. Head and tail stay
anchored. The approved supported-chin and folded-arm gestures are preserved.
Model bag, notebook and crown remain fixed; only the artist uses its drawing
supplies. No public copy, background or accessory designs changed.

Preview: `http://127.0.0.1:8776/game-of-worms/?preview=20260919-orsay-hold-1`.
Branch: `codex/orsay-clear-poses`. Approved production files are unchanged from the preview.
Timing/geometry tests now require a constant pose during the portrait, a visible
change from rest, and an anchored head/tail. Syntax and diff checks pass. Both
roles inspected at normal scene size; sampled model prop transforms stayed
constant and no console errors were reported. Prior four-width layout checks
remain applicable; no layout CSS changed. Full-page screenshot capture remains
unreliable. Reduced-motion's static path is retained by code inspection.

### Kauaʻi XZ1516 vocal duet follow-up, deployment approved, 2026-09-19

Martyna approved replacing the bird-like whistle with playful sung phrases.
Either microphone starts a call-and-response with two distinct human scat
excerpts. Mouths and tape meters follow syllables; the recorder plays the exact
completed performance back in the same order. Existing art, fit and visitor
transforms are preserved. Preview `20260919-vocals-4`, port 8776, branch
`codex/kauai-vocal-duet`. Martyna approved preview 4 for deployment.
Mouths animate during singing and tape playback; body bends, nods and hand
gestures follow the recorded accents. Checks and source attribution are in
[the Kauaʻi dossier](docs/game-of-worms-location-research/kauai-elegans.md).

### Final three scene interactions, live verified, 2026-09-19

Martyna authorized independent review, implementation and deployment while away.
Only Santeuil, Tenerife and **C. elegans** Kauaʻi were reviewed. All three keep
approved artwork, costume/headphone fits, labels and painted backgrounds.

- Santeuil: crank-operated organ and expanding concertina, with short recorded
  musical phrases. A separate shunting action moves wheels, connecting rod and
  trolley pump; hands follow the controls. Uniforms remain quiet.
- Tenerife: distinct strumming rhythms, fretting hands, gentle body bends and
  small wing gestures. Either worm can take a quiet snack from its avocado bowl.
- Kauaʻi: microphone taps make distinct whistled phrases; the shared recorder
  replays the latest completed takes. Reels, meters and the record/play lamp
  respond to the action. Headphones stay fitted. No microphone permission,
  recording of visitors, background loop or autoplay.

Preview `20260919-final-3` runs on port 8776. Branch:
`codex/final-scene-interactions`, based on live Orsay `66be258`.
All 31 scenes are closed for this interaction review pass. This does not claim
physical-device or subjective listening approval. Focused geometry/motion tests,
keyboard/pointer actions, cancellation, saved-transform restoration and four-width
overflow checks pass. Full-page captures remain defective; exact dimensions and
remaining manual checks are in
[the final review](docs/game-of-worms-reviews/final-scenes-20260919.md).
Published as `758bc2a`; Pages run `35435066808` succeeded. All 14 changed
production assets match the committed bytes. Live Santeuil, Tenerife and Kauaʻi
actions were checked without new browser errors.

### Orsay JU2518 shared sketching, deployment approved, 2026-09-19

Approved concept implemented on `codex/orsay-sketching` from main `68f1e59`.
Preview `20260919-sketch-3`, port 8776: either worm draws the other, lifting
its sketchbook and revealing a graphite portrait. Apple-shaped satchels
now hold pencils and an eraser; fruit balancing is removed. The model holds
a curved pose, winks, then leans towards the finished drawing. Distinct book and bag construction,
recorded pencil/paper sounds, cancellation and exact placement restoration.
Existing crowns, background, scientific text and public labels are preserved.
Focused tests and four-width overflow checks pass; full-page capture is still
defective. Physical devices, reduced-motion browser emulation and subjective
listening remain manual. See the Orsay dossier. Martyna approved preview 3
for deployment on 2026-09-19 and authorized independent review, implementation
and deployment of Santeuil, Tenerife and C. elegans Kauaʻi. Counts: 28 complete
and three open at that stage. Orsay is live at `66be258`, with successful Pages
run `35434141050`, matching published assets and a working live drawing action.

### Salt Lake City EG4181 bubble picnic, deployment approved, 2026-09-18

Approved concept implemented on `codex/salt-lake-bubbles`, based on `96eeffd`.
Preview `20260918-picnic-3` runs on port 8775. Giant hoop/tray, small bottle/wand
and quiet picnic blanket replace hats, packs and skis. The larger worm bends
through its middle while pulling a large bubble; the male blows five small
bubbles, including a brief nose bubble. Both kits work together. Bubbles can
be popped with pointer or keyboard; giant pops alternate splitting and bursting.
Follow-up refines the tray and bottle construction, phased dipping/lifting,
head turns and the blanket's folds, curved checks and draped hem.
Latest approved addition groups the independently movable kits under Bubbles,
adds a shared Apricot picnic basket with a six-second sharing and nibbling action,
and retains Picnic blanket as the quiet third accessory.
Original apricot painting and scientific copy remain unchanged. Martyna approved
publication of preview 3 on 2026-09-18. The review queue now has 27 completed
and four open scenes; next is Orsay JU2518. Publication verification follows
the approved commit and Pages build.

Movement/SVG checks, keyboard play, concurrent actions, exact body restoration,
accessory transform preservation, cancellation and leaving-scene cleanup pass.
No horizontal overflow at CSS widths 360, 768, 1024 and 1440. Full-page capture
is defective (scaled content and duplicated sections), so responsive visual
approval remains incomplete. Reduced motion is code-reviewed, not browser-tested;
subjective audio listening remains manual. See the Salt Lake dossier for details.

### New Taipei NIC1648 pottery and tea, publication requested, 2026-09-16

Martyna requested larger pottery, fitted aprons in place of painting, and better
bubble tea. Wheels are about 40% larger; quiet canvas aprons fit the bodies;
two-handed sipping lowers the tea level. Follow-up keeps hands behind the cups
and maps the apron shapes along the actual body curves. Painting is removed. Preview
`20260916-pottery-9` on port 8768;
branch `codex/new-taipei-pottery`, based on deployed `52eb68a`. Martyna requested the final neck-strap refinement
and publication on 2026-09-16. The strap now bends around the throat as a soft
ribbon with stitching and a small slider. Review count: 23 completed, 8 pending.
Next: C. briggsae, Réunion JU1375.
Validation and remaining capture/listening limitations are in the
[New Taipei dossier](docs/game-of-worms-location-research/new-taipei-tropicalis.md).

### Guadeloupe NIC203 drum and dance, deployment approved, 2026-09-16

Martyna rejected the first single-strike, rigid-body animation and detached
costumes. The revision plays a twelve-beat phrase per click over 4.1 seconds;
the other worm bends through its middle while its face and tail tip stay
anchored. Tapping the same drum during a phrase leaves it running; tapping the
other switches roles. Redesigned costumes have fitted feather vests, distinct
tapered wings, throat feathers, tails and beaks. Follow-up adds overlapping body feathers, wing coverts and fuller collar/tail detail; approved hats remain byte-identical. Crowns now use distinct pleated madras and knotted cloth wraps above the eyes; background retained.
Preview: `http://127.0.0.1:8767/game-of-worms/?preview=20260916-gwoka-11`.
Four-width scene screenshots, interaction checks and targeted tests pass.
Full-page captures still contain duplicated/scaled sections; subjective
listening and physical touch testing are unverified. Branch
`codex/guadeloupe-drum-dance`: final preview approved for deployment on 2026-09-16.
Next review: New Taipei City NIC1648; the later pottery request above supersedes boot retention.
Details: [Guadeloupe dossier](docs/game-of-worms-location-research/guadeloupe-tropicalis.md).

### São Tomé glide and leaf hats, deployment approved, 2026-09-13

The shared ride is deployed as `b42c58d`. A new local revision on
`codex/sao-tome-snail` extends travel to 8.6 seconds, with a steady shell,
independent tentacles and subtle sole movement. It removes the default
backwards repositioning before boarding. The snail now starts further left
and the fallen leaf has a separate position on the right. Distinct fitted
leaf hats replace the parasols and travel with the worms. Snail artwork,
background, audio and Tiny surprise are unchanged. The English-only preview
label is Leaf hats. Martyna accepted the scene and requested wider tentacle
movement. The local follow-up adds independent sweeps and flexible tips,
without altering the accepted artwork, layout, labels or ride timing.
Tests and four-width full-page browser checks pass.
Martyna approved the complete follow-up for deployment on 2026-09-13.
Commit and direct live verification follow publication. Details and limitations are in
the São Tomé location dossier.

### São Tomé shared snail ride, deployment approved, 2026-09-13

On `codex/sao-tome-snail`, based on main `3deacf6`, JU2484 has a shared
fallen-leaf reveal and a shared ride on the regional Obô giant snail.
The existing parasols and painting are unchanged. The approved general phoresy
sentence follows the existing collection text. English-only labels are Snail
ride, Lift the leaf and Fallen leaf. Final contextual approval was received.
Publication and direct live verification follow the approved commit.

Separate original vectors and interaction modules preserve visitor placement
and size. Both activities use quiet recorded leaf rustling, with reduced-motion
and cancellation handling. The refinement fits both riders to the shell,
keeps both faces visible and separates their landing positions. Racing flags
are removed. Source evidence, ecological limits and complete
QA notes are in the São Tomé dossier. Focused tests, catalogue/pair audits,
labels, fresh-visit defaults and Pohnpei regressions pass. Browser checks include
pointer/keyboard activation, Home, Escape, resize, exact restoration and complete
360/768/1024/1440-width content captures. Captures exclude the 15 px scrollbar.
Safari, physical devices, OS reduced-motion browser emulation and listening
remain manual. Unrelated main-checkout changes were not touched.

### Pohnpei birdwatching, deployment approved, 2026-09-13

On `codex/pohnpei-birdwatching`, based on main `9c68b9c`, QG4739 has real
threefold binocular/scope magnification, a discoverable Pohnpei lorikeet with
its recorded call, one shared downhill leaf ride with recorded rustling, and
distinct fitted camouflage capes. The painting and collection text are unchanged.
Two activities run separately. Visitor placement and size survive completion
or cancellation. Martyna approved the final contextual preview, English-only
labels and required sound credit on 2026-09-13. Source licences, visual references, refinement and verification
are recorded in the Pohnpei dossier and audio source ledger.
Focused Pohnpei and Queensland tests, labels, fresh-visit defaults, syntax and
whitespace checks pass. Normal phone/tablet/desktop views and keyboard/pointer
interactions were checked. Exact-width full-page captures remain defective,
and Safari, physical devices and subjective listening remain unverified.
The approved production drawings and interactions are unchanged. Commit and
live verification follow publication. São Tomé JU2484 is the next queued review.

### Queensland canopy visit, deployment approved, 2026-09-13

On `codex/queensland-canopy`, based on current main `92a5acd`, QG2904 has a
shared canopy lift, distinct long-lens/instant cameras and fitted static safety
harnesses. The male's developing print shows the larger worm photobombing.
Both cameras can now operate during the lift. Real harness/camera controls travel
with the worms and retain visitor adjustments after landing. Three CC0 recordings
provide independent, bounded motor and camera foley. The forest painting and collection copy
are unchanged. Detailed construction references and QA are in the Queensland
location dossier. Labels are intentionally English-only, as is the Game.
Focused Queensland and Lombok regression tests, labels, fresh-visit defaults,
syntax and whitespace checks pass. Normal views at 360, 768, 1024 and 1440 px
were inspected, including phone lift/print actions, keyboard and pointer input,
size restoration and scene-change cleanup. Martyna approved deployment of the
current drawings, interactions, sounds and English-only labels on 2026-09-13.
The approved production files are unchanged. Pohnpei QG4739 is the next review.
Live verification follows publication. Full-page captures have a scrollbar-width/framing
mismatch, and physical devices, Safari and subjective listening are unverified.

### Lombok fig hide-and-seek and splashing pool, deployment approved, 2026-09-12

On `codex/lombok-hide-and-seek`, updated to main `0c5681b`, the approved
concept is implemented for C. nigoni HPT26. Figs close around the curled worms
and reopen on a second activation. The male leaves his tail outside, peeks out
and then emerges. The female opens briskly with a small reaction from the male.
A shared pool now replaces the rigid water slide. The female bends her neck
to dip, flicks water towards the male, and he ducks and splashes back.
Separately fitted, transparent swimming goggles replace the collars and stay
static. Exactly two activities remain, with recorded fruit-skin and pond-splash
foley. Starting either action cancels the other. The approved fig interaction,
painted background and Tiny surprise are unchanged. The English-only labels
are `Swimming goggles`, `Ficus fruit transformations` and `Splashing pool`.

Focused timeline, interpolation, audio, initial-visit and label tests pass,
as do syntax and whitespace checks. Browser checks covered tapping, keyboard
activation, cancellation, drag, Home, size preservation and scene changes.
Normal views were inspected at 360, 768, 1024 and 1440 px with no horizontal
overflow. Complete-page captures are still malformed and are not valid proof.
Physical devices, Safari, subjective listening and browser-level reduced-motion
emulation remain unverified. The legacy six-location drawing test has a stale
dispatch-order expectation that also fails against unchanged HEAD.
See the Lombok research note for exact capture dimensions and remaining checks.
The user approved this exact preview and requested deployment on 2026-09-12.
No artwork, labels or interaction geometry changed after that approval.
Publication must be confirmed by the Pages result and exact live-file checks.

### Oʻahu gift wrapping, deployment approved, 2026-09-09

The approved concept adds independent Gift wrapping beside Chocolate tasting
and Chocolate bike. Following the user's preview feedback, both worms now
wrap one shared macadamia gift box. Together they bring it much further into
the foreground and wait for a second activation to open it. Recorded
foil and paper sounds accompany the folds. Other actions do not run alongside
wrapping. Existing bike, tasting, background and Tiny surprise are preserved.
The user approved the final contextual preview and requested deployment.
Publish the shared gift together with the preceding mould-removal and eating
audio follow-up. Six focused tests and syntax checks pass. Full-page capture
and subjective listening limitations remain documented in the Oʻahu review.

### Earlier Oʻahu mould removal and eating audio, local follow-up, 2026-09-09

Workshop release `47b465c` is live. The user's follow-up removes both moulds
without a replacement. The local scene now has Chocolate tasting and Chocolate
bike. Remaining artwork, starting layouts, background and copy are unchanged.
The bike's oversized invisible hit rectangle intercepted the male mould. A
44 px crank pad leaves empty gaps clear. Temporarily hidden props also stop
intercepting pointers. Recorded chocolate-eating excerpts accompany both bites.
Five targeted scripts, syntax, catalogue and browser checks pass. Normal 360,
768, 1024 and 1440 px views have no horizontal overflow. Full-page captures
remain malformed. Listening, physical devices and Safari remain manual.
This earlier follow-up is included in the approved shared-gift deployment.

### Earlier Oʻahu workshop, deployed at 47b465c, 2026-09-09

Implemented the user-approved bicycle-powered cacao-processing concept on
`codex/oahu-chocolate-bike`, based on main `6af30f5`. The user subsequently
requested chocolate-related replacements for the two remaining slots. The
preview now has Chocolate moulds, Chocolate tasting and Chocolate bike.
The larger worm pours into a bar mould and tastes a wrapped bar. The male
scrapes a small-bar mould and tastes chocolate-covered macadamias. The latter
are supported by Mānoa's product list, unlike the discarded bonbon proposal.
New actions share cancellation with the bike. Moulds move closer during work,
two hands support tool and tray, and other props temporarily disappear.
The male hand-pedals a shared bike while the larger
worm feeds a cracker/winnower. The machinery accelerates, separates nibs and
shells, coasts and returns the worms to their original positions. Real CC0
bicycle and bean recordings use bounded excerpts and conservative levels.

Drawing, motion, cancellation, size preservation and normal responsive views
were checked. Seven related check scripts pass. Full-page captures remain
malformed and do not count as valid complete-page proof. Physical phones,
Safari and subjective listening are unverified. Martyna approved committing and
deploying the preview and revised Tiny surprise on 2026-09-09. The Game remains
English-only. The exact approved three-sentence copy now introduces the local
cacao/chocolate connection and explains the bicycle-powered winnower.
The release contains only this Oʻahu work and its documentation. The Cabinet
and the separate dirty main checkout remain untouched. Publication must be
verified after pushing.

Files, test details and capture dimensions:
[Oʻahu review notes](docs/game-of-worms-reviews/oahu-bike-20260909.md).

### Canberra recorded café sounds, deployment requested, 2026-09-09

Added a short real coffee slurp at cup contact and a recorded sulphur-crested
cockatoo screech during either bird's raid. The two CC0 source MP3s are preserved
byte-for-byte, with bounded playback excerpts, capped peaks and short fades.
The bird source is species-identified aviary audio, not a recording of stealing
food. No pitch changes, synthetic calls, loops or background autoplay.

Only one café sound can play at a time. The first action waits for decoding,
with a bounded silent fallback if the file is unavailable. Cancellation during
loading cannot restart a stopped gesture. Escape, Home, interruptions, scene
change and page hiding stop the voice. Reduced motion skips the sound.
The approved drawings, positions, sizes, labels and action durations are intact.

Created `game-of-worms/canberra-cafe-audio.js`, `scripts/check-canberra-audio.cjs`,
`game-of-worms/assets/audio/canberra-coffee-slurp.mp3` and
`game-of-worms/assets/audio/canberra-cockatoo.mp3`. Changed the café controller,
its existing test, Game cache keys, audio provenance and this status. No files
deleted. Release branch: `codex/canberra-real-audio`, based on current main.
The unapproved Kauaʻi pour follow-up and dirty Cabinet checkout are untouched.

Passing checks: Canberra audio, café controller, bird art, accessory visits,
labels, JavaScript syntax and whitespace. Browser checks cover coffee contact,
both raids, Home refill, interruption and Escape cleanup. Both MP3s return 200,
with no browser console warnings or errors. Responsive widths 360, 768, 1024
and 1440 px have no horizontal overflow. Full-page captures remain defective
with repeated/scaled content. Actual sizes: 345×2573, 753×2424, 1009×1950 and
1425×1928. They are not valid full-page proofs. Physical devices, Safari and
subjective listening on the user's speakers remain unverified. This is an
audio-only release, with no visual asset or public copy changes.

### Kauaʻi fuller pouring and squeeze sounds, approved for deployment, 2026-09-09

The jug and male dipper rise higher before tipping. A tapered water ribbon,
bright centre, impact spray, runoff and trailing drops make both pours clearer.
The jug is supported by two hands. The pour target is calculated from the lip
and current accessory scale, keeping water downward at sizes from 60 to 200%.
The male still rinses the larger worm's exposed lower body. Default positions,
approved object drawings, labels, background and other scenes are unchanged.

Three new CC0-derived WAVs provide a 1.9 s jug pour, 1.55 s dipper pour and
0.64 s wet-sponge squeeze. Two cone compressions each trigger one squeeze.
See `game-of-worms/assets/audio/SOURCES.md` for sources and hashes. These are
foley recordings. Martyna explicitly approved deployment of this separate
pouring update after the Canberra sound release.

Changed: `kauai-bath-play.js`, `kauai-bath-audio.js`, Game import/cache keys,
`scripts/check-kauai-bath.cjs`, this status, the QG130 dossier, art catalogue and
audio provenance. Added three production WAVs. No files deleted. Existing
approved audio sources are preserved. Release branch:
`codex/kauai-recording-scene`.

Passing checks: bath art/audio/timelines, two distinct squeeze peaks, downward
pour geometry at 60/100/200% with rotation, loupe blink, live loupes, accessory
labels, syntax and whitespace. Browser checks cover both pours, squeezing,
maximum-size jug, exact transform/style restoration, pointer and keyboard
activation, one-action interruption and Escape cleanup. No console warnings
or errors. Normal 360/768/1024/1440 px views have no horizontal overflow.
Full-page captures remain distorted and are not valid proofs. Actual capture
dimensions: 345×2376, 753×2375, 1009×1753 and 1425×1928. Reduced motion is
unit-tested. Physical devices and Safari are untested.

Preview: `http://127.0.0.1:8765/game-of-worms/?review=kauai-pouring`.

### Trivandrum loupe blink, 2026-09-09

Martyna requested blinking when either live loupe crosses a worm's face and
explicitly requested deployment. The existing eyes close briefly along their
tilted eye line. Both original bodies and the live magnified view react.
Elliptical glass hit testing uses the current scene, body and accessory
transforms. Eyes reopen after 310 ms, with at least 2800 ms between blinks.
Reduced motion disables this decorative reaction. Hiding the loupes, leaving
the viewport or changing scenes restores the original eye attributes.
No public copy, artwork files, accessory positions or sizes changed.

Passing checks: new `check-loupe-blink.cjs`, existing `check-live-loupes.cjs`,
`check-trivandrum-refinement.cjs`, `check-trivandrum-watering.cjs`, syntax and
whitespace. Browser checks covered each face, overlapping loupes, a male loupe
resized to 1.1, keyboard movement, accessory toggle, watering and scene cleanup.
Normal views at 360, 768, 1024 and 1440 px have no horizontal overflow or console
errors. Requested full-page captures remain defective, with repeated/scaled
content. Actual captures were 345×2545, 753×2423, 1009×1897 and 1425×1928.
They are not valid full-page proofs. Physical devices and Safari are untested.
Reduced motion and offscreen cleanup are unit-tested.

Created `game-of-worms/loupe-blink.js` and `scripts/check-loupe-blink.cjs`.
Changed the live-loupe integration and Game cache keys. No files deleted.

### Kauaʻi QG130 forest bath, published, 2026-09-09

Martyna approved the forest-bath direction and English-only labels: Shampoo
ginger, Jug and basin, Towels. The new paired activity replaces the random
carts, carousel and hoops. Original ginger/bowl, jug/basin/dipper and fitted
towel drawings are in `kauai-bath-art.js`, with isolated action/audio modules.
The approved forest background, collection copy and other locations are intact.

The first in-page review prompted a narrower layered ginger cone, towel edge
refinement, moving the basin clear of the tail, and bringing used vessels in
front of the towels. The male rinses exposed lower body, not the towel.
There is one foreground action and one recorded sound at a time. Accessories
remain off on a fresh visit. Changed accessory size was verified unchanged
after a full ginger action. Enter, Escape, Home, pointer tap and action
interruption were checked. A legacy SVGMatrix/DOMMatrix mismatch found in the
first browser run was corrected before final review.

Passing checks: `check-kauai-bath.cjs`, `check-accessory-labels.cjs`,
`check-accessory-visit.cjs`, `check-six-location-accessories.cjs`,
`check-reunion.cjs`, `check-nambucca.cjs`, JS syntax and whitespace.
Normal contextual renders at 360, 768, 1024 and 1440 px have no horizontal
overflow. The Game keeps its single fixed light palette.
Full-page captures were requested at all four widths but remain distorted,
with scaled/repeated content and blank space. Their actual image dimensions
were 345×2376, 753×2375, 1009×1753 and 1425×1928 respectively. They do not meet
the full-page proof gate. Reduced-motion frames are unit-tested, not an
emulated browser preference. Physical devices and Safari are untested. The
recorded water/cloth sounds need Martyna's listening check.

Preview: `http://127.0.0.1:8765/game-of-worms/?review=kauai-forest-bath`.
Martyna requested deployment after the final contextual preview on 2026-09-09.
The approved production drawings and audio are unchanged. Published in
`e632c55`, following the unrelated Cabinet commit `0037c33`. Pages run
`34347245958` succeeded. Public art, runtime, audio module and catalogue
files match the approved release.
See the [QG130 dossier](docs/game-of-worms-location-research/kauai-briggsae.md).

### Saint-Benoît JU1373 approved for deployment, 2026-09-09

Martyna approved the concepts: lychees, raincoats with rain, flower arranging.
New original SVG art and an isolated runtime replace the former trays, badge
and rain gauge. The larger worm wears a curved gold coat and the male a shorter
violet poncho. They peel/eat lychees and share a flower-arranging handover.
Follow-up requested 2026-09-09: body panels now follow the lower body curve,
and separately shaped hoods connect at the neck. The ceramic vase was replaced
with a hand-tied bouquet supported by a curved arm. The male passes a stem,
then the larger worm turns and adjusts the bouquet. Holding hands follow the
objects' current size and position, including after revisiting the location.
Lychee eating now has a separate 660 ms CC0 soft-fruit recording at the visible
bite, with the male's 150 ms timing offset. Peeling cues are quieter.
Labels, Tiny surprise and the background are unchanged in this follow-up.
The original landscape is unchanged. Rain is a quiet optional background layer
with real recorded rain, coat rustle, fruit-peeling/eating foley and wrapping-paper
movement. Rain ducks under the one active foreground action. All accessories
remain off on a fresh visit. Existing sizing, movement and keyboard controls remain.

Preview: `http://127.0.0.1:8765/game-of-worms/?review=reunion-rain`.
New English-only labels: `Lychees`, `Raincoats with rain`, `Flower arranging`.
Tiny surprise keeps only its first sentence about the type isolate. No Swedish
or Polish Game version exists. Martyna approved the final contextual preview
and requested deployment on 2026-09-09. Publish these exact production files.
Publication is verified separately after the push.

`check-reunion.cjs` covers six distinct SVGs, paint IDs, timeline bounds,
reduced-motion frames, audio formats, ducking, cancellation and loading failure.
Existing accessory-label, fresh-visit, six-location, Ahmedabad and HCMC checks
pass. Normal browser views checked at 360, 768, 1024 and 1440 px had no horizontal
overflow or console errors. Browser checks confirmed peeling, flower handover,
one foreground effects layer, Escape cleanup and unchanged male size/position
after interrupting an action. A reload started with all accessories off.
The follow-up rechecked both food and flower actions, exactly two holding arms,
Escape cleanup, independent male sizing/movement, scene-exit cleanup and
return-state restoration. The same four normal widths and full-page capture
attempts were repeated for the final drawings. The capture defects remain.
The full-page capture tool still produces duplicated/compressed sections or fails,
so valid complete-page proof is unavailable. Requested widths and returned JPEG
dimensions: 360 -> 345 x 2401, 768 -> 753 x 2375, 1024 -> 1009 x 1753,
1440 -> 1425 x 1928. These are recorded as capture failures, not full-page approval.
Physical-device, Safari, browser-emulated reduced motion and direct listening checks
remain manual. Reduced-motion frame behaviour is covered by the automated test.

Files created: `game-of-worms/reunion-art.js`, `reunion-play.js`, `reunion-audio.js`,
`game-of-worms/assets/audio/reunion-{rain,coat,peel,eat}.wav`, and
`scripts/check-reunion.cjs`. Files changed: Game `accessory-designs.js`, `game.js`,
`index.html`, audio `SOURCES.md`, this status, art catalogue, scene review queue,
and `docs/game-of-worms-location-research/reunion-tropicalis.md`. No files deleted.
The website-maintainer quality gate drove the second drawing pass and the
responsive/contextual checks. Final approval was received on 2026-09-09.

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
- The navigation uses the approved Z3 `MZ` monogram production artwork: a smooth, unswollen central M junction flows directly into a subtly reinforced lower sweep, giving the enlarged Z sufficient optical weight beside the M before tapering into the terminal curl. The open antique-gold upper-left curl, richly shaded berry bellflower and restrained antique-gold terminal complete the mark. Ivory Ink and Petrol Ink use separate 380 × 328 px transparent PNGs with byte-identical alpha geometry and theme-specific palettes. The Ivory Ink flower uses a restrained muted-crimson shadow, richer berry midtone and narrow rose ridge highlight; the Petrol Ink flower retains its deeper berry body, defined inner bell and underside shadows, gently lifted central petal and coloured ridge highlight without white glare. Their exact production bytes are embedded losslessly as PNG data sources because the Pages edge omitted the newly added binary paths; the committed PNGs remain the production masters. The artwork displays within a 58 × 38 px footprint, preserving the existing header height and accessible home-link name. The former separate horizontal rule after the monogram is retired so the custom mark stands on its own. Below 420 px the menu becomes a 44 px icon-only control whose translated label remains accessible. The full-size monogram remains visible from 320 px upward, with a four-pixel column gap through 359 px; only narrower headers omit it.
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
- The homepage header includes a restrained `MZ` monogram in full navigation and in compact navigation from 320 px upward. Below 420 px the menu becomes a 44 px icon-only control whose translated label remains accessible; at 320–359 px it preserves the full-size mark with a four-pixel column gap, while only narrower phone headers omit the monogram. The standard floral divider introduces every full homepage section except About, which follows the hero-specific transition. Its gold and emerald stems use reinforced 1.6 and 2.9 SVG-mask strokes with modest theme-aware contrast; on phones the approved dimensions and footprint remain unchanged while a fine same-colour edge reinforcement keeps the compressed stems and botanical terminals legible. Current work alone uses a fine full-width antique-gold line with the same centred diamond and breathing gap as the hero pause because it is an internal subsection of the broader Research chapter. Research interests use an unnumbered, two-column editorial index with quiet neutral hairlines instead of static cards. Collaborators is one main section: the collaborator list and nested Students subsection share the same flat folio treatment, with one quiet antique-gold internal divider before Students. Beyond Research retains its functional card treatment. The three publication actions are text-only controls with regular rounded-rectangular outlines and no elevation. Contact is a flat composition without an outer card or shadow; its functional actions retain one fixed asymmetric two-column grid on standard phones, one column on the narrowest screens, and a complete set of matching antique-gold line icons. The chatbot introduction and quotation use the original editorial flow, with a fine gold rule beside the quotation, and the footer contains only the copyright name line.
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

## Réunion JU1375, deployment approved, 2026-09-17

Existing vanilla wraps, sugarcane juice and gecko companions refined on
`codex/reunion-accessories` from `58adb7d`. Preview `20260917-reunion-7` includes
border-climbing geckos, a shared cane press and receiving glass, distinct vanilla arrangements and
credited recorded foley. Both geckos walk independently during other activities.
Martyna approved this exact preview for deployment on 2026-09-17. No background
or public copy change. Review count: 24 completed, 7 pending. Next: Praslin YR106.
Details and validation limitations:
`docs/game-of-worms-location-research/reunion-briggsae.md`.

## Praslin YR106, deployment approved, 2026-09-17

Martyna approved shell hiding and requested it for both worms with more natural
movement. Preview `20260917-praslin-7` on port 8773, branch
`codex/praslin-hide-and-seek`, tucks each complete worm into its shell, leaving a tiny tail tip outside.
Both worms can hide at once; either bracelet invites the other to peek, then
emerge. Unaltered art, background and saved accessory transforms are retained.
Recorded bell foley is credited. Martyna approved this exact revision for
deployment on 2026-09-17. Counts: 25 completed, 6 open. Next: Mahahual JU2617.
Details and validation limitations: the Praslin location dossier.


## Mahahual JU2617, local sunscreen preview, 2026-09-17

Preview `20260917-mahahual-22`, port 8774, branch `codex/mahahual-beach-play`.
Both worms take turns applying sunscreen; tap either swimsuit to begin.
The user explicitly dropped bubble blowing from this scene. Refitted swimwear
now has separately movable/resizable female top and wrap; detailed fabric
parasols and recorded lotion foley replace the earlier draft. Sun spectacles
and background remain unchanged. Piece labels: Bikini top, Bikini wrap,
Swim shorts and Sunscreen (the Game is intentionally English-only).
Preview 8 aligns the bikini top across the neck tilt, fixes malformed pole
coordinates, adds two distinct open beach umbrellas, and keeps a tappable
sunscreen tube visible beside the worms between activities. Preview 13 raises
and enlarges both umbrellas into overlapping overhead shade; the broader,
shallower female canopy clears her face. Preview 14 follows the user
correction: umbrellas now render in front, including during sunscreen
application. Preview 17 replaces sliding with canopy dragging around fixed
planted pole tips. Independent keyboard tilt, angle reset and anchored sizing
work for both umbrellas, with scene-edge limits. Preview 19 also permits
vertical dragging to raise/lower the whole umbrella: Left/Right tilt and
Up/Down move vertically. Horizontal tilt keeps the base fixed.
Preview 21 adds slight above-frame headroom and soft ground shadows that
follow each umbrella’s tilt, position and size, clipped to the habitat.
Preview 22 removes the smaller canopy’s extra hinge angle so it aligns with
its pole. Approved for deployment on 2026-09-17.
Review count: 26 completed, 5 open. Next: Salt Lake City EG4181.
Details and validation: docs/game-of-worms-location-research/mahahual-nigoni.md.
