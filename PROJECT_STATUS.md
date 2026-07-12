# PROJECT_STATUS.md

Last updated: 2026-07-11

This file records approved decisions and the last known implementation state. Always verify the current repository before acting.

## Website

- Repository: `martynazwoinska/martynazwoinska.github.io`
- Hosting: GitHub Pages
- Stack: plain HTML, CSS, and JavaScript
- Main visual direction: restrained Art Nouveau / Pre-Raphaelite
- Primary colours: emerald, antique gold, muted violet or berry
- Display font: Cormorant Garamond
- Light and dark themes must remain functional

## Active workstream: Beyond Research

Approved information architecture:

```text
Beyond Research
├── The Game of Worms
└── The Cabinet of Curiosities
```

Approved homepage card copy:

### The Game of Worms

- Description: `A browser game inspired by nematode biology.`
- Action: `Play →`
- Destination: `game-of-worms/index.html`

### The Cabinet of Curiosities

- Description: `Chocolate, crochet and collected curiosities.`
- Action: `Explore →`
- Destination: `cabinet-of-curiosities/index.html`

Approved landing design:

- two equal image-free cards;
- side by side on desktop and stacked on mobile;
- thin emerald line plus fine gold inner line;
- restrained Art Nouveau accents;
- no introductory text;
- no preview images or emoji;
- entire card clickable.

## Last known implementation state

The approved two-card Beyond Research section and the Cabinet destination page are now present on `main`. Always inspect the current files before changing them.

Temporary deployment workflows created during earlier attempts should not remain in the repository. Check `.github/workflows/` before starting new work.

## Cabinet image

Approved stylised image asset:

```text
cabinet-of-curiosities/assets/cabinet-of-curiosities.png
```

Untouched original photograph:

```text
cabinet-of-curiosities/assets/cabinet-original-photo.jpg
```

The stylised image is the exact selected website visual and must not be regenerated or edited during implementation. The original photograph is the source of truth for wrapper identities, wrapper text, and object placement.

## Cabinet interaction decisions

Interactive:

- all chocolate packages;
- green crocheted eye;
- yellow crocheted eye.

Not interactive:

- long crocheted worm;
- blue crocheted octopus.

The page should eventually use a responsive overlay and a reusable accessible detail panel. Metadata should be stored separately from the HTML.

## Confirmed chocolate information

These identifications were explicitly corrected or confirmed by the user:

- Storm & Bille: Uganda chilli bar, 70%.
- Raaka: Tanzania, 100%.
- Vigdis Rosenkilde: Echarete, 80%.
- Kamm: Ecuador, 85%.
- Luisa Abram: Rio Juruá, 70%.
- Paradai Thailand: Nakhon Si Thammarat dark chocolate, 70%, Red Pod.
- Paradai yellow wrapper: Chanthaburi; exact percentage still needs confirmation.
- Malmö Chokladfabrik: Craft Madagascar; the central wrapper showing the chocolate-making process.
- Friis-Holm mini bars: link together to:
  `https://friisholmchokolade.dk/products/bag-mix-12-x-5-g`
- Taza: the circular package; it must not be labelled as Malmö Chokladfabrik.
- Zotter Labooko White: the small wrapper on the right; it must not be labelled Omnom.
- Chocolate Naive: Xocoatl wrapper reference:
  `https://chocolatenaive.com/storage/2023/03/xocoatl.webp`

Tentative and requiring confirmation:

- the green Marou bar may be Bến Tre;
- remaining wrapper variants, percentages, descriptions, and destination links.

Do not silently promote tentative identifications to confirmed values.

## Crochet links still needed

The two crocheted eyes should eventually link to:

- the exact pattern used;
- Martyna’s Ravelry profile.

The pattern name, designer, pattern URL, and Ravelry URL must not be invented.

## Next safe sequence

1. Audit the current repository.
2. Verify the approved two-card Beyond Research landing and Cabinet page.
3. Confirm responsive behaviour, themes, keyboard focus, and paths.
4. Continue with hotspot mapping and chocolate metadata.
