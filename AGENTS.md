# AGENTS.md

## Project

This repository is Martyna Zwoińska’s personal academic website, published with GitHub Pages.

- Repository: `martynazwoinska/martynazwoinska.github.io`
- Stack: plain HTML, CSS, and JavaScript
- Deployment: GitHub Pages from the repository
- Primary page: `index.html`
- Interactive game: `game-of-worms/`
- Interactive collection: `cabinet-of-curiosities/`

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
- The Game intentionally uses one fixed light palette, independent of the homepage theme preference. Do not add `data-site-preferences="theme"`, the shared preference script, or partial theme overrides to the Game shell.
- Do not refactor unrelated homepage sections while changing Beyond Research.
- Do not introduce a framework, package manager, build system, CSS library, icon library, or external JavaScript dependency without explicit approval.
- Preserve existing accessibility, dark-mode, navigation, and responsive behaviour.

## Ownership and parallel work

Follow [`docs/agent-workflow.md`](docs/agent-workflow.md) for branch, worktree and file ownership.

- The integrator alone owns `index.html`, `home.js`, `home-i18n.js`, `shared/**`, root metadata, documentation, merges and deployment.
- The Cabinet owner alone edits `cabinet-of-curiosities/**`.
- The Game owner alone edits `game-of-worms/**`.
- The QA agent is read-only and reports findings without applying fixes.
- Feature owners do not edit the Beyond Research cards. They send requested card changes to the integrator.
- Never allow two agents to edit the same binary asset or physical worktree concurrently.
- Shared-interface changes land before page-specific changes consume them.

## Visual system

Use the existing site rather than inventing a new design system. The canonical palette, usage rules and review checklist are in [`docs/visual-style.md`](docs/visual-style.md). Read that document before creating, editing or integrating visual assets.

Whenever legally, practically and scientifically appropriate, new graphical objects should match the website palette and style. Scientific accuracy, licensing and source identity take priority. When colour does not encode meaningful categories, use one consistent colour for all equivalent elements.

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
- decorative text that competes with content;
- using several accent colours for equivalent elements when the colours carry no meaning.

## Copy rules

- Keep copy compact, concrete, and natural.
- Avoid marketing filler and repeated explanations.
- Preserve proper names, diacritics, percentages, taxonomic formatting, and supplied wording.
- Do not invent URLs, product identities, awards, pattern names, designers, scientific facts, or biographical details.
- Use `<em>` for scientific names where appropriate.
- Avoid changing approved text unless the task asks for copy revision.
- For every public-facing copy change, update the corresponding English, Swedish, and Polish strings in the same proposed change. If a string intentionally exists in only one language, state that exception.
- Before committing or deploying a copy change, show Martyna the exact wording for every affected language version and wait for her explicit verification. Approval of source-language text alone is not approval of unreviewed translations.

## Images and assets

- Treat approved images as immutable source assets unless the user explicitly asks to edit them.
- Never regenerate, redraw, relabel, recolour, crop, or “improve” an approved image during a coding task.
- Preserve original files and use separate optimized derivatives when needed.
- Use responsive dimensions and prevent layout shift.
- Write accurate alt text based on visible content.
- Do not infer fine wrapper text from a stylized image; use the original photograph and user-confirmed metadata as the source of truth.
- Check licensing before adapting an external graphic and include the required attribution.
- Preserve scientifically meaningful colours even when they differ from the site palette.

## Beyond Research: approved landing design

The homepage section keeps the heading:

```text
Beyond Research
```

It contains two equal Art Nouveau doorway cards.

### Card 1

- Title: `The Game of Worms`
- Description: `A browser game inspired by nematode biology, with creative input from my children.`
- Action: `Play →`
- Destination: `game-of-worms/index.html`
- The card remains one semantic link.
- Do not place a subtitle between the title and description.
- Use a subtle animated nematode circling an antique-gold crown-like sigil. The mood may suggest high-fantasy maps and heraldry, but must not reproduce protected title treatments, logos or symbols.
- Keep the animation decorative, unobtrusive and static under `prefers-reduced-motion`.

### Card 2

- Title: `The Cabinet of Curiosities`
- Description: `Craft chocolate became another subject I got really into!`
- Action: `Explore →`
- Destination: `cabinet-of-curiosities/index.html`
- The Cabinet navigation link and flavour-wheel button are sibling controls. Never nest the button inside the link.
- The Cacao of Excellence programme’s official 2021 `Cocoa of Excellence Flavour Wheel` may appear on the right side as the only preview graphic in the landing cards.
- The wheel image itself is the control. Keep its accessible name, but do not add a visible instruction such as `Spin the wheel` below it.
- Keep the homepage preview free of written wheel instructions and full attribution copy. Use only a compact `CC BY-NC 4.0` source/licence link; the Cabinet wheel view carries the full attribution.

Constraints:

- no introductory sentence above the cards;
- no preview images, emoji, screenshots or background illustrations except the approved official flavour wheel on the Cabinet card;
- equal visual weight and dimensions;
- two columns on desktop, one column on mobile;
- thin emerald outer line;
- fine muted-gold inner line;
- softly asymmetric rounded corners;
- restrained ornament occupying no more than roughly 5 to 8 percent of the card;
- subtle worm-like flowing line on the Game card;
- subtle botanical or seed-pod motif on the Cabinet card;
- 2 to 3 px lift and small arrow movement on hover or focus;
- honour `prefers-reduced-motion`;
- keep every interactive target semantic, keyboard accessible and visually distinct.

The flavour wheel must retain its official labels and colours. Include a concise source and licence path to the full attribution in the Cabinet experience.

## Cabinet of Curiosities: current direction

Approved stylised website image:

```text
cabinet-of-curiosities/assets/cabinet-of-curiosities.png
```

Untouched real reference photograph:

```text
cabinet-of-curiosities/assets/cabinet-original-photo.jpg
```

Do not change or overwrite either image unless explicitly requested. Use the real photograph as the source of truth for wrapper identities, wrapper text and original object placement.

The interactive page uses the real photograph as the central object board, surrounded by the stylised cabinet scene. The photograph and object positions must remain intact; expand the fantasy setting around the board rather than altering the bars or their placement.

Interactive objects:

- every chocolate package;
- the green crocheted eye;
- the yellow crocheted eye;
- the S-Foodies sticker.

Decorative and non-interactive:

- the long crocheted worm;
- the blue crocheted octopus;
- surrounding cabinet decoration.

Use a responsive SVG overlay or another coordinate system tied to the image’s intrinsic dimensions. Do not use fixed-position hotspots that drift when the image scales.

Chocolate metadata must be data-driven and separate from the markup. Unknown values and URLs remain empty; never fabricate them.

The Cacao of Excellence programme’s 2021 `Cocoa of Excellence Flavour Wheel` is a separate interactive reference, not part of the photographed object board. Open it in an accessible dialog or equivalent overlay so it does not shrink or move the board. Let users spin it as a playful exploration aid, but do not claim that the pointer identifies an objectively measured flavour. Show the full source, copyright and licence attribution in the wheel view.

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
