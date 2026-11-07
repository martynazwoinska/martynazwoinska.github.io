# Paradai tabletop and shadow correction

Approved for publication, 2026-11-07, following review of the v142 tabletop
correction and v143 object contours in the actual page.

## Follow-up: object contours

Martyna approved the Paradai correction and requested more depth around other
objects. The approved v143 version retains the exact approved tabletop patch and
Paradai shadow markup. Only separate shadow layers receive the new styling:

- Wrappers have a tighter contact edge and a slightly broader, diffuse cast
  shadow towards the lower right, consistent with the window at the left.
- Crocheted eyes have fuller shadows to suggest the yarn's greater thickness.
  Their shadow-only silhouettes share the original eye animation timing and
  rotation, while the stationary parent filter maintains the light direction.
- The sticker and blue paper note use lighter shadows appropriate to flat paper.
- Chof already has a raised, hanging treatment and remains unchanged.

No source image or alpha layer is edited, filtered, recoloured or replaced.
Shadow copies return only the shaded silhouette; original images are rendered
as before. No new image files or dependencies were introduced for this follow-up.
Files changed for the follow-up: Cabinet `index.html`, `cabinet-desk.css`,
`PROJECT_STATUS.md` and this document. Nothing deleted; no Game changes.

The refinement pass separated thin paper from the more substantial wrappers
and yarn. Full-page comparisons at 1920 x 1080 were inspected alongside detail
views. Final full-page proofs in both themes: 360 x 4629, 768 x 3033,
1024 x 768, 1440 x 1000 and 1920 x 1080. Landscape touch: 844 x 390.
All image loading, geometry, overflow, console, drawer keyboard/focus, details,
and zoom/reset checks passed. An initial concurrent check timed out waiting for
images; the diagnostic rerun completed every case without missing images or
errors. Hover, keyboard-focus and phone-tap tests confirmed matching eye/shadow
rotation matrices, animation start times and durations. Reduced motion disables
both. Mobile checks remain browser emulation. `git diff --check` passed.

The protected alpha hashes and the tabletop patch hash below still match.
Prepared on `codex/cabinet-bottom-preview`, with the reviewed production files
retained exactly for publication. Full-page proofs and comparisons remain outside
the repository as `cabinet-contours-*`.

The previously published change strengthened the bottom contact edge but left
the broad dark streak and pale patch already present in the background image.
That did not adequately improve the bar's relationship to the tabletop.

## Production changes

- Added `cabinet-of-curiosities/assets/cabinet-tabletop-paradai-clean-v1.webp`:
  a 1774 x 887 lossless transparent WebP, 38,674 bytes. Only the small tabletop
  region x=381..899, y=669..737 has nonzero alpha. It is registered to the existing
  background; the lamp, frame, front lip, plant and furniture remain unchanged.
- Replaced Paradai's SVG cast shadow with a projection attached to its actual
  base, extending rightward and slightly forward across the tabletop, fading
  and softening with distance from contact. The large left window is the visual
  lighting reference; this is an artistic approximation, not a measured model.
- Excluded the standing bar from the generic wall-wrapper drop shadow to avoid
  casting a halo around its upper edges. The separate tight bottom contact
  shadow remains. Only shadow markup is changed, not the photographed object.
- Updated Cabinet `index.html` and `cabinet-desk.css`. No public text changes.

The clean tabletop was edited using the built-in image tool from the approved
empty background. The output is preserved separately; only a feathered local
patch is used. Generation source:
`exec-9eb55518-2f7e-4294-98c8-e961a75a3ae5.png`.
The exact prompt is retained with the task's preview artifacts.

### Image-edit prompt

> Edit target: the supplied empty walnut cabinet room photograph. This is a localized lighting repair for a layered website. Preserve the exact viewpoint, dimensions, furniture geometry, timber grain, colours and all objects. Change ONLY the small horizontal tabletop area immediately in front of the LEFT HALF of the display board, approximately x=410 to 830, y=669 to 728 in this 1774 by 887 image. Remove the broad dark streak/patch running through this area and restore continuous walnut tabletop grain with soft diffuse daylight from the large left window. The tabletop should remain brown and textured, not washed out or beige. Keep the gentle rear contact shadow right against the wooden frame at y=668 and keep the lamp base contact shadow. No new chocolate bar, no new props, no invented shadow from an absent object: this is a clean plate on which a separate photographed chocolate wrapper and its physical shadow will be placed. Keep all other pixels visually unchanged. Do not redesign the lamp, plant, room, woven board, drawer or front lip. Output the full original composition, no crop.

The first contextual pass left too much shadow against the rear frame. A second
pass increased its tabletop projection and adjusted the fade accordingly.

Production patch SHA-256:
`DF63AC2ACA8819221C907363B06D366215E91C5B0C3C33D7B8E85BE51D1D9280`.

Protected object layers match their pre-edit SHA-256 hashes:
- v75: `E94F76341A2F5D95D7C6888BA7C4699976DE34B07CA8E8FA92B3CA6C4C1591FC`
- v76: `AAFA5496CED8D57EBA13F97486A66EC5E6046187CD3569625ACFD9ED14C0A8F6`

No files deleted. No Game, homepage, plant, rug or original photograph changes.
The unrelated untracked `cabinet-plant-natural-v6.webp` remains untouched.

## Validation

Full-page browser proofs passed in both themes: 360 x 4629, 768 x 3033,
1024 x 768, 1440 x 1000 and 1920 x 1080. Landscape touch proof: 844 x 390.
Full screenshots are retained outside the
repository; supplementary tabletop details do not replace full-page proofs.
Checks cover asset loading, shadow/background registration, horizontal overflow,
console errors, drawer keyboard opening and focus return, object details, and
landscape zoom/reset. All passed, with no image failures or JavaScript errors.
Mobile checks use browser emulation. `git diff --check` passed.

Created: the production patch and this document. Changed: Cabinet `index.html`,
`cabinet-desk.css`, and `PROJECT_STATUS.md`. No files deleted. Working branch:
`codex/cabinet-bottom-preview`. Publication was explicitly requested after review.
