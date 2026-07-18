(function () {
  'use strict';

  const objects = Array.isArray(window.CABINET_OBJECTS) ? window.CABINET_OBJECTS : [];
  const copy = window.CABINET_I18N;
  const cabinetPage = document.querySelector('.cabinet-page');
  const cabinetStage = document.getElementById('cabinet-stage');
  const sceneSpace = document.getElementById('scene-space');
  const hotspotLayer = document.getElementById('hotspot-layer');
  const boardShell = document.getElementById('board-shell');
  const exploreHint = document.getElementById('explore-hint');
  const sceneControls = document.getElementById('scene-controls');
  const zoomOutButton = document.getElementById('scene-zoom-out');
  const resetViewButton = document.getElementById('scene-reset');
  const zoomInButton = document.getElementById('scene-zoom-in');
  const sceneViewStatus = document.getElementById('scene-view-status');
  const preview = document.getElementById('object-preview');
  const previewTitle = document.getElementById('preview-title');
  const panel = document.getElementById('collection-panel');
  const panelToggle = document.getElementById('collection-toggle');
  const panelClose = document.getElementById('collection-close');
  const collectionList = document.getElementById('collection-list');
  const wheelToggle = document.getElementById('wheel-toggle');
  const wheelDialog = document.getElementById('wheel-dialog');
  const wheelClose = document.getElementById('wheel-close');
  const wheelSpin = document.getElementById('wheel-spin');
  const wheelVisual = wheelSpin;
  const flavourWheel = document.getElementById('flavour-wheel');
  const wheelStatus = document.getElementById('wheel-status');
  const dialog = document.getElementById('detail-dialog');
  const detailClose = document.getElementById('detail-close');
  const detailKind = document.getElementById('detail-kind');
  const detailTitle = document.getElementById('detail-title');
  const detailFacts = document.getElementById('detail-facts');
  const detailNote = document.getElementById('detail-note');
  const detailLink = document.getElementById('detail-link');
  let lastDialogTrigger = null;
  let lastPanelTrigger = null;
  let lastWheelTrigger = null;
  let wheelRotation = 0;
  let wheelTimer = null;
  let compactHotspotMode = null;
  let sceneNavigationEnabled = false;
  let dragStart = null;
  let pinchStart = null;
  let sceneGestureMoved = false;
  let suppressSceneClickUntil = 0;

  const sceneNavigationQuery = window.matchMedia('(pointer: coarse) and (orientation: landscape) and (max-width: 980px)');
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
    return Math.max(.4, Math.min(1, window.innerWidth / size.width, window.innerHeight / size.height));
  }

  function clampSceneView() {
    const size = sceneBaseSize();
    const offset = sceneDefaultOffset(size);
    const maximumX = Math.max(0, (size.width * sceneView.scale - window.innerWidth) / 2);
    const maximumY = Math.max(0, (size.height * sceneView.scale - window.innerHeight) / 2);
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

  function setSceneScale(nextScale, centerX = window.innerWidth / 2, centerY = window.innerHeight / 2, announce = true) {
    const size = sceneBaseSize();
    const offset = sceneDefaultOffset(size);
    const oldScale = sceneView.scale;
    const minimum = minimumSceneScale(size);
    const scale = clamp(nextScale, minimum, MAX_SCENE_SCALE);
    if (Math.abs(scale - oldScale) < .0001) return;

    const anchorX = (centerX - window.innerWidth / 2 - offset.x - sceneView.panX) / oldScale;
    const anchorY = (centerY - window.innerHeight / 2 - offset.y - sceneView.panY) / oldScale;
    sceneView.scale = scale;
    sceneView.panX = centerX - window.innerWidth / 2 - offset.x - anchorX * scale;
    sceneView.panY = centerY - window.innerHeight / 2 - offset.y - anchorY * scale;
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
    pinchStart = {
      distance: Math.max(1, distance),
      scale: sceneView.scale,
      anchorX: (midpointX - window.innerWidth / 2 - offset.x - sceneView.panX) / sceneView.scale,
      anchorY: (midpointY - window.innerHeight / 2 - offset.y - sceneView.panY) / sceneView.scale
    };
  }

  function configureSceneNavigation() {
    const shouldEnable = sceneNavigationQuery.matches;
    if (shouldEnable === sceneNavigationEnabled) {
      if (shouldEnable) applySceneView(false);
      return;
    }

    sceneNavigationEnabled = shouldEnable;
    cabinetPage.classList.toggle('is-scene-interactive', shouldEnable);
    sceneControls.hidden = !shouldEnable;
    cabinetStage.tabIndex = shouldEnable ? 0 : -1;
    exploreHint.textContent = shouldEnable ? copy.scene.touchHint : 'Select a gold marker, or browse the collection by name.';
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
    preview.hidden = false;

    const triggerRect = trigger.getBoundingClientRect();
    const previewRect = preview.getBoundingClientRect();
    const margin = 10;
    let left = triggerRect.left + (triggerRect.width / 2) - (previewRect.width / 2);
    let top = triggerRect.top - previewRect.height - 10;

    left = Math.max(margin, Math.min(left, window.innerWidth - previewRect.width - margin));
    if (top < margin) top = triggerRect.bottom + 10;
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

  function buildCollectionGroup(title, items) {
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

  function clearWheelTimer() {
    if (wheelTimer !== null) {
      window.clearTimeout(wheelTimer);
      wheelTimer = null;
    }
    wheelVisual.removeAttribute('aria-busy');
  }

  function openWheel() {
    lastWheelTrigger = document.activeElement;
    if (!wheelDialog.open) wheelDialog.showModal();
    wheelSpin.focus();
  }

  function closeWheel() {
    if (wheelDialog.open) wheelDialog.close();
  }

  function spinWheel() {
    clearWheelTimer();

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const randomOffset = 30 + Math.round(Math.random() * 300);
    const fullTurns = prefersReducedMotion ? 0 : 720 + Math.round(Math.random() * 720);
    wheelRotation += fullTurns + randomOffset;

    flavourWheel.classList.toggle('is-reduced-motion', prefersReducedMotion);
    wheelVisual.setAttribute('aria-busy', 'true');
    wheelStatus.textContent = prefersReducedMotion ? copy.wheel.moved : copy.wheel.spinning;
    flavourWheel.style.transform = `rotate(${wheelRotation}deg)`;

    const delay = prefersReducedMotion ? 50 : 1850;
    wheelTimer = window.setTimeout(() => {
      wheelVisual.removeAttribute('aria-busy');
      wheelStatus.textContent = copy.wheel.stopped;
      wheelTimer = null;
    }, delay);
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
      const scale = clamp(
        pinchStart.scale * distance / pinchStart.distance,
        minimumSceneScale(size),
        MAX_SCENE_SCALE
      );

      markSceneGestureMoved();
      sceneView.scale = scale;
      sceneView.panX = midpointX - window.innerWidth / 2 - offset.x - pinchStart.anchorX * scale;
      sceneView.panY = midpointY - window.innerHeight / 2 - offset.y - pinchStart.anchorY * scale;
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
  hotspotLayer.addEventListener('click', event => {
    if (window.performance.now() < suppressSceneClickUntil) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  }, true);

  panelToggle.addEventListener('click', () => {
    if (!panel.open) openPanel();
    else closePanel();
  });
  panelClose.addEventListener('click', closePanel);
  panel.addEventListener('close', () => {
    panelToggle.setAttribute('aria-expanded', 'false');
    if (lastPanelTrigger instanceof HTMLElement) lastPanelTrigger.focus();
  });
  panel.addEventListener('click', event => {
    if (event.target === panel) closePanel();
  });
  wheelToggle.addEventListener('click', openWheel);
  wheelClose.addEventListener('click', closeWheel);
  wheelSpin.addEventListener('click', spinWheel);
  wheelDialog.addEventListener('cancel', event => {
    event.preventDefault();
    clearWheelTimer();
    closeWheel();
  });
  wheelDialog.addEventListener('close', () => {
    clearWheelTimer();
    if (lastWheelTrigger instanceof HTMLElement) lastWheelTrigger.focus();
  });
  wheelDialog.addEventListener('click', event => {
    if (event.target === wheelDialog) closeWheel();
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
  boardShell.addEventListener('pointerleave', hidePreview);

  buildHotspots();
  buildCollectionIndex();
  configureSceneNavigation();
}());
