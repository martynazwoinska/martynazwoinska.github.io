# Hidden gems and the assembly puzzle

Status: implementation and deployment approved by Martyna on 2026-09-20, on `codex/gem-hunt`, based on current main `4c3e79a`. Publication verification is recorded in the deployment report. The Game remains English-only, as documented in the agent workflow; these strings intentionally have no partial Swedish or Polish translation.

## Board and dialog refinement, deployment approved 2026-09-20

Based on deployed `ade4a73`. Replaced the corner flourishes with simple gold
lines and added a shallow shaded heart recess and tray edge. The close button
now sits beside the title in a separate header above scrolling content. The
collection tray shows only gems, with numbered accessible names. Game copy
remains intentionally English-only. Geometry, colours, rules and saves are unchanged.

Changed: `game-of-worms/treasure-board-art.js`, `treasure-puzzle.js`,
`treasure-hunt.js`, `treasure.css`, `game.js`, `index.html`, this document and
`PROJECT_STATUS.md`. No files created or deleted. Import versions refresh the
approved production files. Unrelated Cabinet work is preserved.

Puzzle and completion checks pass, plus JavaScript syntax and whitespace checks.
Browser checks passed for completion, both level controls, close, Escape/focus
restoration and no console errors. At actual widths 360/768/1024/1440 px,
there is no horizontal overflow and the 44px close button stays above the
scrolling play area. The Game retains its fixed light palette.

Full-page capture remains unreliable: the tool produced distorted stitched
images at 277x2056, 591x1808, 787x1535 and 1108x1485 pixels instead of the
requested widths. These are not valid full-page proofs. Normal-size browser
renders were inspected and approved by Martyna before this deployment request.

## Approved polish release, 2026-09-20

The current polish is based on main `5b206e1`. Martyna reviewed the preview and
requested deployment. Only **Easy** and **Mystery** remain. Easy is unchanged;
Mystery uses the former Medium rules: outline, rotation and individual snapping.
Existing Easy/Medium poses are preserved. Retired freeform Mystery saves migrate
to the new Mystery puzzle without losing gems or completed-mode history.

Queensland requires a canopy-height photograph followed by opening a glinting
leaf. In the Kauaʻi forest bath, a crystal peeks from either worm's face cloth,
slips out and drops. Both discoveries support reduced motion and persistence.
Discovery notices use the heading space below the scene. Collected gems stay
visible above the puzzle without a disclosure menu. The successful-save note
and redundant level introduction are removed; the storage-failure warning remains.

Approved English-only copy:

- Hooray! You found all 8 gems! Now open your treasure chest and solve the puzzle.
- Hooray! You found all 8 gems! Choose a difficulty and solve the puzzle.
- A glint behind the leaves. Take a closer look.
- Look behind the canopy leaves
- Easy / Mystery

The wooden/brass chest icon, ivory tray, emerald board and botanical corners were
approved in context. Completion adds one clipped light sweep and twelve finite
stars. Reduced-motion and restored solutions use a static finish. Restart clears
the effect. Mouse dragging, the Turn piece control and keyboard movement work.

All eleven focused checks pass: puzzle, finish, discoveries, Queensland canopy,
Kauaʻi bath, Mauritius, Salt Lake bubbles, Bali cacao, Araucanía garden, live loupes
and Edinburgh pipes. Browser checks covered discoveries, reduced motion, saves,
both levels, mouse completion, keyboard controls, restart and Escape/focus return.
No console errors or horizontal overflow. Uncropped full-page two-level proofs
at 360/768/1024/1440 CSS px measure 360x2675, 768x2352, 1024x1997 and
1440x1933 pixels. Dialog content scrolls vertically; viewport proofs also show the
complete board and finish. The Game retains its fixed light palette.

Created for this polish: `game-of-worms/assets/treasure-chest.svg`,
`game-of-worms/treasure-board-art.js`, `game-of-worms/treasure-discoveries.js`,
`scripts/check-treasure-discoveries.cjs`, `scripts/check-treasure-finish.cjs`.
Changed: Game index, game, Kauaʻi bath, Queensland, treasure hunt/model/pieces/puzzle,
treasure CSS, puzzle check, PROJECT_STATUS.md and this document. Deleted: none.
Gem geometry, colours and unrelated checkouts are preserved. QA fixtures stay untracked.

The sections below record the original release and earlier design iterations.
The two-level polish above supersedes their three-level references.

## Original player experience

The former species-met badge is replaced by a small chest and **Hidden gems · 0/8**. The family dialog remains available through **Meet the whole family**. No heart silhouette or assembled preview appears during the hunt. Pieces are eight original geometric jewels with straight 45 and 90 degree edges and distinct colours. The tray shows them in discovery order, rotated apart.

| Gem | Scene | Discovery |
|---|---|---|
| India | C. nigoni, Trivandrum JU1325 | Move either loupe over the tiny crystal within the large worm's sample tube. Optical overlap is checked in the lens's coordinates. |
| Bali | C. wallacei, Sanda JU1873 | Open the hanging cacao pod with the machete. |
| Mauritius | C. nigoni, JU2909 | Complete a fruit pickup with either dodo grabber. |
| Scotland | C. elegans, Edinburgh | Open the telescope view; turn its focus wheel twice. |
| Bubbles | C. briggsae, Salt Lake City EG4181 | Pop a bubble carrying a gem. If it expires, the next eligible bubble carries it again. |
| Compost | C. elegans, Araucanía | Complete the wheelbarrow tip. |
| Canopy | C. tropicalis, Queensland QG2904 | Reach canopy height in the lift. |
| Towel | C. briggsae, Kauaʻi QG130 | Lift the towel flap during wiping. This is not the C. elegans recording scene. |

Each discovery uses an explicit animation milestone. Reduced-motion paths provide the same reward. A revealed gem remains available after cancellation, wardrobe changes, leaving the location or reloading. A 48-pixel button collects it. The sample gem follows the tube while that mounted tube remains present; dropped finds remain at their ground position. Existing accessories, images, fitted geometry, sounds and visitor transforms are unchanged.

## Puzzle

- **Easy:** visible individual slots, no rotation, larger snap tolerance.
- **Medium:** silhouette only; quarter-turn rotation and smaller snap tolerance.
- **Mystery:** no silhouette. Correct neighboring edges join anywhere on the board. Connected groups translate and rotate rigidly together. Completion works at every quarter-turn orientation.
- Dragging, select-then-tap, arrow keys, Shift+arrows for fine movement, R for rotation, and Enter/Space for selection/checking are supported.
- A completed puzzle can be replayed or its difficulty changed without repeating the hunt.
- The collected-piece tray is available through **Your eight discoveries** after unlocking the puzzle.

## Persistence and integration

`treasure-model.js` owns versioned save parsing and the pure puzzle operations. `treasure-pieces.js` defines the exact shared seam geometry, SVG facets and scene-event helper. `treasure-hunt.js` owns the chest, clues, collection and telescope view. `treasure-puzzle.js` owns assembly controls. `treasure.css` stays scoped to those new components.

The local-storage key is `worm-atlas-treasures-v1`. Stored data includes collected IDs, revealed positions, current puzzle poses/groups and completed modes. Unknown IDs and malformed data are discarded; invalid puzzle data cannot erase the collection. Collection updates from other tabs are merged. No account, external service or cross-device synchronization is involved. If browser storage fails, a visible note explains that progress is only kept for the current page session. Scene resets do not clear the collection.

## Exact main English copy for preview review

- Hidden gems
- Your treasure chest
- Find eight gems hidden in the worm scenes. Play with the accessories to uncover them.
- You found every gem! Ready to solve the puzzle?
- Your eight discoveries
- Give me a hint / Another place / A little more help / Show place again
- Choose your puzzle
- Easy
- Medium
- Mystery
- Choose a level to begin. You can change it later without finding the gems again.
- Fit the gems into the outline.
- Join matching edges anywhere on the board. Connected pieces move together.
- Drag, or select a piece then tap its destination. Keyboard: arrows move, R turns, Enter checks the fit.
- Turn piece ↻ / Start this puzzle again / Close
- A heart! Eight discoveries, one treasure.
- Progress saves in this browser.
- This browser cannot save progress. Keep this page open to continue your hunt.
- Something sparkled! Tap the gem to collect it.
- Gem found! [number] of 8 collected.
- All eight gems found! Open your chest to choose a puzzle.
- Through the telescope
- A small sparkle in the distance. Bring it into focus.
- Turn the focus wheel / Collect gem
- There it is! A gem!

Location labels and progressive hints live together in `treasure-model.js`. Accessible collection/puzzle announcements use the same English-only scope. Martyna reviewed the local experience and refined gem artwork, then approved implementation and deployment on 2026-09-20.

## Validation

The eight normal-motion discoveries were exercised through the local browser, followed by complete Easy, Medium and freely positioned sideways Mystery solutions. Keyboard movement, rotation, Escape/focus restoration, collection persistence and partial-puzzle persistence were checked. The focused Node test checks exact tiling, sampled no-gap/no-overlap geometry, starting bounds, snapping, rigid groups at all four orientations and malformed-save handling. Existing scene regressions remain part of the final check.

Temporary QA fixtures and screenshots are kept under the worktree's untracked `output/` folder and must not be committed.

Final checks: nine focused checks passed (treasure geometry/state, Mauritius, Queensland, Kauaʻi bath, Salt Lake, Bali cacao, Araucanía, live loupes and Edinburgh pipes), plus syntax checks for all changed JavaScript and `git diff --check`. The six discoveries driven by animations were also collected using a local reduced-motion test fixture. No browser console errors were reported. The Game's fixed light palette remains unchanged; it has no separate dark mode.

Uncropped full-page screenshots, with their measured image dimensions:

- `output/gems-page-360.jpg`: 360 × 2675
- `output/gems-page-768.jpg`: 768 × 2349
- `output/gems-page-1024.jpg`: 1024 × 1997
- `output/gems-page-1440.jpg`: 1440 × 1933

All four widths had no horizontal document overflow. Additional screenshots show the actual puzzle dialog. The mobile refinement keeps its full board and turn controls within the phone view. The ordinary hint UI and telescope view are native dialogs with Escape and focus restoration.

## File inventory

Created: `game-of-worms/treasure-pieces.js`, `treasure-model.js`, `treasure-puzzle.js`, `treasure-hunt.js`, `treasure.css`; `scripts/check-treasure-puzzle.cjs`; this document.

Changed: `game-of-worms/index.html`, `game.js`, `bali-cacao.js`, `mauritius-play.js`, `salt-lake-play.js`, `araucania-play.js`, `queensland-play.js`, `kauai-bath-play.js`; `scripts/check-araucania-garden.cjs` (resolves the added module in its existing test loader).

Deleted: none. No approved source image or unrelated checkout file was edited. Changes under `game-of-worms/` are intentional. No new dependency or build system was introduced. Remaining limitation: progress is local to the browser/origin, without account synchronization.

## Regular coloured pieces revision

Replaced the radial shards with an original square-lattice heart dissection. The eight colours identify the pieces: ruby, sapphire, amber, amethyst, emerald, rose, aquamarine and orange. Even-width bevels and restrained highlights communicate cut crystal. Reference inspected: https://www.smartgames.eu/uk/one-player-games/iq-love . No reference assets were copied.

Shared-edge neighbors are derived from the actual polygons. Half-turn symmetry of the rectangular piece is accepted. Geometry revision 2 resets obsolete assembly positions while retaining collected gems. Scene and collection icons fit within their intended bounds. Public wording remains English-only, unchanged in this revision; the controls still read Easy, Medium, Mystery.

The updated geometry/state check passes, including exact coverage, regular edge angles, contained bevels, eight colours, orientation symmetry and save migration. Easy and sideways Mystery were completed through the browser controls. No console errors or horizontal overflow at 360, 768, 1024 or 1440 px. Uncropped proof files regular-page-360.jpg, regular-page-768.jpg, regular-page-1024.jpg and regular-page-1440.jpg in output measure 360 x 2675, 768 x 2349, 1024 x 1997 and 1440 x 1933 respectively. Additional regular-puzzle screenshots show the actual dialog. Preview only, not committed or deployed.

## Gem surface polish

Changed only the drawing in treasure-pieces.js: broader split crown facets, richer shaded faces, a thin polished rim and restrained corner glints. Geometry, colour identities, collection progress and puzzle logic are unchanged. A second visual pass softened the strongest white reflections. No production files were created or deleted for this refinement.

Geometry/state tests, JavaScript syntax and diff whitespace checks passed. Browser console reported no errors. DOM layout checks passed without horizontal overflow at 360, 768, 1024 and 1440 CSS pixels. Normal-size viewport render was inspected. The full-page screenshot tool produced scaled and visibly faulty stitched captures this time: 277 x 2056, 590 x 1805, 787 x 1534 and 1108 x 1485 pixels for the respective widths. These polished-page files are diagnostic captures, not valid full-page proofs; full-page visual validation remains manual. Fixed light Game palette only. Preview only, not committed or deployed.
