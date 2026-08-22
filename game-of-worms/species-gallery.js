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
  ccBySa3: Object.freeze({
    label: "CC BY-SA 3.0",
    url: "https://creativecommons.org/licenses/by-sa/3.0/"
  }),
  ccBySa4: Object.freeze({
    label: "CC BY-SA 4.0",
    url: "https://creativecommons.org/licenses/by-sa/4.0/"
  }),
  captionCredit: Object.freeze({
    label: "Caption and credit required",
    url: "https://www.eurekalert.org/multimedia/919709"
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
  portman: Object.freeze({
    label: "Douglas Portman, University of Rochester, adult C. elegans male and hermaphrodite",
    url: "https://www.urmc.rochester.edu/news/publications/neuroscience/perfect-timing-making-the-switch-from-juvenile-to-adult",
    licence: licences.captionCredit
  }),
  seidel: Object.freeze({
    label: "Seidel et al. (2011), Fig. 2A",
    url: "https://doi.org/10.1371/journal.pbio.1001115.g002",
    licence: licences.ccBy
  }),
  paves: Object.freeze({
    label: "Heiti Paves (2010), living C. elegans with fluorescent neurons",
    url: "https://commons.wikimedia.org/wiki/File:Varbuss.jpg",
    licence: licences.ccBySa3,
    note: "Displayed as a resized WebP."
  }),
  gulnur: Object.freeze({
    label: "Гөлнур (2015), Nile-red-stained C. elegans",
    url: "https://commons.wikimedia.org/wiki/File:C._elegans_nematodes.tif",
    licence: licences.ccBySa4,
    note: "Displayed as a resized WebP."
  }),
  epfl: Object.freeze({
    label: "EPFL (2020), two-cell C. elegans embryo",
    url: "https://commons.wikimedia.org/wiki/File:200915_EPFL_Pierre_G%C3%B6nczy_Two_Cell_Embryo.png",
    licence: licences.ccBy4
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

function wholeAnimalImage({ src, sourceWidth, sourceHeight, viewBox, alt, caption, source = null, maxWidth = 680, palePadding = false, layout = "standard" }) {
  return Object.freeze({
    src,
    sourceWidth,
    sourceHeight,
    viewBox: Object.freeze(viewBox),
    alt,
    caption,
    source,
    maxWidth,
    palePadding,
    layout
  });
}

export const speciesGalleries = Object.freeze({
  elegans: Object.freeze({
    scientificName: "Caenorhabditis elegans",
    description: "Meet C. elegans at different scales: an adult hermaphrodite beside the smaller male, living worms with glowing neurons, a colourful stain that reveals stored fats, and a two-cell embryo at the beginning of development.",
    source: sources.portman,
    showCaptions: true,
    images: Object.freeze([
      wholeAnimalImage({
        src: "assets/species-gallery/source-portman-male-hermaphrodite.jpg",
        sourceWidth: 1344,
        sourceHeight: 767,
        viewBox: [0, 0, 1344, 767],
        alt: "Two adult Caenorhabditis elegans under microscopy: the smaller, slimmer male crosses above the larger hermaphrodite, with red and green fluorescence marking two neurons in the male's head.",
        caption: "Adult male (above) and hermaphrodite (below)",
        maxWidth: 820,
        layout: "wide"
      }),
      wholeAnimalImage({
        src: "assets/species-gallery/paves-varbuss-neurons.webp",
        sourceWidth: 1800,
        sourceHeight: 1189,
        viewBox: [306, 0, 1189, 1189],
        alt: "Several living Caenorhabditis elegans worms under a microscope, with green fluorescent protein highlighting neurons.",
        caption: "Glowing neurons in living worms",
        source: sources.paves,
        maxWidth: 430
      }),
      wholeAnimalImage({
        src: "assets/species-gallery/nile-red-elegans.webp",
        sourceWidth: 1600,
        sourceHeight: 1600,
        viewBox: [0, 0, 1600, 1600],
        alt: "Many Caenorhabditis elegans worms glowing red against a black background after Nile red staining reveals lipid distribution.",
        caption: "A red stain reveals stored fats",
        source: sources.gulnur,
        maxWidth: 430
      }),
      wholeAnimalImage({
        src: "assets/species-gallery/source-epfl-two-cell-embryo.png",
        sourceWidth: 481,
        sourceHeight: 326,
        viewBox: [0, 0, 481, 326],
        alt: "A two-cell Caenorhabditis elegans embryo under differential interference contrast microscopy, with green fluorescence marking chromatin in the two nuclei.",
        caption: "Two cells at the beginning of development",
        source: sources.epfl,
        maxWidth: 520,
        layout: "wide"
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
