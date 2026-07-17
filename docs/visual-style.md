# Visual style and colour system

This document formalises the visual language implemented through `shared/site-tokens.css` and page-local aliases. It is the reference for new interface components, illustrations, scientific figures and interactive objects.

## Design direction

The website combines a restrained Art Nouveau and Pre-Raphaelite influence with a clear academic presentation. Its paired Ivory Ink light theme and Marine Ink dark theme share one visual hierarchy. Their character comes from:

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
| `--site-bg` | `#faf8f2` | `#1c3345` | Ivory or marine page background |
| `--site-surface` | `#fffdfa` | `#244255` | Primary cards, panels and dialogs |
| `--site-surface-muted` | `#eeece4` | `#2e4d61` | Secondary surfaces, quiet controls and inset areas |
| `--site-text` | `#20313d` | `#f1f2ec` | Primary text and headings |
| `--site-text-soft` | `#53636c` | `#c3d0d5` | Supporting body text and secondary labels |
| `--site-text-faint` | `#647178` | `#a8bdc6` | Tertiary metadata and small supporting text with WCAG AA contrast |
| `--site-brand-emerald` | `#1f735f` | `#73d1b9` | Emerald primary accent, links, active states and structural emphasis |
| `--site-brand-emerald-soft` | `#dcebe5` | `#1d4645` | Quiet emerald backgrounds and selected-state fills |
| `--site-brand-berry` | `#8b3d5c` | `#ee9aa6` | Oxblood or berry secondary accent |
| `--site-brand-gold` | `#a88445` | `#d3b56b` | Antique-gold fine borders, markers and restrained highlights |
| `--site-brand-violet` | `#6f5878` | `#b9adda` | Muted violet for limited botanical or categorical detail |
| `--site-nav-bg` | `#faf8f2` | `#1c3345` | Navigation merged into the page field rather than shown as a separate colour slab |
| `--site-nav-border` | `#bac9c3` | `#426075` | Fine theme-coherent hairline below the sticky navigation |
| `--site-nav-accent` | `#1b6d59` | `#88dfc7` | Accessible emerald cue within the navigation |
| `--site-border` | `#ddd9cf` | `#426075` | Neutral borders and dividers |
| `--site-focus` | `#8b3d5c` | `#f1a0ad` | Focus outline for controls on the paired site themes |
| `--site-shadow` | `0 1px 2px rgba(27,43,50,.06), 0 10px 28px rgba(27,43,50,.07)` | `0 1px 2px rgba(5,15,28,.32), 0 12px 32px rgba(5,15,28,.27)` | Standard restrained elevation |

The automatic dark theme and the explicit `data-theme="dark"` theme use the same dark values. The explicit `data-theme="light"` theme restores the light values.

## Colour hierarchy

1. Use neutral backgrounds and text colours for most of the page.
2. Use emerald for the main action, active language or navigation state, scientific emphasis and important structure.
3. Use antique gold for fine ornament, secondary focus and small markers. It should not compete with emerald.
4. Use berry or oxblood as the saturated secondary accent for botanical terminals, hover states and small warm details. Keep violet muted and limited to meaningful categories.
5. Prefer `color-mix()` with the semantic variables when a quieter tint is needed.

The navigation background matches the page background in both themes so the header does not compete with the hero. A fine border preserves structure. The theme toggle deliberately remains the one dense header accent: it uses the page alias of `--site-brand-gold` with `#14171a` ink in both themes.

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
