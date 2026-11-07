# Cabinet open writing-desk base

Implemented 2026-11-07 on `codex/cabinet-bottom-preview`. Not deployed.

## Files and scope

Created:
- `cabinet-of-curiosities/assets/cabinet-bottom-extension-v3.webp`
- `cabinet-of-curiosities/assets/cabinet-bottom-blend-v3.svg`
- `cabinet-of-curiosities/cabinet-desk.css`
- this document.

Changed `cabinet-of-curiosities/index.html`, `cabinet-of-curiosities/cabinet-map.js`
and `PROJECT_STATUS.md`. No tracked files deleted. No Game or homepage changes.
Unused preview assets and screenshots remain outside the checkout.

The background-only lower strip uses the approved open-legroom edit generated
with the built-in image tool. It is a lossless 1536 x 370 WebP, extracted from
rows 654 through 1023 of the 1536 x 1024 generated background. Its bytes are
identical to the approved preview; the generated upper scene is never displayed.

SHA-256 of the approved lower strip:
`C0D7EA3CAB7B366027EC737736E68244FF2B95D76CCBC1FF0FC5D571E873A301`.

The separate background joining mask uses `preserveAspectRatio="none"` to follow
the image's rendered dimensions. Its fade finishes four source pixels before the
old upper image ends, with an uninterrupted opaque region below and overlapping
transition edges. This fixes the prior mask's letterboxing and antialiased seams,
which let the light page background show through. No object mask was changed.

The complete scene has aspect ratio 1905.7456 / 1407.3596. The original assembly
occupies its upper 75 percent and retains its original coordinates. The map
drawer and its animation attach to that original assembly. Pan/zoom continues
to transform the complete outer scene, including hotspots and the new base.

## Validation

Full-page proofs in both themes: 360 x 4695, 768 x 3174, 1024 x 768 and
1440 x 1000 pixels. Landscape touch proof: 844 x 390. Additional tabletop review
at 1920 x 1200, with an optional detail capture in addition to the full page.
Full-page screenshots are kept outside the repository.

Passed: image loading, no horizontal overflow, expected scene/extension bounds,
map opening by Enter, Escape closing with focus return, desktop object dialog,
touch zoom/reset, JavaScript syntax and `git diff --check`. No JavaScript or
local asset errors. Touch checks use browser emulation, not a physical phone.
The final lower-furniture region crossing the old image boundary is pixel-identical
between light and dark themes (575700 colour samples), confirming no theme bleed.

Protected object-layer hashes still match the pre-edit versions:
- v75: `E94F76341A2F5D95D7C6888BA7C4699976DE34B07CA8E8FA92B3CA6C4C1591FC`
- v76: `AAFA5496CED8D57EBA13F97486A66EC5E6046187CD3569625ACFD9ED14C0A8F6`

## Tabletop shadow inspection

Visual assessment, not a measured reconstruction of the light source:
- The window at the left is a plausible main source. The brighter left tabletop,
  metal and pot highlights, and darker right/rear areas broadly agree.
- The lamp base and pot have visible contact shadows. Soft shadows are plausible
  with a large window; crisp leaf silhouettes are not required.
- The darker strip at the back of the tabletop and under the front lip supports
  the furniture's depth. Pale patches on the polished wood can be reflections,
  so darkening all of them would not necessarily improve realism.
- Paradai Chanthaburi is the weakest connection: its narrow, faint contact strip
  does not strongly convey the bar leaning against the cabinet. A restrained soft
  cast shadow attached to its base and extending away from the left-hand window
  would help. Exact direction/length needs a deliberate lighting edit and visual
  proof; no tabletop shadows or chocolate pixels were changed in this task.
