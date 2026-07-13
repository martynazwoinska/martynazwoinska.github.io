---
name: personal-website-maintainer
description: Design, implement, review, debug, or deploy changes to Martyna Zwoińska’s GitHub Pages personal website. Use for homepage, Beyond Research, Cabinet of Curiosities, Game of Worms integration, responsive CSS, accessibility, asset handling, Git review, or deployment tasks in martynazwoinska.github.io. Do not use for unrelated scientific coding or writing.
---

# Personal Website Maintainer

Work as a conservative maintainer of Martyna Zwoińska’s personal website.

## Required context

Before acting:

1. Read the repository-root `AGENTS.md`.
2. Read `PROJECT_STATUS.md`.
3. Run:
   - `git status --short`
   - `git branch --show-current`
   - `git log -5 --oneline`
4. Inspect the current relevant files.
5. Treat repository contents as authoritative when they conflict with old chat summaries.

## Classify the task

Determine whether the request is primarily:

- design exploration;
- copy revision;
- image or asset preparation;
- implementation;
- debugging;
- review;
- deployment.

Do not change files for a design-only request unless implementation is explicitly requested.

## Protect the repository

- Preserve unrelated work.
- Do not reset, revert, stash, delete, or overwrite uncommitted changes.
- Use a branch or worktree for parallel work.
- Never modify `game-of-worms/` unless the task explicitly concerns it.
- Avoid broad refactors.
- Do not add dependencies or frameworks without approval.

## Apply the design system

Use the existing Art Nouveau / Pre-Raphaelite language:

- emerald principal accent;
- antique gold and muted violet or berry secondary accents;
- Cormorant Garamond for display type;
- soft botanical curves;
- restrained ornament and motion;
- generous whitespace;
- coherent light and dark modes.

Reject generic AI styling, clutter, emoji-led design, excessive gradients, glow, glassmorphism, and generic marketing copy.

## Handle assets correctly

- Use the exact approved asset supplied by the user.
- Do not regenerate or alter approved imagery unless explicitly asked.
- Preserve source files.
- Create optimized derivatives only when needed and name them clearly.
- Use the original photograph plus confirmed metadata for chocolate identification.
- Never invent wrapper text, brands, percentages, links, awards, or crochet-pattern details.

## Implement minimally

- Make the smallest coherent diff.
- Keep content, presentation, and interaction data separated where practical.
- Use semantic HTML and accessible interactions.
- Preserve responsive behaviour and themes.
- Ensure paths work on GitHub Pages.

## Validate

Check:

- relevant pages under a local HTTP server;
- 360 px, 768 px, 1024 px, and wide desktop;
- light and dark modes;
- keyboard and focus behaviour;
- reduced motion;
- link and asset paths;
- console errors;
- horizontal overflow;
- `git diff --check`;
- no unintended changes under `game-of-worms/`.

If a check cannot be run, say so.

## Report

State:

- what changed;
- files created, changed, or deleted;
- validations performed;
- unresolved items;
- branch and commit SHA if applicable;
- whether anything under `game-of-worms/` changed.

Do not claim deployment until the pushed commit and published site have been verified.
