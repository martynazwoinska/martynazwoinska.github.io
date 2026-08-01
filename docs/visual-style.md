# Visual style and colour system

This document formalises the visual language implemented through `shared/site-tokens.css` and page-local aliases. It is the reference for new interface components, illustrations, scientific figures and interactive objects.

## Design direction

The website combines a restrained Art Nouveau and Pre-Raphaelite influence with a clear academic presentation. Its paired Ivory Ink light theme and Petrol Ink dark theme share one visual hierarchy. Their character comes from:

- emerald as the principal accent;
- antique gold, muted berry and muted violet as limited secondary accents;
- Cormorant Garamond for display typography and the existing sans-serif stack for body copy;
- flowing botanical curves and soft asymmetric geometry;
- generous whitespace, fine borders and restrained shadows;
- coherent light and dark themes.

Avoid generic dashboard styling, heavy gradients, glow, glass effects, excessive animation, cluttered frames and decoration that competes with the content.

## Semantic colour tokens

Use the prefixed CSS custom properties rather than copying hex values into component rules. The values below are the canonical site palette. A page may alias them to shorter local names, but shared files must never introduce unprefixed tokens that could collide with Game or Cabinet variables.

| Token | Light theme | Dark theme | Intended use |
| --- | --- | --- | --- |
| `--site-bg` | `#faf8f2` | `#104a52` | Warm ivory or balanced petrol-teal page background |
| `--site-surface` | `#fffdfa` | `#185b61` | Primary cards, panels and dialogs |
| `--site-surface-muted` | `#eeece4` | `#246a6d` | Secondary surfaces, quiet controls and inset areas |
| `--site-text` | `#20313d` | `#f5f3ea` | Primary text and headings |
| `--site-text-soft` | `#53636c` | `#cad8d6` | Supporting body text and secondary labels |
| `--site-text-faint` | `#647178` | `#b6caca` | Tertiary metadata and small supporting text with WCAG AA contrast |
| `--site-brand-emerald` | `#1f735f` | `#79dec2` | Emerald primary accent, links, active states and structural emphasis |
| `--site-brand-emerald-soft` | `#dcebe5` | `#164b4d` | Quiet emerald backgrounds and selected-state fills |
| `--site-brand-berry` | `#8b3d5c` | `#e9a0bd` | Oxblood or plum-berry secondary accent |
| `--site-brand-gold` | `#a88445` | `#d7b96f` | Antique-gold fine borders, markers and restrained highlights |
| `--site-brand-violet` | `#6f5878` | `#c4b2dd` | Muted violet for limited botanical or categorical detail |
| `--site-nav-bg` | `#faf8f2` | `#104a52` | Navigation merged into the page field rather than shown as a separate colour slab |
| `--site-nav-border` | `#c8ad78` | `#987d49` | Fine antique-gold hairline below and within the sticky navigation |
| `--site-nav-accent` | `#1b6d59` | `#8be4c8` | Accessible emerald cue within the navigation |
| `--site-border` | `#ddd9cf` | `#3a7477` | Neutral borders and dividers |
| `--site-focus` | `#8b3d5c` | `#efa5c3` | Focus outline for controls on the paired site themes |
| `--site-shadow` | `0 1px 2px rgba(27,43,50,.06), 0 10px 28px rgba(27,43,50,.07)` | `0 1px 2px rgba(2,22,28,.34), 0 12px 32px rgba(2,19,25,.28)` | Standard restrained elevation |

Petrol Ink is the first-visit default when no theme preference has been stored. A visitor’s explicit light or dark choice is retained for later visits. The explicit `data-theme="light"` theme restores the unchanged Ivory Ink values.

The Game of Worms is an intentional scoped exception: it uses one fixed light, playful scientific palette and does not consume the website theme preference. Navigating from either homepage theme must not alter the Game.

## Colour hierarchy

1. Use neutral backgrounds and text colours for most of the page.
2. Use emerald for the main action, active language or navigation state, scientific emphasis and important structure.
3. Use antique gold for fine ornament, secondary focus and small markers. It should not compete with emerald.
4. Use berry or oxblood as the saturated secondary accent for botanical terminals, hover states and small warm details. Keep violet muted and limited to meaningful categories.
5. Prefer `color-mix()` with the semantic variables when a quieter tint is needed.

The navigation background matches the page background in both themes so the header does not compete with the hero. Fine antique-gold borders separate the header rows and close the header consistently. The theme toggle keeps a 34 px control area and 28 px antique-gold face at every viewport. The desktop glyph is 20 px; in the compact mobile header, only the half-filled `#14171a` glyph reduces to 17 px while the face keeps its size and uses a softer fill and half-pixel hairline.

The homepage footer uses the exact page background in both themes rather than a separate panel colour. Its antique-gold top rule provides closure while the page field remains visually continuous from the final section to the bottom edge.

### Categories and scientific figures

Colour must earn its place. When colour does not encode meaningful categories, use one consistent colour for all equivalent elements. Do not assign different palette accents merely to create visual variety.

For example, equivalent condition boxes in a nematode cognition figure should all use the same emerald treatment unless the experiment genuinely requires distinct categories. Distinctions that matter scientifically must remain readable through labels, shape, pattern or position as well as colour.

When colour does encode categories:

- keep the mapping stable across the figure and related website content;
- explain it with direct labels or a legend;
- use the smallest number of categories needed;
- check that the interpretation remains clear without colour;
- do not recolour source photographs or scientific observations in a misleading way.

## New graphics and external assets

Whenever legally, practically and scientifically appropriate, new graphical objects should match this website palette and visual language.

This rule is subordinate to accuracy, licensing and source identity:

- preserve scientifically meaningful source colours;
- preserve brand, institutional or reference graphics when changing their colours would misrepresent the source;
- follow the asset licence and provide the required attribution;
- retain the original source file and create a separate derivative for any permitted crop, optimisation or recolouring;
- describe material modifications in the attribution or project notes;
- never invent labels, measurements, categories or object details to make a visual fit the design.

The Cacao of Excellence programme’s official 2021 `Cocoa of Excellence Flavour Wheel` is a reference graphic, so its labels and colours remain unchanged. Use `Cacao of Excellence` for the current programme and website, but preserve `Cocoa of Excellence Flavour Wheel` when naming the 2021 asset itself. On the homepage, show the compact visible licence name `CC BY-NC 4.0` as the source/licence link instead of a generic information icon or full written attribution; the Cabinet view carries the full credit. A rasterised or tightly cropped derivative may be used only with clear attribution and the applicable licence notice.

## Typography, form and ornament

- Use `--display` for major headings and decorative plaques.
- Use `--sans` for body copy, navigation, controls and metadata.
- Display headings and identity text use the approved Cormorant Garamond 700 with a subtle theme-aware current-colour optical stroke (`.24px` in Ivory Ink and `.14px` in Petrol Ink). The homepage hero statement uses a stronger `.52px` light / `.34px` dark optical stroke. On narrow screens, the full name uses a dedicated `.5px` Ivory Ink / `.32px` Petrol Ink stroke so that the light version retains equal authority without making the dark version heavy. Keep expertise, navigation, body copy, controls and metadata in the sans-serif stack. Do not replace the real 700 files with a synthetic 800 weight.
- Keep asymmetric rounded corners soft rather than exaggerated.
- Use botanical curves, seed-pod forms and worm-like lines as small accents.
- Full-section floral dividers use reinforced gold and emerald stems with theme-aware contrast, while their berry terminals and geometry stay delicate. On phones, preserve the approved footprint and dimensions; reinforce only the compressed edges with a subtle same-colour treatment rather than lengthening or enlarging the ornament. Internal subsection and list rules remain visibly quieter.
- Keep ornament subordinate to information and interaction.
- Avoid emoji as primary visual elements and avoid oversized decorative icons.

The homepage hero uses `photo.jpg` with the approved lower-right ornament pair under `assets/hero/`: `quiet-atelier-lower-right.png` and `quiet-atelier-lower-right-dark.png`. From 760 px upward, the portrait, copy and ornament form one compact composition: the portrait-to-copy gap is restrained, the ornament is inset from the outer edge, and the reinforced Garamond name sits between the statement and sans-serif expertise. Below 760 px, use one consistent centred identity lockup without the portrait or statement: the reinforced name appears first on exactly three lines, the expertise forms a three-step inverted pyramid, and the proportionally scaled ornament follows in normal document flow, pulled upward and inward to close the lower-right corner. Do not introduce a separate mid-width expertise grid. At 350 px and below the longest expertise pair separates to prevent overflow. The hero pause and the full-width rule before the project subsection share one central detail: a six-pixel antique-gold diamond inside a 20-pixel break in the line. The project rule extends to both content edges, while the hero uses only two short hairlines. The upper-left ornament pair remains preserved as approved source material. Treat all five hero files as source assets and preserve their composition instead of redrawing them from screenshots.

The desktop Contact section remains a flat composition rather than an enclosing card. Treat its postal information and action matrix as one editorial column, with the restrained circular Uppsala photograph set immediately beside it as a secondary place-emblem. Use an explicit compact grid rather than absolutely anchoring the photograph to the section edge. On phones, retain the established centred photograph above the address and actions.

## Accessibility

- Target at least WCAG AA contrast: `4.5:1` for normal text and `3:1` for large text and essential interface graphics.
- Use `--text` or `--text-soft` for body copy. Reserve `--text-faint` for non-essential metadata that remains legible in both themes.
- Never rely on colour alone for state, category or instruction.
- Preserve a clearly visible keyboard focus state in light and dark themes.
- Test hover, focus, active and disabled states in both explicit themes and with the system theme.
- Honour `prefers-reduced-motion` and avoid motion that is necessary to understand content.
- Check new graphics for readability at mobile size, zoomed text and common forms of colour-vision deficiency.

## Review checklist

Before adding or approving a new graphical object, confirm:

- the object uses semantic variables or a documented derivative of them;
- every additional colour has a clear function;
- equivalent elements share one colour when no category distinction is intended;
- the graphic remains scientifically accurate;
- licensing and attribution are complete;
- the original source is preserved where applicable;
- contrast, focus, reduced motion and both themes have been checked;
- labels and meaning remain understandable without colour.
