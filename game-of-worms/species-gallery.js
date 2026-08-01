const licences = Object.freeze({
  ccBy: Object.freeze({
    label: "CC BY",
    url: "https://www.ncbi.nlm.nih.gov/books/NBK19764/figure/nematodeisolation_figure7/"
  }),
  ccBy4: Object.freeze({
    label: "CC BY 4.0",
    url: "https://creativecommons.org/licenses/by/4.0/"
  })
});

const sources = Object.freeze({
  wormbook: Object.freeze({
    label: "Barrière & Félix (2014), Fig. 7",
    url: "https://www.ncbi.nlm.nih.gov/books/NBK19764/figure/nematodeisolation_figure7/",
    licence: licences.ccBy,
    note: "Geometric view of the published figure; the source pixels are otherwise unchanged."
  }),
  kanzaki: Object.freeze({
    label: "Kanzaki et al. (2018), Fig. 1a",
    url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC6086898/",
    licence: licences.ccBy4,
    note: "Geometric view of the published figure; the source pixels are otherwise unchanged."
  }),
  adikes: Object.freeze({
    label: "Adikes et al. (2023), Fig. 1B",
    url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10656624/",
    licence: licences.ccBy4,
    note: "Geometric view of the published figure; the source pixels are otherwise unchanged."
  }),
  ebert: Object.freeze({
    label: "Ebert & Bargmann (2023), Fig. 2 / Fig. S1",
    url: "https://doi.org/10.1101/2023.10.16.562407",
    licence: licences.ccBy4,
    note: "Geometric view of the published figure; the source pixels are otherwise unchanged."
  })
});

function wholeAnimalImage({ src, sourceWidth, sourceHeight, viewBox, alt, caption, maxWidth = 680 }) {
  return Object.freeze({
    src,
    sourceWidth,
    sourceHeight,
    viewBox: Object.freeze(viewBox),
    alt,
    caption,
    maxWidth
  });
}

export const speciesGalleries = Object.freeze({
  elegans: Object.freeze({
    scientificName: "Caenorhabditis elegans",
    description: "A complete adult hermaphrodite under light microscopy, shown above the larger C. inopinata female for scale.",
    source: sources.kanzaki,
    images: Object.freeze([
      wholeAnimalImage({
        src: "assets/species-gallery/source-kanzaki-figure1.jpg",
        sourceWidth: 799,
        sourceHeight: 541,
        viewBox: [10, 0, 785, 148],
        alt: "A complete adult Caenorhabditis elegans hermaphrodite above a larger complete Caenorhabditis inopinata adult female for scale.",
        caption: "Whole adult hermaphrodite, with C. inopinata for scale",
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
        caption: "Whole adult female, with C. elegans for scale",
        maxWidth: 820
      })
    ])
  }),
  briggsae: Object.freeze({
    scientificName: "Caenorhabditis briggsae",
    description: "Several complete worms moving across a bacterial lawn. At this scale they appear as fine, pale threads.",
    source: sources.wormbook,
    images: Object.freeze([
      wholeAnimalImage({
        src: "assets/species-gallery/source-wormbook-figure7.jpg",
        sourceWidth: 800,
        sourceHeight: 603,
        viewBox: [0, 303, 400, 300],
        alt: "Several complete Caenorhabditis briggsae worms moving near a bacterial lawn.",
        caption: "Whole animals on a bacterial lawn",
        maxWidth: 560
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
