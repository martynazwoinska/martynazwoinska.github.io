const licences = Object.freeze({
  ccBy: Object.freeze({
    label: "CC BY",
    url: "https://plos.org/terms-of-use/"
  }),
  ccBy4: Object.freeze({
    label: "CC BY 4.0",
    url: "https://creativecommons.org/licenses/by/4.0/"
  }),
  ccBySa25: Object.freeze({
    label: "CC BY-SA 2.5",
    url: "https://creativecommons.org/licenses/by-sa/2.5/"
  }),
  bmcOpenAccess: Object.freeze({
    label: "Open access",
    url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC329410/"
  })
});

const sources = Object.freeze({
  altun: Object.freeze({
    label: "Zeynep F. Altun (2006), adult C. elegans",
    url: "https://commons.wikimedia.org/wiki/File:Adult_Caenorhabditis_elegans.jpg",
    licence: licences.ccBySa25
  }),
  seidel: Object.freeze({
    label: "Seidel et al. (2011), Fig. 2A",
    url: "https://doi.org/10.1371/journal.pbio.1001115.g002",
    licence: licences.ccBy
  }),
  toker: Object.freeze({
    label: "Toker & Hobert (2022), Fig. 1C",
    url: "https://micropublication.org/journals/biology/micropub.biology.000554/",
    licence: licences.ccBy4
  }),
  guptaSternberg: Object.freeze({
    label: "Gupta & Sternberg (2003), Fig. 1a",
    url: "https://doi.org/10.1186/gb-2003-4-12-238",
    licence: licences.bmcOpenAccess
  }),
  kanzaki: Object.freeze({
    label: "Kanzaki et al. (2018), Fig. 1a",
    url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC6086898/",
    licence: licences.ccBy4
  }),
  adikes: Object.freeze({
    label: "Adikes et al. (2023), Fig. 1B",
    url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10656624/",
    licence: licences.ccBy4
  }),
  ebert: Object.freeze({
    label: "Ebert & Bargmann (2023), Fig. S1",
    url: "https://doi.org/10.1101/2023.10.16.562407",
    licence: licences.ccBy4
  })
});

function wholeAnimalImage({ src, sourceWidth, sourceHeight, viewBox, alt, caption, source = null, maxWidth = 680, palePadding = false }) {
  return Object.freeze({
    src,
    sourceWidth,
    sourceHeight,
    viewBox: Object.freeze(viewBox),
    alt,
    caption,
    source,
    maxWidth,
    palePadding
  });
}

export const speciesGalleries = Object.freeze({
  elegans: Object.freeze({
    scientificName: "Caenorhabditis elegans",
    description: "A complete adult hermaphrodite and a complete adult male; green fluorescence in the male marks sperm-producing cells. Across Caenorhabditis, adult females and hermaphrodites are generally larger than adult males.",
    source: sources.altun,
    images: Object.freeze([
      wholeAnimalImage({
        src: "assets/species-gallery/source-altun-adult-elegans.jpg",
        sourceWidth: 6424,
        sourceHeight: 2113,
        viewBox: [0, 0, 6424, 2113],
        alt: "A single complete adult Caenorhabditis elegans hermaphrodite under differential interference contrast microscopy.",
        caption: "Whole adult hermaphrodite",
        maxWidth: 820
      }),
      wholeAnimalImage({
        src: "assets/species-gallery/source-seidel-figure2.png",
        sourceWidth: 979,
        sourceHeight: 1883,
        viewBox: [10, 8, 959, 478],
        alt: "A complete adult male Caenorhabditis elegans curled into a U shape under Nomarski microscopy, with green fluorescence marking sperm-producing cells in the gonad.",
        caption: "Whole adult male",
        source: sources.seidel,
        maxWidth: 680
      })
    ])
  }),
  inopinata: Object.freeze({
    scientificName: "Caenorhabditis inopinata",
    description: "A complete adult female under light microscopy, shown with the smaller C. elegans above it for scale.",
    source: sources.kanzaki,
    images: Object.freeze([
      wholeAnimalImage({
        src: "assets/species-gallery/source-kanzaki-figure1.jpg",
        sourceWidth: 799,
        sourceHeight: 541,
        viewBox: [10, 0, 785, 148],
        alt: "A complete adult Caenorhabditis inopinata female below a smaller complete Caenorhabditis elegans adult for scale.",
        caption: "Whole adult female (down), with C. elegans for scale",
        maxWidth: 820
      })
    ])
  }),
  briggsae: Object.freeze({
    scientificName: "Caenorhabditis briggsae",
    description: "A complete adult Caenorhabditis briggsae hermaphrodite under differential interference contrast microscopy.",
    source: sources.guptaSternberg,
    images: Object.freeze([
      wholeAnimalImage({
        src: "assets/species-gallery/gupta-sternberg-briggsae-hermaphrodite.webp",
        sourceWidth: 685,
        sourceHeight: 282,
        viewBox: [0, 0, 685, 282],
        alt: "A complete adult Caenorhabditis briggsae hermaphrodite curving across a grey differential interference contrast microscopy background.",
        caption: "Whole adult hermaphrodite",
        maxWidth: 685
      })
    ])
  }),
  nigoni: Object.freeze({
    scientificName: "Caenorhabditis nigoni",
    description: "Complete adult females gathering around a male on a bacterial lawn.",
    source: sources.ebert,
    images: Object.freeze([
      wholeAnimalImage({
        src: "assets/species-gallery/source-ebert-figure2.jpg",
        sourceWidth: 967,
        sourceHeight: 1280,
        viewBox: [38, 40, 225, 225],
        alt: "Complete adult Caenorhabditis nigoni females near a male marked with a blue asterisk on a bacterial lawn.",
        caption: "Whole adult females with a male",
        maxWidth: 400
      })
    ])
  }),
  tropicalis: Object.freeze({
    scientificName: "Caenorhabditis tropicalis",
    description: "A complete wild-type adult hermaphrodite under light microscopy, visible from head to tail.",
    source: sources.adikes,
    images: Object.freeze([
      wholeAnimalImage({
        src: "assets/species-gallery/source-adikes-figure1.jpg",
        sourceWidth: 702,
        sourceHeight: 651,
        viewBox: [52, 166, 205, 340],
        alt: "A complete wild-type adult Caenorhabditis tropicalis hermaphrodite under light microscopy.",
        caption: "Whole adult hermaphrodite",
        maxWidth: 270
      })
    ])
  }),
  wallacei: Object.freeze({
    scientificName: "Caenorhabditis wallacei",
    description: "Complete adult females gathering around a male on a bacterial lawn.",
    source: sources.ebert,
    images: Object.freeze([
      wholeAnimalImage({
        src: "assets/species-gallery/source-ebert-figure-s1.jpg",
        sourceWidth: 1280,
        sourceHeight: 789,
        viewBox: [34, 46, 300, 300],
        alt: "Complete adult Caenorhabditis wallacei females near a male marked with a blue asterisk on a bacterial lawn.",
        caption: "Whole adult females with a male",
        maxWidth: 400
      })
    ])
  })
});
