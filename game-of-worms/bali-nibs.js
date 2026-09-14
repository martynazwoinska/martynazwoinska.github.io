import { createChocolateSound, chocolateClips } from './oahu-chocolate-audio.js?v=20260909-gift-3';

const NS = 'http://www.w3.org/2000/svg';
const clamp = n => Math.max(0, Math.min(1, n));
const ease = n => { n = clamp(n); return n * n * (3 - 2 * n); };
const mix = (a, b, q) => a + (b - a) * q;
let nextClip = 0;
// A short recorded crunch followed by chewing, not the pod-opening crack.
export const nibBiteCue = () => ({ at: 850, offset: 6.60, duration: .64, peak: .095 });
export function nibFeedingFrame(ms) {
  const chew = ms > 1030 && ms < 1840
    ? Math.pow(Math.sin((ms - 1030) / 88), 2) * (1 - .55 * ease((ms - 1360) / 480)) : 0;
  return {
    reach: ease(ms / 850),
    bite: .48 * ease((ms - 850) / 170) + .52 * ease((ms - 1120) / 180),
    open: ease((ms - 590) / 230) * (1 - ease((ms - 880) / 180)) + .23 * chew,
    chew,
    face: ease((ms - 580) / 140) * (1 - ease((ms - 1810) / 220)),
    eaten: ms >= 850,
    done: ms >= 2120
  };
}

export function createBaliNibs(habitat, { sound = createChocolateSound({
  cueFor: nibBiteCue, keysFor: () => [chocolateClips.bite]
}) } = {}) {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  let run = null, raf = 0;
  const handles = piece => piece?.dataset.accessoryFamily === 'ju1873-cacao-specimen-lantern' && piece.dataset.wormPart === 'companion';
  const visible = n => n?.isConnected && !n.closest('[hidden]');
  const nibs = piece => [...piece.querySelectorAll('[data-cacao-nib]')];
  function cancel() {
    cancelAnimationFrame(raf); raf = 0;
    sound.stop();
    if (!run) return;
    if (run.smileOpacity === null) run.smile.removeAttribute('opacity');
    else run.smile.setAttribute('opacity', run.smileOpacity);
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
    if (!handles(piece) || !visible(piece) || document.hidden) return false;
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
    const add = (parent, tag, attrs = {}) => {
      const node = document.createElementNS(NS, tag);
      for (const [key, value] of Object.entries(attrs)) node.setAttribute(key, value);
      parent.append(node); return node;
    };
    // A short reaching arm makes the nib a held bite instead of floating food.
    const arm = add(layer, 'g', { opacity: '0' });
    const forearm = add(arm, 'path', { fill: 'var(--worm-color)', stroke: '#625b80',
      'stroke-width': '.8', 'stroke-linejoin': 'round' });
    const hand = add(arm, 'g');
    add(hand, 'path', { d: 'M-4 2Q-6-1-4-3L-1-4Q2-5 4-2L4 2Q1 5-2 4Z',
      fill: '#fff1d7', stroke: '#625b80', 'stroke-width': '.8' });
    add(hand, 'path', { d: 'M-3 0Q-6-3-3-4L0-1M2-2L2 0',
      fill: 'none', stroke: '#ad987e', 'stroke-width': '.7', 'stroke-linecap': 'round' });
    // The face follows the actual moving body. Food is drawn in front of the mouth.
    const mouth = add(layer, 'path', { fill: '#20343d', stroke: '#20343d',
      'stroke-width': '1.5', 'stroke-linejoin': 'round', opacity: '0' });
    const flight = add(layer, 'g');
    const defs = add(flight, 'defs'), clipId = `bali-nib-bite-${++nextClip}`;
    const clip = add(defs, 'clipPath', { id: clipId, clipPathUnits: 'userSpaceOnUse' });
    const edge = add(clip, 'rect', { x: -8, y: -9, width: 16, height: 18 });
    const bitten = add(flight, 'g', { 'clip-path': `url(#${clipId})` });
    const copy = source.cloneNode(true);
    copy.removeAttribute('transform'); copy.removeAttribute('opacity');
    copy.removeAttribute('data-cacao-nib');
    bitten.append(copy); root.append(layer);
    const active = {piece, source, layer, smile, smileOpacity: smile.getAttribute('opacity'), opacity: source.getAttribute('opacity')};
    run = active; source.setAttribute('opacity', '0'); piece.dataset.cacaoFeeding = 'true';
    const began = performance.now();
    sound.unlock(true);
    let sounded = false;
    function tick(now) {
      if (run !== active) return;
      if (!visible(piece) || !visible(smile) || document.hidden) { cancel(); return; }
      const elapsed = now - began, f = nibFeedingFrame(elapsed);
      const face = root.getScreenCTM().inverse().multiply(smile.getScreenCTM());
      const target = new DOMPoint(331, 76).matrixTransform(face);
      const x = mix(origin.x, target.x, f.reach);
      const y = mix(origin.y, target.y, f.reach) - 14 * Math.sin(f.reach * Math.PI);
      const grip = new DOMPoint(x, y).matrixTransform(face.inverse());
      const reach = ease(elapsed / 150) * (1 - ease((elapsed - 1290) / 450));
      const hx = mix(296, grip.x, reach), hy = mix(109, grip.y + 5, reach);
      const elbowX = mix(296, hx, .5) - 5, elbowY = mix(109, hy, .5) + 9;
      arm.setAttribute('transform', `matrix(${face.a} ${face.b} ${face.c} ${face.d} ${face.e} ${face.f})`);
      arm.setAttribute('opacity', ease(elapsed / 120) * (1 - ease((elapsed - 1510) / 230)));
      forearm.setAttribute('d', `M293 109Q${elbowX - 2} ${elbowY + 2} ${hx - 2} ${hy + 1}L${hx + 2} ${hy - 1}Q${elbowX + 2} ${elbowY - 2} 299 107Z`);
      hand.setAttribute('transform', `translate(${hx} ${hy}) rotate(-22)`);
      // Packet resizing stays intact. Only the travelling nib settles to mouth size.
      const basis = ['a', 'b', 'c', 'd'].map(k => mix(matrix[k], face[k] * .58, f.reach));
      flight.setAttribute('transform', `matrix(${basis.join(' ')} ${x} ${y})`);
      flight.setAttribute('opacity', f.bite >= 1 ? '0' : '1');
      edge.setAttribute('width', 16 * (1 - f.bite));
      mouth.setAttribute('transform', `matrix(${face.a} ${face.b} ${face.c} ${face.d} ${face.e} ${face.f})`);
      mouth.setAttribute('d', `M320 72Q331 ${83 + 4 * f.open + 1.3 * f.chew} 343 69Q331 ${83 - 13 * f.open} 320 72Z`);
      mouth.setAttribute('opacity', f.face);
      smile.setAttribute('opacity', (active.smileOpacity === null ? 1 : Number(active.smileOpacity)) * (1 - f.face));
      if (f.eaten) {
        source.dataset.consumed = 'true';
        if (!sounded) { sounded = true; sound.play('bite', true, elapsed - nibBiteCue().at); }
      }
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
  for (const event of ['pagehide', 'resize']) window.addEventListener(event, cancel);
  document.addEventListener('visibilitychange', () => { if (document.hidden) cancel(); });
  reduced.addEventListener('change', cancel);
  return {handles, start, drop, cancel, clear: cancel, reset};
}
