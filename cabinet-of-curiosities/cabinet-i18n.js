(function (window) {
  'use strict';

  window.CABINET_I18N = Object.freeze({
    kindLabels: Object.freeze({
      chocolate: 'Chocolate package',
      crochet: 'Crocheted object',
      ephemera: 'Collected ephemera',
      app: 'Chocolate app'
    }),
    collectionObject: 'Collection object',
    factLabels: Object.freeze({
      maker: 'Maker',
      origin: 'Origin',
      cacao: 'Cacao'
    }),
    visitSuppliedLink: 'Visit supplied link',
    openDetails: 'Open details.',
    topRowMiniBars: 'Browse the top-row mini bars',
    scene: Object.freeze({
      controls: 'Scene view controls',
      zoomOut: 'Zoom out',
      zoomIn: 'Zoom in',
      resetView: 'Reset view',
      defaultHint: 'Select an object, or browse the collection by name.',
      touchHint: 'Drag · pinch to zoom · tap an object.',
      viewScale: percent => `View ${percent}%.`
    }),
    collectionGroups: Object.freeze({
      chocolates: 'Chocolate packages',
      crochet: 'Crocheted eyes',
      ephemera: 'Collected ephemera'
    })
  });
})(window);
