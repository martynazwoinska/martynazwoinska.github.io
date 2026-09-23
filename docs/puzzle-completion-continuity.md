# Puzzle completion continuity, 2026-09-23

## Changes

Completion retains the existing board viewBox, frame and caption position. The
finish animation begins on the assembled heart in its playing position. The
completion message occupies the instruction slot without changing its height.
The existing press-and-heartbeat interaction remains available. The finish sound
now has a softer answering phrase and decays over about 5.2 seconds.

Start again and Restart gem hunt share a flex row. Restart confirmation appears
below the controls and still requires the existing explicit confirmation.
No public wording, gem artwork or collection/discovery behavior changed.

## Verification

- Browser Easy completion: board bounds, dialog bounds, crop and frame remain
  unchanged after final placement; scroll position remains 187px before/after
  once keyboard focus is on the final piece.
- Browser Mystery completion at 360px: board bounds and scroll position remain
  unchanged; both restart buttons have the same top coordinate.
- Same-row reset controls and no page overflow at 360, 768, 1024 and 1440px.
- Keyboard completion, pressing the finished heart, Start again, cancellation of
  hunt restart and confirmed restart exercised in an isolated local test origin.
  Real visitor gem progress was not changed.
- Reduced-motion completion and restart exercised. No browser console errors.
- Puzzle model, restart, heart press and finish/audio regression scripts pass.
  Audio test covers longer finite release, gesture start, cancellation, hidden
  pages, missing audio support and the unchanged short press heartbeat.
- Full-page screenshots were attempted at all four widths but the browser capture
  failed. Viewport images were inspected; full-page visual proof is unavailable.
  Audio scheduling was verified; subjective listening remains a human check.
- The Game uses its intentional fixed light palette.

Changed production files: treasure-puzzle.js, treasure-hunt.js,
treasure-finish-sound.js, treasure.css, game.js and index.html under game-of-worms.
Changed checks: scripts/check-treasure-finish.cjs. Updated PROJECT_STATUS.md.
Created: this verification record. Deleted: none. Untracked preview fixtures are
excluded from deployment.
