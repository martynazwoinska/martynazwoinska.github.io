// Original vectors. Anatomy references and the fictional scale are in the JU2484 dossier.
const NS = 'http://www.w3.org/2000/svg';
export const RIDE = 'ju2484-snail-ride', LEAF = 'ju2484-leaf-encounter';
export const saoTomeLayouts = {
  [RIDE]: {primary: [210, 285, .9, 0]},
  [LEAF]: {primary: [170, 285, .9, 0]}
};
export const add = (p, t, a = {}) => {
  const n = document.createElementNS(NS, t);
  for (const [k, v] of Object.entries(a)) n.setAttribute(k, v);
  p.appendChild(n); return n;
};
export const path = (p, d, fill = 'none', stroke = '#33453f', width = 1.5) =>
  add(p, 'path', {d, fill, stroke, 'stroke-width': width, 'stroke-linecap': 'round', 'stroke-linejoin': 'round'});
const ellipse = (p, cx, cy, rx, ry, fill, stroke = 'none', width = 1) =>
  add(p, 'ellipse', {cx, cy, rx, ry, fill, stroke, 'stroke-width': width});
let serial = 0;

export function drawSnail(p) {
  // A long, rounded spire behind an inflated body whorl, not a flat spiral disk.
  const id = 'obo-shell-' + (++serial), defs = add(p, 'defs');
  const gradient = add(defs, 'linearGradient', {id, x1: '16%', y1: '5%', x2: '88%', y2: '95%'});
  for (const [offset, color] of [[0, '#b5ad83'], [.27, '#85816c'], [.57, '#656061'], [1, '#413f49']])
    add(gradient, 'stop', {offset, 'stop-color': color});
  ellipse(p, -3, 17, 96, 8, '#1e352a28');
  const foot = add(p, 'g', {'data-obo-foot': ''});
  path(foot, 'M-93 10Q-68-1-43-5Q-17-12 11-7L49-10Q69-22 79-7Q86 1 96 9Q62 22 12 19Q-48 24-93 10Z', '#616e6c', '#35494a', 1.7);
  path(foot, 'M-88 12Q-31 27 29 18Q73 19 94 10', 'none', '#a9b4a3', 2);
  path(foot, 'M-62 9Q-24 15 8 10M-43 4Q-19 8 0 4', 'none', '#83938a', 1.3);
  const head = add(p, 'g', {'data-obo-head': ''});
  // Far tentacles sit behind the head. Two small sensory tentacles stay near the mouth.
  path(head, 'M64-9Q71-25 86-32', 'none', '#596d6c', 4);
  ellipse(head, 87, -32, 2.3, 2.5, '#35464a');
  path(head, 'M40 8Q49-5 51-15Q61-22 72-11Q80-4 87 1L91 8Q77 16 48 15Z', '#617776', '#35494a', 1.4);
  path(head, 'M60-10Q66-29 67-44', 'none', '#536b6a', 5);
  path(head, 'M60-10Q66-29 67-44', 'none', '#9eb0a1', 1.2);
  ellipse(head, 67, -44, 2.8, 2.8, '#273f43');
  ellipse(head, 66.5, -44.7, .7, .7, '#e0e0bf');
  path(head, 'M77 4L94-4M78 8L89 14', 'none', '#506763', 2.5);
  for (const [x, y] of [[49,2],[57,3],[66,-2],[63,8],[71,5],[76,1],[52,9],[45,11]])
    ellipse(head, x, y, 1.2, .8, '#a3b5a2');
  const shell = add(p, 'g', {'data-obo-shell': ''});
  const outline = 'M-88-39Q-91-44-83-45Q-82-59-64-57Q-53-76-28-67C-7-80 21-70 34-51C49-34 47-8 29 4Q8 18-26 7Q-50 1-64-16Q-80-18-80-29Q-88-30-88-39Z';
  path(shell, outline, 'url(#' + id + ')', '#3d4448', 2);
  const clip = add(defs, 'clipPath', {id: id + '-clip'}); path(clip, outline, 'white', 'none');
  const grain = add(shell, 'g', {'clip-path': 'url(#' + id + '-clip)'});
  for (let i = 0; i < 19; i++) {
    const x = -51 + i * 4.8;
    path(grain, 'M' + x + ' -78C' + (x-16) + ' -42 ' + (x+23) + ' -9 ' + (x+10) + ' 18', 'none', i % 3 ? '#c5b08a' : '#393f49', i % 3 ? .8 : 1.6).setAttribute('opacity', i % 3 ? '.47' : '.52');
  }
  path(shell, 'M-82-44Q-69-46-65-32Q-65-23-79-27M-63-55Q-40-55-39-31Q-41-14-62-16M-28-66Q-5-63-5-30Q-6-8-25 6', 'none', '#44464b', 2);
  path(shell, 'M-79-44Q-69-43-68-35M-58-54Q-44-51-43-36M-22-65Q-9-57-9-40', 'none', '#c5bb95', 1.2);
  // Aperture lip overlaps the mantle. No circular spiral painted on the flank.
  path(shell, 'M29-47C46-37 48-9 31 4Q20 11 10 6C29-6 29-26 29-47Z', '#44464b', '#333e43', 1.2);
  path(shell, 'M30-48C47-37 49-9 32 5Q19 13 9 7', 'none', '#b8aa90', 3);
  path(shell, 'M-9-63Q10-71 24-56', 'none', '#d0c9a4', 2.4).setAttribute('opacity', '.7');
  return {head, foot, shell};
}

export function drawFallenLeaf(p) {
  const g = add(p, 'g', {'data-obo-leaf': ''});
  path(g, 'M-117 6Q-113-35-79-55Q-59-88-16-82Q32-100 57-63Q89-55 116-20Q84 23 25 20Q-23 38-70 16Q-100 26-117 6Z', '#9b925c', '#575f43', 1.8);
  path(g, 'M-110 5Q-69-43-16-36Q50-27 111-19Q57 16 25 16Q-16 35-65 13Z', '#b5ac70', 'none');
  path(g, 'M-110 5Q-38-21 111-19', 'none', '#ddd0a0', 3);
  for (const [x, y, tx, ty] of [[-79,-4,-81,-48],[-57,-9,-51,-69],[-30,-14,-16,-75],[0,-18,30,-73],[29,-20,54,-53],[61,-20,87,-38],[-73,-5,-73,14],[-42,-11,-41,23],[-8,-16,-5,25],[29,-19,34,16],[65,-19,71,5]])
    path(g, `M${x} ${y}Q${(x+tx)/2+8} ${(y+ty)/2} ${tx} ${ty}`, 'none', '#777d4e', 1.2);
  path(g, 'M-118 6Q-132 13-140 4', 'none', '#6a7651', 4);
  path(g, 'M-79-55L-65-58L-71-48Z', '#6c7050', 'none');
  path(g, 'M57-63Q84-58 116-20L91-24Q93-47 57-63Z', '#77794f', '#585f43', 1);
  ellipse(g, -50, -29, 7, 3.5, '#797850');
  path(g, 'M-53-28l6-3M6-57l13 1M48-2l7 1', 'none', '#d3c58e', 1.3);
  return g;
}

export function drawSaoTomeAccessory(p, item, male) {
  if (![RIDE, LEAF].includes(item.family)) return false;
  p.dataset.renderer = item.family;
  p.setAttribute('style', 'transform-box:view-box;transform-origin:0 0');
  if (item.family === RIDE) drawSnail(p);
  else drawFallenLeaf(p);
  return true;
}
