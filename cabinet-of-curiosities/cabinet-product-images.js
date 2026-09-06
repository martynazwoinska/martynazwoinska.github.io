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
  window.CABINET_PRODUCT_IMAGES = Object.freeze(images);
}());
