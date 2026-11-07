# Cabinet open writing-desk base

Implemented 2026-11-07 on `codex/cabinet-bottom-preview` for GitHub Pages on main.

## Original wide framing, natural foliage and corrected shadows

Approved for publication on 2026-11-07. Martyna clarified that the lower
furniture is secondary: preserve the original wide composition, and display the
generated extension only where spare space remains. Do not scale down the board
to fit the complete desk and rug. The camera therefore retains its original
1905.7456 / 1055.5197 aspect ratio; the original upper assembly fills the camera,
and the lower assets extend beyond it inside the clipped stage. Phone browsing
retains the original landscape-shaped overview. Panning and zooming still move
the board and its hotspots together.

The fluffy rug patch is `assets/cabinet-rug-fluffy-v5.webp` (840 x 210), placed
at reference x=360, y=1082 in a 1536-wide composition. The unchanged lower base
starts at y=654. Coordinates are now expressed relative to the original
768-high upper assembly rather than scaling the board to a 1292-high scene.

`assets/cabinet-plant-natural-v7.webp` is a transparent 1774 x 887 background
patch, generated with the built-in image editing tool. Only the plant region
is revealed. It has a few coherent branches, individually varied leaves and
open gaps; the original pot body, saucer, tabletop, furniture and photographed
objects are preserved. The compositing refinement removes old stem fragments
where the new stems enter the pot. Botanical structure was checked against the
[RHS coffee plant profile](https://www.rhs.org.uk/plants/4159/coffea-arabica/details):
opposite glossy leaves are retained without mirrored repetition.

The v7 follow-up adds one upward branch in the middle gap. Existing foreground
leaves overlap it naturally. It is a lossless derivative of v6: all visible
pixels outside the small branch region are identical. V6 is preserved locally
as source history; only the final V7 file is published.

Plant patch SHA-256:
`21C27805B07499B2DA4DB9745CAEC49DE24EDE12A53E15AF087A541EE7AD8A6E`.
The v75/v76 protected object hashes below still match. Martyna approved the plant
with the additional branch; that exact production file remains unchanged.

The subsequent shadow correction replaces the earlier Paradai paths. They had
started above its actual base, partly concealed by the object. The approved
cutout's lower edge runs from (362,850) to (548,811), then its internal 35-unit
translation places the base at (362,885) to (548,846). The contact shadow now
follows that edge. Its soft cast shadow extends rightward from the base, away
from the left window; the fade is perpendicular to the base, maintaining even
contact across its length. A tighter dark contact and a separate diffuse shadow
give wrappers depth without changing their image files. The lower wooden frame
uses a close contact line and a short soft fade onto the tabletop. Lamp and pot
contact shadows were inspected and retained because they already fit the light.

Shadow implementation uses existing SVG layers only; no generated image, crop,
lighting filter or alpha-mask change was applied to any photographed object.
Before/after full-page proofs at 1920 x 1080 and supplementary Paradai details
confirm the visible correction. Both themes and the responsive matrix below
were checked again. The exact reviewed assets are approved for publication.

Changed: Cabinet `index.html`, `cabinet-desk.css`, this document and
`PROJECT_STATUS.md`. New production files: the plant and fluffy rug
patches. Deleted: none. No Game or homepage changes. No public copy changes.

Full-page proofs in both themes: 360 x 4629, 768 x 3033, 1024 x 768,
1440 x 1000 and 1920 x 1080. Touch landscape proof: 844 x 390. Browser checks
cover original camera proportions, shared image registration, unchanged board
scale, extra-space clipping, no overflow or asset/JavaScript errors, drawer
keyboard activation and focus restoration, object dialog and touch zoom/reset.
Phone checks are emulated. Generation prompts and screenshots are saved beside
the worktree, outside the repository. Martyna approved this final visual version
and requested publication on 2026-11-07.

## Current version: taller desk, rug and Paradai shadow

The user requested taller, less squat lower furniture and a rug, plus an improved
shadow under Paradai without altering the wrapper. The final lower scene uses
`cabinet-of-curiosities/assets/cabinet-desk-rug-v4.webp` (1536 x 638, 159926 bytes).
It was generated with the built-in image-editing tool from the previous clean
background, then registered to the preserved upper scene. Only the generated
lower section is displayed. The original file is preserved in generated_images
as `exec-1df59203-3c44-4a53-a38e-32c4ab36ed25.png` in the task directory.
Output preparation: resize the 1374 x 1145 result to 1536 x 1280, extract rows
642 through 1279, encode WebP quality 94, effort 6. This places the lower section
12 reference pixels down to match the original drawer underside.

Final asset SHA-256:
`9885145D36686EBB1A3E3C78314EEE95FBCEFD894E9A96CC02C5D5E79A346637`.

The outer scene now has aspect ratio 1905.7456 / 1775.6919953, with its original
upper assembly occupying 768/1292 of its height. The base begins at 654/1292.
The side cupboards and the open kneehole are taller; the low-pile rug lies on the
floor rather than on any furniture face. Its worn botanical border is secondary
to the collection. The upper photograph, tabletop, lamp, plant, all wrappers,
Chof and both crocheted eyes retain their prior image files and registration.

Paradai uses two separate SVG shadow paths beneath the unchanged object layer.
A narrow contact shadow anchors its lower edge; a broader blurred cast shadow
extends to the right, away from the window. Its gradient follows the normal to
the bar's base, so it softens with distance rather than disappearing along the
bar's length. No wrapper or object alpha was changed. The v75/v76 hashes below
were verified again before publication.

Created two production files: `assets/cabinet-desk-rug-v4.webp` and
`assets/cabinet-desk-rug-blend-v4.svg` under `cabinet-of-curiosities/`. Updated
`cabinet-desk.css`, `index.html`, this document and `PROJECT_STATUS.md`.
The prior open-desk assets are retained as source history. No tracked files
deleted; no Game or homepage edits.

Final full-page browser proofs, in both themes: 360 x 4765, 768 x 3323,
1024 x 768, 1440 x 1000. Additional desktop proof: 1920 x 1200; landscape touch:
844 x 390. Checked geometry, loading, no overflow or JavaScript errors, drawer
keyboard opening, Escape/focus restoration, object dialog and touch zoom/reset.
Visually inspected the joining edges, rug perspective, taller furniture and the
Paradai shadow at actual page scale and in an additional tabletop detail view.
The lower-furniture comparison across themes had no visible seam: only 30 of
997500 colour samples differed, each by one level. Mobile checks are emulated.
Final output compression was inspected before publication. Diff whitespace check
passed. Screenshots and image-generation intermediates stay outside the repo.

## Initial open-desk iteration (historical)

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
