// List-only product photography. Never used by the board or object-detail preview.
// Zotter publishes product photographs for press use with this credit:
// https://www.zotter.at/en/about-zotter/press-downloads/logo-photos
// See assets/collection-products/SOURCES.md for exact source URLs and review.
(function () {
  'use strict';
  const ids = [
    'small-wrapper-upper-left', 'friis-holm-mini-2', 'small-orange-wrapper',
    'small-green-wrapper', 'small-wrapper-middle', 'uganda-horizontal-wrapper',
    'date-cashew-vegan'
  ];
  const images = Object.fromEntries(ids.map(id => [
    id, Object.freeze({src: `assets/collection-products/${id}.jpg`, credit: '© Zotter Chocolate'})
  ]));
  // Full-size equivalents of the collected minis, explicitly requested by Martyna.
  // Permission to use Friis-Holm product photos confirmed on 2026-09-06.
  for (const [id, file] of [
    ['friis-holm-mini-1', 'friis-holm-indio-rojo-70.jpg'],
    ['friis-holm-mini-3', 'friis-holm-medagla-70.jpg'],
    ['friis-holm-mini-4', 'friis-holm-johe-70.jpg']
  ]) {
    images[id] = Object.freeze({src: `assets/collection-products/${file}`, credit: '© Friis-Holm Chokolade'});
  }
  // Maker/retailer photo permission confirmed by Martyna on 2026-09-06.
  // Original downloads, displayed complete; never used in the cabinet or details.
  const additional = {
    "storm-bille-uganda-chilli": {src: "assets/collection-products/storm-bille-uganda-chilli-web-v102.webp", credit: "Storm & Bille", source: "https://stormochbille.se/products/chili-72"},
    "amedei-porcelana-70": {src: "assets/collection-products/amedei-porcelana-70-web-v102.webp", credit: "Amedei", source: "https://amedei.it/en/products/porcelana"},
    "omnom-craft-madagascar-66": {src: "assets/collection-products/omnom-craft-madagascar-66-web-v102.webp", credit: "Omnom", source: "https://omnom.is/products/madagascar-66"},
    "raaka-tanzania-100": {src: "assets/collection-products/raaka-tanzania-100-web-v102.webp", credit: "Raaka", source: "https://www.raakachocolate.com/products/100-cacao"},
    "malmo-craft-madagascar": {src: "assets/collection-products/malmo-craft-madagascar-web-v102.webp", credit: "Malmö Chokladfabrik", source: "https://malmochokladfabrik.se/products/sambirano"},
    "small-white-wrapper": {src: "assets/collection-products/small-white-wrapper-web-v102.jpg", credit: "Friis-Holm · Chocolats-de-Luxe", source: "https://www.chocolats-de-luxe.de/en/la-dalia-70-the-lazy-cocoa-growers-blend-chocolate-by-friis-holm"},
    "taza-round-package": {src: "assets/collection-products/taza-round-package-web-v102.webp", credit: "Taza Chocolate", source: "https://www.tazachocolate.com/products/puro"},
    "kamm-ecuador-85": {src: "assets/collection-products/kamm-ecuador-85-web-v102.webp", credit: "Kamm", source: "https://kammchocolate.com/products/cacao-85-ancestral-chocolate-60grs"},
    "wild-schokolade-chimore-65": {src: "assets/collection-products/wild-schokolade-chimore-65-web-v102.jpg", credit: "Vild Chokolade", source: "https://foodbynature.org/dk/category-vild-chokolade/"},
    "aroko-tocumare": {src: "assets/collection-products/aroko-tocumare-web-v102.webp", credit: "Aroko Chocolate", source: "https://www.arokochocolate.com/en/products/ocumare-74-aragua-venezuela-50-gr"},
    "luisa-abram-rio-jurua-70": {src: "assets/collection-products/luisa-abram-rio-jurua-70-web-v102.webp", credit: "Luisa Abram", source: "https://luisaabram.com/products/barra-de-chocolate-luisa-abram-rio-jurua-70-cacau"},
    "black-cherry-70": {src: "assets/collection-products/black-cherry-70-web-v102.webp", credit: "Ocelot Chocolate", source: "https://www.ocelotchocolate.com/products/black-cherry"},
    "tjak-norwegian-brown-cheese": {src: "assets/collection-products/tjak-norwegian-brown-cheese-web-v102.webp", credit: "Fjåk · Bar & Cocoa", source: "https://barandcocoa.com/products/fjak-brown-cheese-milk-chocolate-45"},
    "chocolate-naive-xocoatl": {src: "assets/collection-products/chocolate-naive-xocoatl-web-v102.webp", credit: "Chocolate Naive", source: "https://chocolatenaive.com/shop/bbq-spice/"},
    "paradai-nakhon-si-thammarat-red-pod": {src: "assets/collection-products/paradai-nakhon-si-thammarat-red-pod-web-v102.webp", credit: "Paradai · Premifair", source: "https://premifair.com/products/paradai-schokolade-nakhon-si-thammarat-red-pod-70-thailand"},
    "marou-green": {src: "assets/collection-products/marou-green-web-v102.webp", credit: "Marou", source: "https://www.marouchocolate.com/products/ben-tre-78-single-origin-bar"},
    "bonnat-java": {src: "assets/collection-products/bonnat-java-web-v102.png", credit: "Bonnat", source: "https://bonnat-chocolatier.com/fr/e-shop/tablettes/tablettes-grands-crus-lait/tablette-chocolat-java"},
    "willies-cacao-pistachio-date": {src: "assets/collection-products/willies-cacao-pistachio-date-web-v102.png", credit: "Willie's Cacao", source: "https://www.williescacao.com/product/pistachio-date/"},
    "paradai-chanthaburi-yellow": {src: "assets/collection-products/paradai-chanthaburi-yellow-web-v102.jpg", credit: "Paradai · Premifair", source: "https://premifair.com/products/paradai-chanthaburi-70"},
    "firetree-solomon-islands": {src: "assets/collection-products/firetree-solomon-islands-web-v102.jpg", credit: "Firetree · Choco Dealer", source: "https://choco-dealer.com/en/82-GUADALCANAL-SOLOMON-ISLANDS/FTR02"},
    "aroko-chuao-amazonas-70": {src: "assets/collection-products/aroko-chuao-amazonas-70-web-v102.webp", credit: "Aroko Chocolate", source: "https://www.arokochocolate.com/products/chuao-70-aragua-venezuela-50-gr"},
    "pink-sea-salt-wrapper": {src: "assets/collection-products/pink-sea-salt-wrapper-web-v102.jpg", credit: "Pump Street · Chocolats-de-Luxe", source: "https://www.chocolats-de-luxe.de/en/pump-street-sourdough-sea-salt-66-dark-chocolate"},
    "pink-madagascar-wrapper": {src: "assets/collection-products/pink-madagascar-wrapper-web-v102.jpg", credit: "Pump Street · Chocolats-de-Luxe", source: "https://www.chocolats-de-luxe.de/en/pump-street-madagascar-72-chocolate"},
    "vigdis-rosenkilde-echarete-80": {src: "assets/collection-products/vigdis-rosenkilde-echarete-80-web-v102.webp", credit: "Vigdis Rosenkilde · Hello Chocolate", source: "https://hellochocolate.com/products/vigdis-worlds-finest-chocolate-echarate-80"}
  };
  for (const [id, photo] of Object.entries(additional)) {
    images[id] = Object.freeze(photo);
  }
  window.CABINET_PRODUCT_IMAGES = Object.freeze(images);
}());
