# AGENTS.md

## Project

This repository is Martyna Zwoińska’s personal academic website, published with GitHub Pages.

- Repository: `martynazwoinska/martynazwoinska.github.io`
- Stack: plain HTML, CSS, and JavaScript
- Deployment: GitHub Pages from the repository
- Primary page: `index.html`
- Interactive game: `game-of-worms/`
- Planned interactive collection: `cabinet-of-curiosities/`

Read `PROJECT_STATUS.md` before working on active features.

## Non-negotiable working rules

### At the start of every implementation task

Run and inspect:

```bash
pwd
git status --short
git branch --show-current
git log -5 --oneline
```

Then inspect the current relevant files. Do not rely on an older prompt, cached file contents, or a prior chat summary.

If the working tree contains unrelated changes:

- do not reset, revert, stash, delete, or overwrite them;
- identify the files and report the conflict;
- use a separate branch or worktree when safe;
- ask before touching overlapping files.

### Git and deployment

- Make minimal, reviewable commits.
- Do not commit generated experiments, temporary workflows, debug screenshots, or unused assets.
- Do not commit or push unless the user explicitly requests implementation or deployment.
- Before pushing, fetch the latest remote state and ensure the change is based on current `main`.
- Never force-push unless the user explicitly requests it and the consequences have been explained.
- Review `git diff --check` and the full diff before committing.
- After pushing, verify the deployed paths rather than assuming GitHub Pages succeeded.

## Scope control

- Modify only files needed for the task.
- Do not alter `game-of-worms/` unless the task explicitly concerns the game.
- Do not refactor unrelated homepage sections while changing Beyond Research.
- Do not introduce a framework, package manager, build system, CSS library, icon library, or external JavaScript dependency without explicit approval.
- Preserve existing accessibility, dark-mode, navigation, and responsive behaviour.

## Visual system

Use the existing site rather than inventing a new design system.

Core direction:

- restrained Art Nouveau and Pre-Raphaelite influence;
- emerald principal accent;
- antique gold and muted violet or berry as secondary accents;
- Cormorant Garamond display typography;
- existing sans-serif body stack;
- flowing botanical curves and soft asymmetric geometry;
- generous whitespace;
- restrained shadows;
- coherent light and dark themes.

Avoid:

- generic dashboard or SaaS styling;
- excessive gradients, glow, glassmorphism, or animation;
- emoji as primary visual elements;
- oversized decorative icons;
- sharp, aggressive ornaments;
- cluttered frames;
- generic stock or generated imagery;
- decorative text that competes with content.

## Copy rules

- Keep copy compact, concrete, and natural.
- Avoid marketing filler and repeated explanations.
- Preserve proper names, diacritics, percentages, taxonomic formatting, and supplied wording.
- Do not invent URLs, product identities, awards, pattern names, designers, scientific facts, or biographical details.
- Use `<em>` for scientific names where appropriate.
- Avoid changing approved text unless the task asks for copy revision.

## Images and assets

- Treat approved images as immutable source assets unless the user explicitly asks to edit them.
- Never regenerate, redraw, relabel, recolour, crop, or “improve” an approved image during a coding task.
- Preserve original files and use separate optimized derivatives when needed.
- Use responsive dimensions and prevent layout shift.
- Write accurate alt text based on visible content.
- Do not infer fine wrapper text from a stylized image; use the original photograph and user-confirmed metadata as the source of truth.

## Beyond Research — approved landing design

The homepage section keeps the heading:

```text
Beyond Research
```

It contains two equal, image-free, fully clickable Art Nouveau doorway cards.

### Card 1

- Title: `The Game of Worms`
- Description: `A browser game inspired by nematode biology.`
- Action: `Play →`
- Destination: `game-of-worms/index.html`

### Card 2

- Title: `The Cabinet of Curiosities`
- Description: `Chocolate, crochet and collected curiosities.`
- Action: `Explore →`
- Destination: `cabinet-of-curiosities/index.html`

Constraints:

- no introductory sentence above the cards;
- no preview images, emoji, screenshots, or background illustrations;
- equal visual weight and dimensions;
- two columns on desktop, one column on mobile;
- whole card is one semantic link;
- thin emerald outer line;
- fine muted-gold inner line;
- softly asymmetric rounded corners;
- restrained ornament occupying no more than roughly 5–8% of the card;
- subtle worm-like flowing line on the Game card;
- subtle botanical or seed-pod motif on the Cabinet card;
- 2–3 px lift and small arrow movement on hover/focus;
- honour `prefers-reduced-motion`.

## Cabinet of Curiosities — current direction

Approved stylised website image:

```text
cabinet-of-curiosities/assets/cabinet-of-curiosities.png
```

Untouched real reference photograph:

```text
cabinet-of-curiosities/assets/cabinet-original-photo.jpg
```

Do not change or overwrite either image unless explicitly requested. Use the real photograph as the source of truth for wrapper identities, wrapper text, and original object placement.

The future interactive page should use the image as the central object board.

Interactive objects:

- every chocolate package;
- the green crocheted eye;
- the yellow crocheted eye.

Decorative and non-interactive:

- the long crocheted worm;
- the blue crocheted octopus;
- surrounding cabinet decoration.

Use a responsive SVG overlay or another coordinate system tied to the image’s intrinsic dimensions. Do not use fixed-position hotspots that drift when the image scales.

Chocolate metadata must be data-driven and separate from the markup. Unknown values and URLs remain empty; never fabricate them.

## Accessibility

For every interface change:

- use semantic HTML;
- ensure keyboard operation;
- preserve visible focus states;
- maintain sufficient contrast in both themes;
- do not rely on hover or colour alone;
- respect reduced-motion preferences;
- avoid nested interactive elements;
- ensure adequate touch targets;
- avoid horizontal overflow.

For dialogs or object-detail panels:

- use correct dialog semantics;
- move focus into the opened panel;
- close with Escape;
- restore focus to the triggering object.

## Validation

At minimum, check:

- desktop and mobile layouts;
- approximately 360 px, 768 px, 1024 px, and a wide viewport;
- light and dark modes;
- keyboard navigation and focus;
- link and asset paths under GitHub Pages;
- browser console for errors;
- no horizontal overflow;
- no unexpected changes under `game-of-worms/`;
- `git diff --check`.

When browser automation is unavailable, state exactly which checks were performed and which remain manual.

## Completion report

After implementation, report:

- files created;
- files changed;
- files deleted;
- tests and manual checks performed;
- any unresolved issue;
- commit SHA and branch, if committed;
- whether anything under `game-of-worms/` changed.
