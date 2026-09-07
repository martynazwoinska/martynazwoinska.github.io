const NS = 'http://www.w3.org/2000/svg';
export const celebrationColours = ['#bd7c45', '#c95670', '#347d68', '#d75c3d', '#167d7a', '#6254aa'];
const number = n => n.toFixed(2);
const xy = p => `${number(p.x)} ${number(p.y)}`;

// A tapered, unsegmented body. A travelling bend stays attached to its face.
export function celebrationWormPose(phase = 0) {
  const centres = Array.from({ length: 29 }, (_, i) => {
    const t = i / 28;
    return { x: 5 + 53 * t, y: 22 + Math.sin(t * Math.PI * 2 - phase) * Math.sin(t * Math.PI) * 9 };
  });
  const sides = centres.map((p, i) => {
    const a = centres[Math.max(0, i - 1)], b = centres[Math.min(28, i + 1)];
    const angle = Math.atan2(b.y - a.y, b.x - a.x), w = .35 + 5.1 * Math.sin(i / 28 * Math.PI / 2);
    return { p, angle, w, nx: -Math.sin(angle), ny: Math.cos(angle) };
  });
  const offset = (s, distance) => ({ x: s.p.x + s.nx * distance, y: s.p.y + s.ny * distance });
  const h = sides.at(-1), tx = Math.cos(h.angle), ty = Math.sin(h.angle);
  const tip = { x: h.p.x + tx * h.w, y: h.p.y + ty * h.w };
  const cap = sign => ({ x: tip.x + h.nx * h.w * .7 * sign, y: tip.y + h.ny * h.w * .7 * sign });
  const outline = `M${xy(offset(sides[0], sides[0].w))}` + sides.slice(1).map(s => `L${xy(offset(s, s.w))}`).join('')
    + `Q${xy(cap(1))} ${xy(tip)}Q${xy(cap(-1))} ${xy(offset(h, -h.w))}`
    + sides.slice(0, -1).reverse().map(s => `L${xy(offset(s, -s.w))}`).join('') + 'Z';
  const stripe = side => sides.slice(7, 27).map((s, i) => `${i ? 'L' : 'M'}${xy(offset(s, side * s.w * .38))}`).join('');
  return { outline, highlight: stripe(-1), shade: stripe(1), face: `translate(${xy(h.p)}) rotate(${number(h.angle * 180 / Math.PI)})` };
}

export function celebrationFlight(index, count, width, height) {
  const angle = -Math.PI / 2 + index / count * Math.PI * 2;
  const radius = Math.min(width * .46, 600) * (.76 + index % 3 * .09);
  const x = Math.cos(angle) * radius;
  const y = Math.sin(angle) * Math.min(height * .34, 300) + 130;
  return { x, y, startX: Math.cos(angle) * 60, startY: Math.sin(angle) * 48,
    midX: x * .65, midY: y * .38 - 85,
    delay: Math.floor(index / 6) * .07, duration: 2.7 + index % 4 * .16, spin: (index % 2 ? -1 : 1) * (65 + index % 5 * 22) };
}

const add = (parent, tag, attrs = {}) => {
  const n = document.createElementNS(NS, tag);
  Object.entries(attrs).forEach(([k, v]) => n.setAttribute(k, v)); parent.append(n); return n;
};
function drawWorm(parent, index) {
  const svg = add(parent, 'svg', { viewBox: '0 0 72 44', focusable: 'false' });
  svg.style.setProperty('--worm-colour', celebrationColours[index % 6]);
  const group = add(svg, 'g', { class: 'confetti-worm-art' });
  const body = add(group, 'path', { class: 'confetti-worm-body' });
  const shade = add(group, 'path', { class: 'confetti-worm-shade' });
  const highlight = add(group, 'path', { class: 'confetti-worm-highlight' });
  const face = add(group, 'g');
  add(face, 'circle', { cx: -.8, cy: -1.7, r: 1.7, fill: '#fff7e8' });
  add(face, 'circle', { cx: -.25, cy: -1.5, r: .85, fill: '#20313d' });
  add(face, 'path', { d: 'M.1 2.1Q2.1 3.1 3.1 1', fill: 'none', stroke: '#20313d', 'stroke-width': .9, 'stroke-linecap': 'round' });
  const update = phase => {
    const p = celebrationWormPose(phase);
    body.setAttribute('d', p.outline); shade.setAttribute('d', p.shade); highlight.setAttribute('d', p.highlight); face.setAttribute('transform', p.face);
  };
  update(index * .9); return { svg, update };
}
let stopPrevious = null;
export function launchWormConfetti() {
  stopPrevious?.();
  const media = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (media.matches || document.hidden) return;
  const layer = document.createElement('div');
  layer.className = 'worm-confetti-layer'; layer.setAttribute('aria-hidden', 'true');
  const width = window.innerWidth, height = window.innerHeight, small = width <= 560;
  layer.style.setProperty('--celebration-x', `${width / 2}px`);
  layer.style.setProperty('--celebration-y', `${Math.min(height * .42, 380)}px`);
  const crest = document.createElement('div'); crest.className = 'worm-completion-flash';
  const seal = add(crest, 'svg', { viewBox: '0 0 240 190', class: 'worm-completion-flash-emblem', focusable: 'false' });
  add(seal, 'use', { href: '#atlas-explorer-seal' });
  const count = document.createElement('span'); count.className = 'worm-completion-flash-count'; count.textContent = '6 / 6';
  crest.append(count); layer.append(crest);
  const flyingCount = small ? 18 : 30;
  function fly(piece, i, total) {
    piece.classList.add('worm-confetti-piece');
    const f = celebrationFlight(i, total, width, height);
    for (const key of ['x', 'y', 'startX', 'startY', 'midX', 'midY']) piece.style.setProperty(`--flight-${key}`, `${f[key]}px`);
    piece.style.setProperty('--flight-delay', `${f.delay}s`);
    piece.style.setProperty('--flight-duration', `${f.duration}s`);
    piece.style.setProperty('--flight-spin', `${f.spin}deg`);
  }
  for (let i = 0; i < flyingCount; i++) {
    const { svg } = drawWorm(layer, i); fly(svg, i, flyingCount);
    svg.style.setProperty('--piece-size', `${(small ? 38 : 46) + i % 4 * 4}px`);
    svg.style.setProperty('--wriggle-delay', `${-i * .13}s`);
  }
  // Narrow curled strips with a shaded reverse side, plus sparse gold lozenges.
  const ribbons = small ? 10 : 16;
  for (let i = 0; i < ribbons; i++) {
    const svg = add(layer, 'svg', { viewBox: '0 0 24 56', class: 'confetti-ribbon', focusable: 'false' });
    fly(svg, i + .45, ribbons);
    svg.style.setProperty('--piece-size', `${small ? 12 : 16}px`);
    const g = add(svg, 'g', { class: 'confetti-ribbon-art' });
    add(g, 'path', { d: 'M5 2C28 11-4 20 15 29S4 44 19 54', fill: 'none', stroke: i % 3 ? '#d5ad59' : '#a45d7c', 'stroke-width': 5 });
    add(g, 'path', { d: 'M5 2Q24 10 15 15M15 29Q25 35 16 42', fill: 'none', stroke: '#ffebaf', 'stroke-width': 1.4 });
  }
  for (let i = 0; i < (small ? 8 : 12); i++) {
    const svg = add(layer, 'svg', { viewBox: '0 0 14 18', focusable: 'false' });
    fly(svg, i + .75, small ? 8 : 12); svg.style.setProperty('--piece-size', '8px');
    add(svg, 'path', { d: 'M7 0L14 9 7 18 0 9Z', fill: '#d5ad59', stroke: '#fff1b9', 'stroke-width': 1 });
  }
  const crawlers = Array.from({ length: 6 }, (_, i) => {
    const shell = document.createElement('div');
    shell.className = `worm-confetti-crawler-shell${i % 2 ? ' is-reversed' : ''}`;
    // Offset the opposing lanes so their faces do not cross through one another.
    shell.style.setProperty('--crawler-lane', `${12 + Math.floor(i / 2) * (small ? 25 : 34) + (i % 2) * 9}px`);
    shell.style.setProperty('--crawler-size', `${(small ? 58 : 72) + i % 3 * 5}px`);
    shell.style.setProperty('--crawler-delay', `${.7 + i * .13}s`);
    shell.style.setProperty('--crawler-duration', `${3.6 + i % 3 * .18}s`);
    layer.append(shell); return drawWorm(shell, i);
  });
  document.body.append(layer);
  let frame = 0, last = 0;
  const started = performance.now();
  const timer = window.setTimeout(clear, 5600);
  function clear() {
    window.clearTimeout(timer); cancelAnimationFrame(frame); layer.remove();
    document.removeEventListener('visibilitychange', hidden); window.removeEventListener('pagehide', clear);
    document.removeEventListener('keydown', key); media.removeEventListener('change', clear);
    if (stopPrevious === clear) stopPrevious = null;
  }
  function hidden() { if (document.hidden) clear(); }
  function key(event) { if (event.key === 'Escape') clear(); }
  function wriggle(now) {
    if (!layer.isConnected) { clear(); return; }
    if (now - last >= 33) { crawlers.forEach((c, i) => c.update((now - started) / 175 + i)); last = now; }
    frame = requestAnimationFrame(wriggle);
  }
  stopPrevious = clear;
  document.addEventListener('visibilitychange', hidden); window.addEventListener('pagehide', clear);
  document.addEventListener('keydown', key); media.addEventListener('change', clear);
  frame = requestAnimationFrame(wriggle);
}
