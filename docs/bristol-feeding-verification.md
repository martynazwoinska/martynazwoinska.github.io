# Bristol feeding verification

## Change

A 4.5-second reach, lift, bite, three-chew and return sequence replaces the
continuous pumping. One colony visibly travels to the mouth. The dish stays
below the face, with extra clearance for the male. Existing quiet eating audio
is reused, prepared from the user's gesture and stopped with the action.

Created: this record; `scripts/check-n2-feeding-audio.cjs`.
Changed: `game-of-worms/n2-feeding.js`, Game module cache versions in `game.js`
and `index.html`, `scripts/check-four-scenes-motion.cjs`, `PROJECT_STATUS.md`.
Deleted: none. No image or audio asset bytes changed. No public copy changed.

## Checks

- Motion checks: grip precedes lifting; bite transfer completes before portion
  consumption; three separated chew pulses; mouth closes before lowering;
  smooth plate travel; separate plate counts and explicit refill; reduced motion.
- Audio checks: valid existing WAV and excerpt bounds; gesture preparation;
  cached decoding; three bounded-volume excerpts; cancellation; offline fallback.
- Existing N2 tailoring and cryo-flight regression checks pass.
- Browser: both held feeding poses inspected using the production drawing code
  with elapsed time fixed in an uncommitted local fixture. Male clearance refined
  after inspection. Normal action completion removes temporary carriers, consumes
  one male portion only, and preserves a visitor's 4px plate offset. No console errors.
- Responsive DOM checks at widths 360, 768, 1024 and 1440: no horizontal overflow.
  Document heights were 2479, 2211, 1896 and 1865px respectively.
- Full-page screenshot capture was attempted at all four sizes but the browser
  returned capture errors. Therefore complete responsive screenshot proof remains
  unavailable; viewport captures were inspected. The Game has a fixed light palette.
- Audio scheduling and recording validity were checked; listening quality still
  requires human assessment.

Local preview fixtures remain untracked under `output/` and are not deployed.
