(function () {
  'use strict';

  const chocolate = (id, label, status, box, details = {}) => ({ id, label, kind: 'chocolate', status, box, ...details });

  window.CABINET_OBJECTS = Object.freeze([
    chocolate('storm-bille-uganda-chilli', 'Storm & Bille Uganda chilli, 70%', 'confirmed', [23.24, 16.84, 7.62, 17.27], {
      maker: 'Storm & Bille', origin: 'Uganda', cacao: '70%', note: 'Uganda chilli bar. Identification and percentage confirmed by Martyna.'
    }),
    chocolate('small-wrapper-upper-left', 'Small wrapper, upper left', 'unknown', [31.84, 17.27, 3.06, 5.21], {
      note: 'This package has not yet been identified. No maker, percentage or link has been assigned.'
    }),
    chocolate('friis-holm-mini-1', 'Friis-Holm mini bar 1', 'confirmed', [35.09, 18.14, 2.28, 4.51], {
      maker: 'Friis-Holm', note: 'One of four mini bars in the shared Friis-Holm selection. Individual flavour not assigned.', link: 'https://friisholmchokolade.dk/products/bag-mix-12-x-5-g', linkLabel: 'View the shared mini-bar selection'
    }),
    chocolate('friis-holm-mini-2', 'Friis-Holm mini bar 2', 'confirmed', [37.57, 17.19, 2.41, 5.21], {
      maker: 'Friis-Holm', note: 'One of four mini bars in the shared Friis-Holm selection. Individual flavour not assigned.', link: 'https://friisholmchokolade.dk/products/bag-mix-12-x-5-g', linkLabel: 'View the shared mini-bar selection'
    }),
    chocolate('friis-holm-mini-3', 'Friis-Holm mini bar 3', 'confirmed', [40.36, 17.27, 2.54, 5.21], {
      maker: 'Friis-Holm', note: 'One of four mini bars in the shared Friis-Holm selection. Individual flavour not assigned.', link: 'https://friisholmchokolade.dk/products/bag-mix-12-x-5-g', linkLabel: 'View the shared mini-bar selection'
    }),
    chocolate('friis-holm-mini-4', 'Friis-Holm mini bar 4', 'confirmed', [43.42, 17.27, 2.21, 5.30], {
      maker: 'Friis-Holm', note: 'One of four mini bars in the shared Friis-Holm selection. Individual flavour not assigned.', link: 'https://friisholmchokolade.dk/products/bag-mix-12-x-5-g', linkLabel: 'View the shared mini-bar selection'
    }),
    chocolate('small-orange-wrapper', 'Small orange wrapper', 'unknown', [46.55, 16.67, 2.60, 6.94], {
      note: 'This tall orange package has not yet been identified.'
    }),
    chocolate('raaka-tanzania-100', 'Raaka Tanzania, 100%', 'confirmed', [49.87, 17.53, 5.73, 4.69], {
      maker: 'Raaka', origin: 'Tanzania', cacao: '100%', note: 'Identification, origin and percentage confirmed by Martyna.'
    }),
    chocolate('small-green-wrapper', 'Small green wrapper, top row', 'unknown', [56.90, 16.58, 2.93, 5.99], {
      note: 'This small green package has not yet been identified.'
    }),
    chocolate('omnom-craft-madagascar-66', 'Omnom Craft Madagascar, 66%', 'visible', [60.35, 15.54, 13.87, 9.03], {
      maker: 'Omnom', origin: 'Madagascar', cacao: '66%', note: 'Name and percentage are readable on the original photograph but have not yet been separately confirmed by Martyna.'
    }),
    chocolate('amedei-porcelana-70', 'Amedei Porcelana, 70%', 'visible', [74.41, 15.63, 7.88, 18.23], {
      maker: 'Amedei', cacao: '70%', note: 'Name and percentage are readable on the original photograph but have not yet been separately confirmed by Martyna.'
    }),
    chocolate('pink-sea-salt-wrapper', 'Pink sea-salt wrapper', 'unknown', [30.99, 24.65, 5.21, 10.33], {
      note: 'The package is visible in the photograph, but its exact identity is not confirmed.'
    }),
    chocolate('pink-madagascar-wrapper', 'Pink Madagascar wrapper', 'unknown', [36.46, 25.69, 4.82, 9.29], {
      origin: 'Madagascar', note: 'Madagascar is visible on the wrapper. Maker and percentage remain unconfirmed.'
    }),
    chocolate('malmo-craft-madagascar', 'Malmö Chokladfabrik Craft Madagascar', 'confirmed', [41.73, 24.13, 17.45, 28.39], {
      maker: 'Malmö Chokladfabrik', origin: 'Madagascar', note: 'The central wrapper showing the chocolate-making process. Identification confirmed by Martyna.'
    }),
    chocolate('small-wrapper-middle', 'Small wrapper, upper middle', 'unknown', [58.53, 25.09, 2.93, 6.42], {
      note: 'This narrow package has not yet been identified.'
    }),
    chocolate('uganda-horizontal-wrapper', 'Horizontal Uganda wrapper', 'unknown', [62.89, 25.00, 11.85, 6.77], {
      origin: 'Uganda', note: 'Uganda is visible on the wrapper. Maker and percentage remain unconfirmed.'
    }),
    chocolate('vigdis-rosenkilde-echarete-80', 'Vigdis Rosenkilde Echarete, 80%', 'confirmed', [15.56, 32.90, 7.68, 18.75], {
      maker: 'Vigdis Rosenkilde', origin: 'Echarete', cacao: '80%', note: 'Identification, origin and percentage confirmed by Martyna.'
    }),
    chocolate('taza-round-package', 'Taza circular package', 'confirmed', [24.67, 35.50, 7.16, 9.20], {
      maker: 'Taza', shape: 'circle', note: 'The circular package is Taza. It is intentionally not labelled Malmö Chokladfabrik.'
    }),
    chocolate('small-white-wrapper', 'Small white wrapper, middle', 'unknown', [38.22, 35.85, 2.80, 7.03], {
      note: 'This small white package has not yet been identified.'
    }),
    chocolate('kamm-ecuador-85', 'Kamm Ecuador, 85%', 'confirmed', [27.93, 35.16, 14.13, 17.97], {
      maker: 'Kamm', origin: 'Ecuador', cacao: '85%', shape: 'triangle', note: 'Identification, origin and percentage confirmed by Martyna.'
    }),
    chocolate('wild-schokolade-chimore-65', 'Wild Schokolade Chimoré, 65%', 'visible', [71.16, 34.11, 8.07, 20.31], {
      maker: 'Wild Schokolade', origin: 'Chimoré', cacao: '65%', note: 'Name and percentage are readable on the original photograph but have not yet been separately confirmed by Martyna.'
    }),
    chocolate('aroko-tocumare', 'Aroko Tocumare', 'visible', [78.58, 34.72, 5.01, 10.33], {
      maker: 'Aroko', origin: 'Tocumare', note: 'Name is readable on the original photograph. Percentage has not been assigned.'
    }),
    chocolate('zotter-labooko-white', 'Zotter Labooko White', 'confirmed', [80.86, 46.09, 3.13, 7.38], {
      maker: 'Zotter', note: 'The small white wrapper on the right. Identification confirmed by Martyna; it is intentionally not labelled Omnom.'
    }),
    chocolate('tjak-norwegian-brown-cheese', 'Tjåk Norwegian Brown Cheese', 'visible', [14.52, 51.56, 10.03, 21.79], {
      maker: 'Tjåk', note: 'Name is readable on the original photograph but has not yet been separately confirmed by Martyna.'
    }),
    chocolate('luisa-abram-rio-jurua-70', 'Luisa Abram Rio Juruá, 70%', 'confirmed', [24.74, 54.25, 10.22, 22.40], {
      maker: 'Luisa Abram', origin: 'Rio Juruá', cacao: '70%', note: 'Identification, origin and percentage confirmed by Martyna.'
    }),
    chocolate('paradai-nakhon-si-thammarat-red-pod', 'Paradai Nakhon Si Thammarat Red Pod, 70%', 'confirmed', [35.16, 54.86, 13.02, 11.37], {
      maker: 'Paradai', origin: 'Nakhon Si Thammarat', cacao: '70%', note: 'Red Pod. Identification, origin and percentage confirmed by Martyna.'
    }),
    chocolate('aroko-chuao-amazonas-70', 'Aroko Chuao, Amazonas Venezuela, 70%', 'visible', [47.59, 53.56, 13.22, 18.58], {
      maker: 'Aroko', origin: 'Chuao, Amazonas, Venezuela', cacao: '70%', note: 'Name, origin and percentage are readable on the original photograph but have not yet been separately confirmed by Martyna.'
    }),
    chocolate('black-cherry-70', 'Black Cherry, 70%', 'visible', [61.00, 48.61, 8.40, 16.75], {
      cacao: '70%', note: 'Product name and percentage are readable on the original photograph. Maker has not been assigned.'
    }),
    chocolate('marou-green', 'Green Marou bar, possibly Bến Tre', 'tentative', [71.48, 55.12, 5.53, 16.41], {
      maker: 'Marou', origin: 'Possibly Bến Tre', note: 'This identification is explicitly tentative and needs confirmation.'
    }),
    chocolate('firetree-solomon-islands', 'Firetree Solomon Islands', 'visible', [78.97, 54.51, 6.12, 17.01], {
      maker: 'Firetree', origin: 'Solomon Islands', note: 'Maker and origin are readable on the original photograph. Exact variant and percentage have not been assigned.'
    }),
    chocolate('chocolate-naive-xocoatl', 'Chocolate Naive Xocoatl', 'confirmed', [60.61, 65.54, 10.55, 19.88], {
      maker: 'Chocolate Naive', note: 'Wrapper identification confirmed by Martyna.', link: 'https://chocolatenaive.com/storage/2023/03/xocoatl.webp', linkLabel: 'View the supplied wrapper reference'
    }),
    chocolate('willies-cacao-pistachio-date', "Willie's Cacao Pistachio & Date", 'visible', [73.83, 73.00, 10.29, 14.15], {
      maker: "Willie's Cacao", note: 'Name is readable on the original photograph but has not yet been separately confirmed by Martyna.'
    }),
    chocolate('paradai-chanthaburi-yellow', 'Paradai Chanthaburi', 'confirmed', [11.33, 79.34, 14.78, 13.54], {
      maker: 'Paradai', origin: 'Chanthaburi', note: 'The yellow wrapper and origin are confirmed. The exact cacao percentage is still unknown.'
    }),
    chocolate('date-cashew-vegan', 'Date and Cashew Vegan', 'visible', [33.66, 79.60, 11.46, 7.03], {
      note: 'Name is readable on the original photograph. Maker and percentage have not been assigned.'
    }),
    chocolate('bonnat-java', 'Bonnat Java', 'visible', [46.22, 75.17, 15.23, 10.94], {
      maker: 'Bonnat', origin: 'Java', note: 'Maker and origin are readable on the original photograph. Exact variant and percentage have not been assigned.'
    }),
    {
      id: 'green-crocheted-eye', label: 'Green crocheted eye', kind: 'crochet', status: 'confirmed', box: [59.64, 34.64, 10.29, 14.24], shape: 'circle',
      note: 'A crocheted eye made by Martyna. The exact pattern and Ravelry profile links have not yet been supplied, so no link is shown.'
    },
    {
      id: 'yellow-crocheted-eye', label: 'Yellow crocheted eye', kind: 'crochet', status: 'confirmed', box: [35.29, 65.02, 10.29, 14.84], shape: 'circle',
      note: 'A crocheted eye made by Martyna. The exact pattern and Ravelry profile links have not yet been supplied, so no link is shown.'
    }
  ]);
}());
