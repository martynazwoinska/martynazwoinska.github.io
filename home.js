(function (window, document) {
  'use strict';

  // Load the existing homepage behaviour, then replace only the dark-theme
  // navbar monogram with the production gold-terminal asset. The embedded
  // Z3 artwork remains the fallback if GitHub Pages cannot serve the PNG.
  var core = document.createElement('script');
  core.src = 'home-core.js?v=20260810-gold-terminal';
  core.async = false;
  core.onload = function () {
    var darkMonogram = document.getElementById('navMonogramDark');
    if (!darkMonogram) return;

    var productionAsset = new Image();
    productionAsset.onload = function () {
      darkMonogram.src = productionAsset.src;
    };
    productionAsset.src = 'assets/identity/nav-monogram-z3-dark-production.png?v=20260810-gold-terminal';
  };
  core.onerror = function () {
    console.error('Unable to load the homepage script.');
  };
  document.head.appendChild(core);
}(window, document));
