# Visual style and colour system

This document formalises the visual language already implemented in `index.html`. It is the reference for new interface components, illustrations, scientific figures and interactive objects.

## Design direction

The website combines a restrained Art Nouveau and Pre-Raphaelite influence with a clear academic presentation. Its visual character comes from:

- emerald as the principal accent;
- antique gold, muted berry and muted violet as limited secondary accents;
- Cormorant Garamond for display typography and the existing sans-serif stack for body copy;
- flowing botanical curves and soft asymmetric geometry;
- generous whitespace, fine borders and restrained shadows;
- coherent light and dark themes.

Avoid generic dashboard styling, heavy gradients, glow, glass effects, excessive animation, cluttered frames and decoration that competes with the content.

## Semantic colour tokens

Use the CSS custom properties rather than copying hex values into component rules. The values below are the canonical homepage palette.

| Token | Light theme | Dark theme | Intended use |
| --- | --- | --- | --- |
| `--bg` | `#fbfaf7` | `#14171a` | Page background |
| `--surface` | `#ffffff` | `#1c2024` | Primary cards, panels and dialogs |
| `--surface-2` | `#f3f1ea` | `#23282d` | Secondary surfaces, quiet controls and inset areas |
| `--text` | `#1f2328` | `#eceef0` | Primary text and headings |
| `--text-soft` | `#55606b` | `#b3bcc4` | Supporting body text and secondary labels |
| `--text-faint` | `#8a929c` | `#7d8791` | Tertiary metadata on sufficiently large or non-essential text |
| `--accent` | `#1c7a52` | `#5fcb9d` | Emerald primary accent, links, active states and structural emphasis |
| `--accent-soft` | `#e3f1e9` | `#16302a` | Quiet emerald backgrounds and selected-state fills |
| `--accent-berry` | `#7d2145` | `#d889a8` | Oxblood or berry secondary accent |
| `--accent-gold` | `#a88445` | `#d2b66f` | Antique-gold fine borders, markers and restrained highlights |
| `--accent-violet` | `#6b4a73` | `#c1a4ca` | Muted violet for limited botanical or categorical detail |
| `--nav-bg` | `#ece1cb` | `#29261f` | Warm parchment-gold top navigation surface |
| `--nav-border` | `#b99a60` | `#6d5e3d` | Antique-gold divider below the sticky navigation |
| `--nav-accent` | `#196f4a` | `#5fcb9d` | Accessible emerald cue within the golden navigation surface |
| `--border` | `#e7e3d9` | `#2c3238` | Neutral borders and dividers |
| `--shadow` | `0 1px 2px rgba(31,35,40,.06), 0 8px 24px rgba(31,35,40,.06)` | `0 1px 2px rgba(0,0,0,.4), 0 10px 30px rgba(0,0,0,.35)` | Standard restrained elevation |

The automatic dark theme and the explicit `data-theme="dark"` theme use the same dark values. The explicit `data-theme="light"` theme restores the light values.

## Colour hierarchy

1. Use neutral backgrounds and text colours for most of the page.
2. Use emerald for the main action, active language or navigation state, scientific emphasis and important structure.
3. Use antique gold for fine ornament, secondary focus and small markers. It should not compete with emerald.
4. Use berry and violet sparingly. They should communicate a real secondary category or enrich a small decorative detail, not make every element different.
5. Prefer `color-mix()` with the semantic variables when a quieter tint is needed.

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

The official Cocoa of Excellence Flavour Wheel is a reference graphic, so its labels and colours remain unchanged. A rasterised or tightly cropped derivative may be used only with clear attribution and the applicable licence notice.

## Typography, form and ornament

- Use `--display` for major headings and decorative plaques.
- Use `--sans` for body copy, navigation, controls and metadata.
- Keep asymmetric rounded corners soft rather than exaggerated.
- Use botanical curves, seed-pod forms and worm-like lines as small accents.
- Keep ornament subordinate to information and interaction.
- Avoid emoji as primary visual elements and avoid oversized decorative icons.

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
