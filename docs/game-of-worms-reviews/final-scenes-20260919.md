# Final scene interaction review — 19 September 2026

## Scope and authorization

Martyna approved Orsay preview 3 for deployment, then explicitly asked for
independent review, implementation and deployment of the remaining scenes while
away. The queue had Santeuil, Tenerife and **C. elegans** Kauaʻi remaining.
Completed scenes were not visually re-audited. QG130's forest bath was not changed.

Orsay is published as `66be258`; Pages run `35434141050` succeeded. Its HTML,
game module, accessory catalogue, two scene modules and pencil recording matched
the committed bytes. A live notebook action worked without new browser errors.

## Decisions and implemented behavior

All three remaining scenes passed a production-size review of their existing
silhouettes, materials, separate paired construction and fit. Decision:
**retain art; add focused interactions**. Existing paths, fills and dimensions
are checked against Orsay's base commit. Backgrounds and public wording are
unchanged; there are no new translation strings.

### Santeuil

- Tap either instrument: the larger worm cranks the organ or the male opens and
  closes his concertina. The other worm gently follows the phrase.
- Tap either vehicle: a short shared shunting action rolls the locomotive and
  trolley out and back. Wheels, connecting rod and trolley handle move; hands
  follow the controls, tails remain planted, and a recorded whistle sounds once.
- Uniforms stay quiet and retain their approved jacket/cap fit.
- Refinement corrected trolley rail height, kept wheel back faces stationary,
  linked the locomotive rod to wheel phase and smoothed the crank's start/stop.

### Tenerife

- Tap either guitar for its distinct eight-strum rhythm. Hands cross the strings
  and hold the neck. The other worm bends through the middle; existing wings
  make small gestures about their feather roots.
- Either bowl starts a quieter single bite, taking an existing morsel to the
  mouth. The drawing returns intact for repeat play.
- Canary costumes, five-string instruments, bowls and all placements remain.
- Refinement gives each strumming stroke a smooth return and alternates two
  real nylon-string attacks instead of repeating one identical hit.

### Kauaʻi XZ1516

- Tap a microphone for that worm's short whistled phrase. When the recorder is
  visible, the completed take joins the current visit's two-take memory.
- Tap the recorder to replay the latest take from each performer in recording
  order. Before a take exists, it plays a two-part demonstration.
- Reels turn only during an action. Meter needles follow the phrase; the lamp
  changes between record and playback. The male reaches the transport controls.
- Headphones follow the small head movements and otherwise remain quiet.
- No microphone access, visitor audio recording, storage or background playback.
  Leaving the scene clears the takes. Interrupted takes are not retained.

## References and sound boundaries

Existing construction references remain in each location dossier; no replacement
illustrations were introduced. Real recordings and exact source links/hashes are
in [audio sources](../../game-of-worms/assets/audio/SOURCES.md).

The organ recording is a barrel-organ performance of Mendelssohn, not the
Santeuil heritage instrument. Accordion reeds supply concertina-like musical
foley; ukulele attacks supply nylon-string strumming foley, not a claimed timple
field recording or traditional Canarian performance. The whistle is human
foley for imaginary worms, not a biological nematode call. None was recorded at
the collection sites.

## Validation

- Focused tests for Santeuil, Tenerife, Kauaʻi, Orsay and final-scene movement pass.
  Approved visible geometry/paint is unchanged. Added groups expose mechanisms.
- Existing accessory labels and visit/reset checks pass. The older Kauaʻi test's
  mock now supports attribute selectors used by already-published renderers;
  its obsolete assumption of only one shared prop in the entire atlas is fixed.
- JavaScript syntax, full-diff review and `git diff --check` pass.
- Browser: both instrument roles, train action, guitar and snack activation,
  microphone recording and tape playback; pointer/keyboard activation, Escape,
  arrow movement, resizing, Home reset and leaving-scene cleanup.
- Exact body markup and saved accessory transforms restore after Santeuil play.
  Recorder dragging and playback after resizing work. Temporary layers and hidden
  originals clear. New runtime errors found during development were fixed and
  the corrected release checked again.
- Original audio assets decode locally. Voices are gesture-triggered, bounded,
  faded and stopped on interruption; no delayed sound starts after cancellation.
- Game retains its fixed light palette. No homepage/Cabinet/theme changes.

Four-width document checks found no horizontal overflow. Complete-page captures
were attempted, but the tool still returns scaled content, blank regions and
duplicated sections. These are **not accepted full-page visual proofs**:

| CSS viewport width | Document height | Returned JPEG pixels |
| --- | --- | --- |
| 360 | 2536 | 268 × 1951 |
| 768 | 2402 | 582 × 1847 |
| 1024 | 1879 | 778 × 1445 |
| 1440 | 1927 | 1098 × 1482 |

Normal viewport scene inspection is supplementary. Physical touch devices,
Safari, subjective listening and OS reduced-motion emulation remain manual.
Reduced motion is source-checked: static brief feedback, no animated action or
sound. User assessment is intentionally after deployment under the instruction
above.

## Files and release

Created: `scene-performance.js`, `final-scenes-play.js`, six small audio assets
under `game-of-worms/assets/audio/`, `scripts/check-final-scenes.cjs`, this report.
Changed: the three existing accessory modules, Game entry/import wiring,
two existing focused tests, audio provenance and scene-review documentation.
Deleted tracked files: none. All production changes are under `game-of-worms/`;
supporting scripts/docs are scoped to the same task. Unrelated checkouts remain
untouched. Branch: `codex/final-scene-interactions`.

Published as `758bc2a0dd799ad76a4935d65acf13193fe18a87`. GitHub Pages run
`35435066808` succeeded. All 14 changed production assets (HTML, seven JavaScript
modules and six recordings) match committed bytes on the public site. Live
Santeuil instrument/train, Tenerife guitar/snack and Kauaʻi recording/playback
actions were checked. There are no new release browser errors; temporary layers
clear after completion and scene changes. The unrelated Cabinet checkout retains
its original pending changes.
