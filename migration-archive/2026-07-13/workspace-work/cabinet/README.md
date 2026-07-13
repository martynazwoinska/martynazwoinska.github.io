# Cabinet implementation handoff

Prepared for `martynazwoinska/martynazwoinska.github.io` on branch `main`.

## Target paths

| Workspace file | Repository target | Action | Audited base blob SHA |
| --- | --- | --- | --- |
| `work/cabinet/index.html` | `cabinet-of-curiosities/index.html` | Replace | `d713bf2c5f23c5b9effa909ba41759e583dd47bc` |
| `work/cabinet/cabinet.css` | `cabinet-of-curiosities/cabinet.css` | Create | New file |
| `work/cabinet/cabinet-data.js` | `cabinet-of-curiosities/cabinet-data.js` | Create | New file |
| `work/cabinet/cabinet.js` | `cabinet-of-curiosities/cabinet.js` | Create | New file |

Audited `main` commit before preparation: `aab4e2aa5120acacd5a2f0074683365adddaa39f`.

Re-fetch current `main` and the target paths immediately before writing because other agents are changing homepage and Game of Worms files in parallel.

## Assets referenced but intentionally unchanged

- `cabinet-of-curiosities/assets/cabinet-original-photo.jpg`, blob `1a54010c1e49806a327a8d066ea5589c7e944d5e`
- `cabinet-of-curiosities/assets/cabinet-of-curiosities.png`, blob `9c78b9dd4d3baa48943a16a62416308dfc150073`

The untouched JPG is the visible central board. The approved stylised PNG appears only as a blurred, darkened full-viewport fantasy surround behind it. Neither source image is edited, stretched into a different aspect ratio, cropped, recoloured or overwritten.

## Included behavior

- 35 chocolate-package hotspots and 2 crocheted-eye hotspots, positioned as percentages of the original 1536 by 1152 photo.
- No hotspots for the long crocheted worm, blue octopus, note card, pins or furniture.
- Metadata kept in `cabinet-data.js`, with confirmed, wrapper-visible, tentative and unknown states clearly separated.
- Only supplied links are used: the shared Friis-Holm mini selection and the supplied Chocolate Naive Xocoatl wrapper reference.
- Focus and hover previews, click and touch detail dialog, Escape close, focus restoration, and a touch-friendly collection index.
- Responsive 4:3 central board, full-viewport fantasy surround, no horizontal scrolling, system light/dark support and reduced-motion handling.

## Local static checks completed

- Exact object count: 35 chocolate records and 2 crocheted-eye records.
- Data JavaScript loaded successfully with 37 unique object IDs; the interaction JavaScript parsed successfully before its expected DOM dependency in a non-browser runtime.
- Em dash search: zero matches in all prepared files.
- Approved image paths and intrinsic dimensions are present in the markup.
- All four output files are plain HTML, CSS and JavaScript with no dependencies or frameworks.

Browser runtime was unavailable in this subtask. Live visual, console, keyboard and mobile verification remains for the coordinating agent after publishing.
