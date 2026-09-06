import { createBaliNibs } from './bali-nibs.js?v=20260906-nibs-1';
const NS = 'http://www.w3.org/2000/svg';
export const CACAO_FAMILY = 'ju1873-cacao-specimen-lantern';
const clamp = n => Math.max(0, Math.min(1, n));
const ease = n => { n = clamp(n); return n * n * (3 - 2 * n); };
const mix = (a, b, t) => a + (b - a) * t;

// All target coordinates refer to the original 600 x 430 painting, not the viewport.
export function cacaoCutFrame(ms) {
  return { approach: ease(ms / 520), strike: clamp((ms - 640) / 150) ** 2,
    recoil: ease((ms - 825) / 150), reveal: ease((ms - 840) / 520),
    retreat: ease((ms - 1500) / 650), done: ms >= 2150 };
}
export function cacaoBladePose(ms, start, grip, angle) {
  const f = cacaoCutFrame(ms);
  const x = mix(start.x, grip.x - 10 * f.recoil, f.approach);
  const y = mix(start.y, grip.y - 7 * f.recoil, f.approach);
  // Slow wind-up, brief anticipation, accelerating chop, impact hold and recoil.
  const tilt = mix(angle, -70, f.approach) + 92 * f.strike - 28 * f.recoil;
  return { x: mix(x, start.x, f.retreat), y: mix(y, start.y, f.retreat),
    tilt: mix(tilt, angle, f.retreat) };
}
export function withinCacaoPod(x, y) {
  return ((x - 541) / 29) ** 2 + ((y - 157) / 50) ** 2 <= 1;
}

export function createBaliCacao(habitat) {
  const nibs = createBaliNibs(habitat);
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const backing = new URL('./assets/sanda-hanging-pod-backing.png', import.meta.url).href;
  const halves = new URL('./assets/sanda-hanging-pod-halves.png', import.meta.url).href;
  let run = null, raf = 0, request = 0, decoded = null, opened = null, parts = [];
  const make = (tag, attrs = {}) => {
    const n = document.createElementNS(NS, tag);
    Object.entries(attrs).forEach(([key, value]) => n.setAttribute(key, value)); return n;
  };
  const background = () => habitat.querySelector('.sanda-ju1873-painted-background');
  const handles = piece => piece?.dataset.accessoryFamily === CACAO_FAMILY && piece.dataset.wormPart === 'primary';
  const visible = n => n?.isConnected && !n.closest('[hidden]');
  function cancel() {
    nibs.cancel();
    request++; cancelAnimationFrame(raf); raf = 0;
    if (!run) return;
    run.layer.remove();
    if (run.opacity === null) run.source.removeAttribute('opacity');
    else run.source.setAttribute('opacity', run.opacity);
    pose(Number(run.previous));
    delete run.piece.dataset.cacaoCutting; run = null;
  }
  function clear() {
    cancel(); opened?.remove(); opened = null; parts = [];
  }
  function reset(piece) { if (handles(piece)) clear(); else nibs.reset(piece); }
  function load() {
    if (!decoded) {
      decoded = Promise.all([backing, halves].map(asset => {
        const image = new Image(); image.src = asset; return image.decode();
      })).catch(error => { decoded = null; throw error; });
    }
    return decoded;
  }
  function mount(bg) {
    if (opened?.isConnected) return;
    const layer = make('g', { 'data-cacao-pod-layer': '', 'data-cacao-opened': '0', 'aria-hidden': 'true', 'pointer-events': 'none', opacity: 0 });
    const defs = make('defs');
    const outline = 'M534 109C521 105 514 119 512 137C509 160 520 185 536 201L550 207C567 191 573 166 569 143C565 126 553 108 541 110Z';
    const clip = (id, child) => { const n = make('clipPath', { id, clipPathUnits: 'userSpaceOnUse' }); n.append(child); defs.append(n); };
    clip('bali-pod-footprint', make('path', { d: outline }));
    clip('bali-pod-shell-left', make('path', { d: 'M534 109C521 105 514 119 512 137C509 160 520 185 536 201L550 207L542 152Z' }));
    clip('bali-pod-shell-right', make('path', { d: 'M534 109L542 152L550 207C567 191 573 166 569 143C565 126 553 108 541 110Z' }));
    clip('bali-pod-sprite-left', make('rect', { x: 0, y: 0, width: 640, height: 1280 }));
    clip('bali-pod-sprite-right', make('rect', { x: 640, y: 0, width: 640, height: 1280 }));
    layer.append(defs, make('image', { href: backing, width: 600, height: 430, preserveAspectRatio: 'none', 'clip-path': 'url(#bali-pod-footprint)' }));
    parts = ['left', 'right'].map((side, i) => {
      const hinge = make('g', { 'data-cacao-half': side });
      const face = make('g');
      // Separate, transparent seed-filled and empty-rind images. No rescaled clone.
      const sprite = make('g', { transform: `scale(.081) translate(-${i ? 900 : 365} -38)` });
      sprite.append(make('image', { href: halves, width: 1280, height: 1280, 'clip-path': `url(#bali-pod-sprite-${side})` }));
      face.append(sprite);
      const shell = make('image', { href: bg.getAttribute('href'), width: 600, height: 430, preserveAspectRatio: 'none', 'clip-path': `url(#bali-pod-shell-${side})`, transform: 'translate(-536 -110)' });
      hinge.append(face, shell); layer.append(hinge); return { hinge, face, shell };
    });
    opened = layer; bg.parentNode.append(layer); pose(0);
  }
  function pose(amount, settling = 0, jolt = 0) {
    if (!opened) return;
    opened.setAttribute('opacity', amount > 0 || jolt !== 0 ? '1' : '0');
    opened.dataset.cacaoOpened = String(amount);
    parts.forEach(({hinge, face, shell}, i) => {
      const turn = (i ? -22 : 17) * amount + settling * (i ? -.65 : 1) + jolt;
      hinge.setAttribute('transform', `translate(536 110) rotate(${turn})`);
      face.setAttribute('transform', `scale(${Math.sin(amount * Math.PI / 2)} 1)`);
      shell.setAttribute('opacity', Math.cos(amount * Math.PI / 2));
    });
  }
  function animate(piece, bg, token) {
    if (token !== request || !visible(piece) || !visible(bg)) return;
    const root = habitat.querySelector('#worm-species');
    const source = piece.querySelector('.location-accessory-art');
    if (!root || !source) return;
    mount(bg);
    if (reduced.matches) { pose(1); return; }
    const inverse = root.getScreenCTM().inverse();
    const matrix = inverse.multiply(source.getScreenCTM());
    const start = new DOMPoint(-94, 11).matrixTransform(matrix);
    const map = (x, y) => new DOMPoint(x, y).matrixTransform(bg.getScreenCTM()).matrixTransform(inverse);
    const angle = Math.atan2(matrix.b, matrix.a) * 180 / Math.PI;
    const scale = Math.hypot(matrix.a, matrix.b);
    const hit = map(530, 151), radians = 22 * Math.PI / 180;
    // Align the cutting edge (42,14), not the handle, to the near side of the pod.
    const grip = { x: hit.x - scale * (136 * Math.cos(radians) - 3 * Math.sin(radians)),
      y: hit.y - scale * (136 * Math.sin(radians) + 3 * Math.cos(radians)) };
    const layer = make('g', { 'data-cacao-machete-flight': '', 'aria-hidden': 'true', 'pointer-events': 'none' });
    const copy = source.cloneNode(true); copy.removeAttribute('transform'); copy.removeAttribute('opacity');
    layer.append(copy); root.append(layer);
    const active = { piece, source, layer, opacity: source.getAttribute('opacity'), previous: opened.dataset.cacaoOpened };
    run = active; source.setAttribute('opacity', '0'); pose(0);
    piece.dataset.cacaoCutting = 'true';
    const began = performance.now();
    function tick(now) {
      if (run !== active) return;
      if (!visible(piece) || !visible(bg)) { cancel(); return; }
      const elapsed = now - began;
      const f = cacaoCutFrame(elapsed);
      const { x, y, tilt } = cacaoBladePose(elapsed, start, grip, angle);
      layer.setAttribute('transform', `translate(${x} ${y}) rotate(${tilt}) scale(${scale}) translate(94 -11)`);
      const afterHit = Math.max(0, elapsed - 790), settle = Math.max(0, elapsed - 1360);
      const jolt = afterHit > 0 ? Math.sin(afterHit / 36) * 2.2 * Math.exp(-afterHit / 115) : 0;
      pose(f.reveal, settle > 0 ? Math.sin(settle / 150) * 1.6 * Math.exp(-settle / 300) : 0, jolt);
      if (f.done) { active.previous = '1'; cancel(); return; }
      raf = requestAnimationFrame(tick);
    }
    tick(began);
  }
  function start(piece) {
    if (nibs.handles(piece)) { cancel(); return nibs.start(piece); }
    const bg = background();
    if (!handles(piece) || !visible(piece) || !visible(bg)) return false;
    cancel(); const token = request;
    load().then(() => animate(piece, bg, token)).catch(() => { /* Original scene remains usable if the optional image fails. */ });
    return true;
  }
  function drop(piece) {
    if (nibs.handles(piece)) return nibs.drop(piece);
    if (!handles(piece) || !visible(piece)) return false;
    const bg = background(), source = piece.querySelector('.location-accessory-art');
    if (!bg || !source) return false;
    const pt = new DOMPoint(30, 8).matrixTransform(source.getScreenCTM()).matrixTransform(bg.getScreenCTM().inverse());
    return withinCacaoPod(pt.x, pt.y) && start(piece);
  }
  document.addEventListener('visibilitychange', () => { if (document.hidden) cancel(); });
  window.addEventListener('pagehide', cancel);
  window.addEventListener('resize', cancel);
  reduced.addEventListener('change', cancel);
  return { handles: piece => handles(piece) || nibs.handles(piece), start, drop, cancel, clear, reset };
}
