# martynazwoinska.github.io

The source repository for [Martyna Katarzyna Zwoińska’s personal academic
website](https://martynazwoinska.github.io/), published with GitHub Pages.

The site uses plain HTML, CSS, and JavaScript. There is no build system, package
manager, or installation step.

## Site structure

- `index.html`: primary academic profile and the Beyond Research landing section
- `home.js` and `home-i18n.js`: homepage behaviour and page-local EN/SV/PL dictionary
- `shared/`: prefixed visual tokens plus language and theme preference storage
- `game-of-worms/`: interactive browser game inspired by nematode biology
- `cabinet-of-curiosities/`: Cabinet of Curiosities landing page and assets
- `fonts/`: locally hosted Cormorant Garamond display fonts
- `docs/`: durable project instructions and kickoff context
- `PROJECT_STATUS.md`: approved decisions and current implementation status
- `AGENTS.md`: repository-specific working rules
- `docs/agent-workflow.md`: worktree, ownership and integration protocol

## Deployment

GitHub Pages publishes the repository from the `main` branch at:

<https://martynazwoinska.github.io/>

Changes are deployed only after they have been committed and pushed to `main`.
After pushing, verify the affected live paths rather than assuming deployment
has completed.

## Editing the site

Most homepage content and styling live in `index.html`. The interactive game has
its own HTML, CSS, and JavaScript under `game-of-worms/`. The Cabinet currently
has a separate landing page under `cabinet-of-curiosities/`.

Before making changes, read:

1. `AGENTS.md`
2. `PROJECT_STATUS.md`
3. `.agents/skills/personal-website-maintainer/SKILL.md`

Preserve the existing plain-web stack, accessibility, responsive behaviour,
light and dark themes, and the restrained Art Nouveau / Pre-Raphaelite visual
direction. Do not introduce frameworks or dependencies without explicit
approval.

## Cabinet assets

The Cabinet uses two distinct source assets:

- `cabinet-of-curiosities/assets/cabinet-of-curiosities.png`: approved stylised
  website image
- `cabinet-of-curiosities/assets/cabinet-original-photo.jpg`: untouched real
  reference photograph and source of truth for wrapper identities, text, and
  object placement

Do not overwrite, regenerate, or confuse these files.

## Validation

For interface changes, check the relevant pages at mobile and desktop widths,
light and dark modes, keyboard focus, reduced motion, local asset paths, browser
console errors, and horizontal overflow. Also run:

```text
git diff --check
git status --short
```

Nothing under `game-of-worms/` should change unless the task explicitly concerns
the game.
