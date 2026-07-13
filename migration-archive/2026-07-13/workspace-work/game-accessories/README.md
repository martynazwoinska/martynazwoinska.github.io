# Game of Worms accessory handoff

Target repository: `martynazwoinska/martynazwoinska.github.io`

Apply `game-accessories.patch` from the repository root.

Base file SHAs inspected before preparing this patch:

- `game-of-worms/game.js`: `0dae7a11e5b2a74f49010e24606aa7fa97c14a17`
- `game-of-worms/index.html`: `1f15be3e2a3c2ea91c20116585c5a951078ff06a`
- `game-of-worms/style.css`: `018d8b9ac6076341d97ffc9884e76b34fcccec92`

The patch intentionally changes only files under `game-of-worms/`.

Included changes:

- Initial `C. elegans` N2 counts as the first species met.
- All location kits fall back to the species' drawn SVG accessories instead of floating emoji-only accessories.
- Location emoji remain only as small attached accents when a kit has no dedicated custom drawing.
- The missing `C. nigoni` reveal selector is added.
- The N2 NGM/OP50 plates, lab coats and cryo-vial packs are redrawn and anchored to both worms.
- Static first-paint state and cache query strings are updated.

After applying, validate desktop and mobile, toggle all three N2 accessories, switch through all species and representative locations, and check the browser console.
