# Agent ownership and integration workflow

The website remains one repository and one GitHub Pages deployment. Parallel work is separated by branch, worktree and path ownership rather than by creating separate repositories.

## Branches and worktrees

| Branch | Role | Owned paths |
| --- | --- | --- |
| `main` | Deployable production state | Updated only after integration and QA |
| `agent/site-architecture` | Integrator | `index.html`, `home.js`, `home-i18n.js`, `shared/**`, `docs/**`, root metadata and deployment |
| `agent/cabinet` | Cabinet owner | `cabinet-of-curiosities/**` |
| `agent/game-worms` | Game owner | `game-of-worms/**` |

The independent QA agent has no write branch and must not edit files. It reports findings to the owning agent or integrator.

## One-writer rules

- No two agents edit the same physical worktree.
- Only the integrator edits `index.html`, including the two Beyond Research cards.
- Feature owners provide the integrator with requested card copy, links or preview assets rather than editing the homepage.
- Only the Cabinet owner edits Cabinet composites, masks, wrappers or hotspot assets.
- Only the Game owner edits worm drawings, accessories, map data or game state.
- Binary visual assets always have one active writer.
- QA remains read-only so the final review is independent.

## Shared layer

The shared layer is deliberately small:

- `shared/site-tokens.css` owns prefixed `--site-*` colour and font primitives. Page geometry, scientific colour mappings, game state and Cabinet scene styling remain local.
- `shared/site-preferences.js` is the only file that knows the storage keys `language` and `theme`. Pages opt into language or theme application through `data-site-preferences` on the root element.
- Translation dictionaries remain page-local: `home-i18n.js`, `cabinet-of-curiosities/cabinet-i18n.js`, and `game-of-worms/game-i18n.js`.
- English-only pages must keep `lang="en"` until their own complete translation exists. A stored homepage language must never relabel an English-only page as Swedish or Polish.
- The Game keeps its playful scientific and habitat palette local. Importing shared tokens must not silently create a partial dark theme.
- The Cabinet keeps its board geometry, immersive surfaces, hotspot coordinates, object metadata and dialog behaviour local.

When a feature needs a new shared token or preference capability, its owner submits the interface request to the integrator. The integrator lands the shared change first; feature work then incorporates that commit before continuing.

## Integration sequence

1. Start feature branches from the same current `main` SHA.
2. Land shared-interface changes on `agent/site-architecture` first.
3. Incorporate the shared commit into the feature worktrees.
4. Feature owners commit only their owned paths.
5. The integrator combines the narrow feature commits.
6. The QA agent runs the cross-site matrix without editing fixes.
7. Owners address findings; QA rechecks the final integration state.
8. Publish once from the verified integration state and confirm the GitHub Pages result.

## Required QA matrix

At minimum, check the homepage, Cabinet and Game at 360, 390, 768, 1024, 1120, 1235 and 1440 px where relevant. Verify keyboard focus, reduced motion, overflow, local links and assets, console errors, theme behaviour, English defaults and preference persistence. Cabinet dialogs and Game controls receive page-specific interaction tests.
