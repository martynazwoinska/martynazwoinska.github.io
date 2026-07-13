(function () {
  'use strict';

  const objects = Array.isArray(window.CABINET_OBJECTS) ? window.CABINET_OBJECTS : [];
  const hotspotLayer = document.getElementById('hotspot-layer');
  const boardShell = document.getElementById('board-shell');
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

  const kindLabels = {
    chocolate: 'Chocolate package',
    crochet: 'Crocheted object',
    ephemera: 'Collected ephemera'
  };

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
    detailKind.textContent = kindLabels[item.kind] || 'Collection object';
    detailTitle.textContent = item.label;
    detailFacts.replaceChildren();

    [
      makeFact('Maker', item.maker),
      makeFact('Origin', item.origin),
      makeFact('Cacao', item.cacao)
    ].filter(Boolean).forEach(row => detailFacts.append(row));

    detailFacts.hidden = detailFacts.children.length === 0;
    detailNote.textContent = item.note || '';
    detailNote.hidden = !item.note;

    if (item.link) {
      detailLink.href = item.link;
      detailLink.textContent = item.linkLabel || 'Visit supplied link';
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
    const groupTopRow = window.innerWidth <= 760;
    compactHotspotMode = groupTopRow;

    function appendHotspot(item, clickAction) {
      const [left, top, width, height] = item.box;
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'hotspot';
      button.dataset.id = item.id;
      button.dataset.shape = item.shape || 'rect';
      button.style.left = `${left + width / 2}%`;
      button.style.top = `${top + height / 2}%`;
      button.style.width = `${width}%`;
      button.style.height = `${height}%`;
      button.setAttribute('aria-label', clickAction ? item.label : `${item.label}. Open details.`);
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
        label: 'Browse the top-row mini bars',
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
      buildCollectionGroup('Chocolate packages', chocolates),
      buildCollectionGroup('Crocheted eyes', crochet),
      buildCollectionGroup('Collected ephemera', ephemera)
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
    wheelStatus.textContent = prefersReducedMotion ? 'Wheel moved.' : 'Wheel is spinning.';
    flavourWheel.style.transform = `rotate(${wheelRotation}deg)`;

    const delay = prefersReducedMotion ? 50 : 1850;
    wheelTimer = window.setTimeout(() => {
      wheelVisual.removeAttribute('aria-busy');
      wheelStatus.textContent = 'Wheel stopped. Explore the descriptor nearest the marker.';
      wheelTimer = null;
    }, delay);
  }

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
    const nextCompactMode = window.innerWidth <= 760 && window.matchMedia('(pointer: coarse)').matches;
    if (nextCompactMode !== compactHotspotMode) buildHotspots();
  });
  boardShell.addEventListener('pointerleave', hidePreview);

  buildHotspots();
  buildCollectionIndex();
}());
