const licences = Object.freeze({
  ccBy4: Object.freeze({
    label: "CC BY 4.0",
    url: "https://creativecommons.org/licenses/by/4.0/"
  }),
  ccBySa25: Object.freeze({
    label: "CC BY-SA 2.5",
    url: "https://creativecommons.org/licenses/by-sa/2.5/"
  })
});

const sources = Object.freeze({
  altun: Object.freeze({
    label: "Zeynep F. Altun (2006), adult C. elegans",
    url: "https://commons.wikimedia.org/wiki/File:Adult_Caenorhabditis_elegans.jpg",
    licence: licences.ccBySa25
  }),
  toker: Object.freeze({
    label: "Toker & Hobert (2022), Fig. 1C",
    url: "https://micropublication.org/journals/biology/micropub.biology.000554/",
    licence: licences.ccBy4
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
    label: "Ebert & Bargmann (2023), Fig. 2 / Fig. S1",
    url: "https://doi.org/10.1101/2023.10.16.562407",
    licence: licences.ccBy4
  })
});

function wholeAnimalImage({ src, sourceWidth, sourceHeight, viewBox, alt, caption, maxWidth = 680, palePadding = false }) {
  return Object.freeze({
    src,
    sourceWidth,
    sourceHeight,
    viewBox: Object.freeze(viewBox),
    alt,
    caption,
    maxWidth,
    palePadding
  });
}

export const speciesGalleries = Object.freeze({
  elegans: Object.freeze({
    scientificName: "Caenorhabditis elegans",
    description: "A single complete adult hermaphrodite under differential interference contrast microscopy.",
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
    description: "A single complete wild-type AF16 adult, photographed from head to tail.",
    source: sources.toker,
    images: Object.freeze([
      wholeAnimalImage({
        src: "assets/species-gallery/source-toker-figure1.png",
        sourceWidth: 7056,
        sourceHeight: 4997,
        viewBox: [250, 3000, 1238, 600],
        alt: "A single complete wild-type AF16 Caenorhabditis briggsae adult on a pale microscopy background.",
        caption: "Whole wild-type AF16 adult",
        maxWidth: 720,
        palePadding: true
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
