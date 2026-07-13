(function () {
  'use strict';

  const chocolate = (id, label, status, box, details = {}) => ({ id, label, kind: 'chocolate', status, box, ...details });

  window.CABINET_OBJECTS = Object.freeze([
    chocolate('storm-bille-uganda-chilli', 'Storm & Bille Uganda chilli, 70%', 'confirmed', [23.24, 16.84, 7.62, 17.27], {
      maker: 'Storm & Bille', origin: 'Uganda', cacao: '70%', note: 'Uganda chilli bar.', link: 'https://stormochbille.se/products/chili-72', linkLabel: 'View the official product page'
    }),
    chocolate('small-wrapper-upper-left', 'Zotter Labooko Nicaragua Milk, 60%', 'visible', [31.84, 17.27, 3.06, 5.21], {
      maker: 'Zotter', origin: 'Nicaragua', cacao: '60%', link: 'https://www.zotter.at/en/online-shop/brands/labooko/60-milk-chocolate-nicaragua', linkLabel: 'View the official product page'
    }),
    chocolate('friis-holm-mini-1', 'Friis-Holm mini bar 1', 'confirmed', [35.09, 18.14, 2.28, 4.51], {
      maker: 'Friis-Holm', note: 'One of four mini bars in the shared Friis-Holm selection. Individual flavour not assigned.', link: 'https://friisholmchokolade.dk/products/bag-mix-12-x-5-g', linkLabel: 'View the shared mini-bar selection'
    }),
    chocolate('friis-holm-mini-2', 'Zotter Labooko Coffee', 'visible', [37.57, 17.19, 2.41, 5.21], {
      maker: 'Zotter', link: 'https://www.zotter.at/en/online-shop/brands/labooko/coffee-1', linkLabel: 'View the official product page'
    }),
    chocolate('friis-holm-mini-3', 'Friis-Holm mini bar 3', 'confirmed', [40.36, 17.27, 2.54, 5.21], {
      maker: 'Friis-Holm', note: 'One of four mini bars in the shared Friis-Holm selection. Individual flavour not assigned.', link: 'https://friisholmchokolade.dk/products/bag-mix-12-x-5-g', linkLabel: 'View the shared mini-bar selection'
    }),
    chocolate('friis-holm-mini-4', 'Friis-Holm mini bar 4', 'confirmed', [43.42, 17.27, 2.21, 5.30], {
      maker: 'Friis-Holm', note: 'One of four mini bars in the shared Friis-Holm selection. Individual flavour not assigned.', link: 'https://friisholmchokolade.dk/products/bag-mix-12-x-5-g', linkLabel: 'View the shared mini-bar selection'
    }),
    chocolate('small-orange-wrapper', 'Zotter Labooko Caramel', 'visible', [46.55, 16.67, 2.60, 6.94], {
      maker: 'Zotter', link: 'https://www.zotter.at/en/online-shop/brands/labooko/caramel-milk', linkLabel: 'View the official product page'
    }),
    chocolate('raaka-tanzania-100', 'Raaka Tanzania, 100%', 'confirmed', [49.87, 17.53, 5.73, 4.69], {
      maker: 'Raaka', origin: 'Tanzania', cacao: '100%', link: 'https://www.raakachocolate.com/products/100-cacao', linkLabel: 'View the official product page'
    }),
    chocolate('small-green-wrapper', 'Zotter Labooko Dominican Republic Milk, 40%', 'visible', [56.90, 16.58, 2.93, 5.99], {
      maker: 'Zotter', origin: 'Dominican Republic', cacao: '40%', link: 'https://www.zotter.at/en/online-shop/brands/labooko/40-milk-chocolate-dominican-republic', linkLabel: 'View the official product page'
    }),
    chocolate('omnom-craft-madagascar-66', 'Omnom Craft Madagascar, 66%', 'visible', [60.35, 15.54, 13.87, 9.03], {
      maker: 'Omnom', origin: 'Madagascar', cacao: '66%', link: 'https://omnom.is/products/madagascar-66', linkLabel: 'View the official product page'
    }),
    chocolate('amedei-porcelana-70', 'Amedei Porcelana, 70%', 'visible', [74.41, 15.63, 7.88, 18.23], {
      maker: 'Amedei', cacao: '70%', link: 'https://amedei.it/en/products/porcelana', linkLabel: 'View the official product page'
    }),
    chocolate('pink-sea-salt-wrapper', 'Pump Street Sourdough & Sea Salt, 66%', 'visible', [30.99, 24.65, 5.21, 10.33], {
      maker: 'Pump Street', cacao: '66%', link: 'https://pumpstreetchocolate.com/en-eu/collections/craft-chocolate/products/sourdough-sea-salt-66', linkLabel: 'View the official product page'
    }),
    chocolate('pink-madagascar-wrapper', 'Pump Street Madagascar Ambanja, 72%', 'visible', [36.46, 25.69, 4.82, 9.29], {
      maker: 'Pump Street', origin: 'Madagascar, Ambanja', cacao: '72%', link: 'https://pumpstreetchocolate.com/en-eu/products/madagascar-ambanja-72', linkLabel: 'View the official product page'
    }),
    chocolate('malmo-craft-madagascar', 'Malmö Chokladfabrik Sambirano, 70%', 'confirmed', [41.73, 24.13, 17.45, 28.39], {
      maker: 'Malmö Chokladfabrik', origin: 'Madagascar, Sambirano', cacao: '70%', note: 'The central wrapper showing the chocolate-making process.', link: 'https://malmochokladfabrik.se/products/sambirano', linkLabel: 'View the official product page'
    }),
    chocolate('small-wrapper-middle', 'Zotter Labooko Tanzania Milk, 50%', 'visible', [58.53, 25.09, 2.93, 6.42], {
      maker: 'Zotter', origin: 'Tanzania', cacao: '50%', link: 'https://www.zotter.at/en/online-shop/brands/labooko/50-tanzania', linkLabel: 'View the official product page'
    }),
    chocolate('uganda-horizontal-wrapper', 'Zotter Labooko Uganda, 70%', 'visible', [62.89, 25.00, 11.85, 6.77], {
      maker: 'Zotter', origin: 'Uganda', cacao: '70%', link: 'https://www.zotter.at/en/online-shop/brands/labooko/70-uganda', linkLabel: 'View the official product page'
    }),
    chocolate('vigdis-rosenkilde-echarete-80', 'Vigdis Rosenkilde Echarate, 80%', 'confirmed', [15.56, 32.90, 7.68, 18.75], {
      maker: 'Vigdis Rosenkilde', origin: 'Echarate', cacao: '80%', link: 'https://www.vigdisrosenkilde.no/new-products/yslhvfsydx8v5nti2jfv5as7p8dezq-77y4g-6z5gb-4whh3', linkLabel: 'View the official product page'
    }),
    chocolate('taza-round-package', 'Taza Cacao Puro, 70%', 'confirmed', [24.67, 35.50, 7.16, 9.20], {
      maker: 'Taza', cacao: '70%', shape: 'circle', link: 'https://www.tazachocolate.com/products/puro', linkLabel: 'View the official product page'
    }),
    chocolate('small-white-wrapper', 'Friis-Holm mini bar', 'visible', [38.22, 35.85, 2.80, 7.03], {
      maker: 'Friis-Holm', note: 'Part of the shared Friis-Holm mini-bar selection; the individual flavour is not legible.', link: 'https://friisholmchokolade.dk/products/bag-mix-12-x-5-g', linkLabel: 'View the official mini-bar selection'
    }),
    chocolate('kamm-ecuador-85', 'Kamm Ecuador, 85%', 'confirmed', [27.93, 35.16, 14.13, 17.97], {
      maker: 'Kamm', origin: 'Ecuador', cacao: '85%', shape: 'triangle', link: 'https://kammchocolate.com/products/cacao-85-ancestral-chocolate-60grs', linkLabel: 'View the official product page'
    }),
    chocolate('wild-schokolade-chimore-65', 'Vild Chokolade Chimoré, 65%', 'visible', [71.16, 34.11, 8.07, 20.31], {
      maker: 'Vild Chokolade', origin: 'Chimoré', cacao: '65%', link: 'https://foodbynature.org/dk/category-vild-chokolade/', linkLabel: 'Visit the official Vild Chokolade storefront'
    }),
    chocolate('aroko-tocumare', 'Aroko Ocumare, 74%', 'visible', [78.58, 34.72, 5.01, 10.33], {
      maker: 'Aroko', origin: 'Ocumare, Aragua, Venezuela', cacao: '74%', link: 'https://www.arokochocolate.com/en/products/ocumare-74-aragua-venezuela-50-gr', linkLabel: 'View the official product page'
    }),
    chocolate('zotter-labooko-white', 'Zotter Labooko White', 'confirmed', [80.86, 46.09, 3.13, 7.38], {
      maker: 'Zotter', note: 'The small white wrapper on the right.', link: 'https://www.zotter.at/en/online-shop/brands/labooko/white-chocolate-2', linkLabel: 'View the official product page'
    }),
    chocolate('tjak-norwegian-brown-cheese', 'Fjåk Milk & Brown Cheese, 45%', 'visible', [14.52, 51.56, 10.03, 21.79], {
      maker: 'Fjåk', cacao: '45%', link: 'https://fjaak.no/en/product/45-milk-brown-cheese/', linkLabel: 'View the official product page'
    }),
    chocolate('luisa-abram-rio-jurua-70', 'Luisa Abram Rio Juruá, 70%', 'confirmed', [24.74, 54.25, 10.22, 22.40], {
      maker: 'Luisa Abram', origin: 'Rio Juruá', cacao: '70%', link: 'https://luisaabram.com/products/barra-de-chocolate-luisa-abram-rio-jurua-70-cacau', linkLabel: 'View the official product page'
    }),
    chocolate('paradai-nakhon-si-thammarat-red-pod', 'Paradai Nakhon Si Thammarat Red Pod, 70%', 'confirmed', [35.16, 54.86, 13.02, 11.37], {
      maker: 'Paradai', origin: 'Nakhon Si Thammarat', cacao: '70%', note: 'Red Pod bar.'
    }),
    chocolate('aroko-chuao-amazonas-70', 'Aroko Chuao, Aragua Venezuela, 70%', 'visible', [47.59, 53.56, 13.22, 18.58], {
      maker: 'Aroko', origin: 'Chuao, Aragua, Venezuela', cacao: '70%', link: 'https://www.arokochocolate.com/en/pages/chuao-70-aragua-venezuela-50-gr', linkLabel: 'View the official product page'
    }),
    chocolate('black-cherry-70', 'Ocelot Black Cherry, 70%', 'visible', [61.00, 48.61, 8.40, 16.75], {
      maker: 'Ocelot', cacao: '70%', link: 'https://www.ocelotchocolate.com/products/black-cherry', linkLabel: 'View the official product page'
    }),
    chocolate('marou-green', 'Marou Bến Tre, 78%', 'visible', [71.48, 55.12, 5.53, 16.41], {
      maker: 'Marou', origin: 'Bến Tre, Vietnam', cacao: '78%', link: 'https://www.marouchocolate.com/products/ben-tre-78-single-origin-bar', linkLabel: 'View the official product page'
    }),
    chocolate('firetree-solomon-islands', 'Firetree Guadalcanal, Solomon Islands, 69%', 'visible', [78.97, 54.51, 6.12, 17.01], {
      maker: 'Firetree', origin: 'Guadalcanal, Solomon Islands', cacao: '69%', link: 'https://firetreechocolate.co.uk/collections/solomon-islands-single-estate-chocolate', linkLabel: 'Explore the official Solomon Islands collection'
    }),
    chocolate('chocolate-naive-xocoatl', 'Chocolate Naive Xocoatl', 'confirmed', [60.61, 65.54, 10.55, 19.88], {
      maker: 'Chocolate Naive', link: 'https://chocolatenaive.com/shop/bbq-spice/', linkLabel: 'View the official product page'
    }),
    chocolate('willies-cacao-pistachio-date', "Willie's Cacao Pistachio & Date", 'visible', [73.83, 73.00, 10.29, 14.15], {
      maker: "Willie's Cacao", link: 'https://www.williescacao.com/product/pistachio-date/', linkLabel: 'View the official product page'
    }),
    chocolate('paradai-chanthaburi-yellow', 'Paradai Chanthaburi', 'confirmed', [11.33, 79.34, 14.78, 13.54], {
      maker: 'Paradai', origin: 'Chanthaburi', note: 'The cacao percentage is not clearly legible on the yellow wrapper.'
    }),
    chocolate('date-cashew-vegan', 'Zotter Date & Cashew', 'visible', [33.66, 79.60, 11.46, 7.03], {
      maker: 'Zotter', link: 'https://www.zotter.at/en/online-shop/brands/hand-scooped-chocolates/date-cashew', linkLabel: 'View the official product page'
    }),
    chocolate('bonnat-java', 'Bonnat Java milk chocolate, 65%', 'visible', [46.22, 75.17, 15.23, 10.94], {
      maker: 'Bonnat', origin: 'Java', cacao: '65%', link: 'https://bonnat-chocolatier.com/fr/e-shop/tablettes/tablettes-grands-crus-lait/tablette-chocolat-java', linkLabel: 'View the official product page'
    }),
    {
      id: 'green-crocheted-eye', label: 'Green crocheted eye', kind: 'crochet', status: 'confirmed', box: [59.64, 34.64, 10.29, 14.24], shape: 'circle',
      note: 'Crocheted by Martyna using the Blooming Eye Crochet Pattern.',
      link: 'https://www.etsy.com/listing/4342094945/blooming-eye-crochet-pattern-pdf', linkLabel: 'View the English crochet pattern on Etsy'
    },
    {
      id: 'yellow-crocheted-eye', label: 'Yellow crocheted eye', kind: 'crochet', status: 'confirmed', box: [35.29, 65.02, 10.29, 14.84], shape: 'circle',
      note: 'Crocheted by Martyna using the Blooming Eye Crochet Pattern.',
      link: 'https://www.etsy.com/listing/4342094945/blooming-eye-crochet-pattern-pdf', linkLabel: 'View the English crochet pattern on Etsy'
    },
    {
      id: 'sfoodies-sticker', label: '“Either You Love Chocolate” sticker', kind: 'ephemera', status: 'confirmed', box: [28.50, 80.10, 5.60, 6.80], shape: 'rectangle',
      maker: 'S-Foodies', origin: 'Uppsala, Sweden', note: 'A sticker from S-Foodies Healthy Desserts Lab in Uppsala.',
      link: 'https://sfoodies.se/en', linkLabel: 'Visit the S-Foodies website'
    }
  ]);
}());
