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
    ['friis-holm-mini-4', 'friis-holm-johe-70.jpg'],
    ['small-white-wrapper', 'friis-holm-la-dalia-70.jpg']
  ]) {
    images[id] = Object.freeze({src: `assets/collection-products/${file}`, credit: '© Friis-Holm Chokolade'});
  }
  window.CABINET_PRODUCT_IMAGES = Object.freeze(images);
}());
