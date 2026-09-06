# PROJECT_STATUS.md

Last updated: 2026-08-30

This file records approved decisions and the verified implementation state. Always inspect the current repository before acting.

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
