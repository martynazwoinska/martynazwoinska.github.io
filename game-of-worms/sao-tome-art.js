// Original vectors. Anatomy references and the fictional scale are in the JU2484 dossier.
const NS = 'http://www.w3.org/2000/svg';
export const RIDE = 'ju2484-snail-ride', LEAF = 'ju2484-leaf-encounter', HATS = 'ju2484-leaf-hats';
export const saoTomeLayouts = {
  [RIDE]: {primary: [130, 285, .9, 0]},
  [LEAF]: {primary: [320, 290, .65, -8]},
  [HATS]: {primary: [326, 30, .85, 22], companion: [111, 94, .53, 24]}
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

export function drawLeafHat(p, male) {
  const id='obo-leaf-hat-'+(++serial),defs=add(p,'defs');
  const gradient=add(defs,'linearGradient',{id,x1:'10%',y1:'0%',x2:'70%',y2:'100%'});
  for(const [offset,color] of [[0,'#a8c77a'],[.48,'#6b9d64'],[1,'#387568']])
    add(gradient,'stop',{offset,'stop-color':color});
  const fill='url(#'+id+')',edge='#30574e';
  const hat=add(p,'g',{'data-obo-leaf-hat':male?'curled-cap':'folded-hat'});
  if(male){
    // A curled, overlapping leaf cup, with a short rolled-up brim.
    path(hat,'M-29-2Q-33-28-12-33Q11-39 25-22Q30-17 24-12L25-3Q1 8-29-2Z',fill,edge,1.8);
    path(hat,'M-12-33Q10-38 25-22Q30-17 24-12Q18-21 4-24Z','#becd8b',edge,1);
    path(hat,'M-12-33Q-21-14-12 1L-29-2Q-33-24-12-33Z','#a1bb73',edge,1);
    path(hat,'M-10-31Q-6-18 18-8M-6-24L9-27M0-17L16-20M7-12L19-13','none','#d0d29a',1.35);
    path(hat,'M-20-18l-5 3m7 4l-7 3M-4-21l-8 6M4-15l-6 8','none','#91b582',1);
    path(hat,'M-24-23Q-28-16-24-7','none','#d6dbaa',1.4);
    path(hat,'M-33-5Q-9 3 26-7Q30-7 32-2Q12 14-28 5Z','#87ad70',edge,1.6);
    path(hat,'M-28 5Q3 12 32-2L29 4Q5 15-27 9Z','#416f5b',edge,1);
    path(hat,'M-13-33Q-14-40-4-43','none','#56835a',2.8);
    path(hat,'M15-2l6 2m-5-5l6 2','none','#e6d6a7',1.8);
  }else{
    // Broad leaf folded into a domed crown. The darker underside gives the brim thickness.
    path(hat,'M-46-2Q-35-14-24-11Q-25-28-4-33Q14-36 24-15Q41-13 49-5Q42 7 25 11L21 8L16 13Q-18 16-38 6Z',fill,edge,1.8);
    path(hat,'M-46-2Q-16 7 7 5Q34 6 49-5Q42 10 25 14L21 11L16 16Q-19 17-38 6Z','#416f5b',edge,1.4);
    path(hat,'M-24-11Q-5 0 24-15Q16-25-4-33Q-21-28-24-11Z','#83b472','none');
    path(hat,'M-4-33Q0-19 7 5','none','#e0dca2',2.1);
    path(hat,'M-2-26Q-13-23-19-17M1-19Q-9-16-17-12M3-12Q-5-9-12-6M1-24L12-26M4-16L20-18M6-7L25-10','none','#b7ce8d',1.15);
    path(hat,'M-39 0Q-15 4 7 5Q31 5 43-2','none','#cad297',1.8);
    path(hat,'M-29-3l-4 3m10-2l-4 4M13 1l8 6M27-2l9 4','none','#92b881',1.2);
    path(hat,'M-4-33Q-14-42-24-34Q-26-32-25-30','none','#658f54',3);
    path(hat,'M-23-8Q-12-1 1-1','none','#315f52',2.8);
    path(hat,'M-20-8l-1 5m7-3l-1 5m7-3l-1 4','none','#e1d2a6',1.5);
  }
  return hat;
}

export function drawSaoTomeAccessory(p, item, male) {
  if (![RIDE, LEAF, HATS].includes(item.family)) return false;
  p.dataset.renderer = item.family;
  p.setAttribute('style', 'transform-box:view-box;transform-origin:0 0');
  if (item.family === RIDE) drawSnail(p);
  else if(item.family === LEAF) drawFallenLeaf(p);
  else drawLeafHat(p,male);
  return true;
}
