const NS = 'http://www.w3.org/2000/svg';
const clamp = n => Math.max(0, Math.min(1, n));
const ease = n => { n = clamp(n); return n * n * (3 - 2 * n); };
export function nibFeedingFrame(ms) {
  return { reach: ease(ms / 650), eaten: ms >= 650, done: ms >= 1400 };
}

export function createBaliNibs(habitat) {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  let run = null, raf = 0;
  const handles = piece => piece?.dataset.accessoryFamily === 'ju1873-cacao-specimen-lantern' && piece.dataset.wormPart === 'companion';
  const visible = n => n?.isConnected && !n.closest('[hidden]');
  const nibs = piece => [...piece.querySelectorAll('[data-cacao-nib]')];
  function cancel() {
    cancelAnimationFrame(raf); raf = 0;
    if (!run) return;
    run.layer?.remove();
    if (!run.source.dataset.consumed) {
      if (run.opacity === null) run.source.removeAttribute('opacity');
      else run.source.setAttribute('opacity', run.opacity);
    }
    delete run.piece.dataset.cacaoFeeding;
    run = null;
  }
  function reset(piece) {
    if (!handles(piece)) return;
    cancel();
    nibs(piece).forEach(n => { delete n.dataset.consumed; n.removeAttribute('opacity'); });
  }
  function start(piece) {
    if (!handles(piece) || !visible(piece)) return false;
    cancel();
    const root = habitat.querySelector('#worm-species');
    const smile = habitat.querySelector('#companion-worm .worm-smile');
    const source = nibs(piece).find(n => !n.dataset.consumed);
    // An empty packet refills on the next activation, or immediately with Home.
    if (!source) { reset(piece); return true; }
    if (!root || !smile) return false;
    if (reduced.matches) {
      source.dataset.consumed = 'true'; source.setAttribute('opacity', '0'); return true;
    }
    const inverse = root.getScreenCTM().inverse();
    const matrix = inverse.multiply(source.getScreenCTM());
    const origin = new DOMPoint(0, 0).matrixTransform(matrix);
    const layer = document.createElementNS(NS, 'g');
    layer.setAttribute('data-cacao-nib-flight', '');
    layer.setAttribute('aria-hidden', 'true'); layer.setAttribute('pointer-events', 'none');
    const copy = source.cloneNode(true);
    copy.removeAttribute('transform'); copy.removeAttribute('opacity');
    copy.removeAttribute('data-cacao-nib');
    layer.append(copy); root.append(layer);
    const active = {piece, source, layer, opacity: source.getAttribute('opacity')};
    run = active; source.setAttribute('opacity', '0'); piece.dataset.cacaoFeeding = 'true';
    const began = performance.now();
    function tick(now) {
      if (run !== active) return;
      if (!visible(piece) || !visible(smile)) { cancel(); return; }
      const f = nibFeedingFrame(now - began);
      const target = new DOMPoint(331, 77).matrixTransform(smile.getScreenCTM()).matrixTransform(root.getScreenCTM().inverse());
      const dx = (target.x - origin.x) * f.reach;
      const dy = (target.y - origin.y) * f.reach - 14 * Math.sin(f.reach * Math.PI);
      layer.setAttribute('transform', `translate(${dx} ${dy}) matrix(${matrix.a} ${matrix.b} ${matrix.c} ${matrix.d} ${matrix.e} ${matrix.f})`);
      if (f.eaten) { source.dataset.consumed = 'true'; layer.setAttribute('opacity', '0'); }
      if (f.done) { cancel(); return; }
      raf = requestAnimationFrame(tick);
    }
    tick(began); return true;
  }
  function drop(piece) {
    if (!handles(piece) || !visible(piece)) return false;
    const bag = piece.querySelector('[data-cacao-package]');
    const smile = habitat.querySelector('#companion-worm .worm-smile');
    if (!bag || !smile) return false;
    const mouth = new DOMPoint(331, 77).matrixTransform(smile.getScreenCTM()).matrixTransform(bag.getScreenCTM().inverse());
    return Math.hypot(mouth.x + 10, mouth.y + 40) < 35 && start(piece);
  }
  return {handles, start, drop, cancel, clear: cancel, reset};
}
