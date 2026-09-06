(function () {
  'use strict';

  const objects = Array.isArray(window.CABINET_OBJECTS) ? window.CABINET_OBJECTS : [];
  const chofItem = window.CABINET_CHOF || null;
  const copy = window.CABINET_I18N;
  const cabinetPage = document.querySelector('.cabinet-page');
  const cabinetStage = document.getElementById('cabinet-stage');
  const sceneSpace = document.getElementById('scene-space');
  const hotspotLayer = document.getElementById('hotspot-layer');
  const boardShell = document.getElementById('board-shell');
  const chofButton = document.getElementById('chof-link');
  const exploreHint = document.getElementById('explore-hint');
  const sceneControls = document.getElementById('scene-controls');
  const zoomOutButton = document.getElementById('scene-zoom-out');
  const resetViewButton = document.getElementById('scene-reset');
  const zoomInButton = document.getElementById('scene-zoom-in');
  const sceneViewStatus = document.getElementById('scene-view-status');
  const preview = document.getElementById('object-preview');
  const previewTitle = document.getElementById('preview-title');
  const previewDescription = document.getElementById('preview-description');
  const panel = document.getElementById('collection-panel');
  const panelToggle = document.getElementById('collection-toggle');
  const panelClose = document.getElementById('collection-close');
  const collectionList = document.getElementById('collection-list');
  const portraitList = document.getElementById('portrait-collection-list');
  const portraitCabinetToggle = document.getElementById('portrait-cabinet-toggle');
  let portraitExploring = false;
  const dialog = document.getElementById('detail-dialog');
  const detailClose = document.getElementById('detail-close');
  const detailKind = document.getElementById('detail-kind');
  const detailTitle = document.getElementById('detail-title');
  const detailFacts = document.getElementById('detail-facts');
  const detailNote = document.getElementById('detail-note');
  const detailLink = document.getElementById('detail-link');
  let lastDialogTrigger = null;
  let lastPanelTrigger = null;
  let compactHotspotMode = null;
  let sceneNavigationEnabled = false;
  let dragStart = null;
  let pinchStart = null;
  let sceneGestureMoved = false;
  let suppressSceneClickUntil = 0;

  const sceneNavigationQuery = window.matchMedia('(pointer: coarse) and (orientation: landscape) and (max-height: 600px)');
  const portraitQuery = window.matchMedia('(orientation: portrait) and (max-width: 980px)');
  const activeScenePointers = new Map();
  const sceneView = { scale: 1, panX: 0, panY: 0 };
  const MAX_SCENE_SCALE = 2.5;
  const SCENE_SCALE_STEP = .2;
  const SCENE_DRAG_THRESHOLD = 5;

  const PHOTO_WIDTH = 1536;
  const PHOTO_HEIGHT = 1152;
  const SCENE_WIDTH = 1672;
  const SCENE_HEIGHT = 941;
  const PHOTO_TO_SCENE = [
    [0.832264758, 0, 215.658370],
    [0.015540190, 0.803724256, -13.696234],
    [0.000004491, 0, 1]
  ];

  function clamp(value, minimum, maximum) {
    return Math.min(maximum, Math.max(minimum, value));
  }

  function sceneBaseSize() {
    const styles = window.getComputedStyle(sceneSpace);
    return {
      width: Number.parseFloat(styles.width) || window.innerWidth,
      height: Number.parseFloat(styles.height) || window.innerHeight
    };
  }

  function sceneDefaultOffset(size = sceneBaseSize()) {
    const sceneY = Number.parseFloat(window.getComputedStyle(cabinetPage).getPropertyValue('--scene-y'));
    const yPercent = Number.isFinite(sceneY) ? sceneY : -50;
    return { x: 0, y: (yPercent + 50) / 100 * size.height };
  }

  function minimumSceneScale(size = sceneBaseSize()) {
    if (sceneNavigationEnabled) return 1;
    return Math.max(.4, Math.min(1, window.innerWidth / size.width, window.innerHeight / size.height));
  }

  function sceneViewport() {
    const rect = cabinetStage.getBoundingClientRect();
    return { width: rect.width, height: rect.height, x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
  }

  function clampSceneView() {
    const size = sceneBaseSize();
    const offset = sceneDefaultOffset(size);
    const viewport = sceneViewport();
    const maximumX = Math.max(0, (size.width * sceneView.scale - viewport.width) / 2);
    const maximumY = Math.max(0, (size.height * sceneView.scale - viewport.height) / 2);
    sceneView.panX = clamp(offset.x + sceneView.panX, -maximumX, maximumX) - offset.x;
    sceneView.panY = clamp(offset.y + sceneView.panY, -maximumY, maximumY) - offset.y;
  }

  function sceneScalePercent() {
    return Math.round(sceneView.scale * 100);
  }

  function applySceneView(announce = false) {
    sceneView.scale = clamp(sceneView.scale, minimumSceneScale(), MAX_SCENE_SCALE);
    clampSceneView();
    cabinetPage.style.setProperty('--scene-scale', sceneView.scale.toFixed(4));
    cabinetPage.style.setProperty('--scene-pan-x', `${sceneView.panX.toFixed(2)}px`);
    cabinetPage.style.setProperty('--scene-pan-y', `${sceneView.panY.toFixed(2)}px`);

    const percent = sceneScalePercent();
    const minimum = minimumSceneScale();
    resetViewButton.textContent = `${percent}%`;
    zoomOutButton.disabled = sceneView.scale <= minimum + .002;
    zoomInButton.disabled = sceneView.scale >= MAX_SCENE_SCALE - .002;
    if (announce) sceneViewStatus.textContent = copy.scene.viewScale(percent);
  }

  function setSceneScale(nextScale, centerX = sceneViewport().x, centerY = sceneViewport().y, announce = true) {
    const size = sceneBaseSize();
    const offset = sceneDefaultOffset(size);
    const oldScale = sceneView.scale;
    const minimum = minimumSceneScale(size);
    const scale = clamp(nextScale, minimum, MAX_SCENE_SCALE);
    if (Math.abs(scale - oldScale) < .0001) return;

    const viewport = sceneViewport();
    const anchorX = (centerX - viewport.x - offset.x - sceneView.panX) / oldScale;
    const anchorY = (centerY - viewport.y - offset.y - sceneView.panY) / oldScale;
    sceneView.scale = scale;
    sceneView.panX = centerX - viewport.x - offset.x - anchorX * scale;
    sceneView.panY = centerY - viewport.y - offset.y - anchorY * scale;
    applySceneView(announce);
  }

  function resetSceneView(announce = true) {
    sceneView.scale = 1;
    sceneView.panX = 0;
    sceneView.panY = 0;
    applySceneView(announce);
  }

  function captureActiveScenePointers() {
    activeScenePointers.forEach((point, pointerId) => {
      if (!cabinetStage.hasPointerCapture(pointerId)) {
        try {
          cabinetStage.setPointerCapture(pointerId);
        } catch (error) {
          /* Pointer capture can fail if the contact ended between events. */
        }
      }
    });
  }

  function markSceneGestureMoved() {
    sceneGestureMoved = true;
    cabinetPage.classList.add('is-scene-dragging');
    hidePreview();
    captureActiveScenePointers();
  }

  function pointerPair() {
    return Array.from(activeScenePointers.entries()).slice(0, 2);
  }

  function beginPinch() {
    const pair = pointerPair();
    if (pair.length < 2) {
      pinchStart = null;
      return;
    }

    const first = pair[0][1];
    const second = pair[1][1];
    const midpointX = (first.x + second.x) / 2;
    const midpointY = (first.y + second.y) / 2;
    const distance = Math.hypot(second.x - first.x, second.y - first.y);
    const size = sceneBaseSize();
    const offset = sceneDefaultOffset(size);
    const viewport = sceneViewport();
    pinchStart = {
      distance: Math.max(1, distance),
      scale: sceneView.scale,
      anchorX: (midpointX - viewport.x - offset.x - sceneView.panX) / sceneView.scale,
      anchorY: (midpointY - viewport.y - offset.y - sceneView.panY) / sceneView.scale
    };
  }

  function configureSceneNavigation() {
    const portrait = portraitQuery.matches;
    if (!portrait) portraitExploring = false;
    const browsing = portrait && !portraitExploring;
    cabinetPage.classList.toggle('is-portrait-browsing', browsing);
    document.documentElement.classList.toggle('is-portrait-browsing', browsing);
    boardShell.inert = browsing;
    panelToggle.setAttribute('aria-controls', portrait ? 'portrait-collection' : 'collection-panel');
    if (portrait) panelToggle.removeAttribute('aria-expanded');
    else panelToggle.setAttribute('aria-expanded', String(panel.open));
    const shouldEnable = sceneNavigationQuery.matches || (portrait && portraitExploring);
    if (shouldEnable === sceneNavigationEnabled) {
      if (shouldEnable) applySceneView(false);
      return;
    }

    sceneNavigationEnabled = shouldEnable;
    cabinetPage.classList.toggle('is-scene-interactive', shouldEnable);
    sceneControls.hidden = !shouldEnable;
    cabinetStage.tabIndex = shouldEnable ? 0 : -1;
    exploreHint.textContent = shouldEnable ? copy.scene.touchHint : copy.scene.defaultHint;
    activeScenePointers.clear();
    dragStart = null;
    pinchStart = null;
    sceneGestureMoved = false;
    cabinetPage.classList.remove('is-scene-dragging');
    resetSceneView(false);
  }

  function transformPhotoPoint(x, y) {
    const denominator = PHOTO_TO_SCENE[2][0] * x + PHOTO_TO_SCENE[2][2];
    return [
      (PHOTO_TO_SCENE[0][0] * x + PHOTO_TO_SCENE[0][2]) / denominator,
      (PHOTO_TO_SCENE[1][0] * x + PHOTO_TO_SCENE[1][1] * y + PHOTO_TO_SCENE[1][2]) / denominator
    ];
  }

  function photoBoxToSceneBox(box) {
    const [left, top, width, height] = box;
    const x1 = left * PHOTO_WIDTH / 100;
    const y1 = top * PHOTO_HEIGHT / 100;
    const x2 = (left + width) * PHOTO_WIDTH / 100;
    const y2 = (top + height) * PHOTO_HEIGHT / 100;
    const corners = [
      transformPhotoPoint(x1, y1),
      transformPhotoPoint(x2, y1),
      transformPhotoPoint(x2, y2),
      transformPhotoPoint(x1, y2)
    ];
    const xs = corners.map(point => point[0]);
    const ys = corners.map(point => point[1]);
    const sceneLeft = Math.min(...xs);
    const sceneTop = Math.min(...ys);
    const sceneRight = Math.max(...xs);
    const sceneBottom = Math.max(...ys);
    return [
      sceneLeft / SCENE_WIDTH * 100,
      sceneTop / SCENE_HEIGHT * 100,
      (sceneRight - sceneLeft) / SCENE_WIDTH * 100,
      (sceneBottom - sceneTop) / SCENE_HEIGHT * 100
    ];
  }

  function usesCompactHotspots() {
    return window.innerWidth <= 760 && window.matchMedia('(pointer: coarse)').matches;
  }

  function hidePreview() {
    preview.hidden = true;
  }

  function showPreview(item, trigger) {
    previewTitle.textContent = item.label;
    // Reuse the approved app description already shown in the detail dialog.
    previewDescription.textContent = item.kind === 'app' ? (item.note || '').split('. ')[0] + '.' : '';
    previewDescription.hidden = !previewDescription.textContent;
    preview.hidden = false;

    const triggerRect = trigger.getBoundingClientRect();
    const previewRect = preview.getBoundingClientRect();
    const margin = 10;
    let left = triggerRect.left + (triggerRect.width / 2) - (previewRect.width / 2);
    let top = triggerRect.top - previewRect.height - 10;

    left = Math.max(margin, Math.min(left, window.innerWidth - previewRect.width - margin));
    if (top < margin) top = triggerRect.bottom + 10;
    const overlapsHeader = [...document.querySelectorAll('.cabinet-header a, .cabinet-header button')]
      .some(control => {
        const rect = control.getBoundingClientRect();
        return left < rect.right && left + previewRect.width > rect.left &&
          top < rect.bottom && top + previewRect.height > rect.top;
      });
    if (overlapsHeader) top = triggerRect.bottom + 10;
    top = Math.max(margin, Math.min(top, window.innerHeight - previewRect.height - margin));
    preview.style.left = `${left}px`;
    preview.style.top = `${top}px`;
  }

  function makeFact(term, value) {
    if (!value) return null;
    const row = document.createElement('div');
    const dt = document.createElement('dt');
    const dd = document.createElement('dd');
    dt.textContent = term;
    dd.textContent = value;
    row.append(dt, dd);
    return row;
  }

  function openDetails(item, trigger) {
    lastDialogTrigger = trigger || document.activeElement;
    hidePreview();
    detailKind.textContent = copy.kindLabels[item.kind] || copy.collectionObject;
    detailTitle.textContent = item.label;
    detailFacts.replaceChildren();

    [
      makeFact(copy.factLabels.maker, item.maker),
      makeFact(copy.factLabels.origin, item.origin),
      makeFact(copy.factLabels.cacao, item.cacao)
    ].filter(Boolean).forEach(row => detailFacts.append(row));

    detailFacts.hidden = detailFacts.children.length === 0;
    detailNote.textContent = item.note || '';
    detailNote.hidden = !item.note;

    if (item.link) {
      detailLink.href = item.link;
      detailLink.textContent = item.linkLabel || copy.visitSuppliedLink;
      detailLink.hidden = false;
    } else {
      detailLink.removeAttribute('href');
      detailLink.hidden = true;
    }

    if (!dialog.open) dialog.showModal();
    detailClose.focus();
  }

  function buildHotspots() {
    const fragment = document.createDocumentFragment();
    const compactTopRowIds = new Set([
      'small-wrapper-upper-left',
      'friis-holm-mini-1',
      'friis-holm-mini-2',
      'friis-holm-mini-3',
      'friis-holm-mini-4',
      'small-orange-wrapper',
      'raaka-tanzania-100',
      'small-green-wrapper'
    ]);
    const groupTopRow = usesCompactHotspots();
    compactHotspotMode = groupTopRow;

    function appendHotspot(item, clickAction) {
      const [left, top, width, height] = photoBoxToSceneBox(item.box);
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'hotspot';
      button.dataset.id = item.id;
      button.dataset.shape = item.shape || 'rect';
      button.style.left = `${left + width / 2}%`;
      button.style.top = `${top + height / 2}%`;
      button.style.width = `${width}%`;
      button.style.height = `${height}%`;
      button.setAttribute('aria-label', clickAction ? item.label : `${item.label}. ${copy.openDetails}`);
      button.addEventListener('pointerenter', () => showPreview(item, button));
      button.addEventListener('pointerleave', hidePreview);
      button.addEventListener('focus', () => showPreview(item, button));
      button.addEventListener('blur', hidePreview);
      button.addEventListener('click', clickAction || (() => openDetails(item, button)));
      if (item.kind === 'crochet') {
        const eye = document.querySelector(`[data-eye="${item.id}"]`);
        const updateEye = () => eye?.classList.toggle('is-orbiting',
          button.matches(':hover') || button === document.activeElement);
        ['pointerenter', 'pointerleave', 'focus', 'blur'].forEach(event =>
          button.addEventListener(event, updateEye));
      }
      fragment.append(button);
    }

    objects.forEach(item => {
      if (!groupTopRow || !compactTopRowIds.has(item.id)) appendHotspot(item);
    });
    if (groupTopRow) {
      appendHotspot({
        id: 'top-row-mini-bars',
        label: copy.topRowMiniBars,
        box: [31.84, 16.58, 27.99, 7.03]
      }, openPanel);
    }
    hotspotLayer.replaceChildren(fragment);
  }

  let thumbnailSequence = 0;
  function collectionThumbnail(item, ownPhoto = false) {
    const product = !ownPhoto && item.kind === 'chocolate' && window.CABINET_PRODUCT_IMAGES?.[item.id];
    if (product) {
      const img = document.createElement('img');
      img.className = 'collection-thumbnail collection-product-photo';
      img.src = product.src;
      img.alt = '';
      img.width = 64;
      img.height = 64;
      img.loading = 'lazy';
      img.decoding = 'async';
      img.addEventListener('error', () => {
        // The user approved her own photographs as the list-only fallback.
        img.replaceWith(collectionThumbnail(item, true));
      }, {once: true});
      return img;
    }
    // These are display windows onto the original assets, never edited derivatives.
    const svgNS = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(svgNS, 'svg');
    svg.classList.add('collection-thumbnail');
    svg.setAttribute('aria-hidden', 'true');
    svg.setAttribute('focusable', 'false');
    const image = document.createElementNS(svgNS, 'image');
    if (item.kind === 'crochet') {
      const yellow = item.id === 'yellow-crocheted-eye';
      svg.setAttribute('viewBox', '0 0 160 150');
      image.setAttribute('href', `assets/cabinet-photo-objects-v${yellow ? 76 : 75}.svg#${yellow ? 'yellow' : 'green'}`);
      image.setAttribute('width', '160');
      image.setAttribute('height', '150');
    } else if (item.kind === 'app') {
      svg.setAttribute('viewBox', '0 0 360 360');
      image.setAttribute('href', 'assets/chof-chocolate-sun-v1.png');
      image.setAttribute('width', '360');
      image.setAttribute('height', '360');
    } else {
      // Bounds of the complete approved cutouts, not the larger touch targets.
      const windows = {
        'storm-bille-uganda-chilli': [513,150,94,163], 'small-wrapper-upper-left': [623,160,29,62],
        'friis-holm-mini-1': [661,166,27,48], 'friis-holm-mini-2': [696,158,29,65],
        'friis-holm-mini-3': [732,159,25,49], 'friis-holm-mini-4': [769,158,26,48],
        'small-orange-wrapper': [811,153,29,62], 'raaka-tanzania-100': [854,162,68,34],
        'small-green-wrapper': [939,154,32,61], 'omnom-craft-madagascar-66': [983,146,172,78],
        'amedei-porcelana-70': [1166,150,95,168], 'pink-sea-salt-wrapper': [610,229,64,97],
        'pink-madagascar-wrapper': [682,235,59,86], 'malmo-craft-madagascar': [745,221,224,263],
        'small-wrapper-middle': [973,243,30,60], 'uganda-horizontal-wrapper': [1019,238,144,61],
        'vigdis-rosenkilde-echarete-80': [411,294,99,171], 'taza-round-package': [525,327,92,92],
        'small-white-wrapper': [706,334,27,51], 'kamm-ecuador-85': [574,334,174,151],
        'wild-schokolade-chimore-65': [1129,326,87,179], 'aroko-tocumare': [1218,332,50,86],
        'tjak-norwegian-brown-cheese': [404,475,122,188], 'luisa-abram-rio-jurua-70': [527,507,132,191],
        'paradai-nakhon-si-thammarat-red-pod': [667,509,155,87], 'aroko-chuao-amazonas-70': [827,497,157,168],
        'black-cherry-70': [995,455,121,141], 'marou-green': [1128,514,66,147],
        'firetree-solomon-islands': [1210,522,87,141], 'chocolate-naive-xocoatl': [985,611,145,177],
        'willies-cacao-pistachio-date': [1154,678,110,112], 'paradai-chanthaburi-yellow': [361,756,187,129],
        'date-cashew-vegan': [645,734,142,63], 'bonnat-java': [808,697,180,93],
        'sfoodies-sticker': [578,718,58,55]
      };
      const [left, top, width, height] = photoBoxToSceneBox(item.box);
      const [x,y,w,h] = windows[item.id] || [left*SCENE_WIDTH/100,top*SCENE_HEIGHT/100,width*SCENE_WIDTH/100,height*SCENE_HEIGHT/100];
      const padding = 3;
      svg.setAttribute('viewBox', `${x - padding} ${y - padding} ${w + padding * 2} ${h + padding * 2}`);
      // Clip the thumbnail's letterboxing, not the photographed object's outline.
      const defs = document.createElementNS(svgNS, 'defs');
      const clip = document.createElementNS(svgNS, 'clipPath');
      const rect = document.createElementNS(svgNS, 'rect');
      clip.id = `thumbnail-window-${item.id}-${++thumbnailSequence}`;
      rect.setAttribute('x', String(x - padding));
      rect.setAttribute('y', String(y - padding));
      rect.setAttribute('width', String(w + padding * 2));
      rect.setAttribute('height', String(h + padding * 2));
      if (item.id === 'kamm-ecuador-85') {
        // A padded triangle keeps the complete wrapper but excludes the nearby
        // Taza and Friis-Holm cutouts from this list-only display window.
        const outline = document.createElementNS(svgNS, 'path');
        outline.setAttribute('d', 'M661 331L752 488H570Z');
        clip.append(outline);
      } else if (item.id === 'taza-round-package') {
        const outline = document.createElementNS(svgNS, 'ellipse');
        outline.setAttribute('cx', '571');
        outline.setAttribute('cy', '373');
        outline.setAttribute('rx', '48');
        outline.setAttribute('ry', '48');
        clip.append(outline);
      } else {
        clip.append(rect);
      }
      defs.append(clip);svg.append(defs);
      image.setAttribute('clip-path', `url(#${clip.id})`);
      image.setAttribute('href', 'assets/cabinet-photo-objects-v75.svg');
      image.setAttribute('width', String(SCENE_WIDTH));
      image.setAttribute('height', String(SCENE_HEIGHT));
    }
    svg.append(image);
    return svg;
  }

  function buildCollectionGroup(title, items, thumbnails = true) {
    const section = document.createElement('section');
    section.className = 'collection-group';
    const heading = document.createElement('h3');
    heading.textContent = `${title} (${items.length})`;
    const list = document.createElement('div');
    list.className = 'collection-list-items';
    items.forEach(item => {
      const button = document.createElement('button');
      const name = document.createElement('strong');
      button.type = 'button';
      button.className = 'collection-item';
      name.textContent = item.label;
      const thumbnail = thumbnails ? collectionThumbnail(item) : null;
      if (thumbnail) {
        button.classList.add('has-thumbnail');
        button.append(thumbnail);
      }
      button.append(name);
      button.addEventListener('click', () => openDetails(item, button));
      list.append(button);
    });
    section.append(heading, list);
    return section;
  }

  function buildCollectionIndex() {
    const chocolates = objects.filter(item => item.kind === 'chocolate');
    const crochet = objects.filter(item => item.kind === 'crochet');
    const ephemera = objects.filter(item => item.kind === 'ephemera');
    collectionList.replaceChildren(
      buildCollectionGroup(copy.collectionGroups.chocolates, chocolates),
      buildCollectionGroup(copy.collectionGroups.crochet, crochet),
      buildCollectionGroup(copy.collectionGroups.ephemera, ephemera)
    );
    portraitList.replaceChildren(
      buildCollectionGroup(copy.collectionGroups.chocolates, chocolates, true),
      buildCollectionGroup(copy.collectionGroups.crochet, crochet, true),
      buildCollectionGroup(copy.collectionGroups.ephemera, ephemera, true)
    );
    if (chofItem) portraitList.append(buildCollectionGroup(copy.kindLabels.app, [chofItem], true));
    for (const list of [collectionList, portraitList]) {
      const sources = [
        ['© Zotter Chocolate', 'https://www.zotter.at/en/about-zotter/press-downloads/logo-photos'],
        ['© Friis-Holm Chokolade', 'https://friisholmchokolade.dk/']
      ];
      for (const [label, href] of sources) {
        const credit = document.createElement('a');
        credit.className = 'collection-photo-credit';
        credit.href = href;
        credit.textContent = label;
        list.append(credit);
      }
    }
  }

  function openPanel() {
    lastPanelTrigger = document.activeElement;
    if (!panel.open) panel.showModal();
    panelToggle.setAttribute('aria-expanded', 'true');
    panelClose.focus();
  }

  function closePanel() {
    if (panel.open) panel.close();
  }

  function scenePointerDown(event) {
    if (!sceneNavigationEnabled || event.button !== 0) return;
    if (event.target instanceof Element && event.target.closest('.scene-controls')) return;

    activeScenePointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
    if (activeScenePointers.size === 1) {
      dragStart = {
        pointerId: event.pointerId,
        x: event.clientX,
        y: event.clientY,
        panX: sceneView.panX,
        panY: sceneView.panY
      };
      pinchStart = null;
    } else if (activeScenePointers.size === 2) {
      beginPinch();
      markSceneGestureMoved();
      event.preventDefault();
    }
  }

  function scenePointerMove(event) {
    if (!sceneNavigationEnabled || !activeScenePointers.has(event.pointerId)) return;
    activeScenePointers.set(event.pointerId, { x: event.clientX, y: event.clientY });

    if (activeScenePointers.size >= 2) {
      if (!pinchStart) beginPinch();
      const pair = pointerPair();
      const first = pair[0][1];
      const second = pair[1][1];
      const midpointX = (first.x + second.x) / 2;
      const midpointY = (first.y + second.y) / 2;
      const distance = Math.max(1, Math.hypot(second.x - first.x, second.y - first.y));
      const size = sceneBaseSize();
      const offset = sceneDefaultOffset(size);
      const viewport = sceneViewport();
      const scale = clamp(
        pinchStart.scale * distance / pinchStart.distance,
        minimumSceneScale(size),
        MAX_SCENE_SCALE
      );

      markSceneGestureMoved();
      sceneView.scale = scale;
      sceneView.panX = midpointX - viewport.x - offset.x - pinchStart.anchorX * scale;
      sceneView.panY = midpointY - viewport.y - offset.y - pinchStart.anchorY * scale;
      applySceneView(false);
      event.preventDefault();
      return;
    }

    if (!dragStart || dragStart.pointerId !== event.pointerId) return;
    const deltaX = event.clientX - dragStart.x;
    const deltaY = event.clientY - dragStart.y;
    if (!sceneGestureMoved && Math.hypot(deltaX, deltaY) < SCENE_DRAG_THRESHOLD) return;

    markSceneGestureMoved();
    sceneView.panX = dragStart.panX + deltaX;
    sceneView.panY = dragStart.panY + deltaY;
    applySceneView(false);
    event.preventDefault();
  }

  function finishScenePointer(event) {
    if (!activeScenePointers.has(event.pointerId)) return;
    activeScenePointers.delete(event.pointerId);
    if (cabinetStage.hasPointerCapture(event.pointerId)) {
      try {
        cabinetStage.releasePointerCapture(event.pointerId);
      } catch (error) {
        /* The browser may release capture before pointercancel is delivered. */
      }
    }

    if (sceneGestureMoved) suppressSceneClickUntil = window.performance.now() + 450;
    if (activeScenePointers.size >= 2) {
      beginPinch();
      return;
    }

    pinchStart = null;
    if (activeScenePointers.size === 1) {
      const remaining = activeScenePointers.entries().next().value;
      dragStart = {
        pointerId: remaining[0],
        x: remaining[1].x,
        y: remaining[1].y,
        panX: sceneView.panX,
        panY: sceneView.panY
      };
      return;
    }

    dragStart = null;
    sceneGestureMoved = false;
    cabinetPage.classList.remove('is-scene-dragging');
  }

  function sceneKeyDown(event) {
    if (!sceneNavigationEnabled || event.target !== cabinetStage) return;
    const panStep = event.shiftKey ? 80 : 40;
    let handled = true;

    switch (event.key) {
      case 'ArrowLeft':
        sceneView.panX += panStep;
        applySceneView(false);
        break;
      case 'ArrowRight':
        sceneView.panX -= panStep;
        applySceneView(false);
        break;
      case 'ArrowUp':
        sceneView.panY += panStep;
        applySceneView(false);
        break;
      case 'ArrowDown':
        sceneView.panY -= panStep;
        applySceneView(false);
        break;
      case '+':
      case '=':
        setSceneScale(sceneView.scale + SCENE_SCALE_STEP);
        break;
      case '-':
      case '_':
        setSceneScale(sceneView.scale - SCENE_SCALE_STEP);
        break;
      case '0':
      case 'Home':
        resetSceneView();
        break;
      default:
        handled = false;
    }

    if (handled) event.preventDefault();
  }

  sceneControls.setAttribute('aria-label', copy.scene.controls);
  zoomOutButton.setAttribute('aria-label', copy.scene.zoomOut);
  resetViewButton.setAttribute('aria-label', copy.scene.resetView);
  zoomInButton.setAttribute('aria-label', copy.scene.zoomIn);
  zoomOutButton.addEventListener('click', () => setSceneScale(sceneView.scale - SCENE_SCALE_STEP));
  resetViewButton.addEventListener('click', () => resetSceneView());
  zoomInButton.addEventListener('click', () => setSceneScale(sceneView.scale + SCENE_SCALE_STEP));
  cabinetStage.addEventListener('pointerdown', scenePointerDown);
  cabinetStage.addEventListener('pointermove', scenePointerMove);
  cabinetStage.addEventListener('pointerup', finishScenePointer);
  cabinetStage.addEventListener('pointercancel', finishScenePointer);
  cabinetStage.addEventListener('keydown', sceneKeyDown);
  boardShell.addEventListener('click', event => {
    if (window.performance.now() < suppressSceneClickUntil) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  }, true);

  if (chofButton && chofItem) {
    chofButton.setAttribute('aria-label', `${chofItem.label}. ${copy.openDetails}`);
    chofButton.addEventListener('pointerenter', () => showPreview(chofItem, chofButton));
    chofButton.addEventListener('pointerleave', hidePreview);
    chofButton.addEventListener('focus', () => showPreview(chofItem, chofButton));
    chofButton.addEventListener('blur', hidePreview);
    chofButton.addEventListener('click', () => openDetails(chofItem, chofButton));
  }

  panelToggle.addEventListener('click', () => {
    if (portraitQuery.matches) {
      const wasExploring = portraitExploring;
      portraitExploring = false;
      configureSceneNavigation();
      if (wasExploring) portraitCabinetToggle.focus();
      else document.getElementById('portrait-collection-heading').scrollIntoView({ block: 'start' });
      return;
    }
    if (!panel.open) openPanel();
    else closePanel();
  });
  portraitCabinetToggle.addEventListener('click', () => {
    portraitExploring = true;
    window.scrollTo(0, 0);
    configureSceneNavigation();
    cabinetStage.focus({ preventScroll: true });
  });
  panelClose.addEventListener('click', closePanel);
  panel.addEventListener('close', () => {
    panelToggle.setAttribute('aria-expanded', 'false');
    if (lastPanelTrigger instanceof HTMLElement) lastPanelTrigger.focus();
  });
  panel.addEventListener('click', event => {
    if (event.target === panel) closePanel();
  });
  detailClose.addEventListener('click', () => dialog.close());
  dialog.addEventListener('cancel', () => hidePreview());
  dialog.addEventListener('close', () => {
    if (lastDialogTrigger instanceof HTMLElement) lastDialogTrigger.focus();
  });
  dialog.addEventListener('click', event => {
    if (event.target === dialog) dialog.close();
  });
  window.addEventListener('resize', () => {
    hidePreview();
    const nextCompactMode = usesCompactHotspots();
    if (nextCompactMode !== compactHotspotMode) buildHotspots();
    configureSceneNavigation();
    if (sceneNavigationEnabled) applySceneView(false);
  });
  if (typeof sceneNavigationQuery.addEventListener === 'function') {
    sceneNavigationQuery.addEventListener('change', configureSceneNavigation);
  } else {
    sceneNavigationQuery.addListener(configureSceneNavigation);
  }
  portraitQuery.addEventListener('change', configureSceneNavigation);
  boardShell.addEventListener('pointerleave', hidePreview);

  buildHotspots();
  buildCollectionIndex();
  configureSceneNavigation();
}());
